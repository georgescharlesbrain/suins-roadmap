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
  score?: FeatureScore;
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
      "Protocol fees periodically buy $NS; 80% of the purchased tokens are burned and 20% flows to the DAO treasury.",
    details:
      "Fees from name registrations and renewals paid in SUI or USDC are periodically aggregated and used to market-buy $NS. From those purchased tokens, 80% is burned and 20% is retained by the DAO treasury; when users pay directly in $NS, the same 80/20 burn-and-treasury split applies. Burned tokens are sent to the 0x0 Sui system account and permanently removed from circulation, tying protocol usage directly to token scarcity while still funding ecosystem initiatives.",
    audience: "NS investors looking for value accrual through a deflationary mechanism.",
    audienceTag: "investors",
    monetization: {
      generatesRevenue: false,
      model: "80% of protocol-fee value burns $NS; 20% goes to treasury",
      beneficiary: "NS holders + DAO treasury",
    },
    builder: "juzybits / SuiNS DAO",
    builderLink: "https://x.com/juzybits",
    links: {
      github: "https://github.com/MystenLabs/suins-contracts/pull/332",
      implementation:
        "https://suiscan.xyz/mainnet/coin/0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178::ns::NS/holders",
      reference: "https://polymedia.app/",
    },
    whyItMatters: "Direct value accrual for NS holders via continuous open-market buybacks.",
    demandVector: ["identity"],
  },
  {
    title: "$NS Token & Staking for Voting",
    status: "implemented",
    score: { impact: 3, tokenAccrual: 4, effort: 3 },
    category: "governance",
    launchDate: "November 2024",
    sortDate: "2024-11",
    howItWorks:
      "Full on-chain, token-weighted DAO governance with staking rewards for active voters.",
    details:
      "The NS token launched in November 2024 as SuiNS' governance layer. Each NS token used in voting counts as one vote, and token locking increases voting power so long-term holders can amplify their governance weight. Active voters earn rewards from the 5% total NS supply allocation reserved for governance voting rewards, aligning long-term holders with proposal participation.",
    audience: "NS investors actively participating in DAO governance.",
    audienceTag: "investors",
    monetization: {
      generatesRevenue: false,
      model: "Distributes the 5% governance-reward allocation to voters",
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
    launchDate: "April 2026",
    sortDate: "2026-04",
    howItWorks:
      "Claiming a community subname turns a holder into an on-chain community member, adding social and holdings signal to the community graph.",
    details:
      "Anyone with a SuiNS name can create a community and issue subnames under that name. Claiming a subname makes a user part of the community on-chain, contributing to real-time holdings, demographics, and social signal for discovery across Sui. Revenue from paid community memberships is split between the community owner and SuiNS.",
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
    links: { implementation: "https://pawtato.app/board/notifications" },
  },
  {
    title: "Free Stablecoin Transfers on Sui",
    status: "implemented",
    score: { impact: 5, tokenAccrual: 3, effort: 1 },
    category: "payments",
    launchDate: "May 2026",
    sortDate: "2026-05",
    howItWorks:
      "Supported stablecoins can move peer-to-peer on Sui with $0.00 transfer fees and no separate SUI gas balance.",
    details:
      "Sui launched protocol-level gasless stablecoin transfers on mainnet, allowing users and businesses to send supported stablecoins without holding SUI for gas. For SuiNS, this strengthens the payments demand loop: when stablecoin transfers become free and easy, human-readable .sui payment handles become more valuable.",
    audience: "End users, payment apps, enterprises, and AI agents using stablecoins on Sui.",
    audienceTag: "both",
    monetization: {
      generatesRevenue: false,
      model: "Network-level payment rail that drives demand for readable payment handles",
      beneficiary: "Sui users and SuiNS name holders",
    },
    builder: "Sui Foundation / Mysten Labs",
    links: {
      implementation: "https://www.sui.io/payments",
      blogpost: "https://blog.sui.io/sui-launches-gasless-stablecoin-transfers/",
      reference: "https://www.sui.io/payments",
    },
    whyItMatters: "Free stablecoin transfers make .sui names more useful as everyday payment handles.",
    demandVector: ["payments", "agents"],
  },

  // ----------------------------------------------------------- Under development
  {
    title: "Rich Profiles",
    status: "in-development",
    score: { impact: 5, tokenAccrual: 4, effort: 3 },
    category: "identity",
    launchDate: "August 2026",
    sortDate: "2026-08",
    howItWorks:
      "Linktree-style on-chain identity: attach social links, crosschain wallets, and custom avatars to a name.",
    details:
      "Names become extensible identity objects carrying metadata: profile information, social links, crosschain wallet addresses, avatars, and app-added key/value pairs such as KYC attestations. The RFP scope includes protocol, contract, SDK, RPC, NFT, frontend, and documentation updates, plus dynamic Walrus Site generation modules for profile pages.",
    audience: "End users seeking verifiable and extensible identity.",
    audienceTag: "end-users",
    builder: "Lead Partner: Nexa (product design by Mysten)",
    builderLink: "https://x.com/nexaxyz",
    links: {
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
    launchDate: "September 2026",
    sortDate: "2026-09",
    howItWorks:
      "Christie's-style, time-based auctions for domains — bid, set reserves, get offer notifications, and watch names.",
    details:
      "A native marketplace for premium names with time-based auctions. Users can list names for a defined period, set reserve pricing, bid on names even when they are not currently listed, explore categories, review complete name history, receive offer notifications, and watch names so they are alerted when a watched name enters auction. A protocol fee is taken on every settled auction.",
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
      "Wallet-to-wallet messaging that allows anonymous first contacts. Users can send free messages to wallets that follow them, or pay a fee in $NS to contact any wallet. Recipients can filter or ignore messages below a chosen $NS value, see received messages, reply through a Web UI, and receive new-message alerts in wallets and apps. The same rails double as infrastructure for incentivized, targeted ads to relevant users.",
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
    dependsOn: ["Rich Profiles", "Contact-Based Friend Discovery"],
    precedent: "XMTP Wallet Messaging",
    precedentLink: "https://xmtp.org/",
  },
  {
    title: "SubnameCap Delegation",
    status: "in-development",
    score: { impact: 4, tokenAccrual: 3, effort: 3 },
    category: "infrastructure",
    launchDate: "TBD",
    sortDate: "2026-02",
    howItWorks:
      "Let a parent .sui name owner delegate controlled subname-creation rights without transferring the parent name NFT.",
    details:
      "The proposed SubnameCap capability would let a holder create a transferable permission object for a specific parent domain. The cap can allow leaf or node subname creation, set usage limits, duration limits, and expiration, and can be revoked by the parent name holder. It is designed to stay valid across normal domain transfers but automatically fail if the parent name expires and is re-registered with a new NFT ID.",
    audience: "Community owners, marketplaces, organizations, and builders managing subname programs.",
    audienceTag: "both",
    builder: "SuiNS contributors",
    links: {
      github: "https://github.com/MystenLabs/suins-contracts/issues/363",
      reference: "https://github.com/MystenLabs/suins-contracts/issues/363",
    },
    whyItMatters: "Delegated subname creation makes communities and marketplaces practical without handing over the parent name.",
    demandVector: ["identity"],
    dependsOn: ["Communities & Social Layer"],
  },
  {
    title: "1-2 Character Subnames",
    status: "in-development",
    score: { impact: 3, tokenAccrual: 3, effort: 1 },
    category: "naming",
    launchDate: "TBD",
    sortDate: "2026-02",
    howItWorks:
      "Allow short subnames like a.example.sui and zk.example.sui under parent domains.",
    details:
      "SuiNS currently enforces a 3-character minimum for subname labels through the subdomain config, even though short subnames live inside an already-owned parent namespace. The proposed change lowers the default minimum subname label length from 3 to 1, aligning subname policy more closely with ENS-style subdomain behavior while preserving the separate scarcity policy for top-level registrations.",
    audience: "Community owners and end users who want compact handles under a parent name.",
    audienceTag: "both",
    builder: "SuiNS contributors",
    links: {
      github: "https://github.com/MystenLabs/suins-contracts/issues/366",
      reference: "https://github.com/MystenLabs/suins-contracts/issues/366",
    },
    whyItMatters: "Short subnames make community handles more desirable, memorable, and useful for identity.",
    demandVector: ["identity"],
    dependsOn: ["Communities & Social Layer"],
    precedent: "ENS subnames do not require the .eth registrar's 3-character minimum",
    precedentLink: "https://docs.ens.domains/wrapper/usecases/",
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
    title: "Sui S2 Stack",
    status: "in-development",
    score: { impact: 3, tokenAccrual: 2, effort: 4 },
    category: "infrastructure",
    launchDate: "2026",
    sortDate: "2026-06",
    howItWorks:
      "Sui's evolution from a standalone L1 into a full-stack app platform, with SuiNS as the native naming and identity layer.",
    details:
      "The Sui S2 Stack is the broader move toward a coherent full-stack developer platform rather than a collection of disconnected primitives. Sui's official stack narrative brings storage, execution, identity, privacy, liquidity, messaging, and agent workflows into one composable system. SuiNS fits into that stack as the human-readable identity, naming, and discovery layer for apps, wallets, agents, and payments.",
    audience: "Developers and end users across the Sui platform.",
    audienceTag: "both",
    builder: "SuiNS Team",
    links: {
      blogpost: "https://blog.sui.io/from-apps-to-composable-systems/",
      reference: "https://docs.sui.io/",
    },
    whyItMatters: "If Sui becomes a full-stack app platform, SuiNS becomes the default identity surface across that platform.",
    demandVector: ["identity", "payments", "agents", "websites"],
  },
  {
    title: "Private Stablecoin Transfers",
    status: "in-development",
    score: { impact: 5, tokenAccrual: 3, effort: 4 },
    category: "payments",
    launchDate: "Coming soon",
    howItWorks:
      "Make stablecoin transfers private by default while keeping transactions auditable for authorized parties.",
    details:
      "Sui's payments roadmap includes private stablecoin transfers where transfer amounts are not exposed publicly, while approved parties such as issuers or regulators can retain visibility where required. For SuiNS, private payments make .sui handles more viable for real consumer, enterprise, and institutional payment flows.",
    audience: "End users, enterprises, stablecoin issuers, and payment apps.",
    audienceTag: "both",
    builder: "Sui Foundation / Mysten Labs",
    links: {
      reference: "https://www.sui.io/payments",
    },
    whyItMatters: "Privacy removes a major blocker for using named stablecoin payments in real commerce.",
    demandVector: ["payments"],
    dependsOn: ["Free Stablecoin Transfers on Sui"],
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
    dependsOn: ["$NS Token & Staking for Voting"],
  },
  {
    title: "Temporary Premium Auction",
    status: "proposed",
    score: { impact: 3, tokenAccrual: 3, effort: 2 },
    category: "payments",
    launchDate: "TBD",
    sortDate: "2026-01",
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
    dependsOn: ["Native Auction Service"],
    precedent: "ENS temporary premium on expired names",
    precedentLink: "https://support.ens.domains/en/articles/7900438-premium",
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
  // RESEARCHED CANDIDATES (provenance: "researched" — AI-surfaced, pending verification)
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
    status: "implemented",
    score: { impact: 5, tokenAccrual: 4, effort: 3 },
    category: "infrastructure",
    launchDate: "Live",
    howItWorks:
      "A TypeScript SDK (`SuinsClient`) lets any app resolve .sui names to addresses and metadata with a single function call — documented and live on docs.suins.io.",
    details:
      "The SuiNS TypeScript SDK is live and documented at docs.suins.io/developer/sdk. It provides a standardized `SuinsClient` that resolves .sui names to Sui addresses, target addresses, and metadata. Multi-language SDKs (Rust, Python, Go) are not yet available — the resolution ecosystem is TypeScript-first for now, consistent with where most Sui dApp development happens.",
    audience: "Developers integrating .sui resolution into wallets, explorers, and apps.",
    audienceTag: "both",
    whyItMatters:
      "Every new integration makes .sui the default to read and harder to displace — integrations are the moat.",
    demandVector: ["identity", "payments"],
    links: { reference: "https://docs.suins.io/developer/sdk" },
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
    status: "implemented",
    score: { impact: 3, tokenAccrual: 2, effort: 1 },
    category: "infrastructure",
    launchDate: "Launch",
    howItWorks:
      "Any .sui name holder can issue unlimited subnames (you@community.sui) on-chain for free — a default capability since launch.",
    details:
      "On Ethereum, issuing subnames at scale requires moving data off-chain via CCIP-Read because an on-chain write per subname is too expensive — Coinbase's cb.id (11M+ base.eth subnames) uses this pattern. Sui's near-zero fees make that workaround unnecessary: every SuiNS subname is a real on-chain object created at negligible cost.",
    audience: "Community owners and app builders issuing handles to members.",
    audienceTag: "end-users",
    precedent: "ENS requires CCIP-Read off-chain infrastructure to issue subnames at scale — not needed on SuiNS",
    precedentLink: "https://docs.ens.domains/resolvers/ccip-read",
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
    title: "Walrus Site Linking",
    status: "implemented",
    score: { impact: 4, tokenAccrual: 4, effort: 3 },
    category: "infrastructure",
    launchDate: "Live",
    howItWorks:
      "Link a .sui name to a decentralized Walrus Site directly from suins.io — your site goes live at your-name.wal.app with no host or server.",
    details:
      "Walrus Sites are live on mainnet. From suins.io, under any name you own, click 'Link To Walrus Site' and paste the Walrus Site object ID — the name resolves to the site immediately at your-name.wal.app. No DNS, no host, nothing to take down. Deploying the site itself still requires the site-builder CLI for arbitrary static content; WAL-0 offers an AI-assisted browser flow for simpler sites.",
    audience: "Creators and builders who want an unstoppable website.",
    audienceTag: "end-users",
    whyItMatters:
      "Every decentralized website needs a .sui name as its address — every new site is a new name registration.",
    demandVector: ["websites"],
    links: {
      implementation: "https://suins.io/",
      reference: "https://wal-0.commandoss.com/",
    },
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

  // ---- Phase 3 additions (other naming services & use cases), 2026-06-05 ----
  {
    title: "Onchain Follow Graph",
    status: "proposed",
    score: { impact: 3, tokenAccrual: 3, effort: 3 },
    category: "social",
    launchDate: "TBD",
    howItWorks:
      "Follow, and be followed by, other .sui names — a portable social graph every app can read, not locked inside one platform.",
    details:
      "Ethereum built this as the Ethereum Follow Protocol (EFP): your follows, blocks, and mutes live on-chain, tied to your name, and work everywhere they're integrated. A .sui follow graph turns names into a portable social network — your connections travel with you across every Sui app, and your .sui name is the profile they point to.",
    audience: "End users building a social presence; social-app developers.",
    audienceTag: "both",
    whyItMatters:
      "A portable follow graph makes a .sui name the social account of Sui — the more apps read it, the stickier the name.",
    demandVector: ["identity"],
    dependsOn: ["Rich Profiles"],
    precedent: "Ethereum Follow Protocol (EFP) — onchain social graph on ENS",
    precedentLink: "https://efp.app/",
  },
  {
    title: "Name-Gated Access",
    status: "proposed",
    score: { impact: 4, tokenAccrual: 3, effort: 3 },
    category: "identity",
    launchDate: "TBD",
    howItWorks:
      "Use a .sui name or subname as the key to private chats, allowlists, event tickets, and members-only content.",
    details:
      "The primitive already works: Seal (Sui's on-chain encryption framework) can use SuiNS subname ownership as a decryption condition — only holders of member.community.sui can decrypt the content. A community member has documented this pattern. What does not yet exist is a packaged, no-code product — a SuiNS-native gating UI comparable to Guild.xyz or Collab.Land. That is what this feature tracks.",
    audience: "Communities, event organizers, and gated-content creators.",
    audienceTag: "both",
    openForBuilders: true,
    whyItMatters:
      "Turns names into keys — every gated group becomes a recurring reason to own a .sui name or subname.",
    demandVector: ["identity"],
    dependsOn: ["Communities & Social Layer"],
    precedent: "Guild.xyz and Collab.Land token-gated Discord roles",
    precedentLink: "https://docs.guild.xyz/guild/main-use-cases",
  },
  {
    title: "Payment Requests & Pay Links",
    status: "proposed",
    score: { impact: 4, tokenAccrual: 4, effort: 2 },
    category: "payments",
    launchDate: "TBD",
    howItWorks:
      "Generate a shareable link or QR to be paid at your .sui name — request an exact amount, like a crypto-native invoice.",
    details:
      "ENS names are already a payment gateway: PayPal and Venmo let users send crypto to a yourname.eth handle. A .sui equivalent — shareable pay links and QR codes that request a specific amount to your name — makes getting paid as easy as sending a link. Every invoice or tip jar is a reason to own a name, and each payment flows on Sui's free rail.",
    audience: "Creators, merchants, and anyone who gets paid in crypto.",
    audienceTag: "both",
    whyItMatters:
      "Lowers getting paid to a single link — turning the payments thesis into an everyday product.",
    demandVector: ["payments"],
    precedent: "ENS payments on PayPal & Venmo",
    precedentLink:
      "https://decrypt.co/248739/paypal-and-venmo-users-can-now-send-crypto-payment-with-ens-names",
  },
  {
    title: "Onchain Credentials & Badges",
    status: "proposed",
    score: { impact: 3, tokenAccrual: 3, effort: 3 },
    category: "identity",
    launchDate: "TBD",
    howItWorks:
      "Attach verifiable badges and credentials to a .sui name — proof of membership, attendance, KYC, or achievements others can trust.",
    details:
      "Unstoppable Domains pins badges to a name; Ethereum uses attestations (EAS) to make claims verifiable. A .sui name can carry third-party-issued, verifiable credentials — event attendance (POAP-style), DAO membership, KYC status, on-chain achievements — that any app can check. The name becomes a trusted reputation layer, not just an address.",
    audience: "End users building reputation; apps needing verifiable claims.",
    audienceTag: "both",
    whyItMatters:
      "Verifiable credentials make a name worth trusting — reputation that can't be faked raises the cost of leaving it.",
    demandVector: ["identity"],
    dependsOn: ["Rich Profiles"],
    precedent: "Unstoppable Domains badges & Ethereum Attestation Service (EAS)",
    precedentLink: "https://unstoppabledomains.com/",
  },
];

export function getFeatureSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
