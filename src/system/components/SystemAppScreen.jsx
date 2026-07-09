import { SystemNavbar } from "./SystemNavbar.jsx";
import { SystemTabBar } from "./SystemTabBar.jsx";

/**
 * App chrome — Figma GTM frame (403×874 logical px).
 * Colour and imagery are delegated to CSS vars / child slots.
 */
export function SystemAppScreen({ children, footer, className = "" }) {
  return (
    <div
      className={`relative mx-auto flex w-full max-w-app-frame flex-col overflow-hidden shadow-appScreen ${className}`}
      style={{
        minHeight: "874px",
        background: "var(--proto-bg)",
        color: "var(--proto-text)",
      }}
    >
      <SystemNavbar />
      <div className="relative flex min-h-0 flex-1 flex-col px-4">{children}</div>
      {footer ?? <SystemTabBar />}
    </div>
  );
}
