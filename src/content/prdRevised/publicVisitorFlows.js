/** Public Visitor flows from June 2026 PRD — with wireframe IDs for golden route and layers. */

export const PUBLIC_VISITOR_FLOW_GROUPS = [
  {
    id: "entry",
    sectionId: "revised-pv-flows-entry",
    label: "Entry routing",
    description: "Layer 0 — how a store download chooses their path before authentication.",
    flows: [
      {
        id: "pv-get-started",
        title: "Get Started (Layer 0)",
        prdScreens: "Public Visitor · §2 Layer 0",
        summary: "Three entry paths: Discover Sonocea, Accept Invitation, or Login.",
        role: "publicVisitor",
        surface: "mobile",
        steps: [
          {
            id: "s1",
            label: "Splash / brand intro",
            detail: "Sonocea brand moment — routes to Get Started.",
            wireframeId: "splash",
          },
          {
            id: "s2",
            label: "Get Started",
            detail: "Discover Sonocea · Accept Invitation · Login.",
            wireframeId: "pv-get-started",
            events: ["discover_selected", "invitation_selected", "login_selected"],
          },
        ],
      },
      {
        id: "pv-invitation-path",
        title: "Accept Invitation",
        prdScreens: "Public Visitor · §2 · FR-007",
        summary: "Invited participant previews Sonocea, then enters sign-up flow — bypasses full public journey after auth.",
        role: "invitedParticipant",
        surface: "mobile",
        steps: [
          {
            id: "s1",
            label: "Invitation intro",
            detail: "Brief welcome — organization or Sonocea invite context.",
            wireframeId: "pv-invitation",
          },
          {
            id: "s2",
            label: "Sign-up / login",
            detail: "OAuth and invite binding — transitions to Listener onboarding.",
            wireframeId: "login",
            events: ["invite_accepted", "login"],
          },
        ],
      },
      {
        id: "pv-login-path",
        title: "Login (member area)",
        prdScreens: "Public Visitor · §2 · FR-007",
        summary: "Returning or invited user authenticates directly to organization-scoped member experience.",
        role: "listener",
        surface: "mobile",
        steps: [
          { id: "s1", label: "Login", detail: "Email / OAuth for provisioned Listener.", wireframeId: "login" },
          {
            id: "s2",
            label: "Member home",
            detail: "Library or onboarding — no public sample required.",
            wireframeId: "library",
          },
        ],
      },
    ],
  },
  {
    id: "golden-route",
    sectionId: "revised-pv-flows-golden",
    label: "First-time golden route",
    description: "Guiding path for Public Visitors who choose Discover Sonocea.",
    flows: [
      {
        id: "pv-golden-route",
        title: "Discover Sonocea — first visit",
        prdScreens: "Public Visitor · §2 Golden Route",
        summary:
          "Experience before explanation: check-in, headphones, 5-minute reset, reflection, science, register interest.",
        role: "publicVisitor",
        surface: "mobile",
        steps: [
          {
            id: "s1",
            label: "Welcome",
            detail: "Calm entry into Discover path.",
            wireframeId: "pv-get-started",
          },
          {
            id: "s2",
            label: "Check-in",
            detail: "How is your nervous system today? Sliders: stress, energy, focus, restfulness.",
            wireframeId: "pv-check-in",
            events: ["check_in_started"],
          },
          {
            id: "s3",
            label: "Headphone prompt",
            detail: "Put on headphones; quiet place free of distractions.",
            wireframeId: "pv-headphones",
          },
          {
            id: "s4",
            label: "5-minute nervous system reset",
            detail: "Single curated non-clinical listening sample — no licensed protocols.",
            wireframeId: "pv-listening",
            events: ["five_minute_session_started", "five_minute_session_completed"],
          },
          {
            id: "s5",
            label: "Reflection",
            detail: "How did that feel? Remeasure stress, energy, focus, restfulness.",
            wireframeId: "pv-reflection",
            events: ["reflection_submitted"],
          },
          {
            id: "s6",
            label: "What you just experienced",
            detail: "Bridge from felt experience to science education.",
            wireframeId: "pv-science-home",
          },
          {
            id: "s7",
            label: "Explore the science",
            detail: "Topic library — ANS, SAT™, Sonostasis®, use cases, research.",
            wireframeId: "pv-topic-detail",
            events: ["science_article_viewed"],
          },
          {
            id: "s8",
            label: "Register interest",
            detail: "Mailing list, access request for self or organization.",
            wireframeId: "pv-request-access",
            events: ["request_access_submitted"],
          },
        ],
      },
    ],
  },
  {
    id: "returning",
    sectionId: "revised-pv-flows-returning",
    label: "Returning public visitor",
    description: "Layer 4 — persistent navigation after first-time UX.",
    flows: [
      {
        id: "pv-returning-home",
        title: "Returning Public Home",
        prdScreens: "Public Visitor · §2 Layer 4 · FR-006",
        summary: "Daily reset, science, research, applications, our story — light auth to replay sample.",
        role: "publicVisitor",
        surface: "mobile",
        steps: [
          {
            id: "s1",
            label: "Public Home",
            detail: "Persistent nav: Home, Daily Reset, Science, Research, Applications, Our Story, Request Access.",
            wireframeId: "pv-returning-home",
            events: ["return_visit"],
          },
          {
            id: "s2",
            label: "Daily Reset",
            detail: "Check-in + short listening — requires light authentication to replay (FR-006).",
            wireframeId: "pv-check-in",
          },
          {
            id: "s3",
            label: "Science / Research / Applications",
            detail: "Educational content browsable without full Listener entitlement.",
            wireframeId: "pv-topic-detail",
          },
        ],
      },
    ],
  },
  {
    id: "errors",
    sectionId: "revised-pv-flows-errors",
    label: "Error & edge states",
    description: "Public Visitor §9 — degraded paths that protect trust.",
    flows: [
      {
        id: "pv-offline",
        title: "No internet",
        prdScreens: "Public Visitor · §9",
        summary: "Graceful offline messaging; science content may cache; audio requires connection.",
        role: "publicVisitor",
        surface: "mobile",
        steps: [
          { id: "s1", label: "Connection lost", detail: "Clear retry affordance.", wireframeId: "pv-listening" },
          { id: "s2", label: "Cached education", detail: "Previously viewed science may remain readable." },
        ],
      },
      {
        id: "pv-audio-unavailable",
        title: "Audio unavailable",
        prdScreens: "Public Visitor · §9",
        summary: "Sample cannot load — user directed to science content or request access.",
        role: "publicVisitor",
        surface: "mobile",
        steps: [
          { id: "s1", label: "Playback error", detail: "Non-alarming error with support path." },
          { id: "s2", label: "Fallback", detail: "Continue to science or register interest." },
        ],
      },
      {
        id: "pv-session-interrupted",
        title: "Session interrupted",
        prdScreens: "Public Visitor · §9",
        summary: "Phone call, background kill, or headphone disconnect during 5-minute reset.",
        role: "publicVisitor",
        surface: "mobile",
        steps: [
          { id: "s1", label: "Interrupt detected", detail: "Save progress if possible." },
          { id: "s2", label: "Resume or restart", detail: "One completion counts toward success metrics." },
        ],
      },
    ],
  },
];
