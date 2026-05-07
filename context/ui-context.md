# UI Context — imagestudiolab.com

## Visual Language
The design is **magazine-coded** and **editorial**, focusing on high-contrast typography and a restrained color palette. It should feel like a premium studio, not a generic SaaS.

## Color Tokens (Tailwind v4)

| Token | Hex | Role |
| :--- | :--- | :--- |
| `background` | `#FAF7F2` | Primary background (Warm Cream) |
| `foreground` | `#15110D` | Primary text (Near-Black) |
| `accent` | `#7B2D26` | Deep Maroon (CTAs, secondary emphasis) |
| `gold` | `#B8893E` | Gold (Premium/Lifetime highlights) |
| `muted` | `#6B5F52` | Soft text/metadata |
| `border` | `rgba(21, 17, 13, 0.08)` | Subtle separators |

## Typography

| Style | Font Family | Usage |
| :--- | :--- | :--- |
| **Display** | `Fraunces` | Headers, editorial quotes, logos. Often italicized. |
| **Body** | `Inter` | Regular text, descriptions, navigation. |
| **Code** | `JetBrains Mono` | Prompt blocks, technical data. |

## Border Radius Scale
- **Pills**: `999px` (Buttons, tags)
- **Soft**: `4px` (Cards, images, sections)

## Layout Patterns
- **Container**: `max-width: 1280px` for general sections.
- **Container Narrow**: `max-width: 960px` for text-heavy editorial sections.
- **Sticky Nav**: Transparent/Blurred background (`rgba(250, 247, 242, 0.92)`).
- **Hero Grid**: 1.4fr (Text) / 1fr (Visual) split.

## Key Component Patterns
1.  **Pack Card**: Aspect ratio `4:5` for covers. Gradient overlays (CSK Yellow, RCB Red, etc.) for segments.
2.  **Prompt Block**: `JetBrains Mono` text in a subtle grey box with a "Copy" button.
3.  **Lifetime Card**: Dark background (`#15110D`) with Gold accents and scarcity indicators.
