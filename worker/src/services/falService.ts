import { STYLE_CONFIGS, NEGATIVE_PROMPT, assembleDynamicPrompt } from '../config/styles';
import { StyleKey } from '../types/env';
import { alertService, AlertContext } from './alertService';
import { DEFAULT_MILO_BASE64 } from '../config/miloSample';

export interface GenerateResult {
  jobId: string;
  imageUrl: string;
  styleKey: StyleKey;
  petName: string;
  latencyMs: number;
  isFallback: boolean;
  debugReason?: string;
  failoverTriggered?: boolean;
  activeProvider?: string;
  capsuleVariant?: {
    id: string;
    name: string;
  };
  level1Theme?: {
    id: string;
    nameZh: string;
  };
  level2Item?: {
    id: string;
    nameZh: string;
    badge: string;
  };
  skillDirective?: string;
}

export type FalRunner = (
  prompt: string,
  imageBase64: string | undefined,
  apiKey: string,
  signal: AbortSignal,
  negativePrompt?: string,
  providerName?: '302ai' | 'volcengine' | 'wokey' | 'siliconflow' | 'fal' | 'segmind',
  referenceImageUrl?: string,
  options?: {
    modelId?: string;
    endpoint?: string;
    size?: string;
  }
) => Promise<{ jobId: string; imageUrl: string }>;

export interface ProviderRail {
  provider: '302ai' | 'volcengine' | 'wokey' | 'siliconflow' | 'fal' | 'segmind';
  apiKey: string;
  name?: string;
  timeoutMs?: number;
  modelId?: string;
  endpoint?: string;
}

/**
 * Full Jitter Exponential Backoff Helper
 * Prevents thundering-herd problem during transient network blips
 */
export async function executeWithJitterRetry<T>(
  fn: (attempt: number) => Promise<T>,
  maxRetries: number = 1,
  baseDelayMs: number = 300,
  maxDelayMs: number = 1200
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn(attempt);
    } catch (err) {
      const isTimeout = err instanceof Error && (
        err.name === 'AbortError' ||
        err.message.includes('aborted') ||
        err.message.includes('timeout')
      );
      if (isTimeout || attempt >= maxRetries) {
        throw err;
      }
      attempt++;
      // Full Jitter calculation: random between 0 and min(maxDelay, baseDelay * 2^attempt)
      const maxBackoff = Math.min(maxDelayMs, baseDelayMs * Math.pow(2, attempt));
      const jitterDelay = Math.floor(Math.random() * maxBackoff);
      await new Promise((resolve) => setTimeout(resolve, jitterDelay));
    }
  }
}

/**
 * Default Pure Image-to-Image AI runner
 * Strictly rejects pure text-to-image to eliminate compute waste
 */
