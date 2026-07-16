import { Navigate, Route, Routes } from "react-router-dom";
import { AppStoreProvider } from "./context/AppStore.jsx";
import { ListenerStage } from "./components/ListenerStage.jsx";
import { ListenerEntry, ListenerInvite, ListenerLogin } from "./screens/listener/AuthScreens.jsx";
import { ListenerNeurotype, ListenerOnboarding } from "./screens/listener/OnboardingScreens.jsx";
import {
  ListenerAssigned,
  ListenerFavorites,
  ListenerHome,
  ListenerLibrary,
  ListenerOrganisation,
  ListenerProgress,
  ListenerSessionDetail,
} from "./screens/listener/LibraryScreens.jsx";
import {
  ListenerAbout,
  ListenerFeedback,
  ListenerPlayer,
  ListenerProfile,
  ListenerSupport,
} from "./screens/listener/PlayerScreens.jsx";
import { ListenerSystemStates } from "./screens/listener/SystemStatesScreens.jsx";
import { PartnerBilling, PartnerHome } from "./screens/partner/PartnerScreens.jsx";
import {
  AdminAnalytics,
  AdminHome,
  AdminInvites,
  AdminPartners,
  AdminSessions,
} from "./screens/admin/AdminScreens.jsx";

/**
 * Working Mobile App PRD destination — Listener (mobile), Partner & Admin (web).
 * Mounted at /app/* outside the design-workspace SiteChrome.
 */
export default function ProductApp() {
  return (
    <AppStoreProvider>
      <div className="min-h-dvh">
        <Routes>
          <Route index element={<Navigate to="/app/listener/invite" replace />} />

          {/* Listener — phone-staged */}
          <Route path="listener" element={<ListenerStage />}>
            <Route index element={<ListenerEntry />} />
            <Route path="login" element={<ListenerLogin />} />
            <Route path="invite" element={<ListenerInvite />} />
            <Route path="onboarding" element={<ListenerOnboarding />} />
            <Route path="neurotype" element={<ListenerNeurotype />} />
            <Route path="home" element={<ListenerHome />} />
            <Route path="assigned" element={<ListenerAssigned />} />
            <Route path="progress" element={<ListenerProgress />} />
            <Route path="organisation" element={<ListenerOrganisation />} />
            <Route path="library" element={<ListenerLibrary />} />
            <Route path="favorites" element={<ListenerFavorites />} />
            <Route path="session/:sessionId" element={<ListenerSessionDetail />} />
            <Route path="player/:sessionId" element={<ListenerPlayer />} />
            <Route path="feedback/:sessionId" element={<ListenerFeedback />} />
            <Route path="profile" element={<ListenerProfile />} />
            <Route path="about" element={<ListenerAbout />} />
            <Route path="support" element={<ListenerSupport />} />
            <Route path="system-states" element={<ListenerSystemStates />} />
          </Route>

          {/* Partner */}
          <Route path="partner" element={<PartnerHome />} />
          <Route path="partner/billing" element={<PartnerBilling />} />

          {/* Admin */}
          <Route path="admin" element={<AdminHome />} />
          <Route path="admin/sessions" element={<AdminSessions />} />
          <Route path="admin/partners" element={<AdminPartners />} />
          <Route path="admin/invites" element={<AdminInvites />} />
          <Route path="admin/analytics" element={<AdminAnalytics />} />

          <Route path="*" element={<Navigate to="/app/listener/invite" replace />} />
        </Routes>
      </div>
    </AppStoreProvider>
  );
}
