import { ModeChrome } from "../../system/components/ModeChrome.jsx";
import {
  SystemButton,
  SystemTextButton,
  SystemInput,
  SystemTabBar,
  SystemSessionCard,
  SystemTag,
  SystemWaveformModule,
  SystemPlayControl,
  SystemModalSurface,
  SystemSegmentedControl,
  SystemCard,
  SystemPill,
  SystemToggle,
  SystemBottomActionBar,
} from "../../system/components/index.js";
import PreviewPlaceholder from "./PreviewPlaceholder.jsx";

const MODE = "regulation";

function PreviewFrame({ children, wide }) {
  return (
    <ModeChrome
      mode={MODE}
      className={`flex items-center justify-center rounded-2xl border border-ink-200/70 bg-paper-100/40 p-6 ${wide ? "min-h-[200px]" : "min-h-[160px]"}`}
    >
      {children}
    </ModeChrome>
  );
}

const COMPONENT_PREVIEWS = {
  "tab-bar": () => (
    <PreviewFrame wide>
      <div className="w-[280px] overflow-hidden rounded-xl border border-ink-200/50">
        <div className="h-32" style={{ background: "var(--proto-bg)" }} />
        <SystemTabBar />
      </div>
    </PreviewFrame>
  ),
  "nav-header": () => (
    <PreviewFrame>
      <div
        className="flex w-full max-w-[280px] items-center gap-3 rounded-xl border border-ink-200/50 px-4 py-3"
        style={{ background: "var(--proto-bg)", color: "var(--proto-text)" }}
      >
        <span className="text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
          ←
        </span>
        <span className="text-[15px] font-medium tracking-tight">Screen title</span>
      </div>
    </PreviewFrame>
  ),
  "primary-btn": () => (
    <PreviewFrame>
      <div className="flex flex-col gap-3">
        <SystemButton mode={MODE}>Continue</SystemButton>
        <SystemButton mode={MODE} fullWidth>
          Full width
        </SystemButton>
      </div>
    </PreviewFrame>
  ),
  "secondary-btn": () => (
    <PreviewFrame>
      <SystemTextButton mode={MODE}>Learn more</SystemTextButton>
    </PreviewFrame>
  ),
  slider: () => (
    <PreviewFrame>
      <SystemSegmentedControl mode={MODE} />
    </PreviewFrame>
  ),
  "text-field": () => (
    <PreviewFrame>
      <div className="w-full max-w-[240px]">
        <SystemInput mode={MODE} placeholder="Access code" />
      </div>
    </PreviewFrame>
  ),
  "session-card": () => (
    <PreviewFrame>
      <div className="w-full max-w-[260px]">
        <SystemSessionCard title="Regulation — Morning" />
      </div>
    </PreviewFrame>
  ),
  "info-card": () => (
    <PreviewFrame>
      <div className="w-full max-w-[260px]">
        <SystemCard mode={MODE}>
          <p className="text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--proto-text-muted)" }}>
            Science
          </p>
          <p className="mt-2 text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
            Listening guidance
          </p>
          <p className="mt-2 text-[12px] leading-relaxed" style={{ color: "var(--proto-text-muted)" }}>
            Use headphones in a quiet space for the best experience.
          </p>
        </SystemCard>
      </div>
    </PreviewFrame>
  ),
  "session-list": () => (
    <PreviewFrame wide>
      <div className="w-full max-w-[260px] space-y-2">
        <SystemSessionCard title="Session 1" />
        <SystemSessionCard title="Session 2" />
      </div>
    </PreviewFrame>
  ),
  toast: () => (
    <PreviewFrame>
      <div
        className="rounded-xl px-4 py-3 text-[12px] font-medium"
        style={{ background: "var(--proto-text)", color: "var(--proto-bg)" }}
      >
        Session saved
      </div>
    </PreviewFrame>
  ),
  banner: () => (
    <PreviewFrame wide>
      <div
        className="w-full max-w-[280px] rounded-lg border px-3 py-2 text-[12px]"
        style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)", color: "var(--proto-text)" }}
      >
        You&apos;re offline — changes will sync when reconnected.
      </div>
    </PreviewFrame>
  ),
  waveform: () => (
    <PreviewFrame wide>
      <div className="w-full max-w-[260px]">
        <SystemWaveformModule mode={MODE} />
      </div>
    </PreviewFrame>
  ),
  "player-controls": () => (
    <PreviewFrame>
      <SystemPlayControl />
    </PreviewFrame>
  ),
  "modal-surface": () => (
    <PreviewFrame wide>
      <SystemModalSurface title="Enable notifications?">
        We&apos;ll remind you when your next session is ready.
      </SystemModalSurface>
    </PreviewFrame>
  ),
  "action-sheet": () => (
    <PreviewFrame wide>
      <div
        className="w-full max-w-[260px] rounded-t-2xl border px-4 py-3"
        style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface-elevated)" }}
      >
        <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-ink-300/60" />
        <button type="button" className="block w-full py-3 text-[13px]" style={{ color: "var(--proto-text)" }}>
          Share session
        </button>
        <button type="button" className="block w-full py-3 text-[13px] text-red-600">
          End session
        </button>
      </div>
    </PreviewFrame>
  ),
  "workspace-nav": () => (
    <PreviewFrame>
      <div className="flex gap-1 rounded-full border border-ink-200 bg-paper-100 p-1">
        {["Overview", "Flows", "Design"].map((item, i) => (
          <span
            key={item}
            className={`rounded-full px-3 py-1.5 text-[11px] font-medium ${i === 2 ? "bg-ink-950 text-paper-100" : "text-ink-600"}`}
          >
            {item}
          </span>
        ))}
      </div>
    </PreviewFrame>
  ),
  "progress-ring": () => (
    <PreviewFrame>
      <div className="relative flex h-16 w-16 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64" aria-hidden>
          <circle cx="32" cy="32" r="28" fill="none" stroke="var(--proto-border)" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="var(--proto-accent)"
            strokeWidth="4"
            strokeDasharray="176"
            strokeDashoffset="44"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[13px] font-medium" style={{ color: "var(--proto-text)" }}>
          75%
        </span>
      </div>
    </PreviewFrame>
  ),
  skeleton: () => (
    <PreviewFrame wide>
      <div className="w-full max-w-[260px] space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-ink-200/60" />
        <div className="h-20 animate-pulse rounded-xl bg-ink-200/40" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-ink-200/60" />
      </div>
    </PreviewFrame>
  ),
  "status-tag": () => (
    <PreviewFrame>
      <div className="flex flex-wrap gap-2">
        <SystemTag>Active</SystemTag>
        <SystemTag>Completed</SystemTag>
      </div>
    </PreviewFrame>
  ),
  "notification-badge": () => (
    <PreviewFrame>
      <div className="relative inline-flex">
        <SystemPill active>Library</SystemPill>
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-medium text-white">
          2
        </span>
      </div>
    </PreviewFrame>
  ),
  "user-avatar": () => (
    <PreviewFrame>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full text-[14px] font-medium"
        style={{ background: "var(--proto-accent)", color: "var(--proto-bg)" }}
      >
        OL
      </div>
    </PreviewFrame>
  ),
  "empty-state": () => (
    <PreviewFrame wide>
      <div className="max-w-[220px] text-center">
        <p className="text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
          No sessions yet
        </p>
        <p className="mt-1 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
          Your provider will assign sessions soon.
        </p>
      </div>
    </PreviewFrame>
  ),
  "error-state": () => (
    <PreviewFrame wide>
      <div className="max-w-[220px] text-center">
        <p className="text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
          Connection lost
        </p>
        <p className="mt-1 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
          Check your network and try again.
        </p>
        <div className="mt-4">
          <SystemButton mode={MODE}>Retry</SystemButton>
        </div>
      </div>
    </PreviewFrame>
  ),
};

export default function ComponentPreview({ componentId, label }) {
  const Preview = COMPONENT_PREVIEWS[componentId];

  if (Preview) {
    return <Preview />;
  }

  return <PreviewPlaceholder label={label} type="component" />;
}

export function ComponentPreviewCompact({ componentId }) {
  if (componentId === "primary-btn") return <SystemButton mode={MODE}>Action</SystemButton>;
  if (componentId === "status-tag") return <SystemTag>Tag</SystemTag>;
  if (componentId === "text-field") return <SystemInput mode={MODE} placeholder="Input" />;
  if (componentId === "toggle") return <SystemToggle mode={MODE} />;
  if (componentId === "bottom-bar") return <SystemBottomActionBar primary="Continue" />;
  return null;
}
