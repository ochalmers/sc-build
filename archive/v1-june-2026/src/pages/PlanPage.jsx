import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import { FlowSection } from "../flows/FlowSection.jsx";
import {
  DELIVERY_PLAN_CHECKPOINTS,
  DELIVERY_PLAN_FEEDBACK_LOOP,
  DELIVERY_PLAN_META,
  DELIVERY_PLAN_OUTPUTS,
  DELIVERY_PLAN_PHASES,
  DELIVERY_PLAN_PRINCIPLES,
  DELIVERY_PLAN_PRODUCT_AREAS,
  DELIVERY_PLAN_TIMELINE,
} from "../content/deliveryPlan.js";

function ListBlock({ title, items }) {
  return (
    <div>
      <h4 className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-700">
            <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-ink-300" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineStrip() {
  return (
    <div className="mt-14 overflow-x-auto pb-2">
      <div className="flex min-w-[36rem] items-start gap-0">
        {DELIVERY_PLAN_TIMELINE.map((step, idx) => (
          <div key={step.id} className="flex flex-1 items-start">
            <div className="flex flex-1 flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-[11px] font-medium text-ink-700">
                {idx + 1}
              </div>
              <p className="mt-3 text-[12px] font-medium text-ink-900">{step.label}</p>
              <p className="mt-1 text-[11px] text-ink-500">{step.dates}</p>
            </div>
            {idx < DELIVERY_PLAN_TIMELINE.length - 1 ? (
              <div className="mt-5 h-px w-full min-w-[1.5rem] flex-1 bg-gradient-to-r from-ink-200 via-ink-300/60 to-ink-200" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function PhaseCard({ phase }) {
  return (
    <article
      id={phase.id}
      className="scroll-mt-[7rem] rounded-2xl border border-ink-200/80 bg-white/55 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
            Phase {phase.number}
          </p>
          <h3 className="mt-2 text-[clamp(1.15rem,2.2vw,1.5rem)] font-medium tracking-tight text-ink-950">
            {phase.title}
          </h3>
        </div>
        <span className="rounded-full border border-ink-200/80 bg-paper-100 px-3 py-1.5 text-[11px] text-ink-600">
          {phase.dates}
        </span>
      </div>

      <p className="mt-5 text-[14px] leading-relaxed text-ink-600">{phase.objective}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <ListBlock title="Activities" items={phase.activities} />
        <ListBlock title="Deliverables" items={phase.deliverables} />
      </div>

      {phase.keyScreens ? (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {Object.entries(phase.keyScreens).map(([role, screens]) => (
            <div key={role} className="rounded-xl border border-ink-200/70 bg-paper-50/80 p-4">
              <h4 className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">{role}</h4>
              <ul className="mt-3 space-y-1.5">
                {screens.map((screen) => (
                  <li key={screen} className="text-[12px] leading-snug text-ink-700">
                    {screen}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      {phase.designSystemComponents ? (
        <div className="mt-8">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
            Design system components
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {phase.designSystemComponents.map((comp) => (
              <span
                key={comp}
                className="rounded-full border border-ink-200/70 bg-white px-3 py-1 text-[11px] text-ink-700"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {phase.sessionArtwork ? (
        <div className="mt-8">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
            Session artwork system
          </h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {phase.sessionArtwork.groups.map((group) => (
              <div key={group.name} className="rounded-xl border border-ink-200/70 bg-paper-50/80 p-4">
                <p className="text-[12px] font-medium text-ink-900">{group.name}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-ink-600">
                  {group.examples.join(" · ")}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-ink-600">{phase.sessionArtwork.themeNote}</p>
        </div>
      ) : null}

      {phase.prototypeFlow ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
              Final prototype flow
            </h4>
            <ol className="mt-3 space-y-2">
              {phase.prototypeFlow.map((step, idx) => (
                <li key={step} className="flex gap-3 text-[12px] text-ink-700">
                  <span className="w-5 shrink-0 text-[10px] text-ink-400">{idx + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
              States to include
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {phase.states.map((state) => (
                <span
                  key={state}
                  className="rounded-full border border-ink-200/70 bg-white px-3 py-1 text-[11px] text-ink-700"
                >
                  {state}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-8 rounded-xl border border-ink-200/70 bg-paper-50/60 p-5">
        <h4 className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
          {phase.feedback.method ? "Feedback method" : "Feedback session"}
        </h4>
        <p className="mt-2 text-[14px] font-medium text-ink-900">{phase.feedback.title}</p>
        {phase.feedback.attendees ? (
          <p className="mt-2 text-[12px] text-ink-600">
            Attendees: {phase.feedback.attendees.join(" · ")}
          </p>
        ) : null}
        {phase.feedback.agenda ? (
          <ol className="mt-4 space-y-2">
            {phase.feedback.agenda.map((item, idx) => (
              <li key={item} className="flex gap-3 text-[13px] text-ink-700">
                <span className="w-5 shrink-0 text-[10px] text-ink-400">{idx + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        ) : null}
        {phase.feedback.note ? (
          <p className="mt-4 text-[12px] leading-relaxed text-accent-clay">{phase.feedback.note}</p>
        ) : null}
      </div>

      <div className="mt-6">
        <h4 className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Sign-off required</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {phase.signOff.map((item) => (
            <li
              key={item}
              className="rounded-full border border-ink-200/80 bg-white px-3 py-1.5 text-[11px] text-ink-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {phase.lockNote ? (
        <p className="mt-5 text-[12px] leading-relaxed text-ink-500">{phase.lockNote}</p>
      ) : null}
    </article>
  );
}

function FeedbackLoopDiagram() {
  const { steps, rules } = DELIVERY_PLAN_FEEDBACK_LOOP;

  return (
    <div className="space-y-10">
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-[36rem] items-center justify-between gap-2">
          {steps.map((step, idx) => (
            <div key={step} className="flex flex-1 items-center">
              <div className="rounded-xl border border-ink-200/80 bg-white/70 px-3 py-2.5 text-center text-[11px] leading-snug text-ink-800">
                {step}
              </div>
              {idx < steps.length - 1 ? (
                <span className="mx-1 shrink-0 text-ink-300" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {rules.map((rule) => (
          <li
            key={rule}
            className="rounded-xl border border-ink-200/70 bg-paper-100/80 px-4 py-3 text-[13px] leading-relaxed text-ink-700"
          >
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PlanPage() {
  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id="plan-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-28 md:pb-28 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                Design programme · {DELIVERY_PLAN_META.dateRange}
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                {DELIVERY_PLAN_META.title}
                <span className="mt-2 block text-[clamp(1.5rem,3vw,2.25rem)] text-ink-700">
                  {DELIVERY_PLAN_META.subtitle}
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                {DELIVERY_PLAN_META.description}
              </p>

              <TimelineStrip />

              <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {DELIVERY_PLAN_PRODUCT_AREAS.map((area) => (
                  <div
                    key={area.role}
                    className={`rounded-2xl border p-5 ${
                      area.priority
                        ? "border-ink-300/60 bg-white/80"
                        : "border-ink-200/70 bg-white/55"
                    }`}
                  >
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                      {area.surface}
                      {area.priority ? " · priority" : ""}
                    </p>
                    <h2 className="mt-2 text-[16px] font-medium tracking-tight text-ink-950">{area.role}</h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{area.summary}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-ink-200/70 bg-white/50 px-5 py-4">
                <p className="text-[13px] leading-relaxed text-ink-600">
                  Programme kickoff {DELIVERY_PLAN_META.programmeStart}. Phase 1 delivers all revised PRD
                  flows and two hi-fi concepts by July 11. The full high-fidelity prototype and engineering
                  handoff package follows by {DELIVERY_PLAN_META.programmeEnd}.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <FlowSection
          id="plan-principles"
          label="Programme principles"
          title="How we will work"
          description="Four principles to keep the programme calm, structured and product-led."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {DELIVERY_PLAN_PRINCIPLES.map((principle, idx) => (
              <div
                key={principle.title}
                className="rounded-2xl border border-ink-200/80 bg-white/55 p-6"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-400">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[16px] font-medium tracking-tight text-ink-950">
                  {principle.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-600">{principle.body}</p>
              </div>
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="plan-roadmap"
          label="Roadmap"
          title="Four stages over four weeks"
          description={`From product definition (${DELIVERY_PLAN_META.programmeStart}) through to high-fidelity prototype and engineering handoff (${DELIVERY_PLAN_META.programmeEnd}).`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERY_PLAN_TIMELINE.map((step) => (
              <a
                key={step.id}
                href={`#plan-${step.id}`}
                className="rounded-2xl border border-ink-200/80 bg-white/55 p-5 transition-colors hover:border-ink-300"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                  {step.label}
                </p>
                <p className="mt-2 text-[13px] text-ink-700">{step.dates}</p>
              </a>
            ))}
          </div>
        </FlowSection>

        <section id="plan-phases" className="scroll-mt-[7rem] border-b border-ink-200/60 py-20 md:py-28">
          <div className="max-w-content mx-auto px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">Phase detail</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.15] tracking-tight text-ink-950">
              Delivery phases
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-600">
              Each phase produces clear deliverables, a feedback session, and sign-off before the next
              stage begins.
            </p>
            <div className="mt-12 space-y-8">
              {DELIVERY_PLAN_PHASES.map((phase) => (
                <PhaseCard key={phase.id} phase={phase} />
              ))}
            </div>
          </div>
        </section>

        <FlowSection
          id="plan-feedback"
          label="Feedback loop"
          title="Review, consolidate, revise, sign off"
          description="How stakeholder feedback flows into each phase without creating design churn."
        >
          <FeedbackLoopDiagram />
        </FlowSection>

        <FlowSection
          id="plan-outputs"
          label="Final output"
          title={`What we will have by ${DELIVERY_PLAN_META.programmeEnd}`}
          description="The complete design programme output across product definition, UX, UI, prototype and handoff."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DELIVERY_PLAN_OUTPUTS.map((group) => (
              <div key={group.category} className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
                <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-500">
                  {group.category}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-700">
                      <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-ink-400" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="plan-checkpoints"
          label="Decision checkpoints"
          title="Phase gates"
          description="Clear decision points that unlock each subsequent stage of the programme."
          className="border-b-0"
        >
          <div className="space-y-3">
            {DELIVERY_PLAN_CHECKPOINTS.map((checkpoint) => (
              <div
                key={`${checkpoint.phase}-${checkpoint.date}`}
                className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-5 py-4 ${
                  checkpoint.highlight
                    ? "border-accent-clay/35 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(185,133,110,0.08),transparent_55%)] bg-white/60"
                    : "border-ink-200/80 bg-white/55"
                }`}
              >
                <div className="flex items-center gap-4">
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
        </FlowSection>
      </main>
    </SiteChrome>
  );
}
