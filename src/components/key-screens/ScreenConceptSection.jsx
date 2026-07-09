import ConceptOptionsGrid from "./ConceptOptionsGrid.jsx";

export default function ScreenConceptSection({ screen }) {
  const options = screen.concepts.map((concept) => ({
    ...concept,
    wireframeKey:
      concept.wireframeKey ?? (concept.id === "a" ? screen.screenKey : null),
    placeholderNote:
      concept.placeholderNote ??
      (concept.id === "a" ? "Baseline from flows" : "Layout exploration slot"),
  }));

  return (
    <article
      id={`key-screen-${screen.id}`}
      className="scroll-mt-[7rem] border-b border-ink-200/50 py-12 last:border-b-0 md:py-14"
    >
      <h3 className="text-[17px] font-medium tracking-tight text-ink-950">{screen.title}</h3>
      <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-600">{screen.purpose}</p>
      <div className="mt-8">
        <ConceptOptionsGrid options={options} />
      </div>
    </article>
  );
}
