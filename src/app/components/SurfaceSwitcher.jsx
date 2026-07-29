import { useEffect, useId, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DEMO_CREDENTIALS } from "../data/catalog.js";
import { useAppStore } from "../context/AppStore.jsx";
import { isCombinedStyleSurface, useReviewSurface } from "../context/SurfaceContext.jsx";

/** Primary top-nav surface. */
export const PRIMARY_SURFACE = { id: "combined", label: "End-to-End" };

/** Secondary surfaces kept available outside the main tab. */
export const SECONDARY_SURFACES = [
  { id: "listener", label: "Listener" },
  { id: "admin", label: "Admin" },
  { id: "anonymous", label: "Anonymous" },
];

function surfaceFromPath(pathname, stored) {
  // Prefer explicit Combined / Anonymous mode even while browsing listener/admin paths.
  if (isCombinedStyleSurface(stored)) return stored;
  if (pathname.startsWith("/app/admin")) return "admin";
  return "listener";
}

/** Pill switcher - End-to-End primary, with Listener / Admin / Anonymous under More. */
export function SurfaceSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { loginAdmin, logout } = useAppStore();
  const { surface: storedSurface, setSurface } = useReviewSurface();
  const active = surfaceFromPath(pathname, storedSurface);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const menuId = useId();

  const secondaryActive = SECONDARY_SURFACES.find((s) => s.id === active) || null;

  useEffect(() => {
    if (!moreOpen) return undefined;
    function onPointerDown(event) {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    }
    function onKey(event) {
      if (event.key === "Escape") setMoreOpen(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  function goToSurface(next) {
    setMoreOpen(false);
    if (next === active) return;

    setSurface(next);

    if (next === "listener") {
      logout();
      navigate("/app/listener/email", { replace: true });
      return;
    }

    if (next === "admin") {
      navigate("/app/admin", { replace: true });
      loginAdmin({
        email: DEMO_CREDENTIALS.admin.email,
        password: DEMO_CREDENTIALS.admin.password,
      });
      return;
    }

    if (next === "combined") {
      logout();
      navigate("/app/admin/setup?step=login", { replace: true });
      return;
    }

    if (next === "anonymous") {
      logout();
      navigate("/app/admin/setup?step=login", { replace: true });
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div
        className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
        role="tablist"
        aria-label="App surface"
      >
        <button
          type="button"
          role="tab"
          aria-selected={active === PRIMARY_SURFACE.id}
          onClick={() => goToSurface(PRIMARY_SURFACE.id)}
          className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
            active === PRIMARY_SURFACE.id
              ? "bg-white text-black"
              : "text-white/65 hover:bg-white/[0.08] hover:text-white"
          }`}
        >
          {PRIMARY_SURFACE.label}
        </button>
      </div>

      <div className="relative" ref={moreRef}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={moreOpen}
          aria-controls={menuId}
          onClick={() => setMoreOpen((open) => !open)}
          className={`rounded-full border border-white/10 px-3 py-1.5 text-[12px] transition-colors ${
            secondaryActive
              ? "border-white/25 bg-white/[0.08] text-white"
              : "bg-white/[0.04] text-white/55 hover:bg-white/[0.08] hover:text-white/85"
          }`}
        >
          {secondaryActive ? secondaryActive.label : "More"}
          <span className="ml-1.5 text-white/35" aria-hidden>
            ▾
          </span>
        </button>

        {moreOpen ? (
          <div
            id={menuId}
            role="menu"
            aria-label="Other surfaces"
            className="absolute left-0 top-[calc(100%+0.4rem)] z-50 min-w-[11rem] overflow-hidden rounded-xl border border-white/10 bg-[#161616] py-1 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
          >
            <p className="px-3 pb-1 pt-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
              Other surfaces
            </p>
            {SECONDARY_SURFACES.map((surface) => {
              const isActive = active === surface.id;
              return (
                <button
                  key={surface.id}
                  type="button"
                  role="menuitem"
                  onClick={() => goToSurface(surface.id)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-[12px] transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {surface.label}
                  {isActive ? <span className="text-[10px] text-white/40">Active</span> : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
