import { MiddlewareHandler } from 'hono';
import { Env } from '../types/env';
import { ErrorResponse } from '../schemas/generate';

/**
 * Big-Tech Grade Anti-Bot & Anti-Crawler Defense Middleware
 * Identifies headless browsers, automated Python/Go scraping tools, and script attacks
 */
const AUTOMATED_BOT_PATTERNS = [
  /python-requests/i,
  /aiohttp/i,
  /httpx/i,
  /^curl\//i,
  /^wget\//i,
  /go-http-client/i,
  /scrapy/i,
  /headlesschrome/i,
  /phantomjs/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
  /java\/\d/i,
  /okhttp/i,
  /apache-httpclient/i
];

export const antiBotMiddleware = (): MiddlewareHandler<{
  Bindings: Env;
  Variables: { clientIp: string; traceId: string };
}> => {
  return async (c, next) => {
    // Only protect POST mutation routes (avoid blocking OPTIONS preflight or GET)
    if (c.req.method !== 'POST') {
      return await next();
    }

    // 1. Allow Admin / Test Bypass
    const url = new URL(c.req.url);
    if (
      c.req.header('x-test-bypass') === '1' ||
      url.searchParams.get('test_bypass') === '1' ||
      url.searchParams.get('debug') === '1'
    ) {
      return await next();
    }

    const userAgent = c.req.header('user-agent') || '';

    // 2. Reject empty or abnormally short User-Agents on generation API
    if (!userAgent || userAgent.trim().length < 5) {
      const errorResp: ErrorResponse = {
        success: false,
        errorCode: 'BOT_DETECTED',
        message: 'Automated script detected. Valid browser environment required.'
      };
      return c.json(errorResp, 403);
    }

    // 3. Match against known scraping tools and headless browser engines
    for (const pattern of AUTOMATED_BOT_PATTERNS) {
      if (pattern.test(userAgent)) {
        console.warn(`[AntiBot] Blocked suspicious automated agent [${userAgent}] from IP [${c.get('clientIp')}]`);
        const errorResp: ErrorResponse = {
          success: false,
          errorCode: 'BOT_DETECTED',
          message: 'Automated scraping and headless tools are strictly restricted.'
        };
        return c.json(errorResp, 403);
      }
    }

    // 4. Verify presence of standard browser fetch headers on mutation requests
    if (c.req.method === 'POST') {
      const contentType = c.req.header('content-type') || '';
      if (!contentType.includes('application/json')) {
        const errorResp: ErrorResponse = {
          success: false,
          errorCode: 'INVALID_HEADERS',
          message: 'Request content-type must be application/json.'
        };
        return c.json(errorResp, 400);
      }
    }

    await next();
  };
};
