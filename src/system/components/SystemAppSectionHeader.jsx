import { appTypeClasses } from "../tokens/typography.js";

export function SystemAppSectionHeader({ label, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p className={appTypeClasses.eyebrow} style={{ color: "var(--proto-text)" }}>
        {label}
      </p>
      <div className="h-px w-full" style={{ background: "var(--proto-border)" }} aria-hidden />
    </div>
  );
}
