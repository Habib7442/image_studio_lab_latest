# Folio — Product Requirements Document

**Version:** 0.1
**Date:** May 2026
**Status:** Founding spec — for the solo founder or two-person team building this
**Owner:** You

---

## 1. TL;DR

**Folio is the AI-native publishing platform for marketing teams.** Turn a brief, a PDF, or a live Shopify catalog into a polished, interactive, shoppable web publication in minutes, not weeks.

**Why now.** Three forces converged in 2024–2026:

1. **The Issuu trauma.** October 2024's surprise pricing restructure pushed customers from $31/mo to $269/mo overnight — 1,395+ Trustpilot complaints. The category's largest incumbent burned its loyal base. Once-in-a-decade switching moment.
2. **The AI vacuum.** Only Canva has shipped meaningful AI into publishing. Flipsnack, Issuu, FlippingBook, Publuu are dormant. A 12-month window exists before incumbents catch up.
3. **The creation–distribution split.** Canva and Marq own creation. FlippingBook and Publuu own distribution. Nobody owns both ends. Marketing teams round-trip three tools per catalog. The collapse of that workflow is the prize.

**Who it's for.** Maya — Marketing Ops Lead at a 50–200 person B2B/B2C company shipping 4–8 catalogs, brochures, and lookbooks a year with a 2–5 person team. Uses HubSpot. Frustrated with PDF round-trips and slow approvals.

**The bet.** Five wedges, each defensible for 18 months:

1. **AI-native authoring** — brief → polished draft in 90 seconds
2. **Real HTML viewer** — SEO-indexable, sub-1s LCP, native mobile
3. **Shoppable + lead-gen unified** — SKU hotspots + CRM-synced forms with conversion attribution
4. **Flexible team pricing** — $29/seat, no cliff, 24-month price lock
5. **Real approval workflows + AI-enforced brand kits**

**MVP timeline.** Six months with a small team. Twelve to eighteen months solo. The "Ruthless MVP" section below shows the smallest cut that still beats Flipsnack on Maya's primary workflow.

---

## 2. The Problem

### 2.1 The category is stale

The digital flipbook category has shipped roughly the same product since 2014: a tool that takes a PDF, wraps it in a canvas-rendered page-flip viewer, and adds basic interactive overlays. Every major player — Flipsnack, Issuu, FlippingBook, Publuu, Heyzine — operates within this paradigm. The product surfaces have grown shaggy with bolt-on features (forms, analytics, integrations) but the architecture and UX have barely moved.

Marketing teams who use these tools share a consistent set of complaints, sourced from G2, Capterra, Trustpilot, and SoftwareFinder reviews:

- **PDF round-trips.** Every publication starts in InDesign or Canva, exports to PDF, uploads to the flipbook tool, and gets interactivity bolted on by hand. When the design changes, the cycle restarts.
- **Conversion reliability.** Reviews consistently mention PDFs converting with blank pages, broken InDesign interactivity, and image quality loss.
- **Vanity analytics.** Users see view counts but can't attribute the publication to revenue or pipeline.
- **Mobile UX problems.** Canvas-rendered viewers feel janky on mobile. FlippingBook gets specifically criticized for this. Heyzine has documented Safari bugs.
- **SEO blackholes.** Canvas-rendered content is invisible to Google. Marketing teams are publishing content that doesn't show up in organic search.
- **Pricing whiplash.** Issuu's October 2024 restructure is the loudest example; Flipsnack's $85 → $258 solo-to-team cliff is a quieter daily friction; publication and viewer caps generate complaints across every tool.

### 2.2 The window

Three things have changed at once.

**AI capabilities crossed a threshold.** GPT-4 vision and Claude can read a PDF, identify pages, extract products, and generate on-brand layouts and microcopy. This was not realistic in 2022. It is now.

**Web standards caught up.** Modern browsers render CSS 3D transforms, complex layouts, and large image sets at 60fps on mid-tier devices. The "we need a canvas viewer because the web can't do flipbooks" argument is no longer true.

**The market wants out.** Post-Issuu pricing fiasco, the category's customer base has a fresh, painful memory of being burned. They are open to switching. New entrants who lead with transparent pricing and a price-lock promise have an outsized advantage.

The window will not stay open. Canva is the most likely fast follower — they already own creation; adding distribution closes the loop. We have 12–18 months before category dynamics normalize.

---

## 3. Target user

### 3.1 Persona: Maya Chen

| Attribute | Detail |
|---|---|
| **Title** | Marketing Operations Lead |
| **Company** | 50–200 person B2B SaaS, DTC e-commerce, or B2B services firm |
| **Reports to** | VP Marketing or CMO |
| **Team** | Manages 2–5 marketers (content, demand gen, brand) + freelance designer |
| **Stack** | HubSpot (or Salesforce + Marketo), Shopify or Salesforce, Notion, Figma, Slack, Google Analytics 4 |
| **Calendar** | 4–8 flagship publications per year: spring/fall catalogs, quarterly brochures, annual reports, campaign-specific lookbooks |
| **Top KPI** | Pipeline sourced from gated content; catalog-driven conversion rate |
| **Budget authority** | $5K–$25K/year SaaS tools without VP approval; over $25K needs sign-off |
| **Top frustration** | "Every catalog is a two-week production cycle ending in a PDF I pray the flipbook tool doesn't mangle" |

### 3.2 A day in the life (production week)

