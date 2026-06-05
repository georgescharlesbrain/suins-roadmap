import type { Metadata } from "next";

interface Contributor {
  name: string;
  role: string;
  body: string;
  github?: string;
  x?: string;
  discord?: string;
}

const CONTRIBUTION_AREAS = [
  {
    title: "Protocol contributors",
    body: "Move engineers and reviewers opening issues, proposing contract changes, improving subnames, governance, auctions, and protocol safety.",
    href: "https://github.com/MystenLabs/suins-contracts/issues",
    action: "Track protocol issues",
  },
  {
    title: "App builders",
    body: "Wallets, explorers, marketplaces, messaging apps, Walrus tools, and community products that make .sui names useful outside the SuiNS portal.",
    href: "/products",
    action: "View product catalog",
  },
  {
    title: "Community researchers",
    body: "People collecting roadmap alpha, comparing ENS and SNS precedents, surfacing product gaps, and turning raw ideas into concrete SuiNS features.",
    href: "https://github.com/georgescharlesbrain/suins-roadmap",
    action: "Contribute to this site",
  },
  {
    title: "Community operators",
    body: "Moderators, DAO voters, community owners, and educators who help holders understand names, subnames, $NS governance, and new SuiNS releases.",
    href: "https://discord.gg/suins",
    action: "Join Discord",
  },
];

const FOUNDER_CONTRIBUTORS: Contributor[] = [
  {
    name: "sean cali",
    role: "Founder of SuiNS",
    body: "Founded SuiNS and helped bring the original .sui naming protocol into the Sui ecosystem.",
    x: "https://x.com/SeanCali0",
  },
];

const MYSTEN_CONTRIBUTORS: Contributor[] = [
  {
    name: "tony lee",
    role: "Mysten protocol engineer",
    body: "Core SuiNS contract and SDK contributor, including token, voting, payments, SDK, docs, and release work in the public SuiNS contracts repository.",
    github: "https://github.com/tonylee08",
    x: "https://x.com/tony_k_lee",
  },
  {
    name: "manolis liolios",
    role: "Mysten protocol engineer",
    body: "Contributed SuiNS and Move Registry work, including metadata, MVR registration, build, and documentation updates.",
    github: "https://github.com/manolisliolios",
  },
  {
    name: "other contributors",
    role: "Public contributor graph",
    body: "GitHub's public contributor graph for MystenLabs/suins-contracts.",
    github:
      "https://github.com/MystenLabs/suins-contracts/graphs/contributors?from=2%2F28%2F2026",
  },
];

const COMMUNITY_CONTRIBUTORS: Contributor[] = [
  {
    name: "juzybits",
    role: "Community developer",
    body: "Community developer who completed the buy-and-burn feature and contributed SuiNS staking and voting work.",
    github: "https://github.com/juzybits",
    x: "https://x.com/juzybits",
  },
  {
    name: "atlas.sui",
    role: "Community contributor",
    body: "Opened and specified SuiNS contract improvements, including SubnameCap delegation and shorter subname labels.",
    github: "https://github.com/arbuthnot-eth",
    discord: "atlas.sui",
  },
  {
    name: "death",
    role: "DAO steward",
    body: "DAO steward helping coordinate SuiNS community activity and visibility.",
    x: "https://x.com/0xd34th",
  },
  {
    name: "wolfer",
    role: "Community manager",
    body: "Community manager helping support and coordinate the SuiNS Discord community.",
    discord: "wolfer",
    x: "https://x.com/WolferSh",
  },
  {
    name: "stravia.sui",
    role: "Community moderator",
    body: "Helps moderate and support the SuiNS community on Discord.",
    discord: "stravia.sui",
  },
  {
    name: "jack.sui",
    role: "Community moderator",
    body: "Helps keep the SuiNS community organized, useful, and welcoming.",
    discord: "jack.sui",
  },
];

const CONTRIBUTOR_GROUPS: {
  heading: string;
  body: string;
  contributors: Contributor[];
}[] = [
  {
    heading: "community contributors",
    body: "Community members who have helped move SuiNS forward through protocol work, community operations, research, and product development.",
    contributors: COMMUNITY_CONTRIBUTORS,
  },
  {
    heading: "founding contributor",
    body: "The original founder who helped start SuiNS and bring .sui names into the Sui ecosystem.",
    contributors: FOUNDER_CONTRIBUTORS,
  },
  {
    heading: "core mysten contributors",
    body: "Core Mysten engineers visible in the public SuiNS contracts commit and pull request history.",
    contributors: MYSTEN_CONTRIBUTORS,
  },
];

export const metadata: Metadata = {
  title: "Contributors — The Future of SuiNS",
  description:
    "A thank-you page for community contributors helping make SuiNS more useful across the Sui ecosystem.",
};

/** Renders the SuiNS community contributor thank-you page. */
export default function Contributors() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-sui-blue">
            Community contributors
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Thank you to everyone building SuiNS in public.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate">
            SuiNS grows because people keep turning names into something useful:
            integrations, docs, issues, research, governance, products, and real
            communities. This page is a living thank-you to the contributors
            pushing the naming layer forward.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {CONTRIBUTION_AREAS.map((area) => (
            <a
              key={area.title}
              href={area.href}
              target={area.href.startsWith("http") ? "_blank" : undefined}
              rel={area.href.startsWith("http") ? "noreferrer" : undefined}
              className="card group flex flex-col gap-3 hover:-translate-y-1"
            >
              <h2 className="text-lg font-semibold text-navy">{area.title}</h2>
              {area.body && (
                <p className="text-sm leading-relaxed text-slate">
                  {area.body}
                </p>
              )}
              <span className="mt-auto pt-2 text-xs font-semibold text-sui-blue group-hover:underline">
                {area.action}
              </span>
            </a>
          ))}
        </div>

        {CONTRIBUTOR_GROUPS.map((group) => (
          <div key={group.heading} className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-navy">
              {group.heading}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
              {group.body}
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.contributors.map((contributor) => {
                const links = [
                  contributor.github
                    ? { label: "GitHub", href: contributor.github }
                    : null,
                  contributor.x ? { label: "X", href: contributor.x } : null,
                ].filter(Boolean) as { label: string; href: string }[];

                return (
                  <article
                    key={contributor.name}
                    className="card flex flex-col gap-3"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-navy">
                        {contributor.name}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wide text-sui-blue">
                        {contributor.role}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-slate">
                      {contributor.body}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {contributor.discord && (
                        <span className="inline-flex rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-slate">
                          Discord: {contributor.discord}
                        </span>
                      )}
                      {links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex rounded-full bg-aqua/40 px-3 py-1 text-xs font-semibold text-sui-blue hover:bg-aqua"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-12 rounded-2xl border border-aqua/70 bg-aqua/20 p-6">
          <h2 className="text-lg font-semibold text-navy">
            Want to be added here?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate">
            Open a pull request, ship a SuiNS integration, write useful research,
            file a good protocol issue, help maintain docs, or build a community
            use case around names and subnames.
          </p>
        </div>
      </section>
    </main>
  );
}
