---
name: apple-ui-ux-craftsman
description: >-
  顶级 Apple 级 UI/UX 体验与工匠设计技能。
  基于 Apple Human Interface Guidelines (HIG)、iOS Native Design System 与 Linear/Raycast 现代设计哲学，
  指导构建具备通透纯净色彩空间、超椭圆连续曲率（Squircle）、毛玻璃拟真层叠（Liquid Glass）、杂志级排版与物理弹簧动效的顶级移动 Web/H5 界面。
---

# Apple UI/UX Craftsman Skill (顶级 Apple 级 UI/UX 工匠设计)

> **定位**：拒绝普通、平庸、生硬的 Web 界面，打造一眼震撼（WOW）、通透纯净、极致克制与温润灵动的 Apple 级奢华数字产品体验。
> **核心原则**：Clarity（清晰直观）、Deference（界面克制，内容第一）、Depth（光影与层次）、Continuous Squircle（超椭圆连续曲率）、Spring Physics（物理弹簧反馈）。

---

## 1. 触发时机 (Trigger Condition)

当出现以下情况时，强制激活并严格执行本 Skill：
1. 设计、重构或审查前端 H5 / Web 应用的界面样式、组件库与视觉系统时；
2. 页面出现暗沉/脏浊色彩、粗暴生硬描边、生硬直角、缺乏呼吸感或排版混乱时；
3. 为按钮、卡片、模态窗、状态切换设计交互动效（Hover, Tap, Transition）与触觉反馈时；
4. 适配 iPhone / iPad 全面屏安全区（Safe Area）、灵动岛与刘海屏时。

---

## 2. 顶级 Apple 设计体系规范 (Design Tokens & Rules)

### 2.1 色彩与光影空间 (Color & Ambient Light)
- **拒绝**：大面积使用脏浊的泥土黄褐色、高饱和刺眼纯色、生硬纯黑 `#000000` 背景；
- **推崇**：
  - **基底系统灰色阶**：
    - 主背景（System Background Primary）：`#F2F2F7` (Apple Light Gray) 或 `#F9F9FB`
    - 卡片背景（System Card Secondary）：`#FFFFFF` (纯净微透卡片)
    - 次级灰度：`--gray-1: #8E8E93`, `--gray-2: #AEAEB2`, `--gray-5: #E5E5EA`, `--gray-6: #F2F2F7`
  - **通透毛玻璃（Liquid Frosted Glass）**：
    - `background: rgba(255, 255, 255, 0.78); backdrop-filter: blur(24px) saturate(180%);`
    - 配备内高光微边框：`border: 1px solid rgba(255, 255, 255, 0.65);`
  - **弥散环境光晕（Ambient Aura Breathing）**：
    - 400px 广域径向渐变，`filter: blur(80px~120px)`，在页面深处缓缓呼吸起伏，营造温润陪伴感。

### 2.2 超椭圆曲率与模组层级 (Continuous Squircle & Bento)
- **拒绝**：生硬的矩形、过小的锐角或直角线条；
- **圆角层级规范**：
  - 小胶囊 / Badge / 药丸按钮：`rounded-full` (`border-radius: 9999px`)
  - 小操作按钮 / Tag 标签：`rounded-[14px]`
  - 标准表单输入框 / 操作卡片：`rounded-[20px]` ~ `rounded-[24px]`
  - Bento 大模组容器 / 弹窗：`rounded-[28px]` ~ `rounded-[32px]`
- **双层极轻柔弥散投影（Subtle Dual-layer Shadows）**：
  - `box-shadow: 0 12px 32px -4px rgba(28, 28, 30, 0.06), 0 2px 8px -2px rgba(28, 28, 30, 0.04);`

### 2.3 杂志级字体排版 (Typography Hierarchy)
- **字体族声明**：
  ```css
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro Rounded", "Helvetica Neue", Arial, sans-serif;
  ```
- **字阶与字距收放规范**：
  - **大标题 (Display Title)**：`text-[28px]~[34px] font-bold tracking-tight text-[#1C1C1E] leading-tight`
  - **段落正文 (Body)**：`text-[15px] font-normal leading-relaxed text-[#3A3A3C]`
  - **辅助标签 / Eyebrow**：`text-[11px]~[12px] font-semibold text-[#8E8E93] uppercase tracking-wider`
  - **等宽数字**：`font-variant-numeric: tabular-nums`

### 2.4 物理弹簧动效、底抽屉与 7 大通用交互法则 (Spring Physics & Universal Interaction Laws)

