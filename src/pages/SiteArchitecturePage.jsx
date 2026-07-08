import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import { FlowSection } from "../flows/FlowSection.jsx";
import {
  SITE_ARCHITECTURE_AUDIENCES,
  SITE_ARCHITECTURE_GLOBAL,
  SITE_ARCHITECTURE_JOURNEYS,
  SITE_ARCHITECTURE_META,
  SITE_ARCHITECTURE_OPEN_QUESTIONS,
  SITE_ARCHITECTURE_PAGES,
  SITE_ARCHITECTURE_PHASES,
  SITE_ARCHITECTURE_PRINCIPLES,
  SITE_ARCHITECTURE_PURPOSE,
  SITE_ARCHITECTURE_RELATED,
  SITE_ARCHITECTURE_SITEMAP,
} from "../content/siteArchitecture.js";

function SitemapTree() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-ink-200/80 bg-ink-950 px-5 py-4 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">Root</p>
        <p className="mt-1 text-[15px] font-medium text-white">{SITE_ARCHITECTURE_SITEMAP.root}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SITE_ARCHITECTURE_SITEMAP.sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className={`scroll-mt-[7rem] rounded-2xl border p-5 ${
              section.tier === 2
                ? "border-ink-200/60 bg-paper-100/80"
                : "border-ink-200/80 bg-white/55"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                  {section.tier === 2 ? "Utility" : "Primary"}
                </p>
                <h3 className="mt-1 text-[15px] font-medium tracking-tight text-ink-950">{section.label}</h3>
              </div>
              <code className="shrink-0 rounded-md bg-paper-200/80 px-2 py-1 text-[10px] text-ink-600">
                {section.path}
              </code>
            </div>

            {section.children.length > 0 ? (
              <ul className="mt-4 space-y-2 border-t border-ink-200/60 pt-4">
                {section.children.map((child) => (
                  <li key={child.id} className="flex items-center justify-between gap-2 text-[12px] text-ink-700">
                    <span>{child.label}</span>
                    <code className="text-[10px] text-ink-500">{child.path}</code>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function PageCard({ page }) {
  return (
    <article
      id={page.id}
      className="scroll-mt-[7rem] rounded-2xl border border-ink-200/80 bg-white/55 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Page</p>
          <h3 className="mt-1 text-[clamp(1.1rem,2vw,1.4rem)] font-medium tracking-tight text-ink-950">
            {page.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-ink-200/80 bg-paper-100 px-3 py-1 text-[11px] text-ink-600">
            {page.path}
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-[11px] ${
              page.priority === "P0"
                ? "border-ink-300/60 bg-ink-950 text-white"
                : page.priority === "P1"
                  ? "border-ink-200/80 bg-white text-ink-700"
                  : "border-ink-200/60 bg-paper-100 text-ink-500"
            }`}
          >
            {page.priority}
          </span>
        </div>
      </div>

      <p className="mt-5 text-[14px] leading-relaxed text-ink-600">{page.purpose}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Sections</h4>
          <ul className="mt-3 space-y-2">
            {page.sections.map((section) => (
              <li key={section} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-700">
                <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-ink-300" aria-hidden />
                {section}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">CTAs</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {page.ctas.map((cta) => (
              <span
                key={cta}
                className="rounded-full border border-ink-200/70 bg-paper-50 px-3 py-1 text-[11px] text-ink-700"
              >
                {cta}
              </span>
            ))}
          </div>
          {page.notes ? (
            <p className="mt-5 text-[12px] leading-relaxed text-ink-500">{page.notes}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function JourneyCard({ journey }) {
  return (
    <div className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">{journey.audience}</p>
      <h3 className="mt-2 text-[15px] font-medium tracking-tight text-ink-950">{journey.title}</h3>
      <ol className="mt-4 space-y-2">
        {journey.steps.map((step, idx) => (
          <li key={step} className="flex gap-3 text-[13px] text-ink-700">
            <span className="w-5 shrink-0 text-[10px] text-ink-400">{idx + 1}</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function SiteArchitecturePage() {
  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id="arch-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-28 md:pb-28 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                GTM · public website · {SITE_ARCHITECTURE_META.status}
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                {SITE_ARCHITECTURE_META.title}
                <span className="mt-2 block text-[clamp(1.35rem,2.5vw,1.75rem)] text-ink-700">
                  {SITE_ARCHITECTURE_META.subtitle}
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                {SITE_ARCHITECTURE_META.description}
              </p>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {SITE_ARCHITECTURE_RELATED.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="rounded-2xl border border-ink-200/80 bg-white/70 p-5 transition-colors hover:border-ink-300"
                  >
                    <p className="text-[13px] font-medium text-ink-900">{link.label}</p>
                    <p className="mt-2 text-[12px] leading-relaxed text-ink-600">{link.note}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <FlowSection
          id="arch-purpose"
          label="Purpose"
          title="What the marketing site is for"
          description={SITE_ARCHITECTURE_PURPOSE.role}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
              <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-500">Goals</h3>
              <ul className="mt-4 space-y-2.5">
                {SITE_ARCHITECTURE_PURPOSE.goals.map((goal) => (
                  <li key={goal} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-700">
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent-moss" aria-hidden />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-ink-200/70 bg-paper-100/80 p-6">
              <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-500">Not in scope</h3>
              <ul className="mt-4 space-y-2.5">
                {SITE_ARCHITECTURE_PURPOSE.notGoals.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-600">
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-ink-300" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FlowSection>

        <FlowSection
          id="arch-audiences"
          label="Audiences"
          title="Who visits and why"
          description="Four primary audience groups with distinct intent, entry points, and desired outcomes."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink-200/80">
                  <th className="pb-3 pr-4 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Audience
                  </th>
                  <th className="pb-3 pr-4 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Intent
                  </th>
                  <th className="pb-3 pr-4 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Entry
                  </th>
                  <th className="pb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Outcome
                  </th>
                </tr>
              </thead>
              <tbody>
                {SITE_ARCHITECTURE_AUDIENCES.map((audience) => (
                  <tr key={audience.id} className="border-b border-ink-200/50">
                    <td className="py-4 pr-4 text-[14px] font-medium text-ink-900">{audience.label}</td>
                    <td className="py-4 pr-4 text-[13px] text-ink-600">{audience.intent}</td>
                    <td className="py-4 pr-4 text-[13px] text-ink-600">{audience.entry}</td>
                    <td className="py-4 text-[13px] text-ink-600">{audience.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FlowSection>

        <FlowSection
          id="arch-sitemap"
          label="Sitemap"
          title="Information architecture"
          description="Proposed top-level structure for the public marketing site. Paths are indicative — final URLs to be confirmed."
        >
          <SitemapTree />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
              <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-500">Global header</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {SITE_ARCHITECTURE_GLOBAL.header.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-ink-200/70 bg-paper-50 px-3 py-1 text-[11px] text-ink-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
              <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-500">Global footer</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {SITE_ARCHITECTURE_GLOBAL.footer.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-ink-200/70 bg-paper-50 px-3 py-1 text-[11px] text-ink-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FlowSection>

        <section id="arch-pages" className="scroll-mt-[7rem] border-b border-ink-200/60 py-20 md:py-28">
          <div className="max-w-content mx-auto px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">Page inventory</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.15] tracking-tight text-ink-950">
              Key pages & section structure
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-600">
              Draft page definitions with purpose, content sections, and CTAs. P0 pages are launch-critical.
            </p>
            <div className="mt-12 space-y-6">
              {SITE_ARCHITECTURE_PAGES.map((page) => (
                <PageCard key={page.id} page={page} />
              ))}
            </div>
          </div>
        </section>

        <FlowSection
          id="arch-journeys"
          label="User journeys"
          title="How people move through the site"
          description="Entry paths from discovery through to app download, partner enquiry, or mailing list signup."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {SITE_ARCHITECTURE_JOURNEYS.map((journey) => (
              <JourneyCard key={journey.id} journey={journey} />
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="arch-principles"
          label="Design principles"
          title="How the site should behave"
          description="Guiding rules for content, IA, and visual design across the marketing experience."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SITE_ARCHITECTURE_PRINCIPLES.map((principle, idx) => (
              <div
                key={principle.title}
                className="rounded-2xl border border-ink-200/80 bg-white/55 p-6"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-400">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[15px] font-medium tracking-tight text-ink-950">{principle.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-600">{principle.body}</p>
              </div>
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="arch-phases"
          label="Rollout"
          title="Phased build approach"
          description="Suggested priority order for designing and building the marketing site alongside the app programme."
        >
          <div className="space-y-4">
            {SITE_ARCHITECTURE_PHASES.map((phase) => (
              <div
                key={phase.phase}
                className="rounded-2xl border border-ink-200/80 bg-white/55 p-6 md:flex md:items-start md:justify-between md:gap-8"
              >
                <div className="md:max-w-xs">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">{phase.phase}</p>
                  <h3 className="mt-2 text-[16px] font-medium tracking-tight text-ink-950">{phase.focus}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-600">{phase.goal}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 md:mt-0 md:max-w-md md:justify-end">
                  {phase.pages.map((page) => (
                    <span
                      key={page}
                      className="rounded-full border border-ink-200/70 bg-paper-50 px-3 py-1 text-[11px] text-ink-700"
                    >
                      {page}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FlowSection>

        <FlowSection
          id="arch-questions"
          label="Open questions"
          title="Decisions still to make"
          description="Outstanding questions for product, design, and GTM before the site architecture is finalised."
          className="border-b-0"
        >
          <ul className="space-y-3">
            {SITE_ARCHITECTURE_OPEN_QUESTIONS.map((question) => (
              <li
                key={question}
                className="rounded-xl border border-ink-200/70 bg-paper-100/80 px-4 py-3 text-[13px] leading-relaxed text-ink-700"
              >
                {question}
              </li>
            ))}
          </ul>
        </FlowSection>
      </main>
    </SiteChrome>
  );
}
