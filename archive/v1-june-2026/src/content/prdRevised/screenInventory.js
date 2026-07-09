/**
 * Primary screens we need for v1, organised by surface (where they sit) and ranked by priority.
 * `wireframeId` maps to WIREFRAME_REGISTRY (WireframeScreens.jsx). `pending` = not yet drawn.
 * This is the "what screens do we need" answer that follows directly from the ranked user stories.
 */

export const PRIMARY_SCREEN_INVENTORY = [
  {
    id: "public-visitor",
    surface: "Public Visitor",
    tag: "Mobile · unauthenticated",
    description: "The Discover journey a store download sees before any organisation verification.",
    screens: [
      { name: "Splash / brand intro", priority: "P0", wireframeId: "splash", stories: ["PV-01"] },
      { name: "Get Started (entry routing)", priority: "P0", wireframeId: "pv-get-started", stories: ["PV-01", "IP-02"] },
      { name: "Nervous-system check-in", priority: "P0", wireframeId: "pv-check-in", stories: ["PV-02"] },
      { name: "Headphone / environment prompt", priority: "P0", wireframeId: "pv-headphones", stories: ["PV-02"] },
      { name: "5-minute reset (player)", priority: "P0", wireframeId: "pv-listening", stories: ["PV-02"] },
      { name: "Reflection (remeasure)", priority: "P0", wireframeId: "pv-reflection", stories: ["PV-02"] },
      { name: "Request access / mailing list", priority: "P0", wireframeId: "pv-request-access", stories: ["PV-04", "PV-05"] },
      { name: "Science home", priority: "P1", wireframeId: "pv-science-home", stories: ["PV-03"] },
      { name: "Science topic detail", priority: "P1", wireframeId: "pv-topic-detail", stories: ["PV-03"] },
      { name: "Invitation intro", priority: "P1", wireframeId: "pv-invitation", stories: ["IP-01", "IP-02"] },
      { name: "Returning public home", priority: "P2", wireframeId: "pv-returning-home", stories: ["PV-03"] },
    ],
  },
  {
    id: "listener",
    surface: "Mobile App · Listener",
    tag: "Mobile · provisioned",
    description: "The invite-only core experience. This is the surface the core-UI options below explore.",
    screens: [
      { name: "Sign-up / login (invite)", priority: "P0", wireframeId: "login", stories: ["listener-redeem"] },
      { name: "Onboarding & science", priority: "P0", wireframeId: "onboarding", stories: ["listener-onboard"] },
      { name: "Neurotype questionnaire", priority: "P0", wireframeId: "neurotype", stories: ["listener-onboard"] },
      { name: "Sessions library (home)", priority: "P0", wireframeId: "library", stories: ["listener-library"] },
      { name: "Session detail / profile", priority: "P0", wireframeId: "detail", stories: ["listener-session-profile"] },
      { name: "Player", priority: "P0", wireframeId: "player", stories: ["listener-playback"] },
      { name: "Favorites / saved", priority: "P1", wireframeId: "favorites", stories: ["listener-library"] },
      { name: "Post-session feedback", priority: "P1", wireframeId: "feedback", stories: ["listener-playback"] },
      { name: "Profile / settings", priority: "P1", wireframeId: null, stories: ["listener-onboard"] },
      { name: "About Sonocea", priority: "P2", wireframeId: "about", stories: [] },
      { name: "Support", priority: "P2", wireframeId: "support", stories: [] },
      { name: "Assigned Regiment / Protocol", priority: "P2", wireframeId: null, stories: ["listener-protocol"] },
    ],
  },
  {
    id: "ops",
    surface: "Partner & Admin",
    tag: "Web · operators",
    description: "Behind-the-scenes surfaces that make provisioning, billing and content possible.",
    screens: [
      { name: "Admin · Session management (CMS)", priority: "P0", wireframeId: null, stories: ["admin-upload"] },
      { name: "Admin · Partner / Org setup", priority: "P0", wireframeId: null, stories: ["admin-partner-org"] },
      { name: "Admin · Invite & assign Listeners", priority: "P0", wireframeId: null, stories: ["admin-partner-org"] },
      { name: "Admin · Analytics dashboard", priority: "P1", wireframeId: null, stories: ["admin-analytics", "SA-01"] },
      { name: "Partner · Usage & billing view", priority: "P1", wireframeId: null, stories: ["partner-usage", "partner-billing"] },
    ],
  },
];
