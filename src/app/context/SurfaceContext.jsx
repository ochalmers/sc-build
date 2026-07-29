import { createContext, useContext, useMemo, useState, useCallback } from "react";

const SurfaceContext = createContext(null);

const SURFACE_KEY = "sonocea-review-surface";
const COMBINED_VIEW_KEY = "sonocea-combined-view";

const VALID_SURFACES = new Set(["listener", "admin", "combined", "anonymous"]);

function loadSurface() {
  try {
    const v = sessionStorage.getItem(SURFACE_KEY);
    if (VALID_SURFACES.has(v)) return v;
  } catch {
    /* ignore */
  }
  return "listener";
}

function loadCombinedView() {
  try {
    const v = sessionStorage.getItem(COMBINED_VIEW_KEY);
    if (v === "prototype" || v === "flow") return v;
  } catch {
    /* ignore */
  }
  return "prototype";
}

/** Combined-style surfaces (org Combined + Anonymous) share Prototype / Flow. */
export function isCombinedStyleSurface(surface) {
  return surface === "combined" || surface === "anonymous";
}

export function SurfaceProvider({ children }) {
  const [surface, setSurfaceState] = useState(loadSurface);
  const [combinedView, setCombinedViewState] = useState(loadCombinedView);

  const setSurface = useCallback((next) => {
    setSurfaceState(next);
    try {
      sessionStorage.setItem(SURFACE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const setCombinedView = useCallback((next) => {
    setCombinedViewState(next);
    try {
      sessionStorage.setItem(COMBINED_VIEW_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ surface, setSurface, combinedView, setCombinedView }),
    [surface, setSurface, combinedView, setCombinedView],
  );

  return <SurfaceContext.Provider value={value}>{children}</SurfaceContext.Provider>;
}

export function useReviewSurface() {
  const ctx = useContext(SurfaceContext);
  if (!ctx) {
    return {
      surface: "listener",
      setSurface: () => {},
      combinedView: "prototype",
      setCombinedView: () => {},
    };
  }
  return ctx;
}
