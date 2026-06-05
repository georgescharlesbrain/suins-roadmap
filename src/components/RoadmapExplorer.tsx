"use client";

import { useState } from "react";
import {
  roadmapFeatures,
  type RoadmapFeature,
  type RoadmapStatus,
} from "@/data/roadmap";
import { site } from "@/data/site";
import { FeatureCard } from "./FeatureCard";

type Filter = "all" | RoadmapStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...site.sections.map((s) => ({ value: s.status as Filter, label: s.label })),
];

/** Chronological sort; undated/TBD items sort last, then alphabetical. */
function byDate(a: RoadmapFeature, b: RoadmapFeature) {
  if (a.sortDate && b.sortDate) return a.sortDate.localeCompare(b.sortDate);
  if (a.sortDate) return -1;
  if (b.sortDate) return 1;
  return a.title.localeCompare(b.title);
}

export function RoadmapExplorer() {
  const [filter, setFilter] = useState<Filter>("all");

  const sections = site.sections.filter(
    (s) => filter === "all" || s.status === filter,
  );

  return (
    <section id="roadmap" className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            The roadmap
          </h2>
          <p className="mt-2 text-sm text-slate">
            Shipped, building, and exploring — the path from names to an identity
            protocol. Tap a card for the full detail.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                filter === f.value
                  ? "bg-sui-blue text-white"
                  : "bg-aqua/40 text-sui-blue hover:bg-aqua"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-12">
        {sections.map((section) => {
          const features = roadmapFeatures
            .filter((f) => f.status === section.status)
            .sort(byDate);
          return (
            <div key={section.status} className="relative pl-6">
              {/* timeline rail */}
              <span
                aria-hidden
                className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-sui-blue/60 via-aqua to-transparent"
              />
              <span
                aria-hidden
                className="absolute -left-[5px] top-2 h-3 w-3 rounded-full bg-sui-blue"
              />
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate">
                {section.label}
                <span className="rounded-full bg-aqua/50 px-2 py-0.5 text-xs text-sui-blue">
                  {features.length}
                </span>
              </h3>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <FeatureCard key={feature.title} feature={feature} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
