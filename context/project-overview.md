# Project Overview — Folio (imagestudiolab.com)

**Folio** is the AI-native publishing platform that turns any text brief, PDF, or product list into a polished, interactive, shoppable digital catalog in minutes instead of weeks.

## Goals
1.  **Democratize Creative Authoring**: Empower marketing teams to generate editorial-grade 3D publications from a simple natural-language brief.
2.  **Break Incumbent Stagnation**: Replace heavy, unindexable, canvas-rendered flipbooks (e.g. Flipsnack, Issuu) with lighting-fast, SEO-indexable HTML viewers.
3.  **Drive Pipeline Revenue**: Seamlessly embed shoppable product hotspots bound to Shopify SKU inventory and custom lead-gen forms mapping directly to CRM platforms.
4.  **Enforce Brand Integrity**: Enforce custom brand guidelines (logo, colors, type tokens, voice) directly in the LLM generation logic to guarantee on-brand outcomes.

## Core User Flow
1.  **Brief**: User arrives at Folio, selects their brand kit preferences, and types a simple brief outlining their catalog's goal.
2.  **Generate**: Folio calls the Google Gemini API to analyze instructions and construct a structured layout JSON in under 90 seconds.
3.  **Interact**: The system instantly renders an editorial 3D Flipbook viewer populated with dynamic product hotspots, Web Audio paper-flip synthesis, and lead capture.
4.  **Publish**: The user customizes, reviews, and publishes the document, securing a highly responsive custom domain link.

## Features (MVP)
-  **AI Brief Input → Structured JSON Layout**: Generates multi-page editorial catalog schemas matching custom parameters.
-  **Real HTML 3D Flipbook**: Responsive page transitions powered by 3D CSS transforms and touch gestures, fully indexable by search engines.
-  **Shoppable hotspots**: Connect product entries (names, prices, descriptions) dynamically with interactive overlays.
-  **Audio Synthesis**: Web Audio API paper friction audio matching page-flip motion.
-  **Brand Kit Enforcer**: Constrains LLM outputs and layout assets to predefined color tokens and typography.

## In-Scope (Phase 1 MVP)
- Next.js App Router workspace implementation.
- Official `@google/genai` JS SDK pipeline.
- Interactive homepage editor workspace.
- Responsive, hardware-accelerated 3D Flipbook renderer.
- Custom Web Audio paper synth engine.

## Out-of-Scope (Phase 1 MVP)
- Multi-editor live CRDT collab.
- Real-time video/audio embeds.
- Direct Stripe subscription billing.
- Self-hosted visual asset generation.

## Success Criteria
- Time-to-first-draft under 120 seconds.
- Lighthouse SEO score of 100 on published documents.
- Under 50ms viewer/editor interaction latency.
