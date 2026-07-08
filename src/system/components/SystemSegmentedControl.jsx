const ITEMS = ["One", "Two", "Three"];

export function SystemSegmentedControl({ mode: _mode = "regulation", value = 0, onChange }) {
  return (
    <div
      className="inline-flex rounded-full border p-0.5"
      style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
    >
      {ITEMS.map((label, i) => {
        const on = i === value;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange?.(i)}
            className="rounded-full px-3 py-1.5 text-[11px] font-medium tracking-tight"
            style={{
              background: on ? "var(--proto-text)" : "transparent",
              color: on ? "var(--proto-bg)" : "var(--proto-text-muted)",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
