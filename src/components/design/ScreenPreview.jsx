import { resolveWireframe } from "../../wireframes/registry.js";
import { resolveScreen } from "../../designs/prd/screenRegistry.js";
import { DesignAppScreen } from "../../designs/DesignAppScreen.jsx";
import WireframePreviewFrame from "../flows/WireframePreviewFrame.jsx";
import PreviewPlaceholder from "./PreviewPlaceholder.jsx";

function WireframePreview({ screenKey, label }) {
  const resolved = screenKey ? resolveWireframe(screenKey) : null;
  const { Screen, props, frame = "mobile" } = resolved ?? { Screen: null, props: {}, frame: "mobile" };

  if (!Screen) {
    return <PreviewPlaceholder label={label ?? "Screen pending"} type="wireframe" />;
  }

  return (
    <WireframePreviewFrame
      frame={frame}
      className={frame === "desktop" ? "w-full" : "!max-w-[280px] w-full"}
      commentScopeKey={screenKey ? `screen:${screenKey}` : undefined}
    >
      <Screen {...props} />
    </WireframePreviewFrame>
  );
}

function HifiPreview({ screenKey, label }) {
  const resolved = screenKey ? resolveScreen(screenKey) : null;
  const { Screen, props } = resolved ?? { Screen: null, props: {} };

  if (!Screen) {
    return <PreviewPlaceholder label={label ?? "Hi-fi pending"} type="hifi" />;
  }

  return (
    <DesignAppScreen className="!max-w-[280px] w-full" variant="hifi">
      <Screen {...props} />
    </DesignAppScreen>
  );
}

export default function ScreenPreview({ screenKey, label, showHifi = true }) {
  return (
    <div className="flex flex-wrap gap-6">
      <div>
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">Wireframe</p>
        <WireframePreview screenKey={screenKey} label={label} />
      </div>
      {showHifi ? (
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">High fidelity</p>
          <HifiPreview screenKey={screenKey} label={label} />
        </div>
      ) : null}
    </div>
  );
}

export function WireframeOnly({ screenKey, label, compact = false }) {
  const resolved = screenKey ? resolveWireframe(screenKey) : null;
  const { Screen, props, frame = "mobile" } = resolved ?? { Screen: null, props: {}, frame: "mobile" };
  const isDesktop = frame === "desktop";

  if (!Screen) {
    return (
      <div className={compact && !isDesktop ? "scale-[0.92] origin-top" : ""}>
        <PreviewPlaceholder label={label ?? "Pending"} type="wireframe" />
      </div>
    );
  }

  return (
    <div className={compact && !isDesktop ? "scale-[0.92] origin-top" : ""}>
      <WireframePreviewFrame
        frame={frame}
        className={isDesktop ? "w-full" : compact ? "!max-w-[240px]" : "!max-w-[280px] w-full"}
        commentScopeKey={screenKey ? `screen:${screenKey}` : undefined}
      >
        <Screen {...props} />
      </WireframePreviewFrame>
    </div>
  );
}
