import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DesignsSubNav from "../components/DesignsSubNav.jsx";
import SiteChrome from "../components/SiteChrome.jsx";
import {
  PRD_DESIGN_FLOW_GROUPS,
  countDesignFlows,
  countDesignFlowSteps,
} from "../content/prdDesignFlows.js";
import { PRD_DESIGNS_META } from "../content/prdRevisedDesigns.js";
import { PrdFlowGroupSection } from "../designs/prd/PrdFlowJourney.jsx";

export default function PrdDesignsPage() {
  const flowCount = countDesignFlows();
  const stepCount = countDesignFlowSteps();

  return (
    <SiteChrome>
      <main className="pt-[4.25rem]">
        <DesignsSubNav />

        <section
          id="prd-designs-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-16 md:pb-28 md:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                June 2026 · PRD screen designs
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                {PRD_DESIGNS_META.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[17px] font-medium tracking-tight text-ink-700">
                Monotone gradient surfaces — full journeys mapped to both PRDs
              </p>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                Hi-fidelity screen concepts for every key flow across the Public Visitor and Mobile App PRDs.
                Each journey scrolls horizontally through its steps — player, library, and session detail follow
                the reference visual language (ambient gradients, glass controls, pill CTAs). For directional
                exploration see{" "}
                <Link to="/designs/ideation" className="text-ink-800 underline decoration-ink-300 underline-offset-2">
                  Ideation
                </Link>
                ; for requirements and user stories see{" "}
                <Link to={PRD_DESIGNS_META.flowsLink} className="text-ink-800 underline decoration-ink-300 underline-offset-2">
                  Flows
                </Link>
                .
              </p>

              <dl className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Documented flows</dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">{flowCount}</dd>
                  <dd className="mt-1 text-[12px] text-ink-500">Public · Listener · Partner · Admin</dd>
                </div>
                <div className="rounded-2xl border border-accent-clay/30 bg-accent-clay/5 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent-clay">Flow steps</dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">{stepCount}</dd>
                  <dd className="mt-1 text-[12px] text-ink-500">Horizontal scroll per journey</dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">PRD sources</dt>
                  <dd className="mt-2 text-[13px] leading-snug text-ink-700">{PRD_DESIGNS_META.publicVisitor.source}</dd>
                  <dd className="mt-1 text-[13px] leading-snug text-ink-700">{PRD_DESIGNS_META.mobileApp.source}</dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#prd-designs-golden"
                  className="rounded-full border border-accent-clay/35 bg-accent-clay/10 px-4 py-2 text-[12px] font-medium text-accent-clay"
                >
                  Golden route
                </a>
                <a
                  href="#prd-designs-listener"
                  className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] font-medium text-ink-700"
                >
                  Listener journey
                </a>
                <a
                  href="#prd-designs-ops"
                  className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] font-medium text-ink-700"
                >
                  Partner Console
                </a>
                <a
                  href="#prd-designs-admin"
                  className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] font-medium text-ink-700"
                >
                  Admin CMS
                </a>
                <Link
                  to="/designs/ideation"
                  className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] font-medium text-ink-700"
                >
                  Screen ideation →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {PRD_DESIGN_FLOW_GROUPS.map((group) => (
          <PrdFlowGroupSection key={group.id} group={group} />
        ))}
      </main>
    </SiteChrome>
  );
}
