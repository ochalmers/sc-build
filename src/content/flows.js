/**
 * Flows page content - listener-led MVP journeys (organisation-assigned model).
 * Every step with a screenKey maps to a wireframe preview in the storyboard.
 */

export const FLOWS_HERO = {
  eyebrow: "UX Review · July 2026",
  title: "Application Flows",
  intro:
    "Invite-only, organisation-led listener journeys - from invitation through programme progress. Use the left navigation to jump between flows.",
};

/** MVP bottom navigation for the provisioned listener app. */
export const LISTENER_MVP_NAV = [
  { id: "library", label: "Library", path: "/app/listener/library" },
  { id: "home", label: "Home", path: "/app/listener/home" },
  { id: "profile", label: "Me", path: "/app/listener/profile" },
];

/**
 * @typedef {{ label: string, screenKey?: string }} FlowStep
 * @typedef {{
 *   id: string,
 *   number?: string,
 *   title: string,
 *   purpose?: string,
 *   audience?: 'listener' | 'partner' | 'system' | 'all',
 *   appPath?: string,
 *   steps: FlowStep[],
 * }} FlowSection
 */

/** @type {FlowSection[]} */
export const FLOW_SECTIONS = [
  {
    id: "invitation-authentication",
    number: "01",
    title: "Invitation & Authentication",
    purpose: "Securely onboard invited listeners from a partner organisation.",
    audience: "listener",
    appPath: "/app/listener/email",
    appSteps: [
      { label: "Invitation email", path: "/app/listener/email" },
      { label: "App Store", path: "/app/listener/app-store" },
      { label: "Welcome", path: "/app/listener/invite" },
      { label: "Sign in", path: "/app/listener/login" },
    ],
    steps: [
      { label: "Organisation sends invitation", screenKey: "partner-invite" },
      { label: "Invitation email" },
      { label: "App Store download" },
      { label: "Welcome", screenKey: "pv-invitation" },
      { label: "Create Password / Login", screenKey: "login-create" },
      { label: "Account Verification", screenKey: "login" },
      { label: "Authentication Complete", screenKey: "auth-success" },
      { label: "Continue to Onboarding" },
    ],
  },
  {
    id: "first-time-experience",
    number: "02",
    title: "First-Time Experience",
    purpose:
      "Welcome → understand Sonocea → personalise (goal, moment, sensitivity, time, reminders) → appearance → prepare → invite to listen.",
    audience: "listener",
    appPath: "/app/listener/onboarding?phase=loading",
    appSteps: [
      { label: "Loading", path: "/app/listener/onboarding?phase=loading" },
      { label: "Welcome + preferred name", path: "/app/listener/onboarding?phase=welcome" },
      { label: "Welcome bridge", path: "/app/listener/onboarding?phase=welcome-bridge" },
      { label: "About Sonocea", path: "/app/listener/onboarding?phase=about" },
      { label: "Learn more about you", path: "/app/listener/onboarding?phase=personalise-intro" },
      { label: "What they want", path: "/app/listener/onboarding?phase=outcomes" },
      { label: "When they might use it", path: "/app/listener/onboarding?phase=context" },
      { label: "Sensory sensitivity", path: "/app/listener/onboarding?phase=sensory" },
      { label: "Listening time", path: "/app/listener/onboarding?phase=timing" },
      { label: "Notifications", path: "/app/listener/onboarding?phase=notifications" },
      { label: "Appearance", path: "/app/listener/onboarding?phase=appearance" },
      { label: "Preparing your first session", path: "/app/listener/onboarding?phase=preparing" },
      { label: "Ready to listen", path: "/app/listener/onboarding?phase=ready" },
    ],
    steps: [
      { label: "Opening experience", screenKey: "onboarding" },
      { label: "Welcome + preferred name", screenKey: "onboarding" },
      { label: "Welcome bridge", screenKey: "onboarding" },
      { label: "A different kind of listening", screenKey: "onboarding-intro" },
      { label: "Designed for different moments", screenKey: "onboarding-2" },
      { label: "Built on science", screenKey: "onboarding" },
      { label: "Nothing to learn. Just listen.", screenKey: "onboarding" },
      { label: "Now let’s learn more about you", screenKey: "onboarding" },
      { label: "What they want", screenKey: "neurotype" },
      { label: "When they might use it", screenKey: "neurotype" },
      { label: "Sensory sensitivity", screenKey: "neurotype" },
      { label: "Listening time", screenKey: "neurotype" },
      { label: "Notifications", screenKey: "neurotype" },
      { label: "Choose appearance", screenKey: "neurotype" },
      { label: "Preparing your first session", screenKey: "onboarding-complete" },
      { label: "Ready to listen", screenKey: "onboarding" },
      { label: "First session or Home", screenKey: "home" },
    ],
  },
  {
    id: "home",
    number: "03",
    title: "Home",
    purpose: "Provide a personalised overview of the listener’s assigned programme.",
    audience: "listener",
    appPath: "/app/listener/home",
    steps: [
      { label: "Home", screenKey: "home" },
      { label: "Continue Listening", screenKey: "home-continue" },
      { label: "Upcoming Sessions", screenKey: "home" },
      { label: "View Programme", path: "/app/listener/programme" },
      { label: "Recommended Next Session", screenKey: "home-recommend" },
      { label: "Programme Progress", screenKey: "home-progress" },
      { label: "Recent Activity", screenKey: "home-activity" },
      { label: "Navigate to Session", screenKey: "detail" },
    ],
  },
  {
    id: "assigned-programme",
    number: "04",
    title: "Assigned Programme",
    purpose: "Allow listeners to browse the full programme in list or calendar view.",
    audience: "listener",
    appPath: "/app/listener/programme",
    steps: [
      { label: "Programme", path: "/app/listener/programme" },
      { label: "List view", path: "/app/listener/programme" },
      { label: "Calendar view", path: "/app/listener/programme" },
      { label: "About Sonocea", path: "/app/listener/programme" },
      { label: "Your programme", path: "/app/listener/programme" },
      { label: "Select Session", screenKey: "detail-overview" },
      { label: "Session Detail", screenKey: "detail" },
    ],
  },
  {
    id: "session-journey",
    number: "05",
    title: "Session Journey",
    purpose: "Prepare the listener before playback begins.",
    audience: "listener",
    appPath: "/app/listener/session/ses-arrive",
    steps: [
      { label: "Session Detail", screenKey: "detail" },
      { label: "Session Information", screenKey: "detail-overview" },
      { label: "Expected Benefits", screenKey: "detail-available" },
      { label: "Tags & cues", screenKey: "detail" },
      { label: "Preparation Guidance", screenKey: "guidance" },
      { label: "Before check-in", path: "/app/listener/check-in/ses-arrive" },
      { label: "Start Session", screenKey: "detail-available" },
      { label: "Loading", screenKey: "system-loading" },
      { label: "Player", screenKey: "player-idle" },
    ],
  },
  {
    id: "playback-experience",
    number: "06",
    title: "Playback Experience",
    purpose: "Deliver the listening experience with minimal distraction.",
    audience: "listener",
    appPath: "/app/listener/player/ses-arrive",
    steps: [
      { label: "Player", screenKey: "player-idle" },
      { label: "Playing", screenKey: "player" },
      { label: "Pause", screenKey: "player-paused" },
      { label: "Resume", screenKey: "player" },
      { label: "Background Playback", screenKey: "player-background" },
      { label: "Playback Complete", screenKey: "player-completed" },
      { label: "Session Complete", screenKey: "completion" },
    ],
  },
  {
    id: "reflection-completion",
    number: "07",
    title: "Reflection & Completion",
    purpose: "Capture before/after wellbeing check-ins and encourage continued engagement.",
    audience: "listener",
    appPath: "/app/listener/feedback/ses-arrive",
    appSteps: [
      { label: "Before check-in", path: "/app/listener/check-in/ses-arrive" },
      { label: "After check-in", path: "/app/listener/feedback/ses-arrive" },
    ],
    steps: [
      { label: "Before check-in", path: "/app/listener/check-in/ses-arrive" },
      { label: "Session Complete", screenKey: "completion" },
      { label: "After check-in", screenKey: "feedback-rating" },
      { label: "Before vs after", screenKey: "feedback-submitted" },
      { label: "Optional Notes", screenKey: "feedback" },
      { label: "Return Home", screenKey: "home" },
    ],
  },
  {
    id: "progress",
    number: "08",
    title: "Progress",
    purpose: "Show streak, weekly listening aim, programme completion, goals, and how they felt.",
    audience: "listener",
    appPath: "/app/listener/progress",
    steps: [
      { label: "Progress", screenKey: "progress" },
      { label: "Streak & week", screenKey: "progress-overview" },
      { label: "Your goals", screenKey: "progress-goals" },
      { label: "How you felt", screenKey: "progress-reflections" },
      { label: "Listening History", screenKey: "progress-history" },
    ],
  },
  {
    id: "organisation",
    number: "09",
    title: "Organisation",
    purpose: "Provide context about the organisation’s programme.",
    audience: "listener",
    appPath: "/app/listener/organisation",
    steps: [
      { label: "Organisation", screenKey: "organisation" },
      { label: "About the Programme", screenKey: "organisation-programme" },
      { label: "Programme Objectives", screenKey: "organisation-objectives" },
      { label: "Organisation Information", screenKey: "organisation" },
      { label: "Support Contact", screenKey: "support-contact" },
    ],
  },
  {
    id: "profile-settings",
    number: "10",
    title: "Profile & Settings",
    purpose: "Allow listeners to manage their account and preferences.",
    audience: "listener",
    appPath: "/app/listener/profile",
    steps: [
      { label: "Profile", screenKey: "profile" },
      { label: "Account Details", screenKey: "ks-account-minimal" },
      { label: "Listening Preferences", screenKey: "ks-settings-audio" },
      { label: "Notifications", screenKey: "ks-settings-notify" },
      { label: "Privacy", screenKey: "about-privacy" },
      { label: "Logout", screenKey: "settings" },
    ],
  },
  {
    id: "support",
    number: "11",
    title: "Support",
    purpose: "Help listeners resolve technical or programme-related issues.",
    audience: "listener",
    appPath: "/app/listener/support",
    steps: [
      { label: "Support", screenKey: "support" },
      { label: "Frequently Asked Questions", screenKey: "ks-support-wizard" },
      { label: "Contact Organisation", screenKey: "ks-support-partner" },
      { label: "Contact Sonocea Support", screenKey: "support-contact" },
      { label: "Report a Problem", screenKey: "ks-support-form" },
    ],
  },
  {
    id: "system-states",
    number: "12",
    title: "System States",
    purpose: "Handle edge cases gracefully.",
    audience: "system",
    appPath: "/app/listener/system-states",
    steps: [
      { label: "Loading", screenKey: "system-loading" },
      { label: "Offline", screenKey: "error-network" },
      { label: "No Sessions Assigned", screenKey: "library-no-assigned" },
      { label: "Session Unavailable", screenKey: "error-session" },
      { label: "Playback Error", screenKey: "error-server" },
      { label: "Playback Interrupted", screenKey: "pv-listening-alt" },
      { label: "Invalid Invitation", screenKey: "error-invalid-invitation" },
      { label: "Expired Invitation", screenKey: "error-expired-invitation" },
      { label: "Access Revoked", screenKey: "error-access-revoked" },
      { label: "Server Error", screenKey: "error-server" },
      { label: "Maintenance", screenKey: "error-maintenance" },
    ],
  },
];

