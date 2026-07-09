/**
 * Flows page content — sequential blueprint aligned with Figma flows canvas.
 * Every step has a wireframe preview in the storyboard below each section.
 */

export const FLOWS_HERO = {
  eyebrow: "UX Review · July 2026",
  title: "Application Flows",
  intro:
    "Complete application flows in sequence — each step maps to a wireframe screen below every section.",
};

/** @typedef {{ label: string, screenKey?: string }} FlowStep */
/** @typedef {{ id: string, number?: string, title: string, steps: FlowStep[] }} FlowSection */

/** @type {FlowSection[]} */
export const FLOW_SECTIONS = [
  {
    id: "authentication-access",
    number: "01",
    title: "Authentication & Access",
    steps: [
      { label: "Splash Screen", screenKey: "splash" },
      { label: "Welcome / Guest Landing", screenKey: "pv-get-started" },
      { label: "Accept Invitation", screenKey: "pv-invitation" },
      { label: "Login", screenKey: "login-empty" },
      { label: "Create Account", screenKey: "login-create" },
      { label: "Account Verification", screenKey: "login" },
      { label: "Authentication Success", screenKey: "auth-success" },
    ],
  },
  {
    id: "first-time-experience",
    number: "02",
    title: "First-Time Experience",
    steps: [
      { label: "Welcome to Sonocea", screenKey: "onboarding" },
      { label: "Introduction to Sonocea", screenKey: "onboarding-intro" },
      { label: "How It Works", screenKey: "onboarding-2" },
      { label: "Listening Guidance", screenKey: "guidance" },
      { label: "Personalisation (or Neurotype if retained)", screenKey: "neurotype" },
      { label: "Onboarding Complete", screenKey: "onboarding-complete" },
    ],
  },
  {
    id: "public-visitor",
    number: "03",
    title: "Public Visitor Experience",
    steps: [
      { label: "Public Landing", screenKey: "pv-public-landing" },
      { label: "Check-In", screenKey: "pv-check-in" },
      { label: "Headphones Prompt", screenKey: "pv-headphones" },
      { label: "Sample Listening Session", screenKey: "pv-listening" },
      { label: "Reflection", screenKey: "pv-reflection" },
      { label: "Science Overview", screenKey: "pv-science-home" },
      { label: "Request Access", screenKey: "pv-request-access" },
      { label: "Request Submitted", screenKey: "pv-request-submitted" },
    ],
  },
  {
    id: "library-discovery",
    number: "04",
    title: "Library & Discovery",
    steps: [
      { label: "Home", screenKey: "library" },
      { label: "Session Library", screenKey: "library-dark" },
      { label: "Categories", screenKey: "library-categories" },
      { label: "Search", screenKey: "library-search" },
      { label: "Search Results", screenKey: "library-search-results" },
      { label: "Filters", screenKey: "library-filters" },
      { label: "Empty Library", screenKey: "library-empty" },
    ],
  },
  {
    id: "session-experience",
    number: "05",
    title: "Session Experience",
    steps: [
      { label: "Session Overview", screenKey: "detail-overview" },
      { label: "Session Detail", screenKey: "detail" },
      { label: "Pre-Session Guidance", screenKey: "guidance" },
      { label: "Session Available", screenKey: "detail-available" },
      { label: "Session Downloaded (if applicable)", screenKey: "detail-downloaded" },
      { label: "Session Unavailable", screenKey: "error-session" },
    ],
  },
  {
    id: "playback-experience",
    number: "06",
    title: "Playback Experience",
    steps: [
      { label: "Player (Idle)", screenKey: "player-idle" },
      { label: "Player (Playing)", screenKey: "player" },
      { label: "Player (Paused)", screenKey: "player-paused" },
      { label: "Player (Completed)", screenKey: "player-completed" },
      { label: "Background Playback", screenKey: "player-background" },
      { label: "Interrupted Playback", screenKey: "pv-listening-alt" },
    ],
  },
  {
    id: "session-completion",
    number: "07",
    title: "Session Completion",
    steps: [
      { label: "Session Complete", screenKey: "completion" },
      { label: "Reflection", screenKey: "completion-reflection" },
      { label: "Session Rating", screenKey: "feedback-rating" },
      { label: "Feedback", screenKey: "feedback" },
      { label: "Feedback Submitted", screenKey: "feedback-submitted" },
    ],
  },
  {
    id: "supporting-experience",
    number: "08",
    title: "Supporting Experience",
    steps: [
      { label: "About Sonocea", screenKey: "about" },
      { label: "Science Library", screenKey: "science-support" },
      { label: "Science Article", screenKey: "pv-topic-detail" },
      { label: "Support", screenKey: "support" },
      { label: "Contact Support", screenKey: "support-contact" },
      { label: "Settings", screenKey: "settings" },
      { label: "Account", screenKey: "profile" },
      { label: "Privacy & Policies", screenKey: "about-privacy" },
    ],
  },
  {
    id: "system-states",
    number: "09",
    title: "System States",
    steps: [
      { label: "Loading", screenKey: "system-loading" },
      { label: "Empty State", screenKey: "library-empty" },
      { label: "Offline", screenKey: "error-network" },
      { label: "No Sessions Assigned", screenKey: "library-no-assigned" },
      { label: "Invalid Invitation", screenKey: "error-invalid-invitation" },
      { label: "Expired Invitation", screenKey: "error-expired-invitation" },
      { label: "Access Revoked", screenKey: "error-access-revoked" },
      { label: "Server Error", screenKey: "error-server" },
      { label: "Maintenance", screenKey: "error-maintenance" },
    ],
  },
  {
    id: "partner-experience",
    number: "10",
    title: "Partner Experience (Web)",
    steps: [
      { label: "Partner Login", screenKey: "partner-login" },
      { label: "Dashboard", screenKey: "partner-dashboard" },
      { label: "Invite Listener", screenKey: "partner-invite" },
      { label: "Listener Directory", screenKey: "partner-roster" },
      { label: "Listener Detail", screenKey: "partner-listener-detail" },
      { label: "Organisation Settings", screenKey: "partner-org-settings" },
    ],
  },
  {
    id: "admin-experience",
    title: "Admin Experience (Web)",
    steps: [
      { label: "Dashboard", screenKey: "admin-analytics" },
      { label: "Session Management", screenKey: "admin-sessions" },
      { label: "Listener Management", screenKey: "admin-listeners" },
      { label: "Organisation Management", screenKey: "admin-organisations" },
      { label: "Session Assignment", screenKey: "admin-assignment" },
      { label: "Analytics", screenKey: "admin-analytics-detail" },
    ],
  },
];

export function flowSectionAnchor(id) {
  return `flows-${id}`;
}

export const FLOW_NAV_SECTIONS = FLOW_SECTIONS.map((section) => ({
  id: flowSectionAnchor(section.id),
  label: section.number ? `${section.number}. ${section.title}` : section.title,
  title: section.title,
}));
