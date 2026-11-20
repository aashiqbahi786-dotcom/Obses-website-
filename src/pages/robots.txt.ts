import type { APIRoute } from 'astro';
import { site } from '../config/site';

/** Search engines and AI answer crawlers are allowed (founder can opt out here). */
const aiCrawlers = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'];

export const GET: APIRoute = () => {
  if (site.prelaunch) {
    // Crawling stays allowed so search engines can see the noindex header/meta and drop the pages.
    return new Response('# Pre-launch: pages are noindex (X-Robots-Tag + meta) until the real domain is live.\nUser-agent: *\nAllow: /\n', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    ...aiCrawlers.flatMap((ua) => [`User-agent: ${ua}`, 'Allow: /', '']),
    `Sitemap: ${new URL('/sitemap-index.xml', site.url)}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
