import { SystemTabBar } from "./SystemTabBar.jsx";

/**
 * App chrome — Figma GTM frame (403×874 logical px).
 * Colour and imagery are delegated to CSS vars / child slots.
 * Primary navigation is bottom tabs only (Home · Profile).
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
      <div className="relative flex min-h-0 flex-1 flex-col px-4 pt-6">{children}</div>
      {footer ?? <SystemTabBar />}
    </div>
  );
}
