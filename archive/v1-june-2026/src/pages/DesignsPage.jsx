import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import DesignsSubNav from "../components/DesignsSubNav.jsx";
import SiteChrome from "../components/SiteChrome.jsx";
import { DESIGN_PHASES } from "../config/siteNav.js";
import { PHASE1_META } from "../content/phase1Designs.js";
import Phase1Gallery from "../designs/phase1/Phase1Gallery.jsx";

function Phase1Content({ showIntro = true }) {
  return (
    <>
      {showIntro ? (
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-600">
        Full Phase 1 concept package — 13 listener screens (dark primary), 4 partner wireframes, admin
        management views, 12-session artwork system, state patterns, light-mode references, design system
        primitives, and the core prototype flow.
        </p>
      ) : null}
      <dl className={`grid gap-4 sm:grid-cols-2 ${showIntro ? "mt-8" : ""}`}>
        <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
          <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Source</dt>
          <dd className="mt-2 text-[13px] leading-snug text-ink-700">{PHASE1_META.source}</dd>
        </div>
        <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
          <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Frame</dt>
          <dd className="mt-2 text-[13px] leading-snug text-ink-700">{PHASE1_META.frame}</dd>
        </div>
      </dl>
      <div className="mt-14">
        <Phase1Gallery />
      </div>
    </>
  );
}

function PhasePlaceholder({ label, isCompact = false }) {
  return (
    <p className={`max-w-2xl text-[15px] leading-relaxed text-ink-600 ${isCompact ? "mt-4" : "mt-4"}`}>
      Placeholder — screens for this phase will be added as design work is completed.
    </p>
  );
}

function PhaseBlock({ item, showAll = false }) {
  const isPhase1 = item.to === "/designs/phase-1";
  const sectionId = `designs-${item.label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section
      id={sectionId}
      className={`scroll-mt-[7rem] border-b border-ink-200/60 ${showAll ? "py-20 md:py-28" : "pb-20 md:pb-28"}`}
    >
      <div className="max-w-content mx-auto px-6">
        {showAll ? (
          <h2 className="text-[clamp(1.35rem,3vw,2rem)] font-medium tracking-tight text-ink-950">
            {item.label}
          </h2>
        ) : null}
        {isPhase1 ? <Phase1Content showIntro={showAll} /> : <PhasePlaceholder label={item.label} />}
        {showAll && !isPhase1 ? (
          <Link
            to={item.to}
            className="mt-6 inline-flex rounded-full border border-ink-300 bg-white/70 px-4 py-2 text-[13px] text-ink-800 transition-colors hover:border-ink-400"
          >
            Open {item.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export default function DesignsPage() {
  const { phase } = useParams();
  const showAll = !phase;
  const activePhase = phase ? DESIGN_PHASES.find((p) => p.to === `/designs/${phase}`) : null;
  const phasesToShow = showAll ? DESIGN_PHASES : activePhase ? [activePhase] : [];

  if (!showAll && !activePhase) {
    return (
      <SiteChrome>
        <main className="pt-[4.25rem]">
          <DesignsSubNav />
          <div className="max-w-content mx-auto px-6 py-20">
            <h1 className="text-2xl font-medium text-ink-950">Phase not found</h1>
            <Link to="/designs" className="mt-4 inline-block text-[14px] text-ink-600 underline">
              Back to all designs
            </Link>
          </div>
        </main>
      </SiteChrome>
    );
  }

  return (
    <SiteChrome>
      <main className="pt-[4.25rem]">
        <DesignsSubNav />

        <section id="designs-intro" className="scroll-mt-[7rem] border-b border-ink-200/60">
          <div className="max-w-content mx-auto px-6 pb-20 pt-16 md:pb-28 md:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                {showAll ? "Designs" : activePhase?.label}
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                {showAll
                  ? "High-fidelity design work organised in four phases. Browse all phases here, or open a single phase for a focused view."
                  : activePhase?.to === "/designs/phase-1"
                    ? "Phase 1 concept package — listener, partner, admin, artwork, states, and prototype flow. Screens are grouped by type so variants sit side by side."
                    : "Design screens for this phase will appear here as work is completed."}
              </p>
              {!showAll && activePhase?.to !== "/designs/phase-1" ? (
                <Link
                  to="/designs"
                  className="mt-6 inline-flex rounded-full border border-ink-300 bg-white/70 px-4 py-2 text-[13px] text-ink-800 transition-colors hover:border-ink-400"
                >
                  View all phases
                </Link>
              ) : null}
            </motion.div>
          </div>
        </section>

        {phasesToShow.map((item) => (
          <PhaseBlock key={item.to} item={item} showAll={showAll} />
        ))}
      </main>
    </SiteChrome>
  );
}
