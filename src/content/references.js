/**
 * References page — curated Mobbin screens mapped to Sonocea key screens.
 */

export const REFERENCES_HERO = {
  eyebrow: "Curated Library · Mobbin",
  title: "References",
  intro:
    "External app patterns we are actively borrowing from — organised by key screen so every wireframe in the catalogue has real-world precedent.",
};

/** @param {string} image @param {string} mobbinUrl */
function s(image, mobbinUrl) {
  return { image, mobbinUrl };
}

/** @typedef {{ id: string; title: string; app: string; note: string; screens: ReturnType<typeof s>[] }} ReferenceItem */
/** @typedef {{ id: string; title: string; purpose: string; items: ReferenceItem[] }} ReferenceScreenGroup */
/** @typedef {{ id: string; label: string; title: string; description: string; screenGroups: ReferenceScreenGroup[] }} ReferenceSection */

/** @type {ReferenceSection[]} */
export const REFERENCE_SECTIONS = [
  {
    id: "refs-app-entry",
    label: "App Entry",
    title: "App Entry",
    description: "Cold start, first impression, and routing visitors into the right path.",
    screenGroups: [
      {
        id: "splash",
        title: "Splash",
        purpose: "Brand moment on cold start.",
        items: [
          {
            id: "headspace-splash",
            title: "Character-led brand splash",
            app: "Headspace",
            note: "Warm illustration and single logo mark — no loading chrome. Sets tone before any copy appears.",
            screens: [s("https://mobbin.com/api/mcp/short/TjWPMCmC", "https://mobbin.com/screens/591a06ec-488c-4305-a1a9-4b570360340a")],
          },
          {
            id: "calm-splash",
            title: "Atmospheric scene splash",
            app: "Calm",
            note: "Full-bleed nature photography with script wordmark. Premium without feeling clinical.",
            screens: [s("https://mobbin.com/api/mcp/short/GNvYsAY2", "https://mobbin.com/screens/256694bf-d406-40a9-8d35-da486c68a3aa")],
          },
        ],
      },
      {
        id: "get-started",
        title: "Get Started",
        purpose: "Entry decision — discover or sign in.",
        items: [
          {
            id: "headspace-welcome",
            title: "Illustrated welcome with dual CTAs",
            app: "Headspace",
            note: "Create account vs log in as equal-weight buttons. Terms checkbox keeps legal inline without a separate screen.",
            screens: [s("https://mobbin.com/api/mcp/short/TjWPMCmC", "https://mobbin.com/screens/591a06ec-488c-4305-a1a9-4b570360340a")],
          },
          {
            id: "headspace-carousel",
            title: "Value-prop carousel",
            app: "Headspace",
            note: "Three short benefit statements with pagination dots — good for explaining Sonocea before asking for commitment.",
            screens: [s("https://mobbin.com/api/mcp/short/QTUbzHCe", "https://mobbin.com/screens/591a06ec-488c-4305-a1a9-4b570360340a")],
          },
          {
            id: "headspace-onboarding-intro",
            title: "Personalised greeting",
            app: "Headspace",
            note: "Uses the listener's name and sets expectations for a short questionnaire ahead.",
            screens: [s("https://mobbin.com/api/mcp/short/76kiTnVc", "https://mobbin.com/screens/d5d90f35-dfc3-4987-b276-4813b15179fa")],
          },
        ],
      },
      {
        id: "path-selection",
        title: "Path Selection",
        purpose: "Route to public visitor or authentication.",
        items: [
          {
            id: "headspace-path",
            title: "Explore vs account fork",
            app: "Headspace",
            note: "Clear primary and secondary paths without overwhelming choice. Good model for sample vs invite flows.",
            screens: [s("https://mobbin.com/api/mcp/short/gzicwiZM", "https://mobbin.com/screens/ded504bd-335d-4de2-bd0a-7874baa860cd")],
          },
          {
            id: "open-discover",
            title: "Category-led discovery entry",
            app: "Open",
            note: "Large editorial tiles for intent (Breathe, Move, Meditate) — useful for routing visitors by goal rather than account type.",
            screens: [s("https://mobbin.com/api/mcp/short/bDMQAVQK", "https://mobbin.com/screens/006aebb4-491c-4fc8-a7f8-f49def2641d5")],
          },
        ],
      },
    ],
  },
  {
    id: "refs-authentication",
    label: "Authentication",
    title: "Authentication",
    description: "Invite redemption, sign-in, registration, and validation states.",
    screenGroups: [
      {
        id: "accept-invite",
        title: "Accept Invitation",
        purpose: "Deep link entry from partner invite.",
        items: [
          {
            id: "headspace-invite",
            title: "Warm account creation",
            app: "Headspace",
            note: "Minimal fields, inline legal copy, and social sign-in as alternatives. Keeps invite redemption feeling lightweight.",
            screens: [s("https://mobbin.com/api/mcp/short/9y1NfEKt", "https://mobbin.com/screens/a4d29ce8-bed7-438e-9c7f-6e1deee6e811")],
          },
          {
            id: "headspace-signup",
            title: "Structured sign-up form",
            app: "Headspace",
            note: "Underline inputs with clear field labels. Apple and Facebook as secondary paths reduce friction for invited listeners.",
            screens: [s("https://mobbin.com/api/mcp/short/HZ1julVa", "https://mobbin.com/screens/2928a487-f8bf-4d33-ae70-3e42b879d554")],
          },
        ],
      },
      {
        id: "login",
        title: "Login",
        purpose: "Returning listener sign in.",
        items: [
          {
            id: "headspace-login",
            title: "Returning user entry",
            app: "Headspace",
            note: "Log in as a text link below the primary create-account CTA — avoids forcing new users through a sign-in wall.",
            screens: [s("https://mobbin.com/api/mcp/short/gzicwiZM", "https://mobbin.com/screens/ded504bd-335d-4de2-bd0a-7874baa860cd")],
          },
        ],
      },
      {
        id: "create-account",
        title: "Create Account",
        purpose: "New listener registration.",
        items: [
          {
            id: "headspace-create",
            title: "Let's get started form",
            app: "Headspace",
            note: "Conversational headline with progressive disclosure. Social auth below the fold for users who prefer it.",
            screens: [s("https://mobbin.com/api/mcp/short/9y1NfEKt", "https://mobbin.com/screens/a4d29ce8-bed7-438e-9c7f-6e1deee6e811")],
          },
        ],
      },
      {
        id: "validation",
        title: "Validation",
        purpose: "Invite token validation loading.",
        items: [
          {
            id: "linear-settings-load",
            title: "Restrained loading state",
            app: "Linear Mobile",
            note: "No spinner theatre — content area stays calm while async validation runs. Good reference for token checks.",
            screens: [s("https://mobbin.com/api/mcp/short/1hCrqR3L", "https://mobbin.com/screens/dcea67ad-1c09-4964-9ca2-97d04ec16201")],
          },
        ],
      },
    ],
  },
  {
    id: "refs-onboarding",
    label: "Onboarding",
    title: "Listener Onboarding",
    description: "First-run education, personalisation, and permission capture for authenticated listeners.",
    screenGroups: [
      {
        id: "onb-welcome",
        title: "Welcome",
        purpose: "Personalised greeting.",
        items: [
          {
            id: "headspace-onb-welcome",
            title: "Named welcome with scroll cue",
            app: "Headspace",
            note: "Personalised headline and a downward arrow cue for multi-step onboarding below the fold.",
            screens: [s("https://mobbin.com/api/mcp/short/76kiTnVc", "https://mobbin.com/screens/d5d90f35-dfc3-4987-b276-4813b15179fa")],
          },
          {
            id: "headspace-here-we-go",
            title: "Journey kick-off",
            app: "Headspace",
            note: "Single character illustration and one CTA — minimal copy before the first real question.",
            screens: [s("https://mobbin.com/api/mcp/short/zYung6S9", "https://mobbin.com/screens/72b908a7-50c6-4a9b-b963-0794b7cc83b7")],
          },
        ],
      },
      {
        id: "listening-guidance",
        title: "Listening Guidance",
        purpose: "When and how to listen.",
        items: [
          {
            id: "headspace-sleep-intro",
            title: "Feature-specific guidance",
            app: "Headspace",
            note: "Dark mode intro with icon, short explanation, and single Get Started CTA. Good for headphones/environment tips.",
            screens: [s("https://mobbin.com/api/mcp/short/jXosQttz", "https://mobbin.com/screens/2d137d7d-d641-44cc-8c7d-7be544b0d410")],
          },
          {
            id: "calm-session-intro",
            title: "Session context before play",
            app: "Calm",
            note: "Author and narrator credits with duration visible before playback begins — sets clinical expectations.",
            screens: [s("https://mobbin.com/api/mcp/short/G2ocaQEs", "https://mobbin.com/screens/fe0d7e4a-6e75-4a2c-83e5-9201f80b8c6b")],
          },
        ],
      },
      {
        id: "personalisation",
        title: "Personalisation",
        purpose: "Neurotype and preferences.",
        items: [
          {
            id: "tph-experience",
            title: "Experience level cards",
            app: "Ten Percent Happier",
            note: "Icon metaphors help users self-identify quickly. Warm highlight on selection turns a survey into a conversation.",
            screens: [s("https://mobbin.com/api/mcp/short/tLlQWiWu", "https://mobbin.com/screens/6ba4099d-44bd-44a4-bacc-35b41242dda9")],
          },
          {
            id: "tph-goals",
            title: "Multi-select goal grid",
            app: "Ten Percent Happier",
            note: "2×3 grid of selectable goals with yellow gradient on active cards. Maps well to neurotype profiling.",
            screens: [s("https://mobbin.com/api/mcp/short/0Lz1ZGyp", "https://mobbin.com/screens/d00d199f-b076-4e0c-aecc-a723bb00bf70")],
          },
          {
            id: "tph-ranking",
            title: "Ranked goal priority",
            app: "Ten Percent Happier",
            note: "Numbered badges appear on tap to rank goals — useful if Sonocea needs ordered preferences, not just selection.",
            screens: [s("https://mobbin.com/api/mcp/short/FjINNdFa", "https://mobbin.com/screens/3e372797-e682-47d3-bf7c-f9fee298b33a")],
          },
          {
            id: "liven-goals",
            title: "Health goal selection",
            app: "Liven",
            note: "Outlined cards with emoji icons on soft gradients. Goals feel approachable without clinical coldness.",
            screens: [s("https://mobbin.com/api/mcp/short/EAarN8Xu", "https://mobbin.com/screens/0c379643-c33e-4086-948b-a17a3fcf120e")],
          },
        ],
      },
      {
        id: "permissions",
        title: "Permissions",
        purpose: "Notification and audio permissions.",
        items: [
          {
            id: "5min-reminders",
            title: "Reminder permission framing",
            app: "5 Minute Journal",
            note: "Toggle-based reminder setup with time pickers — a calm way to request notification access with clear value.",
            screens: [s("https://mobbin.com/api/mcp/short/4AaXPxIq", "https://mobbin.com/screens/c34722c8-d76d-46bb-a2a0-e6e591e3e41b")],
          },
        ],
      },
      {
        id: "completion",
        title: "Completion",
        purpose: "Onboarding complete transition.",
        items: [
          {
            id: "headspace-explore",
            title: "Onboarding complete CTA",
            app: "Headspace",
            note: "Character illustration and a single Explore button — celebrates completion without gamification.",
            screens: [s("https://mobbin.com/api/mcp/short/zYung6S9", "https://mobbin.com/screens/72b908a7-50c6-4a9b-b963-0794b7cc83b7")],
          },
          {
            id: "tph-learning",
            title: "Learning style question",
            app: "Ten Percent Happier",
            note: "Final profiling step before the main app — progress bar shows the end is near.",
            screens: [s("https://mobbin.com/api/mcp/short/3g8NqL54", "https://mobbin.com/screens/49b6196c-4d30-4d02-bd8b-394d93901cda")],
          },
        ],
      },
    ],
  },
  {
    id: "refs-listener",
    label: "Listener",
    title: "Listener Experience",
    description: "The core authenticated loop — home, library, session detail, player, completion, and feedback.",
    screenGroups: [
      {
        id: "home",
        title: "Home",
        purpose: "Primary hub — next session and progress.",
        items: [
          {
            id: "open-nav",
            title: "Icon tab navigation",
            app: "Open",
            note: "Icon-only bottom bar with short labels. Clean and lightweight — navigation present but never competing with content.",
            screens: [s("https://mobbin.com/api/mcp/short/4Ysf6zof", "https://mobbin.com/screens/e47ea963-4544-4760-b941-1c8571e2567d")],
          },
          {
            id: "calm-home-daily",
            title: "Editorial daily session",
            app: "Calm",
            note: "Featured session card leads the home screen. Warm photography, clear CTA, bottom nav stays out of the way.",
            screens: [s("https://mobbin.com/api/mcp/short/uXDc2FUh", "https://mobbin.com/screens/642c1c8a-90b9-4ebd-ae3c-f8163dca2aa5")],
          },
          {
            id: "calm-home-streak",
            title: "Weekly progress ring",
            app: "Calm",
            note: "Streak counter with day-by-day checkmarks — gentle accountability without streak pressure or gamification.",
            screens: [s("https://mobbin.com/api/mcp/short/kD8jQmmQ", "https://mobbin.com/screens/82e555db-347c-4690-95fe-fb1d395b9c7e")],
          },
          {
            id: "calm-home-carousel",
            title: "Horizontal content rails",
            app: "Calm",
            note: "Multiple editorial rows (Popular, Dailies) with See All affordance. Good for surfacing next session plus discovery.",
            screens: [s("https://mobbin.com/api/mcp/short/fmbWKXWZ", "https://mobbin.com/screens/553b90a2-471e-449f-9ea7-d5d5a327e54d")],
          },
        ],
      },
      {
        id: "library",
        title: "Library",
        purpose: "All assigned sessions.",
        items: [
          {
            id: "open-library",
            title: "Dark editorial catalogue",
            app: "Open",
            note: "Session library as editorial content — abstract artwork, horizontal scroll sections, filter affordance.",
            screens: [s("https://mobbin.com/api/mcp/short/AzfeVUcV", "https://mobbin.com/screens/4f8c49be-8468-4602-90d4-4b3e93e474eb")],
          },
          {
            id: "open-discover-grid",
            title: "Category grid browse",
            app: "Open",
            note: "Large photography tiles for intent categories. Premium dark mode without feeling like a dashboard.",
            screens: [s("https://mobbin.com/api/mcp/short/2SsGdkTX", "https://mobbin.com/screens/ac27c2d6-ab07-44c6-a75b-33877f52da22")],
          },
          {
            id: "hatch-library",
            title: "Filtered library tabs",
            app: "Hatch Sleep",
            note: "Top tabs (Cue, Unwind, Sleep, Wake) with horizontal card rails — good for filtering assigned sessions by state.",
            screens: [s("https://mobbin.com/api/mcp/short/WWYNd01b", "https://mobbin.com/screens/d477f64d-bda4-45df-90be-d7a813dfc864")],
          },
        ],
      },
      {
        id: "session-detail",
        title: "Session Detail",
        purpose: "Pre-session context and begin CTA.",
        items: [
          {
            id: "calm-course-detail",
            title: "Course detail with track list",
            app: "Calm",
            note: "Instructor bio, Play CTA, and numbered lesson list. Shows how to present duration, benefits, and audience before listening.",
            screens: [s("https://mobbin.com/api/mcp/short/8cbRR64i", "https://mobbin.com/screens/842de1a5-a0ea-4065-ba1c-8768b280daef")],
          },
          {
            id: "calm-session-actions",
            title: "Action sheet for session",
            app: "Calm",
            note: "Favorite, download, and share in a bottom sheet — keeps the detail screen clean while surfacing secondary actions.",
            screens: [s("https://mobbin.com/api/mcp/short/G2ocaQEs", "https://mobbin.com/screens/fe0d7e4a-6e75-4a2c-83e5-9201f80b8c6b")],
          },
          {
            id: "open-series-detail",
            title: "Series with episode carousel",
            app: "Open",
            note: "Numbered track list with related series below. Start CTA pinned at bottom — clear pre-session hierarchy.",
            screens: [s("https://mobbin.com/api/mcp/short/PosD3tgn", "https://mobbin.com/screens/6184ee40-c631-4703-ac56-f4bffd3415e1")],
          },
        ],
      },
      {
        id: "player",
        title: "Player",
        purpose: "Core listening experience.",
        items: [
          {
            id: "endel-ambient",
            title: "Ambient full-screen player",
            app: "Endel",
            note: "Playback is the entire screen. No album art, no lists — just atmosphere and a single control focus. North star for listening mode.",
            screens: [s("https://mobbin.com/api/mcp/short/1WXKP7yV", "https://mobbin.com/screens/2f7285e1-0262-4cf7-8d79-650f582d1560")],
          },
          {
            id: "endel-focus",
            title: "Generative visual player",
            app: "Endel",
            note: "Abstract line art as the hero element. Environmental context (time of day, light level) shown as subtle metadata.",
            screens: [s("https://mobbin.com/api/mcp/short/IaAWlw94", "https://mobbin.com/screens/37166492-86ed-45c4-9708-90b7b3f3fee2")],
          },
          {
            id: "calm-session",
            title: "Meditation session player",
            app: "Calm",
            note: "Timer-led session with nature imagery and minimal controls. Healthcare-appropriate — calm without feeling medical.",
            screens: [s("https://mobbin.com/api/mcp/short/T8mNInLc", "https://mobbin.com/screens/a6c07d14-06fa-4e8a-b9c4-6a2384167c97")],
          },
          {
            id: "calm-sleep-player",
            title: "Narrator-led sleep story",
            app: "Calm",
            note: "Author and narrator credits with 15-second skip controls. Good for longer clinical sessions with clear progress.",
            screens: [s("https://mobbin.com/api/mcp/short/wEkr4KgV", "https://mobbin.com/screens/0fa966a3-dd8b-496f-9a7d-6fe45ababd6f")],
          },
          {
            id: "soundcloud-waveform",
            title: "Waveform as brand signature",
            app: "SoundCloud",
            note: "The waveform is the visual identity — not decorative album art. Sound becomes the hero element on screen.",
            screens: [s("https://mobbin.com/api/mcp/short/OgHtK3eM", "https://mobbin.com/screens/12c87be5-b840-471a-95c6-c16c31f4d9d5")],
          },
        ],
      },
      {
        id: "session-complete",
        title: "Session Complete",
        purpose: "Completion celebration.",
        items: [
          {
            id: "calm-completion",
            title: "Post-session reflection",
            app: "Calm",
            note: "Celebrates completion with a quote and soft actions — no gamification, no streak pressure.",
            screens: [s("https://mobbin.com/api/mcp/short/FsvXnKu1", "https://mobbin.com/screens/7728c50d-4fe2-4bb5-9150-a5922d84415f")],
          },
          {
            id: "calm-quote-card",
            title: "Shareable quote card",
            app: "Calm",
            note: "Photography-backed quote with share affordance. Keeps the reflective mood intact after playback ends.",
            screens: [s("https://mobbin.com/api/mcp/short/IpClmKGu", "https://mobbin.com/screens/a13acb18-7a40-4c0f-8edf-a49b684e1e71")],
          },
          {
            id: "calm-daily-reflection",
            title: "Reflection history",
            app: "Calm",
            note: "Prior reflections shown as dated cards below the next-session prompt — light journaling without a separate app.",
            screens: [s("https://mobbin.com/api/mcp/short/7xOIcuYr", "https://mobbin.com/screens/feb92e75-a5ba-4cc8-ba68-5e976576ba5e")],
          },
        ],
      },
      {
        id: "feedback",
        title: "Feedback",
        purpose: "Post-session rating and notes.",
        items: [
          {
            id: "5min-mood",
            title: "Emoji-anchored mood slider",
            app: "5 Minute Journal",
            note: "Large mood face with a stepped slider below. Subjective input made intuitive without forcing precise numbers.",
            screens: [s("https://mobbin.com/api/mcp/short/5ooWuXAS", "https://mobbin.com/screens/cf0daa49-3289-4f05-ac9a-3a0a2fe50b0a")],
          },
          {
            id: "calm-mood-checkin",
            title: "Mood check-in prompt",
            app: "Calm",
            note: "Soft transition from completion to How are you feeling? — keeps feedback optional and conversational.",
            screens: [s("https://mobbin.com/api/mcp/short/GuJv6ZAv", "https://mobbin.com/screens/81ffdb2c-2a4a-4e19-9225-9299bac2c266")],
          },
          {
            id: "liven-feelings",
            title: "Multi-tag feeling capture",
            app: "Liven",
            note: "Chip grid for selecting multiple feelings with inline definitions. Good for richer post-session feedback.",
            screens: [s("https://mobbin.com/api/mcp/short/2qBhWfuR", "https://mobbin.com/screens/53c6fd22-9ee4-49a3-9e5e-78bb460b3c86")],
          },
        ],
      },
    ],
  },
  {
    id: "refs-public-visitor",
    label: "Public Visitor",
    title: "Public Visitor",
    description: "The unauthenticated sample journey — check-in, sample playback, reflection, and access request.",
    screenGroups: [
      {
        id: "pv-welcome",
        title: "Welcome",
        purpose: "Introduce curated sample experience.",
        items: [
          {
            id: "headspace-pv-welcome",
            title: "Benefit-led welcome",
            app: "Headspace",
            note: "Three clear outcomes (stress, movement, sleep) before any account ask. Good for public visitor positioning.",
            screens: [s("https://mobbin.com/api/mcp/short/ShbMKN1q", "https://mobbin.com/screens/7dba3826-1195-4066-a96d-a894870048ec")],
          },
          {
            id: "calm-pv-hero",
            title: "Immersive scene welcome",
            app: "Calm",
            note: "Full-bleed landscape with script wordmark — premium first impression for a clinical product.",
            screens: [s("https://mobbin.com/api/mcp/short/U3TzMHau", "https://mobbin.com/screens/233d2d54-7e43-44fc-a139-4cf1cb47eb43")],
          },
        ],
      },
      {
        id: "check-in",
        title: "Check-In",
        purpose: "Baseline state capture.",
        items: [
          {
            id: "5min-journal",
            title: "Multi-slider baseline capture",
            app: "5 Minute Journal",
            note: "Multiple dimensions on one screen — stress, energy, focus — without splitting into separate steps.",
            screens: [s("https://mobbin.com/api/mcp/short/2yi7qKIg", "https://mobbin.com/screens/0d970181-aeb1-4038-b763-b493478fed85")],
          },
          {
            id: "liven-checkin",
            title: "Multi-select symptom cards",
            app: "Liven",
            note: "Choose all that apply with emoji icons. Low friction for a pre-session baseline without feeling clinical.",
            screens: [s("https://mobbin.com/api/mcp/short/MoW9iGNE", "https://mobbin.com/screens/8cd1c622-5b13-4592-8c66-03118325a84a")],
          },
          {
            id: "alan-mood",
            title: "Emoji-anchored mood slider",
            app: "Alan Mind",
            note: "Emoji anchors give users a starting point without forcing precise numbers.",
            screens: [s("https://mobbin.com/api/mcp/short/DHd2IDdH", "https://mobbin.com/screens/d5fb8a67-61ff-4d31-883b-15bd0b019b22")],
          },
        ],
      },
      {
        id: "headphones",
        title: "Headphones",
        purpose: "Audio setup guidance.",
        items: [
          {
            id: "headspace-sleep-setup",
            title: "Audio feature introduction",
            app: "Headspace",
            note: "Icon, short copy, and single CTA for a setup step. Good pattern for headphones guidance.",
            screens: [s("https://mobbin.com/api/mcp/short/jXosQttz", "https://mobbin.com/screens/2d137d7d-d641-44cc-8c7d-7be544b0d410")],
          },
        ],
      },
      {
        id: "public-session",
        title: "Public Session",
        purpose: "5-minute sample playback.",
        items: [
          {
            id: "calm-sample",
            title: "Sample session player",
            app: "Calm",
            note: "Short nature-led session with minimal chrome. Same player patterns as authenticated listening, scoped to five minutes.",
            screens: [s("https://mobbin.com/api/mcp/short/VT3jIIfg", "https://mobbin.com/screens/ce540cb6-56eb-4499-9659-c1dd2a769bf6")],
          },
          {
            id: "endel-sample",
            title: "Atmospheric sample playback",
            app: "Endel",
            note: "Full-screen generative visuals with a single play control — shows how a sample can feel immersive without feature bloat.",
            screens: [s("https://mobbin.com/api/mcp/short/mMaud1Nt", "https://mobbin.com/screens/2f7285e1-0262-4cf7-8d79-650f582d1560")],
          },
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        purpose: "Post-sample mood capture.",
        items: [
          {
            id: "calm-reflection-quote",
            title: "Quote-led reflection",
            app: "Calm",
            note: "Serif quote on blurred background with a single Continue CTA. Keeps the mood reflective, not survey-like.",
            screens: [s("https://mobbin.com/api/mcp/short/PKMtZc1w", "https://mobbin.com/screens/617d9c4e-ab70-4ab2-8239-529fe10b6622")],
          },
          {
            id: "calm-reflection-share",
            title: "Time-of-day reflection",
            app: "Calm",
            note: "Morning / Afternoon / Night selector with a shareable quote card — optional depth after a short sample.",
            screens: [s("https://mobbin.com/api/mcp/short/cMGtQ09V", "https://mobbin.com/screens/130d37dd-d33d-4365-a86c-701f9c8039e8")],
          },
        ],
      },
      {
        id: "science",
        title: "Science",
        purpose: "Evidence-based explanation.",
        items: [
          {
            id: "open-for-you",
            title: "Editorial science framing",
            app: "Open",
            note: "For You section with breathwork explanation in plain language. Science content as editorial, not a white paper.",
            screens: [s("https://mobbin.com/api/mcp/short/jSNIFhjd", "https://mobbin.com/screens/f90aa03c-22ba-4fb5-b80b-322300924195")],
          },
          {
            id: "calm-daily-move",
            title: "Benefit-led content card",
            app: "Calm",
            note: "Session card with theme line (You Are Resilient) — shows how to pair evidence claims with human language.",
            screens: [s("https://mobbin.com/api/mcp/short/5nbq51QD", "https://mobbin.com/screens/3d414fc2-d5d7-44df-810e-c5b81b38664b")],
          },
        ],
      },
      {
        id: "request-access",
        title: "Request Access",
        purpose: "Organisational interest form.",
        items: [
          {
            id: "headspace-signup-form",
            title: "Minimal interest form",
            app: "Headspace",
            note: "Few fields, clear labels, and inline legal copy. Good reference for organisational access requests.",
            screens: [s("https://mobbin.com/api/mcp/short/HZ1julVa", "https://mobbin.com/screens/2928a487-f8bf-4d33-ae70-3e42b879d554")],
          },
        ],
      },
    ],
  },
  {
    id: "refs-support",
    label: "Support",
    title: "Support",
    description: "Settings, about, help, policies, and research surfaces for authenticated listeners.",
    screenGroups: [
      {
        id: "settings",
        title: "Settings",
        purpose: "Account and app preferences.",
        items: [
          {
            id: "linear-settings",
            title: "Structured settings list",
            app: "Linear Mobile",
            note: "Information-dense settings without feeling like a control panel. Section grouping and clear row hierarchy.",
            screens: [s("https://mobbin.com/api/mcp/short/bQgww6tK", "https://mobbin.com/screens/7c9911cb-421f-4689-b661-db9c74e44208")],
          },
          {
            id: "linear-settings-sheet",
            title: "Modal settings surface",
            app: "Linear Mobile",
            note: "Sheet presentation with grouped rows and external-link affordance. Clean pattern for in-app settings.",
            screens: [s("https://mobbin.com/api/mcp/short/1hCrqR3L", "https://mobbin.com/screens/dcea67ad-1c09-4964-9ca2-97d04ec16201")],
          },
          {
            id: "5min-settings",
            title: "Toggle-heavy preferences",
            app: "5 Minute Journal",
            note: "Reminder toggles with inline time pickers — good for notification and audio preference rows.",
            screens: [s("https://mobbin.com/api/mcp/short/4AaXPxIq", "https://mobbin.com/screens/c34722c8-d76d-46bb-a2a0-e6e591e3e41b")],
          },
        ],
      },
      {
        id: "about",
        title: "About",
        purpose: "Company and product info.",
        items: [
          {
            id: "linear-about-links",
            title: "External links pattern",
            app: "Linear Mobile",
            note: "Support, privacy, and feedback as rows with external-link icons — keeps about content lightweight.",
            screens: [s("https://mobbin.com/api/mcp/short/aPhILgjE", "https://mobbin.com/screens/23591818-cd56-45d5-ad8c-d8a527e85e6c")],
          },
        ],
      },
      {
        id: "support-screen",
        title: "Support",
        purpose: "Help and contact.",
        items: [
          {
            id: "linear-support",
            title: "Support row with feedback",
            app: "Linear Mobile",
            note: "Send feedback and Support as distinct rows. Clear separation between self-serve and contact.",
            screens: [s("https://mobbin.com/api/mcp/short/2FWpcPvz", "https://mobbin.com/screens/14389b2b-4cfd-4ade-9ed9-54db68a49ca6")],
          },
        ],
      },
      {
        id: "policies",
        title: "Policies",
        purpose: "Privacy and terms.",
        items: [
          {
            id: "headspace-legal",
            title: "Inline legal disclosure",
            app: "Headspace",
            note: "Terms and privacy as tappable inline links within forms — avoids a separate policies wall.",
            screens: [s("https://mobbin.com/api/mcp/short/HZ1julVa", "https://mobbin.com/screens/2928a487-f8bf-4d33-ae70-3e42b879d554")],
          },
        ],
      },
      {
        id: "research",
        title: "Research",
        purpose: "Clinical publications.",
        items: [
          {
            id: "open-programs",
            title: "Programme-style content list",
            app: "Open",
            note: "Recents, Favourites, and Programmes as editorial list items — good for surfacing clinical publications.",
            screens: [s("https://mobbin.com/api/mcp/short/jSNIFhjd", "https://mobbin.com/screens/f90aa03c-22ba-4fb5-b80b-322300924195")],
          },
        ],
      },
    ],
  },
];

export function countReferenceItems(sections = REFERENCE_SECTIONS) {
  return sections.reduce(
    (total, section) =>
      total +
      section.screenGroups.reduce((groupTotal, group) => groupTotal + group.items.length, 0),
    0,
  );
}

export function countReferenceScreens(sections = REFERENCE_SECTIONS) {
  return sections.reduce((total, section) => total + section.screenGroups.length, 0);
}
