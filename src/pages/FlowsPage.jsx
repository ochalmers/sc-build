import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import FlowSection from "../components/flows/review-board/FlowSection.jsx";
import { FLOW_SECTIONS, FLOWS_HERO, flowSectionAnchor } from "../content/flows.js";

export default function FlowsPage() {
  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id="flows-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/40"
        >
          <div className="max-w-site mx-auto px-6 pb-20 pt-28 md:pb-28 md:pt-36">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-4xl text-[clamp(2.5rem,5.5vw,4rem)] font-medium leading-[1.02] tracking-editorial text-ink-950">
                {FLOWS_HERO.title}
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-600">
                {FLOWS_HERO.intro}
              </p>
            </motion.div>
          </div>
        </section>

        {FLOW_SECTIONS.map((section) => (
          <FlowSection
            key={section.id}
            id={flowSectionAnchor(section.id)}
            section={section}
          />
        ))}
      </main>
    </SiteChrome>
  );
}
