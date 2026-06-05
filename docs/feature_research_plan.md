---
lastSync: Fri Jun 05 2026 16:30:00 GMT+0300 (East Africa Time)
date: 2026-06-05
tags:
  - suins
  - research
  - features
  - plan
aliases:
  - Feature Research Plan
---

# Plan 2 — Feature Research (executed in steps)

## Context

The roadmap should not be limited to what the SuiNS team has already announced.
This is a **staged research plan** to mine proven naming-service features and
novel name-lookup use cases from the wider web — Web2 DNS, ENS (Ethereum), SNS
(Solana / `.sol`), and emerging AI-agent identity — and convert them into
candidate features for `roadmap.ts`. Execute one phase at a time; each phase has
a deliverable and sources.

> Goal: every candidate feature should help convince someone to **build** it or
> to **invest** in `$NS` (see [[card_improvement_plan]]).

## Execution sequence — what needs to be done

Strictly ordered. **No feature reaches the public site before Step 4.**

- [ ] **Step 0 — Build the rails (schema + preview flag).** Add `provenance` and
  `review` fields to `RoadmapFeature` in `roadmap.ts`; add the `usePreview()` gate
  to `RoadmapExplorer` / `FeatureCard` so review-pending items are hidden in
  production and shown with an "Idea — exploring" badge in dev or with `?preview=1`.
  Mechanical, no content decisions — do this **first** so every later candidate has
  a safe place to land. (Detail: [Tagging & review gate](#tagging--review-gate-how-new-features-enter).)
- [ ] **Step 1 — Cross-check FIRST (dedupe).** Before writing any research into the
  file, list the existing `roadmap.ts` features alongside the candidate table and
  map each candidate to either **(a)** an existing feature to *enrich*, or **(b)** a
  genuinely new card. Produce this mapping for review. **Nothing gets added until
  this map exists.** (Detail: [No-duplication rule](#tagging--review-gate-how-new-features-enter).)
- [ ] **Step 2 — Research (Phases 1–4).** Run one phase at a time; each yields raw
  findings + sources only — no site changes yet.
- [ ] **Step 3 — Per-feature evaluation (one task per feature).** For each surviving
  candidate, as its **own separate task**, score **impact × effort × token accrual**,
  write the card fields (`whyItMatters`, `tokenImpact`, `precedent`, `demandVector`),
  and land it review-pending. One feature = one focused task, not a batch.
- [ ] **Step 4 — You review → publish.** You read each draft (in dev / `?preview=1`),
  then flip `review` to verified (and `provenance` to `official` if confirmed real).

## Research phases

### Phase 1 — ENS (the reference implementation)
Catalogue the full ENS surface and ecosystem.
- Records & profiles: text records (avatar, socials, EAS attestations), multi-record writes.
- Primary names / reverse resolution (look an address up and get its name back).
- Subnames + subname marketplaces; the Name Wrapper.
- **Cheap, off-chain subnames at scale** — on Ethereum, storing every name's
  records on the main chain costs gas, so ENS keeps the data *off* the expensive
  chain and fetches it on demand with a proof (this is the "CCIP-Read" standard,
  EIP-3668) or stores it on a cheaper Layer-2 chain. That is how Coinbase gives
  out **millions of free `name.base.eth` subnames**. Records can be updated for
  free, instantly.
  - *Relevance to SuiNS:* Sui is already cheap and has no expensive main chain to
    escape, so we do **not** need to copy CCIP-Read literally. What we want is the
    *outcome* — the cheapest way to hand out **millions of free community
    subnames** at scale (directly powers [[card_improvement_plan|Communities]]).
- Universal Resolver; cross-chain resolution; Basenames (how Base uses ENS).
- ENS as login (Sign-In with Ethereum / SIWE), content hash → IPFS websites, DNSSEC import.
- Sources: docs.ens.domains, ens.domains/ecosystem/base, ENSIPs.

### Phase 2 — SNS / Solana (`.sol`)
- **Perpetual ownership** (single payment, no renewals) — contrast SuiNS renewals.
- **Tokenized subdomains** (wrap/unwrap as NFT) — tradable subnames.
- **Records v2 — typed records (HIGH PRIORITY).** A structured set of fields a
  name can hold: multi-chain addresses (BTC/ETH/SOL), socials (Twitter, Discord),
  a profile URL, avatar, etc. — instead of one flat blob. This is the most
  interesting transferable idea: it turns a `.sui` name into a real profile and
  the integration surface every wallet/app reads from.
  - *Sui note:* skip the IPFS / Arweave **content-storage** fields — on Sui that
    role belongs to **Walrus** (a `.sui` name points at a Walrus Site, not an IPFS
    hash). Keep the typed *identity/address/social* fields; drop the foreign
    storage pointers.
- Reverse lookup / primary domain; 150+ integrations; multi-language SDK + HTTP API.
- Sources: docs.sns.id, sns.guide.

### Phase 3 — Other naming services
- Web3: Unstoppable Domains, Space ID, Lens handles, Farcaster fnames, 3DNS, Bonfida.
- Web2: classic DNS, ICANN gTLD program, Handshake (HNS) for precedent on decentralised roots.
- Extract: monetization models, renewal vs perpetual, registrar economics, marketplaces.

### Phase 4 — Unique name-lookup use cases (where lookups actually get used)
- **Sign-In with Sui** (SIWE analog) — names as login/identity.
- **AI agents** — ERC-8004 agent identity registry + x402/AP2 agent payments; names as
  discoverable, payable agent handles. (Solana already ~65% of agentic x402 volume.)
- **Decentralised websites** — name → **Walrus Site** (on Sui, Walrus is the
  storage layer; no IPFS/Arweave).
- **Payments / stablecoins** — pay-to-name routing on the free-transfer rail.
- Social graphs, gaming identity, DeFi allowlists / NFT-gating by name, email/messaging,
  attestations / KYC, enterprise offchain subnames.

### Phase 5 — Synthesise (one task per feature)
This is **Step 3** of the execution sequence. Do **not** batch it. For **each**
surviving candidate, as its own focused task:
1. Score **impact × effort × token accrual** (1–5 each; note the reasoning).
2. Map to a roadmap status (implemented / in-dev / proposed).
3. Draft the card fields (`whyItMatters`, `tokenImpact`, `precedent`,
   `demandVector` per [[card_improvement_plan]]).
4. Land it in `roadmap.ts` review-pending, tagged per the gate below.

One feature = one task keeps each evaluation reviewable and reversible.

## Tagging & review gate (how new features enter)

Two new fields on `RoadmapFeature` separate vetted, public features from raw
AI-researched candidates:

```ts
/** Where it came from. */
provenance: "official" | "researched";
//  official   = announced/shipped by SuiNS — verified, safe to show
//  researched = AI candidate from this plan — NOT yet confirmed real

/** Review gate that controls public visibility. */
review: "verified" | "draft";
//  verified = checked & approved → renders in production
//  draft    = unevaluated → hidden in production
```

**Default for every feature I add from this plan:** `provenance: "researched",
review: "draft"`. It lives in `roadmap.ts` (easy to read/edit) but does **not**
ship to visitors until you flip `review` to `"verified"`.

**No duplication — improve before adding.** Before creating any new card, scan the
existing `roadmap.ts` features (especially the *proposed / Exploring* bucket) for
one that already covers the same idea. If found:
- **Enrich the existing feature** — add the missing `whyItMatters` / `tokenImpact`
  / `precedent` / better copy to it — rather than create a second card.
- Only add a **new** card when the candidate is genuinely a distinct feature.
- When in doubt about overlap, flag it for you instead of silently merging or
  duplicating. The roadmap should never show two cards describing the same thing.

**Preview mechanism (chosen):** drafts are **hidden in production** but **shown
with a distinct "Idea — exploring" badge** when:
- running locally (`pnpm dev`), or
- the URL carries `?preview=1`.

So you can eyeball candidates in the real UI before publishing, with zero risk of
an unvetted, AI-invented claim reaching the public promo site. Implementation
sketch: a `usePreview()` check (`NODE_ENV !== "production"` OR
`searchParams.has("preview")`) gates whether `review: "draft"` features are
filtered out; drafts that do render get the candidate badge.

## Initial candidate features (from research already done)

| Candidate | Source / precedent | Demand vector | Token angle |
| --- | --- | --- | --- |
| **Typed Records v2** (multi-chain addresses + socials + profile; *not* IPFS/Arweave — Walrus covers storage) **+ HTTP resolution API & multi-lang SDK** ⭐ | SNS (150+ integrations), ENS text records | all | More integrations → monopoly → fees |
| **Sign-In with Sui (SIWS)** | ENS + SIWE | identity | Names as login → utility demand |
| **Cheap free subnames at scale** | ENS off-chain / Base's free `.base.eth` | identity, social | Millions of free community subnames → more holders → more renewals & buybacks |
| **Tokenized / tradable subnames (wrap as NFT)** | SNS wrap/unwrap | social | Subname marketplace fees → treasury |
| **Agent identity + payments (names for AI agents)** | ERC-8004, x402, AP2 | agents | Millions of named, payable agents |
| **One-click name → Walrus Site (productise Walpress)** | Walrus Sites, Walpress | websites | Every site needs a name |
| **Cross-chain resolution (resolve .sui elsewhere)** | ENS universal resolver, SNS x SNS↔Sui portal | identity | Reach beyond Sui |
| **Pay-to-name on the free rail** | Sui free transfers + Hashi stablecoins | payments | Drives registrations + fee volume |
| **Perpetual-ownership premium tier** | SNS single-payment model | all | New pricing/revenue lever |

## Product showcase research (live "Built on SuiNS" catalog)
The site already renders a **"Built on SuiNS" catalog** on the frontend
(`site.showcase`). Phase 4 keeps harvesting **live products** to add to it.
Currently in the catalog: Slush, Suiscan, WAL-0, SuiMail, SuiSign, **Passki
(`sui.ski`)**, $NS Staking. (The earlier "Suiski" mystery is **resolved** — it was
**Passki / sui.ski**, now in the catalog.)

**Rule:** showcase products use the same review gate as features —
`provenance: "researched", review: "draft"` until you confirm the product is real
and actually uses `.sui`, then flip to `"verified"`. Only **live, verified**
products reach the public catalog; AI-found ones stay in preview until checked.

---
*Companion: [[card_improvement_plan]] (how to render these). Thesis: `site.ts`.*
