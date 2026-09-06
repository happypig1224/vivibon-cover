import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const nodeModulesPlugin = {
  name: 'node-modules-resolver',
  setup(build) {
    build.onResolve({ filter: /\.html\?raw$/ }, (args) => {
      const cleanPath = path.resolve(args.resolveDir, args.path.replace(/\?raw$/, ''));
      return { path: cleanPath, namespace: 'file' };
    });
    build.onResolve({ filter: /^[^./]/ }, (args) => {
      try {
        const resolved = require.resolve(args.path, {
          paths: [path.resolve(__dirname, 'node_modules')]
        });
        return { path: resolved };
      } catch (e) {
        return null;
      }
    });
  }
};

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: [path.resolve(__dirname, 'src/index.ts')],
  bundle: true,
  outfile: path.resolve(__dirname, 'dist/index.js'),
  format: 'esm',
  target: 'es2022',
  platform: 'neutral',
  plugins: [nodeModulesPlugin],
  loader: { '.html': 'text' },
  sourcemap: true
};

if (isWatch) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log('[build.js] Watching for changes...');
} else {
  await esbuild.build(buildOptions);
  console.log('[build.js] Build completed successfully -> dist/index.js');
}
