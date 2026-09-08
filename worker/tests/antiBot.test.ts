import { describe, it, expect } from 'vitest';
import { createApp } from '../src/index';

describe('AntiBot Middleware & Automated Script Defense', () => {
  it('should block python-requests user-agent with 403 BOT_DETECTED', async () => {
    const app = createApp();
    const res = await app.request('/api/generate', {
      method: 'POST',
      headers: {
        'User-Agent': 'python-requests/2.28.1',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ petName: 'Milo', styleKey: 'fine_art' })
    });

    expect(res.status).toBe(403);
    const data = (await res.json()) as { errorCode: string };
    expect(data.errorCode).toBe('BOT_DETECTED');
  });

  it('should block curl automated client with 403 BOT_DETECTED', async () => {
    const app = createApp();
    const res = await app.request('/api/generate', {
      method: 'POST',
      headers: {
        'User-Agent': 'curl/7.88.1',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ petName: 'Milo', styleKey: 'fine_art' })
    });

    expect(res.status).toBe(403);
    const data = (await res.json()) as { errorCode: string };
    expect(data.errorCode).toBe('BOT_DETECTED');
  });

  it('should block HeadlessChrome automated browser with 403 BOT_DETECTED', async () => {
    const app = createApp();
    const res = await app.request('/api/generate', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/114.0.5735.198 Safari/537.36',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ petName: 'Milo', styleKey: 'fine_art' })
    });

    expect(res.status).toBe(403);
    const data = (await res.json()) as { errorCode: string };
    expect(data.errorCode).toBe('BOT_DETECTED');
  });

  it('should block empty or abnormally short User-Agent', async () => {
    const app = createApp();
    const res = await app.request('/api/generate', {
      method: 'POST',
      headers: {
        'User-Agent': '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ petName: 'Milo', styleKey: 'fine_art' })
    });

    expect(res.status).toBe(403);
    const data = (await res.json()) as { errorCode: string };
    expect(data.errorCode).toBe('BOT_DETECTED');
  });

  it('should allow legitimate Mobile Safari / Instagram browser User-Agent', async () => {
    const app = createApp();
    const res = await app.request('/api/generate', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 324.0.0.18.109',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ petName: 'Milo', styleKey: 'fine_art' })
    });

    // Passes antiBot check (proceeds to rate limiting or generation, status is not 403 BOT_DETECTED)
    expect(res.status).not.toBe(403);
  });

  it('should bypass anti-bot check when x-test-bypass header is set', async () => {
    const app = createApp();
    const res = await app.request('/api/generate', {
      method: 'POST',
      headers: {
        'User-Agent': 'python-requests/2.28.1',
        'x-test-bypass': '1',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ petName: 'Milo', styleKey: 'fine_art' })
    });

    expect(res.status).not.toBe(403);
  });
});
