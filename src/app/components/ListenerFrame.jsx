import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ModeChrome } from "../../system/components/ModeChrome.jsx";
import { IconAssigned, IconProfile } from "../../system/components/SampleIcons.jsx";
import { SystemLogoMark } from "../../system/components/SystemLogoMark.jsx";
import { appTypeClasses } from "../../system/tokens/typography.js";
import { useAppStore } from "../context/AppStore.jsx";
import { LISTENER_MVP_NAV } from "../../content/flows.js";
import PinComments from "../../components/comments/PinComments.jsx";
import { resolveAppearance } from "../utils/appearance.js";
import { CheckInModalHost } from "./CheckInModal.jsx";
import { SessionDrawerHost } from "./SessionDrawer.jsx";

/** Fixed iPhone-class frame - content scrolls; chrome stays put. */
export const LISTENER_FRAME = { width: 390, height: 812 };

/** Space reserved above overlaid bottom chrome on Home (tabs + breathing room). */
export const LISTENER_BOTTOM_CHROME = 96;
/** Extra when mode pills are docked above the tab bar. */
export const LISTENER_BOTTOM_CHROME_WITH_PILLS = 132;

const DARK_APPEARANCE = {
  "--proto-bg": "#141414",
  "--proto-surface": "#1c1c1c",
  "--proto-surface-elevated": "#262626",
  "--proto-text": "#f3f3f3",
  "--proto-text-muted": "#9a9a9a",
  "--proto-accent": "#d0d0d0",
  "--proto-accent-soft": "#787878",
  "--proto-border": "#3a3a3a",
  "--proto-wave": "#a8a8a8",
};

const TAB_ICONS = {
  library: IconAssigned,
  home: SystemLogoMark,
  profile: IconProfile,
};

/**
 * Phone-framed Listener surface. Uses design-system ModeChrome for palette.
 * Primary navigation is bottom tabs (Library · Home · Profile).
 * Full page fades in (300ms) on route and in-screen step changes.
 * Pass slowEnter for a slightly longer settle — e.g. into session playback.
 */
