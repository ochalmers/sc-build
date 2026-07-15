import React, { createContext, useContext } from "react";
import { getWireframePalette, WF_TYPE } from "./tokens.js";

const WireframeContext = createContext(getWireframePalette("light"));

export { WireframeContext };

export function useWf() {
  return useContext(WireframeContext);
}

export function WireframeScreen({ children, tone = "light" }) {
  const palette = getWireframePalette(tone);

  return (
    <WireframeContext.Provider value={palette}>
      <div
        className="flex h-full min-h-0 w-full flex-col overflow-hidden"
        style={{ background: palette.bg, color: palette.text }}
      >
        {children}
      </div>
    </WireframeContext.Provider>
  );
}

export function WfTag({ children }) {
  const WF = useWf();
  return (
    <p className={`px-5 pb-1 ${WF_TYPE.tag}`} style={{ color: WF.textMuted }}>
      {children}
    </p>
  );
}

export function WfHeadline({ title, subtitle, className = "" }) {
  const WF = useWf();
  return (
    <div className={`px-5 ${className}`}>
      <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textSecondary }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function WfPlaceholder({ size = "md", className = "", decorative = true }) {
  const WF = useWf();
  const sizes = {
    sm: "h-14 w-14 rounded-xl",
    md: "h-24 w-full rounded-2xl",
    lg: "h-32 w-full rounded-2xl",
    icon: "h-20 w-20 rounded-full",
    square: "h-11 w-11 shrink-0 rounded-[10px]",
    logo: "h-7 w-24 rounded-md",
  };

  return (
    <div
      className={`border-2 border-dashed ${sizes[size]} ${className}`}
      style={{
        borderColor: WF.borderStrong,
        background: WF.surfaceMuted,
      }}
      aria-hidden={decorative}
    />
  );
}

export function WfIcon({ shape = "box", className = "", style = {}, onClick }) {
  const WF = useWf();
  const shapes = {
    box: "h-[18px] w-[18px] rounded-md",
    play: "h-8 w-8 rounded-full",
    control: "h-10 w-10 rounded-full",
    controlLg: "h-12 w-12 rounded-full",
    chevron: "h-3 w-3 rounded-sm",
    mark: "h-5 w-5 rounded-full",
  };
  const classes = `shrink-0 border ${shapes[shape] ?? shapes.box} ${onClick ? "cursor-pointer transition-opacity hover:opacity-80" : ""} ${className}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classes}
        style={{ borderColor: WF.border, background: WF.surfaceMuted, ...style }}
        aria-label="Continue"
      />
    );
  }

  return (
    <div
      className={classes}
      style={{ borderColor: WF.border, background: WF.surfaceMuted, ...style }}
      aria-hidden
    />
  );
}

export function WfButton({ children, variant = "primary", className = "", onClick }) {
  const WF = useWf();
  const isPrimary = variant === "primary";
  const style = {
    background: isPrimary ? WF.fill : WF.surface,
    color: isPrimary ? WF.bg : WF.textSecondary,
    border: isPrimary ? "none" : `1px solid ${WF.border}`,
  };
  const classes = `rounded-xl px-4 py-3 text-center ${WF_TYPE.button} ${className}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full cursor-pointer transition-opacity hover:opacity-90 active:opacity-80 ${classes}`}
        style={style}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

export function WfTextLink({ children, onClick }) {
  const WF = useWf();
  const classes = `text-center ${WF_TYPE.link}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full cursor-pointer underline-offset-2 hover:underline ${classes}`}
        style={{ color: WF.textMuted }}
      >
        {children}
      </button>
    );
  }

  return (
    <p className={classes} style={{ color: WF.textMuted }}>
      {children}
    </p>
  );
}

export function WfField({ label, placeholder, value, state = "default" }) {
  const WF = useWf();
  const borderColor =
    state === "valid" ? WF.success : state === "invalid" ? WF.error : WF.border;

  return (
    <div>
      {label ? (
        <div className={WF_TYPE.label} style={{ color: WF.textSecondary }}>
          {label}
        </div>
      ) : null}
      <div
        className={`${label ? "mt-1.5" : ""} rounded-xl border px-3 py-2.5 ${WF_TYPE.body}`}
        style={{
          borderColor,
          background: WF.surface,
          color: value ? WF.text : WF.placeholder,
        }}
      >
        {value || placeholder}
      </div>
    </div>
  );
}

export function WfMessage({ children, type = "info" }) {
  const WF = useWf();
  const tones = {
    info: { bg: WF.surfaceMuted, color: WF.textSecondary },
    valid: { bg: WF.surfaceMuted, color: WF.success },
    invalid: { bg: WF.surfaceMuted, color: WF.error },
    warning: { bg: WF.surfaceMuted, color: WF.warning },
  };
  const t = tones[type] ?? tones.info;

  return (
    <p className={`rounded-lg px-3 py-2 ${WF_TYPE.bodySm}`} style={{ background: t.bg, color: t.color }}>
      {children}
    </p>
  );
}

export function WfProgress({ total = 3, current = 0 }) {
  const WF = useWf();
  return (
    <div className="flex gap-1.5 px-5 pb-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-full"
          style={{
            width: i === current ? 28 : 20,
            background: i <= current ? WF.fill : WF.border,
          }}
        />
      ))}
    </div>
  );
}

export function WfSlider({ label, value = 50 }) {
  const WF = useWf();
  return (
    <div className="space-y-1.5">
      <div className={`flex justify-between ${WF_TYPE.bodySm}`} style={{ color: WF.textSecondary }}>
        <span>{label}</span>
        <span style={{ color: WF.textMuted }}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: WF.border }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: WF.fillMuted }}
        />
      </div>
    </div>
  );
}

export function WfListRow({ title, meta, chevron = false, onClick }) {
  const WF = useWf();
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`flex items-center gap-3 border-b px-5 py-3 ${onClick ? "cursor-pointer transition-colors hover:bg-black/[0.03]" : ""}`}
      style={{ borderColor: WF.border }}
    >
      <WfPlaceholder size="square" />
      <div className="min-w-0 flex-1">
        <p className={`truncate ${WF_TYPE.label}`} style={{ color: WF.text }}>
          {title}
        </p>
        {meta ? (
          <p className={`mt-0.5 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
            {meta}
          </p>
        ) : null}
      </div>
      {chevron ? <WfIcon shape="chevron" /> : <WfIcon shape="play" />}
    </div>
  );
}

