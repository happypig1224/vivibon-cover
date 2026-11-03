# ViviBon Cover 研发与工程技术架构白皮书

## 一、 项目概述

ViviBon Cover 是一个面向海外及国内宠物消费市场的边缘原生（Edge-Native）高定杂志封面与先锋肖像生成系统。

系统聚焦于极简、免登录（Zero-Friction）的端到端交互，通过客户端富交互与边缘计算网关协同，利用生成式多模态大模型技术，将用户上传的宠物普通生活相片转化为符合传统高级时尚杂志印刷排版规范（Bodoni MT 刊头排版、苏富比双轨凹凸压印防伪徽记、1080×1440 纯艺术画幅）的无水印高清艺术封面。

### 1. 核心设计原则与业务边界
* 免账号体系与零认证摩擦：系统完全剥离注册、登录、OAuth、JWT、用户数据持久化与法币支付流程，实现用户即开即用的端到端闭环体验。
* 纯艺术内容交付：严格执行 NC-1 纯艺术交付铁律，导出的成片中绝对不包含任何二维码、营销推广文字、商业引流链接或第三方平台水印。
* 100% 纯图生图保真：系统完全剔除文生图冗余分支，仅支持基于用户上传爱宠面部特征的图生图（Img2Img）多模态推理，确保面部特征（Face-ID）与物种细节的一致性。
* 边缘极致性能与防穿仓治理：全链路依托 Cloudflare Pages 全球 CDN 与 Cloudflare Workers 边缘无服务器架构，在实现首屏内容渲染（FCP）小于 100ms 的同时，建立严格的 Edge KV 频控网关与单日财务硬熔断机制。

---

## 二、 系统架构与关键链路

系统由表现层、边缘计算网关、多模型调度防腐层、离线数据工程中台四大部分构成。

```
+-------------------------------------------------------------------------+
|                  客户端表现层 (Vanilla HTML5 / CSS3 / ES6+)              |
|  - 0-RTT 意图唤醒探针 (/api/ping)                                         |
|  - Web Worker 离屏图像预处理 (768x1024 16步对齐 + 显存物理归零)            |
|  - 3D 柱面曲面纸张卷曲动力学 + 欧拉飞轮惯性动量引擎                        |
|  - 胶片暗室显影仪式 (明胶银盐微粒流体扰动 + 阶段微状态)                   |
|  - 1080P 本地离屏排版导出 (Bodoni MT + 苏富比双轨无墨凹凸压印钢印)        |
+------------------------------------+------------------------------------+
                                     |
                                     | HTTPS / QUIC
                                     v
+------------------------------------+------------------------------------+
|               边缘计算网关层 (Cloudflare Workers + Hono)                |
|  - Anti-Bot 自动化爬虫过滤 (403 阻断 curl / requests / puppeteer 等)    |
|  - 边缘 KV 分布式限流 (单 IP 3次/小时、10次/天、高频突发 24h 封禁)      |
|  - FinOps 单日财务硬熔断 ($45 美元 / 1500 次调用上限短路保护)           |
|  - 动宾指令式 Prompt 装配引擎 (NC-6 用户输入与底层模型提示词完全隔离)    |
+------------------------------------+------------------------------------+
                                     |
                                     | 多轨容灾调度 (15s 硬超时保护)
                                     v
+------------------------------------+------------------------------------+
|                多模态图生图调度防腐矩阵 (Multi-Rail Dispatcher)         |
|  - 主选轨：302.ai (Gemini 3.1 Flash Lite Image) + 边缘内联中继自愈     |
|  - 备选轨 1：火山引擎豆包 (Seedream 5.0 Lite 2K)                        |
|  - 备选轨 2：硅基流动 Qwen-Image-Edit / Fal.ai FLUX.1                   |
|  - 兜底轨：官方 Milo WebP 高清标杆样片池 (无感自愈降级，前端永不抛错)    |
|  - SRE 诊断：企业微信 Webhook 根因告警机器人 (欠费/超时/鉴权卡片派发)   |
+-------------------------------------------------------------------------+
                                     ^
                                     | 离线数据支撑 (完全物理隔离)
+------------------------------------+------------------------------------+
|           离线数据工程与模板 SOP 中台 (pipeline/ - Python 驱动)         |
|  - 爆款流行趋势采掘 (Reddit / Instagram) + 跨文化交叉验证              |
|  - 三维心智模型评分卡 (准入评估与旗舰款式指定)                         |
|  - 动宾 Prompt Harness 逆向法典管理                                    |
|  - 内部双图评测沙盒 (internal_dual_image_tester.py)                     |
|  - Pipeline Studio 可视化管理工作台 (server.py + 原生前端)             |
+-------------------------------------------------------------------------+
```

