import { Component, useEffect, useMemo, useRef, useState } from "react";
import {
  matchPath,
  UNSAFE_LocationContext,
  UNSAFE_NavigationContext,
  UNSAFE_RouteContext,
} from "react-router-dom";
import { AppStoreProvider } from "../context/AppStore.jsx";
import { wireframeSeedFor } from "../../content/appWireframes.js";
import {
  ListenerInvite,
  ListenerInviteEmail,
  ListenerAppStore,
  ListenerLogin,
} from "../screens/listener/AuthScreens.jsx";
import { ListenerNeurotype, ListenerOnboarding } from "../screens/listener/OnboardingScreens.jsx";
import {
  ListenerHome,
  ListenerProgramme,
  ListenerProgress,
  ListenerOrganisation,
  ListenerSessionDetail,
  ListenerAssigned,
  ListenerFavorites,
  ListenerLibrary,
} from "../screens/listener/LibraryScreens.jsx";
import {
  ListenerAbout,
  ListenerCheckIn,
  ListenerFeedback,
  ListenerPlayer,
  ListenerProfile,
  ListenerSupport,
} from "../screens/listener/PlayerScreens.jsx";
import { ListenerSystemStates } from "../screens/listener/SystemStatesScreens.jsx";
import { AdminLoginScreen } from "../screens/admin/AdminLoginScreen.jsx";
import { AdminSetupFlow } from "../screens/admin/AdminSetupFlow.jsx";
import {
  AdminAnalytics,
  AdminExport,
  AdminHome,
  AdminInvites,
  AdminPartners,
  AdminSessions,
} from "../screens/admin/AdminScreens.jsx";
import { LISTENER_FRAME } from "./ListenerFrame.jsx";

const PARAM_PATTERNS = [
  "/app/listener/session/:sessionId",
  "/app/listener/player/:sessionId",
  "/app/listener/check-in/:sessionId",
  "/app/listener/feedback/:sessionId",
];

/** Path → live screen + seed for Combined flow board previews. */
const LIVE_ROUTES = [
  { test: (p) => p === "/app/listener/email", Screen: ListenerInviteEmail, seed: "guest", frame: "mobile" },
  { test: (p) => p === "/app/listener/app-store", Screen: ListenerAppStore, seed: "guest", frame: "mobile" },
  { test: (p) => p === "/app/listener/invite", Screen: ListenerInvite, seed: "guest", frame: "mobile" },
  { test: (p) => p === "/app/listener/login", Screen: ListenerLogin, seed: "guest", frame: "mobile" },
  { test: (p) => p === "/app/listener/onboarding", Screen: ListenerOnboarding, seed: "onboarding", frame: "mobile" },
  { test: (p) => p === "/app/listener/neurotype", Screen: ListenerNeurotype, seed: "onboarding", frame: "mobile" },
  { test: (p) => p === "/app/listener/home", Screen: ListenerHome, seed: "listener", frame: "mobile" },
  { test: (p) => p === "/app/listener/programme", Screen: ListenerProgramme, seed: "listener", frame: "mobile" },
  { test: (p) => p === "/app/listener/assigned", Screen: ListenerAssigned, seed: "listener", frame: "mobile" },
  { test: (p) => p === "/app/listener/progress", Screen: ListenerProgress, seed: "listener", frame: "mobile" },
  { test: (p) => p === "/app/listener/organisation", Screen: ListenerOrganisation, seed: "listener", frame: "mobile" },
  { test: (p) => p === "/app/listener/library", Screen: ListenerLibrary, seed: "listener", frame: "mobile" },
  { test: (p) => p === "/app/listener/favorites", Screen: ListenerFavorites, seed: "listener", frame: "mobile" },
  { test: (p) => p.startsWith("/app/listener/session/"), Screen: ListenerSessionDetail, seed: "listener", frame: "mobile" },
  { test: (p) => p.startsWith("/app/listener/player/"), Screen: ListenerPlayer, seed: "listener", frame: "mobile" },
  { test: (p) => p.startsWith("/app/listener/check-in/"), Screen: ListenerCheckIn, seed: "listener", frame: "mobile" },
  { test: (p) => p.startsWith("/app/listener/feedback/"), Screen: ListenerFeedback, seed: "listener", frame: "mobile" },
  { test: (p) => p === "/app/listener/profile", Screen: ListenerProfile, seed: "listener", frame: "mobile" },
  { test: (p) => p === "/app/listener/about", Screen: ListenerAbout, seed: "listener", frame: "mobile" },
  { test: (p) => p === "/app/listener/support", Screen: ListenerSupport, seed: "listener", frame: "mobile" },
  { test: (p) => p === "/app/listener/system-states", Screen: ListenerSystemStates, seed: "listener", frame: "mobile" },
  { test: (p) => p === "/app/admin/login", Screen: AdminLoginScreen, seed: "admin", frame: "desktop" },
  { test: (p) => p === "/app/admin/setup", Screen: AdminSetupFlow, seed: "admin", frame: "desktop" },
  { test: (p) => p === "/app/admin", Screen: AdminHome, seed: "admin", frame: "desktop" },
  { test: (p) => p === "/app/admin/sessions", Screen: AdminSessions, seed: "admin", frame: "desktop" },
  { test: (p) => p === "/app/admin/organizations" || p === "/app/admin/partners", Screen: AdminPartners, seed: "admin", frame: "desktop" },
  { test: (p) => p === "/app/admin/invites", Screen: AdminInvites, seed: "admin", frame: "desktop" },
  { test: (p) => p === "/app/admin/analytics", Screen: AdminAnalytics, seed: "admin", frame: "desktop" },
  { test: (p) => p === "/app/admin/export", Screen: AdminExport, seed: "admin", frame: "desktop" },
];

