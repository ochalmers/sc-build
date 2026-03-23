import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FlowSection({ content }) {
  const [step, setStep] = useState(0);
  const s = content.screens[step] ?? content.screens[0];

  return (
    <section id="flow" className="py-24 scroll-mt-20">
      <h2 className="text-[24px] md:text-[28px] leading-tight tracking-tight text-ink-950">
        Product flow
      </h2>
      <p className="mt-3 text-[14px] text-ink-600 max-w-[55ch]">{content.intro}</p>

      <div className="mt-10 flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex-1 space-y-2">
          {content.screens.map((sc, i) => (
            <button
              key={sc.title}
              onClick={() => setStep(i)}
              className={`w-full text-left rounded-xl px-4 py-3 transition ${
                step === i ? "bg-ink-950 text-white" : "hover:bg-black/5"
              }`}
            >
              <span className="font-medium text-[14px]">{sc.title}</span>
              <p className={`mt-1 text-[13px] ${step === i ? "text-white/80" : "text-ink-600"}`}>{sc.caption}</p>
            </button>
          ))}
        </div>
        <div className="w-full sm:w-[260px] mx-auto sm:mx-0">
          <div className="rounded-[28px] border border-black/10 overflow-hidden bg-paper-200 shadow-lg">
            <div className="aspect-[9/19]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={step}
                  src={s.image}
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
