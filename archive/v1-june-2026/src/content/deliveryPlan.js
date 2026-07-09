export const DELIVERY_PLAN_META = {
  title: "Sonocea Mobile App v1.0",
  subtitle: "Four-Stage Design Delivery Plan",
  description:
    "Design programme kicking off the week of July 7, 2026 — aligned to the June revised PRDs. Phase 1 delivers the full PRD-identified flow catalogue plus two high-fidelity concepts by July 11, with four consecutive working weeks through to prototype and handoff.",
  dateRange: "July 7 – August 1, 2026",
  programmeStart: "July 7, 2026",
  programmeEnd: "August 1, 2026",
};

export const DELIVERY_PLAN_TIMELINE = [
  { id: "phase-1", label: "Phase 1", dates: "Jul 7–11", type: "phase" },
  { id: "phase-2", label: "Phase 2", dates: "Jul 14–18", type: "phase" },
  { id: "phase-3", label: "Phase 3", dates: "Jul 21–25", type: "phase" },
  { id: "phase-4", label: "Phase 4", dates: "Jul 28 – Aug 1", type: "phase" },
];

export const DELIVERY_PLAN_PRINCIPLES = [
  {
    title: "Decide before designing",
    body: "Each phase must produce a clear decision before the next phase begins.",
  },
  {
    title: "Keep v1 focused",
    body: "The MVP should prioritise the listener experience and avoid unnecessary admin, billing or enterprise complexity.",
  },
  {
    title: "Design around flows, not isolated screens",
    body: "The work should be structured around onboarding, discovery, listening, reflection and returning use.",
  },
  {
    title: "Use async feedback carefully",
    body: "Feedback should be consolidated into one clear list before design revisions begin.",
  },
];

export const DELIVERY_PLAN_PRODUCT_AREAS = [
  {
    role: "Public Visitor",
    surface: "Unauthenticated app",
    summary:
      "Store download, discover journey, 5-minute curated sample, science content, and access-request capture — before organisational verification.",
    priority: true,
  },
  {
    role: "Listener App",
    surface: "Provisioned product",
    summary:
      "Invite redemption, onboarding, listening guidance, session library, player, feedback, and support.",
    priority: true,
  },
  {
    role: "Partner Experience",
    surface: "Minimal partner surface",
    summary: "Partner login, invite listeners, and view basic usage snapshot.",
    priority: false,
  },
  {
    role: "Admin Experience",
    surface: "Lightweight admin",
    summary: "Manage sessions, organisations, listeners, assignments, and basic analytics.",
    priority: false,
  },
];

