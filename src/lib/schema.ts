import { site } from '../config/site';

const abs = (path: string) => new URL(path, site.url).toString();

export const organization = () => ({
  '@type': 'Organization',
  '@id': abs('/#organization'),
  name: site.name,
  url: site.url,
  email: site.contactEmail,
  ...(site.logo ? { logo: abs(site.logo) } : {}),
  ...(site.social.length ? { sameAs: site.social.map((s) => s.url) } : {}),
});

export const website = () => ({
  '@type': 'WebSite',
  '@id': abs('/#website'),
  name: site.name,
  url: site.url,
  publisher: { '@id': abs('/#organization') },
  inLanguage: 'en',
});

/** No `offers` until pricing is live (truth rule). */
export const softwareApplication = (description: string) => ({
  '@type': 'SoftwareApplication',
  name: site.name,
  url: site.url,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  description,
  publisher: { '@id': abs('/#organization') },
});

export const faqPage = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({
    '@type': 'Question',
    name: i.q,
    acceptedAnswer: { '@type': 'Answer', text: i.a },
  })),
});

export const breadcrumbList = (crumbs: { label: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.label,
    item: abs(c.path),
  })),
});

export const graph = (nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