- **Monday:** Brief the freelance designer in Figma. Pull product list from Shopify into a Google Sheet. Send brand kit PDF.
- **Tuesday–Wednesday:** Designer drafts InDesign or Figma file. Maya reviews. Round of comments.
- **Thursday:** Designer exports PDF v3. Maya uploads to Flipsnack. Spends two hours adding interactive overlays, fixing layout breaks from PDF conversion, configuring the lead form.
- **Friday:** Sends to VP for review. VP requests two H1 changes. Designer can't get to it until Monday.
- **Following Monday:** Cycle restarts.
- **Two weeks later:** Publication ships. Maya pulls Flipsnack analytics into a slide for the marketing review. Page views look fine; no one in the room knows whether the catalog drove revenue.

### 3.3 Jobs to be done

**Primary JTBD:** "When a marketing campaign needs a flagship catalog or brochure, I want to ship a polished, on-brand, conversion-driving asset in days — not weeks — so I hit the campaign date without burning my team out or compromising on quality."

**Supporting JTBDs:**

- "When I'm reviewing a draft, I want to know what changed since I last approved it, so I'm not re-reading the entire document."
- "When the campaign is live, I want to know if it drove pipeline — not just page views — so I can defend the budget in the next quarterly review."
- "When the brand kit changes, I want every active publication to honor the new tokens without manual rework."
- "When a product goes out of stock mid-campaign, I want the catalog to reflect that automatically without re-publishing."

### 3.4 Anti-personas (do not optimize for)

