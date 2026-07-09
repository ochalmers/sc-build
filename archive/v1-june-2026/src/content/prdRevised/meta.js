export const PRD_REVISED_META = {
  mobile: {
    title: "Sonocea® Mobile App v1.0",
    version: "1.0 [REVISED]",
    status: "Draft for internal review",
    author: "Ryan Schmaltz",
    lastUpdated: "June 28, 2026",
    source: "Sonocea Mobile App PRD (revised) · June 28, 2026",
  },
  publicVisitor: {
    title: "Public Visitor",
    status: "Draft for internal review",
    author: "Ryan Schmaltz",
    lastUpdated: "June 28, 2026",
    source: "Sonocea PRD — Public Visitor · June 28, 2026",
  },
  designCanvas: "Sonocea Design Phase 2 (Paper)",
};

export const PRD_RELATIONSHIP = {
  title: "How these PRDs fit together",
  summary:
    "The revised Mobile App v1.0 PRD defines the provisioned Listener, Partner, and Admin experience. The Public Visitor PRD is a companion document that replaces the earlier “marketing-only, no playback” public shell with a curated first-time experience — including a single non-clinical listening sample.",
  points: [
    {
      label: "Mobile App v1.0 [REVISED]",
      body: "Invite-only Listener app, Partner Console, Admin CMS, billing, analytics, and content security. Splash defers to the Public Visitor PRD for unauthenticated users.",
    },
    {
      label: "Public Visitor PRD",
      body: "Discover Sonocea path for store downloads before organizational verification — education, 5-minute nervous system reset, science content, and access-request capture.",
    },
    {
      label: "Entry routing",
      body: "Layer 0 Get Started: Discover Sonocea · Accept Invitation · Login. Invitation and Login bypass the public experience after authentication.",
    },
    {
      label: "Prior PRD delta",
      body: "Nov 2025 v1.0 positioned public visitors as education-only with no Session playback. June 2026 revision adds one curated listening sample, check-in/reflection sliders, and a returning-visitor home — while still protecting licensed protocols.",
    },
  ],
};

export const PRD_REVISED_ROLES = [
  {
    id: "publicVisitor",
    label: "Public Visitor",
    surface: "Mobile app · unauthenticated",
    prd: "Public Visitor PRD",
    summary:
      "Downloaded the app without a direct or organizational invitation. Can discover Sonocea, complete one curated sample, browse science content, and request access.",
  },
  {
    id: "invitedParticipant",
    label: "Invited Participant",
    surface: "Mobile app · pre-auth",
    prd: "Public Visitor PRD",
    summary:
      "Received an invitation from Sonocea or an organization affiliate but has not yet signed up or authenticated. May preview public content before activating.",
  },
  {
    id: "listener",
    label: "Listener",
    surface: "Mobile app (iOS / Android)",
    prd: "Mobile App v1.0 [REVISED]",
    summary:
      "Authenticated end user with provisioned Sessions — onboarding, neurotype alignment, library, player, feedback, and support.",
  },
  {
    id: "partner",
    label: "Partner / Organization",
    surface: "Partner Console (web MVP)",
    prd: "Mobile App v1.0 [REVISED]",
    summary:
      "Organization that Listeners affiliate with. Notifies Admin for distribution; views scoped usage for billing reconciliation.",
  },
  {
    id: "admin",
    label: "Sonocea Admin",
    surface: "CMS + analytics dashboard (web)",
    prd: "Both PRDs",
    summary:
      "Manages content, Partners, invites, entitlements, public-visitor analytics, and platform billing.",
  },
];

export const PUBLIC_DESIGN_PRINCIPLES = [
  "Experience before explanation.",
  "Calm, premium, and scientifically credible.",
  "Minimize friction.",
  "Protect licensed protocols.",
  "Every screen should move the user toward trust.",
];

export const PUBLIC_GOLDEN_ROUTE = [
  { id: "welcome", label: "Welcome" },
  { id: "check-in", label: "Check-in with yourself" },
  { id: "headphones", label: "Headphones prompt" },
  { id: "reset", label: "5-minute nervous system reset" },
  { id: "reflection", label: "Reflection" },
  { id: "experienced", label: "What you just experienced" },
  { id: "science", label: "Explore the science" },
  { id: "register", label: "Register interest / light sign-up" },
];

