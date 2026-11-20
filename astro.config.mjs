// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { appendFileSync } from 'node:fs';
import { site } from './src/config/site.ts';

/** Pre-launch: add `X-Robots-Tag: noindex` to every response via dist/_headers. */
const prelaunchHeaders = {
  name: 'prelaunch-noindex-header',
  hooks: {
    'astro:build:done': ({ dir }) => {
      if (!site.prelaunch) return;
      appendFileSync(new URL('_headers', dir), '\n# Pre-launch (site.prelaunch = true): keep the temporary address out of search results.\n/*\n  X-Robots-Tag: noindex\n');
    },
  },
};

export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  // Old feature URLs → product pages (keeps links and search results working).
  redirects: {
    '/features/ai-website-builder': '/website-builder',
    '/features/ai-web-app-builder': '/web-app-builder',
    '/features/android-app-builder': '/mobile-app-builder',
    '/features/ai-agents': '/ai-agent-builder',
    '/features/premium-3d-storytelling-websites': '/3d-website-builder',
  },
  integrations: [
    mdx(),
    prelaunchHeaders,
    sitemap({ filter: (page) => !page.includes('/404') && !/\/features\/(ai-website-builder|ai-web-app-builder|android-app-builder|ai-agents|premium-3d-storytelling-websites)$/.test(page) }),
  ],
  // Cast: @tailwindcss/vite is typed against a newer Vite than Astro 5 bundles; works at runtime.
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
});
