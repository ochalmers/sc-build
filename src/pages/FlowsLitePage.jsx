import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import WireframesSubNav from "../components/WireframesSubNav.jsx";
import {
  PRD_LITE_META,
  PROVISIONING_LITE,
  MOBILE_SCREEN_MAP_LITE,
  LITE_OUT_OF_SCOPE,
  LITE_SUCCESS_CRITERIA,
  USER_STORY_GROUPS,
  FUNCTIONAL_FLOW_GROUPS,
} from "../content/prdLite/index.js";
import { FlowSection } from "../flows/FlowSection.jsx";
import { UserStoryCard } from "../flows/UserStoryCard.jsx";
import { FunctionalFlowCard } from "../flows/FunctionalFlowCard.jsx";
import { LiteRoleOverview } from "../flows/LiteRoleOverview.jsx";
import { LiteProvisioningDiagram } from "../flows/LiteProvisioningDiagram.jsx";

function storyCount() {
  return USER_STORY_GROUPS.reduce((n, g) => n + g.stories.length, 0);
}

function flowCount() {
  return FUNCTIONAL_FLOW_GROUPS.reduce((n, g) => n + g.flows.length, 0);
}

export default function FlowsLitePage() {
  const analyticsGroup = FUNCTIONAL_FLOW_GROUPS.find((g) => g.id === "analytics");

  return (
    <SiteChrome>
      <main className="pt-[4.25rem]">
        <WireframesSubNav />

        <section
          id="lite-intro"
          className="scroll-mt-[5rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-12 md:pb-28 md:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                PRD v1.0 LITE · user stories & flows
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                PRD LITE flow catalogue
              </h1>
              <p className="mt-4 text-[18px] font-medium tracking-tight text-ink-700">
                User stories, acceptance criteria, and functional flows from the simplified PRD.
              </p>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                Mapped from goals, role definitions, screen list, user stories, and functional requirements in
                Sonocea Mobile App — Version 1.0 LITE. Out-of-scope items (including offline downloads) are
                excluded. Low-fidelity key screen artboards live on the Key screens tab; journey flows remain on Full PRD wireframes.
              </p>

              <dl className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">User stories</dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">{storyCount()}</dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Functional flows</dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">{flowCount()}</dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">PRD source</dt>
                  <dd className="mt-2 text-[13px] leading-snug text-ink-700">{PRD_LITE_META.source}</dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </section>

        <FlowSection
          id="stories-success"
          label="Success criteria"
          title="v1.0 LITE success criteria"
          description="Primary outcomes the release must demonstrate for Admins, Partners, and Listeners."
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {LITE_SUCCESS_CRITERIA.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-ink-200/80 bg-white/55 px-4 py-3.5 text-[13px] leading-relaxed text-ink-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </FlowSection>

        <FlowSection
          id="stories-roles"
          label="Actors"
          title="Who uses what"
          description="Four roles in PRD LITE — Guest is distinct from provisioned Listeners and Partner operators."
        >
          <LiteRoleOverview />
        </FlowSection>

        <FlowSection
          id="stories-provisioning"
          label="Platform model"
          title={PROVISIONING_LITE.title}
          description="Organizations anchor Listener assignment; Partners operate within Admin-granted scope."
        >
          <LiteProvisioningDiagram />
        </FlowSection>

        <FlowSection
          id="stories-screens"
          label="Mobile IA"
          title="PRD LITE screen list"
          description="Canonical mobile screens — guideline only; additional screens may be required."
        >
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MOBILE_SCREEN_MAP_LITE.map((screen) => (
              <li
                key={screen.id}
                className="rounded-xl border border-ink-200/80 bg-white/55 px-4 py-3.5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">{screen.id}</p>
                <p className="mt-1.5 text-[14px] font-medium text-ink-900">{screen.label}</p>
                {screen.detail ? (
                  <p className="mt-1 text-[12px] leading-relaxed text-ink-500">{screen.detail}</p>
                ) : null}
              </li>
            ))}
          </ol>
        </FlowSection>

        {USER_STORY_GROUPS.map((group) => (
          <FlowSection
            key={group.id}
            id={group.sectionId}
            label={`${group.label} · stories`}
            title={`${group.label} user stories`}
            description={group.intro}
          >
            <div className="space-y-10">
              {group.stories.map((story, idx) => (
                <UserStoryCard key={story.id} story={story} index={idx} />
              ))}
            </div>
          </FlowSection>
        ))}

        <FlowSection
          id="stories-flows"
          label="Functional requirements"
          title="Functional flows"
          description="Step-by-step journeys from PRD LITE functional requirements."
        >
          <div className="space-y-16">
            {FUNCTIONAL_FLOW_GROUPS.filter((g) => g.id !== "analytics").map((group) => (
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

        {analyticsGroup ? (
          <FlowSection
            id="stories-analytics"
            label="Data & billing"
            title="Analytics & billing flows"
            description="Acquisition, engagement, retention, and commercial reporting from PRD LITE §Data & Analytics."
          >
            <div className="space-y-10">
              {analyticsGroup.flows.map((flow, idx) => (
                <FunctionalFlowCard key={flow.id} flow={flow} index={idx} />
              ))}
            </div>
          </FlowSection>
        ) : null}

        <FlowSection
          id="stories-scope"
          label="Boundaries"
          title="Explicitly out of scope for v1 LITE"
          description="Items marked out of scope in the PRD — excluded from stories and flows above."
        >
          <ul className="flex flex-wrap gap-3">
            {LITE_OUT_OF_SCOPE.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-dashed border-ink-300/80 bg-white/40 px-4 py-2.5 text-[13px] text-ink-600"
              >
                {item}
              </li>
            ))}
          </ul>
        </FlowSection>
      </main>
    </SiteChrome>
  );
}
