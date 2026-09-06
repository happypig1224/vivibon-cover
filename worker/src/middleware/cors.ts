import { MiddlewareHandler } from 'hono';
import { Env } from '../types/env';

export const corsMiddleware = (): MiddlewareHandler<{ Bindings: Env }> => {
  return async (c, next) => {
    const origin = c.env.CORS_ORIGIN || '*';

    c.header('Access-Control-Allow-Origin', origin);
    c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    c.header('Access-Control-Max-Age', '86400');

    if (c.req.method === 'OPTIONS') {
      return c.body(null, 204);
    }

    await next();
  };
};
