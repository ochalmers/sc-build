import { WireframeById, WIREFRAME_REGISTRY } from "./wireframes/WireframeScreens.jsx";

function PlaceholderFrame({ label, note, variant }) {
  const isWeb = variant === "web";
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex shrink-0 items-center justify-center rounded-[2rem] border-2 border-dashed border-ink-200 bg-paper-100/80 text-center ${
          isWeb ? "w-[300px] min-h-[220px] rounded-xl" : "w-[260px]"
        }`}
        style={isWeb ? undefined : { aspectRatio: "390 / 844" }}
      >
        <div className="px-4">
          <p className="text-[11px] font-semibold text-ink-600">{label}</p>
          {note ? <p className="mt-1 text-[10px] leading-relaxed text-ink-400">{note}</p> : null}
        </div>
      </div>
      <p className="mt-3 max-w-[260px] text-center text-[11px] font-medium text-ink-500">{label}</p>
    </div>
  );
}

function VariantSlot({ variant }) {
  const entry = variant.wireframeId ? WIREFRAME_REGISTRY[variant.wireframeId] : null;

  if (variant.wireframeId && entry) {
    return (
      <div className="flex flex-col items-center">
        <WireframeById wireframeId={variant.wireframeId} />
        <p className="mt-1 text-center text-[10px] font-medium uppercase tracking-[0.1em] text-ink-400">
          {variant.label}
        </p>
      </div>
    );
  }

  return (
    <PlaceholderFrame
      label={variant.label}
      note={variant.placeholder ?? "Pending"}
      variant={entry?.variant}
    />
  );
}

export function KeyScreenCard({ screen }) {
  return (
    <article
      id={`key-screen-${screen.id}`}
      className="scroll-mt-[7rem] rounded-2xl border border-ink-200/80 bg-white/50 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start gap-3">
        {screen.num ? (
          <span className="font-mono text-[11px] font-medium text-ink-400">{screen.num}</span>
        ) : null}
        <div className="min-w-0 flex-1">
          <h3 className="text-[clamp(1.05rem,2vw,1.25rem)] font-medium tracking-tight text-ink-950">
            {screen.title}
          </h3>
          {screen.purpose ? (
            <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{screen.purpose}</p>
          ) : null}
          {screen.states?.length ? (
            <p className="mt-2 text-[11px] text-ink-500">
              States: {screen.states.join(" · ")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 -mx-2 overflow-x-auto px-2 pb-2">
        <div className="flex min-w-min items-start justify-start gap-6 md:gap-10">
          {screen.variants.map((variant) => (
            <div key={variant.label} className="shrink-0">
              <VariantSlot variant={variant} />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
