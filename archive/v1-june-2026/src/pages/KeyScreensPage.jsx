import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import WireframesSubNav from "../components/WireframesSubNav.jsx";
import { FlowSection } from "../flows/FlowSection.jsx";
import { KeyScreenCard } from "../flows/KeyScreenTriple.jsx";
import { WireframeById } from "../flows/wireframes/WireframeScreens.jsx";
import {
  SessionArtworkTile,
  DsPrimitivesStrip,
} from "../flows/wireframes/keyScreenWireframes.jsx";
import {
  LISTENER_SCREENS,
  PARTNER_SCREENS,
  ADMIN_SCREENS,
  SESSION_ARTWORK,
  UI_STATES,
  THEME_REFERENCES,
  PROTOTYPE_FLOW,
  DELIVERABLES_SUMMARY,
} from "../content/keyScreens.js";

function StepArrow() {
  return (
    <div className="hidden shrink-0 items-center self-center px-1 md:flex" aria-hidden>
      <div className="h-px w-5 bg-ink-300" />
      <svg className="h-3 w-3 text-ink-400" viewBox="0 0 12 12" fill="none">
        <path d="M2 6h7M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function KeyScreensPage() {
  return (
    <SiteChrome>
      <main className="pt-[4.25rem]">
        <WireframesSubNav />

        <section
          id="key-screens-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-12 md:pb-28 md:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                Phase 3–4 · key screens
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                Key screen wireframes
              </h1>
              <p className="mt-4 text-[18px] font-medium tracking-tight text-ink-700">
                Low-fidelity artboards for PRD and PRD Lite — three version slots per screen.
              </p>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                Canonical v1 design package scope: 13 Listener screens, 4 Partner, 3–4 Admin, 12 session
                artwork examples, design system primitives, UI states, dark-primary theming with light
                references, and a core prototype path. Journey flows remain on the Full PRD and PRD LITE tabs.
              </p>

              <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {DELIVERABLES_SUMMARY.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-ink-200/80 bg-white/70 px-4 py-4"
                  >
                    <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 text-[13px] font-medium text-ink-800">{item.count}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        <FlowSection
          id="listener-screens"
          label="Core listener"
          title="Listener screens (01–13)"
          description="Screens to fully design. Each row holds three version slots — typically state variants, PRD vs Lite, or a reserved Design column."
        >
          <div className="space-y-10">
            {LISTENER_SCREENS.map((screen) => (
              <KeyScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="partner-screens"
          label={PARTNER_SCREENS.label}
          title={PARTNER_SCREENS.title}
          description={PARTNER_SCREENS.description}
        >
          <div className="space-y-10">
            {PARTNER_SCREENS.screens.map((screen) => (
              <KeyScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="admin-screens"
          label={ADMIN_SCREENS.label}
          title={ADMIN_SCREENS.title}
          description={ADMIN_SCREENS.description}
        >
          <div className="space-y-10">
            {ADMIN_SCREENS.screens.map((screen) => (
              <KeyScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="session-artwork"
          label="Session artwork"
          title="Category system · 12 example sessions"
          description="Each category has a distinct colour tone. Every session receives unique artwork — build a system, not a single cover."
        >
          <div className="space-y-12">
            {SESSION_ARTWORK.categories.map((cat) => (
              <div key={cat.id}>
                <div className="mb-6">
                  <h3 className="text-[15px] font-medium text-ink-900">{cat.label}</h3>
                  <p className="mt-1 text-[13px] text-ink-500">{cat.tone}</p>
                </div>
                <div className="flex flex-wrap gap-6 md:gap-8">
                  {cat.sessions.map((title) => (
                    <SessionArtworkTile key={title} title={title} category={cat.id} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="ui-states"
          label={UI_STATES.label}
          title={UI_STATES.title}
          description={UI_STATES.description}
        >
          <div className="space-y-10">
            {UI_STATES.screens.map((screen) => (
              <KeyScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="theme-references"
          label={THEME_REFERENCES.label}
          title={THEME_REFERENCES.title}
          description={THEME_REFERENCES.description}
        >
          <div className="space-y-10">
            {THEME_REFERENCES.screens.map((screen) => (
              <KeyScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="design-system"
          label="Design system"
          title="Component primitives"
          description="Buttons, inputs, cards, navigation, and player controls — foundation for hi-fi Phase 4."
        >
          <DsPrimitivesStrip />
        </FlowSection>

        <FlowSection
          id="prototype-path"
          label="Prototype"
          title="Core v1 flow"
          description="Onboarding → Library → Session Detail → Player → Feedback"
        >
          <div className="-mx-2 overflow-x-auto px-2 pb-4">
            <div className="flex min-w-min items-start gap-2 md:gap-4">
              {PROTOTYPE_FLOW.map((step, idx) => (
                <div key={step.step} className="flex shrink-0 items-start">
                  <div className="flex w-[280px] flex-col">
                    <p className="mb-3 text-[12px] font-semibold text-ink-900">{step.step}</p>
                    <WireframeById wireframeId={step.wireframeId} />
                  </div>
                  {idx < PROTOTYPE_FLOW.length - 1 ? <StepArrow /> : null}
                </div>
              ))}
            </div>
          </div>
        </FlowSection>
      </main>
    </SiteChrome>
  );
}
