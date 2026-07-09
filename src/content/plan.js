/**
 * Plan page content — four-phase design delivery programme (July 2026).
 */

export const PLAN_META = {
  eyebrow: "Design · July 2026",
  title: "Design Delivery Roadmap",
  dateRange: "July 7 – July 29, 2026",
  programmeStart: "July 7, 2026",
  programmeEnd: "July 29, 2026",
  intro:
    "Four consecutive design phases from product definition through to high-fidelity prototype and engineering handoff. Each phase produces clear deliverables and a sign-off gate before the next begins.",
};

export const PLAN_HERO = {
  eyebrow: PLAN_META.eyebrow,
  title: PLAN_META.title,
  intro: PLAN_META.intro,
};

export const PLAN_TIMELINE = [
  { id: "phase-1", label: "Phase 1", dates: "Jul 7–12", type: "phase" },
  { id: "phase-2", label: "Phase 2", dates: "Jul 13–18", type: "phase" },
  { id: "phase-3", label: "Phase 3", dates: "Jul 19–24", type: "phase" },
  { id: "phase-4", label: "Phase 4", dates: "Jul 25–29", type: "phase" },
];

export const CURRENT_PHASE_ID = "phase-1";

export const PLAN_PHASES = [
  {
    id: "phase-1",
    number: 1,
    title: "Product Definition & Core Flows",
    dates: "July 7–12",
    status: "in-progress",
    statusLabel: "In Progress",
    objective:
      "Align on MVP scope, finalise information architecture, and deliver the core user flow catalogue with wireframes and early high-fidelity concepts.",
    deliveryCategories: [
      {
        title: "UX",
        items: ["Core user flows", "Wireframe journeys", "Information architecture"],
      },
      {
        title: "High-Fidelity Designs",
        items: ["Authentication", "Home", "Session Library", "Session Detail", "Player"],
      },
      {
        title: "Design System",
        items: ["Typography", "Colour foundations", "Buttons", "Cards", "Navigation"],
      },
      {
        title: "Prototype",
        items: ["Clickable listener journey", "Primary navigation", "Playback flow"],
      },
    ],
    engineeringCanBuild: [
      "App navigation shell and tab structure",
      "Authentication screens and sign-in flow",
      "Home screen layout and session cards",
      "Session Library list, filters and empty states",
      "Session Detail screen with metadata and actions",
      "Audio player controls and playback states",
      "Core component library — buttons, cards, navigation",
    ],
    signOff: ["MVP scope", "Information architecture", "Core flow catalogue", "Wireframe structure"],
    gateDate: "Jul 12",
  },
  {
    id: "phase-2",
    number: 2,
    title: "UX Finalisation & Wireframes",
    dates: "July 13–18",
    status: "upcoming",
    goal: "Lock every authenticated listener screen in approved wireframes, ready for visual design.",
    deliverables: [
      "Revised wireframes — Home, Library, Detail, Player",
      "Listener onboarding flow — welcome, permissions, first session",
      "Session completion and feedback screens",
      "Settings, About and Support screens",
      "Navigation model with tab bar and deep-link behaviour",
      "Screen-by-screen content structure and copy placement",
      "Expanded component library — forms, lists, modals",
      "Interaction states — loading, empty, error, offline",
    ],
    engineeringOutcome:
      "Engineering receives approved wireframes for every authenticated listener screen and can build the complete in-app experience end-to-end.",
    signOff: ["Wireframe structure", "Navigation", "Screen hierarchy", "Content approach"],
    gateDate: "Jul 18",
  },
  {
    id: "phase-3",
    number: 3,
    title: "Visual Language & Design System",
    dates: "July 19–24",
    status: "upcoming",
    goal: "Define how Sonocea looks and behaves, and deliver the public visitor discovery journey.",
    deliverables: [
      "Visual direction — typography, colour, imagery principles",
      "Design system v1 — tokens, components, spacing scale",
      "Light and dark mode specifications",
      "Session artwork system — generation rules and display patterns",
      "Public Welcome and Check-In screens",
      "Public Listening Session experience",
      "Science and Request Access screens",
      "Motion principles and transition specifications",
    ],
    engineeringOutcome:
      "Engineering receives the complete design system and public visitor screens, and can build the full public-facing application alongside the authenticated UI.",
    signOff: ["Visual language", "Theme approach", "Session artwork direction", "Component system"],
    gateDate: "Jul 24",
  },
  {
    id: "phase-4",
    number: 4,
    title: "High-Fidelity Prototype & Handoff",
    dates: "July 25–29",
    status: "upcoming",
    goal: "Apply the final visual system to all screens and prepare the production handoff package.",
    deliverables: [
      "High-fidelity screens — all authenticated and public flows",
      "Clickable prototype covering primary user journeys",
      "Empty, error and offline state designs for every screen",
      "Accessibility specifications — contrast, touch targets, labels",
      "Interaction and handoff notes for engineering",
      "State documentation — all component variants",
      "Final design QA pass across all screens",
      "Asset export — icons, illustrations, artwork templates",
    ],
    engineeringOutcome:
      "Engineering receives a complete, production-ready design package with annotated screens, prototype links and exported assets for development and QA.",
    signOff: ["Final design", "Prototype", "Handoff package", "Development readiness"],
    gateDate: "Jul 29",
  },
];

