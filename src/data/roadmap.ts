/**
 * SuiNS roadmap content as typed data.
 *
 * This is the single, easily-editable source the website renders from. To add or change a
 * feature, edit the `roadmapFeatures` array below — no component changes needed.
 *
 * `howItWorks` is the always-visible summary; `details` and `phases` are
 * revealed when a card is expanded, so nothing from the roadmap is lost.
 */

export type RoadmapStatus = "implemented" | "in-development" | "proposed";

export type RoadmapCategory =
  | "naming"
  | "identity"
  | "payments"
  | "governance"
  | "social"
  | "infrastructure";

export type AudienceTag = "end-users" | "investors" | "both";

/** One stage of a multi-phase feature (e.g. the ICANN application). */
export interface RoadmapPhase {
  title: string;
  body: string;
}

/**
 * How a feature is rated. Each axis is 1–5.
 *  - impact:       how much it grows demand & users for .sui names
 *  - tokenAccrual: how directly it drives $NS value (fees → buyback & burn)
 *  - effort:       how hard it is to build (5 = hardest)
 * The headline Priority = impact × tokenAccrual ÷ effort (see `featurePriority`).
 */
export interface FeatureScore {
  impact: number;
  tokenAccrual: number;
  effort: number;
}

/**
 * Priority "bang for buck": high impact and token value raise it, high build
 * effort lowers it. Rounded to one decimal. Range ≈ 0.2 (1×1÷5) to 25 (5×5÷1).
 */
export function featurePriority(s: FeatureScore): number {
  return Math.round((s.impact * s.tokenAccrual) / s.effort * 10) / 10;
}

/** A single roadmap item rendered as a FeatureCard. */
export interface RoadmapFeature {
  title: string;
  status: RoadmapStatus;
  category: RoadmapCategory;
  /** Human-readable launch date, e.g. "August 2025" or "TBD". */
  launchDate: string;
  /** ISO-ish "YYYY-MM" used for chronological sort; omit for undated/TBD (sorts last). */
  sortDate?: string;
  /** Always-visible one/two sentence summary. */
  howItWorks: string;
  /** Fuller narrative, revealed on expand. */
  details?: string;
  /** Multi-stage breakdown, revealed on expand (rendered as a stepper). */
  phases?: RoadmapPhase[];
  /** Descriptive audience text (shown when expanded). */
  audience: string;
  /** Drives the colored audience pill. */
  audienceTag: AudienceTag;
  /** Does it generate revenue / how does value flow? Shown on every card that has it. */
  monetization?: {
    generatesRevenue: boolean;
    /** The model, e.g. "2.5% of each auction to treasury". */
    model?: string;
    /** Where value flows: "DAO treasury" | "community owner" | "partner". */
    beneficiary?: string;
  };
  /** Who is building it. */
  builder?: string;
  /** Link to builder's profile. */
  builderLink?: string;
  /** Whether the feature is open for developers (candidate for RFP). */
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
  /**
   * Where this feature came from. Absent ⇒ "official" (announced/shipped by SuiNS).
   * "researched" = AI-generated candidate from the feature-research plan, not yet
   * confirmed to be a real/planned SuiNS feature.
   */
  provenance?: "official" | "researched";
  /** Impact / token-accrual / effort rating (1–5 each); drives the Priority score. */
  score?: FeatureScore;
  /**
   * Public-visibility gate. Absent ⇒ "verified" (checked, safe to show).
   * "candidate" = unevaluated; hidden in production, shown only in dev or with
   * `?preview=1` (carries an "Idea — exploring" badge). Flip to "verified" to publish.
   */
  review?: "verified" | "candidate";
}

