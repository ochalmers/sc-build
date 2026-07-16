import { Link } from "react-router-dom";
import { SurfaceSwitcher } from "./SurfaceSwitcher.jsx";
import { useAppStore } from "../context/AppStore.jsx";

/**
 * Shared fixed header for Listener / Partner / Admin so the surface switcher
 * stays in one place across all working-app surfaces.
 */
export function AppShell({ children }) {
  const { resetApp } = useAppStore();

  return (
    <div className="min-h-dvh bg-[#0f0f0f] text-[#f4f3ef]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/app" className="text-[15px] font-medium tracking-tight text-white">
              Sonocea App
            </Link>
            <SurfaceSwitcher />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-white/45">
            <Link to="/flows" className="hover:text-white/70">
              Flows docs
            </Link>
            <button type="button" onClick={resetApp} className="hover:text-white/70">
              Reset demo
            </button>
            <Link to="/" className="hover:text-white/70">
              (microsite)
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
