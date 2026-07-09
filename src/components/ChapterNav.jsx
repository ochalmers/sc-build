import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getActiveChapterLabel,
  getChapterScrollIds,
  getChaptersForPath,
} from "../config/chapterNav.js";
import { useScrollSpy } from "../hooks/useScrollSpy.js";

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="shrink-0">
      <path d="M3 4.5H15M3 9H15M3 13.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ChapterNav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const chapters = getChaptersForPath(pathname);
  const scrollIds = getChapterScrollIds(pathname);
  const activeId = useScrollSpy(scrollIds);
  const activeLabel = getActiveChapterLabel(chapters, activeId);
  const panelId = "section-nav-panel";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (chapters.length === 0) return null;

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-[55] cursor-default bg-black/20"
          aria-label="Close section menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="fixed bottom-0 left-0 z-[60] pb-[max(1.25rem,env(safe-area-inset-bottom))] pl-[max(1.875rem,env(safe-area-inset-left))]">
        <div ref={wrapRef} className="flex flex-col items-stretch">
          {open ? (
            <div
              id={panelId}
              className="mb-2 min-w-[16rem] max-w-[min(20rem,80vw)] overflow-hidden rounded-[1.25rem] bg-[#121212] p-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
            >
              <nav
                className="max-h-[min(24rem,50dvh)] overflow-y-auto"
                aria-label="Page sections"
              >
                <ul className="space-y-1">
                  {chapters.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className={`block rounded-full px-4 py-2.5 text-[13px] tracking-tight transition-colors ${
                            isActive
                              ? "bg-white/12 text-white"
                              : "text-white/88 hover:bg-white/8 hover:text-white"
                          }`}
                          onClick={() => setOpen(false)}
                        >
                          {item.shortLabel}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-[55px] items-center gap-3 rounded-full bg-[#121212] px-5 text-white shadow-[0_8px_32px_rgba(0,0,0,0.24)] transition-colors hover:bg-[#1a1a1a]"
            aria-expanded={open}
            aria-controls={panelId}
            aria-haspopup="true"
            aria-label={open ? "Close section menu" : `Open section menu — ${activeLabel}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center text-white/90">
              <ListIcon />
            </span>
            <span className="max-w-[min(14rem,55vw)] truncate pr-1 text-[13px] tracking-tight text-white">
              {activeLabel}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
