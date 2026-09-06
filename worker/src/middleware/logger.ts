import { MiddlewareHandler } from 'hono';
import { Env } from '../types/env';

export const loggerMiddleware = (): MiddlewareHandler<{ Bindings: Env; Variables: { traceId: string; clientIp: string } }> => {
  return async (c, next) => {
    const start = Date.now();
    const traceId = c.req.header('x-trace-id') || crypto.randomUUID();
    const clientIp =
      c.req.header('cf-connecting-ip') ||
      c.req.header('x-forwarded-for')?.split(',')[0].trim() ||
      '127.0.0.1';

    c.set('traceId', traceId);
    c.set('clientIp', clientIp);
    c.header('X-Trace-Id', traceId);

    await next();

    const duration = Date.now() - start;
    const status = c.res.status;
    const path = c.req.path;
    const method = c.req.method;

    console.log(
      JSON.stringify({
        level: 'INFO',
        timestamp: new Date().toISOString(),
        traceId,
        clientIp,
        method,
        path,
        status,
        durationMs: duration
      })
    );
  };
};
