import {
  LOUGHBOROUGH_LOGO_SRC,
  NHS_LOGO_SRC,
  PNE_LOGO_SRC,
  SONOCEA_MARK_SRC,
  WIGAN_LOGO_SRC,
} from "../../assets/brand/brandAssets.js";

/** Partner brand assets used across the end-to-end wireframe board. */
export const PARTNERS = {
  pne: {
    id: "pne",
    name: "Preston North End",
    short: "PNE",
    sector: "Performance",
    website: "pnefc.net",
    accent: "#1D2951",
    logoSrc: PNE_LOGO_SRC,
  },
  nhs: {
    id: "nhs",
    name: "University Hospital NHS Trust",
    short: "NHS",
    sector: "Healthcare",
    logoSrc: NHS_LOGO_SRC,
  },
  loughborough: {
    id: "loughborough",
    name: "Loughborough University",
    short: "LU",
    sector: "Research",
    logoSrc: LOUGHBOROUGH_LOGO_SRC,
  },
  wigan: {
    id: "wigan",
    name: "Wigan Athletic",
    short: "WAFC",
    sector: "Performance",
    logoSrc: WIGAN_LOGO_SRC,
  },
};

export const SONOCEA_MARK = SONOCEA_MARK_SRC;
