export const CONCEPTS_META = {
  source: "Figma · Sonocea App (GTM)",
  designCanvas: "References · GTM marketing hero explorations",
  figmaFileKey: "lmo2RrohjwEiyyZj7SEGHM",
};

export const GTM_CONCEPTS = [
  {
    id: "concept-v01",
    label: "v01 · Baseline",
    title: "GTM hero · baseline",
    description: "Full-bleed photography, pill navigation, and centred headline — first layout pass.",
    variant: 1,
    figmaNodeId: "1:36313",
    preview: "/concepts/v01.png",
    build: "screenshot",
  },
  {
    id: "concept-v02",
    label: "v02 · Crop A",
    title: "GTM hero · crop A",
    description: "Adjusted image framing and vertical balance on the hero photography.",
    variant: 2,
    figmaNodeId: "1:36348",
    preview: "/concepts/v02.png",
    build: "screenshot",
  },
  {
    id: "concept-v03",
    label: "v03 · Crop B",
    title: "GTM hero · crop B",
    description: "Alternative crop — subject position shifted for stronger centre weight.",
    variant: 3,
    figmaNodeId: "1:36383",
    preview: "/concepts/v03.png",
    build: "screenshot",
  },
  {
    id: "concept-v04",
    label: "v04 · Crop C",
    title: "GTM hero · crop C",
    description: "Wider environmental read with softer headline contrast.",
    variant: 4,
    figmaNodeId: "1:36416",
    preview: "/concepts/v04.png",
    build: "screenshot",
  },
  {
    id: "concept-v05",
    label: "v05 · Crop D",
    title: "GTM hero · crop D",
    description: "Tighter portrait crop — headphones and expression dominate the frame.",
    variant: 5,
    figmaNodeId: "1:36432",
    preview: "/concepts/v05.png",
    build: "screenshot",
  },
  {
    id: "concept-v06",
    label: "v06 · Glitch slice",
    title: "GTM hero · glitch slice",
    description:
      "Selected direction — vertical slice distortion on the left, Applications axis label, and full marketing copy stack.",
    variant: 6,
    figmaNodeId: "1:36487",
    preview: "/concepts/v06.png",
    build: "live",
    glitch: true,
  },
  {
    id: "concept-v07",
    label: "v07 · Glitch alt",
    title: "GTM hero · glitch alt",
    description: "Alternate glitch treatment and image balance on the slice motif.",
    variant: 7,
    figmaNodeId: "1:36523",
    preview: "/concepts/v07.png",
    build: "screenshot",
    glitch: true,
  },
];

export const CONCEPTS_CHAPTERS = [
  { label: "Overview", href: "#concepts-intro" },
  ...GTM_CONCEPTS.map((concept) => ({
    label: concept.label,
    href: `#${concept.id}`,
  })),
];
