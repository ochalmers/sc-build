function IconSearch({ active }) {
  const stroke = active ? "#080808" : "#8D8D8D";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="5.25" stroke={stroke} strokeWidth="1.2" />
      <path d="M11.5 11.5L15.5 15.5" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconProfile({ active }) {
  const stroke = active ? "#080808" : "#8D8D8D";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="6" r="3" stroke={stroke} strokeWidth="1.2" />
      <path d="M3.5 15.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SonoceaMark({ dark = false }) {
  const fill = dark ? "rgba(243,244,240,0.7)" : "rgba(24,24,24,0.8)";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="27" viewBox="0 0 20 27" fill="none" aria-hidden>
      <path
        d="M13.1783 0H19.7669V13.1783H13.1783C9.54225 13.1783 6.58984 10.2259 6.58984 6.58978C6.58856 2.95241 9.54225 0 13.1783 0Z"
        fill={fill}
      />
      <path
        d="M6.5885 13.1783C2.94985 13.1783 0 10.2284 0 6.5885C0 2.94985 2.94985 0 6.5885 0V13.1783Z"
        fill={fill}
      />
      <path
        d="M13.1777 13.1771C16.8164 13.1771 19.7662 16.1269 19.7662 19.7656C19.7662 23.4042 16.8164 26.3541 13.1777 26.3541V13.1758V13.1771Z"
        fill={fill}
      />
      <path
        d="M0 13.1771H6.5885C10.2246 13.1771 13.177 16.1295 13.177 19.7656C13.177 23.4017 10.2246 26.3541 6.5885 26.3541H0V13.1758V13.1771Z"
        fill={fill}
      />
    </svg>
  );
}

export function AppTabBar({ active = "today", variant = "light" }) {
  const isDark = variant === "dark";
  const activeColor = isDark ? "#F3F4F0" : "#080808";
  const mutedColor = isDark ? "rgba(243,244,240,0.45)" : "#8D8D8D";

  const tabStyle = (name) => ({
    color: active === name ? activeColor : mutedColor,
  });

  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center backdrop-blur-md"
      style={{
        height: "66px",
        background: isDark ? "rgba(32,30,42,0.92)" : "rgba(253,253,253,0.95)",
      }}
      aria-label="App navigation"
    >
      <button type="button" className="flex flex-1 flex-col items-center gap-1.5 py-3" style={tabStyle("discover")}>
        <IconSearch active={active === "discover"} />
        <span className="text-[7px] uppercase tracking-[0.37px]">Discover</span>
      </button>
      <button type="button" className="flex flex-1 flex-col items-center gap-1.5 py-3" style={tabStyle("today")}>
        <SonoceaMark dark={isDark} />
        <span className="text-[9px] uppercase tracking-[0.45px]">Today</span>
      </button>
      <button type="button" className="flex flex-1 flex-col items-center gap-1.5 py-3" style={tabStyle("profile")}>
        <IconProfile active={active === "profile"} />
        <span className="text-[7px] uppercase tracking-[0.37px]">Profile</span>
      </button>
    </nav>
  );
}
