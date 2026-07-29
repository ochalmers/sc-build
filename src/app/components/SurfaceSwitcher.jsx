import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../context/AppStore.jsx";
import { isCombinedStyleSurface, useReviewSurface } from "../context/SurfaceContext.jsx";

/** Primary top-nav surface. */
export const PRIMARY_SURFACE = { id: "combined", label: "End-to-End" };

/** Secondary surfaces kept for the launcher / programmatic entry — not shown in the app header. */
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

/** Pill switcher — End-to-End only in the working-app header. */
export function SurfaceSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout } = useAppStore();
  const { surface: storedSurface, setSurface } = useReviewSurface();
  const active = surfaceFromPath(pathname, storedSurface);
  const isPrimary = active === PRIMARY_SURFACE.id;

  function goToEndToEnd() {
    if (isPrimary) return;
    setSurface(PRIMARY_SURFACE.id);
    logout();
    navigate("/app/admin/setup?step=login", { replace: true });
  }

  return (
    <div
      className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
      role="tablist"
      aria-label="App surface"
    >
      <button
        type="button"
        role="tab"
        aria-selected={isPrimary}
        onClick={goToEndToEnd}
        className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
          isPrimary
            ? "bg-white text-black"
            : "text-white/65 hover:bg-white/[0.08] hover:text-white"
        }`}
      >
        {PRIMARY_SURFACE.label}
      </button>
    </div>
  );
}
