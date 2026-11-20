// JSON-LD validation: parses every block and checks the schema.org shapes we rely on.
import { htmlFiles, read, routeOf, report } from './lib.mjs';

const errors = [];
const need = {
  Organization: ['name', 'url'],
  WebSite: ['name', 'url'],
  SoftwareApplication: ['name', 'applicationCategory', 'operatingSystem', 'description'],
  FAQPage: ['mainEntity'],
  BreadcrumbList: ['itemListElement'],
};

for (const file of htmlFiles()) {
  const route = routeOf(file);
  const e = (m) => errors.push(`${route}: ${m}`);
  const blocks = [...read(file).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length) { e('no JSON-LD'); continue; }
  const types = new Set();
  for (const [, raw] of blocks) {
    let data;
    try { data = JSON.parse(raw); } catch (err) { e(`invalid JSON: ${err.message}`); continue; }
    if (data['@context'] !== 'https://schema.org') e('@context must be https://schema.org');
    for (const node of data['@graph'] ?? [data]) {
      const t = node['@type'];
      types.add(t);
      for (const k of need[t] ?? []) if (node[k] == null || node[k] === '') e(`${t} missing ${k}`);
      if (t === 'SoftwareApplication' && 'offers' in node) e('SoftwareApplication must not have offers until pricing is live');
      if (t === 'FAQPage') {
        if (!node.mainEntity.length) e('FAQPage empty');
        for (const q of node.mainEntity)
          if (q['@type'] !== 'Question' || !q.name || q.acceptedAnswer?.['@type'] !== 'Answer' || !q.acceptedAnswer.text) e(`bad FAQ item: ${q.name}`);
      }
      if (t === 'BreadcrumbList')
        node.itemListElement.forEach((it, i) => {
          if (it.position !== i + 1 || !it.name || !/^https:\/\//.test(it.item)) e(`bad breadcrumb item ${i + 1}`);
        });
    }
  }
  for (const t of ['Organization', 'WebSite']) if (!types.has(t)) e(`missing ${t}`);
  if (route !== '/' && route !== '/404' && !types.has('BreadcrumbList')) e('missing BreadcrumbList');
  if ((route === '/' || route === '/product') && !types.has('SoftwareApplication')) e('missing SoftwareApplication');
  if (read(file).includes('id="faq-heading"') && !types.has('FAQPage')) e('has FAQ markup but no FAQPage');
}
report('validate-jsonld', errors);
