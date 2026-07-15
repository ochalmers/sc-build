/**
 * Local UI primitives for the working PRD app.
 * Bound to ModeChrome / --proto-* vars from the design system.
 */

export function AppButton({
  children,
  onClick,
  variant = "primary",
  fullWidth,
  disabled,
  type = "button",
  className = "",
}) {
  const styles =
    variant === "primary"
      ? {
          background: "var(--proto-accent, #1a1a1a)",
          color: "var(--proto-bg, #f7f6f3)",
          border: "1px solid transparent",
        }
      : variant === "ghost"
        ? {
            background: "transparent",
            color: "var(--proto-text)",
            border: "1px solid transparent",
          }
        : {
            background: "var(--proto-surface-elevated, transparent)",
            color: "var(--proto-text)",
            border: "1px solid var(--proto-border)",
          };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-5 py-3 text-[13px] font-medium tracking-tight transition-opacity disabled:opacity-40 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      style={styles}
    >
      {children}
    </button>
  );
}

export function AppField({ label, type = "text", value, onChange, placeholder, autoComplete, hint }) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: "var(--proto-text-muted)" }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-xl border px-3.5 py-3 text-[14px] outline-none focus:border-[var(--proto-accent)]"
        style={{
          borderColor: "var(--proto-border)",
          background: "var(--proto-surface-elevated, var(--proto-surface))",
          color: "var(--proto-text)",
        }}
      />
      {hint ? (
        <span className="mt-1.5 block text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export function AppEyebrow({ children, className = "" }) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.14em] ${className}`}
      style={{ color: "var(--proto-text-muted)" }}
    >
      {children}
    </p>
  );
}

export function AppTitle({ children, className = "" }) {
  return (
    <h1
      className={`text-[1.75rem] font-medium leading-[1.1] tracking-[-0.03em] ${className}`}
      style={{ color: "var(--proto-text)" }}
    >
      {children}
    </h1>
  );
}

export function AppBody({ children, className = "" }) {
  return (
    <p className={`text-[14px] leading-relaxed ${className}`} style={{ color: "var(--proto-text-muted)" }}>
      {children}
    </p>
  );
}
