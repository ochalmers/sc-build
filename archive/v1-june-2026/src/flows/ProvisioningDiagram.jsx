import { PROVISIONING_CHAIN } from "../content/prdFlows.js";

export function ProvisioningDiagram() {
  return (
    <div className="space-y-10">
      <p className="max-w-2xl text-[15px] leading-relaxed text-ink-600">{PROVISIONING_CHAIN.summary}</p>

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        {PROVISIONING_CHAIN.stages.map((stage, idx) => (
          <div key={stage.id} className="relative">
            {idx < PROVISIONING_CHAIN.stages.length - 1 ? (
              <div
                className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden h-px w-6 bg-ink-300 lg:block"
                aria-hidden
              />
            ) : null}
            <div className="h-full rounded-2xl border border-ink-200/80 bg-gradient-to-b from-white/80 to-paper-100/50 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">
                Stage {idx + 1}
              </p>
              <h3 className="mt-3 text-[17px] font-medium tracking-tight text-ink-950">{stage.label}</h3>
              <ul className="mt-5 space-y-2.5">
                {stage.items.map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] leading-snug text-ink-700">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-ink-200/70 bg-white/40 px-5 py-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Lifecycle states</p>
        <p className="mt-3 flex flex-wrap gap-3 font-mono text-[11px] text-ink-600">
          {PROVISIONING_CHAIN.states.map((state) => (
            <span key={state} className="rounded-md border border-ink-200/80 bg-paper-100 px-2.5 py-1">
              {state}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
