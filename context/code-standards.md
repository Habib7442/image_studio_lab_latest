# Code Standards — imagestudiolab.com

## Development Patterns
- **Next.js**: Use App Router (v16 proxy convention). Prefer Server Components by default.
- **Tailwind v4**: Use `@apply` sparingly; prefer inline utility classes for readability. Use the defined color tokens.
- **TypeScript**: Strict mode enabled. Define interfaces for all Pack data and UI props.

## File Organization
- `app/`: Group routes logically. Use `(marketing)` and `(legal)` route groups if needed.
- `components/`:
    - `ui/`: Primitives from Shadcn.
    - `brand/`: Project-specific editorial components.
- `lib/`:
    - `utils.ts`: Tailwind merging (`cn`).
    - `constants.ts`: Store pack data here.

## Component Standards
- **Functional Components**: Use arrow functions (`const MyComp = () => {}`).
- **Prop Destructuring**: Always destructure props.
- **Lucide Icons**: Import only needed icons from `lucide-react`.

## Accessibility (A11y)
- Use semantic HTML (`section`, `article`, `header`, `footer`, `h1-h6`).
- Ensure all interactive elements have unique IDs for testing.
- Maintain a minimum color contrast of 4.5:1 (already met by brand palette).

## State Management
- Prefer URL state (search params) for filtering packs.
- Use `useState` for local UI states (modals, mobile menu).
- Avoid global state (Redux/Zustand) unless absolutely necessary.
