import { appTypeClasses } from "../tokens/typography.js";
import { IconDiscover, IconProfile } from "./SampleIcons.jsx";
import { SystemBrandLogo } from "./SystemBrandLogo.jsx";

const defaultTabs = [
  { id: "discover", label: "Discover", icon: IconDiscover },
  { id: "today", label: "today", icon: null, active: true },
  { id: "profile", label: "Profile", icon: IconProfile },
];

export function SystemTabBar({ tabs = defaultTabs, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-full h-[136px] backdrop-blur-appFade"
        style={{
          background:
            "linear-gradient(to top, var(--proto-bg) 0%, color-mix(in srgb, var(--proto-bg) 70%, transparent) 55%, transparent 100%)",
        }}
        aria-hidden
      />
      <nav
        className="flex h-app-tabbar items-center justify-center overflow-hidden backdrop-blur-appTab"
        style={{ color: "var(--proto-text)" }}
        aria-label="Primary"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = Boolean(tab.active);
          return (
            <button
              key={tab.id}
              type="button"
              className="flex h-full w-app-tab flex-col items-center justify-center gap-2 py-5"
              aria-current={active ? "page" : undefined}
              style={{ color: active ? "var(--proto-text)" : "var(--proto-text-muted)" }}
            >
              {tab.id === "today" ? (
                <SystemBrandLogo className="h-[26px] w-auto max-w-[20px]" />
              ) : Icon ? (
                <Icon />
              ) : null}
              <span className={appTypeClasses.tabLabel}>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
