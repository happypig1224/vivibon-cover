/**
 * ViviBon Cover · Operational Metrics & Daily Executive Report Service
 * Lightweight, non-blocking metrics aggregation via Cloudflare KV
 * Strictly NO emojis (Corporate Engineering & Financial Standard)
 */

export interface DailyMetrics {
  date: string; // YYYY-MM-DD (CST)
  totalGenerations: number;
  realUploads: number;
  presetViews: number;
  styleCounts: Record<string, number>;
  failoverCount: number;
  upstreamErrors: number;
  botBlocked: number;
  uniqueIps: number;
}

export function getBeijingDateString(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai' }).format(date);
}

const STYLE_NAMES: Record<string, string> = {
  fine_art: '名绅晚宴 (Gentle Evening)',
  gentle: '名绅晚宴 (Gentle Evening)',
  cool_black: '黑超先锋 (Aviator Pioneer)',
  aviator: '黑超先锋 (Aviator Pioneer)',
  street_style: '旷野机能 (Wilderness Outdoor)',
  wilderness: '旷野机能 (Wilderness Outdoor)',
  cozy_warm: '温暖手工 (Artisan Wool)',
  artisan: '温暖手工 (Artisan Wool)'
};

function parseMetrics(raw: unknown, dateStr: string): DailyMetrics {
  const defaultMetrics: DailyMetrics = {
    date: dateStr,
    totalGenerations: 0,
    realUploads: 0,
    presetViews: 0,
    styleCounts: {},
    failoverCount: 0,
    upstreamErrors: 0,
    botBlocked: 0,
    uniqueIps: 0
  };

  if (!raw) return defaultMetrics;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return { ...defaultMetrics, ...parsed, styleCounts: { ...parsed.styleCounts } };
    } catch {
      return defaultMetrics;
    }
  }
  if (typeof raw === 'object') {
    const obj = raw as Record<string, any>;
    return { ...defaultMetrics, ...obj, styleCounts: { ...obj.styleCounts } };
  }
  return defaultMetrics;
}

export class MetricsService {
  /**
   * Records a generation event asynchronously into Cloudflare KV
   */
  async recordGeneration(
    kv: KVNamespace | undefined,
    params: {
      clientIp?: string;
      styleKey: string;
      isRealUpload: boolean;
      isFallback?: boolean;
      hasError?: boolean;
    }
  ): Promise<void> {
    if (!kv) return;

    const dateStr = getBeijingDateString();
    const metricsKey = `metrics_summary:${dateStr}`;

    try {
      let isNewIp = false;
      if (params.clientIp) {
        const ipKey = `metrics_ip:${dateStr}:${params.clientIp}`;
        const existing = await kv.get(ipKey);
        if (!existing) {
          isNewIp = true;
          await kv.put(ipKey, '1', { expirationTtl: 86400 * 2 });
        }
      }

      const raw = await kv.get(metricsKey, 'json');
      const metrics = parseMetrics(raw, dateStr);

      metrics.totalGenerations += 1;
      if (params.isRealUpload) {
        metrics.realUploads += 1;
      } else {
        metrics.presetViews += 1;
      }

      const sKey = params.styleKey || 'unknown';
      metrics.styleCounts[sKey] = (metrics.styleCounts[sKey] || 0) + 1;

      if (params.isFallback) {
        metrics.failoverCount += 1;
      }
      if (params.hasError) {
        metrics.upstreamErrors += 1;
      }
      if (isNewIp) {
        metrics.uniqueIps += 1;
      }

      await kv.put(metricsKey, JSON.stringify(metrics), { expirationTtl: 86400 * 30 });
    } catch (err) {
      console.error('[MetricsService] Failed to record generation metric:', err);
    }
  }

