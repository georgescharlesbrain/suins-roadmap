"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type {
  AudienceTag,
  RoadmapCategory,
  RoadmapFeature,
  RoadmapStatus,
} from "@/data/roadmap";
import { getFeatureSlug, roadmapFeatures } from "@/data/roadmap";
import { StatusBadge } from "./StatusBadge";

const CATEGORY: Record<RoadmapCategory, { icon: string; label: string }> = {
  naming: { icon: "🏷️", label: "Naming" },
  identity: { icon: "🪪", label: "Identity" },
  payments: { icon: "💸", label: "Payments" },
  governance: { icon: "🗳️", label: "Governance" },
  social: { icon: "💬", label: "Social" },
  infrastructure: { icon: "🌐", label: "Infrastructure" },
};

const AUDIENCE: Record<AudienceTag, { label: string; className: string }> = {
  "end-users": { label: "End users", className: "bg-aqua/50 text-sui-blue" },
  investors: { label: "Investors", className: "bg-amber-100 text-amber-700" },
  both: { label: "Everyone", className: "bg-violet-100 text-violet-700" },
};

const DEMAND_VECTOR: Record<string, { label: string; className: string }> = {
  websites: { label: "Websites", className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  agents: { label: "Agents", className: "bg-indigo-50 text-indigo-700 border border-indigo-200" },
  payments: { label: "Payments", className: "bg-amber-50 text-amber-700 border border-amber-200" },
  identity: { label: "Identity", className: "bg-sky-50 text-sky-700 border border-sky-200" },
};

/** Left-border accent + (for proposals) dashed treatment. */
const ACCENT: Record<RoadmapStatus, string> = {
  implemented: "border-l-4 border-l-green-400",
  "in-development": "border-l-4 border-l-sui-blue",
  proposed: "border-l-4 border-l-slate/40 border-dashed",
};

function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const slug = getFeatureSlug(title);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      window.location.hash = slug;
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleShare}
        className="text-slate/40 hover:text-sui-blue p-1 transition-colors"
        title="Copy deep link"
        aria-label={`Copy deep link to ${title}`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>
      {copied && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 rounded bg-navy px-2 py-0.5 text-[10px] font-medium text-white shadow z-20">
          Copied!
        </span>
      )}
    </div>
  );
}

