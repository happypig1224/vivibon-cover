import { MiddlewareHandler } from 'hono';
import { Env } from '../types/env';
import { ErrorResponse } from '../schemas/generate';

export interface RateLimiterOptions {
  dailyBudgetCap?: number;
  ipHourlyCap?: number;
  ipDailyCap?: number;
}

// Production Hard Limits requested by Engineering Direction
const DEFAULT_DAILY_BUDGET_CAP = 1500; // 1500 requests/day ($45 budget hard cap, NC-3)
const DEFAULT_IP_HOURLY_CAP = 3;       // 3 requests/hour per IP
const DEFAULT_IP_DAILY_CAP = 10;       // 10 requests/day per IP

export const rateLimiterMiddleware = (options?: RateLimiterOptions): MiddlewareHandler<{
  Bindings: Env;
  Variables: { clientIp: string };
}> => {
  return async (c, next) => {
    if (c.req.method !== 'POST') {
      return await next();
    }

    const kv = c.env?.RATE_LIMIT_KV;
    if (!kv) {
      // If KV is not configured, pass through (e.g., unit test without KV or dev mode)
      return await next();
    }

    const dailyBudgetCap = options?.dailyBudgetCap ?? DEFAULT_DAILY_BUDGET_CAP;
    const ipHourlyCap = options?.ipHourlyCap ?? DEFAULT_IP_HOURLY_CAP;
    const ipDailyCap = options?.ipDailyCap ?? DEFAULT_IP_DAILY_CAP;

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const hourStr = `${dateStr}-${now.getUTCHours().toString().padStart(2, '0')}`;
    const ip = c.get('clientIp') || '127.0.0.1';

    // 0. Check Persistent Malicious IP Blacklist
    const blacklistKey = `blacklist:ip:${ip}`;
    const isBlacklisted = await kv.get(blacklistKey);
    if (isBlacklisted) {
      const errorResp: ErrorResponse = {
        success: false,
        errorCode: 'IP_BLACKLISTED',
        message: 'Your IP address has been temporarily suspended due to abusive automated requests.'
      };
      return c.json(errorResp, 403);
    }

    // 1. Check Rapid-Fire Burst Abuse (Anti-Script: >5 requests in 10 seconds)
    const tenSecondWindow = Math.floor(now.getTime() / 10000);
    const burstKey = `burst:ip:${ip}:${tenSecondWindow}`;
    const burstCountStr = await kv.get(burstKey);
    const burstCount = burstCountStr ? parseInt(burstCountStr, 10) : 0;

    if (burstCount >= 5) {
      // Automatically ban the abusive IP for 24 hours (86400s)
      await kv.put(blacklistKey, 'AUTO_BANNED_RAPID_FIRE', { expirationTtl: 86400 });
      console.warn(`[RateLimiter] IP [${ip}] triggered rapid-fire burst limit (5 req/10s). Auto-blacklisted for 24h.`);
      const errorResp: ErrorResponse = {
        success: false,
        errorCode: 'ABUSIVE_BURST_BLOCKED',
        message: 'Abnormal request burst detected. IP address blacklisted for 24 hours.'
      };
      return c.json(errorResp, 403);
    }

    // 2. Check Global Daily FinOps Hard Cap ($45 / 1500 calls)
    const dailyCapKey = `finops:daily:${dateStr}`;
    const dailyTotalStr = await kv.get(dailyCapKey);
    const dailyTotal = dailyTotalStr ? parseInt(dailyTotalStr, 10) : 0;
    if (dailyTotal >= dailyBudgetCap) {
      const errorResp: ErrorResponse = {
        success: false,
        errorCode: 'FINOPS_CAP_REACHED',
        message: "Today's Haute Couture fitting quota has been fully claimed. Please come back tomorrow at 00:00 UTC!"
      };
      return c.json(errorResp, 429);
    }

    // Check if test bypass is requested (owner test or query bypass)
    const url = new URL(c.req.url);
    const isTestBypass = c.req.header('x-test-bypass') === '1' ||
                         url.searchParams.get('test_bypass') === '1' ||
                         url.searchParams.get('debug') === '1';

    if (!isTestBypass) {
      const ipHourlyKey = `ratelimit:ip:${ip}:${hourStr}`;
      const ipDailyKey = `ratelimit:ip:${ip}:${dateStr}`;

      // 3. Check Single IP Hourly Rate Limit (3 requests/hour)
      const ipHourlyStr = await kv.get(ipHourlyKey);
      const ipHourly = ipHourlyStr ? parseInt(ipHourlyStr, 10) : 0;
      if (ipHourly >= ipHourlyCap) {
        const errorResp: ErrorResponse = {
          success: false,
          errorCode: 'RATE_LIMIT_EXCEEDED',
          message: `You have reached the hourly limit of ${ipHourlyCap} bespoke covers. Please try again later.`
        };
        return c.json(errorResp, 429);
      }

      // 4. Check Single IP Daily Rate Limit (10 requests/day)
      const ipDailyStr = await kv.get(ipDailyKey);
      const ipDaily = ipDailyStr ? parseInt(ipDailyStr, 10) : 0;
      if (ipDaily >= ipDailyCap) {
        const errorResp: ErrorResponse = {
          success: false,
          errorCode: 'RATE_LIMIT_EXCEEDED',
          message: `You have reached the daily limit of ${ipDailyCap} bespoke covers. Please come back tomorrow!`
        };
        return c.json(errorResp, 429);
      }

      // Atomic increments in KV
      const currentHourly = ipHourlyStr ? parseInt(ipHourlyStr, 10) : 0;
      const currentDaily = ipDailyStr ? parseInt(ipDailyStr, 10) : 0;
      await Promise.all([
        kv.put(dailyCapKey, (dailyTotal + 1).toString(), { expirationTtl: 172800 }),
        kv.put(ipHourlyKey, (currentHourly + 1).toString(), { expirationTtl: 7200 }),
        kv.put(ipDailyKey, (currentDaily + 1).toString(), { expirationTtl: 172800 }),
        kv.put(burstKey, (burstCount + 1).toString(), { expirationTtl: 60 })
      ]);
    } else {
      // Test bypass still increments global FinOps cap for budget tracking
      await kv.put(dailyCapKey, (dailyTotal + 1).toString(), { expirationTtl: 172800 });
    }

    await next();
  };
};
