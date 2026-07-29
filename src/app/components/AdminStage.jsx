import { useLocation, useNavigate } from "react-router-dom";
import {
  ANONYMOUS_COMBINED_FLOW_SECTIONS,
  COMBINED_FLOW_SECTIONS,
} from "../../content/flows.js";
import { DEMO_CREDENTIALS } from "../data/catalog.js";
import { useAppStore } from "../context/AppStore.jsx";
import { isCombinedStyleSurface, useReviewSurface } from "../context/SurfaceContext.jsx";
import { CombinedFlowBoard } from "./CombinedFlowBoard.jsx";
import { COMBINED_STAGE } from "./combinedStageAtmosphere.js";
import { FlowReviewMobileSelect, FlowReviewRail } from "./FlowReviewRail.jsx";

const AUTH_GATE_PATHS = new Set([
  "/app/listener",
  "/app/listener/email",
  "/app/listener/app-store",
  "/app/listener/invite",
  "/app/listener/login",
]);

/**
 * Wraps Admin console screens. In Combined / Anonymous mode, shows the shared
 * flow rail so Admin provisioning leads into the Listener journey.
 */
export function AdminStage({ children }) {
  const { surface, combinedView, setCombinedView } = useReviewSurface();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { logout, role, loginAdmin, loginListener } = useAppStore();

  const enterKey = `${pathname}${search}`;
  const combinedStyle = isCombinedStyleSurface(surface);
  const anonymous = surface === "anonymous";
  const flowSections = anonymous ? ANONYMOUS_COMBINED_FLOW_SECTIONS : COMBINED_FLOW_SECTIONS;

  if (!combinedStyle) {
    return (
      <div key={enterKey} className="app-screen-enter">
        {children}
      </div>
    );
  }

  function listenerCreds() {
    return anonymous ? DEMO_CREDENTIALS.anonymousListener : DEMO_CREDENTIALS.listener;
  }

  function goToFlowPath(path) {
    const bare = path.split("?")[0];
    const isListener = bare.startsWith("/app/listener");
    const isAdminLogin =
      bare === "/app/admin/login" || (bare === "/app/admin/setup" && path.includes("step=login"));

    if (isListener) {
      if (AUTH_GATE_PATHS.has(bare) && role === "listener") {
        logout();
        navigate(path);
        return;
      }
      if (!AUTH_GATE_PATHS.has(bare) && role !== "listener") {
        const creds = listenerCreds();
        loginListener({
          email: creds.email,
          password: creds.password,
          inviteCode: creds.inviteCode,
          isAnonymous: Boolean(creds.isAnonymous),
        });
      }
      navigate(path);
      return;
    }

    // Admin destinations
    if (isAdminLogin || bare === "/app/admin/setup") {
      if (isAdminLogin && role && role !== "admin") logout();
      navigate(path);
      return;
    }

    if (role !== "admin") {
      loginAdmin({
        email: DEMO_CREDENTIALS.admin.email,
        password: DEMO_CREDENTIALS.admin.password,
      });
    }
    navigate(path);
  }

  function openStepInPrototype(path) {
    setCombinedView("prototype");
    goToFlowPath(path);
  }

  const atmosphere = COMBINED_STAGE.admin;
  const showFlowBoard = combinedView === "flow";

  return (
    <div
      className="relative min-h-[calc(100dvh-3.5rem)] transition-[background-color] duration-500 ease-out"
      style={{ backgroundColor: showFlowBoard ? "#0a0a0a" : atmosphere.base }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: showFlowBoard
            ? "radial-gradient(70% 50% at 50% 0%, rgba(255,255,255,0.04), transparent 60%)"
            : atmosphere.wash,
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[2200px] gap-8 px-4 pb-4 pt-3 md:px-6 md:pt-4 lg:px-8 xl:px-10">
        {showFlowBoard ? (
          <CombinedFlowBoard
            sections={flowSections}
            pathname={pathname}
            search={search}
            onOpenStep={openStepInPrototype}
            title={
              anonymous
                ? "Create group → Send invite → Anonymous listener"
                : "Admin provisioning → Listener journey"
            }
            subtitle={
              anonymous
                ? "A short admin path into the private listener journey. Select a frame to open it in the interactive prototype."
                : "Live screens in one left-to-right board. Select a frame to open it in the interactive prototype."
            }
            seedMode={anonymous ? "anonymous" : "org"}
          />
        ) : (
          <>
            <FlowReviewRail
              title={anonymous ? "Anonymous flows" : "Combined flows"}
              sections={flowSections}
              pathname={pathname}
              search={search}
              onNavigate={goToFlowPath}
              tone={atmosphere.rail}
            />
            <div className="flex min-h-[calc(100dvh-4.75rem)] min-w-0 flex-1 flex-col">
              <FlowReviewMobileSelect
                id="combined-admin-flow-jump"
                sections={flowSections}
                pathname={pathname}
                search={search}
                onNavigate={goToFlowPath}
                tone={atmosphere.rail}
              />
              <div key={enterKey} className="app-screen-enter flex min-h-0 flex-1 flex-col">
                {children}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