export const roadmapFeatures: RoadmapFeature[] = [
  // ---------------------------------------------------------------- Implemented
  {
    title: "Buyback & Burn",
    status: "implemented",
    score: { impact: 4, tokenAccrual: 5, effort: 2 },
    category: "governance",
    launchDate: "August 2025",
    sortDate: "2025-08",
    howItWorks:
      "80% of all protocol fees automatically buy $NS on the open market and burn it, permanently reducing supply.",
    details:
      "Protocol fees from domain registrations and renewals are used to purchase $NS from the open market. The purchased tokens are sent to the 0x0 Sui system burn address (which is steadily rising in the $NS holder ranks as tokens are burnt) and permanently removed from circulation — a continuous, on-chain deflationary mechanism that ties protocol usage directly to token scarcity.",
    audience: "NS investors looking for value accrual through a deflationary mechanism.",
    audienceTag: "investors",
    monetization: {
      generatesRevenue: false,
      model: "Spends 80% of protocol fees to buy & burn $NS",
      beneficiary: "NS holders (value accrual)",
    },
    builder: "SuiNS DAO / SuiNS Team",
    links: {
      implementation:
        "https://suiscan.xyz/mainnet/coin/0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178::ns::NS/holders",
    },
    whyItMatters: "Direct value accrual for NS holders via continuous open-market buybacks.",
    demandVector: ["identity"],
  },
  {
    title: "$NS Token & Staking for Voting",
    status: "implemented",
    score: { impact: 3, tokenAccrual: 4, effort: 3 },
    category: "governance",
    launchDate: "August 2025",
    sortDate: "2025-08",
    howItWorks:
      "Full on-chain, token-weighted DAO governance with staking rewards for active voters.",
    details:
      "Staking grants a 10% voting-power boost for every month tokens remain staked; tokens lock during the proposals they vote on. Active voters earn rewards drawn from 5% of the community treasury, aligning long-term holders with governance participation.",
    audience: "NS investors actively participating in DAO governance.",
    audienceTag: "investors",
    monetization: {
      generatesRevenue: false,
      model: "Distributes 5% of community treasury as voter rewards",
      beneficiary: "Active DAO voters",
    },
    builder: "SuiNS Team",
    links: {
      github: "https://github.com/MystenLabs/suins-contracts",
      blogpost: "https://blog.sui.io/suins-governance-voters-airdrop/",
      implementation: "https://vote.suins.io/",
      reference: "https://token.suins.io/",
    },
    whyItMatters: "Encourages long-term staking commitment and active governance participation.",
    demandVector: ["identity"],
  },
  {
    title: "Communities & Social Layer",
    status: "implemented",
    score: { impact: 5, tokenAccrual: 4, effort: 4 },
    category: "social",
    launchDate: "January 2026",
    sortDate: "2026-01",
    howItWorks:
      "Subnames (e.g. user@community.sui) that turn names into a social discovery layer for networking between holders.",
    details:
      "Community owners can issue subnames under their name, creating a namespace for their members and a social graph for discovery and networking. Revenue from subname sales is split between the community and the protocol.",
    audience: "End users networking through social connect, and DAO communities.",
    audienceTag: "both",
    monetization: {
      generatesRevenue: true,
      model: "Subname revenue split",
      beneficiary: "90% community owner / 10% DAO treasury",
    },
    builder: "Mysten Team",
    links: {
      implementation: "https://suins.io/communities",
      github:
        "https://github.com/MystenLabs/suins-contracts/compare/main...communities",
    },
    whyItMatters: "Generates network effects and revenue shares for custom namespace subnames.",
    demandVector: ["identity"],
  },
  {
    title: "Domain Expiration Alert (Pawtato)",
    status: "implemented",
    score: { impact: 2, tokenAccrual: 2, effort: 1 },
    category: "naming",
    launchDate: "June 2025",
    sortDate: "2025-06",
    howItWorks:
      "Alerts holders when a .sui domain is nearing expiration, via the Pawtato integration.",
    details:
      "A community-built integration that watches name expiry and notifies holders before their domains lapse, reducing accidental loss of names.",
    audience: "End users holding .sui names.",
    audienceTag: "end-users",
    builder: "SuiNS Community",
    links: { implementation: "https://pawtato.app/" },
  },

  // ----------------------------------------------------------- Under development
  {
    title: "Rich Profiles",
    status: "in-development",
    score: { impact: 5, tokenAccrual: 4, effort: 3 },
    category: "identity",
    launchDate: "September 2026",
    sortDate: "2026-09",
    howItWorks:
      "Linktree-style on-chain identity: attach social links, crosschain wallets, and custom avatars to a name.",
    details:
      "Names become extensible identity objects carrying metadata — socials, crosschain wallet addresses, avatars — functioning like a Linktree for on-chain identity. The system is extensible for apps (e.g. KYC) and supports generating profile pages published to walrus.site.",
    audience: "End users seeking verifiable and extensible identity.",
    audienceTag: "end-users",
    builder: "Lead Partner: Nexa (product design by Mysten)",
    builderLink: "https://x.com/nexaxyz",
    links: {
      implementation: "https://suiscan.xyz/mainnet/account/@shaan/activity",
      reference:
        "https://notion.sui.io/SuiNS-RFP-Program-19637af41c6e80b69a3df24132b48458",
    },
    whyItMatters: "Establishes .sui profiles as the central identity standard across the Sui app ecosystem.",
    demandVector: ["identity"],
  },
  {
    title: "Native Auction Service",
    status: "in-development",
    score: { impact: 3, tokenAccrual: 4, effort: 3 },
    category: "payments",
    launchDate: "August 2026",
    sortDate: "2026-08",
    howItWorks:
      "Christie's-style, time-based auctions for domains — bid, set reserves, get offer notifications, and watch names.",
    details:
      "A native marketplace for premium names with time-based auctions: users can place bids, set reserve pricing, receive offer notifications, and add names to a watchlist. A protocol fee is taken on every settled auction.",
    audience: "NS investors trading premium .sui names.",
    audienceTag: "investors",
    monetization: {
      generatesRevenue: true,
      model: "2.5% of each auction",
      beneficiary: "DAO treasury",
    },
    builder: "Lead Partner: Buidly",
    builderLink: "https://x.com/buidly_",
    links: { github: "https://github.com/buidly/suins-contracts" },
    whyItMatters: "Monetizes premium domain transfers, generating ongoing protocol fee revenue.",
    demandVector: ["payments"],
    precedent: "ENS Auction Service",
    precedentLink: "https://docs.ens.domains/",
  },
  {
    title: "Messaging",
    status: "in-development",
    score: { impact: 4, tokenAccrual: 3, effort: 4 },
    category: "social",
    launchDate: "TBD",
    howItWorks:
      "Secure, immutable wallet-to-wallet messaging with anonymous first contacts — and a targeted-ads platform.",
    details:
      "Wallet-to-wallet messaging that allows anonymous first contacts. Users can send free messages to their followers, or use $NS tokens for fees and spam prevention (recipients can filter messages by fee value). The same rails double as a platform for projects to run targeted ads to relevant users.",
    audience: "End users seeking wallet-to-wallet communication & Web3-native advertisers.",
    audienceTag: "both",
    monetization: {
      generatesRevenue: true,
      model: "$NS message fees + targeted advertising",
      beneficiary: "Protocol / advertisers",
    },
    builder: "Developers (e.g. @DanTheMan8300, @chatiwal_sui)",
    openForBuilders: true,
    links: {
      reference:
        "https://notion.sui.io/SuiNS-RFP-Program-19637af41c6e80b69a3df24132b48458",
    },
    whyItMatters: "Utilizes $NS token as a messaging spam barrier and unlocks ad monetization.",
    demandVector: ["agents", "identity"],
    precedent: "XMTP Wallet Messaging",
    precedentLink: "https://xmtp.org/",
  },
  {
    title: "ICANN Sui Application",
    status: "in-development",
    score: { impact: 5, tokenAccrual: 3, effort: 5 },
    category: "infrastructure",
    launchDate: "2026 (delegation target 2027–2028)",
    sortDate: "2026-04",
    howItWorks:
      "Bring .sui into the global DNS root so it resolves natively in every browser and legacy DNS resolver.",
    details:
      "Achieving ICANN root-level recognition means .sui transitions from a blockchain-only domain to a globally resolved TLD within the classic DNS. (1) SuiNS operates as a 'Registry' following ICANN's technical standards (DNS over TLS, EPP). (2) Once approved, ICANN adds .sui to the DNS Root Zone. (3) Every DNS server in the world (e.g. Google 8.8.8.8, Cloudflare 1.1.1.1) learns to find the SuiNS authoritative name server. (4) A Web2/Web3 bridge translates on-chain identity into standard DNS records (A, AAAA, TXT) in real time.",
    phases: [
      {
        title: "Compliance & RSP Selection",
        body: "Secure a pre-evaluated Registry Service Provider (RSP) and align with ICANN's technical standards (DNSSEC/EPP).",
      },
      {
        title: "Formal Application — Apr 30, 2026",
        body: "Submission window opens for the New gTLD Program: Next Round. Applications must be completed via the TAMS platform by August 12, 2026.",
      },
      {
        title: "Reveal & Initial Evaluation",
        body: "ICANN initiates 'Reveal Day' (~October 2026) and begins rigorous technical and financial evaluations.",
      },
      {
        title: "Root Zone Delegation",
        body: "Successful strings move to delegation, bringing .sui to the global DNS root (target: late 2027 or 2028).",
      },
    ],
    audience: "End users and the whole ecosystem — global identity integration.",
    audienceTag: "both",
    builder: "SuiNS Team",
    whyItMatters: "Bridges .sui into standard legacy browsers, expanding market reach massively.",
    demandVector: ["websites"],
    unlocks: ["DNS Name Import (DNSSEC Bridge)"],
  },
  {
    title: "Network Convergence",
    status: "in-development",
    score: { impact: 3, tokenAccrual: 2, effort: 4 },
    category: "infrastructure",
    launchDate: "2026",
    sortDate: "2026-06",
    howItWorks:
      "Alignment with the unified Sui developer platform (Sui S2), plus potential native private transfers using names.",
    details:
      "Sui S2 Convergence: alignment with the unified Sui developer platform. Private Transactions: potential integration of native private transfers using names as identifiers.",
    audience: "Developers and end users across the Sui platform.",
    audienceTag: "both",
    builder: "SuiNS Team",
  },

  // ------------------------------------------------------------------- Proposals
  {
    title: "Slush Wallet: Direct Purchase",
    status: "proposed",
    score: { impact: 5, tokenAccrual: 4, effort: 2 },
    category: "payments",
    launchDate: "April 2026 (proposed)",
    sortDate: "2026-04",
    howItWorks:
      "Buy SuiNS names natively inside the Slush wallet, streamlining onboarding and registration.",
    details:
      "Native in-wallet purchase of SuiNS names within Slush. By capitalizing on free stablecoin transfers and Hashi BTC-backed stablecoins, SuiNS simplifies high-volume transfers by replacing complex wallet addresses with human-readable .sui names, driving Slush adoption.",
    audience: "End users onboarding to Sui.",
    audienceTag: "end-users",
    builder: "TBD",
    whyItMatters: "Reduces registration friction by embedding name registration directly in the wallet.",
    demandVector: ["payments"],
    dependsOn: ["Contact-Based Friend Discovery"],
  },
  {
    title: "Delegated Staking",
    status: "proposed",
    score: { impact: 2, tokenAccrual: 2, effort: 2 },
    category: "governance",
    launchDate: "TBD",
    howItWorks:
      "Assign the voting power of staked/locked NS to a delegate while keeping your own voting rewards.",
    details:
      "Lets holders delegate the voting power of their staked or locked NS tokens to a trusted SuiNS delegate, enabling passive participation in DAO governance without surrendering voting rewards.",
    audience: "NS investors wanting to passively participate in governance through trusted proxies.",
    audienceTag: "investors",
    builder: "TBD",
  },
  {
    title: "Temporary Premium Auction",
    status: "proposed",
    score: { impact: 3, tokenAccrual: 3, effort: 2 },
    category: "payments",
    launchDate: "TBD",
    howItWorks:
      "Temporary premium pricing on expired names to stop bots sniping value — capturing it for the DAO instead.",
    details:
      "A mechanism to prevent bots from sniping valuable domains the instant they expire. Premium pricing forces highly-motivated buyers to pay more, capturing that value for the SuiNS DAO instead of bot operators.",
    audience: "NS investors looking to acquire expired premium domains.",
    audienceTag: "investors",
    monetization: {
      generatesRevenue: true,
      model: "Temporary premium pricing on expired domains",
      beneficiary: "DAO treasury",
    },
    builder: "TBD",
  },
  {
    title: "SuiPlay0x1 Integration (Gaming Identity)",
    status: "proposed",
    score: { impact: 4, tokenAccrual: 3, effort: 3 },
    category: "identity",
    launchDate: "TBD",
    howItWorks:
      "Use SuiNS names as the primary gaming identity across SuiPlay0x1 titles and ecosystems.",
    details:
      "Native integration making a SuiNS name a gamer's primary identity across SuiPlay0x1 titles and the broader Sui gaming ecosystem.",
    audience: "End users and gamers on the Sui ecosystem.",
    audienceTag: "end-users",
    builder: "TBD",
  },
  {
    title: "DNS Name Import (DNSSEC Bridge)",
    status: "proposed",
    score: { impact: 4, tokenAccrual: 3, effort: 4 },
    category: "identity",
    launchDate: "TBD (target 2027, post-ICANN Phase 1)",
    sortDate: "2027-01",
    howItWorks:
      "Import an existing Web2 domain (e.g. acme.com) into SuiNS via DNSSEC, with no .sui purchase required.",
    details:
      "The ENS precedent: ENS has supported DNS Name Import since 2019. An owner of acme.com adds a TXT record (e.g. _ens.acme.com → a=0x...); a resolver verifies it on-chain via DNSSEC proof oracles and mints a non-transferable record linking acme.com to a Sui wallet, usable as a primary SuiNS identity (refreshable/revocable by re-verifying DNS control). Why it matters: the ICANN application brings .sui into the DNS root; DNS Name Import is the reverse direction — bringing legacy Web2 domains into SuiNS — together forming a true bidirectional Web2/Web3 identity bridge. This makes SuiNS relevant to any brand or creator that already owns a domain, without rebranding.",
    audience: "Web2 brands, developers, and creators who already own a domain.",
    audienceTag: "end-users",
    builder: "TBD — candidate for RFP",
    openForBuilders: true,
    links: { reference: "https://docs.ens.domains/dns-registrar" },
    whyItMatters: "Onboards millions of legacy Web2 domains without forcing domain rebrands.",
    demandVector: ["identity"],
    dependsOn: ["ICANN Sui Application"],
    precedent: "ENS DNS SEC Import (live since 2019)",
    precedentLink: "https://docs.ens.domains/dns-registrar",
  },
  {
    title: "Contact-Based Friend Discovery",
    status: "proposed",
    score: { impact: 4, tokenAccrual: 3, effort: 4 },
    category: "social",
    launchDate: "TBD (target Q3 2026)",
    sortDate: "2026-07",
    howItWorks:
      "Privacy-preserving contact sync that surfaces which of your contacts are already on Sui — a 'People You May Know' for payments.",
    details:
      "Turns SuiNS into a global social graph by linking real-world identifiers (phone/email) to on-chain identities. One-time permitted sync: the wallet reads the device contact list, normalizes identifiers (E.164 for phones), and hashes each one locally (SHA-256 with a protocol-wide salt) — raw contacts are never uploaded. It then queries the SuiNS registry for profile objects storing matching hashes, surfacing a 'People You May Know' list pairing the device contact name with a verified .sui handle. A 'Quick Add' links the contact to their name for one-tap social payments, and an invitation loop (SMS/email, optional gas subsidy) onboards contacts not yet on Sui. Privacy is institutional-grade: users are invisible by default and must explicitly 'Enable Discovery' (by phone, email, both, or neither); the backend stores no mapping between hashes and raw identifiers.",
    audience: "End users making social payments.",
    audienceTag: "end-users",
    builder: "TBD",
    whyItMatters: "Dramatically boosts transaction frequency by surfacing friends via device contacts.",
    demandVector: ["payments", "identity"],
    unlocks: ["Slush Wallet: Direct Purchase"],
    precedent: "Signal Contact Sync / ENS Social Graphs",
    precedentLink: "https://signal.org/blog/contact-discovery/",
  },
  // ============================================================================
  // RESEARCHED CANDIDATES (review-pending) — from docs/feature_research_plan.md
  // ----------------------------------------------------------------------------
  // All tagged provenance:"researched", review:"candidate": HIDDEN in production,
  // visible only in `pnpm dev` or at ?preview=1 (with an "Idea — exploring" badge).
  // Each carries a // SCORE: impact × effort × token-accrual (1–5) note from the
  // Step-3 evaluation. Flip review→"verified" to publish; delete freely.
  // ============================================================================

  // SCORE: impact 5 × effort 3 × token-accrual 4 — integrations deepen the moat.
  // Cross-check: distinct from "Rich Profiles" (end-user identity object). This is
  // the developer-facing READ layer — one API/SDK so every app resolves .sui the
  // same way. Reframed from the original "Typed Records v2" seed to avoid dup.
  {
    title: "Universal Resolution API & SDK",
    status: "proposed",
    score: { impact: 5, tokenAccrual: 4, effort: 3 },
    category: "infrastructure",
    launchDate: "TBD",
    provenance: "researched",
    review: "verified",
    howItWorks:
      "One simple API and multi-language SDK so any app — on Sui or off — can look up a .sui name and read its addresses, socials, and avatar the same way.",
    details:
      "Today every app integrates SuiNS its own way. A standardized resolution API plus SDKs (TypeScript, Rust, Python, Go) and a typed-record schema make a .sui name trivial to read anywhere — multi-chain addresses, socials, profile URL, avatar. This is the layer that turned Solana's SNS into 150+ integrations: the easier it is to resolve a name, the more apps adopt it. Website content stays on Walrus; this serves identity and address data.",
    audience: "Developers integrating .sui resolution into wallets, explorers, and apps.",
    audienceTag: "both",
    whyItMatters:
      "Every new integration makes .sui the default to read and harder to displace — integrations are the moat.",
    demandVector: ["identity", "payments"],
    dependsOn: ["Rich Profiles"],
    precedent: "SNS Records v2 & SDK (150+ integrations), ENS text records",
    precedentLink: "https://github.com/SolanaNameService/sns-sdk",
  },

  // SCORE: impact 4 × effort 2 × token-accrual 3 — utility demand, low build.
  {
    title: "Sign-In with Sui",
    status: "proposed",
    score: { impact: 4, tokenAccrual: 3, effort: 2 },
    category: "identity",
    launchDate: "TBD",
    provenance: "researched",
    review: "verified",
    howItWorks:
      "Log in to any app with your .sui name instead of an email and password — one wallet signature proves who you are.",
    details:
      "A 'Sign-In with Sui' standard (modeled on Sign-In with Ethereum / EIP-4361) lets apps authenticate users by a wallet signature tied to their .sui name. The name becomes your portable login across every Sui app — no passwords, no per-app accounts — and your profile travels with you. Every app that adopts it is another place your name is required.",
    audience: "Developers wanting passwordless login; end users tired of accounts.",
    audienceTag: "both",
    whyItMatters:
      "Login is the highest-frequency reason to need a name — it turns .sui into everyday utility, not just a payment handle.",
    demandVector: ["identity"],
    precedent: "Sign-In with Ethereum (EIP-4361), used across the ENS ecosystem",
    precedentLink: "https://docs.login.xyz/",
  },

  // SCORE: impact 4 × effort 4 × token-accrual 4 — scales Communities cheaply.
  // Cross-check: enhances existing "Communities & Social Layer" (the mechanism,
  // not a second social product) — links via dependsOn.
  {
    title: "Free Subnames at Scale",
    status: "proposed",
    score: { impact: 4, tokenAccrual: 4, effort: 4 },
    category: "infrastructure",
    launchDate: "TBD",
    provenance: "researched",
    review: "verified",
    howItWorks:
      "Let a community hand out millions of free subnames (you@community.sui) cheaply, without a costly on-chain write for each one.",
    details:
      "On Ethereum, Coinbase issues millions of free name.base.eth subnames by keeping the data off the expensive main chain (the CCIP-Read pattern) — cb.id passed 11M+ registrations. Sui is already cheap, so SuiNS doesn't need that exact trick, but the goal transfers: the cheapest possible way to issue and update huge volumes of community subnames. This is what makes the Communities layer scale to millions of members.",
    audience: "Community owners onboarding members; end users getting a free handle.",
    audienceTag: "both",
    whyItMatters:
      "Free subnames are the top-of-funnel: every member who claims one becomes a future renewer and a node in the social graph.",
    demandVector: ["identity", "payments"],
    dependsOn: ["Communities & Social Layer"],
    precedent: "Coinbase base.eth subnames via ENS CCIP-Read (11M+ via cb.id)",
    precedentLink: "https://ens.domains/ecosystem/base",
  },

  // SCORE: impact 3 × effort 3 × token-accrual 4 — new marketplace fee surface.
  // Cross-check: complements "Native Auction Service" (premium .sui names) and
  // "Communities" (subnames) — this makes SUBnames themselves tradable assets.
  {
    title: "Tradable Subnames (NFT wrap)",
    status: "proposed",
    score: { impact: 3, tokenAccrual: 4, effort: 3 },
    category: "naming",
    launchDate: "TBD",
    provenance: "researched",
    review: "verified",
    howItWorks:
      "Turn a subname into a tradable NFT so it can be sold or transferred, then unwrapped back to a normal name — opening a subname marketplace.",
    details:
      "Solana's SNS lets holders 'wrap' a domain into an NFT and 'unwrap' it back, making names tradable on any NFT marketplace. Applying this to .sui subnames makes premium subnames (e.g. ceo@startup.sui) liquid assets, with a protocol fee on each trade flowing to the DAO treasury — extending the Native Auction model from top-level names down to subnames.",
    audience: "NS investors and communities trading premium subnames.",
    audienceTag: "investors",
    monetization: {
      generatesRevenue: true,
      model: "Protocol fee on each subname trade",
      beneficiary: "DAO treasury",
    },
    whyItMatters:
      "Turns every valuable subname into a fee-generating, tradable asset — more sales, more buyback fuel.",
    demandVector: ["identity"],
    dependsOn: ["Communities & Social Layer"],
    precedent: "SNS tokenized subdomains (wrap/unwrap as NFT)",
    precedentLink: "https://docs.sns.id/collection/sns-v2/manage-your-domains",
  },

  // SCORE: impact 5 × effort 3 × token-accrual 5 — the agent land-grab, on thesis.
  {
    title: "Agent Identity & Payments",
    status: "proposed",
    score: { impact: 5, tokenAccrual: 5, effort: 3 },
    category: "identity",
    launchDate: "TBD",
    provenance: "researched",
    review: "verified",
    howItWorks:
      "Give every AI agent a .sui name as its identity and payment address, so agents can find and pay each other in stablecoins.",
    details:
      "AI agents are getting on-chain wallets and paying each other automatically — Coinbase's x402 agent-payment protocol surged over 10,000% in late 2025, and ERC-8004 gives each agent a registered on-chain identity. Every agent needs a discoverable, human-readable, payable handle, and a .sui name is exactly that. The agent economy is a naming land-grab: millions of named, addressable, payable agents — each a registration and renewal.",
    audience: "Agent developers; investors betting on the agent economy.",
    audienceTag: "both",
    whyItMatters:
      "Agents could outnumber humans as name holders — the single biggest source of new registrations on the thesis.",
    demandVector: ["agents", "payments"],
    precedent: "ERC-8004 agent identity + Coinbase x402 agent payments",
    precedentLink: "https://eips.ethereum.org/EIPS/eip-8004",
  },

  // SCORE: impact 4 × effort 3 × token-accrual 4 — activates the websites vector.
  {
    title: "One-Click Walrus Site",
    status: "proposed",
    score: { impact: 4, tokenAccrual: 4, effort: 3 },
    category: "infrastructure",
    launchDate: "TBD",
    provenance: "researched",
    review: "verified",
    howItWorks:
      "Buy a .sui name and point it at a decentralized website in one flow — your site goes live at your-name.wal.app with no host or server.",
    details:
      "A Walrus Site stores its files on Walrus with ownership on Sui, and needs a SuiNS name to get a human-readable URL (your-name.wal.app). Today that's a multi-step CLI process. Productizing it — register a name and publish a site in one guided flow (see WAL-0's AI builder) — makes every new website a reason to buy a name. No host, no server, nothing to take down.",
    audience: "Creators and builders who want an unstoppable website.",
    audienceTag: "end-users",
    whyItMatters:
      "Turns the 'websites' demand vector into a product: every decentralized site needs a .sui name as its address.",
    demandVector: ["websites"],
    builder: "TBD — candidate for RFP",
    openForBuilders: true,
    links: { reference: "https://wal-0.commandoss.com/" },
    precedent: "Walrus Sites (Mysten) — SuiNS name → wal.app URL",
    precedentLink: "https://docs.wal.app/docs/walrus-sites/intro",
  },

  // SCORE: impact 3 × effort 4 × token-accrual 3 — reach beyond Sui.
  // Cross-check: distinct from "DNS Name Import" (Web2 → SuiNS). This is the
  // reverse-ish: making .sui resolvable from OTHER chains/clients.
  {
    title: "Cross-Chain Resolution",
    status: "proposed",
    score: { impact: 3, tokenAccrual: 3, effort: 4 },
    category: "infrastructure",
    launchDate: "TBD",
    provenance: "researched",
    review: "verified",
    howItWorks:
      "Let apps on other chains resolve a .sui name, so a SuiNS handle works as an identity beyond Sui itself.",
    details:
      "ENS built a 'universal resolver' so .eth names resolve across L2s and clients. The same idea lets a .sui name be looked up from other ecosystems and multi-chain wallets — so a holder's identity and addresses follow them everywhere, not just inside Sui. More places a name resolves means more reasons to own one.",
    audience: "Multi-chain wallets and apps; cross-chain users.",
    audienceTag: "both",
    whyItMatters:
      "A name that only works on one chain is a smaller market — resolving everywhere widens the addressable demand.",
    demandVector: ["identity", "payments"],
    precedent: "ENS Universal Resolver / cross-chain resolution",
    precedentLink: "https://docs.ens.domains/resolvers/ccip-read/",
  },

  // SCORE: impact 3 × effort 2 × token-accrual 3 — new pricing lever; weigh vs burn.
  {
    title: "Perpetual-Ownership Tier",
    status: "proposed",
    score: { impact: 3, tokenAccrual: 3, effort: 2 },
    category: "naming",
    launchDate: "TBD",
    provenance: "researched",
    review: "verified",
    howItWorks:
      "An optional pay-once tier where a premium name is owned forever with no renewals — for holders who want certainty.",
    details:
      "Solana's SNS sells names on a single-payment, own-forever model (no renewals). SuiNS runs on renewals (which feed the buyback-and-burn), so a perpetual tier would be an optional premium upsell — a large one-time fee, priced to match expected lifetime renewals, for buyers who want permanence. A new revenue lever to weigh against the recurring-fee flywheel.",
    audience: "NS investors and brands wanting permanent ownership.",
    audienceTag: "investors",
    monetization: {
      generatesRevenue: true,
      model: "One-time premium fee in lieu of renewals",
      beneficiary: "DAO treasury / buyback",
    },
    whyItMatters:
      "Captures buyers who refuse renewal risk — new revenue without weakening the renewal base.",
    demandVector: ["identity"],
    precedent: "SNS perpetual ownership (pay once, no renewals)",
    precedentLink: "https://docs.sns.id/",
  },
];

export function getFeatureSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
