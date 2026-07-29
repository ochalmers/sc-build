import {
  AnnotationCard,
  BranchLabel,
  FlowArrow,
  ScreenMeta,
} from "./BoardPrimitives";
import ScreenWireframe from "./ScreenWireframe";
import { EYEBROW, SECTION_BODY, SECTION_TITLE } from "../workspace/pageLayout.js";

export function FlowItem({ item }) {
  if (item.kind === "arrow") {
    return <FlowArrow label={item.label} />;
  }
  if (item.kind === "branch") {
    return (
      <div className="flex shrink-0 flex-col items-center justify-center self-center px-2">
        <BranchLabel>{item.label}</BranchLabel>
      </div>
    );
  }
  if (item.kind === "annotation") {
    return (
      <div className="flex shrink-0 items-start self-center px-1">
        <AnnotationCard>{item.text}</AnnotationCard>
      </div>
    );
  }
  if (item.kind === "break") {
    return null;
  }
  if (item.kind === "stack") {
    return (
      <div className="flex shrink-0 flex-col gap-4 self-start">
        {(item.items || []).map((child, i) => (
          <FlowItem key={i} item={child} />
        ))}
      </div>
    );
  }
  if (item.kind === "screen" && item.screen) {
    return (
      <article className="shrink-0">
        <ScreenMeta
          id={item.screen.id}
          title={item.screen.title}
          purpose={item.screen.purpose}
          frame={item.screen.frame}
          beat={item.screen.beat}
        />
        <ScreenWireframe screen={item.screen} />
      </article>
    );
  }
  return null;
}

/** Split items into horizontal rows on `break` markers */
function splitRows(items = []) {
  const rows = [[]];
  for (const item of items) {
    if (item.kind === "break") {
      rows.push([]);
    } else {
      rows[rows.length - 1].push(item);
    }
  }
  return rows.filter((r) => r.length);
}

export default function EndToEndSection({ section, anchorId }) {
  if (section.divider) {
    return (
      <section
        id={anchorId}
        className="scroll-mt-28 border-y border-ink-200 bg-ink-950 py-16 text-paper-100"
      >
        <div className="px-[30px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            Major phase
          </p>
          <h2 className="mt-3 text-[28px] font-medium tracking-tight md:text-[36px]">
            {section.dividerTitle}
          </h2>
          {section.dividerSubtitle ? (
            <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-white/65">
              {section.dividerSubtitle}
            </p>
          ) : null}
        </div>
      </section>
    );
  }

  const rows = splitRows(section.items);

  return (
    <section id={anchorId} className="scroll-mt-28 border-b border-ink-200/80 py-12">
      <div className="mb-8 px-[30px]">
        <p className={EYEBROW}>Section {section.number || section.label}</p>
        <h2 className={`${SECTION_TITLE} mt-2`}>{section.title}</h2>
        {section.description ? (
          <p className={`${SECTION_BODY} mt-3 max-w-2xl`}>{section.description}</p>
        ) : null}
        {section.narrative ? (
          <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-ink-500">
            <span className="font-medium text-ink-700">In this beat - </span>
            {section.narrative}
          </p>
        ) : null}
      </div>

      <div className="space-y-10 overflow-x-auto px-[30px] pb-4">
        {rows.map((row, ri) => (
          <div key={ri} className="flex min-w-min items-start gap-1">
            {row.map((item, ii) => (
              <FlowItem
                key={`${ri}-${ii}-${item.kind}-${item.screen?.id || item.label || ii}`}
                item={item}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
