import { getPreviewWidthForFrame } from "../WireframePreviewFrame.jsx";
import { getWireframeFrame } from "../../../wireframes/registry.js";
import WireframeScreenPreview from "./WireframeScreenPreview.jsx";

function StoryboardArrow() {
  return (
    <div className="hidden shrink-0 items-center self-center px-2 pt-16 md:flex" aria-hidden>
      <div className="h-px w-8 bg-gradient-to-r from-transparent via-ink-300/60 to-transparent" />
      <svg className="h-4 w-4 text-ink-300" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8h8M9 5l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function WireframeStoryboard({ steps, className = "" }) {
  return (
    <div className={className}>
      <div className="-mx-6 overflow-x-auto px-6 pb-2 scrollbar-thin md:-mx-8 md:px-8">
        <div className="flex min-w-min items-start gap-1 md:gap-2">
          {steps.map((step, index) => (
            <div key={step.id ?? `${step.label}-${index}`} className="flex shrink-0 items-start">
              <figure
                className="flex shrink-0 flex-col items-center"
                style={{ width: getPreviewWidthForFrame(getWireframeFrame(step.screenKey)) }}
              >
                <WireframeScreenPreview screenKey={step.screenKey} label={step.label} />
                <figcaption className="mt-4 text-center text-[13px] font-medium tracking-tight text-ink-800">
                  {step.label}
                </figcaption>
              </figure>
              {index < steps.length - 1 ? <StoryboardArrow /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
