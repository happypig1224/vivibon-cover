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
    "prompt": "<动宾指令式五段式 Prompt>",
    "negative_prompt": "<全维度抗过度磨皮与防穿模排斥字典>",
    "image": "<Base64 Data URI (下采样后约 180KB)>",
    "image_size": "768x1024",
    "num_inference_steps": 20,
    "guidance_scale": 4.5
  }
  ```
- **核心工程参数解释**：
  - `image_size: '768x1024'`：天然具备 3:4 移动端黄金纵向比例，与 1080×1440 海报 1:1 精确匹配，根除拉伸畸变；
  - `num_inference_steps: 20`：充足的去噪步数，彻底解决 8~10 步导致的粗糙磨皮与塑胶蜡像感，还原纤毫毕现的原生真犬毛流与湿润鼻革质感；
  - `guidance_scale: 4.5`：适度的引导比例，在确保高定服饰与神态服帖的同时，杜绝过饱和与色彩漂移。

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

## 3. 四大核心专业协同法则与 Prompt 工程铁律 (The 4-Expert Masterclass Synergy)

顶级爱宠高定 Prompt 绝非普通文字堆砌，而是由 **AI 视觉总监、生物解剖学家、商业摄影指导与 Technical Prompt 架构师** 四大专业共同构筑的绝对壁垒：

### 3.1 四大不可逾越的黄金心法：
1. **【本体神圣不可侵犯法则】(Sacred Pet Anatomy & Zero-Human-Grafting)**：
   - **绝对禁止任何人类假发套（Wigs）、假发片、中分发、人耳与人发！** 宠物的原生头骨、立耳/垂耳、原生毛色与毛流是第一主角；
   - **服饰从颈肩以下裁剪（Neck-Down Tailoring）**：服装包裹从颈部胸骨向下延展，严禁逆向蔓延至脸颊或头顶。
2. **【生物力学姿态约束】(Biomechanical Posing)**：
   - 犬科与猫科动物是趾行动物，无人类可自由内旋锁骨，**严禁人类双手交叉胸前抱胸姿态**；
   - **姿态唯一解**：双前爪自然平放于桌沿，或优雅平搭在古典扶手椅（Pozzetto armrest）上，还原真实骨骼、天然肉垫与微露爪尖。
3. **【名画神韵降维映射】(Aesthetic Essence Mapping)**：
   - 提取大师的“光影、色调、衣袍面料、空间构图”，绝不将名画人物的器官、头发移植给动物；
   - 采用达芬奇 **Sfumato 薄雾渐隐法**、维米尔北向窗冷光、伦勃朗三角光（Triangle Lighting）。
4. **【双向强对冲结界】(Bi-directional Negative Barrier)**：
   - 正向指令切断假发词汇；负向词前置封死 `human hair, wig, hairpiece, fake hair, crossed arms, folded hands, human arms`。

### 3.2 动宾指令式五段物理结构 (Action-Oriented Edit Prompt)：

```text
[前置全局稳定指令 · 原生中文底层防腐 (Global Stability Directive)]:
以上传的真实宠物照片为唯一主体，严格执行全局稳定规则。画面中只有同一只宠物，不新增、替换、混合或复制其他动物。严格保留宠物的种类与品种、头脸轮廓、眼睛形状与间距、瞳色、鼻头形状与颜色、嘴部比例、耳朵形状与位置、原生毛色、花纹分区、毛长、体型比例和年龄感。不得把宠物美化成另一只宠物，不擅自增减斑纹。保持真实毛发颗粒与微纹理，毛流清晰可见，严禁过度磨皮，严禁塑料感或蜡像质感。宠物头部保持纯天然毛色，零假发，零头套！宠物始终保持真实动物解剖结构：只有一颗头、两只眼睛、两只耳朵、一个鼻子，以及符合原照片物种的四肢与带毛爪子，严禁出现人类手臂、手掌、手指、皮肤、脖颈或身体。四肢与躯干连接自然，关节方向合理，服装和配饰从颈肩向下覆盖，不穿模。根据模板微调神态表情与视线，面部清晰完整无遮挡。

[第 1 物理段 · 动宾指令与区域锁定 (Imperative Action & Target Zone)]:
Dress the EXACT SAME pet from the input image from the neck and shoulders down, strictly preserving its natural head, native ears, and facial identity 100% untouched without any wig, hat, or hairpiece...

