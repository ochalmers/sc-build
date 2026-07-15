import { appTypeClasses } from "../tokens/typography.js";
import { IconProfile } from "./SampleIcons.jsx";
import { SystemLogoMark } from "./SystemLogoMark.jsx";

const defaultTabs = [
  { id: "home", label: "Home", icon: SystemLogoMark, active: true },
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
              className="flex h-full flex-1 flex-col items-center justify-center gap-2 py-5"
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
