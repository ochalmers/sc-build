export const USER_STORY_GROUPS = [
  {
    id: "admin",
    sectionId: "stories-admin",
    label: "Sonocea Admin",
    intro:
      "Internal operators who manage the catalog, organizations, invites, Partner configuration, and platform analytics.",
    stories: [
      {
        id: "admin-upload-sessions",
        title: "Upload and manage Sessions",
        narrative:
          "As a Sonocea Admin, I need to upload and manage Sessions with metadata and tags so that content is organized and discoverable.",
        acceptance: [
          "I can upload and publish a Session and assign it to a Partner as an individual Session or Session Group",
          "Metadata includes title, description, duration, neurotype, age range, use case, benefits, tags, and thumbnail",
          "I can version and replace-in-place with safe rollback",
        ],
        surfaces: ["Admin CMS"],
        prdRef: "§User Stories · Admin #1",
      },
      {
        id: "admin-create-org",
        title: "Create and manage organizations",
        narrative:
          "As a Sonocea Admin, I need to create an organization so that Listeners can be grouped for provisioning and reporting.",
        acceptance: [
          "I can create, modify, and delete an organization",
          "Organization is the anchor for Listener assignment and org-level analytics",
        ],
        surfaces: ["Admin CMS"],
        prdRef: "§User Stories · Admin #2 · §Success criteria #1",
      },
      {
        id: "admin-invite-listener",
        title: "Invite Listeners to an organization",
        narrative:
          "As a Sonocea Admin, I need to create and invite a Listener and assign them to an organization.",
        acceptance: [
          "I can invite an individual Listener directly and assign them to an organization",
          "I can track invite state: invited, active, paused, removed",
          "I can search people by status, last login, and revoke access instantly",
        ],
        surfaces: ["Admin CMS"],
        prdRef: "§User Stories · Admin #3",
      },
      {
        id: "admin-notify-listener",
        title: "Notify provisioned Listeners",
        narrative:
          "As a Sonocea Admin, I need to notify a Listener that they have been provisioned access.",
        acceptance: [
          "Invitation is sent when access is provisioned",
          "Listener receives a unique invite bound to identity claims",
        ],
        surfaces: ["Admin CMS", "Email / SMS"],
        prdRef: "§User Stories · Admin #4",
      },
      {
        id: "admin-provision-sessions",
        title: "Provision Sessions to Listeners",
        narrative:
          "As a Sonocea Admin, I need to provision and assign specific Sessions to a given Listener.",
        acceptance: [
          "I can provision specific Sessions at the Listener level",
          "Assignment matrix supports Admin → Organization → Listener",
          "Open scope note: org-level vs Listener-level provisioning may be narrowed for budget",
        ],
        surfaces: ["Admin CMS"],
        prdRef: "§User Stories · Admin · Acceptance",
        openQuestions: ["Provision at organization level, Listener level, or both for v1 LITE"],
      },
      {
        id: "admin-partner-access",
        title: "Provision Partner access",
        narrative:
          "As a Sonocea Admin, I need to provision and manage access through invites to Partners with specific Sessions.",
        acceptance: [
          "I can configure Partners with content bundles and billing configuration",
          "I can assign Session or Session Group to a Partner",
          "Supported billing: site license seat pool, per-seat, usage-based with rate cards",
        ],
        surfaces: ["Admin CMS"],
        prdRef: "§User Stories · Admin #5–6",
      },
      {
        id: "admin-analytics",
        title: "View usage and billing insights",
        narrative:
          "As a Sonocea Admin, I need usage insights for organizations, Listeners, and Partners to understand adoption and support billing.",
        acceptance: [
          "Invite acceptance, session starts and completions, total listening time",
          "MAU/DAU, listening frequency, popular Sessions by neurotype",
          "Filter usage by date range for invoicing and trend monitoring",
          "Aggregate, Partner-level, and Listener-level views",
        ],
        surfaces: ["Analytics dashboard", "CSV export"],
        prdRef: "§User Stories · Admin #7",
      },
    ],
  },
  {
    id: "partner",
    sectionId: "stories-partner",
    label: "Partner",
    intro:
      "Authorized organizations running controlled pilots — provision Listeners, assign bundles, and export scoped billing data.",
    stories: [
      {
        id: "partner-provision-listeners",
        title: "Provision Listeners in pilot scope",
        narrative:
          "As a Partner, I need to provision and manage access for my Listeners within Partner-specific permissions.",
        acceptance: [
          "I can invite and provision Listeners within my granted bundle",
          "I can assign content bundles provisioned by Admin",
          "I can revoke or pause Listener access within my scope",
        ],
        surfaces: ["Partner Console"],
        prdRef: "§Success criteria #4 · §In-scope Partner Console",
      },
      {
        id: "partner-usage-snapshot",
        title: "View Partner-level usage",
        narrative:
          "As a Partner, I need usage snapshots for my Listeners to monitor pilot adoption and prepare billing.",
        acceptance: [
          "Partner-scoped usage visible in console",
          "Close-to real-time Listener activity where platform allows",
        ],
        surfaces: ["Partner Console"],
        prdRef: "§In-scope · Partner Console",
      },
      {
        id: "partner-billing-export",
        title: "Export billing CSV",
        narrative:
          "As a Partner, I need to export billing data for my organization’s plan type.",
        acceptance: [
          "CSV export with fields appropriate to plan: seats, active Listeners, usage metrics, rates, subtotals",
          "Export for a selected date range",
        ],
        surfaces: ["Partner Console"],
        prdRef: "§In-scope · Partner Console · §Functional billing export",
      },
    ],
  },
  {
    id: "listener",
    sectionId: "stories-listener",
    label: "Listener",
    intro:
      "Invite-only end user on mobile — redeem access, complete onboarding, and play provisioned Sessions in-app.",
    stories: [
      {
        id: "listener-redeem",
        title: "Redeem invite or Partner invitation",
        narrative:
          "As a Listener, I need to redeem an invite or Partner invitation and gain access to the Sonocea app.",
        acceptance: [
          "Unique invite links bound to identity claims",
          "Optional Partner enrollment code path",
          "One active device per account with re-provision flow",
          "Token-based auth with short-lived access tokens and refresh",
        ],
        surfaces: ["Mobile · sign-up / login"],
        prdRef: "§User Stories · Listener #1",
      },
      {
        id: "listener-onboarding",
        title: "Complete first-time Listener experience",
        narrative:
          "As a Listener, I need to complete onboarding that aligns Sessions to my neurotype and teaches me how to listen.",
        acceptance: [
          "Onboarding and science education about Sonocea and optimal listening",
          "Neurotype questionnaire informs Session alignment",
          "Listening instructions before first play",
          "Two-factor authentication enabled in account creation flow",
        ],
        surfaces: ["Mobile · FTLE"],
        prdRef: "§User Stories · Listener #2 · §FTLE",
      },
      {
        id: "listener-library",
        title: "Browse provisioned Sessions",
        narrative:
          "As a Listener, I need to see Sessions provisioned to me and choose what to play.",
        acceptance: [
          "Library shows only provisioned content (Admin → Listener)",
          "Filters and sorting by duration, use case, benefits, and metadata",
          "Favorites for quick return to preferred Sessions",
        ],
        surfaces: ["Mobile · library", "Mobile · favorites"],
        prdRef: "§User Stories · Listener #3–4",
      },
      {
        id: "listener-session-detail",
        title: "Understand a Session before playing",
        narrative:
          "As a Listener, I need Session profiles that articulate purpose, audience fit, duration, and benefits.",
        acceptance: [
          "Session overview shows purpose, neuro needs, duration, and benefits",
          "I can choose confidently before starting playback",
        ],
        surfaces: ["Mobile · session profile"],
        prdRef: "§User Stories · Listener #4 · §Library & Discovery",
      },
      {
        id: "listener-playback",
        title: "Stream and control playback",
        narrative:
          "As a Listener, I need to stream Sessions securely and control playback with confidence.",
        acceptance: [
          "Play, pause, scrubber, elapsed and remaining time",
          "Repeat once or continuous loop",
          "Branded visualizations; respect device focus / DND settings",
          "Playback starts within ~1 second on good networks (~192 kbps target)",
          "Background playback where platform policy allows",
        ],
        surfaces: ["Mobile · player"],
        prdRef: "§User Stories · Listener #5 · §Playback",
        excluded: ["Encrypted offline downloads — out of scope in PRD LITE"],
      },
      {
        id: "listener-trust-support",
        title: "Trust, policies, and support",
        narrative:
          "As a Listener, I need to trust that my data is handled responsibly and request support when needed.",
        acceptance: [
          "About page with policy links and company info",
          "Feedback & support entry points in-app",
          "Privacy policy and terms accessible from app",
        ],
        surfaces: ["Mobile · about", "Mobile · feedback & support"],
        prdRef: "§User Stories · Listener #6",
      },
      {
        id: "listener-feedback",
        title: "Give session and app feedback",
        narrative:
          "As a Listener, I need lightweight prompts to rate Sessions and the overall app experience.",
        acceptance: [
          "Quick rating and optional comment after session completion",
          "Periodic in-app prompts with frequency caps and skip option",
          "Feedback stored with org_id and session_id for Admin analysis",
        ],
        surfaces: ["Mobile · feedback"],
        prdRef: "§App & Session Feedback",
      },
    ],
  },
  {
    id: "guest",
    sectionId: "stories-guest",
    label: "Guest",
    intro:
      "Uninvited app store visitor — education and interest capture only; no Session access.",
    stories: [
      {
        id: "guest-learn",
        title: "Learn about Sonocea",
        narrative: "As a Guest, I can learn about Sonocea before I have an invitation.",
        acceptance: [
          "General public landing with logo, video, and SAT™ education",
          "No ability to listen to Sessions without entitlement",
          "Warm welcome for non-invited visitors",
        ],
        surfaces: ["Mobile · marketing shell"],
        prdRef: "§User Stories · Guest · §In-scope mobile",
      },
      {
        id: "guest-request-access",
        title: "Request access",
        narrative:
          "As a Guest, I can express interest and request access that notifies Sonocea Admins.",
        acceptance: [
          "I can download the app but not gain Session access",
          "I feel informed about what Sonocea is",
          "I can request to be notified when access becomes available",
        ],
        surfaces: ["Mobile · marketing shell", "Admin notification"],
        prdRef: "§User Stories · Guest · Acceptance",
      },
    ],
  },
];
