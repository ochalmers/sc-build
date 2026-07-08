/**
 * Primary navigation — organised around the June 2026 revised PRDs.
 * Foundations (design system, marketing, site architecture) are supporting work
 * from before the programme reset; product surfaces sit at the top level.
 */

export const FOUNDATIONS_PAGES = [
  { label: "Design system", to: "/design-system" },
  { label: "Marketing", to: "/marketing" },
  { label: "Site architecture", to: "/site-architecture" },
  { label: "Inspiration", to: "/inspiration" },
];

/** @deprecated Legacy routes — redirect to PRD surfaces. Kept for redirects only. */
export const LEGACY_ROUTES = {
  flows: "/flows/revised",
  flowsLite: "/flows/revised",
  keyScreens: "/designs/prd",
  designs: "/designs/prd",
  wireframes: "/flows/revised",
};

export const MAIN_NAV = [
  { label: "Overview", to: "/" },
  { label: "Plan", to: "/plan" },
  { label: "Flows", to: "/flows/revised" },
  { label: "Design", to: "/designs/prd" },
  { label: "Prototype", to: "/prototype/prd" },
  { label: "Foundations", to: "/design-system", children: FOUNDATIONS_PAGES },
];

export const PRD_HUB_LINKS = [
  {
    id: "public-visitor",
    label: "Public Visitor PRD",
    subtitle: "Store download · discover journey · curated sample",
    flows: "/flows/revised#revised-pv-flows-golden",
    design: "/designs/prd#prd-designs-public",
    prototype: "/prototype/prd",
  },
  {
    id: "mobile-app",
    label: "Mobile App v1.0",
    subtitle: "Provisioned listener · partner · admin",
    flows: "/flows/revised#revised-mobile-stories",
    design: "/designs/prd#prd-designs-mobile",
    prototype: "/prototype/prd",
  },
];

export function isNavActive(pathname, item) {
  if (item.children) {
    return item.children.some((c) => pathname.startsWith(c.to)) || pathname.startsWith(item.to);
  }
  if (item.to === "/") return pathname === "/";
  if (item.to === "/flows/revised") {
    return pathname.startsWith("/flows");
  }
  if (item.to === "/designs/prd") {
    return pathname.startsWith("/designs");
  }
  if (item.to === "/prototype/prd") {
    return pathname.startsWith("/prototype");
  }
  return pathname.startsWith(item.to);
}

export function getIntroAnchor(pathname) {
  if (pathname.startsWith("/plan")) return "#plan-intro";
  if (pathname.startsWith("/site-architecture")) return "#arch-intro";
  if (pathname.startsWith("/design-system")) return "#ds-intro";
  if (pathname.startsWith("/flows")) return "#revised-intro";
  if (pathname.startsWith("/inspiration")) return "#inspiration-intro";
  if (pathname.startsWith("/marketing")) return "#collateral-intro";
  if (pathname.startsWith("/prototype")) return "#prototype-prd-intro";
  if (pathname.startsWith("/designs")) return "#prd-designs-intro";
  return "#summary-intro";
}
