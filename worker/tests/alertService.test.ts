import { describe, it, expect, vi } from 'vitest';
import { classifyFailureReason, AlertService } from '../src/services/alertService';

describe('AlertService & Enterprise WeChat Failure Classification', () => {
  it('should accurately classify Fal.ai account lock as INSUFFICIENT_BALANCE with no emojis', () => {
    const res = classifyFailureReason('403 Forbidden {"detail":"User is locked. Reason: TOP_UP."}');
    expect(res.category).toBe('INSUFFICIENT_BALANCE');
    expect(res.labelZh).toContain('账户欠费');
    expect(res.tag).toBe('[INSUFFICIENT_BALANCE]');
    expect(res.tag).not.toMatch(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u);
  });

  it('should accurately classify timeout as TIMEOUT_EXCEEDED with dynamic duration and no emojis', () => {
    // 1. Detected from message: 15000ms -> 15s
    const res1 = classifyFailureReason('The operation was aborted (timeout 15000ms)');
    expect(res1.category).toBe('TIMEOUT_EXCEEDED');
    expect(res1.labelZh).toBe('网络请求超时 (15s 截断)');
    expect(res1.description).toContain('超过 15 秒硬阈值');
    expect(res1.tag).toBe('[TIMEOUT_EXCEEDED]');
    expect(res1.tag).not.toMatch(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u);

    // 2. Explicitly passed timeoutMs: 60000 -> 60s
    const res2 = classifyFailureReason('The operation was aborted', 60000);
    expect(res2.category).toBe('TIMEOUT_EXCEEDED');
    expect(res2.labelZh).toBe('网络请求超时 (60s 截断)');
    expect(res2.description).toContain('超过 60 秒硬阈值');

    // 3. Fallback without specific duration
    const res3 = classifyFailureReason('The operation was aborted');
    expect(res3.category).toBe('TIMEOUT_EXCEEDED');
    expect(res3.labelZh).toBe('网络请求超时 (硬阈值熔断)');
    expect(res3.description).toContain('超过系统设定的硬阈值');
  });

  it('should accurately classify 503 error as UPSTREAM_5XX with no emojis', () => {
    const res = classifyFailureReason('SiliconFlow upstream error: 503 Service Unavailable');
    expect(res.category).toBe('UPSTREAM_5XX');
    expect(res.labelZh).toContain('5xx');
    expect(res.tag).toBe('[UPSTREAM_5XX]');
    expect(res.tag).not.toMatch(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u);
  });

  it('should accurately classify 401 as AUTH_FAILED with no emojis', () => {
    const res = classifyFailureReason('Fal.ai error: 401 Unauthorized invalid key');
    expect(res.category).toBe('AUTH_FAILED');
    expect(res.labelZh).toContain('鉴权失败');
    expect(res.tag).toBe('[AUTH_FAILED]');
    expect(res.tag).not.toMatch(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u);
  });

  it('should gracefully skip when webhookUrl is undefined without throwing', async () => {
    const service = new AlertService();
    const sent = await service.sendWeChatAlert(undefined, 'Test Title', { errorMessage: 'test error' });
    expect(sent).toBe(false);
  });

  it('should send formatted markdown payload to webhookUrl with strictly zero emojis', async () => {
    const service = new AlertService();
    const mockFetch = vi.fn().mockResolvedValue(new Response('{"errcode":0,"errmsg":"ok"}', { status: 200 }));
    vi.stubGlobal('fetch', mockFetch);

    const sent = await service.sendWeChatAlert(
      'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=fake-key',
      '主模型故障告警',
      {
        environment: 'production',
        traceId: 'test-trace-123',
        errorMessage: 'User is locked. Reason: TOP_UP.',
        primaryProvider: 'Fal.ai',
        secondaryProvider: 'SiliconFlow'
      },
      'CRITICAL'
    );

    expect(sent).toBe(true);
    expect(mockFetch).toHaveBeenCalledOnce();
    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(requestBody.msgtype).toBe('markdown');
    expect(requestBody.markdown.content).toContain('账户欠费 / 额度耗尽');
    expect(requestBody.markdown.content).toContain('test-trace-123');
    // Strictly verify NO emojis in alert markdown
    expect(requestBody.markdown.content).not.toMatch(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u);

    vi.unstubAllGlobals();
  });


  it('should suppress duplicate alert within 5-minute debounce window to prevent alert storms', async () => {
    const service = new AlertService(5 * 60 * 1000);
    const mockFetch = vi.fn().mockResolvedValue(new Response('{"errcode":0,"errmsg":"ok"}', { status: 200 }));
    vi.stubGlobal('fetch', mockFetch);

    const webhook = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=fake-key';
    const alertCtx = {
      errorMessage: 'User is locked. Reason: TOP_UP.',
      primaryProvider: 'Fal.ai'
    };

    // First call: succeeds and sends
    const firstSent = await service.sendWeChatAlert(webhook, 'Alert 1', alertCtx);
    expect(firstSent).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Second call with same category & provider within 5 mins: suppressed!
    const secondSent = await service.sendWeChatAlert(webhook, 'Alert 2', alertCtx);
    expect(secondSent).toBe(false);
    expect(mockFetch).toHaveBeenCalledTimes(1); // Still 1! Not called again!

    vi.unstubAllGlobals();
  });

  it('should allow alert for different failure category or provider even within debounce window', async () => {
    const service = new AlertService(5 * 60 * 1000);
    const mockFetch = vi.fn().mockResolvedValue(new Response('{"errcode":0,"errmsg":"ok"}', { status: 200 }));
    vi.stubGlobal('fetch', mockFetch);

    const webhook = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=fake-key';

    // 1. Send INSUFFICIENT_BALANCE
    await service.sendWeChatAlert(webhook, 'Balance Alert', {
      errorMessage: 'User is locked. Reason: TOP_UP.',
      primaryProvider: 'Fal.ai'
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // 2. Send TIMEOUT_EXCEEDED (different category) -> Should be allowed!
    const timeoutSent = await service.sendWeChatAlert(webhook, 'Timeout Alert', {
      errorMessage: 'Request aborted after 15000ms',
      primaryProvider: 'Fal.ai'
    });
    expect(timeoutSent).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(2);

    vi.unstubAllGlobals();
  });

  it('should allow immediate alert when bypassDebounce option is set to true', async () => {
    const service = new AlertService(5 * 60 * 1000);
    const mockFetch = vi.fn().mockResolvedValue(new Response('{"errcode":0,"errmsg":"ok"}', { status: 200 }));
    vi.stubGlobal('fetch', mockFetch);

    const webhook = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=fake-key';
    const alertCtx = {
      errorMessage: 'User is locked. Reason: TOP_UP.',
      primaryProvider: 'Fal.ai'
    };

    // 1st call
    await service.sendWeChatAlert(webhook, 'Alert 1', alertCtx);
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // 2nd call with bypassDebounce: true
    const bypassedSent = await service.sendWeChatAlert(webhook, 'Alert 2', alertCtx, 'CRITICAL', {
      bypassDebounce: true
    });
    expect(bypassedSent).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(2);

    vi.unstubAllGlobals();
  });
});

