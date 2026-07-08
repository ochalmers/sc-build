import { useResolvedMode } from "./ModeChrome.jsx";

export function SystemTextButton({ mode = "regulation", children, className = "" }) {
  const resolved = useResolvedMode(mode);
  return (
    <div style={resolved.cssVars} className="inline-block">
      <button
        type="button"
        className={`text-[13px] font-medium underline-offset-4 transition-opacity hover:opacity-80 ${className}`}
        style={{ color: "var(--proto-text)" }}
      >
        {children}
      </button>
    </div>
  );
}
