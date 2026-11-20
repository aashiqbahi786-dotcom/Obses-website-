# Decisions (website)

- Separate repo from the Obsess platform repo (2026-11-20).
- Stack locked: Astro + TypeScript, static, Tailwind, MDX, content collections, Lucide, self-hosted Inter. Hosting target Cloudflare Pages (deploy only after approval).
- Design: white / near-black / blue; light+dark (system + toggle); mobile-first.
- SEO + AEO on every page: answer-first block, question H2s, JSON-LD, llms.txt, AI crawlers allowed.
- Brand name/domain/email/logo only in `src/config/site.ts` (name not final).
- Truth rules: no unsourced numbers, "Coming soon" labelled, no fake social proof, competitor facts sourced + dated or "—".
- Process: plan first → founder approval → build.
- Pages: Home, Product, 20 features (9 coming soon), 10 use cases, Why Obsess, Compare (+6), Benchmarks, Pricing (planned, labelled), About, Contact, Invite, Privacy, Terms.
- Site plan approved by founder (2026-11-20).
- Added `/features` and `/use-cases` index pages so breadcrumbs have a real parent page.
- Astro 5 (not 7): stable, well-known API; upgrade later if needed.
- Placeholders until founder decides: domain `obsess.example` (reserved TLD), email `hello@obsess.example`.
- Invite form opens the visitor's email app until a form provider is chosen.
- Competitor cells stay "—" until verified from official pages (sites blocked from build environment on 2026-11-20).
- URLs without trailing slash (`/pricing`), built as `.html` files for Cloudflare Pages.

## 5 products (founder, 2026-11-20)
- Site is organised around **5 products**: Website builder, Web app builder, Mobile app builder (Android; iOS later), AI Agent builder, 3D scroll animation website builder.
- Product pages at top-level URLs: `/website-builder`, `/web-app-builder`, `/mobile-app-builder`, `/ai-agent-builder`, `/3d-website-builder`; hub at `/products`. Nav: Products · Features · Use cases · Compare · Pricing. `/product` is now "How it works".
- Old feature URLs 301-redirect to product pages (`public/_redirects` + Astro redirects).
- **Founder decision: all 5 products shown as available, not "Coming soon".** Risk raised by Claude: the platform repo (PROGRESS, 2026-11-20) shows Agent builder as a "Soon" placeholder and the 3D engine as "decided, not built". **Deploy gate:** before the site goes public, founder confirms both are live in the app; otherwise set `status: coming-soon` in `src/content/products.yaml` (one line each).
- Agent builder and 3D page content comes from the founder-locked specs in the platform repo's `DECISIONS.md` (no invented numbers).
- Other features (backends, custom domains, export, visual editor, Launchpad, APK/Play Store, Obsess AI for apps) stay "Coming soon".

## Go-live prep (founder, 2026-11-20)
- `main` created from the session branch; Cloudflare Pages production branch = `main`.
- Founder: 3D website builder (and all 5 products) stay "available" on the site; other details to be changed later by the founder.

## Competitor facts (2026-11-20)
- Filled only from text saved from official pages (`reports/competitors/`), with source + date per cell. "Mobile apps" claims are noted as "Android not named" where the page does not say Android.
- Evidence files are kept in the repo so every claim can be checked later.

## No "Coming soon" + launch & grow (founder, 2026-11-20)
- Founder: the website is built ahead of launch and will go public together with the product, so **every feature is shown as available** (no "Coming soon" anywhere). The `status` field and badge remain in code in case a feature must be flagged later.
- **Pre-launch switch:** `site.prelaunch = true` in `src/config/site.ts` → every page `noindex` and robots.txt `Disallow: /`. Set to `false` on launch day together with the real domain. (Claude's recommendation, since the workers.dev URL is already public.)
- Added: Launchpad (showcase, reviews and feedback, early users for MVP testing), Free ads promotion (promotion coupon on paid plans), Smart code graph feature page; home sections "How do I get my first users?" and "Why does Obsess use fewer tokens?"; USP #8.
- **No token-saving % on the site.** Founder asked for "70%"; the platform DECISIONS rule is "Graph ON/OFF savings numbers before any % is used anywhere", and no graph ON/OFF benchmark exists yet. The only measured cost number used is prompt caching −37% per task (internal A/B, 2026-11-18, 3 tasks per mode), on the Benchmarks page with its limits.
- Pricing shown as current (no "planned" banner). Paid plans: ad-free + promotion coupon; Pro+ custom domain; Launch/Scale Launchpad days + Android builds (from platform DECISIONS/ADS_LAUNCHPAD).
- Design: hero builder mockup, gradient icon tiles, dark "code graph" band.

## Temporary address protection (2026-11-20)
- Until the real domain is live: `X-Robots-Tag: noindex` on every response (appended to `dist/_headers` at build when `site.prelaunch`), plus the noindex meta. robots.txt **allows** crawling in pre-launch (a `Disallow` would hide the noindex from search engines).
- Canonical, sitemap, OG and JSON-LD URLs come only from `site.domain`; they switch to the real domain with that one change.
