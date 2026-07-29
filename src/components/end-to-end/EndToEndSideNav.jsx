import { useEffect, useState } from "react";
import { E2E_NAV_SECTIONS } from "../../content/endToEnd/index.js";
import { useScrollSpy } from "../../hooks/useScrollSpy.js";
import { EYEBROW, FLOWS_SIDEBAR_W } from "../workspace/pageLayout.js";

const SCROLL_IDS = ["e2e-intro", ...E2E_NAV_SECTIONS.map((s) => s.id)];

export default function EndToEndSideNav() {
  const activeId = useScrollSpy(SCROLL_IDS, { offsetRatio: 0.28 });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [activeId]);

  const navBody = (
    <>
      <div className="mb-5">
        <p className={EYEBROW}>Product Architecture</p>
        <p className="mt-2 text-[13px] leading-snug text-ink-600">
          Full service wireframe board - Admin → Partner → Programme → App → Reporting → Export
        </p>
      </div>

      <p className={EYEBROW}>Sections</p>
      <nav className="mt-3" aria-label="End-to-end flow sections">
        <ul className="space-y-0.5">
          <li>
            <a
              href="#e2e-intro"
              className={`flex items-baseline gap-2 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
                activeId === "e2e-intro"
                  ? "bg-ink-950 text-paper-100"
                  : "text-ink-600 hover:bg-ink-950/5 hover:text-ink-950"
              }`}
            >
              Intro
            </a>
          </li>
          {E2E_NAV_SECTIONS.map((item) => {
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
                    {item.number || item.label}
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
        className="pointer-events-none absolute bottom-0 left-0 top-0 hidden lg:block"
        style={{ width: `calc(30px + ${FLOWS_SIDEBAR_W})` }}
      >
        <div className="pointer-events-auto sticky top-[6.5rem] max-h-[calc(100dvh-7.5rem)] overflow-y-auto py-4 pl-[30px] pr-3">
          {navBody}
        </div>
      </aside>

      <div className="fixed bottom-0 left-0 z-[60] pb-[max(1.25rem,env(safe-area-inset-bottom))] pl-[max(1.25rem,env(safe-area-inset-left))] lg:hidden">
        {mobileOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-[55] cursor-default bg-black/25"
            aria-label="Close end-to-end menu"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}
        <div className="relative z-[60]">
          {mobileOpen ? (
            <div className="mb-2 max-h-[min(70dvh,28rem)] w-[min(18rem,85vw)] overflow-y-auto rounded-[1.25rem] bg-[#121212] p-3 text-paper-100 shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
              <p className="mb-3 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                End to End
              </p>
              <ul className="space-y-0.5">
                <li>
                  <a
                    href="#e2e-intro"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-2 py-2 text-[13px] text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    Intro
                  </a>
                </li>
                {E2E_NAV_SECTIONS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMobileOpen(false)}
                      className="block truncate rounded-lg px-2 py-2 text-[13px] text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      <span className="mr-2 font-mono text-[10px] text-white/35">{item.number}</span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full bg-[#121212] px-4 py-3 text-[13px] text-paper-100 shadow-[0_8px_28px_rgba(0,0,0,0.28)]"
            aria-expanded={mobileOpen}
          >
            End to End
          </button>
        </div>
      </div>
    </>
  );
}
