/**
 * Site-level content for the SuiNS roadmap website.
 *
 * Holds the Introduction ("about") copy, hero text, navigation, and footer
 * links. This is the authoritative, easily-editable source the website renders
 * from — edit here rather than in the markdown notes.
 */

export const site = {
  name: "SuiNS",
  title: "Sui Name Service — Roadmap",
  hero: {
    headline: "The naming layer for the Sui economy.",
    tagline:
      "From simple .sui domains to a rich identity, social, and discovery protocol — and the $NS token that powers it.",
    /** Primary call to action: buy the token. */
    primaryCta: { label: "Buy $NS", href: "https://7k.ag/swap" },
    /** Secondary: claim a name. */
    secondaryCta: { label: "Get your name", href: "https://suins.io/" },
  },
  /** The investment thesis — the optimistic "why this matters" pitch. */
  thesis: {
    heading: "Why SuiNS — the default identity layer of Sui",
    body: "A blockchain wants exactly one answer to “who is alex.sui?”. Built by Mysten — the same team behind Sui and the Slush wallet — SuiNS is the default wherever users already are, with no clash between the protocol and the wallet. Once a naming service is everywhere and most users hold a name, network effects lock it in: more names make it more worth integrating, and more apps make every name more useful. That is how a naming service becomes a monopoly — and SuiNS owns the .sui suffix itself. It is becoming the identity and social layer of the whole chain, not just a place to register domains.",
    /** The demand engine that breaks the chicken-and-egg. */
    demandFlywheel: {
      heading: "The flywheel is about to turn",
      body: "The triggers are arriving now. Sui already has free peer-to-peer transfers, and Hashi lets holders post native Bitcoin as collateral to borrow stablecoins — pulling dormant BTC and fresh stablecoin liquidity onto the cheapest money rail on earth. When people pay each other every day, they need a handle to be paid — you cannot send money to a 64-character address. That demand shows up as .sui registrations and renewals, which are what generate SuiNS protocol fees. 80% of every fee buys back and burns $NS; the rest funds the DAO treasury. More users → more names → more fees → a scarcer token.",
    },
    /** The three structural demand vectors for .sui names. */
    demandVectors: {
      heading: "Three sources of unstoppable demand for names",
      items: [
        {
          title: "Payments",
          body: "Free P2P transfers, plus Hashi unlocking native BTC as collateral to borrow stablecoins, pull real money onto Sui. You cannot send money to a 64-character address — so people register a name to be found and paid. Each new payer is a new name, and names are what SuiNS charges for.",
        },
        {
          title: "Websites",
          body: "A .sui name is the human-readable URL for a Walrus Site — a fully decentralized website whose files live on Walrus storage and whose ownership lives on Sui. Buy a name, link it, and your site is live at name.wal.app. No host, no server, nothing to take down.",
          link: {
            label: "Build with AI → WAL-0",
            href: "https://wal-0.commandoss.com/",
          },
        },
        {
          title: "Agents",
          body: "As AI agents get their own on-chain wallets and pay each other in stablecoins (x402, ERC-8004), every agent needs a discoverable, human-readable identity. The agent economy is a naming land-grab — millions of named, addressable, payable agents.",
        },
      ],
    },
    points: [
      "Free P2P transfers — Sui is the only chain where sending is free; value drifts to the cheapest rail.",
      "Securely borrow stablecoins against native Bitcoin.",
      "Websites: every .sui name is a decentralized Walrus Site URL (name.wal.app).",
      "Agents: the AI agent economy needs millions of named, payable identities.",
      "Payments need human-readable addresses — driving organic demand for names.",
      "Built by Mysten and owner of the .sui suffix — the default names of Sui.",
      "Network effects: integrated everywhere, held by everyone — a naming monopoly.",
      "Deflationary by design — 80% of protocol fees are burned, sending the Sui System account rising in the $NS holder ranks.",
      "A clear path from on-chain names to global DNS (.sui at ICANN).",
    ],
  },
  /** About copy, adapted from the Introduction note. */
  about: {
    heading: "What is SuiNS?",
    body: "The Sui Name Service (SuiNS) is a distributed, open, and extensible naming system on the Sui blockchain. It maps human-readable names like alex.sui to machine-readable identifiers such as Sui addresses, IPFS content hashes, and other metadata.",
    highlights: [
      {
        title: "Simplified Payments",
        body: "Send SUI to a name instead of a long hex string.",
      },
      {
        title: "Digital Identity",
        body: "Use your .sui name across the metaverse and DeFi protocols.",
      },
      {
        title: "Decentralized Profiles",
        body: "Link avatars, socials, and bios to your name.",
      },
    ],
  },
  /** Live products that use SuiNS names — the "built on SuiNS" showcase. */
  showcase: {
    heading: "Built on SuiNS",
    subheading:
      "Names already in the wild — wallets, explorers, websites, and apps that resolve .sui.",
    items: [
      {
        name: "Slush Wallet",
        category: "Wallet",
        body: "Send and receive to .sui names instead of long addresses — the default Sui wallet, built by Mysten.",
        href: "https://slush.app/",
      },
      {
        name: "Suiscan",
        category: "Explorer",
        body: "Block explorer that resolves @names to accounts, activity, and assets.",
        href: "https://suiscan.xyz/",
      },
      {
        name: "WAL-0",
        category: "Websites",
        body: "Build, edit, and deploy decentralized sites on Walrus with AI assistance.",
        href: "https://wal-0.commandoss.com/",
      },
      {
        name: "SuiMail",
        category: "Messaging",
        body: "Email-style messaging addressed to your .sui name.",
        href: "https://sui-mail.vercel.app/",
      },
      {
        name: "SuiSign",
        category: "Agreements",
        body: "Sign on-chain agreements with counterparties identified by their .sui name.",
        href: "https://suisign.paracausal.tech/#features",
      },
      {
        name: "Passki",
        category: "Identity",
        body: "Sui Key-In. Manage native Bitcoin, Solana, and Ethereum addresses from a single Sui account, featuring keyless IKA-native agents.",
        href: "https://sui.ski/",
      },
      {
        name: "$NS Staking & Governance",
        category: "Governance",
        body: "Stake $NS and vote on proposals at the official SuiNS token portal.",
        href: "https://token.suins.io/",
      },
    ],
  },
  /** Section labels for the three roadmap status buckets. */
  sections: [
    { status: "implemented", label: "Shipped" },
    { status: "in-development", label: "Building" },
    { status: "proposed", label: "Exploring" },
  ] as const,
  footer: {
    official: [
      { label: "Buy $NS (7k)", href: "https://7k.ag/swap" },
      { label: "SuiNS Portal", href: "https://suins.io/" },
      { label: "Registration Dashboard", href: "https://suins.io/dashboard" },
      { label: "Technical Docs", href: "https://docs.suins.io/" },
    ],
    social: [
      { label: "Twitter / X", href: "https://x.com/SuiNSdapp" },
      { label: "Discord", href: "https://discord.gg/suins" },
      { label: "GitHub", href: "https://github.com/MystenLabs/suins-contracts" },
    ],
    note: "Maintained with ❤️ by the SuiNS Community.",
  },
} as const;
