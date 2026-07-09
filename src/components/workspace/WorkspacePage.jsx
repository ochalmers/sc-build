import { motion } from "framer-motion";
import SiteChrome from "../SiteChrome.jsx";
import PageSection from "./PageSection.jsx";
import { getDesignSectionContent } from "./DesignWorkspaceContent.jsx";
import { WORKSPACE_PAGES } from "../../content/workspace.js";
import PrototypePlayer from "../../prototype/PrototypePlayer.jsx";

function SectionPlaceholder() {
  return (
    <div className="rounded-2xl border border-dashed border-ink-200/80 bg-white/40 px-6 py-10">
      <p className="text-[13px] text-ink-400">Section content will be added here.</p>
    </div>
  );
}

export default function WorkspacePage({ pageKey }) {
  const page = WORKSPACE_PAGES[pageKey];
  if (!page) return null;

  const introId = page.introId.replace(/^#/, "");

  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id={introId}
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-28 md:pb-28 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                {page.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[18px] font-medium tracking-tight text-ink-700">
                {page.description}
              </p>
              {page.purpose ? (
                <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">{page.purpose}</p>
              ) : null}
            </motion.div>
          </div>
        </section>

        {pageKey === "prototype" ? <PrototypePlayer /> : null}

        {page.sections.map((section, index) => {
          const sectionContent =
            pageKey === "design" ? getDesignSectionContent(section.id) : null;

          return (
            <PageSection
              key={section.id}
              id={section.id}
              label={section.label}
              title={section.title}
              description={section.description}
              className={index === page.sections.length - 1 ? "border-b-0" : undefined}
            >
              {sectionContent ?? <SectionPlaceholder />}
            </PageSection>
          );
        })}
      </main>
    </SiteChrome>
  );
}
