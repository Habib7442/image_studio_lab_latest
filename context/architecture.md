# Architecture — imagestudiolab.com

## Stack Table

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Core application and routing |
| **Styling** | Tailwind CSS v4 | Utility-first styling with modern features |
| **Components** | Shadcn UI | Accessible, unstyled components |
| **Language** | TypeScript | Type safety and developer experience |
| **Checkout** | Gumroad | External MoR for payments and file delivery |
| **Email** | ConvertKit | Lead magnets and drip sequences |
| **Analytics** | Plausible | Privacy-friendly tracking |
| **Icons** | Lucide React | Consistent iconography |

## System Boundaries

- `app/`: Contains all routes and page components.
- `components/ui/`: Shadcn primitive components.
- `components/brand/`: Custom-built editorial components (Packs, Heroes, etc.).
- `lib/`: Shared utilities and constants.
- `docs/`: Original product requirements and design references.
- `context/`: AI-driven development context files.

## Storage Model
- **Static Content**: Pack data and prompt samples are stored as local constants/JSON.
- **Images**: Hosted on Cloudinary (free tier) for performance.
- **No Database (MVP)**: All persistent data (customers, orders) is handled by Gumroad.

## Auth & Access Model
- **Public**: Entire marketing site is public.
- **Paid Content**: Access to full PDFs and "Studio Vault" is granted post-purchase via Gumroad's secure delivery.

## Invariants (Rules)
1.  **Marketing-Only**: The site must never handle raw credit card data; always redirect to Gumroad.
2.  **Performance-First**: All landing pages must be statically optimized where possible.
3.  **Responsive-First**: Every component must be verified on mobile (iPhone/Android) before merge.
4.  **Consistency**: Use only defined UI tokens; never hardcode hex values in components.
