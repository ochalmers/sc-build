export const COPY_HERO = {
  title: "Marketing Copy Breakdown",
  intro:
    "Working copy inventory across the product journey - aligned to flow stage, screen intent, and CTA outcomes.",
};

export const COPY_SECTIONS = [
  {
    id: "copy-public-visitor",
    label: "Public Visitor",
    title: "Public Visitor Funnel",
    description: "Awareness to access request messaging for non-authenticated visitors.",
    entries: [
      {
        screen: "Discover / Landing",
        goal: "Explain Sonocea value in plain language",
        primary: "Experience the sample",
        secondary: "Request access",
        notes: "Keep SAT mention but avoid technical jargon in first fold.",
      },
      {
        screen: "Sample Reflection",
        goal: "Capture sentiment + readiness",
        primary: "Continue to science",
        secondary: "Request invite",
        notes: "Bridge emotional response to evidence-oriented copy.",
      },
    ],
  },
  {
    id: "copy-listener-onboarding",
    label: "Listener",
    title: "Invitation + Onboarding",
    description: "Copy used in invite redemption and first-time onboarding sequence.",
    entries: [
      {
        screen: "Invite email",
        goal: "Context and credibility before download",
        primary: "Get started",
        secondary: null,
        notes: "Partner invites you to experience Sonocea; SAT™ belongs here.",
      },
      {
        screen: "App welcome hand-off",
        goal: "Welcome after install - don’t re-explain the invitation",
        primary: "Let’s get started",
        secondary: "Already set up? Sign in",
        notes: "Keep partner lock-up; move straight into welcoming them.",
      },
      {
        screen: "Onboarding Preferences",
        goal: "Set personal context without friction",
        primary: "Continue",
        secondary: "Back",
        notes: "Avoid clinical terms; use supportive, non-diagnostic language.",
      },
    ],
  },
];
