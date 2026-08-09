/**
 * Mock provisioned catalogue for the working Mobile App PRD build.
 * Only entitled Sessions appear in a Listener library (FR: provisioned catalog only).
 */

import {
  LOUGHBOROUGH_LOGO_SRC,
  NHS_LOGO_SRC,
  PNE_LOGO_SRC,
  WIGAN_LOGO_SRC,
  resolveBrandLogoSrc,
} from "../../assets/brand/brandAssets.js";

export { PNE_LOGO_SRC, resolveBrandLogoSrc };

/** Direct-access / anonymous partner id (no organisation co-brand). */
export const DIRECT_ACCESS_PARTNER_ID = "org-sonocea-direct";

export const NEUROTYPE_OPTIONS = [
  {
    id: "sensitive",
    label: "Take it gently",
    description: "Start with shorter sessions and a slower pace.",
    mode: "care",
  },
  {
    id: "regulator",
    label: "Follow the recommended path",
    description: "Work through your assigned programme step by step.",
    mode: "regulation",
  },
  {
    id: "performance",
    label: "Choose each session myself",
    description: "Browse the sessions assigned to you and decide what to listen to.",
    mode: "performance",
  },
  {
    id: "supported",
    label: "Just get me listening",
    description: "Skip the guidance and head straight to your programme.",
    mode: "regulation",
  },
];

/** About carousel - follows Welcome.
 * Sequence: Experience → Purpose → Science → Listening. */
export const ONBOARDING_ABOUT_SLIDES = [
  {
    id: "what-is",
    eyebrow: "Experience",
    title: "Listening, designed differently",
    body: "Sonocea uses structured sound to create listening experiences designed around how your nervous system responds to what you hear.",
    cta: "Next",
  },
  {
    id: "support",
    eyebrow: "Purpose",
    title: "Made for the moments that matter",
    body: "Choose sessions based on what you need, from feeling calmer and more settled to supporting focus, recovery, rest or preparation for sleep.",
    cta: "Next",
  },
  {
    id: "science",
    eyebrow: "Science",
    title: "Built on science",
    body: "Sonocea is grounded in research into how sound and the nervous system interact. Our Sonic Augmentation Technology™ uses structured sound to create listening experiences for specific states and outcomes.",
    cta: "Next",
  },
  {
    id: "ready",
    eyebrow: "Listening",
    title: "Nothing to learn. Just listen.",
    body: "You don’t need to follow instructions or get anything right. Put on your headphones, get comfortable and give the session your attention.",
    showChecklist: true,
    cta: "I'm ready",
  },
];

export const ONBOARDING_PREP_CHECKLIST = [
  {
    title: "Wear headphones",
    body: "Use both ears and choose a comfortable volume.",
  },
  {
    title: "Get comfortable",
    body: "Sit or lie somewhere you can relax.",
  },
  {
    title: "Give yourself the time",
    body: "Try to listen without interruption until the session ends.",
  },
];

/** Optional neurodivergence question - does not drive programme or session entitlement. */
export const ONBOARDING_NEURODIVERGENCE_OPTIONS = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "not-sure", label: "I’m not sure" },
  { id: "prefer-not", label: "Prefer not to say" },
];

/** @deprecated Prefer ONBOARDING_NEURODIVERGENCE_OPTIONS - kept for admin roster labels. */
export const ONBOARDING_IDENTITY_OPTIONS = ONBOARDING_NEURODIVERGENCE_OPTIONS;

/** Sensory experience - single-select, skippable. Does not infer neurodivergence. */
export const ONBOARDING_SENSORY_OPTIONS = [
  { id: "not-particularly", label: "Not particularly sensitive" },
  { id: "sometimes", label: "Sometimes sensitive" },
  { id: "quite", label: "Quite sensitive" },
  { id: "very", label: "Very sensitive" },
  { id: "varies", label: "It varies" },
];

export const ONBOARDING_SUPPORT_OPTIONS = [
  { id: "calmer", label: "Feeling calmer" },
  { id: "recovery", label: "Recovering and resetting" },
  { id: "focus", label: "Staying focused" },
  { id: "regulation", label: "Feeling more balanced" },
  { id: "sleep", label: "Sleeping better" },
  { id: "wellbeing", label: "General wellbeing" },
];

export const ONBOARDING_LISTEN_TIMES = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
  { id: "before-bed", label: "Before bed" },
  { id: "anytime", label: "No particular time" },
];

/** Context: real-life moments when support might be useful. */
export const ONBOARDING_MOOD_OPTIONS = [
  { id: "overwhelmed", label: "When I feel overwhelmed" },
  { id: "unsettled", label: "When I feel unsettled" },
  { id: "reset", label: "When I need to reset" },
  { id: "recover", label: "When I’m recovering" },
  { id: "focus", label: "When I need to focus" },
  { id: "winding-down", label: "When I’m winding down" },
  { id: "quiet", label: "When I want some time to myself" },
];

/** Rolling window for “listened / not listened” progress (PRD scope). */
export const LISTEN_STREAK_DAYS = 7;

/** Soft weekly target for programme accountability (not gamified). */
export const WEEKLY_SESSION_GOAL = 4;

/** Calendar day key - local timezone. */
export function listenDayKey(dateLike) {
  const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/** Last `n` calendar day keys ending today (oldest → newest). */
export function lastNDayKeys(n, now = Date.now()) {
  const keys = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - i);
    keys.push(listenDayKey(d));
  }
  return keys;
}

/** Short weekday labels for a day-key strip (oldest → newest). */
export function dayStripLabels(dayKeys) {
  return dayKeys.map((key) => {
    const [y, m, d] = key.split("-").map(Number);
    const date = new Date(y, m, d, 12);
    return date.toLocaleDateString("en-GB", { weekday: "narrow" });
  });
}

function completedDayKeys(listenHistory) {
  const keys = new Set();
  for (const entry of listenHistory) {
    if ((entry.progressPct ?? 0) < 90) continue;
    keys.add(listenDayKey(entry.completedAt));
  }
  return keys;
}

/**
 * Consecutive completed listening days.
 * If today has no listen yet, the streak still counts through yesterday.
 */
