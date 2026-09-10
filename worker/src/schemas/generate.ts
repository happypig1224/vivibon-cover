import { z } from 'zod';
import { SUPPORTED_STYLE_KEYS } from '../config/styles';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
// Base64 encoding overhead is ~4/3, plus optional data:image/xxx;base64, header
const MAX_BASE64_LENGTH = Math.ceil((MAX_IMAGE_BYTES * 4) / 3) + 100;

export const GenerateRequestSchema = z.object({
  petName: z.string().max(30).default('麦洛 Milo'),
  styleKey: z.enum(
    ['fine_art', 'corporate', 'cosplay', 'celebration', 'gentle', 'detective', 'street', 'warm'] as const,
    {
      errorMap: () => ({ message: 'Requested style is not in haute couture catalogue.' })
    }
  ),
  themeId: z.string().optional(), // alias for styleKey
  subId: z.string().optional(),
  itemId: z.string().optional(),
  templateId: z.string().optional(), // alias for itemId

  variantIndex: z.number().int().min(0).optional(),
  imageBase64: z.string().optional().refine(
    (val) => {
      if (!val) return true;
      if (val.startsWith('http://') || val.startsWith('https://')) return true;
      // Calculate approximate byte size of base64
      const base64Data = val.includes(',') ? val.split(',')[1] : val;
      const padding = (base64Data.match(/=+$/) || [''])[0].length;
      const byteSize = (base64Data.length * 3) / 4 - padding;
      return byteSize <= MAX_IMAGE_BYTES;
    },
    {
      message: 'Uploaded photo exceeds 5MB limit.',
      params: { errorCode: 'IMAGE_TOO_LARGE' }
    }
  ),
  isDefaultSample: z.boolean().default(true),
  referenceImageUrl: z.string().url().optional()
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

export interface GenerateResponseSuccess {
  success: true;
  data: {
    jobId: string;
    imageUrl: string;
    styleKey: string;
    petName: string;
    latencyMs: number;
    isFallback: boolean;
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
  };
}



export interface ErrorResponse {
  success: false;
  errorCode: string;
  message: string;
}
