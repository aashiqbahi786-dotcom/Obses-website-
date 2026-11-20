# Obsess official website — instructions for Claude

Marketing website of **Obsess** (AI app builder). Static site: Astro + TypeScript + Tailwind + MDX. Hosting target: Cloudflare Pages (deploy only after founder approval).

## How to work with the founder
- Founder does not code. Reply in **short Hinglish**, one topic at a time, recommend one option.
- **Plan first**: sitemap, page outlines, design tokens → founder approves → then build. See `docs/SITE_PLAN.md`.
- No deploy, purchase or account connection without approval. No secrets in the repo.
- Update `docs/PROGRESS.md` and `docs/DECISIONS.md` after every work session; commit and push.

## Brand is not final
- "Obsess" is a working name. Name, domains, contact email, social links, logo paths live **only** in `src/config/site.ts`; read them from there everywhere. Text logo until a real one exists.
- Placeholders `{{BRAND_DOMAIN}}` and `{{CONTACT_EMAIL}}` are filled in config only.

## Truth rules (strict)
- No number (users, speed, savings, competitor prices) without a source. Our own numbers only from the "Benchmarks" list in the prompt/`docs/SITE_PLAN.md`, always with date, sample size, method, and the words "internal eval".
- Anything marked **Coming soon** must be labelled "Coming soon" everywhere.
- No fake testimonials, customer logos, "trusted by", user counts or reviews.
- Competitor facts only from official pages, fetched at build time, with date + link. Unverifiable → "—", never guess.

## Stack and design (locked)
- Astro + TS, static output, Tailwind, MDX, content collections. Lucide icons (inline SVG), self-hosted fonts (Inter via Fontsource). Minimal JS.
- White / near-black / blue accent; light+dark follow system + toggle, no flash, WCAG AA. Mobile-first, 16px gutter, no horizontal scroll. One H1 per page, visible focus, accessible names on icon-only controls.

## SEO + AEO on every page
- Own URL, title ≤ 60, description ≤ 155, canonical, OG/Twitter (generated OG image).
- JSON-LD: Organization + WebSite (site), SoftwareApplication (home/product, no `offers` until pricing is live), FAQPage where FAQ exists, BreadcrumbList on inner pages.
- Answer-first 40–60 word intro; H2s as real questions; comparison data as HTML tables.
- sitemap.xml, robots.txt (allow search + AI answer crawlers), llms.txt, llms-full.txt, helpful 404.
- Lighthouse mobile target ≥ 95 (report real scores).

## Git
- Work on the branch given by the session; commit and push.
