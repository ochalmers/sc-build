import { DesignAppScreen, DesignConceptCard } from "../DesignAppScreen.jsx";
import { PHASE1_SECTIONS } from "../../content/phase1Designs.js";
import { DesignFlowRow, DesignScreenRow } from "./DesignScreenRow.jsx";

function ConceptScreen({ Screen, props }) {
  return <Screen {...props} />;
}

function Phase1Section({ section }) {
  const { id, label, title, description, layout } = section;

  return (
    <section id={`phase1-${id}`} className="scroll-mt-[7rem]">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">{label}</p>
      <h2 className="mt-3 max-w-3xl text-[clamp(1.35rem,3vw,1.75rem)] font-medium leading-[1.15] tracking-tight text-ink-950">
        {title}
      </h2>
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
              title: "Prototype journey",
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

export default function Phase1Gallery() {
  return (
    <div className="space-y-24 md:space-y-32">
      {PHASE1_SECTIONS.map((section) => (
        <Phase1Section key={section.id} section={section} />
      ))}
    </div>
  );
}
