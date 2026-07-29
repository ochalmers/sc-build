/** Session artwork system - Care / Regulation / Performance categories */

export const SESSION_CATEGORIES = {
  care: {
    id: "care",
    label: "Care",
    description: "Soft warm colours",
    accent: "#E8A080",
    gradient: "linear-gradient(135deg, #F5D4C8 0%, #E8A080 45%, #C05040 100%)",
  },
  regulation: {
    id: "regulation",
    label: "Regulation",
    description: "Balanced neutral colours",
    accent: "#9A9AAA",
    gradient: "linear-gradient(135deg, #D8D8E0 0%, #9A9AAA 50%, #606070 100%)",
  },
  performance: {
    id: "performance",
    label: "Performance",
    description: "Sharper, energetic colours",
    accent: "#7080E8",
    gradient: "linear-gradient(135deg, #B0C0FF 0%, #7080E8 50%, #3040A0 100%)",
  },
};

export const EXAMPLE_SESSIONS = [
  { id: "hospital-prep", title: "Session 1", category: "care", duration: "12 min" },
  { id: "recovery", title: "Session 2", category: "care", duration: "15 min" },
  { id: "pregnancy", title: "Session 3", category: "care", duration: "18 min" },
  { id: "rest", title: "Session 4", category: "care", duration: "20 min" },
  { id: "calm", title: "Session 5", category: "regulation", duration: "10 min" },
  { id: "reset", title: "Session 6", category: "regulation", duration: "8 min" },
  { id: "overwhelm", title: "Session 7", category: "regulation", duration: "12 min" },
  { id: "anxiety", title: "Session 8", category: "regulation", duration: "14 min" },
  { id: "focus", title: "Session 9", category: "performance", duration: "15 min" },
  { id: "flow", title: "Session 10", category: "performance", duration: "18 min" },
  { id: "deep-work", title: "Session 11", category: "performance", duration: "25 min" },
  { id: "preparation", title: "Session 12", category: "performance", duration: "10 min" },
];

export function getSessionGradient(session) {
  return SESSION_CATEGORIES[session.category]?.gradient ?? SESSION_CATEGORIES.regulation.gradient;
}
