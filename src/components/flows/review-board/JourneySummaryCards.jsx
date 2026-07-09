function SummaryCard({ label, value }) {
  return (
    <div className="min-w-[140px] flex-1 rounded-2xl border border-ink-200/60 bg-white/70 px-5 py-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-400">{label}</p>
      <p className="mt-2 text-[14px] font-medium leading-snug tracking-tight text-ink-900">{value}</p>
    </div>
  );
}

export default function JourneySummaryCards({ summary }) {
  return (
    <div className="flex flex-wrap gap-3">
      <SummaryCard label="Goal" value={summary.goal} />
      <SummaryCard label="Success Outcome" value={summary.successOutcome} />
      <SummaryCard label="Primary User Action" value={summary.primaryAction} />
      <SummaryCard label="Design Progress" value={summary.designProgress} />
    </div>
  );
}
