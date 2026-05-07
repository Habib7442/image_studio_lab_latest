# Unit 04: Homepage Hero

## Goal
Implement a high-impact, editorial-grade hero section that communicates the core value proposition of "imagestudiolab".

## Implementation

### 1. Hero Component (`components/brand/hero.tsx`)
- **Structure**: Two-column layout on desktop (1.4fr text / 1fr visual).
- **Typography**: 
    - Title: Large `Fraunces` display text (fluid font size).
    - Subhead: Italic `Fraunces` with brand promise.
- **Visual**: An aspect-ratio `3:4` box with a rich gradient or sample image, including a "Studio Sample" label and metadata overlay.
- **CTAs**: 
    - Primary: "Explore Packs" (Pill-shaped, dark).
    - Secondary: "Studio Vault" (Pill-shaped, gold/outline).
- **Trust Badges**: A row of small labels (e.g., "Master Tested", "Copy-Paste Ready").

### 2. Integration (`app/page.tsx`)
- Replace the default Next.js template with the `<Hero />` component.
- Ensure the background matches `var(--background)`.

## Dependencies
- `lucide-react`

## Verification Checklist
- [ ] Title is responsive and uses `Fraunces`.
- [ ] Visual box maintains aspect ratio.
- [ ] CTAs are clearly visible and follow the design system.
- [ ] Mobile layout stacks correctly.
