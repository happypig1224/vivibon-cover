# ViviBon Cover · Haute Couture Pet Magazine Cover Studio

> **Overview**: An edge-native AI web application delivering bespoke, luxury editorial pet magazine covers and cinematic portraits tailored for modern pet owners.

---

## 🌟 Key Highlights

- **Pure Vanilla Edge Delivery**: Single-file H5 frontend hosted on Cloudflare Pages, achieving sub-100ms FCP inside mobile Instagram & TikTok webviews without heavy framework overhead.
- **Two-Tier Visual Reference Carousel**:
  - **Tier 1 (4 Themes)**: `Fine Art` (3), `Corporate` (3), `Cosplay` (3), `Celebration` (3).
  - **Tier 2 (12 Gold Haute Couture Templates)**: Visual magazine cards featuring our official IP mascot (Milo) with smooth horizontal swipe navigation.
- **5-Layer Controllable Harness Pipeline**:
  - *Layer 1*: Client Pre-Flight Gate (luminance 15~245, dimension >=240px, ~180KB downsample).
  - *Layer 2*: Action-Oriented Imperative Prompt Harness + 20+ negative constraints.
  - *Layer 3*: Dual-Rail AI Dispatcher: SiliconFlow `Qwen/Qwen-Image-Edit` (domestic zero-foreign-card) + Fal.ai `FLUX.1` (overseas), with sub-1.8s WebP fallback pool.
  - *Layer 4*: Automated Quality Gate (DINOv2/CLIP cosine similarity >= 0.72).
  - *Layer 5*: 1080P Editorial Typography Composite (Bodoni MT, NC-1 pure art, zero watermarks).
- **Telemetry & Behavior Analytics**: Microsoft Clarity (`yf41ikpys2`) providing 100% free session recording, scroll/click heatmaps, and funnel telemetry.
- **FinOps & Rate Limiting Guardrails**: Edge KV rate limits (3 requests/hour, 5 requests/day per IP) and a strict $45 USD daily circuit breaker (1500 calls max).

---

## 📁 Repository Structure & Standard Specifications

```
ViviBon Cover/
├── public/                                # 🌐 Frontend production deployment root (Cloudflare Pages)
│   ├── index.html                         # Canonical single-page H5 app (<100KB, Bodoni Canvas)
│   └── models/                            # IP reference showcase images (Milo collection)
├── worker/                                # ⚡ Cloudflare Workers backend service (Hono TypeScript)
│   ├── src/
│   │   ├── config/styles.ts               # Theme, template, and dynamic prompt assembly engine
│   │   ├── middleware/                    # Rate limiter, CORS, FinOps circuit breakers, logger
│   │   ├── routes/generate.ts             # POST /api/generate endpoint & tag validation
│   │   ├── services/falService.ts         # Fal.ai runner with 5000ms timeout and graceful fallback
│   │   └── index.ts                       # Hono application root
│   ├── tests/                             # Vitest test suites (28 Unit, E2E, FinOps tests)
│   └── wrangler.toml                      # Cloudflare Workers configuration & KV bindings
├── docs/                                  # 📚 Documentation & Specifications (Completely decoupled from build)
│   ├── specs/                             # Core technical and business specifications
│   │   ├── ViviBon Cover 工程技术规范.md   # Architecture, contracts, and NC-1~NC-13 (V2.4)
│   │   ├── ViviBon Cover 业务与状态机规范.md # State machine & Microsoft Clarity telemetry (V2.2)
│   │   ├── ViviBon Cover 高可用容灾与安全防刷规范.md # 15s timeout, Full Jitter, Failover, WeChat alerts, and anti-bot defense (V1.0)
│   │   ├── ViviBon Cover ToC生产级稳定性与体验保障规范.md # P0-P2: Mobile OOM, album saving, emotional loading, visibilitychange (V1.0)
│   │   └── ViviBon Cover 风格级联体系与具象化规范.md # 12 haute couture templates & carousel (V4.2)
│   ├── prompts/                           # Prompt engineering & negative constraints
│   │   └── vivibon_cover生图提示词_稳定模板版.md # 4 modular style blocks & extension blueprint
│   └── ops/                               # Operations & historical audit logs
│       ├── ViviBon_欧美冷启动30天精准排期表_修订版_2026-09-04至2026-10-04.docx
│       ├── AI-DEV-AUDIT-LOG.md            # Comprehensive AI dev audit trail (Entry 32)
│       └── process.md                     # Engineering progress log (G-1 ~ G-12)
├── .skills/                               # 🛠️ 9 Dedicated project skills (.skill junction)
├── scratch/                               # 🧪 Local experiments & Harness verification scripts
│   └── pet_portrait_harness.py            # Executable Python 5-layer harness pipeline
└── README.md                              # Master project overview & directory index
```

---

## 🚀 Quick Start

### 1. Frontend Local Preview
```bash
# Run a local HTTP server
python -m http.server 3000
# Open in browser: http://localhost:3000
```

### 2. Backend Worker Development
```bash
cd worker
npm install
npm test          # Run 58 Vitest integration, unit & security tests (100% passing)
npm run dev       # Start local Cloudflare Worker on port 8787
```

### 3. Harness Pipeline Verification
```bash
python scratch/pet_portrait_harness.py
```

---

## 🛡️ Inviolable Engineering Rules (NC Matrix)

1. **NC-1 (Pure Artwork)**: Exported posters strictly contain zero QR codes, zero URLs, and zero promotional watermarks.
2. **NC-2 (Zero Key Exposure)**: API keys remain strictly server-side in Cloudflare Workers secrets.
3. **NC-3 (FinOps & Rate Limiting)**: Enforces 3 requests/hour, 10 requests/day per IP, with rapid-fire auto-ban (>5 reqs/10s auto-bans IP for 24h) and a daily 1500-call ($45) circuit breaker.
4. **NC-4 (Strict 15s Timeout & Img2Img Only)**: 15,000ms hard timeout with automatic failover or fallback to high-res sample presets; zero pure-text2img.
5. **NC-5 (Non-Blocking Telemetry)**: Microsoft Clarity (`yf41ikpys2`) / telemetry failures never break user photo upload or generation flows.
6. **NC-6 (Zero Prompt Injection)**: User text is only applied to typography; AI prompts are assembled securely from server-side templates.
7. **NC-7 (Zero Bundle Bloat)**: Frontend bundle size remains strictly under 100KB with zero external build step.
8. **NC-8 (Anti-Herd Retry)**: Exponential backoff with Full Jitter random dispersal avoids synchronized retry storms.
9. **NC-9 (Anti-Bot Gateway)**: Automated scraping tools (`curl`, `requests`, `puppeteer`, empty UA) are blocked with 403 to prevent bill waste.
10. **NC-10 (Failover & WeChat Alerts)**: Primary model failures automatically failover to secondary model and send structured root-cause alert cards via Enterprise WeChat Webhook.
11. **NC-11 (Content Safety & Anti-Grayscale)**: Strict pet name sanitization, anti-grayscale & anti-NSFW negative prompts, and upstream safety checker fallback.
12. **NC-12 (Mobile OOM & Album-Saving Delivery)**: Client-side downsampling for uploads (max edge $\le 1500\text{px}$) prevents iOS Safari OOM crashes; top-layer native `<img>` guarantees long-press saving in WeChat/In-App webviews.
13. **NC-13 (Emotional Loading & Lifecycle Self-Healing)**: 4-stage emotional storytelling loading transforms 15s waiting anxiety; Page Visibility API recovers from background tab throttling.
