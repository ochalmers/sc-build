function Arrow() {
  return (
    <div className="flex justify-center py-3" aria-hidden>
      <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
        <path d="M6 0V16M6 16L1 11M6 16L11 11" stroke="#c4c4bc" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function StepIndex({ index }) {
  return (
    <span className="font-mono text-[10px] font-medium text-accent-clay">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

function FlowCard({ label, route, explanation, compact = false }) {
  return (
    <div
      className={`rounded-xl border border-ink-200/70 bg-white/80 ${
        compact ? "px-4 py-3.5" : "px-5 py-4"
      }`}
    >
      <p className={`font-medium tracking-tight text-ink-950 ${compact ? "text-[13px]" : "text-[15px]"}`}>
        {label}
      </p>
      {route ? (
        <p className={`mt-1 font-mono text-ink-400 ${compact ? "text-[10px]" : "text-[11px]"}`}>{route}</p>
      ) : null}
      {explanation ? (
        <p
          className={`leading-relaxed text-ink-600 ${
            compact ? "mt-1.5 text-[11px]" : "mt-2 text-[13px]"
          }`}
        >
          {explanation}
        </p>
      ) : null}
    </div>
  );
}

function BranchGrid({ branches }) {
  const cols =
    branches.length >= 3 ? "sm:grid-cols-3" : branches.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1";

  return (
    <div className={`grid gap-3 ${cols}`}>
      {branches.map((branch) => (
        <FlowCard
          key={branch.label}
          label={branch.label}
          route={branch.route}
          explanation={branch.explanation}
          compact
        />
      ))}
    </div>
  );
}

export default function FlowDiagram({ steps }) {
  let stepNumber = 0;

  return (
    <div className="mx-auto max-w-3xl">
      {steps.map((step, index) => {
        const currentStep = stepNumber++;

        return (
          <div key={step.id ?? step.label}>
            {step.type === "branch" ? (
              <div>
                <div className="mb-3 flex items-baseline gap-2">
                  <StepIndex index={currentStep} />
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">Branch</p>
                </div>
                <BranchGrid branches={step.branches} />
              </div>
            ) : (
              <div>
                <div className="mb-3 flex items-baseline gap-2">
                  <StepIndex index={currentStep} />
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">Step</p>
                </div>
                <FlowCard label={step.label} route={step.route} explanation={step.explanation} />
              </div>
            )}
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        );
      })}
    </div>
  );
}
