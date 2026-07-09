/** Key screen catalogue — Phase 3/4 wireframe scope with triple version slots. */

export const VERSION_LABELS = ["PRD", "PRD Lite", "Design"];

/**
 * @typedef {{ label: string; wireframeId?: string; placeholder?: string }} KeyScreenVariant
 * @typedef {{ id: string; num?: string; title: string; purpose?: string; states?: string[]; variants: KeyScreenVariant[] }} KeyScreenEntry
 * @typedef {{ id: string; label: string; title: string; description?: string; screens: KeyScreenEntry[] }} KeyScreenSection
 */

/** @type {KeyScreenSection[]} */
export const LISTENER_SCREENS = [
  {
    id: "splash",
    num: "01",
    title: "Splash / Launch",
    purpose: "Brand introduction · loading state",
    states: ["Light", "Dark"],
    variants: [
      { label: "Light", wireframeId: "splash" },
      { label: "Dark", wireframeId: "splash-dark" },
      { label: "Design", placeholder: "Motion / video treatment" },
    ],
  },
  {
    id: "welcome",
    num: "02",
    title: "Welcome",
    purpose: "Explain Sonocea · learn more · enter invite",
    states: ["Guest", "Invited user"],
    variants: [
      { label: "Guest", wireframeId: "welcome-guest" },
      { label: "Invited", wireframeId: "welcome-invited" },
      { label: "Design", placeholder: "Hero + CTA layout" },
    ],
  },
  {
    id: "invite",
    num: "03",
    title: "Invite / Access Code",
    purpose: "Redeem access",
    states: ["Empty", "Valid", "Invalid", "Expired"],
    variants: [
      { label: "Empty", wireframeId: "invite-empty" },
      { label: "Valid", wireframeId: "invite-valid" },
      { label: "Invalid", wireframeId: "invite-invalid" },
    ],
  },
  {
    id: "onboarding-intro",
    num: "04",
    title: "Onboarding Introduction",
    purpose: "What is Sonocea? · how it works (2–3 screens)",
    variants: [
      { label: "Screen 1", wireframeId: "onboarding" },
      { label: "Screen 2", wireframeId: "onboarding-step2" },
      { label: "Screen 3", wireframeId: "onboarding-intro-3" },
    ],
  },
  {
    id: "neurotype",
    num: "05",
    title: "Neurotype Assessment",
    purpose: "Listener profiling",
    states: ["Question", "Progress", "Complete"],
    variants: [
      { label: "Question", wireframeId: "neurotype" },
      { label: "Progress", wireframeId: "neurotype-progress" },
      { label: "Complete", wireframeId: "neurotype-complete" },
    ],
  },
  {
    id: "listening-guidance",
    num: "06",
    title: "Listening Guidance",
    purpose: "How to get best results — headphones, environment, duration",
    variants: [
      { label: "PRD", wireframeId: "listening-guidance" },
      { label: "PRD Lite", wireframeId: "listening-guidance" },
      { label: "Design", placeholder: "Illustrated tips" },
    ],
  },
  {
    id: "recommended-profile",
    num: "07",
    title: "Recommended Profile",
    purpose: 'Present outcome — "You appear to align most closely with…"',
    variants: [
      { label: "PRD", wireframeId: "recommended-profile" },
      { label: "PRD Lite", wireframeId: "recommended-profile" },
      { label: "Design", placeholder: "Profile card + CTA" },
    ],
  },
  {
    id: "library",
    num: "08",
    title: "Library",
    purpose: "Discover sessions",
    states: ["Default", "Filtered", "Search results", "Empty"],
    variants: [
      { label: "Default", wireframeId: "library" },
      { label: "Filtered / search", wireframeId: "library-filter" },
      { label: "Empty", wireframeId: "library-empty" },
    ],
  },
  {
    id: "session-detail",
    num: "09",
    title: "Session Detail",
    purpose: "Title, description, duration, benefits, audience, preview",
    states: ["Available", "Downloaded", "Assigned", "Removed"],
    variants: [
      { label: "Available", wireframeId: "detail" },
      { label: "Downloaded", wireframeId: "detail-downloaded" },
      { label: "Assigned / removed", wireframeId: "detail-assigned" },
    ],
  },
  {
    id: "player",
    num: "10",
    title: "Player",
    purpose: "Listening experience",
    states: ["Idle", "Playing", "Paused", "Completed", "Background"],
    variants: [
      { label: "Playing", wireframeId: "player" },
      { label: "Paused / idle", wireframeId: "player-paused" },
      { label: "Completed / bg", wireframeId: "player-completed" },
    ],
  },
  {
    id: "favorites",
    num: "11",
    title: "Favorites",
    purpose: "Saved sessions",
    states: ["Empty", "Populated"],
    variants: [
      { label: "Populated", wireframeId: "favorites" },
      { label: "Empty", wireframeId: "favorites-empty" },
      { label: "Design", placeholder: "Saved list layout" },
    ],
  },
  {
    id: "feedback",
    num: "12",
    title: "Feedback",
    purpose: "Reflection after Session",
    states: ["Rating", "Comment", "Submitted"],
    variants: [
      { label: "Rating", wireframeId: "feedback-rating" },
      { label: "Comment", wireframeId: "feedback" },
      { label: "Submitted", wireframeId: "feedback-submitted" },
    ],
  },
  {
    id: "about",
    num: "13",
    title: "About",
    purpose: "Company · science · policies",
    variants: [
      { label: "PRD", wireframeId: "about" },
      { label: "PRD Lite", wireframeId: "about" },
      { label: "Design", placeholder: "Policy links + SAT™" },
    ],
  },
];

