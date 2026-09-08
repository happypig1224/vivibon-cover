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
    // Explicitly request Corporate -> Entry-Level -> Programmer
    const result = await service.generatePoster(
      'corporate',
      'Sherlock',
      undefined,
      'valid_key',
      undefined,
      'entry_level',
      'programmer'
    );

    expect(result.isFallback).toBe(false);
    expect(result.imageUrl).toBe('https://fal.media/mock_generated.png');
    expect(result.jobId).toBe('fal_mock_123');
    expect(result.capsuleVariant?.id).toBe('programmer');
    expect(result.capsuleVariant?.name).toBe('程序员与技术码农');
    expect(mockRunner).toHaveBeenCalledWith(
      expect.stringContaining('Tech company software engineer dog portrait'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('corporate badges')
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
      expect(theme.subCategories.length).toBeGreaterThanOrEqual(2);

      for (const sub of theme.subCategories) {
        expect(sub.items.length).toBeGreaterThanOrEqual(3);
        totalItems += sub.items.length;

        for (const item of sub.items) {
          expect(item.id).toBeTruthy();
          expect(item.nameZh).toBeTruthy();
          expect(item.nameEn).toBeTruthy();
          expect(item.fullPrompt).toContain('EXACT SAME dog from the input image');
          expect(item.fullPrompt).toContain("Strictly preserve the original pet's facial structure");
          expect(item.fullPrompt).toContain('High-end commercial luxury pet portrait photography');
          expect(item.fullPrompt).toContain('8k resolution, no text, no logo');
          expect(item.fullPrompt).toContain('Unmasked face, head and eyes fully visible and natural');
        }
      }
    }
    // Verify rich catalog of 35+ items across 4 themes
    expect(totalItems).toBeGreaterThanOrEqual(35);
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
      'classical_masters',
      'mona_lisa'
    );
    expect(resMonaLisa.capsuleVariant?.id).toBe('mona_lisa');
    expect(resMonaLisa.capsuleVariant?.name).toContain('蒙娜丽莎');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining("Mona Lisa"),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('modern digital artifacts')
    );

    // Specific selection: Iron Man Nano Armor (Cosplay)
    const resIronMan = await service.generatePoster(
      'cosplay',
      '托尼',
      undefined,
      'valid_key',
      undefined,
      'marvel',
      'iron_man'
    );
    expect(resIronMan.capsuleVariant?.id).toBe('iron_man');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('Iron Man inspired superhero pet'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('full head helmet')
    );


    // Colleague template: Line Art (Minimalist Ink Sketch)
    const resLineArt = await service.generatePoster(
      'fine_art',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'classical_masters',
      'line_art'
    );
    expect(resLineArt.capsuleVariant?.id).toBe('line_art');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('Minimalist black and white rough crayon'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('realistic pencil sketch, colorful, gray gradient')
    );

    // Colleague template: Christmas (Velvet Box)
    const resChristmas = await service.generatePoster(
      'celebration',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'holidays',
      'christmas'
    );
    expect(resChristmas.capsuleVariant?.id).toBe('christmas');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('Christmas holiday luxury pet portrait'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('gift box cutting off front legs')
    );

    // Colleague template: Halloween (Spooky Magic)
    const resHalloween = await service.generatePoster(
      'celebration',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'holidays',
      'halloween'
    );
    expect(resHalloween.capsuleVariant?.id).toBe('halloween');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('Whimsical cozy and cute Halloween pet studio portrait'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('horror, bloody, skulls')
    );

    // Colleague template: Birthday VIP (Milestones)
    const resBirthday = await service.generatePoster(
      'celebration',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'milestones',
      'birthday_vip'
    );
    expect(resBirthday.capsuleVariant?.id).toBe('birthday_vip');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('VIP Birthday celebration pet studio portrait'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('hat penetrating ears, strap digging into skin')
    );

    // Corporate Young Life: Chill Intern
    const resIntern = await service.generatePoster(
      'corporate',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'entry_level',
      'chill_intern'
    );
    expect(resIntern.capsuleVariant?.id).toBe('chill_intern');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('chill anti-hustle corporate intern pet portrait'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('stressed expression, angry boss')
    );

    // Corporate Young Life: Coffee Pro
    const resCoffee = await service.generatePoster(
      'corporate',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'entry_level',
      'coffee_pro'
    );
    expect(resCoffee.capsuleVariant?.id).toBe('coffee_pro');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('coffee-fueled 9-to-5 corporate professional pet portrait'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('coffee spilled on fur, pet drinking hot coffee')
    );

    // Cosplay Legends: The Witch
    const resWitch = await service.generatePoster(
      'cosplay',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'legends',
      'witch'
    );
    expect(resWitch.capsuleVariant?.id).toBe('witch');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('Mystical fantasy witch pet studio portrait'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('hat covering eyes, hat swallowing ears, hat piercing skull')
    );

    // Cosplay Legends: The Cowboy / Coastal Cowgirl
    const resCowboy = await service.generatePoster(
      'cosplay',
      '米洛',
      undefined,
      'valid_key',
      undefined,
      'legends',
      'cowboy'
    );
    expect(resCowboy.capsuleVariant?.id).toBe('cowboy');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('Americana Wild West cowboy and Coastal Cowgirl'),
      DEFAULT_MILO_BASE64,
      'valid_key',
      expect.any(AbortSignal),
      expect.stringContaining('sunglasses obscuring eyes, heavy firearms')
    );

    // Legacy fallback compatibility: gentle
    const resLegacy = await service.generatePoster('gentle', '查理', undefined, 'valid_key', 0);
    expect(resLegacy.capsuleVariant?.id).toBeTruthy();
  });
});
