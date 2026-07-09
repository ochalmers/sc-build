import { useState } from "react";
import { openScreenUrl } from "../../content/inspiration.js";

function ScreenLightbox({ index, label, onClose }) {
  if (index == null) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-white/20"
      >
        Close
      </button>
      <figure className="max-h-[90vh] max-w-[min(420px,90vw)]" onClick={(e) => e.stopPropagation()}>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-950 shadow-2xl">
          <img
            src={openScreenUrl(index)}
            alt={label ?? `Open iOS screen ${index}`}
            className="max-h-[82vh] w-full object-contain"
          />
        </div>
        <figcaption className="mt-3 text-center font-mono text-[12px] text-white/70">
          {label ?? `#${index}`}
        </figcaption>
      </figure>
    </div>
  );
}

function ScreenThumb({ index, label, onSelect }) {
  const content = (
    <>
      <div className="overflow-hidden rounded-xl border border-ink-200/80 bg-ink-950 shadow-sm transition-shadow group-hover:shadow-md">
        <img
          src={openScreenUrl(index)}
          alt={label ?? `Open iOS screen ${index}`}
          loading="lazy"
          className="aspect-[9/19.5] w-full object-cover object-top"
        />
      </div>
      {label ? (
        <figcaption className="mt-2 font-mono text-[10px] text-ink-400">{label}</figcaption>
      ) : (
        <figcaption className="mt-2 font-mono text-[10px] text-ink-400">#{index}</figcaption>
      )}
    </>
  );

  if (onSelect) {
    return (
      <button type="button" onClick={() => onSelect(index)} className="group flex w-[200px] shrink-0 flex-col text-left">
        {content}
      </button>
    );
  }

  return <figure className="group flex w-[200px] shrink-0 flex-col">{content}</figure>;
}

export function InspirationGallery({ screens, compact = false }) {
  if (!screens?.length) return null;

  return (
    <div className="-mx-2 overflow-x-auto px-2 pb-2">
      <div className={`flex min-w-min ${compact ? "gap-4" : "gap-5"}`}>
        {screens.map((index) => (
          <ScreenThumb key={index} index={index} />
        ))}
      </div>
    </div>
  );
}

export function InspirationCategoryGrid({ indices, initialVisible = 18 }) {
  const [visible, setVisible] = useState(initialVisible);
  const [lightbox, setLightbox] = useState(null);
  const shown = indices.slice(0, visible);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {shown.map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => setLightbox(index)}
            className="group text-left"
          >
            <div className="overflow-hidden rounded-xl border border-ink-200/80 bg-ink-950 transition-shadow group-hover:shadow-md">
              <img
                src={openScreenUrl(index)}
                alt={`Open iOS screen ${index}`}
                loading="lazy"
                className="aspect-[9/19.5] w-full object-cover object-top"
              />
            </div>
            <span className="mt-1.5 block font-mono text-[10px] text-ink-400">#{index}</span>
          </button>
        ))}
      </div>
      {visible < indices.length ? (
        <button
          type="button"
          onClick={() => setVisible((v) => v + 24)}
          className="mt-6 rounded-full border border-ink-300 bg-white/70 px-5 py-2.5 text-[12px] font-medium text-ink-800 transition-colors hover:border-ink-400 hover:bg-white"
        >
          Show more screens ({indices.length - visible} remaining)
        </button>
      ) : null}
      <ScreenLightbox index={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}

export function InspirationFullGallery({ indices }) {
  return <InspirationCategoryGrid indices={indices} initialVisible={36} />;
}
