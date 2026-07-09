/**
 * Chapter navigation and metadata for the Ideation page (/designs/ideation).
 * Screen-by-screen domains live in ideationDomains.js.
 */
import { IDEATION_DOMAINS } from "./ideationDomains.js";

export { IDEATION_DOMAINS };

export const IDEATION_META = {
  title: "What is the core UI?",
  subtitle: "Five directions for the provisioned Listener app",
  screenCount: IDEATION_DOMAINS.reduce((n, d) => n + d.screens.length, 0),
  variationCount: IDEATION_DOMAINS.reduce(
    (n, d) => n + d.screens.reduce((m, s) => m + s.variations.length, 0),
    0,
  ),
};

/**
 * Anchors match section ids rendered in IdeationPage.jsx.
 */
export const IDEATION_NAV = [
  { label: "Overview", shortLabel: "Overview", href: "#ideation-intro" },
  { label: "Core UI", shortLabel: "Core UI", href: "#ideation-core-ui" },
  { label: "Access & onboarding", shortLabel: "Onboard", href: "#ideation-listener-onboarding" },
  { label: "Library & discovery", shortLabel: "Library", href: "#ideation-listener-library" },
  { label: "Playback", shortLabel: "Playback", href: "#ideation-listener-playback" },
  { label: "Account & support", shortLabel: "Account", href: "#ideation-listener-account" },
  { label: "How to choose", shortLabel: "Choose", href: "#ideation-choose" },
];
