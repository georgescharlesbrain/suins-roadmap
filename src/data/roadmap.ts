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
    category: "governance",
    launchDate: "August 2024 (airdrop Oct 2024, full launch Aug 2025)",
    sortDate: "2024-08",
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
      implementation: "https://token.suins.io/",
    },
    whyItMatters: "Encourages long-term staking commitment and active governance participation.",
    demandVector: ["identity"],
  },
  {
    title: "Communities & Social Layer",
    status: "implemented",
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
  },

  // ----------------------------------------------------------- Under development
  {
    title: "Rich Profiles",
    status: "in-development",
    category: "identity",
    launchDate: "November 2025",
    sortDate: "2025-11",
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
    category: "payments",
    launchDate: "December 2025",
    sortDate: "2025-12",
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
  // -------------------------------------------------- Researched (review-pending)
  // EXAMPLE seed from the feature-research plan. Tagged researched/candidate, so it
  // is hidden in production and only shows in dev or at ?preview=1 (with the
  // "Idea — exploring" badge). Flip review to "verified" to publish; delete freely.
  {
    title: "Typed Records v2",
    status: "proposed",
    category: "identity",
    launchDate: "TBD",
    provenance: "researched",
    review: "candidate",
    howItWorks:
      "Give every .sui name a structured profile: multiple chain addresses (BTC/ETH/SOL), socials, a website, and an avatar — read by any wallet or app from one place.",
    details:
      "Instead of a name resolving to a single Sui address, Typed Records v2 attaches a structured set of typed fields to the name: multi-chain addresses, social handles, a profile URL, and an avatar. A shared HTTP resolution API and multi-language SDK let any app read these records the same way, turning a .sui name into the identity surface every wallet and explorer integrates against. Storage of website content stays with Walrus — these records hold identity and address data, not files.",
    audience: "Developers integrating identity; end users who want a real profile.",
    audienceTag: "both",
    whyItMatters:
      "The more apps that read .sui profiles, the harder SuiNS is to displace — every integration deepens the naming monopoly.",
    demandVector: ["identity", "payments"],
    precedent: "SNS Records v2 (150+ integrations) & ENS text records",
    precedentLink: "https://docs.sns.id/",
  },
];

export function getFeatureSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