/** @type {KeyScreenSection} */
export const PARTNER_SCREENS = {
  id: "partner",
  label: "Partner",
  title: "Partner screens",
  description: "Minimal console surfaces — invite, roster, and activation metrics.",
  screens: [
    {
      id: "partner-login",
      title: "Partner Login",
      variants: [
        { label: "PRD", wireframeId: "partner-login" },
        { label: "PRD Lite", wireframeId: "partner-login" },
        { label: "Design", placeholder: "Branded login" },
      ],
    },
    {
      id: "partner-dashboard",
      title: "Partner Dashboard",
      purpose: "Metrics: Invited · Activated · Listening",
      variants: [
        { label: "PRD", wireframeId: "partner-dashboard" },
        { label: "PRD Lite", wireframeId: "partner-usage" },
        { label: "Design", placeholder: "Dashboard layout" },
      ],
    },
    {
      id: "partner-invite",
      title: "Invite Listener",
      variants: [
        { label: "PRD", wireframeId: "partner-invite" },
        { label: "PRD Lite", wireframeId: "partner-invite" },
        { label: "Design", placeholder: "Invite form" },
      ],
    },
    {
      id: "partner-listeners",
      title: "Listener List",
      variants: [
        { label: "PRD", wireframeId: "partner-listeners" },
        { label: "PRD Lite", wireframeId: "partner-listeners" },
        { label: "Design", placeholder: "Roster table" },
      ],
    },
  ],
};

/** @type {KeyScreenSection} */
export const ADMIN_SCREENS = {
  id: "admin",
  label: "Admin",
  title: "Admin screens",
  description: "Session management, listener operations, and basic analytics.",
  screens: [
    {
      id: "session-mgmt",
      title: "Session Management",
      purpose: "Upload · edit · archive",
      variants: [
        { label: "Upload", wireframeId: "admin-upload" },
        { label: "Edit", wireframeId: "admin-session-edit" },
        { label: "Archive", wireframeId: "admin-archive" },
      ],
    },
    {
      id: "listener-mgmt",
      title: "Listener Management",
      purpose: "Invite · remove · assign",
      variants: [
        { label: "PRD", wireframeId: "admin-listener-mgmt" },
        { label: "Assign", wireframeId: "admin-assign" },
        { label: "Invites", wireframeId: "admin-invites" },
      ],
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      purpose: "Basic ops metrics only",
      variants: [
        { label: "PRD", wireframeId: "admin-dashboard" },
        { label: "PRD Lite", wireframeId: "admin-dashboard" },
        { label: "Design", placeholder: "Charts + exports" },
      ],
    },
  ],
};

