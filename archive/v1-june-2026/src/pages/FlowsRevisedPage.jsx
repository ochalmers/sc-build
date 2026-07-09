import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import {
  PRD_REVISED_META,
  PRD_REVISED_ROLES,
  PUBLIC_GOLDEN_ROUTE,
  MOBILE_SCREEN_MAP_REVISED,
  CLINICAL_USE_CASE_FAMILIES,
  REVISED_OUT_OF_SCOPE,
  PUBLIC_FUTURE_EXPLORATION,
  PUBLIC_VISITOR_STORIES,
  PUBLIC_VISITOR_FLOW_GROUPS,
  REVISED_FUNCTIONAL_FLOW_GROUPS,
  STORY_PRIORITY_LEVELS,
  PRIMARY_SCREEN_INVENTORY,
  sortByPriority,
  mobileStoriesFlat,
  priorityCounts,
} from "../content/prdRevised/index.js";
import { FlowSection } from "../flows/FlowSection.jsx";
import { UserStoryCard, PriorityBadge } from "../flows/UserStoryCard.jsx";
import { FunctionalFlowCard } from "../flows/FunctionalFlowCard.jsx";
import { FlowWireframeJourney } from "../flows/FlowWireframeJourney.jsx";
import { FlowCard } from "../flows/FlowCard.jsx";
import { WireframeById } from "../flows/wireframes/WireframeScreens.jsx";

function flowHasWireframes(flow) {
  return flow.steps?.some((s) => s.wireframeId);
}

const SURFACES = [
  {
    id: "public",
    kicker: "Surface 1 · pre-authentication",
    name: "Public Visitor",
    who: "Anyone who downloads the app before an organisation invite.",
    does: "Discover Sonocea, feel one 5-minute sample, learn the science, request access.",
    prd: PRD_REVISED_META.publicVisitor.source,
  },
  {
    id: "mobile",
    kicker: "Surface 2 · provisioned",
    name: "Mobile App (Listener + operators)",
    who: "Invited Listeners, plus Partner and Admin operators behind the scenes.",
    does: "Redeem an invite, onboard, play assigned Sessions. Admin manages content, provisioning and billing.",
    prd: PRD_REVISED_META.mobile.source,
  },
];

function SectionLead({ step, children }) {
  return (
    <p className="mb-8 flex items-center gap-2 text-[12px] font-medium text-ink-500">
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ink-300 font-mono text-[10px] text-ink-600">
        {step}
      </span>
      {children}
    </p>
  );
}

function PriorityLegend() {
  return (
    <div className="mb-10 grid gap-3 sm:grid-cols-3">
      {STORY_PRIORITY_LEVELS.map((level) => (
        <div key={level.id} className="rounded-xl border border-ink-200/80 bg-white/55 p-4">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={level.id} />
            <span className="text-[12px] font-medium text-ink-800">{level.label.split(" · ")[1]}</span>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-ink-600">{level.note}</p>
        </div>
      ))}
    </div>
  );
}

