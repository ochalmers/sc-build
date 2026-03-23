import { motion } from "framer-motion";
import { useSystem } from "../context/SystemContext";
import AppMock from "../components/AppMock";

const BG = { clinical: "#F7F6F3", warmth: "#F8F6F2", performance: "#F6F7F4" };

export default function ColourSection({ content }) {
  const { selectedColourMode, selectColourMode } = useSystem();
  const mode = content.modes.find((m) => m.id === selectedColourMode) ?? content.modes[0];

  return (
    <motion.section
      id="colour"
      layout
      className="py-24 scroll-mt-20"
      style={{ background: BG[selectedColourMode] ?? BG.clinical }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h2 className="text-[24px] md:text-[28px] leading-tight tracking-tight text-ink-950">
        Colour system
      </h2>
      <p className="mt-3 text-[14px] text-ink-600 max-w-[55ch]">{content.intro}</p>

      <div className="mt-10 flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex-1 min-w-0">
          {content.modes.map((m) => (
            <button
              key={m.id}
              onClick={() => selectColourMode(m.id)}
              className={`w-full text-left rounded-xl px-4 py-3 mb-2 transition ${
                selectedColourMode === m.id ? "bg-white shadow-sm" : "hover:bg-black/5"
              }`}
            >
              <span className="font-medium text-[14px]">{m.name}</span>
              <p className="mt-1 text-[13px] text-ink-600 line-clamp-2">{m.rationale}</p>
            </button>
          ))}
        </div>
        <div className="w-full sm:w-[280px] shrink-0">
          <AppMock mode={mode} size="default" />
        </div>
      </div>
    </motion.section>
  );
}
