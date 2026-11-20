// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/config/site.ts';

export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
  // Cast: @tailwindcss/vite is typed against a newer Vite than Astro 5 bundles; works at runtime.
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
});
