import { useEffect, useRef } from "react";

function path(w, h, amp, phase) {
  let d = `M 0 ${h * 0.5}`;
  for (let i = 1; i <= 36; i++) {
    const x = (i / 36) * w;
    const t = (i / 36) * Math.PI * 3 + phase;
    d += ` L ${x.toFixed(1)} ${(h * 0.5 + Math.sin(t) * amp * h * 0.35).toFixed(1)}`;
  }
  return d;
}

export function SystemWaveformModule({ mode = "regulation" }) {
  const ref = useRef(null);
  const phase = useRef(0);
  const amp = mode === "care" ? 0.35 : mode === "performance" ? 0.55 : 0.45;

  useEffect(() => {
    let raf;
    const tick = () => {
      phase.current += mode === "care" ? 0.012 : mode === "performance" ? 0.022 : 0.017;
      const el = ref.current;
      if (el) el.setAttribute("d", path(200, 56, amp, phase.current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, amp]);

  return (
    <div
      className="rounded-xl border px-3 py-4"
      style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
    >
      <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--proto-text-muted)" }}>
        Active · sound layer
      </p>
      <svg className="mt-3 w-full" viewBox="0 0 200 56" aria-hidden>
        <path
          ref={ref}
          d={path(200, 56, amp, 0)}
          fill="none"
          stroke="var(--proto-wave)"
          strokeWidth={mode === "performance" ? 1.6 : 1.35}
          strokeLinecap="round"
          opacity={mode === "care" ? 0.75 : 0.9}
        />
      </svg>
    </div>
  );
}
