import { Hono } from 'hono';
import { Env } from '../types/env';
import { CASCADING_THEMES, CORE_THEME_KEYS } from '../config/styles';

export const stylesRoute = new Hono<{
  Bindings: Env;
  Variables: { clientIp: string; traceId: string };
}>();

stylesRoute.get('/api/styles', (c) => {
  const themes = CORE_THEME_KEYS.map((key) => CASCADING_THEMES[key]);
  return c.json({
    success: true,
    data: {
      themes
    }
  });
});
