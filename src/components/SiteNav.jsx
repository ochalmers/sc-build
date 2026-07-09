import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { WORKSPACE_META } from "../content/workspace.js";
import { SystemBrandLogo } from "../system/components/SystemBrandLogo.jsx";
import { isNavActive, MAIN_NAV, PROTOTYPE_CTA } from "../config/siteNav.js";

function NavLink({ item, active, onNavigate }) {
  const base =
    "block rounded-full px-3 py-2 text-[13px] font-normal tracking-tight transition-colors whitespace-nowrap";
  const state = active
    ? "bg-white/12 text-white"
    : "text-white/88 hover:bg-white/8 hover:text-white";

  return (
    <Link to={item.to} className={`${base} ${state}`} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

function MenuIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="shrink-0">
      {open ? (
        <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M3 5H15M3 9H15M3 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

export default function SiteNav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-[30px] pt-[30px]">
      <div className="flex h-[55px] items-center justify-between gap-3 rounded-full bg-[#121212] px-4 sm:px-5">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
        >
          <SystemBrandLogo className="h-[18px] w-auto max-w-[min(100%,200px)] brightness-0 invert" />
          <span className="border-l border-white/15 pl-2.5 text-[11px] font-medium tracking-tight text-white/50">
            {WORKSPACE_META.versionLabel}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {MAIN_NAV.map((item) => (
            <NavLink key={item.to} item={item} active={isNavActive(pathname, item)} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={PROTOTYPE_CTA.to}
            className="hidden rounded-full border border-white/20 bg-white px-3.5 py-2 text-[12px] font-medium tracking-tight text-ink-950 transition-colors hover:bg-white/90 sm:inline-flex"
          >
            {PROTOTYPE_CTA.label}
          </Link>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/8 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[-1] cursor-default bg-black/20 lg:hidden"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <nav
            id="mobile-nav-panel"
            className="mt-2 rounded-[1.25rem] bg-[#121212] p-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.35)] lg:hidden"
            aria-label="Primary"
          >
            <ul className="space-y-1">
              {MAIN_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    item={item}
                    active={isNavActive(pathname, item)}
                    onNavigate={closeMenu}
                  />
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to={PROTOTYPE_CTA.to}
                  className="block rounded-full border border-white/20 bg-white px-4 py-2.5 text-center text-[13px] font-medium tracking-tight text-ink-950"
                  onClick={closeMenu}
                >
                  {PROTOTYPE_CTA.label}
                </Link>
              </li>
            </ul>
          </nav>
        </>
      ) : null}
    </header>
  );
}
