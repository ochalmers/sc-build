import { Navigate, Route, Routes } from "react-router-dom";
import { AppStoreProvider } from "./context/AppStore.jsx";
import { AppShell } from "./components/AppShell.jsx";
import { ListenerStage } from "./components/ListenerStage.jsx";
import { AdminStage } from "./components/AdminStage.jsx";
import { ListenerEntry, ListenerInvite, ListenerInviteEmail, ListenerAppStore, ListenerLogin } from "./screens/listener/AuthScreens.jsx";
import { ListenerNeurotype, ListenerOnboarding } from "./screens/listener/OnboardingScreens.jsx";
import {
  ListenerAssigned,
  ListenerFavorites,
  ListenerHome,
  ListenerLibrary,
  ListenerOrganisation,
  ListenerProgramme,
  ListenerProgress,
  ListenerSessionDetail,
} from "./screens/listener/LibraryScreens.jsx";
import {
  ListenerAbout,
  ListenerCheckIn,
  ListenerFeedback,
  ListenerPlayer,
  ListenerProfile,
  ListenerSupport,
} from "./screens/listener/PlayerScreens.jsx";
import { ListenerSystemStates } from "./screens/listener/SystemStatesScreens.jsx";
import { PartnerBilling, PartnerHome } from "./screens/partner/PartnerScreens.jsx";
import {
  AdminAnalytics,
  AdminExport,
  AdminHome,
  AdminInvites,
  AdminListeners,
  AdminPartners,
  AdminSessions,
} from "./screens/admin/AdminScreens.jsx";
import { AdminLoginScreen } from "./screens/admin/AdminLoginScreen.jsx";
import { AdminSetupFlow } from "./screens/admin/AdminSetupFlow.jsx";
import { RequireAdmin, RequirePartner } from "./components/RequireRole.jsx";

function AdminPage({ children }) {
  return (
    <AdminStage>
      <RequireAdmin>{children}</RequireAdmin>
    </AdminStage>
  );
}

/**
 * Working Mobile App PRD destination - Listener (mobile), Admin (web), Combined review.
 * Mounted at /app/* outside the design-workspace SiteChrome.
 */
export default function ProductApp() {
  return (
    <AppStoreProvider>
      <AppShell>
        <Routes>
          <Route index element={<Navigate to="/app/admin/setup?step=login" replace />} />

          {/* Listener - phone-staged */}
          <Route path="listener" element={<ListenerStage />}>
            <Route index element={<ListenerEntry />} />
            <Route path="email" element={<ListenerInviteEmail />} />
            <Route path="app-store" element={<ListenerAppStore />} />
            <Route path="login" element={<ListenerLogin />} />
            <Route path="invite" element={<ListenerInvite />} />
            <Route path="onboarding" element={<ListenerOnboarding />} />
            <Route path="neurotype" element={<ListenerNeurotype />} />
            <Route path="home" element={<ListenerHome />} />
            <Route path="programme" element={<ListenerProgramme />} />
            <Route path="assigned" element={<ListenerAssigned />} />
            <Route path="progress" element={<ListenerProgress />} />
            <Route path="organisation" element={<ListenerOrganisation />} />
            <Route path="library" element={<ListenerLibrary />} />
            <Route path="favorites" element={<ListenerFavorites />} />
            <Route path="session/:sessionId" element={<ListenerSessionDetail />} />
            <Route path="player/:sessionId" element={<ListenerPlayer />} />
            <Route path="check-in/:sessionId" element={<ListenerCheckIn />} />
            <Route path="feedback/:sessionId" element={<ListenerFeedback />} />
            <Route path="profile" element={<ListenerProfile />} />
            <Route path="about" element={<ListenerAbout />} />
            <Route path="support" element={<ListenerSupport />} />
            <Route path="system-states" element={<ListenerSystemStates />} />
          </Route>

          {/* Organization console (legacy /partner paths redirect) */}
          <Route path="partner" element={<Navigate to="/app/organization" replace />} />
          <Route path="partner/billing" element={<Navigate to="/app/organization/billing" replace />} />
          <Route
            path="organization"
            element={
              <RequirePartner>
                <PartnerHome />
              </RequirePartner>
            }
          />
          <Route
            path="organization/billing"
            element={
              <RequirePartner>
                <PartnerBilling />
              </RequirePartner>
            }
          />

          {/* Combined Admin setup wizard - one desktop shell, linear steps */}
          <Route
            path="admin/setup"
            element={
              <AdminStage>
                <AdminSetupFlow />
              </AdminStage>
            }
          />
          {/* Admin - login kept for deep-links; Combined starts at setup */}
          <Route
            path="admin/login"
            element={
              <AdminStage>
                <AdminLoginScreen />
              </AdminStage>
            }
          />
          <Route
            path="admin"
            element={
              <AdminPage>
                <AdminHome />
              </AdminPage>
            }
          />
          <Route
            path="admin/sessions"
            element={
              <AdminPage>
                <AdminSessions />
              </AdminPage>
            }
          />
          <Route
            path="admin/content"
            element={
              <AdminPage>
                <AdminSessions key="content" />
              </AdminPage>
            }
          />
          <Route
            path="admin/programmes"
            element={
              <AdminPage>
                <AdminSessions key="programmes" initialTab="groups" />
              </AdminPage>
            }
          />
          <Route path="admin/partners" element={<Navigate to="/app/admin/organizations" replace />} />
          <Route
            path="admin/organizations"
            element={
              <AdminPage>
                <AdminPartners />
              </AdminPage>
            }
          />
          <Route
            path="admin/listeners"
            element={
              <AdminPage>
                <AdminListeners />
              </AdminPage>
            }
          />
          <Route
            path="admin/invites"
            element={
              <AdminPage>
                <AdminInvites />
              </AdminPage>
            }
          />
          <Route
            path="admin/export"
            element={
              <AdminPage>
                <AdminExport />
              </AdminPage>
            }
          />
          <Route
            path="admin/settings"
            element={
              <AdminPage>
                <AdminExport />
              </AdminPage>
            }
          />
          <Route
            path="admin/analytics"
            element={
              <AdminPage>
                <AdminAnalytics />
              </AdminPage>
            }
          />

          <Route path="*" element={<Navigate to="/app/admin/setup?step=login" replace />} />
        </Routes>
      </AppShell>
    </AppStoreProvider>
  );
}
