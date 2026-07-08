export const publicFlows = [
  {
    id: "public-marketing-landing",
    title: "Marketing landing (no playback)",
    prdScreens: "§3 Mobile · §4",
    summary: "Logo, video, SAT™ explanation — explicitly no Session listening.",
    role: "public",
    surface: "web",
    steps: [
      { id: "s1", label: "Brand & video", detail: "Inform audience of Sonocea technology.", wireframeId: "marketing" },
      { id: "s2", label: "Playback gate", detail: "No stream or download for visitors.", wireframeId: "marketing" },
    ],
    outOfScope: ["D2C open signup (v2.0)", "In-app purchase"],
  },
  {
    id: "public-cta-clinician",
    title: "Clinician access CTA",
    prdScreens: "§3 CTAs (WIP)",
    summary: "Talk to your clinician about getting access.",
    role: "public",
    surface: "web",
    steps: [
      { id: "s1", label: "Landing", detail: "Education context.", wireframeId: "marketing" },
      { id: "s2", label: "Clinician CTA", detail: "Routes to partner/clinical interest.", wireframeId: "marketing-cta" },
    ],
  },
  {
    id: "public-cta-mailing-list",
    title: "Mailing list signup",
    prdScreens: "§3 CTAs (WIP)",
    summary: "Capture interest without granting listening access.",
    role: "public",
    surface: "web",
    steps: [
      { id: "s1", label: "CTA", detail: "Email capture form.", wireframeId: "marketing-cta" },
      { id: "s2", label: "Confirmation", detail: "No app entitlement created.", wireframeId: "marketing-cta" },
    ],
  },
  {
    id: "public-partner-integration",
    title: "Partner integration CTA",
    prdScreens: "§3 CTAs (WIP)",
    summary: "Third-party partner pathways (e.g. Unyte) — exact mechanics TBD.",
    role: "public",
    surface: "web",
    steps: [
      { id: "s1", label: "Partner CTA", detail: "External or co-branded entry.", wireframeId: "marketing-cta" },
      { id: "s2", label: "Handoff", detail: "Routes to Partner provisioning, not open signup.", wireframeId: "partner-login" },
    ],
    openQuestions: ["Partner integration CTAs marked WIP in PRD"],
  },
];
