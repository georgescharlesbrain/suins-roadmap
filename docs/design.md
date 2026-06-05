# SuiNS Roadmap Website — Design System Summary

The website aesthetic follows the clean, airy, and ocean-themed Sui brand language.

## 1. Color Palette
- **Primary Accent (`sui-blue`)**: `#4DA2FF` (buttons, key links)
- **Secondary Accent (`sky`)**: `#6FBCF0` (hovers)
- **Background Tints (`aqua`)**: `#C0E6FF` (light badges, soft card backgrounds)
- **Headings & Base Text (`navy`)**: `#030F1C` (high contrast readable text)
- **Body & Subtext (`slate`)**: `#6B7A8D` (secondary reading text)
- **Page Base (`white`)**: `#FFFFFF` (default light background)
- **Footer Base (`deep`)**: `#011829` (dark footer base)

## 2. Typography
- **Font**: Inter (sans-serif) via Next.js Google Fonts (`next/font/google`).
- **Styles**: Strong geometric sans-serif headings, letter-spaced uppercase category labels, and relaxed, readable body copy.

## 3. UI Components & Patterns
- **Cards**: Pill-shaped/rounded geometry (`rounded-2xl`) with soft `aqua/70` borders and subtle drop shadows.
- **Buttons**: Fully rounded capsules (`rounded-full`) using `sui-blue` fill for primary actions and outline/white style for secondary CTAs.
- **Status Badges**:
  - `Shipped` (implemented): Green tint (`bg-green-100 text-green-700`)
  - `Building` (in-development): Blue/aqua tint (`bg-aqua text-sui-blue`)
  - `Exploring` (proposed): Grey/slate tint (`bg-slate/10 text-slate`)
