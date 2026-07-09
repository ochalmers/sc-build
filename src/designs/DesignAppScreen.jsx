/**
 * Phone chrome for design previews — full-bleed content, no system header.
 * @param {"hifi" | "wireframe"} variant
 */
export function DesignAppScreen({ children, className = "", variant = "hifi" }) {
  const isWireframe = variant === "wireframe";

  return (
    <div
      className={`relative mx-auto w-[300px] max-w-full shrink-0 overflow-hidden rounded-[1.65rem] border shadow-[0_24px_60px_rgba(8,8,8,0.14)] ${
        isWireframe
          ? "border-ink-200/80 bg-paper-100"
          : "border-ink-200/60 bg-[#080808]"
      } ${className}`}
      style={{ aspectRatio: "333 / 724" }}
    >
      <div
        className={`absolute left-1/2 top-2 z-20 h-4 w-11 -translate-x-1/2 rounded-full ${
          isWireframe ? "bg-ink-200/60" : "bg-black/20"
        }`}
      />
      <div className="relative h-full w-full overflow-hidden">{children}</div>
    </div>
  );
}

export function DesignConceptCard({ title, description, children }) {
  return (
    <article className="flex flex-col">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Design concept</p>
      <h3 className="mt-1.5 text-[15px] font-medium tracking-tight text-ink-950">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-[300px] text-[12px] leading-relaxed text-ink-500">{description}</p>
      ) : null}
      <div className="mt-5">{children}</div>
    </article>
  );
}
