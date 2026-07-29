import { useEffect, useState } from "react";
import { LISTENER_FRAME } from "./ListenerFrame.jsx";
import { DESKTOP_PREVIEW, LazyLiveAppPreview, resolveLiveRoute } from "./LiveAppPreview.jsx";

/** Flatten Combined rail sections into a single ordered step list. */
export function flattenCombinedFlowSteps(sections = []) {
  const items = [];
  for (const section of sections) {
    if (!section.appPath && !section.appSteps?.length) continue;
    const steps =
      section.appSteps?.length > 0
        ? section.appSteps
        : [{ label: section.title, path: section.appPath }];

    steps.forEach((step, index) => {
      if (!step.path) return;
      const resolved = resolveLiveRoute(step.path);
      const isAdmin = step.path.startsWith("/app/admin");
      items.push({
        id: `${section.id}-${index}-${step.path}`,
        sectionId: section.id,
        sectionNumber: section.number,
        sectionTitle: section.title,
        label: step.label,
        path: step.path,
        frame: resolved?.frame ?? (isAdmin ? "desktop" : "mobile"),
        stepIndex: index,
        isSectionStart: index === 0,
      });
    });
  }
  return items;
}

/**
 * Size flow previews to fill the viewport height (minus header / title chrome)
 * so the board doesn't sit in a band of empty space.
 */
function useFlowPreviewScales() {
  const [scales, setScales] = useState(() => computeFlowScales());

  useEffect(() => {
    function onResize() {
      setScales(computeFlowScales());
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return scales;
}

function computeFlowScales() {
  if (typeof window === "undefined") {
    return { desktop: 0.72, mobile: 0.82 };
  }

  // AppShell sticky header ≈ 3.5rem, board padding + title + step label + path + gaps.
  const reservedChrome = 268;
  const available = Math.max(360, window.innerHeight - reservedChrome);

  // Target the same on-screen height for phone and desktop so the row feels even.
  const desktop = clamp(available / DESKTOP_PREVIEW.height, 0.58, 0.96);
  const mobile = clamp(available / LISTENER_FRAME.height, 0.58, 0.96);

  return { desktop, mobile };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function FlowArrow({ tall }) {
  return (
    <div
      className={`flex shrink-0 items-center self-center px-2 ${tall ? "pt-16" : "pt-10"}`}
      aria-hidden
    >
      <div className="h-px w-6 bg-white/15" />
      <svg className="h-3.5 w-3.5 text-white/30" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6h7M7 3.5 9.5 6 7 8.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function StepCard({ step, index, active, onOpen, seedMode = "org", scales }) {
  const scale = step.frame === "desktop" ? scales.desktop : scales.mobile;
  const intrinsic = step.frame === "desktop" ? DESKTOP_PREVIEW : LISTENER_FRAME;
  const displayW = intrinsic.width * scale;

  return (
    <button
      type="button"
      onClick={() => onOpen(step.path)}
      className="group flex w-auto shrink-0 flex-col items-start text-left outline-none"
      aria-current={active ? "step" : undefined}
    >
      <div
        className="mb-3 flex min-h-[2.75rem] w-full items-start gap-2"
        style={{ maxWidth: displayW }}
      >
        <span className="mt-0.5 font-mono text-[10px] text-white/30">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          {step.isSectionStart ? (
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/35">
              {step.sectionNumber} · {step.sectionTitle}
            </p>
          ) : (
            <p className="text-[10px] text-white/20">{step.sectionTitle}</p>
          )}
          <p
            className={`mt-0.5 text-[13px] font-medium tracking-tight ${
              active ? "text-white" : "text-white/75 group-hover:text-white"
            }`}
          >
            {step.label}
          </p>
        </div>
      </div>

      <LazyLiveAppPreview
        path={step.path}
        frame={step.frame}
        scale={scale}
        active={active}
        seedMode={seedMode}
      />

      <p
        className="mt-2 truncate font-mono text-[9px] text-white/25"
        style={{ maxWidth: displayW }}
      >
        {step.path}
      </p>
    </button>
  );
}

/**
 * Continuous left-to-right Combined flow - every app step as a live screen preview.
 * Click a frame to open it in Prototype view.
 */
export function CombinedFlowBoard({
  sections,
  pathname,
  search = "",
  onOpenStep,
  title = "Admin provisioning → Listener journey",
  subtitle = "Live screens in one left-to-right board. Select a frame to open it in the interactive prototype.",
  seedMode = "org",
}) {
  const steps = flattenCombinedFlowSteps(sections);
  const scales = useFlowPreviewScales();
  const normalisedSearch = (search || "").replace(/^\?/, "");
  const currentPath =
    normalisedSearch.length > 0 ? `${pathname}?${normalisedSearch}` : pathname;

  function isActive(stepPath) {
    if (stepPath === currentPath) return true;
    if (!stepPath.includes("?")) {
      return stepPath === pathname && !normalisedSearch;
    }
    const [path, query] = stepPath.split("?");
    if (path !== pathname) return false;
    const want = new URLSearchParams(query);
    const have = new URLSearchParams(normalisedSearch);
    for (const [key, value] of want.entries()) {
      if (have.get(key) !== value) return false;
    }
    return true;
  }

  const adminCount = steps.filter((s) => s.frame === "desktop").length;
  const listenerCount = steps.length - adminCount;

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
            Continuous flow
          </p>
          <h2 className="mt-1 text-[1.35rem] font-medium tracking-tight text-white">{title}</h2>
          <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-white/45">{subtitle}</p>
        </div>
        <p className="font-mono text-[11px] text-white/30">
          {steps.length} steps · {adminCount} admin · {listenerCount} listener
        </p>
      </div>

      <div className="-mx-4 min-h-0 flex-1 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
        <div className="flex min-w-min items-start gap-1">
          {steps.map((step, index) => (
            <div key={step.id} className="flex shrink-0 items-start">
              <StepCard
                step={step}
                index={index}
                active={isActive(step.path)}
                onOpen={onOpenStep}
                seedMode={seedMode}
                scales={scales}
              />
              {index < steps.length - 1 ? (
                <FlowArrow tall={step.frame === "mobile"} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
