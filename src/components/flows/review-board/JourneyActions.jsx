function ActionButton({ href, children, primary = false }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[13px] font-medium tracking-tight transition-colors ${
        primary
          ? "bg-ink-950 text-white hover:bg-ink-800"
          : "border border-ink-200/80 bg-white/80 text-ink-800 hover:border-ink-400 hover:bg-white"
      }`}
    >
      {children}
    </a>
  );
}

export default function JourneyActions({ links }) {
  return (
    <div className="flex flex-wrap gap-3">
      <ActionButton href={links.wireframes}>Open Wireframes</ActionButton>
      <ActionButton href={links.highFidelity}>View High Fidelity</ActionButton>
      <ActionButton href={links.prototype} primary>
        Open Prototype
      </ActionButton>
    </div>
  );
}
