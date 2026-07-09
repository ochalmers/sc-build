function MetaPill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-ink-200/80 bg-white/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-600">
      {children}
    </span>
  );
}

const PRIORITY_STYLES = {
  P0: "border-accent-clay/40 bg-accent-clay/10 text-accent-clay",
  P1: "border-ink-300/70 bg-white/70 text-ink-700",
  P2: "border-ink-200/70 bg-paper-100/70 text-ink-500",
};

export function PriorityBadge({ priority }) {
  if (!priority) return null;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
        PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.P2
      }`}
    >
      {priority}
    </span>
  );
}

export function UserStoryCard({ story, index }) {
  return (
    <article
      id={`story-${story.id}`}
      className="scroll-mt-[7rem] rounded-2xl border border-ink-200/80 bg-white/50 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <PriorityBadge priority={story.priority} />
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">
              {story.id ? story.id : `Story ${String(index + 1).padStart(2, "0")}`}
            </p>
          </div>
          <h3 className="mt-2 text-[clamp(1.05rem,2vw,1.35rem)] font-medium leading-snug tracking-tight text-ink-950">
            {story.title}
          </h3>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-700 italic">
            {story.narrative}
          </p>
          {story.priorityNote ? (
            <p className="mt-3 text-[12px] leading-relaxed text-ink-500">
              <span className="font-medium text-ink-600">Why {story.priority}:</span> {story.priorityNote}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {story.prdRef ? <MetaPill>{story.prdRef}</MetaPill> : null}
          {story.surfaces?.map((s) => (
            <MetaPill key={s}>{s}</MetaPill>
          ))}
        </div>
      </div>

      {story.acceptance?.length ? (
        <div className="mt-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
            Acceptance criteria
          </p>
          <ul className="mt-3 space-y-2">
            {story.acceptance.map((item) => (
              <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-ink-600">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-400" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {story.openQuestions?.length ? (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Open (PRD)</p>
            <ul className="mt-3 space-y-2">
              {story.openQuestions.map((q) => (
                <li key={q} className="text-[12px] leading-relaxed text-ink-600">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {story.excluded?.length ? (
          <div className={story.openQuestions?.length ? "" : "md:col-span-2"}>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
              Excluded from LITE (out of scope)
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {story.excluded.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-dashed border-ink-300/80 bg-paper-100/60 px-3 py-1.5 text-[11px] text-ink-500"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
