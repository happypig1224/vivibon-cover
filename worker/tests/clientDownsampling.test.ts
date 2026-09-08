import { describe, it, expect } from 'vitest';
import { GenerateRequestSchema } from '../src/schemas/generate';

/**
 * Pure geometry scaling algorithm mirroring public/index.html downsampleImageFile
 */
export function calculateDownsampledDimensions(
  width: number,
  height: number,
  maxEdge: number = 1500
): { width: number; height: number; scaleFactor: number } {
  if (width <= maxEdge && height <= maxEdge) {
    return { width, height, scaleFactor: 1.0 };
  }

  if (width >= height) {
    const scale = maxEdge / width;
    return {
      width: maxEdge,
      height: Math.round(height * scale),
      scaleFactor: scale
    };
  } else {
    const scale = maxEdge / height;
    return {
      width: Math.round(width * scale),
      height: maxEdge,
      scaleFactor: scale
    };
  }
}

/**
 * Calculates raw RGBA bitmap memory footprint in Megabytes
 */
export function estimateBitmapMemoryMb(width: number, height: number): number {
  const bytes = width * height * 4; // 4 bytes per RGBA pixel
  return bytes / (1024 * 1024);
}

describe('P0-1: Client-Side Downsampling Geometry & Memory Safety (NC-12)', () => {
  it('should scale down 48MP iPhone 15/16 Pro portrait photo (6000x8000) to maxEdge 1500px', () => {
    const originalW = 6000;
    const originalH = 8000;
    const result = calculateDownsampledDimensions(originalW, originalH, 1500);

    expect(result.height).toBe(1500);
    expect(result.width).toBe(1125);
    expect(result.width / result.height).toBeCloseTo(originalW / originalH, 3);

    // Verify RAM reduction from ~183MB to ~6.4MB
    const rawMemMb = estimateBitmapMemoryMb(originalW, originalH);
    const scaledMemMb = estimateBitmapMemoryMb(result.width, result.height);

    expect(rawMemMb).toBeGreaterThan(180);
    expect(scaledMemMb).toBeLessThan(7);
    const reductionPercent = ((rawMemMb - scaledMemMb) / rawMemMb) * 100;
    expect(reductionPercent).toBeGreaterThan(95); // >95% RAM reduction
  });

  it('should scale down 48MP landscape photo (8000x6000) to 1500x1125', () => {
    const originalW = 8000;
    const originalH = 6000;
    const result = calculateDownsampledDimensions(originalW, originalH, 1500);

    expect(result.width).toBe(1500);
    expect(result.height).toBe(1125);
    expect(result.width / result.height).toBeCloseTo(originalW / originalH, 3);
  });

  it('should scale down 12MP photo (3024x4032) to maxEdge 1500px preserving ratio', () => {
    const originalW = 3024;
    const originalH = 4032;
    const result = calculateDownsampledDimensions(originalW, originalH, 1500);

    expect(result.height).toBe(1500);
    expect(result.width).toBe(1125);
    expect(result.width / result.height).toBeCloseTo(originalW / originalH, 3);
  });

  it('should scale down large square avatar (4000x4000) to 1500x1500', () => {
    const result = calculateDownsampledDimensions(4000, 4000, 1500);
    expect(result.width).toBe(1500);
    expect(result.height).toBe(1500);
  });

  it('should NOT upscale small photos that are already within maxEdge (e.g. 800x600)', () => {
    const result = calculateDownsampledDimensions(800, 600, 1500);
    expect(result.width).toBe(800);
    expect(result.height).toBe(600);
    expect(result.scaleFactor).toBe(1.0);
  });

  it('downsampled JPEG base64 payload should pass GenerateRequestSchema smoothly', () => {
    // A 1500x1125 JPEG at quality 0.85 generates ~350KB Base64
    const simulatedKb = 350;
    const base64Len = Math.ceil((simulatedKb * 1024 * 4) / 3);
    const downsampledBase64 = 'data:image/jpeg;base64,' + 'B'.repeat(base64Len);

    const payload = {
      styleKey: 'corporate',
      imageBase64: downsampledBase64,
      petName: 'Milo'
    };

    const parsed = GenerateRequestSchema.safeParse(payload);
    expect(parsed.success).toBe(true);
  });
});
