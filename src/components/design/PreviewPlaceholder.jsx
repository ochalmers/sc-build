export default function PreviewPlaceholder({ label = "Preview", type = "wireframe" }) {
  const labels = {
    wireframe: "Low-fidelity wireframe",
    hifi: "High-fidelity design",
    component: "Component preview",
    motion: "Motion example",
    state: "State preview",
  };

  return (
    <div className="flex aspect-[9/16] max-h-[360px] w-full max-w-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-ink-300/80 bg-paper-100/80 p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white/80">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
          <rect x="3" y="2" width="12" height="14" rx="2" stroke="#a8a8a2" strokeWidth="1.5" />
          <path d="M6 6H12M6 9H10" stroke="#a8a8a2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-ink-400">{label}</p>
      <p className="mt-1 text-center text-[11px] text-ink-400">{labels[type] ?? labels.wireframe}</p>
    </div>
  );
}
