/**
 * Typography roles — one family stack; sizes and tracking stay consistent across modes.
 * (Modes may shift density/contrast; they do not swap type families.)
 */

export const fontStack = {
  sans: 'Aeonik, Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace',
};

/**
 * Roles for app + reference. Values are suggestions; Tailwind maps in components via classes.
 */
export const typeRoles = {
  display: {
    size: "clamp(1.75rem, 3.5vw, 2.25rem)",
    weight: 500,
    lineHeight: 1.12,
    letterSpacing: "-0.03em",
  },
  heading: {
    size: "clamp(1.125rem, 2vw, 1.375rem)",
    weight: 500,
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
  },
  body: {
    size: "0.9375rem",
    weight: 400,
    lineHeight: 1.55,
    letterSpacing: "-0.01em",
  },
  label: {
    size: "0.6875rem",
    weight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
  caption: {
    size: "0.75rem",
    weight: 450,
    lineHeight: 1.45,
    letterSpacing: "-0.01em",
  },
};

/** Tailwind-aligned class bundles for reuse */
export const typeClasses = {
  display: "text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.12] tracking-tightish",
  heading: "text-[clamp(1.125rem,2vw,1.375rem)] font-medium leading-snug tracking-tight",
  body: "text-[15px] leading-relaxed tracking-tight",
  label:
    "text-[11px] font-medium uppercase tracking-[0.14em]",
  caption: "text-[12px] leading-relaxed tracking-tight",
};
