// Truth-rule lint on content source (runs before build).
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import { report } from './lib.mjs';

const load = (f) => yaml.load(readFileSync(new URL(`../src/content/${f}`, import.meta.url), 'utf8'));
const errors = [];

// 1. Competitor cells: anything but "unknown" needs an official source + date.
const compare = load('compare.yaml');
for (const [id, c] of Object.entries(compare)) {
  const host = new URL(c.officialUrl).hostname.replace(/^www\./, '');
  for (const [crit, cell] of Object.entries(c.cells ?? {})) {
    if (cell.value === 'unknown') continue;
    if (!cell.source) errors.push(`compare/${id}.${crit}: "${cell.value}" without source`);
    else if (!new URL(cell.source).hostname.endsWith(host)) errors.push(`compare/${id}.${crit}: source is not ${host}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(cell.checked ?? '')) errors.push(`compare/${id}.${crit}: missing checked date`);
  }
  for (const s of c.stronger ?? []) if (!s.source || !s.checked) errors.push(`compare/${id}: "stronger" note without source/date`);
}

// 2. Coming-soon features must not read as available.
const features = load('features.yaml');
for (const [id, f] of Object.entries(features)) {
  if (f.status !== 'coming-soon') continue;
  const text = `${f.answer} ${f.description}`;
  if (!/coming soon/i.test(text)) errors.push(`features/${id}: coming-soon text must say "coming soon"`);
  if (/\b(available now|now available|try it today)\b/i.test(text)) errors.push(`features/${id}: claims availability`);
}

// 3. Related/feature references must exist.
const useCases = load('use-cases.yaml');
for (const [id, f] of Object.entries(features)) for (const r of f.related ?? []) if (!features[r]) errors.push(`features/${id}: unknown related "${r}"`);
for (const [id, u] of Object.entries(useCases)) for (const r of u.features) if (!features[r]) errors.push(`use-cases/${id}: unknown feature "${r}"`);

// 4. Banned social-proof phrases anywhere in content.
const all = JSON.stringify([features, useCases, compare, load('faq.yaml')]);
for (const phrase of ['trusted by', 'testimonial', 'customers love', '5-star', 'thousands of users', 'millions of'])
  if (all.toLowerCase().includes(phrase)) errors.push(`banned phrase in content: "${phrase}"`);

report('lint-content', errors);
