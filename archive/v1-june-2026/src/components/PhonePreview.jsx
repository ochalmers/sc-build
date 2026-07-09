import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { usePrototype } from "../context/PrototypeContext.jsx";
import WaveformLine from "./WaveformLine.jsx";
import { SystemBrandLogo } from "../system/components/SystemBrandLogo.jsx";

const SCREENS = [
  { id: "home", label: "Home" },
  { id: "intent", label: "Intent" },
  { id: "setup", label: "Session" },
  { id: "active", label: "Active" },
];

export default function PhonePreview() {
  const { resolved, behaviourMode } = usePrototype();
  const [screen, setScreen] = useState("home");
  const { durationSec, ease } = resolved.motion;
  const { gapScale, densityScale, radiusPx, cardShadowAlpha } = resolved.layout;
  const pad = `${(0.65 * densityScale).toFixed(2)}rem`;
  const gap = `${(0.45 * gapScale).toFixed(2)}rem`;

  const transition = { duration: durationSec, ease };

  const chip = (label, active) => (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] tracking-tight"
      style={{
        borderColor: "var(--proto-border)",
        background: active ? "var(--proto-surface-elevated)" : "transparent",
        color: active ? "var(--proto-text)" : "var(--proto-text-muted)",
        fontWeight: active ? 520 : 450,
      }}
    >
      {label}
    </span>
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="flex flex-wrap justify-center gap-1.5"
        role="tablist"
        aria-label="Preview screen"
      >
        {SCREENS.map((s) => {
          const active = screen === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setScreen(s.id)}
              className="rounded-full px-3 py-1.5 text-[11px] tracking-tight transition-colors"
              style={{
                background: active ? "var(--proto-text)" : "var(--proto-surface)",
                color: active ? "var(--proto-bg)" : "var(--proto-text-muted)",
                border: `1px solid ${active ? "var(--proto-text)" : "var(--proto-border)"}`,
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="relative w-[min(100%,420px)] overflow-hidden rounded-[2.5rem] border"
        style={{
          background: "var(--proto-bg)",
          borderColor: "var(--proto-border)",
          boxShadow: `0 26px 72px rgba(15,15,14,${0.08 + cardShadowAlpha})`,
        }}
        transition={transition}
      >
        <div
          className="absolute left-1/2 top-2.5 z-10 h-5 w-[4.5rem] -translate-x-1/2 rounded-full"
          style={{ background: "rgba(0,0,0,.06)" }}
        />
        <div
          className="relative mx-auto flex min-h-[620px] flex-col"
          style={{ padding: pad, paddingTop: "2.25rem", gap }}
        >
          <header className="flex items-center justify-between">
            <SystemBrandLogo className="h-3.5 w-auto max-w-[104px]" />
            <span
              className="rounded-full px-2 py-0.5 text-[10px]"
              style={{
                background: "var(--proto-surface-elevated)",
                color: "var(--proto-text-muted)",
                border: "1px solid var(--proto-border)",
              }}
            >
              {behaviourMode === "care"
                ? "Quiet"
                : behaviourMode === "performance"
                  ? "Focus"
                  : "Steady"}
            </span>
          </header>

          <AnimatePresence mode="wait">
            {screen === "home" && (
              <motion.section
                key="home"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={transition}
                className="flex flex-1 flex-col"
                style={{ gap }}
              >
                <div style={{ marginTop: "0.25rem" }}>
                  <p
                    className="text-[13px] leading-snug"
                    style={{ color: "var(--proto-text-muted)" }}
                  >
                    Sound-first session
                  </p>
                  <h2
                    className="mt-2 text-[22px] font-medium leading-tight tracking-tight"
                    style={{ color: "var(--proto-text)" }}
                  >
                    Ready when you are
                  </h2>
                </div>
                <div
                  className="mt-auto rounded-2xl border p-4"
                  style={{
                    borderRadius: radiusPx,
                    borderColor: "var(--proto-border)",
                    background: "var(--proto-surface-elevated)",
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,.45)`,
                  }}
                >
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: "var(--proto-text-muted)" }}
                  >
                    One short session. No setup required.
                  </p>
                  <motion.button
                    type="button"
                    className="mt-4 w-full rounded-xl py-3 text-[13px] font-medium tracking-tight"
                    style={{
                      background: "var(--proto-accent)",
                      color: "var(--proto-bg)",
                      borderRadius: Math.max(10, radiusPx - 4),
                    }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.15 }}
                  >
                    Begin
                  </motion.button>
                </div>
              </motion.section>
            )}

            {screen === "intent" && (
              <motion.section
                key="intent"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={transition}
                className="flex flex-1 flex-col"
                style={{ gap }}
              >
                <div>
                  <h2
                    className="text-[18px] font-medium tracking-tight"
                    style={{ color: "var(--proto-text)" }}
                  >
                    What do you need?
                  </h2>
                  <p
                    className="mt-1 text-[12px]"
                    style={{ color: "var(--proto-text-muted)" }}
                  >
                    Choose an intent. You can change this later.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Settle", "Regulate", "Recover"].map((x, i) =>
                    chip(x, i === (behaviourMode === "performance" ? 2 : 0)),
                  )}
                </div>
                <div
                  className="mt-auto rounded-2xl border p-3"
                  style={{
                    borderRadius: radiusPx,
                    borderColor: "var(--proto-border)",
                    background: "var(--proto-surface)",
                  }}
                >
                  <p
                    className="text-[11px] leading-relaxed"
                    style={{ color: "var(--proto-text-muted)" }}
                  >
                    {behaviourMode === "care"
                      ? "Fewer choices on screen to keep load low."
                      : behaviourMode === "performance"
                        ? "Direct labels and clear selection affordance."
                        : "Balanced options with neutral emphasis."}
                  </p>
                </div>
              </motion.section>
            )}

            {screen === "setup" && (
              <motion.section
                key="setup"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={transition}
                className="flex flex-1 flex-col"
                style={{ gap }}
              >
                <h2
                  className="text-[18px] font-medium tracking-tight"
                  style={{ color: "var(--proto-text)" }}
                >
                  Session setup
                </h2>
                <div
                  className="rounded-2xl border p-3"
                  style={{
                    borderRadius: radiusPx,
                    borderColor: "var(--proto-border)",
                    background: "var(--proto-surface-elevated)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[12px]"
                      style={{ color: "var(--proto-text-muted)" }}
                    >
                      Duration
                    </span>
                    <span
                      className="text-[12px] font-medium"
                      style={{ color: "var(--proto-text)" }}
                    >
                      12 min
                    </span>
                  </div>
                  <div
                    className="mt-3 h-1.5 rounded-full"
                    style={{ background: "var(--proto-border)" }}
                  >
                    <div
                      className="h-full w-[62%] rounded-full"
                      style={{ background: "var(--proto-accent)" }}
                    />
                  </div>
                </div>
                <div
                  className="rounded-2xl border p-3"
                  style={{
                    borderRadius: radiusPx,
                    borderColor: "var(--proto-border)",
                    background: "var(--proto-surface)",
                  }}
                >
                  <p
                    className="text-[11px] uppercase tracking-[0.12em]"
                    style={{ color: "var(--proto-text-muted)" }}
                  >
                    Sound profile
                  </p>
                  <p
                    className="mt-2 text-[13px] leading-snug"
                    style={{ color: "var(--proto-text)" }}
                  >
                    Neutral bed · minimal transients
                  </p>
                </div>
              </motion.section>
            )}

            {screen === "active" && (
              <motion.section
                key="active"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={transition}
                className="flex flex-1 flex-col items-stretch"
                style={{ gap }}
              >
                <div className="text-center">
                  <p
                    className="text-[11px] uppercase tracking-[0.14em]"
                    style={{ color: "var(--proto-text-muted)" }}
                  >
                    Active session
                  </p>
                  <p
                    className="mt-2 text-[28px] font-medium tabular-nums tracking-tight"
                    style={{ color: "var(--proto-text)" }}
                  >
                    08:42
                  </p>
                </div>
                <div
                  className="flex flex-1 items-center justify-center rounded-2xl border px-2 py-6"
                  style={{
                    borderRadius: radiusPx,
                    borderColor: "var(--proto-border)",
                    background: "var(--proto-surface)",
                  }}
                >
                  <WaveformLine className="w-full max-w-[280px]" />
                </div>
                <div className="flex justify-center gap-6 pb-1">
                  <button
                    type="button"
                    className="text-[12px]"
                    style={{ color: "var(--proto-text-muted)" }}
                  >
                    Pause
                  </button>
                  <button
                    type="button"
                    className="text-[12px] font-medium"
                    style={{ color: "var(--proto-text)" }}
                  >
                    End
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <p
        className="max-w-md text-center text-[11px] leading-relaxed"
        style={{ color: "var(--proto-text-muted)" }}
      >
        Same structure across modes — contrast, density, and pacing shift with behaviour.
      </p>
    </div>
  );
}
