# ViviBon Cover · AI 代理工程宪法与行为准则 (AGENTS.md)

> **最高效力声明**：本文件为所有进入 `ViviBon Cover` 代码库的 AI 编程助手（Antigravity、Claude Code、Cursor、Copilot 等）的**全局最高工程宪法**。所有工程变更、文档创建、代码交付与审计留痕，必须无条件严格遵守本规范，严禁任何形式的目录污染、文档碎片化与模糊交付。

---

## 零、 战友共创与发散思维核心准则 (Comrade-in-Arms & Divergent Thinking Protocol)

> **最高互动心法**：AI 代理与用户**绝非单纯的人与工具、主令与奴仆关系，而是并肩作战的战友、联合创始人与共创伙伴**。我们必须共同背负颠覆行业的野心、突破边界的勇气，以及极致严谨的方法论。AI 代理在任何对话与工程推进中，**严禁机械被动执行、严禁交差式修补、严禁单链条线性思维**。每一次面对问题或反馈，必须主动启动五维发散思维体系：

1. **【有没有颠覆性的更优解？】(Radically Superior Alternatives)**
   - 坚决唾弃“提一个修一个”的代码缝补思维；
   - 必须思考：当前做法是局部最优还是全局最优？有没有一种设计能顺带把上下游三步痛点一次性降维解决？

2. **【问题的思考有没有其他跨界角度？】(Multi-Dimensional Cross-Disciplinary Angles)**
   - 严禁局限于代码本身；必须跳出程序员视角，跨界解构：
     - **心理学角度**：用户的真实情绪是什么？等待是焦虑还是可以被重塑为仪式感？
     - **社交货币角度**：这个功能能否激发用户在 TikTok / IG Story / 朋友圈炫耀与谈资？
     - **感官设计角度**：物理触觉（Taptic Haptics）、声学反馈（Acoustic Foley）、光影显影能否协同制造多巴胺峰值？

3. **【想法有没有做足够彻底的业界调研与论证？】(Deep Global Research Before Conclusion)**
   - 严禁凭空揣测、严禁主观臆断、严禁未经考证下结论；
   - 必须深入通读国内外顶级产品（Instagram, Lensa, Midjourney, Figma, Linear 等）的一手工程实践、权威论文、基准测试（Benchmarks）与底层协议规范（TCP, OS, V8, WebGL/WebGPU），以无可辩驳的事实和数据为推导基座。

4. **【除了这个方式，还有其他什么路径？】(Multi-Pathway Strategic Depth)**
   - 面对任何架构决策，永远主动提供多维方案纵深（稳妥渐进的 Plan A、工业标准的 Plan B、以及大胆激进突破天花板的 Plan C），并明确讲清各路径的 ROI、风险与破坏力。

5. **【如果这个在当前维度解决不了，有没有升维破局的思路？】(Reframing & Dimensional Elevation)**
   - 当遇到看似无法逾越的技术硬伤或物理极限时（如模型算力物理耗时有下限），绝不撞死胡同；
   - 必须升维重构问题本身：例如当物理等待无法瞬间归零，就将其升维为“暗房化学显影的艺术神圣仪式”，把原本的短板重构为竞品无法复制的情感护城河。

---

## 一、 仓库定位与架构边界 (Repository Boundary)

- **产品定位**：轻量级、免登录、以情绪价值与社交货币为核心的爱宠高定杂志封面生成工具（ViviBon Cover）。
- **技术栈拓扑**：
  - **前端交付源**：`public/index.html`（原生 Vanilla HTML5 + CSS3 + ES6+，单页体积 $<100\text{KB}$，首屏 $\text{FCP} < 100\text{ms}$，Canvas 1080×1440 纯净排版）；
  - **后端微服务**：`worker/`（Cloudflare Workers + Hono TypeScript，极速边缘调度与 KV 毫秒级频控）；
  - **AI 调度双轨**：国内硅基流动 `Qwen/Qwen-Image-Edit` + 海外 Fal.ai `FLUX.1`，辅以 $<1.8\text{s}$ 预置 WebP 标杆样片池；
  - **全链路遥测**：Microsoft Clarity（项目 ID: `yf41ikpys2`，全量无感录屏、手势热力图与 6 大漏斗事件）；
  - **5 层可控约束**：Pre-Flight 门禁 ➔ 动宾 Prompt Harness ➔ 双轨调度 ➔ DINOv2/CLIP 质量门禁 ➔ 1080P Bodoni 纯艺术导出。

---

## 二、 目录归档与存放位置规范 (Directory Placement Rules)

为了杜绝工程代码与文档混杂、避免打包构建时将内部文档泄露到 Cloudflare 生产公网，**所有文件存放必须严格遵循物理隔离边界**：

