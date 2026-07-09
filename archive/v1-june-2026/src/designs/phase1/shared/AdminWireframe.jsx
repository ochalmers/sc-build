/** Styled operator surfaces for Partner Console & Admin CMS */
export function AdminPhone({ label, children }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#F8F7F5]">
      <div className="border-b border-ink-200/60 bg-white px-4 pb-3 pt-10">
        <span className="inline-block rounded-full bg-ink-950/5 px-2 py-0.5 text-[8px] font-medium uppercase tracking-wider text-ink-500">
          Web
        </span>
        <p className="mt-2 text-[11px] font-semibold text-ink-900">{label}</p>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}

export function WfMetric({ label, value }) {
  return (
    <div className="rounded-xl border border-dashed border-[#D4D4D8] bg-white p-3">
      <p className="text-[9px] font-medium uppercase tracking-wider text-[#A1A1AA]">{label}</p>
      <p className="mt-1 text-[20px] font-bold tabular-nums text-[#18181B]">{value}</p>
    </div>
  );
}

export function WfRow({ primary, secondary, action }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#E4E4E7] px-4 py-3">
      <div className="h-8 w-8 shrink-0 rounded-full bg-[#E4E4E7]" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-medium text-[#18181B]">{primary}</p>
        {secondary ? <p className="truncate text-[10px] text-[#71717A]">{secondary}</p> : null}
      </div>
      {action ? (
        <span className="shrink-0 rounded-md bg-[#E4E4E7] px-2 py-1 text-[9px] font-medium text-[#52525B]">
          {action}
        </span>
      ) : null}
    </div>
  );
}

export function WfButton({ children, primary = true }) {
  return (
    <button
      type="button"
      className={`flex h-9 w-full items-center justify-center rounded-lg text-[12px] font-semibold ${
        primary ? "bg-[#18181B] text-white" : "border border-[#D4D4D8] bg-white text-[#3F3F46]"
      }`}
    >
      {children}
    </button>
  );
}

export function WfField({ label, placeholder }) {
  return (
    <div>
      <label className="text-[10px] font-medium text-[#52525B]">{label}</label>
      <div className="mt-1 flex h-9 items-center rounded-lg border border-[#D4D4D8] bg-white px-3 text-[11px] text-[#A1A1AA]">
        {placeholder}
      </div>
    </div>
  );
}

export function WfTab({ tabs, active }) {
  return (
    <div className="flex border-b border-[#E4E4E7] bg-white">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`flex-1 py-2.5 text-[10px] font-semibold ${
            active === tab ? "border-b-2 border-[#18181B] text-[#18181B]" : "text-[#A1A1AA]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
