export interface Env {
  RATE_LIMIT_KV: KVNamespace;
  AI?: any;
  FAL_KEY?: string;
  SILICONFLOW_KEY?: string;
  WOKEY_API_KEY?: string;
  GEMINI_API_KEY?: string;
  AI302_API_KEY?: string;
  AI302_MODEL_ID?: string;
  AI302_ENDPOINT?: string;
  ARK_API_KEY?: string;
  VOLCENGINE_API_KEY?: string;
  VOLCENGINE_MODEL_ID?: string;
  VOLCENGINE_ENDPOINT?: string;
  VOLCENGINE_SIZE?: string;
  SEGMIND_API_KEY?: string;
  WECHAT_WEBHOOK_URL?: string;
  PRIMARY_AI_PROVIDER?: '302ai' | 'volcengine' | 'wokey' | 'fal' | 'siliconflow' | 'gemini' | 'segmind';
  ENVIRONMENT?: string;
  CORS_ORIGIN?: string;
  ADMIN_BYPASS_KEY?: string;
}

// 4 Core Themes (V3.0) + 4 Legacy Keys for 100% backward compatibility
export type CoreThemeKey = 'fine_art' | 'corporate' | 'cosplay' | 'celebration';
export type LegacyStyleKey = 'gentle' | 'detective' | 'street' | 'warm';
export type StyleKey = CoreThemeKey | LegacyStyleKey;

export interface CapsuleVariant {
  id: string;
  name: string;
  wardrobePrompt: string;
  fullPrompt: string;
}

export interface CascadingItem {
  id: string;
  nameZh: string;
  nameEn: string;
  badge: string;
  wardrobePrompt: string;
  fullPrompt: string;
  sampleImageUrl?: string;
  exclusiveNegativePrompt?: string;
}

export interface CascadingSubCategory {
  id: string;
  nameZh: string;
  nameEn: string;
  items: CascadingItem[];
}

export interface CascadingTheme {
  key: CoreThemeKey;
  nameZh: string;
  nameEn: string;
  headline: string;
  fallbackImageUrl: string;
  subCategories: CascadingSubCategory[];
}

export interface StyleConfig {
  key: StyleKey;
  name: string;
  subtitle: string;
  prompt: string;
  fallbackImageUrl: string;
  variants: CapsuleVariant[];
}

export interface AssembledPromptResult {
  fullPrompt: string;
  negativePrompt: string;
  skillDirective: string;
  skillNegativeConstraint: string;
  exclusiveNegativePrompt?: string;
  item: CascadingItem;
  themeKey: CoreThemeKey;
  themeName?: string;
  themeNameZh: string;
}



