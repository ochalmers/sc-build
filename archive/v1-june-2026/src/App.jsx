import { Navigate, Route, Routes } from "react-router-dom";
import ScrollManager from "./components/ScrollManager.jsx";
import DesignSystemPage from "./pages/DesignSystemPage.jsx";
import FlowsRevisedPage from "./pages/FlowsRevisedPage.jsx";
import InspirationPage from "./pages/InspirationPage.jsx";
import MarketingCollateralPage from "./pages/MarketingCollateralPage.jsx";
import PlanPage from "./pages/PlanPage.jsx";
import IdeationPage from "./pages/IdeationPage.jsx";
import PrdDesignsPage from "./pages/PrdDesignsPage.jsx";
import ProjectSummaryPage from "./pages/ProjectSummaryPage.jsx";
import SiteArchitecturePage from "./pages/SiteArchitecturePage.jsx";

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
      <Route path="/" element={<ProjectSummaryPage />} />
      <Route path="/plan" element={<PlanPage />} />

      {/* PRD product surfaces */}
      <Route path="/flows" element={<Navigate to="/flows/revised" replace />} />
      <Route path="/flows/revised" element={<FlowsRevisedPage />} />
      <Route path="/flows/lite" element={<Navigate to="/flows/revised" replace />} />
      <Route path="/flows/key-screens" element={<Navigate to="/designs/prd" replace />} />
      <Route path="/designs" element={<Navigate to="/designs/prd" replace />} />
      <Route path="/designs/prd" element={<PrdDesignsPage />} />
      <Route path="/designs/ideation" element={<IdeationPage />} />
      <Route path="/prototype" element={<Navigate to="/designs/prd" replace />} />
      <Route path="/prototype/prd" element={<Navigate to="/designs/prd" replace />} />

      {/* Foundations — pre-reset reference */}
      <Route path="/design-system" element={<DesignSystemPage />} />
      <Route path="/marketing" element={<MarketingCollateralPage />} />
      <Route path="/site-architecture" element={<SiteArchitecturePage />} />
      <Route path="/inspiration" element={<InspirationPage />} />

      {/* Legacy redirects */}
      <Route path="/wireframes" element={<Navigate to="/flows/revised" replace />} />
      <Route path="/wireframes/lite" element={<Navigate to="/flows/revised" replace />} />
      <Route path="/designs/phase-1" element={<Navigate to="/designs/prd" replace />} />
      <Route path="/designs/phase-2" element={<Navigate to="/designs/prd" replace />} />
      <Route path="/designs/phase-3" element={<Navigate to="/designs/prd" replace />} />
      <Route path="/designs/phase-4" element={<Navigate to="/designs/prd" replace />} />
      <Route path="/designs/:phase" element={<Navigate to="/designs/prd" replace />} />
      <Route path="/concepts" element={<Navigate to="/designs/prd" replace />} />
      <Route path="/system" element={<Navigate to="/design-system" replace />} />
      </Routes>
    </>
  );
}