---

## 三、 核心工程约束体系 (NC Matrix)

系统在架构与业务流程中强制贯彻 13 项不可逾越约束（Negative Constraints）：

| 编号 | 约束名称 | 核心技术实现与工程防线 |
| :--- | :--- | :--- |
| NC-1 | 海报绝对纯净原则 | 导出的 1080×1440 图像仅包含杂志刊头、年份、宠物名与艺术印章，Canvas 管线严禁渲染任何二维码、商业广告与推广水印。 |
| NC-2 | 商业凭证零泄漏 | 客户端与静态资产中严禁包含任何大模型 API Key；全部凭证加密托管于 Cloudflare Workers 环境变量与 Secrets。 |
| NC-3 | 算力成本与财务硬熔断 | 边缘网关通过 KV 计数器强制执行：单 IP 3次/小时、10次/天限制；10秒内突发请求大于 5 次自动列入 24 小时黑名单；全网单日调用达到 1500 次（约 45 美元）触发硬熔断并安全休眠。 |
| NC-4 | 15秒硬超时与图生图自愈 | 服务端接口调用绑定 AbortController 15,000ms 强制超时中断；上游模型异常或超时时，毫秒级无感降级返回官方 WebP 高清样片，保证用户界面零白屏、零报错。 |
| NC-5 | 非阻塞式遥测机制 | Microsoft Clarity（项目 ID: yf41ikpys2）遥测探针包裹于独立异常捕获中，上报丢包或被广告插件拦截绝对不阻断核心操作流程。 |
| NC-6 | 提示词注入零容忍 | 用户输入的爱宠名称仅供前端 Canvas 排版使用，严禁拼入大模型推理提示词；推理提示词严格由服务端预置的动宾模板安全装配。 |
| NC-7 | 前端体积零膨胀预算 | 前端单一文件（public/index.html）体积预算严格限制在 100KB~105KB 内，无任何构建编译打包工具，纯原生三件套交付。 |
| NC-8 | 反惊群指数退避重试 | 上游服务抖动时，重试逻辑必须引入 Full Jitter 随机全抖动与指数退避，打散瞬时并发重试流量，杜绝雪崩效应。 |
| NC-9 | 边缘反爬虫与自动化拦截 | 针对 python-requests、curl、wget、puppeteer、selenium、headlesschrome 以及空 User-Agent 客户端在边缘网关直接返回 403 阻断，杜绝无效账单消耗。 |
| NC-10| 故障转移与企微结构化告警 | 主模型推理失败时自动向备用模型 Failover；同时触发企业微信 Webhook 派发包含 TraceID、失败根因（欠费/超时/5xx/鉴权）的诊断告警卡片。 |
| NC-11| 内容安全与抗灰阶布光 | 客户端敏感词正则过滤；提示词强制注入饱和棚拍光效，负向词库显式排斥灰度（grayscale, washed out）与非安全人体裸露内容。 |
| NC-12| 移动端防 OOM 与相册直存 | 图像选择后前置执行离屏等比采样（768×1024），防止 iOS Safari WebKit 显存超限（Jetsam 300MB）导致崩溃刷新；成片视窗覆盖原生透明 img 标签，保证微信与内置 Webview 长按 100% 存储。 |
| NC-13| 等待情绪抚慰与生命周期自愈 | 15 秒模型推理等待期拆解为 4 幕动态工匠阶段；监听 Page Visibility API，切回前台时基于 performance.now() 时间差对齐最终状态，杜绝后台唤醒假死。 |

