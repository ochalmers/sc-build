import { useEffect, useMemo, useRef, useState } from "react";
import { ListenerFrame } from "./ListenerFrame.jsx";

/**
 * Shared timing for every dark text-only transition beat
 * (Hi Alex, session ended, see you next session, etc.).
 */
export const FADE_BRIDGE = {
  wordInMs: 380,
  wordStaggerMs: 140,
  holdAfterMs: 1100,
  lineOutMs: 500,
  beatGapMs: 180,
  donePadMs: 120,
};

const DISPLAY_TYPE = "font-normal leading-[1.2] tracking-[-0.03em] text-white";

const KEYFRAMES = `
  @keyframes bridgeLineIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes bridgeLineOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-8px); }
  }
  @media (prefers-reduced-motion: reduce) {
    [style*="bridgeLineIn"],
    [style*="bridgeLineOut"] {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

const WORD_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const WORD_TRANSITION = `opacity ${FADE_BRIDGE.wordInMs / 1000}s ${WORD_EASE}, transform ${FADE_BRIDGE.wordInMs / 1000}s ${WORD_EASE}`;

function useStableCallback(fn) {
  const ref = useRef(fn);
  ref.current = fn;
  return ref;
}

/** Title-case preferred names that arrive all-lower / all-upper. */
export function formatPreferredName(name = "") {
  const trimmed = String(name).trim();
  if (!trimmed) return "";
  if (trimmed !== trimmed.toLowerCase() && trimmed !== trimmed.toUpperCase()) {
    return trimmed;
  }
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

/**
 * Normalize a phrase into word tokens.
 * Accepts a string ("See you next") or [{ text, line? }].
 */
export function normalizeBridgeWords(phrase) {
  if (Array.isArray(phrase)) {
    return phrase.map((w) =>
      typeof w === "string" ? { text: w, line: 0 } : { text: w.text, line: w.line ?? 0, prefix: w.prefix },
    );
  }
  return String(phrase)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((text) => ({ text, line: 0 }));
}

function BridgeShell({ children, continueLabel, onContinue }) {
  return (
    <ListenerFrame mode="regulation" hideTabBar bleed>
      <div
        className="relative flex h-full min-h-full flex-col items-center justify-center overflow-hidden px-8 text-center"
        style={{ background: "#000" }}
      >
        {children}
        {onContinue ? (
          <button
            type="button"
            onClick={onContinue}
            className="absolute inset-x-7 bottom-8 rounded-full px-5 py-3.5 text-[14px] font-normal"
            style={{ background: "#f3f2ee", color: "#171716" }}
          >
            {continueLabel}
          </button>
        ) : null}
        <style>{KEYFRAMES}</style>
      </div>
    </ListenerFrame>
  );
}

function WordLine({ words, visibleCount, animate }) {
  const line0 = words.filter((w) => w.line === 0);
  const line1 = words.filter((w) => w.line === 1);
  const lines = line1.length ? [line0, line1] : [line0];

  return (
    <p
      className={`relative flex max-w-[18ch] flex-col items-center gap-y-1 text-[1.85rem] ${DISPLAY_TYPE}`}
      aria-live="polite"
    >
      {lines.map((line, lineIdx) => (
        <span
          key={lineIdx}
          className="flex flex-wrap items-baseline justify-center gap-x-[0.35em]"
        >
          {line.map((word, i) => {
            const idx = (lineIdx === 0 ? 0 : line0.length) + i;
            const shown = idx < visibleCount;
            return (
              <span
                key={`${word.text}-${idx}`}
                style={{
                  display: "inline-block",
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(10px)",
                  transition: animate ? WORD_TRANSITION : undefined,
                }}
              >
                {word.prefix ?? ""}
                {word.text}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}

/**
 * Dark text-only transition. Words fade in one by one at a shared speed,
 * hold, fade out, then optionally continue through further phrases.
 *
 * @param {object} props
 * @param {Array<string|Array<{text:string,line?:number}>>} props.phrases
 * @param {() => void} [props.onDone]
 * @param {boolean} [props.autoAdvance]
 */
export function FadeBridgeScreen({ phrases, onDone, autoAdvance = true }) {
  const beatsKey = useMemo(
    () =>
      phrases
        .map((p) =>
          Array.isArray(p)
            ? p.map((w) => (typeof w === "string" ? w : w.text)).join(" ")
            : String(p).trim(),
        )
        .join(" | "),
    [phrases],
  );

  const beats = useMemo(
    () => phrases.map((p) => normalizeBridgeWords(p)).filter((w) => w.length > 0),
    // Content keyed by beatsKey so parent re-creating phrases[] does not reset.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [beatsKey],
  );
  const onDoneRef = useStableCallback(onDone);

  const [beatIndex, setBeatIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(autoAdvance ? 0 : beats[0]?.length ?? 0);
  const [linePhase, setLinePhase] = useState("in");

  const words = beats[beatIndex] ?? [];

  useEffect(() => {
    if (!autoAdvance || beats.length === 0) return undefined;

    setBeatIndex(0);
    setLinePhase("in");
    setVisibleCount(0);

    const timers = [];
    const { wordInMs, wordStaggerMs, holdAfterMs, lineOutMs, beatGapMs, donePadMs } = FADE_BRIDGE;

    let cursor = 0;

    beats.forEach((beatWords, bi) => {
      const beatStart = cursor;

      beatWords.forEach((_, i) => {
        timers.push(
          setTimeout(() => {
            setBeatIndex(bi);
            setLinePhase("in");
            setVisibleCount(i + 1);
          }, beatStart + i * wordStaggerMs),
        );
      });

      const allInAt = beatStart + Math.max(0, beatWords.length - 1) * wordStaggerMs + wordInMs;
      const lineOutAt = allInAt + holdAfterMs;
      timers.push(
        setTimeout(() => {
          setBeatIndex(bi);
          setLinePhase("out");
        }, lineOutAt),
      );

      cursor = lineOutAt + lineOutMs + (bi < beats.length - 1 ? beatGapMs : donePadMs);
    });

    timers.push(setTimeout(() => onDoneRef.current?.(), cursor));

    return () => timers.forEach(clearTimeout);
    // beatsKey captures phrase content; avoid restarting when parent re-creates phrases[].
    // eslint-disable-next-line react-hooks/exhaustive-deps -- beats derived from beatsKey
  }, [autoAdvance, beatsKey, onDoneRef]);

  function handleContinue() {
    if (beatIndex < beats.length - 1) {
      const next = beatIndex + 1;
      setBeatIndex(next);
      setLinePhase("in");
      setVisibleCount(beats[next]?.length ?? 0);
      return;
    }
    onDone?.();
  }

  if (beats.length === 0) return null;

  return (
    <BridgeShell
      continueLabel="Continue"
      onContinue={autoAdvance ? undefined : handleContinue}
    >
      <div
        key={`beat-${beatIndex}`}
        style={{
          animation:
            autoAdvance && linePhase === "out"
              ? `bridgeLineOut ${FADE_BRIDGE.lineOutMs / 1000}s ease-in both`
              : undefined,
        }}
      >
        <WordLine words={words} visibleCount={visibleCount} animate={autoAdvance} />
      </div>
    </BridgeShell>
  );
}
