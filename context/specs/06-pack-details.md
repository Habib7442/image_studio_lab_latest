# Unit 06: Pack Detail Pages

## Goal
Implement a dynamic, content-rich landing page for each prompt pack. This page must sell the pack's value and provide a clear path to purchase via Gumroad.

## Implementation

### 1. Dynamic Route (`app/packs/[slug]/page.tsx`)
- Fetch the specific pack data using its slug from Sanity.
- Fetch all prompts referenced by this pack.

### 2. Pack Components
- **`PackHero`**: 
    - Large editorial heading (`Fraunces`).
    - Breadcrumbs (Home > Packs > Segment).
    - Price badges (USD/INR).
    - High-quality cover image with the "magazine" overlay.
- **`PackChecklist`**: A premium grid showing the "38-40 pages PDF" inclusions (Master Director, 25 Prompts, Troubleshooting, etc.).
- **`PackGallery`**: A masonry grid of the prompts *specific to this pack*.
- **`GumroadSection`**: A high-contrast CTA section with the purchase button and a "30-day money-back" guarantee label for the Lifetime Vault upsell.

### 3. Data Query
- Update GROQ queries to fetch a single pack by slug including its referenced prompts.

## Dependencies
- `next-sanity`
- `lucide-react`

## Verification Checklist
- [ ] Route `/packs/[slug]` loads the correct data.
- [ ] Price correctly displays based on Sanity data.
- [ ] Gallery only shows prompts belonging to the pack.
- [ ] "Buy Now" button correctly links to the pack's Gumroad URL.
- [ ] Page is mobile-optimized with a focused "Buy" experience.
