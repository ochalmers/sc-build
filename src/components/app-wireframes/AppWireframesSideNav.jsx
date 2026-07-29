import { useEffect, useState } from "react";
import { APP_WIREFRAME_NAV } from "../../content/appWireframes.js";
import { useScrollSpy } from "../../hooks/useScrollSpy.js";
import { EYEBROW, FLOWS_SIDEBAR_W } from "../workspace/pageLayout.js";

const SCROLL_IDS = APP_WIREFRAME_NAV.map((s) => s.id);

export default function AppWireframesSideNav() {
  const activeId = useScrollSpy(SCROLL_IDS, { offsetRatio: 0.28 });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [activeId]);

  const navBody = (
    <>
      <div className="mb-5">
        <p className={EYEBROW}>List of Mobile App Screens</p>
        <p className="mt-2 text-[13px] leading-snug text-ink-600">
          Mobile App PRD §4 Listener + §5 Admin.
        </p>
      </div>

      <p className={EYEBROW}>Screens</p>
      <nav className="mt-3" aria-label="App wireframe screens">
        <ul className="space-y-0.5">
          {APP_WIREFRAME_NAV.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`flex items-baseline gap-2.5 rounded-lg px-2.5 py-1.5 text-[12px] leading-snug transition-colors ${
                    isActive
                      ? "bg-ink-950 text-paper-100"
                      : "text-ink-600 hover:bg-ink-950/5 hover:text-ink-950"
                  }`}
                >
                  <span
                    className={`shrink-0 font-mono text-[10px] tabular-nums ${
                      isActive ? "text-paper-100/55" : "text-ink-400"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="min-w-0 truncate">{item.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );

  return (
    <>
      <aside
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 hidden lg:block"
        style={{ width: `calc(30px + ${FLOWS_SIDEBAR_W})` }}
      >
        <div className="pointer-events-auto sticky top-[6.5rem] max-h-[calc(100dvh-7.5rem)] overflow-y-auto py-4 pl-[30px] pr-3">
          {navBody}
        </div>
      </aside>

      <div className="mb-6 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-full border border-ink-200 bg-white px-4 py-2 text-[13px] text-ink-800"
        >
          {mobileOpen ? "Hide screens" : "Jump to screen"}
        </button>
        {mobileOpen ? (
          <div className="mt-3 rounded-2xl border border-ink-200 bg-white/90 p-4">{navBody}</div>
        ) : null}
      </div>
    </>
  );
}