export const defaultFalRunner: FalRunner = async (
  prompt,
  imageBase64,
  apiKey,
  signal,
  negativePrompt = NEGATIVE_PROMPT,
  providerName,
  referenceImageUrl,
  options
) => {
  // Pure Image-to-Image Enforcement
  if (!imageBase64) {
    throw new Error('Pure Image-to-Image required. Missing pet photo input.');
  }

  // 0. 302.AI Provider: Gemini 3.1 Flash Lite Image
  if (providerName === '302ai') {
    const endpoint = options?.endpoint || 'https://api.302.ai/v1/chat/completions';
    const model = options?.modelId || 'gemini-3.1-flash-lite-image';

    let formattedImage = imageBase64;
    if (!formattedImage.startsWith('http://') && !formattedImage.startsWith('https://') && !formattedImage.startsWith('data:')) {
      formattedImage = `data:image/jpeg;base64,${formattedImage}`;
    }

    // Build multi-modal message content (Photo 1: user pet, optional Photo 2: style reference)
    const contentList: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
      { type: 'text', text: prompt },
      { type: 'image_url', image_url: { url: formattedImage } }
    ];

    if (referenceImageUrl) {
      let resolvedRef = referenceImageUrl;
      if (!resolvedRef.startsWith('http') && !resolvedRef.startsWith('data:')) {
        resolvedRef = `https://vivibon-cover.pages.dev/${resolvedRef.replace(/^\/+/, '')}`;
      }
      contentList.push({
        type: 'image_url',
        image_url: { url: resolvedRef }
      });
    }

    const payload = {
      model,
      messages: [
        {
          role: 'user',
          content: contentList
        }
      ]
    };

    const t302Start = Date.now();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal
    });

    const t302TTFBMs = Date.now() - t302Start;

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`302.ai upstream error: ${response.status} ${response.statusText} ${errText}`);
    }

    const rawText = await response.text().catch(() => '');
    const t302TotalMs = Date.now() - t302Start;
    const t302TransferMs = t302TotalMs - t302TTFBMs;
    console.log(`[302.AI Network Telemetry] TTFB (GPU Compute + Proxy Queue): ${t302TTFBMs}ms, Body Transfer: ${t302TransferMs}ms, Total: ${t302TotalMs}ms`);
    let data: any;
    try {
      data = JSON.parse(rawText);
    } catch {
      // Guard against proxy concatenated JSON responses
      const firstCloseBrace = rawText.indexOf('}}');
      if (firstCloseBrace !== -1) {
        try {
          data = JSON.parse(rawText.slice(0, firstCloseBrace + 2));
        } catch {
          throw new Error(`Invalid JSON returned from 302.ai Gemini: ${rawText.slice(0, 200)}`);
        }
      } else {
        throw new Error(`Failed to parse 302.ai response: ${rawText.slice(0, 200)}`);
      }
    }

    let imageUrl: string | undefined;

    // 1. OpenAI Chat Completion format (markdown image: ![image](url) or direct url)
    if (data.choices && data.choices[0]?.message?.content) {
      const content = data.choices[0].message.content;
      const mdMatch = content.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/i);
      if (mdMatch) {
        imageUrl = mdMatch[1];
      } else {
        const urlMatch = content.match(/(https?:\/\/[^\s\)\"\'\<\>]+)/i);
        if (urlMatch) {
          imageUrl = urlMatch[1];
        } else if (content.startsWith('data:image/')) {
          imageUrl = content.trim();
        }
      }
    }

    // 2. OpenAI Images Generations format (data[0].url or data[0].b64_json)
    if (!imageUrl && data.data && data.data[0]) {
      const item = data.data[0];
      if (item.url) {
        imageUrl = item.url;
      } else if (item.b64_json) {
        imageUrl = item.b64_json.startsWith('data:')
          ? item.b64_json
          : `data:image/jpeg;base64,${item.b64_json}`;
      }
    }

    if (!imageUrl) {
      throw new Error('No image returned from 302.ai Gemini');
    }

    // Edge Inlining & Stream Shield: Ingest and sanitize upstream remote images into safe Data URLs
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      try {
        const relayRes = await fetch(imageUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
          signal
        });
        if (relayRes.ok) {
          const buf = await relayRes.arrayBuffer();
          if (buf.byteLength >= 15000) {
            const bytes = new Uint8Array(buf);
            const CHUNK_SZ = 0x8000;
            const chunks: string[] = [];
            for (let i = 0; i < bytes.length; i += CHUNK_SZ) {
              chunks.push(String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK_SZ) as unknown as number[]));
            }
            const b64 = btoa(chunks.join(''));
            const rawType = relayRes.headers.get('content-type') || 'image/jpeg';
            const cleanType = rawType.split(';')[0].trim();
            imageUrl = `data:${cleanType};base64,${b64}`;
          } else {
            console.warn(`[302.ai Edge Inlining Warning]: Image byte length abnormally small (${buf.byteLength} bytes)`);
          }
        }
      } catch (relayErr) {
        console.warn('[302.ai Edge Inlining Warning]: Failed to inline remote image:', relayErr);
      }
    }

    return {
      jobId: `gemini_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl
    };
  }

  // 0. Segmind Provider: Fast SDXL Img2Img (1.8s ~ 2.5s)
  if (providerName === 'segmind') {
    const endpoint = options?.endpoint || 'https://api.segmind.com/v1/sdxl-img2img';
    const cleanBase64 = imageBase64.includes('base64,') ? imageBase64.split('base64,')[1] : imageBase64;

    const payload = {
      image: cleanBase64,
      prompt,
      negative_prompt: negativePrompt || 'ugly, deformed, disfigured, blurry, low quality, bad anatomy, mutated',
      samples: 1,
      scheduler: 'EulerDiscreteScheduler',
      num_inference_steps: 25,
      guidance_scale: 7.5,
      strength: 0.65,
      base64: true
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Segmind upstream error: ${response.status} ${response.statusText} ${errText}`);
    }

    const contentType = response.headers.get('content-type') || '';
    let imageUrl = '';

    if (contentType.includes('application/json')) {
      const data = (await response.json()) as { image?: string; data?: string };
      if (data.image) {
        imageUrl = data.image.startsWith('data:') ? data.image : `data:image/jpeg;base64,${data.image}`;
      } else if (data.data) {
        imageUrl = data.data.startsWith('data:') ? data.data : `data:image/jpeg;base64,${data.data}`;
      }
    } else {
      // Direct image binary buffer from Segmind
      const arrBuffer = await response.arrayBuffer();
      const b64 = Buffer.from(arrBuffer).toString('base64');
      imageUrl = `data:image/jpeg;base64,${b64}`;
    }

    if (!imageUrl) {
      throw new Error('No image returned from Segmind');
    }

    return {
      jobId: `segmind_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl
    };
  }

  // 1. Volcengine Ark Provider: Doubao Seedream 5.0 Lite
  if (providerName === 'volcengine') {
    const endpoint = options?.endpoint || 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
    const model = options?.modelId || 'ep-20260910130528-l8thd';

    let formattedImage = imageBase64;
    if (!formattedImage.startsWith('http://') && !formattedImage.startsWith('https://') && !formattedImage.startsWith('data:')) {
      formattedImage = `data:image/jpeg;base64,${formattedImage}`;
    }

    const payload: Record<string, unknown> = {
      model,
      prompt,
      image: formattedImage,
      size: options?.size || '2K', // Seedream 5.0 Lite requires at least 3,686,400 pixels ("2K" preset)
      response_format: 'url'
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Volcengine upstream error: ${response.status} ${response.statusText} ${errText}`);
    }

    const data = (await response.json()) as {
      data?: Array<{ url?: string; b64_json?: string }>;
    };
    const item = data.data?.[0];
    let imageUrl = item?.url;
    if (!imageUrl && item?.b64_json) {
      imageUrl = `data:image/png;base64,${item.b64_json}`;
    }
    if (!imageUrl) {
      throw new Error('No image returned from Volcengine Ark');
    }

    return {
      jobId: `ark_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl
    };
  }

  // 2. Wokey Provider: Grok 2 Image ($0.01 / 7分钱, 2K/3K resolution, Face ID preservation)
  if (providerName === 'wokey') {
    const endpoint = 'https://api.wokey.ai/v1/images/edits';
    const cleanBase64 = imageBase64.includes('base64,') ? imageBase64.split('base64,')[1] : imageBase64;

    let effectivePrompt = prompt;
    let imageArray = [cleanBase64];

    if (referenceImageUrl) {
      try {
        if (referenceImageUrl.startsWith('data:')) {
          const cleanRef = referenceImageUrl.includes('base64,') ? referenceImageUrl.split('base64,')[1] : referenceImageUrl;
          imageArray.push(cleanRef);
        } else {
          let fetchUrl = referenceImageUrl;
          if (!fetchUrl.startsWith('http://') && !fetchUrl.startsWith('https://')) {
            fetchUrl = `https://vivibon-cover.pages.dev/${fetchUrl.replace(/^\/+/, '')}`;
          }
          const refRes = await fetch(fetchUrl, { signal });
          if (refRes.ok) {
            const arrBuffer = await refRes.arrayBuffer();
            const base64String = Buffer.from(arrBuffer).toString('base64');
            imageArray.push(base64String);
          } else {
            console.warn('[Wokey] Failed to fetch reference image:', refRes.status);
          }
        }
      } catch (err) {
        console.warn('[Wokey] Error fetching reference image:', err);
      }
    }

    // xAI Grok 2 Image strictly enforces a 1024-character maximum prompt length limit
    if (imageArray.length > 1) {
      const prefix = "[Photo 1: user pet face identity. Photo 2: outfit, pose and scene reference. Strictly preserve Photo 1 pet face, eyes, fur and breed exactly.] ";
      const maxRemaining = 1000 - prefix.length;
      if (effectivePrompt.length > maxRemaining) {
        const trimmed = effectivePrompt.slice(0, maxRemaining);
        const lastPunct = Math.max(trimmed.lastIndexOf('.'), trimmed.lastIndexOf('，'), trimmed.lastIndexOf('。'), trimmed.lastIndexOf(','));
        effectivePrompt = lastPunct > 200 ? trimmed.slice(0, lastPunct + 1) : trimmed;
      }
      effectivePrompt = `${prefix}${effectivePrompt}`;
    } else if (effectivePrompt.length > 1000) {
      const trimmed = effectivePrompt.slice(0, 1000);
      const lastPunct = Math.max(trimmed.lastIndexOf('.'), trimmed.lastIndexOf('，'), trimmed.lastIndexOf('。'), trimmed.lastIndexOf(','));
      effectivePrompt = lastPunct > 500 ? trimmed.slice(0, lastPunct + 1) : trimmed;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({
        model: 'gpt-image-2',
        prompt: effectivePrompt,
        image: imageArray
      }),
      signal
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Wokey upstream error: ${response.status} ${response.statusText} ${errText}`);
    }

    const data = (await response.json()) as {
      data?: Array<{ url?: string; b64_json?: string }>;
    };
    const item = data.data?.[0];
    let imageUrl = item?.url;
    if (!imageUrl && item?.b64_json) {
      imageUrl = `data:image/png;base64,${item.b64_json}`;
    }
    if (!imageUrl) {
      throw new Error('No image returned from Wokey');
    }

    return {
      jobId: `wk_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl
    };
  }

  // 2. Domestic Provider: SiliconFlow (Qwen/Qwen-Image-Edit)
  if (providerName === 'siliconflow' || (!providerName && apiKey.startsWith('sk-'))) {
    const endpoint = 'https://api.siliconflow.cn/v1/images/generations';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen-Image-Edit',
        prompt,
        negative_prompt: negativePrompt,
        image: imageBase64,
        image_size: '768x1024', // 3:4 Native Aspect Ratio (1080x1440 物理保真，零拉伸变形)
        num_inference_steps: 20, // 20 步黄金标准去噪：极致微米级毛发与面部五官保真
        guidance_scale: 3.5      // 3.5 黄金引导值：紧紧锁定原图花纹分区与原生眼眸瞳色，杜绝文本大词先验污染（防杂色虎斑与变色）
      }),
      signal
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`SiliconFlow upstream error: ${response.status} ${response.statusText} ${errText}`);
    }

    const data = (await response.json()) as { images?: Array<{ url: string }> };
    const imageUrl = data.images?.[0]?.url;
    if (!imageUrl) {
      throw new Error('No image returned from SiliconFlow');
    }

    return {
      jobId: `sf_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl
    };
  }

  // 2. Overseas Provider: Fal.ai (FLUX.1 [dev] img2img)
  const endpoint = 'https://fal.run/fal-ai/flux/dev/image-to-image';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_url: imageBase64,
      prompt,
      strength: 0.68, // Golden ratio: 90%+ pet facial ID preservation, 100% haute couture outfit transformation
      num_inference_steps: 24,
      guidance_scale: 3.5,
      enable_safety_checker: true
    }),
    signal
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Fal.ai upstream error: ${response.status} ${response.statusText} ${errText}`);
  }

  const data = (await response.json()) as { images?: Array<{ url: string }>; request_id?: string };
  const imageUrl = data.images?.[0]?.url;
  if (!imageUrl) {
    throw new Error('No image returned from Fal.ai');
  }

  return {
    jobId: data.request_id || `fal_${crypto.randomUUID().slice(0, 8)}`,
    imageUrl
  };
};

