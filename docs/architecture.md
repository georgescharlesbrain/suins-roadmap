# SuiNS Roadmap Website — Architecture Overview

This document outlines the directory structure, data flow, and tooling conventions for the **SuiNS Roadmap Website** (`resources/suins/website/`).

---

## 1. Project Directory Structure

```
resources/suins/website/
├── docs/                          # Specification & design files
│   ├── AGENTS.md                  # Rules for AI coding assistants
│   ├── architecture.md            # This file
│   ├── design.md                  # Design system & color tokens
│   └── devops_improvement_plan.md # GitHub/Vercel improvement tracker
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout: StatsTicker → SiteNav → page → Footer
│   │   ├── page.tsx               # Home — Hero + Thesis sections
│   │   ├── products/page.tsx      # Product Catalog — Showcase component
│   │   ├── roadmap/page.tsx       # Roadmap — RoadmapExplorer component
│   │   ├── contributors/page.tsx  # Contributors thank-you page (self-contained)
│   │   └── globals.css            # Tailwind directives + shared utility classes
│   ├── components/
│   │   ├── SiteNav.tsx            # Sticky global nav: Home / Roadmap / Products / Contributors
│   │   ├── Hero.tsx               # Landing hero: headline, taglines, and CTAs
│   │   ├── Thesis.tsx             # Investment thesis + demand vector cards
│   │   ├── Showcase.tsx           # Product Catalog grid ("Built on SuiNS")
│   │   ├── RoadmapExplorer.tsx    # Filter bar + status-grid controller
│   │   ├── FeatureCard.tsx        # Feature card + modal overlay with score panel
│   │   ├── StatusBadge.tsx        # Shipped / Building / Exploring pills
│   │   ├── StatsTicker.tsx        # Top-of-page metrics ticker bar
│   │   └── Footer.tsx             # Official links, social, and contribute CTA
│   ├── data/
│   │   ├── roadmap.ts             # Authoritative roadmap feature database (typed)
│   │   └── site.ts                # All text copy, hero, showcase catalog, footer links
│   └── lib/
├── .github/
│   ├── workflows/ci.yml           # TypeScript CI check on every push/PR
│   └── dependabot.yml             # Automated npm + Actions dependency updates
├── vercel.json                    # Security headers (HSTS, CSP, X-Frame-Options, …)
├── tailwind.config.ts             # Brand palette: sui-blue, navy, sky, aqua, deep
├── package.json                   # Next.js 15 scripts; packageManager: pnpm@10.29.3
└── pnpm-lock.yaml                 # Lockfile
```

---

## 2. Page Routes

| Route | Component | Purpose |
|---|---|---|
| `/` | `Hero` + `Thesis` | Landing — investment pitch and demand vectors |
| `/roadmap` | `RoadmapExplorer` | Interactive filter + feature cards |
| `/products` | `Showcase` | Product catalog — live products built on SuiNS |
| `/contributors` | Contributors (inline) | Thank-you page for community contributors |

Global chrome (`StatsTicker`, `SiteNav`, `Footer`) is rendered once in `layout.tsx` and wraps every route.

---

## 3. Data Flow & Rendering

The application uses **strict separation of content and presentation**: all copy, metadata, and links live in typed data modules; components are pure renderers.

```mermaid
graph TD
    RoadmapData[src/data/roadmap.ts] -->|roadmapFeatures[]| RoadmapExplorer
    SiteData[src/data/site.ts] -->|site.*| Hero & Thesis & Showcase & SiteNav & Footer
    RoadmapExplorer -->|feature props| FeatureCard
    Layout[src/app/layout.tsx] --> StatsTicker & SiteNav & PageSlot & Footer
    PageSlot --> Home & RoadmapPage & ProductsPage & ContributorsPage
```

---

## 4. Feature Data Schema (`RoadmapFeature`)

Defined in `src/data/roadmap.ts`:

```typescript
export interface FeatureScore {
  impact: number;       // 1–5: user/ecosystem impact
  tokenAccrual: number; // 1–5: $NS fee / burn pressure
  effort: number;       // 1–5: implementation complexity (higher = harder)
}

export function featurePriority(s: FeatureScore): number {
  return Math.round((s.impact * s.tokenAccrual) / s.effort * 10) / 10;
}

export interface RoadmapFeature {
  title: string;
  status: "implemented" | "in-development" | "proposed";
  category: "naming" | "identity" | "payments" | "governance" | "social" | "infrastructure";
  launchDate: string;
  sortDate?: string;
  howItWorks: string;
  details?: string;
  phases?: { title: string; body: string }[];
  audience: string;
  audienceTag: "end-users" | "investors" | "both";
  monetization?: {
    generatesRevenue: boolean;
    model?: string;
    beneficiary?: string;
  };
  builder?: string;
  builderLink?: string;
  openForBuilders?: boolean;
  links?: {
    github?: string;
    blogpost?: string;
    implementation?: string;
    twitter?: string;
    reference?: string;
  };
  whyItMatters?: string;
  demandVector?: ("websites" | "agents" | "payments" | "identity")[];
  dependsOn?: string[];
  unlocks?: string[];
  precedent?: string;
  precedentLink?: string;
  score?: FeatureScore;
}
```

---

## 5. Feature Card UI

### Collapsed Card
- Header: Title + Status Badge
- Meta badges: Launch Date, Audience Tag, Demand Vector
- Body: `howItWorks`, *Why It Matters*, Precedent link
- Monetization box (if configured)
- Action footer: **Open ↗** (`links.implementation`), Discuss, Track

### Expanded Modal (React Portal)
- Full `details` narrative
- Phase stepper (if `phases` present)
- Dependency pills (`dependsOn` / `unlocks`) with deep-link navigation
- Score panel: Impact / Token Accrual / Effort ratings + computed Priority score

---

## 6. Developer & Environment Rules

See [AGENTS.md](../AGENTS.md) for the full assistant ruleset.

- **Dev server**: `pnpm dev` — runs on port 3102.
- **Type check**: `pnpm run typecheck` (`tsc --noEmit`) — use this locally instead of building.
- **Production builds**: handled by Vercel CI only. **Never run `pnpm build` while the dev server is live.**
- **Verify script**: `pnpm run verify` — alias for `pnpm run typecheck`.
- **CI**: `.github/workflows/ci.yml` runs typecheck on every push and PR.
- **Deployment**: Vercel; production branch is `main`; PRs generate preview deployments.