---

## 四、 关键技术实现与底层调优

### 1. 网络与计算机体系结构优化
* 0-RTT 意图驱动网络预热：在 HTML 头部声明预连接，在用户触发文件选择器阶段，静默向边缘服务发起轻量探针请求（`GET /api/ping`，返回 204 No Content，不消耗 KV 与 API 配额），提前激活移动端射频基带与 TCP/TLS 拥塞窗口，消除点击生成时的握手时延。
* 16 步进 VAE 硬件对齐：客户端离屏图像预处理强制收敛至 `768 × 1024`（被 16 整除的 3:4 黄金画幅），消除上游扩散模型变分自编码器（VAE）潜空间切块重采样的边缘畸变与计算损耗；配合 0.82 质量比 JPEG 硬件压缩，将上传体积从平均 5MB 缩减至约 55KB，网络上传耗时由数秒降至数十毫秒。

### 2. 操作系统与渲染管线防御
* 显存物理归零（防 iOS Safari OOM）：客户端集成内联 Web Worker 与 OffscreenCanvas，将 EXIF 旋转纠正与硬件缩放完全剥离浏览器主线程；图像绘制完成后，显式调用 `canvas.width = 0; canvas.height = 0; ctx = null;` 强制触发底层图形引擎（Skia/CoreGraphics）释放 GPU Framebuffer 显存，根除连续试穿导致的内存泄漏。
* 显存静默预解码与定格浮现（Silk Unveil Engine）：针对生成返回的图像，必须经由原生 `await img.decode()` 在 GPU 后台显存完成色彩空间映射与预光栅化，并辅以 4500ms 弱网熔断保护；解码完成后通过 320ms 复合贝塞尔曲线定格浮现，彻底消灭 Chromium 流式加载时的灰色马赛克截断与逐行扫描闪烁。
* 画布跨域安全双轨自愈导出：针对海外 S3/CDN 资源偶发丢失 CORS 头导致的画布污染（Tainted Canvas）异常，导出管线包裹完善的 `SecurityError` 降级拦截，一旦离屏 `toBlob()` 失败，毫秒级无感降级为原始大图直接下载，保障移动端用户存图成功率 100%。

### 3. 先锋交互动力学与多感官工程
* 3D 柱面曲面画幅卷曲（Cylindrical Paper Roll）：基于仿生数学模型（`rotateY` 柱面形变、`rotateZ` 纸张悬垂、`skewY` 弹性剪切与非对称圆角），模拟 300g 哑光艺术重磅铜版纸在空间中的韧性卷曲，配合 CSS 纯矢量高光扫射与环境折痕阴影。
* 欧拉飞轮惯性动量引擎：采集用户手势脱手初速度，基于欧拉微积分与空气阻尼系数（γ = 0.938）实现物理滑行，并在速度低于临界阈值时触发磁吸吸附（Magnetic Snap）与 380ms 误触阻断。
* 原生 Web Audio 声学总线：脱离外部音频资源，纯算法实时合成 Leica 机械快门段落声、铜版纸张摩擦沙沙声与齿轮单次咬合声，并与 4~8ms 硬件微脉冲（Taptic Engine）对齐在 15ms 神经突触感知窗口内。
* 苏富比无酸卡纸装裱与凹凸压印钢印：结果页采用 3:4 比例卡纸下沉阴影与设备陀螺仪微视差（±4.6° 极奢浮动）；导出端基于 Canvas 像素位移纯算法渲染双轨无墨凹凸压印防伪钢印（`VIVIBON · HAUTE COUTURE · ARCHIVAL PROOF · 1 OF 1`）。

---

## 五、 项目代码组织与目录规范

严格遵循物理隔离边界，禁止知识文档与生产构建混杂：

