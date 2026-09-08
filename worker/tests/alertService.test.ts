import { describe, it, expect, vi } from 'vitest';
import { classifyFailureReason, AlertService } from '../src/services/alertService';

describe('AlertService & Enterprise WeChat Failure Classification', () => {
  it('should accurately classify Fal.ai account lock as INSUFFICIENT_BALANCE', () => {
    const res = classifyFailureReason('403 Forbidden {"detail":"User is locked. Reason: TOP_UP."}');
    expect(res.category).toBe('INSUFFICIENT_BALANCE');
    expect(res.labelZh).toContain('账户欠费');
    expect(res.icon).toBe('🔴');
  });

  it('should accurately classify timeout as TIMEOUT_EXCEEDED', () => {
    const res = classifyFailureReason('The operation was aborted (timeout 15000ms)');
    expect(res.category).toBe('TIMEOUT_EXCEEDED');
    expect(res.labelZh).toContain('超时');
    expect(res.icon).toBe('⏱️');
  });

  it('should accurately classify 503 error as UPSTREAM_5XX', () => {
    const res = classifyFailureReason('SiliconFlow upstream error: 503 Service Unavailable');
    expect(res.category).toBe('UPSTREAM_5XX');
    expect(res.labelZh).toContain('5xx');
    expect(res.icon).toBe('⚠️');
  });

  it('should accurately classify 401 as AUTH_FAILED', () => {
    const res = classifyFailureReason('Fal.ai error: 401 Unauthorized invalid key');
    expect(res.category).toBe('AUTH_FAILED');
    expect(res.labelZh).toContain('鉴权失败');
    expect(res.icon).toBe('🔑');
  });

  it('should gracefully skip when webhookUrl is undefined without throwing', async () => {
    const service = new AlertService();
    const sent = await service.sendWeChatAlert(undefined, 'Test Title', { errorMessage: 'test error' });
    expect(sent).toBe(false);
  });

  it('should send formatted markdown payload to webhookUrl when provided', async () => {
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

