import GtmHero from "./GtmHero.jsx";

export default function ConceptSection({ concept }) {
  const isLive = concept.build === "live";

  return (
    <section id={concept.id} className="scroll-mt-[7rem] border-b border-ink-200/60">
      <div className="border-b border-ink-200/60 bg-paper-100 px-6 py-8">
        <div className="max-w-content mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
            {concept.label}
            {isLive ? (
              <span className="ml-2 rounded-full bg-accent-indigo/10 px-2 py-0.5 text-[10px] text-accent-indigo">
                Built
              </span>
            ) : null}
          </p>
          <h2 className="mt-2 text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.15] tracking-tight text-ink-950">
            {concept.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">{concept.description}</p>
        </div>
      </div>

      <div className="bg-[#141414]">
        {isLive ? (
          <GtmHero glitch={concept.glitch} />
        ) : (
          <div className="relative aspect-[1440/800] min-h-[min(800px,90dvh)] w-full">
            <img
              src={concept.preview}
              alt={`${concept.title} — Figma reference`}
              className="h-full w-full object-cover object-top"
              decoding="async"
            />
          </div>
        )}
      </div>
    </section>
  );
}
