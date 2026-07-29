import {
  APP_WIREFRAME_HERO,
  APP_WIREFRAME_SECTIONS,
} from "../content/appWireframes.js";
import { WORKSPACE_PAGES } from "../content/workspace.js";
import {
  FLOWS_SIDEBAR_GAP,
  FLOWS_SIDEBAR_W,
  PAGE_MAIN,
} from "../components/workspace/pageLayout.js";
import PageHero from "../components/workspace/PageHero.jsx";
import SiteChrome from "../components/SiteChrome.jsx";
import AppWireframesSideNav from "../components/app-wireframes/AppWireframesSideNav.jsx";
import WireframePhonePreview from "../components/app-wireframes/WireframePhonePreview.jsx";
import WireframeDesktopPreview from "../components/app-wireframes/WireframeDesktopPreview.jsx";

function WireframeSection({ section }) {
  const isDesktop = section.previews.some((p) => p.frame === "desktop");

  return (
    <section
      id={`wireframe-${section.id}`}
      className="scroll-mt-28 border-b border-ink-200/80 py-12 last:border-b-0"
    >
      <div className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500">
          {section.number}
        </p>
        <h2 className="mt-2 text-[1.35rem] font-medium tracking-tight text-ink-950">
          {section.title}
        </h2>
        {section.note ? (
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-500">{section.note}</p>
        ) : null}
      </div>

      <div
        className={
          isDesktop
            ? "flex flex-col gap-10"
            : "flex flex-wrap justify-center gap-8 lg:justify-start"
        }
      >
        {section.previews.map((preview) => (
          <div key={`${preview.path}-${preview.label ?? preview.screen}`} className="w-full">
            {preview.label ? (
              <p
                className={`mb-3 text-[12px] font-medium text-ink-500 ${
                  preview.frame === "desktop" ? "text-left" : "text-center lg:text-left"
                }`}
              >
                {preview.label}
              </p>
            ) : null}
            {preview.frame === "desktop" ? (
              <WireframeDesktopPreview wireframe={preview} />
            ) : (
              <div className="flex justify-center lg:justify-start">
                <WireframePhonePreview wireframe={preview} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AppWireframesPage() {
  const page = WORKSPACE_PAGES.appWireframes;
  const listenerCount = APP_WIREFRAME_SECTIONS.filter((s) => !s.id.startsWith("admin-")).length;
  const adminCount = APP_WIREFRAME_SECTIONS.filter((s) => s.id.startsWith("admin-")).length;

  if (!page) {
    return (
      <SiteChrome hideChapterNav>
        <main className={PAGE_MAIN}>
          <p className="py-20 text-center text-ink-600">App Wireframes page is not configured.</p>
        </main>
      </SiteChrome>
    );
  }

  return (
    <SiteChrome hideChapterNav>
      <main className={`relative ${PAGE_MAIN}`}>
        <AppWireframesSideNav />

        <div
          className="lg:pl-[calc(30px+var(--flows-sidebar)+var(--flows-gap))]"
          style={{
            "--flows-sidebar": FLOWS_SIDEBAR_W,
            "--flows-gap": FLOWS_SIDEBAR_GAP,
          }}
        >
          <PageHero
            id="wireframes-intro"
            eyebrow={page.eyebrow}
            title={APP_WIREFRAME_HERO.title}
            description={APP_WIREFRAME_HERO.intro}
            flushStart
          >
            <p className="mt-4 text-[12px] text-ink-500">
              {listenerCount} Listener screens · {adminCount} Admin flows · Mobile App PRD §4 + §5
            </p>
          </PageHero>

          {APP_WIREFRAME_SECTIONS.map((section) => (
            <WireframeSection key={section.id} section={section} />
          ))}
        </div>
      </main>
    </SiteChrome>
  );
}