export function WfCardRow({ title, subtitle, selected = false }) {
  const WF = useWf();
  return (
    <div
      className="flex gap-3 rounded-xl border p-3"
      style={{
        borderColor: selected ? WF.fill : WF.border,
        background: selected ? WF.surfaceMuted : WF.surface,
      }}
    >
      <div
        className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2"
        style={{ borderColor: selected ? WF.fill : WF.placeholder }}
      />
      <div>
        <p className={WF_TYPE.label} style={{ color: WF.text }}>
          {title}
        </p>
        {subtitle ? (
          <p className={`mt-0.5 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function WfChip({ children, active = false }) {
  const WF = useWf();
  return (
    <span
      className={`rounded-full px-2.5 py-1 ${WF_TYPE.chip}`}
      style={{
        background: active ? WF.fill : WF.surface,
        color: active ? WF.bg : WF.textSecondary,
        border: active ? "none" : `1px solid ${WF.border}`,
      }}
    >
      {children}
    </span>
  );
}

export function WfTabBar({ active = "home" }) {
  const WF = useWf();
  const normalized =
    active === "discover" ||
    active === "today" ||
    active === "library" ||
    active === "sessions" ||
    active === "assigned" ||
    active === "assigned-programme" ||
    active === "progress"
      ? "home"
      : active;
  const tabs = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <div
      className="mt-auto flex justify-around border-t px-2 py-2.5"
      style={{ borderColor: WF.border, background: WF.surface }}
    >
      {tabs.map((t) => {
        const on = t.id === normalized;
        return (
          <div key={t.id} className="flex min-w-0 flex-1 flex-col items-center gap-1">
            <WfIcon
              shape="box"
              style={{
                background: on ? WF.fill : "transparent",
                borderColor: on ? WF.fill : WF.border,
              }}
            />
            <span className={WF_TYPE.caption} style={{ color: on ? WF.text : WF.placeholder }}>
              {t.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function WfScreenBody({ children, className = "" }) {
  return <div className={`flex min-h-0 flex-1 flex-col ${className}`}>{children}</div>;
}

export function WfScreenFooter({ children }) {
  return <div className="space-y-2 px-5 pb-6">{children}</div>;
}

export function WfSkeletonLines({ lines = 5 }) {
  const WF = useWf();
  const widths = ["100%", "92%", "85%", "100%", "78%"];
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-2 rounded"
          style={{ width: widths[i % widths.length], background: WF.border }}
        />
      ))}
    </div>
  );
}

export function WfRatingRow() {
  const WF = useWf();
  return (
    <div className="flex justify-between gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-9 w-9 rounded-[10px] border"
          style={{ borderColor: WF.border, background: WF.surfaceMuted }}
        />
      ))}
    </div>
  );
}

export function WfEmptyState({ title, message }) {
  const WF = useWf();
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <WfPlaceholder size="sm" />
      <p className={`mt-4 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
        {title}
      </p>
      <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textMuted }}>
        {message}
      </p>
    </div>
  );
}

export function WfScreenHeader({ className = "" }) {
  return (
    <div className={`flex items-center justify-between px-5 pt-4 ${className}`}>
      <WfPlaceholder size="logo" />
      <WfIcon shape="box" className="!h-7 !w-7" />
    </div>
  );
}

export function WfSuccessMark() {
  const WF = useWf();
  return (
    <div
      className="flex h-20 w-20 items-center justify-center rounded-full border-2"
      style={{ borderColor: WF.borderStrong, background: WF.surfaceMuted }}
      aria-hidden
    >
      <div className="h-8 w-8 rounded-full border-2" style={{ borderColor: WF.fill }} />
    </div>
  );
}

export function WfRowLink({ title, subtitle }) {
  const WF = useWf();
  return (
    <div
      className="flex items-center justify-between gap-3 border-b py-3"
      style={{ borderColor: WF.border }}
    >
      <div>
        {subtitle ? (
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            {subtitle}
          </p>
        ) : null}
        <p className={WF_TYPE.label} style={{ color: WF.text }}>
          {title}
        </p>
      </div>
      <WfIcon shape="chevron" />
    </div>
  );
}
