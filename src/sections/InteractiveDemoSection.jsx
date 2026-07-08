import { usePrototype } from "../context/PrototypeContext.jsx";
import ControlPanel from "./ControlPanel.jsx";
import PhonePreview from "../components/PhonePreview.jsx";

export default function InteractiveDemoSection() {
  const { resolved } = usePrototype();

  return (
    <div className="border-t border-ink-200/70 bg-[linear-gradient(180deg,rgba(247,246,243,0.75)_0%,rgba(255,255,255,0.62)_100%)]">
      <div className="max-w-content mx-auto px-6 py-20 md:py-24">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] lg:gap-18">
          <section id="behaviour-controls" aria-labelledby="behaviour-controls-heading">
            <h2
              id="behaviour-controls-heading"
              className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500"
            >
              Interactive behaviour controls
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-600">
              Tune mode, persona, scenario, and system sliders. The preview updates in real time.
            </p>
            <div className="mt-10">
              <ControlPanel />
            </div>
          </section>

          <section
            id="live-preview"
            aria-labelledby="live-preview-heading"
            style={resolved.cssVars}
          >
            <h2
              id="live-preview-heading"
              className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500"
            >
              Live UI preview
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-600">
              One structural system: contrast, density, intensity, and mode change how surfaces,
              type, motion, and waveform read — not a different app.
            </p>
            <div className="mt-10">
              <PhonePreview />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
