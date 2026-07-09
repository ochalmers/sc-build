import { resolveWireframe } from "../../wireframes/registry.js";
import WireframePreviewFrame from "../flows/WireframePreviewFrame.jsx";

function ConceptPlaceholder({ label, note, desktop = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-paper-100/80 p-4 text-center ${
        desktop ? "h-[220px] w-[300px]" : ""
      }`}
      style={desktop ? undefined : { aspectRatio: "390 / 844", width: "240px" }}
    >
      <p className="text-[10px] font-semibold text-ink-600">{label}</p>
      <p className="mt-1 text-[9px] leading-relaxed text-ink-400">{note}</p>
    </div>
  );
}

function ConceptWireframe({ wireframeKey, fallbackTitle, placeholderNote }) {
  const resolved = wireframeKey ? resolveWireframe(wireframeKey) : null;
  const { Screen, props, frame = "mobile" } = resolved ?? { Screen: null, props: {}, frame: "mobile" };
  const isDesktop = frame === "desktop";

  if (!Screen) {
    return (
      <ConceptPlaceholder
        label={fallbackTitle}
        note={placeholderNote ?? "Wireframe exploration slot"}
        desktop={isDesktop}
      />
    );
  }

  return (
    <div className={`mx-auto origin-top ${isDesktop ? "w-[300px]" : "scale-[0.8]"}`}>
      <WireframePreviewFrame frame={frame} className={isDesktop ? "w-full" : "!max-w-[240px]"}>
        <Screen {...props} />
      </WireframePreviewFrame>
    </div>
  );
}

export default function ConceptOptionCard({ option }) {
  return (
    <article className="flex w-[280px] shrink-0 flex-col rounded-2xl border border-ink-200/70 bg-white/60 p-5">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[11px] font-medium text-ink-400">{option.letter}</span>
        <h3 className="text-[14px] font-medium tracking-tight text-ink-950">{option.name}</h3>
      </div>
      {option.tagline ? (
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-ink-500">
          {option.tagline}
        </p>
      ) : null}
      <p className="mt-3 text-[12px] leading-relaxed text-ink-600">{option.idea}</p>

      <div className="mt-6 flex justify-center">
        <ConceptWireframe
          wireframeKey={option.wireframeKey}
          fallbackTitle={option.name}
          placeholderNote={option.placeholderNote}
        />
      </div>

      <dl className="mt-5 space-y-3 border-t border-ink-200/60 pt-4 text-[11px]">
        <div>
          <dt className="font-medium text-ink-500">Best for</dt>
          <dd className="mt-0.5 leading-relaxed text-ink-700">{option.best}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink-500">Watch out</dt>
          <dd className="mt-0.5 leading-relaxed text-ink-700">{option.watchout}</dd>
        </div>
      </dl>
    </article>
  );
}
