import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import FlowSection from "../components/flows/review-board/FlowSection.jsx";
import FlowsSideNav from "../components/flows/FlowsSideNav.jsx";
import {
  FLOW_SECTIONS,
  FLOWS_HERO,
  LISTENER_MVP_NAV,
  flowSectionAnchor,
} from "../content/flows.js";

export default function FlowsPage() {
  return (
    <SiteChrome hideChapterNav>
      <main className="relative pt-[6.5rem]">
        <FlowsSideNav />

        <div className="lg:pl-[15.5rem]">
          <section
            id="flows-intro"
            className="scroll-mt-[7rem] border-b border-ink-200/40"
          >
            <div className="max-w-site mx-auto px-6 pb-16 pt-28 md:pb-24 md:pt-36">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                  {FLOWS_HERO.eyebrow}
                </p>
                <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,5.5vw,4rem)] font-medium leading-[1.02] tracking-editorial text-ink-950">
                  {FLOWS_HERO.title}
                </h1>
                <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-600">
                  {FLOWS_HERO.intro}
                </p>

                <div className="mt-10 max-w-xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
                    Navigation · Listener MVP
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {LISTENER_MVP_NAV.map((tab) => (
                      <span
                        key={tab.id}
                        className="rounded-full border border-ink-200/70 bg-paper-100 px-3.5 py-1.5 text-[13px] text-ink-800"
                      >
                        {tab.label}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-500">
                    Invite-only, organisation-led model — Home, Profile.
                  </p>
                </div>
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
        </div>
      </main>
    </SiteChrome>
  );
}
