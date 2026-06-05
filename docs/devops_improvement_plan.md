# DevOps Improvement Plan

This plan tracks practical improvements for the SuiNS roadmap website repository,
GitHub setup, and Vercel deployment.

## Current Baseline

- Repository: `georgescharlesbrain/suins-roadmap`
- Default branch: `main`
- Branch protection: not enabled
- GitHub Actions: added a lightweight TypeScript CI workflow
- Dependency updates: added Dependabot config for npm and GitHub Actions
- Vercel project: `suins-roadmap`
- Vercel production deployment: ready
- Verification command: `pnpm run typecheck`

## Implemented In This Pass

- [x] Added `packageManager: pnpm@10.29.3` to `package.json`.
- [x] Replaced stale `lint` script with:
  - `typecheck`: `tsc --noEmit`
  - `verify`: `pnpm run typecheck`
- [x] Added GitHub Actions CI at `.github/workflows/ci.yml`.
- [x] Added Dependabot schedule at `.github/dependabot.yml`.
- [x] Added `vercel.json` security headers:
  - HSTS
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`

## GitHub Improvements

### High Priority

- [x] **Branch protection enabled on `main`.**
  - TypeScript CI check required to pass (strict).
  - Force pushes disabled.
  - Branch deletions disabled.
  - No required PR reviewers (single contributor; AI handles review).

- [~] Repository security features — **not needed for now.**
  - Dependabot is already configured for automated updates.
  - Additional secret scanning / push protection: skip until the repo scales.

- [~] Issue templates — **not wanted.** Ad-hoc issues are sufficient.

- [~] Pull request template — **not needed.** AI-generated PR summaries are sufficient.

### Medium Priority

- [ ] Add CodeQL or GitHub security scanning if the repository plan supports it.
- [ ] Add a scheduled link check for important outbound URLs.
- [ ] Add a scheduled typecheck so breakage is caught even without PR activity.
- [ ] Add labels for roadmap/content work:
  - `roadmap`
  - `product-catalog`
  - `contributors`
  - `docs`
  - `source-needed`
  - `devops`

## Vercel Improvements

### High Priority

- [x] **Canonical domain confirmed: `suins-roadmap.vercel.app`.**
  - No custom root domain will be attached.
  - Vercel subdomain is the public URL.

- [x] **Vercel Git integration confirmed.**
  - Production deploys only from `main`.
  - Pull requests create preview deployments.
  - Preview deployments are visible in GitHub PR checks.

- [x] **Build settings confirmed in Vercel dashboard.**
  - Framework preset: Next.js.
  - Install command: `pnpm install --frozen-lockfile`.
  - Build command: `pnpm run build`.
  - Output directory: Next.js default.

- [x] **Environment variables:** no private env vars needed.
  - Current app uses no server-side secrets.
  - Public API endpoints are embedded in client code where needed.

### Medium Priority

- [x] **Analytics enabled.**
  - `@vercel/analytics` package installed; `<Analytics />` added to `src/app/layout.tsx`.
  - Free on Vercel Hobby plan. To activate: Vercel dashboard → project → Analytics tab → Enable.
  - Speed Insights: not needed.

- [x] **Uptime check added.**
  - `.github/workflows/uptime.yml` — cron every 30 min, pings `suins-roadmap.vercel.app`, fails if HTTP ≥ 400.
  - Free via GitHub Actions. Failure shows up as a red workflow run in the Actions tab.

- [~] **Deployment notifications** — email only.
  - Requires Vercel dashboard: Settings → Notifications → email for deployment success/failure.
  - GitHub and Discord notifications: not wanted.

- [~] Runtime region — irrelevant. App is static; no server components or API routes.

## Repo Hygiene Improvements

- [x] Keep generated output out of git.
  - `.next`, `node_modules`, `.vercel`, `next-env.d.ts`, and `*.tsbuildinfo`
    are already ignored.

- [ ] Keep roadmap claims source-backed.
  - New roadmap entries should include at least one public source link unless
    explicitly marked as internal or speculative.

- [x] Keep docs current.
  - `docs/architecture.md` reflects the current three-page route structure.
  - `docs/review_plan.md` tracks claims needing verification.

- [x] Avoid local production builds during active dev-server sessions.
  - Use `pnpm run typecheck` locally.
  - Let Vercel and GitHub CI handle production builds.

## Monitoring And Quality

- [x] **Link checking added.**
  - `.github/workflows/link-check.yml` — runs every Sunday at 08:00 UTC via `lychee`.
  - Scans all URLs in `src/**/*.ts`, `src/**/*.tsx`, and `docs/**/*.md`.
  - Reports broken links as a failed workflow run; does not block deploys (`fail: false`).
  - Change `fail: true` once false positives are tuned.

- [ ] **Add visual regression checks later.**
  - Use screenshots for the homepage, roadmap page, product catalog, and
    contributors page.
  - Run only on PRs touching `src/app`, `src/components`, or `src/data`.

- [ ] **Add smoke tests later.**
  - Confirm `/`, `/roadmap`, `/products`, and `/contributors` render.
  - Confirm no page shows a Next.js runtime error.

## Items Requiring Dashboard Or Admin Access

These cannot be applied from code alone:

- [ ] GitHub branch protection rules.
- [ ] GitHub security feature toggles.
- [ ] Vercel build settings confirmation.
- [ ] Vercel analytics/speed insights enablement.
- [ ] Vercel team notification integrations.

## Suggested Next Order

1. [x] Merge the CI, Dependabot, Vercel headers, and documentation changes.
2. [x] Enable branch protection on `main` — TypeScript check required, force pushes disabled.
3. [x] Confirm Vercel production domain (`suins-roadmap.vercel.app`) and Git deployment settings.
4. [x] Confirm Vercel build settings in the dashboard.
5. [x] Add link checking — `.github/workflows/link-check.yml`, weekly on Sundays.
