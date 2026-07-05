# Progress Tracker — Folio (imagestudiolab.com)

## Current Phase
- **Phase 1: Folio AI-Native Prototyping**

## Current Goal
- Establish the Google Gemini SDK generation pipeline and render real-time generated 3D catalogs directly on the interactive workspace homepage.

## Completed
- [x] Review new PRD specifications.
- [x] Align Six-File context structure with the Folio product transition.
- [x] Evolve branding guidelines (`ui-context.md`) to Folio Editorial Red-Orange style.
- [x] Define catalog generation layout pipeline in `architecture.md`.
- [x] Retain high-end interactive 3D Flipbook engine and sound synthesis foundations from previous prototyping.
- [x] Define direct HTTP API call client wrapper (gemini-3.5-flash) in `lib/gemini.ts`.
- [x] Create Next.js Server Action `lib/actions/generate-catalog.ts` with strict JSON Schema outputs.
- [x] Move catalog generation workspace to new `/dashboard` route.
- [x] Redesign landing page `/` as marketing page with pre-loaded demo.
- [x] Integrate multi-image reference uploader (Vision processing and concurrent Sanity hosting).
- [x] Create 'Exclude Text' toggle for minimalist visual lookbooks.
- [x] Add client-side download overlays on flipbook image pages.
- [x] Enforce factual news editorial copywriting (e.g. Deepika Padukone, 82°E, Cartier) instead of dummy copy.
- [x] Support YouTube video embeds inside inner sheets and outbound call-to-action (CTA) link overlays.
- [x] Replace hardcoded footer texts with dynamic brand collection labels.
- [x] Expand brand styling presets to include "Royal Indigo" and "Monochrome Silk".
- [x] Build Lookbook Real-Time Sheet Editor to customize text, quote, video, images (Image 1 & 2), and hotspot coordinates.
- [x] Build Sanity Cloud Saving pipeline with copyable public URL lookbook viewers (e.g. /lookbook/[id]).
- [x] Implement intelligent image distribution mapping (split-page side-by-side layout when uploaded images exceed book slots).
- [x] Limit default outbound CTA buttons to a single target page to prevent page-duplication.
- [x] Bypassed Next.js RSC serialization limits for image uploads by building API Route Handler `/api/upload` (resolves Turbopack Maximum Array Nesting Exceeded runtime errors).
- [x] Support dynamic catalog page counts (4 pages for 1-4 images, 6 pages for 5+ images) without dummy trailing pages.
- [x] Implement programmatic downloads for side-by-side images in split layout spreads.
- [x] Add real-time page deletion controls in the dashboard lookbook Sheet Editor.
- [x] Target video embeds and CTA buttons dynamically to exactly one inner page index, preventing duplicated overlays across other sheets.
- [x] Set up Clerk Authentication across landing pages, navigations, and dashboard routes using Next.js 16 Proxy configuration (`proxy.ts`) and opted out of Clerk telemetry tracking.
- [x] Enforced private per-user database schemas in Sanity (associating user lookbooks with their Clerk user ID).
- [x] Built the "My Creatives" dashboard tab, displaying a list of user-created publications with options to view public links and hot-reload them back into the 3D editor.
- [x] Redesigned the entire workspace dashboard using a sleek, state-of-the-art dark mode UI with neon-lime (`lime-400`) accents, including a user-specific Left Sidebar, center control panel, and stage view.
- [x] Implemented "Design Manually (Bypass AI)" action to instantly instantiate blank 6-page publications, bypassing AI rate-limits and latency.
- [x] Added inline "Upload File" buttons for image inputs inside lookbook Sheet Editor to upload page images directly to Sanity Asset Lake.
- [x] Implemented Add and Delete hotspot features within lookbook Sheet Editor, making product hotspots fully optional and dynamic.
- [x] Fixed YouTube embed URL parsing to convert raw watch/share URLs on-the-fly inside both the Sheet Editor and the 3D Flipbook viewer.
- [x] Integrated Catalogue Settings (Title, Brand, Subtitle) in the lookbook Sheet Editor.
- [x] Implemented SEO best practices (OpenGraph, Twitter Cards, robots index tags, canonicals, and Schema.org JSON-LD Structured Data) on all public-facing publication pages for optimized search engine discovery.
- [x] Allowed lookbook overwrites/saves to preserve existing links and document IDs, instead of generating duplicates.
- [x] Created delete catalog actions and interface triggers to securely delete lookbooks from Sanity Content Lake database.
- [x] Simplified the landing Home Page (`app/(marketing)/page.tsx`) into a server-rendered showroom showcase gallery, fetching all real user-created lookbooks dynamically from Sanity.
- [x] Built a non-blocking background analytics tracker to increment and log lookbook page views atomically inside Sanity, displaying a dynamic clicks badge under My Creatives.
- [x] Restyled the About page, write-review page, and navigation logo brand text alongside CTA buttons to neon-lime dark mode standards.
- [x] Realigned the About page copywriting to focus on 3D shoppable digital showrooms and lookbooks, and created an automated Unsplash fashion gallery slideshow to resolve empty image containers.
- [x] Integrated mixed Sanity queries on the About page to combine pack cover images and lookbook page images in a randomized gallery loop, fixing Next.js parent height warnings.
- [x] Resolved Next.js `<Image>` performance warnings by supplying missing responsive `sizes` parameters and upgrading the homepage showcase covers to use next/image.
- [x] Created dynamic detailed `lib/seo.ts` utility defining production canonicals (`https://www.imagestudiolab.com`), Google Search Console verifications, and structured Schema.org JSON-LD scripts (Organization, WebSite, Catalog).
- [x] Bound default layout, dynamic lookbook page, and homepage renders to dynamic SEO and JSON-LD schema blocks.
- [x] Hided default "Folio" / "FOLIO" branding labels across homepage grids, margins, lookbooks, and previews to only show titles/names.
- [x] Secured image upload API route with a Clerk auth gate, batch caps, size limits, dynamic mime-type file extensions, and custom Next.js request body parser limits to support up to 10MB payloads.
- [x] Neutralized Reflected XSS risks inside JSON-LD blocks using unicode character escaping.
- [x] Filtered public catalogs on the homepage and about page using a new schema `isPublic` flag, preventing private draft leaks, and relaxed save catalog validations to make only Catalogue Title required.
- [x] Aligned client-side image size limit checks (reference uploads & sheet editor uploads) in the dashboard UI to support up to 10MB files.
- [x] Committed and pushed all refinements successfully to remote GitHub origin repository.


## In Progress
- [ ] Connect brief uploader panel dynamically to generated 3D flipbook components.
- [ ] Set up visual preset style overrides (Earthy Sage, Midnight Velvet, Crimson Rose) in the flipbook viewer.
- [ ] Wire up simulated HubSpot lead-gen drawers with conversion metrics.

## Session Notes
- Starting Phase 1 transition: Pivoted product scope from prompt pack store to B2B publishing SaaS.
- Refocused codebase on leveraging the highly powerful existing 3D CSS layout transitions and audio synthesis engines as the foundation for the new Real HTML Viewer.
