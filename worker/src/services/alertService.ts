/**
 * Enterprise WeChat (企业微信) Webhook Intelligent Alert Service
 * Handles AI failure root-cause analysis, failover notifications, and quota alerts
 */

export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface AlertContext {
  environment?: string;
  traceId?: string;
  clientIp?: string;
  petName?: string;
  styleKey?: string;
  templateId?: string;
  primaryProvider?: string;
  secondaryProvider?: string;
  errorMessage?: string;
  durationMs?: number;
  timeoutMs?: number;
}

export type FailureCategory =
  | 'INSUFFICIENT_BALANCE'
  | 'TIMEOUT_EXCEEDED'
  | 'AUTH_FAILED'
  | 'UPSTREAM_5XX'
  | 'NSFW_VIOLATION'
  | 'UNKNOWN_ERROR';

export interface ClassifiedFailure {
  category: FailureCategory;
  labelZh: string;
  tag: string;
  description: string;
}

/**
 * Classify error message into root causes (insufficient quota, timeout, 5xx, auth, NSFW/safety violation)
 */
export function classifyFailureReason(rawMessage: string = '', timeoutMs?: number): ClassifiedFailure {
  const lower = rawMessage.toLowerCase();

  // 1. Quota / Balance Exhaustion
  if (
    lower.includes('top_up') ||
    lower.includes('balance') ||
    lower.includes('insufficient') ||
    lower.includes('quota') ||
    lower.includes('credit') ||
    lower.includes('arrears') ||
    lower.includes('payment required') ||
    lower.includes('locked')
  ) {
    return {
      category: 'INSUFFICIENT_BALANCE',
      labelZh: '账户欠费 / 额度耗尽',
      tag: '[INSUFFICIENT_BALANCE]',
      description: '大模型平台账户余额不足或已被官方锁定，急需充值以恢复正常生图！'
    };
  }

  // 2. Network Timeout
  if (
    lower.includes('timeout') ||
    lower.includes('abort') ||
    lower.includes('timed out') ||
    lower.includes('deadline exceeded')
  ) {
    // 优先采用传入的真实 timeoutMs，其次从报错信息自动提取 (如 "15000ms" / "60s")
    let detectedSec: number | null = timeoutMs && timeoutMs > 0 ? Math.round(timeoutMs / 1000) : null;
    if (!detectedSec) {
      const msMatch = rawMessage.match(/(\d+)\s*ms/i);
      if (msMatch) {
        detectedSec = Math.round(parseInt(msMatch[1], 10) / 1000);
      } else {
        const sMatch = rawMessage.match(/(\d+)\s*s(?:ec)?(?:onds?)?/i);
        if (sMatch) {
          detectedSec = parseInt(sMatch[1], 10);
        }
      }
    }

    const secLabel = detectedSec ? `${detectedSec}s 截断` : '硬阈值熔断';
    const secDesc = detectedSec ? `超过 ${detectedSec} 秒硬阈值` : '超过系统设定的硬阈值';

    return {
      category: 'TIMEOUT_EXCEEDED',
      labelZh: `网络请求超时 (${secLabel})`,
      tag: '[TIMEOUT_EXCEEDED]',
      description: `大模型服务商推理耗时${secDesc}，系统已主动熔断并触发保护。`
    };
  }

  // 3. Content Safety / NSFW violation
  if (
    lower.includes('nsfw') ||
    lower.includes('safety') ||
    lower.includes('sensitive') ||
    lower.includes('content moderation') ||
    lower.includes('inappropriate') ||
    lower.includes('violation') ||
    lower.includes('policy')
  ) {
    return {
      category: 'NSFW_VIOLATION',
      labelZh: '内容安全拦截 / 触发风控',
      tag: '[NSFW_VIOLATION]',
      description: '上传图片或请求触发服务商多模态内容安全审查 (NSFW/合规风控)，已优雅降级至标杆样片。'
    };
  }

  // 4. Authentication / Key failure
  if (
    lower.includes('unauthorized') ||
    lower.includes('401') ||
    lower.includes('invalid api key') ||
    lower.includes('invalid key') ||
    lower.includes('forbidden')
  ) {
    return {
      category: 'AUTH_FAILED',
      labelZh: '鉴权失败 / API Key 无效',
      tag: '[AUTH_FAILED]',
      description: '调用的 API Key 无效或未授权，请检查 Cloudflare Workers Secrets 配置。'
    };
  }

  // 5. Upstream Server Error
  if (
    lower.includes('500') ||
    lower.includes('502') ||
    lower.includes('503') ||
    lower.includes('504') ||
    lower.includes('internal server error') ||
    lower.includes('service unavailable') ||
    lower.includes('bad gateway')
  ) {
    return {
      category: 'UPSTREAM_5XX',
      labelZh: '服务商集群异常 (5xx)',
      tag: '[UPSTREAM_5XX]',
      description: '上游服务商底层集群故障或过载排队，已自动触发多云容灾转移。'
    };
  }

  // 6. Unknown
  return {
    category: 'UNKNOWN_ERROR',
    labelZh: '未分类异常',
    tag: '[UNKNOWN_ERROR]',
    description: '发生未预期错误，请参考详细报错日志。'
  };
}

