export function ReferenceList({ companies }) {
  if (!companies?.length) return null;

  return (
    <div className="mt-10 rounded-xl border border-ink-200/50 bg-paper-50/80 p-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
        Cross-app references
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-ink-500">
        Comparable patterns from other apps — use Mobbin for screens we have not archived locally.
      </p>
      <ul className="mt-4 divide-y divide-ink-200/60">
        {companies
          .filter((c) => !c.hasLocal)
          .map((company) => (
            <li key={`${company.name}-${company.platform}`} className="flex flex-wrap items-baseline justify-between gap-2 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <span className="text-[13px] font-medium text-ink-800">{company.name}</span>
                <span className="ml-2 text-[10px] uppercase tracking-[0.1em] text-ink-400">
                  {company.platform}
                </span>
                <p className="mt-0.5 text-[12px] leading-relaxed text-ink-500">{company.relevance}</p>
              </div>
              <a
                href={company.mobbinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[11px] font-medium text-ink-500 underline decoration-ink-300 underline-offset-2 transition-colors hover:text-ink-800"
              >
                Mobbin
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
