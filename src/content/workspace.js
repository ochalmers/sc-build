/**
 * Sonocea App v2.0 — workspace information architecture.
 * Page structure only; section content is added incrementally.
 */

import { FLOW_NAV_SECTIONS } from "./flows.js";

export const WORKSPACE_META = {
  product: "Sonocea App v2.0",
  versionLabel: "App v2.0",
  programme: "Design Programme",
  phase: "Phase 02",
  date: "June 2026",
};

export const PROTOTYPE_CTA = {
  label: "Open App",
  to: "/app",
};

export const WORKSPACE_PAGES = {
  overview: {
    path: "/",
    navLabel: "Overview",
    eyebrow: `${WORKSPACE_META.programme} · ${WORKSPACE_META.phase} · ${WORKSPACE_META.date}`,
    title: WORKSPACE_META.product,
    description:
      "Internal workspace for designing, prototyping and documenting the Sonocea mobile application.",
    purpose:
      "Introduce the app, provide context, link to source documentation and summarise the current state of the project.",
    introId: "overview-intro",
    sections: [
      { id: "overview-documents", label: "Documents", title: "Source Documents" },
      { id: "overview-product", label: "Product", title: "Product Overview" },
      { id: "overview-roles", label: "Users", title: "User Types" },
      { id: "overview-focus", label: "Focus", title: "Current Build Focus" },
      { id: "overview-workspace", label: "Workspace", title: "Workspace Structure" },
      { id: "overview-next", label: "Next", title: "What's Next" },
    ],
  },

  plan: {
    path: "/plan",
    navLabel: "Plan",
    eyebrow: "Design",
    title: "Design Delivery Roadmap",
    description:
      "Engineering handoff milestones — what design deliverables are coming, when they land, and what they unblock.",
    purpose: "Communicate design deliverables and engineering handoff milestones.",
    introId: "plan-intro",
    sections: [
      { id: "plan-current", label: "Current", title: "Current Phase" },
      { id: "plan-phases", label: "Phases", title: "Upcoming Phases" },
      { id: "plan-checkpoints", label: "Gates", title: "Phase Gates" },
      { id: "plan-deliverables", label: "Deliverables", title: "Design Deliverables" },
      { id: "plan-sequence", label: "Sequence", title: "Delivery Sequence" },
      { id: "plan-priorities", label: "Priorities", title: "Current Priorities" },
    ],
  },

  flows: {
    path: "/flows",
    navLabel: "Flows",
    eyebrow: "UX Review",
    title: "Flows",
    description: "Invite-only listener journeys — Home and Profile bottom navigation — plus organisation and system states.",
    purpose: "Showcase complete user journeys as design review storyboards with left-hand flow navigation.",
    introId: "flows-intro",
    sections: FLOW_NAV_SECTIONS,
  },

  design: {
    path: "/design",
    navLabel: "Design",
    eyebrow: "Visual Language",
    title: "Design",
    description: "The visual language, components and screens that define the Sonocea experience.",
    purpose: "Define the visual language and UI of the application.",
    introId: "design-intro",
    sections: [
      { id: "design-system", label: "System", title: "Design System" },
      { id: "design-components", label: "Components", title: "Component Library" },
      { id: "design-catalogue", label: "Screens", title: "Screen Catalogue" },
      { id: "design-states", label: "States", title: "Interaction States" },
      { id: "design-motion", label: "Motion", title: "Motion" },
      { id: "design-accessibility", label: "A11y", title: "Accessibility" },
    ],
  },

  keyScreens: {
    path: "/key-screens",
    navLabel: "Key Screens",
    eyebrow: "Wireframe Exploration",
    title: "Key Screens",
    description:
      "Every canonical screen with room for five layout concepts — plus five proposals for core app navigation.",
    purpose:
      "Compare wireframe directions side by side before committing to hi-fi design.",
    introId: "key-screens-intro",
    sections: [
      { id: "key-screens-nav", label: "Navigation", title: "Core Navigation Concepts" },
      { id: "key-screens-tier-1", label: "Tier 1", title: "Core Product" },
      { id: "key-screens-tier-2", label: "Tier 2", title: "Getting Users In" },
      { id: "key-screens-tier-3", label: "Tier 3", title: "Public Experience" },
      { id: "key-screens-tier-4", label: "Tier 4", title: "Supporting" },
    ],
  },

  copy: {
    path: "/copy",
    navLabel: "Copy",
    eyebrow: "Content Ops",
    title: "Marketing Copy Breakdown",
    description: "Flow-by-flow messaging, CTA intent, and review status for launch copy.",
    purpose: "Align product, design, and marketing on screen-level messaging before ship.",
    introId: "copy-intro",
    sections: [
      { id: "copy-public-visitor", label: "Public Visitor", title: "Public Visitor Funnel" },
      { id: "copy-listener-onboarding", label: "Listener", title: "Invitation + Onboarding" },
    ],
  },

  references: {
    path: "/references",
    navLabel: "References",
    eyebrow: "Supporting Material",
    title: "References",
    description: "Curated Mobbin screens that directly inform product decisions.",
    purpose: "Collect supporting material used throughout the project.",
    introId: "references-intro",
    sections: [
      { id: "refs-app-entry", label: "App Entry", title: "App Entry" },
      { id: "refs-authentication", label: "Authentication", title: "Authentication" },
      { id: "refs-onboarding", label: "Onboarding", title: "Listener Onboarding" },
      { id: "refs-listener", label: "Listener", title: "Listener Experience" },
      { id: "refs-public-visitor", label: "Public Visitor", title: "Public Visitor" },
      { id: "refs-support", label: "Support", title: "Support" },
    ],
  },

  prototype: {
    path: "/prototype",
    navLabel: "Prototype",
    eyebrow: "Interactive",
    title: "Prototype",
    description: "Interactive prototype of the Sonocea mobile application.",
    purpose: "Explore the product experience in a working prototype.",
    introId: "prototype-intro",
    sections: [],
  },
};

export function getPageByPath(pathname) {
  return Object.values(WORKSPACE_PAGES).find((page) => page.path === pathname) ?? null;
}

export function getChaptersForPage(page) {
  if (!page) return [];
  return [
    {
      id: page.introId.replace(/^#/, ""),
      label: "Introduction",
      shortLabel: "Intro",
      href: `#${page.introId.replace(/^#/, "")}`,
    },
    ...page.sections.map((section) => ({
      id: section.id,
      label: section.title,
      shortLabel: section.label,
      href: `#${section.id}`,
    })),
  ];
}
