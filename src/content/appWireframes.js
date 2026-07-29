/**
 * Mobile App PRD §4 - List of Mobile App Screens.
 * Plus Admin user stories (Section 5) as desktop Open App wireframes.
 */

import {
  DEMO_CREDENTIALS,
  DIRECT_ACCESS_PARTNER_ID,
  SESSION_CATALOG,
} from "../app/data/catalog.js";

const arrive = SESSION_CATALOG.find((s) => s.id === "ses-arrive");

/** Seed for authenticated, onboarded Listener previews. */
export const WIREFRAME_LISTENER_SEED = {
  role: "listener",
  user: {
    email: DEMO_CREDENTIALS.listener.email,
    name: "Alex Rivera",
    partnerId: "org-preston",
    inviteCode: DEMO_CREDENTIALS.listener.inviteCode,
  },
  onboardingComplete: true,
  neurotypeId: "regulator",
  onboardingPrefs: {
    preferredName: "Alex",
    supportGoals: ["recovery", "calmer"],
    listeningMoments: ["recover", "winding-down"],
    listeningTimes: ["evening"],
    sensorySensitivity: "sometimes",
    neurodivergence: "no",
    // Legacy aliases
    identityId: "no",
    sensoryId: "sometimes",
    supportIds: ["recovery", "calmer"],
    moodIds: ["recover", "winding-down"],
    listenTime: "evening",
  },
  appearance: "light",
  favoriteIds: ["ses-arrive", "ses-settle"],
};

/** Seed for anonymous / direct-access Listener previews. */
export const WIREFRAME_ANONYMOUS_LISTENER_SEED = {
  role: "listener",
  user: {
    email: undefined,
    name: "River",
    displayName: "River",
    partnerId: DIRECT_ACCESS_PARTNER_ID,
    inviteCode: DEMO_CREDENTIALS.anonymousListener.inviteCode,
    isAnonymous: true,
  },
  onboardingComplete: true,
  neurotypeId: "regulator",
  onboardingPrefs: {
    preferredName: "River",
    supportGoals: ["calmer", "sleep", "regulation"],
    listeningMoments: ["overwhelmed", "winding-down", "quiet"],
    listeningTimes: ["evening", "before-bed"],
    sensorySensitivity: "sometimes",
    neurodivergence: null,
    supportIds: ["calmer", "sleep", "regulation"],
    moodIds: ["overwhelmed", "winding-down", "quiet"],
    listenTime: "evening",
  },
  appearance: "light",
  favoriteIds: ["ses-evening-settle", "ses-deep"],
};

/** Seed for mid-onboarding previews. */
export const WIREFRAME_ONBOARDING_SEED = {
  role: "listener",
  user: {
    email: DEMO_CREDENTIALS.listener.email,
    name: "Alex Rivera",
    partnerId: "org-preston",
    inviteCode: DEMO_CREDENTIALS.listener.inviteCode,
  },
  onboardingComplete: false,
  neurotypeId: null,
  onboardingPrefs: null,
  appearance: "light",
  favoriteIds: [],
};

/** Seed for anonymous mid-onboarding previews. */
export const WIREFRAME_ANONYMOUS_ONBOARDING_SEED = {
  role: "listener",
  user: {
    email: undefined,
    name: "River",
    displayName: null,
    partnerId: DIRECT_ACCESS_PARTNER_ID,
    inviteCode: DEMO_CREDENTIALS.anonymousListener.inviteCode,
    isAnonymous: true,
  },
  onboardingComplete: false,
  neurotypeId: null,
  onboardingPrefs: null,
  appearance: "light",
  favoriteIds: [],
};

/** Seed for unauthenticated entry screens. */
export const WIREFRAME_GUEST_SEED = {
  role: null,
  user: null,
  onboardingComplete: false,
  neurotypeId: null,
  onboardingPrefs: null,
  appearance: "light",
  favoriteIds: [],
};

/** Seed for Admin console desktop previews. */
export const WIREFRAME_ADMIN_SEED = {
  role: "admin",
  user: {
    email: DEMO_CREDENTIALS.admin.email,
    name: "Sonocea Admin",
  },
  onboardingComplete: false,
  neurotypeId: null,
  onboardingPrefs: null,
  appearance: "light",
  favoriteIds: [],
};

