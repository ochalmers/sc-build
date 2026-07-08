export const PUBLIC_VISITOR_STORIES = [
  {
    id: "PV-01",
    role: "Public Visitor",
    title: "Understand what Sonocea is",
    narrative:
      "As a public visitor, I want to understand what Sonocea is so that I know whether it is relevant to me.",
    surfaces: ["Mobile app · public"],
    prdRef: "Public Visitor PRD · §2",
  },
  {
    id: "PV-02",
    role: "Public Visitor",
    title: "Try a short listening sample",
    narrative:
      "As a public visitor, I want to try a short listening sample, so that I can feel the nature of the experience without receiving restricted protocol content.",
    acceptance: ["One curated 5-minute nervous system reset", "No licensed protocol content"],
    surfaces: ["Mobile app · public"],
    prdRef: "Public Visitor PRD · §2 · FR-002",
  },
  {
    id: "PV-03",
    role: "Public Visitor",
    title: "Learn the science",
    narrative:
      "As a public visitor, I want to learn the science in simple language, so that I understand how structured sound is different from generic relaxation audio.",
    surfaces: ["Mobile app · public · Science"],
    prdRef: "Public Visitor PRD · §2",
  },
  {
    id: "PV-04",
    role: "Public Visitor",
    title: "Request access or join mailing list",
    narrative:
      "As a public visitor, I want to request access, further information or to join the mailing list.",
    surfaces: ["Mobile app · public · Register Interest"],
    prdRef: "Public Visitor PRD · §2 · FR-005",
  },
  {
    id: "PV-05",
    role: "Public Visitor",
    title: "Share information about myself",
    narrative:
      "As a public visitor, I want to provide information about myself to inform Sonocea how to best engage with me and to align products to my specific needs or interests.",
    surfaces: ["Mobile app · public · Register Interest"],
    prdRef: "Public Visitor PRD · §2",
    openQuestions: ["Depth of profile capture vs. light sign-up — TBD"],
  },
  {
    id: "IP-01",
    role: "Invited Participant",
    title: "Familiarize before activating",
    narrative:
      "As an invited participant, I want to familiarize myself with Sonocea and how Sonocea can benefit me.",
    surfaces: ["Mobile app · public shell"],
    prdRef: "Public Visitor PRD · §2",
  },
  {
    id: "IP-02",
    role: "Invited Participant",
    title: "Activate through organization",
    narrative:
      "As an invited participant, I want to activate my account through my organization, affiliation or direct invitation from Sonocea staff.",
    surfaces: ["Mobile app · invitation → auth"],
    prdRef: "Public Visitor PRD · §2 · FR-007",
  },
  {
    id: "SA-01",
    role: "Sonocea Admin",
    title: "Public usage and access-request data",
    narrative:
      "As a Sonocea admin, I want public usage and access-request data, so that the team can evaluate demand and prioritize follow-up.",
    surfaces: ["Admin CMS · analytics"],
    prdRef: "Public Visitor PRD · §2 · §8",
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
        narrative:
          "As a Sonocea Partner, I need to notify and engage Sonocea Admins to distribute access to Sonocea for my organization or clients.",
        prdRef: "Mobile App PRD · §5 Partner #1",
      },
      {
        id: "partner-usage",
        title: "Understand Listener usage",
        narrative:
          "As a Sonocea Partner, I need to understand and aggregate usage data, listening trends, or other insights of Listeners who I elect to provide access to.",
        prdRef: "Mobile App PRD · §5 Partner #2",
      },
      {
        id: "partner-billing",
        title: "Correlate usage to invoice",
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
        narrative: "As a Listener, I need to redeem an invite and gain access to the Sonocea app.",
        prdRef: "Mobile App PRD · §5 Listener #1",
      },
      {
        id: "listener-onboard",
        title: "Complete onboarding",
        narrative:
          "As a Listener, I need to complete the app onboarding process that provides identifying information, aligns Sessions to my neurotype, and informs me about optimal listening approaches.",
        prdRef: "Mobile App PRD · §5 Listener #2",
      },
      {
        id: "listener-library",
        title: "See provisioned playlist",
        narrative: "As a Listener, I need to see my playlist of Sessions provisioned to me.",
        prdRef: "Mobile App PRD · §5 Listener #3",
      },
      {
        id: "listener-session-profile",
        title: "View Session profiles",
        narrative:
          "As a Listener, I need to view Session profiles to align my purpose, neuro needs, duration, and benefits so that I can choose what to play.",
        prdRef: "Mobile App PRD · §5 Listener #4",
      },
      {
        id: "listener-protocol",
        title: "View assigned Regiment or Protocol",
        narrative:
          "As a Listener, I need to view a Regiment or Protocol assigned to me and the Sessions within that Regiment.",
        prdRef: "Mobile App PRD · §5 Listener #5",
        openQuestions: ["Protocol display in-app may be limited in v1.0 — see out-of-scope"],
      },
      {
        id: "listener-playback",
        title: "Stream and control playback",
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
