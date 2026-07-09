/**
 * Maps flow step keys to hi-fi screen components.
 * Reference fidelity: phase1 gradient screens (session-player, session-detail, etc.)
 */
import SessionDetailScreen from "../phase1/SessionDetailScreen.jsx";
import SessionLibraryScreen from "../phase1/SessionLibraryScreen.jsx";
import SessionPlayerScreen from "../phase1/SessionPlayerScreen.jsx";
import DiscoverScreen from "../phase1/DiscoverScreen.jsx";
import {
  AnalyticsDashboardScreen,
  ListenerManagementScreen,
  SessionManagementScreen,
} from "../phase1/screens/admin/AdminScreens.jsx";
import {
  FavoritesScreen,
  FeedbackScreen,
  ErrorStateScreen,
  LibraryScreen,
  PlayerConcept,
  SessionDetailConcept,
} from "../phase1/screens/listener/CoreScreens.jsx";
import {
  AboutScreen,
  InviteScreen,
  ListeningGuidanceScreen,
  NeurotypeScreen,
  OnboardingIntroScreen,
  RecommendedProfileScreen,
  SplashScreen,
} from "../phase1/screens/listener/OnboardingScreens.jsx";
import {
  InviteListenerScreen,
  ListenerListScreen,
  PartnerDashboardScreen,
  PartnerLoginScreen,
} from "../phase1/screens/partner/PartnerScreens.jsx";
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
} from "./PublicVisitorScreens.jsx";

/** @param {React.ComponentType} Screen @param {object} [props] */
export function screen(Screen, props = {}) {
  return { Screen, props };
}

export const PRD_SCREEN_REGISTRY = {
  splash: screen(SplashScreen, { variant: "dark" }),
  "pv-get-started": screen(PvGetStartedScreen),
  "pv-invitation": screen(PvInvitationScreen),
  "pv-check-in": screen(PvCheckInScreen, { variant: "before" }),
  "pv-reflection": screen(PvCheckInScreen, { variant: "after" }),
  "pv-headphones": screen(PvHeadphonesScreen),
  "pv-listening": screen(SessionPlayerScreen),
  "pv-listening-alt": screen(PvListeningScreen, { variant: "playing" }),
  "pv-experienced": screen(PvExperiencedScreen),
  "pv-science-home": screen(PvScienceHomeScreen),
  "pv-topic-detail": screen(PvTopicDetailScreen),
  "pv-topic-hifi": screen(SessionDetailScreen),
  "pv-request-access": screen(PvRequestAccessScreen),
  "pv-returning-home": screen(PvReturningHomeScreen),
  "pv-discover": screen(DiscoverScreen),
  login: screen(InviteScreen, { variant: "valid" }),
  "login-empty": screen(InviteScreen, { variant: "empty" }),
  onboarding: screen(OnboardingIntroScreen, { step: 0 }),
  "onboarding-2": screen(OnboardingIntroScreen, { step: 1 }),
  "onboarding-3": screen(OnboardingIntroScreen, { step: 2 }),
  guidance: screen(ListeningGuidanceScreen),
  neurotype: screen(NeurotypeScreen, { variant: "question" }),
  "neurotype-complete": screen(NeurotypeScreen, { variant: "complete" }),
  profile: screen(RecommendedProfileScreen),
  library: screen(SessionLibraryScreen),
  "library-dark": screen(LibraryScreen, { variant: "default" }),
  favorites: screen(FavoritesScreen, { variant: "populated" }),
  detail: screen(SessionDetailScreen),
  "detail-concept": screen(SessionDetailConcept, { variant: "available" }),
  player: screen(SessionPlayerScreen),
  "player-concept": screen(PlayerConcept, { variant: "playing" }),
  feedback: screen(FeedbackScreen, { variant: "rating" }),
  about: screen(AboutScreen),
  "error-network": screen(ErrorStateScreen, { variant: "network" }),
  "error-session": screen(ErrorStateScreen, { variant: "session-unavailable" }),
  "partner-login": screen(PartnerLoginScreen),
  "partner-dashboard": screen(PartnerDashboardScreen),
  "partner-invite": screen(InviteListenerScreen),
  "partner-roster": screen(ListenerListScreen),
  "admin-sessions": screen(SessionManagementScreen, { variant: "upload" }),
  "admin-listeners": screen(ListenerManagementScreen, { variant: "invite" }),
  "admin-analytics": screen(AnalyticsDashboardScreen),
};

export function resolveScreen(key) {
  return PRD_SCREEN_REGISTRY[key] ?? null;
}
