# ViviBon Cover 独立工程技能库 (Dedicated Skills)

> **物理隔离声明 (AGENTS.md Rule 42)**: 本目录为轻量增长子产品 `ViviBon Cover` 专有的工程技能资产库。与 PawBond 主项目完全解耦自治，专门规范与指导基于 **Cloudflare Pages + Cloudflare Workers (Hono TypeScript) + Fal.ai + Canvas 1080P** 的极速出海交付工程。

---

## 技能索引与职责分工

| 技能标识 (Name) | 定位与核心职责 | 适用场景与触发边界 |
| :--- | :--- | :--- |
| [`vivibon-h5-edge-craftsman`](./vivibon-h5-edge-craftsman/SKILL.md) | **极速移动 Webview 与 H5 边缘前端工匠**<br>主打 Vanilla H5 首屏 FCP < 100ms、1080P Canvas 杂志排版、Instagram/TikTok 内嵌 Webview 长按存图自愈、PostHog 零阻塞防御埋点。 | 编写或重构 `ViviBon Cover.html`、`index.html`、Canvas 合成逻辑、CSS 动效及前端数据埋点。 |
| [`apple-ui-ux-craftsman`](./apple-ui-ux-craftsman/SKILL.md) | **顶级 Apple 级 UI/UX 工匠设计**<br>主打通透纯净色彩空间（#F2F2F7 系统灰、毛玻璃 Liquid Glass）、连续曲率 Squircle、杂志级排版与 460ms 物理弹簧阻尼抽屉/按压动效。 | 页面视觉重构、组件与卡片设计、颜色调优、按压微触觉与底抽屉动效适配。 |
| [`vivibon-edge-backend-engineer`](./vivibon-edge-backend-engineer/SKILL.md) | **Cloudflare Workers 边缘微服务架构师**<br>主打 Hono 极简微服务架构、KV 边缘毫秒级频控（单 IP 3次/h、5次/d）、每日 $45 财务硬熔断（1500次）、Fal.ai 防腐层与 5000ms 硬超时降级自愈、Vitest 自动化测试门禁。 | 在 `ViviBon Cover/worker/` 编写或修改 Hono 路由、中间件、Fal.ai 调度、Zod 契约校验及单元/集成测试用例。 |
| [`pet-portrait-haute-couture-generator`](./pet-portrait-haute-couture-generator/SKILL.md) | **爱宠高定生图与 Face ID 保持架构师**<br>主打 FLUX.1 [dev] 图生图（Image-to-Image）、Face ID 身份锚定 4 段式 Prompt 强约束、0.68 黄金重绘强度（strength）控制与负向提示词防御。 | 调优生图模型端点、编写 Prompt 模板、锁定爱宠面部与品种一致性、配置图生图参数。 |

---

## 协作规约与工作流

1. **先读规约，后动代码**: 凡涉及前端修改，强制激活并通读 `vivibon-h5-edge-craftsman`；凡涉及后端与测试修改，强制激活并通读 `vivibon-edge-backend-engineer`。
2. **守死 7 大逆向红线 (NC-1 ~ NC-7)**: 两大技能均以 `ENGINEERING-SPEC.md` 为最高物理工程宪法，严防任何边界漂移或安全破口。
3. **闭环自留痕**: 任何代码或技能变更，仅在 `ViviBon Cover/process.md` 与 `ViviBon Cover/AI-DEV-AUDIT-LOG.md` 留痕，严禁污染主项目根目录。
