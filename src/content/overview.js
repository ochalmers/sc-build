/**
 * Overview page content — Sonocea App v2.0 landing page.
 */

export const OVERVIEW_HERO = {
  eyebrow: "Design Programme · Phase 02 · June 2026",
  title: "Sonocea App v2.0",
  intro:
    "The single source of truth for designing and building the Sonocea mobile application — aligned across product, design and engineering.",
  contains: [
    "Product planning",
    "User journeys",
    "Wireframes",
    "High fidelity designs",
    "Design system",
    "References",
    "Build documentation",
  ],
  ctas: {
    primary: { label: "Open working app", to: "/app" },
    secondary: { label: "Explore Flows", to: "/flows" },
  },
};

export const SOURCE_DOCUMENTS = [
  {
    id: "public-visitor",
    label: "Public Visitor PRD",
    description:
      "Defines the experience for unauthenticated users discovering Sonocea for the first time.",
    download: "/assets/prd/sonocea-prd-public-visitor-june-2026.pdf",
    downloadLabel: "Sonocea PRD — Public Visitor (June 2026).pdf",
    flows: "/flows#flows-public-visitor",
    wireframes: "/flows#flows-public-visitor",
  },
  {
    id: "mobile-app",
    label: "Mobile App PRD",
    description:
      "Defines the authenticated listener experience, onboarding, session playback and application behaviour.",
    download: "/assets/prd/sonocea-mobile-app-prd-revised-june-2026.pdf",
    downloadLabel: "Sonocea Mobile App PRD (revised, June 2026).pdf",
    flows: "/flows#flows-library-discovery",
    wireframes: "/flows#flows-library-discovery",
    app: "/app",
  },
];

export const PRODUCT_ECOSYSTEM = [
  {
    stage: "Sonocea App",
    explanation: "The mobile product — one app, two modes of access.",
  },
  {
    stage: "Public Visitor",
    explanation: "Unauthenticated discovery before organisational verification.",
  },
  {
    stage: "Invitation",
    explanation: "Partner-provisioned access converts visitors into listeners.",
  },
  {
    stage: "Authenticated Listener",
    explanation: "Verified user with assigned sessions and secure playback.",
  },
  {
    stage: "Session Library",
    explanation: "Curated catalogue of audio sessions available to the listener.",
  },
  {
    stage: "Player",
    explanation: "Protected listening experience with progress and controls.",
  },
  {
    stage: "Feedback",
    explanation: "Post-session input that informs clinical and product insight.",
  },
  {
    stage: "Analytics",
    explanation: "Usage data across visitor, listener and partner surfaces.",
  },
];

export const USER_TYPES = [
  {
    role: "Public Visitor",
    purpose: "Discover Sonocea before joining a programme.",
    goals: ["Explore the product", "Experience a curated sample", "Learn the science", "Request access"],
    permissions: ["Browse public content", "Play one sample session", "Submit access request", "No account required"],
  },
  {
    role: "Listener",
    purpose: "Complete assigned audio sessions as part of a care programme.",
    goals: ["Redeem invitation", "Complete onboarding", "Listen to sessions", "Provide feedback"],
    permissions: ["Access assigned library only", "Secure playback", "Submit session feedback", "View own progress"],
  },
  {
    role: "Partner",
    purpose: "Provision and monitor listeners within an organisation.",
    goals: ["Invite listeners", "Track usage", "Manage programme access", "Review billing"],
    permissions: ["Provision via Admin", "View scoped analytics", "Manage listener roster", "No content editing"],
  },
  {
    role: "Admin",
    purpose: "Operate the platform — content, partners and system configuration.",
    goals: ["Manage sessions", "Configure partners", "Monitor analytics", "Handle billing"],
    permissions: ["Full CMS access", "Partner management", "Public visitor analytics", "System configuration"],
  },
];

export const BUILD_FOCUS = {
  currentStage: "prototype",
  stages: [
    {
      id: "architecture",
      label: "Architecture",
      explanation: "Product structure, user modes and system boundaries defined.",
    },
    {
      id: "flows",
      label: "Flows",
      explanation: "Complete user journeys mapped with screen logic and edge cases.",
    },
    {
      id: "wireframes",
      label: "Wireframes",
      explanation: "Low-fidelity layouts validating structure before visual design.",
    },
    {
      id: "ui-design",
      label: "UI Design",
      explanation: "High-fidelity screens, components and interaction specifications.",
    },
    {
      id: "prototype",
      label: "Working app",
      explanation: "Semi-working Mobile App PRD build at /app for iteration and review.",
    },
    {
      id: "development",
      label: "Development",
      explanation: "Engineering implementation against PRDs and design specs.",
    },
    {
      id: "testing",
      label: "Testing",
      explanation: "QA, accessibility review and playback validation.",
    },
    {
      id: "launch",
      label: "Launch",
      explanation: "App store release and partner programme rollout.",
    },
  ],
};

export const WORKSPACE_SECTIONS = [
  {
    label: "Overview",
    to: "/",
    why: "Orient new team members and stakeholders to the programme.",
    content: "Product context, PRDs, roles, build status and quick-start guides.",
    forDevs: "Start here — understand what exists and where to go next.",
  },
  {
    label: "Plan",
    to: "/plan",
    why: "Align delivery scope, sequencing and phase gates.",
    content: "Roadmap, milestones, priorities and open decisions.",
    forDevs: "Know what ships when and what is in scope for each phase.",
  },
  {
    label: "Flows",
    to: "/flows",
    why: "Document how the application behaves end to end.",
    content: "Architecture, user journeys, screen logic and error states.",
    forDevs: "The behavioural spec — read before implementing any feature.",
  },
  {
    label: "Design",
    to: "/design",
    why: "Define the visual language and UI specifications.",
    content: "Design system, components, screen inventory and interaction states.",
    forDevs: "Component specs, tokens, states and accessibility requirements.",
  },
  {
    label: "References",
    to: "/references",
    why: "Collect inspiration, research and technical context.",
    content: "Curated Mobbin screens for player, discovery, onboarding, and navigation patterns.",
    forDevs: "Supporting material — not product definition, but useful context.",
  },
];

export const WHATS_NEXT = [
  {
    label: "Working app",
    to: "/app",
    description: "Semi-working Mobile App PRD — Listener, Partner, and Admin.",
  },
  {
    label: "Plan",
    to: "/plan",
    description: "Delivery roadmap, phases and what ships next.",
  },
  {
    label: "Flows",
    to: "/flows",
    description: "Complete user journeys and application architecture.",
  },
  {
    label: "Design",
    to: "/design",
    description: "Visual language, components and screen specifications.",
  },
];