export function flowSectionAnchor(id) {
  return `flows-${id}`;
}

export const FLOW_NAV_SECTIONS = FLOW_SECTIONS.map((section) => ({
  id: flowSectionAnchor(section.id),
  label: section.number ? `${section.number}. ${section.title}` : section.title,
  shortLabel: section.number ?? "·",
  title: section.title,
  purpose: section.purpose,
  audience: section.audience,
  appPath: section.appPath,
}));

/**
 * Combined-tab Admin setup wizard - linear desktop journey matching the
 * create-org → create programme → invite team (SMS/email) → invitation email.
 * All steps render inside one desktop shell at /app/admin/setup?step=
 */
export const ADMIN_SETUP_STEPS = [
  { id: "login", label: "Admin sign-in", nav: null },
  { id: "home", label: "Overview · home", nav: "overview" },
  { id: "orgs-list", label: "Organisations", nav: "organizations" },
  { id: "org-name", label: "Organisation · name", nav: "organizations", phase: "org", orgStep: 1 },
  { id: "org-details", label: "Organisation · details", nav: "organizations", phase: "org", orgStep: 2 },
  { id: "org-branding", label: "Organisation · logo", nav: "organizations", phase: "org", orgStep: 3 },
  { id: "dashboard", label: "Organisation · ready", nav: "organizations" },
  { id: "programme-pick", label: "Programme · choose", nav: "programmes", phase: "programme", programmeStep: 1 },
  { id: "programme-customize", label: "Programme · customise", nav: "programmes", phase: "programme" },
  { id: "dashboard-programme", label: "Dashboard · programme ready", nav: "overview" },
  { id: "users-method", label: "Team · method", nav: "participants", phase: "users" },
  { id: "users-enter", label: "Team · details", nav: "participants", phase: "users" },
  { id: "users-review", label: "Team · select", nav: "participants", phase: "users" },
  { id: "invite-channel", label: "Invite · channel", nav: "participants", phase: "users" },
  { id: "invite-review", label: "Invite · confirm", nav: "participants", phase: "users" },
  { id: "invites-sent", label: "Invites sent", nav: "participants", phase: "users" },
  { id: "dashboard-live", label: "Dashboard · live", nav: "overview" },
  { id: "programme-detail", label: "Programme detail", nav: "programmes" },
  { id: "handoff", label: "Handoff to Listener", nav: null },
];

