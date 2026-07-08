import { BRAND_PERSONAS } from "../content/personas.js";

function PersonaField({ label, children }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">{label}</p>
      <div className="mt-2 text-[13px] leading-relaxed text-ink-700">{children}</div>
    </div>
  );
}

function PersonaList({ items }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-ink-400" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PersonaCard({ persona }) {
  const {
    num,
    title,
    image,
    profile,
    ageRange,
    examples,
    context,
    productNeeds,
    brandInterpretation,
    designImplications,
  } = persona;

  return (
    <article className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white/55">
      <div className="grid lg:grid-cols-[1fr_minmax(280px,42%)]">
        <div className="p-6 md:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
            Persona {num}
          </p>
          <h3 className="mt-2 text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-tight text-ink-950">
            {title}
          </h3>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <PersonaField label="Profile">{profile}</PersonaField>
            <PersonaField label="Age range">{ageRange}</PersonaField>
            <PersonaField label="Examples">
              <PersonaList items={examples} />
            </PersonaField>
            <PersonaField label="Context">
              <PersonaList items={context} />
            </PersonaField>
            <PersonaField label="Product needs">
              <PersonaList items={productNeeds} />
            </PersonaField>
            <PersonaField label="Brand interpretation">
              <p>{brandInterpretation.join(" · ")}</p>
            </PersonaField>
          </div>

          <div className="mt-6 rounded-xl border border-ink-200/70 bg-paper-100/60 p-4">
            <PersonaField label="Design implications">
              <PersonaList items={designImplications} />
            </PersonaField>
          </div>
        </div>

        <div className="border-t border-ink-200/60 bg-paper-100/40 lg:border-l lg:border-t-0">
          <img
            src={image}
            alt={`${title} — brand persona slide`}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}

export default function PersonasOverviewSection() {
  return (
    <div className="space-y-8">
      {BRAND_PERSONAS.map((persona) => (
        <PersonaCard key={persona.id} persona={persona} />
      ))}
    </div>
  );
}
