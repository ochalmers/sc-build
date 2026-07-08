/**
 * Motion is secondary to sound. If it reads as a feature, reduce it.
 */

export const motionPrinciples = [
  "Motion supports comprehension, not delight for its own sake.",
  "Prefer opacity and small positional shifts over elaborate choreography.",
  "Never compete with audio feedback or session focus.",
];

/** Base durations (ms) — tune per context; modes scale via resolvePalette layout/motion */
export const motionDuration = {
  instant: 120,
  fast: 200,
  standard: 280,
  slow: 420,
  waveformCycle: 3200,
};

/** Easing — restrained; avoid bouncy / elastic curves */
export const motionEase = {
  out: [0.22, 1, 0.36, 1],
  linear: [0, 0, 1, 1],
  inOutSoft: [0.4, 0, 0.2, 1],
};

export const motionTokens = {
  fade: { duration: motionDuration.standard, ease: motionEase.out },
  screen: { duration: motionDuration.slow, ease: motionEase.out },
  micro: { duration: motionDuration.fast, ease: motionEase.out },
  waveform: { duration: motionDuration.waveformCycle, ease: motionEase.linear },
};
