import { useMemo } from "react";
import { behaviourModeMeta } from "../modes.js";
import { resolvePalette } from "../../utils/resolvePalette.js";

/** Applies resolved CSS variables for one behavioural mode (default sliders). */
export function ModeChrome({ mode = "regulation", className = "", children }) {
  const resolved = useMemo(
    () => resolvePalette(mode, behaviourModeMeta[mode].defaultSliders),
    [mode],
  );
  return (
    <div style={resolved.cssVars} className={className}>
      {children}
    </div>
  );
}

export function useResolvedMode(mode) {
  return useMemo(
    () => resolvePalette(mode, behaviourModeMeta[mode].defaultSliders),
    [mode],
  );
}
