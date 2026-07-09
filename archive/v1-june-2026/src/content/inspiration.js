/**
 * Design inspiration catalogue for Sonocea v1.
 * Local screens sourced from Mobbin (Open iOS, Sep 2025).
 * Company references link to Mobbin for deeper exploration.
 */

export const INSPIRATION_META = {
  title: "Design inspiration",
  subtitle: "What we are designing — and how each reference helps",
  description:
    "Organised by Sonocea v1 design tasks from the June 2026 PRDs. Each category states what we are building, maps to PRD screens, shows archived Open iOS flows where we have them, and lists cross-app examples with explicit relevance notes.",
  sourceNote:
    "Primary local archive: Open iOS (Sep 2025 Mobbin export, 210 screens). Cross-app links open Mobbin — use Mobbin MCP in Cursor to pull more on demand.",
};

export const INSPIRATION_NAV = [
  { label: "Overview", href: "#inspiration-intro" },
  { label: "PV · Discover sample", href: "#inspiration-pv-discover" },
  { label: "PV · Science", href: "#inspiration-pv-science" },
  { label: "Invite & access", href: "#inspiration-access" },
  { label: "Onboarding & SAT", href: "#inspiration-onboarding" },
  { label: "Neurotype", href: "#inspiration-personalization" },
  { label: "Sessions library", href: "#inspiration-library" },
  { label: "Session detail", href: "#inspiration-detail" },
  { label: "Player & timer", href: "#inspiration-player" },
  { label: "Post-session", href: "#inspiration-feedback" },
  { label: "Protocol & plan", href: "#inspiration-protocol" },
  { label: "Profile & settings", href: "#inspiration-profile" },
  { label: "Commerce", href: "#inspiration-commerce" },
  { label: "Integrations", href: "#inspiration-integrations" },
  { label: "Motion & visual", href: "#inspiration-visual" },
  { label: "Open · full gallery", href: "#inspiration-open-gallery" },
];

/** Build public URL for a local Open screenshot (Mobbin export). */
export function openScreenUrl(index) {
  return `/inspiration/open-ios-sep-2025/Open%20ios%20Sep%202025%20${index}.png`;
}