export function currentListenStreak(listenHistory, now = Date.now()) {
  const keys = completedDayKeys(listenHistory);
  if (!keys.size) return 0;
  const cursor = new Date(now);
  cursor.setHours(12, 0, 0, 0);
  if (!keys.has(listenDayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  while (keys.has(listenDayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Completions in the current Mon–Sun calendar week. */
export function weekCompletedCount(listenHistory, now = Date.now()) {
  const start = startOfWeekMonday(now);
  return listenHistory.filter(
    (h) => (h.progressPct ?? 0) >= 90 && h.completedAt >= start.getTime(),
  ).length;
}

function startOfWeekMonday(now = Date.now()) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset);
  return start;
}

/** Unique completed sessions ÷ programme size. */
export function programmeCompletionPct(listenHistory, library = []) {
  if (!library.length) return 0;
  const done = new Set(
    listenHistory.filter((h) => (h.progressPct ?? 0) >= 90).map((h) => h.sessionId),
  );
  const entitled = library.filter((s) => done.has(s.id)).length;
  return Math.round((entitled / library.length) * 100);
}

/** Approximate listening minutes from history (weights partial listens). */
export function totalListenMinutes(listenHistory) {
  return Math.round(
    listenHistory.reduce(
      (sum, h) => sum + ((h.durationMin ?? 0) * (h.progressPct ?? 0)) / 100,
      0,
    ),
  );
}

/** Before/after settledness check-in (1–5). Same options both times for like-for-like. */
export const FEEL_OPTIONS = [
  {
    value: 1,
    label: "Unsettled",
    description: "I feel tense, restless or overstimulated",
  },
  {
    value: 2,
    label: "A little unsettled",
    description: "Something feels slightly off",
  },
  {
    value: 3,
    label: "Neutral",
    description: "Neither particularly settled nor unsettled",
  },
  {
    value: 4,
    label: "Settled",
    description: "I feel fairly calm and comfortable",
  },
  {
    value: 5,
    label: "Very settled",
    description: "I feel calm, grounded and at ease",
  },
];

export const FEEL_LABELS = Object.fromEntries(
  FEEL_OPTIONS.map((o) => [o.value, o.label]),
);

/** Pair before/after check-ins; unpaired ratings stay as singles. */
export function pairFeelingCheckIns(feedback = []) {
  const byPair = new Map();
  const singles = [];
  for (const f of feedback) {
    if (!f.pairId) {
      singles.push({ sessionId: f.sessionId, before: f.phase === "before" ? f : null, after: f.phase === "after" ? f : null, at: f.at });
      continue;
    }
    const cur = byPair.get(f.pairId) ?? { sessionId: f.sessionId, before: null, after: null, at: f.at };
    if (f.phase === "before") cur.before = f;
    else cur.after = f;
    cur.sessionId = f.sessionId;
    cur.at = Math.max(cur.at ?? 0, f.at ?? 0);
    byPair.set(f.pairId, cur);
  }
  return [...byPair.values(), ...singles]
    .filter((row) => row.before || row.after)
    .sort((a, b) => (b.at ?? 0) - (a.at ?? 0));
}

/** Category → accent colour for session cards / detail. */
export const SESSION_CATEGORY_COLORS = {
  Calm: "#6b7c74",
  Focus: "#7a6b5d",
  Reset: "#6a5a4e",
  Rest: "#5a6570",
  Recovery: "#6a5a4e",
  Wellbeing: "#5c5a6e",
  Custom: "#6a6864",
};

export function categoryAccent(category) {
  return SESSION_CATEGORY_COLORS[category] ?? SESSION_CATEGORY_COLORS.Custom;
}

/** @deprecated Prefer ONBOARDING_ABOUT_SLIDES */
export const ONBOARDING_SLIDES = ONBOARDING_ABOUT_SLIDES.map((s) => ({
  id: s.id,
  title: s.title,
  body: s.body,
}));

export const SESSION_CATEGORIES = [
  "Calm",
  "Focus",
  "Reset",
  "Rest",
  "Recovery",
  "Wellbeing",
  "Custom",
];

/**
 * Home mode chips (Rest / Focus / Restore). Labels are org-editable via Admin;
 * ids + category buckets stay stable so session matching keeps working.
 */
export const DEFAULT_HOME_MODES = [
  {
    id: "Calm",
    label: "Rest",
    categories: ["Calm"],
    tone: "calm",
  },
  {
    id: "Focus",
    label: "Focus",
    categories: ["Focus"],
    tone: "focus",
  },
  {
    id: "Restore",
    label: "Restore",
    categories: ["Reset", "Rest", "Recovery", "Wellbeing"],
    tone: "restore",
  },
];

/** Prior labels from earlier prototypes — treat as unset so current defaults apply. */
const LEGACY_HOME_MODE_LABELS = new Set([
  "Calm",
  "Calm Session",
  "Rest Session",
]);

/** Merge partner label overrides onto the stable home-mode taxonomy. */
export function resolveHomeModes(partner) {
  const overrides = Array.isArray(partner?.homeModes) ? partner.homeModes : [];
  return DEFAULT_HOME_MODES.map((mode) => {
    const hit =
      overrides.find((o) => o?.id === mode.id) ||
      overrides.find((o) => o?.tone === mode.tone);
    const label = hit?.label?.trim();
    if (!label || LEGACY_HOME_MODE_LABELS.has(label)) return { ...mode };
    return { ...mode, label };
  });
}

export function sessionMatchesHomeMode(session, mode) {
  if (!mode?.categories?.length) return true;
  const cat = session.category ?? session.useCase;
  return mode.categories.includes(cat);
}

/** Home mode (Rest / Focus / Restore) that owns this session, if any. */
export function homeModeForSession(session, partner) {
  if (!session) return null;
  return resolveHomeModes(partner).find((m) => sessionMatchesHomeMode(session, m)) ?? null;
}

/**
 * Listener-facing session title with the home-tab label prefixed
 * e.g. "Session 1" → "Rest Session 1".
 */
export function homeModeSessionTitle(session, partner) {
  if (!session?.title) return "";
  const label = homeModeForSession(session, partner)?.label;
  if (!label) return session.title;
  if (session.title.toLowerCase().startsWith(`${label} `.toLowerCase())) {
    return session.title;
  }
  return `${label} ${session.title}`;
}

export const SESSION_TAG_OPTIONS = [
  "calm",
  "focus",
  "recovery",
  "sleep",
  "clinical",
  "performance",
  "beginner",
  "daily",
];

export const SESSION_CATALOG = [
  {
    id: "ses-arrive",
    title: "Session 1",
    durationMin: 12,
    neurotype: ["sensitive", "regulator", "supported", "performance"],
    useCase: "Calm",
    category: "Calm",
    tags: ["calm", "beginner"],
    status: "published",
    headline: "Ease into the start of your day.",
    description: "For when you’re arriving and want a gentle way to settle before things get going.",
    supportTags: ["Calm", "Preparation", "Wellbeing"],
    beforeYouBegin: ["Use headphones", "Get comfortable", "Best at the start of your day"],
    mode: "care",
    summary: "Ease into the start of your day.",
    partnerIds: ["org-preston", "org-haven"],
    groupIds: ["grp-settle"],
    timeOfDay: "morning",
  },
  {
    id: "ses-settle",
    title: "Session 2",
    durationMin: 15,
    neurotype: ["sensitive", "regulator", "supported", "performance"],
    useCase: "Calm",
    category: "Calm",
    tags: ["calm", "recovery"],
    status: "published",
    headline: "Find a quieter moment.",
    description: "For moments when things feel busy and you’d like some space before carrying on.",
    supportTags: ["Calm", "Reset", "Wellbeing"],
    beforeYouBegin: ["Use headphones", "Find somewhere comfortable", "Give yourself a few uninterrupted minutes"],
    mode: "care",
    summary: "Find a quieter moment.",
    partnerIds: ["org-preston", "org-haven"],
    groupIds: ["grp-settle"],
    timeOfDay: "morning",
  },
  {
    id: "ses-balance",
    title: "Session 3",
    durationMin: 18,
    neurotype: ["sensitive", "regulator", "supported", "performance"],
    useCase: "Focus",
    category: "Focus",
    tags: ["daily", "focus"],
    status: "published",
    headline: "Find a little more space to focus.",
    description: "For when you want to settle in before concentrating on what’s ahead.",
    supportTags: ["Focus", "Calm", "Preparation"],
    beforeYouBegin: ["Use headphones", "Sit comfortably", "Best before focused activity"],
    mode: "regulation",
    summary: "Find a little more space to focus.",
    partnerIds: ["org-preston", "org-summit"],
    groupIds: ["grp-daily"],
    timeOfDay: "morning",
  },
  {
    id: "ses-access",
    title: "Session 4",
    durationMin: 14,
    neurotype: ["sensitive", "regulator", "supported", "performance"],
    useCase: "Focus",
    category: "Focus",
    tags: ["focus", "daily"],
    status: "published",
    headline: "Clear a little space to think.",
    description: "For mid-morning moments when you’d like to gather yourself before the next thing.",
    supportTags: ["Focus", "Reset", "Preparation"],
    beforeYouBegin: ["Use headphones", "Sit or lie comfortably", "Best when you have some quiet time"],
    mode: "regulation",
    summary: "Clear a little space to think.",
    partnerIds: ["org-preston"],
    groupIds: ["grp-daily"],
    timeOfDay: "morning",
  },
  {
    id: "ses-reset",
    title: "Session 5",
    durationMin: 10,
    neurotype: ["sensitive", "regulator", "supported", "performance"],
    useCase: "Reset",
    category: "Reset",
    tags: ["recovery", "focus"],
    status: "published",
    headline: "Give yourself a moment to reset.",
    description: "For when you’ve finished something demanding and want some time to recover.",
    supportTags: ["Reset", "Recovery", "Focus"],
    beforeYouBegin: ["Use headphones", "Get comfortable", "Best between demanding blocks"],
    mode: "performance",
    summary: "Give yourself a moment to reset.",
    partnerIds: ["org-preston", "org-summit"],
    groupIds: ["grp-performance"],
    timeOfDay: "morning",
  },
  {
    id: "ses-evening-settle",
    title: "Session 6",
    durationMin: 16,
    neurotype: ["sensitive", "regulator", "supported", "performance"],
    useCase: "Calm",
    category: "Calm",
    tags: ["calm", "recovery"],
    status: "published",
    headline: "Leave the day behind.",
    description: "For moments when you want to slow things down and take some time for yourself.",
    supportTags: ["Calm", "Rest", "Recovery"],
    beforeYouBegin: ["Use headphones", "Get comfortable", "Best later in the day"],
    mode: "care",
    summary: "Leave the day behind.",
    partnerIds: ["org-preston", "org-haven"],
    groupIds: ["grp-settle"],
    timeOfDay: "evening",
  },
  {
    id: "ses-deep",
    title: "Session 7",
    durationMin: 22,
    neurotype: ["sensitive", "regulator", "supported", "performance"],
    useCase: "Rest",
    category: "Rest",
    tags: ["sleep", "recovery", "calm"],
    status: "published",
    headline: "Settle into a slower pace.",
    description: "For when you’re ready to switch off, recover and prepare for rest.",
    supportTags: ["Rest", "Recovery", "Sleep"],
    beforeYouBegin: ["Use headphones", "Get comfortable", "Best later in the day"],
    mode: "care",
    summary: "Settle into a slower pace.",
    partnerIds: ["org-preston", "org-haven"],
    groupIds: ["grp-settle"],
    timeOfDay: "evening",
  },
  {
    id: "ses-transition",
    title: "Session 8",
    durationMin: 15,
    neurotype: ["sensitive", "regulator", "supported", "performance"],
    useCase: "Reset",
    category: "Reset",
    tags: ["daily", "recovery"],
    status: "published",
    headline: "Move gently from one thing to the next.",
    description: "For when you’re changing pace and want a clean moment between what’s been and what’s next.",
    supportTags: ["Reset", "Calm", "Preparation"],
    beforeYouBegin: ["Use headphones", "Find somewhere comfortable", "Best at a natural pause"],
    mode: "regulation",
    summary: "Move gently from one thing to the next.",
    partnerIds: ["org-preston", "org-haven", "org-summit"],
    groupIds: ["grp-daily"],
    timeOfDay: "evening",
  },
  {
    id: "ses-clinical",
    title: "Session 9",
    durationMin: 20,
    neurotype: ["sensitive", "regulator", "supported", "performance"],
    useCase: "Wellbeing",
    category: "Wellbeing",
    tags: ["clinical", "calm"],
    status: "published",
    headline: "Make a little room for yourself.",
    description: "For when you’d like some quiet space alongside other support in your day.",
    supportTags: ["Wellbeing", "Calm", "Focus"],
    beforeYouBegin: ["Use headphones", "Sit or lie comfortably", "Best when you have some quiet time"],
    mode: "regulation",
    summary: "Make a little room for yourself.",
    partnerIds: ["org-preston"],
    groupIds: ["grp-clinical"],
    timeOfDay: "evening",
  },
  {
    id: "ses-wind",
    title: "Session 10",
    durationMin: 12,
    neurotype: ["sensitive", "regulator", "supported", "performance"],
    useCase: "Rest",
    category: "Rest",
    tags: ["sleep", "calm"],
    status: "published",
    headline: "Close the day gently.",
    description: "For a short moment before bed when you’re ready to settle for the night.",
    supportTags: ["Rest", "Sleep", "Calm"],
    beforeYouBegin: ["Use headphones", "Get comfortable", "Best later in the day"],
    mode: "care",
    summary: "Close the day gently.",
    partnerIds: ["org-preston", "org-haven"],
    groupIds: ["grp-settle"],
    timeOfDay: "evening",
  },
];

/** Bundles of Sessions that can be assigned to Partners as a unit. */
export const SESSION_GROUPS = [
  {
    id: "grp-settle",
    title: "Settle & recover",
    description: "Gentle arrival and regulation for when you’ve been overloaded.",
    sessionIds: ["ses-arrive", "ses-settle", "ses-evening-settle", "ses-deep", "ses-wind"],
    partnerIds: ["org-preston", "org-haven"],
    tags: ["calm", "recovery"],
    accent: "#6b7c74",
  },
  {
    id: "grp-daily",
    title: "Daily practice",
    description: "Repeatable sessions for a steady everyday rhythm.",
    sessionIds: ["ses-balance", "ses-access", "ses-transition"],
    partnerIds: ["org-preston", "org-summit"],
    tags: ["daily", "focus"],
    accent: "#7a6b5d",
  },
  {
    id: "grp-clinical",
    title: "Alongside therapy",
    description: "Sessions designed to sit next to clinical or therapeutic work.",
    sessionIds: ["ses-clinical"],
    partnerIds: ["org-preston"],
    tags: ["clinical"],
    accent: "#5c5a6e",
  },
  {
    id: "grp-performance",
    title: "Performance reset",
    description: "Short resets between high-demand blocks.",
    sessionIds: ["ses-reset"],
    partnerIds: ["org-preston", "org-summit"],
    tags: ["performance", "recovery"],
    accent: "#6a5a4e",
  },
];

/**
 * Pre-populated programme templates for Combined Admin assignment.
 * Listeners can preview any template’s session sequence; only the PNE
 * template is actionable in the demo (assigns to Preston North End).
 */
export const PROGRAMME_TEMPLATES = [
  {
    id: "prog-post-training",
    title: "Post-Training Recovery",
    subtitle: "Structured · Sport",
    description:
      "Short audio sessions to support recovery after training and matchdays - a morning-to-evening sequence that appears on the Listener home screen.",
    category: "Recovery",
    structure: "Structured sequence",
    partnerLabel: "Preston North End",
    actionablePartnerId: "org-preston",
    audience: "Athletes & player-care staff",
    cadence: "Daily · morning + evening",
    outcomes: ["Post-training downshift", "Matchday recovery", "Steady daily rhythm"],
    sessionIds: [
      "ses-arrive",
      "ses-settle",
      "ses-balance",
      "ses-access",
      "ses-reset",
      "ses-evening-settle",
      "ses-deep",
      "ses-transition",
      "ses-clinical",
      "ses-wind",
    ],
    bundleIds: ["grp-settle", "grp-daily", "grp-clinical", "grp-performance"],
    accent: "#0b1c2c",
  },
  {
    id: "prog-personalised-wellbeing",
    title: "Personalised Wellbeing",
    subtitle: "Adaptive · Direct access",
    description:
      "A flexible listening set for anonymous and direct-access listeners. Home and session order adapt to onboarding goals, moments, and timing.",
    category: "Wellbeing",
    structure: "Preference-led sequence",
    partnerLabel: "Sonocea",
    actionablePartnerId: DIRECT_ACCESS_PARTNER_ID,
    audience: "Direct-access & anonymous listeners",
    cadence: "Flexible · shaped by onboarding",
    outcomes: ["Calmer moments", "Better sleep wind-down", "Personalised next session"],
    sessionIds: [
      "ses-arrive",
      "ses-settle",
      "ses-balance",
      "ses-access",
      "ses-reset",
      "ses-evening-settle",
      "ses-deep",
      "ses-transition",
      "ses-clinical",
      "ses-wind",
    ],
    bundleIds: ["grp-settle", "grp-daily", "grp-clinical", "grp-performance"],
    accent: "#171716",
  },
  {
    id: "prog-clinical-pathway",
    title: "Programme 2",
    subtitle: "Curated · Healthcare",
    description:
      "Paced settle and regulation sessions designed to sit alongside therapeutic work.",
    category: "Clinical",
    structure: "Curated collection",
    partnerLabel: "Haven Care Network",
    actionablePartnerId: null,
    audience: "Care recipients & clinical teams",
    cadence: "3–4× weekly · flexible timing",
    outcomes: ["Settle before therapy", "Regulation between appointments", "Evening wind-down"],
    sessionIds: ["ses-arrive", "ses-settle", "ses-evening-settle", "ses-deep", "ses-clinical", "ses-wind"],
    bundleIds: ["grp-settle", "grp-clinical"],
    accent: "#1a2420",
  },
  {
    id: "prog-performance-blocks",
    title: "Programme 3",
    subtitle: "Structured · Performance",
    description:
      "Short resets between high-demand blocks, with a daily rhythm for athletes and staff.",
    category: "Performance",
    structure: "Structured sequence",
    partnerLabel: "Summit Performance Lab",
    actionablePartnerId: null,
    audience: "Athletes & high-demand staff",
    cadence: "Between training blocks",
    outcomes: ["Clear re-entry", "Focus between blocks", "Short recoverable pauses"],
    sessionIds: ["ses-balance", "ses-access", "ses-reset", "ses-transition"],
    bundleIds: ["grp-daily", "grp-performance"],
    accent: "#2a241c",
  },
];

export function programmeTemplateById(id) {
  return PROGRAMME_TEMPLATES.find((p) => p.id === id) ?? null;
}

export function sessionsForProgrammeTemplate(template, catalog = SESSION_CATALOG) {
  if (!template) return [];
  const byId = new Map(catalog.map((s) => [s.id, s]));
  return template.sessionIds.map((id) => byId.get(id)).filter(Boolean);
}

/** Organization / Partner type - used in Admin org setup. */
export const ORG_TYPE_OPTIONS = [
  { id: "sport", label: "Sport & clubs" },
  { id: "healthcare", label: "Healthcare & care" },
  { id: "performance", label: "Performance & education" },
  { id: "enterprise", label: "Enterprise / workplace" },
  { id: "other", label: "Other" },
];

export const ORG_STATUS_OPTIONS = [
  { id: "active", label: "Active" },
  { id: "paused", label: "Paused" },
  { id: "draft", label: "Draft" },
];

export const LISTENER_STATUS_OPTIONS = [
  { id: "active", label: "Active" },
  { id: "invited", label: "Invited" },
  { id: "paused", label: "Paused" },
];

export const APPEARANCE_OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "adapt", label: "Adapt to time of day" },
];

/**
 * Seed organisations for Admin Overview.
 * Preston North End is intentionally omitted - it is created via Organisations → Create New.
 * Listener demos still reference org-preston; the Combined Admin flow upserts it when created.
 */
export const DEMO_PARTNERS = [
  {
    id: "org-haven",
    name: "Haven Care Network",
    monogram: "H",
    logoSrc: NHS_LOGO_SRC,
    inviteAccent: "#1a2420",
    inviteHighlight: "#8faf9a",
    inviteLine: "Haven Care Network has invited you to experience Sonocea.",
    programmeTitle: "Gentle Recovery",
    programme: "Gentle recovery sessions for when things feel a lot - paced and supportive.",
    seats: 120,
    seatsUsed: 91,
    billingModel: "usage",
    sessionIds: ["ses-arrive", "ses-settle", "ses-evening-settle", "ses-deep", "ses-wind", "ses-transition"],
    bundleIds: ["grp-settle"],
    status: "active",
    orgType: "healthcare",
    region: "North West, UK",
    website: "",
    contactName: "Clinical ops",
    contactEmail: "ops@haven.care",
    contactRole: "Programme coordinator",
    notes: "Therapy-adjunct pathway; gentle pacing preferred.",
    createdAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
  },
  {
    id: "org-summit",
    name: "Summit Performance Lab",
    monogram: "S",
    logoSrc: LOUGHBOROUGH_LOGO_SRC,
    inviteAccent: "#1c1712",
    inviteHighlight: "#d4b896",
    inviteLine: "Summit Performance Lab has invited you to experience Sonocea.",
    programmeTitle: "Between-Block Reset",
    programme: "Short reset sessions for recovery between busy or demanding days.",
    seats: 25,
    seatsUsed: 18,
    billingModel: "per-seat",
    sessionIds: ["ses-balance", "ses-reset", "ses-transition"],
    bundleIds: ["grp-daily", "grp-performance"],
    status: "active",
    orgType: "performance",
    region: "Loughborough, UK",
    website: "",
    contactName: "Lab ops",
    contactEmail: "ops@summit.lab",
    contactRole: "Performance lead",
    notes: "Between-block resets for athletes and staff.",
    createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000,
  },
  {
    id: "org-wigan",
    name: "Wigan Athletic",
    monogram: "WAFC",
    logoSrc: WIGAN_LOGO_SRC,
    inviteAccent: "#001F5B",
    inviteHighlight: "#7BA3D0",
    inviteLine: "Wigan Athletic has invited you to experience Sonocea.",
    programmeTitle: "Matchday Recovery",
    programme: "Listening sessions for academy and first-team recovery around the match week.",
    seats: 35,
    seatsUsed: 22,
    billingModel: "seat-pool",
    sessionIds: ["ses-arrive", "ses-settle", "ses-reset", "ses-evening-settle", "ses-transition"],
    bundleIds: ["grp-settle", "grp-daily"],
    status: "active",
    orgType: "sport",
    region: "Wigan, UK",
    website: "",
    contactName: "Player care",
    contactEmail: "care@wiganathletic.com",
    contactRole: "Wellbeing lead",
    notes: "Academy-led pilot expanding to first team.",
    createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
  },
  {
    id: "org-loughborough",
    name: "Loughborough Sport",
    monogram: "LU",
    logoSrc: LOUGHBOROUGH_LOGO_SRC,
    inviteAccent: "#4C2C92",
    inviteHighlight: "#C4B5E0",
    inviteLine: "Loughborough Sport has invited you to experience Sonocea.",
    programmeTitle: "Campus Calm",
    programme: "Short regulation sessions for student-athletes between training and study.",
    seats: 80,
    seatsUsed: 54,
    billingModel: "seat-pool",
    sessionIds: ["ses-balance", "ses-access", "ses-reset", "ses-wind"],
    bundleIds: ["grp-daily", "grp-performance"],
    status: "active",
    orgType: "performance",
    region: "Loughborough, UK",
    website: "",
    contactName: "Sport science",
    contactEmail: "sport@lboro.ac.uk",
    contactRole: "Programme lead",
    notes: "Multi-sport campus cohort.",
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
  },
];

/** Full Preston North End record - created via Admin Organisations → Create New. */
export const PNE_ORGANIZATION = {
  id: "org-preston",
  name: "Preston North End",
  monogram: "PNE",
  logoSrc: PNE_LOGO_SRC,
  inviteAccent: "#0b1c2c",
  inviteHighlight: "#c9a86a",
  inviteLine: "Preston North End has invited you to experience Sonocea.",
  programmeTitle: "Post-Training Recovery",
  programme:
    "Preston North End has shared a curated Post-Training Recovery programme — short headphone sessions for academy and first-team players after training, between fixtures, and on rest days.",
  seats: 40,
  seatsUsed: 28,
  billingModel: "seat-pool",
  sessionIds: [
    "ses-arrive",
    "ses-settle",
    "ses-balance",
    "ses-access",
    "ses-reset",
    "ses-evening-settle",
    "ses-deep",
    "ses-transition",
    "ses-clinical",
    "ses-wind",
  ],
  bundleIds: ["grp-settle", "grp-daily", "grp-clinical", "grp-performance"],
  status: "active",
  orgType: "sport",
  region: "Preston, UK",
  website: "https://www.pnefc.net",
  contactName: "Ops · Player Care",
  contactEmail: "ops@pne.club",
  contactRole: "Player care lead",
  notes: "First-team and academy recovery programme.",
  createdAt: Date.now() - 120 * 24 * 60 * 60 * 1000,
};

/**
 * Direct-access / anonymous programme - invites come from Sonocea with no
 * organisation co-branding. Home and sessions are shaped by onboarding.
 */
export const SONOCEA_DIRECT_ORGANIZATION = {
  id: DIRECT_ACCESS_PARTNER_ID,
  name: "Sonocea",
  monogram: "",
  logoSrc: "",
  inviteAccent: "#171716",
  inviteHighlight: "#c9a86a",
  inviteLine: "You’re invited to experience Sonocea.",
  programmeTitle: "Your personalised programme",
  programme:
    "A listening programme shaped around what you share in onboarding — goals, moments, and when you listen.",
  seats: 100,
  seatsUsed: 12,
  billingModel: "seat-pool",
  sessionIds: [
    "ses-arrive",
    "ses-settle",
    "ses-balance",
    "ses-access",
    "ses-reset",
    "ses-evening-settle",
    "ses-deep",
    "ses-transition",
    "ses-clinical",
    "ses-wind",
  ],
  bundleIds: ["grp-settle", "grp-daily", "grp-clinical", "grp-performance"],
  status: "active",
  orgType: "other",
  region: "",
  website: "https://sonocea.com",
  contactName: "Sonocea Support",
  contactEmail: "hello@sonocea.com",
  contactRole: "Support",
  notes: "Direct-access anonymous listener programme.",
  isDirectAccess: true,
  createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
};

/** True when the partner is Sonocea direct-access (no org co-brand). */
export function isDirectAccessPartner(partner) {
  if (!partner) return false;
  return Boolean(partner.isDirectAccess) || partner.id === DIRECT_ACCESS_PARTNER_ID;
}

/** Resolve a partner from store state, with PNE / direct-access seed fallbacks. */
export function resolvePartner(partners = DEMO_PARTNERS, partnerId) {
  if (!partnerId) return null;
  return partners.find((p) => p.id === partnerId)
    ?? (partnerId === "org-preston" ? PNE_ORGANIZATION : null)
    ?? (partnerId === DIRECT_ACCESS_PARTNER_ID ? SONOCEA_DIRECT_ORGANIZATION : null);
}

export const DEMO_LISTENERS = [
  {
    id: "lis-alex",
    name: "Alex Rivera",
    displayName: "Alex",
    email: "alex@example.com",
    partnerId: "org-preston",
    inviteCode: "PRESTON-ALEX",
    status: "active",
    neurotypeId: "regulator",
    isAnonymous: false,
    onboardingComplete: true,
    identityId: "no",
    sensoryId: "sometimes",
    moodIds: ["recover", "winding-down"],
    supportIds: ["recovery", "wellbeing"],
    listenTime: "evening",
    appearance: "light",
    notificationsEnabled: true,
    joinedAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
    notes: "Demo returning listener.",
  },
  {
    id: "lis-river",
    name: "River",
    displayName: "River",
    email: undefined,
    partnerId: DIRECT_ACCESS_PARTNER_ID,
    inviteCode: "SONOCEA-RIVER",
    status: "active",
    neurotypeId: "regulator",
    isAnonymous: true,
    onboardingComplete: true,
    identityId: null,
    sensoryId: "sometimes",
    moodIds: ["overwhelmed", "winding-down", "quiet"],
    supportIds: ["calmer", "sleep", "regulation"],
    listenTime: "evening",
    listenTimes: ["evening", "before-bed"],
    appearance: "light",
    notificationsEnabled: true,
    joinedAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
    notes: "Demo anonymous / direct-access listener.",
  },
  {
    id: "lis-jordan",
    name: "Jordan Lee",
    displayName: null,
    email: "jordan@example.com",
    partnerId: "org-haven",
    inviteCode: "HAVEN-JORDAN",
    status: "invited",
    neurotypeId: "sensitive",
    isAnonymous: false,
    onboardingComplete: false,
    identityId: null,
    moodIds: [],
    supportIds: [],
    listenTime: null,
    appearance: "light",
    notificationsEnabled: null,
    joinedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    notes: "",
  },
  {
    id: "lis-sam",
    name: "Sam Okonkwo",
    displayName: "Sam",
    email: "sam@summit.lab",
    partnerId: "org-summit",
    inviteCode: "SUMMIT-SAM",
    status: "active",
    neurotypeId: "performance",
    isAnonymous: false,
    onboardingComplete: true,
    identityId: "yes",
    sensoryId: "quite",
    moodIds: ["focus", "overwhelmed"],
    supportIds: ["focus", "regulation"],
    listenTime: "afternoon",
    appearance: "light",
    notificationsEnabled: false,
    joinedAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    notes: "",
  },
];

/** Empty listener profile defaults (admin create / invite stubs). */
export function emptyListenerProfile(overrides = {}) {
  return {
    displayName: null,
    isAnonymous: false,
    onboardingComplete: false,
    identityId: null,
    sensoryId: null,
    moodIds: [],
    supportIds: [],
    listenTime: null,
    listenTimes: [],
    appearance: "light",
    notificationsEnabled: null,
    neurotypeId: null,
    firstSessionStarted: false,
    notes: "",
    joinedAt: Date.now(),
    ...overrides,
  };
}

/** Prefer real partner artwork over monogram placeholders (esp. Preston North End). */
export function partnerLogoSrc(partner) {
  if (!partner) return null;
  const isPreston =
    partner.id === "org-preston" ||
    /preston\s*north\s*end/i.test(partner.name ?? "");
  const resolved = resolveBrandLogoSrc(partner.logoSrc, {
    isPreston,
    fallback: "",
  });
  if (resolved) return resolved;
  return null;
}

export function sessionsByTimeOfDay(sessions) {
  const morning = sessions.filter((s) => s.timeOfDay === "morning");
  const evening = sessions.filter((s) => s.timeOfDay === "evening");
  const other = sessions.filter(
    (s) => s.timeOfDay !== "morning" && s.timeOfDay !== "evening",
  );
  return { morning, evening, other };
}

/** Empty organization defaults for Admin create flow. */
export function emptyOrganization(overrides = {}) {
  return {
    monogram: "",
    logoSrc: "",
    inviteAccent: "#1a1a1a",
    inviteHighlight: "#c9a86a",
    inviteLine: "",
    programmeTitle: "",
    programme: "",
    /** Optional label overrides for Rest / Focus / Restore home modes. */
    homeModes: DEFAULT_HOME_MODES.map(({ id, label, tone }) => ({ id, label, tone })),
    seats: 30,
    seatsUsed: 0,
    billingModel: "seat-pool",
    sessionIds: [],
    bundleIds: [],
    status: "draft",
    orgType: "other",
    region: "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactRole: "",
    notes: "",
    createdAt: Date.now(),
    ...overrides,
  };
}

export function labelForOption(options, id, fallback = "-") {
  if (!id) return fallback;
  return options.find((o) => o.id === id)?.label ?? fallback;
}

/** Seed listens so Admin dashboard / export demos have day · week · month signal. */
export function buildDemoListenHistory(now = Date.now()) {
  const day = 24 * 60 * 60 * 1000;
  const sessionPool = [
    { sessionId: "ses-arrive", durationMin: 12 },
    { sessionId: "ses-settle", durationMin: 15 },
    { sessionId: "ses-balance", durationMin: 18 },
    { sessionId: "ses-access", durationMin: 16 },
    { sessionId: "ses-reset", durationMin: 10 },
    { sessionId: "ses-evening-settle", durationMin: 14 },
    { sessionId: "ses-deep", durationMin: 20 },
    { sessionId: "ses-transition", durationMin: 14 },
    { sessionId: "ses-wind", durationMin: 12 },
  ];
  const named = [
    { sessionId: "ses-arrive", listenerId: "lis-alex", partnerId: "org-preston", progressPct: 100, durationMin: 12, daysAgo: 0.2 },
    { sessionId: "ses-settle", listenerId: "lis-alex", partnerId: "org-preston", progressPct: 100, durationMin: 15, daysAgo: 0.5 },
    { sessionId: "ses-balance", listenerId: "lis-alex", partnerId: "org-preston", progressPct: 72, durationMin: 18, daysAgo: 1.1 },
    { sessionId: "ses-arrive", listenerId: "lis-sam", partnerId: "org-summit", progressPct: 100, durationMin: 12, daysAgo: 1.4 },
    { sessionId: "ses-reset", listenerId: "lis-sam", partnerId: "org-summit", progressPct: 95, durationMin: 10, daysAgo: 2.2 },
    { sessionId: "ses-settle", listenerId: "lis-alex", partnerId: "org-preston", progressPct: 100, durationMin: 15, daysAgo: 3.5 },
    { sessionId: "ses-deep", listenerId: "lis-jordan", partnerId: "org-haven", progressPct: 88, durationMin: 20, daysAgo: 4.1 },
    { sessionId: "ses-transition", listenerId: "lis-alex", partnerId: "org-preston", progressPct: 100, durationMin: 14, daysAgo: 6.2 },
    { sessionId: "ses-arrive", listenerId: "lis-sam", partnerId: "org-summit", progressPct: 60, durationMin: 12, daysAgo: 8 },
    { sessionId: "ses-settle", listenerId: "lis-alex", partnerId: "org-preston", progressPct: 100, durationMin: 15, daysAgo: 12 },
    { sessionId: "ses-balance", listenerId: "lis-sam", partnerId: "org-summit", progressPct: 100, durationMin: 18, daysAgo: 18 },
    { sessionId: "ses-access", listenerId: "lis-alex", partnerId: "org-preston", progressPct: 100, durationMin: 16, daysAgo: 22 },
    { sessionId: "ses-arrive", listenerId: "lis-jordan", partnerId: "org-haven", progressPct: 40, durationMin: 12, daysAgo: 27 },
  ];

  /** Platform-scale volume so Admin home charts read as a live programme. */
  const cohorts = [
    { partnerId: "org-haven", count: 52, listenerBase: "lis-haven" },
    { partnerId: "org-summit", count: 22, listenerBase: "lis-summit" },
    { partnerId: "org-wigan", count: 26, listenerBase: "lis-wigan" },
    { partnerId: "org-loughborough", count: 34, listenerBase: "lis-lboro" },
    { partnerId: "org-preston", count: 18, listenerBase: "lis-pne" },
  ];
  const synthetic = [];
  let n = 0;
  for (const cohort of cohorts) {
    for (let k = 0; k < cohort.count; k += 1) {
      const ses = sessionPool[(n + k) % sessionPool.length];
      const daysAgo = ((k * 0.85 + (n % 7) * 0.2) % 29.5) + (k % 5) * 0.03;
      synthetic.push({
        sessionId: ses.sessionId,
        listenerId: `${cohort.listenerBase}-${k % 14}`,
        partnerId: cohort.partnerId,
        progressPct: 48 + ((n * 19 + k * 11) % 53),
        durationMin: ses.durationMin,
        daysAgo,
      });
      n += 1;
    }
  }

  return [...named, ...synthetic].map((r, i) => ({
    sessionId: r.sessionId,
    listenerId: r.listenerId,
    partnerId: r.partnerId,
    progressPct: r.progressPct,
    durationMin: r.durationMin,
    completedAt: now - r.daysAgo * day - i * 1000,
  }));
}

export function inviteLinkPath(code) {
  return `/app/listener/invite?code=${encodeURIComponent(code)}`;
}

export function downloadDelimited(filename, rows, delimiter = ",", prefix = "") {
  const escape = (cell) => {
    const value = String(cell ?? "");
    if (value.includes(delimiter) || value.includes('"') || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };
  const body = prefix + rows.map((row) => row.map(escape).join(delimiter)).join("\n");
  const mime = delimiter === "\t" ? "text/tab-separated-values" : "text/csv";
  const blob = new Blob([body], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Resolve partner branding from an invite code (e.g. PRESTON-ALEX → Preston North End). */
export function partnerFromInviteCode(code, partners = DEMO_PARTNERS, listeners = DEMO_LISTENERS) {
  const normalised = (code || "").toUpperCase().trim();
  if (!normalised) return null;

  const listener = listeners.find((l) => l.inviteCode.toUpperCase() === normalised);
  if (listener) {
    // Fall back to PNE / direct-access seeds when org isn't in the live partners list yet
    // (Preston North End is created via Admin → Organisations, not DEMO_PARTNERS).
    return resolvePartner(partners, listener.partnerId);
  }

  return (
    partners.find((p) => {
      const key = p.name.split(" ")[0].toUpperCase();
      return normalised.startsWith(key) || normalised.includes(key);
    }) ?? null
  );
}

export function listenerFromInviteCode(code, listeners = DEMO_LISTENERS) {
  const normalised = (code || "").toUpperCase().trim();
  return listeners.find((l) => l.inviteCode.toUpperCase() === normalised) ?? null;
}

/** Valid demo credentials for the working app */
export const DEMO_CREDENTIALS = {
  listener: { email: "alex@example.com", password: "listen", inviteCode: "PRESTON-ALEX" },
  anonymousListener: {
    email: "",
    password: "listen",
    inviteCode: "SONOCEA-RIVER",
    isAnonymous: true,
    partnerId: DIRECT_ACCESS_PARTNER_ID,
  },
  partner: { email: "ops@pne.club", password: "partner", partnerId: "org-preston" },
  admin: { email: "admin@sonocea.com", password: "admin" },
};

export function sessionsForPartner(partnerId, catalog = SESSION_CATALOG) {
  if (partnerId === DIRECT_ACCESS_PARTNER_ID) {
    const ids = new Set(SONOCEA_DIRECT_ORGANIZATION.sessionIds);
    return catalog.filter((s) => ids.has(s.id) || s.partnerIds.includes(partnerId));
  }
  return catalog.filter((s) => s.partnerIds.includes(partnerId));
}

export function sessionsForNeurotype(
  neurotypeId,
  partnerId,
  catalog = SESSION_CATALOG,
  partnerSessionIds,
) {
  const directIds =
    partnerId === DIRECT_ACCESS_PARTNER_ID
      ? new Set(partnerSessionIds?.length ? partnerSessionIds : SONOCEA_DIRECT_ORGANIZATION.sessionIds)
      : partnerSessionIds?.length
        ? new Set(partnerSessionIds)
        : null;

  return catalog.filter((s) => {
    const entitled = directIds
      ? directIds.has(s.id)
      : s.partnerIds.includes(partnerId);
    return entitled && (!neurotypeId || s.neurotype.includes(neurotypeId));
  });
}

/** Canonical listening-time ids from prefs (supports legacy `listenTime`). */
export function preferredListeningTimes(prefs = {}) {
  if (prefs.listeningTimes?.length) return prefs.listeningTimes;
  if (prefs.listenTimes?.length) return prefs.listenTimes;
  if (prefs.listenTime) return [prefs.listenTime];
  return [];
}

const LISTEN_TIME_FOCUS = {
  morning: {
    id: "morning",
    band: "morning",
    label: "Morning",
    sectionTitle: "Your mornings",
    heroLead: "For your morning",
    readyLead: "A morning session",
    homeLine: "Built for your mornings",
  },
  afternoon: {
    id: "afternoon",
    band: "morning",
    label: "Afternoon",
    sectionTitle: "Your afternoons",
    heroLead: "For your afternoon",
    readyLead: "An afternoon session",
    homeLine: "Built for your afternoons",
  },
  evening: {
    id: "evening",
    band: "evening",
    label: "Evening",
    sectionTitle: "Your evenings",
    heroLead: "For your evening",
    readyLead: "An evening session",
    homeLine: "Built for your evenings",
  },
  "before-bed": {
    id: "before-bed",
    band: "evening",
    label: "Before bed",
    sectionTitle: "Before bed",
    heroLead: "For winding down",
    readyLead: "A wind-down session",
    homeLine: "Built for before bed",
  },
  anytime: {
    id: "anytime",
    band: "other",
    label: "Anytime",
    sectionTitle: "Whenever you need",
    heroLead: "Ready when you are",
    readyLead: "Your first session",
    homeLine: "Ready whenever you need",
  },
};

/**
 * Which listen-time focus should shape Home / Ready right now.
 * Prefers an onboarding time that matches the clock; otherwise first preferred time.
 */
export function resolveHomeListenFocus(prefs = {}, now = new Date()) {
  const times = preferredListeningTimes(prefs);
  const dayPart = currentDayPart(now);
  if (!times.length || times.includes("anytime")) {
    return LISTEN_TIME_FOCUS[dayPart] ?? LISTEN_TIME_FOCUS.anytime;
  }
  if (times.includes(dayPart)) {
    return LISTEN_TIME_FOCUS[dayPart] ?? LISTEN_TIME_FOCUS.anytime;
  }
  // Morning/afternoon and evening/before-bed are close neighbours.
  if (
    (dayPart === "morning" || dayPart === "afternoon") &&
    (times.includes("morning") || times.includes("afternoon"))
  ) {
    return LISTEN_TIME_FOCUS[times.includes("morning") ? "morning" : "afternoon"];
  }
  if (
    (dayPart === "evening" || dayPart === "before-bed") &&
    (times.includes("evening") || times.includes("before-bed"))
  ) {
    return LISTEN_TIME_FOCUS[times.includes("before-bed") ? "before-bed" : "evening"];
  }
  return LISTEN_TIME_FOCUS[times[0]] ?? LISTEN_TIME_FOCUS.anytime;
}

/** Short goal phrase for copy, e.g. "feeling calmer". */
export function primaryGoalPhrase(prefs = {}) {
  const goals = (prefs.supportGoals ?? prefs.supportIds ?? [])
    .map((id) => labelForOption(ONBOARDING_SUPPORT_OPTIONS, id, null))
    .filter(Boolean);
  return goals[0]?.toLowerCase() ?? null;
}

/**
 * Home / programme subtitle from onboarding answers (anonymous / direct-access).
 * Leads with preferred listen times so Home reads as built around onboarding.
 */
export function personalisedProgrammeSubtitle(prefs = {}) {
  const focus = resolveHomeListenFocus(prefs);
  const goal = primaryGoalPhrase(prefs);
  const times = preferredListeningTimes(prefs);
  const moments = (prefs.listeningMoments ?? prefs.moodIds ?? [])
    .map((id) => labelForOption(ONBOARDING_MOOD_OPTIONS, id, null))
    .filter(Boolean);

  if (times.length && !times.includes("anytime")) {
    if (goal) return `${focus.homeLine} · ${goal}`;
    return focus.homeLine;
  }
  if (goal) return `Shaped around ${goal}`;
  if (moments.length) {
    return `Ready for moments like ${moments[0].toLowerCase().replace(/^when i /, "")}`;
  }
  return "Sessions shaped around what you shared";
}

/** Short labels for “up next” context from onboarding. */
export function personalisedNextSessionEyebrow(prefs = {}, session) {
  const focus = resolveHomeListenFocus(prefs);
  const goals = prefs.supportGoals ?? prefs.supportIds ?? [];
  const moments = prefs.listeningMoments ?? prefs.moodIds ?? [];
  const times = preferredListeningTimes(prefs);
  const timeAware =
    times.length > 0 &&
    !times.includes("anytime") &&
    ((focus.band === "evening" && session?.timeOfDay === "evening") ||
      (focus.band === "morning" && session?.timeOfDay === "morning") ||
      session?.timeOfDay == null);

  if (goals.includes("sleep") || moments.includes("winding-down")) {
    if (session?.timeOfDay === "evening" || session?.tags?.includes("sleep")) {
      return timeAware ? `${focus.heroLead} · winding down` : "Matched to winding down";
    }
  }
  if (goals.includes("calmer") || moments.includes("overwhelmed") || moments.includes("unsettled")) {
    if (session?.tags?.includes("calm") || session?.tags?.includes("recovery")) {
      return timeAware ? `${focus.heroLead} · feeling calmer` : "Matched to feeling calmer";
    }
  }
  if (goals.includes("focus") || moments.includes("focus")) {
    if (session?.tags?.includes("focus") || session?.tags?.includes("daily")) {
      return timeAware ? `${focus.heroLead} · staying focused` : "Matched to staying focused";
    }
  }
  if (goals.includes("recovery") || moments.includes("recover") || moments.includes("reset")) {
    return timeAware ? `${focus.heroLead} · resetting` : "Matched to resetting";
  }
  if (timeAware) return focus.heroLead;
  return "Suggested for you";
}

/**
 * Order Morning / Evening / Anytime sections from onboarding + clock.
 * Preferred band first so Home looks structurally different by listen time.
 */
export function orderedSessionSectionsForPreferences(sessions, prefs = {}, now = new Date()) {
  const { morning, evening, other } = sessionsByTimeOfDay(sessions);
  const focus = resolveHomeListenFocus(prefs, now);
  const times = preferredListeningTimes(prefs);
  const sections = [
    {
      id: "morning",
      title:
        focus.band === "morning" && times.length && !times.includes("anytime")
          ? focus.sectionTitle
          : "Morning",
      items: morning,
      preferred: focus.band === "morning",
    },
    {
      id: "evening",
      title:
        focus.band === "evening" && times.length && !times.includes("anytime")
          ? focus.sectionTitle
          : "Evening",
      items: evening,
      preferred: focus.band === "evening",
    },
    {
      id: "other",
      title: focus.band === "other" ? focus.sectionTitle : "Anytime",
      items: other,
      preferred: focus.band === "other",
    },
  ].filter((s) => s.items.length > 0);

  sections.sort((a, b) => Number(b.preferred) - Number(a.preferred));
  return sections;
}

/** Ready-screen title + body from onboarding answers. */
export function personalisedReadyCopy(prefs = {}, session) {
  const focus = resolveHomeListenFocus(prefs);
  const name = prefs.preferredName?.trim() || prefs.displayName?.trim() || null;
  const goal = primaryGoalPhrase(prefs);
  const times = preferredListeningTimes(prefs);
  const timeLed = times.length > 0 && !times.includes("anytime");

  const title = name
    ? timeLed
      ? `${focus.readyLead} is ready, ${name}.`
      : `Your first session is ready, ${name}.`
    : timeLed
      ? `${focus.readyLead} is ready.`
      : "Your first session is ready.";

  const body = goal
    ? timeLed
      ? `Matched to ${goal}, for the times you said you’d listen. Begin when you’re ready.`
      : `Matched to ${goal}. If you’re comfortable, you can begin your first Sonocea session now.`
    : "Everything is set. If you’re comfortable, you can begin your first Sonocea session now.";

  return {
    title,
    body,
    sessionMeta: session ? `${session.durationMin} min` : null,
  };
}

export function formatDuration(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/** Group assigned sessions by programme bundles for scalable browsing. */
export function groupSessionsForLibrary(sessions, sessionGroups = SESSION_GROUPS, partnerId) {
  const byId = new Map(sessions.map((s) => [s.id, s]));
  const used = new Set();
  const groups = sessionGroups
    .filter(
      (g) =>
        !partnerId ||
        g.partnerIds.includes(partnerId) ||
        (partnerId === DIRECT_ACCESS_PARTNER_ID && g.partnerIds.includes("org-preston")),
    )
    .map((g) => {
      const items = g.sessionIds.map((id) => byId.get(id)).filter(Boolean);
      items.forEach((s) => used.add(s.id));
      return {
        id: g.id,
        title: g.title,
        description: g.description,
        accent: g.accent ?? categoryAccent(items[0]?.category),
        items,
      };
    })
    .filter((g) => g.items.length > 0);

  const leftover = sessions.filter((s) => !used.has(s.id));
  if (leftover.length) {
    groups.push({
      id: "grp-other",
      title: "More sessions",
      description: "Additional sessions in your programme.",
      accent: categoryAccent(leftover[0]?.category),
      items: leftover,
    });
  }
  return groups;
}

/** Calendar days in the last `days` window where the listener completed a session. */
export function listenDaysInWindow(listenHistory, days = LISTEN_STREAK_DAYS, now = Date.now()) {
  const stripKeys = lastNDayKeys(days, now);
  const stripSet = new Set(stripKeys);
  const dayKeys = new Set();
  for (const entry of listenHistory) {
    if ((entry.progressPct ?? 0) < 90) continue;
    const key = listenDayKey(entry.completedAt);
    if (!stripSet.has(key)) continue;
    dayKeys.add(key);
  }
  return {
    listenedDays: dayKeys.size,
    windowDays: days,
    dayKeys,
    stripKeys,
  };
}

/** Prefer display name → first name → anonymous greeting. */
export function listenerGreetingName(user) {
  if (!user) return null;
  if (user.isAnonymous && !user.displayName) return null;
  const raw = user.displayName?.trim() || user.name?.split(" ")[0]?.trim();
  if (!raw || raw.toLowerCase() === "listener") return null;
  return raw;
}

/** Time-of-day greeting for Home - uses preferredName when available. */
export function listenerTimeGreeting(preferredName, now = new Date()) {
  const h = now.getHours();
  const period = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  const name = preferredName?.trim();
  return name ? `${period}, ${name}` : period;
}

export function currentDayPart(now = new Date()) {
  const h = now.getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  if (h < 21) return "evening";
  return "before-bed";
}

const GOAL_SCORE_TAGS = {
  calmer: ["calm", "recovery"],
  recovery: ["recovery", "calm"],
  focus: ["focus", "daily"],
  regulation: ["calm", "recovery"],
  sleep: ["sleep", "calm"],
  wellbeing: ["daily", "calm", "recovery"],
};

const MOMENT_SCORE_TAGS = {
  overwhelmed: ["calm", "recovery"],
  unsettled: ["calm", "recovery"],
  reset: ["focus", "recovery"],
  recover: ["recovery", "calm"],
  focus: ["focus", "daily"],
  "winding-down": ["sleep", "calm", "recovery"],
  quiet: ["calm", "daily"],
};

function sessionMatchesTags(session, tags) {
  const sessionTags = session.tags ?? [];
  const hay = `${session.category ?? ""} ${session.useCase ?? ""} ${session.mode ?? ""}`.toLowerCase();
  return tags.some((t) => sessionTags.includes(t) || hay.includes(t));
}

/** Per-goal completion against sessions that match each support goal. */
export function goalProgressRows(supportGoals = [], library = [], listenHistory = []) {
  const completedIds = new Set(
    listenHistory.filter((h) => (h.progressPct ?? 0) >= 90).map((h) => h.sessionId),
  );
  return supportGoals
    .map((id) => {
      const label = labelForOption(ONBOARDING_SUPPORT_OPTIONS, id, null);
      if (!label || label === "-") return null;
      const tags = GOAL_SCORE_TAGS[id] ?? ["calm"];
      const matching = library.filter((s) => sessionMatchesTags(s, tags));
      const done = matching.filter((s) => completedIds.has(s.id)).length;
      return {
        id,
        label,
        done,
        total: Math.max(matching.length, 1),
      };
    })
    .filter(Boolean);
}

/**
 * Rank entitled sessions using onboarding personalisation:
 * supportGoals + listeningMoments + listeningTimes + current time of day.
 * Does not use neurodivergence or sensory answers.
 */
export function rankSessionsForPreferences(sessions, prefs = {}, now = new Date()) {
  if (!sessions?.length) return [];
  const goals = prefs.supportGoals ?? prefs.supportIds ?? [];
  const moments = prefs.listeningMoments ?? prefs.moodIds ?? [];
  const times =
    prefs.listeningTimes?.length
      ? prefs.listeningTimes
      : prefs.listenTime
        ? [prefs.listenTime]
        : [];
  const dayPart = currentDayPart(now);
  const anytime = !times.length || times.includes("anytime");

  const scored = sessions.map((session, index) => {
    let score = 0;
    for (const g of goals) {
      if (sessionMatchesTags(session, GOAL_SCORE_TAGS[g] ?? [])) score += 3;
    }
    for (const m of moments) {
      if (sessionMatchesTags(session, MOMENT_SCORE_TAGS[m] ?? [])) score += 2;
    }
    if (!anytime) {
      if (times.includes("morning") && session.timeOfDay === "morning") score += 2;
      if (
        (times.includes("evening") || times.includes("before-bed") || times.includes("afternoon")) &&
        session.timeOfDay === "evening"
      ) {
        score += 2;
      }
      if (
        (dayPart === "morning" || dayPart === "afternoon") &&
        times.includes(dayPart) &&
        session.timeOfDay === "morning"
      ) {
        score += 2;
      }
      if (
        (dayPart === "evening" || dayPart === "before-bed") &&
        (times.includes("evening") || times.includes("before-bed")) &&
        session.timeOfDay === "evening"
      ) {
        score += 2;
      }
    } else if (
      ((dayPart === "morning" || dayPart === "afternoon") && session.timeOfDay === "morning") ||
      ((dayPart === "evening" || dayPart === "before-bed") && session.timeOfDay === "evening")
    ) {
      score += 1;
    }
    return { session, score, index };
  });

  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  return scored.map((row) => row.session);
}

/** Normalise onboarding prefs into the canonical personalisation + research shape. */
export function normaliseOnboardingPrefs(raw = {}) {
  const preferredName =
    raw.preferredName?.trim() || raw.displayName?.trim() || null;
  const supportGoals = raw.supportGoals ?? raw.supportIds ?? [];
  const listeningMoments = raw.listeningMoments ?? raw.moodIds ?? [];
  const listeningTimes =
    raw.listeningTimes?.length
      ? raw.listeningTimes
      : raw.listenTime
        ? [raw.listenTime]
        : [];
  return {
    preferredName,
    supportGoals,
    listeningMoments,
    listeningTimes,
    sensorySensitivity: raw.sensorySensitivity ?? raw.sensoryId ?? null,
    neurodivergence: raw.neurodivergence ?? raw.identityId ?? null,
    notificationPreference: raw.notificationPreference ?? null,
    appearancePreference: raw.appearancePreference ?? raw.appearance ?? "light",
    firstSessionStarted: Boolean(raw.firstSessionStarted),
    // Legacy aliases for admin roster / older code paths
    displayName: preferredName,
    supportIds: supportGoals,
    moodIds: listeningMoments,
    listenTime: listeningTimes.includes("anytime")
      ? "anytime"
      : listeningTimes[0] ?? null,
    listenTimes: listeningTimes,
    sensoryId: raw.sensorySensitivity ?? raw.sensoryId ?? null,
    identityId: raw.neurodivergence ?? raw.identityId ?? null,
    appearance: raw.appearancePreference ?? raw.appearance ?? "light",
  };
}
