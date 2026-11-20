# Progress

_Last updated: 2026-11-20_

## Done
- Repo created and attached (2026-11-20). Working rules in `CLAUDE.md`.
- `docs/SITE_PLAN.md` approved by founder (2026-11-20).
- Site built: Astro 5.18 + TS + Tailwind 4 + MDX, static output, 50 HTML pages:
  - Home, Product, Why Obsess, Benchmarks, Pricing (planned, labelled), About, Contact, Invite, Privacy (draft), Terms (draft), 404
  - `/features` index + 20 feature pages (11 available, 9 Coming soon with badge + banner)
  - `/use-cases` index + 10 use-case pages (Hinglish + English example prompts)
  - `/compare` index + 6 competitor pages (all competitor cells "—", see Pending)
- SEO/AEO: per-page title/description/canonical/OG/Twitter, generated OG image per page (`/og/*.png`), JSON-LD (Organization, WebSite, SoftwareApplication without offers, FAQPage, BreadcrumbList), answer-first block (40–60 words, enforced), question H2s, `sitemap-index.xml`, `robots.txt` (search + AI crawlers allowed), `llms.txt`, `llms-full.txt`.
- Design: white / near-black / blue tokens, light + dark (system + toggle, no flash), mobile-first, Lucide icons inline, Inter self-hosted.
- Cloudflare Pages prep: `public/_headers` (security + cache). **Not deployed.**

## Checks (all passing, 2026-11-20)
| Check | Result |
|---|---|
| `astro check` | 0 errors, 0 warnings |
| Content truth-lint (`lint:content`) | pass |
| Contrast AA, both themes (`check:contrast`) | pass |
| Internal links (`check:links`) | pass (2,615 links) |
| SEO/AEO rules (`check:seo`) | pass (all pages) |
| HTML validator (`html-validate`) | pass |
| JSON-LD validation (`check:jsonld`) | pass |
| Lighthouse mobile, 9 key pages | 100 / 100 / 100 / 100 on all 9 (local preview; see `reports/lighthouse.md`) |
| Phone (390 px) + desktop, light + dark | no horizontal scroll; screenshots reviewed |

## 5-product restructure (2026-11-20)
- New `products` collection + 5 product pages + `/products` hub; home, nav, footer, FAQ, USPs, compare table, llms.txt, OG images updated.
- 51 pages + 5 redirect stubs. All checks pass. Lighthouse mobile 100/100/100/100 on 9 key pages incl. the 3 new product pages (local preview).

## Live (2026-11-20)
- Deployed on Cloudflare Workers (static assets) from `main`: https://obses-website.aashiqbahi786.workers.dev
- Verified live: all product/feature/compare pages 200, old feature URL 301 → product page, 404 page, robots/llms/sitemap/OG/favicon served, security headers present.
- Lighthouse mobile on the live URL: 100 / 100 / 100 / 100 on 9 key pages (`reports/lighthouse.md`).

## Pending
- `main` branch created (2026-11-20) for Cloudflare Pages. Founder chose to keep all 5 products "available" (incl. 3D and Agent builder).
- **Competitor facts (done 2026-11-20):** official pages of Lovable, Bolt.new, Replit, v0 and Emergent fetched and saved as evidence in `reports/competitors/<id>/2026-11-20/`; 32 table cells and 10 "where they are stronger" notes filled, each with source + date. Unclear facts stay "—". **Dora AI:** dora.run unreachable, all cells "—". Refresh with `NODE_USE_ENV_PROXY=1 node scripts/fetch-competitor-pages.mjs`.
- Hindi pages with `hreflang` (phase 2, planned only).
- Real invite form provider (today: opens the visitor's email app).
- Real domain: canonical URLs, sitemap and OG links still point to the placeholder `obsess.example`; set the domain in `src/config/site.ts` before submitting to Google.

## Testing pending
- Real-device check on an Android phone (founder).
- Lighthouse in dark theme (contrast is checked by script, not by Lighthouse).

## Needs founder
- Final brand name? (change only `src/config/site.ts`)
- `{{BRAND_DOMAIN}}` — today placeholder `obsess.example`
- `{{CONTACT_EMAIL}}` — today placeholder `hello@obsess.example`
- Invite form provider · Cloudflare account · legal review of Privacy/Terms · real logo · About-page facts (team, location) · social links
