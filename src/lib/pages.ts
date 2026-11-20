/** Meta for hand-written pages. Collection pages get theirs from content. */
export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** breadcrumb label */
  label: string;
}

export const staticPages = {
  home: {
    path: '/',
    label: 'Home',
    title: 'Obsess — Build Websites, Apps, AI Agents and 3D Sites',
    description:
      'Describe your idea in English, Hinglish, Hindi or Banglish. Obsess builds websites, web apps, Android apps, AI agents and 3D scroll websites.',
  },
  products: {
    path: '/products',
    label: 'Products',
    title: 'Obsess Products — 5 AI Builders in One Place',
    description:
      'Website builder, web app builder, Android app builder, AI agent builder and 3D scroll website builder. Describe it in your language; Obsess builds it.',
  },
  product: {
    path: '/product',
    label: 'How it works',
    title: 'Product — How the Obsess AI App Builder Works',
    description:
      'The Obsess builder in detail: Brainstorm and Build modes, text, photo, voice and PDF input, live preview, checks, publishing and credits.',
  },
  features: {
    path: '/features',
    label: 'Features',
    title: 'Features — Everything Obsess Can Do, and What Is Next',
    description:
      'All Obsess features: Brainstorm and Build, photo, voice and PDF input, preview, Fix with AI, publishing, security scan, plus what is coming soon.',
  },
  useCases: {
    path: '/use-cases',
    label: 'Use cases',
    title: 'Use Cases — What People Build with Obsess',
    description:
      'Restaurants, cafés, farm and food businesses, shops, creators, students, startups and agencies: what Obsess builds for each, with example prompts.',
  },
  why: {
    path: '/why-obsess',
    label: 'Why Obsess',
    title: 'Why Obsess — 7 Ways It Is Different',
    description:
      'Built for non-coders in their own language, phone-first, five products in one place, honest checks and clear cost. Plus what is on the roadmap.',
  },
  compare: {
    path: '/compare',
    label: 'Compare',
    title: 'Compare Obsess with Other AI App Builders',
    description:
      'Factual comparisons of Obsess with Lovable, Bolt.new, Replit, v0, Emergent and Dora AI. Sources and dates for every competitor fact.',
  },
  benchmarks: {
    path: '/benchmarks',
    label: 'Benchmarks',
    title: 'Benchmarks — Internal Evals of the Obsess Agent',
    description:
      'How we test Obsess and the results: Android apps meeting requirements, preview speed, typecheck and publishing, with sample sizes and limits.',
  },
  pricing: {
    path: '/pricing',
    label: 'Pricing',
    title: 'Pricing — Planned Obsess Plans and Credits',
    description:
      'Planned Obsess pricing: Free, Starter, Pro, Launch and Scale plans and how credits work. Paid plans open with the private beta.',
  },
  about: {
    path: '/about',
    label: 'About',
    title: 'About Obsess — Building Apps in Your Own Language',
    description:
      'Why Obsess exists: to let anyone, in any language and from any phone, turn an idea into a working website or app they own.',
  },
  contact: {
    path: '/contact',
    label: 'Contact',
    title: 'Contact Obsess',
    description: 'Questions, partnerships or press? Email the Obsess team.',
  },
  invite: {
    path: '/invite',
    label: 'Request an invite',
    title: 'Request an Invite to the Obsess Alpha',
    description:
      'Obsess is in invite-only Alpha. Tell us what you want to build and request an invite to try the AI app builder.',
  },
  privacy: {
    path: '/privacy',
    label: 'Privacy',
    title: 'Privacy Policy (Draft) — Obsess',
    description: 'Draft privacy policy for the Obsess website and builder. To be reviewed by a lawyer before launch.',
  },
  terms: {
    path: '/terms',
    label: 'Terms',
    title: 'Terms of Service (Draft) — Obsess',
    description: 'Draft terms of service for Obsess. To be reviewed by a lawyer before launch.',
  },
} satisfies Record<string, PageMeta>;

export function ogSlug(path: string): string {
  return path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '__');
}
