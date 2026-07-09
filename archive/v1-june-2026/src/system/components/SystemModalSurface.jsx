export function SystemModalSurface({ children, title = "Title" }) {
  return (
    <div
      className="mx-auto max-w-sm rounded-2xl border p-5 shadow-2xl"
      style={{
        borderColor: "var(--proto-border)",
        background: "var(--proto-surface-elevated)",
        boxShadow: "0 24px 64px rgba(8,8,8,.12)",
      }}
    >
      <h4 className="text-[15px] font-medium tracking-tight" style={{ color: "var(--proto-text)" }}>
        {title}
      </h4>
      <div className="mt-4 text-[13px] leading-relaxed" style={{ color: "var(--proto-text-muted)" }}>
        {children}
      </div>
    </div>
  );
}
