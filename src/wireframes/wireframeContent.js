/**
 * PRD-aligned copy for key-screen wireframes.
 * Sources: Sonocea Mobile App PRD (revised, June 2026) · Public Visitor PRD (June 2026)
 */

export const BRAND = {
  name: "Sonocea",
  tagline: "Sonic augmentation",
  mission:
    "Patented Sonic Augmentation Technology™ — structured Sessions designed to support autonomic regulation and emotional balance.",
};

export const ENTRY = {
  getStartedTitle: "Welcome to Sonocea",
  getStartedSubtitle: "Experience structured sound — or sign in with your invitation.",
  discoverCta: "Discover Sonocea",
  invitationCta: "Accept Invitation",
  loginCta: "Login",
  publicHeroBullets: [
    "5-minute nervous system reset",
    "Science-backed structured sound",
    "No sign-up required to start",
  ],
  publicLandingCta: "Start sample session",
  publicSecondaryCta: "Request access",
};

export const PUBLIC_SAMPLE = {
  title: "Nervous System Reset",
  subtitle: "Non-clinical · 5 minutes",
  tag: "Curated sample",
  headphones:
    "Find a quiet place, free of distractions, for a 5-minute nervous system reset.",
};

export const CHECK_IN = {
  beforeTitle: "How is your nervous system today?",
  beforeSubtitle: "A quick check-in before you listen.",
  afterTitle: "How did that feel?",
  afterSubtitle: "Remeasure after your session.",
  sliders: ["Stress level", "Your energy level", "Focus", "Restfulness"],
};

export const SCIENCE_TOPICS = [
  "Autonomic nervous system",
  "Why sound influences physiology",
  "Sonic Augmentation Technology™",
  "Sonostasis®",
  "Use cases",
  "Why HRV matters",
  "Current clinical research",
];

export const SCIENCE_HOME = {
  title: "How Sonocea works",
  subtitle: "What you just experienced — and the science behind structured sound.",
};

export const EXPERIENCED = {
  title: "What you just experienced",
  subtitle:
    "A brief nervous system reset using structured sound — not meditation, not generic relaxation.",
  body:
    "Sonocea Sonic Augmentation Technology™ produces measurable effects on autonomic regulation within minutes.",
};

export const PUBLIC_NAV = [
  { label: "Daily Reset", detail: "Check-in + 5-minute reset", featured: true },
  { label: "Science", detail: null },
  { label: "Research", detail: null },
  { label: "Applications", detail: null },
  { label: "Our Story", detail: null },
];

export const INVITATION = {
  tag: "Invited participant",
  title: "You're invited",
  subtitle:
    "Your organisation has provisioned Sonocea access. Activate your account to begin listening.",
  intro:
    "Brief intro to Sonocea before sign-up — you may preview public content first.",
};

export const AUTH = {
  accessCodeTitle: "Access code",
  accessCodeSubtitle: "Enter the invite or partner code you received.",
  createAccountTitle: "Create account",
  createAccountSubtitle:
    "Set up your listener profile with the invitation you received.",
};

export const ONBOARDING = {
  introTitle: "What is Sonocea?",
  introSubtitle:
    "Structured sound Sessions with Sonic Augmentation Technology™ — assigned by your organisation.",
  introBullets: [
    "Evidence-informed listening Sessions",
    "Assigned by your Partner or care team",
    "Private, headphone-first experience",
  ],
  steps: [
    { title: "Welcome", subtitle: "Personalised greeting after authentication." },
    {
      title: "How listening works",
      subtitle: "Headphones, quiet space, and Sessions aligned to your neurotype.",
    },
    {
      title: "Permissions",
      subtitle: "Notifications and background audio for uninterrupted listening.",
    },
  ],
  howItWorksBullets: [
    "Browse provisioned Sessions only",
    "Listen with headphones in a quiet space",
    "Share optional feedback after completion",
  ],
  permissions: ["Notifications", "Background audio"],
};