export const PUBLIC_JOURNEY_LAYERS = [
  {
    id: "layer-0",
    label: "Layer 0 · Get Started",
    items: [
      "Discover Sonocea → public first-time journey",
      "Accept Invitation → brief intro → sign-up flow",
      "Login → authentication to organization member area",
    ],
  },
  {
    id: "layer-1",
    label: "Layer 1 · Discover Sonocea",
    items: [
      "Nervous system check-in sliders (stress, energy, focus, restfulness)",
      "Headphones and environment prompt",
      "5-minute nervous system reset",
      "Post-session reflection (remeasure sliders)",
    ],
  },
  {
    id: "layer-2",
    label: "Layer 2 · How Sonocea Works",
    items: [
      "Autonomic nervous system · sound and physiology",
      "Sonic Augmentation Technology™ · Sonostasis®",
      "Use cases · HRV · clinical research",
      "How this is different · Our Story",
    ],
  },
  {
    id: "layer-3",
    label: "Layer 3 · Register Interest",
    items: [
      "Stay in the loop / mailing list",
      "Access request for self or organization",
      "Light individual-level sign-up (TBD)",
    ],
  },
  {
    id: "layer-4",
    label: "Layer 4 · Returning Public Visitor",
    items: [
      "Daily reset experience with check-in",
      "Science · Research · Applications · Our Story",
      "Light authentication required to replay 5-minute reset (FR-006)",
    ],
  },
];

export const PUBLIC_PERSISTENT_NAV = [
  "Home",
  "Daily Reset",
  "Science",
  "Research",
  "Applications",
  "Our Story",
  "Request Access",
];

export const PUBLIC_SCREEN_CHECKLIST = [
  { id: "splash", label: "Splash" },
  { id: "get-started", label: "Get Started", wireframeId: "pv-get-started" },
  { id: "check-in", label: "Check-In", wireframeId: "pv-check-in" },
  { id: "headphones", label: "Headphone Prompt", wireframeId: "pv-headphones" },
  { id: "listening", label: "Listening Session", wireframeId: "pv-listening" },
  { id: "reflection", label: "Reflection", wireframeId: "pv-reflection" },
  { id: "how-works", label: "How Sonocea Works", wireframeId: "pv-science-home" },
  { id: "science-home", label: "Science Home", wireframeId: "pv-science-home" },
  { id: "topic-detail", label: "Topic Detail", wireframeId: "pv-topic-detail" },
  { id: "applications", label: "Applications", wireframeId: "pv-topic-detail" },
  { id: "our-story", label: "Our Story", wireframeId: "pv-topic-detail" },
  { id: "request-access", label: "Request Access", wireframeId: "pv-request-access" },
  { id: "login", label: "Login", wireframeId: "login" },
  { id: "invitation", label: "Invitation", wireframeId: "pv-invitation" },
  { id: "returning-home", label: "Returning User Home", wireframeId: "pv-returning-home" },
];

export const MOBILE_SCREEN_MAP_REVISED = [
  { id: "01", label: "Splash and brand intro", note: "See Public Visitor PRD for non-authenticated path" },
  { id: "02", label: "Sign-up, login with invite link or pre-registered email" },
  { id: "03", label: "Onboarding and science education" },
  { id: "04", label: "Neurotype questionnaire" },
  { id: "05", label: "Sonocea Sessions library" },
  { id: "06", label: "Sonocea Favorites" },
  { id: "07", label: "Session overview / profile" },
  { id: "08", label: "Player" },
  { id: "09", label: "About Sonocea" },
  { id: "10", label: "Feedback" },
  { id: "11", label: "Support" },
];

export const MOBILE_SUCCESS_CRITERIA = [
  "Admins can invite and manage users and content access",
  "Users can self-onboard, understand what to listen to, and play sessions seamlessly",
  "Content is never accessible outside the app and cannot be shared or extracted",
  "Analytics dashboard surfaces invite acceptance, listening habits, completion, device metadata, and Organization-linked usage for billing",
  "Real-time usage at Organization and Listener levels for billing and product insights",
  "In-app feedback mechanism for Listener-driven triggers and app events",
];

export const PUBLIC_SUCCESS_CRITERIA = [
  "60%+ of public visitors complete the 5-minute experience",
  "40%+ explore at least one science page",
  "20%+ submit an access request or join updates",
  "30%+ return within 7 days",
  "Average App Store rating ≥ 4.5",
];

