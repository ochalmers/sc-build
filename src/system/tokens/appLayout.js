/**
 * App layout & component geometry — extracted from Figma GTM Home (node 1:54800).
 * Reference: https://www.figma.com/design/lmo2RrohjwEiyyZj7SEGHM/Sonocea-App--GTM-?node-id=1-54800
 *
 * Colour and imagery are intentionally omitted; bind surfaces via resolvePalette / CSS vars.
 */

export const FIGMA_REFERENCE = {
  fileKey: "lmo2RrohjwEiyyZj7SEGHM",
  nodeId: "1:54800",
  screenName: "Home",
};

/** Design-frame dimensions (logical px) */
export const appFrame = {
  width: 403,
  height: 874,
  contentWidth: 369,
  insetX: 16,
};

export const appNavbar = {
  height: 64,
  paddingX: 16,
  logoHeight: 27,
  menuIconSize: 32,
};

export const appSessionHero = {
  stackGap: 16,
  tagRowGap: 8,
};

export const appTag = {
  height: 28,
  paddingX: 10,
  radius: 40,
};

export const appSessionCard = {
  width: 256,
  height: 180,
  radius: 10,
  carouselGap: 5,
  infoPadding: 16,
  playIconSize: 43,
};

export const appSectionHeader = {
  stackGap: 8,
  dividerHeight: 1,
};

export const appTabBar = {
  height: 80,
  tabWidth: 110,
  iconSize: 26,
  iconLabelGap: 8,
  paddingY: 20,
  blurLayerHeight: 216,
  backdropBlur: 7.5,
  fadeBlur: 25,
};

export const appPlayControl = {
  diameter: 98,
  ringOffsets: [0, 29, 59, 108],
};

export const appEffects = {
  screenShadow: "0 4px 40px rgba(0, 0, 0, 0.15)",
  cardBackdropBlur: 25,
};
