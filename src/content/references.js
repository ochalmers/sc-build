/**
 * References page - curated Mobbin screens mapped to Sonocea key screens.
 */

export const REFERENCES_HERO = {
  eyebrow: "Curated Library · Mobbin",
  title: "References",
  intro:
    "Fresh Mobbin pulls mapped to Sonocea - especially invite entry, science education, neurotype-style personalisation, and listen-prep. Every thumbnail links to the live screen on Mobbin.",
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
            note: "Warm illustration and single logo mark - no loading chrome. Sets tone before any copy appears.",
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
        purpose: "Entry decision - discover or sign in.",
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
            note: "Three short benefit statements with pagination dots - good for explaining Sonocea before asking for commitment.",
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
            note: "Large editorial tiles for intent (Breathe, Move, Meditate) - useful for routing visitors by goal rather than account type.",
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
    description:
      "Invite redemption is the Sonocea entry path - code entry, partner affiliation, and returning sign-in.",
    screenGroups: [
      {
        id: "accept-invite",
        title: "Accept Invitation",
        purpose: "Deep link / code entry from Partner invite.",
        items: [
          {
            id: "numo-invite-code",
            title: "Invite code with SMS example",
            app: "Numo",
            note: "Shows what an invite looks like in Messages, highlights the code, then asks the user to enter it - the closest pattern to Sonocea Partner invite redemption.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/mt7a6yUt",
                "https://mobbin.com/screens/6d74c4e6-b0b1-4754-89d3-0e2f32be2e09",
              ),
            ],
          },
          {
            id: "whoop-invite-code",
            title: "Referral / invite code field",
            app: "WHOOP",
            note: "Dedicated invite-code step with clear Continue - simple, high-contrast, easy to map onto organisation affiliation.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/GYwDYYGJ",
                "https://mobbin.com/screens/bd6a533b-4762-4f63-96de-acf3c4ac27d2",
              ),
            ],
          },
          {
            id: "digg-invite",
            title: "Invitation acceptance framing",
            app: "Digg",
            note: "Invitation-led join flow - useful for how we phrase “you’ve been invited by [Organisation]”.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/TKkJhzEe",
                "https://mobbin.com/screens/26dd060f-27db-4f7b-a8b9-7c604f6ae0b9",
              ),
            ],
          },
          {
            id: "life360-invite",
            title: "Circle invite join",
            app: "Life360",
            note: "Join-an-existing-group pattern - maps to associating a Listener with a Partner seat pool.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/HKotys7x",
                "https://mobbin.com/screens/b85ca57e-6a8d-4ce7-8fc4-c6f9e1c1f865",
              ),
            ],
          },
          {
            id: "paired-invite",
            title: "Partner invite code",
            app: "Paired",
            note: "Enter-your-partner’s-code pattern - close analogue for Listener ↔ Organisation association.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/iZjFixcI",
                "https://mobbin.com/screens/9db90a5d-e0ae-4c48-b3a9-5811753d5eb6",
              ),
            ],
          },
          {
            id: "koho-invite",
            title: "Invite link claim",
            app: "KOHO",
            note: "Claim-an-invite framing with organisation context - good for Partner-branded welcome.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/575LQ0ej",
                "https://mobbin.com/screens/22d69f47-b7a5-4c5b-98e2-4857bffa1ffa",
              ),
            ],
          },
        ],
      },
      {
        id: "login",
        title: "Login",
        purpose: "Returning listener sign in.",
        items: [
          {
            id: "calm-create-account",
            title: "Create account to save progress",
            app: "Calm",
            note: "Benefit-led auth (“save your progress”) with email / Apple / Google - keeps returning vs first-time paths clear.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/RhK7GEuZ",
                "https://mobbin.com/screens/6c44f8a4-eb9e-409e-90d6-39c725eae85a",
              ),
            ],
          },
          {
            id: "headspace-login",
            title: "Returning user entry",
            app: "Headspace",
            note: "Log in as a secondary path below create-account - avoids forcing invited Listeners through a sign-in wall.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/gzicwiZM",
                "https://mobbin.com/screens/ded504bd-335d-4de2-bd0a-7874baa860cd",
              ),
            ],
          },
        ],
      },
      {
        id: "create-account",
        title: "Create Account",
        purpose: "New listener registration after invite.",
        items: [
          {
            id: "calm-signup-form",
            title: "Name + email + password form",
            app: "Calm",
            note: "Minimal fields with live password rules - enough identity for an invited Listener without feeling like a bank signup.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/r64Kt1gF",
                "https://mobbin.com/screens/d3896bea-1c28-48e0-9702-34403aab7635",
              ),
            ],
          },
          {
            id: "headspace-create",
            title: "Let's get started form",
            app: "Headspace",
            note: "Conversational headline with progressive disclosure. Social auth as secondary path.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/9y1NfEKt",
                "https://mobbin.com/screens/a4d29ce8-bed7-438e-9c7f-6e1deee6e811",
              ),
            ],
          },
        ],
      },
      {
        id: "org-link",
        title: "Organisation link",
        purpose: "Associate Listener with Partner / employer plan.",
        items: [
          {
            id: "calm-link-org",
            title: "Link organisation subscription",
            app: "Calm",
            note: "Settings row for linking an employer / organisation plan - direct precedent for Partner affiliation after invite.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/pFZbXE5Z",
                "https://mobbin.com/screens/80367bc2-55bc-46ee-9b4e-85a8d447452b",
              ),
            ],
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
            note: "No spinner theatre - content area stays calm while async validation runs. Good reference for token checks.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/1hCrqR3L",
                "https://mobbin.com/screens/dcea67ad-1c09-4964-9ca2-97d04ec16201",
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    id: "refs-onboarding",
    label: "Onboarding",
    title: "Listener Onboarding",
    description:
      "First-run education, neurotype-style personalisation, listen-prep, and completion - the closest Mobbin patterns to Sonocea’s invite → science → questionnaire → ready-to-listen path.",
    screenGroups: [
      {
        id: "onb-welcome",
        title: "Welcome",
        purpose: "Personalised greeting and expectation setting.",
        items: [
          {
            id: "headspace-named-welcome",
            title: "Named welcome before questions",
            app: "Headspace",
            note: "Uses the Listener’s name and sets expectations for a short questionnaire ahead - maps to post-invite First-Time Experience.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/ojybakl6",
                "https://mobbin.com/screens/d5d90f35-dfc3-4987-b276-4813b15179fa",
              ),
            ],
          },
          {
            id: "visible-before-we-begin",
            title: "Before we begin expectations",
            app: "Visible",
            note: "Time estimate, save-and-return, and a calm disclaimer - ideal framing before a neurotype / health questionnaire.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/OJXlsw7l",
                "https://mobbin.com/screens/9cd27ff7-af0d-40ac-a147-081a7eaa1631",
              ),
            ],
          },
          {
            id: "craft-hi-name",
            title: "Hi [Name] - guided basics",
            app: "Craft",
            note: "Personalised interstitial that promises a short guided tour - good bridge from invite accept into Sonocea education.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/ps9O5fTq",
                "https://mobbin.com/screens/32a78968-4542-4e08-bb30-9b434117fe81",
              ),
            ],
          },
          {
            id: "calm-breath-interstitial",
            title: "Atmospheric interstitial",
            app: "Calm",
            note: "Gradient + single line (“take a deep breath”) - emotional reset before functional onboarding steps.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/jPpVGrn7",
                "https://mobbin.com/screens/2729b66d-9445-47f6-84a3-202a09595ca9",
              ),
            ],
          },
          {
            id: "balance-welcome",
            title: "Personalised path intro",
            app: "Balance",
            note: "Warm, conversational welcome into a tailored listening path - tone match for regulation-focused product.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/ebdv5444",
                "https://mobbin.com/screens/75539c33-9827-4c38-beec-28e84709ac62",
              ),
            ],
          },
        ],
      },
      {
        id: "science-education",
        title: "Science & product education",
        purpose: "Explain what Sonocea is before asking for preferences.",
        items: [
          {
            id: "imprint-science-cards",
            title: "Illustrated science explainers",
            app: "Imprint",
            note: "Card-based science education with strong visual metaphor - closest pattern to Sonocea’s About / science carousel.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/pVelPEYk",
                "https://mobbin.com/screens/bdfe3b6f-d6af-4720-8fae-bd60f1854ed1",
              ),
            ],
          },
          {
            id: "elevate-how-it-works",
            title: "How it works carousel",
            app: "Elevate",
            note: "Pagination dots + Skip + benefit headline - classic product-education beat before personalisation.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/4Hgh2dfN",
                "https://mobbin.com/screens/92181969-d18a-4d93-9ce5-52903067df2c",
              ),
            ],
          },
          {
            id: "nibble-learn-your-way",
            title: "Listen as a first-class mode",
            app: "Nibble",
            note: "Read / Play / Watch / Listen modes with headphones icon - validates audio-first framing in education.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/gvf0YL4Z",
                "https://mobbin.com/screens/cdb79ab9-e864-4df4-a318-bef874fb5262",
              ),
            ],
          },
          {
            id: "blinkist-headphones",
            title: "Headphones value prop",
            app: "Blinkist",
            note: "Illustration of listening with headphones + “Tell us your interests” CTA - education then personalisation in one beat.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/4ZjTHT3V",
                "https://mobbin.com/screens/45d8099f-476b-49bb-a2bb-3104d75f6f1d",
              ),
            ],
          },
          {
            id: "brilliant-interactive-learn",
            title: "Interactive concept teaching",
            app: "Brilliant",
            note: "Teaching a concept before asking the user to act - useful for Sonic Augmentation / “what is Sonocea” slides.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/p0FO9taz",
                "https://mobbin.com/screens/ee02f4d6-2816-4117-9691-841e2a8f4893",
              ),
            ],
          },
          {
            id: "headspace-value-carousel",
            title: "Benefit carousel",
            app: "Headspace",
            note: "Short benefit statements with pagination - keep Sonocea education to one idea per screen.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/J8szspu3",
                "https://mobbin.com/screens/8f6d7315-ee63-4249-b56a-57d526420a88",
              ),
            ],
          },
        ],
      },
      {
        id: "listening-guidance",
        title: "Listening guidance & prep",
        purpose: "Headphones, environment, and get-ready checklist.",
        items: [
          {
            id: "stoic-how-to-meditate",
            title: "How-to steps before begin",
            app: "stoic.",
            note: "Numbered prep steps (sit, close eyes, breathe) then Begin - direct model for Sonocea’s get-ready checklist.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/GTNIKegi",
                "https://mobbin.com/screens/599f08b1-d195-421f-842b-3a0ce5af63b3",
              ),
            ],
          },
          {
            id: "peloton-getting-started",
            title: "Getting started checklist",
            app: "Peloton",
            note: "Expandable checklist with one active CTA - good if prep spans profile + preferences + first listen.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/c2vvHavT",
                "https://mobbin.com/screens/35166d20-06cd-4104-9355-9feba7f3290a",
              ),
            ],
          },
          {
            id: "strava-setup-checklist",
            title: "Required setup checklist",
            app: "Strava",
            note: "Required vs optional setup items with Finish disabled until done - useful for mandatory headphones / quiet-space acknowledgements.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/sNvpUqbb",
                "https://mobbin.com/screens/73ce97c1-4032-4c26-ae64-f5a4e0ca1105",
              ),
            ],
          },
          {
            id: "headspace-feature-intro",
            title: "Feature-specific guidance",
            app: "Headspace",
            note: "Dark intro with icon, short explanation, single Get Started - good for headphones / environment tips.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/jXosQttz",
                "https://mobbin.com/screens/2d137d7d-d641-44cc-8c7d-7be544b0d410",
              ),
            ],
          },
          {
            id: "oura-session-setup",
            title: "Pre-session setup sheet",
            app: "Oura",
            note: "Duration + soundscape chips before Start - shows how prep can sit immediately before first listen.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/AywJfMvx",
                "https://mobbin.com/screens/1e43c998-6ef7-4153-b54f-69c3e7e4f161",
              ),
            ],
          },
        ],
      },
      {
        id: "personalisation",
        title: "Personalisation / neurotype",
        purpose: "Self-identify experience, goals, and path - closest to Sonocea neurotype questionnaire.",
        items: [
          {
            id: "waking-up-experience",
            title: "Experience level - three large choices",
            app: "Waking Up",
            note: "Single question, three full-width answers on a calm sky - the cleanest neurotype-style self-ID pattern.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/psP60yPe",
                "https://mobbin.com/screens/5aa6e86c-9ab1-4524-85c0-5edded97cdf0",
              ),
            ],
          },
          {
            id: "tph-experience-icons",
            title: "Experience with growth metaphors",
            app: "Ten Percent Happier",
            note: "Acorn → tree icons make experience levels feel approachable - maps to gentle / recommended / choose-myself paths.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/OjiQtQdN",
                "https://mobbin.com/screens/44da61f9-4201-4421-9a50-651e96dfb941",
              ),
            ],
          },
          {
            id: "tph-experience-cards",
            title: "Experience level cards",
            app: "Ten Percent Happier",
            note: "Icon metaphors + warm selection highlight - survey as conversation, not clinical form.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/Ywgb7uB5",
                "https://mobbin.com/screens/6ba4099d-44bd-44a4-bacc-35b41242dda9",
              ),
            ],
          },
          {
            id: "tph-goals-grid",
            title: "Multi-select goal grid",
            app: "Ten Percent Happier",
            note: "2×3 selectable goals - maps directly to Sonocea support preferences (calmer, recovery, focus, sleep…).",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/Zhc2TPFX",
                "https://mobbin.com/screens/d00d199f-b076-4e0c-aecc-a723bb00bf70",
              ),
            ],
          },
          {
            id: "tph-ranking",
            title: "Ranked goal priority",
            app: "Ten Percent Happier",
            note: "Numbered badges on tap to rank goals - useful if we need ordered preferences, not just multi-select.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/GLBKcohi",
                "https://mobbin.com/screens/3e372797-e682-47d3-bf7c-f9fee298b33a",
              ),
            ],
          },
          {
            id: "alma-goals",
            title: "Health / therapy goals",
            app: "Alma",
            note: "Care-context goal selection - closer to clinical adjunct tone than consumer meditation apps.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/R8RPoUCh",
                "https://mobbin.com/screens/54144bb3-752f-4cf7-9449-b30d7d8acb83",
              ),
            ],
          },
          {
            id: "balance-goals",
            title: "Meditation goal chips",
            app: "Balance",
            note: "Multi-select chips with progress - calm wellness tone for support-need selection.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/nnGAn3ci",
                "https://mobbin.com/screens/29d475da-14fe-469b-8f1d-909fa4b695b4",
              ),
            ],
          },
          {
            id: "open-intent",
            title: "Intent / practice selection",
            app: "Open",
            note: "Editorial intent tiles (breathe, move, meditate) - route by goal rather than account type.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/Ymy38YWN",
                "https://mobbin.com/screens/3359f9c5-49bf-44e1-93a1-3301ab9f6f3f",
              ),
            ],
          },
          {
            id: "superpower-prefs",
            title: "Health preference multi-select",
            app: "Superpower",
            note: "Dense but scannable preference grid with progress - reference for longer neurotype questionnaires.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/4sykfocu",
                "https://mobbin.com/screens/485a179b-bb7f-447f-9ede-327d2afdcdb2",
              ),
            ],
          },
          {
            id: "ahead-emotion-path",
            title: "Emotion / regulation pathing",
            app: "Ahead",
            note: "Character-led emotional check-in during onboarding - useful if Sonocea asks how the Listener wants to be supported.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/IPjc86sV",
                "https://mobbin.com/screens/993776c5-1282-4f6f-8d5f-c331a7afd1fe",
              ),
              s(
                "https://mobbin.com/api/mcp/short/g2u8jRP6",
                "https://mobbin.com/screens/21e2271a-1c67-4ab2-8c9e-7cddc2297c14",
              ),
            ],
          },
          {
            id: "life-reset-profile",
            title: "Profile setup selection stack",
            app: "Life Reset",
            note: "Stacked choice cards through a short profile builder - good pacing for multi-step neurotype flow.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/B4Fx5EXP",
                "https://mobbin.com/screens/8fd948f0-9fc3-4df9-87d9-aba4d823ae44",
              ),
              s(
                "https://mobbin.com/api/mcp/short/VolmWhSD",
                "https://mobbin.com/screens/dcd0aab5-35cc-4aed-815d-03587c1c0c03",
              ),
            ],
          },
          {
            id: "liven-goals",
            title: "Health goal selection",
            app: "Liven",
            note: "Outlined cards with soft gradients - goals feel approachable without clinical coldness.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/EAarN8Xu",
                "https://mobbin.com/screens/0c379643-c33e-4086-948b-a17a3fcf120e",
              ),
            ],
          },
        ],
      },
      {
        id: "listen-time",
        title: "When to listen",
        purpose: "Preferred time of day / listening habit.",
        items: [
          {
            id: "tph-time-of-day",
            title: "Preferred practice time",
            app: "Ten Percent Happier",
            note: "Morning / afternoon / evening style choice - maps 1:1 to Sonocea listen-time preference.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/mlMu5ihU",
                "https://mobbin.com/screens/e61eb873-7a3c-44f7-a14d-5c3b2dccb7fc",
              ),
            ],
          },
          {
            id: "stoic-reminder-time",
            title: "Daily ritual timing",
            app: "stoic.",
            note: "When-do-you-want-to-practice framing with calm typography - good for evening / anytime options.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/nqYU4cNT",
                "https://mobbin.com/screens/8cbb24cf-f5a4-4772-be7f-a7d8ea6a204e",
              ),
            ],
          },
          {
            id: "brightmind-schedule",
            title: "Practice schedule pick",
            app: "Brightmind",
            note: "Schedule / time preference as part of meditation onboarding.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/fLpeJ1Ty",
                "https://mobbin.com/screens/750b618a-d0fb-4d92-83d1-e0b1c545bbb3",
              ),
            ],
          },
          {
            id: "breathwrk-goals-flow",
            title: "Breathing goals then habit",
            app: "Breathwrk",
            note: "Short onboarding that ties goals to when you’ll practice - compact reference for Sonocea’s final prefs steps.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/nS3Dp9lP",
                "https://mobbin.com/screens/170d48c6-120d-437a-8869-27550a5be31b",
              ),
              s(
                "https://mobbin.com/api/mcp/short/y7y4rcg5",
                "https://mobbin.com/screens/99044dff-8d51-4a76-8612-bf8c1e36ab25",
              ),
            ],
          },
        ],
      },
      {
        id: "permissions",
        title: "Permissions",
        purpose: "Notification soft-ask before system prompt.",
        items: [
          {
            id: "cosmos-notify-preask",
            title: "Notification pre-permission",
            app: "Cosmos",
            note: "Shows a lock-screen mock + Allow / No thanks before the system dialog - best-practice soft ask.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/5O83lFvA",
                "https://mobbin.com/screens/17ef31f5-0774-4014-bdd4-bc2902ead81c",
              ),
            ],
          },
          {
            id: "5min-reminders",
            title: "Reminder permission framing",
            app: "5 Minute Journal",
            note: "Toggle-based reminder setup with time pickers - calm way to request notification access with clear value.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/4AaXPxIq",
                "https://mobbin.com/screens/c34722c8-d76d-46bb-a2a0-e6e591e3e41b",
              ),
            ],
          },
        ],
      },
      {
        id: "completion",
        title: "Completion",
        purpose: "Onboarding complete → ready to listen.",
        items: [
          {
            id: "tiimo-im-ready",
            title: "Commit / I’m ready",
            app: "Tiimo",
            note: "Final commitment screen before entering the product - strong closer after neurotype + prep.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/pcudutcJ",
                "https://mobbin.com/screens/c13f9141-f412-4698-95ac-0775cf897870",
              ),
            ],
          },
          {
            id: "headspace-explore-done",
            title: "Onboarding complete CTA",
            app: "Headspace",
            note: "Single Explore CTA after profiling - celebrates completion without gamification noise.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/6DnHEcvQ",
                "https://mobbin.com/screens/08064d8c-1dde-4370-9bc6-ab1f6f5ca786",
              ),
            ],
          },
          {
            id: "tph-learning",
            title: "Final profiling step",
            app: "Ten Percent Happier",
            note: "Progress bar shows the end is near - last question before the main app.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/yGlgKkpG",
                "https://mobbin.com/screens/49b6196c-4d30-4d02-bd8b-394d93901cda",
              ),
            ],
          },
          {
            id: "waking-up-complete",
            title: "Path ready confirmation",
            app: "Waking Up",
            note: "Confirms the personalised path is set before first practice - good emotional beat for Sonocea programme handoff.",
            screens: [
              s(
                "https://mobbin.com/api/mcp/short/vfok9sLh",
                "https://mobbin.com/screens/1ad9ec4a-8ffe-4e91-af13-a855faa59dd1",
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    id: "refs-listener",
    label: "Listener",
    title: "Listener Experience",
    description: "The core authenticated loop - home, library, session detail, player, completion, and feedback.",
    screenGroups: [
      {
        id: "home",
        title: "Home",
        purpose: "Primary hub - next session and progress.",
        items: [
          {
            id: "open-nav",
            title: "Icon tab navigation",
            app: "Open",
            note: "Icon-only bottom bar with short labels. Clean and lightweight - navigation present but never competing with content.",
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
            note: "Streak counter with day-by-day checkmarks - gentle accountability without streak pressure or gamification.",
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
            note: "Session library as editorial content - abstract artwork, horizontal scroll sections, filter affordance.",
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
            note: "Top tabs (Cue, Unwind, Sleep, Wake) with horizontal card rails - good for filtering assigned sessions by state.",
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
            note: "Favorite, download, and share in a bottom sheet - keeps the detail screen clean while surfacing secondary actions.",
            screens: [s("https://mobbin.com/api/mcp/short/G2ocaQEs", "https://mobbin.com/screens/fe0d7e4a-6e75-4a2c-83e5-9201f80b8c6b")],
          },
          {
            id: "open-series-detail",
            title: "Series with episode carousel",
            app: "Open",
            note: "Numbered track list with related series below. Start CTA pinned at bottom - clear pre-session hierarchy.",
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
            note: "Playback is the entire screen. No album art, no lists - just atmosphere and a single control focus. North star for listening mode.",
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
            note: "Timer-led session with nature imagery and minimal controls. Healthcare-appropriate - calm without feeling medical.",
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
            note: "The waveform is the visual identity - not decorative album art. Sound becomes the hero element on screen.",
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
            note: "Celebrates completion with a quote and soft actions - no gamification, no streak pressure.",
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
            note: "Prior reflections shown as dated cards below the next-session prompt - light journaling without a separate app.",
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
            note: "Soft transition from completion to How are you feeling? - keeps feedback optional and conversational.",
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
    description: "The unauthenticated sample journey - check-in, sample playback, reflection, and access request.",
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
            note: "Full-bleed landscape with script wordmark - premium first impression for a clinical product.",
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
            note: "Multiple dimensions on one screen - stress, energy, focus - without splitting into separate steps.",
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
            note: "Full-screen generative visuals with a single play control - shows how a sample can feel immersive without feature bloat.",
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
            note: "Morning / Afternoon / Night selector with a shareable quote card - optional depth after a short sample.",
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
            note: "Session card with theme line (You Are Resilient) - shows how to pair evidence claims with human language.",
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
            note: "Reminder toggles with inline time pickers - good for notification and audio preference rows.",
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
            note: "Support, privacy, and feedback as rows with external-link icons - keeps about content lightweight.",
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
            note: "Terms and privacy as tappable inline links within forms - avoids a separate policies wall.",
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
            note: "Recents, Favourites, and Programmes as editorial list items - good for surfacing clinical publications.",
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
