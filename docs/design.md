# SuiNS Roadmap Website — Design System

The website aesthetic follows the clean, airy, and ocean-themed Sui brand language.

---

## 1. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `sui-blue` | `#4DA2FF` | Primary buttons, key links, accent text |
| `sky` | `#6FBCF0` | Hover states, softer accents |
| `aqua` | `#C0E6FF` | Light badges, card borders, soft backgrounds |
| `navy` | `#030F1C` | Headings, high-contrast base text |
| `slate` | `#6B7A8D` | Body copy, secondary/subtext |
| `white` | `#FFFFFF` | Page base background |
| `deep` | `#011829` | Footer and dark-section background |

Defined in `tailwind.config.ts` as custom theme extensions.

---

## 2. Typography

- **Font**: Inter (geometric sans-serif) — loaded via `next/font/google`, applied globally as `--font-inter`.
- **Headings**: Bold, tight tracking (`font-bold tracking-tight`), navy.
- **Category labels**: Small caps, letter-spaced, `text-sui-blue` (`text-sm font-semibold uppercase tracking-wide`).
- **Body copy**: Relaxed line-height (`leading-relaxed`), slate.

---

## 3. UI Components & Patterns

### Cards
- `rounded-2xl` geometry with `border border-aqua/70` and subtle `shadow-sm`.
- Hover: `-translate-y-1` lift with `transition-transform`.

### Buttons
- **Primary** (`btn-primary`): Fully rounded (`rounded-full`), `bg-sui-blue text-white`, solid fill.
- **Secondary** (`btn-secondary`): Rounded outline, `border-aqua text-sui-blue`, white background.
- Both use `transition-colors` for smooth hover.

### Navigation (SiteNav)
- Sticky top bar, `border-b border-aqua/40`, `bg-white/80 backdrop-blur`.
- Active page pill: `bg-aqua/50 text-sui-blue rounded-full`.
- Inactive: `text-slate hover:text-navy`.
- Mobile: horizontal scroll row below the main bar.

### Status Badges (StatusBadge)
| Status | Label | Style |
|---|---|---|
| `implemented` | Shipped | `bg-green-100 text-green-700` |
| `in-development` | Building | `bg-aqua text-sui-blue` |
| `proposed` | Exploring | `bg-slate/10 text-slate` |

### Feature Cards
- Collapsed: flat card with metadata badges, body, monetization box, action footer.
- Expanded: React Portal modal over a blurred backdrop. Shows score panel (Impact / Token Accrual / Effort + Priority number).

### Demand Vector Badges
Small rounded pills in `bg-aqua/30 text-sui-blue` for `payments`, `websites`, `agents`, `identity`.

### Monetization Box
Highlighted panel in `bg-aqua/20 border border-aqua/60` — surfaces fee model and beneficiary inside each card.

---

## 4. Layout

- Max content width: `max-w-6xl mx-auto px-6`.
- Section vertical rhythm: `py-20` for major sections, `py-12` for sub-sections.
- Card grids: `grid gap-6 md:grid-cols-2 lg:grid-cols-3`.

---

## 5. Global Chrome

Rendered once in `layout.tsx`, wrapping every page:
1. `StatsTicker` — thin top bar with live metrics.
2. `SiteNav` — sticky nav.
3. Page content (`children`).
4. `Footer` — official links, social, contribute CTA.
