# Unit 01: Foundations

## Goal
Establish the brand's core visual identity by configuring global styles and typography.

## Implementation

### 1. Typography Setup (`app/layout.tsx`)
- Import `Fraunces` (serif) and `Inter` (sans) from `next/font/google`.
- Define CSS variables:
    - `--font-serif`: Fraunces
    - `--font-sans`: Inter
- Apply these variables to the `html` element.

### 2. Global Styles (`app/globals.css`)
- Define brand colors in the `:root` and `.dark` (if needed, but primary focus is light mode for the editorial look):
    - `--background`: `#FAF7F2` (Warm Cream)
    - `--foreground`: `#15110D` (Near-Black)
    - `--accent`: `#7B2D26` (Deep Maroon)
    - `--gold`: `#B8893E`
- Configure Tailwind v4 `@theme` block to use these variables.
- Set base typography rules in `@layer base`.

## Dependencies
- `next/font` (built-in)

## Verification Checklist
- [ ] `Fraunces` is correctly applied to headings.
- [ ] `Inter` is the default body font.
- [ ] Background color is `#FAF7F2` (Warm Cream).
- [ ] No horizontal overflow on mobile viewports.
