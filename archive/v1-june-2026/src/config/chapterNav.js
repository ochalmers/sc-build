import { DELIVERY_PLAN_CHAPTERS } from "../content/deliveryPlan.js";
import { SITE_ARCHITECTURE_CHAPTERS } from "../content/siteArchitecture.js";
import { PROJECT_SUMMARY_SECTIONS } from "../content/projectSummary.js";
import { MARKETING_COLLATERAL_CHAPTERS } from "../content/marketingCollateral.js";
import { PRD_DESIGNS_NAV } from "../content/prdRevisedDesigns.js";
import { REVISED_NAV } from "../content/prdRevised/index.js";
import { INSPIRATION_NAV } from "../content/inspiration.js";
import { IDEATION_NAV } from "../content/ideation.js";

function withMeta(items) {
  return items.map((item) => ({
    ...item,
    id: item.id ?? item.href.replace(/^#/, ""),
    shortLabel: item.shortLabel ?? item.label,
  }));
}

export const PROJECT_SUMMARY_CHAPTERS = withMeta(
  PROJECT_SUMMARY_SECTIONS.map((section) => ({
    label: section.label,
    shortLabel: section.label,
    href: `#${section.id}`,
    id: section.id,
  })),
);

export const DESIGN_SYSTEM_CHAPTERS = withMeta([
  { label: "Overview", shortLabel: "Overview", href: "#ds-intro", id: "ds-intro" },
  { label: "Tokens", shortLabel: "Tokens", href: "#ds-tokens", id: "ds-tokens" },
  { label: "Behavioural modes", shortLabel: "Modes", href: "#ds-modes", id: "ds-modes" },
  { label: "Components", shortLabel: "Components", href: "#ds-components", id: "ds-components" },
  { label: "Example screen", shortLabel: "Example", href: "#ds-app", id: "ds-app" },
]);

export function getChaptersForPath(pathname) {
  if (pathname.startsWith("/plan")) return withMeta(DELIVERY_PLAN_CHAPTERS);
  if (pathname.startsWith("/site-architecture")) return withMeta(SITE_ARCHITECTURE_CHAPTERS);
  if (pathname.startsWith("/flows")) return withMeta(REVISED_NAV);
  if (pathname.startsWith("/design-system")) return DESIGN_SYSTEM_CHAPTERS;
  if (pathname.startsWith("/inspiration")) return withMeta(INSPIRATION_NAV);
  if (pathname.startsWith("/marketing")) return withMeta(MARKETING_COLLATERAL_CHAPTERS);
  if (pathname.startsWith("/designs/ideation")) return withMeta(IDEATION_NAV);
  if (pathname.startsWith("/designs/prd")) return withMeta(PRD_DESIGNS_NAV);
  return PROJECT_SUMMARY_CHAPTERS;
}

export function getChapterScrollIds(pathname) {
  return getChaptersForPath(pathname).map((c) => c.id);
}

export function getActiveChapterLabel(chapters, activeId) {
  const match = chapters.find((c) => c.id === activeId);
  return match?.shortLabel ?? chapters[0]?.shortLabel ?? "Overview";
}
