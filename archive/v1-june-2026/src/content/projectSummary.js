import { PRD_REVISED_META } from "./prdRevised/meta.js";

export const PROJECT_SUMMARY_META = {
  programme: "Sonocea Design Phase 2",
  prdDate: "June 28, 2026",
  designCanvas: "Paper · microsite",
};

export const PROGRAMME_RESET = {
  title: "June 2026 programme reset",
  summary:
    "Leadership reprioritised v1 around two companion PRDs. The Public Visitor experience is no longer a marketing-only shell — it is a curated first-time journey with a single listening sample. The Mobile App PRD continues to define provisioned Listener, Partner, and Admin surfaces.",
  changes: [
    "Public Visitor PRD — discover journey, 5-minute sample, science content, access requests",
    "Mobile App v1.0 [REVISED] — invite-only listener app, CMS, Partner Console, billing",
    "Pre-reset foundations (design system, marketing, site architecture) remain reference material",
  ],
};

export const PROJECT_SUMMARY_SECTIONS = [
  {
    id: "summary-intro",
    label: "Overview",
    title: "Sonocea product design programme",
    description:
      "Internal workspace for the June 2026 PRDs — flows and hi-fi designs. Start with the two PRDs below.",
    body: [
      "Everything on this site is organised around the Public Visitor PRD and the Mobile App v1.0 [REVISED] PRD (Ryan Schmaltz, 28 June 2026). Earlier Nov 2025 assumptions — including a public shell with no playback — are superseded.",
    ],
    prdHub: true,
  },
  {
    id: "summary-prds",
    label: "The two PRDs",
    title: "Source of truth",
    description: "Companion documents that define v1 product behaviour.",
    cards: [
      {
        role: "Public Visitor",
        surface: "Unauthenticated app experience",
        summary:
          "Discover Sonocea, nervous-system check-in, one curated 5-minute sample, science education, and register interest — before organisational verification.",
        prd: PRD_REVISED_META.publicVisitor.source,
      },
      {
        role: "Mobile App v1.0",
        surface: "Provisioned product",
        summary:
          "Invite-only Listener app, Partner Console, Admin CMS, secure playback, analytics, and billing — Admin → Partner → Listener provisioning.",
        prd: PRD_REVISED_META.mobile.source,
      },
    ],
  },
  {
    id: "summary-reset",
    label: "Programme context",
    title: PROGRAMME_RESET.title,
    description: PROGRAMME_RESET.summary,
    bullets: PROGRAMME_RESET.changes.map((detail) => ({ detail })),
  },
  {
    id: "summary-roles",
    label: "Roles",
    title: "Who uses what",
    description: "Five roles across both PRDs — Public Visitor is new and explicit.",
    cards: [
      {
        role: "Public Visitor",
        surface: "Mobile · unauthenticated",
        summary: "Store download before org verification. One curated sample, science, access request.",
      },
      {
        role: "Listener",
        surface: "Mobile · provisioned",
        summary: "Redeems invite, onboards, plays assigned Sessions only.",
      },
      {
        role: "Partner",
        surface: "Partner Console (web)",
        summary: "Provisions listeners via Admin; scoped usage and billing.",
      },
      {
        role: "Admin",
        surface: "CMS + analytics (web)",
        summary: "Content, partners, invites, public-visitor analytics, billing.",
      },
    ],
  },
  {
    id: "summary-foundations",
    label: "Foundations",
    title: "Pre-reset reference work",
    description:
      "Design system, marketing collateral, and site architecture were built before the June reset. They remain useful reference — especially tokens, components, and brand direction — but product flows follow the revised PRDs.",
    links: [
      { label: "Design system", to: "/design-system", note: "Tokens, modes, components" },
      { label: "Marketing", to: "/marketing", note: "Collateral and launch assets" },
      { label: "Site architecture", to: "/site-architecture", note: "Marketing website IA (may need refresh)" },
      { label: "Inspiration", to: "/inspiration", note: "Reference board" },
    ],
  },
  {
    id: "summary-workspace",
    label: "This workspace",
    title: "How to use the site",
    description: "Five primary sections — no nested menus.",
    bullets: [
      { term: "Flows", detail: "PRD catalogue — user stories, wireframes, and functional flows for both PRDs." },
      { term: "Design", detail: "Hi-fi screens mapped to Public Visitor and Mobile App journeys." },
      { term: "Plan", detail: "Delivery timeline, phase milestones, and phase gates." },
      { term: "Foundations", detail: "Design system, marketing, and site architecture from earlier in the programme." },
    ],
  },
];
