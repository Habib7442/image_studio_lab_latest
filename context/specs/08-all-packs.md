# Unit 08: All Packs Catalog

## Goal
Implement a dedicated catalog page that showcases all available prompt packs in a clean, editorial grid. This page serves as the primary shop floor for the platform.

## Implementation

### 1. Catalog Page (`app/packs/page.tsx`)
- **Editorial Header**: "The Collection / All Prompt Packs" using `Fraunces`.
- **Filtering**: Re-use the `GalleryFilters` component to allow users to filter packs by segment (Sellers, Creators, etc.).
- **Data Fetching**: Fetch all packs from Sanity using `allPacksQuery`.

### 2. Pack Card Component (`components/brand/pack-card.tsx`)
- **Structure**: Vertical card with a large cover image.
- **Details**:
    - Title (`Fraunces`).
    - Segment badge.
    - Price (USD).
    - "View Pack" link pointing to `/packs/[slug]`.
- **Hover Effect**: Subtle elevation and "View" overlay.

### 3. Integration
- Ensure "Browse Packs" buttons in the Navbar and Hero link here.

## Dependencies
- `next-sanity`
- `lucide-react`

## Verification Checklist
- [ ] `/packs` page displays all packs from Sanity.
- [ ] Filtering by segment correctly updates the displayed packs.
- [ ] Pack cards look premium and link correctly to detail pages.
- [ ] Layout is responsive (1 column mobile, 2/3 columns desktop).
