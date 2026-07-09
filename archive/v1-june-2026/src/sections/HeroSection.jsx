import { motion } from "framer-motion";

const bullets = [
  "personas define context",
  "scenarios define behaviour",
  "colour adapts",
  "sound leads",
  "motion supports",
];

export default function HeroSection() {
  return (
    <section
      id="intro"
      className="border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
    >
      <div className="max-w-content mx-auto px-6 pb-20 pt-28 md:pb-28 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-12 lg:gap-14"
        >
          <div className="lg:col-span-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
              Internal prototype
            </p>
            <h1 className="mt-4 max-w-2xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
              Sonocea System Prototype
            </h1>
            <p className="mt-4 text-[18px] font-medium tracking-tight text-ink-700">
              One system. Multiple states.
            </p>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
              Sonocea needs to work across very different states, from vulnerable and supported moments
              to everyday regulation and high-performance recovery. This prototype demonstrates how one
              system adapts behaviour without fragmenting brand or product structure.
            </p>
          </div>

          <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5 lg:col-span-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
              Review intent
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-700">
              Clarify what is fixed, what flexes, and how behavioural adaptation remains structurally
              consistent across Care, Regulation, and Performance.
            </p>
          </div>
        </motion.div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {bullets.map((line) => (
            <li
              key={line}
              className="rounded-xl border border-ink-200/75 bg-white/60 px-4 py-3 text-[13px] text-ink-700"
            >
              <span className="mr-1 text-ink-400" aria-hidden>
                —
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
