import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import PageSection from "../components/workspace/PageSection.jsx";
import ReferenceShowcase from "../components/references/ReferenceShowcase.jsx";
import {
  countReferenceItems,
  countReferenceScreens,
  REFERENCES_HERO,
  REFERENCE_SECTIONS,
} from "../content/references.js";

const referenceCount = countReferenceItems();
const screenCount = countReferenceScreens();

export default function ReferencesPage() {
  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id="references-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-28 md:pb-28 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                {REFERENCES_HERO.title}
              </h1>
              <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-700">{REFERENCES_HERO.intro}</p>
              <p className="mt-4 text-[13px] text-ink-500">
                {referenceCount} curated examples across {screenCount} key screens — all sourced from Mobbin.
              </p>
            </motion.div>
          </div>
        </section>

        {REFERENCE_SECTIONS.map((section, index) => (
          <PageSection
            key={section.id}
            id={section.id}
            label={section.label}
            title={section.title}
            description={section.description}
            className={index === REFERENCE_SECTIONS.length - 1 ? "border-b-0" : ""}
          >
            <ReferenceShowcase screenGroups={section.screenGroups} />
          </PageSection>
        ))}
      </main>
    </SiteChrome>
  );
}
