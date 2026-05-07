# Unit 02: Core Layout

## Goal
Implement the site's structural frame, including the sticky editorial navigation and the brand footer.

## Implementation

### 1. Navigation Component (`components/brand/navbar.tsx`)
- **Structure**: Sticky header with a blurred background.
- **Logo**: "imagestudiolab" using `Fraunces`. The "lab" part or an italic element should use the `accent` color.
- **Menu**: Links for "Packs", "Try Free", "Vault", "About".
- **CTA**: A pill-shaped "Get Started" or "Vault" button.
- **Responsiveness**: Mobile menu (hamburger) for smaller screens.

### 2. Footer Component (`components/brand/footer.tsx`)
- **Structure**: Multi-column layout.
- **Content**: 
    - Brand description & Logo.
    - Quick Links (Packs, Vault, Try Free).
    - Support/Legal (Privacy, Terms, Refunds).
    - Social links (IG, Pinterest).
- **Design**: Subtle top border, `muted` text colors.

### 3. Root Layout Integration (`app/layout.tsx`)
- Wrap the `{children}` in a `main` tag.
- Include `<Navbar />` and `<Footer />`.

## Dependencies
- `lucide-react` (icons)
- `framer-motion` (optional, for smooth mobile menu)

## Verification Checklist
- [ ] Navbar is sticky with blur effect.
- [ ] Logo matches the brand typography.
- [ ] Mobile menu opens and closes correctly.
- [ ] Footer is responsive and correctly placed.
