import { DesignAppScreen } from "../DesignAppScreen.jsx";
import { resolveScreen } from "./screenRegistry.js";

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

function FlowStep({ step, isLast }) {
  const resolved = resolveScreen(step.screenKey);
  const { Screen, props } = resolved ?? { Screen: null, props: {} };

  return (
    <div className="flex shrink-0 items-start">
      <article className="w-[280px] shrink-0">
        <div className="mb-3 flex items-baseline gap-2">
          <span className="font-mono text-[10px] font-medium text-accent-clay">{String(step.num).padStart(2, "0")}</span>
          <h4 className="text-[13px] font-medium tracking-tight text-ink-950">{step.label}</h4>
        </div>
        <p className="mb-4 min-h-[2.5rem] text-[11px] leading-relaxed text-ink-500">{step.detail}</p>
        {Screen ? (
          <DesignAppScreen>
            <Screen {...props} />
          </DesignAppScreen>
        ) : (
          <div className="flex aspect-[333/724] items-center justify-center rounded-[1.65rem] border border-dashed border-ink-300 bg-paper-50 text-[11px] text-ink-400">
            Screen pending
          </div>
        )}
        {step.events?.length ? (
          <p className="mt-3 text-[9px] leading-relaxed text-ink-400">
            <span className="font-medium uppercase tracking-[0.08em]">Events: </span>
            {step.events.join(" · ")}
          </p>
        ) : null}
      </article>
      {!isLast ? <FlowArrow /> : null}
    </div>
  );
}

export function PrdFlowJourney({ flow, index }) {
  return (
    <article
      id={flow.id}
      className="scroll-mt-[8rem] rounded-2xl border border-ink-200/70 bg-white/40 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start gap-3">
        <span className="font-mono text-[11px] text-ink-400">{String(index + 1).padStart(2, "0")}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[clamp(1.05rem,2vw,1.25rem)] font-medium tracking-tight text-ink-950">
              {flow.title}
            </h3>
            {flow.role ? (
              <span className="rounded-full border border-ink-200/80 bg-paper-50 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-ink-500">
                {flow.role}
              </span>
            ) : null}
          </div>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-600">{flow.summary}</p>
          {flow.prdRef ? <p className="mt-1 text-[11px] text-ink-400">{flow.prdRef}</p> : null}
        </div>
        <span className="shrink-0 rounded-full border border-ink-200/60 bg-paper-50 px-2.5 py-1 text-[10px] font-medium text-ink-500">
          {flow.steps.length} steps
        </span>
      </div>

      <div className="relative mt-8">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white/90 to-transparent"
          aria-hidden
        />
        <div className="-mx-2 overflow-x-auto px-2 pb-4 scrollbar-thin">
          <div className="flex min-w-min items-start">
            {flow.steps.map((step, i) => (
              <FlowStep key={`${flow.id}-${step.num}`} step={step} isLast={i === flow.steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function PrdFlowGroupSection({ group }) {
  return (
    <section id={group.sectionId} className="scroll-mt-[7rem] border-b border-ink-200/60 py-20 md:py-28">
      <div className="max-w-content mx-auto px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent-clay">{group.label}</p>
        <h2 className="mt-3 max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.15] tracking-tight text-ink-950">
          {group.title}
        </h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-600">{group.description}</p>

        <div className="mt-12 space-y-8">
          {group.flows.map((flow, i) => (
            <PrdFlowJourney key={flow.id} flow={flow} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
