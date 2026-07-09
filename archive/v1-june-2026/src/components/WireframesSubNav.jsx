import { Link, useLocation } from "react-router-dom";
import { WIREFRAMES_PAGES } from "../config/siteNav.js";

export default function WireframesSubNav() {
  const { pathname } = useLocation();

  return (
    <div className="border-b border-ink-200/60 bg-paper-200/90 backdrop-blur-sm">
      <div className="max-w-content mx-auto flex gap-1 px-6 py-3">
        <nav
          className="inline-flex rounded-full border border-ink-200/80 bg-white/60 p-1"
          aria-label="Wireframes views"
        >
          {WIREFRAMES_PAGES.map((page) => {
            const active = pathname === page.to;
            return (
              <Link
                key={page.to}
                to={page.to}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[12px] font-medium tracking-tight transition-colors ${
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
