/**
 * Canonical Sonocea colour tokens — one base palette.
 * Behaviour modes apply transforms (see ../modes.js + utils/resolvePalette.js); they are not separate palettes.
 */

export const basePalette = {
  background: "#f2f1ed",
  surface: "#ebeae5",
  surfaceElevated: "#ffffff",
  textPrimary: "#171716",
  textSecondary: "#6e6d68",
  accentPrimary: "#3d4a44",
  accentSoft: "#8f9b95",
  border: "#dcd9d2",
  waveformBase: "#5a6862",
};

/** Semantic aliases — map product language to base tokens */
export const colorSemantic = {
  bg: "background",
  surfaceDefault: "surface",
  surfaceRaised: "surfaceElevated",
  text: "textPrimary",
  textMuted: "textSecondary",
  accent: "accentPrimary",
  accentMuted: "accentSoft",
  line: "border",
  waveform: "waveformBase",
};

/** CSS variable names used by product surfaces (prototype + system components) */
export const cssVarNames = {
  bg: "--proto-bg",
  surface: "--proto-surface",
  surfaceElevated: "--proto-surface-elevated",
  text: "--proto-text",
  textMuted: "--proto-text-muted",
  accent: "--proto-accent",
  accentSoft: "--proto-accent-soft",
  border: "--proto-border",
  wave: "--proto-wave",
};
