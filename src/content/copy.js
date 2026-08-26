export const COPY_HERO = {
  title: "Listener journey copy",
  intro:
    "All listener-facing strings from invitation through the listening loop. Edit docs/listener-journey-copy.md for mark-up; use Print on this page for a PDF.",
};

/**
 * @typedef {{
 *   label: string,
 *   value: string,
 * }} CopyField
 * @typedef {{
 *   id: string,
 *   screen: string,
 *   path?: string,
 *   fields: CopyField[],
 * }} CopyScreen
 * @typedef {{
 *   id: string,
 *   number: string,
 *   title: string,
 *   description: string,
 *   screens: CopyScreen[],
 * }} CopySection
 */

/** @type {CopySection[]} */
export const COPY_SECTIONS = [
  {
    id: "copy-invite",
    number: "01",
    title: "Invitation & authentication",
    description: "Email, App Store, welcome, and sign-in.",
    screens: [
      {
        id: "email",
        screen: "Invitation email",
        path: "/app/listener/email",
        fields: [
          { label: "Subject", value: "You’re invited to Sonocea" },
          { label: "Headline (partner)", value: "{Partner} has invited you to experience Sonocea." },
          { label: "Headline (direct)", value: "You’re invited to experience Sonocea." },
          {
            label: "Body",
            value:
              "Sonocea uses patented Sonic Augmentation Technology™ to create structured listening experiences designed to support regulation, recovery and wellbeing.",
          },
          { label: "Primary CTA", value: "Get started" },
        ],
      },
      {
        id: "app-store",
        screen: "App Store",
        path: "/app/listener/app-store",
        fields: [
          { label: "App name", value: "Sonocea" },
          { label: "Tagline", value: "Guided listening for recovery" },
          { label: "Primary CTA", value: "Get" },
          {
            label: "What’s New (partner)",
            value:
              "Join partner-led listening programmes. Short headphone sessions for recovery and regulation - invited by your organisation.",
          },
        ],
      },
      {
        id: "welcome",
        screen: "Welcome",
        path: "/app/listener/invite",
        fields: [
          { label: "Headline", value: "Welcome to Sonocea." },
          {
            label: "Body (partner)",
            value:
              "{Partner} has invited you to experience Sonocea. We’ll help you get set up, then you can start listening.",
          },
          { label: "Primary CTA", value: "Let’s get started" },
          { label: "Secondary", value: "Already set up? Sign in" },
        ],
      },
      {
        id: "login",
        screen: "Sign in",
        path: "/app/listener/login",
        fields: [
          { label: "Title", value: "Welcome back" },
          { label: "Body", value: "Sign in with the email from your organisation." },
          { label: "Primary CTA", value: "Continue" },
          { label: "Secondary", value: "Open invitation instead" },
        ],
      },
    ],
  },
  {
    id: "copy-fte",
    number: "02",
    title: "First-time experience",
    description: "Welcome, about Sonocea, personalisation, appearance, ready to listen.",
    screens: [
      {
        id: "name",
        screen: "Preferred name",
        path: "/app/listener/onboarding?phase=welcome",
        fields: [
          { label: "Title", value: "What should we call you?" },
          {
            label: "Body",
            value: "We’ll use this when we say hello. A first name or nickname is perfect.",
          },
          { label: "Placeholder", value: "Your name" },
          { label: "Primary CTA", value: "Continue" },
        ],
      },
      {
        id: "about",
        screen: "About Sonocea (4 slides)",
        path: "/app/listener/onboarding?phase=about",
        fields: [
          { label: "1 · Title", value: "Listening, designed differently" },
          { label: "2 · Title", value: "Made for the moments that matter" },
          { label: "3 · Title", value: "Built on science" },
          { label: "4 · Title", value: "Nothing to learn. Just listen." },
          { label: "Final CTA", value: "I'm ready" },
        ],
      },
      {
        id: "goals",
        screen: "Goals",
        path: "/app/listener/onboarding?phase=outcomes",
        fields: [
          { label: "Title", value: "What would you like Sonocea to help with?" },
          {
            label: "Options",
            value:
              "Feeling calmer · Recovering and resetting · Staying focused · Feeling more balanced · Sleeping better · General wellbeing",
          },
          { label: "Primary CTA", value: "Next" },
        ],
      },
      {
        id: "moments",
        screen: "Moments",
        path: "/app/listener/onboarding?phase=context",
        fields: [
          { label: "Title", value: "When might Sonocea be useful to you?" },
          {
            label: "Options",
            value:
              "When I feel overwhelmed · When I feel unsettled · When I need to reset · When I’m recovering · When I need to focus · When I’m winding down · When I want some time to myself",
          },
        ],
      },
      {
        id: "sensory",
        screen: "Sensory sensitivity",
        path: "/app/listener/onboarding?phase=sensory",
        fields: [
          { label: "Title", value: "How sensitive are you to your surroundings?" },
          {
            label: "Options",
            value:
              "Not particularly sensitive · Sometimes sensitive · Quite sensitive · Very sensitive · It varies",
          },
          { label: "Primary / secondary", value: "Next · Skip" },
        ],
      },
      {
        id: "timing",
        screen: "Listening time",
        path: "/app/listener/onboarding?phase=timing",
        fields: [
          { label: "Title", value: "When would listening fit into your day?" },
          {
            label: "Options",
            value: "Morning · Afternoon · Evening · Before bed · No particular time",
          },
        ],
      },
      {
        id: "notifications",
        screen: "Notifications",
        path: "/app/listener/onboarding?phase=notifications",
        fields: [
          { label: "Title", value: "Would you like us to remind you?" },
          { label: "Primary / secondary", value: "Allow notifications · Not now" },
        ],
      },
      {
        id: "appearance",
        screen: "Appearance",
        path: "/app/listener/onboarding?phase=appearance",
        fields: [
          { label: "Title", value: "How would you like Sonocea to feel?" },
          {
            label: "Options",
            value: "Light · Dark · Adapt to time of day (Recommended)",
          },
          { label: "Primary CTA", value: "Next" },
        ],
      },
      {
        id: "ready",
        screen: "Ready to listen",
        path: "/app/listener/onboarding?phase=ready",
        fields: [
          {
            label: "Title pattern",
            value: "{A wind-down session | A morning session | …} is ready{, {Name}}.",
          },
          {
            label: "Body",
            value: "Matched to {goal}, for the times you said you’d listen. Begin when you’re ready.",
          },
          { label: "Primary / secondary", value: "Begin · Not right now" },
        ],
      },
    ],
  },
  {
    id: "copy-home",
    number: "03",
    title: "Home",
    description: "Greeting, mode pills, hero session, list.",
    screens: [
      {
        id: "home",
        screen: "Home",
        path: "/app/listener/home",
        fields: [
          {
            label: "Greeting",
            value: "Good morning{, {Name}} / Good afternoon{, {Name}} / Good evening{, {Name}}",
          },
          { label: "Mode pills", value: "Rest · Focus · Restore" },
          { label: "Resume meta", value: "Resume · {N}% listened" },
          { label: "Empty", value: "No sessions in this mode yet." },
        ],
      },
    ],
  },
  {
    id: "copy-programme",
    number: "04",
    title: "Programme & library",
    description: "Assigned programme, library browse, saved stub.",
    screens: [
      {
        id: "programme",
        screen: "Programme",
        path: "/app/listener/programme",
        fields: [
          { label: "Title", value: "Your programme / Your sessions" },
          { label: "Tabs", value: "List · Calendar" },
          {
            label: "About Sonocea",
            value:
              "Sonocea uses patented Sonic Augmentation Technology™ to deliver structured listening experiences designed to support nervous system regulation, recovery and wellbeing.",
          },
        ],
      },
      {
        id: "library",
        screen: "Library",
        path: "/app/listener/library",
        fields: [
          { label: "Title", value: "Library" },
          { label: "Body", value: "All sessions from {Partner} / All sessions in your programme" },
        ],
      },
    ],
  },
  {
    id: "copy-session",
    number: "05–07",
    title: "Session, playback & reflection",
    description: "Drawer, before/after check-in, player bridges.",
    screens: [
      {
        id: "drawer",
        screen: "Session drawer",
        fields: [
          { label: "Section", value: "Before you begin" },
          { label: "Primary CTA", value: "Start session / Resume session" },
        ],
      },
      {
        id: "check-in-before",
        screen: "Before check-in",
        path: "/app/listener/check-in/:sessionId",
        fields: [
          { label: "Title", value: "Before you begin, tell us how you’re feeling" },
          {
            label: "Body",
            value:
              "Choose what feels closest. We’ll ask you again after the session so you can notice if anything has changed.",
          },
          {
            label: "Scale 1–5",
            value: "Unsettled · A little unsettled · Neutral · Settled · Very settled",
          },
          { label: "Primary / secondary", value: "Continue · Skip" },
        ],
      },
      {
        id: "player",
        screen: "Player",
        path: "/app/listener/player/:sessionId",
        fields: [
          { label: "Begin bridge", value: "Your session is about to begin." },
          { label: "First complete", value: "Well done. → You've completed your first session." },
          { label: "Later complete", value: "Well done. → Your session is complete." },
        ],
      },
      {
        id: "check-in-after",
        screen: "After check-in",
        path: "/app/listener/feedback/:sessionId",
        fields: [
          { label: "Title", value: "How do you feel now?" },
          {
            label: "Body",
            value:
              "Choose what feels closest. There’s no right answer. This simply helps you notice how you feel after listening.",
          },
          { label: "Exit bridge", value: "See you at your next session{, {Name}}." },
        ],
      },
    ],
  },
  {
    id: "copy-account",
    number: "08–11",
    title: "Progress, organisation, profile & support",
    description: "Account-adjacent listener surfaces.",
    screens: [
      {
        id: "progress",
        screen: "Progress",
        path: "/app/listener/progress",
        fields: [
          { label: "Title", value: "Your progress" },
          { label: "Body", value: "How listening is settling into your week" },
          {
            label: "Felt empty",
            value: "After you check in before and after a session, the shift will show here.",
          },
        ],
      },
      {
        id: "organisation",
        screen: "Organisation / plan",
        path: "/app/listener/organisation",
        fields: [
          {
            label: "Partner fallback",
            value: "Your organisation has shared a set of listening sessions to support you.",
          },
          {
            label: "Direct title",
            value: "Your listening plan",
          },
          {
            label: "Direct body",
            value: "Sonocea shaped this set from what you shared — not from an organisation programme.",
          },
        ],
      },
      {
        id: "profile",
        screen: "Profile",
        path: "/app/listener/profile",
        fields: [
          { label: "Links", value: "Organisation · About Sonocea · Support · Sign out" },
          { label: "Appearance", value: "Light · Dark · Adapt to time of day" },
        ],
      },
      {
        id: "support",
        screen: "Support",
        path: "/app/listener/support",
        fields: [
          { label: "Title", value: "Need help?" },
          {
            label: "Body",
            value:
              "For access or programme questions, contact your organisation. For playback or account issues, reach Sonocea using the email on your invitation.",
          },
        ],
      },
    ],
  },
];
