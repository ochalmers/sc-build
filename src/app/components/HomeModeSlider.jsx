import { useEffect, useRef, useState } from "react";

/** Soft grayscale washes so each home mode reads as a distinct setting.
 *  `listWash` starts transparent and fades into `list` so it can overlap the
 *  hero and erase the section seam.
 */
/** Extra hero height past the first window so the wash-out only begins on scroll.
 *  `cqh` = % of the phone panel (scrollport), not the desktop browser. */
export const HOME_HERO_FADE_EXTRA = "32cqh";

export const HOME_MODE_TONES = {
  calm: {
    light: {
      // Fixed backdrop — stays dark across the viewport (no wash-out).
      stage: "#1a1a1a",
      // Scrolling hero — hold dark through the first screen, fade only in the extra zone.
      page: "linear-gradient(180deg, #1a1a1a 0%, #222222 72%, #5a5a5a 86%, #c8c8c8 94%, #e8e8e8 100%)",
      list: "#ececec",
      listWash: "linear-gradient(180deg, rgba(232,232,232,0) 0%, #ececec 7rem, #ececec 100%)",
      ink: "#f5f5f5",
      muted: "rgba(255,255,255,0.55)",
      listInk: "#171717",
      listMuted: "rgba(23,23,23,0.5)",
      playRing: "rgba(255,255,255,0.95)",
      playFill: "rgba(255,255,255,0.12)",
    },
    dark: {
      stage: "#050505",
      page: "linear-gradient(180deg, #050505 0%, #121212 72%, #2a2a2a 88%, #4a4a4a 100%)",
      list: "#1c1c1c",
      listWash: "linear-gradient(180deg, rgba(28,28,28,0) 0%, #1c1c1c 7rem, #1c1c1c 100%)",
      ink: "#f5f5f5",
      muted: "rgba(255,255,255,0.5)",
      listInk: "#f2f2f2",
      listMuted: "rgba(242,242,242,0.5)",
      playRing: "rgba(255,255,255,0.95)",
      playFill: "rgba(255,255,255,0.1)",
    },
  },
  focus: {
    light: {
      stage: "#4a4a4a",
      page: "linear-gradient(180deg, #4a4a4a 0%, #5a5a5a 72%, #a8a8a8 86%, #ececec 94%, #f4f4f4 100%)",
      list: "#f0f0f0",
      listWash: "linear-gradient(180deg, rgba(240,240,240,0) 0%, #f0f0f0 7rem, #f0f0f0 100%)",
      ink: "#111111",
      muted: "rgba(17,17,17,0.5)",
      listInk: "#171717",
      listMuted: "rgba(23,23,23,0.5)",
      playRing: "rgba(17,17,17,0.9)",
      playFill: "rgba(255,255,255,0.55)",
    },
    dark: {
      stage: "#1a1a1a",
      page: "linear-gradient(180deg, #1a1a1a 0%, #2e2e2e 72%, #6a6a6a 88%, #8a8a8a 100%)",
      list: "#222222",
      listWash: "linear-gradient(180deg, rgba(34,34,34,0) 0%, #222222 7rem, #222222 100%)",
      ink: "#f7f7f7",
      muted: "rgba(255,255,255,0.55)",
      listInk: "#f2f2f2",
      listMuted: "rgba(242,242,242,0.5)",
      playRing: "rgba(255,255,255,0.95)",
      playFill: "rgba(255,255,255,0.14)",
    },
  },
  restore: {
    light: {
      stage: "#0d0d0d",
      page: "linear-gradient(180deg, #0d0d0d 0%, #161616 72%, #4a4a4a 86%, #a8a8a8 94%, #c8c8c8 100%)",
      list: "#e6e6e6",
      listWash: "linear-gradient(180deg, rgba(230,230,230,0) 0%, #e6e6e6 7rem, #e6e6e6 100%)",
      ink: "#f5f5f5",
      muted: "rgba(255,255,255,0.55)",
      listInk: "#171717",
      listMuted: "rgba(23,23,23,0.5)",
      playRing: "rgba(255,255,255,0.95)",
      playFill: "rgba(255,255,255,0.12)",
    },
    dark: {
      stage: "#000000",
      page: "linear-gradient(180deg, #000000 0%, #0c0c0c 72%, #1f1f1f 88%, #4a4a4a 100%)",
      list: "#1a1a1a",
      listWash: "linear-gradient(180deg, rgba(26,26,26,0) 0%, #1a1a1a 7rem, #1a1a1a 100%)",
      ink: "#f5f5f5",
      muted: "rgba(255,255,255,0.5)",
      listInk: "#f2f2f2",
      listMuted: "rgba(242,242,242,0.5)",
      playRing: "rgba(255,255,255,0.95)",
      playFill: "rgba(255,255,255,0.1)",
    },
  },
};

export function homeModeTone(mode, isDark) {
  const key = mode?.tone || "calm";
  const pack = HOME_MODE_TONES[key] || HOME_MODE_TONES.calm;
  return isDark ? pack.dark : pack.light;
}

