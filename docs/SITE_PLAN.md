# Site plan — DRAFT, waiting for founder approval

Status: **plan only, no code yet.** Placeholders: `{{BRAND_DOMAIN}}`, `{{CONTACT_EMAIL}}` live only in `src/config/site.ts`.

## 1. Sitemap (all indexable)

```
/                         Home
/product                  Product
/features/<slug>          20 pages (11 available, 9 coming soon)
/use-cases/<slug>         10 pages
/why-obsess               USP
/compare                  Hub
/compare/obsess-vs-<name> 6 pages (lovable, bolt-new, replit, v0, emergent, dora-ai)
/benchmarks               Internal evals
/pricing                  Planned pricing
/about  /contact  /invite /privacy  /terms
/404
+ sitemap.xml, robots.txt, llms.txt, llms-full.txt
```

**Features — available now:** ai-website-builder · ai-web-app-builder · android-app-builder · brainstorm-and-build-modes · photo-to-app · voice-and-pdf-input · live-preview-version-history-undo · fix-with-ai · publish-and-hosting · pre-publish-security-scan · credit-estimate-before-every-task

**Features — Coming soon (badge everywhere):** app-backends (database + login) · obsess-ai-for-apps · custom-domains · export (zip, GitHub) · ai-agents · visual-editor · launchpad · premium-3d-storytelling-websites · android-apk-play-store-publishing

**Use cases:** restaurant · cafe-tea · eggs-farm-food · car-rental · mobile-shop · retail · creators · students · startup-mvp · agencies

## 2. Page template (every page)
1. Breadcrumb (inner pages) → H1 (one)
2. **Answer block** (40–60 words: what is this / who is it for)
3. Body sections, H2 as real questions, short direct answer under each
4. Related links (internal)
5. FAQ (`<details>`, FAQPage JSON-LD)
6. CTA: **Request an invite** (invite-only Alpha)

## 3. Page outlines

### Home `/`
- H1: "Build a website, web app or Android app by just describing it" (draft)
- Answer block · How it works (3 steps: describe → AI builds + checks → publish) · What you can build (website / web app / Android) · Why it's different (7 USPs, roadmap ones labelled) · Benchmarks strip → `/benchmarks` · Compare teaser → `/compare` · Use-case strip · FAQ · CTA
- FAQ: What is Obsess? · Do I need to know coding? · Can I build in Hindi or Hinglish? · Can I build an Android app without coding? · Do I own what I build? (honest: ownership/export is roadmap) · Is Obsess free? (planned pricing, not live) · Why invite-only?

### Product `/product`
- Builder (chat, Brainstorm/Build) · Inputs (text, photo, voice, PDF) · Live preview + phone frame · Checks + versions + Undo · Publish · Credits · Links to all 20 feature pages
- FAQ: What does Obsess build? · How does the AI check its work? · How are credits used?

### Feature pages `/features/<slug>` (data from a content collection)
- Fields: title, answer block, who it's for, how it works (3–5 bullets), limits (honest), related features, FAQ (2–4), status (`available` | `coming-soon`)
- Coming-soon pages: banner "Coming soon", no claims of availability, no dates unless founder gives one
- Example question H2s: "Can I build an Android app without coding?" · "How does photo to app work?" · "What does Fix with AI do?" · "What does the security scan block?"

### Use cases `/use-cases/<slug>`
- The problem · What Obsess builds · Example prompt (Hinglish + English) · Features used · FAQ
- Example (eggs-farm-food): "Mera eggs business hai, website banado" / "I run an eggs business, build me a website"

### Why Obsess `/why-obsess`
- 7 USPs, each: claim → what it means for you → status (available / roadmap). Honest checks (#4) links to `/benchmarks`.

### Compare `/compare` + `/compare/obsess-vs-<name>`
- HTML table: yes / no / coming soon / — · source link + "checked on <date>" per row · "Where <competitor> is stronger" section · Facts fetched at build time from official pages; unverifiable → "—"
- Build step must fail if a row has no source or date.

### Benchmarks `/benchmarks`
- Method (prompts, model Claude Sonnet 5.5, grader, sample size, date 2026-11-19) · Results (exact figures from founder brief, label "internal eval") · Limits (small samples, one model, short first requests, internal, not independent)
- Figures: Android 30/30 apps, 102/102 requirements, grader validated on 6 broken apps (6/6 caught); preview ≤3 min 10/10 (median 25.6 s); typecheck 10/10; publish 16/16.

### Pricing `/pricing`
- Banner: "Planned pricing; paid plans open with the private beta"
- Table: Free $0 (5 credits/day, ≤30/month, badge) · Starter $9 (36 + 10 bonus) · Pro $19 (76 + 10, custom domain*) · Launch $39 (156 + 10, Launchpad 7 days*, Android builds*) · Scale $59 (236 + 10, Launchpad 14 days*, Android builds*) — *features marked Coming soon where applicable
- Credit model: 1 credit ≈ $0.25 value; task min 0.5, rounded up in 0.5 steps, max 60
- No `offers` JSON-LD until pricing is live
- FAQ: What is a credit? · How much will my task cost? · What happens when credits end?

### About / Contact / Invite / Privacy / Terms
- About: mission, why Obsess, no fake team claims (founder to supply) · Contact: `{{CONTACT_EMAIL}}` · Invite: form → provider TBD, mailto fallback · Privacy/Terms: "draft, to be reviewed by a lawyer"

## 4. Design tokens (proposal; contrast verified at build)
| Token | Light | Dark |
|---|---|---|
| bg | #FFFFFF | #0B0F17 |
| surface | #F6F8FB | #121826 |
| text | #0B0F17 | #F3F6FB |
| muted | #4B5565 | #A3AEC2 |
| border | #E3E8F0 | #232C3F |
| accent (blue) | #2563EB | #5B8DEF |
| accent-contrast | #FFFFFF | #0B0F17 |

- Radius: 8 / 12 / 16 px · Spacing: 4-pt scale · Gutter 16 px on phone
- Type: Inter (self-hosted); scale 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56, line-height 1.5 body, 1.15 headings
- Components: Button, Card, SectionHeader, ComparisonTable, FAQ, Badge (Coming soon), Breadcrumb, ThemeToggle

## 5. Tech structure
```
src/config/site.ts        name, domain, email, social, logo (single source)
src/content/{features,use-cases,compare,faq}/
src/components/ src/layouts/ src/pages/
scripts/                  fetch-competitor-facts, check-links, validate-jsonld
public/                   robots.txt (generated), llms.txt (generated)
```

## 6. Checks before "done"
`astro check` · link checker · HTML validator on built pages · JSON-LD validation · Lighthouse mobile (report real scores) · contrast check both themes · "Coming soon" lint (no available-claim on coming-soon pages) · compare-source lint

## 7. Phase 2 (not built now)
Hindi pages with `hreflang`; real logo; real invite provider; custom OG art.

## 8. Needs founder
Brand name final? · domain · contact email · invite form provider · Cloudflare account · legal review · real logo · About-page facts
