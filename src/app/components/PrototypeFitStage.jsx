import { useEffect, useRef, useState } from "react";
import { LISTENER_FRAME } from "./ListenerFrame.jsx";

/**
 * Scales the interactive phone (or desktop) prototype to fill the stage canvas.
 * Intrinsic design size stays 390×812; on large monitors we scale up so the
 * app window isn't a postage stamp in empty space.
 */
export function PrototypeFitStage({
  children,
  /** Intrinsic size used for fit math (phone by default). */
  frame = LISTENER_FRAME,
  /** Leave room for rail / padding around the device. */
  padding = 32,
  /** Cap so we don't blow past readable hit targets on ultra-wide displays. */
  maxScale = 1.35,
  className = "",
}) {
  const hostRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return undefined;

    function measure() {
      const rect = el.getBoundingClientRect();
      const availW = Math.max(0, rect.width - padding * 2);
      const availH = Math.max(0, rect.height - padding * 2);
      if (availW < 80 || availH < 80) return;
      const next = Math.min(availW / frame.width, availH / frame.height, maxScale);
      setScale(Number.isFinite(next) && next > 0 ? next : 1);
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [frame.width, frame.height, padding, maxScale]);

  const displayW = frame.width * scale;
  const displayH = frame.height * scale;

  return (
    <div
      ref={hostRef}
      className={`flex w-full items-start justify-center ${className}`}
      style={{ minHeight: "calc(100dvh - 7.5rem)" }}
    >
      <div className="relative" style={{ width: displayW, height: displayH }}>
        <div
          className="origin-top-left"
          style={{
            width: frame.width,
            height: frame.height,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
