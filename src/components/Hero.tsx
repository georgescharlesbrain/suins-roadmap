import { site } from "@/data/site";

export function Hero() {
  const { hero } = site;
  return (
    <header className="relative overflow-hidden bg-hero-glow">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-16 text-center sm:pt-24">
        <span className="inline-flex items-center rounded-full border border-aqua bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-sui-blue">
          The Future of SuiNS
        </span>
        <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight text-navy sm:text-6xl">
          {hero.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate">
          {hero.tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href={hero.primaryCta.href} className="btn-primary px-8 py-4 text-base">
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="btn-secondary px-8 py-4 text-base"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
