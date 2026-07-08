/**
 * Spectral appearance — adaptive atmospheric layers anchored on two foundations:
 * light #EDEFE8 and dark #080808. Behaviour modes (Care / Regulation / Performance)
 * compound on top; naming is behavioural, not decorative.
 */

/** Intro chips under the hero headline */
export const spectralIntroPrinciples = [
  "Adaptive intensity",
  "Soft contrast",
  "Environmental colour",
  "Sound translated visually",
  "Accessible by design",
];

/** Closing strategic principles (longer copy) */
export const spectralPrinciples = [
  {
    title: "Adaptive intensity",
    body: "Spectral energy scales with context and nervous-system state — never a fixed decorative brightness.",
  },
  {
    title: "Soft contrast",
    body: "Hierarchy stays legible without harsh edges; fatigue is treated as a design constraint.",
  },
  {
    title: "Environmental colour",
    body: "Palette behaviour mirrors light in atmosphere — diffusion, depth, and glow — not flat spot colours.",
  },
  {
    title: "Sound translated visually",
    body: "Motion and colour carry rhythm and timbre as ambient signal, not ornament.",
  },
  {
    title: "Accessible by design",
    body: "Defaults favour a wider range of sensory preferences and nervous-system conditions.",
  },
];

/** Environmental reference tiles (CSS-only studies, not brand artwork) */
export const spectralEnvironmentStudies = [
  {
    id: "ref-1",
    label: "Refracted light",
    caption: "Spectrum scattered through haze — soft bands, no hard primaries.",
    css: "linear-gradient(125deg, rgba(255,255,255,0.65) 0%, rgba(232,220,245,0.5) 35%, rgba(200,216,255,0.45) 70%, rgba(237,239,232,0.9) 100%)",
  },
  {
    id: "ref-2",
    label: "Dusk atmosphere",
    caption: "Low sun warmth meeting cool air — separation without chroma noise.",
    css: "linear-gradient(180deg, rgba(45,38,52,0.35) 0%, rgba(180,140,160,0.25) 45%, rgba(232,200,175,0.3) 85%, rgba(237,239,232,0.95) 100%)",
  },
  {
    id: "ref-3",
    label: "Oceanic depth",
    caption: "Pressure and calm — deep neutrals with restrained teal luminescence.",
    css: "radial-gradient(100% 80% at 50% 100%, rgba(100,160,155,0.35), transparent 55%), linear-gradient(185deg, #0c1010 0%, #080808 55%)",
  },
  {
    id: "ref-4",
    label: "Mineral surfaces",
    caption: "Cool stone and ash — structure without taupe lifestyle cues.",
    css: "linear-gradient(145deg, #d8dad4 0%, #c4c6be 40%, #a8aaa2 100%)",
  },
  {
    id: "ref-5",
    label: "Environmental glow",
    caption: "Light pooled in space — bloom stays diffuse and peripheral.",
    css: "radial-gradient(60% 50% at 60% 40%, rgba(245,210,230,0.5), transparent 70%), radial-gradient(80% 60% at 20% 80%, rgba(180,200,255,0.35), transparent 65%), #EDEFE8",
  },
  {
    id: "ref-6",
    label: "Spectral diffusion",
    caption: "Chroma as mist — edges dissolve before they read as UI accents.",
    css: "linear-gradient(160deg, rgba(248,230,240,0.9) 0%, rgba(220,228,255,0.75) 50%, rgba(225,240,232,0.85) 100%)",
  },
  {
    id: "ref-7",
    label: "Soft horizon",
    caption: "Air meets ground — a thin luminous band, not a stripe of accent colour.",
    css: "linear-gradient(180deg, rgba(210,218,232,0.55) 0%, rgba(237,239,232,0.95) 38%, #c8ccc4 55%, #9aa096 100%)",
  },
  {
    id: "ref-8",
    label: "Cinematic haze",
    caption: "Depth through lowering contrast — fog as spatial cue, not a grey wash.",
    css: "radial-gradient(80% 60% at 50% 40%, rgba(240,236,252,0.5), transparent 65%), linear-gradient(175deg, #b8c0c8 0%, #d8dcd6 45%, #EDEFE8 100%)",
  },
];

/** @typedef {{ name: string; hex: string }} SpectralSwatch */

/** @type {Record<"light"|"dark", {
 *   foundation: string;
 *   canvas: string;
 *   surface: string;
 *   surface2: string;
 *   text: string;
 *   textMuted: string;
 *   hairline: string;
 *   neutrals: SpectralSwatch[];
 *   spectral: SpectralSwatch[];
 *   surfaces: SpectralSwatch[];
 *   gradients: { id: string; label: string; css: string }[];
 * }>} */