export const NEUROTYPE = {
  title: "Your listening profile",
  subtitle: "Which best describes your neurotype?",
  options: [
    { title: "Neurotypical", sub: "Standard regulation profile" },
    { title: "Low-support neurodivergent", sub: "Mild sensory or attention needs" },
    { title: "Higher-support neurodivergent", sub: "Greater sensory or regulation support" },
    { title: "Prefer not to say", sub: "Use general recommendations" },
  ],
  completeTitle: "Profile captured",
  completeSubtitle:
    "We'll use this to align Sessions provisioned to your neurotype group.",
};

export const GUIDANCE = {
  title: "Listening guidance",
  subtitle: "Optimal listening conditions before your first Session.",
  items: [
    "Use headphones",
    "Find a quiet space, free of distractions",
    "Allow the full Session duration (often 15 minutes)",
  ],
};

export const SESSIONS = {
  resume: { title: "Arrive · settle", meta: "14 min · Regulation", remaining: "05:18 left" },
  library: [
    { title: "Arrive · settle", meta: "14 min · Assigned" },
    { title: "Deep unwind", meta: "22 min · Assigned" },
    { title: "Focus reset", meta: "18 min · Assigned" },
    { title: "Wind down", meta: "15 min · Assigned" },
    { title: "Recovery", meta: "15 min · Assigned" },
  ],
  categories: ["Unwind", "Rest", "Recovery", "Focus", "Arrive", "Settle"],
  detail: {
    title: "Arrive · settle",
    duration: "14 min",
    useCase: "Starting your day",
    neurotype: "Neurotypical",
    benefits: "Supports calm arrival and autonomic settling before demanding tasks.",
    description:
      "A regulation Session using Sonic Augmentation Technology™ — purpose, audience fit, and benefits before play.",
  },
};

export const PLAYER = {
  sessionTitle: "Arrive · settle",
  duration: "14:00",
  category: "Regulation",
};

export const FEEDBACK = {
  completionSubtitle: "Optional quick rating after this Session — skip any time.",
  ratingTitle: "Rate this Session",
  ratingSubtitle: "How effective was this Session for you?",
  formTitle: "How was this Session?",
  formSubtitle: "Post-completion · optional comment",
  submittedSubtitle: "Your feedback helps improve Sessions and partner insights.",
};

export const ABOUT = {
  title: "About Sonocea",
  subtitle: "Mission, science summary, and policy links.",
  missionBullets: [
    "Structured sound for autonomic regulation",
    "Invite-only access via Partner organisations",
    "Privacy policy and terms linked below",
  ],
  links: ["Privacy policy", "Terms of use", "Open-source notices"],
  privacyLinks: ["Privacy policy", "Terms of use", "Licences", "Data processing"],
};

export const SUPPORT = {
  title: "Help",
  subtitle: "Account access, playback, invites, and privacy requests.",
  rows: [
    { title: "Email support", sub: "support@soncea.com" },
    { title: "FAQ", sub: "Playback, invites, offline listening" },
    { title: "Data & privacy", sub: "Export and deletion pathways" },
  ],
};

export const RESEARCH = {
  title: "Research",
  subtitle: "Clinical studies, biomarkers, and institutional partners.",
  publications: [
    "University of Florida · oxytocin and autonomic regulation",
    "Self-reported calm and stress reduction outcomes",
    "Institutional research partners",
  ],
};

export const REQUEST_ACCESS = {
  title: "Stay in the loop",
  subtitle: "Request access for yourself or your organisation.",
  fields: {
    name: "Your name",
    email: "Work email",
    organisation: "Organisation (optional)",
    role: "Your role (optional)",
  },
};

export const TOPIC_DETAIL = {
  category: "Science",
  title: "What is the autonomic nervous system?",
  excerpt:
    "Structured sound can influence autonomic regulation — distinct from generic relaxation or meditation audio.",
};
