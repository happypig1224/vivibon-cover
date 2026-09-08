---
name: edge-finops-sre-guardian
description: >-
  ViviBon Cover dedicated Edge Site Reliability Engineering (SRE), FinOps financial circuit breaker,
  and multi-provider AI gateway reliability guardian.
  Orchestrates Cloudflare Workers edge routing, KV sliding-window rate limiting, multi-rail AI failover 
  (SiliconFlow Qwen-Image-Edit, Fal.ai FLUX.1, Replicate), strict $45/day budget hard-caps, and sub-1.8s self-healing fallbacks.
---

# Edge FinOps & SRE Guardian (边缘云成本守卫与多云容灾专家)

> **Mission**: Ensure ViviBon Cover achieves **99.99% edge availability**, survives viral TikTok traffic spikes without crashing, blocks malicious scraping bots, and **strictly prevents runaway cloud bills**. Enforce mathematical unit economics where infrastructure cost never exceeds the business ceiling.
> **Engineering Heritage**: Based on Cloudflare Workers edge runtime best practices, Google Site Reliability Engineering (SRE) error budgets, and FinOps Foundation financial governance principles.

---

## 1. Multi-Rail AI Provider Failover Matrix

Never depend on a single AI inference vendor. The system dynamically monitors health and routes traffic according to region, latency, and operational cost:

```
                               ┌───────────────────────────┐
                               │  Client Ingress Request   │
                               └─────────────┬─────────────┘
                                             │
                                             ▼
                               ┌───────────────────────────┐
                               │ Cloudflare Workers Edge   │
                               │ Rate Limit & Budget Check │
                               └─────────────┬─────────────┘
                                             │
                      ┌──────────────────────┴──────────────────────┐
                      │                                             │
             [Geo: China / APAC]                           [Geo: US / EU / Global]
                      │                                             │
                      ▼                                             ▼
          ┌───────────────────────┐                     ┌───────────────────────┐
          │  Primary Domestic:    │                     │  Primary Overseas:    │
          │  SiliconFlow Qwen     │                     │  Fal.ai FLUX.1        │
          │  ($0.01 / ~12s)       │                     │  ($0.03 / ~1.8s)      │
          └───────────┬───────────┘                     └───────────┬───────────┘
                      │ (Timeout > 15s or 5xx)                      │ (Timeout > 5s or 5xx)
                      └──────────────────────┬──────────────────────┘
                                             │
                                             ▼
                               ┌───────────────────────────┐
                               │  Secondary Cloud Backup:  │
                               │  Replicate / Fireworks    │
                               └─────────────┬─────────────┘
                                             │ (Upstream Failure)
                                             ▼
                               ┌───────────────────────────┐
                               │  NC-4 Graceful Fallback:  │
                               │  Sub-1.8s High-Res WebP   │
                               │  Milo & Benchmark Presets │
                               └───────────────────────────┘
```

| Provider / Tier | Endpoint & Model | SLA Latency Target | Unit Cost | Circuit Breaker Condition |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1 (Domestic)** | SiliconFlow `Qwen/Qwen-Image-Edit` | $12\text{s} - 14\text{s}$ | ~$0.01 / call | Timeout $> 15000\text{ms}$ or 3 consecutive 5xx errors |
| **Tier 1 (Overseas)** | Fal.ai `fal-ai/flux/dev/image-to-image` | $1.8\text{s} - 2.5\text{s}$ | ~$0.03 / call | Timeout $> 5000\text{ms}$ or 3 consecutive 5xx errors |
| **Tier 2 (Failover)** | Replicate `black-forest-labs/flux-dev` | $3.5\text{s} - 5.0\text{s}$ | ~$0.035 / call| Concurrency cap exceeded |
| **Tier 3 (Zero Cost)**| Cloudflare KV Pre-rendered WebP Pool | **$< 180\text{ms}$** | **$0.00** | Activates automatically upon any upstream failure |

---

## 2. FinOps Financial Circuit Breakers (Zero Surprise Bills)

To defend against malicious DDoS or viral traffic exhausting bank accounts, Cloudflare Workers enforces **three physical locks**:

### 2.1 Daily Budget Hard-Cap (The $45 USD Ceiling)
- **Mathematical Formula**:
  $$\text{Daily Limit} = 1500 \text{ calls} \times \$0.03 = \$45.00 \text{ USD max daily liability}$$
- **Atomic KV Counter**:
  ```typescript
  const todayKey = `stats:cover:daily_count:${getISODate()}`;
  const currentDailyCalls = await env.RATE_LIMIT_KV.get(todayKey);
  
  if (parseInt(currentDailyCalls || '0') >= 1500) {
    // HARD CUTOFF: Zero external API calls are dispatched.
    // Gracefully serve cached showcase samples without showing error.
    return serveGracefulFallback(themeId, templateId, 'FINOPS_BUDGET_EXHAUSTED');
  }
  ```

### 2.2 Per-IP Rate Limiting (Sliding Window)
- **Hourly Window**: $\le 3$ generation calls per IP per hour.
- **Daily Window**: $\le 5$ generation calls per IP per 24 hours.
- **Bot Mitigation**: If a client triggers $> 10$ requests in 60 seconds, flag IP in `blacklist:cover:ip:{hash}` for 24 hours and drop connection at edge.

---

## 3. Synthetic Health Checks & Alerting

Run an edge cron job every 5 minutes to verify provider responsiveness:

```typescript
// wrangler.toml: [triggers] crons = ["*/5 * * * *"]
export async function scheduled(event: ScheduledEvent, env: Env): Promise<void> {
  const startTime = Date.now();
  try {
    const probe = await fetch('https://api.siliconflow.cn/v1/models', {
      headers: { 'Authorization': `Bearer ${env.SILICONFLOW_API_KEY}` }
    });
    const latency = Date.now() - startTime;
    
    if (!probe.ok || latency > 3000) {
      await alertOpsChannel(env, `SiliconFlow Health Degraded: ${latency}ms (Status: ${probe.status})`);
    }
  } catch (err) {
    await alertOpsChannel(env, `SiliconFlow Endpoint Unreachable: ${err.message}`);
  }
}
```

---

## 4. Disaster Recovery & Emergency Runbook

### Scenario A: SiliconFlow or Fal.ai Outage (HTTP 500 / 503)
1. **Automated Response**: Worker intercepts the non-200 status code via `try/catch` in `falService.ts`.
2. **User Experience**: The user experiences zero error toasts. Within 1.5 seconds, the worker returns a pre-rendered, high-fidelity WebP editorial portrait matching the requested template.
3. **Telemetry**: Emit `generation_fallback_triggered` to Microsoft Clarity with error reason.

### Scenario B: Unexpected Viral Spike (10,000 Visitors / Minute)
1. Edge KV absorbs all traffic without touching a database server.
2. Cloudflare Pages serves static assets from edge cache with $100\%$ cache hit ratio.
3. Once daily budget reaches 1,500 calls, system shifts silently to cached mock responses, preserving user delight while capping operational expenditure at exactly $45.

---

## 5. SRE Operational Checklist

- [ ] **KV Namespace Bindings Verified**: Ensure `RATE_LIMIT_KV` is bound in `wrangler.toml` for production.
- [ ] **Zero Secrets in Git**: Confirm `FAL_KEY`, `SILICONFLOW_API_KEY`, and `STRIPE_KEY` exist only in Cloudflare Workers secrets.
- [ ] **Telemetry Non-Blocking**: Verify that Clarity failures or network hiccups never prevent poster generation.
- [ ] **1080P Memory Benchmark**: Verify that Canvas memory consumption remains under 45MB on iOS Safari mobile webview.