export function ListenerFrame({
  mode = "regulation",
  children,
  footer,
  /** Sticky strip above the bottom tabs (e.g. home mode carousel). */
  aboveTabBar,
  hideTabBar,
  activeTab = "home",
  onTabChange,
  /** Edge-to-edge content (session detail / player) - no chrome padding. */
  bleed = false,
  /** Prevent the phone content area from scrolling (modals). */
  lockScroll = false,
  /**
   * Overlay pills + tabs on top of content with frosted gradient so the
   * page background continues behind the bottom chrome.
   */
  overlayChrome = false,
  /** Extra key segment for in-screen state transitions (e.g. feedback sent). */
  screenKey,
  /** Slightly longer ease-out fade than the default 300ms tab transition. */
  slowEnter = false,
}) {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { appearance } = useAppStore();
  const [clock, setClock] = useState(() => Date.now());

  useEffect(() => {
    if (appearance !== "adapt") return undefined;
    const id = window.setInterval(() => setClock(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, [appearance]);

  const isDark = resolveAppearance(appearance, new Date(clock)) === "dark";
  const enterKey = `${pathname}${search}${screenKey != null ? `:${screenKey}` : ""}`;
  const glass = Boolean(overlayChrome && !footer && !hideTabBar);

  function handleTabChange(id) {
    if (onTabChange) {
      onTabChange(id);
      return;
    }
    const tab = LISTENER_MVP_NAV.find((t) => t.id === id);
    if (tab) navigate(tab.path);
  }

  const chrome = !hideTabBar && !footer ? (
    <div className={glass ? "pointer-events-none absolute inset-x-0 bottom-0 z-30" : "relative z-10 shrink-0"}>
      {/* Light frost behind mode pills + tab bar — same on every home mode. */}
      {glass ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px]"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.78) 38%, rgba(255,255,255,0.42) 68%, rgba(255,255,255,0) 100%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            maskImage:
              "linear-gradient(to top, black 0%, black 48%, rgba(0,0,0,0.6) 78%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, black 48%, rgba(0,0,0,0.6) 78%, transparent 100%)",
          }}
          aria-hidden
        />
      ) : null}

      <div className="relative pointer-events-auto">
        {aboveTabBar ? <div className="relative z-10">{aboveTabBar}</div> : null}
        <ListenerTabBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          glass={glass}
          fadeAbove={!glass && !aboveTabBar}
          isDark={isDark}
        />
      </div>
    </div>
  ) : null;

  return (
    <ModeChrome mode={mode} className="flex w-full justify-center">
      <PinComments scopeKey={`app:${pathname}${search}`}>
        <div
          key={enterKey}
          className={`${
            slowEnter ? "app-screen-enter-slow" : "app-screen-enter"
          } app-proto-surface relative flex flex-col overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(18,18,18,0.18)] ring-1 ring-black/5`}
          style={{
            width: LISTENER_FRAME.width,
            height: LISTENER_FRAME.height,
            maxWidth: "100%",
            background: "var(--proto-bg)",
            color: "var(--proto-text)",
            ...(isDark ? DARK_APPEARANCE : {}),
          }}
        >
          <div
            className={`relative h-0 min-h-0 flex-1 ${
              glass || lockScroll ? "overflow-hidden" : "overflow-y-auto overscroll-contain"
            } ${bleed ? "p-0" : "px-4 pb-2 pt-3"}`}
          >
            <div className="app-screen-enter--fill">{children}</div>
          </div>

          {footer ? (
            <div className="relative shrink-0">
              <div
                className="pointer-events-none absolute inset-x-0 bottom-full h-12"
                style={{
                  background:
                    "linear-gradient(to top, var(--proto-bg) 0%, color-mix(in srgb, var(--proto-bg) 70%, transparent) 55%, transparent 100%)",
                }}
                aria-hidden
              />
              <div
                className="space-y-1 px-4 pb-5 pt-2"
                style={{ background: "var(--proto-bg)" }}
              >
                {footer}
              </div>
            </div>
          ) : null}

          {chrome}
          <SessionDrawerHost />
          <CheckInModalHost />
        </div>
      </PinComments>
    </ModeChrome>
  );
}

function ListenerTabBar({ activeTab, onTabChange, fadeAbove = true, glass = false, isDark = false }) {
  const tabs = LISTENER_MVP_NAV.map((tab) => ({
    ...tab,
    icon: TAB_ICONS[tab.id],
  }));

  return (
    <div className="relative shrink-0">
      {fadeAbove ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-full h-16"
          style={{
            background:
              "linear-gradient(to top, var(--proto-bg) 0%, color-mix(in srgb, var(--proto-bg) 65%, transparent) 55%, transparent 100%)",
          }}
          aria-hidden
        />
      ) : null}
      <nav
        className="flex h-[72px] items-center justify-center"
        style={
          glass
            ? {
                borderTop: "none",
                background: "transparent",
              }
            : {
                borderTop: "1px solid color-mix(in srgb, var(--proto-border) 50%, transparent)",
                background: "var(--proto-bg)",
              }
        }
        aria-label="Primary"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange?.(tab.id)}
              className="flex h-full flex-1 flex-col items-center justify-center gap-1"
              aria-current={active ? "page" : undefined}
              style={{
                // Overlay home chrome stays light-mode on every Rest/Focus/Restore tab.
                color: glass
                  ? active
                    ? "#111111"
                    : "rgba(17,17,17,0.4)"
                  : active
                    ? "var(--proto-text)"
                    : "var(--proto-text-muted)",
              }}
            >
              {Icon ? (
                <Icon className={tab.id === "home" ? "h-[22px] w-auto" : "h-[22px] w-[22px]"} />
              ) : null}
              <span className={appTypeClasses.tabLabel}>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
