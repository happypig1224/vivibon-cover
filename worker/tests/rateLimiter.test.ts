import { describe, it, expect, beforeEach } from 'vitest';
import { createApp } from '../src/index';
import { MockKVNamespace } from './helpers/mockKv';
import { FalService } from '../src/services/falService';

describe('RateLimiter Middleware & FinOps Defenses', () => {
  let mockKv: MockKVNamespace;
  let mockFalService: FalService;

  beforeEach(() => {
    mockKv = new MockKVNamespace();
    // Fast mock runner so test doesn't actually call external Fal.ai
    mockFalService = new FalService(async () => ({
      jobId: 'test_job_123',
      imageUrl: 'https://example.com/mock.png'
    }));
  });

  const createTestEnv = () => ({
    RATE_LIMIT_KV: mockKv as unknown as KVNamespace,
    FAL_KEY: 'test_key'
  });

  it('should allow first 3 requests from same IP in the same hour, and block the 4th with 429', async () => {
    const app = createApp(mockFalService, { ipHourlyCap: 3, ipDailyCap: 5 });
    const env = createTestEnv();

    const payload = JSON.stringify({ styleKey: 'gentle' });
    const headers = {
      'Content-Type': 'application/json',
      'cf-connecting-ip': '203.0.113.10'
    };

    // 1st request -> 200 OK
    const res1 = await app.request('/api/generate', { method: 'POST', headers, body: payload }, env);
    expect(res1.status).toBe(200);

    // 2nd request -> 200 OK
    const res2 = await app.request('/api/generate', { method: 'POST', headers, body: payload }, env);
    expect(res2.status).toBe(200);

    // 3rd request -> 200 OK
    const res3 = await app.request('/api/generate', { method: 'POST', headers, body: payload }, env);
    expect(res3.status).toBe(200);

    // 4th request from same IP -> 429 RATE_LIMIT_EXCEEDED
    const res4 = await app.request('/api/generate', { method: 'POST', headers, body: payload }, env);
    expect(res4.status).toBe(429);
    const body4 = await res4.json();
    expect(body4).toMatchObject({
      success: false,
      errorCode: 'RATE_LIMIT_EXCEEDED'
    });
  });

  it('should allow a different IP even if another IP reached the hourly limit', async () => {
    const app = createApp(mockFalService, { ipHourlyCap: 3, ipDailyCap: 5 });
    const env = createTestEnv();
    const payload = JSON.stringify({ styleKey: 'detective' });

    // IP 1 uses up its 3 requests
    for (let i = 0; i < 3; i++) {
      await app.request(
        '/api/generate',
        { method: 'POST', headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '1.1.1.1' }, body: payload },
        env
      );
    }
    const ip1Blocked = await app.request(
      '/api/generate',
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '1.1.1.1' }, body: payload },
      env
    );
    expect(ip1Blocked.status).toBe(429);

    // IP 2 makes request -> should succeed (200 OK)
    const ip2Res = await app.request(
      '/api/generate',
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '2.2.2.2' }, body: payload },
      env
    );
    expect(ip2Res.status).toBe(200);
  });

  it('should trigger global FinOps $45 hard circuit breaker when daily calls reach 1500', async () => {
    const app = createApp(mockFalService);
    const env = createTestEnv();
    const dateStr = new Date().toISOString().slice(0, 10);

    // Pre-set daily count to 1500 (Hard budget cap reached)
    mockKv.setRaw(`finops:daily:${dateStr}`, '1500');

    const res = await app.request(
      '/api/generate',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '9.9.9.9' },
        body: JSON.stringify({ styleKey: 'street' })
      },
      env
    );

    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data).toMatchObject({
      success: false,
      errorCode: 'FINOPS_CAP_REACHED',
      message: "Today's Haute Couture fitting quota has been fully claimed. Please come back tomorrow at 00:00 UTC!"
    });
  });

  it('should block 6th daily request from an IP even if distributed across hours', async () => {
    const app = createApp(mockFalService, { ipHourlyCap: 10, ipDailyCap: 5 });
    const env = createTestEnv();
    const dateStr = new Date().toISOString().slice(0, 10);
    const ip = '198.51.100.5';

    // Simulate IP has reached daily 5 requests
    mockKv.setRaw(`ratelimit:ip:${ip}:${dateStr}`, '5');

    const res = await app.request(
      '/api/generate',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': ip },
        body: JSON.stringify({ styleKey: 'warm' })
      },
      env
    );

    expect(res.status).toBe(429);
    const data = (await res.json()) as any;
    expect(data.errorCode).toBe('RATE_LIMIT_EXCEEDED');
  });

  it('should bypass single IP hourly/daily rate limit when x-test-bypass header is present', async () => {
    const app = createApp(mockFalService, { ipHourlyCap: 3, ipDailyCap: 5 });
    const env = createTestEnv();
    const payload = JSON.stringify({ styleKey: 'gentle' });
    const headers = {
      'Content-Type': 'application/json',
      'cf-connecting-ip': '203.0.113.10',
      'x-test-bypass': '1'
    };

    // Even on 4th, 5th, 6th requests with bypass, it should be 200 OK
    for (let i = 0; i < 6; i++) {
      const res = await app.request('/api/generate', { method: 'POST', headers, body: payload }, env);
      expect(res.status).toBe(200);
    }
  });
});
