import FlowSequenceStrip from "./FlowSequenceStrip.jsx";
import WireframeStoryboard from "./WireframeStoryboard.jsx";

export default function FlowSection({ id, section, className = "" }) {
  const storyboardSteps = section.steps.filter((step) => step.screenKey);

  return (
    <section
      id={id}
      className={`scroll-mt-[7rem] border-b border-ink-200/50 py-16 md:py-24 ${className}`}
    >
      <div className="max-w-site mx-auto px-6">
        <header className="max-w-content">
          {section.number ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
              {section.number}.
            </p>
          ) : (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
              End-to-end
            </p>
          )}
          <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.08] tracking-editorial text-ink-950">
            {section.title}
          </h2>
          {section.purpose ? (
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-600">
              {section.purpose}
            </p>
          ) : null}
          {section.appPath ? (
            <a
              href={section.appPath}
              className="mt-4 inline-flex text-[13px] text-ink-500 underline-offset-4 hover:text-ink-900 hover:underline"
            >
              Open in working app →
            </a>
          ) : null}
        </header>

        <div className="mt-8 max-w-content">
          <FlowSequenceStrip steps={section.steps} />
        </div>

        {storyboardSteps.length > 0 ? (
          <div className="mt-12 rounded-3xl border border-ink-200/30 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.4)_60%,transparent)] px-2 py-10 md:px-4 md:py-14">
            <WireframeStoryboard steps={storyboardSteps} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
