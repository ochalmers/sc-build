import { getStoryById, userStories } from "../config/stories.js";
import { usePrototype } from "../context/PrototypeContext.jsx";

export default function StorySelector() {
  const { storyId, selectStory } = usePrototype();
  const active = storyId ? getStoryById(storyId) : null;

  return (
    <section id="stories" className="border-t border-ink-200/70 bg-paper-50">
      <div className="max-w-content mx-auto px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
            User stories / scenario switcher
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            Each scenario maps a persona to a behavioural mode and a product rationale. Selecting a
            card updates the controls and live preview.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {userStories.map((s) => {
            const on = storyId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => selectStory(s.id)}
                className="rounded-2xl border p-5 text-left transition-colors"
                style={{
                  borderColor: on ? "rgba(23,23,22,.4)" : "rgba(23,23,22,.12)",
                  background: on ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.45)",
                  boxShadow: on ? "0 10px 30px rgba(8,8,8,.06)" : "none",
                }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
                    {s.label}
                  </p>
                  <span className="rounded-full border border-ink-200/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-ink-500">
                    {s.behaviourMode}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-700">{s.shortDescription}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-ink-200/80 bg-white/80 p-6 md:p-8">
          <h3 className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-500">
            Rationale
          </h3>
          {active ? (
            <dl className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-500">State</dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-ink-800">{active.rationale.state}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-500">
                  System response
                </dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-ink-800">
                  {active.rationale.systemResponse}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-500">Why it matters</dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-ink-800">
                  {active.rationale.whyItMatters}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-[13px] leading-relaxed text-ink-600">
              Choose a scenario above, or use the control panel to explore custom combinations. When
              no story is selected, the prototype reflects manual mode and slider choices.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
