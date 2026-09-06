import { Hono } from 'hono';
import { Env } from './types/env';
import { corsMiddleware } from './middleware/cors';
import { loggerMiddleware } from './middleware/logger';
import { rateLimiterMiddleware, RateLimiterOptions } from './middleware/rateLimiter';
import { healthRoute } from './routes/health';
import { createGenerateRoute } from './routes/generate';
import { FalService, falService as defaultFalService } from './services/falService';
import { ErrorResponse } from './schemas/generate';

// @ts-ignore
import indexHtml from '../../index.html?raw';

export const createApp = (customFalService?: FalService, rateLimiterOpts?: RateLimiterOptions) => {
  const app = new Hono<{
    Bindings: Env;
    Variables: { clientIp: string; traceId: string };
  }>();

  // 1. Structured Logging Middleware
  app.use('*', loggerMiddleware());

  // 2. CORS Policy Middleware
  app.use('*', corsMiddleware());

  // 3. FinOps & IP Rate Limiting Middleware (NC-3)
  app.use('/api/*', rateLimiterMiddleware(rateLimiterOpts));

  // 4. Static H5 Delivery (Zero-Latency Unified Edge Serving)
  app.get('/', (c) => c.html(indexHtml));
  app.get('/index.html', (c) => c.html(indexHtml));

  // 5. API Routes
  app.route('/', healthRoute);
  app.route('/', createGenerateRoute(customFalService || defaultFalService));

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

const app = createApp();
export default app;
