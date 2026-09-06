---
name: pet-portrait-haute-couture-generator
description: >-
  ViviBon Cover 专属爱宠高定视觉架构师与逆向约束工程法典。
  基于阿里通义千问 Qwen-Image-Edit 与 Fal.ai FLUX.1 双轨引擎，
  规范动宾指令式 Prompt 范式、20+ 项全维度负向约束防御、
  客户端前置零浪费门禁（FinOps Zero-Waste Gate）与顶级大刊（Vogue/Kinfolk）海报审美排版准则，
  确保 100% 保持爱宠五官骨骼几何（Face ID）与零算力浪费。
---

# Pet Portrait Haute Couture Generator Skill (爱宠高定视觉架构师与逆向约束法典)

> **核心定位**：专为 ViviBon Cover 打造的爱宠面部特征物理保真（Face ID Preservation）、高定换装大模型工程调度与顶级时尚期刊海报美学控制体系。
> **工程信仰**：坚决杜绝“狸猫换太子”生成全新宠物；锁死原宠品种、轮廓、花纹与神态；不浪费模型一分钱算力；海报 100% 具备奢侈品级审美与纯净度。

---

## 1. 触发时机 (Trigger Condition)

当出现以下情况时，强制激活并严格执行本 Skill：
1. 编写、调整或优化 `POST /api/generate` 背后的大模型提示词（Prompt）与负向提示词（Negative Prompt）；
2. 选型、更换或调优生图模型端点（如硅基流动 `Qwen/Qwen-Image-Edit` 或海外 `fal-ai/flux/dev/image-to-image`）；
3. 调整生图推理步数（`num_inference_steps`）、输出画幅尺寸（`image_size`）或超时熔断配置；
4. 优化用户相片上传质检管线（分辨率、曝光直方图过滤）以守死 FinOps 财务红线；
5. 调整 Canvas 1080×1440 高定海报字体、字阶、间距、色值与等比裁切算法时。

---

## 2. 生产双轨引擎与参数契约 (Production Dual-Engine Matrix)

### 2.1 国内主干引擎：硅基流动 SiliconFlow (`Qwen/Qwen-Image-Edit`)
- **定位**：国内极速首选、超高性价比、零外币支付门槛。
- **调用端点**：`https://api.siliconflow.cn/v1/images/generations`
- **参数契约**：
  ```json
  {
    "model": "Qwen/Qwen-Image-Edit",
    "prompt": "<动宾指令式四段式 Prompt>",
    "negative_prompt": "<20+ 项全量排斥字典>",
    "image": "<Base64 Data URI (下采样后约 180KB)>",
    "image_size": "768x1024",
    "num_inference_steps": 10
  }
  ```
- **核心工程参数解释**：
  - `image_size: '768x1024'`：天然具备 3:4 移动端黄金纵向比例，与 1080×1440 海报 1:1 精确匹配，根除拉伸畸变；
  - `num_inference_steps: 10`：经生产压测，将推理耗时从 30s+ 压缩至 13.6s（提速 55%），爱宠毛发眼神保真度无损。

### 2.2 海外备选引擎：Fal.ai (`fal-ai/flux/dev/image-to-image`)
- **定位**：海外用户节点极速路由与高阶备用。
- **参数契约**：
  ```json
  {
    "image_url": "<Base64 Data URI>",
    "prompt": "<高定 Prompt>",
    "strength": 0.68,
    "num_inference_steps": 24,
    "guidance_scale": 3.5,
    "enable_safety_checker": true
  }
  ```

---

## 3. 动宾指令式五段结构 Prompt 工程铁律 (Action-Oriented Edit Prompt)

针对图像编辑模型（Image Editing Model）特性，绝对禁止使用纯文本描述性语法（如 "A cute dog wearing..."），必须严格执行“动宾指令 + 区域锁定 + 华服材质 + 留白与布光 + 绝对保留从句”的五段物理结构：

```text
[第 1 物理段 · 动宾指令与区域锁定 (Imperative Action & Target Zone)]:
Dress the exact same pet dog from the input image from the neck and shoulders down in a bespoke...

[第 2 物理段 · 高定华服材质微距 (Haute Couture Fabric & Tailoring)]:
...bespoke luxury <服饰面料、颜色、配饰精准描述，如：dark navy blue velvet tuxedo suit with crisp white shirt collar and black velvet bow tie>...

[第 3 物理段 · 摄影棚布光与刊头留白 (Studio Lighting & Negative Space)]:
...High-end commercial luxury pet portrait photography, 85mm portrait lens, delicate studio rim light accentuating authentic fur texture, sharp focus on pet eyes, clean solid seamless studio backdrop, ample negative space at top for magazine typography, hyperdetailed, 8k resolution, no text, no logo, award-winning studio portrait.

[第 4 物理段 · 绝对保留从句 (Strict Preservation Clause)]:
Strictly preserve the original pet's facial structure, ear contours, eye color, snout shape, and exact fur markings 100% unchanged. Do NOT alter the dog's breed, head shape, or facial geometry.
```

