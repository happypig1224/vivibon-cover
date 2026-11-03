import { Hono } from 'hono';
import { Env, StyleKey } from '../types/env';
import { GenerateRequestSchema, ErrorResponse, GenerateResponseSuccess } from '../schemas/generate';
import { FalService, falService as defaultFalService, ProviderRail } from '../services/falService';
import { sanitizePetName } from '../config/styles';
import { metricsService } from '../services/metricsService';


export const createGenerateRoute = (service: FalService = defaultFalService) => {
  const route = new Hono<{
    Bindings: Env;
    Variables: { clientIp: string; traceId: string };
  }>();

  route.post('/api/generate', async (c) => {
    const requestReceivedAt = Date.now();
    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      const errorResp: ErrorResponse = {
        success: false,
        errorCode: 'INVALID_JSON_PAYLOAD',
        message: 'Request payload must be valid JSON.'
      };
      return c.json(errorResp, 400);
    }

    const parseResult = GenerateRequestSchema.safeParse(body);

    if (!parseResult.success) {
      const issues = parseResult.error.issues;
      // Check if image size issue (413)
      const imageIssue = issues.find(
        (i) => i.path.includes('imageBase64') || i.message.includes('5MB')
      );
      if (imageIssue) {
        const errorResp: ErrorResponse = {
          success: false,
          errorCode: 'IMAGE_TOO_LARGE',
          message: 'Base64 image exceeds 5MB size limit.'
        };
        return c.json(errorResp, 413);
      }

      // Check if invalid styleKey / themeId
      const styleIssue = issues.find(
        (i) => i.path.includes('styleKey') || i.path.includes('themeId')
      );
      if (styleIssue) {
        const errorResp: ErrorResponse = {
          success: false,
          errorCode: 'INVALID_STYLE_KEY',
          message: styleIssue.message
        };
        return c.json(errorResp, 400);
      }

      // Other generic validation issue
      const errorResp: ErrorResponse = {
        success: false,
        errorCode: 'VALIDATION_FAILED',
        message: issues[0]?.message || 'Invalid request parameters.'
      };
      return c.json(errorResp, 400);
    }

    const effectiveStyleKey = (parseResult.data.styleKey || parseResult.data.themeId || 'fine_art') as StyleKey;
    const effectiveItemId = parseResult.data.itemId || parseResult.data.templateId;
    const { imageBase64, variantIndex, subId, referenceImageUrl } = parseResult.data;
    const safePetName = sanitizePetName(parseResult.data.petName);

    // Validate Level 2 item belongs to Level 1 style if provided
    if (effectiveItemId) {
      const { CASCADING_THEMES } = await import('../config/styles');
      let targetThemeKey: 'fine_art' | 'corporate' | 'cosplay' | 'celebration';
      if (effectiveStyleKey === 'gentle') targetThemeKey = 'fine_art';
      else if (effectiveStyleKey === 'detective') targetThemeKey = 'corporate';
      else if (effectiveStyleKey === 'street') targetThemeKey = 'cosplay';
      else if (effectiveStyleKey === 'warm') targetThemeKey = 'celebration';
      else targetThemeKey = effectiveStyleKey as 'fine_art' | 'corporate' | 'cosplay' | 'celebration';

      const theme = CASCADING_THEMES[targetThemeKey];
      const exists = theme?.subCategories.some((sub) => sub.items.some((it) => it.id === effectiveItemId));
      if (!exists) {
        const errorResp: ErrorResponse = {
          success: false,
          errorCode: 'INVALID_ITEM_ID',
          message: `Template '${effectiveItemId}' is not valid for style '${effectiveStyleKey}'.`
        };
        return c.json(errorResp, 400);
      }
    }

    // Multi-rail provider configuration:
    // Priority:
    // 1. 302.AI (Gemini 3.1 Flash Lite Image) as Primary Model (~8-12s, ultra-high fidelity)
    // 2. Volcengine Ark (Doubao-Seedream-5.0-lite) as Failover (~1.8s, 3:4 aspect ratio)
    // 3. SiliconFlow (Qwen/Qwen-Image-Edit 20B) as Tertiary
    // 4. Wokey (gpt-image-2 multi-image) as Quaternary
    // 5. Fal.ai (FLUX.1) as Quinary
    const rails: ProviderRail[] = [];
    const primaryPref = c.env?.PRIMARY_AI_PROVIDER || '302ai';
    const arkKey = c.env?.ARK_API_KEY || c.env?.VOLCENGINE_API_KEY;
    const volcengineModelId = c.env?.VOLCENGINE_MODEL_ID || 'ep-20260910130528-l8thd';
    const volcengineEndpoint = c.env?.VOLCENGINE_ENDPOINT;

    const add302ai = () => {
      if (c.env?.AI302_API_KEY) {
        rails.push({
          provider: '302ai',
          apiKey: c.env.AI302_API_KEY,
          timeoutMs: 30000,
          modelId: c.env?.AI302_MODEL_ID || 'gemini-3.1-flash-lite-image',
          endpoint: c.env?.AI302_ENDPOINT || 'https://api.302.ai/v1/chat/completions'
        });
      }
    };
    const addVolcengine = () => {
      if (arkKey) {
        rails.push({
          provider: 'volcengine',
          apiKey: arkKey,
          timeoutMs: 60000,
          modelId: volcengineModelId,
          endpoint: volcengineEndpoint
        });
      }
    };
    const addWokey = () => {
      if (c.env?.WOKEY_API_KEY) {
        rails.push({ provider: 'wokey', apiKey: c.env.WOKEY_API_KEY, timeoutMs: 75000 });
      }
    };
    const addSiliconflow = () => {
      if (c.env?.SILICONFLOW_KEY) {
        rails.push({ provider: 'siliconflow', apiKey: c.env.SILICONFLOW_KEY, timeoutMs: 60000 });
      }
    };
    const addFal = () => {
      if (c.env?.FAL_KEY) {
        rails.push({ provider: 'fal', apiKey: c.env.FAL_KEY, timeoutMs: 60000 });
      }
    };
    const addSegmind = () => {
      if (c.env?.SEGMIND_API_KEY) {
        rails.push({ provider: 'segmind', apiKey: c.env.SEGMIND_API_KEY, timeoutMs: 25000 });
      }
    };

    if (primaryPref === 'segmind') {
      addSegmind();
      addVolcengine();
      add302ai();
      addSiliconflow();
      addFal();
    } else if (primaryPref === '302ai') {
      add302ai();
      addVolcengine();
      addSegmind();
      addSiliconflow();
      addWokey();
      addFal();
    } else if (primaryPref === 'volcengine') {
      addVolcengine();
      addSegmind();
      add302ai();
      addSiliconflow();
      addFal();
    } else if (primaryPref === 'wokey') {
      addWokey();
      addSegmind();
      add302ai();
      addSiliconflow();
      addVolcengine();
      addFal();
    } else if (primaryPref === 'siliconflow') {
      addSiliconflow();
      addSegmind();
      add302ai();
      addVolcengine();
      addWokey();
      addFal();
    } else if (primaryPref === 'fal') {
      addFal();
      addSegmind();
      add302ai();
      addSiliconflow();
      addVolcengine();
      addWokey();
    } else {
      addSegmind();
      addVolcengine();
      add302ai();
      addSiliconflow();
      addWokey();
      addFal();
    }

    const primaryKey = rails[0]?.apiKey || c.env?.AI302_API_KEY || arkKey || c.env?.SILICONFLOW_KEY || c.env?.WOKEY_API_KEY || c.env?.FAL_KEY;
    const secondaryKey = rails[1]?.apiKey || c.env?.SILICONFLOW_KEY || c.env?.WOKEY_API_KEY || c.env?.FAL_KEY;

    const alertCtx = {
      environment: c.env?.ENVIRONMENT || 'production',
      traceId: c.get('traceId'),
      clientIp: c.get('clientIp'),
      petName: safePetName,
      styleKey: effectiveStyleKey,
      templateId: effectiveItemId
    };

    const upstreamStart = Date.now();
    const result = await service.generatePoster(
      effectiveStyleKey,
      safePetName,
      imageBase64,
      primaryKey,
      variantIndex,
      subId,
      effectiveItemId,
      alertCtx,
      c.env?.WECHAT_WEBHOOK_URL,
      secondaryKey,
      rails,
      referenceImageUrl
    );

    const upstreamMs = Date.now() - upstreamStart;
    const workerPrepMs = upstreamStart - requestReceivedAt;
    const totalWorkerMs = Date.now() - requestReceivedAt;

    c.header('Server-Timing', `prep;dur=${workerPrepMs};desc="Worker Prep", upstream;dur=${upstreamMs};desc="AI Provider Inference", total;dur=${totalWorkerMs};desc="Total Edge Execution"`);
    c.header('X-Model-Provider', result.activeProvider || 'Unknown');
    c.header('X-Model-Latency-Ms', String(upstreamMs));
    c.header('X-Worker-Total-Ms', String(totalWorkerMs));

    const response: GenerateResponseSuccess = {
      success: true,
      data: {
        jobId: result.jobId,
        imageUrl: result.imageUrl,
        styleKey: result.styleKey,
        petName: result.petName,
        latencyMs: result.latencyMs,
        isFallback: result.isFallback,
        timings: {
          workerPrepMs,
          upstreamInferenceMs: upstreamMs,
          totalWorkerMs
        },
        ...(result.activeProvider ? { activeProvider: result.activeProvider } : {}),
        ...(result.failoverTriggered !== undefined ? { failoverTriggered: result.failoverTriggered } : {}),
        ...(result.capsuleVariant ? { capsuleVariant: result.capsuleVariant } : {}),
        ...(result.level1Theme ? { level1Theme: result.level1Theme } : {}),
        ...(result.level2Item ? { level2Item: result.level2Item } : {}),
        ...(result.skillDirective ? { skillDirective: result.skillDirective } : {}),
        ...(c.req.query('debug') === '1' && result.debugReason ? { debugReason: result.debugReason } : {})
      }
    };

    // Non-blocking metrics recording in background (0ms user impact)
    if (c.env?.RATE_LIMIT_KV) {
      const isRealUpload = !parseResult.data.isDefaultSample;
      const recordPromise = metricsService.recordGeneration(c.env.RATE_LIMIT_KV, {
        clientIp: c.var.clientIp,
        styleKey: effectiveStyleKey,
        isRealUpload,
        isFallback: result.isFallback,
        hasError: result.isFallback && result.failoverTriggered
      });

      try {
        c.executionCtx.waitUntil(recordPromise);
      } catch {
        recordPromise.catch((err) => console.error('[Metrics] Error:', err));
      }
    }

    return c.json(response, 200);
  });

  return route;
};




export const generateRoute = createGenerateRoute();
