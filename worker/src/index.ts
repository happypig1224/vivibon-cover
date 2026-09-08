import { Hono } from 'hono';
import { Env } from './types/env';
import { corsMiddleware } from './middleware/cors';
import { loggerMiddleware } from './middleware/logger';
import { rateLimiterMiddleware, RateLimiterOptions } from './middleware/rateLimiter';
import { antiBotMiddleware } from './middleware/antiBot';
import { healthRoute } from './routes/health';
import { stylesRoute } from './routes/styles';
import { createGenerateRoute } from './routes/generate';
import { FalService, falService as defaultFalService } from './services/falService';
import { ErrorResponse } from './schemas/generate';

import { metricsService } from './services/metricsService';
import { alertService } from './services/alertService';

// @ts-ignore
import indexHtml from '../../public/index.html?raw';

export const createApp = (customFalService?: FalService, rateLimiterOpts?: RateLimiterOptions) => {
  const app = new Hono<{
    Bindings: Env;
    Variables: { clientIp: string; traceId: string };
  }>();

  // 1. Structured Logging Middleware
  app.use('*', loggerMiddleware());

  // 2. CORS Policy Middleware
  app.use('*', corsMiddleware());

  // 3. Big-Tech Grade Anti-Bot & Script Protection on Generation Route
  app.use('/api/generate', antiBotMiddleware());

  // 4. FinOps & IP Rate Limiting Middleware on Generation Route (NC-3: 3/hr, 10/day, $45 cap)
  app.use('/api/generate', rateLimiterMiddleware(rateLimiterOpts));

  // 5. Static H5 Delivery (Zero-Latency Unified Edge Serving)
  app.get('/', (c) => c.html(indexHtml));
  app.get('/index.html', (c) => c.html(indexHtml));

  // 6. API Routes
  app.route('/', healthRoute);
  app.route('/', stylesRoute);
  app.route('/', createGenerateRoute(customFalService || defaultFalService));

  // 7. Internal Daily Report Inspection & Manual Trigger Route (strictly NO emojis)
  app.get('/api/internal/daily-report', async (c) => {
    const dateParam = c.req.query('date');
    const shouldSend = c.req.query('send') === '1';
    const summary = await metricsService.getDailySummary(c.env.RATE_LIMIT_KV, dateParam);
    const markdown = metricsService.formatDailyReportMarkdown(summary, c.env.ENVIRONMENT || 'production');

    let sent = false;
    if (shouldSend) {
      sent = await alertService.sendMarkdown(c.env.WECHAT_WEBHOOK_URL, markdown);
    }

    return c.json({
      success: true,
      data: {
        summary,
        markdown,
        sent
      }
    });
  });

  // Global 404 handler
  app.notFound((c) => {
    const errorResp: ErrorResponse = {
      success: false,
      errorCode: 'NOT_FOUND',
      message: `The requested path ${c.req.path} was not found.`
    };
    return c.json(errorResp, 404);
  });

  // Global Error handler
  app.onError((err, c) => {
    console.error('[Unhandled Error]:', err);
    const errorResp: ErrorResponse = {
      success: false,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected edge error occurred. Please try again later.'
    };
    return c.json(errorResp, 500);
  });

  return app;
};

export const app = createApp();

export default {
  fetch: (request: Request, env: Env, ctx: ExecutionContext) => app.fetch(request, env, ctx),
  async scheduled(event: any, env: Env, ctx: ExecutionContext) {
    console.log('[Cron] Executing ViviBon Cover Daily Operations Report scheduler...');
    try {
      const summary = await metricsService.getDailySummary(env.RATE_LIMIT_KV);
      const markdown = metricsService.formatDailyReportMarkdown(summary, env.ENVIRONMENT || 'production');
      const sent = await alertService.sendMarkdown(env.WECHAT_WEBHOOK_URL, markdown);
      console.log('[Cron] Daily report successfully dispatched, sent =', sent);
    } catch (err) {
      console.error('[Cron] Error executing daily operations report:', err);
    }
  }
};

