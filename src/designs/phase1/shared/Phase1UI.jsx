import { SystemBrandLogo } from "../../../system/components/SystemBrandLogo.jsx";

export const DARK_BG = "#201E2A";
export const DARK_TEXT = "#DDD";
export const DARK_MUTED = "rgba(221,221,221,0.55)";
export const LIGHT_BG = "#FDFDFD";
export const LIGHT_TEXT = "#080808";

export function Phase1Logo({ dark = true, className = "h-4 w-auto" }) {
  return (
    <SystemBrandLogo
      className={`${className} ${dark ? "brightness-0 invert opacity-90" : "opacity-90"}`}
    />
  );
}

export function PrimaryButton({ children, variant = "light", className = "", onClick, ...rest }) {
  const isDark = variant === "dark";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 w-full items-center justify-center rounded-full text-[13px] tracking-[-0.25px] ${className}`}
      style={{
        background: isDark ? "rgba(255,255,255,0.12)" : "#080808",
        color: isDark ? LIGHT_BG : LIGHT_BG,
        border: isDark ? "1px solid rgba(255,255,255,0.2)" : "none",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, dark = true, onClick, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-full items-center justify-center rounded-full text-[13px] tracking-[-0.25px]"
      style={{
        background: dark ? "rgba(255,255,255,0.08)" : "rgba(8,8,8,0.06)",
        color: dark ? DARK_TEXT : LIGHT_TEXT,
        border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(8,8,8,0.1)",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function TextLink({ children, dark = true, onClick, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[12px] font-medium tracking-[-0.2px]"
      style={{ color: dark ? DARK_MUTED : "#6E6D68" }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Phase1Input({ placeholder, value, state = "default", dark = true }) {
  const border =
    state === "valid"
      ? "1px solid #6BBF8A"
      : state === "invalid" || state === "expired"
        ? "1px solid #E07070"
        : dark
          ? "1px solid rgba(255,255,255,0.2)"
          : "1px solid rgba(8,8,8,0.12)";

  return (
    <div
      className="flex h-11 items-center rounded-xl px-4 text-[14px] tracking-[-0.25px]"
      style={{
        background: dark ? "rgba(255,255,255,0.06)" : "rgba(8,8,8,0.04)",
        border,
        color: value ? (dark ? DARK_TEXT : LIGHT_TEXT) : dark ? DARK_MUTED : "#8D8D8D",
      }}
    >
      {value || placeholder}
    </div>
  );
}

export function StateMessage({ type, children, dark = true }) {
  const colors = {
    valid: { bg: "rgba(107,191,138,0.15)", text: "#6BBF8A" },
    invalid: { bg: "rgba(224,112,112,0.15)", text: "#E07070" },
    expired: { bg: "rgba(224,180,80,0.15)", text: "#E0B450" },
    info: { bg: dark ? "rgba(255,255,255,0.08)" : "rgba(8,8,8,0.05)", text: dark ? DARK_MUTED : "#6E6D68" },
  };
  const c = colors[type] ?? colors.info;
  return (
    <p
      className="rounded-lg px-3 py-2 text-[11px] leading-relaxed"
      style={{ background: c.bg, color: c.text }}
    >
      {children}
    </p>
  );
}

export function ProgressDots({ total = 3, current = 0, dark = true }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-full transition-all"
          style={{
            width: i === current ? 28 : 20,
            background: i <= current ? (dark ? DARK_TEXT : LIGHT_TEXT) : dark ? "rgba(221,221,221,0.25)" : "rgba(8,8,8,0.15)",
          }}
        />
      ))}
    </div>
  );
}

export function ScreenHeader({ title, subtitle, dark = true }) {
  return (
    <div className="px-5 pt-12">
      {title ? (
        <h1
          className="text-[28px] leading-[1.05] tracking-[-0.3px]"
          style={{ color: dark ? DARK_TEXT : LIGHT_TEXT }}
        >
          {title}
        </h1>
      ) : null}
      {subtitle ? (
        <p className="mt-2 text-[12px] leading-relaxed" style={{ color: dark ? DARK_MUTED : "#6E6D68" }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function SessionCard({ gradient, title, duration, compact = false }) {
  return (
    <div
      className={`relative flex overflow-hidden rounded-[14px] ${compact ? "h-[72px]" : "h-[104px]"}`}
      style={{ background: gradient }}
    >
      <div className="flex flex-1 flex-col justify-end p-3.5">
        {title ? (
          <p className="text-[13px] font-medium tracking-[-0.2px] text-white/95">{title}</p>
        ) : null}
        {duration ? <p className="text-[10px] text-white/70">{duration}</p> : null}
      </div>
      <div className="flex items-center pr-3.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3 2v8l7-4-7-4z" fill="white" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, message, dark = true }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-[22px]"
        style={{ background: dark ? "rgba(255,255,255,0.06)" : "rgba(8,8,8,0.05)" }}
      >
        {icon}
      </div>
      <p className="text-[15px] font-medium tracking-[-0.2px]" style={{ color: dark ? DARK_TEXT : LIGHT_TEXT }}>
        {title}
      </p>
      <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: dark ? DARK_MUTED : "#6E6D68" }}>
        {message}
      </p>
    </div>
  );
}

export function LoadingShimmer({ dark = true }) {
  return (
    <div className="flex flex-col gap-3 p-3.5">
      {[0.9, 0.7, 0.85].map((w, i) => (
        <div
          key={i}
          className="h-[72px] animate-pulse rounded-[14px]"
          style={{
            width: `${w * 100}%`,
            background: dark ? "rgba(255,255,255,0.08)" : "rgba(8,8,8,0.06)",
          }}
        />
      ))}
    </div>
  );
}

export function StatusBadge({ label, tone = "neutral" }) {
  const tones = {
    neutral: { bg: "rgba(255,255,255,0.12)", text: DARK_TEXT },
    success: { bg: "rgba(107,191,138,0.2)", text: "#6BBF8A" },
    warning: { bg: "rgba(224,180,80,0.2)", text: "#E0B450" },
    error: { bg: "rgba(224,112,112,0.2)", text: "#E07070" },
    assigned: { bg: "rgba(112,128,232,0.2)", text: "#90A0F0" },
  };
  const t = tones[tone] ?? tones.neutral;
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.08em]"
      style={{ background: t.bg, color: t.text }}
    >
      {label}
    </span>
  );
}
