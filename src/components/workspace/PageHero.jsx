import { motion } from "framer-motion";
import {
  EYEBROW,
  HERO_PAD,
  LEDE,
  PAGE_CONTAINER,
  PAGE_GUTTER,
  PAGE_TITLE,
  SECTION_SCROLL,
} from "./pageLayout.js";

/**
 * Shared workspace page intro — consistent padding, title scale, and lede.
 * @param {boolean} flushStart — left-align in the column (Flows sidebar layout); otherwise center.
 */
export default function PageHero({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  withGradient = false,
  flushStart = false,
}) {
  const gradient = withGradient
    ? "bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
    : "";
  const shell = flushStart ? `max-w-content ${PAGE_GUTTER}` : PAGE_CONTAINER;

  return (
    <section
      id={id}
      className={`${SECTION_SCROLL} border-b border-ink-200/60 ${gradient} ${className}`.trim()}
    >
      <div className={`${shell} ${HERO_PAD}`}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow ? <p className={EYEBROW}>{eyebrow}</p> : null}
          <h1 className={`${eyebrow ? "mt-3" : ""} ${PAGE_TITLE}`.trim()}>{title}</h1>
          {description ? <p className={LEDE}>{description}</p> : null}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
