import { useState } from "react";
import { openScreenUrl } from "../../content/inspiration.js";

function StepArrow() {
  return (
    <div className="hidden shrink-0 items-center self-center px-0.5 sm:flex" aria-hidden>
      <div className="h-px w-4 bg-ink-300" />
      <svg className="h-3 w-3 text-ink-400" viewBox="0 0 12 12" fill="none">
        <path d="M2 6h7M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ScreenLightbox({ screen, onClose }) {
  if (!screen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={screen.label}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-white/20"
      >
        Close
      </button>
      <figure className="max-h-[90vh] max-w-[min(420px,90vw)]" onClick={(e) => e.stopPropagation()}>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-950 shadow-2xl">
          <img
            src={openScreenUrl(screen.index)}
            alt={screen.label}
            className="max-h-[82vh] w-full object-contain"
          />
        </div>
        <figcaption className="mt-3 text-center">
          <p className="text-[14px] font-medium text-white">{screen.label}</p>
          {screen.detail ? (
            <p className="mt-1 text-[12px] leading-relaxed text-white/60">{screen.detail}</p>
          ) : null}
        </figcaption>
      </figure>
    </div>
  );
}

function FlowScreen({ step, stepIndex, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(step)}
      className="flex w-[200px] shrink-0 flex-col text-left transition-transform hover:-translate-y-0.5 sm:w-[220px]"
    >
      <div className="mb-3 flex items-start gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-paper-100 font-mono text-[9px] text-ink-600">
          {String(stepIndex + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="text-[12px] font-semibold leading-snug text-ink-900">{step.label}</p>
          {step.detail ? (
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-ink-500">{step.detail}</p>
          ) : null}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-ink-200/80 bg-ink-950 shadow-sm ring-0 transition-shadow hover:shadow-md hover:ring-2 hover:ring-ink-300/40">
        <img
          src={openScreenUrl(step.index)}
          alt={step.label}
          loading="lazy"
          className="aspect-[9/19.5] w-full object-cover object-top"
        />
      </div>
      <span className="mt-2 font-mono text-[10px] text-ink-400">#{step.index}</span>
    </button>
  );
}

export function InspirationFlowJourney({ flow, index }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <article className="rounded-2xl border border-ink-200/80 bg-white/50 p-5 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">
              Flow {String(index + 1).padStart(2, "0")} · Open iOS
            </p>
            <h3 className="mt-2 text-[clamp(1.05rem,2vw,1.35rem)] font-medium leading-snug tracking-tight text-ink-950">
              {flow.title}
            </h3>
            {flow.summary ? (
              <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-600">{flow.summary}</p>
            ) : null}
            {flow.sonoceaTask ? (
              <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-ink-500">
                <span className="font-medium text-ink-700">What we are doing · </span>
                {flow.sonoceaTask}
              </p>
            ) : null}
          </div>
          <span className="rounded-full border border-ink-200/80 bg-paper-100 px-2.5 py-1 font-mono text-[10px] text-ink-500">
            {flow.steps.length} screens
          </span>
        </div>

        <div className="mt-8 -mx-1 overflow-x-auto px-1 pb-2">
          <div className="flex min-w-min items-start gap-2 sm:gap-3">
            {flow.steps.map((step, stepIdx) => (
              <div key={`${flow.id}-${step.index}-${stepIdx}`} className="flex shrink-0 items-start">
                <FlowScreen step={step} stepIndex={stepIdx} onSelect={setLightbox} />
                {stepIdx < flow.steps.length - 1 ? <StepArrow /> : null}
              </div>
            ))}
          </div>
        </div>
      </article>

      <ScreenLightbox screen={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
