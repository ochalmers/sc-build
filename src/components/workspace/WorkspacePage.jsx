import SiteChrome from "../SiteChrome.jsx";
import PageHero from "./PageHero.jsx";
import PageSection from "./PageSection.jsx";
import { PAGE_MAIN } from "./pageLayout.js";
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
      <main className={PAGE_MAIN}>
        <PageHero
          id={introId}
          title={page.title}
          description={page.description}
          withGradient
        >
          {page.purpose ? (
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">{page.purpose}</p>
          ) : null}
        </PageHero>

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
