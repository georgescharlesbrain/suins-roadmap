import { site } from "@/data/site";

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.33 9.33 0 0 1 12 7.01c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M18.9 2.25h3.28l-7.17 8.2 8.44 11.16h-6.61l-5.18-6.77-5.92 6.77H2.45l7.67-8.77L2.03 2.25h6.78l4.68 6.19 5.41-6.19Zm-1.15 17.4h1.82L7.82 4.11H5.87l11.88 15.54Z" />
    </svg>
  );
}

/** Site footer with official, community, and contribution links. */
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

        <div className="mt-12 flex items-center justify-between gap-4">
          <p className="text-xs text-white/50">{footer.note}</p>
          <div className="flex items-center gap-2">
            <a
              href={footer.contribute.href}
              target="_blank"
              rel="noreferrer"
              aria-label={footer.contribute.label}
              title={footer.contribute.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-aqua/50 hover:text-white"
            >
              <GitHubIcon />
            </a>
            <a
              href={footer.profile.href}
              target="_blank"
              rel="noreferrer"
              aria-label={footer.profile.label}
              title={footer.profile.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-aqua/50 hover:text-white"
            >
              <XIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
