import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import { InspirationFlowJourney } from "../components/inspiration/InspirationFlowJourney.jsx";
import {
  InspirationCategoryGrid,
  InspirationFullGallery,
} from "../components/inspiration/InspirationGallery.jsx";
import { ReferenceList } from "../components/inspiration/ReferenceList.jsx";
import { FlowSection } from "../flows/FlowSection.jsx";
import {
  INSPIRATION_CATEGORIES,
  INSPIRATION_META,
  MOBBIN_MCP_QUERIES,
  OPEN_ALL_INDICES,
  OPEN_OVERVIEW_FLOWS,
  OPEN_REFERENCE_FLOWS,
  getFlowById,
} from "../content/inspiration.js";

function countFlows() {
  return Object.values(OPEN_REFERENCE_FLOWS).reduce((n, flows) => n + flows.length, 0);
}

export default function InspirationPage() {
  const localCount = OPEN_ALL_INDICES.length;
  const flowCount = countFlows();
  const categoryCount = INSPIRATION_CATEGORIES.length;
  const overviewFlows = OPEN_OVERVIEW_FLOWS.map(getFlowById).filter(Boolean);

  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id="inspiration-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-28 md:pb-28 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                Open iOS · visual reference library
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                {INSPIRATION_META.title}
              </h1>
              <p className="mt-4 text-[18px] font-medium tracking-tight text-ink-700">
                {INSPIRATION_META.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                {INSPIRATION_META.description}
              </p>

              <dl className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Screens archived
                  </dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">
                    {localCount}
                  </dd>
                  <dd className="mt-1 text-[12px] text-ink-500">Open iOS · Sep 2025</dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Documented flows
                  </dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">
                    {flowCount}
                  </dd>
                  <dd className="mt-1 text-[12px] text-ink-500">Across {categoryCount} PRD categories</dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    PRD surfaces
                  </dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">11</dd>
                  <dd className="mt-1 text-[12px] text-ink-500">Listener mobile IA mapped</dd>
                </div>
              </dl>

              <div className="mt-14 space-y-8">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    App journey overview
                  </p>
                  <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-600">
                    Six end-to-end flows spanning access, onboarding, library, player, detail, and commerce —
                    scroll horizontally through each sequence. Click any screen to enlarge.
                  </p>
                </div>
                <div className="space-y-8">
                  {overviewFlows.map((flow, idx) => (
                    <InspirationFlowJourney key={flow.id} flow={flow} index={idx} />
                  ))}
                </div>
              </div>

              <details className="mt-12 rounded-2xl border border-ink-200/60 bg-paper-50/60 p-5">
                <summary className="cursor-pointer text-[12px] font-medium text-ink-600">
                  Mobbin MCP search queries (for pulling additional apps)
                </summary>
                <p className="mt-3 text-[12px] leading-relaxed text-ink-500">{INSPIRATION_META.sourceNote}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {MOBBIN_MCP_QUERIES.map((query) => (
                    <li
                      key={query}
                      className="rounded-full border border-ink-200/80 bg-white px-3 py-1.5 font-mono text-[11px] text-ink-600"
                    >
                      {query}
                    </li>
                  ))}
                </ul>
              </details>
            </motion.div>
          </div>
        </section>

        {INSPIRATION_CATEGORIES.map((category) => {
          const flows = OPEN_REFERENCE_FLOWS[category.id] ?? [];
          const highlightIndices = category.highlights ?? [];

          return (
            <FlowSection
              key={category.id}
              id={category.id}
              label={category.label}
              title={category.title}
              description={category.description}
            >
              <p className="mb-10 max-w-2xl rounded-xl border border-ink-200/60 bg-paper-100/60 px-4 py-3 text-[12px] text-ink-600">
                <span className="font-medium text-ink-800">Sonocea mapping · </span>
                {category.sonoceaMapping}
              </p>

              {flows.length > 0 ? (
                <div className="space-y-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Documented flows · {flows.length}
                  </p>
                  {flows.map((flow, idx) => (
                    <InspirationFlowJourney key={flow.id} flow={flow} index={idx} />
                  ))}
                </div>
              ) : null}

              {highlightIndices.length > 0 ? (
                <div className={flows.length > 0 ? "mt-14" : ""}>
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    All screens in this category · {highlightIndices.length}
                  </p>
                  <p className="mt-2 text-[12px] text-ink-500">
                    Every archived screen mapped to this PRD surface — click to enlarge.
                  </p>
                  <div className="mt-6 rounded-2xl border border-ink-200/80 bg-paper-100/50 p-5 md:p-6">
                    <InspirationCategoryGrid indices={highlightIndices} initialVisible={highlightIndices.length} />
                  </div>
                </div>
              ) : null}

              <ReferenceList companies={category.companies} />
            </FlowSection>
          );
        })}

        <FlowSection
          id="inspiration-open-gallery"
          label="Full archive"
          title="Open · complete screen archive"
          description="All 210 iOS screens from Open (Sep 2025) — breathwork and meditation app with the closest tonal match to Sonocea's premium, dark, sound-first direction."
        >
          <InspirationFullGallery indices={OPEN_ALL_INDICES} />
        </FlowSection>
      </main>
    </SiteChrome>
  );
}
