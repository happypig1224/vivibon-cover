---
name: vivibon-edge-backend-engineer
description: >-
  ViviBon Cover 专属 Cloudflare Workers 边缘微服务架构与后端工程技能。
  基于 Cloudflare Workers 全球边缘网络、Hono 极简微框架与 Fal.ai 生图引擎，
  指导构建具备 Zod 强类型契约、KV 毫秒级频控、每日 $45 算力财务硬熔断、5000ms 硬超时降级自愈与 Vitest 自动化测试门禁的生产就绪边缘服务。
---

# ViviBon Edge Backend Engineer Skill (Cloudflare Workers 边缘微服务架构师)

> **核心定位**：专为 ViviBon Cover 打造的极致轻量、超低延迟、强类型安全与高防刷韧性的 Serverless 边缘后端工程技能。
> **工程信仰**：契约先于代码（Spec-First）、零信任输入、严控算力成本（FinOps Hard Cap）、优雅降级自愈、测试百分百覆盖。

---

## 1. 触发时机 (Trigger Condition)

当出现以下情况时，强制激活并严格执行本 Skill：
1. 在 `ViviBon Cover/worker/` 目录下初始化、编写或重构 Hono 路由与中间件代码时；
2. 设计、修改 `POST /api/generate` 接口契约、Zod 强类型校验或错误码结构时；
3. 实现或调优 Cloudflare KV 频控限流、单 IP 防刷与每日 \$45 算力财务硬熔断机制时；
4. 封装 Fal.ai 客户端调度、组装 Prompt 白名单或配置 5000ms `AbortController` 硬超时降级逻辑时；
5. 编写或执行 Vitest 单元测试、集成测试与边缘环境故障注入演练时。

---

## 2. 边缘微服务架构规范 (Architecture & Design Principles)

### 2.1 极简高内聚工程拓扑
必须严格遵循扁平分层结构，严禁无脑堆砌复杂 DDD 充血模型：
```
ViviBon Cover/worker/src/
├── index.ts               # Hono App 装配入口、全局统一错误收口
├── config/styles.ts       # 4 组风格 Prompt 白名单与保底商业摄影大片 URL
├── middleware/            # 中间件分层 (CORS, Logger, RateLimiter)
├── routes/                # 业务路由 (generate.ts, health.ts)
├── schemas/               # Zod 强类型契约校验与 TypeScript 类型推导
├── services/              # 外部生图引擎防腐层与超时自愈 (falService.ts)
└── types/env.ts           # Cloudflare Worker 环境变量与 KV Binding 定义
```

### 2.2 中间件执行拓扑与早期短路 (Middleware Pipeline)
必须严格遵循以下中间件顺序，确保非法流量在边缘第一微秒被物理掐断：
1. **结构化边缘日志中间件 (Observability)**：透传 TraceID，记录请求耗时、Client IP 与 HTTP 状态码；
2. **跨域策略中间件 (CORS)**：放行指定前端 Origin，处理 OPTIONS 预检并附带安全响应头；
3. **边缘频控与财务硬熔断中间件 (RateLimiter)**：前置于任何业务计算，阻断 429 请求；
4. **路由层校验与业务处理 (Route Handlers)**：进入 Zod 校验与 Fal.ai 调度。

---

## 3. 逆向红线与不可逾越边界 (Negative Constraints Defenses)

### 3.1 密钥绝对保密防线 (NC-2)
- `FAL_KEY` 严禁出现在前端代码、客户端构建包或 Git 提交的明文配置文件中；
- 生产环境通过 Cloudflare Worker Secrets 注入，代码中仅通过 `c.env.FAL_KEY` 读取。

### 3.2 算力防刷与每日 \$45 财务硬熔断 (NC-3)
通过边缘 KV 毫秒级原子计数执行两道铁律门禁：
1. **第一道防线：每日全网财务硬熔断**：
   - 键名：`finops:daily:YYYY-MM-DD`；
   - 阈值：1500 次/天（锁死 \$45 成本上限）；
   - 超限行为：立即返回 HTTP 429：
     ```json
     {
       "success": false,
       "errorCode": "FINOPS_CAP_REACHED",
       "message": "Today's Haute Couture fitting quota has been fully claimed. Please come back tomorrow at 00:00 UTC!"
     }
     ```
