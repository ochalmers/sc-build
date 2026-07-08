function MetaPill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-ink-200/80 bg-white/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-600">
      {children}
    </span>
  );
}

export function FlowCard({ flow, index }) {
  return (
    <article
      id={`flow-${flow.id}`}
      className="scroll-mt-[6rem] rounded-2xl border border-ink-200/80 bg-white/50 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">
            Flow {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-[clamp(1.15rem,2.2vw,1.45rem)] font-medium leading-snug tracking-tight text-ink-950">
            {flow.title}
          </h3>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-600">{flow.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {flow.prdScreens ? <MetaPill>{flow.prdScreens}</MetaPill> : null}
          {flow.surface ? <MetaPill>{flow.surface}</MetaPill> : null}
        </div>
      </div>

      <ol className="relative mt-10 space-y-0">
        {flow.steps.map((step, stepIdx) => (
          <li key={step.id} className="relative flex gap-5 pb-8 last:pb-0">
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
              {step.screen ? (
                <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.1em] text-ink-400">
                  Paper · {step.screen}
                </p>
              ) : null}
              {step.events?.length ? (
                <ul className="mt-3 flex flex-wrap gap-2 border-t border-ink-200/60 pt-3">
                  {step.events.map((ev) => (
                    <li
                      key={ev}
                      className="rounded-md border border-ink-200/70 bg-white/60 px-2 py-0.5 font-mono text-[9px] text-ink-500"
                    >
                      {ev}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {flow.branches?.length ? (
        <div className="mt-8 rounded-xl border border-dashed border-ink-200 bg-paper-100/40 p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Branches</p>
          <ul className="mt-4 space-y-4">
            {flow.branches.map((branch) => (
              <li key={branch.id}>
                <p className="text-[13px] font-medium text-ink-800">{branch.label}</p>
                <p className="mt-1 text-[12px] text-ink-600">{branch.condition}</p>
                <p className="mt-2 text-[12px] text-ink-500">{branch.steps.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

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
        {flow.outOfScope?.length ? (
          <div className="md:col-span-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Out of scope (v1)</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {flow.outOfScope.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-ink-200/70 bg-white/50 px-3 py-1.5 text-[11px] text-ink-600"
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
