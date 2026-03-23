import { motion } from "framer-motion";
import { useSystem } from "../context/SystemContext";
import AppMock from "../components/AppMock";

const BG = { clinical: "#F7F6F3", warmth: "#F8F6F2", performance: "#F6F7F4" };

export default function HeroSection({ content, colourModes }) {
  const { selectedColourMode, selectColourMode } = useSystem();
  const mode = colourModes.find((m) => m.id === selectedColourMode) ?? colourModes[0];

  return (
    <motion.section
      id="intro"
      layout
      className="min-h-[90vh] flex flex-col justify-center py-20"
      style={{ background: BG[selectedColourMode] ?? BG.clinical }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h1 className="text-[36px] md:text-[48px] leading-[0.96] tracking-tight text-ink-950">
        {content.meta.title}
      </h1>
      <p className="mt-4 text-[15px] text-ink-600 max-w-[40ch]">
        {content.hero.body}
      </p>

      <div className="mt-12 w-full max-w-[320px]">
        <AppMock mode={mode} size="lg" showWaveform />
      </div>

      <div className="mt-8 flex gap-2">
        {colourModes.map((m) => (
          <button
            key={m.id}
            onClick={() => selectColourMode(m.id)}
            className={`rounded-full px-4 py-2 text-[12px] transition ${
              selectedColourMode === m.id ? "text-white" : "text-ink-600 hover:text-ink-900"
            }`}
            style={{ background: selectedColourMode === m.id ? m.accent : "transparent" }}
          >
            {m.name}
          </button>
        ))}
      </div>
    </motion.section>
  );
}
