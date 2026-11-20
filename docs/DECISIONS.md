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
