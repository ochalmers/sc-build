/**
 * Shared workspace page rhythm — keep gutters, hero, and type aligned across routes.
 * Horizontal gutter matches SiteNav (`px-[30px]`).
 */

export const PAGE_GUTTER = "px-[30px]";
export const PAGE_CONTAINER = `max-w-content mx-auto ${PAGE_GUTTER}`;
export const PAGE_MAIN = "pt-[6.5rem]";
export const SECTION_SCROLL = "scroll-mt-[7rem]";
export const SECTION_PAD = "py-16 md:py-20";
export const HERO_PAD = "pb-14 pt-10 md:pb-16 md:pt-12";

/** Page H1 — Overview / Plan / Design baseline */
export const PAGE_TITLE =
  "max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950";

/** Section H2 — PageSection / FlowSection */
export const SECTION_TITLE =
  "max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.15] tracking-tight text-ink-950";

export const EYEBROW =
  "text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500";

export const LEDE = "mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-700";

export const SECTION_BODY = "mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-600";

/** Flows sticky rail */
export const FLOWS_SIDEBAR_W = "13.5rem";
export const FLOWS_SIDEBAR_GAP = "2rem";
