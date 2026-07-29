import { Link } from "react-router-dom";
import { SurfaceSwitcher } from "./SurfaceSwitcher.jsx";
import { CombinedViewSwitcher } from "./CombinedViewSwitcher.jsx";
import { SurfaceProvider } from "../context/SurfaceContext.jsx";

/**
 * Shared fixed header for End-to-End review.
 */
export function AppShell({ children }) {
  return (
    <SurfaceProvider>
      <div className="min-h-dvh bg-[#0f0f0f] text-[#f4f4f4]">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-[2200px] flex-wrap items-center gap-3 px-5 py-3 md:px-6 lg:px-8 xl:px-10">
            <Link to="/app" className="text-[15px] font-medium tracking-tight text-white">
              Sonocea App
            </Link>
            <SurfaceSwitcher />
            <CombinedViewSwitcher />
          </div>
        </header>
        {children}
      </div>
    </SurfaceProvider>
  );
}