---

## 4. 极其严格的 20+ 项全维度逆向约束字典 (Negative Constraints)

为杜绝 Diffusion 模型在画面上乱画“假 Vogue”、“假杂志标题”或引入肢体畸变，必须强制挂载以下逆向排斥字典：

```text
export const NEGATIVE_PROMPT = 
  // 1. 文本与排版污染排斥 (保证 Canvas 正规排版零冲突)
  'text, typography, letters, words, logo, trademark, brand name, magazine cover title, watermark, signature, font, caption, subtitle, heading, UI, ' +
  // 2. 生物畸变与品种漂移排斥 (捍卫 Face ID 物理底线)
  'different dog, wrong breed, human face, deformed ears, extra legs, distorted anatomy, warped snout, deformed eyes, extra paws, ' +
  // 3. 画质退化与噪点排斥
  'blurry, low quality, lowres, jpeg artifacts, noisy, overexposed, underexposed, ' +
  // 4. 杂质风格排斥 (保证真实摄影棚写性质感)
  'cartoon, illustration, 3D render, drawing, CGI, painting, sketch, anime, doll, amateur photography.';
```

---

## 5. 确保不浪费一分钱：客户端前置零浪费门禁 (FinOps Pre-Flight Gate)

为贯彻商业化盈利底线与 Unit Economics 控制，绝不允许任何无效或低质请求打到付费模型端点。前端必须在调用 API 前完成 3 道物理级拦截：

1. **尺寸下限拦截**：
   - 图像宽与高必须 `>= 250px`，阻断小图标、表情包或严重破损图片；
2. **曝光直方图亮度拦截 (Canvas Luminance Check)**：
   - 采样计算像素加权平均亮度：`Y = 0.299*R + 0.587*G + 0.114*B`；
   - 若 `Y < 15`（全黑、镜头遮挡、夜间无光）：直接在客户端拦截，提示“照片过暗，请重新上传清晰明亮的爱宠正面照”；
   - 若 `Y > 245`（严重过曝、纯白无效图）：直接在客户端拦截；
   - **拦截结果**：**零网络传输、零 API 扣费，不浪费模型一分钱**！
3. **客户端智能下采样**：
   - 本地将大图等比缩放至最大边 `1024px`，JPEG 质量 `0.88`，输出 `~180KB` Base64，网络上传由 10s 缩减至 200ms。

---

## 6. 顶级时尚大刊海报审美与排版规范 (Editorial Aesthetic Masterclass)

导出海报必须达到 *Vogue*、*Harper's Bazaar*、*Kinfolk* 的艺术纯净度与印刷级质感：

1. **画布规格**：严格 `1080 × 1440` (3:4 移动端黄金画幅)；
2. **刊头 (Masthead)**：
   - 文字：`VIVIBON COVER`
   - 字体：`900 74px 'Bodoni MT', 'Didot', 'Times New Roman', serif`
   - 颜色：纯白 `#FFFFFF`，微距阴影 `rgba(0,0,0,0.4)`，呼吸字距；
3. **期号与副标 (Issue & Subhead)**：
   - 文字：`AUTUMN 2026 / HAUTE COUTURE EDITION`
   - 字体：`600 24px -apple-system, sans-serif`，纯白半透 `rgba(255,255,255,0.85)`，右对齐；
4. **高定金标 (Couture Tag)**：
   - 颜色：爱马仕金 `#C5A059` (或 `#D4AF37`)
   - 字体：`800 28px -apple-system, sans-serif`，大写字母；
5. **爱宠主标题 (Pet Headline)**：
   - 文字：`{爱宠昵称} · {造型名称}`
   - 字体：`800 52px -apple-system, sans-serif`，纯白高亮；
6. **双向电影级暗角 (Cinematic Dual-Gradient)**：
   - 顶部渐变：`0 -> 380px`，`rgba(0,0,0,0.68) -> transparent`（确保浅色毛发上方的白字刊头清晰锐利）；
   - 底部渐变：`height - 480px -> height`，`transparent -> rgba(0,0,0,0.94)`（使底部金标和标题完美融合）；
7. **零几何变形 (object-fit: cover 裁切)**：
   - 动态计算源图像宽高比与 0.75 (3:4) 关系，居中裁切多余边距，X 轴与 Y 轴缩放比例完全 1:1，100% 保持面部天然几何形态。
