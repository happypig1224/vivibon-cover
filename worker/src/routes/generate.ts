import { Hono } from 'hono';
import { Env, StyleKey } from '../types/env';
import { GenerateRequestSchema, ErrorResponse, GenerateResponseSuccess } from '../schemas/generate';
import { FalService, falService as defaultFalService } from '../services/falService';
import { sanitizePetName } from '../config/styles';
import { metricsService } from '../services/metricsService';


export const createGenerateRoute = (service: FalService = defaultFalService) => {
  const route = new Hono<{
    Bindings: Env;
    Variables: { clientIp: string; traceId: string };
  }>();

  route.post('/api/generate', async (c) => {
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
    const { imageBase64, variantIndex, subId } = parseResult.data;
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

    // Default to SiliconFlow as primary (low-cost, domestic RMB, Qwen-Image-Edit Face ID)
    // Fal.ai acts as secondary failover unless PRIMARY_AI_PROVIDER is explicitly set to 'fal'
    const isFalPrimary = c.env?.PRIMARY_AI_PROVIDER === 'fal';
    const primaryKey = isFalPrimary
      ? (c.env?.FAL_KEY || c.env?.SILICONFLOW_KEY)
      : (c.env?.SILICONFLOW_KEY || c.env?.FAL_KEY);
    const secondaryKey = isFalPrimary ? c.env?.SILICONFLOW_KEY : c.env?.FAL_KEY;

    const alertCtx = {
      environment: c.env?.ENVIRONMENT || 'production',
      traceId: c.get('traceId'),
      clientIp: c.get('clientIp'),
      petName: safePetName,
      styleKey: effectiveStyleKey,
      templateId: effectiveItemId
    };

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
      secondaryKey
    );

    const response: GenerateResponseSuccess = {
      success: true,
      data: {
        jobId: result.jobId,
        imageUrl: result.imageUrl,
        styleKey: result.styleKey,
        petName: result.petName,
        latencyMs: result.latencyMs,
        isFallback: result.isFallback,
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
