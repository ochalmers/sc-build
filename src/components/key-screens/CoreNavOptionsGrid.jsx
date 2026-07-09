import { CORE_UI_OPTIONS } from "./coreNavConcepts.jsx";

function CoreNavOptionCard({ option }) {
  const { Phone } = option;

  return (
    <article className="flex w-[280px] shrink-0 flex-col rounded-2xl border border-ink-200/70 bg-white/60 p-5">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[11px] font-medium text-ink-400">{option.letter}</span>
        <h3 className="text-[14px] font-medium tracking-tight text-ink-950">{option.name}</h3>
      </div>
      <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-ink-500">{option.tabs}</p>
      <p className="mt-3 text-[12px] leading-relaxed text-ink-600">{option.idea}</p>

      <div className="mt-6 flex min-h-[320px] items-start justify-center">
        <Phone />
      </div>

      <dl className="mt-5 space-y-3 border-t border-ink-200/60 pt-4 text-[11px]">
        <div>
          <dt className="font-medium text-ink-500">Best for</dt>
          <dd className="mt-0.5 leading-relaxed text-ink-700">{option.best}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink-500">Watch out</dt>
          <dd className="mt-0.5 leading-relaxed text-ink-700">{option.watchout}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function CoreNavOptionsGrid() {
  return (
    <div className="-mx-2 overflow-x-auto px-2 pb-4">
      <div className="flex min-w-min items-start gap-5 md:gap-6">
        {CORE_UI_OPTIONS.map((option) => (
          <CoreNavOptionCard key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
}