[第 2 物理段 · 模版自适应微表情与视向 (Adaptive Nuanced Expression & Gaze)]:
...Adapt the pet's facial expression, gaze, and head angle subtly to naturally suit the scene (e.g., curious whimsical wide-eyed wonder / serene enigmatic Mona Lisa smile / earnest hardworking gaze)...

[第 3 物理段 · 高定华服材质与生物力学无穿模空间 (Haute Couture Fabric & Biomechanical Anatomy)]:
...bespoke luxury <服饰面料、剪裁、色彩精准描述，双前爪自然平放桌沿或平搭于扶手椅木质扶手上，严格杜绝人类抱胸与桌面横切肢体>...

[第 4 物理段 · 商业大师布光与原生真毛发锐度 (Master Lighting, Negative Space & Tactile Fur)]:
...真实自然的摄影写真风格，细腻真实的动物毛发微纹理，毛发根根分明，湿润皮革质感鼻头，生动自然眼神光。超柔光补光与单侧主光，避免死黑硬阴影，五官清晰立体，画面景深自然，零过度磨皮，零塑料感，顶部预留干净杂志排版空间。 High-end commercial luxury pet portrait photography, 85mm portrait lens, rich vibrant natural color grading, high dynamic range, glossy fur highlights, deep warm studio lighting, delicate studio rim light accentuating authentic fur texture, lifelike tactile fur sharpness with visible individual hair fibers, sharp focus on pet eyes, clean solid seamless studio backdrop, ample negative space at top for magazine typography, hyperdetailed, 8k resolution, no text, no logo, zero 3D render, zero plastic smoothing, award-winning studio portrait.

[第 5 物理段 · 绝对保留从句 (Strict Preservation Clause)]:
Strictly preserve the original pet's facial structure, eyes, snout geometry, ear shape and position, native fur coloration, distinctive markings, body proportions and age 100% unchanged. Preserve 100% authentic fur grain and microtexture, individual hair strands around muzzle and ears, natural porous leather texture of the nose, and realistic eye catchlights. Absolutely NO skin smoothing, NO beauty filtering, NO plastic wax finish, NO cartoonish airbrushing. Maintain authentic animal anatomy. Strictly NO human arms, hands, fingers, skin, human neck or human body. Unmasked face, head and eyes fully visible and natural.
```

---

## 4. 终极全维度逆向排斥字典矩阵 (Master Negative Constraints)

强制挂载以下双语强排斥结界，将假发、抱胸、肢体穿模与塑料感彻底湮灭：

```text
export const NEGATIVE_PROMPT = 
  // 1. 假发、头发与肢体嫁接封杀 (反中分黑发/反恐怖谷)
  'human hair, wig, hairpiece, fake hair, toupee, middle-part hair, crossed arms, folded hands, human arms, human fingers, human hands, human body, human chest, human cleavage, bare human skin, human neck, human shoulders, hybrid human-animal, ' +
  // 2. 中文原生排斥字典 (通义千问原生注意力锚点)
  '假发、中分发、人发、头发、头套、发片、人耳、双手抱胸、交叉手臂、前腿拉长成人臂、手指、人类手掌、衣领内出现人类胸口、前爪数量错误、交叉肢体融合、长袍穿过身体、大块布幔、白色头纱、其他动物、第二只宠物、复制主体、品种变化、脸部变化、毛色变化、花纹变化、瞳色变化、眼睛不对称、斜视、五官错位、畸形嘴鼻、多头、多眼、多耳、多腿、缺腿、额外爪子、融合肢体、扭曲关节、断肢、悬空肢体、人类身体、人类皮肤、人类脖颈、半人半兽、衣物穿模、配饰穿模、道具穿模、遮挡面部、塑料毛发、过度磨皮、低清晰度、噪点、重影、重复元素、画面外截断头顶或爪子、比例失衡、文字乱码、水印、品牌标志, ' +
  // 3. 深度抗磨皮与塑胶蜡像排斥 (根治过度磨皮与假人感)
  'oversmoothed fur, airbrushed, skin smoothing, wax figure, plastic doll, silicone skin, 3D render, CGI, cartoon, anime, illustration, 3D animation, video game asset, smooth flat shading, blurred fur texture, altered fur color, faded coat, discolored fur, missing whisker pores, plastic nose, artificial shine, doll skin, beauty filter, deadpan expression, unnatural stare, ' +
  // 4. 防穿模与肢体畸变排斥 (根除桌面横切与悬空断爪)
  'table cutting body, desk penetrating chest, floating paws, disembodied paws, severed paws, deformed limbs, horizontal barrier, clipping props, floating accessories, clothes clipping, accessories clipping, distorted anatomy, warped snout, deformed eyes, extra legs, missing legs, extra paws, fused limbs, severed limbs, ' +
  // 5. 文本与排版污染排斥 (保证 Canvas 1080P 正规排版零冲突)
  'text, typography, letters, words, logo, trademark, brand name, magazine cover title, watermark, signature, font, caption, subtitle, heading, UI, breed name, ' +
  // 6. 画质退化与色彩破坏排斥 (NC-11 纯净原则)
  'blurry, low quality, noisy, jpeg artifacts, monochrome, black and white, grayscale, desaturated, dull colors, washed out, low contrast, hazy, dim, underexposed, dark muddy shadows, plastic texture, human cleavage, bare skin, naked, nude, bikini, erotic, suggestive, extra fingers, deformed paws.';
