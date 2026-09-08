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
  icon: string;
  description: string;
}

/**
 * Classify error message into root causes (insufficient quota, timeout, 5xx, auth, NSFW/safety violation)
 */
export function classifyFailureReason(rawMessage: string = ''): ClassifiedFailure {
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
      icon: '🔴',
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
    return {
      category: 'TIMEOUT_EXCEEDED',
      labelZh: '网络请求超时 (15s 截断)',
      icon: '⏱️',
      description: '大模型服务商推理耗时超过 15 秒硬阈值，系统已主动熔断并触发保护。'
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
      icon: '🛡️',
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
      icon: '🔑',
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
      icon: '⚠️',
      description: '上游服务商底层集群故障或过载排队，已自动触发多云容灾转移。'
    };
  }

  // 6. Unknown
  return {
    category: 'UNKNOWN_ERROR',
    labelZh: '未分类异常',
    icon: '❓',
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
   * Dispatches an Enterprise WeChat Webhook alert message asynchronously
   * Protected with 5-minute anti-storm debouncing per failure category
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

    const classification = classifyFailureReason(context.errorMessage || '');
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

    const markdownContent = `### ${classification.icon} ViviBon Cover 运维告警 · ${title}
> **环境**: \`${envTag}\`
> **时间**: ${timestampStr} (北京时间)
> **追踪 ID**: \`${context.traceId || 'N/A'}\`
> **客户端 IP**: \`${context.clientIp || '127.0.0.1'}\`

**故障诊断分析**:
- **故障类型**: <font color="${colorTag}">${classification.labelZh}</font>
- **业务影响**: ${classification.description}
- **主选模型**: \`${context.primaryProvider || 'Primary'}\`
- **备选模型**: \`${context.secondaryProvider || 'Secondary'}\`
- **造型模板**: \`${context.styleKey || 'N/A'}\` / \`${context.templateId || 'N/A'}\`
- **接口耗时**: \`${context.durationMs ?? 0}ms\`

> **详细报错报文**:
> \`${(context.errorMessage || 'Unknown').slice(0, 300)}\`

> ℹ️ *已启用 5 分钟同类告警防风暴静默机制，避免高频刷屏*
`;

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

      // Record successful alert time for debouncing suppression
      this.recentAlertTimestamps.set(debounceKey, now);
      return true;
    } catch (err) {
      console.error('[AlertService] Error sending WeChat alert:', err);
      return false;
    }
  }
}

export const alertService = new AlertService();
