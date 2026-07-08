/** Functional flows derived from PRD LITE §Functional Requirements — narrative, no wireframes. */

export const FUNCTIONAL_FLOW_GROUPS = [
  {
    id: "auth",
    label: "Authentication & access",
    sectionId: "stories-flows-auth",
    flows: [
      {
        id: "auth-invite-redeem",
        title: "Invite redemption",
        summary: "Listener follows unique invite link or enters Partner code to establish identity and entitlements.",
        steps: [
          { label: "Receive invite", detail: "Email/SMS with bound invite link or Partner enrollment code." },
          { label: "Open app", detail: "Deep link or store install → sign-up / login screen." },
          { label: "Verify identity", detail: "OAuth account creation; optional two-factor authentication." },
          { label: "Entitlement bind", detail: "Listener linked to organization and/or Partner; device registered." },
        ],
        requirements: [
          "One active device per account with server-side checks",
          "Short-lived access tokens with refresh flow",
          "Admin or Partner Admin can revoke access instantly",
        ],
      },
      {
        id: "auth-device-limit",
        title: "Single-device enforcement",
        summary: "Second device attempt triggers re-provision flow rather than silent multi-device access.",
        steps: [
          { label: "New device login", detail: "Existing account detected on different device." },
          { label: "Server check", detail: "Active device token invalidated or transfer prompted." },
          { label: "Re-provision", detail: "Listener confirms device switch; prior device loses stream access." },
        ],
      },
    ],
  },
  {
    id: "admin-ops",
    label: "Admin CMS operations",
    sectionId: "stories-flows-admin",
    flows: [
      {
        id: "admin-session-lifecycle",
        title: "Session upload → publish → assign",
        summary: "Admin uploads audio, enriches metadata, publishes, and assigns to Partner or Listener entitlements.",
        steps: [
          { label: "Upload", detail: "Audio file to object storage with KMS." },
          { label: "Metadata", detail: "Title, description, duration, neurotype, tags, thumbnail." },
          { label: "Publish", detail: "Session available in catalog for assignment." },
          { label: "Assign", detail: "Matrix: Admin → Organization → Listener and/or Partner bundle." },
        ],
        events: ["session_published", "partner_bundle_assigned"],
      },
      {
        id: "admin-org-lifecycle",
        title: "Organization create → assign Listeners",
        summary: "Admin creates organization, invites Listeners, and provisions Sessions at org or Listener level.",
        steps: [
          { label: "Create org", detail: "Name, billing contact, status." },
          { label: "Invite Listener", detail: "Email invite with organization assignment." },
          { label: "Provision Sessions", detail: "Org-wide or per-Listener Session assignment." },
          { label: "Monitor", detail: "Dashboard: invite sent → accepted → first play." },
        ],
        openQuestions: ["Org-level vs Listener-level provisioning for v1 LITE scope"],
      },
      {
        id: "admin-partner-setup",
        title: "Partner onboarding",
        summary: "Admin creates Partner, assigns bundles, configures billing plan and rate card.",
        steps: [
          { label: "Create Partner", detail: "Partner record and Partner Admin users." },
          { label: "Assign bundle", detail: "Session collection for Partner catalog." },
          { label: "Billing plan", detail: "Site license seat pool, per-seat, or usage-based rate card." },
          { label: "Invite Partner Admin", detail: "Scoped access to Partner Console." },
        ],
        events: ["partner_created", "partner_plan_updated", "rate_card_updated"],
      },
    ],
  },
  {
    id: "listener-mobile",
    label: "Listener mobile journeys",
    sectionId: "stories-flows-listener",
    flows: [
      {
        id: "listener-golden-path",
        title: "First-time golden path",
        summary: "PRD success criterion: self-onboard, find a recommended Session, play without errors.",
        steps: [
          { label: "Splash", detail: "Brand intro." },
          { label: "Redeem invite", detail: "Login with invite or Partner code." },
          { label: "FTLE", detail: "Science education, neurotype questionnaire, listening instructions." },
          { label: "Library", detail: "Provisioned Sessions only; neurotype-aligned recommendations." },
          { label: "Session profile", detail: "Purpose, duration, benefits." },
          { label: "Play", detail: "Secure stream via signed URL; branded player." },
          { label: "Complete + feedback", detail: "Optional rating with frequency cap." },
        ],
        screens: ["01 Splash", "02 Login", "03 FTLE", "04 Library", "06 Profile", "07 Player", "09 Feedback"],
      },
      {
        id: "listener-returning",
        title: "Returning Listener",
        summary: "Authenticated user with completed profile lands in library without repeating onboarding.",
        steps: [
          { label: "Token refresh", detail: "Silent refresh of short-lived access token." },
          { label: "Entitlement sync", detail: "Catalog filtered to current assignments." },
          { label: "Resume or new Session", detail: "Favorites or library → profile → player." },
        ],
      },
      {
        id: "listener-guest-shell",
        title: "Guest discovery (no entitlement)",
        summary: "Uninvited visitor learns about Sonocea and requests access — no playback.",
        steps: [
          { label: "Store install", detail: "Download without invite." },
          { label: "Marketing shell", detail: "Logo, video, SAT™ education." },
          { label: "Request access", detail: "Interest form notifies Admin; no Session entitlement created." },
        ],
      },
    ],
  },
  {
    id: "playback",
    label: "Playback & content security",
    sectionId: "stories-flows-playback",
    flows: [
      {
        id: "playback-stream",
        title: "Secure streaming",
        summary: "Authenticated Listener streams via signed, time-limited CDN URLs.",
        steps: [
          { label: "Select Session", detail: "From provisioned library only." },
          { label: "Request URL", detail: "API issues authenticated signed stream URL." },
          { label: "Play", detail: "~1s start target; 192 kbps; buffering on poor connections." },
          { label: "Telemetry", detail: "play_start, play_complete events captured." },
        ],
        requirements: [
          "TLS for all traffic",
          "Signed time-limited content URLs",
          "Rapid remote revoke invalidates active streams",
        ],
        excluded: ["Encrypted offline downloads — PRD LITE out of scope"],
      },
      {
        id: "playback-revoke",
        title: "Access revocation",
        summary: "Admin or Partner revokes Listener; active streams and entitlements end immediately.",
        steps: [
          { label: "Revoke action", detail: "Admin CMS or Partner Console." },
          { label: "Entitlement drop", detail: "Session removed from library." },
          { label: "Stream invalidate", detail: "In-flight playback denied on next license check." },
          { label: "Listener UX", detail: "Clear messaging; route to support if needed." },
        ],
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics & billing",
    sectionId: "stories-analytics",
    flows: [
      {
        id: "analytics-funnel",
        title: "Acquisition → engagement funnel",
        summary: "Track invite through first complete listen for product and Partner insights.",
        steps: [
          { label: "Invite sent", detail: "By Admin or Partner." },
          { label: "Invite accepted", detail: "Time from invite to first login." },
          { label: "First play", detail: "Time from acceptance to first complete listen." },
          { label: "Repeat listen", detail: "First-to-second session latency; frequency over time." },
        ],
        metrics: [
          "Invited vs accepted rate (overall and by Partner)",
          "Session popularity and completion rates",
          "MAU/DAU and total listening hours",
          "Time-of-day and location (IP-derived) patterns",
        ],
      },
      {
        id: "analytics-billing",
        title: "Billing report generation",
        summary: "Exportable billing data per Organization or Partner for selected date range.",
        steps: [
          { label: "Select scope", detail: "Organization, Partner, date range, plan type." },
          { label: "Apply plan rules", detail: "Seat pool, per-seat, or usage-based tiering." },
          { label: "Generate report", detail: "Graphs and/or CSV with units, rates, subtotals." },
          { label: "Partner export", detail: "Minimum necessary data; signed time-limited download." },
        ],
        metrics: [
          "Active Listeners by Organization and period",
          "Seat pool utilization and overage",
          "Billable usage units per plan rules",
        ],
      },
      {
        id: "analytics-feedback",
        title: "Qualitative feedback pipeline",
        summary: "Listener feedback tied to sessions and organizations for Admin review.",
        steps: [
          { label: "Trigger", detail: "Post-session completion or periodic app prompt." },
          { label: "Capture", detail: "Rating + optional comment with frequency cap and skip." },
          { label: "Store", detail: "org_id, session_id, timestamp." },
          { label: "Review", detail: "CMS feedback view or Admin-specified repository." },
        ],
      },
    ],
  },
];
