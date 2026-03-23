import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CloseSection({ content }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} id="close" className="py-24 scroll-mt-20 border-t border-black/10">
      <h2 className="text-[28px] md:text-[32px] leading-tight tracking-tight text-ink-950">
        {content.headline}
      </h2>
      <div className="mt-10 space-y-6">
        {content.statements.map((s, i) => (
          <motion.p
            key={s}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="text-[18px] md:text-[20px] leading-relaxed text-ink-800"
          >
            {s}
          </motion.p>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="mt-12 text-[14px] text-ink-500"
      >
        {content.closing}
      </motion.p>
    </section>
  );
}
