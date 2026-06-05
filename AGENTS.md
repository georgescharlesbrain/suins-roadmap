# Agent Guide for SuiNS Roadmap Website

This directory contains the website frontend for the SuiNS Roadmap. Follow these project-specific guidelines when interacting with this codebase:

## 1. Running Commands

- **NEVER run `pnpm build` or `npm run build` during local development.** Building production files compiles production assets into `.next/`, which deletes or overwrites the dev server's active hot-reload chunks, resulting in `Error: Cannot find module './[chunk].js'` crash on the running dev server.
- **To test or run the server, ONLY run `pnpm dev`.**
- **To verify typescript correctness, run `npx tsc --noEmit`** instead of running a full build.

## 2. Vercel Project

- This is a Vercel project deployed from the main repository. Production deployments are triggered automatically via Git or manual Vercel CLI deployments.

## 3. Scope & Wiki Independence

- **Standalone Web Page**: This project is a standalone web application, not a standard wiki page or raw source document. It should be treated and referenced strictly as a web page.
- **Do Not Update Global Wiki Files**: The global wiki logs (`log.md`), global index (`index.md`), and main `README.md` at the repository root must **never** be updated or modified for modifications to this web page. The web page is self-contained and stands by itself.
- **Public GitHub Repository**: This codebase is hosted in a public GitHub repository at `georgescharlesbrain/suins-roadmap`.