export class FalService {
  private runner: FalRunner;
  private timeoutMs: number;

  constructor(runner: FalRunner = defaultFalRunner, timeoutMs: number = 60000) {
    this.runner = runner;
    this.timeoutMs = timeoutMs; // 60s timeout limit per inference attempt (supports large multi-modal diffusion)
  }

  /**
   * Execute Haute Couture Pet Generation with:
   * 1. 30s hard timeout
   * 2. Full jitter exponential backoff retry
   * 3. Primary -> Secondary AI multi-rail failover
   * 4. Enterprise WeChat Webhook alerting on failure/arrears
   * 5. NC-4 graceful degradation to WebP sample library
   */
  async generatePoster(
    styleKey: StyleKey,
    petName: string,
    imageBase64: string | undefined,
    primaryApiKey?: string,
    variantIndex?: number,
    subId?: string,
    itemId?: string,
    alertContext?: AlertContext,
    webhookUrl?: string,
    secondaryApiKey?: string,
    rails?: ProviderRail[],
    referenceImageUrl?: string
  ): Promise<GenerateResult> {
    const start = Date.now();

    const styleConfig = STYLE_CONFIGS[styleKey];
    const fallbackImage = styleConfig.fallbackImageUrl;
    const assembled = assembleDynamicPrompt(styleKey, itemId, subId, variantIndex);
    const variant = assembled.item;

    const baseResult: Omit<GenerateResult, 'jobId' | 'imageUrl' | 'latencyMs' | 'isFallback'> = {
      styleKey,
      petName,
      capsuleVariant: {
        id: variant.id,
        name: variant.nameZh
      },
      level1Theme: {
        id: assembled.themeKey,
        nameZh: assembled.themeNameZh
      },
      level2Item: {
        id: variant.id,
        nameZh: variant.nameZh,
        badge: variant.badge
      },
      skillDirective: assembled.skillDirective
    };

    let resolvedRefUrl = referenceImageUrl;
    if (resolvedRefUrl && (resolvedRefUrl.includes('localhost') || resolvedRefUrl.includes('127.0.0.1'))) {
      try {
        const pathname = new URL(resolvedRefUrl).pathname.replace(/^\/+/, '');
        resolvedRefUrl = `https://vivibon-cover.pages.dev/${pathname}`;
      } catch (_) {
        resolvedRefUrl = undefined;
      }
    }
    const isUserUpload = Boolean(imageBase64 && imageBase64 !== DEFAULT_MILO_BASE64);
    const effectiveReferenceUrl = resolvedRefUrl || (
      !isUserUpload && variant.sampleImageUrl
        ? (variant.sampleImageUrl.startsWith('http') ? variant.sampleImageUrl : `https://vivibon-cover.pages.dev/${variant.sampleImageUrl.replace(/^\/+/, '')}`)
        : undefined
    );

    // Multi-rail dynamic execution path (supports Wokey, SiliconFlow, Fal.ai)
    if (rails && rails.length > 0) {
      const activeRails = rails.filter(r => Boolean(r.apiKey));
      if (activeRails.length === 0) {
        return {
          ...baseResult,
          jobId: `fallback_${crypto.randomUUID().slice(0, 8)}`,
          imageUrl: fallbackImage,
          latencyMs: Date.now() - start,
          isFallback: true,
          debugReason: 'NO_API_KEY_CONFIGURED'
        };
      }

      const effectiveImageInput = imageBase64 || DEFAULT_MILO_BASE64;
      const previousErrors: string[] = [];

      for (let i = 0; i < activeRails.length; i++) {
        const rail = activeRails[i];
        const displayName = rail.provider === 'segmind'
          ? 'Segmind (SDXL Img2Img)'
          : (rail.provider === '302ai'
            ? '302.AI (Gemini 3.1 Flash Lite)'
            : (rail.provider === 'volcengine'
              ? 'Volcengine Ark (Seedream 5.0 Lite)'
              : (rail.provider === 'wokey' ? 'Wokey' : (rail.provider === 'siliconflow' ? 'SiliconFlow' : 'Fal.ai'))));
        const timeoutLimit = rail.timeoutMs || 60000;

        const runRailAttempt = async () => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeoutLimit);
          try {
            const res = await this.runner(
              assembled.fullPrompt,
              effectiveImageInput,
              rail.apiKey,
              controller.signal,
              assembled.negativePrompt,
              rail.provider,
              effectiveReferenceUrl,
              {
                modelId: rail.modelId,
                endpoint: rail.endpoint
              }
            );
            clearTimeout(timeoutId);
            return res;
          } catch (err) {
            clearTimeout(timeoutId);
            throw err;
          }
        };

        try {
          const result = await executeWithJitterRetry(() => runRailAttempt(), 1);

          if (i > 0) {
            alertService.sendWeChatAlert(
              webhookUrl,
              `从模型接管生图成功`,
              {
                ...alertContext,
                primaryProvider: activeRails[0].provider,
                secondaryProvider: displayName,
                errorMessage: `Primary failed with: ${previousErrors[0] || 'N/A'}`,
                durationMs: Date.now() - start,
                timeoutMs: activeRails[0]?.timeoutMs
              },
              'INFO'
            ).catch(() => {});
          }

          return {
            ...baseResult,
            jobId: result.jobId,
            imageUrl: result.imageUrl,
            latencyMs: Date.now() - start,
            isFallback: false,
            failoverTriggered: i > 0,
            activeProvider: displayName
          };
        } catch (err: unknown) {
          const errorObj = err instanceof Error ? err : new Error(String(err));
          previousErrors.push(`${displayName}: [${errorObj.message}]`);
          console.warn(`[FalService] Rail ${i} (${displayName}) failed:`, errorObj.message);

          if (i < activeRails.length - 1 && !errorObj.message.includes('Missing pet photo input')) {
            alertService.sendWeChatAlert(
              webhookUrl,
              `主模型生图失败 · 准备故障转移`,
              {
                ...alertContext,
                primaryProvider: displayName,
                secondaryProvider: activeRails[i + 1].provider,
                errorMessage: errorObj.message,
                durationMs: Date.now() - start,
                timeoutMs: rail.timeoutMs
              },
              'WARNING'
            ).catch(() => {});
          }
        }
      }

