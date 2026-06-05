import { site } from "@/data/site";

export function Footer() {
  const { footer, hero } = site;
  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Be early to the naming layer of Sui.
            </h2>
            <p className="mt-2 max-w-md text-sm text-aqua/80">
              {hero.tagline}
            </p>
          </div>
          <a
            href={hero.primaryCta.href}
            className="btn-primary px-8 py-4 text-base"
          >
            {hero.primaryCta.label}
          </a>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-aqua/70">
              Official
            </h3>
            <ul className="mt-3 space-y-2">
              {footer.official.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/80 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-aqua/70">
              Community
            </h3>
            <ul className="mt-3 space-y-2">
              {footer.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/80 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 text-xs text-white/50">{footer.note}</p>
      </div>
    </footer>
  );
}