/**
 * @typedef {{
 *   path: string,
 *   seed: 'guest' | 'onboarding' | 'listener' | 'admin',
 *   screen: string,
 *   label?: string,
 *   frame?: 'phone' | 'desktop',
 * }} WireframePreview
 *
 * @typedef {{
 *   id: string,
 *   number: string,
 *   title: string,
 *   note?: string,
 *   previews: WireframePreview[],
 * }} AppWireframeSection
 */

/** PRD §4 List of Mobile App Screens - nav order - then Admin §5 stories. */
/** @type {AppWireframeSection[]} */
export const APP_WIREFRAME_SECTIONS = [
  {
    id: "splash",
    number: "1",
    title: "Splash and brand intro",
    note: "See Public Visitor PRD for Non-Authenticated User Experience.",
    previews: [
      {
        path: "/app/listener/onboarding?phase=loading",
        seed: "onboarding",
        screen: "onboarding",
      },
    ],
  },
  {
    id: "auth",
    number: "2",
    title: "Sign-up, Login with invite link or pre-registered email address",
    previews: [
      {
        label: "Welcome",
        path: "/app/listener/invite",
        seed: "guest",
        screen: "invite",
      },
      {
        label: "Sign in",
        path: "/app/listener/login",
        seed: "guest",
        screen: "login",
      },
    ],
  },
  {
    id: "onboarding",
    number: "3",
    title: "First-time experience",
    previews: [
      {
        label: "Welcome + name",
        path: "/app/listener/onboarding?phase=welcome",
        seed: "onboarding",
        screen: "onboarding",
      },
      {
        label: "About Sonocea",
        path: "/app/listener/onboarding?phase=about",
        seed: "onboarding",
        screen: "onboarding",
      },
      {
        label: "Ready to listen",
        path: "/app/listener/onboarding?phase=ready",
        seed: "onboarding",
        screen: "onboarding",
      },
    ],
  },
  {
    id: "neurotype",
    number: "4",
    title: "Personalisation & optional research",
    previews: [
      {
        label: "What they want",
        path: "/app/listener/onboarding?phase=outcomes",
        seed: "onboarding",
        screen: "onboarding",
      },
      {
        label: "When they might use it",
        path: "/app/listener/onboarding?phase=context",
        seed: "onboarding",
        screen: "onboarding",
      },
      {
        label: "Sensory sensitivity",
        path: "/app/listener/onboarding?phase=sensory",
        seed: "onboarding",
        screen: "onboarding",
      },
      {
        label: "Listening time",
        path: "/app/listener/onboarding?phase=timing",
        seed: "onboarding",
        screen: "onboarding",
      },
      {
        label: "Notifications",
        path: "/app/listener/onboarding?phase=notifications",
        seed: "onboarding",
        screen: "onboarding",
      },
      {
        label: "Appearance",
        path: "/app/listener/onboarding?phase=appearance",
        seed: "onboarding",
        screen: "onboarding",
      },
      {
        label: "Preparing your first session",
        path: "/app/listener/onboarding?phase=preparing",
        seed: "onboarding",
        screen: "onboarding",
      },
    ],
  },
  {
    id: "library",
    number: "5",
    title: "Sonocea Sessions Library",
    previews: [
      {
        label: "Home",
        path: "/app/listener/home",
        seed: "listener",
        screen: "home",
      },
      {
        label: "Assigned sessions",
        path: "/app/listener/assigned",
        seed: "listener",
        screen: "assigned",
      },
    ],
  },
  {
    id: "favorites",
    number: "6",
    title: "Sonocea Favorites",
    previews: [
      {
        path: "/app/listener/favorites",
        seed: "listener",
        screen: "favorites",
      },
    ],
  },
  {
    id: "session-profile",
    number: "7",
    title: "Session Overview / Profile",
    previews: [
      {
        label: "Session Overview",
        path: `/app/listener/session/${arrive?.id ?? "ses-arrive"}`,
        seed: "listener",
        screen: "session",
      },
      {
        label: "Profile",
        path: "/app/listener/profile",
        seed: "listener",
        screen: "profile",
      },
    ],
  },
  {
    id: "player",
    number: "8",
    title: "Player",
    previews: [
      {
        path: `/app/listener/player/${arrive?.id ?? "ses-arrive"}`,
        seed: "listener",
        screen: "player",
      },
    ],
  },
  {
    id: "about",
    number: "9",
    title: "About Sonocea",
    previews: [
      {
        path: "/app/listener/about",
        seed: "listener",
        screen: "about",
      },
    ],
  },
  {
    id: "feedback",
    number: "10",
    title: "Feedback",
    previews: [
      {
        path: `/app/listener/feedback/${arrive?.id ?? "ses-arrive"}`,
        seed: "listener",
        screen: "feedback",
      },
    ],
  },
  {
    id: "support",
    number: "11",
    title: "Support",
    previews: [
      {
        path: "/app/listener/support",
        seed: "listener",
        screen: "support",
      },
    ],
  },
  {
    id: "admin-sessions",
    number: "A1",
    title: "Admin · Upload & manage Sessions",
    note: "Upload/publish Sessions with metadata and tags; assign to a Partner as an individual Session or Session Group.",
    previews: [
      {
        label: "Session CMS",
        path: "/app/admin/sessions",
        seed: "admin",
        screen: "admin-sessions",
        frame: "desktop",
      },
    ],
  },
  {
    id: "admin-organizations",
    number: "A2",
    title: "Admin · Partners, bundles & Listener association",
    note: "Set up Organizations, manage Partner-level content bundles, and associate Listeners to a Partner.",
    previews: [
      {
        label: "Organizations",
        path: "/app/admin/organizations",
        seed: "admin",
        screen: "admin-organizations",
        frame: "desktop",
      },
    ],
  },
  {
    id: "admin-invites",
    number: "A3",
    title: "Admin · Direct Listener invite",
    note: "Invite an individual Listener directly and associate them to the Partner or Organization they are affiliated with.",
    previews: [
      {
        label: "Invites",
        path: "/app/admin/invites",
        seed: "admin",
        screen: "admin-invites",
        frame: "desktop",
      },
    ],
  },
  {
    id: "admin-insights",
    number: "A4",
    title: "Admin · Usage insights",
    note: "Aggregate, Partner-level, and Listener-level usage with date range - invite acceptance, starts/completions, listening time, DAU/MAU, popular Sessions by neurotype, tags & categories.",
    previews: [
      {
        label: "Insights",
        path: "/app/admin/analytics",
        seed: "admin",
        screen: "admin-insights",
        frame: "desktop",
      },
      {
        label: "Export",
        path: "/app/admin/export",
        seed: "admin",
        screen: "admin-export",
        frame: "desktop",
      },
    ],
  },
];

