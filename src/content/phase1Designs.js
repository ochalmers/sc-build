import {
  AnalyticsDashboardScreen,
  ListenerManagementScreen,
  SessionManagementScreen,
} from "../designs/phase1/screens/admin/AdminScreens.jsx";
import SessionArtworkGrid from "../designs/phase1/screens/artwork/SessionArtworkGrid.jsx";
import {
  ErrorStateScreen,
  FavoritesScreen,
  FeedbackScreen,
  LibraryLoadingScreen,
  LibraryScreen,
  PlayerConcept,
  PlayerLoadingScreen,
  SessionDetailConcept,
  SessionDetailLoadingScreen,
  SuccessStateScreen,
} from "../designs/phase1/screens/listener/CoreScreens.jsx";
import {
  AboutScreen,
  InviteScreen,
  ListeningGuidanceScreen,
  NeurotypeScreen,
  OnboardingIntroScreen,
  RecommendedProfileScreen,
  SplashScreen,
  WelcomeScreen,
} from "../designs/phase1/screens/listener/OnboardingScreens.jsx";
import {
  InviteListenerScreen,
  ListenerListScreen,
  PartnerDashboardScreen,
  PartnerLoginScreen,
} from "../designs/phase1/screens/partner/PartnerScreens.jsx";
import DesignSystemShowcase from "../designs/phase1/screens/system/DesignSystemShowcase.jsx";

export const PHASE1_META = {
  source: "Sonocea App — Phase 1 concept package",
  frame: "Dark primary · light reference screens · wireframe admin/partner",
  figmaNode: "10:41163",
  scope: {
    listener: 13,
    partner: 4,
    admin: 4,
    artwork: 12,
    prototype: "Onboarding → Library → Detail → Player → Feedback",
  },
};

/** @param {React.ComponentType<{variant?: string, theme?: string, step?: number}>} Screen */
function concept(id, title, description, Screen, props = {}) {
  return { id, title, description, Screen, props };
}

