import { Hono } from 'hono';
import { Env } from '../types/env';
import { GenerateRequestSchema, ErrorResponse, GenerateResponseSuccess } from '../schemas/generate';
import { FalService, falService as defaultFalService } from '../services/falService';

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
          message: 'Uploaded photo exceeds 5MB limit.'
        };
        return c.json(errorResp, 413);
      }

      // Check if styleKey issue (400)
      const styleIssue = issues.find((i) => i.path.includes('styleKey'));
      if (styleIssue) {
        const errorResp: ErrorResponse = {
          success: false,
          errorCode: 'INVALID_STYLE_KEY',
          message: 'Requested style is not in haute couture catalogue.'
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

    const { styleKey, petName, imageBase64, variantIndex } = parseResult.data;

    const apiKey = c.env.SILICONFLOW_KEY || c.env.FAL_KEY;

    const result = await service.generatePoster(
      styleKey,
      petName,
      imageBase64,
      apiKey,
      variantIndex
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
        ...(result.capsuleVariant ? { capsuleVariant: result.capsuleVariant } : {}),
        ...(c.req.query('debug') === '1' && result.debugReason ? { debugReason: result.debugReason } : {})
      }
    };

    return c.json(response, 200);
  });

  return route;
};

export const generateRoute = createGenerateRoute();
