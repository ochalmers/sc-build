export function SystemStoryCard({ title, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border p-4 text-left ${className}`}
      style={{
        borderColor: "var(--proto-border)",
        background: "var(--proto-surface)",
      }}
    >
      <p
        className="text-[11px] font-medium uppercase tracking-[0.12em]"
        style={{ color: "var(--proto-text-muted)" }}
      >
        {title}
      </p>
      <div className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--proto-text)" }}>
        {children}
      </div>
    </div>
  );
}
