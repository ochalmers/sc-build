export default function PageSection({ id, label, title, description, children, className = "" }) {
  return (
    <section
      id={id}
      className={`scroll-mt-[7rem] border-b border-ink-200/60 py-20 md:py-28 ${className}`}
    >
      <div className="max-w-content mx-auto px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">{label}</p>
        <h2 className="mt-3 max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.15] tracking-tight text-ink-950">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-600">{description}</p>
        ) : null}
        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </section>
  );
}
