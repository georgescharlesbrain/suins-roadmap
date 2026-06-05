# Agent Guide for SuiNS Roadmap Website

This directory is a standalone Next.js app for the SuiNS roadmap website.
Treat it as an independent public repository, not as a normal Nexus wiki page.

## Commands

- Start the local dev server: `pnpm dev`
- Verify local changes: `pnpm run typecheck`
- Run the full local verification alias: `pnpm run verify`
- Check Vercel auth/deploy metadata: `npx vercel whoami` and `npx vercel inspect suins-roadmap.vercel.app`

## Build Gotcha

- Do not run `pnpm build` or `npm run build` during local development while a
  dev server is active. A production build writes into `.next/` and can delete
  or replace hot-reload chunks used by the running dev server.
- Use `pnpm run typecheck` locally. Let Vercel and GitHub CI run deployment
  builds.

## Architecture

- `src/app/` contains App Router routes:
  - `/`
  - `/roadmap`
  - `/products`
  - `/contributors`
- `src/components/` contains reusable UI sections and cards.
- `src/data/site.ts` is the source for hero, footer, catalog, and static site
  copy.
- `src/data/roadmap.ts` is the typed source of roadmap features.
- `docs/architecture.md` and `docs/design.md` contain the project spec and design system.

## Content Rules

- Keep public roadmap claims source-backed with links when possible.
- For product catalog entries, prefer real product URLs plus public X/GitHub
  links where verified.
- For contributor entries, use lowercase display names unless the user asks
  otherwise.

## GitHub And Vercel

- Public repository: `georgescharlesbrain/suins-roadmap`
- Vercel project: `suins-roadmap`
- Production URL: `https://suins-roadmap.vercel.app/`
- CI lives in `.github/workflows/ci.yml` and runs TypeScript checks.
- Uptime check lives in `.github/workflows/uptime.yml`.
- Link checker lives in `.github/workflows/link-check.yml`.
- Smoke tests live in `.github/workflows/smoke.yml`.
- Dependabot config lives in `.github/dependabot.yml`.
- Vercel security headers live in `vercel.json`.

## Git Hygiene

- Keep generated folders out of git: `.next`, `node_modules`, `.vercel`,
  `next-env.d.ts`, and `*.tsbuildinfo`.

