/**
 * Combined-flow stage wash - two clear phases so Admin provisioning and
 * Listener journey read as different chapters of the same review.
 *
 * Admin = light paper stage (console sits on it).
 * Listener = dark stage. Contrast makes the handoff unmistakable.
 */
export const COMBINED_STAGE = {
  admin: {
    base: "#f3f2ee",
    wash:
      "radial-gradient(70% 45% at 50% 0%, rgba(0,0,0,0.035), transparent 58%), radial-gradient(45% 35% at 85% 85%, rgba(0,0,0,0.02), transparent 55%)",
    rail: "light",
  },
  listener: {
    base: "#0a0a0a",
    wash:
      "radial-gradient(70% 50% at 50% 0%, rgba(255,255,255,0.035), transparent 60%), radial-gradient(50% 40% at 80% 80%, rgba(255,255,255,0.015), transparent 55%)",
    rail: "dark",
  },
};

/** Default Listener-only staging (unchanged when not in Combined). */
export const LISTENER_ONLY_STAGE = {
  base: "#0a0a0a",
  wash:
    "radial-gradient(70% 50% at 50% 0%, rgba(255,255,255,0.035), transparent 60%), radial-gradient(50% 40% at 80% 80%, rgba(255,255,255,0.015), transparent 55%)",
  rail: "dark",
};