export function adminSetupPath(stepId) {
  return `/app/admin/setup?step=${stepId}`;
}

/** @type {FlowSection[]} */
export const ADMIN_FLOW_SECTIONS = [
  {
    id: "admin-sign-in",
    number: "01",
    title: "Admin sign-in",
    purpose: "Sign into the Admin desktop console.",
    audience: "admin",
    appPath: adminSetupPath("login"),
    steps: [{ label: "Admin login" }],
  },
  {
    id: "admin-home",
    number: "02",
    title: "Dashboard",
    purpose: "Platform home after sign-in - live organisations excluding Preston North End.",
    audience: "admin",
    appPath: adminSetupPath("home"),
    steps: [{ label: "Overview · organisations" }],
  },
  {
    id: "admin-create-org",
    number: "03",
    title: "Create organisation",
    purpose: "From Organisations → Create New - name, details, and logo branding (Preston North End).",
    audience: "admin",
    appPath: adminSetupPath("orgs-list"),
    appSteps: [
      { label: "Organisations · Create New", path: adminSetupPath("orgs-list") },
      { label: "Organisation name", path: adminSetupPath("org-name") },
      { label: "Organisation details", path: adminSetupPath("org-details") },
      { label: "Add logo", path: adminSetupPath("org-branding") },
    ],
    steps: [
      { label: "Open Organisations and Create New" },
      { label: "Enter organisation name" },
      { label: "Add contact & programme details" },
      { label: "Add logo & create" },
    ],
  },
  {
    id: "admin-dashboard",
    number: "04",
    title: "Programme dashboard",
    purpose: "Empty-state dashboard for the new organisation - prompt to create a programme.",
    audience: "admin",
    appPath: adminSetupPath("dashboard"),
    steps: [{ label: "Get started · create programme" }],
  },
  {
    id: "admin-assign-programme",
    number: "05",
    title: "Create programme",
    purpose:
      "Choose a programme template or build a custom one - assigning it makes the sessions appear on Listener home.",
    audience: "admin",
    appPath: adminSetupPath("programme-pick"),
    appSteps: [
      { label: "Choose programme", path: adminSetupPath("programme-pick") },
      { label: "Customise sessions", path: adminSetupPath("programme-customize") },
    ],
    steps: [
      { label: "Browse or create custom" },
      { label: "Customise session sequence" },
    ],
  },
  {
    id: "admin-programme-ready",
    number: "06",
    title: "Programme ready",
    purpose: "Programme is assigned - next invite the full team.",
    audience: "admin",
    appPath: adminSetupPath("dashboard-programme"),
    steps: [{ label: "Invite team members" }],
  },
  {
    id: "admin-add-users",
    number: "07",
    title: "Choose team members",
    purpose:
      "Add the team (~30 people) via CSV or manual entry, mark admins, then select who to invite.",
    audience: "admin",
    appPath: adminSetupPath("users-method"),
    appSteps: [
      { label: "Choose method", path: adminSetupPath("users-method") },
      { label: "Enter team", path: adminSetupPath("users-enter") },
      { label: "Select invitees", path: adminSetupPath("users-review") },
    ],
    steps: [
      { label: "Upload CSV or add manually" },
      { label: "Enter name, email, and mobile" },
      { label: "Select who to invite" },
    ],
  },
  {
    id: "admin-send-invites",
    number: "08",
    title: "Send invites",
    purpose: "Choose email, SMS, or both - then confirm and send.",
    audience: "admin",
    appPath: adminSetupPath("invite-channel"),
    appSteps: [
      { label: "Choose channel", path: adminSetupPath("invite-channel") },
      { label: "Review & send", path: adminSetupPath("invite-review") },
      { label: "Invites sent", path: adminSetupPath("invites-sent") },
    ],
    steps: [
      { label: "Choose email, SMS, or both" },
      { label: "Confirm recipients and send" },
      { label: "Confirm delivery" },
    ],
  },
  {
    id: "admin-live",
    number: "09",
    title: "Live programme",
    purpose: "Dashboard and programme detail once Post-Training Recovery is live and the team is invited.",
    audience: "admin",
    appPath: adminSetupPath("dashboard-live"),
    appSteps: [
      { label: "Dashboard · live", path: adminSetupPath("dashboard-live") },
      { label: "Programme detail", path: adminSetupPath("programme-detail") },
    ],
    steps: [
      { label: "Review live dashboard" },
      { label: "Open programme detail" },
    ],
  },
];

