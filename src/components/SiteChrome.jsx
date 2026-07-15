import { Link, useLocation } from "react-router-dom";
import ChapterNav from "./ChapterNav.jsx";
import SiteNav from "./SiteNav.jsx";
import { getIntroAnchor } from "../config/siteNav.js";

export default function SiteChrome({ children, hideChapterNav = false }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-dvh bg-paper-200 text-ink-950">
      <a
        href={getIntroAnchor(pathname)}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-paper-200"
      >
        Skip to content
      </a>

      <SiteNav />

      {children}

      {hideChapterNav ? null : <ChapterNav />}

      <footer className="border-t border-ink-200/70 bg-paper-100 py-10">
        <div className="max-w-content mx-auto flex flex-wrap items-center justify-between gap-4 px-[30px] text-[11px] text-ink-500">
          <span>Internal · sound-first · one adaptive system</span>
          <Link to="/design" className="text-ink-600 underline-offset-4 hover:underline">
            Design
          </Link>
        </div>
      </footer>
    </div>
  );
}
