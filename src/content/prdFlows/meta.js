export const PRD_FLOWS_META = {
  version: "1.0",
  source: "Sonocea Mobile App — Version 1.0 (draft, Nov 2025)",
  designCanvas: "Sonocea Design Phase 2 (Paper)",
};

export const PRD_ROLES = [
  {
    id: "listener",
    label: "Listener",
    surface: "Mobile app (iOS / Android)",
    summary: "Invite-only end user who redeems access, onboards, and plays provisioned Sessions only.",
  },
  {
    id: "partner",
    label: "Partner",
    surface: "Partner Console (web MVP)",
    summary: "Authorized org that provisions Listeners, assigns bundles, and exports scoped usage/billing.",
  },
  {
    id: "admin",
    label: "Admin",
    surface: "CMS + analytics dashboard (web)",
    summary: "Sonocea operators who manage content, Partners, plans, invites, and platform analytics.",
  },
  {
    id: "public",
    label: "Public visitor",
    surface: "Marketing surface (web / app shell)",
    summary: "Unauthenticated visitor — education and CTAs only; no Session playback in v1.",
  },
];

export const PROVISIONING_CHAIN = {
  title: "Admin → Partner → Listener",
  summary:
    "Access is provisioned, not marketplace-open. Listeners never see the full catalog — only entitlements their Partner (or Sonocea acting as Partner) assigned.",
  stages: [
    {
      id: "admin-config",
      label: "Admin configures",
      items: ["Partners", "Content bundles", "Rate cards & billing plans", "Session library & metadata"],
    },
    {
      id: "partner-provision",
      label: "Partner provisions",
      items: ["Listeners (email / SMS)", "Session or bundle assignment", "Scoped revoke / resend"],
    },
    {
      id: "listener-redeem",
      label: "Listener redeems",
      items: ["Invite or Partner code", "Onboarding & neurotype", "Provisioned library only"],
    },
  ],
  states: ["invited", "active", "paused", "removed"],
};

export const FLOW_CATEGORIES = [
  {
    id: "listener",
    label: "Listener · mobile",
    sectionId: "flows-listener",
    description:
      "Core PRD mobile journeys — authentication, onboarding, library, playback, offline, feedback, support, and facilitator-led use.",
  },
  {
    id: "listenerEdge",
    label: "Listener · edge cases",
    sectionId: "flows-listener-edge",
    description:
      "Error paths, security denials, access revocation, device limits, and degraded network behaviour from functional & non-functional requirements.",
  },
  {
    id: "public",
    label: "Public · marketing",
    sectionId: "flows-public",
    description: "General-public landing — SAT™ education, CTAs, mailing list; explicitly no Session playback.",
  },
  {
    id: "partner",
    label: "Partner · console",
    sectionId: "flows-partner",
    description:
      "PRD Partner Console screens — branded login, invite flows, Listener roster, usage dashboards, notifications, and billing exports.",
  },
  {
    id: "admin",
    label: "Admin · CMS & ops",
    sectionId: "flows-admin",
    description:
      "CMS upload & versioning, assignment matrix, Partner configuration, people management, analytics dashboard, and feedback repository.",
  },
  {
    id: "billing",
    label: "Billing · commercial",
    sectionId: "flows-billing",
    description:
      "Appendix A rate-card models — site license seat pool, per-seat tiers, usage-based metering, CSV export, and ~1% reconciliation.",
  },
  {
    id: "platform",
    label: "Platform · cross-cutting",
    sectionId: "flows-platform",
    description: "API auth, entitlements, analytics funnels, security hardening, privacy pathways, and observability.",
  },
  {
    id: "clinical",
    label: "Clinical · context families",
    sectionId: "flows-clinical",
    description:
      "Appendix E — seven use-case families with wireframed playback paths for listener-held and facilitator-controlled postures.",
  },
];

export const LISTENER_SCREEN_SEQUENCE = [
  { wireframeId: "splash", label: "Splash / brand intro", prd: "01" },
  { wireframeId: "login", label: "Sign-up & login", prd: "02" },
  { wireframeId: "onboarding", label: "Onboarding & science", prd: "03" },
  { wireframeId: "neurotype", label: "Neurotype questionnaire", prd: "04" },
  { wireframeId: "library", label: "Sessions library", prd: "05" },
  { wireframeId: "favorites", label: "Favorites", prd: "06" },
  { wireframeId: "detail", label: "Session detail", prd: "07" },
  { wireframeId: "player", label: "Player", prd: "08" },
  { wireframeId: "about", label: "About Sonocea", prd: "09" },
  { wireframeId: "feedback", label: "Feedback", prd: "10" },
  { wireframeId: "support", label: "Support", prd: "11" },
];

export const V1_OUT_OF_SCOPE = [
  "Direct-to-consumer open signup",
  "Household sub-profiles",
  "Gamification and multi-week regimens",
  "White-label integrations",
  "Recommendation engine",
  "Health platform / wearables integrations",
  "Listener groups and custom protocols in-app (Partner)",
  "Multiple Partner types",
  "Partner monthly auto-reports",
  "In-app referrals beyond web form",
];

export const FLOWS_NAV = [
  { label: "Overview", href: "#flows-intro" },
  { label: "Provisioning model", href: "#flows-provisioning" },
  { label: "PRD screen map", href: "#flows-listener" },
  { label: "Listener flows", href: "#flows-listener" },
  { label: "Edge cases", href: "#flows-listener-edge" },
  { label: "Public surface", href: "#flows-public" },
  { label: "Partner console", href: "#flows-partner" },
  { label: "Admin · CMS", href: "#flows-admin" },
  { label: "Billing", href: "#flows-billing" },
  { label: "Platform", href: "#flows-platform" },
  { label: "Clinical contexts", href: "#flows-clinical" },
  { label: "v1 boundaries", href: "#flows-scope" },
];
