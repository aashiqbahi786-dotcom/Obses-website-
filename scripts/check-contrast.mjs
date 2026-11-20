// WCAG AA contrast for token pairs, in both themes (reads src/styles/global.css).
import { readFileSync } from 'node:fs';
import { report } from './lib.mjs';

const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const block = (sel) => Object.fromEntries([...css.split(sel)[1].split('}')[0].matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
const themes = { light: block(':root {'), dark: block('[data-theme="dark"] {') };

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

// [foreground, background, minimum]
const pairs = [
  ['text', 'bg', 4.5], ['text', 'surface', 4.5], ['muted', 'bg', 4.5], ['muted', 'surface', 4.5],
  ['accent', 'bg', 4.5], ['accent', 'surface', 4.5], ['accent', 'accent-soft', 4.5], ['muted', 'accent-soft', 4.5],
  ['accent-contrast', 'accent', 4.5], ['accent-contrast', 'accent-hover', 4.5], ['warn-text', 'warn-soft', 4.5],
  ['border', 'bg', 1.2],
];
const errors = [];
for (const [name, t] of Object.entries(themes))
  for (const [fg, bg, min] of pairs) {
    const r = ratio(t[fg], t[bg]);
    console.log(`${name.padEnd(5)} ${fg} on ${bg}: ${r.toFixed(2)}`);
    if (r < min) errors.push(`${name}: ${fg} on ${bg} = ${r.toFixed(2)} < ${min}`);
  }
report('check-contrast', errors);
