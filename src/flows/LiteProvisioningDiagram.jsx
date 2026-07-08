import { PROVISIONING_LITE } from "../content/prdLite/index.js";

export function LiteProvisioningDiagram() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-[15px] leading-relaxed text-ink-600">{PROVISIONING_LITE.summary}</p>
      {PROVISIONING_LITE.subtitle ? (
        <p className="text-[13px] font-medium text-ink-700">{PROVISIONING_LITE.subtitle}</p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        {PROVISIONING_LITE.stages.map((stage, idx) => (
          <div key={stage.id} className="relative rounded-2xl border border-ink-200/80 bg-white/55 p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">
              Stage {String(idx + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-[15px] font-medium tracking-tight text-ink-950">{stage.label}</h3>
            <ul className="mt-4 space-y-2">
              {stage.items.map((item) => (
                <li key={item} className="text-[13px] leading-relaxed text-ink-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-ink-200 bg-paper-100/40 px-5 py-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Account states</p>
        <p className="mt-2 text-[13px] text-ink-600">{PROVISIONING_LITE.states.join(" · ")}</p>
      </div>
    </div>
  );
}
