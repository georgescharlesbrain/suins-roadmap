import { site } from "@/data/site";

export function Showcase() {
  const { showcase } = site;
  return (
    <section id="showcase" className="bg-aqua/20">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-navy">
          {showcase.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate">
          {showcase.subheading}
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="card group flex flex-col gap-2 transition-transform duration-150 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-navy">
                  {item.name}
                </h3>
                <span className="inline-flex items-center rounded-full bg-navy/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate">
                  {item.category}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate">{item.body}</p>
              <span className="mt-auto pt-2 text-xs font-semibold text-sui-blue group-hover:underline">
                Visit
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