```
ViviBon Cover/
├── .github/                               # 自动化工作流中心
│   └── workflows/
│       ├── ci.yml                         # 质量门禁流水线 (NC 铁律校验、109 项测试套件)
│       └── cd.yml                         # 持续交付流水线 (Cloudflare Pages & Workers 自动部署)
│
├── public/                                # 前端生产部署根目录 (Cloudflare Pages 唯一源)
│   ├── index.html                         # 单一真理源 H5 应用 (<105KB Vanilla 单页)
│   ├── _headers                           # 边缘强缓存与跨域安全头
│   ├── _redirects                         # 边缘路由重定向配置
│   └── models/                            # 官方 IP 示范模特 (Milo) 12 款标杆 WebP 样片池
│
├── worker/                                # 边缘微服务根目录 (Cloudflare Workers + Hono)
│   ├── src/
│   │   ├── config/                        # 模板配置、提示词字典与 Milo 示范底模
│   │   ├── middleware/                    # Anti-Bot 爬虫防护、KV 频控、CORS 与链路追踪
│   │   ├── routes/                        # /api/generate, /health, /api/ping, /api/styles
│   │   ├── services/                      # 多轨 AI 调度防腐层、企业微信告警、SRE 指标服务
│   │   └── index.ts                       # Hono 应用入口
│   ├── tests/                             # 自动化测试套件 (84 项 Vitest 单元与集成测试)
│   ├── wrangler.toml                      # Cloudflare Workers 边缘与 KV 生产配置
│   └── package.json
│
├── pipeline/                              # 离线数据工程与 SOP 中台 (Python 驱动，生产隔离)
│   ├── assets/                            # 测试基准大片与沙盒猫咪基准图
│   ├── data/                              # 跨文化交叉验证数据、评分卡与配对数据集
│   ├── src/                               # 采掘器、评分器、Prompt 装配与沙盒评测引擎
│   ├── studio/                            # SOP 可视化工作台 (server.py + 原生前端)
│   └── tests/                             # 自动化测试套件 (25 项 Pytest 单元与沙盒测试)
│
├── docs/                                  # 全量知识与规范中心 (已加入 .gitignore，生产隔离)
│   ├── specs/                             # 业务状态机、工程规范、高可用规范与防御矩阵
│   ├── prompts/                           # 动宾指令式提示词工程法典
│   └── ops/                               # 实施进度表、开发审计流水账与冷启动排期
│
├── .skills/                               # 项目级专用工程与产品技能法典
├── scratch/                               # 本地调试与临时验证沙盒 (生产隔离)
├── .gitignore
├── AGENTS.md                              # 全局最高工程宪法与行为准则
└── README.md                              # 仓库对外唯一技术白皮书 (本文档)
```

---

## 六、 自动化测试体系与质量门禁

系统拥有完善的自动化测试矩阵，覆盖率达 100%，累计包含 **109 项自动化测试套件**：

### 1. 边缘微服务测试矩阵 (84 项 Vitest 测试)
位于 `worker/tests/`，验证边缘微服务的契约正确性、容灾韧性与安全防刷：
* `falService.test.ts` (14 项)：多轨 AI 调度故障转移（302.ai -> 火山引擎 -> 硅基流动 -> 标杆样片兜底）、15 秒超时 Abort 校验；
* `antiBot.test.ts` (6 项)：拦截 curl、python-requests、HeadlessChrome、空 UA 攻击，放行合规浏览器；
* `rateLimiter.test.ts` (7 项)：单 IP 小时/天配额、10 秒突发暴击自动黑名单、单日 1500 次财务硬熔断拦截；
* `safetyModeration.test.ts` (13 项)：爱宠名称注入清洗、违规词置换、防灰阶布光负向词审查；
* `alertService.test.ts` (9 项)：企业微信 Webhook 欠费/超时/鉴权失败根因卡片派发与 5 分钟防报警风暴去重；
* `clientDownsampling.test.ts` (6 项)：768×1024 离屏采样边界、16 步进对齐数学断言；
* `validator.test.ts` (7 项)：参数模式校验与非法模板拦截；
* `api.test.ts` (9 项)：Hono 路由端到端请求响应、CORS 头校验；
* `ping.test.ts` (2 项)：0-RTT 静默保活探针契约；
* `metricsService.test.ts` (5 项)：每日运营报表聚合与接口输出；
* `securityHardening.test.ts` (6 项)：安全加固与环境变量校验。

