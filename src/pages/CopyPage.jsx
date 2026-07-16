import SiteChrome from "../components/SiteChrome.jsx";
import PageHero from "../components/workspace/PageHero.jsx";
import PageSection from "../components/workspace/PageSection.jsx";
import { PAGE_MAIN } from "../components/workspace/pageLayout.js";
import { COPY_HERO, COPY_SECTIONS } from "../content/copy.js";

function CopyCards({ entries }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {entries.map((entry) => (
        <article key={entry.screen} className="rounded-2xl border border-ink-200/80 bg-white/60 p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">{entry.screen}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-700">{entry.goal}</p>
          <dl className="mt-4 space-y-2 text-[12px] text-ink-600">
            <div>
              <dt className="inline font-medium text-ink-800">Primary CTA:</dt>{" "}
              <dd className="inline">{entry.primary}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-ink-800">Secondary CTA:</dt>{" "}
              <dd className="inline">{entry.secondary}</dd>
            </div>
          </dl>
          <p className="mt-4 text-[12px] leading-relaxed text-ink-500">{entry.notes}</p>
        </article>
      ))}
    </div>
  );
}

export default function CopyPage() {
  return (
    <SiteChrome>
      <main className={PAGE_MAIN}>
        <PageHero id="copy-intro" title={COPY_HERO.title} description={COPY_HERO.intro} withGradient />
        {COPY_SECTIONS.map((section, index) => (
          <PageSection
            key={section.id}
            id={section.id}
            label={section.label}
            title={section.title}
            description={section.description}
            className={index === COPY_SECTIONS.length - 1 ? "border-b-0" : ""}
          >
            <CopyCards entries={section.entries} />
          </PageSection>
        ))}
      </main>
    </SiteChrome>
  );
}
