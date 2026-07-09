export function SystemPill({ children, active }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] tracking-tight"
      style={{
        borderColor: "var(--proto-border)",
        background: active ? "var(--proto-surface-elevated)" : "transparent",
        color: active ? "var(--proto-text)" : "var(--proto-text-muted)",
        fontWeight: active ? 520 : 450,
      }}
    >
      {children}
    </span>
  );
}