/** Prototype atmosphere loops — one distinct clip per home mode tone. */
export const HOME_HERO_VIDEOS = {
  calm: `${import.meta.env.BASE_URL}assets/system/atmospheres/home/rest.mp4`,
  focus: `${import.meta.env.BASE_URL}assets/system/atmospheres/home/focus.mp4`,
  restore: `${import.meta.env.BASE_URL}assets/system/atmospheres/home/restore.mp4`,
};

/** Slow-motion factor for hero atmosphere loops (~quarter speed). */
const HOME_HERO_PLAYBACK_RATE = 0.25;

/**
 * Blurred grayscale video wash behind a home hero.
 * Only the active panel plays; inactive panels stay paused.
 */
export function HomeHeroVideo({
  toneKey = "calm",
  active = true,
  className = "",
}) {
  const videoRef = useRef(null);
  const src = HOME_HERO_VIDEOS[toneKey] || HOME_HERO_VIDEOS.calm;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;
    el.muted = true;
    el.defaultPlaybackRate = HOME_HERO_PLAYBACK_RATE;
    el.playbackRate = HOME_HERO_PLAYBACK_RATE;
    if (active) {
      const play = el.play();
      if (play?.catch) play.catch(() => {});
    } else {
      el.pause();
    }
    return undefined;
  }, [active, src]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <video
        ref={videoRef}
        key={src}
        className="absolute left-1/2 top-1/2 h-[145%] w-[145%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{
          filter: "grayscale(0.85) blur(28px) brightness(0.9) contrast(1.06)",
        }}
        src={src}
        muted
        loop
        playsInline
        preload={active ? "auto" : "metadata"}
        tabIndex={-1}
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = HOME_HERO_PLAYBACK_RATE;
        }}
        onRateChange={(e) => {
          // Some browsers reset rate on play/loop — keep it slow.
          if (e.currentTarget.playbackRate !== HOME_HERO_PLAYBACK_RATE) {
            e.currentTarget.playbackRate = HOME_HERO_PLAYBACK_RATE;
          }
        }}
      />
    </div>
  );
}

/**
 * Equal-width mode pills, centered (not stretched to the frame edge).
 * variant "frost" — light home chrome (dark glyphs); "solid" — library on flat surfaces.
 */