export const APP_WIREFRAME_HERO = {
  title: "App Wireframes",
  intro:
    "Open App–fidelity screens from the Mobile App PRD §4 list, plus Sonocea Admin flows from Section 5 user stories.",
};

export const APP_WIREFRAME_NAV = APP_WIREFRAME_SECTIONS.map((s) => ({
  id: `wireframe-${s.id}`,
  label: s.number,
  title: s.title,
}));

/** Flat preview shape used by WireframePhonePreview / WireframeDesktopPreview. */
export function wireframeSeedFor(kind, seedMode = "org") {
  const anonymous = seedMode === "anonymous";
  if (kind === "guest") return WIREFRAME_GUEST_SEED;
  if (kind === "onboarding") {
    return anonymous ? WIREFRAME_ANONYMOUS_ONBOARDING_SEED : WIREFRAME_ONBOARDING_SEED;
  }
  if (kind === "admin") return WIREFRAME_ADMIN_SEED;
  if (kind === "listener") {
    return anonymous ? WIREFRAME_ANONYMOUS_LISTENER_SEED : WIREFRAME_LISTENER_SEED;
  }
  return anonymous ? WIREFRAME_ANONYMOUS_LISTENER_SEED : WIREFRAME_LISTENER_SEED;
}

/** @deprecated use APP_WIREFRAME_SECTIONS */
export const APP_WIREFRAMES = APP_WIREFRAME_SECTIONS;
