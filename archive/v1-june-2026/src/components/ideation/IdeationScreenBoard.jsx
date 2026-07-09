const DIRECTION_COLORS = {
  Minimal: "border-ink-200/80 bg-white/80 text-ink-600",
  Editorial: "border-accent-clay/30 bg-accent-clay/5 text-accent-clay",
  Clinical: "border-sky-200/80 bg-sky-50/80 text-sky-800",
  Motion: "border-violet-200/80 bg-violet-50/80 text-violet-800",
  Sound: "border-emerald-200/80 bg-emerald-50/80 text-emerald-800",
  "Sound-first": "border-emerald-200/80 bg-emerald-50/80 text-emerald-800",
  Structured: "border-ink-200/80 bg-paper-50 text-ink-700",
  Sparse: "border-ink-200/80 bg-paper-50 text-ink-600",
  B2B: "border-amber-200/80 bg-amber-50/80 text-amber-900",
  Data: "border-sky-200/80 bg-sky-50/80 text-sky-800",
  KPI: "border-ink-200/80 bg-white text-ink-700",
};

function directionClass(direction) {
  return DIRECTION_COLORS[direction] ?? "border-ink-200/60 bg-paper-50/80 text-ink-600";
}

function ConsiderationList({ items, label = "UX / UI notes" }) {
  if (!items?.length) return null;
  return (
    <div className={label ? "mt-3" : "mt-2"}>
      {label ? (
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-ink-400">{label}</p>
      ) : null}
      <ul className={`space-y-1.5 ${label ? "mt-2" : ""}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-[11px] leading-snug text-ink-600">
            <span className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-ink-300" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VariationCard({ variation, index }) {
  const { label, direction, summary, considerations, mobbinRef, sonoceaFit } = variation;

  return (
    <article className="flex flex-col rounded-2xl border border-ink-200/70 bg-white/60 p-4 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[10px] text-ink-400">V{index + 1}</span>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.08em] ${directionClass(direction)}`}
        >
          {direction}
        </span>
      </div>
      <h4 className="mt-2 text-[13px] font-medium tracking-tight text-ink-900">{label}</h4>
      <p className="mt-2 flex-1 text-[12px] leading-relaxed text-ink-600">{summary}</p>
      <ConsiderationList items={considerations} />
      <div className="mt-4 space-y-2 border-t border-ink-200/50 pt-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-ink-400">Mobbin reference</p>
        <p className="text-[11px] leading-snug text-ink-600">
          <span className="font-medium text-ink-800">{mobbinRef.app}</span>
          <span className="text-ink-400"> · </span>
          {mobbinRef.pattern}
        </p>
        {mobbinRef.url ? (
          <a
            href={mobbinRef.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] font-medium text-ink-500 underline decoration-ink-300 underline-offset-2 hover:text-ink-800"
          >
            View on Mobbin
          </a>
        ) : null}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-ink-500">
        <span className="font-medium text-ink-600">Sonocea fit: </span>
        {sonoceaFit}
      </p>
    </article>
  );
}

function ScreenBlock({ screen, index }) {
  return (
    <div
      id={`ideation-screen-${screen.id}`}
      className="scroll-mt-[8rem] rounded-2xl border border-ink-200/60 bg-paper-50/40 p-5 md:p-6"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[11px] text-ink-400">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="text-[17px] font-medium tracking-tight text-ink-950">{screen.title}</h3>
        {screen.priority ? (
          <span className="rounded-full border border-ink-200/80 bg-white/80 px-2 py-0.5 font-mono text-[10px] text-ink-500">
            {screen.priority}
          </span>
        ) : null}
      </div>
      <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-ink-600">{screen.purpose}</p>
      <p className="mt-1 text-[11px] text-ink-400">{screen.prdRef}</p>

      <div className="mt-5 rounded-xl border border-ink-200/60 bg-white/50 p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-ink-500">
          Cross-cutting UX / UI considerations
        </p>
        <ConsiderationList items={screen.considerations} label="" />
      </div>

      <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-400">
        Five directional examples
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {screen.variations.map((variation, i) => (
          <VariationCard key={variation.id} variation={variation} index={i} />
        ))}
      </div>
    </div>
  );
}

export function IdeationDomainSection({ domain }) {
  return (
    <section id={domain.id} className="scroll-mt-[7rem] border-b border-ink-200/60 py-20 md:py-28">
      <div className="max-w-content mx-auto px-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">{domain.label}</p>
          <span className="rounded-full border border-ink-200/80 bg-white/70 px-2.5 py-0.5 text-[10px] font-medium text-ink-500">
            {domain.platform}
          </span>
        </div>
        <h2 className="mt-3 max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.15] tracking-tight text-ink-950">
          {domain.title}
        </h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-600">{domain.description}</p>
        <p className="mt-2 text-[12px] text-ink-400">{domain.prd}</p>

        <div className="mt-12 space-y-6">
          {domain.screens.map((screen, i) => (
            <ScreenBlock key={screen.id} screen={screen} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function IdeationScreenIndex({ domains }) {
  return (
    <nav className="rounded-2xl border border-ink-200/60 bg-white/50 p-5" aria-label="Screen index">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Screen index</p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {domains.map((domain) => (
          <div key={domain.id}>
            <a
              href={`#${domain.id}`}
              className="text-[12px] font-medium text-ink-800 underline decoration-ink-300 underline-offset-2 hover:text-ink-950"
            >
              {domain.label}
            </a>
            <ul className="mt-2 space-y-1">
              {domain.screens.map((screen) => (
                <li key={screen.id}>
                  <a
                    href={`#ideation-screen-${screen.id}`}
                    className="text-[12px] text-ink-500 transition-colors hover:text-ink-800"
                  >
                    {screen.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
