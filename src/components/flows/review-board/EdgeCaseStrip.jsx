import WireframeScreenPreview from "./WireframeScreenPreview.jsx";

function EdgeArrow() {
  return (
    <div className="hidden shrink-0 items-center self-center px-1 pt-12 sm:flex" aria-hidden>
      <div className="h-px w-4 bg-ink-200" />
      <svg className="h-3 w-3 text-ink-300" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6h7M7 3.5L9.5 6 7 8.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function EdgeCaseStrip({ cases, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="-mx-2 overflow-x-auto px-2 pb-2 scrollbar-thin">
        <div className="flex min-w-min items-start">
          {cases.map((item, index) => (
            <div key={item.id} className="flex shrink-0 items-start">
              <figure className="flex w-[200px] shrink-0 flex-col items-center">
                <WireframeScreenPreview screenKey={item.screenKey} label={item.title} />
                <figcaption className="mt-3 text-center text-[12px] font-medium text-ink-700">
                  {item.title}
                </figcaption>
              </figure>
              {index < cases.length - 1 ? <EdgeArrow /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
