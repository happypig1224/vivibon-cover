import { describe, it, expect } from 'vitest';
import { GenerateRequestSchema } from '../src/schemas/generate';

describe('GenerateRequestSchema Contract Validation', () => {
  it('should accept valid requests with default values', () => {
    const validPayload = {
      styleKey: 'gentle'
    };

    const result = GenerateRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.styleKey).toBe('gentle');
      expect(result.data.petName).toBe('麦洛 Milo');
      expect(result.data.isDefaultSample).toBe(true);
    }
  });

  it('should accept all 4 valid haute couture styles', () => {
    const styles = ['gentle', 'detective', 'street', 'warm'] as const;
    for (const style of styles) {
      const result = GenerateRequestSchema.safeParse({ styleKey: style });
      expect(result.success).toBe(true);
    }
  });

  it('should reject invalid styleKey with INVALID_STYLE_KEY error message', () => {
    const invalidPayload = {
      styleKey: 'cyberpunk_neon',
      petName: 'Rocky'
    };

    const result = GenerateRequestSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('styleKey'));
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Requested style is not in haute couture catalogue.');
    }
  });

  it('should reject missing styleKey', () => {
    const missingStyle = {
      petName: 'Milo'
    };

    const result = GenerateRequestSchema.safeParse(missingStyle);
    expect(result.success).toBe(false);
  });

  it('should reject petName exceeding 30 characters', () => {
    const longName = {
      styleKey: 'gentle',
      petName: 'A'.repeat(31)
    };

    const result = GenerateRequestSchema.safeParse(longName);
    expect(result.success).toBe(false);
  });

  it('should reject imageBase64 exceeding 5MB limit', () => {
    // 5MB = 5,242,880 bytes. In base64, 5MB is roughly ~7,000,000 characters.
    // Let's construct a base64 string that decodes to > 5MB (e.g. ~5.5MB of data)
    const largeBase64Length = Math.ceil((5.5 * 1024 * 1024 * 4) / 3);
    const oversizedBase64 = 'data:image/jpeg;base64,' + 'A'.repeat(largeBase64Length);

    const result = GenerateRequestSchema.safeParse({
      styleKey: 'gentle',
      imageBase64: oversizedBase64
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const imageIssue = result.error.issues.find((i) => i.path.includes('imageBase64'));
      expect(imageIssue).toBeDefined();
      expect(imageIssue?.message).toBe('Uploaded photo exceeds 5MB limit.');
    }
  });

  it('should accept imageBase64 within 5MB limit', () => {
    // 100KB sample base64
    const validBase64Length = Math.ceil((100 * 1024 * 4) / 3);
    const normalBase64 = 'data:image/png;base64,' + 'A'.repeat(validBase64Length);

    const result = GenerateRequestSchema.safeParse({
      styleKey: 'street',
      imageBase64: normalBase64
    });

    expect(result.success).toBe(true);
  });
});
