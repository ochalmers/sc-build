import { Navigate, Route, Routes } from "react-router-dom";
import ScrollManager from "./components/ScrollManager.jsx";
import WorkspacePage from "./components/workspace/WorkspacePage.jsx";
import DesignPage from "./pages/DesignPage.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import PlanPage from "./pages/PlanPage.jsx";
import FlowsPage from "./pages/FlowsPage.jsx";
import KeyScreensPage from "./pages/KeyScreensPage.jsx";
import ReferencesPage from "./pages/ReferencesPage.jsx";
import ProductApp from "./app/ProductApp.jsx";

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/flows" element={<FlowsPage />} />
        <Route path="/design" element={<DesignPage />} />
        <Route path="/key-screens" element={<KeyScreensPage />} />
        <Route path="/designs" element={<Navigate to="/design" replace />} />
        <Route path="/designs/*" element={<Navigate to="/design" replace />} />
        <Route path="/references" element={<ReferencesPage />} />
        <Route path="/prototype" element={<WorkspacePage pageKey="prototype" />} />
        <Route path="/app/*" element={<ProductApp />} />
      </Routes>
    </>
  );
}
