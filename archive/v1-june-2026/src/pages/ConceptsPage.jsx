import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import ConceptSection from "../concepts/ConceptSection.jsx";
import { CONCEPTS_META, GTM_CONCEPTS } from "../content/concepts.js";

export default function ConceptsPage() {
  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id="concepts-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-28 md:pb-28 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                GTM · marketing concepts
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                Concepts
              </h1>
              <p className="mt-4 text-[18px] font-medium tracking-tight text-ink-700">
                Hero explorations for the Sonocea marketing site.
              </p>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                Seven GTM hero directions from the Figma file — image crops, layout balance, and glitch-slice
                treatments. Use the chapter menu to jump between concepts. v06 is built live from the selected
                Figma frame; others are reference captures for comparison.
              </p>

              <dl className="mt-12 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Source</dt>
                  <dd className="mt-2 text-[13px] leading-snug text-ink-700">{CONCEPTS_META.source}</dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Design canvas
                  </dt>
                  <dd className="mt-2 text-[13px] leading-snug text-ink-700">{CONCEPTS_META.designCanvas}</dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </section>

        {GTM_CONCEPTS.map((concept) => (
          <ConceptSection key={concept.id} concept={concept} />
        ))}
      </main>
    </SiteChrome>
  );
}
