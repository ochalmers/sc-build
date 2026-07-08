import { DesignAppScreen, DesignConceptCard } from "../DesignAppScreen.jsx";

function ConceptScreen({ Screen, props }) {
  return <Screen {...props} />;
}

export function DesignScreenRow({ row }) {
  const { num, title, purpose, states, concepts } = row;

  return (
    <article
      id={row.id ? `phase1-${row.id}` : undefined}
      className="scroll-mt-[7rem] rounded-2xl border border-ink-200/80 bg-white/50 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start gap-3">
        {num ? <span className="font-mono text-[11px] font-medium text-ink-400">{num}</span> : null}
        <div className="min-w-0 flex-1">
          <h3 className="text-[clamp(1.05rem,2vw,1.25rem)] font-medium tracking-tight text-ink-950">
            {title}
          </h3>
          {purpose ? <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{purpose}</p> : null}
          {states?.length ? (
            <p className="mt-2 text-[11px] text-ink-500">Variants: {states.join(" · ")}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 -mx-2 overflow-x-auto px-2 pb-2">
        <div className="flex min-w-min items-start gap-8 md:gap-10">
          {concepts.map(({ id, title: conceptTitle, description, Screen, props = {} }) => (
            <div key={id} className="w-[300px] shrink-0">
              <DesignConceptCard title={conceptTitle} description={description}>
                <DesignAppScreen>
                  <ConceptScreen Screen={Screen} props={props} />
                </DesignAppScreen>
              </DesignConceptCard>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function DesignFlowRow({ row }) {
  const { title, purpose, concepts } = row;

  return (
    <article className="rounded-2xl border border-ink-200/80 bg-white/50 p-6 md:p-8">
      <div className="mb-8 max-w-2xl">
        <h3 className="text-[clamp(1.05rem,2vw,1.25rem)] font-medium tracking-tight text-ink-950">{title}</h3>
        {purpose ? <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{purpose}</p> : null}
      </div>

      <div className="-mx-2 overflow-x-auto px-2 pb-4">
        <div className="flex min-w-min items-start gap-4 md:gap-6">
          {concepts.map(({ id, title: conceptTitle, description, Screen, props = {} }, idx) => (
            <div key={id} className="flex shrink-0 items-start">
              <div className="w-[280px]">
                <p className="mb-3 text-[12px] font-semibold text-ink-900">{conceptTitle}</p>
                {description ? (
                  <p className="mb-4 text-[11px] leading-relaxed text-ink-500">{description}</p>
                ) : null}
                <DesignAppScreen>
                  <ConceptScreen Screen={Screen} props={props} />
                </DesignAppScreen>
              </div>
              {idx < concepts.length - 1 ? (
                <div className="hidden shrink-0 items-center self-center px-2 pt-16 md:flex" aria-hidden>
                  <div className="h-px w-5 bg-ink-300" />
                  <svg className="h-3 w-3 text-ink-400" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h7M7 3.5L9.5 6 7 8.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
