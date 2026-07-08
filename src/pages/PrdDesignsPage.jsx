import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import { PRD_DESIGNS_META, PRD_DESIGNS_SECTIONS } from "../content/prdRevisedDesigns.js";
import PrdDesignsGallery from "../designs/prd/PrdDesignsGallery.jsx";

function screenCount() {
  return PRD_DESIGNS_SECTIONS.reduce((total, cat) => {
    return (
      total +
      cat.sections.reduce((n, section) => {
        if (section.layout === "rows") {
          return n + section.rows.reduce((r, row) => r + row.concepts.length, 0);
        }
        return n + (section.concepts?.length ?? 0);
      }, 0)
    );
  }, 0);
}

export default function PrdDesignsPage() {
  const totalScreens = screenCount();

  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id="prd-designs-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-28 md:pb-28 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                June 28, 2026 · PRD designs
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                {PRD_DESIGNS_META.title}
              </h1>
              <p className="mt-4 text-[18px] font-medium tracking-tight text-ink-700">
                {PRD_DESIGNS_META.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                High-fidelity screens for the Public Visitor PRD and the revised Mobile App v1.0 PRD. Public
                Visitor designs cover the golden route and returning-visitor experience. Mobile App designs map
                to the provisioned Listener, Partner, and Admin journeys. For flows, user stories, and wireframes
                see the{" "}
                <Link
                  to={PRD_DESIGNS_META.flowsLink}
                  className="text-ink-800 underline decoration-ink-300 underline-offset-2"
                >
                  revised PRD catalogue
                </Link>
                ; try the{" "}
                <Link to="/prototype/prd" className="text-ink-800 underline decoration-ink-300 underline-offset-2">
                  clickable prototype
                </Link>
                .
              </p>

              <dl className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Design concepts
                  </dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">{totalScreens}</dd>
                </div>
                <div className="rounded-2xl border border-accent-clay/30 bg-accent-clay/5 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent-clay">
                    Public Visitor PRD
                  </dt>
                  <dd className="mt-2 text-[13px] leading-snug text-ink-700">
                    {PRD_DESIGNS_META.publicVisitor.source}
                  </dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Mobile App PRD
                  </dt>
                  <dd className="mt-2 text-[13px] leading-snug text-ink-700">{PRD_DESIGNS_META.mobileApp.source}</dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="/prototype/prd"
                  className="rounded-full border border-ink-950 bg-ink-950 px-4 py-2 text-[12px] font-medium text-paper-100"
                >
                  Open clickable prototype
                </a>
                <a
                  href="#prd-designs-public"
                  className="rounded-full border border-accent-clay/35 bg-accent-clay/10 px-4 py-2 text-[12px] font-medium text-accent-clay"
                >
                  Public Visitor designs
                </a>
                <a
                  href="#prd-designs-mobile"
                  className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] font-medium text-ink-700"
                >
                  Mobile App designs
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="max-w-content mx-auto px-6">
            <PrdDesignsGallery catalogues={PRD_DESIGNS_SECTIONS} />
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
