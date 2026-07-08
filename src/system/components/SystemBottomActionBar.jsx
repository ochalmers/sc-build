export function SystemBottomActionBar({ primary = "Continue", secondary = "Back" }) {
  return (
    <div
      className="flex items-center justify-between gap-3 border-t px-4 py-3"
      style={{
        borderColor: "var(--proto-border)",
        background: "var(--proto-surface-elevated)",
      }}
    >
      <button type="button" className="text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
        {secondary}
      </button>
      <button
        type="button"
        className="rounded-lg px-4 py-2 text-[12px] font-medium"
        style={{ background: "var(--proto-accent)", color: "var(--proto-bg)" }}
      >
        {primary}
      </button>
    </div>
  );
}