export const SESSION_ARTWORK = {
  categories: [
    {
      id: "care",
      label: "Care",
      tone: "Soft warm colours",
      sessions: ["Hospital Preparation", "Recovery", "Pregnancy", "Rest"],
    },
    {
      id: "regulation",
      label: "Regulation",
      tone: "Balanced neutral colours",
      sessions: ["Calm", "Reset", "Overwhelm", "Anxiety"],
    },
    {
      id: "performance",
      label: "Performance",
      tone: "Sharper, energetic colours",
      sessions: ["Focus", "Flow", "Deep Work", "Preparation"],
    },
  ],
};

/** @type {KeyScreenSection} */
export const UI_STATES = {
  id: "states",
  label: "States",
  title: "Empty · loading · error · success",
  description: "Dedicated reference section — most important for implementation handoff.",
  screens: [
    {
      id: "empty-states",
      title: "Empty states",
      states: ["No sessions", "No favorites", "No assignments"],
      variants: [
        { label: "No sessions", wireframeId: "library-empty" },
        { label: "No favorites", wireframeId: "favorites-empty" },
        { label: "No assignments", wireframeId: "empty-assignments" },
      ],
    },
    {
      id: "loading-states",
      title: "Loading states",
      states: ["Library", "Player", "Session detail"],
      variants: [
        { label: "Library", wireframeId: "library-loading" },
        { label: "Player", wireframeId: "player-loading" },
        { label: "Session detail", wireframeId: "detail-loading" },
      ],
    },
    {
      id: "error-states",
      title: "Error states",
      states: ["Invite invalid", "Network issue", "Session unavailable"],
      variants: [
        { label: "Invite invalid", wireframeId: "invite-invalid" },
        { label: "Network", wireframeId: "error-network" },
        { label: "Unavailable", wireframeId: "error-session-unavailable" },
      ],
    },
    {
      id: "success-states",
      title: "Success states",
      states: ["Invite redeemed", "Profile completed", "Session completed", "Feedback submitted"],
      variants: [
        { label: "Invite redeemed", wireframeId: "success-invite" },
        { label: "Profile complete", wireframeId: "neurotype-complete" },
        { label: "Feedback submitted", wireframeId: "feedback-submitted" },
      ],
    },
  ],
};

/** @type {KeyScreenSection} */
export const THEME_REFERENCES = {
  id: "themes",
  label: "Themes",
  title: "Dark primary · light references",
  description:
    "Design fully in dark mode. Light mode reference screens for Library, Session Detail, and Player only.",
  screens: [
    {
      id: "theme-library",
      title: "Library · light",
      variants: [
        { label: "Dark (primary)", wireframeId: "library" },
        { label: "Light ref", wireframeId: "library-light" },
        { label: "Design", placeholder: "Light tokens" },
      ],
    },
    {
      id: "theme-detail",
      title: "Session Detail · light",
      variants: [
        { label: "Dark (primary)", wireframeId: "detail" },
        { label: "Light ref", wireframeId: "detail-light" },
        { label: "Design", placeholder: "Light tokens" },
      ],
    },
    {
      id: "theme-player",
      title: "Player · light",
      variants: [
        { label: "Dark (primary)", wireframeId: "player" },
        { label: "Light ref", wireframeId: "player-light" },
        { label: "Design", placeholder: "Light tokens" },
      ],
    },
  ],
};

export const PROTOTYPE_FLOW = [
  { step: "Onboarding", wireframeId: "onboarding" },
  { step: "Library", wireframeId: "library" },
  { step: "Session Detail", wireframeId: "detail" },
  { step: "Player", wireframeId: "player" },
  { step: "Feedback", wireframeId: "feedback" },
];

export const DELIVERABLES_SUMMARY = [
  { label: "Listener", count: "13 screens" },
  { label: "Partner", count: "4 screens" },
  { label: "Admin", count: "3–4 screens" },
  { label: "Session artwork", count: "12 covers" },
  { label: "Design system", count: "Buttons · inputs · cards · nav · player" },
  { label: "States", count: "Loading · empty · success · error" },
  { label: "Themes", count: "Dark + light refs" },
  { label: "Prototype", count: "Onboarding → Library → Detail → Player → Feedback" },
];
