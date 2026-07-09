import { resolveWireframe } from "../../../wireframes/registry.js";
import WireframePlaceholder from "../WireframePlaceholder.jsx";
import WireframePreviewFrame, { getPreviewWidthForFrame } from "../WireframePreviewFrame.jsx";

export default function WireframeScreenPreview({ screenKey, label }) {
  const resolved = screenKey ? resolveWireframe(screenKey) : null;
  const { Screen, props, frame = "mobile" } = resolved ?? { Screen: null, props: {}, frame: "mobile" };

  if (Screen) {
    const isDesktop = frame === "desktop";

    return (
      <div className="group relative w-full" style={{ maxWidth: getPreviewWidthForFrame(frame) }}>
        <div
          className="pointer-events-none absolute -inset-3 rounded-[2rem] border border-dashed border-ink-200/50 bg-paper-100/40 opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
        <div
          className={`relative overflow-hidden bg-white shadow-[0_8px_32px_rgba(18,18,18,0.06)] ${
            isDesktop
              ? "rounded-xl border-2 border-ink-200/70"
              : "rounded-[1.75rem] border-2 border-ink-200/70"
          }`}
        >
          <WireframePreviewFrame frame={frame} className="!rounded-none !border-0 !shadow-none">
            <Screen {...props} />
          </WireframePreviewFrame>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ maxWidth: getPreviewWidthForFrame(frame) }}>
      <WireframePlaceholder label={label ?? "Screen"} />
    </div>
  );
}