export const DELIVERY_PLAN_PHASES = [
  {
    id: "plan-phase-1",
    number: 1,
    title: "Product Definition, Flows & Early Hi-Fi",
    dates: "July 7–11",
    objective:
      "Kick off the programme, align on MVP scope, and deliver the full revised PRD flow catalogue plus two high-fidelity concepts.",
    activities: [
      "Review June 2026 revised PRDs (Public Visitor + Mobile App v1.0) and confirm scope decisions",
      "Finalise MVP feature set and information architecture",
      "Wireframe all PRD-identified flows (public visitor, listener, partner, admin, billing, platform, clinical)",
      "Publish flow catalogue on the microsite",
      "Explore visual direction on two key listener screens",
      "Set up Figma and Paper structure",
      "Gather inspiration and references",
    ],
    deliverables: [
      "Full PRD flow wireframe catalogue",
      "Two high-fidelity concept screens",
      "MVP scope definition",
      "In / out / under review matrix",
      "Simplified information architecture",
      "Key screen inventory",
      "Inspiration and reference board",
    ],
    feedback: {
      title: "Workshop 01: Product Alignment",
      attendees: ["Anthony", "Sarah", "Stefan", "Oli"],
      agenda: [
        "Review MVP scope",
        "Confirm what is removed",
        "Confirm what remains under review",
        "Walk through simplified flows",
        "Agree priority journeys",
      ],
    },
    signOff: [
      "MVP scope",
      "Information architecture",
      "Full PRD flow catalogue",
      "Two hi-fi concepts",
    ],
  },
  {
    id: "plan-phase-2",
    number: 2,
    title: "UX Finalisation & Wireframes",
    dates: "July 14–18",
    objective:
      "Refine the flow catalogue and wireframes based on consolidated feedback from Workshop 01.",
    activities: [
      "Revise flows based on stakeholder feedback",
      "Resolve gaps or inconsistencies flagged during review",
      "Define navigation model",
      "Tighten listener onboarding, discovery, playback and feedback flows",
      "Refine partner and admin wireframes",
      "Define content hierarchy per screen",
    ],
    deliverables: [
      "Revised and approved wireframes",
      "Listener journey refinements",
      "Partner invite and usage refinements",
      "Admin content and assignment refinements",
      "Navigation model",
      "Screen-by-screen content structure",
    ],
    keyScreens: {
      Listener: [
        "Splash",
        "Welcome / guest landing",
        "Invite code",
        "Onboarding introduction",
        "Neurotype questionnaire",
        "Listening guidance",
        "Recommended profile",
        "Library",
        "Session detail",
        "Player",
        "Feedback",
        "About / support",
      ],
      Partner: ["Login", "Dashboard", "Invite listener", "Listener status"],
      Admin: ["Session management", "Listener management", "Organisation / assignment", "Basic analytics"],
    },
    feedback: {
      title: "Workshop 02: UX Review",
      agenda: [
        "Walk through the listener journey",
        "Review onboarding and neurotype flow",
        "Review session discovery and playback",
        "Review partner and admin minimum requirements",
        "Identify UX gaps before visual design begins",
      ],
    },
    signOff: ["Wireframe structure", "Navigation", "Screen hierarchy", "Content approach"],
    lockNote:
      "Once approved, the UX structure should be considered locked unless a critical issue emerges.",
  },
  {
    id: "plan-phase-3",
    number: 3,
    title: "Visual Language & Design System",
    dates: "July 21–25",
    objective:
      "Define how Sonocea looks, feels and behaves across light mode, dark mode, session artwork, sound blends and core UI components.",
    activities: [
      "Explore visual direction",
      "Define light mode and dark mode approach",
      "Define colour system",
      "Define typography usage",
      "Explore sound blend visuals",
      "Explore session artwork system",
      "Create core components",
      "Create player UI direction",
      "Create session card and session detail design",
      "Define motion and interaction principles",
    ],
    deliverables: [
      "Visual direction",
      "Design system v1",
      "Light mode sample screens",
      "Dark mode sample screens",
      "Session artwork system",
      "Core component library",
      "Motion principles",
      "Key high-fidelity screen explorations",
    ],
    designSystemComponents: [
      "Typography",
      "Colour styles",
      "Buttons",
      "Inputs",
      "Cards",
      "Session cards",
      "Navigation",
      "Tabs",
      "Progress indicators",
      "Player controls",
      "Feedback controls",
      "Empty states",
      "Error states",
      "Loading states",
    ],
    sessionArtwork: {
      groups: [
        {
          name: "Care",
          examples: ["Hospital Preparation", "Pregnancy Support", "Recovery", "Rest"],
        },
        {
          name: "Regulation",
          examples: ["Calm", "Reset", "Overwhelm", "Anxiety"],
        },
        {
          name: "Performance",
          examples: ["Focus", "Flow", "Deep Work", "Preparation"],
        },
      ],
      themeNote:
        "Design the core experience primarily in the preferred primary theme. Create light and dark examples for Library, Session detail, Player, and Feedback.",
    },
    feedback: {
      title: "Workshop 03: Visual Direction Review",
      agenda: [
        "Review visual territories",
        "Review light and dark mode approach",
        "Review session artwork system",
        "Review design system foundations",
        "Agree final visual direction",
      ],
    },
    signOff: ["Visual language", "Theme approach", "Session artwork direction", "Component system"],
  },
  {
    id: "plan-phase-4",
    number: 4,
    title: "High-Fidelity Prototype & Handoff",
    dates: "July 28 – August 1",
    objective:
      "Create the final high-fidelity product experience and prepare the work for development.",
    activities: [
      "Apply final visual system to all approved screens",
      "Build high-fidelity listener journey",
      "Build partner screens",
      "Build admin screens",
      "Create clickable prototype",
      "Add interaction notes",
      "Add handoff annotations",
      "Document states and edge cases",
      "Prepare engineering questions",
    ],
    deliverables: [
      "High-fidelity mobile app screens",
      "High-fidelity partner screens",
      "High-fidelity admin screens",
      "Clickable prototype",
      "Design system v1",
      "Handoff notes",
      "Interaction notes",
      "State documentation",
      "Engineering-ready Figma file",
    ],
    prototypeFlow: [
      "Guest opens app",
      "Learns about Sonocea",
      "Redeems invite",
      "Completes onboarding",
      "Completes neurotype assessment",
      "Receives recommended sessions",
      "Browses library",
      "Opens session detail",
      "Starts playback",
      "Completes session",
      "Leaves feedback",
      "Returns to library / favourites",
    ],
    states: [
      "Empty",
      "Loading",
      "Success",
      "Error",
      "Invalid invite",
      "Expired invite",
      "No sessions assigned",
      "Session unavailable",
      "Feedback submitted",
      "Offline / connection issue",
    ],
    feedback: {
      title: "Workshop 04: Final Review & Handoff",
      agenda: [
        "Walk through final prototype",
        "Review key listener journey",
        "Review partner and admin coverage",
        "Review handoff notes",
        "Confirm development questions",
        "Agree next steps",
      ],
    },
    signOff: ["Final design", "Prototype", "Handoff package", "Development readiness"],
  },
];

