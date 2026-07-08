import { typeClasses } from "../tokens/typography.js";

export function SystemSectionHeader({ label, title, description }) {
  return (
    <header>
      <p className={`${typeClasses.label} text-[var(--proto-text-muted)]`}>{label}</p>
      <h3 className={`mt-2 ${typeClasses.heading}`} style={{ color: "var(--proto-text)" }}>
        {title}
      </h3>
      {description ? (
        <p className={`mt-2 ${typeClasses.caption}`} style={{ color: "var(--proto-text-muted)" }}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
