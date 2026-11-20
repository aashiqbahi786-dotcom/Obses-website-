/**
 * Single source of truth for brand details.
 * The name and domains are NOT final — change them here only.
 *
 * Placeholders (founder to fill):
 *   domain        ← {{BRAND_DOMAIN}}   (".example" is a reserved, non-real TLD)
 *   contactEmail  ← {{CONTACT_EMAIL}}
 */
const domain = 'obsess.example';

export const site = {
  name: 'Obsess',
  domain,
  url: `https://${domain}`,
  appUrl: `https://app.${domain}`,
  contactEmail: `hello@${domain}`,
  tagline: 'Describe it. Obsess builds it.',
  /** Shown in the footer and in JSON-LD; leave empty until accounts exist. */
  social: [] as { name: string; url: string }[],
  /** Text logo until the real logo exists. Set a path in /public to switch. */
  logo: null as string | null,
  status: 'Invite-only Alpha',
  /** True while domain/email above are placeholders. */
  placeholders: true,
  /**
   * Pre-launch: the site is built ahead of the product launch (founder 2026-11-20).
   * While true, every page is `noindex` and robots.txt blocks crawlers.
   * Set to false on launch day, together with the real domain.
   */
  prelaunch: true,
} as const;

export const nav = [
  { href: '/products', label: 'Products' },
  { href: '/features', label: 'Features' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/compare', label: 'Compare' },
  { href: '/pricing', label: 'Pricing' },
] as const;
