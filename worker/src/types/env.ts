export interface Env {
  RATE_LIMIT_KV: KVNamespace;
  FAL_KEY?: string;
  SILICONFLOW_KEY?: string;
  ENVIRONMENT?: string;
  CORS_ORIGIN?: string;
}

export type StyleKey = 'gentle' | 'detective' | 'street' | 'warm';

export interface CapsuleVariant {
  id: string;
  name: string;
  wardrobePrompt: string;
  fullPrompt: string;
}

export interface StyleConfig {
  key: StyleKey;
  name: string;
  subtitle: string;
  prompt: string;
  fallbackImageUrl: string;
  variants: CapsuleVariant[];
}

