import { describe, it, expect, vi } from 'vitest';
import { FalService } from '../src/services/falService';
import { STYLE_CONFIGS, SUPPORTED_STYLE_KEYS } from '../src/config/styles';

describe('FalService AI Defense & Timeout Matrix', () => {
  it('should have valid prompt templates and fallback URLs for all 4 styles', () => {
    expect(SUPPORTED_STYLE_KEYS).toEqual(['gentle', 'detective', 'street', 'warm']);

    for (const key of SUPPORTED_STYLE_KEYS) {
      const config = STYLE_CONFIGS[key];
      expect(config.key).toBe(key);
      expect(config.prompt).toContain('8k resolution');
      expect(config.fallbackImageUrl).toMatch(/^https:\/\//);
    }
  });

  it('should immediately return graceful fallback if FAL_KEY is missing (NC-2)', async () => {
    const service = new FalService();
    const result = await service.generatePoster('gentle', '麦洛 Milo', undefined, undefined);

    expect(result.isFallback).toBe(true);
    expect(result.imageUrl).toBe(STYLE_CONFIGS.gentle.fallbackImageUrl);
    expect(result.jobId).toMatch(/^fallback_/);
    expect(result.petName).toBe('麦洛 Milo');
    expect(result.styleKey).toBe('gentle');
  });

  it('should return successful result when runner executes properly', async () => {
    const mockRunner = vi.fn().mockResolvedValue({
      jobId: 'fal_mock_123',
      imageUrl: 'https://fal.media/mock_generated.png'
    });

    const service = new FalService(mockRunner, 5000);
    const result = await service.generatePoster('detective', 'Sherlock', undefined, 'valid_key', 0);

    expect(result.isFallback).toBe(false);
    expect(result.imageUrl).toBe('https://fal.media/mock_generated.png');
    expect(result.jobId).toBe('fal_mock_123');
    expect(result.capsuleVariant?.id).toBe('aviator_vintage_shearling');
    expect(mockRunner).toHaveBeenCalledWith(
      STYLE_CONFIGS.detective.prompt,
      undefined,
      'valid_key',
      expect.any(AbortSignal)
    );
  });

  it('should gracefully degrade to preset sample when upstream runner throws 500/503 error (NC-4)', async () => {
    const failingRunner = vi.fn().mockRejectedValue(new Error('Fal.ai upstream error: 503 Service Unavailable'));

    const service = new FalService(failingRunner, 5000);
    const result = await service.generatePoster('street', 'Toby', undefined, 'valid_key');

    expect(result.isFallback).toBe(true);
    expect(result.imageUrl).toBe(STYLE_CONFIGS.street.fallbackImageUrl);
    expect(result.styleKey).toBe('street');
  });

  it('should trigger AbortController and degrade gracefully when runner exceeds timeout limit (NC-4)', async () => {
    // Runner that respects AbortSignal and aborts after timeout
    const hangingRunner = vi.fn((prompt, imageBase64, apiKey, signal: AbortSignal) => {
      return new Promise<{ jobId: string; imageUrl: string }>((resolve, reject) => {
        signal.addEventListener('abort', () => {
          const abortError = new Error('The operation was aborted');
          abortError.name = 'AbortError';
          reject(abortError);
        });
        // Deliberately delay 2000ms
        setTimeout(() => {
          resolve({ jobId: 'late_job', imageUrl: 'https://late.com' });
        }, 2000);
      });
    });

    // Test with 50ms timeout to avoid waiting full 5000ms in unit test
    const shortTimeoutService = new FalService(hangingRunner, 50);
    const result = await shortTimeoutService.generatePoster('warm', 'CozyPet', undefined, 'valid_key');

    expect(result.isFallback).toBe(true);
    expect(result.imageUrl).toBe(STYLE_CONFIGS.warm.fallbackImageUrl);
    expect(result.styleKey).toBe('warm');
  });

  it('should include Face ID identity preservation anchor and studio finish in all 12 capsule variants', () => {
    let totalVariants = 0;
    for (const key of SUPPORTED_STYLE_KEYS) {
      const config = STYLE_CONFIGS[key];
      expect(config.variants.length).toBe(3);
      totalVariants += config.variants.length;

      for (const v of config.variants) {
        expect(v.id).toBeTruthy();
        expect(v.name).toBeTruthy();
        expect(v.fullPrompt).toContain('EXACT SAME dog from the input image');
        expect(v.fullPrompt).toContain("Strictly preserve the original pet's facial structure");
        expect(v.fullPrompt).toContain('High-end commercial luxury pet portrait photography');
        expect(v.fullPrompt).toContain('8k resolution, no text, no logo');
      }
    }
    expect(totalVariants).toBe(12);
  });

  it('should support deterministic selection via index and random pick from capsule pool', async () => {
    const mockRunner = vi.fn().mockResolvedValue({
      jobId: 'fal_mock_456',
      imageUrl: 'https://fal.media/variant.png'
    });
    const service = new FalService(mockRunner, 5000);

    // Deterministic selection: variant 1 of gentle
    const resGala = await service.generatePoster('gentle', '查理', undefined, 'valid_key', 1);
    expect(resGala.capsuleVariant?.id).toBe('gentle_bordeaux_gala');
    expect(resGala.capsuleVariant?.name).toBe('盛典波尔多酒红礼服');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('royal Bordeaux wine-red velvet dinner jacket'),
      undefined,
      'valid_key',
      expect.any(AbortSignal)
    );

    // Deterministic selection: variant 2 of gentle
    const resTweed = await service.generatePoster('gentle', '查理', undefined, 'valid_key', 2);
    expect(resTweed.capsuleVariant?.id).toBe('gentle_prince_of_wales');
    expect(resTweed.capsuleVariant?.name).toBe('萨维尔街亲王格花呢');
    expect(mockRunner).toHaveBeenLastCalledWith(
      expect.stringContaining('Prince of Wales Glen plaid grey tweed'),
      undefined,
      'valid_key',
      expect.any(AbortSignal)
    );

    // Random selection: should pick one of the 3 variants
    const resRandom = await service.generatePoster('street', '查理', undefined, 'valid_key');
    const validStreetIds = ['techwear_arctic_yellow', 'techwear_glacier_white', 'techwear_cobalt_cyber'];
    expect(validStreetIds).toContain(resRandom.capsuleVariant?.id);
  });
});
