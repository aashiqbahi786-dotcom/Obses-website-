import { getCollection, getEntry } from 'astro:content';
import { site } from '../config/site';
import { staticPages } from './pages';
import { usps } from './usp';
import { latestRun } from './benchmarks';

const abs = (p: string) => new URL(p, site.url).toString();

export async function buildLlmsTxt(full: boolean): Promise<string> {
  const products = (await getCollection('products')).sort((a, b) => a.data.order - b.data.order);
  const features = (await getCollection('features')).sort((a, b) => a.data.order - b.data.order);
  const useCases = (await getCollection('useCases')).sort((a, b) => a.data.order - b.data.order);
  const compare = (await getCollection('compare')).sort((a, b) => a.data.order - b.data.order);
  const homeFaq = (await getEntry('faq', 'home'))!.data.items;
  const pricingFaq = (await getEntry('faq', 'pricing'))!.data.items;

  const out: string[] = [];
  out.push(`# ${site.name}`, '');
  out.push(
    `> ${site.name} is an AI builder with five products: website builder, web app builder (React), mobile app builder (Android, React Native + Expo), AI agent builder and 3D scroll animation website builder. A person describes an idea in plain words (English, Hinglish, Hindi, Banglish) and ${site.name} builds, checks, previews and publishes it. Status: ${site.status}.`,
    '',
  );
  out.push('Facts on this site follow strict rules: features marked "Coming soon" are not available; numbers come only from dated internal evals; competitor facts are sourced and dated or shown as "—".', '');

  out.push('## Main pages', '');
  for (const p of Object.values(staticPages)) out.push(`- [${p.label}](${abs(p.path)}): ${p.description}`);
  out.push('');

  out.push('## Products', '');
  for (const p of products)
    out.push(`- [${p.data.name}](${abs(`/${p.id}`)})${p.data.status === 'coming-soon' ? ' (coming soon)' : ''}: ${full ? p.data.answer : p.data.tagline}`);
  out.push('');

  out.push('## Features available now', '');
  for (const f of features.filter((x) => x.data.status === 'available'))
    out.push(`- [${f.data.shortTitle}](${abs(`/features/${f.id}`)}): ${full ? f.data.answer : f.data.summary}`);
  out.push('', '## Coming soon (not available yet)', '');
  for (const f of features.filter((x) => x.data.status === 'coming-soon'))
    out.push(`- [${f.data.shortTitle}](${abs(`/features/${f.id}`)}): Coming soon. ${f.data.summary}`);
  out.push('');

  out.push('## Why Obsess is different', '');
  usps.forEach((u, i) => out.push(`${i + 1}. ${u.title}${u.roadmap ? ' (roadmap, coming soon)' : ''}: ${u.text}`));
  out.push('');

  out.push(`## Benchmarks (${latestRun.label}, ${latestRun.date}, model ${latestRun.model})`, '');
  for (const r of latestRun.results) out.push(`- ${r.title}: ${r.headline}. ${r.detail}`);
  out.push(`- Limits: ${latestRun.limits.join(' ')}`, `- Details: ${abs('/benchmarks')}`, '');

  out.push('## Use cases', '');
  for (const u of useCases)
    out.push(`- [${u.data.shortTitle}](${abs(`/use-cases/${u.id}`)})${full ? `: ${u.data.answer} Example prompt: "${u.data.promptHinglish}"` : ''}`);
  out.push('');

  out.push('## Comparisons', '');
  for (const c of compare) out.push(`- [Obsess vs ${c.data.name}](${abs(`/compare/${c.id}`)})`);
  out.push('');

  if (full) {
    out.push('## Planned pricing (not live)', '');
    out.push(
      'Free $0 (5 credits a day, up to 30 a month, "Built with Obsess" badge); Starter $9 (36 credits a month + 10 bonus); Pro $19 (76 + 10 bonus, custom domain — coming soon); Launch $39 (156 + 10 bonus, Launchpad 7 days and Android builds — coming soon); Scale $59 (236 + 10 bonus, Launchpad 14 days and Android builds — coming soon). One credit ≈ $0.25 of value; a task costs at least 0.5 credit, rounded up in 0.5 steps, at most 60. Paid plans open with the private beta.',
      '',
    );
    out.push('## FAQ', '');
    for (const q of [...homeFaq, ...pricingFaq]) out.push(`Q: ${q.q}`, `A: ${q.a}`, '');
  } else {
    out.push('## Optional', '', `- [Full text for AI assistants](${abs('/llms-full.txt')})`, '');
  }
  out.push(`Contact: ${site.contactEmail}`, '');
  return out.join('\n');
}
