import { useState } from "react";
import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import PageSection from "../components/workspace/PageSection.jsx";
import {
  DELIVERY_SEQUENCE,
  DESIGN_DELIVERABLES,
  DESIGN_PRIORITIES,
  getCurrentPhase,
  getUpcomingPhases,
  PLAN_CHECKPOINTS,
  PLAN_HERO,
  PLAN_TIMELINE,
} from "../content/plan.js";

function TimelineStrip() {
  const currentPhase = getCurrentPhase();

  return (
    <div className="mt-12 overflow-x-auto pb-2">
      <div className="flex min-w-[36rem] items-start gap-0">
        {PLAN_TIMELINE.map((step, idx) => {
          const isCurrent = step.id === currentPhase.id;
          return (
            <div key={step.id} className="flex flex-1 items-start">
              <div className="flex flex-1 flex-col items-center text-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-[11px] font-medium ${
                    isCurrent
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                      : "border-ink-200 bg-white text-ink-700"
                  }`}
                >
                  {isCurrent ? <span aria-hidden>🟢</span> : idx + 1}
                </div>
                <p className="mt-3 text-[12px] font-medium text-ink-900">{step.label}</p>
                <p className="mt-1 text-[11px] text-ink-500">{step.dates}</p>
              </div>
              {idx < PLAN_TIMELINE.length - 1 ? (
                <div className="mt-5 h-px w-full min-w-[1.5rem] flex-1 bg-gradient-to-r from-ink-200 via-ink-300/60 to-ink-200" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CurrentPhaseCard() {
  const phase = getCurrentPhase();
  const deliverables = phase.deliverables;
  const hasStatusObjects = deliverables[0] && typeof deliverables[0] === "object";
  const completed = hasStatusObjects
    ? deliverables.filter((d) => d.status === "complete").length
    : 0;
  const progress = hasStatusObjects ? Math.round((completed / deliverables.length) * 100) : 0;

  return (
    <article className="rounded-3xl border border-ink-950/10 bg-white/80 p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-12">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
            Phase {phase.number} · {phase.dates}
          </p>
          <div className="mt-4">
            <span className="text-[13px] text-ink-500">
              Gate · <span className="font-medium text-ink-800">{phase.gateDate}</span>
            </span>
          </div>
        </div>
        {hasStatusObjects ? (
          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">Progress</p>
            <p className="mt-1 text-[28px] font-medium tabular-nums tracking-tight text-ink-950">{progress}%</p>
          </div>
        ) : null}
      </div>

      {hasStatusObjects ? (
        <div className="mt-8 h-1 overflow-hidden rounded-full bg-ink-100">
          <div
            className="h-full rounded-full bg-ink-950 transition-all duration-700"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Phase progress"
          />
        </div>
      ) : null}

      <h3 className="mt-10 text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.1] tracking-tight text-ink-950">
        {phase.title}
      </h3>
      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-600">{phase.objective}</p>

      <div className="mt-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">Deliverables</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {deliverables.map((item) => {
            if (typeof item === "string") {
              return (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-ink-200/60 bg-paper-50/80 px-4 py-3.5 text-[14px] text-ink-700"
                >
                  <span className="text-ink-300" aria-hidden>
                    ·
                  </span>
                  {item}
                </li>
              );
            }
            return (
              <li
                key={item.label}
                className="flex items-center gap-2.5 rounded-xl border border-ink-200/60 bg-paper-50/80 px-4 py-3.5 text-[14px] text-ink-800"
              >
                <span className="text-ink-300" aria-hidden>
                  ·
                </span>
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>

      {phase.engineeringOutcome && typeof phase.engineeringOutcome === "object" ? (
        <div className="mt-10 rounded-2xl border border-ink-200/60 bg-paper-50/50 p-6 md:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">Engineering Outcome</p>
          <p className="mt-3 text-[15px] font-medium text-ink-900">{phase.engineeringOutcome.title}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {phase.engineeringOutcome.items.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[14px] text-ink-700">
                <span className="text-ink-400" aria-hidden>
                  ·
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

function UpcomingPhaseCard({ phase, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <article className="overflow-hidden rounded-2xl border border-ink-200/70 bg-white/60 transition-colors hover:border-ink-300/80">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left md:px-8 md:py-7"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
              Phase {phase.number}
            </span>
            <span className="text-[13px] text-ink-500">{phase.dates}</span>
          </div>
          <h3 className="mt-2 text-[18px] font-medium tracking-tight text-ink-950 md:text-[20px]">
            {phase.title}
          </h3>
          {!isOpen ? <p className="mt-2 line-clamp-1 text-[14px] text-ink-500">{phase.objective}</p> : null}
        </div>
        <span
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200/80 text-[18px] leading-none text-ink-400"
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen ? (
        <div className="border-t border-ink-200/50 px-6 pb-7 pt-5 md:px-8 md:pb-8">
          <p className="text-[14px] leading-relaxed text-ink-600">{phase.objective}</p>

          <div className="mt-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">Deliverables</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {phase.deliverables.map((item) => (
                <li
                  key={typeof item === "string" ? item : item.label}
                  className="flex items-center gap-2.5 text-[14px] text-ink-700"
                >
                  <span className="text-ink-300" aria-hidden>
                    ·
                  </span>
                  {typeof item === "string" ? item : item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-xl border border-ink-200/50 bg-paper-50/60 px-5 py-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">Engineering Outcome</p>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
              {typeof phase.engineeringOutcome === "string"
                ? phase.engineeringOutcome
                : phase.engineeringOutcome.title}
            </p>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function CheckpointList() {
  return (
    <div className="space-y-3">
      {PLAN_CHECKPOINTS.map((checkpoint) => (
        <div
          key={`${checkpoint.phase}-${checkpoint.date}`}
          className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-5 py-4 ${
            checkpoint.highlight
              ? "border-emerald-200/60 bg-emerald-50/40"
              : "border-ink-200/80 bg-white/55"
          }`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
              {checkpoint.phase}
            </span>
            <span className="text-[14px] text-ink-800">{checkpoint.gate}</span>
          </div>
          <span className="rounded-full border border-ink-200/70 bg-paper-100 px-3 py-1 text-[11px] text-ink-600">
            {checkpoint.date}
          </span>
        </div>
      ))}
    </div>
  );
}

