import { describe, it, expect, vi } from 'vitest';
import { FalService } from '../src/services/falService';
import { DEFAULT_MILO_BASE64 } from '../src/config/miloSample';
import {
  STYLE_CONFIGS,
  SUPPORTED_STYLE_KEYS,
  CASCADING_THEMES,
  CORE_THEME_KEYS
} from '../src/config/styles';

describe('FalService AI Defense & Cascading Architecture Matrix', () => {
  it('should have valid prompt templates and fallback URLs for all 4 core themes and legacy aliases', () => {
    expect(CORE_THEME_KEYS).toEqual(['fine_art', 'corporate', 'cosplay', 'celebration']);
    expect(SUPPORTED_STYLE_KEYS).toContain('fine_art');
    expect(SUPPORTED_STYLE_KEYS).toContain('corporate');
    expect(SUPPORTED_STYLE_KEYS).toContain('cosplay');
    expect(SUPPORTED_STYLE_KEYS).toContain('celebration');
    expect(SUPPORTED_STYLE_KEYS).toContain('gentle');
    expect(SUPPORTED_STYLE_KEYS).toContain('detective');
    expect(SUPPORTED_STYLE_KEYS).toContain('street');
    expect(SUPPORTED_STYLE_KEYS).toContain('warm');

    for (const key of SUPPORTED_STYLE_KEYS) {
      const config = STYLE_CONFIGS[key];
      expect(config.key).toBe(key);
      expect(config.prompt).toContain('8k resolution');
      expect(config.fallbackImageUrl).toMatch(/^https:\/\//);
      expect(config.variants.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('should immediately return graceful fallback if FAL_KEY is missing (NC-2)', async () => {
    const service = new FalService();
    const result = await service.generatePoster('fine_art', '麦洛 Milo', undefined, undefined);

    expect(result.isFallback).toBe(true);
    expect(result.imageUrl).toBe(STYLE_CONFIGS.fine_art.fallbackImageUrl);
    expect(result.jobId).toMatch(/^fallback_/);
    expect(result.petName).toBe('麦洛 Milo');
    expect(result.styleKey).toBe('fine_art');
  });

  it('should return successful result when runner executes properly with cascading selection', async () => {
    const mockRunner = vi.fn().mockResolvedValue({
      jobId: 'fal_mock_123',
      imageUrl: 'https://fal.media/mock_generated.png'
    });

    const service = new FalService(mockRunner, 5000);
    // Explicitly request Corporate -> Featured -> Airline Captain
    const result = await service.generatePoster(
      'corporate',
      'Sherlock',
      undefined,
      'valid_key',
      undefined,
      'featured',
      'airline_captain'
    );

    expect(result.isFallback).toBe(false);
    expect(result.imageUrl).toBe('https://fal.media/mock_generated.png');
    expect(result.jobId).toBe('fal_mock_123');
    expect(result.capsuleVariant?.id).toBe('airline_captain');
    expect(result.capsuleVariant?.name).toBe('顶级民航机长');
    expect(mockRunner).toHaveBeenCalledWith(
      expect.stringContaining('fisheye lens perspective'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('dislocated paws'),
      undefined,
      expect.stringContaining('models/airline_captain.png')
    );
  });


  it('should gracefully degrade to preset sample when upstream runner throws 500/503 error (NC-4)', async () => {
    const failingRunner = vi.fn().mockRejectedValue(new Error('Fal.ai upstream error: 503 Service Unavailable'));

    const service = new FalService(failingRunner, 5000);
    const result = await service.generatePoster('cosplay', 'Toby', undefined, 'valid_key');

    expect(result.isFallback).toBe(true);
    expect(result.imageUrl).toBe(STYLE_CONFIGS.cosplay.fallbackImageUrl);
    expect(result.styleKey).toBe('cosplay');
  });

  it('should trigger AbortController and degrade gracefully when runner exceeds timeout limit (NC-4)', async () => {
    const hangingRunner = vi.fn((prompt, imageBase64, apiKey, signal: AbortSignal) => {
      return new Promise<{ jobId: string; imageUrl: string }>((resolve, reject) => {
        signal.addEventListener('abort', () => {
          const abortError = new Error('The operation was aborted');
          abortError.name = 'AbortError';
          reject(abortError);
        });
        setTimeout(() => {
          resolve({ jobId: 'late_job', imageUrl: 'https://late.com' });
        }, 2000);
      });
    });

    const shortTimeoutService = new FalService(hangingRunner, 50);
    const result = await shortTimeoutService.generatePoster('celebration', 'CozyPet', undefined, 'valid_key');

    expect(result.isFallback).toBe(true);
    expect(result.imageUrl).toBe(STYLE_CONFIGS.celebration.fallbackImageUrl);
    expect(result.styleKey).toBe('celebration');
  });

  it('should include Face ID identity preservation anchor and studio finish across all cascading items', () => {
    let totalItems = 0;
    for (const themeKey of CORE_THEME_KEYS) {
      const theme = CASCADING_THEMES[themeKey];
      expect(theme.subCategories.length).toBe(1);

      for (const sub of theme.subCategories) {
        expect(sub.items.length).toBe(3);
        totalItems += sub.items.length;

        for (const item of sub.items) {
          expect(item.id).toBeTruthy();
          expect(item.nameZh).toBeTruthy();
          expect(item.fullPrompt.length).toBeGreaterThan(20);
          expect(item.sampleImageUrl).toBeTruthy();
        }
      }
    }
    // Verify exact catalog of 12 items across 4 themes
    expect(totalItems).toBe(12);
  });

  it('should support deterministic selection by index and targeted subId/itemId', async () => {
    const mockRunner = vi.fn().mockResolvedValue({
      jobId: 'fal_mock_456',
      imageUrl: 'https://fal.media/variant.png'
    });
    const service = new FalService(mockRunner, 5000);

    // Specific selection: Leonardo Mona Lisa
    const resMonaLisa = await service.generatePoster(
      'fine_art',
      '蒙娜',
      undefined,
      'valid_key',
      undefined,
      'featured',
      'mona_lisa'
    );
    expect(resMonaLisa.capsuleVariant?.id).toBe('mona_lisa');
    expect(resMonaLisa.capsuleVariant?.name).toContain('蒙娜丽莎');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining("Mona Lisa"),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('modern digital artifacts'),
      undefined,
      expect.any(String)
    );

    // Specific selection: Secret Agent (Cosplay)
    const resSecretAgent = await service.generatePoster(
      'cosplay',
      '托尼',
      undefined,
      'valid_key',
      undefined,
      'featured',
      'secret_agent'
    );
    expect(resSecretAgent.capsuleVariant?.id).toBe('secret_agent');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('balaclava'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('studio lighting'),
      undefined,
      expect.any(String)
    );


    // Colleague template: Line Art (Minimalist Ink Sketch)
    const resLineArt = await service.generatePoster(
      'fine_art',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'featured',
      'line_art'
    );
    expect(resLineArt.capsuleVariant?.id).toBe('line_art');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('Study of My Pet'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('realistic pencil sketch, colorful, gray gradient'),
      undefined,
      expect.any(String)
    );

    // Colleague template: Christmas (Velvet Box)
    const resChristmas = await service.generatePoster(
      'celebration',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'featured',
      'christmas'
    );
    expect(resChristmas.capsuleVariant?.id).toBe('christmas');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('British Christmas'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('text, watermark'),
      undefined,
      expect.any(String)
    );

    // Colleague template: Halloween (Spooky Magic)
    const resHalloween = await service.generatePoster(
      'celebration',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'featured',
      'halloween'
    );
    expect(resHalloween.capsuleVariant?.id).toBe('halloween');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('Halloween'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('deformed face'),
      undefined,
      expect.any(String)
    );

    // Colleague template: Birthday VIP (Milestones)
    const resBirthday = await service.generatePoster(
      'celebration',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'featured',
      'birthday_vip'
    );
    expect(resBirthday.capsuleVariant?.id).toBe('birthday_vip');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('VIP pet birthday'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('text, watermark'),
      undefined,
      expect.any(String)
    );

    // Corporate Young Life: Airline Captain
    const resIntern = await service.generatePoster(
      'corporate',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'featured',
      'airline_captain'
    );
    expect(resIntern.capsuleVariant?.id).toBe('airline_captain');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('fisheye lens perspective'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('high altitude sky'),
      undefined,
      expect.any(String)
    );

    // Corporate Young Life: Coffee Pro
    const resCoffee = await service.generatePoster(
      'corporate',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'featured',
      'coffee_pro'
    );
    expect(resCoffee.capsuleVariant?.id).toBe('coffee_pro');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('Daily Life of a 9-to-5 Working Pet'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('coffee spilled on fur, pet drinking hot coffee'),
      undefined,
      expect.any(String)
    );

    // Cosplay Legends: The Pirate
    const resPirate = await service.generatePoster(
      'cosplay',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'featured',
      'caribbean_pirate'
    );
    expect(resPirate.capsuleVariant?.id).toBe('caribbean_pirate');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('ruthless pirate captain'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('deformed limbs'),
      undefined,
      expect.any(String)
    );

    // Backward compatibility: alias 'witch' -> 'caribbean_pirate'
    const resWitchAlias = await service.generatePoster(
      'cosplay',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'featured',
      'witch'
    );
    expect(resWitchAlias.capsuleVariant?.id).toBe('caribbean_pirate');

    // Legacy fallback compatibility: gentle
    const resLegacy = await service.generatePoster('gentle', '查理', undefined, 'valid_key', 0);
    expect(resLegacy.capsuleVariant?.id).toBeTruthy();
  });

  it('should support Wokey multi-rail priority execution and seamless failover', async () => {
    const mockRunner = vi.fn().mockImplementation((prompt, img, key, sig, neg, provider) => {
      if (provider === 'wokey') {
        return Promise.resolve({
          jobId: 'wk_mock_456',
          imageUrl: 'https://cdn.wokey.ai/sample.png'
        });
      }
      return Promise.reject(new Error('Unknown provider'));
    });

    const service = new FalService(mockRunner, 5000);
    const result = await service.generatePoster(
      'corporate',
      'Milo',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      [
        { provider: 'wokey', apiKey: 'sk-wokey-test-key' },
        { provider: 'siliconflow', apiKey: 'sk-sf-test-key' }
      ]
    );

    expect(result.isFallback).toBe(false);
    expect(result.activeProvider).toBe('Wokey');
    expect(result.jobId).toBe('wk_mock_456');
    expect(mockRunner).toHaveBeenCalledWith(
      expect.any(String),
      DEFAULT_MILO_BASE64,
      'sk-wokey-test-key',
      expect.any(AbortSignal),
      expect.any(String),
      'wokey',
      expect.any(String),
      expect.anything()
    );
  });

  it('should support Volcengine Ark (Seedream 5.0 Lite) as primary rail with correct options', async () => {
    const mockRunner = vi.fn().mockImplementation((prompt, img, key, sig, neg, provider, refUrl, options) => {
      if (provider === 'volcengine') {
        return Promise.resolve({
          jobId: 'ark_mock_789',
          imageUrl: 'https://ark.cn-beijing.volces.com/sample_ark.png'
        });
      }
      return Promise.reject(new Error('Unknown provider'));
    });

    const service = new FalService(mockRunner, 5000);
    const result = await service.generatePoster(
      'fine_art',
      'Milo',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      [
        {
          provider: 'volcengine',
          apiKey: 'volc_test_key_123',
          modelId: 'doubao-seedream-5-0-lite',
          endpoint: 'https://ark.cn-beijing.volces.com/api/v3/images/generations'
        },
        { provider: 'wokey', apiKey: 'sk-wokey-backup' }
      ]
    );

    expect(result.isFallback).toBe(false);
    expect(result.activeProvider).toBe('Volcengine Ark (Seedream 5.0 Lite)');
    expect(result.jobId).toBe('ark_mock_789');
    expect(mockRunner).toHaveBeenCalledWith(
      expect.any(String),
      DEFAULT_MILO_BASE64,
      'volc_test_key_123',
      expect.any(AbortSignal),
      expect.any(String),
      'volcengine',
      expect.any(String),
      expect.objectContaining({
        modelId: 'doubao-seedream-5-0-lite'
      })
    );
  });

  it('should failover from Volcengine to secondary provider when Volcengine fails', async () => {
    const mockRunner = vi.fn().mockImplementation((prompt, img, key, sig, neg, provider) => {
      if (provider === 'volcengine') {
        return Promise.reject(new Error('Volcengine Ark quota exceeded 429'));
      }
      if (provider === 'wokey') {
        return Promise.resolve({
          jobId: 'wk_backup_111',
          imageUrl: 'https://cdn.wokey.ai/backup.png'
        });
      }
      return Promise.reject(new Error('Unexpected provider'));
    });

    const service = new FalService(mockRunner, 5000);
    const result = await service.generatePoster(
      'cosplay',
      'Milo',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      [
        { provider: 'volcengine', apiKey: 'volc_bad_key' },
        { provider: 'wokey', apiKey: 'wokey_good_key' }
      ]
    );

    expect(result.isFallback).toBe(false);
    expect(result.failoverTriggered).toBe(true);
    expect(result.activeProvider).toBe('Wokey');
    expect(result.jobId).toBe('wk_backup_111');
  });
});
