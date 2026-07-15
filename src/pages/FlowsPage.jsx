import SiteChrome from "../components/SiteChrome.jsx";
import FlowSection from "../components/flows/review-board/FlowSection.jsx";
import FlowsSideNav from "../components/flows/FlowsSideNav.jsx";
import PageHero from "../components/workspace/PageHero.jsx";
import {
  FLOWS_SIDEBAR_GAP,
  FLOWS_SIDEBAR_W,
  PAGE_MAIN,
} from "../components/workspace/pageLayout.js";
import {
  FLOW_SECTIONS,
  FLOWS_HERO,
  LISTENER_MVP_NAV,
  flowSectionAnchor,
} from "../content/flows.js";

export default function FlowsPage() {
  return (
    <SiteChrome hideChapterNav>
      <main className={`relative ${PAGE_MAIN}`}>
        <FlowsSideNav />

        <div
          className="lg:pl-[calc(30px+var(--flows-sidebar)+var(--flows-gap))]"
          style={{
            "--flows-sidebar": FLOWS_SIDEBAR_W,
            "--flows-gap": FLOWS_SIDEBAR_GAP,
          }}
        >
          <PageHero
            id="flows-intro"
            eyebrow={FLOWS_HERO.eyebrow}
            title={FLOWS_HERO.title}
            description={FLOWS_HERO.intro}
            flushStart
          >
            <div className="mt-8 max-w-xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                Navigation · Listener MVP
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {LISTENER_MVP_NAV.map((tab) => (
                  <span
                    key={tab.id}
                    className="rounded-full border border-ink-200/70 bg-paper-100 px-3.5 py-1.5 text-[13px] text-ink-800"
                  >
                    {tab.label}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-500">
                Invite-only, organisation-led model — Home, Profile.
              </p>
            </div>
          </PageHero>

          {FLOW_SECTIONS.map((section) => (
            <FlowSection
              key={section.id}
              id={flowSectionAnchor(section.id)}
              section={section}
            />
          ))}
        </div>
      </main>
    </SiteChrome>
  );
}
