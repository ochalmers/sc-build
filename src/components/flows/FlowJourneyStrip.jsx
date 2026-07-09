import FlowScreenPreview from "./FlowScreenPreview.jsx";

function FlowArrow() {
  return (
    <div className="hidden shrink-0 items-center self-center px-1 pt-20 md:flex" aria-hidden>
      <div className="h-px w-6 bg-ink-300/80" />
      <svg className="h-3 w-3 text-ink-400" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6h7M7 3.5L9.5 6 7 8.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function FlowStepCard({ step, index, isLast }) {
  return (
    <div className="flex shrink-0 items-start">
      <article className="w-[280px] shrink-0">
        <div className="mb-3 flex items-baseline gap-2">
          <span className="font-mono text-[10px] font-medium text-accent-clay">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h4 className="text-[13px] font-medium tracking-tight text-ink-950">{step.label}</h4>
            {step.route ? (
              <p className="mt-0.5 font-mono text-[10px] text-ink-400">{step.route}</p>
            ) : null}
          </div>
        </div>
        {step.explanation || step.detail ? (
          <p className="mb-4 min-h-[2.5rem] text-[11px] leading-relaxed text-ink-500">
            {step.explanation ?? step.detail}
          </p>
        ) : (
          <div className="mb-4 min-h-[2.5rem]" />
        )}
        <FlowScreenPreview screenKey={step.screenKey} label={step.label} />
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
        {step.analytics?.length ? (
          <p className="mt-3 text-[9px] leading-relaxed text-ink-400">
            <span className="font-medium uppercase tracking-[0.08em]">Events: </span>
            {step.analytics.join(" · ")}
          </p>
        ) : null}
      </article>
      {!isLast ? <FlowArrow /> : null}
    </div>
  );
}

function BranchOptionCard({ branch, index }) {
  return (
    <div className="w-[220px] shrink-0">
      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-mono text-[9px] text-ink-400">{String(index + 1).padStart(2, "0")}</span>
        <p className="text-[12px] font-medium text-ink-900">{branch.label}</p>
      </div>
      {branch.route ? (
        <p className="mb-2 font-mono text-[9px] text-ink-400">{branch.route}</p>
      ) : null}
      {branch.explanation ? (
        <p className="mb-3 text-[10px] leading-relaxed text-ink-500">{branch.explanation}</p>
      ) : null}
      <FlowScreenPreview screenKey={branch.screenKey} label={branch.label} />
    </div>
  );
}

function BranchStepCard({ step, index, isLast }) {
  return (
    <div className="flex shrink-0 items-start">
      <article className="w-auto shrink-0">
        <div className="mb-3 flex items-baseline gap-2">
          <span className="font-mono text-[10px] font-medium text-accent-clay">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink-600">Branch</p>
        </div>
        <div className="flex gap-3">
          {step.branches.map((branch, branchIdx) => (
            <BranchOptionCard key={branch.label} branch={branch} index={branchIdx} />
          ))}
        </div>
      </article>
      {!isLast ? <FlowArrow /> : null}
    </div>
  );
}

export default function FlowJourneyStrip({ steps, className = "" }) {
  return (
    <div className={className}>
      <div className="-mx-2 overflow-x-auto px-2 pb-4 scrollbar-thin">
        <div className="flex min-w-min items-start">
          {steps.map((step, index) =>
            step.type === "branch" ? (
              <BranchStepCard
                key={step.id ?? `branch-${index}`}
                step={step}
                index={index}
                isLast={index === steps.length - 1}
              />
            ) : (
              <FlowStepCard
                key={step.id ?? step.label}
                step={step}
                index={index}
                isLast={index === steps.length - 1}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