export function HomeModePills({
  modes,
  activeId,
  onChange,
  opacity = 1,
  variant = "frost",
  className = "",
}) {
  const faded = opacity < 0.05;
  const solid = variant === "solid";
  return (
    <div
      className={`flex items-center justify-center gap-2 transition-opacity duration-75 ${
        solid ? "px-0 py-0" : "px-4 pb-1.5 pt-3"
      } ${className}`}
      style={{
        opacity,
        pointerEvents: faded ? "none" : "auto",
      }}
      role="tablist"
      aria-label="Listening modes"
      aria-hidden={faded}
    >
      {modes.map((mode) => {
        const active = mode.id === activeId;
        const activeStyle = solid
          ? {
              border: "1.5px solid #111111",
              color: "#111111",
              background: "rgba(17,17,17,0.06)",
            }
          : {
              border: "1.5px solid #111111",
              color: "#111111",
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            };
        const idleStyle = solid
          ? {
              border: "1.5px solid rgba(0,0,0,0.16)",
              color: "rgba(0,0,0,0.38)",
              background: "transparent",
            }
          : {
              border: "1.5px solid rgba(17,17,17,0.28)",
              color: "rgba(17,17,17,0.42)",
              background: "rgba(255,255,255,0.28)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            };
        return (
          <button
            key={mode.id}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={faded ? -1 : undefined}
            className="w-[6.75rem] shrink-0 rounded-full px-3 py-2 text-center text-[11px] font-medium tracking-[0.04em] transition-colors duration-200"
            style={active ? activeStyle : idleStyle}
            onClick={() => onChange?.(mode.id)}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}

/** Pill-select content fade (bg morphs slower underneath). */
export const HOME_MODE_CONTENT_FADE_MS = 260;
export const HOME_MODE_BG_FADE_MS = 900;

/**
 * Full-bleed mode wash. Gradients can't interpolate, so we crossfade two layers.
 */
export function HomeStageWash({ page, durationMs = HOME_MODE_BG_FADE_MS, className = "" }) {
  const frontRef = useRef(page);
  const [layers, setLayers] = useState({ back: page, front: page, frontOpacity: 1 });

  useEffect(() => {
    if (page === frontRef.current) return undefined;
    const previous = frontRef.current;
    frontRef.current = page;
    setLayers({ back: previous, front: page, frontOpacity: 0 });
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setLayers((prev) => ({ ...prev, frontOpacity: 1 }));
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [page]);

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <div className="absolute inset-0" style={{ background: layers.back }} />
      <div
        className="absolute inset-0"
        style={{
          background: layers.front,
          opacity: layers.frontOpacity,
          transition: `opacity ${durationMs}ms ease`,
        }}
      />
    </div>
  );
}

/**
 * Horizontal pager between modes. Each panel scrolls vertically:
 * taller-than-viewport hero (fade begins after 100%), then more tracks below.
 * Pointer drag / swipe still slides; pill taps jump instantly (parent fades).
 */
export function HomeModePager({
  modes,
  activeId,
  onChange,
  isDark = false,
  onActivePanelScroll,
  renderPanel,
  /** Soften panel content while a pill-driven fade is in flight. */
  contentOpacity = 1,
}) {
  const scrollerRef = useRef(null);
  const panelRefs = useRef({});
  const ignoreSnapRef = useRef(false);
  const dragRef = useRef(null);
  /** "init" | "scroll" | "programmatic" — avoid re-animating after a flick. */
  const syncSourceRef = useRef("init");
  const modeIds = modes.map((m) => m.id).join("|");

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !activeId) return;
    const index = modeIds.split("|").indexOf(activeId);
    if (index < 0) return;

    const target = index * el.clientWidth;
    const source = syncSourceRef.current;
    syncSourceRef.current = "programmatic";

    // User flick/drag already moved the pager — don't fire a second slide.
    if (source === "scroll") return;
    if (Math.abs(el.scrollLeft - target) < 2) return;

    ignoreSnapRef.current = true;
    // Pill / programmatic changes jump instantly — fade is handled by the parent.
    el.scrollTo({ left: target, behavior: "auto" });
    const t = window.setTimeout(() => {
      ignoreSnapRef.current = false;
    }, 50);
    return () => window.clearTimeout(t);
  }, [activeId, modeIds]);

  useEffect(() => {
    const panel = panelRefs.current[activeId];
    if (!panel || !onActivePanelScroll) return undefined;
    const emit = () => {
      onActivePanelScroll({
        scrollTop: panel.scrollTop,
        clientHeight: panel.clientHeight,
        scrollHeight: panel.scrollHeight,
      });
    };
    emit();
    panel.addEventListener("scroll", emit, { passive: true });
    return () => panel.removeEventListener("scroll", emit);
  }, [activeId, onActivePanelScroll]);

  function nearestIndex() {
    const el = scrollerRef.current;
    if (!el?.clientWidth) return 0;
    return Math.max(0, Math.min(modes.length - 1, Math.round(el.scrollLeft / el.clientWidth)));
  }

  function syncFromScroll() {
    if (ignoreSnapRef.current) return;
    const next = modes[nearestIndex()];
    if (next && next.id !== activeId) {
      syncSourceRef.current = "scroll";
      onChange?.(next.id);
    }
  }

  function onPointerDown(e) {
    // Touch uses native snap scrolling; mouse/pen get explicit drag-to-page.
    if (e.pointerType === "touch") return;
    if (e.button != null && e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originLeft: el.scrollLeft,
      axis: null,
    };
  }

  function onPointerMove(e) {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag || drag.pointerId !== e.pointerId || !el) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (!drag.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      drag.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (drag.axis === "x") {
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }
    }

    if (drag.axis !== "x") return;

    e.preventDefault();
    window.getSelection()?.removeAllRanges();
    ignoreSnapRef.current = true;
    el.scrollLeft = drag.originLeft - dx;
  }

  function endPointer(e) {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;

    if (drag.axis === "x" && el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      const width = el.clientWidth || 1;
      const index = Math.max(0, Math.min(modes.length - 1, Math.round(el.scrollLeft / width)));
      ignoreSnapRef.current = true;
      el.scrollTo({ left: index * width, behavior: "smooth" });
      const next = modes[index];
      if (next && next.id !== activeId) {
        syncSourceRef.current = "scroll";
        onChange?.(next.id);
      }
      window.setTimeout(() => {
        ignoreSnapRef.current = false;
      }, 420);
    } else {
      ignoreSnapRef.current = false;
    }
  }

  return (
    <div
      ref={scrollerRef}
      className="flex h-full min-h-0 w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ cursor: "grab" }}
      onScroll={syncFromScroll}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
    >
      {modes.map((mode, index) => {
        const tone = homeModeTone(mode, isDark);
        return (
          <section
            key={mode.id}
            ref={(node) => {
              if (node) panelRefs.current[mode.id] = node;
              else delete panelRefs.current[mode.id];
            }}
            className="relative h-full min-h-0 w-full shrink-0 snap-center snap-always overflow-y-auto overscroll-y-contain [container-type:size] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-hidden={mode.id !== activeId}
          >
            {renderPanel?.({
              mode,
              index,
              tone,
              active: mode.id === activeId,
              contentOpacity: mode.id === activeId ? contentOpacity : 1,
              contentFadeMs: HOME_MODE_CONTENT_FADE_MS,
            })}
          </section>
        );
      })}
    </div>
  );
}
