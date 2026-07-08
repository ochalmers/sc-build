/** Clickable PRD prototype — screen registry and flow definitions. */

export const PRD_PROTOTYPE_META = {
  title: "PRD clickable prototype",
  subtitle: "Tap through Public Visitor and Listener journeys",
};

export const PRD_PROTOTYPE_FLOWS = [
  {
    id: "public-visitor",
    label: "Public Visitor",
    description: "Discover Sonocea golden route — check-in, sample, science, register interest.",
    start: "pv-get-started",
    steps: [
      "pv-get-started",
      "pv-check-in-before",
      "pv-headphones",
      "pv-listening",
      "pv-check-in-after",
      "pv-experienced",
      "pv-science-home",
      "pv-topic-detail",
      "pv-request-access",
      "pv-complete",
    ],
  },
  {
    id: "listener",
    label: "Listener (invited)",
    description: "Invite redemption → onboarding → library → player → feedback.",
    start: "pv-get-started",
    steps: [
      "pv-get-started",
      "pv-invitation",
      "mobile-invite",
      "mobile-onboarding-0",
      "mobile-onboarding-1",
      "mobile-onboarding-2",
      "mobile-neurotype",
      "mobile-profile",
      "mobile-library",
      "mobile-detail",
      "mobile-player-playing",
      "mobile-feedback",
      "mobile-feedback-done",
      "listener-complete",
    ],
  },
  {
    id: "listener-login",
    label: "Listener (login)",
    description: "Direct login path — skip public discover journey.",
    start: "pv-get-started",
    steps: [
      "pv-get-started",
      "mobile-invite",
      "mobile-onboarding-0",
      "mobile-onboarding-1",
      "mobile-onboarding-2",
      "mobile-neurotype",
      "mobile-profile",
      "mobile-library",
      "mobile-detail",
      "mobile-player-playing",
      "mobile-feedback",
      "mobile-feedback-done",
      "listener-complete",
    ],
  },
];

export const SCREEN_LABELS = {
  "pv-get-started": "Get Started",
  "pv-check-in-before": "Check-in",
  "pv-headphones": "Headphones",
  "pv-listening": "5-minute reset",
  "pv-check-in-after": "Reflection",
  "pv-experienced": "What you experienced",
  "pv-science-home": "Science home",
  "pv-topic-detail": "Topic detail",
  "pv-request-access": "Request access",
  "pv-complete": "Complete",
  "pv-invitation": "Invitation",
  "mobile-invite": "Redeem invite",
  "mobile-onboarding-0": "Onboarding 1/3",
  "mobile-onboarding-1": "Onboarding 2/3",
  "mobile-onboarding-2": "Onboarding 3/3",
  "mobile-neurotype": "Neurotype",
  "mobile-profile": "Recommended profile",
  "mobile-library": "Library",
  "mobile-detail": "Session detail",
  "mobile-player-playing": "Player",
  "mobile-feedback": "Feedback",
  "mobile-feedback-done": "Thank you",
  "listener-complete": "Journey complete",
};

export function getFlowById(flowId) {
  return PRD_PROTOTYPE_FLOWS.find((f) => f.id === flowId);
}

export function getStepIndex(flow, screenId) {
  return flow.steps.indexOf(screenId);
}