/** Combined review rail: Admin setup wizard, then the unchanged Listener flow. */
export const COMBINED_FLOW_SECTIONS = [
  ...ADMIN_FLOW_SECTIONS,
  ...FLOW_SECTIONS.map((section, index) => ({
    ...section,
    id: `listener-${section.id}`,
    number: String(ADMIN_FLOW_SECTIONS.length + index + 1).padStart(2, "0"),
  })),
];

const ANON_INVITE = "SONOCEA-RIVER";
const anonAuthPath = (path) => `${path}?code=${encodeURIComponent(ANON_INVITE)}`;

/**
 * Anonymous / direct-access Combined flow - intentionally short:
 * sign in → create group → send invite → listener journey.
 */
export const ANONYMOUS_ADMIN_FLOW_SECTIONS = [
  {
    id: "admin-sign-in",
    number: "01",
    title: "Admin sign-in",
    purpose: "Sign into the Admin console to set up anonymous access.",
    audience: "admin",
    appPath: adminSetupPath("login"),
    steps: [{ label: "Admin login" }],
  },
  {
    id: "admin-create-group",
    number: "02",
    title: "Create group",
    purpose:
      "Name a direct-access group - listeners join privately with no organisation co-brand.",
    audience: "admin",
    appPath: adminSetupPath("org-name"),
    appSteps: [
      { label: "Name the group", path: adminSetupPath("org-name") },
    ],
    steps: [
      { label: "Name the group" },
    ],
  },
  {
    id: "admin-send-invites",
    number: "03",
    title: "Send invites",
    purpose: "Add listeners and send Sonocea invites (email / SMS) with anonymous invite codes.",
    audience: "admin",
    appPath: adminSetupPath("users-enter"),
    appSteps: [
      { label: "Add listeners", path: adminSetupPath("users-enter") },
      { label: "Choose channel", path: adminSetupPath("invite-channel") },
      { label: "Review & send", path: adminSetupPath("invite-review") },
      { label: "Invites sent", path: adminSetupPath("invites-sent") },
    ],
    steps: [
      { label: "Add listeners to invite" },
      { label: "Choose email or SMS" },
      { label: "Confirm and send" },
      { label: "Confirm delivery" },
    ],
  },
];

