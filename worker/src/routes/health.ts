import { Hono } from 'hono';
import { Env } from '../types/env';

export const healthRoute = new Hono<{ Bindings: Env }>();

healthRoute.get('/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'vivibon-cover-worker',
    environment: c.env.ENVIRONMENT || 'development',
    timestamp: new Date().toISOString()
  });
});
