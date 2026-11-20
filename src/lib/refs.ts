import { getCollection } from 'astro:content';

export interface Ref {
  id: string;
  href: string;
  title: string;
  text: string;
  icon: string;
  comingSoon: boolean;
}

/** Content can reference a product or a feature by id; this resolves either. */
export async function refIndex(): Promise<Map<string, Ref>> {
  const [products, features] = await Promise.all([getCollection('products'), getCollection('features')]);
  const map = new Map<string, Ref>();
  for (const p of products)
    map.set(p.id, { id: p.id, href: `/${p.id}`, title: p.data.shortName, text: p.data.tagline, icon: p.data.icon, comingSoon: p.data.status === 'coming-soon' });
  for (const f of features)
    map.set(f.id, { id: f.id, href: `/features/${f.id}`, title: f.data.shortTitle, text: f.data.summary, icon: f.data.icon, comingSoon: f.data.status === 'coming-soon' });
  return map;
}

export async function resolveRefs(ids: string[]): Promise<Ref[]> {
  const map = await refIndex();
  return ids.map((id) => {
    const r = map.get(id);
    if (!r) throw new Error(`Unknown product/feature reference: ${id}`);
    return r;
  });
}

export async function sortedProducts() {
  return (await getCollection('products')).sort((a, b) => a.data.order - b.data.order);
}
