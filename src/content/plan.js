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
    deliverables: [
      { label: "Information Architecture", status: "complete" },
      { label: "Core User Flows", status: "complete" },
      { label: "Screen Inventory", status: "complete" },
      { label: "Wireframes — core journeys", status: "in-progress" },
      { label: "High-fidelity concepts", status: "in-progress" },
      { label: "Design tokens — foundations", status: "in-progress" },
      { label: "Component foundations", status: "pending" },
      { label: "Developer notes", status: "pending" },
    ],
    engineeringOutcome: {
      title: "After this phase the team can begin implementing:",
      items: [
        "Navigation",
        "Authentication",
        "Home",
        "Session Library",
        "Session Detail",
        "Audio Player",
        "Core component library",
      ],
    },
    signOff: ["MVP scope", "Information architecture", "Core flow catalogue", "Wireframe structure"],
    gateDate: "Jul 12",
  },
  {
    id: "phase-2",
    number: 2,
    title: "UX Finalisation & Wireframes",
    dates: "July 13–18",
    status: "upcoming",
    objective:
      "Refine wireframes based on consolidated feedback, lock navigation and screen hierarchy, and complete every authenticated listener screen.",
    deliverables: [
      "Revised and approved wireframes",
      "Listener onboarding",
      "Session completion & feedback",
      "Settings, About & Support",
      "Navigation model",
      "Screen-by-screen content structure",
      "Expanded component library",
      "Interaction states",
    ],
    engineeringOutcome:
      "The complete authenticated listener experience can be built end-to-end from approved wireframes.",
    signOff: ["Wireframe structure", "Navigation", "Screen hierarchy", "Content approach"],
    gateDate: "Jul 18",
  },
  {
    id: "phase-3",
    number: 3,
    title: "Visual Language & Design System",
    dates: "July 19–24",
    status: "upcoming",
    objective:
      "Define how Sonocea looks and behaves — visual direction, design system, session artwork, and the public visitor discovery journey.",
    deliverables: [
      "Visual direction",
      "Design system v1",
      "Light & dark mode approach",
      "Session artwork system",
      "Core component library",
      "Public Welcome & Check-In",
      "Public Listening Session",
      "Science & Request Access",
      "Motion principles",
    ],
    engineeringOutcome:
      "Engineering can build the complete public-facing application experience alongside the authenticated UI.",
    signOff: ["Visual language", "Theme approach", "Session artwork direction", "Component system"],
    gateDate: "Jul 24",
  },
  {
    id: "phase-4",
    number: 4,
    title: "High-Fidelity Prototype & Handoff",
    dates: "July 25–29",
    status: "upcoming",
    objective:
      "Apply the final visual system to all approved screens, build the clickable prototype, and prepare the engineering handoff package.",
    deliverables: [
      "High-fidelity mobile app screens",
      "Clickable prototype",
      "Empty, error & offline states",
      "Accessibility specifications",
      "Interaction & handoff notes",
      "State documentation",
      "Final design QA",
      "Asset export",
    ],
    engineeringOutcome: "Complete production-ready design package for development and QA.",
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

export const DESIGN_DELIVERABLES = [
  {
    id: "ux-architecture",
    title: "UX Architecture",
    status: "complete",
    statusLabel: "Complete",
    items: ["Information Architecture", "Route Map", "User Flows", "Screen Inventory"],
  },
  {
    id: "wireframes",
    title: "Wireframes",
    status: "in-progress",
    statusLabel: "In Progress",
    items: ["Core journeys", "Edge cases", "Error flows", "Player behaviour"],
  },
  {
    id: "ui-design",
    title: "UI Design",
    status: "in-progress",
    statusLabel: "In Progress",
    items: ["High fidelity screens", "Components", "Design tokens", "Motion", "Accessibility"],
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
];

export const DESIGN_PRIORITIES = [
  {
    id: "priority-01",
    rank: "01",
    title: "Core Listening Experience",
    items: ["Home", "Library", "Session Detail", "Player"],
  },
  {
    id: "priority-02",
    rank: "02",
    title: "Listener Experience",
    items: ["Authentication", "Onboarding", "Feedback"],
  },
  {
    id: "priority-03",
    rank: "03",
    title: "Public Visitor",
    items: ["Discovery", "Science", "Request Access"],
  },
  {
    id: "priority-04",
    rank: "04",
    title: "Production Polish",
    items: ["Accessibility", "Motion", "States", "QA"],
  },
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
