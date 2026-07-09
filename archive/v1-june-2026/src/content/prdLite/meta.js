export const PRD_LITE_META = {
  version: "1.0 LITE",
  source: "Sonocea Mobile App — Version 1.0 LITE",
  designCanvas: "Sonocea Design Phase 2 (Paper)",
};

/** Roles from PRD LITE §Definitions — Guest replaces generic “public visitor”. */
export const PRD_LITE_ROLES = [
  {
    id: "admin",
    label: "Sonocea Admin",
    surface: "Admin CMS + analytics (web)",
    summary:
      "Manages organizations, content, invites, Partner configuration, provisioning, and platform-wide usage analytics.",
  },
  {
    id: "partner",
    label: "Partner",
    surface: "Partner Console (web MVP)",
    summary:
      "Pre-authorized third party that provisions Listeners, assigns bundles, views Partner-scoped usage, and exports billing CSV.",
  },
  {
    id: "listener",
    label: "Listener",
    surface: "Mobile app (iOS / Android)",
    summary:
      "End user with provisioned access who completes onboarding, discovers Sessions, and plays securely in-app.",
  },
  {
    id: "guest",
    label: "Guest",
    surface: "Mobile app · pre-auth shell",
    summary:
      "Uninvited store visitor who can learn about Sonocea and request access — no Session playback or entitlement.",
  },
];

export const PROVISIONING_LITE = {
  title: "Admin → Organization → Listener",
  subtitle: "Partners provision within controlled pilots",
  summary:
    "Access is invited and provisioned. Listeners see only Sessions assigned at the organization or Listener level. Partners operate within Admin-granted bundles and billing plans.",
  stages: [
    {
      id: "admin-org",
      label: "Admin configures",
      items: [
        "Organizations",
        "Session library & metadata",
        "Partner bundles & billing plans",
        "Listener & Partner invites",
      ],
    },
    {
      id: "partner-pilot",
      label: "Partner provisions (pilot)",
      items: [
        "Listeners within scope",
        "Bundle assignment",
        "Scoped usage & billing export",
      ],
    },
    {
      id: "listener-onboard",
      label: "Listener redeems",
      items: [
        "Invite or Partner code",
        "First-time Listener experience",
        "Provisioned library only",
      ],
    },
  ],
  states: ["invited", "active", "paused", "removed"],
};

export const MOBILE_SCREEN_MAP_LITE = [
  { id: "01", label: "Splash and brand intro" },
  { id: "02", label: "Sign-up / login (invite or Partner code)" },
  {
    id: "03",
    label: "First-time Listener experience",
    detail: "Onboarding · neurotype questionnaire · listening instructions",
  },
  { id: "04", label: "Sessions library" },
  { id: "05", label: "Favorites" },
  { id: "06", label: "Session overview / profile" },
  { id: "07", label: "Player" },
  { id: "08", label: "About Sonocea" },
  { id: "09", label: "Feedback & support" },
];

/** Out-of-scope items from PRD LITE — excluded from stories and flows. */
export const LITE_OUT_OF_SCOPE = [
  "Direct-to-consumer open sign-up via app stores",
  "Partner user type for resellers who self-manage their userbase",
  "Household sub-profiles (for minors)",
  "Encrypted offline downloads for Sessions",
  "Gamification and multi-day / multi-week listening regimens",
  "External white-label integrations",
  "Listener recommendation engine",
  "Health platform integrations and wearables",
  "In-app referrals beyond a simple web form link",
  "Session groups beyond neurotype (genre, mood, etc.)",
  "Multiple types of Partners",
  "Partner monthly auto-generated usage reports",
  "Partner custom instructions / protocols surfaced in-app",
  "Partner-created Listener groups for regimens",
];

export const LITE_SUCCESS_CRITERIA = [
  "Admins can create, modify, and delete an organization",
  "Admins can invite and manage Listeners and assign them to an organization",
  "Admins can provision Sessions at organization or Listener level",
  "Partners can provision, manage, and track access for their Listeners",
  "Listeners can download the app, self-onboard, and play Sessions seamlessly",
  "Content is never accessible outside the app",
  "Analytics surface invite acceptance, listening habits, completion, and Partner-linked billing data",
  "Near real-time usage at Partner and Listener levels",
  "In-app feedback mechanism for Listener-driven triggers and app events",
];

export const STORIES_NAV = [
  { label: "Overview", href: "#lite-intro" },
  { label: "Success criteria", href: "#stories-success" },
  { label: "Roles", href: "#stories-roles" },
  { label: "Provisioning model", href: "#stories-provisioning" },
  { label: "Mobile screen map", href: "#stories-screens" },
  { label: "Admin stories", href: "#stories-admin" },
  { label: "Partner stories", href: "#stories-partner" },
  { label: "Listener stories", href: "#stories-listener" },
  { label: "Guest stories", href: "#stories-guest" },
  { label: "Functional flows", href: "#stories-flows" },
  { label: "Analytics & billing", href: "#stories-analytics" },
  { label: "v1 boundaries", href: "#stories-scope" },
];