export const spectralThemes = {
  light: {
    foundation: "#EDEFE8",
    canvas: "#EDEFE8",
    surface: "#F6F7F3",
    surface2: "#E4E6DE",
    text: "#161614",
    textMuted: "#5F625C",
    hairline: "rgba(22, 22, 20, 0.09)",
    neutrals: [
      { name: "Neutral 01", hex: "#FAFBF8" },
      { name: "Neutral 02", hex: "#EDEFE8" },
      { name: "Neutral 03", hex: "#DFE1D9" },
      { name: "Neutral 04", hex: "#8F928A" },
      { name: "Neutral 05", hex: "#232421" },
    ],
    spectral: [
      { name: "Spectral 01", hex: "#E2B4C0" },
      { name: "Spectral 02", hex: "#C9B6DC" },
      { name: "Spectral 03", hex: "#AEBEE0" },
      { name: "Spectral 04", hex: "#9ECDC4" },
      { name: "Spectral 05", hex: "#D8C8E8" },
      { name: "Spectral 06", hex: "#C8D0DC" },
    ],
    surfaces: [
      { name: "Surface 01", hex: "#D8DBD3" },
      { name: "Surface 02", hex: "#CED1C8" },
      { name: "Surface 03", hex: "#C2C4BC" },
    ],
    gradients: [
      {
        id: "a",
        label: "Gradient A",
        css: "linear-gradient(135deg, #F2E8EF 0%, #E2E2F4 42%, #DCE8F8 100%)",
      },
      {
        id: "b",
        label: "Gradient B",
        css: "linear-gradient(145deg, #EDEADF 0%, #E8E4EE 50%, #E4EEE8 100%)",
      },
      {
        id: "c",
        label: "Gradient C",
        css: "linear-gradient(165deg, #DDE8EC 0%, #E8EBE4 55%, #EDEFE8 100%)",
      },
      {
        id: "d",
        label: "Gradient D",
        css: "radial-gradient(90% 70% at 80% 20%, rgba(220,200,235,0.45), transparent 60%), linear-gradient(175deg, #F4F5F0 0%, #EDEFE8 100%)",
      },
      {
        id: "e",
        label: "Gradient E",
        css: "linear-gradient(125deg, #EFE8F4 0%, #E4ECF2 45%, #E9EEE6 100%)",
      },
    ],
  },
  dark: {
    foundation: "#080808",
    canvas: "#080808",
    surface: "#0D0D0D",
    surface2: "#141414",
    text: "#EEEEE9",
    textMuted: "#94948C",
    hairline: "rgba(238, 238, 233, 0.07)",
    neutrals: [
      { name: "Neutral 01", hex: "#030303" },
      { name: "Neutral 02", hex: "#080808" },
      { name: "Neutral 03", hex: "#121212" },
      { name: "Neutral 04", hex: "#2E2E2C" },
      { name: "Neutral 05", hex: "#B8B8B2" },
    ],
    spectral: [
      { name: "Spectral 01", hex: "#C87894" },
      { name: "Spectral 02", hex: "#A888C8" },
      { name: "Spectral 03", hex: "#8898D0" },
      { name: "Spectral 04", hex: "#6CAFA4" },
      { name: "Spectral 05", hex: "#B898D8" },
      { name: "Spectral 06", hex: "#D0A880" },
    ],
    surfaces: [
      { name: "Surface 01", hex: "#383836" },
      { name: "Surface 02", hex: "#323230" },
      { name: "Surface 03", hex: "#2A2A28" },
    ],
    gradients: [
      {
        id: "a",
        label: "Gradient A",
        css: [
          "radial-gradient(100% 85% at 25% 18%, rgba(200, 120, 148, 0.22), transparent 58%)",
          "radial-gradient(90% 75% at 78% 28%, rgba(140, 120, 200, 0.18), transparent 55%)",
          "linear-gradient(185deg, #0A0A0A 0%, #080808 100%)",
        ].join(", "),
      },
      {
        id: "b",
        label: "Gradient B",
        css: [
          "radial-gradient(95% 70% at 50% 95%, rgba(208, 168, 128, 0.14), transparent 58%)",
          "linear-gradient(188deg, #0C0C0C 0%, #080808 100%)",
        ].join(", "),
      },
      {
        id: "c",
        label: "Gradient C",
        css: [
          "radial-gradient(85% 65% at 12% 88%, rgba(108, 175, 164, 0.16), transparent 58%)",
          "linear-gradient(178deg, #090909 0%, #050505 100%)",
        ].join(", "),
      },
      {
        id: "d",
        label: "Gradient D",
        css: [
          "radial-gradient(110% 90% at 72% 12%, rgba(184, 152, 216, 0.18), transparent 58%)",
          "linear-gradient(180deg, #0A0A0A 0%, #080808 100%)",
        ].join(", "),
      },
      {
        id: "e",
        label: "Gradient E",
        css: [
          "radial-gradient(75% 55% at 42% 100%, rgba(232, 200, 210, 0.12), transparent 60%)",
          "linear-gradient(176deg, #0B0B0B 0%, #080808 100%)",
        ].join(", "),
      },
    ],
  },
};
