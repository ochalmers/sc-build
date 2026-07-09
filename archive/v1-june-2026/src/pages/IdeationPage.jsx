import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import DesignsSubNav from "../components/DesignsSubNav.jsx";
import { IdeationDomainSection, IdeationScreenIndex } from "../components/ideation/IdeationScreenBoard.jsx";
import { CORE_UI_OPTIONS } from "../flows/wireframes/coreUiOptions.jsx";
import { IDEATION_DOMAINS, IDEATION_META } from "../content/ideation.js";

function CoreUiOptionCard({ option }) {
  const { letter, name, tabs, idea, best, watchout, navigationModel, homeBehaviour, screenImpact, uxNotes, Phone } =
    option;
  return (
    <div className="grid items-start gap-8 rounded-3xl border border-ink-200/80 bg-white/55 p-6 md:grid-cols-[minmax(0,260px)_1fr] md:p-8">
      <div className="flex justify-center md:sticky md:top-28">
        <Phone />
      </div>
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 font-mono text-[12px] font-semibold text-paper-50">
            {letter}
          </span>
          <h3 className="text-[clamp(1.1rem,2.2vw,1.4rem)] font-medium tracking-tight text-ink-950">{name}</h3>
        </div>
        <p className="mt-4 rounded-lg border border-ink-200/70 bg-paper-100/70 px-3 py-2 font-mono text-[12px] text-ink-700">
          {tabs}
        </p>
        <p className="mt-4 text-[14px] leading-relaxed text-ink-700">{idea}</p>
        {navigationModel ? (
          <p className="mt-4 text-[13px] leading-relaxed text-ink-600">
            <span className="font-medium text-ink-800">Navigation model: </span>
            {navigationModel}
          </p>
        ) : null}
        {homeBehaviour ? (
          <p className="mt-3 text-[13px] leading-relaxed text-ink-600">
            <span className="font-medium text-ink-800">Home behaviour: </span>
            {homeBehaviour}
          </p>
        ) : null}
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Best for</dt>
            <dd className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{best}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Watch out</dt>
            <dd className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{watchout}</dd>
          </div>
        </dl>
        {screenImpact?.length ? (
          <div className="mt-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Impact on key screens</p>
            <ul className="mt-2 space-y-1.5">
              {screenImpact.map((item) => (
                <li key={item} className="flex gap-2 text-[12px] leading-relaxed text-ink-600">
                  <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-ink-300" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {uxNotes?.length ? (
          <div className="mt-5 rounded-xl border border-ink-200/60 bg-paper-50/60 p-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">UX / UI notes</p>
            <ul className="mt-2 space-y-1.5">
              {uxNotes.map((item) => (
                <li key={item} className="flex gap-2 text-[12px] leading-relaxed text-ink-600">
                  <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-ink-300" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function IdeationPage() {
  return (
    <SiteChrome>
      <main className="pt-[4.25rem]">
        <DesignsSubNav />

        <section
          id="ideation-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-16 md:pb-28 md:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                Ideation · black &amp; white
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                What is the core UI?
              </h1>
              <p className="mt-4 max-w-2xl text-[17px] font-medium tracking-tight text-ink-700">
                Five directions for the provisioned Listener app — the screen a Listener opens every day.
              </p>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                The variable we are exploring is the <strong className="font-medium text-ink-800">bottom navigation</strong>:
                how many destinations, which ones, and whether there is a dedicated play / resume action. Every option
                is a black-and-white wireframe so the navigation model reads first — no colour or brand styling yet.
                These follow from the{" "}
                <Link to="/flows/revised#revised-screens" className="text-ink-800 underline decoration-ink-300 underline-offset-2">
                  primary screen list in Flows
                </Link>
                .
              </p>

              <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Core UI options</dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">{CORE_UI_OPTIONS.length}</dd>
                  <dd className="mt-1 text-[12px] text-ink-500">Bottom-nav models A–E</dd>
                </div>
                <div className="rounded-2xl border border-accent-clay/30 bg-accent-clay/5 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent-clay">Key screens</dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">{IDEATION_META.screenCount}</dd>
                  <dd className="mt-1 text-[12px] text-ink-500">Listener P0–P2 surfaces</dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Directional examples</dt>
                  <dd className="mt-2 text-[28px] font-medium tracking-tight text-ink-950">{IDEATION_META.variationCount}</dd>
                  <dd className="mt-1 text-[12px] text-ink-500">Five per screen with UX notes</dd>
                </div>
              </dl>

              <div className="mt-10">
                <IdeationScreenIndex domains={IDEATION_DOMAINS} />
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {CORE_UI_OPTIONS.map((o) => (
                  <a
                    key={o.id}
                    href={`#core-ui-${o.id}`}
                    className="rounded-full border border-ink-200/80 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-ink-700 transition-colors hover:border-ink-300"
                  >
                    {o.letter} · {o.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="ideation-core-ui" className="scroll-mt-[7rem] border-b border-ink-200/60 py-20 md:py-28">
          <div className="max-w-content mx-auto px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">Step 1</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.15] tracking-tight text-ink-950">
              Core UI — bottom navigation models
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-600">
              Five black-and-white wireframes exploring how the Listener app is structured around daily listening.
              Each option changes tab count, home layout, and where resume lives — see the screen-by-screen breakdown
              below for how each model plays out across the full Listener journey.
            </p>
            <div className="mt-12 space-y-8">
              {CORE_UI_OPTIONS.map((option) => (
                <div key={option.id} id={`core-ui-${option.id}`} className="scroll-mt-[7rem]">
                  <CoreUiOptionCard option={option} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {IDEATION_DOMAINS.map((domain) => (
          <IdeationDomainSection key={domain.id} domain={domain} />
        ))}

        <section id="ideation-choose" className="scroll-mt-[7rem] py-20 md:py-28">
          <div className="max-w-content mx-auto px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent-clay">Next step</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.15] tracking-tight text-ink-950">
              How to choose a direction
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-600">
              Pick one core UI option — or a hybrid — then validate against the screen-by-screen variations above.
              A quick way to narrow the navigation model:
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  q: "Single recommended Session?",
                  a: "Lean Player-first (B) or Protocol-led (C). Fewer choices, calmer entry.",
                },
                {
                  q: "Rich library to browse?",
                  a: "Lean Library-first (A) or Center play (D). Browsing and resuming both stay one tap away.",
                },
                {
                  q: "Education matters in-app?",
                  a: "Lean Learn + Listen (E), reusing the science content from the Public Visitor journey.",
                },
              ].map((item) => (
                <div key={item.q} className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
                  <p className="text-[14px] font-medium text-ink-950">{item.q}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-600">{item.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[13px] text-ink-500">
              See the laid-out{" "}
              <Link to="/designs/prd" className="text-ink-700 underline decoration-ink-300 underline-offset-2">
                wireframe screens
              </Link>{" "}
              for each surface, or revisit the{" "}
              <Link to="/flows/revised" className="text-ink-700 underline decoration-ink-300 underline-offset-2">
                flows and ranked stories
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
