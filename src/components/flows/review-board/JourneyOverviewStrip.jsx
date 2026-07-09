function OverviewArrow() {
  return (
    <span className="shrink-0 px-1 text-ink-300" aria-hidden>
      ↓
    </span>
  );
}

export default function JourneyOverviewStrip({ labels, className = "" }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] tracking-tight text-ink-600 ${className}`}
    >
      {labels.map((label, index) => (
        <span key={`${label}-${index}`} className="inline-flex items-center gap-2">
          <span className="font-medium text-ink-800">{label}</span>
          {index < labels.length - 1 ? <OverviewArrow /> : null}
        </span>
      ))}
    </div>
  );
}