/** Named step-by-step flows — Open iOS screen indices with labels. */
export const OPEN_REFERENCE_FLOWS = {
  "inspiration-pv-discover": [
    {
      id: "open-headphone-prep",
      title: "Headphone & environment prep",
      summary:
        "Pre-play checklist before audio starts — maps to Public Visitor headphone prompt and Listener session prep.",
      sonoceaTask: "PV-02 headphone prompt · pre-session environment cue",
      steps: [
        { index: 1, label: "Editorial splash", detail: "Full-bleed portrait sets tone" },
        { index: 46, label: "Today home", detail: "Blurred hero before play" },
        { index: 72, label: "Timer setup", detail: "Duration before immersive mode" },
      ],
    },
    {
      id: "open-sample-to-home",
      title: "Daily session entry → play",
      summary:
        "One primary session per day with clear CTA — parallel to Public Visitor 5-minute reset entry.",
      sonoceaTask: "PV-02 5-minute reset · Listener library home",
      steps: [
        { index: 46, label: "Today", detail: "Daily meditation hero" },
        { index: 47, label: "Session preview", detail: "Instructor + duration" },
        { index: 76, label: "Active timer", detail: "02:57 countdown" },
        { index: 78, label: "Complete", detail: "Session summary" },
      ],
    },
  ],
  "inspiration-pv-science": [
    {
      id: "open-goals-education",
      title: "Goals & intent education",
      summary:
        "Progressive intent capture with reassurance copy — model for SAT™ science education without lecture carousels.",
      sonoceaTask: "PV-03 science home · Listener onboarding science",
      steps: [
        { index: 16, label: "Goal intro", detail: "Why we ask" },
        { index: 17, label: "Primary goal", detail: "Single select" },
        { index: 13, label: "Goals", detail: "Intent selection" },
        { index: 14, label: "Experience level", detail: "Practice history" },
      ],
    },
  ],
  "inspiration-access": [
    {
      id: "open-brand-splash",
      title: "Brand splash → account entry",
      summary: "Editorial hero imagery, spaced logotype, and restrained outline CTAs — premium first impression without clutter.",
      steps: [
        { index: 0, label: "Splash", detail: "Minimal logotype on black" },
        { index: 1, label: "Editorial splash", detail: "Full-bleed portrait photography" },
        { index: 2, label: "Auth methods", detail: "Apple ID and email paths" },
      ],
    },
    {
      id: "open-email-signup",
      title: "Email signup path",
      summary: "Single-field forms with underline inputs, floating next button, and inline validation — clinical calm over wizard steps.",
      steps: [
        { index: 3, label: "Enter email", detail: "Empty field state" },
        { index: 4, label: "Email validated", detail: "Checkmark + filled address" },
        { index: 6, label: "Create password", detail: "Minimum length hint" },
        { index: 8, label: "Name entry", detail: "First and last name fields" },
        { index: 10, label: "Username", detail: "@handle with availability check" },
      ],
    },
  ],
  "inspiration-onboarding": [
    {
      id: "open-profile-onboarding",
      title: "Profile setup & preferences",
      summary: "Progressive identity capture after auth — name, username, and goal-setting without carousel overload.",
      steps: [
        { index: 8, label: "Name", detail: "First / last name" },
        { index: 9, label: "Profile photo", detail: "Avatar selection" },
        { index: 10, label: "Username", detail: "@handle" },
        { index: 11, label: "Location", detail: "Optional place tag" },
        { index: 12, label: "Notifications", detail: "Permission prompt" },
        { index: 13, label: "Goals", detail: "Intent selection" },
        { index: 14, label: "Experience level", detail: "Practice history" },
        { index: 15, label: "Ready state", detail: "Transition to app" },
      ],
    },
    {
      id: "open-paywall-onboarding",
      title: "Subscription & trial paywall",
      summary: "Annual vs monthly framing, promo codes, and benefit bullets — study restraint before Listener entitlement UX.",
      steps: [
        { index: 20, label: "Welcome", detail: "Begin CTA on black" },
        { index: 21, label: "Trial intro", detail: "Value proposition" },
        { index: 22, label: "Plan selection", detail: "Annual / monthly toggle" },
        { index: 23, label: "Benefits list", detail: "Feature bullets" },
        { index: 24, label: "Promo code", detail: "Partner code entry" },
        { index: 25, label: "Payment sheet", detail: "Apple Pay / card" },
        { index: 26, label: "Confirmation", detail: "Success state" },
        { index: 27, label: "Post-purchase", detail: "Continue into app" },
      ],
    },
    {
      id: "open-payment-setup",
      title: "Payment info capture",
      summary: "Dark-surface card form with legal links — relevant for future Listener billing surfaces.",
      steps: [
        { index: 30, label: "Add payment", detail: "Card number fields" },
        { index: 31, label: "Billing details", detail: "Address capture" },
        { index: 32, label: "Review", detail: "Summary before charge" },
        { index: 33, label: "Processing", detail: "Loading state" },
        { index: 34, label: "Complete", detail: "Confirmation" },
        { index: 35, label: "Receipt", detail: "Post-checkout" },
      ],
    },
  ],
  "inspiration-library": [
    {
      id: "open-today-home",
      title: "Today home → daily session",
      summary: "Sound-first home with blurred hero, streak tracker, and category tabs — one primary session per day.",
      steps: [
        { index: 46, label: "Today", detail: "Daily meditation hero" },
        { index: 47, label: "Session preview", detail: "Instructor + duration" },
        { index: 48, label: "Category browse", detail: "Meditate / Breathe / Move" },
        { index: 49, label: "Collection rail", detail: "Horizontal scroll" },
        { index: 50, label: "Featured program", detail: "Editorial card" },
      ],
    },
    {
      id: "open-sleep-collection",
      title: "Sleep collection & sort",
      summary: "Curated collection header, sort chip, and scannable session rows with tag, duration, and teacher.",
      steps: [
        { index: 90, label: "Collection search", detail: "User lookup" },
        { index: 91, label: "Recommended", detail: "Social discovery" },
        { index: 92, label: "Friends list", detail: "Follow suggestions" },
        { index: 100, label: "Sleep collection", detail: "20 sessions listed" },
        { index: 101, label: "Session row", detail: "Tag + duration + teacher" },
        { index: 102, label: "Sort options", detail: "Duration / teacher" },
      ],
    },
    {
      id: "open-filter-search",
      title: "Filter sheet → results",
      summary: "Teacher chips, intensity filters, and result count — curated discovery without infinite scroll.",
      steps: [
        { index: 120, label: "Filter sheet", detail: "Breathe / Move / Meditate tabs" },
        { index: 121, label: "Search results", detail: "3 results with chips" },
        { index: 122, label: "Result detail", detail: "Session metadata" },
        { index: 123, label: "Teacher filter", detail: "Multi-select pills" },
        { index: 124, label: "Duration filter", detail: "Time range" },
        { index: 125, label: "Applied filters", detail: "Active chip row" },
      ],
    },
  ],
  "inspiration-detail": [
    {
      id: "open-program-detail",
      title: "Program overview",
      summary: "Hero imagery, social proof, tag chips, and start CTA — sets expectations before play.",
      steps: [
        { index: 130, label: "Program hero", detail: "Stress Cleanse program" },
        { index: 45, label: "Challenge summary", detail: "Daily practice stats" },
        { index: 120, label: "Session filter", detail: "Category tabs" },
        { index: 121, label: "Session list", detail: "Filtered results" },
        { index: 122, label: "Session row", detail: "Thumbnail + metadata" },
      ],
    },
    {
      id: "open-session-detail",
      title: "Session detail & actions",
      summary: "Download, favourite, share, and teacher row — offline and social affordances on detail.",
      steps: [
        { index: 47, label: "Session card", detail: "Hero + play" },
        { index: 48, label: "Metadata", detail: "Tags and description" },
        { index: 49, label: "Teacher row", detail: "Instructor profile" },
        { index: 50, label: "Related", detail: "Similar sessions" },
        { index: 51, label: "Download", detail: "Offline action" },
        { index: 52, label: "Share sheet", detail: "Social export" },
      ],
    },
  ],
  "inspiration-player": [
    {
      id: "open-meditation-timer",
      title: "Meditation timer setup → playback",
      summary: "Breathwork / meditation tabs, duration picker, chime settings, and minimal full-screen timer.",
      sonoceaTask: "PRD player · timer setup, soundscape pick, full-screen playback",
      steps: [
        { index: 72, label: "Timer setup", detail: "3 min picker + settings" },
        { index: 73, label: "Start & end", detail: "Chime selection" },
        { index: 74, label: "Interval bells", detail: "Bottom sheet options" },
        { index: 75, label: "Soundscape", detail: "Ambient sound pick" },
        { index: 76, label: "Active timer", detail: "02:57 countdown" },
        { index: 77, label: "Paused", detail: "Resume control" },
        { index: 78, label: "Complete", detail: "Session summary" },
      ],
    },
    {
      id: "open-breathwork-player",
      title: "Breathwork session controls",
      summary: "Guided breath pacing with minimal chrome — sound leads, UI recedes.",
      steps: [
        { index: 60, label: "Breathwork tab", detail: "Mode switcher" },
        { index: 61, label: "Pattern select", detail: "Rhythm options" },
        { index: 62, label: "Inhale phase", detail: "Visual cue" },
        { index: 63, label: "Hold phase", detail: "Timer ring" },
        { index: 64, label: "Exhale phase", detail: "Pacing animation" },
      ],
    },
  ],
  "inspiration-personalization": [
    {
      id: "open-goal-quiz",
      title: "Goals & experience questionnaire",
      summary: "Multi-step intent capture with progress — model for neurotype questionnaire pacing.",
      steps: [
        { index: 16, label: "Goal intro", detail: "Why we ask" },
        { index: 17, label: "Primary goal", detail: "Single select" },
        { index: 18, label: "Secondary goals", detail: "Multi select" },
        { index: 19, label: "Time commitment", detail: "Duration preference" },
        { index: 28, label: "Experience", detail: "Practice history" },
        { index: 29, label: "Recommendations", detail: "Personalized plan" },
      ],
    },
    {
      id: "open-content-personalization",
      title: "Content personalization signals",
      summary: "Adaptive recommendations based on listening history and preferences.",
      steps: [
        { index: 86, label: "For you", detail: "Personalized rail" },
        { index: 87, label: "Mood pick", detail: "Intent chips" },
        { index: 88, label: "Time of day", detail: "Morning / evening" },
        { index: 89, label: "Suggested plan", detail: "Weekly schedule" },
      ],
    },
  ],
  "inspiration-profile": [
    {
      id: "open-profile-hub",
      title: "Profile hub & social",
      summary: "Life score, offline mode, guest pass, and follower stats — sparse but premium account surface.",
      steps: [
        { index: 170, label: "Profile home", detail: "Stats + quick actions" },
        { index: 171, label: "Life score", detail: "Readiness radar" },
        { index: 172, label: "Recents", detail: "Listening history" },
        { index: 173, label: "Favourites", detail: "Saved sessions" },
        { index: 174, label: "Guest pass", detail: "Invite sharing" },
        { index: 175, label: "Achievements", detail: "Milestone grid" },
      ],
    },
    {
      id: "open-settings",
      title: "Settings & account",
      summary: "Sparse settings hierarchy — listeners are here to listen, not configure.",
      steps: [
        { index: 130, label: "Settings entry", detail: "From profile" },
        { index: 131, label: "Account", detail: "Email + password" },
        { index: 132, label: "Notifications", detail: "Push toggles" },
        { index: 133, label: "Downloads", detail: "Offline storage" },
        { index: 140, label: "Support", detail: "Help centre link" },
        { index: 141, label: "About", detail: "Version + legal" },
        { index: 142, label: "Sign out", detail: "Account exit" },
      ],
    },
  ],
  "inspiration-commerce": [
    {
      id: "open-credits-wallet",
      title: "Credits wallet & purchase",
      summary: "Credit balance, single-credit purchase sheet, and cart — parallel to Partner seat pools.",
      steps: [
        { index: 145, label: "Credit product", detail: "$36 single credit" },
        { index: 146, label: "Details expanded", detail: "Guest allowance" },
        { index: 147, label: "Add to cart", detail: "Cart sheet" },
        { index: 148, label: "Cart review", detail: "Line items" },
        { index: 149, label: "Checkout", detail: "Payment method" },
        { index: 150, label: "Confirmation", detail: "Purchase complete" },
        { index: 151, label: "Wallet balance", detail: "Credits remaining" },
        { index: 152, label: "Redeem", detail: "Apply credit" },
        { index: 153, label: "Gift credit", detail: "Share with guest" },
        { index: 154, label: "History", detail: "Transaction log" },
      ],
    },
    {
      id: "open-subscription-commerce",
      title: "Subscription management",
      summary: "Plan changes, renewal dates, and cancellation paths.",
      steps: [
        { index: 20, label: "Plan intro", detail: "Trial framing" },
        { index: 22, label: "Plan picker", detail: "Annual vs monthly" },
        { index: 25, label: "Payment", detail: "Apple Pay sheet" },
        { index: 30, label: "Card entry", detail: "Manual payment" },
        { index: 35, label: "Active plan", detail: "Renewal date" },
      ],
    },
  ],
  "inspiration-integrations": [
    {
      id: "open-health-integrations",
      title: "Apple Health & wearables",
      summary: "Permission screens, device pairing, and sync status — trust-building for future health adjacency.",
      steps: [
        { index: 195, label: "Location", detail: "Place input" },
        { index: 196, label: "Health connect", detail: "Apple Health prompt" },
        { index: 197, label: "Permissions", detail: "Data types list" },
        { index: 198, label: "Oura pairing", detail: "Device connect" },
        { index: 199, label: "Strava link", detail: "Third-party OAuth" },
        { index: 200, label: "Sync status", detail: "Connected devices" },
        { index: 201, label: "Data sharing", detail: "Privacy controls" },
        { index: 202, label: "Disconnect", detail: "Revoke access" },
        { index: 203, label: "Biometrics card", detail: "Profile promo" },
        { index: 204, label: "Sleep tracking", detail: "Oura announcement" },
      ],
    },
  ],
  "inspiration-feedback": [
    {
      id: "open-daily-practice",
      title: "Daily practice completion",
      summary:
        "Streak stats, quote cards, and share/done actions — post-session reflection without gamification noise.",
      sonoceaTask: "PV-02 reflection remeasure · Listener post-session feedback",
      steps: [
        { index: 70, label: "Quote card", detail: "Daily inspiration" },
        { index: 45, label: "Stats summary", detail: "Streak + minutes" },
        { index: 58, label: "Share card", detail: "Social export" },
        { index: 59, label: "Done state", detail: "Return to home" },
      ],
    },
    {
      id: "open-achievement-milestone",
      title: "Milestone & activity feed",
      summary:
        "Grouped activity and achievement badges — study restraint for optional Listener progress cues.",
      sonoceaTask: "Listener feedback · optional streak surfaces",
      steps: [
        { index: 55, label: "Notifications", detail: "Activity feed" },
        { index: 56, label: "Full feed", detail: "Grouped by time" },
        { index: 57, label: "Achievement", detail: "Milestone badge" },
      ],
    },
  ],
  "inspiration-protocol": [
    {
      id: "open-challenge-program",
      title: "Challenge program & daily practice",
      summary:
        "Assigned multi-day program with daily stats — maps to Partner-assigned Regiment / Protocol.",
      sonoceaTask: "Listener assigned Protocol · daily cadence",
      steps: [
        { index: 45, label: "Challenge summary", detail: "Daily practice stats" },
        { index: 130, label: "Program hero", detail: "Stress Cleanse program" },
        { index: 46, label: "Today", detail: "Daily session entry" },
        { index: 78, label: "Complete", detail: "Session done" },
      ],
    },
    {
      id: "open-weekly-plan",
      title: "Personalized weekly plan",
      summary:
        "Recommended plan from questionnaire answers — adaptive schedule without infinite content.",
      sonoceaTask: "Listener Protocol view · neurotype-led plan",
      steps: [
        { index: 29, label: "Recommendations", detail: "Personalized plan" },
        { index: 89, label: "Suggested plan", detail: "Weekly schedule" },
        { index: 50, label: "Featured program", detail: "Editorial card" },
      ],
    },
  ],
  "inspiration-visual": [
    {
      id: "open-dark-editorial",
      title: "Dark editorial surfaces",
      summary: "Full-bleed photography, spaced typography, and pill CTAs — primary tonal reference for Sonocea.",
      steps: [
        { index: 0, label: "Black splash", detail: "Logotype only" },
        { index: 1, label: "Portrait hero", detail: "Macro photography" },
        { index: 46, label: "Blurred today", detail: "Ambient home" },
        { index: 80, label: "Soundscape", detail: "Generative visual" },
        { index: 81, label: "Move session", detail: "Performance imagery" },
        { index: 82, label: "Breathe visual", detail: "Breath animation" },
        { index: 83, label: "Meditate visual", detail: "Calm gradient" },
        { index: 84, label: "Player ambient", detail: "Full-screen art" },
        { index: 85, label: "Session art", detail: "Editorial thumbnail" },
      ],
    },
    {
      id: "open-typography-cta",
      title: "Typography & CTA patterns",
      summary: "Outline pills, floating arrows, and uppercase labels — reusable component vocabulary.",
      steps: [
        { index: 2, label: "Outline CTA", detail: "Create with Apple" },
        { index: 3, label: "Underline input", detail: "Single-field form" },
        { index: 6, label: "Floating next", detail: "Circular arrow" },
        { index: 20, label: "Begin pill", detail: "Primary action" },
        { index: 30, label: "Legal links", detail: "Uppercase mono" },
        { index: 35, label: "Confirmation", detail: "Success typography" },
      ],
    },
  ],
};

