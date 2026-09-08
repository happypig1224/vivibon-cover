---
name: vivibon-h5-edge-craftsman
description: >-
  ViviBon Cover 专属移动 Webview 与 H5 边缘前端工匠技能。
  基于海外主流社交平台（Instagram / TikTok / Safari）内嵌 Webview 严苛环境与 Cloudflare Pages 边缘分发最佳实践，
  指导构建首屏 FCP < 100ms、1080P 高清 Canvas 杂志排版、长按存图自愈与零阻塞防御埋点的轻量顶级 H5 体验。
---

# ViviBon H5 Edge Craftsman Skill (移动 Webview 与 H5 边缘前端工匠)

> **核心定位**：专为 ViviBon Cover 打造的极致轻量、超低延迟、全机型内嵌 Webview 鲁棒的前端工程技能。
> **工程信仰**：零重型运行时、首屏闪电秒开、海报 100% 艺术纯净、异常毫秒级自愈。

---

## 1. 触发时机 (Trigger Condition)

当出现以下情况时，强制激活并严格执行本 Skill：
1. 编写、重构或审查 `ViviBon Cover.html`、`index.html` 以及任何前端 H5 界面与脚本时；
2. 调整 Canvas 1080×1440 杂志海报排版、图层绘制、滤镜合成或暗角渲染时；
3. 优化海外 TikTok / Instagram / Safari In-App Webview 首屏性能、触摸手势与安全区适配时；
4. 编写或调试本地海报下载、Blob 转换、iOS 长按保存自愈以及 PostHog 数据埋点时。

---

## 2. 核心工程体系与代码规约 (Engineering Standards)

### 2.1 零打包与极限性能规约 (NC-7)
- **绝对禁止**：在项目中引入 React, Vue, Next.js, Webpack, Vite 等重型打包依赖，禁止体积超过 100KB；
- **强制坚持**：
  - 单文件 Vanilla HTML5 + ES6+ + 现代标准 CSS 架构；
  - 依赖纯通过现代浏览器标准 API 解决；
  - 资源静态托管于 Cloudflare Pages 全球 CDN，海外核心节点首屏绘制（FCP）$\le 100\text{ms}$；
  - 字体加载优化：使用 `font-display: swap`，大片刊头字体采用 WOFF2 局部子集化。

### 2.2 1080P 电影级 Canvas 杂志排版管线 (NC-1)
- **分辨率物理严解耦**：
  ```javascript
  // 强制将内部渲染像素锁死在 1080 x 1440 电影级 3:4 比例
  canvas.width = 1080;
  canvas.height = 1440;
  // CSS 样式尺寸交由响应式容器适配，绝不直接将 CSS 像素赋给 canvas 宽高度
  ```
- **整数像素坐标对齐 (No Sub-pixel Rendering)**：
  - 所有绘制坐标 `ctx.drawImage`、`ctx.fillText` 强制使用 `Math.floor()` 取整，杜绝浮点模糊与 GPU 重绘抖动；
- **字体就绪物理锁 (Font Ready Guardrail)**：
  - 在调用 `ctx.fillText` 绘制杂志刊头（如 "Vogue", "ViviBon", Bodoni MT）前，必须等待字体完全载入：
    ```javascript
    await document.fonts.ready;
    ```
  - 杜绝因字体网络未完成而回退渲染系统默认 Arial 导致的排版崩塌；
- **海报绝对纯净红线 (NC-1)**：
  - Canvas 绘制方法内绝对禁止绘制任何二维码、官网 URL、促销活动、引流加群或商业水印，捍卫顶级奢华质感与爱宠尊严。

### 2.3 社交内嵌 Webview (IG/TikTok/Safari) 存图容错矩阵
- **环境痛点**：iOS Safari 与 Instagram Webview 对 `a.download` 脚本触发点击有严格沙箱限制，常导致点击无响应或失败；
- **双轨防御与优雅自愈**：
  1. **主轨道**：调用 `canvas.toBlob((blob) => { ... })` 尝试标准下载触发；
  2. **降级自愈轨**：若处于 iOS Safari / Instagram Webview 或 `toBlob` 被拦截，立即将 Canvas 导出为 DataURL (`image/png`)，并动态挂载至全屏微透图片模态窗，弹出温情提示引导用户：
     > *"长按图片即可直接存储至系统相册"*
  3. **Canvas 跨域防污染**：加载外部摄影大片时，必须显式声明 `img.crossOrigin = "anonymous"`，防止 Canvas 变成“受污染模式 (Tainted Canvas)”导致 `toDataURL` 抛出安全异常。

### 2.4 防御性无阻塞埋点规范 (NC-5)
- **阻断性零容忍**：PostHog 脚本加载失败、网络超时或被 AdBlock / uBlock 等去广告扩展拦截时，**绝不允许中断前端任何用户交互**；
- **强制代码封装模板**：
  ```javascript
  window.safeTrack = function(eventName, properties = {}) {
    try {
      if (window.posthog && typeof window.posthog.capture === 'function') {
        window.posthog.capture(eventName, {
          ...properties,
          timestamp: new Date().toISOString(),
          app: 'vivibon_cover'
        });
      }
    } catch (err) {
      // 静默吞掉异常，仅在控制台弱提示，坚决不向界面弹窗或抛未捕获异常
      console.warn('[Telemetry Silenced]:', eventName, err);
    }
  };
  ```

### 2.5 移动端人体工学与触觉拟真
- **全屏安全区避让**：
  ```css
  padding-bottom: max(16px, env(safe-area-inset-bottom));
  padding-top: max(12px, env(safe-area-inset-top));
  ```
- **微震动与物理回弹反馈**：
  - 点击按钮触发轻量微触觉（支持环境调用 `navigator.vibrate?.(10)`）；
  - 按钮 `:active` 状态采用 Apple 弹簧比例缩放：`transform: scale(0.96); transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);`。

---

## 3. 人工与自检审查清单 (Verification Checklist)

| 检查维度 | 审查标准 | 是否合规 |
| :--- | :--- | :---: |
| **纯净度** | Canvas 渲染函数内不存在任何二维码、推广 URL 或水印图层代码 | [ ] |
| **性能** | 无任何外部 JS 编译框架，打包体积 0，HTML/CSS/JS 纯净单文件 | [ ] |
| **兼容性** | 包含 `document.fonts.ready` 判定，海报字体不出现渲染竞态闪烁 | [ ] |
| **自愈性** | 点击“保存海报”具备 Webview 降级长按保存弹窗与跨域防污染保护 | [ ] |
| **稳定性** | 埋点代码 100% 被 `safeTrack` 包裹，禁用拦截器下无任何 Console Error | [ ] |
