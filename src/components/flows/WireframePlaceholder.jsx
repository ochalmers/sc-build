export default function WireframePlaceholder({ label = "Wireframe" }) {
  return (
    <div
      className="flex aspect-[333/724] w-full max-w-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-ink-300/80 bg-paper-100/80 p-6"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white/80">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <rect x="3" y="2" width="12" height="14" rx="2" stroke="#a8a8a2" strokeWidth="1.5" />
          <path d="M6 6H12M6 9H10" stroke="#a8a8a2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-ink-400">{label}</p>
      <p className="mt-1 text-center text-[12px] text-ink-400">Low-fidelity wireframe</p>
    </div>
  );
}
