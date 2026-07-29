import { isCombinedStyleSurface, useReviewSurface } from "../context/SurfaceContext.jsx";

const VIEWS = [
  { id: "prototype", label: "Prototype" },
  { id: "flow", label: "Flow" },
];

/** Prototype vs continuous left-to-right flow - Combined (org) and Anonymous. */
export function CombinedViewSwitcher() {
  const { surface, combinedView, setCombinedView } = useReviewSurface();

  if (!isCombinedStyleSurface(surface)) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
      role="tablist"
      aria-label="Combined view"
    >
      {VIEWS.map((view) => {
        const isActive = combinedView === view.id;
        return (
          <button
            key={view.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setCombinedView(view.id)}
            className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
              isActive
                ? "bg-white/15 text-white"
                : "text-white/55 hover:bg-white/[0.08] hover:text-white/85"
            }`}
          >
            {view.label}
          </button>
        );
      })}
    </div>
  );
}
