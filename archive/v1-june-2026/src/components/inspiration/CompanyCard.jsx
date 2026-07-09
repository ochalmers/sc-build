export function CompanyCard({ company }) {
  return (
    <a
      href={company.mobbinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-ink-200/80 bg-white/55 p-5 transition-colors hover:border-ink-300 hover:bg-white/90"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-[15px] font-medium tracking-tight text-ink-950 group-hover:text-ink-800">
            {company.name}
          </h4>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">
            {company.platform}
          </p>
        </div>
        {company.hasLocal ? (
          <span className="shrink-0 rounded-full bg-ink-950 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-paper-200">
            Local
          </span>
        ) : (
          <span className="shrink-0 text-[10px] text-ink-400 transition-colors group-hover:text-ink-600">
            Mobbin →
          </span>
        )}
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-600">{company.relevance}</p>
    </a>
  );
}
