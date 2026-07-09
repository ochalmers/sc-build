import { Link, useLocation } from "react-router-dom";
import { DESIGN_PAGES } from "../config/siteNav.js";

export default function DesignsSubNav() {
  const { pathname } = useLocation();

  return (
    <div className="sticky top-[4.25rem] z-20 border-b border-ink-200/60 bg-paper-200/90 backdrop-blur-sm">
      <div className="max-w-content mx-auto flex gap-1 overflow-x-auto px-6 py-3">
        <nav
          className="inline-flex shrink-0 rounded-full border border-ink-200/80 bg-white/60 p-1"
          aria-label="Design phases"
        >
          {DESIGN_PAGES.map((page) => {
            const active = pathname === page.to;
            return (
              <Link
                key={page.to}
                to={page.to}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-medium tracking-tight transition-colors ${
                  active ? "bg-ink-950 text-paper-100" : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {page.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
