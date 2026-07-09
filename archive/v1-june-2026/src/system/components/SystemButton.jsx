import { motion } from "framer-motion";
import { motionTokens } from "../tokens/motion.js";
import { useResolvedMode } from "./ModeChrome.jsx";

export function SystemButton({
  mode = "regulation",
  children,
  className = "",
  fullWidth,
}) {
  const resolved = useResolvedMode(mode);
  const { layout } = resolved;
  return (
    <div style={resolved.cssVars} className={fullWidth ? "w-full" : "inline-block"}>
    <motion.button
      type="button"
      className={`rounded-xl py-3 text-[13px] font-medium tracking-tight ${fullWidth ? "w-full" : "px-6"} ${className}`}
      style={{
        background: "var(--proto-accent)",
        color: "var(--proto-bg)",
        borderRadius: Math.max(10, layout.radiusPx - 2),
      }}
      whileTap={{ scale: 0.99 }}
      transition={{
        duration: motionTokens.micro.duration / 1000,
        ease: motionTokens.micro.ease,
      }}
    >
      {children}
    </motion.button>
    </div>
  );
}
