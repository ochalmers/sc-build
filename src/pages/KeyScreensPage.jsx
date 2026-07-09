import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import PageSection from "../components/workspace/PageSection.jsx";
import CoreNavOptionsGrid from "../components/key-screens/CoreNavOptionsGrid.jsx";
import ScreenConceptSection from "../components/key-screens/ScreenConceptSection.jsx";
import { KEY_SCREEN_COUNT, KEY_SCREEN_TIERS } from "../content/keyScreensCatalogue.js";
import { WORKSPACE_PAGES } from "../content/workspace.js";

const page = WORKSPACE_PAGES.keyScreens;

export default function KeyScreensPage() {
  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id="key-screens-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/40"
        >
          <div className="max-w-site mx-auto px-6 pb-24 pt-28 md:pb-32 md:pt-36">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-4xl text-[clamp(2.5rem,5.5vw,4rem)] font-medium leading-[1.02] tracking-editorial text-ink-950">
                {page.title}
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-600">
                {page.description}
              </p>
              <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-ink-500">
                Each screen is organised into four tiers with five wireframe concept slots — A is the
                canonical baseline from flows; B through E are open layout directions. Core navigation
                proposals sit above the screen catalogue.
              </p>

              <dl className="mt-12 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 px-4 py-4">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Key screens
                  </dt>
                  <dd className="mt-1.5 text-[13px] font-medium text-ink-800">{KEY_SCREEN_COUNT}</dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 px-4 py-4">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Concepts per screen
                  </dt>
                  <dd className="mt-1.5 text-[13px] font-medium text-ink-800">5</dd>
                </div>
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 px-4 py-4">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Tiers
                  </dt>
                  <dd className="mt-1.5 text-[13px] font-medium text-ink-800">
                    {KEY_SCREEN_TIERS.length}
                  </dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </section>

        <PageSection
          id="key-screens-nav"
          label="Navigation"
          title="Core navigation concepts"
          description="Five wireframe proposals for how authenticated listeners move through the app. The variable is bottom navigation — tab count, destinations, and whether play/resume is always one tap away."
        >
          <CoreNavOptionsGrid />
        </PageSection>

        {KEY_SCREEN_TIERS.map((tier) => (
          <PageSection
            key={tier.id}
            id={tier.id}
            label={tier.label}
            title={tier.title}
            description={tier.description}
          >
            <div className="-mt-4">
              {tier.screens.map((screen) => (
                <ScreenConceptSection key={screen.id} screen={screen} />
              ))}
            </div>
          </PageSection>
        ))}
      </main>
    </SiteChrome>
  );
}
