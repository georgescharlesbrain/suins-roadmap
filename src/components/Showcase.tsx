"use client";

import { useState } from "react";
import { site } from "@/data/site";

type CatalogFilter = "apps" | "wallets" | "explorers" | "marketplaces";

const FILTERS: { value: CatalogFilter; label: string }[] = [
  { value: "apps", label: "Apps" },
  { value: "wallets", label: "Wallets" },
  { value: "explorers", label: "Explorers" },
  { value: "marketplaces", label: "Marketplaces" },
];

const CATEGORY_FILTER: Record<CatalogFilter, string[]> = {
  apps: ["Naming", "Websites", "Messaging", "Agreements", "Identity", "Governance"],
  wallets: ["Wallet"],
  explorers: ["Explorer"],
  marketplaces: ["Marketplace"],
};

export function Showcase() {
  const { showcase } = site;
  const [filter, setFilter] = useState<CatalogFilter>("apps");
  const items = showcase.items.filter((item) =>
    CATEGORY_FILTER[filter].includes(item.category),
  );

  return (
    <section id="showcase" className="bg-aqua/20">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-navy">
              {showcase.heading}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate">
              {showcase.subheading}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  filter === item.value
                    ? "bg-sui-blue text-white"
                    : "bg-white/70 text-sui-blue hover:bg-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const x = "x" in item ? item.x : undefined;
            const github = "github" in item ? item.github : undefined;
            const productLinks = [
              { label: "Website", href: item.href },
              x ? { label: "X", href: x } : null,
              github ? { label: "GitHub", href: github } : null,
            ].filter(Boolean) as { label: string; href: string }[];

            return (
              <article
                key={item.name}
                className="card flex flex-col gap-2 transition-transform duration-150 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-navy">
                    {item.name}
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-navy/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate">
                  {item.body}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {productLinks.map((link) => (
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
    </section>
  );
}
