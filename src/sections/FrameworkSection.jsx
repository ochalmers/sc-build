import { PERSONA_IDS, adoptionContexts, personas } from "../config/personas.js";
import { BEHAVIOUR_MODES, behaviourModeMeta } from "../system/modes.js";
import { usePrototype } from "../context/PrototypeContext.jsx";

export default function FrameworkSection() {
  const { personaId } = usePrototype();

  return (
    <section
      id="framework"
      className="border-t border-ink-200/70 bg-paper-50"
    >
      <div className="max-w-content mx-auto px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
            System framework
          </h2>
          <p className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-ink-950">
            Personas define context. States define behaviour.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-500">
              Refined personas
            </h3>
            <ul className="mt-4 space-y-3">
              {PERSONA_IDS.map((id) => {
                const p = personas[id];
                const active = personaId === id;
                return (
                  <li
                    key={id}
                    className="rounded-xl border px-4 py-3 transition-colors"
                    style={{
                      borderColor: active ? "rgba(23,23,22,.35)" : "rgba(23,23,22,.12)",
                      background: active ? "rgba(255,255,255,.75)" : "transparent",
                    }}
                  >
                    <p className="text-[14px] font-medium text-ink-950">{p.label}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-ink-600">{p.note}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-500">
              Adoption context
            </h3>
            <ul className="mt-4 space-y-2">
              {adoptionContexts.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between rounded-lg border border-ink-200/80 px-3 py-2.5 text-[13px] text-ink-700"
                >
                  <span>{c.label}</span>
                  <span className="text-ink-400" aria-hidden>
                    ·
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-ink-200/80 bg-white/70 p-6 md:p-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-500">
            Flow
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1.1fr_auto_1fr] md:items-center">
            <div className="rounded-xl border border-ink-200/80 bg-paper-100/80 p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-ink-500">Inputs</p>
              <p className="mt-2 text-[15px] font-medium text-ink-950">Personas</p>
              <p className="mt-1 text-[12px] text-ink-600">Context, expectations, constraints</p>
            </div>
            <div className="hidden text-center text-ink-400 md:block" aria-hidden>
              →
            </div>
            <div className="rounded-xl border border-ink-200/80 bg-white p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-ink-500">System</p>
              <p className="mt-2 text-[15px] font-medium text-ink-950">Behaviour model</p>
              <p className="mt-1 text-[12px] text-ink-600">Shared structure, adaptive controls</p>
            </div>
            <div className="hidden text-center text-ink-400 md:block" aria-hidden>
              →
            </div>
            <div className="rounded-xl border border-ink-200/80 bg-paper-100/80 p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-ink-500">Outputs</p>
              <p className="mt-2 text-[15px] font-medium text-ink-950">Behavioural modes</p>
              <p className="mt-1 text-[12px] text-ink-600">How the system presents and paces itself</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {BEHAVIOUR_MODES.map((id) => {
            const m = behaviourModeMeta[id];
            return (
              <div
                key={id}
                className="rounded-xl border border-ink-200/70 bg-white/70 p-5"
              >
                <p className="text-[15px] font-medium text-ink-950">{m.label}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-600">{m.definition}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
