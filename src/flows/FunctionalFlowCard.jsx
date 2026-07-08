function MetaPill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-ink-200/80 bg-white/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-600">
      {children}
    </span>
  );
}

export function FunctionalFlowCard({ flow, index }) {
  return (
    <article
      id={`lite-flow-${flow.id}`}
      className="scroll-mt-[6rem] rounded-2xl border border-ink-200/80 bg-white/50 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">
            Flow {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-[clamp(1.05rem,2vw,1.35rem)] font-medium leading-snug tracking-tight text-ink-950">
            {flow.title}
          </h3>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-600">{flow.summary}</p>
        </div>
        {flow.screens?.length ? (
          <div className="flex flex-wrap gap-2">
            <MetaPill>Mobile screens</MetaPill>
          </div>
        ) : null}
      </div>

      <ol className="relative mt-10 space-y-0">
        {flow.steps.map((step, stepIdx) => (
          <li key={step.label} className="relative flex gap-5 pb-8 last:pb-0">
            <div className="flex flex-col items-center">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-paper-100 font-mono text-[10px] text-ink-600">
                {String(stepIdx + 1).padStart(2, "0")}
              </span>
              {stepIdx < flow.steps.length - 1 ? (
                <div className="mt-2 w-px flex-1 bg-ink-200" aria-hidden />
              ) : null}
            </div>
            <div className="min-w-0 flex-1 rounded-xl border border-ink-200/70 bg-paper-100/80 p-4 md:p-5">
              <p className="text-[14px] font-medium leading-snug text-ink-900">{step.label}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {flow.requirements?.length ? (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Requirements</p>
            <ul className="mt-3 space-y-2">
              {flow.requirements.map((req) => (
                <li key={req} className="text-[12px] leading-relaxed text-ink-600">
                  {req}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {flow.metrics?.length ? (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Metrics captured</p>
            <ul className="mt-3 space-y-2">
              {flow.metrics.map((m) => (
                <li key={m} className="text-[12px] leading-relaxed text-ink-600">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {flow.events?.length ? (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Telemetry</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {flow.events.map((ev) => (
                <li
                  key={ev}
                  className="rounded-md border border-ink-200/70 bg-white/60 px-2 py-0.5 font-mono text-[9px] text-ink-500"
                >
                  {ev}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {flow.screens?.length ? (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Screen map</p>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-600">{flow.screens.join(" · ")}</p>
          </div>
        ) : null}
        {flow.openQuestions?.length ? (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Open (PRD)</p>
            <ul className="mt-3 space-y-2">
              {flow.openQuestions.map((q) => (
                <li key={q} className="text-[12px] leading-relaxed text-ink-600">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {flow.excluded?.length ? (
          <div className="md:col-span-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
              Excluded from LITE (out of scope)
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {flow.excluded.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-dashed border-ink-300/80 bg-paper-100/60 px-3 py-1.5 text-[11px] text-ink-500"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
