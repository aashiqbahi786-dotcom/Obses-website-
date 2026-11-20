# Obsess — official website

Static marketing site for Obsess (AI app builder). Astro 5 + TypeScript + Tailwind 4 + MDX, content collections, zero client framework.

## Commands
| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server |
| `npm run build` | Build to `dist/` |
| `npm run check:all` | Type check, content truth-lint, contrast, build, links, SEO/AEO rules, HTML validator, JSON-LD validation |
| `npm run lighthouse` | Lighthouse mobile on key pages (needs `npx astro preview` running; set `CHROME_PATH` if Chrome is not found) → `reports/lighthouse.md` |
| `node scripts/fetch-competitor-pages.mjs` | Save competitors' official pages as dated evidence for `/compare` |

## Where things live
- `src/config/site.ts` — brand name, domain, email, logo, social. **Change the brand here only.**
- `src/content/*.yaml` — features, use cases, comparisons, FAQs (each page is data).
- `src/lib/benchmarks.ts` — internal eval results (exact figures, dated).
- `src/lib/compare.ts` — comparison criteria and the Obsess column.
- `src/styles/global.css` — design tokens (light + dark).
- `scripts/` — all checks.

## Truth rules
See `CLAUDE.md`. In short: no unsourced numbers, "Coming soon" always labelled, no fake social proof, competitor facts only from official pages with a date (otherwise "—"). `npm run lint:content` enforces the compare rule.

## Deploy (not done yet — needs founder approval)
Cloudflare Pages: build command `npm run build`, output directory `dist`, Node 22. Security and cache headers are in `public/_headers`.
