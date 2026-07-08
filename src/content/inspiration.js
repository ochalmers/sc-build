/**
 * Design inspiration catalogue for Sonocea v1.
 * Local screens sourced from Mobbin (Open iOS, Sep 2025).
 * Company references link to Mobbin for deeper exploration.
 */

export const INSPIRATION_META = {
  title: "Design inspiration",
  subtitle: "Curated references for sound-first, invite-only listening",
  description:
    "210 Open iOS screens archived locally and mapped to Sonocea PRD surfaces — scroll full flows below without leaving this page. Cross-app patterns from Calm, Endel, Oura, and others are listed as secondary Mobbin links.",
  sourceNote:
    "Primary reference: Open (Sep 2025 Mobbin export). Use Mobbin MCP in Cursor to pull additional apps on demand.",
};

export const INSPIRATION_NAV = [
  { label: "Overview", href: "#inspiration-intro" },
  { label: "Splash & access", href: "#inspiration-access" },
  { label: "Onboarding & education", href: "#inspiration-onboarding" },
  { label: "Session library", href: "#inspiration-library" },
  { label: "Session detail", href: "#inspiration-detail" },
  { label: "Player & timer", href: "#inspiration-player" },
  { label: "Personalization", href: "#inspiration-personalization" },
  { label: "Profile & settings", href: "#inspiration-profile" },
  { label: "Commerce & entitlements", href: "#inspiration-commerce" },
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
      id: "open-daily-practice",
      title: "Daily practice completion",
      summary: "Streak stats, quote cards, and share/done actions — post-session reflection without gamification noise.",
      steps: [
        { index: 70, label: "Quote card", detail: "Daily inspiration" },
        { index: 45, label: "Stats summary", detail: "Streak + minutes" },
        { index: 55, label: "Notifications", detail: "Activity feed" },
        { index: 56, label: "Full feed", detail: "Grouped by time" },
        { index: 57, label: "Achievement", detail: "Milestone badge" },
        { index: 58, label: "Share card", detail: "Social export" },
        { index: 59, label: "Done state", detail: "Return to home" },
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
  "open-profile-onboarding",
  "open-today-home",
  "open-meditation-timer",
  "open-program-detail",
  "open-credits-wallet",
];

export function getFlowById(flowId) {
  for (const flows of Object.values(OPEN_REFERENCE_FLOWS)) {
    const match = flows.find((f) => f.id === flowId);
    if (match) return match;
  }
  return null;
}

/** Curated highlight screens per category (Open app indices). */
export const OPEN_HIGHLIGHTS = {
  access: [0, 1, 2, 3, 4, 5],
  onboarding: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  paywall: [20, 21, 22, 23, 24, 25, 26, 27],
  library: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102],
  detail: [45, 46, 47, 48, 49, 50, 51, 52, 120, 121, 122, 123, 124, 125],
  player: [55, 56, 57, 58, 59, 60, 70, 71, 72, 73, 74, 75, 76, 77, 78],
  profile: [130, 131, 132, 133, 140, 141, 142, 170, 171, 172, 173, 174, 175],
  commerce: [145, 146, 147, 148, 149, 150, 151, 152, 153, 154],
  integrations: [195, 196, 197, 198, 199, 200, 201, 202, 203, 204],
  visual: [30, 31, 32, 33, 34, 35, 80, 81, 82, 83, 84, 85],
};

