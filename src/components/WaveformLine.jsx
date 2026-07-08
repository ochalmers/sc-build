import { useEffect, useRef } from "react";
import { usePrototype } from "../context/PrototypeContext.jsx";

function buildPath(width, height, amplitude, phase) {
  const segments = 42;
  let d = `M 0 ${height * 0.5}`;
  for (let i = 1; i <= segments; i++) {
    const x = (i / segments) * width;
    const t = (i / segments) * Math.PI * 3.6 + phase;
    const y = height * 0.5 + Math.sin(t) * amplitude * height * 0.38;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

export default function WaveformLine({ className = "" }) {
  const { resolved, behaviourMode } = usePrototype();
  const { amplitude, speed } = resolved.waveform;
  const w = 280;
  const h = 72;
  const pathRef = useRef(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    let raf;
    const tick = () => {
      phaseRef.current += 0.018 * speed;
      const el = pathRef.current;
      if (el) {
        el.setAttribute("d", buildPath(w, h, amplitude, phaseRef.current));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, amplitude]);

  const strokeW =
    behaviourMode === "care" ? 1.2 : behaviourMode === "performance" ? 1.65 : 1.45;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      aria-hidden
    >
      <path
        ref={pathRef}
        d={buildPath(w, h, amplitude, 0)}
        stroke="var(--proto-wave)"
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={behaviourMode === "care" ? 0.75 : 0.92}
      />
    </svg>
  );
}
