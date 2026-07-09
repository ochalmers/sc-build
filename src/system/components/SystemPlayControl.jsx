import { appPlayControl } from "../tokens/appLayout.js";
import { IconPlay } from "./SampleIcons.jsx";

export function SystemPlayControl({ className = "", onClick, label = "Play session" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-app-play w-app-play items-center justify-center ${className}`}
      aria-label={label}
    >
      {appPlayControl.ringOffsets.map((offset) => (
        <span
          key={offset}
          className="pointer-events-none absolute rounded-full border"
          style={{
            inset: `-${offset}px`,
            borderColor: "var(--proto-border)",
            opacity: 0.35 + offset * 0.002,
          }}
          aria-hidden
        />
      ))}
      <span
        className="relative flex h-full w-full items-center justify-center rounded-full border"
        style={{
          borderColor: "var(--proto-border-strong, var(--proto-border))",
          background: "var(--proto-surface-elevated, var(--proto-bg))",
          color: "var(--proto-text)",
        }}
      >
        <IconPlay className="h-7 w-7" />
      </span>
    </button>
  );
}
