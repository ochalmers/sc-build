import { behaviourModeMeta } from "../system/modes.js";

/**
 * User stories: selecting a story sets persona, behaviour mode, optional slider hints,
 * and rationale copy. Extend this array to add scenarios.
 */
export const userStories = [
  {
    id: "clinical-recovery",
    label: "Clinical recovery",
    personaId: "supported-user",
    behaviourMode: "care",
    shortDescription:
      "A patient is guided through use in a clinical environment. The system must remove decisions and reduce cognitive effort.",
    sliderHint: { contrast: 0.2, density: 0.16, intensity: 0.15 },
    rationale: {
      state: "Vulnerable, decision-fatigued, externally paced",
      systemResponse:
        "Single primary path, minimal chrome, softened contrast, fewer controls visible at once.",
      whyItMatters:
        "Preserves agency without asking for navigation or configuration under stress.",
    },
  },
  {
    id: "sensory-overload",
    label: "Sensory overload",
    personaId: "sensitive-system",
    behaviourMode: "care",
    shortDescription:
      "A user opens Sonocea during sensory overload. The system must reduce noise and become immediately non-demanding.",
    sliderHint: { contrast: 0.18, density: 0.14, intensity: 0.12 },
    rationale: {
      state: "Overstimulated, low tolerance for visual or cognitive load",
      systemResponse:
        "Maximum whitespace, lowest contrast band, gentle motion pace, waveform de-emphasised.",
      whyItMatters:
        "Immediate calm is the product; anything sharp competes with recovery.",
    },
  },
  {
    id: "end-of-day-reset",
    label: "End of day reset",
    personaId: "regulator",
    behaviourMode: "regulation",
    shortDescription:
      "A user returns to Sonocea as part of a daily rhythm. The system must feel steady, familiar and calming.",
    sliderHint: { ...behaviourModeMeta.regulation.defaultSliders },
    rationale: {
      state: "Habitual, end-of-day transition",
      systemResponse:
        "Balanced density, neutral tone, predictable structure, steady transitions.",
      whyItMatters:
        "Rhythm builds trust; the UI should feel recognisable day to day.",
    },
  },
  {
    id: "pregnancy-consistent",
    label: "Pregnancy / consistent use",
    personaId: "supported-user",
    behaviourMode: "regulation",
    shortDescription:
      "A user returns regularly and builds trust through predictability. The system must feel stable and supportive.",
    sliderHint: { contrast: 0.46, density: 0.48, intensity: 0.3 },
    rationale: {
      state: "Longitudinal use, need for predictability",
      systemResponse:
        "Stable hierarchy, consistent labels, modest contrast shifts only when meaningful.",
      whyItMatters:
        "Trust is cumulative; unnecessary visual drift reads as unreliability.",
    },
  },
  {
    id: "post-match-reset",
    label: "Post-match reset",
    personaId: "performance-seeker",
    behaviourMode: "performance",
    shortDescription:
      "A user needs to come down from intensity quickly. The system must enable immediate entry and reduce mental noise.",
    sliderHint: { contrast: 0.8, density: 0.62, intensity: 0.58 },
    rationale: {
      state: "High arousal, need to downshift fast",
      systemResponse:
        "Direct entry, clear hierarchy, tighter layout, faster transitions, focused waveform.",
      whyItMatters:
        "Friction is cognitive load; speed to session is the outcome.",
    },
  },
  {
    id: "work-reset",
    label: "Work reset",
    personaId: "performance-seeker",
    behaviourMode: "performance",
    shortDescription:
      "A user needs to restore clarity between cognitively demanding tasks. The system must feel precise and efficient.",
    sliderHint: { contrast: 0.82, density: 0.68, intensity: 0.52 },
    rationale: {
      state: "Cognitive depletion, time-bounded context switching",
      systemResponse:
        "Efficient density, precise labels, minimal ornament, waveform reads as signal not decoration.",
      whyItMatters:
        "The session is a tool switch, not a retreat — clarity over comfort cues.",
    },
  },
];

export function getStoryById(id) {
  return userStories.find((s) => s.id === id) ?? null;
}
