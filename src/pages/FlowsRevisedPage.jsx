import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import {
  PRD_REVISED_META,
  PRD_RELATIONSHIP,
  PRD_REVISED_ROLES,
  PUBLIC_DESIGN_PRINCIPLES,
  PUBLIC_GOLDEN_ROUTE,
  PUBLIC_JOURNEY_LAYERS,
  PUBLIC_PERSISTENT_NAV,
  PUBLIC_SCREEN_CHECKLIST,
  MOBILE_SCREEN_MAP_REVISED,
  MOBILE_SUCCESS_CRITERIA,
  PUBLIC_SUCCESS_CRITERIA,
  PUBLIC_FUNCTIONAL_REQUIREMENTS,
  PUBLIC_ANALYTICS_EVENTS,
  PUBLIC_ERROR_STATES,
  REVISED_OUT_OF_SCOPE,
  PUBLIC_FUTURE_EXPLORATION,
  CLINICAL_USE_CASE_FAMILIES,
  PUBLIC_VISITOR_STORIES,
  MOBILE_APP_STORY_GROUPS,
  PUBLIC_VISITOR_FLOW_GROUPS,
  REVISED_FUNCTIONAL_FLOW_GROUPS,
  publicVisitorFlowCount,
} from "../content/prdRevised/index.js";
import { FlowSection } from "../flows/FlowSection.jsx";
import { UserStoryCard } from "../flows/UserStoryCard.jsx";
import { FunctionalFlowCard } from "../flows/FunctionalFlowCard.jsx";
import { FlowWireframeJourney } from "../flows/FlowWireframeJourney.jsx";
import { FlowCard } from "../flows/FlowCard.jsx";
import { WireframeById } from "../flows/wireframes/WireframeScreens.jsx";

function mobileStoryCount() {
  return MOBILE_APP_STORY_GROUPS.reduce((n, g) => n + g.stories.length, 0);
}

function flowHasWireframes(flow) {
  return flow.steps?.some((s) => s.wireframeId);
}

