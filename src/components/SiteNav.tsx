"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/products", label: "Product Catalog" },
  { href: "/contributors", label: "Contributors" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Global navigation shown on every page, with the current page highlighted. */
export function SiteNav() {
  const pathname = usePathname();
  const { hero } = site;

  return (
    <nav className="sticky top-0 z-40 border-b border-aqua/40 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-navy"
          >
            {site.name}
          </Link>
          <div className="hidden items-center gap-1 sm:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                  isActive(pathname, item.href)
                    ? "bg-aqua/50 text-sui-blue"
                    : "text-slate hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={hero.secondaryCta.href}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary hidden sm:inline-flex"
          >
            {hero.secondaryCta.label}
          </a>
          <a
            href={hero.primaryCta.href}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            {hero.primaryCta.label}
          </a>
        </div>
      </div>

      {/* Mobile page links */}
      <div className="flex items-center gap-1 overflow-x-auto px-6 pb-3 sm:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold ${
              isActive(pathname, item.href)
                ? "bg-aqua/50 text-sui-blue"
                : "text-slate"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
