import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FLOW_NAV_SECTIONS, LISTENER_MVP_NAV } from "../../content/flows.js";
import { useScrollSpy } from "../../hooks/useScrollSpy.js";

const SCROLL_IDS = ["flows-intro", ...FLOW_NAV_SECTIONS.map((s) => s.id)];

/**
 * Sticky left-hand navigation for browsing listener (and related) flows.
 */
export default function FlowsSideNav() {
  const activeId = useScrollSpy(SCROLL_IDS, { offsetRatio: 0.28 });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [activeId]);

  const navBody = (
    <>
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">Listener MVP</p>
        <p className="mt-2 text-[13px] leading-snug text-ink-600">Bottom navigation</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {LISTENER_MVP_NAV.map((tab) => (
            <li key={tab.id}>
              <Link
                to={tab.path}
                className="inline-block rounded-md border border-ink-200/60 bg-paper-100 px-2 py-1 text-[11px] text-ink-700 transition-colors hover:border-ink-400 hover:text-ink-950"
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">Flows</p>
      <nav className="mt-3" aria-label="Application flows">
        <ul className="space-y-0.5">
          <li>
            <a
              href="#flows-intro"
              className={`flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-[13px] transition-colors ${
                activeId === "flows-intro"
                  ? "bg-ink-950 text-paper-100"
                  : "text-ink-600 hover:bg-ink-950/5 hover:text-ink-950"
              }`}
            >
              Intro
            </a>
          </li>
          {FLOW_NAV_SECTIONS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`flex items-baseline gap-2.5 rounded-lg px-2 py-1.5 text-[13px] leading-snug transition-colors ${
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
                    {item.shortLabel}
                  </span>
                  <span className="min-w-0">{item.title}</span>
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
      {/* Desktop sticky rail */}
      <aside className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-[15.5rem] lg:block">
        <div className="pointer-events-auto sticky top-[6.5rem] max-h-[calc(100dvh-7.5rem)] overflow-y-auto py-2 pr-4">
          {navBody}
        </div>
      </aside>

      {/* Mobile floating control */}
      <div className="fixed bottom-0 left-0 z-[60] pb-[max(1.25rem,env(safe-area-inset-bottom))] pl-[max(1.25rem,env(safe-area-inset-left))] lg:hidden">
        {mobileOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-[55] cursor-default bg-black/25"
            aria-label="Close flows menu"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}
        <div className="relative z-[60]">
          {mobileOpen ? (
            <div className="mb-2 max-h-[min(70dvh,28rem)] w-[min(18rem,85vw)] overflow-y-auto rounded-[1.25rem] bg-[#121212] p-3 text-paper-100 shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
              <p className="mb-3 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                Flows
              </p>
              <ul className="space-y-0.5">
                <li>
                  <a
                    href="#flows-intro"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-2 py-2 text-[13px] text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    Intro
                  </a>
                </li>
                {FLOW_NAV_SECTIONS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex gap-2 rounded-lg px-2 py-2 text-[13px] text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      <span className="font-mono text-[10px] text-white/35">{item.shortLabel}</span>
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
            aria-controls="flows-mobile-nav"
          >
            <span className="font-mono text-[10px] text-white/45">
              {FLOW_NAV_SECTIONS.find((s) => s.id === activeId)?.shortLabel ?? "·"}
            </span>
            Flows
          </button>
        </div>
      </div>
    </>
  );
}
