import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEEL_LABELS } from "../data/catalog.js";
import { useAppStore } from "../context/AppStore.jsx";
import { AppBody, AppButton } from "./ui.jsx";

const FEEL_EXIT_MS = 900;

const FEEL_MODAL_THEME = {
  background: "#f4f4f4",
  color: "#141414",
  "--proto-bg": "#f4f4f4",
  "--proto-surface": "#ebebeb",
  "--proto-text": "#141414",
  "--proto-text-muted": "rgba(20,20,20,0.45)",
  "--proto-border": "rgba(0,0,0,0.12)",
  "--proto-accent": "#111111",
};

/** Imperative open API — backed by the host mounted inside ListenerFrame. */
let hostApi = null;
const pendingOpens = [];

function flushPending() {
  if (!hostApi || pendingOpens.length === 0) return;
  const next = pendingOpens.shift();
  hostApi.open(next.session, next.opts);
}

/**
 * Open the before-session check-in modal over the current phone screen.
 * Outside click dismisses and returns to whatever was underneath.
 */
export function openCheckInModal(session, opts = {}) {
  if (!session) return;
  if (hostApi) {
    hostApi.open(session, opts);
    return;
  }
  pendingOpens.push({ session, opts });
}

export function closeCheckInModal() {
  hostApi?.close?.();
}

export function FeelSlider({ value, onChange }) {
  const label = value != null ? FEEL_LABELS[value] : "Slide to check in";
  const pct = value != null ? ((value - 1) / 4) * 100 : 50;

  return (
    <div className="mt-5 w-full text-center">
      <p
        className="text-[2.15rem] font-medium leading-none tracking-[-0.04em] tabular-nums"
        style={{ color: "var(--proto-text)" }}
      >
        {value ?? "—"}
      </p>
      <p className="mt-2 text-[14px] font-medium tracking-tight" style={{ color: "var(--proto-text)" }}>
        {label}
      </p>

      <div className="relative mt-5 px-1">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value ?? 3}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="How do you feel, from 1 unsettled to 5 settled"
          className="feel-slider w-full"
          style={{ "--feel-pct": `${pct}%` }}
        />
        <div
          className="mt-2.5 flex justify-between text-[11px]"
          style={{ color: "var(--proto-text-muted)" }}
        >
          <span>Unsettled</span>
          <span>Settled</span>
        </div>
      </div>

      <style>{`
        .feel-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
          background: linear-gradient(
            to right,
            var(--proto-text) 0%,
            var(--proto-text) var(--feel-pct),
            color-mix(in srgb, var(--proto-border) 80%, transparent) var(--feel-pct),
            color-mix(in srgb, var(--proto-border) 80%, transparent) 100%
          );
        }
        .feel-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: var(--proto-bg, #fff);
          border: 2px solid var(--proto-text);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
          margin-top: -10px;
        }
        .feel-slider::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: var(--proto-bg, #fff);
          border: 2px solid var(--proto-text);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
        }
        .feel-slider::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 999px;
        }
        .feel-slider::-moz-range-track {
          height: 6px;
          border-radius: 999px;
          background: transparent;
        }
      `}</style>
    </div>
  );
}

export function FeelNoteField({ value, onChange, resetKey }) {
  const [expanded, setExpanded] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    setExpanded(false);
  }, [resetKey]);

  useEffect(() => {
    if (!expanded) return undefined;
    const id = window.requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [expanded]);

  if (!expanded) {
    return (
      <button
        type="button"
        className="mt-5 text-[13.5px] tracking-tight underline decoration-black/20 underline-offset-[3px] transition-opacity hover:opacity-70"
        style={{ color: "var(--proto-text)" }}
        onClick={() => setExpanded(true)}
      >
        Add note
      </button>
    );
  }

  return (
    <label className="mt-5 block w-full text-left">
      <span className="flex items-baseline justify-between gap-2 text-[12.5px]">
        <span style={{ color: "var(--proto-text)" }}>Anything you’d like to note?</span>
        <span style={{ color: "var(--proto-text-muted)" }}>Optional</span>
      </span>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="mt-1.5 w-full resize-none rounded-xl border px-3 py-2.5 text-left text-[13.5px] outline-none"
        style={{
          borderColor: "var(--proto-border)",
          background: "var(--proto-surface)",
          color: "var(--proto-text)",
        }}
        placeholder="A few words is enough…"
      />
    </label>
  );
}