export function resolveLiveRoute(path) {
  const pathname = (path || "").split("?")[0];
  const hit = LIVE_ROUTES.find((r) => r.test(pathname));
  if (!hit) return null;
  return hit;
}

function parseLocation(path) {
  const [pathname, search = ""] = path.split("?");
  return {
    pathname,
    search: search ? `?${search}` : "",
    hash: "",
    state: null,
    key: "live-app-preview",
  };
}

function paramsForPath(pathname) {
  for (const pattern of PARAM_PATTERNS) {
    const match = matchPath(pattern, pathname);
    if (match) return match.params;
  }
  return {};
}

function PreviewContext({ path, children }) {
  const location = useMemo(() => parseLocation(path), [path]);
  const params = useMemo(() => paramsForPath(location.pathname), [location.pathname]);

  const navigation = useMemo(
    () => ({
      basename: "",
      navigator: {
        createHref: (to) => {
          if (typeof to === "string") return to;
          return `${to.pathname ?? ""}${to.search ?? ""}${to.hash ?? ""}`;
        },
        go() {},
        push() {},
        replace() {},
      },
      static: true,
    }),
    [],
  );

  const locationCtx = useMemo(
    () => ({
      location,
      navigationType: "POP",
    }),
    [location],
  );

  const routeCtx = useMemo(
    () => ({
      outlet: null,
      matches: [
        {
          id: "live-app-preview",
          pathname: location.pathname,
          pathnameBase: location.pathname,
          params,
          data: undefined,
          handle: undefined,
          loaderData: undefined,
          actionData: undefined,
          error: undefined,
          route: {
            id: "live-app-preview",
            path: location.pathname,
            element: null,
          },
        },
      ],
      isDataRoute: false,
    }),
    [location.pathname, params],
  );

  return (
    <UNSAFE_NavigationContext.Provider value={navigation}>
      <UNSAFE_LocationContext.Provider value={locationCtx}>
        <UNSAFE_RouteContext.Provider value={routeCtx}>{children}</UNSAFE_RouteContext.Provider>
      </UNSAFE_LocationContext.Provider>
    </UNSAFE_NavigationContext.Provider>
  );
}

class PreviewErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-[#1a1a1a] px-4 text-center">
          <p className="text-[11px] font-medium text-white/70">Preview failed</p>
          <p className="mt-1 text-[10px] leading-snug text-white/40">
            {this.state.error.message || "Unknown error"}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

/** Intrinsic desktop canvas size before scale. */
export const DESKTOP_PREVIEW = { width: 1100, height: 720 };

/**
 * Renders the real app screen for a path inside an isolated store + location.
 * Scaled into `displayWidth` × `displayHeight` for the flow board.
 */
export function LiveAppPreview({
  path,
  frame = "mobile",
  scale = frame === "desktop" ? 0.72 : 0.82,
  active = false,
  className = "",
  seedMode = "org",
}) {
  const resolved = resolveLiveRoute(path);
  const intrinsic =
    frame === "desktop" || resolved?.frame === "desktop"
      ? DESKTOP_PREVIEW
      : LISTENER_FRAME;
  const displayW = intrinsic.width * scale;
  const displayH = intrinsic.height * scale;
  const isDesktop = intrinsic === DESKTOP_PREVIEW;

  if (!resolved) {
    return (
      <div
        className={`flex items-center justify-center rounded-[1.15rem] border border-white/15 bg-[#141414] text-[11px] text-white/40 ${className}`}
        style={{ width: displayW, height: displayH }}
      >
        Preview unavailable
      </div>
    );
  }

  const { Screen, seed } = resolved;

  return (
    <div
      className={`relative overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] ${
        isDesktop ? "rounded-xl border" : "rounded-[1.35rem] border"
      } ${
        active
          ? "border-white/45 shadow-[0_18px_48px_rgba(255,255,255,0.08)]"
          : "border-white/15"
      } ${className}`}
      style={{ width: displayW, height: displayH, background: isDesktop ? "#141414" : "var(--proto-bg, #faf9f7)" }}
    >
      <div
        className="origin-top-left"
        style={{
          width: intrinsic.width,
          height: intrinsic.height,
          transform: `scale(${scale})`,
        }}
      >
        <PreviewErrorBoundary key={`${path}-${seedMode}`}>
          <PreviewContext path={path}>
            <AppStoreProvider persist={false} seedState={wireframeSeedFor(seed, seedMode)}>
              <div
                className="pointer-events-none h-full w-full overflow-hidden"
                style={{ width: intrinsic.width, height: intrinsic.height }}
              >
                <Screen />
              </div>
            </AppStoreProvider>
          </PreviewContext>
        </PreviewErrorBoundary>
      </div>
    </div>
  );
}

/** Mount live preview only when near the horizontal scroll viewport. */
export function LazyLiveAppPreview(props) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const frame = props.frame ?? resolveLiveRoute(props.path)?.frame ?? "mobile";
  const scale = props.scale ?? (frame === "desktop" ? 0.72 : 0.82);
  const intrinsic = frame === "desktop" ? DESKTOP_PREVIEW : LISTENER_FRAME;
  const displayW = intrinsic.width * scale;
  const displayH = intrinsic.height * scale;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { root: null, rootMargin: "400px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: displayW, height: displayH }}>
      {visible ? (
        <LiveAppPreview {...props} frame={frame} scale={scale} />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center border border-white/10 bg-[#141414] text-[10px] text-white/25 ${
            frame === "desktop" ? "rounded-xl" : "rounded-[1.35rem]"
          }`}
        >
          Loading…
        </div>
      )}
    </div>
  );
}
