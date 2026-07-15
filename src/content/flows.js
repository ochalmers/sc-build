/**
 * Flows page content — listener-led MVP journeys (organisation-assigned model).
 * Every step with a screenKey maps to a wireframe preview in the storyboard.
 */

export const FLOWS_HERO = {
  eyebrow: "UX Review · July 2026",
  title: "Application Flows",
  intro:
    "Invite-only, organisation-led listener journeys — from invitation through programme progress. Use the left navigation to jump between flows.",
};

/** MVP bottom navigation for the provisioned listener app. */
export const LISTENER_MVP_NAV = [
  { id: "home", label: "Home", path: "/app/listener/home" },
  { id: "profile", label: "Profile", path: "/app/listener/profile" },
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
    appPath: "/app/listener/invite",
    appSteps: [
      { label: "Welcome", path: "/app/listener/invite" },
      { label: "Sign in", path: "/app/listener/login" },
    ],
    steps: [
      { label: "Organisation sends invitation", screenKey: "partner-invite" },
      { label: "Invitation Email / SMS" },
      { label: "Open Invite Link", screenKey: "pv-invitation" },
      { label: "Accept Invitation", screenKey: "pv-invitation" },
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
    purpose: "Introduce Sonocea and explain how to get the best listening experience.",
    audience: "listener",
    appPath: "/app/listener/onboarding?phase=loading",
    appSteps: [
      { label: "Loading", path: "/app/listener/onboarding?phase=loading" },
      { label: "Welcome", path: "/app/listener/onboarding?phase=welcome" },
      { label: "What is Sonocea?", path: "/app/listener/onboarding?phase=about" },
      { label: "Before you begin", path: "/app/listener/onboarding?phase=prep" },
      { label: "Tell us about yourself", path: "/app/listener/onboarding?phase=identity" },
      { label: "Support goals", path: "/app/listener/onboarding?phase=support" },
      { label: "When you listen", path: "/app/listener/onboarding?phase=timing" },
      { label: "Preparing", path: "/app/listener/onboarding?phase=preparing" },
    ],
    steps: [
      { label: "Opening experience", screenKey: "onboarding" },
      { label: "Welcome to Sonocea", screenKey: "onboarding" },
      { label: "What is Sonocea?", screenKey: "onboarding-intro" },
      { label: "Structured Sound", screenKey: "onboarding-2" },
      { label: "Grounded in Science", screenKey: "onboarding" },
      { label: "Designed for Everyday Use", screenKey: "onboarding" },
      { label: "Before you begin", screenKey: "guidance" },
      { label: "Tell us about yourself", screenKey: "neurotype" },
      { label: "Support goals", screenKey: "neurotype" },
      { label: "When you listen", screenKey: "neurotype" },
      { label: "Preparing experience", screenKey: "onboarding-complete" },
      { label: "Go to Home", screenKey: "home" },
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
      { label: "Assigned Sessions", screenKey: "home" },
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
    purpose: "Allow listeners to view every session assigned by their organisation.",
    audience: "listener",
    appPath: "/app/listener/assigned",
    steps: [
      { label: "Assigned Programme", screenKey: "assigned" },
      { label: "Current Sessions", screenKey: "assigned-current" },
      { label: "Upcoming Sessions", screenKey: "assigned-upcoming" },
      { label: "Completed Sessions", screenKey: "assigned-completed" },
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
      { label: "Preparation Guidance", screenKey: "guidance" },
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
    purpose: "Capture post-session reflection and encourage continued engagement.",
    audience: "listener",
    appPath: "/app/listener/feedback/ses-arrive",
    steps: [
      { label: "Session Complete", screenKey: "completion" },
      { label: "Reflection", screenKey: "completion-reflection" },
      { label: "Wellbeing Check-In", screenKey: "feedback-rating" },
      { label: "Optional Notes", screenKey: "feedback" },
      { label: "Submit Reflection", screenKey: "feedback-submitted" },
      { label: "Recommended Next Session", screenKey: "home-recommend" },
      { label: "Return Home", screenKey: "home" },
    ],
  },
  {
    id: "progress",
    number: "08",
    title: "Progress",
    purpose: "Show progress through the assigned programme.",
    audience: "listener",
    appPath: "/app/listener/progress",
    steps: [
      { label: "Progress", screenKey: "progress" },
      { label: "Programme Overview", screenKey: "progress-overview" },
      { label: "Completed Sessions", screenKey: "progress-completed" },
      { label: "Listening History", screenKey: "progress-history" },
      { label: "Reflections", screenKey: "progress-reflections" },
      { label: "Programme Completion", screenKey: "progress-complete" },
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
