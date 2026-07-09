/**
 * Spacing scale (px). Density multipliers express behavioural mode — subtle shifts on one scale.
 */

export const spacingPx = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 40,
  9: 48,
  10: 64,
  11: 80,
  12: 96,
};

/** Section vertical rhythm (marketing / reference pages) */
export const sectionSpacing = {
  tight: spacingPx[8],
  default: spacingPx[10],
  airy: spacingPx[11],
};

/** Mobile safe-area guidance (logical px; implement per platform) */
export const safeArea = {
  minHorizontal: spacingPx[4],
  minBottom: spacingPx[6],
};

/** App screen rhythm — Figma GTM Home (node 1:54800) */
export const appSpacing = {
  insetX: spacingPx[4],
  sectionGap: spacingPx[4],
  tagGap: spacingPx[2],
  cardCarouselGap: 5,
  cardInfoPadding: spacingPx[4],
  tabIconLabelGap: spacingPx[2],
  tabPaddingY: spacingPx[5],
  sectionHeaderGap: spacingPx[2],
};

/**
 * Density multipliers for layout — applied with spacing tokens, not separate grids.
 * Care: more open · Performance: slightly tighter
 */
export const densityByMode = {
  care: { section: 1.06, cardPadding: 1.08, gap: 1.05 },
  regulation: { section: 1, cardPadding: 1, gap: 1 },
  performance: { section: 0.94, cardPadding: 0.92, gap: 0.96 },
};

export function spacingWithDensity(basePx, mode) {
  const m = densityByMode[mode] ?? densityByMode.regulation;
  return Math.round(basePx * m.gap);
}
