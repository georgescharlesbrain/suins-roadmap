import { site } from "@/data/site";

export function Thesis() {
  const { thesis, about } = site;
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            {thesis.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate">
            {thesis.body}
          </p>

          <div className="mt-8 rounded-2xl bg-brand-gradient p-6 text-white shadow-lg shadow-sui-blue/20">
            <h3 className="text-lg font-semibold">
              {thesis.demandFlywheel.heading}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/90">
              {thesis.demandFlywheel.body}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate">
              {thesis.demandVectors.heading}
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              {thesis.demandVectors.items.map((item) => (
                <div
                  key={item.title}
                  className="card grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-x-6 gap-y-2 items-start"
                >
                  <div>
                    <h4 className="text-sm font-bold text-navy">
                      {item.title}
                    </h4>
                  </div>
                  <div>
                    <p className="text-xs leading-relaxed text-slate">
                      {item.body}
                    </p>
                    {"link" in item && item.link && (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-xs font-semibold text-sui-blue hover:underline"
                      >
                        {item.link.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ul className="grid gap-3">
            {thesis.points.map((point) => (
              <li
                key={point}
                className="card flex items-start gap-3 text-sm text-navy"
              >
                <span className="mt-0.5 text-sui-blue">◆</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="card">
            <h3 className="text-lg font-semibold text-navy">{about.heading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              {about.body}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {about.highlights.map((h) => (
                <div key={h.title} className="rounded-xl bg-aqua/30 p-3">
                  <p className="text-xs font-semibold text-navy">{h.title}</p>
                  <p className="mt-1 text-xs text-slate">{h.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
