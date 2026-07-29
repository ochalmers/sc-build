import { Component, useMemo } from "react";
import {
  matchPath,
  UNSAFE_LocationContext,
  UNSAFE_NavigationContext,
  UNSAFE_RouteContext,
} from "react-router-dom";
import { AppStoreProvider } from "../../app/context/AppStore.jsx";
import { ListenerInvite, ListenerLogin } from "../../app/screens/listener/AuthScreens.jsx";
import { ListenerOnboarding } from "../../app/screens/listener/OnboardingScreens.jsx";
import {
  ListenerAssigned,
  ListenerFavorites,
  ListenerHome,
  ListenerOrganisation,
  ListenerProgress,
  ListenerSessionDetail,
} from "../../app/screens/listener/LibraryScreens.jsx";
import {
  ListenerAbout,
  ListenerFeedback,
  ListenerPlayer,
  ListenerProfile,
  ListenerSupport,
} from "../../app/screens/listener/PlayerScreens.jsx";
import { wireframeSeedFor } from "../../content/appWireframes.js";

const PARAM_PATTERNS = [
  "/app/listener/session/:sessionId",
  "/app/listener/player/:sessionId",
  "/app/listener/feedback/:sessionId",
];

const SCREENS = {
  invite: ListenerInvite,
  login: ListenerLogin,
  onboarding: ListenerOnboarding,
  home: ListenerHome,
  assigned: ListenerAssigned,
  favorites: ListenerFavorites,
  session: ListenerSessionDetail,
  profile: ListenerProfile,
  player: ListenerPlayer,
  about: ListenerAbout,
  feedback: ListenerFeedback,
  support: ListenerSupport,
  progress: ListenerProgress,
  organisation: ListenerOrganisation,
};

function parseLocation(path) {
  const [pathname, search = ""] = path.split("?");
  return {
    pathname,
    search: search ? `?${search}` : "",
    hash: "",
    state: null,
    key: "wireframe-preview",
  };
}

function paramsForPath(pathname) {
  for (const pattern of PARAM_PATTERNS) {
    const match = matchPath(pattern, pathname);
    if (match) return match.params;
  }
  return {};
}

/**
 * Provides location / params / a no-op navigator so Open App screens can render
 * on /app-wireframes without nesting a Router or using <Routes location>.
 */
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
          id: "wireframe-preview",
          pathname: location.pathname,
          pathnameBase: location.pathname,
          params,
          data: undefined,
          handle: undefined,
          loaderData: undefined,
          actionData: undefined,
          error: undefined,
          route: {
            id: "wireframe-preview",
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
        <div className="flex h-[812px] w-[390px] flex-col justify-center rounded-[2rem] border border-red-200 bg-red-50 px-6 text-[13px] text-red-800">
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

export default function WireframePhonePreview({ wireframe }) {
  const seed = wireframeSeedFor(wireframe.seed);
  const Screen = SCREENS[wireframe.screen];

  if (!Screen) {
    return (
      <div className="flex h-[812px] w-[390px] items-center justify-center rounded-[2rem] border border-ink-200 bg-ink-50 text-[13px] text-ink-500">
        Preview unavailable
      </div>
    );
  }

  return (
    <PreviewErrorBoundary key={wireframe.id}>
      <div className="select-none">
        <PreviewContext path={wireframe.path}>
          <AppStoreProvider persist={false} seedState={seed}>
            <Screen />
          </AppStoreProvider>
        </PreviewContext>
      </div>
    </PreviewErrorBoundary>
  );
}
