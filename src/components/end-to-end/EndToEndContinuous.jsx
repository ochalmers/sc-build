import { FlowItem } from "./EndToEndSection.jsx";
import { FlowArrow } from "./BoardPrimitives";
import { E2E_SECTIONS } from "../../content/endToEnd/index.js";

function countScreens(items = []) {
  let n = 0;
  for (const item of items) {
    if (item.kind === "screen") n += 1;
    if (item.kind === "stack") n += countScreens(item.items);
  }
  return n;
}

/** A narrative marker that introduces each section inline in the continuous band. */
function SectionMarker({ section }) {
  const screens = countScreens(section.items);
  return (
    <div className="flex w-60 shrink-0 flex-col self-stretch overflow-hidden rounded-2xl border border-ink-300 bg-gradient-to-b from-white to-ink-50/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
      <div className="border-b border-ink-200 bg-ink-950 px-3.5 py-3 text-paper-100">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          Section {section.number}
        </span>
        <h3 className="mt-1.5 text-[15px] font-medium leading-tight tracking-tight">{section.title}</h3>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        {section.description ? (
          <p className="text-[11px] leading-relaxed text-ink-600">{section.description}</p>
        ) : null}
        {section.narrative ? (
          <p className="mt-3 border-t border-ink-200/80 pt-3 text-[11px] leading-relaxed text-ink-500">
            <span className="font-semibold text-ink-700">In this beat: </span>
            {section.narrative}
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          {section.navLabel ? (
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-400">
              {section.navLabel}
            </p>
          ) : (
            <span />
          )}
          {screens > 0 ? (
            <span className="rounded-full bg-ink-100 px-2 py-0.5 font-mono text-[10px] tabular-nums text-ink-600">
              {screens} screen{screens === 1 ? "" : "s"}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** A tall inline banner for the major phase dividers. */
function DividerMarker({ section }) {
  return (
    <div className="flex w-64 shrink-0 flex-col justify-center self-stretch rounded-2xl bg-ink-950 p-5 text-paper-100 shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
        Major phase
      </span>
      <h3 className="mt-3 text-[20px] font-medium leading-tight tracking-tight">
        {section.dividerTitle}
      </h3>
      {section.dividerSubtitle ? (
        <p className="mt-3 text-[12px] leading-relaxed text-white/60">{section.dividerSubtitle}</p>
      ) : null}
      {section.narrative ? (
        <p className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-relaxed text-white/45">
          {section.narrative}
        </p>
      ) : null}
    </div>
  );
}

/**
 * The whole board rendered as one uninterrupted left-to-right flow.
 * `break` markers become connecting arrows so nothing wraps.
 */
export default function EndToEndContinuous() {
  return (
    <div className="overflow-x-auto pb-12 pt-2">
      <div className="mb-4 flex items-baseline justify-between gap-4 px-[30px]">
        <p className="max-w-2xl text-[13px] leading-relaxed text-ink-500">
          Read left → right. Each card is a full step in the lifecycle; arrows carry the handoff.
          Dark markers open major phases.
        </p>
        <p className="shrink-0 font-mono text-[11px] tabular-nums text-ink-400">
          {E2E_SECTIONS.filter((s) => !s.divider).length} sections
        </p>
      </div>
      <div className="flex min-w-max items-stretch gap-2.5 px-[30px]">
        {E2E_SECTIONS.map((section, si) => {
          if (section.divider) {
            return (
              <div key={section.id} className="flex items-stretch gap-2.5">
                {si > 0 ? <FlowArrow /> : null}
                <DividerMarker section={section} />
                <FlowArrow />
              </div>
            );
          }

          return (
            <div key={section.id} className="flex items-start gap-2.5">
              {si > 0 && !E2E_SECTIONS[si - 1]?.divider ? <FlowArrow /> : null}
              <SectionMarker section={section} />
              {(section.items || []).map((item, ii) => {
                if (item.kind === "break") {
                  return <FlowArrow key={`brk-${ii}`} label={item.label} />;
                }
                return (
                  <FlowItem
                    key={`${section.id}-${ii}-${item.kind}-${item.screen?.id || item.label || ii}`}
                    item={item}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
