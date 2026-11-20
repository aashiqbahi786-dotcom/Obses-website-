// Lighthouse (mobile) on key pages of a running preview server.
// Usage: npm run build && npx astro preview --port 4321 & npm run lighthouse
// Env: BASE_URL (default http://localhost:4321), CHROME_PATH (any Chrome/Chromium).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const pages = ['/', '/product', '/mobile-app-builder', '/ai-agent-builder', '/3d-website-builder', '/use-cases/eggs-farm-food', '/compare/lovable', '/pricing', '/benchmarks'];
const cats = ['performance', 'accessibility', 'best-practices', 'seo'];
// Pre-launch pages are deliberately noindex; skip that one audit until launch.
const prelaunch = /prelaunch:\s*true/.test(readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8'));

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'], chromePath: process.env.CHROME_PATH });
const rows = [];
let failed = false;
try {
  for (const p of pages) {
    const r = await lighthouse(base + p, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: cats, ...(prelaunch ? { skipAudits: ['is-crawlable'] } : {}) });
    const s = Object.fromEntries(cats.map((c) => [c, Math.round((r.lhr.categories[c].score ?? 0) * 100)]));
    rows.push({ page: p, ...s });
    if (cats.some((c) => s[c] < 95)) failed = true;
    for (const c of cats.filter((c) => s[c] < 100)) {
      const issues = r.lhr.categories[c].auditRefs
        .map((a) => r.lhr.audits[a.id])
        .filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'notApplicable')
        .map((a) => a.id);
      if (issues.length) console.log(`  ${p} ${c}: ${issues.join(', ')}`);
    }
  }
} finally {
  await chrome.kill();
}
console.table(rows);
mkdirSync('reports', { recursive: true });
const date = new Date().toISOString().slice(0, 10);
writeFileSync(
  'reports/lighthouse.md',
  `# Lighthouse (mobile, simulated throttling) — ${date}\n\nRun against \`${base}\`.${prelaunch ? ' Pre-launch mode: the `is-crawlable` audit is skipped because pages are noindex on purpose.' : ''}\n\n| Page | Performance | Accessibility | Best Practices | SEO |\n|---|---|---|---|---|\n` +
    rows.map((r) => `| ${r.page} | ${r.performance} | ${r.accessibility} | ${r['best-practices']} | ${r.seo} |`).join('\n') +
    '\n',
);
if (failed) { console.error('✗ a score is below 95'); process.exit(1); }
console.log('✓ all scores ≥ 95');
