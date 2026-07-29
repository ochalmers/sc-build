import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ANONYMOUS_COMBINED_FLOW_SECTIONS,
  COMBINED_FLOW_SECTIONS,
  FLOW_SECTIONS,
} from "../../content/flows.js";
import { DEMO_CREDENTIALS } from "../data/catalog.js";
import { useAppStore } from "../context/AppStore.jsx";
import { isCombinedStyleSurface, useReviewSurface } from "../context/SurfaceContext.jsx";
import { CombinedFlowBoard } from "./CombinedFlowBoard.jsx";
import { COMBINED_STAGE, LISTENER_ONLY_STAGE } from "./combinedStageAtmosphere.js";
import { FlowReviewMobileSelect, FlowReviewRail } from "./FlowReviewRail.jsx";

const AUTH_GATE_PATHS = new Set([
  "/app/listener",
  "/app/listener/email",
  "/app/listener/app-store",
  "/app/listener/invite",
  "/app/listener/login",
]);

/**
 * Staging environment for the mobile Listener surface -
 * left rail jumps between flow destinations for review.
 * In Combined / Anonymous mode, Admin provisioning steps appear before the Listener journey.
 */
export function ListenerStage() {
  const { logout, role, loginListener, loginAdmin } = useAppStore();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { surface, combinedView, setCombinedView } = useReviewSurface();
  const combinedStyle = isCombinedStyleSurface(surface);
  const anonymous = surface === "anonymous";
  const flowSections = anonymous
    ? ANONYMOUS_COMBINED_FLOW_SECTIONS
    : surface === "combined"
      ? COMBINED_FLOW_SECTIONS
      : FLOW_SECTIONS;
  const sections = flowSections;

  function listenerCreds() {
    return anonymous ? DEMO_CREDENTIALS.anonymousListener : DEMO_CREDENTIALS.listener;
  }

  function goToFlowPath(path) {
    const bare = path.split("?")[0];
    const isListener = bare.startsWith("/app/listener");
    const isAdminLogin =
      bare === "/app/admin/login" || (bare === "/app/admin/setup" && path.includes("step=login"));

    if (!isListener) {
      if (isAdminLogin) {
        if (role && role !== "admin") logout();
        navigate(path);
        return;
      }
      if (bare === "/app/admin/setup") {
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
      return;
    }

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
  }

  function openStepInPrototype(path) {
    setCombinedView("prototype");
    goToFlowPath(path);
  }

  const atmosphere = combinedStyle ? COMBINED_STAGE.listener : LISTENER_ONLY_STAGE;
  const showFlowBoard = combinedStyle && combinedView === "flow";

  return (
    <div
      className="relative min-h-[calc(100dvh-3.5rem)] transition-[background-color] duration-500 ease-out"
      style={{ backgroundColor: showFlowBoard ? "#0a0a0a" : atmosphere.base }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: showFlowBoard
            ? "radial-gradient(70% 50% at 50% 0%, rgba(255,255,255,0.04), transparent 60%)"
            : atmosphere.wash,
        }}
        aria-hidden
      />

      <div
        className={`relative z-10 mx-auto flex w-full gap-8 px-4 pb-16 pt-4 md:px-6 md:pt-6 lg:px-8 ${
          showFlowBoard ? "max-w-[2200px] xl:px-10" : "max-w-[1600px]"
        }`}
      >
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
              title={
                anonymous ? "Anonymous flows" : combinedStyle ? "Combined flows" : "Listener flows"
              }
              sections={sections}
              pathname={pathname}
              search={search}
              onNavigate={goToFlowPath}
              tone={atmosphere.rail}
            />

            <div className="min-w-0 flex-1">
              <FlowReviewMobileSelect
                id="listener-flow-jump"
                sections={sections}
                pathname={pathname}
                search={search}
                onNavigate={goToFlowPath}
                tone={atmosphere.rail}
              />

              <div className="flex justify-center">
                <Outlet />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
