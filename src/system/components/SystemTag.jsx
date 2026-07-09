import { appTypeClasses } from "../tokens/typography.js";

export function SystemTag({ children, className = "" }) {
  return (
    <span
      className={`inline-flex h-app-tag items-center justify-center rounded-app-tag border px-[10px] ${appTypeClasses.tag} ${className}`}
      style={{
        borderColor: "var(--proto-border-strong, var(--proto-border))",
        color: "var(--proto-text)",
      }}
    >
      {children}
    </span>
  );
}
