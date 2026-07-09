import {
  AnalyticsDashboardScreen,
  ListenerManagementScreen,
  SessionManagementScreen,
} from "../designs/phase1/screens/admin/AdminScreens.jsx";
import {
  FavoritesScreen,
  FeedbackScreen,
  LibraryScreen,
  PlayerConcept,
  SessionDetailConcept,
} from "../designs/phase1/screens/listener/CoreScreens.jsx";
import {
  AboutScreen,
  InviteScreen,
  ListeningGuidanceScreen,
  NeurotypeScreen,
  OnboardingIntroScreen,
  RecommendedProfileScreen,
  SplashScreen,
} from "../designs/phase1/screens/listener/OnboardingScreens.jsx";
import {
  InviteListenerScreen,
  ListenerListScreen,
  PartnerDashboardScreen,
  PartnerLoginScreen,
} from "../designs/phase1/screens/partner/PartnerScreens.jsx";
import {
  PvCheckInScreen,
  PvExperiencedScreen,
  PvGetStartedScreen,
  PvHeadphonesScreen,
  PvInvitationScreen,
  PvListeningScreen,
  PvRequestAccessScreen,
  PvReturningHomeScreen,
  PvScienceHomeScreen,
  PvTopicDetailScreen,
} from "../designs/prd/PublicVisitorScreens.jsx";
import { PRD_REVISED_META } from "./prdRevised/meta.js";

/** @param {React.ComponentType} Screen */
function concept(id, title, description, Screen, props = {}) {
  return { id, title, description, Screen, props };
}

export const PRD_DESIGNS_META = {
  title: "PRD design catalogue",
  subtitle: "High-fidelity screens mapped to the June 2026 revised PRDs",
  publicVisitor: PRD_REVISED_META.publicVisitor,
  mobileApp: PRD_REVISED_META.mobile,
  flowsLink: "/flows/revised",
};

export const PRD_DESIGNS_NAV = [
  { label: "Overview", shortLabel: "Overview", href: "#prd-designs-intro" },
  { label: "Golden route", shortLabel: "Golden", href: "#prd-designs-golden" },
  { label: "Public Visitor", shortLabel: "Public", href: "#prd-designs-public" },
  { label: "Listener", shortLabel: "Listener", href: "#prd-designs-listener" },
  { label: "Partner", shortLabel: "Partner", href: "#prd-designs-ops" },
  { label: "Admin", shortLabel: "Admin", href: "#prd-designs-admin" },
  { label: "Error states", shortLabel: "Errors", href: "#prd-designs-errors" },
];

