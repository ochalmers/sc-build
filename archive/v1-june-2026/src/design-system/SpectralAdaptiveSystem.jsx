import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  spectralThemes,
  spectralIntroPrinciples,
  spectralPrinciples,
  spectralEnvironmentStudies,
} from "../system/tokens/spectralColors.js";
import { BEHAVIOUR_MODES, behaviourModeMeta, modeReference } from "../system/modes.js";
import { ModeChrome } from "../system/components/ModeChrome.jsx";

function neutralBandGradient(neutrals) {
  if (neutrals.length < 2) return neutrals[0]?.hex ?? "#EDEFE8";
  return `linear-gradient(90deg, ${neutrals.map((n, i) => `${n.hex} ${(i / (neutrals.length - 1)) * 100}%`).join(", ")})`;
}

function IconPlay({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9 7.5v9l7.5-4.5L9 7.5z" />
    </svg>
  );
}

function AmbientWaveform({ spectral, mode, bars = 14 }) {
  const heights = [0.35, 0.55, 0.42, 0.72, 0.5, 0.68, 0.4, 0.62, 0.48, 0.76, 0.44, 0.58, 0.52, 0.66];
  const delayMs = mode === "dark" ? 12 : 18;
  return (
    <div className="flex h-16 items-end justify-center gap-[4px] px-2 opacity-90" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const base = heights[i % heights.length];
        return (
          <span
            key={i}
            className="spectral-wave-bar w-[4px] rounded-full"
            style={{
              height: `${base * 100}%`,
              background: spectral.spectral[3].hex,
              opacity: 0.35 + base * 0.45,
              animationDuration: `${delayMs * 0.1 + i * 0.07}s`,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function BreathingRings({ spectral, reduced }) {
  if (reduced) {
    return (
      <div className="flex h-56 items-center justify-center opacity-80" aria-hidden>
        <div
          className="h-40 w-40 rounded-full border border-white/20"
          style={{ borderColor: `${spectral.spectral[4].hex}66` }}
        />
      </div>
    );
  }
  return (
    <div className="relative flex h-[min(52vw,420px)] items-center justify-center" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${22 + i * 18}%`,
            height: `${22 + i * 18}%`,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: `${spectral.spectral[(i + 2) % 6].hex}${i === 0 ? "55" : "33"}`,
            opacity: 0.55 - i * 0.1,
          }}
          animate={{ scale: [1, 1.03, 1], opacity: [0.5 - i * 0.08, 0.65 - i * 0.08, 0.5 - i * 0.08] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}
    </div>
  );
}

function ModePreviewShell({ mode, spectralMode, children }) {
  const m = behaviourModeMeta[mode];
  const isDark = spectralMode === "dark";
  const soft = mode === "care" ? 0.14 : mode === "regulation" ? 0.07 : 0;
  return (
    <ModeChrome mode={mode}>
      <div
        className="flex min-h-[380px] flex-col overflow-hidden rounded-[2rem]"
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(22,22,20,0.07)",
          background: isDark
            ? `linear-gradient(165deg, rgba(255,255,255,${0.035 - soft}) 0%, rgba(0,0,0,0.45) 100%)`
            : "rgba(255,255,255,0.42)",
          boxShadow: isDark
            ? "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "0 28px 70px rgba(18,16,28,0.09)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 pb-2 pt-4 text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--proto-text-muted)" }}
        >
          <span>{m.label}</span>
          <span className="opacity-60">Signal</span>
        </div>
        <div className="flex flex-1 flex-col px-5 pb-6">{children}</div>
      </div>
    </ModeChrome>
  );
}

export function SpectralAdaptiveSystem({ id = "ds-spectral-palette" }) {
  const [spectralMode, setSpectralMode] = useState("light");
  const spectral = spectralThemes[spectralMode];
  const reduceMotion = useReducedMotion();

  const heroLayers = useMemo(() => {
    if (spectralMode === "light") {
      return {
        base: "#EDEFE8",
        blobs: [
          "radial-gradient(ellipse 90% 70% at 12% 8%, rgba(232,190,210,0.45), transparent 52%)",
          "radial-gradient(ellipse 70% 55% at 92% 18%, rgba(190,205,245,0.42), transparent 50%)",
          "radial-gradient(ellipse 55% 45% at 48% 95%, rgba(200,230,215,0.35), transparent 55%)",
        ],
      };
    }
    return {
      base: "#080808",
      blobs: [
        "radial-gradient(ellipse 85% 65% at 18% 12%, rgba(190,110,140,0.18), transparent 55%)",
        "radial-gradient(ellipse 75% 55% at 88% 22%, rgba(110,95,190,0.14), transparent 52%)",
        "radial-gradient(ellipse 90% 70% at 48% 88%, rgba(90,170,155,0.1), transparent 58%)",
      ],
    };
  }, [spectralMode]);

  /** 12-col environmental wall — static classes for Tailwind JIT */
  const ENV_WALL_CLASS = [
    "md:col-start-1 md:col-end-8 md:row-start-1 md:row-end-3",
    "md:col-start-8 md:col-end-13 md:row-start-1 md:row-end-2",
    "md:col-start-8 md:col-end-13 md:row-start-2 md:row-end-3",
    "md:col-start-1 md:col-end-5 md:row-start-3 md:row-end-4",
    "md:col-start-5 md:col-end-9 md:row-start-3 md:row-end-4",
    "md:col-start-9 md:col-end-13 md:row-start-3 md:row-end-4",
    "md:col-start-1 md:col-end-7 md:row-start-4 md:row-end-5",
    "md:col-start-7 md:col-end-13 md:row-start-4 md:row-end-5",
  ];
  const ENV_WALL_MINH = [
    "min(52vh, 440px)",
    "min(28vh, 240px)",
    "min(28vh, 240px)",
    "min(34vh, 300px)",
    "min(34vh, 300px)",
    "min(34vh, 300px)",
    "min(30vh, 260px)",
    "min(30vh, 260px)",
  ];

  return (
    <div
      id={id}
      className="spectral-presentation scroll-mt-[7rem] relative z-0 mt-20 ml-[calc(-50vw+50%)] w-screen max-w-[100vw] overflow-x-hidden"
    >
      {/* Floating environment toggle */}
      <div className="pointer-events-none sticky top-24 z-[35] -mt-10 mb-[-2.5rem] flex justify-end px-2 md:px-4">
        <div
          className="pointer-events-auto flex items-center gap-3 rounded-full px-2 py-2 backdrop-blur-xl"
          style={{
            background:
              spectralMode === "dark" ? "rgba(12,12,12,0.75)" : "rgba(250,251,248,0.72)",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: spectralMode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(22,22,20,0.08)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          }}
          role="group"
          aria-label="Preview light or dark foundation"
        >
          <span className="hidden pl-3 text-[10px] uppercase tracking-[0.18em] opacity-50 sm:inline" style={{ color: spectral.text }}>
            Environment
          </span>
          {["light", "dark"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSpectralMode(m)}
              className="rounded-full px-5 py-2 text-[12px] font-semibold capitalize tracking-tight transition-[background,box-shadow] duration-300"
              style={{
                background: spectralMode === m ? spectral.foundation : "transparent",
                color: spectral.text,
                boxShadow:
                  spectralMode === m && m === "dark"
                    ? "0 0 0 1px rgba(255,255,255,0.07), 0 8px 28px rgba(0,0,0,0.5)"
                    : spectralMode === m && m === "light"
                      ? "0 8px 24px rgba(20,18,40,0.1)"
                      : undefined,
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* ——— Section 1 · Hero ——— */}
      <section
        className="relative flex min-h-[min(92vh,920px)] flex-col justify-end overflow-hidden px-5 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36"
        style={{
          color: spectral.text,
          backgroundColor: heroLayers.base,
        }}
      >
        {!reduceMotion ? (
          <>
            {heroLayers.blobs.map((b, i) => (
              <div
                key={i}
                className="pointer-events-none absolute inset-[-20%] spectral-motion-drift opacity-90 blur-[80px] md:blur-[120px]"
                style={{
                  background: b,
                  animationDelay: `${i * 2.5}s`,
                }}
              />
            ))}
            <div
              className="pointer-events-none absolute inset-0 spectral-motion-breathe opacity-30 mix-blend-soft-light"
              style={{
                background:
                  spectralMode === "light"
                    ? "radial-gradient(circle at 50% 120%, rgba(255,255,255,0.55), transparent 45%)"
                    : "radial-gradient(circle at 50% 0%, rgba(80,70,120,0.15), transparent 50%)",
              }}
            />
          </>
        ) : null}

        <div className="relative z-[1] mx-auto w-full max-w-[56rem]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-50">
            Sonocea · adaptive sensory system
          </p>
          <h2 className="mt-8 text-[clamp(2.65rem,10vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            Spectrum
            <br />
            without abrasion.
          </h2>
          <p className="mt-10 max-w-[40rem] text-[clamp(1.05rem,2.2vw,1.25rem)] leading-[1.65] opacity-82">
            The Sonocea visual system explores how sound can be translated through atmosphere, diffusion and
            adaptive spectral behaviour — creating emotionally rich environments that remain calm, accessible
            and regulation-focused.
          </p>
          <ul className="mt-14 flex max-w-[48rem] flex-wrap gap-x-3 gap-y-2">
            {spectralIntroPrinciples.map((line) => (
              <li
                key={line}
                className="text-[11px] font-medium uppercase tracking-[0.14em] opacity-58"
                style={{ color: spectral.textMuted }}
              >
                {line}
                <span className="mx-3 opacity-25" aria-hidden>
                  ·
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Section 2 · Strategic evolution ——— */}
      <section
        className="px-5 py-24 md:px-12 md:py-32"
        style={{ background: spectral.surface, color: spectral.text }}
      >
        <div className="mx-auto max-w-[88rem]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-45">02</p>
          <h3 className="mt-6 max-w-[18ch] text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Why the palette evolved
          </h3>
          <p className="mt-8 max-w-[36rem] text-[15px] leading-[1.75] opacity-72">
            A strategic shift from chromatic loudness to atmospheric discipline — the same intent for the
            nervous system, expressed with less fatigue and more room for feeling.
          </p>

          <div className="mt-20 grid gap-6 lg:grid-cols-2 lg:gap-8 lg:items-stretch">
            <article className="flex flex-col">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-45">
                Previous direction
              </p>
              <div
                className="relative mt-8 min-h-[min(48vh,420px)] flex-1 overflow-hidden rounded-[2px]"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: [
                      "repeating-linear-gradient(105deg, rgba(255,75,140,0.95) 0 14%, rgba(120,90,255,0.95) 14% 28%, rgba(40,220,200,0.95) 28% 42%, rgba(255,160,90,0.95) 42% 56%, transparent 56% 100%)",
                      "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.45))",
                    ].join(", "),
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-8 md:p-10">
                  <ul className="space-y-3 text-[14px] leading-snug text-white/90">
                    <li>High saturation</li>
                    <li>Expressive spectrum</li>
                    <li>Visually loud at rest</li>
                    <li>Broad application of chroma</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="flex flex-col">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-45">
                Evolved direction
              </p>
              <div
                className="relative mt-8 min-h-[min(48vh,420px)] flex-1 overflow-hidden rounded-[2px]"
                style={{
                  boxShadow:
                    spectralMode === "dark"
                      ? "inset 0 0 0 1px rgba(255,255,255,0.07)"
                      : "inset 0 0 0 1px rgba(22,22,20,0.06)",
                }}
              >
                <div
                  className="absolute inset-0 blur-2xl"
                  style={{
                    background: spectral.gradients[0].css,
                    transform: "scale(1.08)",
                    opacity: spectralMode === "dark" ? 0.85 : 1,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: [
                      spectral.gradients[1].css,
                      "radial-gradient(ellipse 80% 60% at 70% 80%, rgba(237,239,232,0.25), transparent 65%)",
                    ].join(", "),
                  }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-8 md:p-10"
                  style={{
                    background:
                      spectralMode === "dark"
                        ? "linear-gradient(180deg, transparent, rgba(8,8,8,0.92))"
                        : "linear-gradient(180deg, transparent, rgba(237,239,232,0.95))",
                  }}
                >
                  <ul className="space-y-3 text-[14px] leading-snug opacity-88">
                    <li>Softer spectrum</li>
                    <li>Adaptive intensity</li>
                    <li>Atmospheric diffusion</li>
                    <li>Reduced fatigue · regulation-focused</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ——— Section 3 · Environmental wall ——— */}
      <section className="py-24 md:py-32" style={{ background: spectral.canvas, color: spectral.text }}>
        <div className="mx-auto max-w-[92rem] px-5 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-45">03</p>
          <h3 className="mt-6 max-w-[22ch] text-[clamp(1.85rem,4.5vw,2.85rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            Environmental colour references
          </h3>
          <p className="mt-8 max-w-[40rem] text-[15px] leading-[1.75] opacity-72">
            The palette is inspired by how light behaves environmentally and emotionally — refracted, submerged,
            dusk-split — not by flat branding primaries. These are atmospheric compositions (CSS studies), not
            lifestyle photography.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-[100rem] grid-cols-1 gap-3 px-3 md:grid-cols-12 md:gap-4 md:px-8">
          {spectralEnvironmentStudies.map((env, idx) => (
            <div
              key={env.id}
              className={`relative overflow-hidden rounded-[3px] ${ENV_WALL_CLASS[idx] ?? ""}`}
              style={{
                minHeight: ENV_WALL_MINH[idx] ?? "240px",
              }}
            >
              <div className="absolute inset-0 scale-105" style={{ background: env.css }} />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    spectralMode === "dark"
                      ? "linear-gradient(160deg, transparent 20%, rgba(8,8,8,0.88) 92%)"
                      : "linear-gradient(165deg, transparent 25%, rgba(237,239,232,0.88) 90%)",
                }}
              />
              <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-6 md:p-8">
                <p className="text-[13px] font-medium tracking-tight">{env.label}</p>
                <p className="mt-2 max-w-[36ch] text-[12px] leading-relaxed opacity-75">{env.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ——— Section 4 · Living foundations ——— */}
      <section className="px-5 py-24 md:px-12 md:py-32" style={{ background: spectral.surface, color: spectral.text }}>
        <div className="mx-auto max-w-[88rem]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-45">04</p>
          <h3 className="mt-6 max-w-[24ch] text-[clamp(1.85rem,4.5vw,2.85rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            Foundational environments
          </h3>
          <p className="mt-8 max-w-[42rem] text-[15px] leading-[1.75] opacity-72">
            Two anchors dominate the experience — everything else is layered atmosphere. Typography, surfaces and
            glow behave as they would in product: soft hierarchy, diffused spectral lift, no muddy neutrals.
          </p>

          <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Light living panel */}
            <div
              className="relative overflow-hidden rounded-[4px] px-8 pb-12 pt-14 md:px-12 md:pb-16 md:pt-20"
              style={{
                background: "#EDEFE8",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65), 0 40px 100px rgba(18,16,28,0.08)",
                minHeight: "min(72vh, 640px)",
                color: "#161614",
              }}
            >
              <div
                className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full blur-3xl opacity-70"
                style={{ background: "rgba(220,200,245,0.45)" }}
              />
              <p className="relative text-[10px] font-semibold uppercase tracking-[0.22em] opacity-45">
                Light foundation · #EDEFE8
              </p>
              <p className="relative mt-10 text-[clamp(1.75rem,3.5vw,2.35rem)] font-medium leading-tight tracking-[-0.03em]">
                Listening
              </p>
              <p className="relative mt-3 max-w-[28ch] text-[14px] leading-relaxed opacity-72">
                Display calm · body warmth · labels nearly whispering.
              </p>
              <div className="relative mt-12 space-y-4">
                <div
                  className="rounded-[6px] px-6 py-5"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    boxShadow: "0 24px 60px rgba(20,18,40,0.06)",
                  }}
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] opacity-45">Today</p>
                  <p className="mt-3 text-[17px] font-medium tracking-tight">Return to baseline</p>
                  <div
                    className="mt-6 h-px w-full opacity-50"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(22,22,20,0.15), transparent)" }}
                  />
                  <p className="mt-5 text-[13px] leading-relaxed opacity-68">
                    Surfaces step lightly; hairlines stay atmospheric.
                  </p>
                </div>
                <div
                  className="h-28 rounded-[6px]"
                  style={{
                    background: spectralThemes.light.gradients[3].css,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
                  }}
                />
              </div>
            </div>

            {/* Dark living panel */}
            <div
              className="relative overflow-hidden rounded-[4px] px-8 pb-12 pt-14 md:px-12 md:pb-16 md:pt-20"
              style={{
                background: "#080808",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 50px 120px rgba(0,0,0,0.65)",
                minHeight: "min(72vh, 640px)",
                color: "#EEEEE9",
              }}
            >
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 h-[120%] w-[120%] -translate-x-1/2 blur-[100px] opacity-90"
                style={{
                  background: [
                    "radial-gradient(ellipse 50% 45% at 50% 100%, rgba(180,130,200,0.2), transparent 65%)",
                    "radial-gradient(ellipse 45% 40% at 30% 20%, rgba(100,170,160,0.12), transparent 60%)",
                  ].join(", "),
                }}
              />
              <p className="relative text-[10px] font-semibold uppercase tracking-[0.22em] opacity-45">
                Dark foundation · #080808
              </p>
              <p className="relative mt-10 text-[clamp(1.75rem,3.5vw,2.35rem)] font-medium leading-tight tracking-[-0.03em]">
                Night session
              </p>
              <p className="relative mt-3 max-w-[28ch] text-[14px] leading-relaxed opacity-68">
                Depth through bloom — sound moving through darkness, not neon UI chrome.
              </p>
              <div className="relative mt-12 space-y-4">
                <div
                  className="rounded-[6px] px-6 py-5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 50px rgba(0,0,0,0.45)",
                  }}
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] opacity-45">Now playing</p>
                  <p className="mt-3 text-[17px] font-medium tracking-tight">Drift · 24 min</p>
                  <div
                    className="mt-5 h-1.5 overflow-hidden rounded-full"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="h-full w-[58%] rounded-full"
                      style={{
                        background: spectralThemes.dark.spectral[2].hex,
                        boxShadow: `0 0 24px ${spectralThemes.dark.spectral[2].hex}66`,
                      }}
                    />
                  </div>
                </div>
                <div
                  className="h-28 rounded-[6px]"
                  style={{
                    background: spectralThemes.dark.gradients[0].css,
                  }}
                />
              </div>
            </div>
          </div>

          <p className="mt-12 text-center text-[12px] opacity-55">
            <a href="/sonocea-spectral-style-guide.html" className="underline decoration-[0.08em] underline-offset-[0.2em]">
              Static HTML reference
            </a>{" "}
            for QA parity
          </p>
        </div>
      </section>

      {/* ——— Section 5 · Spectral behaviour (immersive, not chips) ——— */}
      <section className="py-24 md:py-36" style={{ background: spectral.canvas, color: spectral.text }}>
        <div className="mx-auto max-w-[88rem] px-5 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-45">05</p>
          <h3 className="mt-6 max-w-[26ch] text-[clamp(1.85rem,4.5vw,2.85rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            Spectral system
          </h3>
          <p className="mt-8 max-w-[40rem] text-[15px] leading-[1.75] opacity-72">
            Accents emerge through glow, diffusion and transparency — sound-tinted atmosphere, not a row of
            pastel tokens.
          </p>
        </div>

        {/* Neutral continuum — single immersive band */}
        <div className="mx-auto mt-20 max-w-[100rem] px-3 md:px-8">
          <p className="mb-4 px-2 text-[10px] font-semibold uppercase tracking-[0.22em] opacity-40">Neutral continuum</p>
          <div
            className="relative h-24 w-full overflow-hidden rounded-[2px] md:h-32"
            style={{
              background: neutralBandGradient(spectral.neutrals),
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          />
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 px-2 font-mono text-[10px] opacity-45">
            {spectral.neutrals.map((n) => (
              <span key={n.name}>
                {n.name} <span className="opacity-70">{n.hex}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Spectral keys — full-width blurred lanes */}
        <div className="mx-auto mt-16 max-w-[100rem] space-y-4 px-3 md:mt-24 md:px-8">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.22em] opacity-40">Spectral keys</p>
          {spectral.spectral.map((s, i) => (
            <div
              key={s.name}
              className="relative flex min-h-[120px] items-center overflow-hidden rounded-[2px] md:min-h-[160px]"
              style={{ background: spectral.foundation }}
            >
              <div
                className="absolute inset-0 opacity-90 blur-3xl md:blur-[56px]"
                style={{
                  background: `radial-gradient(ellipse 55% 120% at ${25 + (i % 4) * 15}% 50%, ${s.hex}cc, transparent 72%)`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: [
                    `linear-gradient(105deg, transparent 0%, ${s.hex}35 38%, ${s.hex}18 62%, transparent 100%)`,
                    spectralMode === "dark"
                      ? "linear-gradient(180deg, rgba(8,8,8,0.5), rgba(8,8,8,0.85))"
                      : "linear-gradient(180deg, rgba(237,239,232,0.2), rgba(237,239,232,0.82))",
                  ].join(", "),
                }}
              />
              <div className="relative flex w-full items-center justify-between px-6 py-6 md:px-12">
                <span className="text-[clamp(1.1rem,2.5vw,1.45rem)] font-medium tracking-[-0.02em]">{s.name}</span>
                <span className="font-mono text-[11px] opacity-50">{s.hex}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Surface + gradient strips */}
        <div className="mx-auto mt-20 grid max-w-[100rem] gap-4 px-3 md:mt-28 md:grid-cols-3 md:gap-5 md:px-8">
          {spectral.surfaces.map((s) => (
            <div key={s.name} className="relative min-h-[200px] overflow-hidden rounded-[2px]" style={{ background: s.hex }}>
              <div
                className="absolute inset-0 opacity-40 blur-2xl"
                style={{ background: `radial-gradient(circle at 30% 50%, ${s.hex}, transparent 70%)` }}
              />
              <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-6">
                <p className="text-[12px] font-medium">{s.name}</p>
                <p className="mt-1 font-mono text-[10px] opacity-55">{s.hex}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-[100rem] space-y-5 px-3 md:mt-24 md:px-8">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.22em] opacity-40">Atmospheric gradients</p>
          {spectral.gradients.map((g) => (
            <div key={g.id} className="relative overflow-hidden rounded-[2px]">
              <div className="h-[100px] w-full md:h-[120px]" style={{ background: g.css }} />
              <div
                className="flex items-center justify-between border-t px-5 py-4"
                style={{
                  borderColor: spectral.hairline,
                  background: spectralMode === "dark" ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)",
                }}
              >
                <span className="text-[13px] font-medium">{g.label}</span>
                <span className="text-[11px] opacity-50">Environmental wash</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ——— Section 6 · Adaptive states ——— */}
      <section className="px-5 py-24 md:px-12 md:py-36" style={{ background: spectral.surface, color: spectral.text }}>
        <div className="mx-auto max-w-[92rem]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-45">06</p>
          <h3 className="mt-6 text-[clamp(2rem,5vw,3.1rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            One system.
            <br />
            Multiple states.
          </h3>
          <p className="mt-10 max-w-[44rem] text-[15px] leading-[1.75] opacity-72">
            Care, Regulation and Performance adapt contrast, glow, motion, density and hierarchy — they are not
            separate themes. The foundation stays continuous; behaviour bends.
          </p>

          <div className="mt-20 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {BEHAVIOUR_MODES.map((bm) => {
              const meta = modeReference[bm];
              const label = behaviourModeMeta[bm].label;
              const glowAlpha = bm === "care" ? 0.12 : bm === "regulation" ? 0.18 : 0.26;
              return (
                <div key={bm} className="flex flex-col">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-50">{label}</p>
                  <p className="mt-4 text-[15px] leading-relaxed opacity-78">{meta.tonalIntent}</p>
                  <dl className="mt-6 space-y-3 text-[12px] leading-relaxed opacity-68">
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] opacity-45">Contrast</dt>
                      <dd className="mt-1">{meta.contrast}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] opacity-45">Glow · motion · density</dt>
                      <dd className="mt-1">
                        {meta.intensity} · {meta.motion} · {meta.density}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-10 flex-1">
                    <ModePreviewShell mode={bm} spectralMode={spectralMode}>
                      <div
                        className="relative flex flex-1 flex-col rounded-[1.25rem] px-4 pb-5 pt-4"
                        style={{
                          background:
                            spectralMode === "dark"
                              ? `linear-gradient(155deg, rgba(255,255,255,0.03), rgba(0,0,0,0.5))`
                              : "rgba(255,255,255,0.58)",
                          boxShadow:
                            spectralMode === "dark"
                              ? `0 0 52px rgba(200,160,230,${glowAlpha})`
                              : undefined,
                        }}
                      >
                        <p className="text-[11px]" style={{ color: "var(--proto-text-muted)" }}>
                          Session
                        </p>
                        <p className="mt-2 text-[20px] font-medium leading-snug tracking-[-0.02em]" style={{ color: "var(--proto-text)" }}>
                          Coastal breathwork
                        </p>
                        <div className="mt-6 h-2 overflow-hidden rounded-full" style={{ background: "var(--proto-border)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: bm === "care" ? "34%" : bm === "regulation" ? "51%" : "66%",
                              background: spectral.spectral[bm === "performance" ? 3 : 2].hex,
                              opacity: bm === "care" ? 0.72 : bm === "regulation" ? 0.88 : 1,
                              boxShadow:
                                spectralMode === "dark"
                                  ? `0 0 20px ${spectral.spectral[2].hex}55`
                                  : undefined,
                            }}
                          />
                        </div>
                        <div className="mt-8 flex-1">
                          <AmbientWaveform spectral={spectral} mode={spectralMode} bars={16} />
                        </div>
                      </div>
                    </ModePreviewShell>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Section 7 · Product translation ——— */}
      <section className="py-24 md:py-36" style={{ background: spectral.canvas, color: spectral.text }}>
        <div className="mx-auto max-w-[96rem] px-5 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-45">07</p>
          <h3 className="mt-6 max-w-[18ch] text-[clamp(1.85rem,4.5vw,2.85rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            Product translation
          </h3>
          <p className="mt-8 max-w-[40rem] text-[15px] leading-[1.75] opacity-72">
            Surfaces at real scale — where spectral behaviour proves it is not a decorative layer but the emotional
            condition of the app.
          </p>

          {/* Emotional centerpiece */}
          <div
            className="relative mt-16 min-h-[min(78vh,720px)] overflow-hidden rounded-[4px] md:mt-24"
            style={{
              background: spectral.gradients[0].css,
              boxShadow:
                spectralMode === "dark"
                  ? "0 60px 140px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.06)"
                  : "0 50px 120px rgba(18,16,28,0.14)",
            }}
          >
            {!reduceMotion ? (
              <div
                className="pointer-events-none absolute inset-[-30%] spectral-shimmer-bg opacity-35 mix-blend-overlay"
                style={{
                  backgroundImage:
                    spectralMode === "light"
                      ? "linear-gradient(115deg, transparent 28%, rgba(255,255,255,0.55) 48%, transparent 68%)"
                      : "linear-gradient(115deg, transparent 32%, rgba(255,255,255,0.07) 50%, transparent 68%)",
                }}
              />
            ) : null}
            <div className="relative flex min-h-[inherit] flex-col justify-between p-8 pb-12 pt-16 md:p-14 md:pb-16 md:pt-24">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] opacity-55">Session player</p>
                <h4 className="mt-8 text-[clamp(2.25rem,6vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.045em]">
                  Evening drift
                </h4>
                <p className="mt-6 max-w-[34ch] text-[16px] leading-relaxed opacity-82">
                  Full-field gradient · peripheral bloom · waveform as sonic residue — calm enough for regulation,
                  legible enough for return visits.
                </p>
              </div>
              <div className="mt-16 flex flex-wrap items-end gap-10 md:gap-16">
                <button
                  type="button"
                  className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full backdrop-blur-md"
                  style={{
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.35)",
                    background: spectralMode === "dark" ? "rgba(6,6,6,0.45)" : "rgba(255,255,255,0.35)",
                    color: spectral.text,
                    boxShadow:
                      spectralMode === "dark"
                        ? `0 0 48px ${spectral.spectral[2].hex}44`
                        : "0 20px 50px rgba(20,18,40,0.15)",
                  }}
                  aria-label="Play"
                >
                  <IconPlay className="h-9 w-9" />
                </button>
                <div className="min-w-[min(100%,420px)] flex-1">
                  <AmbientWaveform spectral={spectral} mode={spectralMode} bars={22} />
                </div>
              </div>
            </div>
          </div>

          {/* Asymmetric product grid */}
          <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div
              className="relative flex min-h-[min(52vh,520px)] flex-col justify-between overflow-hidden rounded-[4px] p-8 md:col-span-7 md:p-12"
              style={{
                background: spectral.gradients[3].css,
              }}
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-55">Home dashboard</p>
                <p className="mt-6 max-w-[30ch] text-[clamp(1.35rem,2.5vw,1.65rem)] font-medium leading-snug tracking-[-0.02em]">
                  Continuity without clutter
                </p>
                <p className="mt-5 max-w-[36ch] text-[14px] leading-relaxed opacity-78">
                  Cards breathe on the foundation; spectral wash signals importance — never loud tiles.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="h-28 rounded-[4px]" style={{ background: "rgba(255,255,255,0.38)" }} />
                <div className="h-28 rounded-[4px]" style={{ background: "rgba(255,255,255,0.22)" }} />
              </div>
            </div>

            <div
              className="relative flex min-h-[min(52vh,520px)] flex-col justify-between overflow-hidden rounded-[4px] p-8 md:col-span-5 md:p-10"
              style={{ background: spectral.gradients[4].css }}
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-55">Mood check-in</p>
                <p className="mt-6 text-[clamp(1.35rem,2.5vw,1.65rem)] font-medium leading-snug tracking-[-0.02em]">
                  How are you arriving?
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {spectral.spectral.map((s) => (
                  <span
                    key={s.name}
                    className="h-16 w-16 shrink-0 rounded-full"
                    style={{
                      background: s.hex,
                      boxShadow:
                        spectralMode === "dark"
                          ? `0 0 36px ${s.hex}66`
                          : "0 14px 34px rgba(18,16,28,0.12)",
                      opacity: 0.92,
                    }}
                    aria-hidden
                  />
                ))}
              </div>
            </div>

            <div
              className="relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[4px] p-8 md:col-span-5 md:p-10"
              style={{ background: spectral.gradients[2].css }}
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-55">Insights</p>
                <p className="mt-6 text-[clamp(1.25rem,2.2vw,1.5rem)] font-medium tracking-[-0.02em]">
                  Quiet clarity
                </p>
                <p className="mt-4 max-w-[32ch] text-[13px] leading-relaxed opacity-78">
                  Trends read through rhythm and spacing — colour stays atmospheric.
                </p>
              </div>
              <div className="mt-10 h-36 rounded-[4px]" style={{ background: "rgba(0,0,0,0.12)" }} />
            </div>

            <div
              className="relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[4px] p-8 md:col-span-7 md:p-12"
              style={{
                background: spectral.surface,
                boxShadow: `inset 0 1px 0 ${spectralMode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.5)"}`,
              }}
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-55">
                  Sonic waveform
                </p>
                <p className="mt-6 max-w-[34ch] text-[14px] leading-relaxed opacity-78">
                  Thin strokes · phase drift · colour borrowed from spectral keys — sonic, not decorative.
                </p>
              </div>
              <div className="mt-10 flex h-32 items-end justify-center gap-[5px] opacity-90">
                {Array.from({ length: 52 }).map((_, i) => (
                  <span
                    key={i}
                    className="spectral-wave-bar w-[3px] rounded-full bg-current md:w-[4px]"
                    style={{
                      height: `${22 + (i % 11) * 7}%`,
                      opacity: 0.22 + (i % 6) * 0.1,
                      color: spectral.spectral[i % spectral.spectral.length].hex,
                      animationDuration: `${1.05 + (i % 9) * 0.11}s`,
                      animationDelay: `${i * 0.035}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Breathing visualisation — full width */}
          <div
            className="relative mt-10 overflow-hidden rounded-[4px] px-8 py-16 md:px-16 md:py-24"
            style={{
              background:
                spectralMode === "dark"
                  ? "linear-gradient(180deg, #0a0a0a 0%, #080808 100%)"
                  : "linear-gradient(180deg, #f2f3ef 0%, #EDEFE8 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-50 blur-3xl"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${spectral.spectral[4].hex}44, transparent 65%)`,
              }}
            />
            <div className="relative text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-45">
                Breathing visualisation
              </p>
              <p className="mx-auto mt-6 max-w-[36rem] text-[clamp(1.15rem,2.2vw,1.35rem)] font-medium leading-snug tracking-[-0.02em]">
                Rings expand on a slow inhale — motion stays sub-threshold, legible as calm signal.
              </p>
            </div>
            <BreathingRings spectral={spectral} reduced={reduceMotion} />
          </div>
        </div>
      </section>

      {/* ——— Section 8 · Sensory accessibility ——— */}
      <section className="px-5 py-28 md:px-16 md:py-40" style={{ background: spectral.surface, color: spectral.text }}>
        <div className="mx-auto max-w-[46rem]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-45">08</p>
          <h3 className="mt-8 text-[clamp(1.85rem,4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.03em]">
            Sensory accessibility
          </h3>
          <p className="mt-10 text-[17px] leading-[1.75] opacity-78">
            The system is designed to support a broader range of emotional and sensory contexts through adaptive
            intensity, controlled contrast, reduced visual fatigue, restrained motion, environmental hierarchy
            and softened spectral behaviour.
          </p>
          <p className="mt-8 text-[17px] leading-[1.75] opacity-78">
            It is designed to support a wider range of sensory and emotional conditions — without claiming
            universal coverage or treating accessibility as a checklist layer.
          </p>
        </div>
      </section>

      {/* ——— Section 9 · Motion & atmosphere ——— */}
      <section className="relative overflow-hidden py-28 md:py-44" style={{ background: spectral.canvas, color: spectral.text }}>
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div
            className="absolute inset-[-40%] spectral-motion-drift blur-[100px]"
            style={{
              background:
                spectralMode === "dark"
                  ? "radial-gradient(circle at 40% 40%, rgba(160,120,200,0.2), transparent 55%)"
                  : "radial-gradient(circle at 30% 30%, rgba(230,210,245,0.45), transparent 55%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[52rem] px-6 text-center md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-45">09</p>
          <h3 className="mt-8 text-[clamp(1.65rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em]">
            Motion &amp; atmosphere
          </h3>
          <p className="mt-10 text-[15px] leading-[1.8] opacity-72">
            Subtle spectral drift, blurred waveform motion, refracted veil and ambient bloom — tuned under the
            distraction threshold. Sonic intelligence: motion implies listening conditions, not interface novelty.
            Reduced-motion settings quiet these layers.
          </p>
        </div>
        {!reduceMotion ? (
          <div className="relative mx-auto mt-16 flex min-h-[200px] max-w-[72rem] justify-center px-6">
            <motion.div
              className="absolute h-64 w-64 rounded-full blur-[100px]"
              style={{ background: spectral.spectral[2].hex, opacity: 0.25 }}
              animate={{ scale: [1, 1.08, 1], x: [0, 24, -12, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute h-52 w-52 rounded-full blur-[90px]"
              style={{ background: spectral.spectral[5].hex, opacity: 0.22 }}
              animate={{ scale: [1, 1.05, 1], x: [0, -30, 14, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        ) : null}
      </section>

      {/* Closing narrative */}
      <footer className="px-6 pb-20 pt-12 md:px-16 md:pb-28" style={{ background: spectral.surface, color: spectral.text }}>
        <div className="mx-auto max-w-[56rem] border-t pt-16" style={{ borderColor: spectral.hairline }}>
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] opacity-40">
            Principles
          </p>
          <ul className="mt-14 space-y-16">
            {spectralPrinciples.map((p, i) => (
              <li
                key={p.title}
                className={`flex flex-col gap-4 md:flex-row md:items-start md:gap-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <span className="shrink-0 font-mono text-[10px] opacity-35">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <p className="text-[clamp(1.25rem,2.8vw,1.65rem)] font-medium leading-snug tracking-[-0.02em]">
                    {p.title}
                  </p>
                  <p className="mt-4 max-w-[38rem] text-[15px] leading-[1.75] opacity-72">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-24 text-center font-mono text-[10px] opacity-40">
            Tokens · <code className="break-all">src/system/tokens/spectralColors.js</code>
          </p>
        </div>
      </footer>
    </div>
  );
}