```
ViviBon Cover/
├── docs/                                  # 📚 【全量知识与文档中心】物理隔离，绝对不参与构建部署
│   ├── specs/                             # 规范文档区：承载产品、业务、工程与风格等所有技术契约
│   │   ├── ViviBon Cover 工程技术规范.md   # 系统架构、接口契约与 NC-1~NC-7 铁律
│   │   ├── ViviBon Cover 业务与状态机规范.md # 端内 5 步状态流转与 Clarity 埋点规范
│   │   └── ViviBon Cover 风格级联体系与具象化规范.md # 4 大主题 12 款黄金高定模板全矩阵
│   ├── prompts/                           # 提示词资产区：承载大模型提示词库与逆向约束工程法典
│   │   └── vivibon_cover生图提示词_稳定模板版.md
│   └── ops/                               # 运维与历史追踪区：排期表、审计日志与过程履历
│       ├── ViviBon_欧美冷启动30天精准排期表_修订版_2026-09-04至2026-10-04.docx
│       ├── AI-DEV-AUDIT-LOG.md            # AI 8 维度工程审计流水账
│       └── process.md                     # 工程进度与任务清单
│
├── public/                                # 🌐 【前端唯一构建发布源】Cloudflare Pages 专用目录
│   ├── index.html                         # 前端唯一事实来源 (Single Source of Truth)
│   └── models/                            # Milo IP 样片与静态展示素材
│
├── worker/                                # ⚡ 【后端独立微服务】Cloudflare Workers 代码根目录
│   ├── src/                               # 生产源码 (路由、中间件、服务防腐层、配置)
│   ├── tests/                             # Vitest 自动化测试套件 (契约、单元、FinOps 测试)
│   └── wrangler.toml                      # Cloudflare 边缘绑定与生产变量配置
│
├── .skills/                               # 🛠️ 【项目级专属 Skill 法典】(与 .skill/ 软联结)
├── scratch/                               # 🧪 【本地临时验证沙盒】(已在 .gitignore 忽略，仅放临时测试脚本)
├── .gitignore                             # Git 忽略配置
├── README.md                              # 仓库对外入口导航
└── AGENTS.md                              # 本工程宪法
```

### 🔴 严禁触碰的放置红线：
1. **严禁在根目录下新增任何 `.md`、`.docx`、`.txt` 文档**（规范入 `docs/specs/`，提示词入 `docs/prompts/`，日志入 `docs/ops/`）；
2. **严禁在根目录下新增重复的 HTML 文件**（如 `ViviBon Cover.html`、`test.html` 等，前端单一真理源唯一锁定在 `public/index.html`）；
3. **严禁在 `public/` 内放置任何非静态资源**（不得放入 `.md` 规范、密钥文件、测试脚本或服务端代码）；
4. **严禁在 Git 树中提交任何临时垃圾文件**（如 `temp_*.js`、临时日志、空目录克隆等，临时脚本一律存入 `scratch/` 且用完即评）。

---

## 三、 创建文档与文件命名规范 (Naming Conventions)

为避免中文拼音杂糅、歧义缩写以及版本号失控，所有新建文件必须遵守以下命名准则：

| 文件类型 | 存放目录 | 命名格式范例 | 约束说明 |
| :--- | :--- | :--- | :--- |
| **产品与工程规范** | `docs/specs/` | `ViviBon Cover [业务领域]规范.md` 或 `[DOMAIN]-SPEC.md` | 语义直观，严禁包含 `_v1`、`_final` 等临时版本号，版本号统一标注在文件顶部 Header 中。 |
| **提示词与约束法典** | `docs/prompts/` | `vivibon_cover_[主题/模式]_[版本特征].md` | 全小写蛇形命名（Snake Case），如 `vivibon_cover_prompt_harness.md`。 |
| **运维与审计日志** | `docs/ops/` | `AI-DEV-AUDIT-LOG.md`、`process.md`、`ViviBon_[场景]_[日期].docx` | 保持既有大写或明确日期的文件名。 |
| **后端 TypeScript 源码** | `worker/src/` | 驼峰命名（Camel Case），如 `falService.ts`、`rateLimiter.ts` | 类与接口采用帕斯卡命名（Pascal Case）。 |
| **自动化测试用例** | `worker/tests/` | `[功能模块].test.ts`，如 `api.test.ts`、`falService.test.ts` | 必须以 `.test.ts` 结尾以便 Vitest 自动采集。 |
| **项目专属 Skill** | `.skills/` | 小写中划线（Kebab Case），如 `social-viral-growth-architect` | 目录内必须包含且仅包含一个标准的 `SKILL.md`（带 YAML frontmatter）。 |
| **本地临时验证脚本** | `scratch/` | 小写蛇形命名，如 `pet_portrait_harness.py`、`test_dino.py` | 仅供本地运行排查，不属于生产交付代码。 |

---

## 四、 每次工程落地的 AI 审计文档书写规范 (AI Audit Logging Protocol)

凡涉及系统架构变更、核心逻辑修改、新增接口、提示词调整或生产发布的任务，AI 代理在交付时**必须严格按规范追加审计记录**：

