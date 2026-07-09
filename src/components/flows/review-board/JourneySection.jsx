import JourneyOverviewStrip from "./JourneyOverviewStrip.jsx";
import WireframeStoryboard from "./WireframeStoryboard.jsx";
import JourneySummaryCards from "./JourneySummaryCards.jsx";
import JourneyActions from "./JourneyActions.jsx";

function MetaItem({ label, value }) {
  return (
    <span className="text-[12px] text-ink-500">
      <span className="text-ink-400">{label}</span>{" "}
      <span className="font-medium text-ink-700">{value}</span>
    </span>
  );
}

export default function JourneySection({
  id,
  journey,
  variant = "primary",
  index,
  className = "",
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-[7rem] border-b border-ink-200/50 py-20 md:py-28 ${className}`}
    >
      <div className="max-w-site mx-auto px-6">
        {/* 01. Journey Header */}
        <header className="max-w-content">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
            {String(index).padStart(2, "0")}.
          </p>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0 max-w-2xl">
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-[1.08] tracking-editorial text-ink-950">
                {journey.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{journey.goal}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <MetaItem label="Screens" value={journey.screenCount} />
              <MetaItem label="Updated" value={journey.lastUpdated} />
            </div>
          </div>
        </header>

        {/* 02. Journey Overview */}
        <div className="mt-10 max-w-content rounded-2xl border border-ink-200/40 bg-paper-100/50 px-6 py-5">
          <JourneyOverviewStrip labels={journey.overviewLabels} />
        </div>

        {/* 03. Wireframe Journey — hero of the section */}
        <div className="mt-12 rounded-3xl border border-ink-200/30 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.4)_60%,transparent)] px-2 py-10 md:px-4 md:py-14">
          <WireframeStoryboard steps={journey.steps} />
        </div>

        {/* 04. Journey Summary */}
        <div className="mt-14 max-w-content">
          <JourneySummaryCards summary={journey.summary} />
        </div>

        {/* 05. Prototype */}
        <div className="mt-10 max-w-content">
          <JourneyActions links={journey.links} />
        </div>
      </div>
    </section>
  );
}
