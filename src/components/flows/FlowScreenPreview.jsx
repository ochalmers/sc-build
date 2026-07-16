import { resolveWireframe } from "../../wireframes/registry.js";
import WireframePlaceholder from "./WireframePlaceholder.jsx";
import WireframePreviewFrame from "../WireframePreviewFrame.jsx";

export default function FlowScreenPreview({ screenKey, label }) {
  const resolved = screenKey ? resolveWireframe(screenKey) : null;
  const { Screen, props, frame = "mobile" } = resolved ?? { Screen: null, props: {}, frame: "mobile" };

  if (Screen) {
    return (
      <WireframePreviewFrame frame={frame} commentScopeKey={screenKey ? `screen:${screenKey}` : undefined}>
        <Screen {...props} />
      </WireframePreviewFrame>
    );
  }

  return <WireframePlaceholder label={label ?? "Screen pending"} />;
}