function ScreenInventoryGroup({ group }) {
  return (
    <div id={`screens-${group.id}`} className="scroll-mt-[7rem]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[clamp(1.05rem,2vw,1.3rem)] font-medium tracking-tight text-ink-950">
          {group.surface}
        </h3>
        <span className="rounded-full border border-ink-200/80 bg-white/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">
          {group.tag}
        </span>
      </div>
      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-600">{group.description}</p>
      <ul className="mt-5 divide-y divide-ink-200/60 overflow-hidden rounded-2xl border border-ink-200/80 bg-white/55">
        {group.screens.map((screen) => (
          <li key={screen.name} className="flex items-center gap-3 px-4 py-3">
            <PriorityBadge priority={screen.priority} />
            <span className="min-w-0 flex-1 text-[13px] text-ink-800">{screen.name}</span>
            {screen.stories?.length ? (
              <span className="hidden font-mono text-[9px] text-ink-400 sm:inline">
                {screen.stories.join(" · ")}
              </span>
            ) : null}
            <span
              className={`shrink-0 rounded-md px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] ${
                screen.wireframeId ? "bg-ink-900/5 text-ink-600" : "border border-dashed border-ink-300/80 text-ink-400"
              }`}
            >
              {screen.wireframeId ? "wireframe" : "to draw"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FlowsRevisedPage() {
  const publicRanked = sortByPriority(PUBLIC_VISITOR_STORIES);
  const mobileRanked = sortByPriority(mobileStoriesFlat());
  const counts = priorityCounts();

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
                Flows · June 2026 PRDs
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                From user needs to the screens we need
              </h1>
              <p className="mt-4 max-w-2xl text-[17px] font-medium tracking-tight text-ink-700">
                Read this page top to bottom. It answers four questions in order.
              </p>

              <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { n: "1", t: "Who are the surfaces?", d: "Public Visitor vs the provisioned Mobile App.", href: "#revised-surfaces" },
                  { n: "2", t: "What do they need?", d: "User stories, ranked by priority.", href: "#revised-stories" },
                  { n: "3", t: "How does it flow?", d: "The UX journeys, step by step.", href: "#revised-flows" },
                  { n: "4", t: "What screens result?", d: "Primary screens and where they sit.", href: "#revised-screens" },
                ].map((s) => (
                  <li key={s.n}>
                    <a
                      href={s.href}
                      className="block h-full rounded-2xl border border-ink-200/80 bg-white/70 p-5 transition-colors hover:border-ink-300"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink-300 font-mono text-[11px] text-ink-600">
                        {s.n}
                      </span>
                      <p className="mt-3 text-[14px] font-medium text-ink-950">{s.t}</p>
                      <p className="mt-1 text-[12px] leading-snug text-ink-600">{s.d}</p>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap gap-3 text-[12px] text-ink-600">
                <span className="rounded-full border border-accent-clay/30 bg-accent-clay/5 px-3 py-1.5">
                  {counts.P0 ?? 0} P0 stories
                </span>
                <span className="rounded-full border border-ink-200/80 bg-white/70 px-3 py-1.5">
                  {(counts.P1 ?? 0) + (counts.P2 ?? 0)} P1–P2 stories
                </span>
                <span className="rounded-full border border-ink-200/80 bg-white/70 px-3 py-1.5">
                  Wireframes kept · black &amp; white
                </span>
                <Link
                  to="/designs/ideation"
                  className="rounded-full border border-ink-200/80 bg-white/70 px-3 py-1.5 underline decoration-ink-300 underline-offset-2"
                >
                  Ideate screens →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 1 · Surfaces */}
        <FlowSection
          id="revised-surfaces"
          label="Step 1"
          title="Who are the two surfaces?"
          description="Everything below belongs to one of these two surfaces. Keeping them separate is what makes the flows readable."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {SURFACES.map((s) => (
              <div key={s.id} className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent-clay">{s.kicker}</p>
                <h3 className="mt-2 text-[18px] font-medium tracking-tight text-ink-950">{s.name}</h3>
                <dl className="mt-4 space-y-3 text-[13px] leading-relaxed">
                  <div>
                    <dt className="font-medium text-ink-500">Who</dt>
                    <dd className="text-ink-700">{s.who}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink-500">What they do</dt>
                    <dd className="text-ink-700">{s.does}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-[11px] text-ink-400">{s.prd}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-12 text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
            The five roles across both surfaces
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRD_REVISED_ROLES.map((role) => (
              <div key={role.id} className="rounded-xl border border-ink-200/80 bg-white/55 p-4">
                <h4 className="text-[14px] font-medium text-ink-950">{role.label}</h4>
                <p className="mt-1 text-[11px] text-ink-500">{role.surface}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-600">{role.summary}</p>
              </div>
            ))}
          </div>
        </FlowSection>

        {/* 2 · Ranked user stories */}
        <FlowSection
          id="revised-stories"
          label="Step 2"
          title="What do they need? — user stories, ranked"
          description="Every story tagged P0 / P1 / P2 and sorted so the must-haves lead. P0 is the spine we build first."
        >
          <PriorityLegend />

          <SectionLead step="A">Public Visitor — ranked</SectionLead>
          <div className="space-y-6">
            {publicRanked.map((story, idx) => (
              <UserStoryCard key={story.id} story={story} index={idx} />
            ))}
          </div>

          <div className="mt-16">
            <SectionLead step="B">Mobile App — ranked</SectionLead>
            <p className="-mt-4 mb-8 max-w-2xl text-[13px] text-ink-600">
              Listener, Partner and Admin stories interleaved by priority — the true build order.
            </p>
            <div className="space-y-6">
              {mobileRanked.map((story, idx) => (
                <UserStoryCard
                  key={story.id}
                  story={{ ...story, surfaces: [story.group] }}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </FlowSection>

        {/* 3 · UX flows */}
        <FlowSection
          id="revised-flows"
          label="Step 3"
          title="How does it flow? — the UX journeys"
          description="The sequence a person actually moves through. Public Visitor first, then the provisioned Mobile App."
        >
          <div className="mb-12 rounded-2xl border border-ink-200/80 bg-white/55 p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
              Public Visitor golden route — at a glance
            </p>
            <div className="mt-5 overflow-x-auto pb-2">
              <div className="flex min-w-[40rem] items-center gap-2">
                {PUBLIC_GOLDEN_ROUTE.map((step, idx) => (
                  <div key={step.id} className="flex items-center">
                    <div className="rounded-xl border border-ink-200/80 bg-white/80 px-3 py-2.5 text-center text-[11px] leading-snug text-ink-800">
                      <span className="mr-1 font-mono text-[9px] text-ink-400">{idx + 1}</span>
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
          </div>

          <SectionLead step="A">Public Visitor flows</SectionLead>
          <div className="space-y-16">
            {PUBLIC_VISITOR_FLOW_GROUPS.map((group) => (
              <div key={group.id} id={group.sectionId} className="scroll-mt-[7rem]">
                <h3 className="text-[15px] font-medium text-ink-900">{group.label}</h3>
                <p className="mt-1 max-w-2xl text-[13px] text-ink-600">{group.description}</p>
                <div className="mt-8 space-y-12">
                  {group.flows.map((flow, idx) =>
                    flowHasWireframes(flow) ? (
                      <FlowWireframeJourney key={flow.id} flow={flow} index={idx} />
                    ) : (
                      <FlowCard key={flow.id} flow={flow} index={idx} />
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <SectionLead step="B">Mobile App functional flows</SectionLead>
            <div className="space-y-16">
              {REVISED_FUNCTIONAL_FLOW_GROUPS.map((group) => (
                <div key={group.id}>
                  <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    {group.label}
                  </h3>
                  <div className="mt-8 space-y-10">
                    {group.flows.map((flow, idx) => (
                      <FunctionalFlowCard key={flow.id} flow={flow} index={idx} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FlowSection>

        {/* 4 · Primary screens */}
        <FlowSection
          id="revised-screens"
          label="Step 4"
          title="What screens result? — the primary screen list"
          description="The screens each surface needs, ranked by the same priority. This is the bridge into Design, where we ideate the UI."
        >
          <div className="space-y-14">
            {PRIMARY_SCREEN_INVENTORY.map((group) => (
              <ScreenInventoryGroup key={group.id} group={group} />
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
              Public Visitor screens — current wireframes
            </h3>
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {["pv-get-started", "pv-check-in", "pv-listening", "pv-request-access"].map((id) => (
                <WireframeById key={id} wireframeId={id} />
              ))}
            </div>
          </div>

          <div className="mt-14">
            <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
              Mobile App (Listener) screens — current wireframes
            </h3>
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {["library", "detail", "player", "neurotype"].map((id) => (
                <WireframeById key={id} wireframeId={id} />
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-accent-clay/30 bg-accent-clay/5 p-6">
            <p className="text-[14px] font-medium text-ink-900">Next: ideate the core UI</p>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-600">
              The Listener library / home screen is the heart of the app. The{" "}
              <Link to="/designs/ideation#ideation-core-ui" className="text-accent-clay underline decoration-accent-clay/40 underline-offset-2">
                Ideation section
              </Link>{" "}
              explores five different options for the core UI — including what lives in the bottom tab nav.
            </p>
          </div>

          <details className="mt-8 rounded-xl border border-ink-200/70 bg-white/40 p-4">
            <summary className="cursor-pointer text-[12px] font-medium text-ink-600">
              PRD screen map (Mobile App §4) for reference
            </summary>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {MOBILE_SCREEN_MAP_REVISED.map((screen) => (
                <li key={screen.id} className="rounded-lg border border-ink-200/70 bg-white/55 px-3 py-2 text-[12px] text-ink-700">
                  <span className="font-mono text-[10px] text-ink-400">{screen.id}</span> {screen.label}
                </li>
              ))}
            </ol>
          </details>
        </FlowSection>

        {/* Reference appendix */}
        <FlowSection
          id="revised-reference"
          label="Reference"
          title="Clinical contexts & scope"
          description="Supporting context for the flows above — not part of the top-to-bottom read."
          className="border-b-0"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {CLINICAL_USE_CASE_FAMILIES.map((family) => (
              <div key={family.id} className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
                <h3 className="text-[15px] font-medium text-ink-950">{family.name}</h3>
                <p className="mt-2 text-[12px] text-ink-500">
                  {family.primary} → {family.endUser}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-600">{family.implication}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">Out of scope for v1.0</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {REVISED_OUT_OF_SCOPE.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-dashed border-ink-300/80 bg-white/40 px-3 py-2 text-[12px] text-ink-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">Future exploration</h3>
              <ul className="mt-4 space-y-2">
                {PUBLIC_FUTURE_EXPLORATION.map((item) => (
                  <li key={item} className="rounded-xl border border-ink-200/70 bg-paper-100/80 px-4 py-2.5 text-[13px] text-ink-700">
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
