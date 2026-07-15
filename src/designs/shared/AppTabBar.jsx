import { IconProfile } from "../../system/components/SampleIcons.jsx";
import { SystemLogoMark } from "../../system/components/SystemLogoMark.jsx";

export function AppTabBar({ active = "home", variant = "light" }) {
  const isDark = variant === "dark";
  const activeColor = isDark ? "#F3F4F0" : "#080808";
  const mutedColor = isDark ? "rgba(243,244,240,0.45)" : "#8D8D8D";

  const normalized =
    active === "today" ||
    active === "discover" ||
    active === "library" ||
    active === "sessions" ||
    active === "assigned" ||
    active === "progress"
      ? "home"
      : active;

  const tabs = [
    { id: "home", label: "Home", Icon: SystemLogoMark },
    { id: "profile", label: "Profile", Icon: IconProfile },
  ];

  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center backdrop-blur-md"
      style={{
        height: "66px",
        background: isDark ? "rgba(32,30,42,0.92)" : "rgba(253,253,253,0.95)",
      }}
      aria-label="App navigation"
    >
      {tabs.map(({ id, label, Icon }) => {
        const on = normalized === id;
        return (
          <button
            key={id}
            type="button"
            className="flex flex-1 flex-col items-center gap-1 py-3"
            style={{ color: on ? activeColor : mutedColor }}
          >
            <Icon className={id === "home" ? "h-[18px] w-auto" : "h-[18px] w-[18px]"} />
            <span className="text-[8px] uppercase tracking-[0.4px]">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
