import { DesignAppScreen } from "../../designs/DesignAppScreen.jsx";

/** Fixed width for mobile wireframe previews — keeps storyboards and flow strips aligned. */
export const WIREFRAME_PREVIEW_WIDTH = "280px";

/** Fixed width for desktop / web console wireframes. */
export const DESKTOP_WIREFRAME_PREVIEW_WIDTH = "520px";

export function getPreviewWidthForFrame(frame = "mobile") {
  return frame === "desktop" ? DESKTOP_WIREFRAME_PREVIEW_WIDTH : WIREFRAME_PREVIEW_WIDTH;
}

export default function WireframePreviewFrame({ children, frame = "mobile", className = "" }) {
  if (frame === "desktop") {
    return (
      <div
        className={`w-full overflow-hidden rounded-xl border-2 border-ink-200/70 bg-white shadow-[0_8px_32px_rgba(18,18,18,0.06)] ${className}`}
        style={{ maxWidth: DESKTOP_WIREFRAME_PREVIEW_WIDTH, aspectRatio: "16 / 10" }}
      >
        {children}
      </div>
    );
  }

  return (
    <DesignAppScreen className={`!w-[280px] shrink-0 ${className}`} variant="wireframe">
      {children}
    </DesignAppScreen>
  );
}
