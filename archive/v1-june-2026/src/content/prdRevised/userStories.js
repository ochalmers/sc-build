/**
 * Priority key used across the Flows page.
 * P0 = must-have for v1 (blocks launch), P1 = important, P2 = nice-to-have / limited in v1.
 */
export const STORY_PRIORITY_LEVELS = [
  { id: "P0", label: "P0 · Must have", note: "Core to v1 — the experience does not work without it." },
  { id: "P1", label: "P1 · Important", note: "Strongly wanted for v1; can follow the P0 spine." },
  { id: "P2", label: "P2 · Later", note: "Deferred or intentionally limited in v1." },
];

export const PRIORITY_RANK = { P0: 0, P1: 1, P2: 2 };

export const PUBLIC_VISITOR_STORIES = [
  {
    id: "PV-01",
    role: "Public Visitor",
    title: "Understand what Sonocea is",
    priority: "P0",
    priorityNote: "First impression — decides whether anyone continues.",
    narrative:
      "As a public visitor, I want to understand what Sonocea is so that I know whether it is relevant to me.",
    surfaces: ["Mobile app · public"],
    prdRef: "Public Visitor PRD · §2",
  },
  {
    id: "PV-02",
    role: "Public Visitor",
    title: "Try a short listening sample",
    priority: "P0",
    priorityNote: "The heart of the golden route — experience before explanation.",
    narrative:
      "As a public visitor, I want to try a short listening sample, so that I can feel the nature of the experience without receiving restricted protocol content.",
    acceptance: ["One curated 5-minute nervous system reset", "No licensed protocol content"],
    surfaces: ["Mobile app · public"],
    prdRef: "Public Visitor PRD · §2 · FR-002",
  },
  {
    id: "PV-04",
    role: "Public Visitor",
    title: "Request access or join mailing list",
    priority: "P0",
    priorityNote: "The only conversion event — without it the public journey has no outcome.",
    narrative:
      "As a public visitor, I want to request access, further information or to join the mailing list.",
    surfaces: ["Mobile app · public · Register Interest"],
    prdRef: "Public Visitor PRD · §2 · FR-005",
  },
  {
    id: "IP-02",
    role: "Invited Participant",
    title: "Activate through organization",
    priority: "P0",
    priorityNote: "The bridge from public into the provisioned Listener app.",
    narrative:
      "As an invited participant, I want to activate my account through my organization, affiliation or direct invitation from Sonocea staff.",
    surfaces: ["Mobile app · invitation → auth"],
    prdRef: "Public Visitor PRD · §2 · FR-007",
  },
  {
    id: "PV-03",
    role: "Public Visitor",
    title: "Learn the science",
    priority: "P1",
    priorityNote: "Builds credibility, but reached after the felt experience.",
    narrative:
      "As a public visitor, I want to learn the science in simple language, so that I understand how structured sound is different from generic relaxation audio.",
    surfaces: ["Mobile app · public · Science"],
    prdRef: "Public Visitor PRD · §2",
  },
  {
    id: "IP-01",
    role: "Invited Participant",
    title: "Familiarize before activating",
    priority: "P1",
    priorityNote: "Reuses public content; low incremental cost.",
    narrative:
      "As an invited participant, I want to familiarize myself with Sonocea and how Sonocea can benefit me.",
    surfaces: ["Mobile app · public shell"],
    prdRef: "Public Visitor PRD · §2",
  },
  {
    id: "SA-01",
    role: "Sonocea Admin",
    title: "Public usage and access-request data",
    priority: "P1",
    priorityNote: "Needed to evaluate demand, but not on the visitor's critical path.",
    narrative:
      "As a Sonocea admin, I want public usage and access-request data, so that the team can evaluate demand and prioritize follow-up.",
    surfaces: ["Admin CMS · analytics"],
    prdRef: "Public Visitor PRD · §2 · §8",
  },
  {
    id: "PV-05",
    role: "Public Visitor",
    title: "Share information about myself",
    priority: "P2",
    priorityNote: "Depth of profiling still open; keep light for v1.",
    narrative:
      "As a public visitor, I want to provide information about myself to inform Sonocea how to best engage with me and to align products to my specific needs or interests.",
    surfaces: ["Mobile app · public · Register Interest"],
    prdRef: "Public Visitor PRD · §2",
    openQuestions: ["Depth of profile capture vs. light sign-up — TBD"],
  },
];

