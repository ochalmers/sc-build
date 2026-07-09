/** Clinical flows include wireframed mobile paths per Appendix E */

const clinicalPlayback = (selectId = "facilitator-select") => [
  { id: "select", label: "Choose Session", detail: "Metadata guides safe, fast selection.", wireframeId: selectId },
  { id: "detail", label: "Session detail", detail: "Duration, setting, benefits, audience.", wireframeId: "detail" },
  { id: "play", label: "Press play", detail: "Minimal steps; offline tolerant.", wireframeId: "player" },
];

export const clinicalFlows = [
  {
    id: "clinical-regulation",
    title: "Regulation Companion (2.a)",
    prdScreens: "Appendix E · §2.a",
    summary: "Therapists in-session; clients listen — arrive, settle, access therapy (~15 min).",
    role: "listener",
    surface: "mobile",
    steps: [
      { id: "ctx", label: "Therapy setting", detail: "In-session regulation support.", wireframeId: "facilitator-select" },
      ...clinicalPlayback(),
    ],
    requirements: ["Short sessions ~15 min", "Easy replays", "Clear arrive/settle labels"],
  },
  {
    id: "clinical-inner-balance",
    title: "Inner Balance · therapist self-care (2.b)",
    prdScreens: "Appendix E · §2.b",
    summary: "Therapist is both Partner and Listener; between-appointment reset.",
    role: "partner",
    surface: "mobile",
    steps: [
      { id: "ctx", label: "Between sessions", detail: "Partner-only bundle, not client-visible.", wireframeId: "library-filter" },
      { id: "detail", label: "Self-care Session", detail: "Stress recovery framing.", wireframeId: "detail" },
      { id: "play", label: "Quick play", detail: "Post-shift or on-call reset.", wireframeId: "player" },
    ],
  },
  {
    id: "clinical-pre-procedure",
    title: "Pre-Procedure & Treatment Suites (2.c)",
    prdScreens: "Appendix E · §2.c",
    summary: "Hospitals — arrive, prepare, endure phases; 10–45+ min; poor network critical.",
    role: "listener",
    surface: "mobile",
    steps: [
      { id: "ctx", label: "Waiting / pre-op", detail: "Staff or patient selects phase-appropriate Session.", wireframeId: "facilitator-select" },
      { id: "detail", label: "Phase metadata", detail: "Arrive · prepare · endure tags.", wireframeId: "detail" },
      { id: "play", label: "Extended playback", detail: "Continuous mode in infusion/waiting areas.", wireframeId: "player" },
      { id: "offline", label: "Offline backup", detail: "Downloads for weak hospital Wi‑Fi.", wireframeId: "player-offline" },
    ],
    requirements: ["Hands-free simple controls", "Robust offline/poor-network"],
  },
  {
    id: "clinical-therapist-platform",
    title: "Therapist Resource Platform (2.d)",
    prdScreens: "Appendix E · §2.d",
    summary: "B2B2C bundles mixing self-care + optional shareable client content.",
    role: "partner",
    surface: "web",
    steps: [
      { id: "bundle", label: "Partner bundle", detail: "Self-care + shareable Sessions.", wireframeId: "partner-assign" },
      { id: "state-menu", label: "State menu (concept)", detail: "Calm, Reset, Focus, Restore atop library.", wireframeId: "library-filter" },
      { id: "play", label: "Client Session", detail: "Shareable content to Listener device.", wireframeId: "player" },
    ],
  },
  {
    id: "clinical-neurodivergent",
    title: "Neurodivergent Series (2.e)",
    prdScreens: "Appendix E · §2.e",
    summary: "Parents, schools, clinicians — age bands and support level labeling.",
    role: "listener",
    surface: "mobile",
    steps: [
      { id: "onboard", label: "Neurotype profile", detail: "Questionnaire drives groups.", wireframeId: "neurotype" },
      { id: "library", label: "Segmented library", detail: "15 and 30 min formats.", wireframeId: "library-filter" },
      ...clinicalPlayback("library-filter"),
    ],
    requirements: ["Clear labeling for non-technical caregivers"],
  },
  {
    id: "clinical-comfort",
    title: "Comfort & Transition Suite (2.f)",
    prdScreens: "Appendix E · §2.f",
    summary: "Palliative/hospice — ultra-slow programs, continuous duration, minimal interaction.",
    role: "listener",
    surface: "mobile",
    steps: [
      { id: "select", label: "Mode pick", detail: "Comfort, Peaceful Presence, Transition, Night.", wireframeId: "facilitator-select" },
      { id: "detail", label: "Gentle Session", detail: "Long/continuous duration tags.", wireframeId: "detail" },
      { id: "play", label: "Continuous play", detail: "Dim display; minimal screen interaction.", wireframeId: "player" },
    ],
    requirements: ["Extremely simple reliable playback", "Non-intrusive UI"],
  },
  {
    id: "clinical-postpartum",
    title: "Postpartum Bond & Regulation (2.g)",
    prdScreens: "Appendix E · §2.g",
    summary: "Feeding, skin-to-skin, nighttime settling — one-hand operation, offline homes/wards.",
    role: "listener",
    surface: "mobile",
    steps: [
      { id: "home", label: "Fast go-to", detail: "Sleep-deprived quick access.", wireframeId: "home" },
      { id: "library", label: "Context tags", detail: "Feeding, NICU bonding, night settling.", wireframeId: "library-filter" },
      { id: "play", label: "One-hand play", detail: "Reliable offline in home/ward.", wireframeId: "player-offline" },
    ],
    requirements: ["One-hand operation", "Offline reliability"],
  },
];
