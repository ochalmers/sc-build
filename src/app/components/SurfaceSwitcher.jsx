import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DEMO_CREDENTIALS } from "../data/catalog.js";
import { useAppStore } from "../context/AppStore.jsx";

const SURFACES = [
  { id: "listener", label: "Listener", to: "/app/listener/invite" },
  { id: "partner", label: "Partner", to: "/app/partner" },
  { id: "admin", label: "Admin", to: "/app/admin" },
];

function surfaceFromPath(pathname) {
  if (pathname.startsWith("/app/partner")) return "partner";
  if (pathname.startsWith("/app/admin")) return "admin";
  return "listener";
}

export function SurfaceSwitcher({ compact = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { loginPartner, loginAdmin, logout } = useAppStore();
  const [error, setError] = useState("");
  const active = surfaceFromPath(pathname);

  function goToSurface(next) {
    setError("");

    if (next === "listener") {
      logout();
      navigate("/app/listener/invite");
      return;
    }

    if (next === "partner") {
      const result = loginPartner({
        email: DEMO_CREDENTIALS.partner.email,
        password: DEMO_CREDENTIALS.partner.password,
      });
      if (!result.ok) return setError(result.error);
      navigate("/app/partner");
      return;
    }

    if (next === "admin") {
      const result = loginAdmin({
        email: DEMO_CREDENTIALS.admin.email,
        password: DEMO_CREDENTIALS.admin.password,
      });
      if (!result.ok) return setError(result.error);
      navigate("/app/admin");
    }
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor="surface-switcher">
          Switch app surface
        </label>
        <select
          id="surface-switcher"
          value={active}
          onChange={(e) => goToSurface(e.target.value)}
          className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[12px] text-white/85 outline-none transition-colors hover:bg-white/[0.08]"
        >
          {SURFACES.map((surface) => (
            <option key={surface.id} value={surface.id} className="bg-[#161616] text-white">
              {surface.label}
            </option>
          ))}
        </select>
        {error ? <span className="text-[12px] text-red-300">{error}</span> : null}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
        {SURFACES.map((surface) => {
          const isActive = surface.id === active;
          return (
            <button
              key={surface.id}
              type="button"
              onClick={() => goToSurface(surface.id)}
              className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
                isActive ? "bg-white text-black" : "text-white/65 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {surface.label}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-2 text-[12px] text-red-300">{error}</p> : null}
    </div>
  );
}
