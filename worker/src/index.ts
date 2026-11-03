import { Hono } from 'hono';
import { Env } from './types/env';
import { corsMiddleware } from './middleware/cors';
import { loggerMiddleware } from './middleware/logger';
import { rateLimiterMiddleware, RateLimiterOptions } from './middleware/rateLimiter';
import { antiBotMiddleware } from './middleware/antiBot';
import { healthRoute } from './routes/health';
import { pingRouter } from './routes/ping';
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
  app.route('/api/ping', pingRouter);
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

  // 8. Direct Edge Probe for Pruna P-Image-Edit (Cloudflare Workers AI Marketplace)
  app.all('/api/test/pruna', async (c) => {
    if (!c.env.AI) {
      return c.json({ success: false, error: 'Cloudflare AI binding (env.AI) is not available' }, 500);
    }
    const t0 = Date.now();
    try {
      let prompt = 'Transform this pet into a 17th century baroque royal oil painting portrait wearing golden embroidered luxury velvet costume';
      let images = ['https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg'];
      let aspectRatio = '3:4';
      let turbo = true;

      if (c.req.method === 'POST') {
        const body = await c.req.json().catch(() => ({}));
        if (body.prompt) prompt = body.prompt;
        if (Array.isArray(body.images) && body.images.length > 0) images = body.images;
        if (body.aspectRatio) aspectRatio = body.aspectRatio;
        if (typeof body.turbo === 'boolean') turbo = body.turbo;
      }

      const aiResponse = await c.env.AI.run('pruna/p-image-edit', {
        prompt,
        images,
        aspect_ratio: aspectRatio,
        turbo,
        disable_safety_checker: false
      });

      const latencyMs = Date.now() - t0;
      return c.json({
        success: true,
        model: 'pruna/p-image-edit',
        latencyMs,
        response: aiResponse
      });
    } catch (err: any) {
      const latencyMs = Date.now() - t0;
      return c.json({
        success: false,
        model: 'pruna/p-image-edit',
        latencyMs,
        error: err?.message || String(err),
        stack: err?.stack
      }, 500);
    }
  });

  // 9. Direct Edge Probe for Cloudflare FLUX.2 Models (Free Neurons & Multi-image)
  app.all('/api/test/flux2', async (c) => {
    if (!c.env.AI) {
      return c.json({ success: false, error: 'Cloudflare AI binding (env.AI) is not available' }, 500);
    }
    const t0 = Date.now();
    const modelId = c.req.query('model') || '@cf/black-forest-labs/flux-2-klein-4b';
    try {
      const formData = new FormData();
      formData.append('prompt', 'A cute fluffy orange cat sitting gracefully, baroque royal oil painting portrait');

      // 支持 POST 传入的 prompt 或图片
      if (c.req.method === 'POST') {
        const body = await c.req.json().catch(() => ({}));
        if (body.prompt) {
          formData.set('prompt', body.prompt);
        }
        if (body.image) {
          // 如果传入了 base64 图片，转为 Blob append
          const base64Data = body.image.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
          const blob = new Blob([buffer], { type: 'image/jpeg' });
          formData.append('image', blob, 'input.jpg');
        }
      }

      // 诊断探针：支持传入不同的试验 payload
      let bodyPayload: any = {
        prompt: 'A cute fluffy orange cat, baroque oil painting portrait'
      };

      if (c.req.method === 'POST') {
        const custom = await c.req.json().catch(() => ({}));
        if (custom.body) {
          bodyPayload = custom.body;
        } else if (custom.prompt) {
          bodyPayload.prompt = custom.prompt;
        }
      }

      // 测试模式 1: 直接传 { multipart: { contentType: "multipart/form-data", body: bodyPayload } }
      let result1: any, error1: any;
      try {
        result1 = await c.env.AI.run(modelId, {
          multipart: {
            contentType: 'multipart/form-data',
            body: bodyPayload
          }
        });
      } catch (e: any) {
        error1 = e.message;
      }

      const latencyMs = Date.now() - t0;
      return c.json({
        model: modelId,
        latencyMs,
        sentBody: bodyPayload,
        result1,
        error1
      });
    } catch (err: any) {
      const latencyMs = Date.now() - t0;
      return c.json({
        success: false,
        model: modelId,
        latencyMs,
        error: err?.message || String(err),
        stack: err?.stack
      }, 500);
    }
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