export const PHASE1_SECTIONS = [
  {
    id: "listener",
    label: "Core listener",
    title: "Listener screens (01–13)",
    description: "13 fully designed screens — dark mode primary. Each row groups variants of the same screen.",
    layout: "rows",
    rows: [
      {
        id: "splash",
        num: "01",
        title: "Splash",
        purpose: "Brand introduction and loading state.",
        states: ["Dark", "Light"],
        concepts: [
          concept("splash-dark", "Dark", "Primary launch screen.", SplashScreen, { variant: "dark" }),
          concept("splash-light", "Light", "Light-mode reference.", SplashScreen, { variant: "light" }),
        ],
      },
      {
        id: "welcome",
        num: "02",
        title: "Welcome",
        purpose: "Explain Sonocea, learn more, or enter an invite.",
        states: ["Guest", "Invited"],
        concepts: [
          concept("welcome-guest", "Guest", "No invite yet.", WelcomeScreen, { variant: "guest" }),
          concept("welcome-invited", "Invited", "Pre-provisioned invite ready.", WelcomeScreen, { variant: "invited" }),
        ],
      },
      {
        id: "invite",
        num: "03",
        title: "Access code",
        purpose: "Redeem partner or direct invite.",
        states: ["Empty", "Valid", "Invalid", "Expired"],
        concepts: [
          concept("invite-empty", "Empty", "Awaiting code entry.", InviteScreen, { variant: "empty" }),
          concept("invite-valid", "Valid", "Code recognised.", InviteScreen, { variant: "valid" }),
          concept("invite-invalid", "Invalid", "Unrecognised code.", InviteScreen, { variant: "invalid" }),
          concept("invite-expired", "Expired", "Invite no longer active.", InviteScreen, { variant: "expired" }),
        ],
      },
      {
        id: "onboarding",
        num: "04",
        title: "Onboarding",
        purpose: "Introduction to sonic augmentation and the listening model.",
        states: ["What is Sonocea?", "How it works", "Your journey"],
        concepts: [
          concept("onboarding-1", "What is Sonocea?", "Science and positioning.", OnboardingIntroScreen, { step: 0 }),
          concept("onboarding-2", "How it works", "Listening model and neurotype.", OnboardingIntroScreen, { step: 1 }),
          concept("onboarding-3", "Your journey", "Assessment and library path.", OnboardingIntroScreen, { step: 2 }),
        ],
      },
      {
        id: "neurotype",
        num: "05",
        title: "Neurotype assessment",
        purpose: "Listener profiling questionnaire.",
        states: ["Question", "Progress", "Complete"],
        concepts: [
          concept("neurotype-question", "Question", "Active assessment item.", NeurotypeScreen, { variant: "question" }),
          concept("neurotype-progress", "Progress", "Mid-assessment state.", NeurotypeScreen, { variant: "progress" }),
          concept("neurotype-complete", "Complete", "Profile saved.", NeurotypeScreen, { variant: "complete" }),
        ],
      },
      {
        id: "listening-guidance",
        num: "06",
        title: "Listening guidance",
        purpose: "Headphones, environment, and duration tips.",
        concepts: [
          concept("listening-guidance", "Guidance", "Best-practice listening tips.", ListeningGuidanceScreen),
        ],
      },
      {
        id: "recommended-profile",
        num: "07",
        title: "Recommended profile",
        purpose: "Present neurotype outcome.",
        concepts: [
          concept("recommended-profile", "Profile", "Outcome and next step.", RecommendedProfileScreen),
        ],
      },
      {
        id: "library",
        num: "08",
        title: "Library",
        purpose: "Discover provisioned sessions.",
        states: ["Default", "Filtered", "Search", "Empty"],
        concepts: [
          concept("library-default", "Default", "All assigned sessions.", LibraryScreen, { variant: "default" }),
          concept("library-filtered", "Filtered", "Category filter applied.", LibraryScreen, { variant: "filtered" }),
          concept("library-search", "Search", "Search results.", LibraryScreen, { variant: "search" }),
          concept("library-empty", "Empty", "No sessions assigned.", LibraryScreen, { variant: "empty" }),
        ],
      },
      {
        id: "session-detail",
        num: "09",
        title: "Session detail",
        purpose: "Title, description, duration, and entitlement state.",
        states: ["Available", "Downloaded", "Assigned", "Removed"],
        concepts: [
          concept("detail-available", "Available", "Ready to play.", SessionDetailConcept, { variant: "available" }),
          concept("detail-downloaded", "Downloaded", "Offline copy available.", SessionDetailConcept, { variant: "downloaded" }),
          concept("detail-assigned", "Assigned", "Partner-assigned session.", SessionDetailConcept, { variant: "assigned" }),
          concept("detail-removed", "Removed", "Access revoked.", SessionDetailConcept, { variant: "removed" }),
        ],
      },
      {
        id: "player",
        num: "10",
        title: "Player",
        purpose: "Listening experience and playback states.",
        states: ["Idle", "Playing", "Paused", "Completed", "Background"],
        concepts: [
          concept("player-idle", "Idle", "Ready to listen.", PlayerConcept, { variant: "idle" }),
          concept("player-playing", "Playing", "Active listening.", PlayerConcept, { variant: "playing" }),
          concept("player-paused", "Paused", "Playback paused.", PlayerConcept, { variant: "paused" }),
          concept("player-completed", "Completed", "Session finished.", PlayerConcept, { variant: "completed" }),
          concept("player-background", "Background", "Mini player while backgrounded.", PlayerConcept, { variant: "background" }),
        ],
      },
      {
        id: "favorites",
        num: "11",
        title: "Favorites",
        purpose: "Saved sessions.",
        states: ["Empty", "Populated"],
        concepts: [
          concept("favorites-empty", "Empty", "No saved sessions.", FavoritesScreen, { variant: "empty" }),
          concept("favorites-populated", "Populated", "Saved sessions list.", FavoritesScreen, { variant: "populated" }),
        ],
      },
      {
        id: "feedback",
        num: "12",
        title: "Feedback",
        purpose: "Post-session reflection.",
        states: ["Rating", "Comment", "Submitted"],
        concepts: [
          concept("feedback-rating", "Rating", "Star rating step.", FeedbackScreen, { variant: "rating" }),
          concept("feedback-comment", "Comment", "Optional reflection.", FeedbackScreen, { variant: "comment" }),
          concept("feedback-submitted", "Submitted", "Confirmation state.", FeedbackScreen, { variant: "submitted" }),
        ],
      },
      {
        id: "about",
        num: "13",
        title: "About",
        purpose: "Company, science, and policies.",
        concepts: [concept("about", "About", "In-app information hub.", AboutScreen)],
      },
    ],
  },
  {
    id: "partner",
    label: "Partner",
    title: "Partner screens",
    description: "Minimal wireframes — login, dashboard, invite, and listener list.",
    layout: "rows",
    rows: [
      {
        id: "partner-login",
        title: "Partner login",
        purpose: "Authenticate to Partner console.",
        concepts: [concept("partner-login", "Login", "Branded entry.", PartnerLoginScreen)],
      },
      {
        id: "partner-dashboard",
        title: "Partner dashboard",
        purpose: "Invited, activated, and listening metrics.",
        concepts: [concept("partner-dashboard", "Dashboard", "Activation overview.", PartnerDashboardScreen)],
      },
      {
        id: "invite-listener",
        title: "Invite listener",
        purpose: "Provision a new listener.",
        concepts: [concept("invite-listener", "Invite", "New listener form.", InviteListenerScreen)],
      },
      {
        id: "listener-list",
        title: "Listener list",
        purpose: "Manage provisioned listeners.",
        concepts: [concept("listener-list", "Roster", "Listener management.", ListenerListScreen)],
      },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    title: "Admin screens",
    description: "Wireframe-level — session management, listener management, and analytics.",
    layout: "rows",
    rows: [
      {
        id: "session-management",
        title: "Session management",
        purpose: "Upload, edit, and archive sessions.",
        states: ["Upload", "Edit", "Archive"],
        concepts: [
          concept("session-upload", "Upload", "Upload audio and metadata.", SessionManagementScreen, { variant: "upload" }),
          concept("session-edit", "Edit", "Edit session metadata.", SessionManagementScreen, { variant: "edit" }),
          concept("session-archive", "Archive", "Retire from active bundles.", SessionManagementScreen, { variant: "archive" }),
        ],
      },
      {
        id: "listener-management",
        title: "Listener management",
        purpose: "Invite, remove, and assign sessions.",
        states: ["Invite", "Remove", "Assign"],
        concepts: [
          concept("listener-invite", "Invite", "Admin-provision listeners.", ListenerManagementScreen, { variant: "invite" }),
          concept("listener-remove", "Remove", "Revoke listener access.", ListenerManagementScreen, { variant: "remove" }),
          concept("listener-assign", "Assign", "Assign sessions to listeners.", ListenerManagementScreen, { variant: "assign" }),
        ],
      },
      {
        id: "analytics",
        title: "Analytics dashboard",
        purpose: "Basic MAU, hours, and completions.",
        concepts: [concept("analytics", "Analytics", "Platform usage overview.", AnalyticsDashboardScreen)],
      },
    ],
  },
  {
    id: "artwork",
    label: "Artwork",
    title: "Session artwork system",
    description: "12 example sessions across Care, Regulation, and Performance categories.",
    layout: "grid",
    concepts: [
      concept("artwork-grid", "12 session covers", "Category colour system with unique artwork per session.", SessionArtworkGrid),
    ],
  },
  {
    id: "states",
    label: "States",
    title: "UI states",
    description: "Empty, loading, error, and success patterns.",
    layout: "rows",
    rows: [
      {
        id: "empty-states",
        title: "Empty states",
        purpose: "No content yet — library, favorites, or assignments.",
        states: ["No sessions", "No favorites", "No assignments"],
        concepts: [
          concept("empty-sessions", "No sessions", "Library with no content.", LibraryScreen, { variant: "empty" }),
          concept("empty-favorites", "No favorites", "Favorites with no saved items.", FavoritesScreen, { variant: "empty" }),
          concept("empty-assignments", "No assignments", "Awaiting Partner assignment.", LibraryScreen, { variant: "empty" }),
        ],
      },
      {
        id: "loading-states",
        title: "Loading states",
        purpose: "Skeleton and buffering patterns.",
        states: ["Library", "Session detail", "Player"],
        concepts: [
          concept("loading-library", "Library", "Skeleton cards while fetching.", LibraryLoadingScreen),
          concept("loading-detail", "Session detail", "Hero and metadata placeholders.", SessionDetailLoadingScreen),
          concept("loading-player", "Player", "Buffering before playback.", PlayerLoadingScreen),
        ],
      },
      {
        id: "error-states",
        title: "Error states",
        purpose: "Recoverable failure patterns.",
        states: ["Invalid invite", "Network", "Session unavailable"],
        concepts: [
          concept("error-invite", "Invalid invite", "Unrecognised access code.", ErrorStateScreen, { variant: "invite-invalid" }),
          concept("error-network", "Network", "Connection failure.", ErrorStateScreen, { variant: "network" }),
          concept("error-session", "Session unavailable", "Removed or inaccessible.", ErrorStateScreen, { variant: "session-unavailable" }),
        ],
      },
      {
        id: "success-states",
        title: "Success states",
        purpose: "Confirmation and completion patterns.",
        states: ["Invite redeemed", "Profile completed", "Session completed", "Feedback submitted"],
        concepts: [
          concept("success-invite", "Invite redeemed", "Access granted.", SuccessStateScreen, { variant: "invite-redeemed" }),
          concept("success-profile", "Profile completed", "Neurotype assessment done.", SuccessStateScreen, { variant: "profile-completed" }),
          concept("success-session", "Session completed", "Playback finished.", SuccessStateScreen, { variant: "session-completed" }),
          concept("success-feedback", "Feedback submitted", "Thank you confirmation.", SuccessStateScreen, { variant: "feedback-submitted" }),
        ],
      },
    ],
  },
  {
    id: "themes",
    label: "Themes",
    title: "Light mode references",
    description: "Light theme reference screens — Library, Session detail, and Player.",
    layout: "rows",
    rows: [
      {
        id: "light-theme",
        title: "Light theme",
        purpose: "Reference screens for light mode.",
        states: ["Library", "Session detail", "Player"],
        concepts: [
          concept("light-library", "Library", "Light theme library.", LibraryScreen, { variant: "default", theme: "light" }),
          concept("light-detail", "Session detail", "Light theme detail.", SessionDetailConcept, { variant: "available", theme: "light" }),
          concept("light-player", "Player", "Light theme player.", PlayerConcept, { variant: "playing", theme: "light" }),
        ],
      },
    ],
  },
  {
    id: "system",
    label: "Design system",
    title: "Component showcase",
    description: "Buttons, inputs, cards, navigation, and player controls.",
    layout: "grid",
    concepts: [
      concept("design-system", "Primitives", "Core UI primitives for Phase 1.", DesignSystemShowcase),
    ],
  },
  {
    id: "prototype",
    label: "Prototype",
    title: "Core v1 flow",
    description: "Onboarding → Library → Session detail → Player → Feedback.",
    layout: "flow",
    concepts: [
      concept("flow-onboarding", "Onboarding", "Step 1 — introduction.", OnboardingIntroScreen, { step: 0 }),
      concept("flow-library", "Library", "Step 2 — discover sessions.", LibraryScreen, { variant: "default" }),
      concept("flow-detail", "Session detail", "Step 3 — understand session.", SessionDetailConcept, { variant: "available" }),
      concept("flow-player", "Player", "Step 4 — listening.", PlayerConcept, { variant: "playing" }),
      concept("flow-feedback", "Feedback", "Step 5 — post-session reflection.", FeedbackScreen, { variant: "rating" }),
    ],
  },
];

/** Flat list for backwards compatibility */
export const PHASE1_CONCEPTS = PHASE1_SECTIONS.flatMap((section) =>
  section.layout === "grid" || section.layout === "flow"
    ? section.concepts
    : section.rows.flatMap((row) => row.concepts),
);
