import { describe, it, expect } from 'vitest';
import { createApp } from '../src/index';

describe('GET /api/ping - Zero-RTT Connection Pre-warming Probe', () => {
  it('should return 204 No Content with CORS and cache-control headers on GET /api/ping', async () => {
    const app = createApp();
    const res = await app.request('/api/ping', {
      method: 'GET',
      headers: {
        'Origin': 'https://vivibon-cover.pages.dev',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
      }
    });

    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res.headers.get('Cache-Control')).toContain('no-store');
    const text = await res.text();
    expect(text).toBe('');
  });

  it('should return 204 No Content on HEAD /api/ping without throwing errors', async () => {
    const app = createApp();
    const res = await app.request('/api/ping', {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    expect(res.status).toBe(204);
  });
});
