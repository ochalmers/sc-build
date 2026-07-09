import { useResolvedMode } from "./ModeChrome.jsx";

export function SystemCard({ mode = "regulation", children, className = "" }) {
  const resolved = useResolvedMode(mode);
  const { layout } = resolved;
  const pad = `${(0.5 + layout.densityScale * 0.35).toFixed(2)}rem`;
  return (
    <div
      className={`border ${className}`}
      style={{
        ...resolved.cssVars,
        borderRadius: layout.radiusPx,
        borderColor: "var(--proto-border)",
        background: "var(--proto-surface-elevated)",
        padding: pad,
        boxShadow: `0 12px 36px rgba(12,12,11,${layout.cardShadowAlpha})`,
      }}
    >
      {children}
    </div>
  );
}
