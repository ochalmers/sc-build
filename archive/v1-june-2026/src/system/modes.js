/**
 * Behavioural modes — controlled expressions of one system (not separate brands or themes).
 */

export const BEHAVIOUR_MODES = ["care", "regulation", "performance"];

export const behaviourModeMeta = {
  care: {
    id: "care",
    label: "Care",
    definition: "Reduce cognitive load",
    defaultSliders: { contrast: 0.22, density: 0.18, intensity: 0.18 },
    transform: {
      softenText: 0.14,
      softenBorder: 0.12,
      surfaceDiff: 0.03,
      accentMute: 0.12,
    },
  },
  regulation: {
    id: "regulation",
    label: "Regulation",
    definition: "Maintain balance",
    defaultSliders: { contrast: 0.5, density: 0.5, intensity: 0.36 },
    transform: {
      softenText: 0.05,
      softenBorder: 0.05,
      surfaceDiff: 0.015,
      accentMute: 0.04,
    },
  },
  performance: {
    id: "performance",
    label: "Performance",
    definition: "Enable clarity",
    defaultSliders: { contrast: 0.78, density: 0.64, intensity: 0.56 },
    transform: {
      softenText: -0.02,
      softenBorder: -0.04,
      surfaceDiff: -0.01,
      accentMute: -0.04,
    },
  },
};

/** Extended copy for documentation — same underlying tokens + transforms */
export const modeReference = {
  care: {
    purpose: "Protect attention and reduce decisions in vulnerable or low-capacity moments.",
    tonalIntent: "Soft, spacious, non-demanding.",
    contrast: "Lower — edges and type ease back.",
    density: "More open — fewer elements per view where appropriate.",
    intensity: "Low — motion and waveform stay gentle.",
    motion: "Slower transitions; fades over slide.",
    productImplications:
      "Fewer visible controls per step; primary path obvious; copy stays reassuring and short.",
  },
  regulation: {
    purpose: "Support steady, repeatable use without drama or drift.",
    tonalIntent: "Neutral, balanced, familiar.",
    contrast: "Medium — readable without sharpness.",
    density: "Balanced rhythm aligned to daily habit.",
    intensity: "Low–medium — stable waveform, calm pacing.",
    motion: "Predictable; no surprises.",
    productImplications:
      "Consistent hierarchy and labels; subtle adaptation only when it aids comprehension.",
  },
  performance: {
    purpose: "Enable fast re-entry and clear outcomes after high load or intensity.",
    tonalIntent: "Clear, direct, precise.",
    contrast: "Higher — hierarchy and affordances read quickly.",
    density: "Slightly tighter — more information per glance without clutter.",
    intensity: "Medium — waveform and motion read as focused signal.",
    motion: "Snappier but still restrained — never flashy.",
    productImplications:
      "Direct labels, clear primary actions, minimal friction to session start.",
  },
};
