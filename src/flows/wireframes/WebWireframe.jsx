export function WebWireframe({ children, label, title, className = "" }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className="w-[300px] shrink-0 overflow-hidden rounded-xl border border-[#E4E4E7] bg-white shadow-[0_16px_40px_rgba(10,10,9,0.08)]"
        style={{ minHeight: "220px" }}
      >
        <div className="border-b border-[#F4F4F5] bg-[#FAFAFA] px-4 py-2.5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">
            {title ?? "Web wireframe"}
          </p>
        </div>
        <div className="p-4 text-[#18181B]" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
          {children}
        </div>
      </div>
      {label ? (
        <p className="mt-3 max-w-[300px] text-center text-[11px] font-medium leading-snug text-ink-700">
          {label}
        </p>
      ) : null}
    </div>
  );
}

export function WfWebRow({ title, sub, active = false }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border px-3 py-2.5"
      style={{
        borderColor: active ? "#18181B" : "#E4E4E7",
        background: active ? "#FAFAFA" : "transparent",
      }}
    >
      <div>
        <p className="text-[11px] font-semibold">{title}</p>
        {sub ? <p className="text-[9px] text-[#71717A]">{sub}</p> : null}
      </div>
      <span className="text-[#A1A1AA]">›</span>
    </div>
  );
}

export function WfWebBtn({ children, primary = true }) {
  return (
    <div
      className="rounded-lg px-3 py-2 text-center text-[11px] font-semibold"
      style={{
        background: primary ? "#18181B" : "#F4F4F5",
        color: primary ? "#FAFAFA" : "#52525B",
      }}
    >
      {children}
    </div>
  );
}
