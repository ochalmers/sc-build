export function SystemScenarioCard({ title, body }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: "var(--proto-border)",
        background: "var(--proto-bg)",
      }}
    >
      <p className="text-[12px] font-medium" style={{ color: "var(--proto-text)" }}>
        {title}
      </p>
      <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "var(--proto-text-muted)" }}>
        {body}
      </p>
    </div>
  );
}
