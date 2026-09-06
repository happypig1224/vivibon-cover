/**
 * In-memory Mock implementation of Cloudflare KVNamespace for Vitest testing
 */
export class MockKVNamespace {
  private store = new Map<string, { value: string; expiresAt?: number }>();

  async get(key: string, options?: unknown): Promise<string | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  async put(
    key: string,
    value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
    options?: { expiration?: number; expirationTtl?: number }
  ): Promise<void> {
    const stringValue = typeof value === 'string' ? value : String(value);
    let expiresAt: number | undefined;
    if (options?.expirationTtl) {
      expiresAt = Date.now() + options.expirationTtl * 1000;
    } else if (options?.expiration) {
      expiresAt = options.expiration * 1000;
    }
    this.store.set(key, { value: stringValue, expiresAt });
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async list(options?: unknown): Promise<{ keys: Array<{ name: string }>; list_complete: boolean }> {
    const keys = Array.from(this.store.keys()).map((name) => ({ name }));
    return { keys, list_complete: true };
  }

  // Test helper to clear store
  clear(): void {
    this.store.clear();
  }

  // Test helper to directly set value
  setRaw(key: string, value: string): void {
    this.store.set(key, { value });
  }
}