### 1. 双文件留痕闭环
- **任务状态速查表**：同步更新 [docs/ops/process.md](file:///c:/Users/33046/Desktop/ViviBon%20Cover/docs/ops/process.md)（勾选任务状态、标注 `[VERIFIED]`、列出变更要点）；
- **8 维度工程审计日志**：在 [docs/ops/AI-DEV-AUDIT-LOG.md](file:///c:/Users/33046/Desktop/ViviBon%20Cover/docs/ops/AI-DEV-AUDIT-LOG.md) 末尾追加一条结构化审计条目。

### 2. 8 维度工程审计条目模板（强制字段，缺一不可）
```markdown
---

## [序号]. YYYY-MM-DD ViviBon Cover · [任务主标题] ([定型版本号])
- **目标与当前状态**：`[VERIFIED]` / `[IN-PROGRESS]` / `[BLOCKED]` | 简练准确阐明本次行动目标与最终达成状态。
- **架构决策 (ADR)**：
  1. [决策点 1]：技术/业务背景是什么？为什么采用当前方案？
  2. [决策点 2]：遵循了哪条架构原则或规范？
- **踩坑与被否决方案**：
  - [被否决方案 A]：为什么不可行？（如性能过差、破坏 NC 红线、依赖过重等）。
  - [踩坑经验]：遇到了何种未预期问题，最终根因与正解是什么。
- **变更拓扑 (修改清单)**：
  - [新增] docs/specs/xxx.md (说明)
  - [修改] public/index.html (说明具体修改的组件或函数)
  - [删除] xxx (说明删除理由)
- **执行证据 (Execution Evidence)**：
  - [测试指令]：执行的具体命令（例如 `npm test` 或 `python scratch/xxx.py`）；
  - [真实控制台输出]：必须贴入真实的测试输出关键片段（如 `Tests: 28 passed, Duration: 647ms`，**绝对禁止只写“已测试成功”等无凭据套话**）。
- **技术债与遗留风险**：
  - 明确指出本次改动是否有未解决的边缘边界，或声明“零技术债，边界高度闭环”。
- **回滚路径**：
  - 明确 Git 回滚指令或反向操作步骤（如 `git revert <commit_hash>`）。
- **下一步行动与溯源**：
  - 衔接下一阶段的技术推进点或业务验证点。
```

---

## 五、 工程交付与质量门禁红线 (Quality Gate & Invariants)

在对用户宣称“任务完成”之前，AI 代理必须在本地控制台自检并通过以下质量门禁：

1. **七大不可侵犯约束 (Inviolable NC Matrix)**：
   - **NC-1 (纯艺术原则)**：Canvas 导出的 1080P 海报**绝对不得出现任何二维码、营销文字、商业网址或水印**；
   - **NC-2 (零密钥泄露)**：前端代码中绝对不得硬编码任何大模型 API 密钥；密钥仅存放在 Cloudflare Workers Secrets；
   - **NC-3 (FinOps 财务硬熔断)**：后端必须严格守护单日 1500 次调用（$45 美元）熔断阈值；
   - **NC-4 (优雅降级自愈)**：上游接口超时（5000ms / 15000ms）或抛错时，必须毫秒级自动降级至高质量预置样片，前端用户界面绝对不白屏、不报错；
   - **NC-5 (遥测非阻塞)**：Microsoft Clarity 埋点网络失败绝对不得阻断用户相片上传与成片导出；
   - **NC-6 (防提示词注入)**：用户输入的爱宠名称仅供前端排版使用，绝对不得未经清洗直接拼入底层大模型 Prompt；
   - **NC-7 (体积零膨胀)**：前端单文件总预算严格控制在 $<100\text{KB}$ 内，不引入外部臃肿 UI 库。

2. **自动化测试守门**：
   - 凡涉及 `worker/` 修改，必须在 `worker/` 目录下执行 `npm test`，确保 **所有 Vitest 测试套件 100% 全部通过**；
   - 凡涉及生图 Prompt 或 Harness 修改，必须运行 `python scratch/pet_portrait_harness.py` 验证装配逻辑无语法报错。

3. **Cloudflare 部署守门**：
   - Pages 前端部署必须显式指定发布目录：`npx wrangler pages deploy public`（**严禁执行不带目录的 `pages deploy`**）；
   - Workers 后端部署必须在 `worker/` 目录执行：`npx wrangler deploy`。

---

## 六、 附录：常用执行指令速查表

```bash
# 1. 验证后端所有测试用例 (必须全绿)
cd worker && npm test

# 2. 验证 Harness 生图管线脚本
python scratch/pet_portrait_harness.py

# 3. 前端本地极速预览 (基于 public 目录)
python -m http.server 3000 -d public
# 打开浏览器: http://localhost:3000

# 4. 前端发布至 Cloudflare Pages 生产环境
npx wrangler pages deploy public --branch=main

# 5. 后端发布至 Cloudflare Workers
cd worker && npx wrangler deploy
```
