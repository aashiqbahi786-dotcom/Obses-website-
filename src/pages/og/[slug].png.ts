/** One generated Open Graph image (1200×630 PNG) per page, at build time. */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { site } from '../../config/site';
import { staticPages, ogSlug } from '../../lib/pages';

const fontDir = join(process.cwd(), 'node_modules/@fontsource/inter/files');
const regular = readFileSync(join(fontDir, 'inter-latin-400-normal.woff'));
const bold = readFileSync(join(fontDir, 'inter-latin-800-normal.woff'));

export const getStaticPaths: GetStaticPaths = async () => {
  const pages: { path: string; title: string; kicker: string }[] = [
    ...Object.values(staticPages).map((p) => ({ path: p.path, title: p.title.split(' — ')[0], kicker: p.label })),
    { path: '/404', title: 'Page not found', kicker: '404' },
  ];
  for (const f of await getCollection('features'))
    pages.push({ path: `/features/${f.id}`, title: f.data.title, kicker: f.data.status === 'coming-soon' ? 'Coming soon' : 'Feature' });
  for (const u of await getCollection('useCases')) pages.push({ path: `/use-cases/${u.id}`, title: u.data.title, kicker: 'Use case' });
  for (const c of await getCollection('compare')) pages.push({ path: `/compare/${c.id}`, title: `Obsess vs ${c.data.name}`, kicker: 'Compare' });
  return pages.map((p) => ({ params: { slug: ogSlug(p.path) }, props: p }));
};

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { title, kicker } = props as { title: string; kicker: string };
  const svg = await satori(
    h('div', { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#0b0f17', color: '#f3f6fb', fontFamily: 'Inter' }, [
      h('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
        h('div', { width: 56, height: 56, borderRadius: 12, background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, fontWeight: 800, color: '#fff' }, site.name.charAt(0)),
        h('div', { fontSize: 36, fontWeight: 800 }, site.name),
      ]),
      h('div', { display: 'flex', flexDirection: 'column', gap: 20 }, [
        h('div', { fontSize: 28, color: '#7aa3f2', fontWeight: 400 }, kicker),
        h('div', { fontSize: title.length > 40 ? 60 : 72, fontWeight: 800, lineHeight: 1.1 }, title),
      ]),
      h('div', { fontSize: 26, color: '#a3aec2' }, site.tagline),
    ]) as never,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: bold, weight: 800, style: 'normal' },
      ],
    },
  );
  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
