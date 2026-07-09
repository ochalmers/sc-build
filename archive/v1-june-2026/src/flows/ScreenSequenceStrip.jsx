import { LISTENER_SCREEN_SEQUENCE } from "../content/prdFlows.js";
import { WireframeById } from "./wireframes/WireframeScreens.jsx";

export function ScreenSequenceStrip() {
  return (
    <div className="rounded-2xl border border-ink-200/80 bg-paper-100/50 p-6 md:p-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
        PRD screen map · 11 areas
      </p>
      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-600">
        Canonical mobile IA from the PRD — scroll horizontally to see each wireframe in sequence.
        Individual flows below branch from these screens.
      </p>
      <div className="mt-8 -mx-2 overflow-x-auto px-2 pb-2">
        <div className="flex min-w-min gap-6">
          {LISTENER_SCREEN_SEQUENCE.map((screen) => (
            <div key={screen.wireframeId} className="flex w-[280px] shrink-0 flex-col">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-[10px] text-ink-400">{screen.prd}</span>
                <span className="text-[12px] font-semibold text-ink-800">{screen.label}</span>
              </div>
              <WireframeById wireframeId={screen.wireframeId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
