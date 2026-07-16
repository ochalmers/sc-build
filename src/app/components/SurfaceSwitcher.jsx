import { useNavigate, useLocation } from "react-router-dom";
import { DEMO_CREDENTIALS } from "../data/catalog.js";
import { useAppStore } from "../context/AppStore.jsx";

const SURFACES = [
  { id: "listener", label: "Listener" },
  { id: "partner", label: "Partner" },
  { id: "admin", label: "Admin" },
];

function surfaceFromPath(pathname) {
  if (pathname.startsWith("/app/partner")) return "partner";
  if (pathname.startsWith("/app/admin")) return "admin";
  return "listener";
}

/** Pill switcher — same control on Listener, Partner, and Admin. */
export function SurfaceSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { loginPartner, loginAdmin, logout } = useAppStore();
  const active = surfaceFromPath(pathname);

  function goToSurface(next) {
    if (next === active) return;

    // Navigate first so route guards never bounce us via /app → Listener mid-switch.
    if (next === "listener") {
      logout();
      navigate("/app/listener/invite", { replace: true });
      return;
    }

    if (next === "partner") {
      navigate("/app/partner", { replace: true });
      loginPartner({
        email: DEMO_CREDENTIALS.partner.email,
        password: DEMO_CREDENTIALS.partner.password,
      });
      return;
    }

    if (next === "admin") {
      navigate("/app/admin", { replace: true });
      loginAdmin({
        email: DEMO_CREDENTIALS.admin.email,
        password: DEMO_CREDENTIALS.admin.password,
      });
    }
  }

  return (
    <div
      className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
      role="tablist"
      aria-label="App surface"
    >
      {SURFACES.map((surface) => {
        const isActive = surface.id === active;
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
