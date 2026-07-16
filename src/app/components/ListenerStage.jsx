import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FLOW_SECTIONS } from "../../content/flows.js";
import { DEMO_CREDENTIALS } from "../data/catalog.js";
import { useAppStore } from "../context/AppStore.jsx";
import { SurfaceSwitcher } from "./SurfaceSwitcher.jsx";

function pathsMatch(stepPath, pathname, search) {
  if (!stepPath.includes("?")) return stepPath === pathname && !search;
  const [path, query] = stepPath.split("?");
  return path === pathname && search.replace(/^\?/, "") === query;
}

function isFlowActive(section, pathname, search = "") {
  if (pathsMatch(section.appPath, pathname, search)) return true;
  if (section.appSteps?.some((step) => pathsMatch(step.path, pathname, search))) return true;
  if (pathname === section.appPath || pathname.startsWith(`${section.appPath}?`)) return true;
  if (section.id === "session-journey" && pathname.includes("/session/")) return true;
  if (section.id === "playback-experience" && pathname.includes("/player/")) return true;
  if (section.id === "reflection-completion" && pathname.includes("/feedback/")) return true;
  if (
    section.id === "invitation-authentication" &&
    (pathname === "/app/listener" ||
      pathname.endsWith("/invite") ||
      pathname.endsWith("/login"))
  ) {
    return true;
  }
  if (
    section.id === "first-time-experience" &&
    (pathname.includes("/onboarding") || pathname.includes("/neurotype"))
  ) {
    return true;
  }
  if (section.id === "system-states" && pathname.startsWith("/app/listener/system-states")) {
    return true;
  }
  return false;
}

const AUTH_GATE_PATHS = new Set(["/app/listener", "/app/listener/invite", "/app/listener/login"]);

/**
 * Staging environment for the mobile Listener surface —
 * left rail jumps between flow destinations for review.
 */
export function ListenerStage() {
  const { resetApp, logout, role, loginListener } = useAppStore();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const flowItems = FLOW_SECTIONS.filter((s) => s.appPath);
  const selectValue =
    flowItems
      .flatMap((s) => s.appSteps ?? [{ path: s.appPath }])
      .find((s) => pathsMatch(s.path, pathname, search.replace(/^\?/, "")))?.path ??
    flowItems.find((s) => isFlowActive(s, pathname, search.replace(/^\?/, "")))?.appPath ??
    "";

  function goToFlowPath(path) {
    const bare = path.split("?")[0];

    // Auth screens redirect away when a listener session is active — clear it for review.
    if (AUTH_GATE_PATHS.has(bare) && role === "listener") {
      logout();
      navigate(path);
      return;
    }

    // Later flow destinations need a listener session.
    if (!AUTH_GATE_PATHS.has(bare) && role !== "listener") {
      loginListener({
        email: DEMO_CREDENTIALS.listener.email,
        password: DEMO_CREDENTIALS.listener.password,
      });
    }

    navigate(path);
  }

  return (
    <div className="relative min-h-dvh bg-[#12110f]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(210,190,150,0.14), transparent 60%), radial-gradient(50% 40% at 80% 80%, rgba(80,100,120,0.12), transparent 55%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-[12px] text-white/45">
        <div className="flex items-center gap-3">
          <Link to="/app" className="text-white/70 hover:text-white">
            Sonocea App
          </Link>
          <SurfaceSwitcher />
        </div>
        <div className="flex gap-4">
          <Link to="/flows" className="hover:text-white/70">
            Flows docs
          </Link>
          <button type="button" onClick={resetApp} className="hover:text-white/70">
            Reset demo
          </button>
          <Link to="/" className="hover:text-white/70">
            (microsite)
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1180px] gap-8 px-4 pb-16 pt-2 md:px-6 md:pt-4">
        <aside className="hidden w-[13.5rem] shrink-0 lg:block">
          <div className="sticky top-6 max-h-[calc(100dvh-3rem)] overflow-y-auto pr-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
              Listener flows
            </p>
            <nav className="mt-3" aria-label="Listener flow destinations">
              <ul className="space-y-0.5">
                {flowItems.map((section) => {
                  const active = isFlowActive(section, pathname, search.replace(/^\?/, ""));
                  return (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => goToFlowPath(section.appPath)}
                        className={`flex w-full items-baseline gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] leading-snug transition-colors ${
                          active
                            ? "bg-white/10 text-white"
                            : "text-white/45 hover:bg-white/[0.06] hover:text-white/80"
                        }`}
                      >
                        <span className="shrink-0 font-mono text-[10px] text-white/30">
                          {section.number ?? "·"}
                        </span>
                        <span className="min-w-0">{section.title}</span>
                      </button>
                      {section.appSteps?.length ? (
                        <ul className="mb-1 ml-5 mt-0.5 space-y-0.5 border-l border-white/10 pl-2">
                          {section.appSteps.map((step) => {
                            const stepActive = pathsMatch(step.path, pathname, search.replace(/^\?/, ""));
                            return (
                              <li key={step.path}>
                                <button
                                  type="button"
                                  onClick={() => goToFlowPath(step.path)}
                                  className={`block w-full rounded-md px-2 py-1 text-left text-[11px] transition-colors ${
                                    stepActive
                                      ? "bg-white/10 text-white"
                                      : "text-white/40 hover:bg-white/[0.05] hover:text-white/70"
                                  }`}
                                >
                                  {step.label}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <p className="mt-6 text-[11px] leading-relaxed text-white/30">
              Jump into a flow destination in the working app. Wireframe storyboards live on{" "}
              <Link to="/flows" className="text-white/50 underline-offset-2 hover:underline">
                /flows
              </Link>
              .
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 lg:hidden">
            <label className="sr-only" htmlFor="listener-flow-jump">
              Jump to flow
            </label>
            <select
              id="listener-flow-jump"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-white/80"
              value={selectValue}
              onChange={(e) => {
                if (e.target.value) goToFlowPath(e.target.value);
              }}
            >
              <option value="">Jump to flow…</option>
              {flowItems.map((section) =>
                section.appSteps?.length ? (
                  <optgroup
                    key={section.id}
                    label={`${section.number ? `${section.number}. ` : ""}${section.title}`}
                  >
                    {section.appSteps.map((step) => (
                      <option key={step.path} value={step.path}>
                        {step.label}
                      </option>
                    ))}
                  </optgroup>
                ) : (
                  <option key={section.id} value={section.appPath}>
                    {section.number ? `${section.number}. ` : ""}
                    {section.title}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="flex justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
