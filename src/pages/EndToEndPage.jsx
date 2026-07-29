import { useState } from "react";
import SiteChrome from "../components/SiteChrome.jsx";
import EndToEndSection from "../components/end-to-end/EndToEndSection.jsx";
import EndToEndSideNav from "../components/end-to-end/EndToEndSideNav.jsx";
import EndToEndContinuous from "../components/end-to-end/EndToEndContinuous.jsx";
import PageHero from "../components/workspace/PageHero.jsx";
import {
  FLOWS_SIDEBAR_GAP,
  FLOWS_SIDEBAR_W,
  PAGE_MAIN,
} from "../components/workspace/pageLayout.js";
import {
  E2E_HERO,
  E2E_SECTIONS,
  e2eSectionAnchor,
} from "../content/endToEnd/index.js";

const VIEWS = [
  { id: "board", label: "Board" },
  { id: "continuous", label: "Continuous flow" },
];

function ViewToggle({ view, onChange }) {
  return (
    <div className="inline-flex rounded-full border border-ink-200 bg-paper-100 p-1">
      {VIEWS.map((option) => {
        const isActive = option.id === view;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`rounded-full px-4 py-1.5 text-[13px] transition-colors ${
              isActive
                ? "bg-ink-950 text-paper-100"
                : "text-ink-600 hover:text-ink-950"
            }`}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default function EndToEndPage() {
  const [view, setView] = useState("board");
  const isContinuous = view === "continuous";

  return (
    <SiteChrome hideChapterNav>
      <main className={`relative ${PAGE_MAIN}`}>
        {isContinuous ? null : <EndToEndSideNav />}

        <div
          className={isContinuous ? "" : "lg:pl-[calc(30px+var(--flows-sidebar)+var(--flows-gap))]"}
          style={{
            "--flows-sidebar": FLOWS_SIDEBAR_W,
            "--flows-gap": FLOWS_SIDEBAR_GAP,
          }}
        >
          <PageHero
            id="e2e-intro"
            eyebrow={E2E_HERO.eyebrow}
            title={E2E_HERO.title}
            description={E2E_HERO.intro}
            flushStart
          >
            <div className="mt-8 max-w-2xl space-y-3 text-[13px] leading-relaxed text-ink-600">
              <p>
                High-fidelity greyscale storyboards with partner branding for product architecture and UX review - not a working prototype.
                {isContinuous
                  ? " Scroll left to right through the entire service lifecycle as one continuous, narrated flow."
                  : " Scroll horizontally within each section and vertically through the full service lifecycle."}
              </p>
              <p className="text-ink-500">
                Coverage: Admin → Partner → Programme → Invitation → App entry → Identity branches → Onboarding →
                Listening → Progress → Organisation reporting → Billing export → Edge states → Golden routes.
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                View
              </p>
              <ViewToggle view={view} onChange={setView} />
            </div>
          </PageHero>

          {isContinuous ? (
            <EndToEndContinuous />
          ) : (
            E2E_SECTIONS.map((section) => (
              <EndToEndSection
                key={section.id}
                section={section}
                anchorId={e2eSectionAnchor(section.id)}
              />
            ))
          )}
        </div>
      </main>
    </SiteChrome>
  );
}
