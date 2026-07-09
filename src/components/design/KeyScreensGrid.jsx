import { SCREEN_CATALOGUE } from "../../content/design.js";
import { WireframeOnly } from "./ScreenPreview.jsx";

export default function KeyScreensGrid() {
  const allScreens = SCREEN_CATALOGUE.flatMap((group) =>
    group.screens.map((scr) => ({ ...scr, groupLabel: group.label })),
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-ink-950/10 bg-ink-950/[0.03] px-5 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-600">Key Screens Overview</p>
        <p className="mt-1 max-w-3xl text-[13px] leading-relaxed text-ink-700">
          {allScreens.length} screens across {SCREEN_CATALOGUE.length} flow groups — each with a low-fidelity wireframe.
          Expand any screen below for full specs, hi-fi preview, and implementation notes.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allScreens.map((scr) => (
          <article
            key={scr.id}
            className="flex flex-col rounded-2xl border border-ink-200/80 bg-white/55 p-4 transition-shadow hover:shadow-[0_8px_30px_rgba(8,8,8,0.06)]"
          >
            <div className="mb-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-ink-400">{scr.groupLabel}</p>
              <h3 className="mt-0.5 text-[14px] font-medium tracking-tight text-ink-950">{scr.title}</h3>
            </div>
            <div className="flex flex-1 items-start justify-center">
              <WireframeOnly screenKey={scr.screenKey} label={scr.title} compact />
            </div>
            <p className="mt-3 line-clamp-2 text-[11px] leading-relaxed text-ink-500">{scr.purpose}</p>
            <a
              href={`#screen-${scr.id}`}
              className="mt-3 text-[11px] font-medium text-ink-700 underline-offset-4 hover:underline"
            >
              View specs →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
