/**
 * Listener appearance preference.
 * - light / dark: fixed
 * - adapt: follow local time of day (no location permission)
 */

export const APPEARANCE_MODE = {
  light: "light",
  dark: "dark",
  adapt: "adapt",
};

/** Local daytime window - Light; outside this window - Dark. */
const DAY_START_HOUR = 6;
const DAY_END_HOUR = 18;

export function normalizeAppearance(value) {
  if (value === APPEARANCE_MODE.dark || value === APPEARANCE_MODE.adapt) return value;
  return APPEARANCE_MODE.light;
}

export function isDaytimeHours(date = new Date()) {
  const hour = date.getHours();
  return hour >= DAY_START_HOUR && hour < DAY_END_HOUR;
}

/** Resolve stored preference to the effective light | dark surface. */
export function resolveAppearance(appearance, date = new Date()) {
  const mode = normalizeAppearance(appearance);
  if (mode === APPEARANCE_MODE.dark) return APPEARANCE_MODE.dark;
  if (mode === APPEARANCE_MODE.adapt) {
    return isDaytimeHours(date) ? APPEARANCE_MODE.light : APPEARANCE_MODE.dark;
  }
  return APPEARANCE_MODE.light;
}

/** "daytime" | "evening" - for subtle adaptive microcopy. */
export function adaptPeriodLabel(date = new Date()) {
  return isDaytimeHours(date) ? "daytime" : "evening";
}

export function adaptBeginModeLabel(date = new Date()) {
  return isDaytimeHours(date) ? "Light" : "Dark";
}