function CheckInModal({ open, session, onClose, onContinue, onSkip }) {
  const [rating, setRating] = useState(3);
  const [note, setNote] = useState("");
  const [exiting, setExiting] = useState(false);
  const pendingRef = useRef(null);
  const visible = open && session;

  useEffect(() => {
    if (!open) return;
    setRating(3);
    setNote("");
    setExiting(false);
    pendingRef.current = null;
  }, [open, session?.id]);

  useEffect(() => {
    if (!exiting) return undefined;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const t = window.setTimeout(() => {
      pendingRef.current?.();
      pendingRef.current = null;
      setExiting(false);
    }, reduce ? 0 : FEEL_EXIT_MS);
    return () => window.clearTimeout(t);
  }, [exiting]);

  if (!visible && !exiting) return null;

  function runExit(next) {
    if (exiting) return;
    pendingRef.current = next;
    setExiting(true);
  }

  function dismiss() {
    runExit(() => onClose?.());
  }

  function send() {
    if (rating == null || exiting) return;
    runExit(() => onContinue?.({ rating, note }));
  }

  return (
    <div className="pointer-events-auto absolute inset-0 z-40 overflow-hidden">
      <button
        type="button"
        aria-label="Dismiss check-in"
        className={`absolute inset-0 z-0 border-0 ${
          exiting ? "feel-check-in-backdrop-exit" : "feel-check-in-backdrop-enter"
        }`}
        style={{
          background: "rgba(12,12,12,0.18)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          cursor: "pointer",
        }}
        onClick={dismiss}
      />

      <div className="relative z-10 flex h-full items-center justify-center px-5 py-8 pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Before you begin, tell us how you’re feeling"
          className={`${
            exiting ? "feel-check-in-exit" : "feel-check-in-enter"
          } pointer-events-auto flex w-[86%] max-h-[70%] flex-col overflow-hidden rounded-[1.75rem] px-5 py-5 text-center shadow-[0_24px_64px_rgba(0,0,0,0.28)]`}
          style={FEEL_MODAL_THEME}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex min-h-0 flex-col items-center overflow-hidden">
            <h1
              className="mx-auto max-w-[22ch] text-center text-[1.05rem] font-normal leading-[1.2] tracking-[-0.02em]"
              style={{ color: "var(--proto-text)" }}
            >
              Before you begin, tell us how you’re feeling
            </h1>
            <AppBody className="mx-auto mt-2 max-w-[34ch] text-center text-[12.5px] leading-snug">
              Choose what feels closest. We’ll ask you again after the session so you can notice if
              anything has changed.
            </AppBody>
            <FeelSlider value={rating} onChange={setRating} />
            <FeelNoteField
              value={note}
              onChange={setNote}
              resetKey={open ? session?.id : "closed"}
            />
            <div className="mt-5 w-full shrink-0 space-y-2">
              <AppButton fullWidth disabled={rating == null || exiting} onClick={send}>
                Continue
              </AppButton>
              <AppButton
                fullWidth
                variant="ghost"
                disabled={exiting}
                onClick={() => runExit(() => onSkip?.())}
              >
                Skip
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mount once inside the phone frame so check-in covers the live screen underneath. */
export function CheckInModalHost() {
  const navigate = useNavigate();
  const { submitFeedback } = useAppStore();
  const [session, setSession] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const api = {
      open(nextSession) {
        if (!nextSession) return;
        setSession(nextSession);
        setOpen(false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setOpen(true));
        });
      },
      close() {
        setOpen(false);
        window.setTimeout(() => setSession(null), FEEL_EXIT_MS);
      },
    };
    hostApi = api;
    flushPending();
    return () => {
      if (hostApi === api) hostApi = null;
    };
  }, []);

  function handleClose() {
    setOpen(false);
    window.setTimeout(() => setSession(null), FEEL_EXIT_MS);
  }

  function goPlayer(checkInPairId) {
    if (!session) return;
    const id = session.id;
    setOpen(false);
    setSession(null);
    navigate(`/app/listener/player/${id}`, {
      state: {
        beginBridge: true,
        ...(checkInPairId ? { checkInPairId } : {}),
      },
    });
  }

  function handleContinue({ rating, note }) {
    if (!session) return;
    const pairId = `${session.id}-${Date.now()}`;
    submitFeedback({
      sessionId: session.id,
      rating,
      note,
      at: Date.now(),
      phase: "before",
      pairId,
    });
    goPlayer(pairId);
  }

  function handleSkip() {
    goPlayer();
  }

  return (
    <CheckInModal
      open={open}
      session={session}
      onClose={handleClose}
      onContinue={handleContinue}
      onSkip={handleSkip}
    />
  );
}
