function StepSeparator() {
  return (
    <span className="mx-2 shrink-0 text-[13px] text-ink-300" aria-hidden>
      →
    </span>
  );
}

export default function FlowSequenceStrip({ steps, className = "" }) {
  return (
    <div
      className={`flex flex-wrap items-baseline gap-y-2 text-[15px] leading-relaxed tracking-tight ${className}`}
    >
      {steps.map((step, index) => (
        <span key={`${step.label}-${index}`} className="inline-flex items-baseline">
          <span
            className={
              step.screenKey
                ? "font-medium text-ink-900 underline decoration-ink-400/80 decoration-1 underline-offset-[5px]"
                : "text-ink-500"
            }
          >
            {step.label}
          </span>
          {index < steps.length - 1 ? <StepSeparator /> : null}
        </span>
      ))}
    </div>
  );
}
