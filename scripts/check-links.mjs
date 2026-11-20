// Internal link checker on the built site: every href/src to our own pages and assets must exist.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, htmlFiles, read, rel, report } from './lib.mjs';

const errors = [];
let count = 0;
const ids = new Map();
for (const f of htmlFiles()) ids.set(f, new Set([...read(f).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));

function resolves(path) {
  const clean = decodeURIComponent(path.split('#')[0].split('?')[0]);
  if (clean === '/' ) return join(DIST, 'index.html');
  const candidates = [join(DIST, clean), join(DIST, clean + '.html'), join(DIST, clean, 'index.html')];
  return candidates.find((c) => existsSync(c) && !c.endsWith('/')) ?? null;
}

for (const file of htmlFiles()) {
  const html = read(file);
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    count++;
    if (url.startsWith('#')) {
      if (url.length > 1 && !ids.get(file).has(url.slice(1))) errors.push(`${rel(file)} → missing anchor ${url}`);
      continue;
    }
    if (!url.startsWith('/')) { errors.push(`${rel(file)} → relative link ${url} (use absolute)`); continue; }
    const target = resolves(url);
    if (!target) { errors.push(`${rel(file)} → broken ${url}`); continue; }
    const hash = url.split('#')[1];
    if (hash && target.endsWith('.html') && !ids.get(target)?.has(hash)) errors.push(`${rel(file)} → missing anchor ${url}`);
  }
}
console.log(`checked ${count} internal links`);
report('check-links', errors);
