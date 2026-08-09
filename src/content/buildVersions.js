/** Dated production builds served under `/v/<id>/`. */
export const BUILD_VERSIONS = [
  {
    id: "2026-07-29",
    label: "29 Jul 2026",
    badge: "Comments",
    blurb: "Previous production — all shared comments live here.",
  },
  {
    id: "2026-08-09",
    label: "9 Aug 2026",
    badge: "Latest",
    blurb: "Latest prototype — Admin + Listener flows from this push.",
  },
];

/** @param {string} [pathname] */
export function versionIdFromPathname(pathname = typeof window !== "undefined" ? window.location.pathname : "") {
  const match = String(pathname || "").match(/^\/v\/([^/]+)/);
  return match?.[1] ?? null;
}

/**
 * Absolute URL for the same in-app route on another dated build.
 * @param {string} versionId
 * @param {{ pathname?: string, search?: string, hash?: string }} [loc]
 */
export function hrefForVersion(versionId, loc = {}) {
  const pathname = loc.pathname ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const search = loc.search ?? (typeof window !== "undefined" ? window.location.search : "");
  const hash = loc.hash ?? (typeof window !== "undefined" ? window.location.hash : "");
  const rest = String(pathname || "/").replace(/^\/v\/[^/]+/, "") || "/";
  const path = rest.startsWith("/") ? rest : `/${rest}`;
  return `/v/${versionId}${path}${search}${hash}`;
}
