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

export function WireframePhone({ children, dark = false, label, className = "", compact = false }) {
  const width = compact ? "w-[200px]" : "w-[240px]";

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`relative ${width} shrink-0 overflow-hidden rounded-[1.65rem] border border-[#E4E4E7] bg-white shadow-[0_16px_40px_rgba(10,10,9,0.08)]`}
        style={{ aspectRatio: "390 / 844" }}
      >
        <StatusBar dark={dark} />
        <div
          className="flex h-[calc(100%-40px)] flex-col overflow-hidden text-[#18181B]"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            background: dark ? "#0A0A0A" : "#FFFFFF",
            color: dark ? "#FAFAFA" : "#18181B",
          }}
        >
          {children}
        </div>
      </div>
      {label ? (
        <p className="mt-2.5 max-w-[240px] text-center text-[10px] font-medium leading-snug text-ink-600">
          {label}
        </p>
      ) : null}
    </div>
  );
}
