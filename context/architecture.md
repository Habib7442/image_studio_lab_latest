# Architecture — Folio (imagestudiolab.com)

## Stack Table

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Core application routing and layout |
| **Styling** | Tailwind CSS v4 | Utility-first styling with modern features |
| **AI API** | Direct REST API Fetch | Google Gemini 3.5 Flash structured layout generation |
| **Audio** | Web Audio API | Custom real-time synthesis of page-flip friction |
| **Storage Model** | JSONB Publication Tree | Catalog schemas represented as structured JSON |
| **Lead Capture** | Mock CRM Integration | Attributes conversions and lead entries |

## System Boundaries

- `app/`:
  - `actions/`: Next.js Server Actions handling LLM structure generation.
  - `(marketing)/`: Main marketing shell and dynamic editor page.
- `components/brand/`:
  - `flipbook.tsx`: The 3D CSS page-flip layout engine.
  - `flipbook-audio.ts`: Custom Web Audio sound synthesis hooks.
  - `editor-console.tsx`: The direct manipulation dashboard panel.
- `lib/`:
  - `gemini.ts`: Client instance and generation utility helper.
  - `constants.ts`: Color schemes, fallback presets, and mock collections.

## Core Architectural Flows

### 1. Catalog Layout Pipeline (LLM to DOM)
1. User enters natural language brief in UI.
2. Form submits to Next.js Server Action (`generateCatalog`).
3. Action calls the Google Gemini REST API with `responseSchema` (structured JSON).
4. Gemini returns a validated JSON object conforming to the target page models.
5. Next.js component hydrates the 3D Flipbook viewer with the returned JSON catalog state.

### 2. Interactive Hotspot Attribution
* Interactive catalog elements are parsed dynamically.
* Clicking or hovering hotspots fetches mock product listings and displays details in an animated drawer.

## System Invariants
1. **Server Actions only for API Keys**: The `GEMINI_API_KEY` must never leak to the client; all LLM calls must be isolated inside Server Actions (`"use server"`).
2. **Performance Isolation**: Heavy Web Audio synthesis and 3D transforms must be strictly contained within client-side hooks to prevent Next.js SSR hydration mismatches.
3. **Responsive Flow**: Standardize desktop dual-page display with absolute portrait single-page mode on small mobile screens.
