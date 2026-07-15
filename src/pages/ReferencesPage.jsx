import SiteChrome from "../components/SiteChrome.jsx";
import PageHero from "../components/workspace/PageHero.jsx";
import PageSection from "../components/workspace/PageSection.jsx";
import { PAGE_MAIN } from "../components/workspace/pageLayout.js";
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
      <main className={PAGE_MAIN}>
        <PageHero
          id="references-intro"
          title={REFERENCES_HERO.title}
          description={REFERENCES_HERO.intro}
          withGradient
        >
          <p className="mt-4 text-[13px] text-ink-500">
            {referenceCount} curated examples across {screenCount} key screens — all sourced from Mobbin.
          </p>
        </PageHero>

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