  /**
   * Records a blocked bot/crawler attempt asynchronously
   */
  async recordBotBlocked(kv: KVNamespace | undefined): Promise<void> {
    if (!kv) return;

    const dateStr = getBeijingDateString();
    const metricsKey = `metrics_summary:${dateStr}`;

    try {
      const raw = await kv.get(metricsKey, 'json');
      const metrics = parseMetrics(raw, dateStr);

      metrics.botBlocked += 1;
      await kv.put(metricsKey, JSON.stringify(metrics), { expirationTtl: 86400 * 30 });
    } catch (err) {
      console.error('[MetricsService] Failed to record bot blocked metric:', err);
    }
  }

  /**
   * Retrieves summary for a specific date
   */
  async getDailySummary(kv: KVNamespace | undefined, dateStr?: string): Promise<DailyMetrics> {
    const targetDate = dateStr || getBeijingDateString();
    if (!kv) {
      return parseMetrics(null, targetDate);
    }

    try {
      const raw = await kv.get(`metrics_summary:${targetDate}`, 'json');
      return parseMetrics(raw, targetDate);
    } catch (err) {
      console.error('[MetricsService] Error getting daily summary:', err);
      return parseMetrics(null, targetDate);
    }
  }


  /**
   * Formats the daily summary into an executive-grade, pure Markdown report without any emojis
   */
  formatDailyReportMarkdown(metrics: DailyMetrics, environment: string = 'production'): string {
    const total = metrics.totalGenerations;
    const realUploadRate = total > 0 ? ((metrics.realUploads / total) * 100).toFixed(1) : '0.0';
    const avgPerUser = metrics.uniqueIps > 0 ? (total / metrics.uniqueIps).toFixed(1) : '0.0';

    // FinOps Cost Estimations (Qwen/Qwen-Image-Edit approx ¥0.20 per invocation)
    const costPerCall = 0.2;
    const totalCost = (metrics.realUploads * costPerCall).toFixed(2);
    const savingsCost = (metrics.presetViews * costPerCall).toFixed(2);
    const costPerUv = metrics.uniqueIps > 0 ? ((metrics.realUploads * costPerCall) / metrics.uniqueIps).toFixed(2) : '0.00';

    // SLA Calculation
    const effectiveTotal = total > 0 ? total : 1;
    const slaRate = total > 0 ? (((total - metrics.upstreamErrors) / effectiveTotal) * 100).toFixed(1) : '100.0';

    // Sort style breakdown
    const sortedStyles = Object.entries(metrics.styleCounts).sort((a, b) => b[1] - a[1]);
    let styleListText = '';
    if (sortedStyles.length === 0) {
      styleListText = '- 暂无生成数据';
    } else {
      styleListText = sortedStyles
        .map(([key, count], index) => {
          const name = STYLE_NAMES[key] || key;
          const pct = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0';
          return `${index + 1}. ${name}: ${count} 次 (${pct}%)`;
        })
        .join('\n');
    }

    return `### [ViviBon Cover] 每日运营与增长战报
> 统计周期: ${metrics.date} (截至 22:00 CST)
> 运行环境: Cloudflare Edge Cluster (${environment})

---
**一、 核心业务与转化漏斗**
- 独立创作者 (UV): ${metrics.uniqueIps} 人
- 总生成大片数: ${metrics.totalGenerations} 次 (人均 ${avgPerUser} 次)
- 真实爱宠上传率: ${realUploadRate}% (${metrics.realUploads} 次真图重绘)
- 预置模特浏览数: ${metrics.presetViews} 次

**二、 爆款风格偏好分布**
${styleListText}

**三、 财务与算力精细化核算 (FinOps)**
- 硅基流动实际调用: ${metrics.realUploads} 次
- 今日大模型实销金额: ￥${totalCost}
- 预置资产节省算力: ￥${savingsCost} (${metrics.presetViews} 次命中)
- 单客获客算力成本: ￥${costPerUv} / 人

**四、 系统可用性与安全防御**
- 服务可用率 (SLA): ${slaRate}%
- 上游超时/故障降级: ${metrics.failoverCount} 次
- 恶意爬虫与脚本拦截: ${metrics.botBlocked} 次
`;
  }
}

export const metricsService = new MetricsService();
