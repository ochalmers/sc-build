import { PROTOTYPE_CTA, WORKSPACE_PAGES } from "../content/workspace.js";

/**
 * v2 primary navigation — five sections, no dropdowns.
 */

export const MAIN_NAV = [
  { label: WORKSPACE_PAGES.overview.navLabel, to: WORKSPACE_PAGES.overview.path },
  { label: WORKSPACE_PAGES.plan.navLabel, to: WORKSPACE_PAGES.plan.path },
  { label: WORKSPACE_PAGES.flows.navLabel, to: WORKSPACE_PAGES.flows.path },
  { label: WORKSPACE_PAGES.design.navLabel, to: WORKSPACE_PAGES.design.path },
  { label: WORKSPACE_PAGES.keyScreens.navLabel, to: WORKSPACE_PAGES.keyScreens.path },
  { label: WORKSPACE_PAGES.references.navLabel, to: WORKSPACE_PAGES.references.path },
];

export { PROTOTYPE_CTA };

export function isNavActive(pathname, item) {
  if (item.to === "/") return pathname === "/";
  return pathname.startsWith(item.to);
}

export function getIntroAnchor(pathname) {
  const page = Object.values(WORKSPACE_PAGES).find((p) => p.path === pathname);
  if (page) return `#${page.introId.replace(/^#/, "")}`;
  return "#overview-intro";
}
