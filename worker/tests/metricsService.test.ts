import { describe, it, expect, vi } from 'vitest';
import { metricsService, getBeijingDateString, DailyMetrics } from '../src/services/metricsService';
import { createApp } from '../src/index';

class MockKV {
  private store = new Map<string, string>();

  async get(key: string, type?: string) {
    const val = this.store.get(key);
    if (!val) return null;
    if (type === 'json') {
      try {
        return JSON.parse(val);
      } catch {
        return null;
      }
    }
    return val;
  }

  async put(key: string, value: string) {
    this.store.set(key, value);
  }
}

describe('MetricsService & Daily Operations Report', () => {
  it('should format date correctly in Beijing CST', () => {
    const dateStr = getBeijingDateString();
    expect(dateStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should record generations and calculate unique IPs and style breakdown', async () => {
    const mockKv = new MockKV() as any;

    // 1. Record generation for user 1 (real upload, gentle style)
    await metricsService.recordGeneration(mockKv, {
      clientIp: '1.2.3.4',
      styleKey: 'fine_art',
      isRealUpload: true
    });

    // 2. Record generation for user 1 again (preset, aviator style)
    await metricsService.recordGeneration(mockKv, {
      clientIp: '1.2.3.4',
      styleKey: 'cool_black',
      isRealUpload: false
    });

    // 3. Record generation for user 2 (real upload, gentle style, fallback triggered)
    await metricsService.recordGeneration(mockKv, {
      clientIp: '5.6.7.8',
      styleKey: 'fine_art',
      isRealUpload: true,
      isFallback: true,
      hasError: true
    });

    const summary = await metricsService.getDailySummary(mockKv);
    expect(summary.totalGenerations).toBe(3);
    expect(summary.realUploads).toBe(2);
    expect(summary.presetViews).toBe(1);
    expect(summary.uniqueIps).toBe(2); // 2 distinct IPs
    expect(summary.styleCounts['fine_art']).toBe(2);
    expect(summary.styleCounts['cool_black']).toBe(1);
    expect(summary.failoverCount).toBe(1);
    expect(summary.upstreamErrors).toBe(1);
  });

  it('should record bot blocked events in daily metrics', async () => {
    const mockKv = new MockKV() as any;

    await metricsService.recordBotBlocked(mockKv);
    await metricsService.recordBotBlocked(mockKv);

    const summary = await metricsService.getDailySummary(mockKv);
    expect(summary.botBlocked).toBe(2);
  });

  it('should format daily report markdown with strictly ZERO emojis', () => {
    const sampleMetrics: DailyMetrics = {
      date: '2026-09-09',
      totalGenerations: 100,
      realUploads: 65,
      presetViews: 35,
      styleCounts: {
        fine_art: 45,
        cool_black: 30,
        street_style: 15,
        cozy_warm: 10
      },
      failoverCount: 2,
      upstreamErrors: 1,
      botBlocked: 8,
      uniqueIps: 40
    };

    const markdown = metricsService.formatDailyReportMarkdown(sampleMetrics, 'production');

    // 1. Structure Assertions
    expect(markdown).toContain('### [ViviBon Cover] 每日运营与增长战报');
    expect(markdown).toContain('一、 核心业务与转化漏斗');
    expect(markdown).toContain('二、 爆款风格偏好分布');
    expect(markdown).toContain('三、 财务与算力精细化核算 (FinOps)');
    expect(markdown).toContain('四、 系统可用性与安全防御');

    // 2. Calculation Assertions
    expect(markdown).toContain('独立创作者 (UV): 40 人');
    expect(markdown).toContain('总生成大片数: 100 次 (人均 2.5 次)');
    expect(markdown).toContain('真实爱宠上传率: 65.0% (65 次真图重绘)');
    expect(markdown).toContain('预置模特浏览数: 35 次');
    expect(markdown).toContain('名绅晚宴 (Gentle Evening): 45 次 (45.0%)');
    expect(markdown).toContain('今日大模型实销金额: ￥13.00'); // 65 * 0.20
    expect(markdown).toContain('预置资产节省算力: ￥7.00'); // 35 * 0.20
    expect(markdown).toContain('服务可用率 (SLA): 99.0%');
    expect(markdown).toContain('恶意爬虫与脚本拦截: 8 次');

    // 3. ZERO EMOJI Assertion (Strict Unicode Range Regex)
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;
    expect(markdown).not.toMatch(emojiRegex);
  });

  it('should expose /api/internal/daily-report endpoint with summary and formatted markdown', async () => {
    const mockKv = new MockKV() as any;
    await metricsService.recordGeneration(mockKv, {
      clientIp: '10.0.0.1',
      styleKey: 'fine_art',
      isRealUpload: true
    });

    const app = createApp();
    const req = new Request('http://localhost/api/internal/daily-report', {
      method: 'GET'
    });

    const res = await app.fetch(req, {
      RATE_LIMIT_KV: mockKv,
      ENVIRONMENT: 'staging'
    } as any);

    expect(res.status).toBe(200);
    const json = (await res.json()) as any;
    expect(json.success).toBe(true);
    expect(json.data.summary.totalGenerations).toBe(1);
    expect(json.data.markdown).toContain('### [ViviBon Cover] 每日运营与增长战报');
    expect(json.data.markdown).not.toMatch(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u);
  });
});
