import { basePalette } from "../system/tokens/colors.js";
import { behaviourModeMeta } from "../system/modes.js";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex(r, g, b) {
  const to = (v) => v.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function mixHex(a, b, t) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  const u = Math.min(1, Math.max(0, t));
  const r = Math.round(A.r + (B.r - A.r) * u);
  const g = Math.round(A.g + (B.g - A.g) * u);
  const bch = Math.round(A.b + (B.b - A.b) * u);
  return rgbToHex(r, g, bch);
}

/**
 * Resolves one palette + CSS variables from base palette, behaviour mode, and sliders (0–1).
 * Sliders are independent degrees of freedom layered on mode transforms.
 */
export function resolvePalette(behaviourMode, sliders) {
  const mode = behaviourModeMeta[behaviourMode] ?? behaviourModeMeta.regulation;
  const { contrast, density, intensity } = sliders;
  const t = mode.transform;

  const contrastBoost = (contrast - 0.5) * 0.22;
  const densityTighten = (density - 0.5) * 0.06;
  const intensityBoost = (intensity - 0.5) * 0.1;

  const softText =
    t.softenText + contrastBoost * -0.35 + (1 - contrast) * 0.08;
  const softBorder =
    t.softenBorder + contrastBoost * -0.25 + (1 - contrast) * 0.06;
  const surfaceLift = t.surfaceDiff + densityTighten * 0.4;
  const accentMute =
    t.accentMute + (1 - intensity) * 0.06 + (1 - contrast) * 0.08;

  const bg = basePalette.background;
  const textPrimary = mixHex(
    basePalette.textPrimary,
    bg,
    Math.min(0.22, Math.max(0, softText)),
  );
  const textSecondary = mixHex(
    basePalette.textSecondary,
    bg,
    Math.min(0.35, Math.max(0, softText + 0.08)),
  );
  const border = mixHex(
    basePalette.border,
    bg,
    Math.min(0.45, Math.max(0, softBorder)),
  );
  const surface = mixHex(
    basePalette.surface,
    basePalette.surfaceElevated,
    Math.min(0.22, Math.max(-0.05, surfaceLift)),
  );
  const surfaceElevated = mixHex(
    basePalette.surfaceElevated,
    basePalette.surface,
    Math.min(0.12, Math.max(0, -surfaceLift)),
  );
  const accentPrimary = mixHex(
    basePalette.accentPrimary,
    bg,
    Math.min(0.35, Math.max(0, accentMute)),
  );
  const waveformBase = mixHex(
    basePalette.waveformBase,
    bg,
    Math.min(0.25, Math.max(0, accentMute * 0.6)),
  );

  const vars = {
    "--proto-bg": bg,
    "--proto-surface": surface,
    "--proto-surface-elevated": surfaceElevated,
    "--proto-text": textPrimary,
    "--proto-text-muted": textSecondary,
    "--proto-accent": accentPrimary,
    "--proto-accent-soft": mixHex(basePalette.accentSoft, bg, accentMute * 0.5),
    "--proto-border": border,
    "--proto-wave": waveformBase,
  };

  const motionMs = Math.round(220 + (1 - intensity) * 280 + (1 - contrast) * 120);
  const waveformAmp = 0.35 + intensity * 0.55 + (contrast - 0.5) * 0.12;
  const waveformSpeed = 0.55 + intensity * 0.55;

  const densityScale = 0.88 + density * 0.24;
  const gapScale = 0.82 + density * 0.36;

  return {
    palette: {
      background: bg,
      surface,
      surfaceElevated,
      textPrimary,
      textSecondary,
      accentPrimary,
      accentSoft: vars["--proto-accent-soft"],
      border,
      waveformBase,
    },
    cssVars: vars,
    motion: {
      durationSec: motionMs / 1000,
      ease: [0.22, 1, 0.36, 1],
    },
    waveform: {
      amplitude: Math.min(1.05, Math.max(0.2, waveformAmp)),
      speed: Math.min(1.4, Math.max(0.35, waveformSpeed)),
    },
    layout: {
      densityScale,
      gapScale,
      radiusPx: Math.round(14 + (1 - density) * 6),
      cardShadowAlpha: 0.04 + contrast * 0.06,
    },
  };
}