2. **第二道防线：单 IP 行为频控**：
   - 提取 IP：优先 `cf-connecting-ip`，备用 `x-forwarded-for`；
   - 限制规则：单 IP 3次/小时（键 `ratelimit:ip:${ip}:${hour}`），单 IP 5次/天（键 `ratelimit:ip:${ip}:${day}`）；
   - 超限行为：返回 HTTP 429 `RATE_LIMIT_EXCEEDED`。

### 3.3 5000ms 硬超时短路与优雅降级自愈 (NC-4)
- 对 Fal.ai 的任何网络调度，**必须包裹在 `AbortController` 保护网中**：
  ```typescript
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const result = await falClient.run(promptTemplate, { signal: controller.signal });
    clearTimeout(timeoutId);
    return { ...result, isFallback: false };
  } catch (err) {
    clearTimeout(timeoutId);
    // 捕获 AbortError 或上游 5xx 状态，瞬间切换至对应风格预设高清大片
    return {
      imageUrl: FALLBACK_SAMPLES[styleKey],
      isFallback: true,
      latencyMs: 5000
    };
  }
  ```
- **核心体验目标**：即使海外 AI 算力集群全面崩塌或队列拥堵，用户依然在 5 秒内拿到一张精美的写真大片导出海报，**绝对不报 500，杜绝用户死等流失**。

### 3.4 Prompt 白名单与输入强校验 (NC-6)
- **拒绝自由自然语言注入**：用户输入的 `petName` 仅用于海报文字排版，严禁拼入生图 Prompt；
- **白名单硬编码**：生图 Prompt 严格由后端写死在 4 组经典高定英文摄影模板（`gentle`, `detective`, `street`, `warm`）中；
- **Zod 契约强校验**：
  - 非法 `styleKey` 直接返回 HTTP 400 `INVALID_STYLE_KEY`；
  - `imageBase64` 超过 5MB 直接返回 HTTP 413 `IMAGE_TOO_LARGE`。

---

## 4. 自动化测试门禁体系 (Vitest Test Standards)

在任何代码修改合并前，必须 100% 运行并通过以下 4 套测试：
1. **`tests/validator.test.ts` (参数契约测试)**:
   - 验证缺失 `styleKey` 或未知枚举时精准返回 400 及标准错误 JSON；
   - 验证 Base64 超过 5MB 门禁时精准返回 413；
   - 验证有效入参自动补齐默认参数 (`petName: "麦洛 Milo"`, `isDefaultSample: true`)。
2. **`tests/rateLimiter.test.ts` (边缘频控与熔断测试)**:
   - 验证同一 IP 在同一小时内第 1、2、3 次请求 200 放行；
   - 验证同一 IP 第 4 次请求拦截为 429 `RATE_LIMIT_EXCEEDED`；
   - 验证全局累计调用达到 1500 次后，第 1501 次请求被物理熔断并返回 `FINOPS_CAP_REACHED`。
3. **`tests/falService.test.ts` (AI 防腐与降级测试)**:
   - 验证 4 款风格 Key 映射的英文 Prompt 正确无误且不可被外界篡改；
   - 模拟 Fal.ai 抛出 500 / 503 异常，验证自动返回预设大片且 `isFallback === true`；
   - 模拟请求延迟超过 5000ms，验证 `AbortController` 触发并平滑降级。
4. **`tests/api.test.ts` (Hono 端到端集成测试)**:
   - 验证 `GET /health` 返回 200 OK 与健康状态；
   - 验证 `POST /api/generate` 全链路成功响应满足 JSON Schema 物理契约。

---

## 5. 人工与自检审查清单 (Verification Checklist)

| 检查维度 | 审查标准 | 是否合规 |
| :--- | :--- | :---: |
| **安全红线** | 代码中不存在任何硬编码明文 API Key，完全走 Worker Env | [ ] |
| **财务防刷** | 具备单 IP 频控与单日 1500 次 (\$45) 强行短路拦截逻辑 | [ ] |
| **高可用性** | Fal.ai 调度具备 5000ms 硬超时截断与优雅样片降级自愈矩阵 | [ ] |
| **契约严谨** | 使用 Zod 校验入参，错误响应体严格对齐 ENGINEERING-SPEC.md | [ ] |
| **自动化测试** | `npm run test` 全部通过，覆盖率达到核心路径 100% | [ ] |
