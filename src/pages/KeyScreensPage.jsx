import SiteChrome from "../components/SiteChrome.jsx";
import PageHero from "../components/workspace/PageHero.jsx";
import PageSection from "../components/workspace/PageSection.jsx";
import { PAGE_MAIN } from "../components/workspace/pageLayout.js";
import CoreNavOptionsGrid from "../components/key-screens/CoreNavOptionsGrid.jsx";
import ScreenConceptSection from "../components/key-screens/ScreenConceptSection.jsx";
import { KEY_SCREEN_COUNT, KEY_SCREEN_TIERS } from "../content/keyScreensCatalogue.js";
import { WORKSPACE_PAGES } from "../content/workspace.js";

const page = WORKSPACE_PAGES.keyScreens;

export default function KeyScreensPage() {
  return (
    <SiteChrome>
      <main className={PAGE_MAIN}>
        <PageHero id="key-screens-intro" title={page.title} description={page.description}>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-ink-500">
            Each screen is organised into four tiers with five wireframe concept slots — A is the
            canonical baseline from flows; B through E are open layout directions. Core navigation
            proposals sit above the screen catalogue.
          </p>

          <dl className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-ink-200/80 bg-white/70 px-4 py-4">
              <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                Key screens
              </dt>
              <dd className="mt-1.5 text-[13px] font-medium text-ink-800">{KEY_SCREEN_COUNT}</dd>
            </div>
            <div className="rounded-2xl border border-ink-200/80 bg-white/70 px-4 py-4">
              <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                Concepts per screen
              </dt>
              <dd className="mt-1.5 text-[13px] font-medium text-ink-800">5</dd>
            </div>
            <div className="rounded-2xl border border-ink-200/80 bg-white/70 px-4 py-4">
              <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                Tiers
              </dt>
              <dd className="mt-1.5 text-[13px] font-medium text-ink-800">
                {KEY_SCREEN_TIERS.length}
              </dd>
            </div>
          </dl>
        </PageHero>

        <PageSection
          id="key-screens-nav"
          label="Navigation"
          title="Core navigation concepts"
          description="Five wireframe proposals for how authenticated listeners move through the app. The variable is bottom navigation — tab count, destinations, and whether play/resume is always one tap away."
          fullWidth
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
            fullWidth
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