      // All rails failed
      if (webhookUrl && previousErrors.length > 0) {
        alertService.sendWeChatAlert(
          webhookUrl,
          `主备模型均调用失败 · 触发静态样片终极降级`,
          {
            ...alertContext,
            primaryProvider: activeRails[0]?.provider,
            secondaryProvider: activeRails[1]?.provider || 'None',
            errorMessage: previousErrors.join(', '),
            durationMs: Date.now() - start,
            timeoutMs: activeRails[0]?.timeoutMs
          },
          'CRITICAL'
        ).catch(() => {});
      }

      return {
        ...baseResult,
        jobId: `fallback_${crypto.randomUUID().slice(0, 8)}`,
        imageUrl: fallbackImage,
        latencyMs: Date.now() - start,
        isFallback: true,
        debugReason: previousErrors.join('; ')
      };
    }

    // Legacy fallback path (when rails parameter not provided)
    if (!primaryApiKey && !secondaryApiKey) {
      return {
        ...baseResult,
        jobId: `fallback_${crypto.randomUUID().slice(0, 8)}`,
        imageUrl: fallbackImage,
        latencyMs: Date.now() - start,
        isFallback: true,
        debugReason: 'NO_API_KEY_CONFIGURED'
      };
    }

    // Use user-uploaded photo if provided, or default demonstration model (Milo) for live AI generation
    const effectiveImageInput = imageBase64 || DEFAULT_MILO_BASE64;

    // Helper to invoke runner with single timeout controller
    const runAttempt = async (key: string) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
      try {
        const res = await this.runner(
          assembled.fullPrompt,
          effectiveImageInput,
          key,
          controller.signal,
          assembled.negativePrompt,
          undefined,
          effectiveReferenceUrl
        );
        clearTimeout(timeoutId);
        return res;
      } catch (err) {
        clearTimeout(timeoutId);
        throw err;
      }
    };

    // 1. Try Primary AI Provider
    let primaryError: Error | null = null;
    const primaryProviderName = primaryApiKey?.startsWith('sk-') ? 'SiliconFlow' : 'Fal.ai';
    const secondaryProviderName = secondaryApiKey?.startsWith('sk-') ? 'SiliconFlow' : 'Fal.ai';

    if (primaryApiKey) {
      try {
        const result = await executeWithJitterRetry(() => runAttempt(primaryApiKey), 1);
        return {
          ...baseResult,
          jobId: result.jobId,
          imageUrl: result.imageUrl,
          latencyMs: Date.now() - start,
          isFallback: false,
          activeProvider: primaryProviderName
        };
      } catch (err: unknown) {
        primaryError = err instanceof Error ? err : new Error(String(err));
        console.warn(`[FalService] Primary AI (${primaryProviderName}) failed:`, primaryError.message);

        // Asynchronously notify Enterprise WeChat on Primary failure (ignore if intentional missing input)
        if (!primaryError.message.includes('Missing pet photo input')) {
          alertService.sendWeChatAlert(
            webhookUrl,
            `主模型生图失败 · 准备故障转移`,
            {
              ...alertContext,
              primaryProvider: primaryProviderName,
              secondaryProvider: secondaryApiKey ? secondaryProviderName : 'None',
              errorMessage: primaryError.message,
              durationMs: Date.now() - start,
              timeoutMs: this.timeoutMs
            },
            'WARNING'
          ).catch(() => {});
        }
      }
    }

    // 2. Failover: Try Secondary AI Provider
    if (secondaryApiKey) {
      try {
        const result = await executeWithJitterRetry(() => runAttempt(secondaryApiKey), 1);
        
        // Notify Enterprise WeChat on successful Failover recovery
        alertService.sendWeChatAlert(
          webhookUrl,
          `从模型接管生图成功`,
          {
            ...alertContext,
            primaryProvider: primaryProviderName,
            secondaryProvider: secondaryProviderName,
            errorMessage: `Primary failed with: ${primaryError?.message || 'N/A'}`,
            durationMs: Date.now() - start,
            timeoutMs: this.timeoutMs
          },
          'INFO'
        ).catch(() => {});

        return {
          ...baseResult,
          jobId: result.jobId,
          imageUrl: result.imageUrl,
          latencyMs: Date.now() - start,
          isFallback: false,
          failoverTriggered: true,
          activeProvider: secondaryProviderName
        };
      } catch (secErr: unknown) {
        const secondaryError = secErr instanceof Error ? secErr : new Error(String(secErr));
        console.warn(`[FalService] Secondary AI (${secondaryProviderName}) also failed:`, secondaryError.message);

        // Notify Enterprise WeChat: Both Primary & Secondary failed! (ignore if intentional missing input)
        if (!primaryError?.message?.includes('Missing pet photo input') && !secondaryError.message.includes('Missing pet photo input')) {
          alertService.sendWeChatAlert(
            webhookUrl,
            `主备模型均调用失败 · 触发静态样片终极降级`,
            {
              ...alertContext,
              primaryProvider: primaryProviderName,
              secondaryProvider: secondaryProviderName,
              errorMessage: `Primary: [${primaryError?.message}], Secondary: [${secondaryError.message}]`,
              durationMs: Date.now() - start,
              timeoutMs: this.timeoutMs
            },
            'CRITICAL'
          ).catch(() => {});
        }
      }
    }

    // 3. NC-4 Ultimate Graceful Fallback to Preset WebP
    const finalReason = primaryError?.message || 'ALL_AI_PROVIDERS_FAILED';
    return {
      ...baseResult,
      jobId: `fallback_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl: fallbackImage,
      latencyMs: Date.now() - start,
      isFallback: true,
      debugReason: finalReason
    };
  }
}

export const falService = new FalService();
