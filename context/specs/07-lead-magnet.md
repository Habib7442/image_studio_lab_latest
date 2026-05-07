# Unit 07: Lead Magnet Integration

## Goal
Capture user emails in exchange for a high-quality "Free Sample Pack" PDF. This builds the audience for future pack launches.

## Implementation

### 1. Lead Magnet Landing Page (`app/try-free/page.tsx`)
- **Editorial Design**: Clean, minimal, high-contrast.
- **Hook**: "Master the light. For free."
- **Visual**: A 3D mockup of the "Free Sample Pack" (5 prompts + Master Director preview).
- **Form**: A clean email capture field using `shadcn` **Input** and **Button**.

### 2. ConvertKit Integration
- Create a `components/brand/convertkit-form.tsx`.
- Use the ConvertKit Form ID (provided by the user) to submit data via their API or a hidden iframe embed.
- **Success State**: Show a "Check your inbox" message with a button to download the sample immediately.

### 3. Navigation
- Link the "Try Free" buttons in the Navbar and Hero to this page.

## Dependencies
- `lucide-react`
- `shadcn/ui/input`
- `shadcn/ui/button`

## Verification Checklist
- [ ] `/try-free` page matches the editorial design system.
- [ ] Email form correctly submits (can be tested with a dummy endpoint if API key is missing).
- [ ] Success state is clear and includes a download link.
- [ ] Mobile responsive layout.