export const INSPIRATION_CATEGORIES = [
  {
    id: "inspiration-access",
    label: "Splash & access",
    title: "Brand intro, invite, and sign-in",
    description:
      "Sonocea v1 is invite-only — first impressions must feel premium and clinical-adjacent without coldness. Study restrained splash screens, minimal auth, and partner-code entry patterns.",
    sonoceaMapping: "PRD: Splash, sign-up & login, invite redemption",
    highlights: OPEN_HIGHLIGHTS.access,
    companies: [
      {
        name: "Open",
        platform: "iOS",
        relevance: "Minimal splash, spaced logotype, outline CTAs — closest tonal match.",
        mobbinUrl: "https://mobbin.com/apps/open-7fe5d7f7/ios",
        hasLocal: true,
      },
      {
        name: "Calm",
        platform: "iOS",
        relevance: "Premium wellness onboarding and soft-gated access flows.",
        mobbinUrl: "https://mobbin.com/search/apps?q=calm",
      },
      {
        name: "Headspace",
        platform: "iOS",
        relevance: "Science-forward education woven into early access.",
        mobbinUrl: "https://mobbin.com/search/apps?q=headspace",
      },
      {
        name: "Waking Up",
        platform: "iOS",
        relevance: "Invite and subscription gating with intellectual tone.",
        mobbinUrl: "https://mobbin.com/search/apps?q=waking+up",
      },
      {
        name: "Levels",
        platform: "iOS",
        relevance: "Waitlist / invite-only health product access patterns.",
        mobbinUrl: "https://mobbin.com/search/apps?q=levels",
      },
    ],
  },
  {
    id: "inspiration-onboarding",
    label: "Onboarding & education",
    title: "Science education and first-session guidance",
    description:
      "Listeners need to understand SAT™ and how to listen effectively. Look for progressive disclosure, not lecture-heavy carousels.",
    sonoceaMapping: "PRD: Onboarding & science education, neurotype questionnaire intro",
    highlights: [...OPEN_HIGHLIGHTS.onboarding, ...OPEN_HIGHLIGHTS.paywall],
    companies: [
      {
        name: "Open",
        platform: "iOS",
        relevance: "Breathwork education and goal-setting without clutter.",
        mobbinUrl: "https://mobbin.com/apps/open-7fe5d7f7/ios",
        hasLocal: true,
      },
      {
        name: "Headspace",
        platform: "iOS",
        relevance: "Structured onboarding with persona and goal selection.",
        mobbinUrl: "https://mobbin.com/search/apps?q=headspace+onboarding",
      },
      {
        name: "Noom",
        platform: "iOS",
        relevance: "Questionnaire pacing and behavioural framing (clinical adjacency).",
        mobbinUrl: "https://mobbin.com/search/apps?q=noom",
      },
      {
        name: "Balance",
        platform: "iOS",
        relevance: "Personalization quiz leading into curated library.",
        mobbinUrl: "https://mobbin.com/search/apps?q=balance+meditation",
      },
      {
        name: "Oura",
        platform: "iOS",
        relevance: "Hardware-adjacent education and readiness language.",
        mobbinUrl: "https://mobbin.com/search/apps?q=oura",
      },
    ],
  },
  {
    id: "inspiration-library",
    label: "Session library",
    title: "Library, collections, and discovery",
    description:
      "Provisioned Sessions only — discovery must feel curated, not infinite scroll. Favour collection headers, neurotype tags, and sort/filter without marketplace noise.",
    sonoceaMapping: "PRD: Sessions library, Favorites, Groups by neurotype",
    highlights: OPEN_HIGHLIGHTS.library,
    companies: [
      {
        name: "Open",
        platform: "iOS",
        relevance: "Collection pages (Sleep, Breathe) with sort and category chips.",
        mobbinUrl: "https://mobbin.com/apps/open-7fe5d7f7/ios",
        hasLocal: true,
      },
      {
        name: "Calm",
        platform: "iOS",
        relevance: "Editorial library rails and mood-based discovery.",
        mobbinUrl: "https://mobbin.com/search/apps?q=calm+library",
      },
      {
        name: "Endel",
        platform: "iOS",
        relevance: "Soundscape modes as collection entry points.",
        mobbinUrl: "https://mobbin.com/search/apps?q=endel",
      },
      {
        name: "Brain.fm",
        platform: "iOS",
        relevance: "Focus/sleep/calm categories aligned to listener intent.",
        mobbinUrl: "https://mobbin.com/search/apps?q=brain.fm",
      },
      {
        name: "Insight Timer",
        platform: "iOS",
        relevance: "Large library organised by duration and teacher.",
        mobbinUrl: "https://mobbin.com/search/apps?q=insight+timer",
      },
      {
        name: "Spotify",
        platform: "iOS",
        relevance: "Offline/download indicators and playlist affordances.",
        mobbinUrl: "https://mobbin.com/search/apps?q=spotify",
      },
    ],
  },
  {
    id: "inspiration-detail",
    label: "Session detail",
    title: "Session overview and metadata",
    description:
      "Detail screens set expectations before play — duration, tags, description, and offline actions. Keep copy scannable; tags map to neurotype and session type.",
    sonoceaMapping: "PRD: Session overview / detail",
    highlights: OPEN_HIGHLIGHTS.detail,
    companies: [
      {
        name: "Open",
        platform: "iOS",
        relevance: "Tag chips, teacher row, download/favourite, hero imagery.",
        mobbinUrl: "https://mobbin.com/apps/open-7fe5d7f7/ios",
        hasLocal: true,
      },
      {
        name: "Calm",
        platform: "iOS",
        relevance: "Session detail with narrative description blocks.",
        mobbinUrl: "https://mobbin.com/search/apps?q=calm+meditation",
      },
      {
        name: "Ten Percent Happier",
        platform: "iOS",
        relevance: "Teacher-forward metadata and course context.",
        mobbinUrl: "https://mobbin.com/search/apps?q=ten+percent+happier",
      },
      {
        name: "Apple Music",
        platform: "iOS",
        relevance: "Album/episode detail hierarchy and play CTA placement.",
        mobbinUrl: "https://mobbin.com/search/apps?q=apple+music",
      },
    ],
  },
  {
    id: "inspiration-player",
    label: "Player & timer",
    title: "Full-screen player, timers, and session controls",
    description:
      "Sound leads — UI chrome should recede during playback. Study timer pickers, repeat modes, and ambient visual treatments behind controls.",
    sonoceaMapping: "PRD: Player (controls, progress, repeat, sound blends)",
    highlights: OPEN_HIGHLIGHTS.player,
    companies: [
      {
        name: "Open",
        platform: "iOS",
        relevance: "Meditation timer, breathwork/meditation tabs, minimal play control.",
        mobbinUrl: "https://mobbin.com/apps/open-7fe5d7f7/ios",
        hasLocal: true,
      },
      {
        name: "Endel",
        platform: "iOS",
        relevance: "Ambient full-screen player with generative visuals.",
        mobbinUrl: "https://mobbin.com/search/apps?q=endel+player",
      },
      {
        name: "Brain.fm",
        platform: "iOS",
        relevance: "Science-backed session player with minimal distraction.",
        mobbinUrl: "https://mobbin.com/search/apps?q=brain.fm",
      },
      {
        name: "Spotify",
        platform: "iOS",
        relevance: "Now playing sheet, scrubber, and repeat/shuffle patterns.",
        mobbinUrl: "https://mobbin.com/search/apps?q=spotify+player",
      },
      {
        name: "Oak",
        platform: "iOS",
        relevance: "Ultra-minimal breathing timer — regulation mode reference.",
        mobbinUrl: "https://mobbin.com/search/apps?q=oak+meditation",
      },
    ],
  },
  {
    id: "inspiration-personalization",
    label: "Personalization",
    title: "Neurotype, goals, and adaptive recommendations",
    description:
      "Neurotype questionnaire and recommendation logic need trustworthy UI — not astrology. Favour clinical calm over gamified quizzes.",
    sonoceaMapping: "PRD: Neurotype questionnaire, Groups, recommendations",
    highlights: [16, 17, 18, 19, 28, 29, 86, 87, 88, 89],
    companies: [
      {
        name: "Balance",
        platform: "iOS",
        relevance: "Daily personalization and plan adaptation.",
        mobbinUrl: "https://mobbin.com/search/apps?q=balance+meditation",
      },
      {
        name: "Noom",
        platform: "iOS",
        relevance: "Multi-step questionnaire with progress and reassurance.",
        mobbinUrl: "https://mobbin.com/search/apps?q=noom+quiz",
      },
      {
        name: "Whoop",
        platform: "iOS",
        relevance: "Readiness scoring and strain language (performance mode).",
        mobbinUrl: "https://mobbin.com/search/apps?q=whoop",
      },
      {
        name: "Oura",
        platform: "iOS",
        relevance: "Readiness / sleep score presentation — care mode adjacency.",
        mobbinUrl: "https://mobbin.com/search/apps?q=oura+readiness",
      },
      {
        name: "Headspace",
        platform: "iOS",
        relevance: "Goal-based plan selection post-onboarding.",
        mobbinUrl: "https://mobbin.com/search/apps?q=headspace+personalization",
      },
    ],
  },
  {
    id: "inspiration-profile",
    label: "Profile & settings",
    title: "Account, support, and about",
    description:
      "About Sonocea, feedback, and support must feel accessible but premium. Settings should be sparse — listeners are here to listen, not configure.",
    sonoceaMapping: "PRD: About, Feedback, Support, account settings",
    highlights: OPEN_HIGHLIGHTS.profile,
    companies: [
      {
        name: "Open",
        platform: "iOS",
        relevance: "Profile, recents/favourites, sparse settings hierarchy.",
        mobbinUrl: "https://mobbin.com/apps/open-7fe5d7f7/ios",
        hasLocal: true,
      },
      {
        name: "Calm",
        platform: "iOS",
        relevance: "Account settings and subscription management.",
        mobbinUrl: "https://mobbin.com/search/apps?q=calm+settings",
      },
      {
        name: "Headspace",
        platform: "iOS",
        relevance: "Help centre and content preference settings.",
        mobbinUrl: "https://mobbin.com/search/apps?q=headspace+settings",
      },
      {
        name: "Linear",
        platform: "iOS",
        relevance: "Premium settings density and typography (supporting reference).",
        mobbinUrl: "https://mobbin.com/search/apps?q=linear",
      },
    ],
  },
  {
    id: "inspiration-commerce",
    label: "Commerce & entitlements",
    title: "Paywalls, credits, and partner provisioning",
    description:
      "v1 billing is Partner-driven, but Listener-facing entitlement UX still matters. Study paywall restraint, credit wallets, and checkout sheets.",
    sonoceaMapping: "PRD: Partner bundles, seat pools (Listener-facing entitlement cues)",
    highlights: OPEN_HIGHLIGHTS.commerce,
    companies: [
      {
        name: "Open",
        platform: "iOS",
        relevance: "Annual/monthly paywall, promo code, credits wallet, cart sheet.",
        mobbinUrl: "https://mobbin.com/apps/open-7fe5d7f7/ios",
        hasLocal: true,
      },
      {
        name: "Calm",
        platform: "iOS",
        relevance: "Subscription paywall and trial framing.",
        mobbinUrl: "https://mobbin.com/search/apps?q=calm+paywall",
      },
      {
        name: "ClassPass",
        platform: "iOS",
        relevance: "Credits-based access — parallel to Partner seat pools.",
        mobbinUrl: "https://mobbin.com/search/apps?q=classpass",
      },
      {
        name: "Peloton",
        platform: "iOS",
        relevance: "Membership tiers and entitlement messaging.",
        mobbinUrl: "https://mobbin.com/search/apps?q=peloton",
      },
    ],
  },
  {
    id: "inspiration-integrations",
    label: "Integrations",
    title: "Health platform permissions and data sharing",
    description:
      "Future-adjacent for v1, but permission screens set trust expectations. Study clear copy for Apple Health and wearable connections.",
    sonoceaMapping: "Future: wearable / health data adjacency",
    highlights: OPEN_HIGHLIGHTS.integrations,
    companies: [
      {
        name: "Open",
        platform: "iOS",
        relevance: "Apple Health, Strava, Oura permission flows.",
        mobbinUrl: "https://mobbin.com/apps/open-7fe5d7f7/ios",
        hasLocal: true,
      },
      {
        name: "Oura",
        platform: "iOS",
        relevance: "Health data permissions and sync status UI.",
        mobbinUrl: "https://mobbin.com/search/apps?q=oura",
      },
      {
        name: "Strava",
        platform: "iOS",
        relevance: "Third-party connection and sharing controls.",
        mobbinUrl: "https://mobbin.com/search/apps?q=strava",
      },
      {
        name: "Whoop",
        platform: "iOS",
        relevance: "Device pairing and data consent patterns.",
        mobbinUrl: "https://mobbin.com/search/apps?q=whoop",
      },
    ],
  },
  {
    id: "inspiration-visual",
    label: "Motion & visual",
    title: "Ambient backgrounds, typography, and dark surfaces",
    description:
      "Sound blends and waveform motion should support listening, not perform. Open’s dark surfaces and editorial imagery are the primary local reference.",
    sonoceaMapping: "Design system: motion principles, sound blends, behavioural modes",
    highlights: OPEN_HIGHLIGHTS.visual,
    companies: [
      {
        name: "Open",
        platform: "iOS",
        relevance: "Dark editorial imagery, spaced typography, pill CTAs.",
        mobbinUrl: "https://mobbin.com/apps/open-7fe5d7f7/ios",
        hasLocal: true,
      },
      {
        name: "Endel",
        platform: "iOS",
        relevance: "Generative ambient visuals during playback.",
        mobbinUrl: "https://mobbin.com/search/apps?q=endel",
      },
      {
        name: "Apple Music",
        platform: "iOS",
        relevance: "Full-bleed artwork and lyrics motion.",
        mobbinUrl: "https://mobbin.com/search/apps?q=apple+music",
      },
      {
        name: "Nike Run Club",
        platform: "iOS",
        relevance: "Performance-mode intensity and bold type (contrast reference).",
        mobbinUrl: "https://mobbin.com/search/apps?q=nike+run+club",
      },
    ],
  },
];

/** All Open screen indices (0–209) for the full gallery. */
export const OPEN_ALL_INDICES = Array.from({ length: 210 }, (_, i) => i);

/** Mobbin search queries for bulk exploration via MCP. */
export const MOBBIN_MCP_QUERIES = [
  "meditation player dark mode iOS",
  "audio session library wellness",
  "invite only app onboarding",
  "neurotype quiz health app",
  "breathwork timer minimal",
  "session detail download offline",
  "paywall annual monthly trial",
  "Apple Health permissions wellness",
  "soundscape ambient player",
  "clinical wellness app onboarding",
];