- Magazine publishers running subscription paywalls (Issuu's core)
- Individual freelancers producing one-off portfolios (Canva does this fine)
- Print-focused designers (Adobe owns this)
- Enterprise procurement with 6-month sales cycles (Year 3+ problem)

---

## 4. Vision & Positioning

### 4.1 Product in one sentence

**Folio is the AI-native publishing platform that turns any brief, PDF, or product catalog into a polished, interactive, shoppable web asset — in minutes, not weeks.**

### 4.2 What we are NOT

- Not a generic design tool (Canva does this)
- Not a magazine subscription platform (Issuu does this)
- Not a PDF flipbook wrapper (Flipsnack, FlippingBook do this)
- Not an enterprise CMS (Contentful, Sanity do this)
- Not for freelance portfolios or magazine publishers

### 4.3 What we ARE

- The fastest path from creative brief to live, interactive publication in the category
- A real HTML web experience Google can crawl and mobile can fly through
- A conversion-aware tool: shoppable hotspots + CRM-attributed lead capture
- Built for in-house marketing teams of 2–10 — the segment Flipsnack abandons

### 4.4 Three-year vision

By 2029, Folio is the default tool a marketing team reaches for when they need to publish anything richer than a blog post and longer than a landing page. The category has shifted from "interactive PDF wrappers" to "AI-native web publishing for marketing teams." Folio defined and won the new category.

---

## 5. Differentiation Wedges

Five fights we pick. Each is defensible for 18 months if we ship it well.

### Wedge 1: AI-native authoring

**Claim:** Brief in, polished draft in 90 seconds. Brand-aware, catalog-aware, on-brand from the first generation.

**Why it wins:** Flipsnack, Issuu, FlippingBook ship zero meaningful AI. Issuu has a patent pending. Canva is faster than us at general AI but doesn't do flipbook distribution. We split the difference.

**Attack risk:** Canva ships flipbook distribution. Mitigated by going deeper on the marketing-team workflow (CRM, attribution, approvals) where Canva will not invest.

### Wedge 2: Real HTML viewer

**Claim:** Server-rendered HTML, sub-1s LCP, Google indexes every page, screen readers work, mobile is native.

**Why it wins:** Every incumbent uses canvas. Canvas is fast for flip animation but invisible to Google, painful on screen readers, and inconsistent on mobile. We pay a one-time technical cost (CSS 3D + DOM rendering) for a permanent moat.

**Attack risk:** An incumbent rebuilds their viewer in HTML. Multi-year project for them; we have years of head start if we ship first.

### Wedge 3: Shoppable + lead-gen, unified

**Claim:** SKU hotspots from Shopify. Lead forms native to HubSpot/Salesforce/Marketo. Per-element conversion attribution to pipeline.

**Why it wins:** Publuu has shoppable but no lead-gen depth. Flipsnack has forms but no real CRM sync. Neither attributes back to pipeline. We're the only player that closes the loop.

**Attack risk:** Publuu adds lead-gen, Flipsnack adds CRM sync. Both are plausible. Our defense is the AI editor that generates these elements automatically — not just supports them.

### Wedge 4: Transparent pricing, no cliff, 24-month lock

**Claim:** Per-seat from $29. No solo→team cliff like Flipsnack's $85→$258. 24-month price lock in writing for 2026 signups.

**Why it wins:** Post-Issuu, the market is allergic to surprise hikes. A formal price-lock promise is differentiation by trust, not feature.

**Attack risk:** An incumbent matches the price-lock policy. Easy to copy on paper, hard to commit to when their existing revenue is built on the opposite model.

### Wedge 5: Real approvals + AI-enforced brand kits

**Claim:** Multi-stakeholder approval chains. Version compare. Brand kit tokens enforced at the AI layer so the editor literally cannot generate off-brand output.

**Why it wins:** Flipsnack collaboration is "share a link and email comments." Marq has approvals but no AI. Brand kits exist as a checkbox feature everywhere — nobody enforces them at generation time. We do.

**Attack risk:** Mid-effort to match. The AI-enforcement layer is the hard part; the approval workflow is table stakes that we still need to build.

---

## 6. Success Metrics

### 6.1 North Star

**Weekly Active Publications (WAP)** — Folio-published documents that received at least one viewer session in the past 7 days.

This metric captures both creation success (the team shipped something) and viewer success (it actually got distributed). It is harder to game than signups or document count.

### 6.2 MVP Definition of Done

The MVP ships when these are all true:

- [ ] A marketing user can sign up, attach a brand kit, write a brief, and receive a usable first-draft publication in under 5 minutes (measured end-to-end)
- [ ] The published viewer scores Lighthouse Performance ≥ 90 and SEO = 100 on a 5-page publication
- [ ] Shoppable hotspots can be added to images and bound to live Shopify SKUs
- [ ] Lead forms sync verified submissions to HubSpot within 30 seconds
- [ ] At least 10 design-partner customers have published a real campaign asset (not a test) using Folio
- [ ] Average time-to-publish for design partners is under 4 hours (vs ~2 weeks on Flipsnack)

### 6.3 Leading Indicators (M0–M6 / M0–M12 solo)

- **Sign-up to first publish:** % of signups that publish a document ≥ 30%
- **First-draft useful rate:** % of AI-generated first drafts that are kept (≥ 1 element retained) ≥ 75%
- **Time-to-first-publish (median):** < 4 hours
- **Brand kit attach rate:** % of teams that attach a brand kit in week 1 ≥ 80%
- **Viewer Lighthouse Perf p50:** ≥ 90

### 6.4 Lagging Indicators (M6–M12)

- **WAP growth:** 25% MoM
- **Net revenue retention:** ≥ 110%
- **Catalog-to-pipeline:** Design partners report ≥ $10K attributed pipeline per published catalog

### 6.5 Anti-goals

What we will NOT optimize for:

- Total signups (vanity)
- Free-tier MAU (cost without value)
- Number of templates available (race-to-the-bottom)
- Number of integrations (count, not depth)
- Marketing site traffic (until product works)

---

## 7. User Stories

Core workflows, framed as JTBD-style stories. Each maps to features in §8.

### Authoring

- **US-01:** As Maya, I want to write a one-paragraph brief and attach my brand kit, so that the AI generates a usable first draft in 90 seconds.
- **US-02:** As Maya, I want to upload an existing PDF catalog, so that Folio rebuilds it as native editable elements (not flattened images) ready for interactivity.
- **US-03:** As Maya, I want my brand colors, fonts, and voice tokens to be enforced at the AI layer, so that AI-generated content and human edits cannot accidentally produce off-brand output.

### Interactivity

- **US-04:** As Maya, I want to tag a product image with a shoppable hotspot bound to my Shopify SKU, so that visitors see live pricing and can add to cart without leaving the page.
- **US-05:** As Maya, I want to drop a lead-gen form into a page and have submissions flow into HubSpot, so that I don't have to wire up Zapier middleware.
- **US-06:** As Maya, I want to embed a behind-the-scenes video on a story page, so that engagement-time goes up without sending visitors to YouTube.

### Distribution

- **US-07:** As a website visitor on mobile, I want page flips to feel native and pages to load instantly, so that I don't bounce.
- **US-08:** As a search engine, I want to crawl every page of a publication as real HTML, so that the catalog ranks for relevant keywords.

### Collaboration

- **US-09:** As Maya's VP, I want to see exactly what changed in a publication since I last approved it, so that I don't re-read 30 pages.
- **US-10:** As Maya, I want to route a draft through a designer → marketing → legal approval chain with audit trail, so that I have a paper trail when something goes wrong post-publish.

### Measurement

- **US-11:** As Maya, I want to see which elements drove form submissions and shoppable clicks, so that I know where to invest design effort next time.
- **US-12:** As Maya's CMO, I want to see attributed pipeline from each publication in HubSpot, so that I can defend the marketing budget.

---

## 8. MVP Feature Spec

**Target:** M0–M6 with a small team. M0–M12 solo. See "Ruthless MVP" callout at the end of this section for the smallest viable cut.

Each feature has: **what it does**, **why it's MVP**, **acceptance criteria**, and where relevant, an **"if you only build one thing"** prioritization note.

### 8.1 AI Brief Input → First Draft `[CRITICAL]`

**What:** A natural-language prompt input ("3-page spring lookbook for our candle line, brand kit attached") plus optional file attachments (brand-kit PDF, reference imagery, product CSV). Returns a usable first-draft publication.

**Why MVP:** This is the wedge. Without it, we are a slightly nicer Flipsnack.

**Acceptance criteria:**
- [ ] Brief input accepts up to 1,000 characters of prompt + file attachments
- [ ] First draft generated within 120 seconds (target 90s) on a 3-page document
- [ ] Generated draft honors uploaded brand kit (color tokens, fonts, voice)
- [ ] Generated draft includes editable text elements, image placeholders or selected stock images, and hotspot suggestions
- [ ] User can regenerate any single page without regenerating the whole document
- [ ] Brief and generation history visible in the document's "Versions" panel

**If you only build one thing this quarter:** This. Everything else can be approximated. This cannot.

### 8.2 PDF Auto-Import `[CRITICAL]`

**What:** Drop a PDF. Folio's AI extracts text, images, and structural hierarchy. Rebuilds as native editable elements (not flattened images) and suggests interactive enhancements per page.

**Why MVP:** Every prospect has an existing catalog as PDF. Without import, switching cost is high.

**Acceptance criteria:**
- [ ] Accepts PDFs up to 50MB and 100 pages
- [ ] Text extraction preserves headings, body text, and lists as distinct elements
- [ ] Image extraction preserves at original resolution where possible, downsampled to 1600px wide otherwise
- [ ] Multi-column layouts are detected and preserved
- [ ] Per-page hotspot suggestions appear in the editor sidebar after import

### 8.3 Brand Kit Enforcement `[HIGH]`

**What:** Upload brand guidelines as PDF, or define tokens directly: logo, color palette, typography (heading/body fonts + weights), voice guidelines. AI and manual edits both conform. Violations are flagged before publish.

**Why MVP:** The AI's first draft is only usable if it's on-brand. Brand kit is the difference between "AI slop" and "shippable draft."

**Acceptance criteria:**
- [ ] Brand kit accepts: logo (PNG/SVG), 3–8 color tokens with semantic names, 1–3 type tokens with Google Fonts mapping, voice description (free text up to 500 chars)
- [ ] AI generation cannot output text in fonts outside the kit
- [ ] AI generation cannot output colors outside a 5% delta from defined tokens
- [ ] Pre-publish validator flags any element violating brand tokens
- [ ] Reviewers can be locked out of changing brand-token-bound properties

### 8.4 Direct Manipulation Canvas Editor `[HIGH]`

**What:** Drag-drop, snap-to-grid, multi-select, keyboard shortcuts, undo/redo, copy-paste. The "edit the AI draft" surface.

**Why MVP:** AI draft will not be perfect. Without a real editor, users can't refine and we never beat Canva.

**Acceptance criteria:**
- [ ] Sub-50ms interaction latency on a 64-page document
- [ ] Standard shortcuts: ⌘C/V/X, ⌘Z/Y, arrow nudge, shift-arrow large nudge, ⌘D duplicate, ⌘G group
- [ ] Multi-select with marquee and shift-click
- [ ] Snap-to-grid and snap-to-element guides
- [ ] Visual property panel for selected element(s): position, size, color, font, etc.

### 8.5 Shoppable Hotspots `[CRITICAL]`

**What:** Tap a product image, see price/variants/add-to-cart inline. Pulls live from Shopify (or CSV at minimum). AI auto-tags products from PDF import by matching product names against the connected store.

**Why MVP:** The conversion play. Beats Publuu (shoppable but shallow) and Flipsnack (enterprise-gated).

**Acceptance criteria:**
- [ ] Shopify OAuth integration; pulls products with: name, price, variants, inventory, primary image
- [ ] CSV import as fallback (columns: sku, name, price, image_url, url)
- [ ] Hotspot placement: tap a position on an image, search/bind product
- [ ] AI auto-binding: on PDF import, attempts to match product names; flags low-confidence matches for manual review
- [ ] Viewer-side: tap hotspot → product card overlay with add-to-cart that links to Shopify checkout
- [ ] Stale data: stock and price update on viewer load (no manual republish needed)

**If you only build one thing this quarter:** Shopify integration. Skip CSV until V1 unless your design partners require it.

### 8.6 Lead-gen Forms `[CRITICAL]`

**What:** Drag-drop form builder. Native sync to HubSpot (MVP); Salesforce + Marketo in V1. Submissions create or update contacts with attribution.

**Why MVP:** The other half of the conversion play. Lead capture is how marketing teams defend the publication budget.

**Acceptance criteria:**
- [ ] Form builder: name, email, phone, dropdown, multi-select, text, consent checkbox
- [ ] Native HubSpot integration: OAuth, contact create/update, lead source attribution, custom property mapping
- [ ] Submission flow: client-side validation, optimistic UI, error states, success state with configurable thank-you message
- [ ] Submissions appear in HubSpot within 30s of form submission
- [ ] Per-form analytics: views, starts, submits, conversion rate

### 8.7 Embedded Video & Audio `[MEDIUM]`

**What:** YouTube, Vimeo, MP4. Inline playback without leaving the page. Watch-completion analytics.

**Why MVP:** Critical for editorial/story pages in catalogs and brochures. Low effort to implement once the viewer is built.

**Acceptance criteria:**
- [ ] YouTube and Vimeo via paste-URL embed
- [ ] MP4 upload up to 200MB, transcoded for streaming
- [ ] Watch-completion tracking: % completed per session
- [ ] Lazy-load (don't preload heavy video on page mount)

### 8.8 Real HTML Viewer `[CRITICAL]`

**What:** Server-rendered HTML, sub-1s LCP, Google indexes every page, screen readers work, mobile gestures are native. Page-flip animation as CSS 3D layered over real DOM content.

**Why MVP:** The performance/SEO wedge. Without this, "Folio is just an AI Flipsnack." With it, switching is irreversible.

**Acceptance criteria:**
- [ ] Every published page is server-rendered HTML with semantic markup, proper heading hierarchy, alt text on images
- [ ] Lighthouse Performance ≥ 90 on a 5-page publication (median p50)
- [ ] Lighthouse SEO = 100, Lighthouse Accessibility ≥ 95
- [ ] LCP < 1.0s on Fast 3G simulated connection
- [ ] Mobile: native swipe gestures, pinch-zoom, no canvas re-render lag
- [ ] Page-flip transition runs at 60fps on a 2020 mid-tier device
- [ ] Open Graph and Twitter Card meta per page
- [ ] Auto-generated sitemap.xml

**If you only build one thing this quarter:** A working hybrid renderer (DOM for content, canvas overlay for flip animation only). This is the technical bet that defines the product.

### 8.9 Analytics — Page + Element `[HIGH]`

**What:** Per-page: views, unique visitors, average time, drop-off. Per-element: clicks, hovers, dwell time on hotspots and forms. CRM-attributed conversions tied to lead form submissions and hotspot clicks.

**Why MVP:** This is the "defend the budget" story. Without it, the marketing review goes the same as it did with Flipsnack.

**Acceptance criteria:**
- [ ] Per-page metrics: views, unique visitors (cookied), average time-on-page, drop-off chart
- [ ] Per-element metrics: clicks, hovers (with dwell time), conversion (form submit / hotspot click)
- [ ] Heatmap overlay viewable in editor (clicks + dwell)
- [ ] HubSpot conversion attribution: form submissions create contacts with `lead_source = "Folio: {publication_name}"`
- [ ] Native UTM handling on all share links
- [ ] Optional Google Analytics 4 dual-pipe for teams who want events in GA4

### 8.10 Multi-editor Presence + Comments `[MEDIUM, defer for solo]`

**What:** Figma-style real-time cursors. Comments anchored to specific page elements. Resolve, reply, @mention.

**Why MVP (team build):** Marketing teams of 2–5 actually use this. Without it, they go to Google Docs to comment, then back to Folio.

**Why defer (solo):** Real-time CRDT collab is a 3-month spike. Solo, start with comments-only (no live cursors). Add CRDTs in V1.

**Acceptance criteria (full):**
- [ ] Yjs-based CRDT layer for document state
- [ ] Live cursor + selection of other users
- [ ] Element-anchored comments with thread + resolve
- [ ] @mention with email notification
- [ ] Email digest of unresolved comments daily

### 8.11 Approval Workflows + Version Compare `[HIGH]`

**What:** Configurable approval chains (designer → marketing → legal). Approvers see "what changed since last review." Audit log preserved.

**Why MVP:** Maya's biggest workflow pain. Currently solved via Slack chains and screenshots.

**Acceptance criteria:**
- [ ] Define approval chain per publication (1–5 stages)
- [ ] Approver receives email notification with link to review
- [ ] "Diff view" showing what changed since their last approval (text edits, image swaps, layout moves)
- [ ] Approve / request changes / reject actions with comment
- [ ] Audit log: every approval action with timestamp, user, version hash

**If you only build one thing this quarter:** Version compare. Approval routing can be approximated with shared links and emails until V1.

### 8.12 Self-serve Pricing + 24-month Lock `[HIGH]`

**What:** Three published tiers (Solo $19, Team $29/seat, Business $59/seat). Stripe billing. 24-month price lock for 2026 signups in writing.

**Why MVP:** Half the wedge. Sales requires the price-lock promise to be a real thing, not vaporware.

**Acceptance criteria:**
- [ ] Self-serve sign-up and tier upgrade flow
- [ ] Stripe-backed subscription with monthly + annual billing
- [ ] Per-seat metering for Team and Business tiers
- [ ] 24-month price-lock language in ToS, welcome email, and pricing page
- [ ] Customer's effective rate stored at signup; honored in renewals for 24 months

### 8.13 Custom Domain — Basic `[MEDIUM]`

**What:** `publish.yourbrand.com` with automatic SSL. Team plan and up.

**Acceptance criteria:**
- [ ] CNAME setup flow with verification
- [ ] Automatic SSL via Let's Encrypt or Cloudflare
- [ ] Edge-cached delivery from custom domain

### Ruthless MVP — if you're 1 person, 6 months

Cut the MVP to:

1. **AI Brief → First Draft** (8.1)
2. **PDF Auto-Import** (8.2)
3. **Brand Kit Enforcement** (8.3)
4. **Direct Manipulation Editor** (8.4)
5. **Shoppable Hotspots** (8.5) — Shopify only, no CSV
6. **HubSpot Lead Forms** (8.6) — HubSpot only
7. **Real HTML Viewer** (8.8)
8. **Page + Element Analytics** (8.9) — no GA4 dual-pipe
9. **Self-serve Pricing + Stripe** (8.12)

Defer to V1: multi-editor presence (8.10), approval workflows (8.11), embedded video (8.7), custom domain (8.13), Salesforce/Marketo (8.6 extensions).

This gets you to a real product that beats Flipsnack on Maya's primary workflow. Everything in V1 is "we have a real product, now make the team workflow nice."

---

## 9. V1 Feature Spec (M6–M12)

V1 ships once MVP has 10+ design partners and clear PMF signal (≥ 75% first-draft-useful rate, ≥ 30% signup-to-publish, ≥ 110% NRR after 60 days).

### 9.1 Live Product Data Binding
Drop a Shopify collection or BigCommerce category into a page. Layout auto-tiles. Stays in sync post-publish — stock and price updates without manual republish.

### 9.2 3D Product Viewer
Drop a GLB or USDZ file. 360° spin in-page, AR mode on mobile ("View in your room"). Essential for furniture, home, luxury catalogs.

### 9.3 AI Engagement Summaries
Weekly digest: "Page 12's product spotlight had 3× the dwell time. Page 17's video has a 78% completion rate. The lead form converts 14% — top quartile." Plain English, no data analyst required.

### 9.4 A/B Testing
Publish two variants of a page or CTA. Route traffic 50/50. Declare a winner once significance reached.

### 9.5 Multi-editor Presence (if deferred from MVP)
Yjs CRDT collab. Live cursors, presence indicators. The "Figma feel" for publishing.

### 9.6 Approval Workflows (if deferred)
Full routing with audit log and "show me what changed" diffs.

### 9.7 Custom Domain + Offline PWA
`publish.yourbrand.com` + offline-capable installable app for field sales reps.

### 9.8 Figma + InDesign Import
One-way ingest of Figma frames and IDML files as native Folio pages.

### 9.9 CRM + Analytics Expansion
Salesforce, Marketo, Pardot, BigCommerce native integrations. GA4 dual-pipe, Segment, Mixpanel event pipe.

### 9.10 Slack / Teams Integration
New comment, approval request, or publish event posts to a configured channel.

---

## 10. V2 Feature Spec (M12–M18)

V2 ships after V1 has proven PMF and we're ready to address larger orgs (10–50 person marketing teams, multi-brand companies).

### 10.1 AR Room-Placement (WebXR)
"Place this product in your space" directly from the catalog. No app install.

### 10.2 Multi-brand Workspaces
For agencies and enterprise multi-divisional marketing. One workspace, multiple brand kits, segregated team membership.

### 10.3 Personalization Engine
Page variants by visitor segment (logged-in customer, region, source). Server-rendered, no client-side flash.

### 10.4 PIM / DAM Connectors
Akeneo, Salsify, Bynder native integration.

### 10.5 White-label Viewer SDK
Embed the Folio viewer in your own React/Vue app, fully styled.

### 10.6 SSO + SAML, SOC 2, HIPAA
Enterprise compliance baseline.

### 10.7 Full API + Webhooks
Headless publishing for agencies and partner platforms.

### 10.8 Self-hosted Enterprise Tier
For regulated buyers (finance, healthcare, government).

---

## 11. Design Notes

### 11.1 Visual Direction

**Brand:** Editorial-meets-product. White canvas, Inter grotesk + a display serif (Fraunces) for moments of emphasis. Saturated accent color: **#FF4D2D** (warm red-orange). Generous whitespace. Real-feeling mockups over abstract illustrations.

**Avoid:** Generic SaaS gradient hero, glowing-particle hero illustrations, neon orbs, "AI = circuit board" visual clichés, sci-fi cyberpunk for any AI-related surface.

### 11.2 UX Principles

1. **The AI surfaces, the user decides.** Folio's AI suggests; the user accepts or rejects. Never auto-apply structural changes without a visible action.
2. **No dead-end states.** Every error message includes a recovery action. Every empty state includes "what to do next."
3. **Brand kit is law.** AI generation, manual edits, and reviewer actions all conform. The system is the brand guardian; users don't have to be.
4. **Speed is a feature.** Sub-50ms interaction in the editor. Sub-1s viewer load. If a feature can't ship at those targets, it doesn't ship.
5. **Show, don't tell.** Replace explanation copy with previews wherever possible. Onboarding is a working example, not a tour.

### 11.3 Critical User Flows

**Flow A: First-time onboarding (target: < 5 min to first draft)**
1. Email signup with workspace name
2. Connect HubSpot (skippable)
3. Upload brand kit PDF or define tokens directly (3 colors, 2 fonts, logo, voice in one screen)
4. Choose "Start from brief," "Start from PDF," or "Start from template"
5. AI generates first draft
6. User lands in editor with draft + onboarding tooltip on the first interactive element

**Flow B: PDF import → published catalog (target: < 30 min)**
1. Drop PDF (drag-drop or file picker)
2. Folio extracts and shows page-by-page review with confidence indicators
3. User confirms or adjusts page structure
4. AI suggests interactive enhancements per page; user accepts/rejects in a single review pass
5. User clicks "Publish"
6. Viewer URL returned with copy-share-link affordance

**Flow C: Multi-stakeholder approval (target: each reviewer < 10 min)**
1. Author clicks "Request approval"
2. Selects approval chain (1–5 reviewers)
3. Each reviewer gets an email link → opens publication in "review mode"
4. Review mode shows "what changed since last approved" diff at top + element-anchored comments inline
5. Reviewer approves / requests changes
6. Audit log entry created automatically

**Flow D: Viewer experience on mobile (target: feels native)**
1. Open share link on mobile Safari
2. Page loads in < 1s (first contentful paint)
3. Default to single-page-view mode on portrait phones (no two-page spread)
4. Native swipe to advance, pinch to zoom
5. Hotspots are touch targets ≥ 44px (Apple HIG); tap opens product card as a bottom sheet
6. Form fields use native mobile keyboards (email, phone) and autofill

---

## 12. Technical Considerations

This is not a full engineering spec. It is the level of detail a solo founder or two-person team needs to make stack decisions before week one of building.

### 12.1 Recommended Stack

| Layer | Pick | Why |
|---|---|---|
| **Frontend (editor)** | Next.js 14+ App Router on Vercel | Server components for the marketing site, client components for the editor canvas, edge functions for the AI proxy |
| **Frontend (viewer)** | Next.js static export on Cloudflare Pages | Edge-cached HTML, sub-50ms TTFB globally, real HTML for SEO. This is the wedge — do not skimp. |
| **DB** | Postgres (Neon or Supabase) | Document state, user/workspace/billing metadata. JSONB for publication content schema. |
| **Object storage** | Cloudflare R2 | Images, PDFs, brand-kit assets. Cheap egress for viewer-side image serving. |
| **Image pipeline** | Cloudflare Images or Imgix | Automatic AVIF/WebP, responsive sizing, on-the-fly transforms |
| **Auth** | Clerk or WorkOS | Email + Google + Microsoft. SSO/SAML available when you need V2 enterprise. |
| **Payments** | Stripe | Per-seat metering via Stripe Billing. |
| **AI** | Claude 4.5 Sonnet (primary) + GPT-4o (vision/PDF parsing) | Structured output via JSON Schema. Claude for layout/copy generation; GPT-4o for PDF page structure extraction. |
| **Collab (V1)** | Yjs + Hocuspocus | CRDT for editor state, server-authoritative document persistence |
| **Analytics** | PostHog (self-hosted or cloud) | Product analytics + per-element heatmaps + session replay if needed |

### 12.2 AI Integration Strategy

**Publication generation pipeline:**

1. **Input parsing.** Brief (natural language) + brand kit + optional file attachments.
2. **Structure planning.** First Claude call: emit a JSON schema of pages with element placeholders. Constrained by brand kit tokens and brief intent. Use structured output / tool calling, not free-form text.
3. **Content generation.** Per-page Claude calls in parallel: emit text, alt text, hotspot suggestions. Schema-validated.
4. **Asset selection.** If user provided product CSV/Shopify, bind images to existing assets. Otherwise, use a stock-photo API (Unsplash or Pexels) with brand-kit-aware search.
5. **Validation.** Brand kit validator (server-side) rejects any AI output that violates color/font tokens. Failed validations trigger one retry with a corrective prompt.
6. **Hydration.** Save to Postgres as a JSONB publication tree. Generate edge-cached viewer URL.

**Cost ceiling:** Target $0.20 in AI cost per "useful first draft" (3 pages). At $0.20 cost and $29/seat pricing, you have plenty of margin. Monitor `cost per draft` weekly.

**Latency budget:**
- Structure planning: 5–8s
- Content generation: 30–60s (parallel per-page)
- Asset selection: 5–15s
- Total target: ≤ 90s for first usable draft

### 12.3 Data Model Sketch

Core entities (Postgres):

```
Workspace            -- billing root, has brand kits + team members
  ├── User           -- via WorkspaceMember junction table with role
  ├── BrandKit       -- tokens: colors[], fonts[], logo_url, voice
  ├── Integration    -- HubSpot, Shopify connections per workspace
  └── Publication
      ├── Page       -- ordered list of pages
      │   └── Element-- typed: text | image | hotspot | form | video
      ├── Comment    -- anchored to element_id
      ├── Version    -- snapshot of pages+elements at a point in time
      └── Approval   -- chain of approver_id, status, version_id
```

**Publication content as JSONB.** Don't normalize page/element rows. Store the full publication tree as a JSONB column on Publication; CRDTs in V1 will operate on this tree. Indexed lookups by publication_id only.

**Versions are content snapshots, not deltas.** Disk is cheap. Snapshot the full publication tree on every named version. Compute diffs at read time for the approval UI.

**Analytics events go to PostHog, not Postgres.** Don't build your own analytics store. Pipe viewer events to PostHog and use their API for in-app reporting.

### 12.4 The HTML Viewer Technical Bet

This is the riskiest technical assumption in the product. The bet:

**Hybrid rendering.** Real HTML/DOM for content (Google indexes it, screen readers read it, mobile is native). Canvas-only for the *transition* between pages (the actual page-flip animation). Static content lives in DOM; animation lives in canvas; they don't fight each other.

**Why this works:**
- Page content is always real HTML — Google crawls, screen readers read, mobile pinch-zoom works
- The flip animation is a CSS 3D transform on a wrapper div, with an optional canvas overlay during the in-flight transition for the bitmap-distortion effect
- Both modes coexist; the canvas overlay is decoration, not foundation

**De-risking spike (week 1):** Build a proof-of-concept: a 6-page document, real DOM, CSS 3D flip on click, Lighthouse Performance ≥ 90 on mid-tier mobile. Verify the bet works before committing to the full editor.

### 12.5 Hosting & Cost

**Target unit economics:**

| Metric | Target |
|---|---|
| Viewer hosting cost / publication / month | < $0.05 |
| AI cost / first draft | < $0.20 |
| AI cost / refinement edit | < $0.02 |
| Image storage / publication / month | < $0.10 |
| Total marginal cost / paying seat / month | < $2 |

At $29/seat pricing and < $2 marginal cost, you have 90%+ gross margin headroom. This funds AI cost increases, support, and growth.

---

## 13. Pricing & Business Model

### 13.1 Tiers

| Tier | Price | For | Key inclusions |
|---|---|---|---|
| **Solo** | $19/mo | Freelancers, founders | 1 user, 3 publications, 30 pages each, 50 AI generations/mo, Folio-branded viewer |
| **Team** | $29/seat/mo | 2–10 person marketing teams | Unlimited pubs/pages, unlimited AI, white-label viewer, custom domain, HubSpot/Salesforce/Marketo, Shopify hotspots, approval workflows, per-element analytics |
| **Business** | $59/seat/mo | 10–50 person teams, multi-brand | Everything in Team + multi-brand workspaces, SSO, PIM/DAM, A/B testing, API access, priority support |
| **Enterprise** | Custom | 50+ user orgs | Custom contracts, SOC 2, HIPAA, white-glove migration, self-hosted option |

### 13.2 The Price-Lock Promise

Customers who sign up in 2026 get their per-seat rate locked for 24 months. Codified in ToS, welcome email, and pricing page. If we change pricing for new customers, existing customers stay on their original plan until they choose to change.

**Why:** Post-Issuu trauma, trust is the differentiator. This is a structural promise, not a discount.

### 13.3 Free tier (open question — see Risks §14)

Initial position: no free tier. 14-day free trial of Team plan. Reasons: free tier inflates AI costs without proving willingness to pay; the design partner cohort is the better signal.

Revisit at M6 based on signup → publish conversion data.

---

## 14. Risks & Open Questions

### 14.1 High-risk assumptions

**R1: AI authoring quality clears the "better than Canva-in-the-same-time" bar.**
- *If false:* Maya stays in Canva. Wedge collapses.
- *Mitigation:* Weekly internal "Maya test" — every model release must produce 10/10 hand-graded outputs vs Canva-with-AI before shipping. Brand kit enforcement is what makes mediocre AI output usable.

**R2: Canva ships a flipbook distribution layer in 2026.**
- *If true:* Our creation-distribution thesis collapses for the segment Canva owns.
- *Mitigation:* Win on conversion attribution and marketing-team workflow (approvals, CRM, analytics) — areas Canva will under-invest in given their horizontal generalist position.

**R3: HTML viewer performance can't match canvas flip animation on low-end devices.**
- *If true:* The SEO/perf upside doesn't matter if the experience feels worse.
- *Mitigation:* Week-1 spike to validate the hybrid renderer. If the spike fails, fall back to canvas viewer + DOM-rendered alternate version for SEO (less elegant, still ships).

### 14.2 Medium-risk assumptions

**R4: Marketing teams of 2–10 have budget authority for $29/seat × 5 seats = $1,740/yr.**
- *If false:* Conversion lags; we need a free tier or lower price floor.
- *Mitigation:* Free tier with watermarked viewer + 1 publication. Revisit at M6.

**R5: HubSpot is enough CRM coverage for MVP.**
- *If false:* Salesforce/Marketo customers churn before V1 adds them.
- *Mitigation:* Acceptable. HubSpot has ~40% of the SMB marketing-team CRM market. Salesforce/Marketo customers should self-identify as V1 prospects, not MVP.

### 14.3 Open questions

- **Free tier yes/no.** Decide by M6.
- **Open API.** Internal API only for MVP; public API in V2.
- **Self-hosted option.** Yes for Enterprise tier (V2). Pricing TBD.
- **AI image generation.** Skip for MVP. Users upload their own product photography. Revisit V1 if real product photography is a friction point in design-partner feedback.
- **Multi-language publishing.** Skip for MVP. Revisit V2.
- **Print export (PDF download of the published Folio).** Probably yes for MVP — cheap to build, removes the "we still need a PDF for print/sales" objection. Validate with design partners first.

---

## 15. Out of Scope

Explicit non-goals for this product. If something on this list becomes critical later, revisit the strategy.

- **Magazine subscription paywalls.** Issuu's core. Different buyer, different workflow.
- **Print-on-demand.** Adobe + InDesign + print vendors own this.
- **Native mobile editor app.** Web-first. Editor is desktop-only through V2 minimum.
- **AI image generation.** Use user-uploaded or stock photos. Generated imagery is risk + cost without enough differentiation.
- **Translation / localization.** V2+ if at all.
- **Real-time co-watching of published viewers.** Cute, not load-bearing.
- **Embedded e-commerce checkout (not just SKU links).** Shopify owns checkout; we link to it.
- **CMS-style content reuse across publications.** Tempting but explodes scope. Each publication is self-contained for MVP.
- **Email campaign tool.** That's HubSpot/Mailchimp. We integrate; we don't replace.

---

## 16. Appendix

### 16.1 Competitive Matrix

| Capability | Folio | Flipsnack | Issuu | FlippingBook | Publuu |
|---|---|---|---|---|---|
| AI brief-to-catalog | **Native ★** | None | Patent only | None | None |
| AI auto-layout from PDF | **Native ★** | No | No | No | No |
| Real HTML viewer (SEO) | **Yes ★** | Canvas | Canvas | Canvas | Hybrid |
| Mobile gestures + perf | **Native** | OK | OK | Poor | Good |
| Shoppable hotspots | Yes | Enterprise | No | No | Yes (their moat) |
| CRM-synced lead forms | **Native ★** | Basic | No | No | No |
| Per-element conversion attribution | **Yes ★** | Page only | Page only | Page only | Page only |
| Multi-editor + approvals | Yes | No | No | Basic | No |
| Brand kit enforcement | **AI-enforced** | Checkbox | Checkbox | Checkbox | No |
| Self-serve team pricing | **$29/seat, no cliff** | $85→$258 cliff | Post-2024 hike | Per-publication | $25–60/mo |
| Catalog automation self-serve | **Yes ★** | Enterprise gated | No | No | Limited |
| Custom domain | Yes (Team+) | Yes (Pro) | Yes (Premium) | Yes | Yes |
| 24-month price lock | **Guaranteed ★** | No | No | No | No |

★ = Folio's clear lead in the category as of May 2026.

### 16.2 Glossary

- **Publication** — A Folio document. A catalog, brochure, lookbook, or report.
- **Page** — A single page within a publication.
- **Element** — An interactive or static item on a page: text block, image, hotspot, form, video.
- **Brand Kit** — A workspace-scoped set of design tokens (colors, fonts, logo, voice) enforced by the AI editor.
- **Hotspot** — A shoppable or informational interactive marker placed on a page element, typically bound to a Shopify SKU.
- **Viewer** — The customer-facing rendered HTML publication.
- **Version** — A named snapshot of a publication at a point in time.
- **Approval chain** — An ordered sequence of reviewers who must approve a publication before it can be published.

### 16.3 References

- Strategy & PRD (companion document, this thread)
- Landing page mockup (companion artifact, this thread)
- Editor UI mockup (companion artifact, this thread)
- Sample catalog (companion artifact, this thread)
- Competitor research, May 2026:
  - Issuu pricing complaints — Trustpilot (1,395+ reviews), G2, Capterra
  - Flipsnack publication caps — Capterra, SoftwareFinder
  - PDF conversion reliability — G2 reviews across Flipsnack, FlippingBook, Heyzine
  - Category AI gap — direct competitor site audits, Q2 2026

---

**End of PRD v0.1.** Live document — update as design partners flag gaps and the MVP scope settles.