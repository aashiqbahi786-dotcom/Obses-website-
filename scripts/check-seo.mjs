// SEO/AEO rules on every built page.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import { DIST, htmlFiles, read, routeOf, strip, report } from './lib.mjs';

const features = yaml.load(readFileSync(new URL('../src/content/features.yaml', import.meta.url), 'utf8'));
const errors = [];
const titles = new Map();
for (const file of htmlFiles()) {
  const route = routeOf(file);
  const html = read(file);
  const e = (msg) => errors.push(`${route}: ${msg}`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, '&') ?? '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  if (!title) e('missing <title>');
  else if ([...title].length > 60) e(`title ${[...title].length} chars > 60: "${title}"`);
  if (!desc) e('missing meta description');
  else if ([...desc.replace(/&[a-z#0-9]+;/gi, 'x')].length > 155) e(`description > 155 chars`);
  if (titles.has(title)) e(`duplicate title with ${titles.get(title)}`);
  titles.set(title, route);

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) e(`${h1} <h1> (need exactly 1)`);
  if (!/<link rel="canonical" href="https:\/\/[^"]+"/.test(html)) e('missing canonical');
  for (const p of ['og:title', 'og:description', 'og:image', 'og:url']) if (!html.includes(`property="${p}"`)) e(`missing ${p}`);
  if (!html.includes('name="twitter:card"')) e('missing twitter:card');
  const og = html.match(/property="og:image" content="https?:\/\/[^/]+(\/[^"]+)"/)?.[1];
  if (og && !existsSync(join(DIST, og))) e(`og image not generated: ${og}`);

  if (route !== '/404') {
    const answer = html.match(/<p data-answer[^>]*>([\s\S]*?)<\/p>/)?.[1];
    if (!answer) e('missing answer-first block');
    else {
      const words = strip(answer).split(' ').filter(Boolean).length;
      if (words < 40 || words > 60) e(`answer block has ${words} words (need 40–60)`);
    }
    if (route !== '/' && !html.includes('aria-label="Breadcrumb"')) e('missing breadcrumb');
  }

  // Coming-soon feature pages must show the label.
  const slug = route.match(/^\/features\/(.+)$/)?.[1];
  if (slug && features[slug]?.status === 'coming-soon' && !html.includes('data-coming-soon')) e('coming-soon feature page without badge');
}
report('check-seo', errors);