function DependencyPills({
  features,
  label,
  onClose,
}: {
  features: string[] | undefined;
  label: string;
  onClose: () => void;
}) {
  if (!features || features.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate/80 mb-2">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {features.map((fTitle) => {
          const target = roadmapFeatures.find(
            (rf) => rf.title.toLowerCase() === fTitle.toLowerCase()
          );
          const slug = getFeatureSlug(fTitle);
          const isCompleted = target?.status === "implemented";

          const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
            onClose();
            // Trigger scroll & highlight via hash
            window.location.hash = slug;
          };

          return (
            <button
              key={fTitle}
              onClick={handleClick}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
                isCompleted
                  ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                  : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
              }`}
            >
              {isCompleted ? (
                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
              <span>{target?.title || fTitle}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ActionFooter({ feature }: { feature: RoadmapFeature }) {
  const hasBuild = feature.openForBuilders;
  const discussHref = feature.links?.twitter || feature.links?.blogpost || "https://discord.gg/suins";
  const trackHref = feature.links?.github || "https://github.com/MystenLabs/suins-contracts";

  return (
    <div className="flex flex-wrap gap-2 pt-3 border-t border-aqua/60 mt-4 w-full">
      {hasBuild && (
        <a
          href="https://discord.gg/suins"
          target="_blank"
          rel="noreferrer"
          className="flex-1 min-w-[90px] text-center inline-flex items-center justify-center gap-1 rounded-xl bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700 hover:bg-violet-100 border border-violet-200 transition-colors"
        >
          Build it
        </a>
      )}
      <a
        href={discussHref}
        target="_blank"
        rel="noreferrer"
        className="flex-1 min-w-[90px] text-center inline-flex items-center justify-center gap-1 rounded-xl bg-sky-50 px-3 py-2 text-xs font-bold text-sui-blue hover:bg-sky-100 border border-sky-200 transition-colors"
      >
        Discuss
      </a>
      <a
        href={trackHref}
        target="_blank"
        rel="noreferrer"
        className="flex-1 min-w-[90px] text-center inline-flex items-center justify-center gap-1 rounded-xl bg-navy/5 px-3 py-2 text-xs font-semibold text-navy hover:bg-navy/10 border border-navy/15 transition-colors"
      >
        Track
      </a>
    </div>
  );
}

function PhaseStepper({ phases }: { phases: RoadmapFeature["phases"] }) {
  if (!phases?.length) return null;
  return (
    <ol className="mt-2 space-y-3 border-l border-aqua pl-4">
      {phases.map((phase, i) => (
        <li key={phase.title} className="relative">
          <span className="absolute -left-[1.45rem] flex h-5 w-5 items-center justify-center rounded-full bg-sui-blue text-[10px] font-bold text-white">
            {i + 1}
          </span>
          <p className="text-xs font-semibold text-navy">{phase.title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate">
            {phase.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

function FeatureModal({
  feature,
  onClose,
}: {
  feature: RoadmapFeature;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const cat = CATEGORY[feature.category];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={feature.title}
    >
      <div
        className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            <h3 className="text-xl font-bold leading-snug text-navy flex items-center gap-1.5">
              {feature.title}
              <ShareButton title={feature.title} />
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full bg-navy/5 px-2.5 py-1 text-sm font-semibold text-slate hover:bg-navy/10"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={feature.status} />
          {feature.review === "candidate" && (
            <span className="inline-flex items-center rounded-full border border-dashed border-amber-400 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              Idea — exploring
            </span>
          )}
          {feature.openForBuilders && (
            <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
              Looking for builder
            </span>
          )}
          <span className="inline-flex items-center rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">
            {feature.launchDate}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${AUDIENCE[feature.audienceTag].className}`}
          >
            {AUDIENCE[feature.audienceTag].label}
          </span>
          {feature.demandVector?.map((v) => {
            const item = DEMAND_VECTOR[v];
            if (!item) return null;
            return (
              <span
                key={v}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${item.className}`}
              >
                {item.label}
              </span>
            );
          })}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-navy">
          {feature.details ?? feature.howItWorks}
        </p>

        {feature.whyItMatters && (
          <p className="mt-3 text-sm italic text-slate/90 border-l-2 border-sui-blue pl-2.5">
            Why it matters: {feature.whyItMatters}
          </p>
        )}

        {feature.phases && <PhaseStepper phases={feature.phases} />}

        <DependencyPills
          features={feature.dependsOn}
          label="Requires"
          onClose={onClose}
        />
        
        <DependencyPills
          features={feature.unlocks}
          label="Enables"
          onClose={onClose}
        />

        <dl className="mt-5 space-y-1 border-t border-aqua/60 pt-4 text-xs text-slate">
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 font-semibold text-navy">Audience</dt>
            <dd>{feature.audience}</dd>
          </div>
          {feature.builder && (
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 font-semibold text-navy">Builder</dt>
              <dd>
                {feature.builderLink ? (
                  <a
                    href={feature.builderLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sui-blue hover:underline"
                  >
                    {feature.builder}
                  </a>
                ) : (
                  feature.builder
                )}
              </dd>
            </div>
          )}
          {feature.precedent && (
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 font-semibold text-navy">Precedent</dt>
              <dd>
                {feature.precedentLink ? (
                  <a
                    href={feature.precedentLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sui-blue hover:underline"
                  >
                    {feature.precedent}
                  </a>
                ) : (
                  feature.precedent
                )}
              </dd>
            </div>
          )}
          {feature.monetization && (
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 font-semibold text-navy">Revenue</dt>
              <dd>
                {feature.monetization.model ??
                  (feature.monetization.generatesRevenue
                    ? "Generates revenue"
                    : "No direct revenue")}
                {feature.monetization.beneficiary
                  ? ` — flows to ${feature.monetization.beneficiary}`
                  : ""}
              </dd>
            </div>
          )}
        </dl>

        <ActionFooter feature={feature} />
      </div>
    </div>,
    document.body,
  );
}

export function FeatureCard({ feature }: { feature: RoadmapFeature }) {
  const [open, setOpen] = useState(false);
  const [flashed, setFlashed] = useState(false);
  const cat = CATEGORY[feature.category];
  const audience = AUDIENCE[feature.audienceTag];
  const hasMore = Boolean(feature.details || feature.phases || feature.dependsOn?.length || feature.unlocks?.length);
  const money = feature.monetization;
  const slug = getFeatureSlug(feature.title);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === `#${slug}`) {
        const el = document.getElementById(slug);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          setFlashed(true);
          setTimeout(() => {
            setFlashed(false);
          }, 3000);
        }
        setOpen(true);
      }
    };
    
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [slug]);

  return (
    <>
      <article
        id={slug}
        className={`card flex flex-col gap-4 ${ACCENT[feature.status]} ${
          flashed ? "animate-flash border-sky-400" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            <h3 className="text-lg font-semibold leading-snug text-navy flex items-center gap-1.5">
              {feature.title}
              <ShareButton title={feature.title} />
            </h3>
          </div>
          <StatusBadge status={feature.status} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {feature.review === "candidate" && (
            <span className="inline-flex items-center rounded-full border border-dashed border-amber-400 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              Idea — exploring
            </span>
          )}
          {feature.openForBuilders && (
            <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
              Looking for builder
            </span>
          )}
          <span className="inline-flex items-center rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">
            {feature.launchDate}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${audience.className}`}
          >
            {audience.label}
          </span>
          {feature.demandVector?.map((v) => {
            const item = DEMAND_VECTOR[v];
            if (!item) return null;
            return (
              <span
                key={v}
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.className}`}
              >
                {item.label}
              </span>
            );
          })}
        </div>

        <p className="text-sm leading-relaxed text-slate">
          {feature.howItWorks}
        </p>

        {feature.whyItMatters && (
          <p className="text-xs italic text-slate/85 border-l-2 border-sui-blue/50 pl-2">
            Why it matters: {feature.whyItMatters}
          </p>
        )}

        {feature.precedent && (
          <p className="text-xs text-slate mt-0.5">
            <span className="font-semibold text-navy">Precedent:</span>{" "}
            {feature.precedentLink ? (
              <a
                href={feature.precedentLink}
                target="_blank"
                rel="noreferrer"
                className="text-sui-blue hover:underline"
              >
                {feature.precedent}
              </a>
            ) : (
              feature.precedent
            )}
          </p>
        )}

        {money && (
          <div className="rounded-xl bg-aqua/25 p-3">
            {money.generatesRevenue ? (
              <span className="inline-flex items-center rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                Generates revenue
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-navy/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy">
                Tokenomics
              </span>
            )}
            {money.model && (
              <p className="mt-1.5 text-xs text-slate">{money.model}</p>
            )}
            {money.beneficiary && (
              <p className="mt-0.5 text-xs text-slate">
                <span className="font-semibold text-navy">Flows to:</span>{" "}
                {money.beneficiary}
              </p>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2">
          <ActionFooter feature={feature} />
          {hasMore && (
            <button
              onClick={() => setOpen(true)}
              className="w-full rounded-xl bg-navy/5 py-2 text-xs font-bold text-navy transition-colors hover:bg-aqua/60"
            >
              View details & dependency graph
            </button>
          )}
        </div>
      </article>

      {open && (
        <FeatureModal feature={feature} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
