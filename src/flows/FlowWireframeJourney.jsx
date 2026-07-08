import { WireframeById, WIREFRAME_REGISTRY } from "./wireframes/WireframeScreens.jsx";

function MetaPill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-ink-200/80 bg-white/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-600">
      {children}
    </span>
  );
}

function StepArrow() {
  return (
    <div
      className="hidden shrink-0 items-center self-center px-1 md:flex"
      aria-hidden
    >
      <div className="h-px w-5 bg-ink-300" />
      <svg className="h-3 w-3 text-ink-400" viewBox="0 0 12 12" fill="none">
        <path d="M2 6h7M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function FlowWireframeJourney({ flow, index }) {
  const stepsWithWireframes = flow.steps.filter((s) => s.wireframeId);

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

      {stepsWithWireframes.length > 0 ? (
        <div className="mt-10 -mx-2 overflow-x-auto px-2 pb-4 md:mx-0 md:px-0">
          <div className="flex min-w-min items-start gap-2 md:gap-4">
            {stepsWithWireframes.map((step, stepIdx) => (
              <div key={step.id} className="flex shrink-0 items-start">
                <div
                  className="flex flex-col"
                  style={{
                    width:
                      WIREFRAME_REGISTRY[step.wireframeId]?.variant === "web" ? "300px" : "280px",
                  }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-paper-100 font-mono text-[9px] text-ink-600">
                      {String(stepIdx + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold leading-snug text-ink-900">{step.label}</p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-ink-500">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                  <WireframeById wireframeId={step.wireframeId} />
                  {step.events?.length ? (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {step.events.map((ev) => (
                        <li
                          key={ev}
                          className="rounded-md border border-ink-200/70 bg-paper-100 px-2 py-0.5 font-mono text-[8px] text-ink-500"
                        >
                          {ev}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {stepIdx < stepsWithWireframes.length - 1 ? <StepArrow /> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

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
      </div>
    </article>
  );
}
