import SiteChrome from "../components/SiteChrome.jsx";
import PageHero from "../components/workspace/PageHero.jsx";
import PageSection from "../components/workspace/PageSection.jsx";
import { PAGE_MAIN } from "../components/workspace/pageLayout.js";
import { COPY_HERO, COPY_SECTIONS } from "../content/copy.js";

function CopyScreenCard({ screen }) {
  return (
    <article className="rounded-2xl border border-ink-200/80 bg-white/70 p-5 print:break-inside-avoid print:border-ink-300 print:bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
          {screen.screen}
        </p>
        {screen.path ? (
          <p className="font-mono text-[11px] text-ink-400 print:text-ink-500">{screen.path}</p>
        ) : null}
      </div>
      <dl className="mt-4 space-y-3">
        {screen.fields.map((field) => (
          <div key={`${screen.id}-${field.label}`}>
            <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">
              {field.label}
            </dt>
            <dd className="mt-1 text-[14px] leading-relaxed text-ink-800">{field.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export default function CopyPage() {
  return (
    <SiteChrome>
      <main className={`${PAGE_MAIN} print:max-w-none print:px-0`}>
        <div className="print:hidden">
          <PageHero id="copy-intro" title={COPY_HERO.title} description={COPY_HERO.intro} withGradient />
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-6 pb-2 md:px-10">
            <a
              href={`${import.meta.env.BASE_URL}listener-journey-copy.docx`}
              download="Sonocea-listener-journey-copy.docx"
              className="rounded-full bg-ink-950 px-4 py-2 text-[13px] font-medium text-white transition hover:bg-ink-800"
            >
              Download Word (.docx)
            </a>
            <a
              href={`${import.meta.env.BASE_URL}listener-journey-copy.pptx`}
              download="Sonocea-listener-journey-copy.pptx"
              className="rounded-full border border-ink-300 bg-white px-4 py-2 text-[13px] font-medium text-ink-800 transition hover:border-ink-500"
            >
              Download PowerPoint
            </a>
            <a
              href={`${import.meta.env.BASE_URL}listener-journey-copy.pdf`}
              download="Sonocea-listener-journey-copy.pdf"
              className="rounded-full border border-ink-300 bg-white px-4 py-2 text-[13px] font-medium text-ink-800 transition hover:border-ink-500"
            >
              Download PDF
            </a>
            <p className="text-[12px] text-ink-500">
              Upload .docx or .pptx to Google Drive — open with Docs or Slides to edit together.
            </p>
          </div>
        </div>

        <div className="hidden print:block print:mb-8">
          <h1 className="text-2xl font-medium tracking-tight text-ink-950">Listener journey copy</h1>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-600">
            Listener-facing only. Dynamic placeholders shown as {"{Name}"}, {"{Partner}"}, etc.
          </p>
        </div>

        {COPY_SECTIONS.map((section, index) => (
          <PageSection
            key={section.id}
            id={section.id}
            label={`${section.number} · Listener`}
            title={section.title}
            description={section.description}
            className={index === COPY_SECTIONS.length - 1 ? "border-b-0" : ""}
          >
            <div className="grid gap-4 md:grid-cols-2 print:grid-cols-1">
              {section.screens.map((screen) => (
                <CopyScreenCard key={screen.id} screen={screen} />
              ))}
            </div>
          </PageSection>
        ))}
      </main>
    </SiteChrome>
  );
}
