import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

export const DIST = new URL('../dist/', import.meta.url).pathname;

export function walk(dir, ext) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p, ext));
    else if (!ext || p.endsWith(ext)) out.push(p);
  }
  return out;
}

/** Built pages, excluding Astro redirect stubs (meta refresh, noindex). */
export const isRedirectStub = (html) => /<meta http-equiv="refresh"/.test(html);
export const htmlFiles = () => walk(DIST, '.html').filter((f) => !isRedirectStub(readFileSync(f, 'utf8')));
export const read = (p) => readFileSync(p, 'utf8');
export const rel = (p) => '/' + relative(DIST, p);

/** /features/x.html → /features/x ; /index.html → / */
export const routeOf = (p) => {
  const r = rel(p).replace(/\.html$/, '');
  return r === '/index' ? '/' : r;
};

export const strip = (html) =>
  html.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();

export function report(name, errors) {
  if (errors.length) {
    console.error(`✗ ${name}: ${errors.length} problem(s)`);
    for (const e of errors) console.error('  - ' + e);
    process.exit(1);
  }
  console.log(`✓ ${name}`);
}