/** Listener sections for anonymous Combined - invite code baked into auth paths. */
export const ANONYMOUS_LISTENER_FLOW_SECTIONS = FLOW_SECTIONS.map((section, index) => {
  const base = {
    ...section,
    id: `listener-${section.id}`,
    number: String(ANONYMOUS_ADMIN_FLOW_SECTIONS.length + index + 1).padStart(2, "0"),
  };

  if (section.id === "invitation-authentication") {
    return {
      ...base,
      purpose: "Anonymous listener joins from a Sonocea invite - no organisation co-brand.",
      appPath: anonAuthPath("/app/listener/email"),
      appSteps: [
        { label: "Invitation email", path: anonAuthPath("/app/listener/email") },
        { label: "App Store", path: anonAuthPath("/app/listener/app-store") },
        { label: "Welcome", path: anonAuthPath("/app/listener/invite") },
        { label: "Sign in", path: anonAuthPath("/app/listener/login") },
      ],
    };
  }
  if (section.id === "home") {
    return {
      ...base,
      purpose:
        "Home shaped by onboarding - goals, moments, and timing drive next session and copy.",
    };
  }
  if (section.id === "assigned-programme") {
    return {
      ...base,
      purpose: "Browse sessions ordered around what you shared in onboarding.",
    };
  }
  if (section.id === "organisation") {
    return {
      ...base,
      title: "Your plan",
      purpose: "Preference-led plan summary - no organisation page branding.",
    };
  }
  return base;
});

export const ANONYMOUS_COMBINED_FLOW_SECTIONS = [
  ...ANONYMOUS_ADMIN_FLOW_SECTIONS,
  ...ANONYMOUS_LISTENER_FLOW_SECTIONS,
];
