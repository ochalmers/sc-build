/** Functional flows from Mobile App v1.0 [REVISED] §7–§9 and Public Visitor FRs. */

export const REVISED_FUNCTIONAL_FLOW_GROUPS = [
  {
    id: "public-access",
    label: "Public Visitor access",
    sectionId: "revised-functional-public",
    flows: [
      {
        id: "fn-pv-discover",
        title: "Unauthenticated Discover path",
        summary: "FR-001 — public visitors access Discover Sonocea without authentication.",
        steps: [
          { label: "Install", detail: "App Store / Play download." },
          { label: "Get Started", detail: "User selects Discover Sonocea." },
          { label: "Golden route", detail: "Check-in → sample → science → register interest." },
        ],
        requirements: ["FR-001", "FR-002", "FR-003", "FR-004"],
      },
      {
        id: "fn-pv-single-session",
        title: "Curated sample enforcement",
        summary: "FR-002 / FR-003 — one non-protocol session for unauthenticated users; licensed content protected.",
        steps: [
          { label: "Session start", detail: "5-minute nervous system reset only." },
          { label: "Entitlement check", detail: "No protocol or Partner bundle content exposed." },
          { label: "Replay gate", detail: "FR-006 — light auth required on return." },
        ],
      },
      {
        id: "fn-pv-access-request",
        title: "Access request capture",
        summary: "FR-005 — self or organization access request with demand-signal analytics.",
        steps: [
          { label: "Form", detail: "Contact details, organization optional, interest context." },
          { label: "Submit", detail: "No Listener entitlement created." },
          { label: "Admin queue", detail: "SA-01 — data for follow-up prioritization." },
        ],
        events: ["request_access_submitted"],
      },
    ],
  },
  {
    id: "auth",
    label: "Authentication & access",
    sectionId: "revised-functional-auth",
    flows: [
      {
        id: "fn-invite-redeem",
        title: "Invite redemption",
        summary: "Unique invite links and pre-registered emails bound to Listener identity.",
        steps: [
          { label: "Receive invite", detail: "Email/SMS with bound link or Partner code." },
          { label: "Authenticate", detail: "OAuth; token-based auth with refresh." },
          { label: "Device bind", detail: "One active device per account." },
        ],
        requirements: ["§7 Auth #1–3", "FR-007"],
      },
      {
        id: "fn-revoke",
        title: "Access revocation",
        summary: "Admin revokes Listener, Partner, or asset access instantly within scope.",
        steps: [
          { label: "Revoke", detail: "CMS action on Listener or Partner." },
          { label: "Stream deny", detail: "Signed URLs fail; offline license invalidated." },
        ],
      },
    ],
  },
  {
    id: "cms",
    label: "Admin CMS",
    sectionId: "revised-functional-cms",
    flows: [
      {
        id: "fn-session-lifecycle",
        title: "Session upload → assign",
        summary: "Upload audio, metadata, versioning, assignment matrix Admin → Partner → Listener.",
        steps: [
          { label: "Upload", detail: "Audio + title, description, duration, neurotype, tags, thumbnail." },
          { label: "Publish", detail: "Versioning with replace-in-place rollback." },
          { label: "Assign", detail: "Partner bundle or direct Listener provisioning." },
        ],
        events: ["session_published", "partner_bundle_assigned"],
      },
      {
        id: "fn-partner-billing",
        title: "Partner plan & rate card",
        summary: "Site license seat pool, per-seat, or usage-based billing with CSV export.",
        steps: [
          { label: "Create Partner", detail: "Plan type, rate card, included seats." },
          { label: "Meter usage", detail: "Seat allocation, hours listened, completions." },
          { label: "Export CSV", detail: "Partner-level billing report for date range." },
        ],
        events: ["partner_created", "partner_plan_updated", "usage_metered", "export_billing_csv"],
      },
    ],
  },
  {
    id: "playback",
    label: "Listener playback",
    sectionId: "revised-functional-playback",
    flows: [
      {
        id: "fn-library-discovery",
        title: "Provisioned library",
        summary: "Library shows only Admin → Partner → Listener entitled content.",
        steps: [
          { label: "Library load", detail: "Filtered catalog — no open marketplace." },
          { label: "Session detail", detail: "Purpose, audience fit, benefits, differentiators." },
          { label: "Filters", detail: "Duration, use case, benefits metadata." },
        ],
      },
      {
        id: "fn-player",
        title: "Secure playback",
        summary: "Encrypted streaming, player controls, background playback, branded visualizations.",
        steps: [
          { label: "Signed URL", detail: "Time-limited encrypted stream." },
          { label: "Controls", detail: "Play/pause, scrubber, elapsed/remaining, repeat." },
          { label: "Complete", detail: "Feedback prompt with frequency cap." },
        ],
        events: ["play_start", "play_progress", "play_complete", "feedback_submitted_session"],
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics & billing",
    sectionId: "revised-functional-analytics",
    flows: [
      {
        id: "fn-acquisition",
        title: "Acquisition funnel",
        summary: "Invited vs accepted; time from invite to first login; public visitor discover funnel.",
        steps: [
          { label: "Invite sent", detail: "Partner provisioning events." },
          { label: "Accepted", detail: "First login and device metadata." },
          { label: "Public funnel", detail: "Discover → sample complete → science → request." },
        ],
      },
      {
        id: "fn-engagement",
        title: "Engagement & retention",
        summary: "First play latency, session popularity, MAU/WAU, Partner-linked hours.",
        steps: [
          { label: "First listen", detail: "Acceptance to first complete listen." },
          { label: "Retention", detail: "Frequency trend; return visits for public visitors." },
          { label: "Billing units", detail: "Billable seats, hours, or completions per plan rules." },
        ],
      },
    ],
  },
];
