import { MiddlewareHandler } from 'hono';
import { Env } from '../types/env';

export const isOriginAllowed = (origin: string | undefined, env?: Env): boolean => {
  if (!origin) {
    return true;
  }

  if (env?.CORS_ORIGIN) {
    if (env.CORS_ORIGIN === '*') return true;
    if (env.CORS_ORIGIN === origin) return true;
  }

  // Official production domains & preview branches
  if (origin === 'https://vivibon-cover.pages.dev') return true;
  if (/^https:\/\/[a-zA-Z0-9-]+\.vivibon-cover\.pages\.dev$/.test(origin)) return true;

  // Local development
  if (
    origin === 'http://localhost:3000' ||
    origin === 'http://127.0.0.1:3000' ||
    origin === 'http://localhost:8787' ||
    origin === 'http://127.0.0.1:8787'
  ) {
    return true;
  }

  // Allow in test environment if test origin or bypass
  if (env?.ENVIRONMENT === 'test' && (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('vivibon.com'))) {
    return true;
  }

  return false;
};

export const corsMiddleware = (): MiddlewareHandler<{ Bindings: Env }> => {
  return async (c, next) => {
    const origin = c.req.header('origin');
    const allowed = isOriginAllowed(origin, c.env);

    if (c.req.method === 'OPTIONS') {
      if (origin && !allowed) {
        return c.body(null, 403);
      }
      c.header('Access-Control-Allow-Origin', origin || '*');
      c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, x-request-timestamp, x-request-nonce, x-admin-bypass-key, x-test-bypass');
      c.header('Access-Control-Max-Age', '86400');
      return c.body(null, 204);
    }

    if (origin) {
      if (!allowed) {
        return c.json({
          success: false,
          errorCode: 'FORBIDDEN_ORIGIN',
          message: 'Cross-origin request blocked by ViviBon security policy.'
        }, 403);
      }
      c.header('Access-Control-Allow-Origin', origin);
    } else {
      c.header('Access-Control-Allow-Origin', c.env?.CORS_ORIGIN || '*');
    }

    c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, x-request-timestamp, x-request-nonce, x-admin-bypass-key, x-test-bypass');

    await next();
  };
};