export const MOBILE_APP_STORY_GROUPS = [
  {
    id: "admin",
    sectionId: "revised-stories-admin",
    label: "Sonocea Admin",
    intro: "Content, Partner configuration, provisioning, analytics, and billing from Mobile App v1.0 [REVISED] §5.",
    stories: [
      {
        id: "admin-upload",
        title: "Upload and manage Sessions",
        priority: "P0",
        priorityNote: "No content = no product. First thing that must exist.",
        narrative:
          "As a Sonocea Admin, I need to upload and manage sessions with metadata and tags so that content is organized and discoverable.",
        acceptance: [
          "Upload and publish a session; assign to Partner as individual Session or Session Group",
          "Metadata: title, description, duration, neurotype, age range, use case, benefits, tags, thumbnail",
          "Versioning and replace-in-place with safe rollback",
        ],
        prdRef: "Mobile App PRD · §5 Admin #1",
      },
      {
        id: "admin-partner-org",
        title: "Setup Partners and Organizations",
        priority: "P0",
        priorityNote: "Provisioning spine — how any Listener ever gets access.",
        narrative:
          "As a Sonocea Admin, I need to setup and manage Sonocea Partners or Organizations including Partner-level content bundles and associating a Listener to a Partner.",
        acceptance: [
          "Create Partner, assign content bundles, set billing plan and rate card",
          "Associate Listeners to Partner / Organization",
        ],
        prdRef: "Mobile App PRD · §5 Admin #2 · §7 CMS",
      },
      {
        id: "admin-analytics",
        title: "View usage insights",
        priority: "P1",
        priorityNote: "Drives billing and demand insight; can trail the provisioning spine.",
        narrative:
          "As a Sonocea Admin, I need to view usage insights by Listeners, by Organization/Partner, by Session, by tags, and by Session categories.",
        acceptance: [
          "Invite acceptance, session starts and completions, total listening time",
          "MAU/DAU, frequency, popular Sessions by neurotype",
          "Filter by date range for invoicing and adoption monitoring",
        ],
        prdRef: "Mobile App PRD · §5 Admin #3 · §8",
      },
    ],
  },
  {
    id: "partner",
    sectionId: "revised-stories-partner",
    label: "Sonocea Partner",
    intro: "Partner operates through Admin-mediated distribution in v1.0 — no self-serve Listener management.",
    stories: [
      {
        id: "partner-notify",
        title: "Engage Admin for distribution",
        priority: "P1",
        priorityNote: "Admin-mediated in v1 — can be a lightweight/manual path.",
        narrative:
          "As a Sonocea Partner, I need to notify and engage Sonocea Admins to distribute access to Sonocea for my organization or clients.",
        prdRef: "Mobile App PRD · §5 Partner #1",
      },
      {
        id: "partner-usage",
        title: "Understand Listener usage",
        priority: "P2",
        priorityNote: "Aggregate insight for Partners; Admin can serve this manually in v1.",
        narrative:
          "As a Sonocea Partner, I need to understand and aggregate usage data, listening trends, or other insights of Listeners who I elect to provide access to.",
        prdRef: "Mobile App PRD · §5 Partner #2",
      },
      {
        id: "partner-billing",
        title: "Correlate usage to invoice",
        priority: "P1",
        priorityNote: "Needed to substantiate invoices; depends on analytics data.",
        narrative:
          "As a Sonocea Partner, I need to directly correlate the number of listeners assigned to my organization, their identifying information, and my listeners usage in order to substantiate the invoice I received from Sonocea.",
        acceptance: [
          "Partner-affiliated Listeners receive and access the app",
          "Sessions provisioned per Partner relationship",
          "Listeners associated to Partner for analytics and billing",
        ],
        prdRef: "Mobile App PRD · §5 Partner · Acceptance",
      },
    ],
  },
  {
    id: "listener",
    sectionId: "revised-stories-listener",
    label: "Listener",
    intro: "Provisioned end user after invite redemption — distinct from Public Visitor and Invited Participant.",
    stories: [
      {
        id: "listener-redeem",
        title: "Redeem invite and gain access",
        priority: "P0",
        priorityNote: "Entry point to the whole provisioned experience.",
        narrative: "As a Listener, I need to redeem an invite and gain access to the Sonocea app.",
        prdRef: "Mobile App PRD · §5 Listener #1",
      },
      {
        id: "listener-onboard",
        title: "Complete onboarding",
        priority: "P0",
        priorityNote: "Aligns Sessions to neurotype and teaches how to listen.",
        narrative:
          "As a Listener, I need to complete the app onboarding process that provides identifying information, aligns Sessions to my neurotype, and informs me about optimal listening approaches.",
        prdRef: "Mobile App PRD · §5 Listener #2",
      },
      {
        id: "listener-library",
        title: "See provisioned playlist",
        priority: "P0",
        priorityNote: "The home of the app — what a Listener sees every day.",
        narrative: "As a Listener, I need to see my playlist of Sessions provisioned to me.",
        prdRef: "Mobile App PRD · §5 Listener #3",
      },
      {
        id: "listener-session-profile",
        title: "View Session profiles",
        priority: "P1",
        priorityNote: "Helps choose the right Session; can start minimal.",
        narrative:
          "As a Listener, I need to view Session profiles to align my purpose, neuro needs, duration, and benefits so that I can choose what to play.",
        prdRef: "Mobile App PRD · §5 Listener #4",
      },
      {
        id: "listener-protocol",
        title: "View assigned Regiment or Protocol",
        priority: "P2",
        priorityNote: "Explicitly limited in v1 — see out-of-scope.",
        narrative:
          "As a Listener, I need to view a Regiment or Protocol assigned to me and the Sessions within that Regiment.",
        prdRef: "Mobile App PRD · §5 Listener #5",
        openQuestions: ["Protocol display in-app may be limited in v1.0 — see out-of-scope"],
      },
      {
        id: "listener-playback",
        title: "Stream and control playback",
        priority: "P0",
        priorityNote: "The reason the app exists — must be flawless and secure.",
        narrative: "As a Listener, I need to stream and control playback with confidence.",
        acceptance: [
          "Log in and understand how to use Sonocea",
          "View available Sessions and start playback quickly",
          "Finish without errors",
        ],
        prdRef: "Mobile App PRD · §5 Listener #6–7",
      },
    ],
  },
];

/** Return a new array of stories sorted by priority (P0 → P2), stable within a level. */
export function sortByPriority(stories) {
  return [...stories].sort(
    (a, b) => (PRIORITY_RANK[a.priority] ?? 9) - (PRIORITY_RANK[b.priority] ?? 9),
  );
}

/** Flatten all mobile app stories across role groups. */
export function mobileStoriesFlat() {
  return MOBILE_APP_STORY_GROUPS.flatMap((g) =>
    g.stories.map((s) => ({ ...s, group: g.label })),
  );
}

/** Count of stories at a given priority level across both PRDs. */
export function priorityCounts() {
  const all = [...PUBLIC_VISITOR_STORIES, ...mobileStoriesFlat()];
  return all.reduce((acc, s) => {
    acc[s.priority] = (acc[s.priority] ?? 0) + 1;
    return acc;
  }, {});
}
