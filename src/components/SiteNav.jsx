import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SystemBrandLogo } from "../system/components/SystemBrandLogo.jsx";
import { isNavActive, MAIN_NAV } from "../config/siteNav.js";

function NavLink({ item, active }) {
  const base =
    "rounded-full px-3 py-2 text-[13px] font-normal tracking-tight transition-colors whitespace-nowrap";
  const state = active
    ? "bg-white/12 text-white"
    : "text-white/88 hover:bg-white/8 hover:text-white";

  return (
    <Link to={item.to} className={`${base} ${state}`}>
      {item.label}
    </Link>
  );
}

function NavDropdown({ item, active }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={item.to}
        className={`rounded-full px-3 py-2 text-[13px] font-normal tracking-tight transition-colors whitespace-nowrap ${
          active ? "bg-white/12 text-white" : "text-white/88 hover:bg-white/8 hover:text-white"
        }`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}
      </Link>

      {open ? (
        <div className="absolute right-0 top-full z-[70] pt-2">
          <div className="min-w-[12.5rem] rounded-[1.25rem] bg-[#121212] p-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
            <ul className="space-y-1">
              {item.children.map((child) => {
                const childActive = pathname === child.to;
                return (
                  <li key={child.to}>
                    <Link
                      to={child.to}
                      className={`block rounded-full px-4 py-2.5 text-[13px] tracking-tight transition-colors ${
                        childActive
                          ? "bg-white/12 text-white"
                          : "text-white/88 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function SiteNav() {
  const { pathname } = useLocation();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-[30px] pt-[30px]">
      <div className="flex h-[55px] items-center justify-between rounded-full bg-[#121212] px-5">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
        >
          <SystemBrandLogo className="h-[18px] w-auto max-w-[min(100%,200px)] brightness-0 invert" />
        </Link>

        <nav className="flex items-center gap-0.5" aria-label="Primary">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <NavDropdown key={item.to} item={item} active={isNavActive(pathname, item)} />
            ) : (
              <NavLink key={item.to} item={item} active={isNavActive(pathname, item)} />
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
