import { Hono } from 'hono';
import { Env } from '../types/env';

export const pingRouter = new Hono<{ Bindings: Env }>();

/**
 * P0-0 Zero-RTT Connection Pre-warming Probe
 * - Responds to GET and HEAD requests with 204 No Content
 * - Zero database / KV overhead, zero rate limiter quota deduction
 * - Pre-negotiates TCP三次握手 + TLS 1.3 session resumption
 * - Keeps connection in ESTABLISHED Keep-Alive pool before user taps Generate
 */
pingRouter.get('/', (c) => {
  c.header('Cache-Control', 'no-store, no-cache, must-revalidate');
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  return c.body(null, 204);
});

pingRouter.all('/', (c) => {
  c.header('Cache-Control', 'no-store, no-cache, must-revalidate');
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  return c.body(null, 204);
});
