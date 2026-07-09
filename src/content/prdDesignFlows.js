/**
 * PRD design flows — every journey from both June 2026 PRDs with
 * hi-fi screen mapping for the Design catalogue page.
 */

export const PRD_DESIGN_FLOW_GROUPS = [
  {
    id: "prd-flows-public-entry",
    sectionId: "prd-designs-public",
    label: "Public Visitor · Entry",
    title: "Layer 0 entry routing",
    description:
      "How a store download chooses their path before authentication — Discover, Accept Invitation, or Login.",
    flows: [
      {
        id: "flow-pv-get-started",
        title: "Get Started",
        summary:
          "Three entry paths on first open. Discover leads to the golden route; Invitation and Login bypass the public sample after authentication.",
        prdRef: "Public Visitor PRD · §2 Layer 0",
        role: "Public Visitor",
        steps: [
          {
            num: 1,
            label: "Splash",
            detail: "Brand intro — routes unauthenticated users to Get Started.",
            screenKey: "splash",
          },
          {
            num: 2,
            label: "Get Started",
            detail: "Discover Sonocea · Accept Invitation · Login.",
            screenKey: "pv-get-started",
            events: ["discover_selected", "invitation_selected", "login_selected"],
          },
        ],
      },
      {
        id: "flow-pv-invitation",
        title: "Accept Invitation",
        summary:
          "Invited participant sees organisation context, then activates account. Bypasses full public journey after auth (FR-007).",
        prdRef: "Public Visitor PRD · IP-01 · IP-02",
        role: "Invited Participant",
        steps: [
          {
            num: 1,
            label: "Invitation intro",
            detail: "Brief welcome — organisation or Sonocea invite context.",
            screenKey: "pv-invitation",
          },
          {
            num: 2,
            label: "Redeem access",
            detail: "Invite code recognised — transitions to Listener onboarding.",
            screenKey: "login",
            events: ["invite_accepted"],
          },
        ],
      },
      {
        id: "flow-pv-login",
        title: "Login",
        summary:
          "Returning or invited user authenticates directly to provisioned Listener experience — no public sample required.",
        prdRef: "Public Visitor PRD · §2 · FR-007",
        role: "Listener",
        steps: [
          {
            num: 1,
            label: "Access code",
            detail: "Enter invite link or pre-registered email.",
            screenKey: "login-empty",
          },
          {
            num: 2,
            label: "Sessions library",
            detail: "Provisioned home — assigned sessions ready to play.",
            screenKey: "library",
          },
        ],
      },
    ],
  },
  {
    id: "prd-flows-golden",
    sectionId: "prd-designs-golden",
    label: "Public Visitor · Golden route",
    title: "First-time Discover journey",
    description:
      "Experience before explanation — the guiding path for Public Visitors who choose Discover Sonocea. Target: 60%+ complete the 5-minute sample.",
    flows: [
      {
        id: "flow-pv-golden",
        title: "Discover Sonocea — first visit",
        summary:
          "Check-in, headphones, 5-minute nervous system reset, reflection, science bridge, topic exploration, and access request.",
        prdRef: "Public Visitor PRD · §2 Golden Route",
        role: "Public Visitor",
        steps: [
          {
            num: 1,
            label: "Welcome",
            detail: "Calm entry — user chose Discover on Get Started.",
            screenKey: "pv-get-started",
          },
          {
            num: 2,
            label: "Check-in",
            detail: "How is your nervous system today? Stress, energy, focus, restfulness.",
            screenKey: "pv-check-in",
            events: ["check_in_started"],
          },
          {
            num: 3,
            label: "Headphones",
            detail: "Environment prep — quiet place, headphones on.",
            screenKey: "pv-headphones",
          },
          {
            num: 4,
            label: "5-minute reset",
            detail: "Single curated non-clinical sample — sound leads, UI recedes.",
            screenKey: "pv-listening",
            events: ["five_minute_session_started", "five_minute_session_completed"],
          },
          {
            num: 5,
            label: "Reflection",
            detail: "How did that feel? Remeasure the same four dimensions.",
            screenKey: "pv-reflection",
            events: ["reflection_submitted"],
          },
          {
            num: 6,
            label: "What you experienced",
            detail: "Bridge from felt experience to SAT™ science.",
            screenKey: "pv-experienced",
          },
          {
            num: 7,
            label: "Explore the science",
            detail: "Topic library — ANS, SAT™, Sonostasis®, research.",
            screenKey: "pv-science-home",
            events: ["science_article_viewed"],
          },
          {
            num: 8,
            label: "Register interest",
            detail: "Mailing list or organisation access request.",
            screenKey: "pv-request-access",
            events: ["request_access_submitted"],
          },
        ],
      },
    ],
  },
  {
    id: "prd-flows-returning",
    sectionId: "prd-designs-returning",
    label: "Public Visitor · Returning",
    title: "Layer 4 — returning public home",
    description:
      "Persistent navigation after first-time UX. Light authentication required to replay the 5-minute reset (FR-006).",
    flows: [
      {
        id: "flow-pv-returning",
        title: "Returning Public Home",
        summary:
          "Daily reset, science content, and access request — familiar tab structure without full Listener entitlement.",
        prdRef: "Public Visitor PRD · Layer 4 · FR-006",
        role: "Public Visitor",
        steps: [
          {
            num: 1,
            label: "Public home",
            detail: "Welcome back — daily reset card and education rails.",
            screenKey: "pv-returning-home",
            events: ["return_visit"],
          },
          {
            num: 2,
            label: "Discover",
            detail: "Ambient home with Discover · Today · Profile navigation.",
            screenKey: "pv-discover",
          },
          {
            num: 3,
            label: "Science topic",
            detail: "Educational article — browsable without full sign-in.",
            screenKey: "pv-topic-hifi",
            events: ["science_article_viewed"],
          },
        ],
      },
    ],
  },
  {
    id: "prd-flows-listener",
    sectionId: "prd-designs-listener",
    label: "Mobile App · Listener",
    title: "Provisioned Listener journeys",
    description:
      "Invite-only core experience mapped to Mobile App v1.0 [REVISED] §4 — onboarding through playback and feedback.",
    flows: [
      {
        id: "flow-listener-core",
        title: "Core Listener journey",
        summary:
          "End-to-end path after invite redemption — the primary build target for v1.0 mobile.",
        prdRef: "Mobile App PRD · §4 screens #2–10",
        role: "Listener",
        steps: [
          {
            num: 1,
            label: "Redeem invite",
            detail: "Access code validated — Partner affiliation bound.",
            screenKey: "login",
          },
          {
            num: 2,
            label: "Science education",
            detail: "What is SAT™ and how to listen effectively.",
            screenKey: "onboarding",
          },
          {
            num: 3,
            label: "Listening guidance",
            detail: "Headphones, environment, and session duration.",
            screenKey: "guidance",
          },
          {
            num: 4,
            label: "Neurotype assessment",
            detail: "Questionnaire for session alignment — clinical calm pacing.",
            screenKey: "neurotype",
          },
          {
            num: 5,
            label: "Recommended profile",
            detail: "Outcome screen — regulation family and session suggestions.",
            screenKey: "profile",
          },
          {
            num: 6,
            label: "Sessions library",
            detail: "Provisioned sessions as gradient cards — curated, not marketplace.",
            screenKey: "library",
          },
          {
            num: 7,
            label: "Session detail",
            detail: "Purpose, benefits, and play CTA before secure playback.",
            screenKey: "detail",
          },
          {
            num: 8,
            label: "Player",
            detail: "Full-screen ambient playback — controls recede, sound leads.",
            screenKey: "player",
            events: ["play_start", "play_complete"],
          },
          {
            num: 9,
            label: "Feedback",
            detail: "Post-session rating with optional comment.",
            screenKey: "feedback",
            events: ["feedback_submitted_session"],
          },
        ],
      },
      {
        id: "flow-listener-onboarding",
        title: "Onboarding & profile setup",
        summary: "First-run education and neurotype questionnaire before library access.",
        prdRef: "Mobile App PRD · §4 #3–4",
        role: "Listener",
        steps: [
          { num: 1, label: "What is Sonocea?", detail: "Patented sonic augmentation intro.", screenKey: "onboarding" },
          { num: 2, label: "How it works", detail: "Headphones, quiet space, neurotype alignment.", screenKey: "onboarding-2" },
          { num: 3, label: "Your journey", detail: "Assessment → library → listening practice.", screenKey: "onboarding-3" },
          { num: 4, label: "Neurotype Q2", detail: "Which best describes your neurotype?", screenKey: "neurotype" },
          { num: 5, label: "Profile complete", detail: "Recommendations ready.", screenKey: "neurotype-complete" },
          { num: 6, label: "Profile reveal", detail: "Regulation — Calm alignment.", screenKey: "profile" },
        ],
      },
      {
        id: "flow-listener-library",
        title: "Library → play → feedback",
        summary: "Repeat listening loop for provisioned Listeners after onboarding.",
        prdRef: "Mobile App PRD · §4 #5–10",
        role: "Listener",
        steps: [
          { num: 1, label: "Library", detail: "Assigned sessions with play affordance.", screenKey: "library" },
          { num: 2, label: "Favorites", detail: "Saved sessions for quick return.", screenKey: "favorites" },
          { num: 3, label: "Session detail", detail: "Sleep — about, duration, regulation tags.", screenKey: "detail" },
          { num: 4, label: "Player", detail: "Ambient full-screen with glass controls.", screenKey: "player" },
          { num: 5, label: "Feedback", detail: "How was your session?", screenKey: "feedback" },
        ],
      },
    ],
  },
  {
    id: "prd-flows-partner",
    sectionId: "prd-designs-ops",
    label: "Partner Console",
    title: "Organisation provisioning",
    description: "Web MVP for Partners — invite listeners, view scoped usage, billing reconciliation.",
    flows: [
      {
        id: "flow-partner-provision",
        title: "Partner provisioning flow",
        summary: "Sign in, review usage, invite a listener, manage roster.",
        prdRef: "Mobile App PRD · §4 Partner Console",
        role: "Partner",
        steps: [
          { num: 1, label: "Partner login", detail: "Organisation authentication.", screenKey: "partner-login" },
          { num: 2, label: "Dashboard", detail: "Invited · Activated · Listening metrics.", screenKey: "partner-dashboard" },
          { num: 3, label: "Invite listener", detail: "Email, bundle, optional message.", screenKey: "partner-invite" },
          { num: 4, label: "Listener roster", detail: "Active, invited, and pending listeners.", screenKey: "partner-roster" },
        ],
      },
    ],
  },
  {
    id: "prd-flows-admin",
    sectionId: "prd-designs-admin",
    label: "Admin CMS",
    title: "Platform operations",
    description: "Sonocea Admin — content upload, listener management, analytics, and billing data.",
    flows: [
      {
        id: "flow-admin-content",
        title: "Session upload → publish",
        summary: "Upload audio, metadata, versioning, and assignment to Partners or Listeners.",
        prdRef: "Mobile App PRD · §7 CMS",
        role: "Admin",
        steps: [
          { num: 1, label: "Session management", detail: "Upload audio file and metadata.", screenKey: "admin-sessions" },
          { num: 2, label: "Listener management", detail: "Invite and assign sessions.", screenKey: "admin-listeners" },
          { num: 3, label: "Analytics", detail: "Platform health, funnels, and billing export.", screenKey: "admin-analytics" },
        ],
      },
    ],
  },
  {
    id: "prd-flows-errors",
    sectionId: "prd-designs-errors",
    label: "Error states",
    title: "Degraded paths",
    description: "Public Visitor §9 and Mobile App error handling — protect trust without alarming users.",
    flows: [
      {
        id: "flow-pv-errors",
        title: "Public Visitor error handling",
        summary: "Network loss, audio unavailable, and session interruption during the 5-minute sample.",
        prdRef: "Public Visitor PRD · §9",
        role: "Public Visitor",
        steps: [
          { num: 1, label: "Connection issue", detail: "Clear retry affordance — check network.", screenKey: "error-network" },
          { num: 2, label: "Session unavailable", detail: "Fallback to science content or request access.", screenKey: "error-session" },
          { num: 3, label: "Resume listening", detail: "Return to player after interrupt.", screenKey: "pv-listening-alt" },
        ],
      },
    ],
  },
];

export function countDesignFlows() {
  return PRD_DESIGN_FLOW_GROUPS.reduce((n, g) => n + g.flows.length, 0);
}

export function countDesignFlowSteps() {
  return PRD_DESIGN_FLOW_GROUPS.reduce(
    (n, g) => n + g.flows.reduce((s, f) => s + f.steps.length, 0),
    0,
  );
}