### 2. 数据工程测试矩阵 (25 项 Pytest 测试)
位于 `pipeline/tests/`，验证离线采掘与沙盒评测管线：
* `test_cross_validator.py` (3 项)：跨文化趋势交叉验证与置信度计算；
* `test_dataset.py` (2 项)：三元组蒸馏训练集格式合规性；
* `test_distill_pipeline.py` (3 项)：Prompt 装配与物种笛卡尔积数据集导出；
* `test_internal_tester.py` (3 项)：内部双图沙盒评测引擎执行与门禁校验；
* `test_prompt_harness.py` (3 项)：动宾指令与款式排斥词组装逻辑；
* `test_reddit_collector.py` (2 项)：海外数据采掘标准化清洗；
* `test_scorecard.py` (2 项)：三维心智评分卡权重与旗舰准入判定；
* `test_studio_server.py` (7 项)：SOP 中台后端 REST API 接口状态与数据交互。

### 3. GitHub Actions 全自动流水线
* `ci.yml` 触发时机：推送到主分支或提交 Pull Request。自动串行执行前端红线门禁（体积小于 105KB、纯艺术过滤、Token 泄漏扫描、JavaScript 语法树解析）、后端微服务 84 项测试与数据工程 25 项测试。全部通过后输出通行裁决。
* `cd.yml` 触发时机：代码合并至主分支后。检测 GitHub Secrets 凭据，若配置了 `CLOUDFLARE_API_TOKEN` 与 `CLOUDFLARE_ACCOUNT_ID`，自动将前端部署至 Cloudflare Pages、后端部署至 Cloudflare Workers。未配置时优雅跳过。

---

## 七、 本地开发与快速上手

### 1. 前端本地启动
```bash
# 根目录下直接启动静态服务器，访问 public 目录
python -m http.server 3000 -d public
# 浏览器访问：http://localhost:3000
```

### 2. 后端 Worker 启动与测试
```bash
cd worker

# 安装依赖
npm install

# 静态类型检查 (Strict Mode)
npm run typecheck

# 运行 84 项自动化测试套件
npm test

# 启动本地边缘微服务 (默认端口 8787)
npm run dev
```

### 3. 数据工程 Pipeline 测试
```bash
# 安装 Python 测试依赖
pip install pytest pytest-asyncio

# 运行 25 项数据工程自动化测试
python -m pytest pipeline/tests -v
```

---

## 八、 生产部署规范

### 1. 前端发布 (Cloudflare Pages)
```bash
# 必须显式指定发布目录为 public
npx wrangler pages deploy public --project-name=vivibon-cover --branch=main
```

### 2. 后端发布 (Cloudflare Workers)
```bash
cd worker

# 重新编译生产 bundle 产物
node build.js

# 发布至全球边缘节点
npx wrangler deploy
```

### 3. 生产环境变量说明 (Secrets)
后端生产服务依赖以下安全凭据（需通过 Cloudflare Dashboard 或 `wrangler secret put` 注入，严禁明文推送到仓库）：
* `AI302_API_KEY`：302.ai 商业多模态生图 API 密钥（Gemini 3.1 Flash Lite）；
* `VOLCENGINE_API_KEY`：火山引擎 API 密钥（豆包 Seedream 5.0 Lite）；
* `SILICONFLOW_API_KEY`：硅基流动商业 API 密钥（Qwen-Image-Edit 备选轨）；
* `FAL_KEY`：Fal.ai API 密钥（FLUX.1 海外备选轨）；
* `WECHAT_WEBHOOK_URL`：企业微信 SRE 根因告警机器人 Webhook 完整地址；
* `RATE_LIMIT_KV`：Cloudflare KV 命名空间绑定 ID（用于毫秒级频控与财务硬熔断）。
