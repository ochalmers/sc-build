function StatusBar({ dark = false }) {
  const fg = dark ? "white" : "black";
  return (
    <div
      className="flex items-center justify-between px-5 pb-3 pt-2.5"
      style={{ background: dark ? "#0A0A0A" : "#FFFFFF" }}
    >
      <span className="text-[11px] font-semibold" style={{ color: fg }}>
        9:41
      </span>
      <div className="flex gap-1 opacity-80" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-sm" style={{ background: fg, opacity: 0.85 }} />
        <span className="h-2.5 w-3.5 rounded-sm" style={{ background: fg, opacity: 0.55 }} />
        <span className="h-2.5 w-4 rounded-sm border" style={{ borderColor: fg, opacity: 0.45 }} />
      </div>
    </div>
  );
}

export function WireframePhone({ children, dark = false, label, className = "" }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className="relative w-[260px] shrink-0 overflow-hidden rounded-[2rem] border border-[#E4E4E7] bg-white shadow-[0_20px_50px_rgba(10,10,9,0.1)]"
        style={{ aspectRatio: "390 / 844" }}
      >
        <StatusBar dark={dark} />
        <div
          className="flex h-[calc(100%-40px)] flex-col overflow-hidden text-[#18181B]"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            background: dark ? "#0A0A0A" : "#FFFFFF",
            color: dark ? "#FAFAFA" : "#18181B",
          }}
        >
          {children}
        </div>
      </div>
      {label ? (
        <p className="mt-3 max-w-[260px] text-center text-[11px] font-medium leading-snug text-ink-700">
          {label}
        </p>
      ) : null}
    </div>
  );
}

export function WfTag({ children }) {
  return (
    <p className="px-5 pb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#A1A1AA]">
      {children}
    </p>
  );
}

export function WfButton({ children, primary = true, className = "" }) {
  return (
    <div
      className={`rounded-xl px-4 py-3 text-center text-[13px] font-semibold ${className}`}
      style={{
        background: primary ? "#18181B" : "transparent",
        color: primary ? "#FAFAFA" : "#71717A",
        border: primary ? "none" : "1px solid #D4D4D8",
      }}
    >
      {children}
    </div>
  );
}

export function WfField({ label, placeholder }) {
  return (
    <div className="px-5">
      <div className="text-[12px] font-semibold text-[#52525B]">{label}</div>
      <div className="mt-1.5 rounded-[10px] border border-[#D4D4D8] px-3 py-2.5 text-[12px] text-[#A1A1AA]">
        {placeholder}
      </div>
    </div>
  );
}

export function WfTabBar({ active = "sessions" }) {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "sessions", label: "Sessions" },
    { id: "saved", label: "Saved" },
    { id: "profile", label: "Profile" },
  ];
  return (
    <div className="mt-auto flex justify-between border-t border-[#F4F4F5] px-5 py-2.5">
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <div key={t.id} className="flex w-14 flex-col items-center gap-1">
            <div
              className="h-[18px] w-[18px] rounded-md"
              style={{
                background: on ? "#18181B" : "transparent",
                border: on ? "none" : "1px solid #D4D4D8",
              }}
            />
            <span
              className="text-[8px] font-semibold uppercase"
              style={{ color: on ? "#18181B" : "#A1A1AA" }}
            >
              {t.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function WfSessionRow({ title, meta }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#F4F4F5] px-5 py-3">
      <div className="h-11 w-11 shrink-0 rounded-[10px] bg-[#E4E4E7]" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-semibold">{title}</p>
        <p className="text-[10px] text-[#71717A]">{meta}</p>
      </div>
    </div>
  );
}
