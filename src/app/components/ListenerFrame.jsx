import { useNavigate } from "react-router-dom";
import { ModeChrome } from "../../system/components/ModeChrome.jsx";
import { IconProfile } from "../../system/components/SampleIcons.jsx";
import { SystemLogoMark } from "../../system/components/SystemLogoMark.jsx";
import { appTypeClasses } from "../../system/tokens/typography.js";
import { useAppStore } from "../context/AppStore.jsx";
import { LISTENER_MVP_NAV } from "../../content/flows.js";

/** Fixed iPhone-class frame — content scrolls; chrome stays put. */
export const LISTENER_FRAME = { width: 390, height: 812 };

const DARK_APPEARANCE = {
  "--proto-bg": "#141312",
  "--proto-surface": "#1c1b19",
  "--proto-surface-elevated": "#262422",
  "--proto-text": "#f3f2ee",
  "--proto-text-muted": "#9a9690",
  "--proto-accent": "#d2cdc4",
  "--proto-accent-soft": "#7a7670",
  "--proto-border": "#3a3834",
  "--proto-wave": "#a8b0aa",
};

const TAB_ICONS = {
  home: SystemLogoMark,
  profile: IconProfile,
};

/**
 * Phone-framed Listener surface. Uses design-system ModeChrome for palette.
 * Primary navigation is bottom tabs only (Home · Profile) — no top logo/menu.
 */
export function ListenerFrame({
  mode = "regulation",
  children,
  footer,
  hideTabBar,
  activeTab = "home",
  onTabChange,
  /** Edge-to-edge content (session detail / player) — no chrome padding. */
  bleed = false,
}) {
  const navigate = useNavigate();
  const { appearance } = useAppStore();
  const isDark = appearance === "dark";

  function handleTabChange(id) {
    if (onTabChange) {
      onTabChange(id);
      return;
    }
    const tab = LISTENER_MVP_NAV.find((t) => t.id === id);
    if (tab) navigate(tab.path);
  }

  return (
    <ModeChrome mode={mode} className="flex w-full justify-center">
      <div
        className="relative flex flex-col overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(18,18,18,0.18)] ring-1 ring-black/5"
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
          className={`relative min-h-0 flex-1 overflow-y-auto overscroll-contain ${
            bleed ? "p-0" : "px-5 pb-4 pt-6"
          }`}
        >
          {children}
        </div>

        {footer}
        {!hideTabBar && !footer ? (
          <ListenerTabBar activeTab={activeTab} onTabChange={handleTabChange} />
        ) : null}
      </div>
    </ModeChrome>
  );
}

function ListenerTabBar({ activeTab, onTabChange }) {
  const tabs = LISTENER_MVP_NAV.map((tab) => ({
    ...tab,
    icon: TAB_ICONS[tab.id],
  }));

  return (
    <div className="relative shrink-0">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-full h-16"
        style={{
          background:
            "linear-gradient(to top, var(--proto-bg) 0%, color-mix(in srgb, var(--proto-bg) 65%, transparent) 55%, transparent 100%)",
        }}
        aria-hidden
      />
      <nav
        className="flex h-[72px] items-center justify-center border-t"
        style={{
          borderColor: "color-mix(in srgb, var(--proto-border) 50%, transparent)",
          background: "var(--proto-bg)",
        }}
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
              style={{ color: active ? "var(--proto-text)" : "var(--proto-text-muted)" }}
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
