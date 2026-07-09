export function SystemToggle({ checked = false, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className="relative h-6 w-10 rounded-full transition-colors"
        style={{
          background: checked ? "var(--proto-accent)" : "var(--proto-border)",
        }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
          style={{ left: checked ? "1.125rem" : "0.125rem" }}
        />
      </button>
      {label ? (
        <span className="text-[12px]" style={{ color: "var(--proto-text)" }}>
          {label}
        </span>
      ) : null}
    </label>
  );
}
