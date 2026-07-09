export function SystemPersonaChip({ children }) {
  return (
    <span
      className="inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-tight"
      style={{
        borderColor: "var(--proto-border)",
        color: "var(--proto-text)",
        background: "var(--proto-surface)",
      }}
    >
      {children}
    </span>
  );
}
