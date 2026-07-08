import { behaviourModeMeta } from "../system/modes.js";
import { PERSONA_IDS, personas } from "../config/personas.js";
import { userStories } from "../config/stories.js";
import { usePrototype } from "../context/PrototypeContext.jsx";

function Slider({ label, value, onChange, hint }) {
  return (
    <div className="rounded-xl border border-ink-200/70 bg-paper-100/70 p-3.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[12px] font-medium text-ink-800">{label}</span>
        <span className="tabular-nums text-[11px] text-ink-500">
          {Math.round(value * 100)}%
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-200 accent-ink-800"
        aria-label={label}
      />
      {hint ? (
        <p className="mt-1 text-[10px] leading-snug text-ink-500">{hint}</p>
      ) : null}
    </div>
  );
}

export default function ControlPanel() {
  const {
    behaviourMode,
    setBehaviourMode,
    personaId,
    setPersonaId,
    selectStory,
    storyId,
    sliders,
    updateSlider,
  } = usePrototype();

  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-ink-200/80 bg-white/80 p-6 shadow-[0_14px_44px_rgba(8,8,8,.07)] backdrop-blur-sm md:p-8">
      <p className="text-[14px] leading-relaxed text-ink-600">
        Behaviour mode sets sensible defaults for contrast, density, and intensity. Adjust sliders to
        override — one palette, multiple behavioural expressions.
      </p>

      <div className="rounded-2xl border border-ink-200/70 bg-paper-100/60 p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
          A. Behaviour mode
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.values(behaviourModeMeta).map((m) => {
            const active = behaviourMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setBehaviourMode(m.id)}
                className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium tracking-tight transition-colors"
                style={{
                  borderColor: active ? "rgba(23,23,22,.45)" : "rgba(23,23,22,.15)",
                  background: active ? "rgba(23,23,22,.92)" : "transparent",
                  color: active ? "#fbfbfa" : "rgba(23,23,22,.75)",
                }}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-ink-200/70 bg-paper-100/60 p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
          B. Persona
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {PERSONA_IDS.map((id) => {
            const p = personas[id];
            const active = personaId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setPersonaId(id)}
                className="rounded-xl border px-3 py-2.5 text-left text-[12px] transition-colors"
                style={{
                  borderColor: active ? "rgba(23,23,22,.35)" : "rgba(23,23,22,.12)",
                  background: active ? "rgba(255,255,255,.9)" : "transparent",
                }}
              >
                <span className="font-medium text-ink-900">{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-ink-200/70 bg-paper-100/60 p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
          C. User story
        </p>
        <label className="mt-3 block">
          <span className="sr-only">User story</span>
          <select
            value={storyId ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              if (v) selectStory(v);
              else selectStory(null);
            }}
            className="w-full rounded-xl border border-ink-200/90 bg-white px-3 py-2.5 text-[13px] text-ink-900 outline-none ring-ink-800 focus:ring-2"
          >
            <option value="">Custom (mode + sliders)</option>
            {userStories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <p className="mt-2 text-[11px] text-ink-500">
          Selecting a story sets persona, mode, and suggested slider positions. Scenarios are also
          available as cards below.
        </p>
      </div>

      <div className="border-t border-ink-200/70 pt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
          D. System sliders
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-ink-600">
          Sliders tune tonal response: clarity, spatial rhythm, and motion/waveform intensity.
        </p>
        <div className="mt-4 space-y-5">
          <Slider
            label="Contrast"
            value={sliders.contrast}
            onChange={(v) => updateSlider("contrast", v)}
            hint="Affect and edge definition for type, borders, and emphasis."
          />
          <Slider
            label="Density"
            value={sliders.density}
            onChange={(v) => updateSlider("density", v)}
            hint="Spacing and text compression; open to tighter rhythm."
          />
          <Slider
            label="Intensity"
            value={sliders.intensity}
            onChange={(v) => updateSlider("intensity", v)}
            hint="Motion pace and waveform presence."
          />
        </div>
      </div>

      <p className="rounded-lg border border-dashed border-ink-300/80 bg-paper-100/50 px-3 py-2 text-[11px] leading-relaxed text-ink-600">
        One palette, multiple behavioural expressions.
      </p>
    </div>
  );
}