export const PUBLIC_VISITOR_DESIGN_SECTIONS = [
  {
    id: "entry",
    sectionId: "prd-designs-pv-entry",
    label: "Entry routing",
    title: "Layer 0 · Get Started",
    description: "Discover Sonocea, Accept Invitation, or Login — from Public Visitor PRD §2 Layer 0.",
    layout: "rows",
    rows: [
      {
        id: "pv-get-started",
        title: "Get Started",
        purpose: "Three paths before authentication.",
        prdRef: "PV · Layer 0",
        concepts: [
          concept("pv-get-started", "Get Started", "Discover · Invitation · Login.", PvGetStartedScreen),
        ],
      },
      {
        id: "pv-invitation",
        title: "Accept Invitation",
        purpose: "Invited participant intro before sign-up.",
        prdRef: "IP-01 · IP-02",
        concepts: [
          concept("pv-invitation", "Invitation", "Brief welcome then activate.", PvInvitationScreen),
        ],
      },
    ],
  },
  {
    id: "golden",
    sectionId: "prd-designs-golden",
    label: "Golden route",
    title: "First-time Discover journey",
    description: "Experience before explanation — the guiding Public Visitor golden route.",
    layout: "flow",
    concepts: [
      concept("pv-flow-checkin", "Check-in", "Nervous system sliders.", PvCheckInScreen, { variant: "before" }),
      concept("pv-flow-headphones", "Headphones", "Environment prep.", PvHeadphonesScreen),
      concept("pv-flow-listening", "5-min reset", "Curated sample playback.", PvListeningScreen, { variant: "playing" }),
      concept("pv-flow-reflection", "Reflection", "Post-session remeasure.", PvCheckInScreen, { variant: "after" }),
      concept("pv-flow-experienced", "What you experienced", "Bridge to science.", PvExperiencedScreen),
      concept("pv-flow-science", "Science", "Education hub.", PvScienceHomeScreen),
      concept("pv-flow-register", "Register interest", "Access request.", PvRequestAccessScreen),
    ],
  },
  {
    id: "pv-screens",
    sectionId: "prd-designs-pv-screens",
    label: "Public screens",
    title: "Public Visitor screen checklist",
    description: "All draft UI screens from Public Visitor PRD §4.",
    layout: "rows",
    rows: [
      {
        id: "pv-check-in",
        title: "Check-in & reflection",
        purpose: "Stress, energy, focus, restfulness sliders.",
        states: ["Before session", "After session"],
        prdRef: "§4 Check-In · Reflection",
        concepts: [
          concept("pv-checkin-before", "Before", "Pre-session check-in.", PvCheckInScreen, { variant: "before" }),
          concept("pv-checkin-after", "After", "Post-session reflection.", PvCheckInScreen, { variant: "after" }),
        ],
      },
      {
        id: "pv-listening",
        title: "Listening session",
        purpose: "Single curated 5-minute nervous system reset.",
        states: ["Ready", "Playing"],
        prdRef: "FR-002 · FR-003",
        concepts: [
          concept("pv-listen-ready", "Ready", "Pre-playback.", PvListeningScreen, { variant: "ready" }),
          concept("pv-listen-playing", "Playing", "Active sample.", PvListeningScreen, { variant: "playing" }),
        ],
      },
      {
        id: "pv-education",
        title: "Science & education",
        purpose: "Browse educational content without signing in.",
        prdRef: "FR-004",
        concepts: [
          concept("pv-science-home", "Science home", "Topic library.", PvScienceHomeScreen),
          concept("pv-topic-detail", "Topic detail", "Article view.", PvTopicDetailScreen),
        ],
      },
      {
        id: "pv-returning",
        title: "Returning public home",
        purpose: "Layer 4 persistent navigation — light auth to replay sample.",
        prdRef: "FR-006 · Layer 4",
        concepts: [
          concept("pv-returning-home", "Public home", "Daily reset and education.", PvReturningHomeScreen),
        ],
      },
      {
        id: "pv-register",
        title: "Request access",
        purpose: "Mailing list and organization access request.",
        prdRef: "FR-005 · PV-04",
        concepts: [
          concept("pv-request-access", "Register interest", "Lead capture form.", PvRequestAccessScreen),
        ],
      },
    ],
  },
];

