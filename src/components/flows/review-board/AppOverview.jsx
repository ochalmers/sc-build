export default function AppOverview({ overview }) {
  return (
    <div className="max-w-content">
      <p className="max-w-xl text-[17px] leading-relaxed tracking-tight text-ink-700">{overview.summary}</p>
      <div className="mt-10 flex flex-wrap gap-4">
        {overview.modes.map((mode) => (
          <div
            key={mode.label}
            className="min-w-[200px] flex-1 rounded-2xl border border-ink-200/60 bg-white/60 px-6 py-5"
          >
            <p className="text-[15px] font-medium tracking-tight text-ink-950">{mode.label}</p>
            <p className="mt-1.5 text-[13px] text-ink-500">{mode.screens} screens</p>
          </div>
        ))}
      </div>
    </div>
  );
}