export const DELIVERY_PLAN_FEEDBACK_LOOP = {
  steps: [
    "Design work",
    "Stakeholder review",
    "Consolidated feedback",
    "Revisions",
    "Sign-off",
    "Next phase",
  ],
  rules: [
    "Feedback must be consolidated before implementation",
    "Each phase needs a clear decision",
    "New scope should not be introduced after wireframe sign-off unless critical",
    "Visual feedback should not reopen UX decisions",
    "Engineering questions should be captured separately from design preference feedback",
  ],
};

export const DELIVERY_PLAN_OUTPUTS = [
  {
    category: "Product Definition",
    items: [
      "Approved MVP scope",
      "In / out / under review decisions",
      "Simplified information architecture",
      "Reduced flow catalogue",
    ],
  },
  {
    category: "UX",
    items: [
      "Full PRD flow wireframe catalogue",
      "Revised wireframes",
      "Navigation model",
      "Screen-by-screen content structure",
    ],
  },
  {
    category: "UI",
    items: [
      "Two high-fidelity concepts",
      "Visual language",
      "Light and dark mode approach",
      "Session artwork system",
      "Design system v1",
      "High-fidelity screens",
    ],
  },
  {
    category: "Prototype",
    items: ["Clickable listener journey", "Partner journey", "Admin journey"],
  },
  {
    category: "Handoff",
    items: [
      "Interaction notes",
      "State documentation",
      "Accessibility notes",
      "Engineering questions",
    ],
  },
];

export const DELIVERY_PLAN_CHECKPOINTS = [
  {
    phase: "Phase 1",
    gate: "MVP scope, IA, flow catalogue and hi-fi concepts signed off",
    date: "Jul 11",
    highlight: true,
  },
  {
    phase: "Phase 2",
    gate: "Wireframes and navigation locked",
    date: "Jul 18",
  },
  {
    phase: "Phase 3",
    gate: "Visual language and design system approved",
    date: "Jul 25",
  },
  {
    phase: "Phase 4",
    gate: "Prototype and handoff package complete",
    date: "Aug 1",
  },
];

export const DELIVERY_PLAN_CHAPTERS = [
  { id: "plan-intro", label: "Overview", shortLabel: "Overview", href: "#plan-intro" },
  { id: "plan-principles", label: "Principles", shortLabel: "Principles", href: "#plan-principles" },
  { id: "plan-roadmap", label: "Roadmap", shortLabel: "Roadmap", href: "#plan-roadmap" },
  { id: "plan-phases", label: "Phases", shortLabel: "Phases", href: "#plan-phases" },
  { id: "plan-feedback", label: "Feedback loop", shortLabel: "Feedback", href: "#plan-feedback" },
  { id: "plan-outputs", label: "Final outputs", shortLabel: "Outputs", href: "#plan-outputs" },
  { id: "plan-checkpoints", label: "Checkpoints", shortLabel: "Checkpoints", href: "#plan-checkpoints" },
];
