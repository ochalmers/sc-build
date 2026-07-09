import { appTypeClasses } from "../tokens/typography.js";
import { IconPlay } from "./SampleIcons.jsx";

export function SystemSessionCard({ title, className = "" }) {
  return (
    <article
      className={`relative flex h-app-card w-app-card shrink-0 flex-col overflow-hidden rounded-app-card ${className}`}
      style={{ background: "var(--proto-surface-elevated, var(--proto-bg))" }}
    >
      <div
        className="min-h-0 flex-1"
        style={{ background: "var(--proto-surface-muted, rgba(0,0,0,0.06))" }}
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <p className={appTypeClasses.cardTitle} style={{ color: "var(--proto-text-on-media, var(--proto-text))" }}>
          {title}
        </p>
        <button
          type="button"
          className="flex h-[43px] w-[43px] items-center justify-center rounded-full border"
          style={{
            borderColor: "var(--proto-border)",
            color: "var(--proto-text-on-media, var(--proto-text))",
          }}
          aria-label={`Play ${title}`}
        >
          <IconPlay className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