export const PLAN_CHECKPOINTS = PLAN_PHASES.map((phase) => ({
  phase: `Phase ${phase.number}`,
  gate: phase.signOff.join(", "),
  date: phase.gateDate,
  highlight: phase.id === CURRENT_PHASE_ID,
}));

export const DESIGN_REVIEWS = [
  {
    id: "internal-review",
    title: "Internal Review",
    purpose: "Review wireframes, UX decisions and prepare the next delivery.",
  },
  {
    id: "design-handoff",
    title: "Design Handoff",
    purpose: "Present new screens, prototype updates and answer engineering questions.",
  },
  {
    id: "engineering-review",
    title: "Engineering Review",
    purpose: "Review implementation progress, gather feedback and agree priorities for the next delivery.",
  },
];

export const DESIGN_DELIVERABLES = [
  {
    id: "ux-architecture",
    title: "UX Architecture",
    status: "complete",
    statusLabel: "Complete",
    items: [
      "Information architecture — app sections and navigation hierarchy",
      "Route map — deep links, tab routes and screen transitions",
      "Core user flows — listen, discover, authenticate, complete session",
      "Screen inventory — 40+ screens mapped to user roles",
    ],
  },
  {
    id: "wireframes",
    title: "Wireframes",
    status: "in-progress",
    statusLabel: "In Progress",
    items: [
      "Core listener journeys — Home → Library → Detail → Player",
      "Onboarding and authentication wireframes",
      "Edge case flows — empty library, expired session, offline",
      "Player behaviour — play, pause, skip, background audio",
    ],
  },
  {
    id: "ui-design",
    title: "UI Design",
    status: "in-progress",
    statusLabel: "In Progress",
    items: [
      "High-fidelity screens — Authentication, Home, Library, Detail, Player",
      "Component library — buttons, cards, navigation, forms",
      "Design tokens — typography, colour, spacing, radius",
      "Motion specifications — transitions, loading, playback animations",
      "Accessibility — contrast ratios, touch targets, screen reader labels",
    ],
  },
];

export const DELIVERY_SEQUENCE = [
  {
    id: "ux-architecture",
    label: "UX Architecture",
    description: "Define information structure, routes and user journeys before visual design begins.",
  },
  {
    id: "wireframes",
    label: "Wireframes",
    description: "Validate layout, flow and interaction logic at low fidelity.",
  },
  {
    id: "high-fidelity",
    label: "High Fidelity",
    description: "Apply visual design, components and design tokens to approved wireframes.",
  },
  {
    id: "prototype",
    label: "Prototype",
    description: "Connect screens into interactive flows for review and validation.",
  },
  {
    id: "developer-review",
    label: "Developer Review",
    description: "Engineering reviews specifications, annotations and implementation feasibility.",
  },
  {
    id: "implementation",
    label: "Implementation",
    description: "Development builds against approved designs and handoff documentation.",
  },
  {
    id: "qa",
    label: "QA",
    description: "Design and engineering validate implementation against specifications.",
  },
  {
    id: "release",
    label: "Release",
    description: "Production-ready design package signed off for launch.",
  },
  {
    id: "iteration",
    label: "Iteration",
    description: "Refine designs based on feedback and plan the next delivery cycle.",
  },
];

export const NEXT_DESIGN_DELIVERABLES = [
  "Authentication",
  "Home",
  "Session Library",
  "Session Detail",
  "Player",
  "Core Prototype",
];

export const DELIVERABLE_STATUS = {
  complete: { label: "Complete", className: "text-emerald-700", icon: "✓" },
  "in-progress": { label: "In Progress", className: "text-amber-700", icon: "◐" },
  pending: { label: "Pending", className: "text-ink-400", icon: "○" },
};

export const CATEGORY_STATUS = {
  complete: { label: "Complete", className: "bg-emerald-50 text-emerald-800 border-emerald-200/60" },
  "in-progress": { label: "In Progress", className: "bg-amber-50 text-amber-800 border-amber-200/60" },
  pending: { label: "Pending", className: "bg-paper-100 text-ink-500 border-ink-200/60" },
};

export function getCurrentPhase() {
  return PLAN_PHASES.find((p) => p.id === CURRENT_PHASE_ID) ?? PLAN_PHASES[0];
}

export function getUpcomingPhases() {
  const currentIndex = PLAN_PHASES.findIndex((p) => p.id === CURRENT_PHASE_ID);
  return currentIndex >= 0 ? PLAN_PHASES.slice(currentIndex + 1) : PLAN_PHASES.slice(1);
}