```

---

## 5. 确保不浪费一分钱：客户端前置零浪费门禁 (FinOps Pre-Flight Gate)

为贯彻商业化盈利底线与 Unit Economics 控制，绝不允许任何无效或低质请求打到付费模型端点。前端必须在调用 API 前完成 3 道物理级拦截：

1. **尺寸下限拦截**：
   - 图像宽与高必须 `>= 240px`（推荐 `>= 250px`），阻断小图标、表情包或严重破损图片；
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
   - 动态计算源图像宽高比与 0.75 (3:4) 关系，居中裁切多余边距，X 轴与 Y 轴缩放比例完全 1:1，100% 保持面部天然几何形态；
8. **NC-1 纯艺术铁律**：严禁在画布上绘制任何二维码、营销推广语、URL 链接或商业水印。

---

## 7. 5 层可控约束 Harness 与质量守门管线 (Harness & Quality Gate)

为从根本上解决 Diffusion 模型“狸猫换太子”面部漂移与商业化可控性问题，本 Skill 规定标准的 5 层 Harness 执行管线：

```
[原宠照片] 
   │
   ▼
[Layer 1: Pre-Flight Gate] ─── (未通过: 尺寸<240px / 亮度<15 或 >245) ──► 客户端拦截 (0扣费)
   │ (通过: 缩放至 1024px, ~180KB)
   ▼
[Layer 2: Prompt Harness] ──── (动宾指令 + 区域锁定 + 华服材质 + 留白 + 20+ 逆向排斥)
   │
   ▼
[Layer 3: Dual-Rail Dispatch] ──► 国内主轨: 硅基流动 Qwen-Image-Edit (768x1024, 10步, 12-14s)
   │                             海外备选: Fal.ai FLUX.1 (strength 0.68, 24步)
   │                             异常熔断: 高清 WebP 预置样片池 (<1.8s)
   ▼
[Layer 4: Automated Quality Gate] ─── (DINOv2/CLIP 余弦相似度 >= 0.72)
   │                                   低于 0.72 判定为品种漂移，触发重试/告警
   ▼
[Layer 5: Editorial Typography] ─── (1080x1440 Bodoni 纯艺术刊头，NC-1 零二维码零水印)
   │
   ▼
[成片输出 & Microsoft Clarity 遥测上报 (yf41ikpys2: poster_exported)]
```

- **Python 可执行参考实现**：详见 [scratch/pet_portrait_harness.py](file:///c:/Users/33046/Desktop/ViviBon%20Cover/scratch/pet_portrait_harness.py)。
- **33 款高定模板全矩阵**：详见 [vivibon_cover生图提示词_稳定模板版.md](file:///c:/Users/33046/Desktop/ViviBon%20Cover/docs/prompts/vivibon_cover%E7%94%9F%E5%9B%BE%E6%8F%90%E7%A4%BA%E8%AF%8D_%E7%A8%B3%E5%AE%9A%E6%A8%A1%E6%9D%BF%E7%89%88.md) 与 [ViviBon Cover 风格级联体系与具象化规范.md](file:///c:/Users/33046/Desktop/ViviBon%20Cover/docs/specs/ViviBon%20Cover%20%E9%A3%8E%E6%A0%BC%E7%BA%A7%E8%81%94%E4%BD%93%E7%B3%BB%E4%B8%8E%E5%85%B7%E8%B1%A1%E5%8C%96%E8%A7%84%E8%8C%83.md)。

