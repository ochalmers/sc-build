export function ReferenceList({ examples }) {
  if (!examples?.length) return null;

  return (
    <div className="mt-10 rounded-xl border border-ink-200/50 bg-paper-50/80 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
          Reference examples · {examples.length}
        </p>
        <p className="text-[11px] text-ink-400">What we are designing → how each reference helps</p>
      </div>
      <ul className="mt-4 divide-y divide-ink-200/60">
        {examples.map((example) => (
          <li
            key={`${example.name}-${example.pattern}-${example.platform}`}
            className="py-4 first:pt-0 last:pb-0"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[13px] font-medium text-ink-800">{example.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-ink-400">
                    {example.platform}
                  </span>
                  {example.hasLocal ? (
                    <span className="rounded-full border border-ink-200 bg-white px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-ink-500">
                      Local archive
                    </span>
                  ) : null}
                  <span className="rounded-full border border-ink-200/80 bg-white px-2 py-0.5 text-[9px] font-medium text-ink-600">
                    {example.pattern}
                  </span>
                </div>
                <dl className="mt-2 space-y-1.5 text-[12px] leading-relaxed">
                  <div>
                    <dt className="inline font-medium text-ink-700">What we are doing · </dt>
                    <dd className="inline text-ink-600">{example.whatWeAreDoing}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-ink-700">Relevance · </dt>
                    <dd className="inline text-ink-500">{example.relevance}</dd>
                  </div>
                </dl>
              </div>
              {example.mobbinUrl ? (
                <a
                  href={example.mobbinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-[11px] font-medium text-ink-500 underline decoration-ink-300 underline-offset-2 transition-colors hover:text-ink-800"
                >
                  Mobbin
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
