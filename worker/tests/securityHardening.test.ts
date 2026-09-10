import { describe, it, expect, beforeEach } from 'vitest';
import { createApp } from '../src/index';
import { MockKVNamespace } from './helpers/mockKv';
import { FalService } from '../src/services/falService';

describe('Security Hardening & Anti-Script Attack Defense Matrix', () => {
  let mockKv: MockKVNamespace;
  let mockFalService: FalService;

  beforeEach(() => {
    mockKv = new MockKVNamespace();
    mockFalService = new FalService(async () => ({
      jobId: 'sec_test_job_888',
      imageUrl: 'https://cdn.vivibon.com/sec_sample.png'
    }));
  });

  const createTestEnv = (extra: Record<string, any> = {}) => ({
    RATE_LIMIT_KV: mockKv as unknown as KVNamespace,
    FAL_KEY: 'test_key',
    ENVIRONMENT: 'production', // Test production security behaviors
    ADMIN_BYPASS_KEY: 'super_secret_admin_token_2026',
    ...extra
  });

  const validHeaders = (ip: string, extra: Record<string, string> = {}) => ({
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
    'cf-connecting-ip': ip,
    'Origin': 'https://vivibon-cover.pages.dev',
    ...extra
  });

  it('should block cross-origin requests from unauthorized origin with 403 FORBIDDEN_ORIGIN', async () => {
    const app = createApp(mockFalService);
    const env = createTestEnv();

    const res = await app.request(
      '/api/generate',
      {
        method: 'POST',
        headers: validHeaders('203.0.113.50', {
          'Origin': 'https://malicious-phishing-site.com'
        }),
        body: JSON.stringify({ styleKey: 'fine_art' })
      },
      env
    );

    expect(res.status).toBe(403);
    const body = (await res.json()) as any;
    expect(body).toMatchObject({
      success: false,
      errorCode: 'FORBIDDEN_ORIGIN'
    });
  });

  it('should allow legitimate Cloudflare Pages origins and preview deployments', async () => {
    const app = createApp(mockFalService);
    const env = createTestEnv();

    // 1. Production apex Pages domain
    const res1 = await app.request(
      '/api/generate',
      {
        method: 'POST',
        headers: validHeaders('203.0.113.51', {
          'Origin': 'https://vivibon-cover.pages.dev'
        }),
        body: JSON.stringify({ styleKey: 'corporate' })
      },
      env
    );
    expect(res1.status).toBe(200);

    // 2. Preview branch deployment subdomain
    const res2 = await app.request(
      '/api/generate',
      {
        method: 'POST',
        headers: validHeaders('203.0.113.52', {
          'Origin': 'https://preview-deploy-123.vivibon-cover.pages.dev'
        }),
        body: JSON.stringify({ styleKey: 'celebration' })
      },
      env
    );
    expect(res2.status).toBe(200);
  });

  it('should block replay attack when identical nonce is reused within expiration window', async () => {
    const app = createApp(mockFalService);
    const env = createTestEnv();
    const nonce = 'unique_nonce_abc_12345';
    const timestamp = Date.now().toString();

    const headers = validHeaders('203.0.113.60', {
      'x-request-nonce': nonce,
      'x-request-timestamp': timestamp
    });

    // First request with nonce -> 200 OK
    const res1 = await app.request(
      '/api/generate',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ styleKey: 'cosplay' })
      },
      env
    );
    expect(res1.status).toBe(200);

    // Second request with SAME nonce -> 403 REPLAY_ATTACK_DETECTED
    const res2 = await app.request(
      '/api/generate',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ styleKey: 'cosplay' })
      },
      env
    );
    expect(res2.status).toBe(403);
    const body2 = (await res2.json()) as any;
    expect(body2).toMatchObject({
      success: false,
      errorCode: 'REPLAY_ATTACK_DETECTED'
    });
  });

  it('should block expired request timestamps older than 60 seconds', async () => {
    const app = createApp(mockFalService);
    const env = createTestEnv();
    const expiredTimestamp = (Date.now() - 65000).toString(); // 65 seconds ago

    const res = await app.request(
      '/api/generate',
      {
        method: 'POST',
        headers: validHeaders('203.0.113.70', {
          'x-request-timestamp': expiredTimestamp,
          'x-request-nonce': 'nonce_timestamp_test_888'
        }),
        body: JSON.stringify({ styleKey: 'fine_art' })
      },
      env
    );

    expect(res.status).toBe(403);
    const body = (await res.json()) as any;
    expect(body).toMatchObject({
      success: false,
      errorCode: 'REQUEST_EXPIRED'
    });
  });

  it('should NOT allow public query test_bypass=1 to bypass rate limiting (backdoor closed)', async () => {
    const app = createApp(mockFalService, { ipHourlyCap: 2 });
    const env = createTestEnv();
    const ip = '203.0.113.80';

    const headers = validHeaders(ip);
    const body = JSON.stringify({ styleKey: 'corporate' });

    // Request 1 -> 200
    const res1 = await app.request('/api/generate', { method: 'POST', headers, body }, env);
    expect(res1.status).toBe(200);

    // Request 2 -> 200
    const res2 = await app.request('/api/generate', { method: 'POST', headers, body }, env);
    expect(res2.status).toBe(200);

    // Request 3 with ?test_bypass=1 in query -> MUST BE BLOCKED WITH 429!
    const res3 = await app.request(
      '/api/generate?test_bypass=1&debug=1',
      { method: 'POST', headers, body },
      env
    );
    expect(res3.status).toBe(429);
    const body3 = (await res3.json()) as any;
    expect(body3.errorCode).toBe('RATE_LIMIT_EXCEEDED');
  });

  it('should allow authentic admin bypass key to legitimately bypass rate limiting', async () => {
    const app = createApp(mockFalService, { ipHourlyCap: 2 });
    const env = createTestEnv();
    const ip = '203.0.113.90';

    const headers = validHeaders(ip);
    const body = JSON.stringify({ styleKey: 'corporate' });

    // Exhaust cap
    await app.request('/api/generate', { method: 'POST', headers, body }, env);
    await app.request('/api/generate', { method: 'POST', headers, body }, env);

    // Request with valid ADMIN_BYPASS_KEY header
    const adminHeaders = validHeaders(ip, {
      'x-admin-bypass-key': 'super_secret_admin_token_2026'
    });
    const res = await app.request('/api/generate', { method: 'POST', headers: adminHeaders, body }, env);
    expect(res.status).toBe(200);
  });
});