export class AlertService {
  private recentAlertTimestamps: Map<string, number> = new Map();
  private defaultDebounceMs: number;

  /**
   * @param defaultDebounceMs Default debounce window in milliseconds (default: 5 minutes = 300,000ms)
   */
  constructor(defaultDebounceMs: number = 5 * 60 * 1000) {
    this.defaultDebounceMs = defaultDebounceMs;
  }

  /**
   * Resets internal debounce tracking (useful in unit tests or manual reset)
   */
  clearDebounceHistory(): void {
    this.recentAlertTimestamps.clear();
  }

  /**
   * Directly sends a Markdown formatted message to Enterprise WeChat Webhook
   */
  async sendMarkdown(webhookUrl: string | undefined, markdownContent: string): Promise<boolean> {
    if (!webhookUrl || !webhookUrl.startsWith('http')) {
      console.warn('[AlertService] WeChat Webhook URL not configured. Markdown message skipped.');
      return false;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          msgtype: 'markdown',
          markdown: {
            content: markdownContent
          }
        })
      });

      if (!response.ok) {
        const resText = await response.text().catch(() => '');
        console.error(`[AlertService] Failed to send WeChat Webhook: ${response.status} ${resText}`);
        return false;
      }

      return true;
    } catch (err) {
      console.error('[AlertService] Error sending WeChat markdown message:', err);
      return false;
    }
  }

  /**
   * Dispatches an Enterprise WeChat Webhook alert message asynchronously
   * Protected with 5-minute anti-storm debouncing per failure category (strictly NO emojis)
   */
  async sendWeChatAlert(
    webhookUrl: string | undefined,
    title: string,
    context: AlertContext,
    severity: AlertSeverity = 'WARNING',
    options?: { bypassDebounce?: boolean; customDebounceMs?: number }
  ): Promise<boolean> {
    if (!webhookUrl || !webhookUrl.startsWith('http')) {
      console.warn(`[AlertService] WeChat Webhook URL not configured. Alert skipped: [${title}]`);
      return false;
    }

    const classification = classifyFailureReason(context.errorMessage || '', context.timeoutMs);
    const provider = context.primaryProvider || 'default';
    const debounceKey = `${classification.category}:${provider}`;

    // 1. Anti-Alert-Storm Suppression Check
    const now = Date.now();
    const debounceMs = options?.customDebounceMs ?? this.defaultDebounceMs;

    if (!options?.bypassDebounce && debounceMs > 0) {
      const lastSent = this.recentAlertTimestamps.get(debounceKey);
      if (lastSent && now - lastSent < debounceMs) {
        const remainingSec = Math.ceil((debounceMs - (now - lastSent)) / 1000);
        console.warn(
          `[AlertService] Alert storm suppressed for [${debounceKey}]. Next alert allowed in ${remainingSec}s.`
        );
        return false;
      }
    }

    const timestampStr = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    const envTag = context.environment || 'production';

    const colorTag = severity === 'CRITICAL' ? 'warning' : 'comment';

    const markdownContent = `### [ViviBon Cover 运维告警] ${title}
> **环境**: \`${envTag}\`
> **时间**: ${timestampStr} (CST)
> **追踪 ID**: \`${context.traceId || 'N/A'}\`
> **客户端 IP**: \`${context.clientIp || '127.0.0.1'}\`

**故障诊断**:
- **故障类型**: <font color="${colorTag}">${classification.labelZh}</font> \`${classification.tag}\`
- **业务影响**: ${classification.description}
- **主选模型**: \`${context.primaryProvider || 'Primary'}\`
- **备选模型**: \`${context.secondaryProvider || 'Secondary'}\`
- **造型模板**: \`${context.styleKey || 'N/A'}\` / \`${context.templateId || 'N/A'}\`
- **接口耗时**: \`${context.durationMs ?? 0}ms\`

> **详细报错报文**:
> \`${(context.errorMessage || 'Unknown').slice(0, 300)}\`

> *已启用 5 分钟同类告警防风暴静默机制，避免高频刷屏*
`;

    const success = await this.sendMarkdown(webhookUrl, markdownContent);
    if (success) {
      // Record successful alert time for debouncing suppression
      this.recentAlertTimestamps.set(debounceKey, now);
    }
    return success;
  }
}

export const alertService = new AlertService();

