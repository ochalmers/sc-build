import { useNavigate, useLocation } from "react-router-dom";
import { DEMO_CREDENTIALS } from "../data/catalog.js";
import { useAppStore } from "../context/AppStore.jsx";
import { isCombinedStyleSurface, useReviewSurface } from "../context/SurfaceContext.jsx";

const SURFACES = [
  { id: "listener", label: "Listener" },
  { id: "admin", label: "Admin" },
  { id: "combined", label: "Combined" },
  { id: "anonymous", label: "Anonymous" },
];

function surfaceFromPath(pathname, stored) {
  // Prefer explicit Combined / Anonymous mode even while browsing listener/admin paths.
  if (isCombinedStyleSurface(stored)) return stored;
  if (pathname.startsWith("/app/admin")) return "admin";
  return "listener";
}

/** Pill switcher - Listener, Admin, Combined (org), Anonymous (direct-access). */
export function SurfaceSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { loginAdmin, logout } = useAppStore();
  const { surface: storedSurface, setSurface } = useReviewSurface();
  const active = surfaceFromPath(pathname, storedSurface);

  function goToSurface(next) {
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
    <div
      className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
      role="tablist"
      aria-label="App surface"
    >
      {SURFACES.map((surface) => {
        const isActive = active === surface.id;
        return (
          <button
            key={surface.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => goToSurface(surface.id)}
            className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
              isActive
                ? "bg-white text-black"
                : "text-white/65 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            {surface.label}
          </button>
        );
      })}
    </div>
  );
}
