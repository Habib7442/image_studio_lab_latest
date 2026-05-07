# Unit 05: Editorial Gallery

## Goal
Implement a visually-driven gallery similar to Meigen AI but with a premium editorial feel. Focus on high-quality visuals, quick filtering by segment, and prompt previews.

## Implementation

### 1. Gallery Filter (`components/brand/gallery-filters.tsx`)
- Use `shadcn` **Tabs** to switch between segments (All, Sellers, Creators, Fans, Professionals).
- Maintain the `background` color and subtle border design.

### 2. Masonry Grid (`components/brand/editorial-gallery.tsx`)
- Implement a responsive masonry-style grid (using CSS columns or a grid-based approach).
- **Prompt Card**:
    - High-quality image display.
    - Hover effect: Reveal the `mood` line and a "Quick View" button.
    - Title and Segment badge at the bottom.

### 3. Quick View (`components/brand/prompt-dialog.tsx`)
- Use `shadcn` **Dialog** to show a large preview of the image.
- Display the `chatGPTVersion` and `geminiVersion` prompts with "Copy" buttons.
- Show the "Before/After" comparison if available.

### 4. Data Integration
- Fetch `prompts` and `packs` from Sanity using GROQ.
- Filter the gallery items based on the active tab.

## Dependencies
- `next-sanity`
- `framer-motion` (for smooth tab transitions)
- `lucide-react`

## Verification Checklist
- [ ] Gallery layout is responsive and clean.
- [ ] Tabs filter the gallery without page reload.
- [ ] "Quick View" dialog shows the correct prompts and images.
- [ ] Before/After comparison works inside the dialog.
