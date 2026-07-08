import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import WireframesSubNav from "../components/WireframesSubNav.jsx";
import {
  PRD_FLOWS,
  PRD_FLOWS_META,
  FLOW_CATEGORIES,
  PROVISIONING_CHAIN,
  V1_OUT_OF_SCOPE,
} from "../content/prdFlows.js";
import { FlowSection } from "../flows/FlowSection.jsx";
import { FlowCard } from "../flows/FlowCard.jsx";
import { FlowWireframeJourney } from "../flows/FlowWireframeJourney.jsx";
import { ScreenSequenceStrip } from "../flows/ScreenSequenceStrip.jsx";
import { ProvisioningDiagram } from "../flows/ProvisioningDiagram.jsx";
import { RoleOverview } from "../flows/RoleOverview.jsx";

function flowCount() {
  return Object.values(PRD_FLOWS).reduce((n, arr) => n + arr.length, 0);
}

function flowHasWireframes(flow) {
  return flow.steps?.some((s) => s.wireframeId);
}

function CategoryFlowBlock({ categoryId }) {
  const flows = PRD_FLOWS[categoryId] ?? [];
  if (!flows.length) return null;

  return (
    <div className="space-y-12">
      {flows.map((flow, idx) =>
        flowHasWireframes(flow) ? (
          <FlowWireframeJourney key={flow.id} flow={flow} index={idx} />
        ) : (
          <FlowCard key={flow.id} flow={flow} index={idx} />
        ),
      )}
    </div>
  );
}

export default function FlowsPage() {
  const totalFlows = flowCount();
  const listenerFlows =
    PRD_FLOWS.listener.length + (PRD_FLOWS.listenerEdge?.length ?? 0);

  return (
    <SiteChrome>
      <main className="pt-[4.25rem]">
        <WireframesSubNav />

        <section
          id="flows-intro"
          className="scroll-mt-[5rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-12 md:pb-28 md:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                PRD v1.0 · wireframe flows
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                PRD flow catalogue
              </h1>
              <p className="mt-4 text-[18px] font-medium tracking-tight text-ink-700">
                Step-by-step wireframes across Listener, Partner, Admin, billing, and clinical journeys.
              </p>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                Mapped from PRD v1.0 Sections 4–16 and Appendices A/B/E. Mobile screens align with Paper
                artboards (WF · 01–11); Partner Console and Admin CMS use web wireframes. Scroll
                horizontally through each journey — platform-only flows without screens stay narrative.
              </p>

              <dl className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Flows mapped</dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">{totalFlows}</dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Listener + edge</dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">{listenerFlows}</dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">PRD source</dt>
                  <dd className="mt-2 text-[13px] leading-snug text-ink-700">{PRD_FLOWS_META.source}</dd>
                </div>
              </dl>

              <p className="mt-10 text-[12px] text-ink-500">
                Design canvas: <span className="text-ink-700">{PRD_FLOWS_META.designCanvas}</span>
              </p>
            </motion.div>
          </div>
        </section>

        <FlowSection
          id="flows-roles"
          label="Actors"
          title="Who uses what"
          description="Four distinct surfaces share one provisioning chain. Listeners never see content outside their entitlements."
        >
          <RoleOverview />
        </FlowSection>

        <FlowSection
          id="flows-provisioning"
          label="Platform model"
          title={PROVISIONING_CHAIN.title}
          description="Controlled distribution, IP protection, and measurable usage for pilots and commercial Partners."
        >
          <ProvisioningDiagram />
        </FlowSection>

        <FlowSection
          id="flows-listener"
          label="Listener · mobile"
          title="Listener mobile journeys"
          description="Primary v1 experience — wireframe screens step by step, matching Paper WF · 01–11."
        >
          <ScreenSequenceStrip />
          <div className="mt-16">
            <CategoryFlowBlock categoryId="listener" />
          </div>
        </FlowSection>

        {FLOW_CATEGORIES.filter((c) => c.id !== "listener").map((cat) => (
          <FlowSection
            key={cat.id}
            id={cat.sectionId}
            label={cat.label}
            title={
              cat.id === "listenerEdge"
                ? "Listener edge cases & errors"
                : cat.id === "public"
                  ? "Public marketing surface"
                  : cat.id === "admin"
                    ? "Admin CMS & operations"
                    : cat.id === "partner"
                      ? "Partner Console (MVP)"
                      : cat.id === "billing"
                        ? "Commercial billing models"
                        : cat.id === "platform"
                          ? "Cross-cutting platform flows"
                          : "Clinical context families"
            }
            description={cat.description}
          >
            <CategoryFlowBlock categoryId={cat.id} />
          </FlowSection>
        ))}

        <FlowSection
          id="flows-scope"
          label="Boundaries"
          title="Explicitly out of scope for v1"
          description="Roadmap items may appear in later versions — they are not commitments in this release."
        >
          <ul className="flex flex-wrap gap-3">
            {V1_OUT_OF_SCOPE.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-ink-200/80 bg-white/50 px-4 py-2.5 text-[13px] text-ink-700"
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
