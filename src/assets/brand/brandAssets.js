/**
 * Brand asset URLs — Vite-bundled so logos ship with the app even when
 * /public copies are missing from a deploy. resolveBrandLogoSrc remaps
 * legacy public paths and stale hashed URLs (localStorage) to these.
 */
import sonoceaLogoUrl from "./logos/sonocea-logo.svg";
import sonoceaMarkUrl from "./logos/sonocea-mark.svg";
import pneLogoUrl from "./partners/preston-north-end.png";
import nhsLogoUrl from "./partners/nhs-trust.svg";
import loughboroughLogoUrl from "./partners/loughborough.svg";
import wiganLogoUrl from "./partners/wigan-athletic.svg";

export const SONOCEA_LOGO_SRC = sonoceaLogoUrl;
export const SONOCEA_MARK_SRC = sonoceaMarkUrl;

export const PNE_LOGO_SRC = pneLogoUrl;
export const NHS_LOGO_SRC = nhsLogoUrl;
export const LOUGHBOROUGH_LOGO_SRC = loughboroughLogoUrl;
export const WIGAN_LOGO_SRC = wiganLogoUrl;

/** Filename stem → current bundled URL (also remaps Vite-hashed /assets/*-AbCdEfGh.ext). */
export const BRAND_LOGO_BY_STEM = {
  "sonocea-logo": SONOCEA_LOGO_SRC,
  "sonocea-mark": SONOCEA_MARK_SRC,
  "preston-north-end": PNE_LOGO_SRC,
  "nhs-trust": NHS_LOGO_SRC,
  loughborough: LOUGHBOROUGH_LOGO_SRC,
  "wigan-athletic": WIGAN_LOGO_SRC,
};

/**
 * Resolve any known / legacy / Vite-hashed logo path to the current bundled URL.
 * Unknown custom URLs pass through unchanged (unless isPreston forces PNE).
 */
export function resolveBrandLogoSrc(src, { isPreston = false, fallback = "" } = {}) {
  if (!src) {
    return isPreston ? PNE_LOGO_SRC : fallback;
  }

  const trimmed = String(src).trim();
  if (!trimmed) {
    return isPreston ? PNE_LOGO_SRC : fallback;
  }

  // Exact match on current bundled URLs
  if (Object.values(BRAND_LOGO_BY_STEM).includes(trimmed)) return trimmed;

  // Legacy /public paths and other known aliases
  const legacy = {
    "/assets/brand/partners/preston-north-end.png": PNE_LOGO_SRC,
    "/assets/brand/partners/nhs-trust.svg": NHS_LOGO_SRC,
    "/assets/brand/partners/loughborough.svg": LOUGHBOROUGH_LOGO_SRC,
    "/assets/brand/partners/wigan-athletic.svg": WIGAN_LOGO_SRC,
    "/assets/system/logos/sonocea-logo.svg": SONOCEA_LOGO_SRC,
    "/assets/system/logos/sonocea-mark.svg": SONOCEA_MARK_SRC,
    "/src/assets/brand/partners/preston-north-end.png": PNE_LOGO_SRC,
    "/src/assets/brand/partners/nhs-trust.svg": NHS_LOGO_SRC,
    "/src/assets/brand/partners/loughborough.svg": LOUGHBOROUGH_LOGO_SRC,
    "/src/assets/brand/partners/wigan-athletic.svg": WIGAN_LOGO_SRC,
    "/src/assets/brand/logos/sonocea-logo.svg": SONOCEA_LOGO_SRC,
    "/src/assets/brand/logos/sonocea-mark.svg": SONOCEA_MARK_SRC,
  };
  if (legacy[trimmed]) return legacy[trimmed];

  // Vite-hashed or /src/assets/... paths → stem match
  // e.g. /assets/preston-north-end-DrMzmsNQ.png
  //      /src/assets/brand/partners/preston-north-end.png
  const file = trimmed.split("?")[0].split("/").pop() || "";
  const withoutExt = file.replace(/\.[^.]+$/, "");
  const stem = withoutExt.replace(/-[A-Za-z0-9_-]{6,14}$/, "");
  if (BRAND_LOGO_BY_STEM[stem]) return BRAND_LOGO_BY_STEM[stem];
  if (BRAND_LOGO_BY_STEM[withoutExt]) return BRAND_LOGO_BY_STEM[withoutExt];

  if (isPreston) return PNE_LOGO_SRC;
  return trimmed;
}
