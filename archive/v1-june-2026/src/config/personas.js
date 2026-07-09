import { BRAND_PERSONAS } from "../content/personas.js";

export const PERSONA_IDS = BRAND_PERSONAS.map((p) => p.id);

export const personas = Object.fromEntries(
  BRAND_PERSONAS.map((p) => [
    p.id,
    {
      id: p.id,
      label: p.title.replace(/^The /, ""),
      role: `Persona ${p.num}`,
      note: p.profile,
    },
  ]),
);

export const adoptionContexts = [
  { id: "self-serve", label: "Self-serve" },
  { id: "supported", label: "Supported / clinician-led" },
  { id: "institutional", label: "Institutional / organisational" },
];
