import { DesignAppScreen, DesignConceptCard } from "../DesignAppScreen.jsx";
import { DesignFlowRow, DesignScreenRow } from "../phase1/DesignScreenRow.jsx";

function ConceptScreen({ Screen, props }) {
  return <Screen {...props} />;
}

function PrdDesignSection({ section }) {
  const { id, label, title, description, layout } = section;

  return (
    <section id={section.sectionId ?? `prd-designs-${id}`} className="scroll-mt-[7rem]">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">{label}</p>
      <h3 className="mt-3 max-w-3xl text-[clamp(1.2rem,2.5vw,1.6rem)] font-medium leading-[1.15] tracking-tight text-ink-950">
        {title}
      </h3>
      {description ? (
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-600">{description}</p>
      ) : null}

      <div className="mt-12">
        {layout === "rows" ? (
          <div className="space-y-10">
            {section.rows.map((row) => (
              <DesignScreenRow key={row.id} row={row} />
            ))}
          </div>
        ) : null}

        {layout === "flow" ? (
          <DesignFlowRow
            row={{
              id: section.id,
              title: title,
              purpose: description,
              concepts: section.concepts,
            }}
          />
        ) : null}

        {layout === "grid" ? (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-14">
            {section.concepts.map(({ id, title: conceptTitle, description: conceptDesc, Screen, props = {} }) => (
              <DesignConceptCard key={id} title={conceptTitle} description={conceptDesc}>
                <DesignAppScreen>
                  <ConceptScreen Screen={Screen} props={props} />
                </DesignAppScreen>
              </DesignConceptCard>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function PrdDesignCatalogue({ catalogue }) {
  return (
    <div className="space-y-24 md:space-y-32">
      {catalogue.sections.map((section) => (
        <PrdDesignSection key={section.id} section={section} />
      ))}
    </div>
  );
}

export default function PrdDesignsGallery({ catalogues }) {
  return (
    <div className="space-y-28 md:space-y-36">
      {catalogues.map((catalogue) => (
        <div key={catalogue.id} id={catalogue.sectionId} className="scroll-mt-[7rem]">
          <div className="mb-16 max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent-clay">
              {catalogue.label}
            </p>
            <h2 className="mt-3 text-[clamp(1.35rem,3vw,2rem)] font-medium tracking-tight text-ink-950">
              {catalogue.label} designs
            </h2>
          </div>
          <PrdDesignCatalogue catalogue={catalogue} />
        </div>
      ))}
    </div>
  );
}
