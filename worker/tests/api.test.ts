import { describe, it, expect } from 'vitest';
import { createApp } from '../src/index';
import { MockKVNamespace } from './helpers/mockKv';
import { FalService } from '../src/services/falService';

describe('Hono API End-to-End Integration', () => {
  const mockKv = new MockKVNamespace();
  const mockFalService = new FalService(async () => ({
    jobId: 'fal_job_e2e',
    imageUrl: 'https://cdn.vivibon.com/e2e_sample.png'
  }));

  const env = {
    RATE_LIMIT_KV: mockKv as unknown as KVNamespace,
    FAL_KEY: 'test_secret_key',
    ENVIRONMENT: 'test'
  };

  const app = createApp(mockFalService);

  it('GET /health should return 200 OK with service metadata', async () => {
    const res = await app.request('/health', { method: 'GET' }, env);
    expect(res.status).toBe(200);

    const body = (await res.json()) as any;
    expect(body).toMatchObject({
      status: 'ok',
      service: 'vivibon-cover-worker',
      environment: 'test'
    });
    expect(body.timestamp).toBeDefined();
  });

  it('GET /nonexistent should return 404 with unified error structure', async () => {
    const res = await app.request('/nonexistent', { method: 'GET' }, env);
    expect(res.status).toBe(404);

    const body = await res.json();
    expect(body).toMatchObject({
      success: false,
      errorCode: 'NOT_FOUND'
    });
  });

  it('OPTIONS /api/generate should return 204 with CORS headers', async () => {
    const res = await app.request('/api/generate', { method: 'OPTIONS' }, env);
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain('POST');
  });

  it('POST /api/generate should return 400 when body is invalid JSON', async () => {
    const res = await app.request(
      '/api/generate',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid-json-string{{{'
      },
      env
    );
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body).toMatchObject({
      success: false,
      errorCode: 'INVALID_JSON_PAYLOAD'
    });
  });

  it('POST /api/generate should return 400 when styleKey is invalid', async () => {
    const res = await app.request(
      '/api/generate',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '10.0.0.1' },
        body: JSON.stringify({ styleKey: 'unsupported_vibe' })
      },
      env
    );
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body).toMatchObject({
      success: false,
      errorCode: 'INVALID_STYLE_KEY',
      message: 'Requested style is not in haute couture catalogue.'
    });
  });

  it('POST /api/generate should succeed and return full payload matching ENGINEERING-SPEC contract', async () => {
    const res = await app.request(
      '/api/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cf-connecting-ip': '10.0.0.2',
          'x-trace-id': 'test-trace-uuid-123'
        },
        body: JSON.stringify({
          styleKey: 'gentle',
          petName: '查理 Charlie',
          isDefaultSample: false
        })
      },
      env
    );

    expect(res.status).toBe(200);
    expect(res.headers.get('X-Trace-Id')).toBe('test-trace-uuid-123');

    const body = (await res.json()) as any;
    expect(body).toMatchObject({
      success: true,
      data: {
        jobId: 'fal_job_e2e',
        imageUrl: 'https://cdn.vivibon.com/e2e_sample.png',
        styleKey: 'gentle',
        petName: '查理 Charlie',
        isFallback: false
      }
    });
    expect(typeof body.data.latencyMs).toBe('number');
  });
});
