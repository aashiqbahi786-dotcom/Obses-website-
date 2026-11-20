// Fetch competitors' OFFICIAL pages and save their text with the date, as evidence
// for filling src/content/compare.yaml (each cell needs `source` + `checked`).
// Usage: node scripts/fetch-competitor-pages.mjs   → reports/competitors/<id>/<date>/*.txt
import { mkdirSync, writeFileSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const extra = {
  lovable: ['https://lovable.dev/pricing', 'https://docs.lovable.dev'],
  'bolt-new': ['https://bolt.new/pricing', 'https://support.bolt.new'],
  replit: ['https://replit.com/pricing', 'https://docs.replit.com'],
  v0: ['https://v0.app/pricing', 'https://v0.app/docs'],
  emergent: ['https://emergent.sh/pricing'],
  'dora-ai': ['https://www.dora.run/pricing'],
};
const compare = yaml.load(readFileSync(new URL('../src/content/compare.yaml', import.meta.url), 'utf8'));
const date = new Date().toISOString().slice(0, 10);
const text = (html) =>
  html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

let failures = 0;
for (const [id, c] of Object.entries(compare)) {
  const dir = `reports/competitors/${id}/${date}`;
  mkdirSync(dir, { recursive: true });
  for (const url of [c.officialUrl, ...(extra[id] ?? [])]) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; site-fact-check)' } });
      const body = text(await res.text());
      const file = `${dir}/${new URL(url).hostname}${new URL(url).pathname.replace(/\//g, '_')}.txt`;
      writeFileSync(file, `URL: ${url}\nFetched: ${new Date().toISOString()}\nStatus: ${res.status}\n\n${body}\n`);
      console.log(`✓ ${url} (${res.status}, ${body.length} chars)`);
    } catch (err) {
      failures++;
      console.error(`✗ ${url}: ${err.cause?.code ?? err.message}`);
    }
  }
}
console.log(failures ? `${failures} page(s) failed — fill those cells later, never from memory.` : 'All pages saved.');
console.log('Note: pages that render with JavaScript may save little text; check them in a browser.');