function DeliverablesBoard() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {DESIGN_DELIVERABLES.map((category) => (
        <article
          key={category.id}
          className="flex flex-col rounded-2xl border border-ink-200/70 bg-white/60 p-6 md:p-8"
        >
          <h3 className="text-[17px] font-medium tracking-tight text-ink-950">{category.title}</h3>
          <ul className="mt-6 flex-1 space-y-2.5">
            {category.items.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[14px] text-ink-700">
                <span className="h-px w-3 shrink-0 bg-ink-300" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function DeliverySequenceFlow() {
  return (
    <div className="mx-auto max-w-xl">
      {DELIVERY_SEQUENCE.map((stage, index) => (
        <div key={stage.id}>
          <div className="rounded-2xl border border-ink-200/70 bg-white/60 px-6 py-5 md:px-8 md:py-6">
            <h3 className="text-[16px] font-medium tracking-tight text-ink-950">{stage.label}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-600">{stage.description}</p>
          </div>
          {index < DELIVERY_SEQUENCE.length - 1 ? (
            <div className="flex justify-center py-3" aria-hidden>
              <span className="text-[20px] leading-none text-ink-300">↓</span>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function PriorityList() {
  return (
    <div className="space-y-5">
      {DESIGN_PRIORITIES.map((priority) => (
        <article
          key={priority.id}
          className="flex flex-col gap-5 rounded-2xl border border-ink-200/70 bg-white/60 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8"
        >
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
              Priority {priority.rank}
            </p>
            <h3 className="mt-1.5 text-[17px] font-medium tracking-tight text-ink-950">{priority.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {priority.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-ink-200/70 bg-paper-50 px-3.5 py-1.5 text-[13px] text-ink-700"
              >
                {item}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function PlanPage() {
  const upcomingPhases = getUpcomingPhases();

  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id="plan-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-16 pt-28 md:pb-20 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                {PLAN_HERO.title}
              </h1>
              <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-700">{PLAN_HERO.intro}</p>
              <TimelineStrip />
            </motion.div>
          </div>
        </section>

        <PageSection id="plan-current" label="Current" title="Current Phase">
          <CurrentPhaseCard />
        </PageSection>

        <PageSection id="plan-phases" label="Upcoming" title="Upcoming Phases">
          <div className="space-y-4">
            {upcomingPhases.map((phase, index) => (
              <UpcomingPhaseCard key={phase.id} phase={phase} defaultOpen={index === 0} />
            ))}
          </div>
        </PageSection>

        <PageSection id="plan-checkpoints" label="Gates" title="Phase Gates">
          <CheckpointList />
        </PageSection>

        <PageSection id="plan-deliverables" label="Deliverables" title="Design Deliverables">
          <DeliverablesBoard />
        </PageSection>

        <PageSection id="plan-sequence" label="Sequence" title="Delivery Sequence">
          <DeliverySequenceFlow />
        </PageSection>

        <PageSection id="plan-priorities" label="Priorities" title="Current Priorities" className="border-b-0">
          <PriorityList />
        </PageSection>
      </main>
    </SiteChrome>
  );
}