export default function FlowsRevisedPage() {
  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id="revised-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-28 md:pb-28 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                June 28, 2026 · revised PRDs
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                Revised PRD catalogue
              </h1>
              <p className="mt-4 text-[18px] font-medium tracking-tight text-ink-700">
                Public Visitor + Mobile App v1.0 — contextualised flows, wireframes, and user stories.
              </p>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                Processed from Ryan Schmaltz&apos;s June 2026 drafts. The Public Visitor PRD introduces a
                curated first-time experience with a 5-minute sample — a significant shift from the Nov 2025
                public shell. Provisioned Listener, Partner, and Admin journeys remain aligned with the revised
                Mobile App PRD. Pair with{" "}
                <Link to="/designs/prd" className="text-ink-800 underline decoration-ink-300 underline-offset-2">
                  PRD designs
                </Link>{" "}
                and the{" "}
                <Link to="/prototype/prd" className="text-ink-800 underline decoration-ink-300 underline-offset-2">
                  clickable prototype
                </Link>
                .
              </p>

              <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Public Visitor stories
                  </dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">
                    {PUBLIC_VISITOR_STORIES.length}
                  </dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Public Visitor flows
                  </dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">
                    {publicVisitorFlowCount()}
                  </dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Mobile app stories
                  </dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">{mobileStoryCount()}</dd>
                </div>
                <div className="rounded-2xl border border-accent-clay/30 bg-accent-clay/5 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent-clay">
                    Last updated
                  </dt>
                  <dd className="mt-2 text-[13px] leading-snug text-ink-700">
                    {PRD_REVISED_META.mobile.lastUpdated}
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <span className="rounded-full border border-ink-200/80 bg-white/70 px-3 py-1.5 text-[11px] text-ink-700">
                  {PRD_REVISED_META.publicVisitor.title}
                </span>
                <span className="rounded-full border border-ink-200/80 bg-white/70 px-3 py-1.5 text-[11px] text-ink-700">
                  {PRD_REVISED_META.mobile.title} {PRD_REVISED_META.mobile.version}
                </span>
                <span className="rounded-full border border-ink-200/80 bg-white/70 px-3 py-1.5 text-[11px] text-ink-500">
                  {PRD_REVISED_META.mobile.status}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <FlowSection
          id="revised-relationship"
          label="Context"
          title={PRD_RELATIONSHIP.title}
          description={PRD_RELATIONSHIP.summary}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {PRD_RELATIONSHIP.points.map((point) => (
              <div key={point.label} className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
                <h3 className="text-[14px] font-medium text-ink-900">{point.label}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-600">{point.body}</p>
              </div>
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="revised-roles"
          label="Actors"
          title="User roles across both PRDs"
          description="Public Visitor and Invited Participant are new explicit roles; Listener provisioning unchanged."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRD_REVISED_ROLES.map((role) => (
              <div key={role.id} className="rounded-2xl border border-ink-200/80 bg-white/55 p-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">{role.prd}</p>
                <h3 className="mt-2 text-[16px] font-medium text-ink-950">{role.label}</h3>
                <p className="mt-1 text-[11px] text-ink-500">{role.surface}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-600">{role.summary}</p>
              </div>
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="revised-pv-stories"
          label="Public Visitor"
          title="Public Visitor user stories"
          description="PV-01–05, IP-01–02, and SA-01 from the Public Visitor PRD §2."
        >
          <div className="space-y-10">
            {PUBLIC_VISITOR_STORIES.map((story, idx) => (
              <UserStoryCard key={story.id} story={story} index={idx} />
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="revised-golden-route"
          label="Golden route"
          title="First-time Public Visitor journey"
          description="Experience before explanation — design principles and layered information architecture."
        >
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PUBLIC_DESIGN_PRINCIPLES.map((p, i) => (
              <div key={p} className="rounded-xl border border-ink-200/80 bg-white/55 p-4">
                <span className="text-[10px] font-medium text-ink-400">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-[13px] leading-snug text-ink-800">{p}</p>
              </div>
            ))}
          </div>

          <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">Golden route steps</h3>
          <div className="mt-4 overflow-x-auto pb-2">
            <div className="flex min-w-[36rem] items-center gap-2">
              {PUBLIC_GOLDEN_ROUTE.map((step, idx) => (
                <div key={step.id} className="flex items-center">
                  <div className="rounded-xl border border-ink-200/80 bg-white/70 px-3 py-2.5 text-center text-[11px] leading-snug text-ink-800">
                    {step.label}
                  </div>
                  {idx < PUBLIC_GOLDEN_ROUTE.length - 1 ? (
                    <span className="mx-1 shrink-0 text-ink-300" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <h3 className="mt-12 text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">Journey layers</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PUBLIC_JOURNEY_LAYERS.map((layer) => (
              <div key={layer.id} className="rounded-xl border border-ink-200/80 bg-white/55 p-5">
                <p className="text-[12px] font-medium text-ink-900">{layer.label}</p>
                <ul className="mt-3 space-y-2">
                  {layer.items.map((item) => (
                    <li key={item} className="text-[12px] leading-relaxed text-ink-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
              Persistent navigation (returning visitors)
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {PUBLIC_PERSISTENT_NAV.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-ink-200/70 bg-white px-3 py-1 text-[11px] text-ink-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FlowSection>

        {PUBLIC_VISITOR_FLOW_GROUPS.map((group) => (
          <FlowSection
            key={group.id}
            id={group.sectionId}
            label={`Public · ${group.label}`}
            title={group.label}
            description={group.description}
          >
            <div className="space-y-12">
              {group.flows.map((flow, idx) =>
                flowHasWireframes(flow) ? (
                  <FlowWireframeJourney key={flow.id} flow={flow} index={idx} />
                ) : (
                  <FlowCard key={flow.id} flow={flow} index={idx} />
                ),
              )}
            </div>
          </FlowSection>
        ))}

        <FlowSection
          id="revised-pv-screens"
          label="Screen inventory"
          title="Public Visitor screen checklist"
          description="Draft UI/UX checklist from Public Visitor PRD §4 — wireframes where available."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ol className="space-y-2">
              {PUBLIC_SCREEN_CHECKLIST.map((screen) => (
                <li
                  key={screen.id}
                  className="flex items-center justify-between rounded-xl border border-ink-200/80 bg-white/55 px-4 py-3"
                >
                  <span className="text-[13px] text-ink-800">{screen.label}</span>
                  {screen.wireframeId ? (
                    <span className="font-mono text-[10px] text-ink-400">{screen.wireframeId}</span>
                  ) : (
                    <span className="text-[10px] text-ink-400">pending</span>
                  )}
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap justify-center gap-4">
              {["pv-get-started", "pv-check-in", "pv-listening", "pv-request-access"].map((id) => (
                <WireframeById key={id} wireframeId={id} />
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
                Functional requirements
              </h3>
              <ul className="mt-4 space-y-2">
                {PUBLIC_FUNCTIONAL_REQUIREMENTS.map((fr) => (
                  <li
                    key={fr.id}
                    className="rounded-xl border border-ink-200/80 bg-white/55 px-4 py-3 text-[13px] text-ink-700"
                  >
                    <span className="font-mono text-[10px] text-ink-400">{fr.id}</span>
                    <span className="ml-2">{fr.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">Success criteria</h3>
              <ul className="mt-4 space-y-2">
                {PUBLIC_SUCCESS_CRITERIA.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-ink-200/80 bg-white/55 px-4 py-3 text-[13px] text-ink-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
                Analytics events
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {PUBLIC_ANALYTICS_EVENTS.map((ev) => (
                  <span
                    key={ev}
                    className="rounded-md border border-ink-200/70 bg-white/60 px-2 py-0.5 font-mono text-[9px] text-ink-500"
                  >
                    {ev}
                  </span>
                ))}
              </div>
              <h3 className="mt-8 text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">Error states</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {PUBLIC_ERROR_STATES.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-dashed border-ink-300/80 px-3 py-1.5 text-[12px] text-ink-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FlowSection>

        <FlowSection
          id="revised-mobile-stories"
          label="Mobile App"
          title="Mobile App v1.0 success criteria"
          description="Primary goals from revised Mobile App PRD §2 — provisioned Listener, Partner, and Admin experience."
        >
          <ul className="mb-12 grid gap-3 sm:grid-cols-2">
            {MOBILE_SUCCESS_CRITERIA.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-ink-200/80 bg-white/55 px-4 py-3.5 text-[13px] leading-relaxed text-ink-700"
              >
                {item}
              </li>
            ))}
          </ul>

          {MOBILE_APP_STORY_GROUPS.map((group) => (
            <div key={group.id} className="mb-16 last:mb-0">
              <h3 className="text-[clamp(1.1rem,2vw,1.35rem)] font-medium tracking-tight text-ink-950">
                {group.label} user stories
              </h3>
              <p className="mt-2 max-w-2xl text-[14px] text-ink-600">{group.intro}</p>
              <div className="mt-8 space-y-10">
                {group.stories.map((story, idx) => (
                  <UserStoryCard key={story.id} story={story} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </FlowSection>

        <FlowSection
          id="revised-mobile-screens"
          label="Mobile IA"
          title="Revised mobile screen list"
          description="Canonical provisioned Listener screens — splash defers to Public Visitor PRD for unauthenticated users."
        >
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MOBILE_SCREEN_MAP_REVISED.map((screen) => (
              <li key={screen.id} className="rounded-xl border border-ink-200/80 bg-white/55 px-4 py-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">{screen.id}</p>
                <p className="mt-1.5 text-[14px] font-medium text-ink-900">{screen.label}</p>
                {screen.note ? (
                  <p className="mt-1 text-[12px] leading-relaxed text-accent-clay">{screen.note}</p>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[13px] leading-relaxed text-ink-600">
            Partner Console and Admin CMS wireframes remain on the{" "}
            <Link to="/flows" className="text-ink-800 underline decoration-ink-300 underline-offset-2">
              Full PRD wireframes
            </Link>{" "}
            tab — unchanged in scope from the revised PRD.
          </p>
        </FlowSection>

        <FlowSection
          id="revised-functional"
          label="Functional requirements"
          title="Functional flows"
          description="Derived from Public Visitor FRs and Mobile App v1.0 [REVISED] §7–§9."
        >
          <div className="space-y-16">
            {REVISED_FUNCTIONAL_FLOW_GROUPS.map((group) => (
              <div key={group.id}>
                <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">{group.label}</h3>
                <div className="mt-8 space-y-10">
                  {group.flows.map((flow, idx) => (
                    <FunctionalFlowCard key={flow.id} flow={flow} index={idx} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="revised-clinical"
          label="Appendix D"
          title="Clinical use-case families"
          description="Seven primary use-case families from Mobile App PRD Appendix D — design and engineering implications."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {CLINICAL_USE_CASE_FAMILIES.map((family) => (
              <div key={family.id} className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
                <h3 className="text-[15px] font-medium text-ink-950">{family.name}</h3>
                <dl className="mt-4 space-y-2 text-[12px]">
                  <div>
                    <dt className="font-medium text-ink-500">Primary user</dt>
                    <dd className="text-ink-700">{family.primary}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink-500">End user</dt>
                    <dd className="text-ink-700">{family.endUser}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-[13px] leading-relaxed text-ink-600">{family.implication}</p>
              </div>
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="revised-scope"
          label="Boundaries"
          title="Out of scope & future exploration"
          description="v1.0 boundaries from Mobile App PRD §6 and Public Visitor §11."
          className="border-b-0"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
                Out of scope for v1.0
              </h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {REVISED_OUT_OF_SCOPE.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-dashed border-ink-300/80 bg-white/40 px-4 py-2.5 text-[13px] text-ink-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
                Public Visitor · future exploration
              </h3>
              <ul className="mt-4 space-y-2">
                {PUBLIC_FUTURE_EXPLORATION.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-ink-200/70 bg-paper-100/80 px-4 py-3 text-[13px] text-ink-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FlowSection>
      </main>
    </SiteChrome>
  );
}
