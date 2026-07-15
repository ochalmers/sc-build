import { useState } from "react";
import SiteChrome from "../components/SiteChrome.jsx";
import PageHero from "../components/workspace/PageHero.jsx";
import PageSection from "../components/workspace/PageSection.jsx";
import { PAGE_MAIN } from "../components/workspace/pageLayout.js";
import {
  DELIVERY_SEQUENCE,
  DESIGN_DELIVERABLES,
  DESIGN_REVIEWS,
  getCurrentPhase,
  getUpcomingPhases,
  NEXT_DESIGN_DELIVERABLES,
  PLAN_CHECKPOINTS,
  PLAN_HERO,
  PLAN_TIMELINE,
} from "../content/plan.js";

function TimelineStrip() {
  const currentPhase = getCurrentPhase();

  return (
    <div className="mt-8 overflow-x-auto pb-2">
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

function CurrentDeliveryCard() {
  const phase = getCurrentPhase();
  const categories = phase.deliveryCategories ?? [];

  return (
    <article className="rounded-3xl border border-ink-950/12 bg-white/90 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:p-14">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
            Delivery 1 · {phase.dates}
          </p>
          <div className="mt-4">
            <span className="text-[13px] text-ink-500">
              Due · <span className="font-medium text-ink-800">{phase.gateDate}</span>
            </span>
          </div>
        </div>
        <span className="rounded-full border border-emerald-200/70 bg-emerald-50/60 px-3.5 py-1.5 text-[12px] font-medium text-emerald-800">
          This week
        </span>
      </div>

      <h3 className="mt-10 text-[clamp(1.625rem,3.2vw,2.125rem)] font-medium leading-[1.1] tracking-tight text-ink-950">
        {phase.title}
      </h3>
      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-600">{phase.objective}</p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {categories.map((category) => (
          <div key={category.title}>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">{category.title}</p>
            <ul className="mt-4 space-y-2.5">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-ink-200/60 bg-paper-50/80 px-4 py-3 text-[14px] text-ink-700"
                >
                  <span className="text-ink-300" aria-hidden>
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {phase.engineeringCanBuild?.length ? (
        <div className="mt-12 rounded-2xl border border-emerald-200/50 bg-emerald-50/30 p-6 md:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-800/70">
            Engineering can begin building
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {phase.engineeringCanBuild.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[14px] text-ink-800">
                <span className="text-emerald-500" aria-hidden>
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

function UpcomingDeliveryCard({ phase, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const goal = phase.goal ?? phase.objective;
  const deliverables = phase.deliverables ?? [];

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
              Delivery {phase.number}
            </span>
            <span className="text-[13px] text-ink-500">{phase.dates}</span>
          </div>
          <h3 className="mt-2 text-[18px] font-medium tracking-tight text-ink-950 md:text-[20px]">
            {phase.title}
          </h3>
          {!isOpen ? <p className="mt-2 line-clamp-1 text-[14px] text-ink-500">{goal}</p> : null}
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
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">Goal</p>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-600">{goal}</p>
          </div>

          <div className="mt-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">Deliverables</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {deliverables.map((item) => (
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
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
              Outcome for Engineering
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
              {typeof phase.engineeringOutcome === "string"
                ? phase.engineeringOutcome
                : phase.engineeringOutcome?.title}
            </p>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function DesignReviewsSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {DESIGN_REVIEWS.map((review) => (
        <article
          key={review.id}
          className="rounded-2xl border border-ink-200/60 bg-white/50 px-5 py-5 md:px-6 md:py-6"
        >
          <h3 className="text-[15px] font-medium tracking-tight text-ink-950">{review.title}</h3>
          <p className="mt-3 text-[13px] leading-relaxed text-ink-600">
            <span className="text-ink-500">Purpose: </span>
            {review.purpose}
          </p>
        </article>
      ))}
    </div>
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

function NextDesignDeliverables() {
  return (
    <div className="flex flex-wrap gap-3">
      {NEXT_DESIGN_DELIVERABLES.map((item) => (
        <span
          key={item}
          className="rounded-full border border-ink-200/70 bg-white/60 px-4 py-2 text-[14px] text-ink-800"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function PlanPage() {
  const upcomingPhases = getUpcomingPhases();

  return (
    <SiteChrome>
      <main className={PAGE_MAIN}>
        <PageHero
          id="plan-intro"
          title={PLAN_HERO.title}
          description={PLAN_HERO.intro}
          withGradient
        >
          <TimelineStrip />
        </PageHero>

        <PageSection id="plan-current" label="Current" title="Current Delivery">
          <CurrentDeliveryCard />
        </PageSection>

        <PageSection id="plan-phases" label="Upcoming" title="Upcoming Deliveries">
          <div className="space-y-4">
            {upcomingPhases.map((phase, index) => (
              <UpcomingDeliveryCard key={phase.id} phase={phase} defaultOpen={index === 0} />
            ))}
          </div>
        </PageSection>

        <PageSection id="plan-reviews" label="Reviews" title="Design Reviews & Team Check-ins">
          <DesignReviewsSection />
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

        <PageSection id="plan-priorities" label="In Progress" title="Next Design Deliverables" className="border-b-0">
          <NextDesignDeliverables />
        </PageSection>
      </main>
    </SiteChrome>
  );
}