export const MOBILE_APP_DESIGN_SECTIONS = [
  {
    id: "listener",
    sectionId: "prd-designs-listener",
    label: "Listener",
    title: "Provisioned Listener screens",
    description: "Mapped to Mobile App v1.0 [REVISED] §4 screen list — designs from Phase 1 concept package.",
    layout: "rows",
    rows: [
      {
        id: "mobile-splash",
        num: "01",
        title: "Splash and brand intro",
        purpose: "Routes to Public Visitor path when unauthenticated.",
        prdRef: "§4 #1 · Public Visitor PRD",
        concepts: [concept("mobile-splash", "Splash", "Brand intro.", SplashScreen, { variant: "dark" })],
      },
      {
        id: "mobile-auth",
        num: "02",
        title: "Sign-up / login",
        purpose: "Invite link or pre-registered email.",
        prdRef: "§4 #2",
        concepts: [
          concept("mobile-invite-empty", "Empty", "Awaiting code.", InviteScreen, { variant: "empty" }),
          concept("mobile-invite-valid", "Valid", "Code recognised.", InviteScreen, { variant: "valid" }),
        ],
      },
      {
        id: "mobile-onboarding",
        num: "03",
        title: "Onboarding and science education",
        prdRef: "§4 #3",
        concepts: [
          concept("mobile-onboarding", "Introduction", "Science and listening model.", OnboardingIntroScreen, { step: 0 }),
          concept("mobile-guidance", "Listening guidance", "Headphones and environment.", ListeningGuidanceScreen),
        ],
      },
      {
        id: "mobile-neurotype",
        num: "04",
        title: "Neurotype questionnaire",
        prdRef: "§4 #4",
        concepts: [
          concept("mobile-neurotype", "Assessment", "Active question.", NeurotypeScreen, { variant: "question" }),
          concept("mobile-profile", "Recommended profile", "Outcome screen.", RecommendedProfileScreen),
        ],
      },
      {
        id: "mobile-library",
        num: "05",
        title: "Sessions library",
        prdRef: "§4 #5",
        concepts: [
          concept("mobile-library", "Library", "Provisioned sessions.", LibraryScreen, { variant: "default" }),
          concept("mobile-favorites", "Favorites", "Saved sessions.", FavoritesScreen, { variant: "populated" }),
        ],
      },
      {
        id: "mobile-session",
        num: "06–08",
        title: "Session detail & player",
        prdRef: "§4 #7–8",
        concepts: [
          concept("mobile-detail", "Session overview", "Purpose and benefits.", SessionDetailConcept, { variant: "available" }),
          concept("mobile-player", "Player", "Secure playback.", PlayerConcept, { variant: "playing" }),
        ],
      },
      {
        id: "mobile-support",
        num: "09–11",
        title: "About, feedback & support",
        prdRef: "§4 #9–11",
        concepts: [
          concept("mobile-about", "About Sonocea", "Policies and company info.", AboutScreen),
          concept("mobile-feedback", "Feedback", "Post-session rating.", FeedbackScreen, { variant: "rating" }),
        ],
      },
    ],
  },
  {
    id: "ops",
    sectionId: "prd-designs-ops",
    label: "Partner & Admin",
    title: "Partner Console and Admin CMS",
    description: "Web surfaces from Mobile App PRD §4 Partner Console — Phase 1 wireframe concepts.",
    layout: "rows",
    rows: [
      {
        id: "partner",
        title: "Partner Console",
        prdRef: "§4 Partner Console",
        concepts: [
          concept("partner-login", "Login", "Partner authentication.", PartnerLoginScreen),
          concept("partner-dashboard", "Dashboard", "Usage snapshot.", PartnerDashboardScreen),
          concept("partner-invite", "Invite listener", "Provision listener.", InviteListenerScreen),
          concept("partner-roster", "Listener roster", "Manage listeners.", ListenerListScreen),
        ],
      },
      {
        id: "admin",
        title: "Admin CMS",
        prdRef: "§7 CMS",
        concepts: [
          concept("admin-sessions", "Session management", "Upload and publish.", SessionManagementScreen, { variant: "upload" }),
          concept("admin-listeners", "Listener management", "Invite and assign.", ListenerManagementScreen, { variant: "invite" }),
          concept("admin-analytics", "Analytics", "Platform dashboard.", AnalyticsDashboardScreen),
        ],
      },
    ],
  },
  {
    id: "mobile-flow",
    sectionId: "prd-designs-mobile-flow",
    label: "Core journey",
    title: "Listener prototype flow",
    description: "End-to-end provisioned Listener journey after invite redemption.",
    layout: "flow",
    concepts: [
      concept("flow-invite", "Redeem invite", "Authentication.", InviteScreen, { variant: "valid" }),
      concept("flow-onboard", "Onboard", "Science education.", OnboardingIntroScreen, { step: 0 }),
      concept("flow-neurotype", "Neurotype", "Assessment.", NeurotypeScreen, { variant: "question" }),
      concept("flow-library", "Library", "Discover sessions.", LibraryScreen, { variant: "default" }),
      concept("flow-player", "Listen", "Playback.", PlayerConcept, { variant: "playing" }),
      concept("flow-feedback", "Feedback", "Post-session.", FeedbackScreen, { variant: "rating" }),
    ],
  },
];

export const PRD_DESIGNS_SECTIONS = [
  {
    id: "public",
    sectionId: "prd-designs-public",
    catalogue: "publicVisitor",
    label: "Public Visitor PRD",
    sections: PUBLIC_VISITOR_DESIGN_SECTIONS,
  },
  {
    id: "mobile",
    sectionId: "prd-designs-mobile",
    catalogue: "mobileApp",
    label: "Mobile App v1.0 [REVISED]",
    sections: MOBILE_APP_DESIGN_SECTIONS,
  },
];