/** Overview flows shown in the page intro. */
export const OPEN_OVERVIEW_FLOWS = [
  "open-brand-splash",
  "open-sample-to-home",
  "open-profile-onboarding",
  "open-meditation-timer",
  "open-daily-practice",
  "open-credits-wallet",
];

export function getFlowById(flowId) {
  for (const flows of Object.values(OPEN_REFERENCE_FLOWS)) {
    const match = flows.find((f) => f.id === flowId);
    if (match) return match;
  }
  return null;
}

import { OPEN_HIGHLIGHTS } from "./inspirationHighlights.js";
import { buildInspirationCategories } from "./inspirationCategories.js";

export { OPEN_HIGHLIGHTS } from "./inspirationHighlights.js";

export const INSPIRATION_CATEGORIES = buildInspirationCategories(OPEN_HIGHLIGHTS);

/** All Open screen indices (0–209) for the full gallery. */
export const OPEN_ALL_INDICES = Array.from({ length: 210 }, (_, i) => i);

/** Mobbin search queries for bulk exploration via MCP. */
export const MOBBIN_MCP_QUERIES = [
  "nervous system check-in mood scale wellness",
  "headphones required before audio session",
  "science education article wellness app",
  "invite only app access code entry",
  "clinical health questionnaire progress bar",
  "neurotype personality quiz multi-select",
  "meditation player dark mode minimal controls",
  "post session reflection feedback emoji",
  "assigned daily protocol wellness plan",
  "session detail download offline favorite",
  "paywall annual monthly trial promo code",
  "Apple Health permissions wearable connect",
  "soundscape ambient player generative visual",
  "breathwork timer inhale exhale pacing",
];