#### (1) Apple 原生底抽屉物理规范 (Spring Bottom Sheet Specification)
所有模态抽屉（Action Sheet / Modal Drawer）必须遵循 iOS `UISheetPresentationController` 与开源标杆（Vaul / Linear）标准：
- **双状态机生命周期（Mount & Visible Lifecycle）**：
  - 严禁简单 `if (!isOpen) return null` 导致退场瞬闪；必须维护 `isMounted`（DOM 存在）与 `isVisible`（CSS 状态）；
  - **入场双帧隔离（Frame Separation）**：挂载后必须留出 20ms 初始渲染帧（`setTimeout(..., 20)`），确保浏览器先在屏幕外（`translateY(100%)`）完成 Paint，再平滑触发向上升起过渡；
  - **退场完整播放保护（Unmount Timer）**：关闭时先触发 `translateY(100%)` 下滑，等待 **460ms** 动画完整沉入底部后再销毁 DOM。
- **物理缓动曲线与时间节奏**：
  - 抽屉升降：`transition: transform 460ms cubic-bezier(0.16, 1, 0.3, 1)`（偏慢速、流体减速阻尼，极富高级重量感）；
  - 背景遮罩与高斯模糊：`transition: opacity 420ms ease-out; bg-black/40 backdrop-blur-xs;`
- **触摸阻尼下拉手势 (Drag-to-Dismiss)**：
  - 顶部 Handle 抓手监听 Touch 手势，手指下滑时实时更新 `translateY(offset)`；
  - 松手判定：下滑位移 `> 70px` 则触发惯性滑出关闭，否则带有弹性平滑回弹。

#### (2) 顶级 APP 7 大通用交互法则 (The 7 Universal Interaction Laws)
1. **物理微缩按压态 (Tactile Depress)**：按钮与卡片按下时下陷微缩 `active:scale-[0.98]`（松手带轻微 spring 弹回），拒绝生硬变暗；
2. **触觉反馈分级系统 (Haptic Hierarchy)**：严格分级调用 `triggerHaptic`（`selection` 微弱咔哒、`light` 轻微吸附、`medium` 确认、`success` 愉悦双振、`error` 阻尼警告）；
3. **乐观 UI 即时响应 (Optimistic UI)**：点击开关、改资料、发消息时界面 **0ms 立即生效**，后台异步网络同步，杜绝粗暴的转圈 Loading 阻塞；
4. **超椭圆与连续曲率 (Continuous Squircle G2)**：卡片采用 `rounded-[20px]~[28px]`，消灭生硬直角折点；
5. **弥散环境光与 1px 顶部微光边框 (Liquid Glass Inset)**：白底卡片配备 `border-t border-white/80` 与 `shadow-[0_12px_32px_rgba(28,28,30,0.06)]`，消灭死黑重阴影；
6. **手势优先与全屏边缘滑动返回 (Gesture-First)**：支持边缘滑动返回，视差平滑过渡；
7. **骨架屏微光流转与状态平滑形变 (Shimmer & Morphing Transition)**：加载时采用微光流转骨架，卡片展开为详情页时使用平滑形态形变。

### 2.5 移动端安全区与视口约束 (Safe Area Compliance)
- 顶部导航：`padding-top: calc(env(safe-area-inset-top) + 12px)`
- 底部 TabBar / 操作栏：`padding-bottom: calc(env(safe-area-inset-bottom) + 16px)`
- 全局容器：`max-w-lg mx-auto min-h-[100dvh]`，禁止出现任何非预期的横向滚动条（Horizontal Overflow）。

---

## 3. UI/UX 验收检查清单 (Checklist)

每次完成页面设计或重构后，必须逐项自检以下 8 项红线：

1. [ ] **色彩通透性**：背景是否清爽纯净？是否存在发暗的土黄色或脏灰色？
2. [ ] **毛玻璃与层次**：顶部导航栏与悬浮卡片是否具备 `backdrop-blur` 高斯模糊与内高光？
3. [ ] **圆角曲率**：卡片是否全部采用 Squircle (`rounded-[20px]~[28px]`)，消灭尖锐直角？
4. [ ] **排版张力**：大标题与副标题之间是否有明确的粗细、字号与颜色阶梯？
5. [ ] **按压动效**：所有可点击元素是否具备 `scale: 0.98` 弹性反馈与触感分级？
6. [ ] **抽屉升降动效**：底抽屉是否具备 460ms `cubic-bezier(0.16, 1, 0.3, 1)` 双向升降与手势下拉阻尼？
7. [ ] **多机型安全区**：在 iPhone SE (375px) 与 iPhone 15 Pro (393px) 上是否无截断、无遮挡？
8. [ ] **视觉卫生**：DOM 中是否存在未渲染的占位符（如 `undefined`, `null`）、坏图或粗暴的实线分割？
