import { Component, useMemo } from "react";
import {
  matchPath,
  UNSAFE_LocationContext,
  UNSAFE_NavigationContext,
  UNSAFE_RouteContext,
} from "react-router-dom";
import { AppStoreProvider } from "../../app/context/AppStore.jsx";
import {
  AdminAnalytics,
  AdminExport,
  AdminHome,
  AdminInvites,
  AdminPartners,
  AdminSessions,
} from "../../app/screens/admin/AdminScreens.jsx";
import { wireframeSeedFor } from "../../content/appWireframes.js";

const SCREENS = {
  "admin-home": AdminHome,
  "admin-sessions": AdminSessions,
  "admin-organizations": AdminPartners,
  "admin-invites": AdminInvites,
  "admin-insights": AdminAnalytics,
  "admin-export": AdminExport,
};

function parseLocation(path) {
  const [pathname, search = ""] = path.split("?");
  return {
    pathname,
    search: search ? `?${search}` : "",
    hash: "",
    state: null,
    key: "wireframe-desktop-preview",
  };
}

function paramsForPath(pathname) {
  const match = matchPath("/app/admin/:rest?", pathname);
  return match?.params ?? {};
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
          id: "wireframe-desktop-preview",
          pathname: location.pathname,
          pathnameBase: location.pathname,
          params,
          data: undefined,
          handle: undefined,
          loaderData: undefined,
          actionData: undefined,
          error: undefined,
          route: {
            id: "wireframe-desktop-preview",
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
        <div className="flex h-[560px] w-full max-w-[960px] flex-col justify-center rounded-2xl border border-red-200 bg-red-50 px-6 text-[13px] text-red-800">
          <p className="font-medium">Preview failed</p>
          <p className="mt-2 text-[12px] leading-relaxed text-red-700/80">
            {this.state.error.message || "Unknown error"}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Desktop frame for Admin console Open App screens on /app-wireframes.
 */
export default function WireframeDesktopPreview({ wireframe }) {
  const seed = wireframeSeedFor(wireframe.seed ?? "admin");
  const Screen = SCREENS[wireframe.screen];

  if (!Screen) {
    return (
      <div className="flex h-[560px] w-full max-w-[960px] items-center justify-center rounded-2xl border border-ink-200 bg-ink-50 text-[13px] text-ink-500">
        Preview unavailable
      </div>
    );
  }

  return (
    <PreviewErrorBoundary key={wireframe.id ?? wireframe.path}>
      <div className="w-full max-w-[960px] select-none overflow-hidden rounded-2xl border border-ink-200 shadow-[0_12px_40px_rgba(15,15,15,0.12)]">
        <div className="flex items-center gap-2 border-b border-ink-200 bg-ink-100 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
          <span className="ml-3 truncate font-mono text-[11px] text-ink-500">{wireframe.path}</span>
        </div>
        <div className="max-h-[640px] overflow-y-auto bg-[#0f0f0f]">
          <PreviewContext path={wireframe.path}>
            <AppStoreProvider persist={false} seedState={seed}>
              <Screen />
            </AppStoreProvider>
          </PreviewContext>
        </div>
      </div>
    </PreviewErrorBoundary>
  );
}