export const PUBLIC_FUNCTIONAL_REQUIREMENTS = [
  { id: "FR-001", text: "Public visitors may access Discover Sonocea without authentication." },
  { id: "FR-002", text: "Users may complete one curated listening session." },
  { id: "FR-003", text: "No licensed protocols are accessible to unauthenticated users." },
  { id: "FR-004", text: "Users may browse educational content without signing in." },
  { id: "FR-005", text: "Users may submit an access request for themselves or their organization." },
  {
    id: "FR-006",
    text: "Returning visitors resume at Public Home but must lightly authenticate to replay the 5-minute reset.",
  },
  { id: "FR-007", text: "Invitation and Login bypass the public experience after authentication." },
];

export const PUBLIC_ANALYTICS_EVENTS = [
  "app_installed",
  "discover_selected",
  "invitation_selected",
  "login_selected",
  "check_in_started",
  "five_minute_session_started",
  "five_minute_session_completed",
  "reflection_submitted",
  "science_article_viewed",
  "request_access_submitted",
  "return_visit",
  "return_visit_frequency",
];

export const PUBLIC_ERROR_STATES = [
  "No internet",
  "Audio unavailable",
  "Session interrupted",
  "Login failure (see Mobile App v1 PRD)",
  "Invitation expired (see Mobile App v1 PRD)",
];

export const REVISED_OUT_OF_SCOPE = [
  "Direct-to-consumer open sign-up via app stores (except Public Visitor light sign-up path)",
  "Partners inviting and managing their own Listeners",
  "Household sub-profiles (for minors)",
  "Gamification and multi-day / multi-week regimens or protocols",
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

export const PUBLIC_FUTURE_EXPLORATION = [
  "Push notifications for session drops and protocol reminders",
  "Advanced B2C account sign-up and authentication",
  "Multiple sessions and multi-session listening protocols",
  "In-app purchases / subscription",
  "Account management features",
  "Community of clinicians",
  "Personalized listening protocols",
];

export const CLINICAL_USE_CASE_FAMILIES = [
  {
    id: "regulation",
    name: "Regulation Companion",
    primary: "Therapists in-session",
    endUser: "Clients (Listener)",
    implication: "Low-friction playback; ~15 min sessions; clear arrive / settle / access labels.",
  },
  {
    id: "inner-balance",
    name: "Inner Balance",
    primary: "Therapists (Partner & Listener same)",
    endUser: "Therapists themselves",
    implication: "Therapist-only bundles; self-care framing between appointments.",
  },
  {
    id: "pre-procedure",
    name: "Pre-Procedure & Treatment Suites",
    primary: "Hospitals and medical teams",
    endUser: "Patients undergoing procedures or oncology",
    implication: "Phase-of-care groupings; 10–45+ min; hands-free controls; poor-network resilience.",
  },
  {
    id: "therapist-resource",
    name: "Therapist Resource Platform",
    primary: "Therapists and helping professionals",
    endUser: "Therapist, optionally clients",
    implication: "Partner bundles mixing self-care and shareable client content; state menus.",
  },
  {
    id: "neurodivergent",
    name: "Neurodivergent Series",
    primary: "Parents, schools, clinicians, caregivers",
    endUser: "Children, adolescents, adults",
    implication: "Age bands, neurotype, support level labeling; 15 and 30 min formats.",
  },
  {
    id: "comfort",
    name: "Comfort and Transition Suite",
    primary: "Palliative and hospice teams",
    endUser: "Palliative / end-of-life patients and families",
    implication: "Ultra-slow programs; long/continuous playback; minimal screen interaction.",
  },
  {
    id: "postpartum",
    name: "Postpartum Bond and Regulation Suite",
    primary: "New mothers and birthing parents",
    endUser: "Mother plus infant and caregivers",
    implication: "Feeding, skin-to-skin, NICU contexts; one-hand operation; sleep-deprived UX.",
  },
];

export const REVISED_NAV = [
  { label: "Overview", shortLabel: "Overview", href: "#revised-intro" },
  { label: "1 · Surfaces", shortLabel: "Surfaces", href: "#revised-surfaces" },
  { label: "2 · User stories", shortLabel: "Stories", href: "#revised-stories" },
  { label: "3 · UX flows", shortLabel: "Flows", href: "#revised-flows" },
  { label: "4 · Screens", shortLabel: "Screens", href: "#revised-screens" },
  { label: "Reference", shortLabel: "Reference", href: "#revised-reference" },
];
