import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { LiveAppPreview, resolveLiveRoute } from "../components/LiveAppPreview.jsx";

/**
 * Full-size live screen host for Figma html-to-design captures.
 * Usage: /app/capture?path=/app/listener/home
 */
export function FigmaCaptureScreen() {
  const [params] = useSearchParams();
  const path = params.get("path") || "/app/listener/home";
  const seedMode = params.get("seed") === "anonymous" ? "anonymous" : "org";
  const resolved = useMemo(() => resolveLiveRoute(path), [path]);
  const frame = resolved?.frame === "desktop" ? "desktop" : "mobile";

  if (!resolved) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111] text-white/50">
        No live preview for {path}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111] p-8">
      <div data-figma-capture>
        <LiveAppPreview path={path} frame={frame} scale={1} seedMode={seedMode} />
      </div>
    </div>
  );
}
