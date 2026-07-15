import {
  EYEBROW,
  PAGE_GUTTER,
  SECTION_BODY,
  SECTION_PAD,
  SECTION_SCROLL,
  SECTION_TITLE,
} from "../../workspace/pageLayout.js";
import FlowSequenceStrip from "./FlowSequenceStrip.jsx";
import WireframeStoryboard from "./WireframeStoryboard.jsx";

export default function FlowSection({ id, section, className = "" }) {
  const storyboardSteps = section.steps.filter((step) => step.screenKey);

  return (
    <section
      id={id}
      className={`${SECTION_SCROLL} border-b border-ink-200/60 ${SECTION_PAD} ${className}`.trim()}
    >
      <div className={`max-w-content ${PAGE_GUTTER}`}>
        <header className="max-w-3xl">
          <p className={EYEBROW}>
            {section.number ? `${section.number}.` : "End-to-end"}
          </p>
          <h2 className={`mt-3 ${SECTION_TITLE}`}>{section.title}</h2>
          {section.purpose ? <p className={SECTION_BODY}>{section.purpose}</p> : null}
          {section.appPath ? (
            <a
              href={section.appPath}
              className="mt-4 inline-flex text-[13px] text-ink-500 underline-offset-4 hover:text-ink-900 hover:underline"
            >
              Open in working app →
            </a>
          ) : null}
        </header>

        <div className="mt-8">
          <FlowSequenceStrip steps={section.steps} />
        </div>

        {storyboardSteps.length > 0 ? (
          <div className="mt-10 rounded-3xl border border-ink-200/30 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.4)_60%,transparent)] px-2 py-8 md:px-4 md:py-12">
            <WireframeStoryboard steps={storyboardSteps} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
