import { PARTNERS, SONOCEA_MARK } from "./partners.js";

/**
 * End-to-End Wireframe Flow board content.
 *
 * A single, ordered board of high-fidelity greyscale wireframes covering the
 * complete Sonocea lifecycle: admin partner setup, programme configuration,
 * invitation, app entry, listening, progress, and organisation reporting.
 *
 * @typedef {{
 *   kind: 'screen', screen: Screen
 * } | {
 *   kind: 'arrow', label?: string
 * } | {
 *   kind: 'branch', label: string
 * } | {
 *   kind: 'annotation', text: string
 * } | {
 *   kind: 'break'
 * } | {
 *   kind: 'stack', items: FlowItem[]
 * }} FlowItem
 *
 * @typedef {{
 *   id: string,
 *   title: string,
 *   purpose?: string,
 *   frame: 'desktop' | 'mobile' | 'email' | 'sms' | 'physical',
 *   primary?: string,
 *   secondary?: string[],
 *   layout: 'default' | 'admin' | 'partner' | 'mobile-shell' | 'email' | 'sms' | 'physical' | 'map' | 'journey' | 'matrix' | 'app-store',
 *   data: object,
 * }} Screen
 *
 * @typedef {{
 *   id: string,
 *   number: string,
 *   label: string,
 *   navLabel?: string,
 *   title: string,
 *   description: string,
 *   narrative?: string,
 *   divider?: boolean,
 *   dividerTitle?: string,
 *   dividerSubtitle?: string,
 *   items: FlowItem[],
 * }} Section
 */

export const E2E_HERO = {
  eyebrow: "Product Architecture",
  title: "End-to-End Wireframe Flow",
  intro:
    "A high-fidelity greyscale storyboard of the complete Sonocea lifecycle - from admin partner setup through programme configuration, invitation, app entry, listening, progress, and organisation reporting. Each step is narrated for continuous left-to-right review, with partner branding where it matters. Architecture and UX reference - not a working prototype.",
};

const ADMIN_NAV = [
  "Overview",
  "Organisations",
  "Programmes",
  "Participants",
  "Content",
  "Insights",
  "Settings",
];
const EXPORT_STEPS = ["Dataset", "Date range", "Organizations", "Format", "Download"];
const PARTNER_CREATE_STEPS = ["Details", "Identity", "Administrators", "Review"];
const PROGRAMME_STEPS = ["Basics", "Content", "Structure", "Access", "Data", "Participants", "Review"];
const PARTNER_TABS = ["Overview", "Programmes", "Participants", "Insights", "Administrators", "Settings"];
const APP_BOTTOM_NAV = ["home", "discover", "progress", "profile"];

/** @type {Section[]} */
export const E2E_SECTIONS = [
  // ───────────────────────────── 00 - Ecosystem Overview ─────────────────────────────
  {
    id: "00-overview",
    number: "00",
    label: "00",
    navLabel: "Overview",
    title: "Ecosystem Overview",
    description:
      "The full Sonocea service chain - from Admin and Partner, through Programme configuration, to Participant invitation and progress.",
    narrative: "Map the full service chain before diving into any single surface.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "00.01",
          title: "Sonocea Service Chain",
          purpose: "A single-page view of the full service chain and the three layers it operates across.",
          frame: "desktop",
          layout: "map",
          data: {
            nodes: [
              "Sonocea Admin",
              "Partner Organisation - Preston North End",
              "Programme - Post-Training Recovery",
              "Invitation - Email / SMS / QR",
              "Participant App Entry & Onboarding",
              "Listening & Completion",
              "Progress & Organisation Reporting",
            ],
            layers: ["ORGANISATION", "PROGRAMME", "PARTICIPANT"],
          },
        },
      },
      {
        kind: "annotation",
        text: "Where does billing and licensing sit relative to partner organisations - per-seat, per-programme, or a flat organisation licence?",
      },
    ],
  },

  // ───────────────────────────── 01 - Sonocea Admin Entry ─────────────────────────────
  {
    id: "01-admin-entry",
    number: "01",
    label: "01",
    navLabel: "Admin Entry",
    title: "Sonocea Admin Entry",
    description: "Sonocea staff sign in to the Admin console and land on a cross-partner overview.",
    narrative: "Staff authenticate and land on a cross-partner pulse.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "01.01",
          title: "Admin Login",
          purpose: "Sign in to Sonocea Admin.",
          frame: "desktop",
          primary: "Sign in",
          secondary: ["Forgot password?"],
          layout: "default",
          data: {
            heading: "Sonocea Admin",
            sub: "Sign in to manage partners, programmes, and participants.",
            blocks: [
              {
                type: "fields",
                items: [
                  { label: "Email", placeholder: "you@sonocea.com" },
                  { label: "Password", placeholder: "••••••••" },
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "01.02",
          title: "Admin Overview",
          purpose: "Cross-partner overview for Sonocea staff.",
          frame: "desktop",
          layout: "admin",
          data: {
            nav: ADMIN_NAV,
            active: "Overview",
            title: "Overview",
            cta: "Create partner",
            blocks: [
              {
                type: "stats",
                cols: 4,
                items: [
                  { label: "Active partners", value: "12" },
                  { label: "Programmes", value: "23" },
                  { label: "Participants", value: "1,284" },
                  { label: "Sessions this month", value: "8,426" },
                ],
              },
              {
                type: "rows",
                items: [
                  { left: "Preston North End - Post-Training Recovery", right: "Updated 2h ago", badge: "Active" },
                  { left: "University Hospital - Staff Wellbeing", right: "Updated 5h ago", badge: "Active" },
                ],
              },
            ],
          },
        },
      },
    ],
  },

  // ───────────────────────────── 02 - Create Partner ─────────────────────────────
  {
    id: "02-create-partner",
    number: "02",
    label: "02",
    navLabel: "Create Partner",
    title: "Create Partner",
    description: "Sonocea Admin creates a new partner organisation through a four-step builder.",
    narrative: "Admin scaffolds a new partner organisation through a four-step builder.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "02.01",
          title: "Partners List",
          purpose: "Browse and manage all partner organisations.",
          frame: "desktop",
          layout: "admin",
          data: {
            nav: ADMIN_NAV,
            active: "Organisations",
            title: "Organisations",
            cta: "+ Create partner",
            blocks: [
              { type: "chips", items: ["All", "Healthcare", "Performance", "Research", "Enterprise", "Public"], active: "All" },
              {
                type: "rows",
                items: [
                  {
                    left: "Preston North End",
                    right: "Performance · 2 programmes",
                    badge: "Active",
                    logoSrc: PARTNERS.pne.logoSrc,
                    logoLabel: "PNE",
                  },
                  {
                    left: "University Hospital NHS Trust",
                    right: "Healthcare · 1 programme",
                    badge: "Active",
                    logoSrc: PARTNERS.nhs.logoSrc,
                    logoLabel: "NHS",
                  },
                  {
                    left: "Loughborough University",
                    right: "Research · 3 programmes",
                    badge: "Active",
                    logoSrc: PARTNERS.loughborough.logoSrc,
                    logoLabel: "LU",
                  },
                  {
                    left: "Wigan Athletic",
                    right: "Performance · Onboarding",
                    badge: "Pending",
                    logoSrc: PARTNERS.wigan.logoSrc,
                    logoLabel: "WAFC",
                  },
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "02.02",
          title: "Create Partner - Details",
          purpose: "Capture the core details of a new partner organisation.",
          frame: "desktop",
          primary: "Continue",
          layout: "default",
          data: {
            stepper: { steps: PARTNER_CREATE_STEPS, current: 1 },
            heading: "New partner",
            blocks: [
              {
                type: "fields",
                items: [
                  { label: "Organisation name", placeholder: "Preston North End" },
                  { label: "Sector", placeholder: "Performance" },
                  { label: "Primary contact", placeholder: "Head of Sports Science" },
                  { label: "Website", placeholder: "pnefc.net" },
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "02.03",
          title: "Create Partner - Identity",
          purpose: "Set the branding participants and staff will see.",
          frame: "desktop",
          primary: "Continue",
          layout: "default",
          data: {
            stepper: { steps: PARTNER_CREATE_STEPS, current: 2 },
            heading: "Identity & branding",
            blocks: [
              {
                type: "preview",
                logoSrc: PARTNERS.pne.logoSrc,
                logo: "PNE",
                title: "Logo uploaded",
                sub: "preston-north-end.png · 512×512 · Accent #1D2951",
              },
              {
                type: "fields",
                items: [
                  { label: "Display name", value: "Preston North End" },
                  {
                    label: "Participant-facing message",
                    value: "Welcome to your Post-Training Recovery programme, brought to you by Preston North End.",
                  },
                  { label: "Accent colour", value: "#1D2951" },
                ],
              },
              {
                type: "lockup",
                partnerSrc: PARTNERS.pne.logoSrc,
                partnerLabel: "PNE",
                brandSrc: SONOCEA_MARK,
                title: "Preston North End × Sonocea",
              },
              {
                type: "note",
                text: "Partner crest appears on invitations, in-app programme chrome, and organisation reporting. Accent colour tints secondary actions only - primary CTA stays Sonocea ink.",
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "02.04",
          title: "Create Partner - Administrators",
          purpose: "Add the staff who will manage this partner in Sonocea.",
          frame: "desktop",
          primary: "Continue",
          layout: "default",
          data: {
            stepper: { steps: PARTNER_CREATE_STEPS, current: 3 },
            heading: "Add administrators",
            blocks: [
              {
                type: "rows",
                items: [
                  { left: "Sarah Doyle - sarah.doyle@pne.co.uk", right: "Owner" },
                  { left: "Tom Rees - tom.rees@pne.co.uk", right: "Admin" },
                ],
              },
              { type: "button", label: "+ Add administrator", full: false },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "What permission boundary sits between a partner Owner and a partner Admin - can Admins invite other admins, or only participants?",
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "02.05",
          title: "Partner Review",
          purpose: "Final check before the partner record is created.",
          frame: "desktop",
          primary: "Create Partner",
          layout: "default",
          data: {
            stepper: { steps: PARTNER_CREATE_STEPS, current: 4 },
            heading: "Review",
            blocks: [
              {
                type: "kv",
                items: [
                  ["Organisation", "Preston North End"],
                  ["Sector", "Performance"],
                  ["Identity", "Logo uploaded · Accent #1D2951"],
                  ["Administrators", "2 added"],
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "02.06",
          title: "Partner Created",
          purpose: "Confirm the partner is live and offer the next step.",
          frame: "desktop",
          layout: "default",
          data: {
            heading: "Preston North End is live",
            sub: "You can now create programmes for this partner.",
            blocks: [
              {
                type: "options",
                cols: 3,
                items: [
                  { title: "Create first programme" },
                  { title: "View partner" },
                  { title: "Return to partners" },
                ],
              },
            ],
          },
        },
      },
    ],
  },

  // ───────────────────────────── 03 - Partner Detail ─────────────────────────────
  {
    id: "03-partner-detail",
    number: "03",
    label: "03",
    navLabel: "Partner Detail",
    title: "Partner Detail",
    description: "The partner's own record inside Sonocea Admin, and the entry point for creating a programme.",
    narrative: "Inspect the live partner record and jump into programme creation.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "03.01",
          title: "Partner Overview",
          purpose: "A single partner's programmes, participants, and engagement.",
          frame: "desktop",
          layout: "partner",
          data: {
            logo: "PNE",
            logoSrc: PARTNERS.pne.logoSrc,
            org: "Preston North End",
            subtitle: "Performance · Active · pnefc.net",
            status: "Live",
            tabs: PARTNER_TABS,
            activeTab: "Overview",
            blocks: [
              {
                type: "stats",
                cols: 3,
                items: [
                  { label: "Programmes", value: "2" },
                  { label: "Participants", value: "70" },
                  { label: "Avg. engagement", value: "74%" },
                ],
              },
              {
                type: "rows",
                items: [
                  { left: "Post-Training Recovery", right: "Private IDs · 48 participants", badge: "Active" },
                  { left: "Pre-Season Focus", right: "Named · 22 participants", badge: "Draft" },
                ],
              },
              {
                type: "list",
                items: [
                  "Administrators: Sarah Doyle (Owner), Tom Rees (Admin)",
                  "Brand: Crest uploaded · Accent #1D2951",
                  "Next action: Create or launch a programme",
                ],
              },
              { type: "button", label: "+ Create Programme", primary: true, full: false },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "Do partner admins get their own portal login to see this view directly, or is it managed entirely by Sonocea on their behalf?",
      },
    ],
  },

  // ───────────────────────────── 04 - Create Programme ─────────────────────────────
  {
    id: "04-create-programme",
    number: "04",
    label: "04",
    navLabel: "Create Programme",
    title: "Create Programme",
    description: "Start a new programme, naming it and choosing its underlying structure. Step 1 of 7.",
    narrative: "Name the programme and choose structured vs curated shape.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "04.01",
          title: "Programme Basics",
          purpose: "Name the programme and set its owning partner.",
          frame: "desktop",
          primary: "Continue",
          layout: "default",
          data: {
            stepper: { steps: PROGRAMME_STEPS, current: 1 },
            heading: "New programme",
            blocks: [
              {
                type: "fields",
                items: [
                  { label: "Programme name", value: "Post-Training Recovery" },
                  { label: "Partner", value: "Preston North End" },
                  { label: "Category", value: "Recovery" },
                  { label: "Description", placeholder: "Short audio sessions to support recovery after training and matchdays." },
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "04.02",
          title: "Programme Type",
          purpose: "Choose whether the programme follows a fixed sequence or a flexible collection.",
          frame: "desktop",
          primary: "Continue",
          layout: "default",
          data: {
            stepper: { steps: PROGRAMME_STEPS, current: 1 },
            heading: "How is this programme structured?",
            blocks: [
              {
                type: "options",
                cols: 2,
                items: [
                  { title: "Structured Programme", body: "A defined sequence of sessions released week by week.", selected: true },
                  { title: "Curated Collection", body: "A flexible set of sessions participants can choose from at any time." },
                ],
              },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "Does a Curated Collection still have a meaningful 'completion' state for reporting, or is engagement the only metric that applies to it?",
      },
    ],
  },

  // ───────────────────────────── 05 - Assign Content ─────────────────────────────
  {
    id: "05-assign-content",
    number: "05",
    label: "05",
    navLabel: "Assign Content",
    title: "Assign Content",
    description: "Choose which audio sessions from the Sonocea library make up the programme. Step 2 of 7.",
    narrative: "Pick the audio sessions that will make up the programme.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "05.01",
          title: "Content Library",
          purpose: "Browse the Sonocea content library and build the programme's session list.",
          frame: "desktop",
          primary: "Continue",
          layout: "default",
          data: {
            stepper: { steps: PROGRAMME_STEPS, current: 2 },
            heading: "Choose sessions",
            blocks: [
              { type: "chips", items: ["All", "Recovery", "Sleep", "Focus", "Breathwork"], active: "Recovery" },
              {
                type: "split",
                rightTitle: "Programme Content · 3 selected",
                left: [
                  {
                    type: "list",
                    items: [
                      "Session 1 - 12 min",
                      "Session 2 - 14 min",
                      "Session 3 - 18 min",
                      "Session 4 - 20 min",
                      "Session 5 - 8 min",
                    ],
                  },
                ],
                right: [
                  {
                    type: "cards",
                    items: [
                      { title: "Session 1", meta: "12 min" },
                      { title: "Session 2", meta: "14 min" },
                      { title: "Session 3", meta: "18 min" },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  },

  // ───────────────────────────── 06 - Programme Structure ─────────────────────────────
  {
    id: "06-programme-structure",
    number: "06",
    label: "06",
    navLabel: "Structure",
    title: "Programme Structure",
    description: "The same content, structured two different ways - a fixed weekly sequence, or a flexible collection. Step 3 of 7.",
    narrative: "Arrange the same content as a weekly sequence or an open collection.",
    items: [
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "Structured Programme" },
          {
            kind: "screen",
            screen: {
              id: "06.01A",
              title: "Structured Programme",
              purpose: "Sessions are released week by week, in a fixed sequence.",
              frame: "desktop",
              primary: "Continue",
              layout: "default",
              data: {
                stepper: { steps: PROGRAMME_STEPS, current: 3 },
                heading: "Structure - Structured Programme",
                blocks: [
                  {
                    type: "week",
                    label: "Week 1",
                    sessions: [{ title: "Session 1", meta: "Mon · Wed · Fri", rec: "12 min" }],
                  },
                  {
                    type: "week",
                    label: "Week 2",
                    sessions: [
                      { title: "Session 2", meta: "Mon · Wed · Fri", rec: "14 min" },
                      { title: "Session 3", meta: "Saturday", rec: "18 min" },
                    ],
                  },
                  {
                    type: "kv",
                    items: [
                      ["Allow replay of past sessions", "Yes"],
                      ["Unlock future sessions early", "No"],
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "Curated Collection" },
          {
            kind: "screen",
            screen: {
              id: "06.01B",
              title: "Flexible Programme",
              purpose: "Participants choose freely from an open collection.",
              frame: "desktop",
              primary: "Continue",
              layout: "default",
              data: {
                stepper: { steps: PROGRAMME_STEPS, current: 3 },
                heading: "Structure - Curated Collection",
                sub: "Participants choose freely from the collection, in any order.",
                blocks: [
                  { type: "stats", cols: 2, items: [{ label: "Recommended pace", value: "3 sessions / week" }, { label: "Sessions in collection", value: "5" }] },
                  { type: "list", items: ["Session 1", "Session 2", "Session 3", "Session 4", "Session 5"] },
                ],
              },
            },
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 07 - Access / Identity Model ─────────────────────────────
  {
    id: "07-programme-access",
    number: "07",
    label: "07",
    navLabel: "Access",
    title: "Access / Identity Model",
    description:
      "Choose the identity model participants will use to access this programme. Step 4 of 7 - this decision shapes every downstream screen.",
    narrative: "Lock the identity model that will shape every downstream screen.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "07.01",
          title: "Choose Participant Access",
          purpose: "Choose how participants will be identified within the programme.",
          frame: "desktop",
          primary: "Continue",
          layout: "default",
          data: {
            stepper: { steps: PROGRAMME_STEPS, current: 4 },
            heading: "How will participants access this programme?",
            blocks: [
              {
                type: "options",
                cols: 3,
                items: [
                  { title: "A · Named", body: "Full name and email required. Individual identity is verified and stored.", badge: "Highest accountability" },
                  { title: "B · Private IDs", body: "Participants use an anonymised ID. No name or email is stored against activity.", badge: "Balanced privacy", selected: true },
                  { title: "C · Open Access", body: "Shared link or QR code. No individual accounts - only aggregate, org-level data.", badge: "Lowest friction" },
                ],
              },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "Once an identity model is chosen at programme level, can it ever change mid-programme - or does the choice lock in the underlying data model?",
      },
    ],
  },

  // ───────────────────────────── 08 - Data & Reporting ─────────────────────────────
  {
    id: "08-data-reporting",
    number: "08",
    label: "08",
    navLabel: "Data",
    title: "Data & Reporting",
    description: "Configure what activity is recorded and at what level of granularity. Step 5 of 7.",
    narrative: "Decide what activity is recorded and at what reporting grain.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "08.01",
          title: "Data Settings",
          purpose: "Set recording and reporting granularity for this programme's identity model.",
          frame: "desktop",
          primary: "Continue",
          layout: "default",
          data: {
            stepper: { steps: PROGRAMME_STEPS, current: 5 },
            heading: "Data & reporting",
            blocks: [
              {
                type: "checks",
                checked: ["Record session starts", "Record session completions"],
                items: ["Record session starts", "Record session completions", "Record optional reflection responses"],
              },
              {
                type: "options",
                cols: 2,
                items: [
                  { title: "Individual + aggregate reporting", body: "See engagement and completion by named participant.", selected: true },
                  { title: "Aggregate only", body: "See totals and trends without identifying individuals." },
                ],
              },
              { type: "note", text: "Private ID and Open Access programmes can only use aggregate-only reporting." },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "For Open Access programmes with no individual accounts, what lawful basis and retention policy applies to the aggregate analytics we still collect?",
      },
    ],
  },

  // ───────────────────────────── 09 - Participants ─────────────────────────────
  {
    id: "09-participants-setup",
    number: "09",
    label: "09",
    navLabel: "Participants",
    title: "Participants",
    description: "Add participants using the method that matches the chosen identity model. Step 6 of 7.",
    narrative: "Enrol participants using the method that matches the identity model.",
    items: [
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "A · Named" },
          {
            kind: "screen",
            screen: {
              id: "09.01A",
              title: "Named Participants",
              purpose: "Invite participants by name and email.",
              frame: "desktop",
              layout: "default",
              data: {
                heading: "Add named participants",
                blocks: [
                  {
                    type: "options",
                    cols: 3,
                    items: [{ title: "Invite Manually" }, { title: "Upload CSV" }, { title: "Share Invitation Link" }],
                  },
                ],
              },
            },
          },
        ],
      },
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "B · Anonymous" },
          {
            kind: "screen",
            screen: {
              id: "09.01B",
              title: "Anonymous Participants",
              purpose: "Generate a batch of anonymised participant IDs.",
              frame: "desktop",
              layout: "default",
              data: {
                heading: "Generate participant IDs",
                blocks: [
                  {
                    type: "kv",
                    items: [
                      ["Batch size", "30 IDs"],
                      ["ID range", "PNE-PTR-001 – PNE-PTR-030"],
                    ],
                  },
                  {
                    type: "table",
                    columns: ["Code", "Status"],
                    rows: [
                      ["PNE-PTR-001", "Unclaimed"],
                      ["PNE-PTR-002", "Unclaimed"],
                      ["PNE-PTR-003", "Claimed"],
                    ],
                  },
                  { type: "button", label: "Download CSV", full: false },
                  { type: "qr" },
                ],
              },
            },
          },
        ],
      },
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "C · Open Access" },
          {
            kind: "screen",
            screen: {
              id: "09.01C",
              title: "Open Access",
              purpose: "Publish a single shared link or QR code with no individual list.",
              frame: "desktop",
              layout: "default",
              data: {
                heading: "Open access link",
                blocks: [
                  {
                    type: "kv",
                    items: [
                      ["Link", "sonocea.com/join/PNE-RECOVERY"],
                      ["Max participants", "250"],
                      ["Start date", "3 Aug 2026"],
                      ["End date", "3 Nov 2026"],
                    ],
                  },
                  { type: "qr" },
                ],
              },
            },
          },
        ],
      },
      {
        kind: "annotation",
        text: "Should Private ID codes be printable in bulk - e.g. wristbands or laminated cards - for physical distribution at the training ground?",
      },
    ],
  },

  // ───────────────────────────── 10 - Review & Launch ─────────────────────────────
  {
    id: "10-review-launch",
    number: "10",
    label: "10",
    navLabel: "Review & Launch",
    title: "Review & Launch",
    description: "Final review before the programme goes live. Step 7 of 7.",
    narrative: "Final review, then flip the programme to live.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "10.01",
          title: "Programme Review",
          purpose: "Final check across every step before launch.",
          frame: "desktop",
          primary: "Launch Programme",
          secondary: ["Save as draft", "Back and edit"],
          layout: "default",
          data: {
            stepper: { steps: PROGRAMME_STEPS, current: 7 },
            heading: "Review programme",
            blocks: [
              {
                type: "kv",
                items: [
                  ["Programme", "Post-Training Recovery"],
                  ["Partner", "Preston North End"],
                  ["Type", "Structured Programme"],
                  ["Access model", "Private IDs"],
                  ["Data model", "Aggregate only"],
                  ["Participants", "30 IDs generated"],
                ],
              },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "Can a programme be launched before its administrators are confirmed, or should Review block launch until at least one admin is set?",
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "10.02",
          title: "Programme Live",
          purpose: "Confirm the programme is live and surface next actions.",
          frame: "desktop",
          layout: "default",
          data: {
            heading: "Post-Training Recovery is live",
            blocks: [
              { type: "badge", text: "ACTIVE" },
              { type: "list", items: ["Invite participants", "View programme", "View QR code", "View insights"] },
            ],
          },
        },
      },
    ],
  },

  // ───────────────────────────── DIVIDER - Participant Journey ─────────────────────────────
  {
    id: "divider-participant-journey",
    number: "",
    label: "",
    navLabel: "Participant Journey",
    title: "Participant Journey",
    description: "",
    divider: true,
    dividerTitle: "PARTICIPANT JOURNEY",
    dividerSubtitle: "INVITATION → ENTRY → IDENTITY → ONBOARDING → PROGRAMME → LISTENING → COMPLETION → PROGRESS",
    narrative: "The story flips from organisation setup to the person who receives the invite.",
    items: [],
  },

  // ───────────────────────────── 11 - Invitation ─────────────────────────────
  {
    id: "11-invitation",
    number: "11",
    label: "11",
    navLabel: "Invitation",
    title: "Invitation",
    description:
      "The launched programme reaches participants through three channels, matched to the identity model - each carrying Preston North End branding so the invite feels owned by the club, not a generic Sonocea blast.",
    narrative: "The invite reaches participants through email, SMS, or a physical QR - always partner-branded.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "11.01A",
          title: "Email Invite",
          purpose: "Named participants receive a personalised email invitation with partner crest and programme context.",
          frame: "email",
          primary: "Accept Invitation",
          secondary: ["View programme details"],
          layout: "email",
          data: {
            blocks: [
              {
                type: "lockup",
                partnerSrc: PARTNERS.pne.logoSrc,
                partnerLabel: "PNE",
                brandSrc: SONOCEA_MARK,
              },
              { type: "badge", text: "From Preston North End" },
              { type: "heading", text: "You're invited to Post-Training Recovery" },
              {
                type: "sub",
                text: "Hi Ben - Preston North End has set up a recovery listening programme for the first-team and academy performance group. Sessions are short, headphone-based, and designed for post-training down-regulation.",
              },
              {
                type: "kv",
                items: [
                  ["Programme", "Post-Training Recovery"],
                  ["Organisation", "Preston North End"],
                  ["Your seat", "Named · Ben Walker"],
                  ["First session", "Session 1 · 12 min"],
                ],
              },
              {
                type: "note",
                text: "Accepting opens a mobile web handoff that deep-links into the Sonocea app, preserving this invitation.",
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "11.01B",
          title: "SMS Invite",
          purpose: "Private ID participants receive an ID by SMS - short enough for matchday ops, still branded.",
          frame: "sms",
          layout: "sms",
          data: {
            message:
              "Preston North End × Sonocea: Post-Training Recovery is ready. Your private ID is PNE-PTR-014. Open to start: sonocea.com/j/PNE-PTR-014",
          },
        },
      },
      { kind: "break" },
      {
        kind: "screen",
        screen: {
          id: "11.01C",
          title: "QR Entry",
          purpose: "Open Access participants scan a QR code on a printed card or poster in the facility.",
          frame: "physical",
          layout: "physical",
          data: {
            blocks: [
              { type: "logo", src: PARTNERS.pne.logoSrc, label: "PNE", size: "lg" },
              { type: "heading", text: "Post-Training Recovery" },
              { type: "sub", text: "Preston North End · Performance" },
              { type: "qr" },
              { type: "sub", text: "Scan to start listening - no sign-up required." },
              { type: "note", text: "Printed for Deepdale recovery suite · Season 2026/27" },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "For Open Access programmes distributed via a physical QR code, how do we attribute sign-ups back to that channel without collecting identity?",
      },
    ],
  },

  // ───────────────────────────── 12 - Deep Link / App Handoff ─────────────────────────────
  {
    id: "12-app-handoff",
    number: "12",
    label: "12",
    navLabel: "App Handoff",
    title: "Deep Link / App Handoff",
    description:
      "Every invitation opens in a mobile browser first. If the app is installed, it opens immediately; if not, the participant lands on the App Store listing, then returns with invitation context intact.",
    narrative: "Invitation opens in browser, then hands off to the app or App Store with context intact.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "12.01",
          title: "Web Handoff",
          purpose: "Bridge the invitation link to the native app while showing partner and programme context.",
          frame: "mobile",
          primary: "Open Sonocea App",
          secondary: ["Download from the App Store"],
          layout: "default",
          data: {
            blocks: [
              {
                type: "lockup",
                partnerSrc: PARTNERS.pne.logoSrc,
                partnerLabel: "PNE",
                brandSrc: SONOCEA_MARK,
              },
              { type: "heading", text: "Continue to Sonocea" },
              {
                type: "sub",
                text: "Open the app to accept your invitation to Post-Training Recovery from Preston North End.",
              },
              {
                type: "kv",
                items: [
                  ["Programme", "Post-Training Recovery"],
                  ["Invited by", "Preston North End"],
                  ["Your seat", "Named · Ben Walker"],
                ],
              },
              {
                type: "list",
                items: [
                  "If the app is installed → opens with this invite restored",
                  "If not → App Store, then return here after install",
                ],
              },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "Programme context needs to survive app installation - store a short-lived invite token before sending to the App Store, and restore it on first open.",
      },
      {
        kind: "stack",
        items: [{ kind: "branch", label: "App Installed → Open App" }],
      },
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "App Not Installed → App Store" },
          {
            kind: "screen",
            screen: {
              id: "12.02",
              title: "App Store",
              purpose: "The real App Store product page for Sonocea - where participants go when the app is not yet installed.",
              frame: "mobile",
              layout: "app-store",
              data: {
                iconSrc: SONOCEA_MARK,
                appName: "Sonocea",
                subtitle: "Guided listening for recovery",
                developer: "Sonocea Ltd",
                cta: "Get",
                meta: [
                  { label: "Ratings", value: "4.8", sub: "214 Ratings" },
                  { label: "Age", value: "12+", sub: "Years Old" },
                  { label: "Category", value: "Health", sub: "& Fitness" },
                ],
                screenshots: ["Home", "Player", "Progress"],
                description:
                  "Join partner-led listening programmes for recovery, focus, and regulation. Short headphone sessions designed for elite performance environments - invited by your organisation, not sold as a consumer subscription.",
                partnerLogoSrc: PARTNERS.pne.logoSrc,
                partnerLabel: "PNE",
                partnerNoteTitle: "Waiting invitation",
                partnerNote:
                  "After install, Sonocea will restore your Preston North End invitation to Post-Training Recovery.",
                info: [
                  ["Provider", "Sonocea Ltd"],
                  ["Size", "48.2 MB"],
                  ["Compatibility", "Requires iOS 16.0 or later"],
                  ["Category", "Health & Fitness"],
                  ["Languages", "English"],
                  ["Copyright", "© Sonocea Ltd"],
                ],
              },
            },
          },
          { kind: "arrow", label: "Install" },
          { kind: "arrow", label: "Open" },
          {
            kind: "screen",
            screen: {
              id: "12.03",
              title: "Restore Invitation",
              purpose: "Reconnect the newly installed app to the original invitation.",
              frame: "mobile",
              primary: "Continue",
              layout: "mobile-shell",
              data: {
                blocks: [
                  {
                    type: "lockup",
                    partnerSrc: PARTNERS.pne.logoSrc,
                    partnerLabel: "PNE",
                    brandSrc: SONOCEA_MARK,
                  },
                  { type: "heading", text: "Restoring your invitation" },
                  {
                    type: "sub",
                    text: "Reconnecting you to Post-Training Recovery at Preston North End. This only takes a moment.",
                  },
                  {
                    type: "kv",
                    items: [
                      ["Invite token", "pne-ptr-ben-…"],
                      ["Status", "Valid · Expires in 6 days"],
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 13 - Entry Routes ─────────────────────────────
  {
    id: "13-entry-routes",
    number: "13",
    label: "13",
    navLabel: "Entry Routes",
    title: "Entry Routes",
    description: "From the restored invitation, the route diverges based on whether the participant is new, existing, or anonymous.",
    narrative: "Entry diverges for new, existing, and anonymous participants.",
    items: [
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "New User" },
          {
            kind: "screen",
            screen: {
              id: "13.01A",
              title: "Welcome",
              purpose: "Greet a brand-new participant with partner context front and centre.",
              frame: "mobile",
              primary: "Get Started",
              layout: "mobile-shell",
              data: {
                blocks: [
                  {
                    type: "lockup",
                    partnerSrc: PARTNERS.pne.logoSrc,
                    partnerLabel: "PNE",
                    brandSrc: SONOCEA_MARK,
                  },
                  { type: "heading", text: "Welcome to Sonocea" },
                  {
                    type: "sub",
                    text: "You've been invited to Post-Training Recovery by Preston North End - a short, headphone-based programme for post-training recovery.",
                  },
                  {
                    type: "list",
                    items: [
                      "Create an account so progress stays on this device and any others you use",
                      "Confirm headphones and a quiet space before your first session",
                      "Start Session 1 when you're ready - about 12 minutes",
                    ],
                  },
                ],
              },
            },
          },
          { kind: "arrow" },
          {
            kind: "screen",
            screen: {
              id: "13.02A",
              title: "Create Account",
              purpose: "Named participants create a password-protected account.",
              frame: "mobile",
              primary: "Create Account",
              layout: "mobile-shell",
              data: {
                blocks: [
                  { type: "heading", text: "Create your account" },
                  {
                    type: "fields",
                    items: [
                      { label: "Full name", placeholder: "Ben Whiteman" },
                      { label: "Email", placeholder: "you@pne.co.uk" },
                      { label: "Password", placeholder: "••••••••" },
                    ],
                  },
                ],
              },
            },
          },
          { kind: "arrow" },
          {
            kind: "screen",
            screen: {
              id: "13.03A",
              title: "Verify",
              purpose: "Confirm the new account with a one-time code.",
              frame: "mobile",
              primary: "Verify",
              layout: "mobile-shell",
              data: {
                blocks: [
                  { type: "heading", text: "Enter the code we sent you" },
                  { type: "field", label: "6-digit code", placeholder: "••••••" },
                ],
              },
            },
          },
          { kind: "arrow" },
          {
            kind: "screen",
            screen: {
              id: "13.04A",
              title: "Account Created",
              purpose:
                "Confirm the account is live and restate the partner programme waiting ahead, so the create-account beat doesn't feel like a dead end before onboarding.",
              frame: "mobile",
              primary: "Continue to programme",
              layout: "mobile-shell",
              data: {
                blocks: [
                  {
                    type: "lockup",
                    partnerSrc: PARTNERS.pne.logoSrc,
                    partnerLabel: "PNE",
                    brandSrc: SONOCEA_MARK,
                  },
                  { type: "badge", text: "Account ready" },
                  { type: "heading", text: "You're in, Ben", size: "lg" },
                  {
                    type: "sub",
                    text: "Your Sonocea account is set up. Next we'll introduce Post-Training Recovery from Preston North End.",
                  },
                  {
                    type: "kv",
                    items: [
                      ["Email", "b.whiteman@pne.co.uk"],
                      ["Organisation", "Preston North End"],
                      ["Programme waiting", "Post-Training Recovery"],
                    ],
                  },
                  {
                    type: "list",
                    items: [
                      "Progress syncs across devices once you sign in",
                      "You can switch programmes later from Home",
                      "Headphones recommended for the first session",
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "Existing User" },
          {
            kind: "screen",
            screen: {
              id: "13.01B",
              title: "Welcome Back",
              purpose: "Sign an existing Sonocea user back in.",
              frame: "mobile",
              primary: "Sign In",
              secondary: ["Forgot password?"],
              layout: "mobile-shell",
              data: {
                blocks: [
                  { type: "heading", text: "Welcome back" },
                  {
                    type: "fields",
                    items: [
                      { label: "Email", placeholder: "you@pne.co.uk" },
                      { label: "Password", placeholder: "••••••••" },
                    ],
                  },
                ],
              },
            },
          },
          { kind: "arrow" },
          {
            kind: "screen",
            screen: {
              id: "13.02B",
              title: "Programme Found",
              purpose: "Surface the new programme to an already-signed-in user.",
              frame: "mobile",
              primary: "Add to My Programmes",
              layout: "mobile-shell",
              data: {
                blocks: [
                  { type: "heading", text: "We found a new programme for you" },
                  {
                    type: "kv",
                    items: [
                      ["Programme", "Post-Training Recovery"],
                      ["Partner", "Preston North End"],
                    ],
                  },
                ],
              },
            },
          },
          { kind: "arrow" },
          {
            kind: "screen",
            screen: {
              id: "13.03B",
              title: "Programme Added",
              purpose:
                "Confirm the programme is on the account and show how to switch if they already belong to another PNE programme.",
              frame: "mobile",
              primary: "Go to Home",
              layout: "mobile-shell",
              data: {
                blocks: [
                  {
                    type: "lockup",
                    partnerSrc: PARTNERS.pne.logoSrc,
                    partnerLabel: "PNE",
                    brandSrc: SONOCEA_MARK,
                  },
                  { type: "badge", text: "Added" },
                  { type: "heading", text: "Post-Training Recovery added", size: "lg" },
                  {
                    type: "sub",
                    text: "It's now on your Home. Switch between programmes any time from the programme chip or Profile.",
                  },
                  {
                    type: "preview",
                    title: "Post-Training Recovery",
                    sub: "Preston North End · Structured · Week 1 ready",
                    body: "First recommended session: Session 1 · 12 min.",
                    atmosphere: true,
                  },
                  {
                    type: "stats",
                    cols: 2,
                    items: [
                      { label: "Your programmes", value: "2" },
                      { label: "Active seat", value: "Named" },
                    ],
                  },
                  {
                    type: "note",
                    text: "If you already use Pre-Season Focus, Home will default to the programme with the next incomplete session.",
                  },
                ],
              },
            },
          },
        ],
      },
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "Anonymous" },
          {
            kind: "screen",
            screen: {
              id: "13.01C",
              title: "Join With Participant ID",
              purpose: "Authenticate with an anonymised ID - no name or email required.",
              frame: "mobile",
              primary: "Continue",
              layout: "mobile-shell",
              data: {
                blocks: [
                  { type: "heading", text: "Join with your Participant ID" },
                  { type: "field", label: "Participant ID", placeholder: "PNE-PTR-014" },
                ],
              },
            },
          },
          { kind: "arrow" },
          {
            kind: "screen",
            screen: {
              id: "13.02C",
              title: "Recognised",
              purpose: "Confirm the ID without collecting any personal data.",
              frame: "mobile",
              primary: "Continue",
              layout: "mobile-shell",
              data: {
                blocks: [
                  { type: "heading", text: "You're in" },
                  {
                    type: "kv",
                    items: [
                      ["Organisation", "Preston North End"],
                      ["Programme", "Post-Training Recovery"],
                    ],
                  },
                  { type: "sub", text: "No name or email is required for this programme." },
                ],
              },
            },
          },
        ],
      },
      {
        kind: "annotation",
        text: "This is the only screen where the system knows organisation, programme, and participant - without ever knowing personal identity. Every downstream screen must preserve that boundary.",
      },
    ],
  },

  // ───────────────────────────── 14 - Invalid States ─────────────────────────────
  {
    id: "14-invalid-states",
    number: "14",
    label: "14",
    navLabel: "Invalid States",
    title: "Invalid Entry States",
    description:
      "The entry routes above assume everything goes right. These four states cover broken invites and unusable IDs - each with a clear error, partner context, and a support or retry path.",
    narrative: "When the invite or ID fails, surface a clear error, partner context, and a way forward.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "14.01",
          title: "Invalid Invitation",
          purpose:
            "Stop a broken or mistyped invitation link from feeling like a product failure - explain the error, keep Preston North End in view, and offer support plus a retry path.",
          frame: "mobile",
          primary: "Contact Support",
          secondary: ["Try the link again"],
          layout: "mobile-shell",
          data: {
            blocks: [
              {
                type: "lockup",
                partnerSrc: PARTNERS.pne.logoSrc,
                partnerLabel: "PNE",
                brandSrc: SONOCEA_MARK,
              },
              { type: "eyebrow", text: "Invitation error" },
              { type: "heading", text: "This invitation link isn't valid", size: "lg" },
              {
                type: "alert",
                title: "We couldn't open that invite",
                text: "The link may be incomplete, copied wrong, or no longer tied to an active programme seat.",
              },
              {
                type: "sub",
                text: "Double-check the link Preston North End sent you. If it still fails, contact club staff or Sonocea support with the details below.",
              },
              {
                type: "kv",
                items: [
                  ["Organisation", "Preston North End"],
                  ["Expected programme", "Post-Training Recovery"],
                  ["Error code", "INVITE_NOT_FOUND"],
                ],
              },
              {
                type: "list",
                items: [
                  "Open the original email or SMS - don't retype the URL",
                  "Ask your club contact to resend if the invite was revoked",
                  "Support can check seat status without resetting your account",
                ],
              },
              {
                type: "note",
                text: "Support path: help@sonocea.com · mention Preston North End and Post-Training Recovery.",
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "14.02",
          title: "Expired Invitation",
          purpose:
            "When the invite window has passed, make the expiry explicit and give a single clear ask: request a fresh invitation from the partner.",
          frame: "mobile",
          primary: "Request a New Invitation",
          secondary: ["Contact Support"],
          layout: "mobile-shell",
          data: {
            blocks: [
              {
                type: "lockup",
                partnerSrc: PARTNERS.pne.logoSrc,
                partnerLabel: "PNE",
                brandSrc: SONOCEA_MARK,
              },
              { type: "eyebrow", text: "Invitation expired" },
              { type: "heading", text: "This invitation has expired", size: "lg" },
              {
                type: "alert",
                title: "Validity window closed",
                text: "Invites for Post-Training Recovery expire after 14 days for security. Your seat may still exist - it just needs a fresh link.",
              },
              {
                type: "kv",
                items: [
                  ["Organisation", "Preston North End"],
                  ["Programme", "Post-Training Recovery"],
                  ["Expired", "2 days ago"],
                  ["Original invite", "Named · Ben Walker"],
                ],
              },
              {
                type: "list",
                items: [
                  "Ask Preston North End performance staff to resend",
                  "A new link restores the same named seat - you won't create a duplicate",
                  "If you already have an account, sign in after the new invite arrives",
                ],
              },
              {
                type: "note",
                text: "Retry guidance: once you have a new link, open it on this device so the invite token restores correctly.",
              },
            ],
          },
        },
      },
      { kind: "break" },
      {
        kind: "screen",
        screen: {
          id: "14.03",
          title: "Participant ID Invalid",
          purpose:
            "For Private ID entry, an unmatched code should invite careful retry without leaking whether neighbouring IDs exist.",
          frame: "mobile",
          primary: "Try Again",
          secondary: ["Contact Support"],
          layout: "mobile-shell",
          data: {
            blocks: [
              {
                type: "lockup",
                partnerSrc: PARTNERS.pne.logoSrc,
                partnerLabel: "PNE",
                brandSrc: SONOCEA_MARK,
              },
              { type: "eyebrow", text: "ID not recognised" },
              { type: "heading", text: "We couldn't find that ID", size: "lg" },
              {
                type: "alert",
                title: "No match for this code",
                text: "Check spacing and hyphens - Private IDs look like PNE-PTR-014. We won't reveal which codes are valid.",
              },
              {
                type: "field",
                label: "Participant ID",
                placeholder: "PNE-PTR-014",
              },
              {
                type: "kv",
                items: [
                  ["Organisation context", "Preston North End"],
                  ["Programme", "Post-Training Recovery"],
                  ["Attempts left", "4"],
                ],
              },
              {
                type: "list",
                items: [
                  "Retype from the SMS or laminated card - avoid autocorrect",
                  "IDs are case-sensitive on the letter prefix",
                  "Still stuck? Ask club staff for the printed code, not a screenshot of someone else's",
                ],
              },
              {
                type: "note",
                text: "Support can confirm batch membership without exposing other participants' IDs.",
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "14.04",
          title: "Participant Already Activated",
          purpose:
            "If the Private ID is already bound to another device, steer the rightful owner to sign-in or support rather than allowing a second activation.",
          frame: "mobile",
          primary: "Sign In",
          secondary: ["Contact Support"],
          layout: "mobile-shell",
          data: {
            blocks: [
              {
                type: "lockup",
                partnerSrc: PARTNERS.pne.logoSrc,
                partnerLabel: "PNE",
                brandSrc: SONOCEA_MARK,
              },
              { type: "eyebrow", text: "Already activated" },
              { type: "heading", text: "This ID has already been activated", size: "lg" },
              {
                type: "alert",
                title: "Seat is bound to another device",
                text: "PNE-PTR-014 was claimed earlier. If that's you, sign back in on this device instead of activating again.",
              },
              {
                type: "kv",
                items: [
                  ["Participant ID", "PNE-PTR-014"],
                  ["Organisation", "Preston North End"],
                  ["Programme", "Post-Training Recovery"],
                  ["Activated", "12 days ago"],
                ],
              },
              {
                type: "list",
                items: [
                  "Same person, new phone → Sign In or restore via support",
                  "Someone else used your code → contact Preston North End immediately",
                  "Do not share Private IDs - each seat is one device binding",
                ],
              },
              {
                type: "note",
                text: "Support path can re-bind a lost device after partner staff confirm the ID ownership.",
              },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "Should every invalid state offer a direct path to human support, or only the ones a participant can't self-resolve (expired / already activated)?",
      },
    ],
  },

  // ───────────────────────────── 15 - Programme Introduction ─────────────────────────────
  {
    id: "15-programme-introduction",
    number: "15",
    label: "15",
    navLabel: "Introduction",
    title: "Programme Introduction",
    description:
      "A short once-only introduction to the programme and how listening works. Comfort and 'simply listen' beats set physical and mental expectations before audio setup.",
    narrative: "Introduce the programme once, then set comfort and listening expectations.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "15.01",
          title: "Your Programme",
          purpose: "Introduce the specific programme the participant has joined.",
          frame: "mobile",
          primary: "Continue",
          layout: "mobile-shell",
          data: {
            blocks: [
              {
                type: "lockup",
                partnerSrc: PARTNERS.pne.logoSrc,
                partnerLabel: "PNE",
                brandSrc: SONOCEA_MARK,
              },
              {
                type: "preview",
                title: "Post-Training Recovery",
                sub: "6 weeks · 4 sessions / week · Structured",
                body: "A Preston North End performance programme for post-training down-regulation. Short headphone sessions after gym or pitch work.",
              },
              {
                type: "kv",
                items: [
                  ["Organisation", "Preston North End"],
                  ["Your seat", "Named · Ben Walker"],
                  ["First session", "Session 1 · 12 min"],
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "15.02",
          title: "How It Works",
          purpose: "Explain that headphones are required for the intended effect.",
          frame: "mobile",
          primary: "Continue",
          layout: "mobile-shell",
          data: {
            blocks: [
              { type: "heading", text: "How it works" },
              { type: "list", items: ["Each session uses layered, spatial audio", "Headphones are required for the full effect", "Sessions run between 8 and 20 minutes"] },
            ],
          },
        },
      },
      { kind: "break" },
      {
        kind: "screen",
        screen: {
          id: "15.03",
          title: "Find Somewhere Comfortable",
          purpose:
            "Set physical-environment expectations so participants treat listening as a short recovery ritual, not a multitasking soundtrack.",
          frame: "mobile",
          primary: "Continue",
          layout: "mobile-shell",
          data: {
            blocks: [
              { type: "eyebrow", text: "Before you start" },
              { type: "heading", text: "Find somewhere comfortable", size: "lg" },
              {
                type: "preview",
                title: "Quiet recovery space",
                sub: "Sit or lie down · 10–20 minutes uninterrupted",
                body: "A bay, physio room, or quiet corner at Deepdale works. Dim light helps; you don't need total silence.",
                atmosphere: true,
                tone: "dark",
              },
              {
                type: "sectionLabel",
                text: "Comfort checklist",
              },
              {
                type: "list",
                items: [
                  "Phone on silent or Do Not Disturb",
                  "Sit or lie where you won't need to move for the session",
                  "Headphones on before you press play",
                  "Water nearby is fine - screens and chat can wait",
                ],
              },
              {
                type: "note",
                text: "If you're between pitch and travel, even a short seated window is enough - don't skip comfort entirely.",
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "15.04",
          title: "Simply Listen",
          purpose:
            "Reassure the participant there is nothing to tap, score, or solve during playback - the product job is passive guided listening.",
          frame: "mobile",
          primary: "Continue",
          layout: "mobile-shell",
          data: {
            blocks: [
              { type: "eyebrow", text: "During a session" },
              { type: "heading", text: "Simply listen", size: "xl" },
              {
                type: "preview",
                title: "No actions mid-session",
                sub: "Press play · Keep headphones on · Let it finish",
                body: "Layered spatial audio does the work. You won't be asked to breathe on cue, tap, or rate until the session ends.",
                atmosphere: true,
                tone: "dark",
              },
              {
                type: "list",
                items: [
                  "Eyes open or closed - either is fine",
                  "If interrupted, you can pause and resume from the same point",
                  "Early exit is possible, but full listens count toward your week",
                ],
              },
              {
                type: "chips",
                items: ["Passive", "Headphones", "8–20 min"],
                active: "Passive",
              },
              {
                type: "note",
                text: "Reflection after the session is optional and only appears when the programme enables it.",
              },
            ],
          },
        },
      },
    ],
  },

  // ───────────────────────────── 16 - Audio Setup ─────────────────────────────
  {
    id: "16-audio-setup",
    number: "16",
    label: "16",
    navLabel: "Audio Setup",
    title: "Audio Setup",
    description:
      "Confirm audio output before the first session. If headphones are missing, warn clearly and offer continue-with-warning or come-back-with-headphones paths.",
    narrative: "Confirm headphones and audio before the first real session.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "16.01",
          title: "Let's Check Your Audio",
          purpose:
            "Play a short test tone so the participant verifies volume and output path before Session 1 - catching silent failures before the real session starts.",
          frame: "mobile",
          primary: "Play Test Sound",
          secondary: ["I can hear it"],
          layout: "mobile-shell",
          data: {
            blocks: [
              { type: "eyebrow", text: "Audio check" },
              { type: "heading", text: "Let's check your audio", size: "lg" },
              {
                type: "sub",
                text: "Put your headphones in, then play the test sound. You should hear a short stereo tone in both ears.",
              },
              {
                type: "preview",
                title: "Test tone",
                sub: "Stereo · ~2 seconds · Soft level",
                body: "Status: Ready to play - tap Play Test Sound below.",
                atmosphere: true,
              },
              {
                type: "stats",
                cols: 2,
                items: [
                  { label: "Output", value: "Headphones" },
                  { label: "Status", value: "Waiting" },
                ],
              },
              {
                type: "kv",
                items: [
                  ["Left channel", "Expected"],
                  ["Right channel", "Expected"],
                  ["Volume tip", "Start mid - don't max"],
                ],
              },
              {
                type: "list",
                items: [
                  "If you hear nothing, check Bluetooth pairing or the silent switch",
                  "Speaker-only playback is not recommended for this programme",
                  "Once you hear it, tap I can hear it to continue",
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow", label: "if headphones missing" },
      {
        kind: "screen",
        screen: {
          id: "16.02",
          title: "No Headphones",
          purpose:
            "Handle missing headphones without blocking forever - recommend spatial-audio intent clearly, then offer resume-when-ready or continue-with-reduced-effect.",
          frame: "mobile",
          primary: "I Have Headphones Now",
          secondary: ["Continue without headphones"],
          layout: "mobile-shell",
          data: {
            blocks: [
              { type: "eyebrow", text: "Headphones recommended" },
              { type: "heading", text: "No headphones detected", size: "lg" },
              {
                type: "alert",
                title: "Spatial audio needs headphones",
                text: "Post-Training Recovery uses layered, spatial audio. Phone speakers collapse the effect and can disturb others in the recovery suite.",
              },
              {
                type: "options",
                cols: 1,
                items: [
                  {
                    title: "I have headphones now",
                    body: "Plug in or connect Bluetooth, then re-run the audio check.",
                    selected: true,
                  },
                  {
                    title: "Continue without headphones",
                    body: "Allowed, but marked as reduced-effect. You can still complete the session.",
                  },
                  {
                    title: "Come back later",
                    body: "Save your place - Home will keep Session 1 ready when you return.",
                  },
                ],
              },
              {
                type: "note",
                text: "Partner guidance at Preston North End: treat headphone use as part of the recovery protocol, not optional kit.",
              },
            ],
          },
        },
      },
    ],
  },
  // ───────────────────────────── 17 - Ready / First Session ─────────────────────────────
  {
    id: "17-ready-first-session",
    number: "17",
    label: "17",
    navLabel: "Ready",
    title: "Ready / First Session",
    description: "The handoff point from onboarding into the first real session - with programme and partner context still visible.",
    narrative: "Onboarding ends - offer the first session with an easy deferral.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "17.01",
          title: "You're Ready",
          purpose: "Offer the first session, with an easy way to defer it.",
          frame: "mobile",
          primary: "Start Session",
          secondary: ["Go to Home"],
          layout: "mobile-shell",
          data: {
            blocks: [
              {
                type: "lockup",
                partnerSrc: PARTNERS.pne.logoSrc,
                partnerLabel: "PNE",
                brandSrc: SONOCEA_MARK,
              },
              { type: "heading", text: "You're ready" },
              {
                type: "sub",
                text: "Headphones on, quiet space ready. Start with Session 1 - the first session in Preston North End's Post-Training Recovery programme.",
              },
              {
                type: "preview",
                title: "Session 1",
                sub: "12 min · Down Regulation · Week 1",
                body: "A guided listening session for post-training recovery. Sit or lie down; keep headphones on for the full duration.",
              },
              {
                type: "list",
                items: [
                  "Recommended after training or gym",
                  "Counts toward this week's 4-session target",
                  "You can pause and resume later if interrupted",
                ],
              },
            ],
          },
        },
      },
    ],
  },

  // ───────────────────────────── 18 - App Home ─────────────────────────────
  {
    id: "18-app-home",
    number: "18",
    label: "18",
    navLabel: "Home",
    title: "App Home",
    description: "The participant's personalised home once onboarding is complete - programme progress and partner badge front and centre.",
    narrative: "Home becomes the daily pulse: week progress, streak, and next session.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "18.01",
          title: "Home",
          purpose: "Show weekly progress and the next recommended session.",
          frame: "mobile",
          layout: "mobile-shell",
          data: {
            bottomNav: APP_BOTTOM_NAV,
            activeTab: "home",
            blocks: [
              {
                type: "lockup",
                partnerSrc: PARTNERS.pne.logoSrc,
                partnerLabel: "PNE",
                brandSrc: SONOCEA_MARK,
                title: "Post-Training Recovery",
              },
              { type: "heading", text: "Good afternoon, Ben" },
              { type: "sub", text: "Week 2 of 6 · Preston North End" },
              {
                type: "weekStrip",
                label: "This week",
                days: [
                  { label: "M", on: true },
                  { label: "T", on: true },
                  { label: "W", on: false },
                  { label: "T", on: false },
                  { label: "F", on: false },
                  { label: "S", on: false },
                  { label: "S", on: false },
                ],
              },
              {
                type: "stats",
                cols: 2,
                items: [
                  { label: "This week", value: "2 of 4 sessions" },
                  { label: "Current streak", value: "5 days" },
                ],
              },
              {
                type: "cards",
                items: [
                  {
                    title: "Up next: Session 2",
                    meta: "14 min · Down Regulation · Ready when you are",
                    body: "Recommended after today's training block.",
                    action: "Start",
                  },
                ],
              },
              {
                type: "note",
                text: "Switch programme from the profile menu if you're enrolled in more than one.",
              },
            ],
          },
        },
      },
    ],
  },
  // ───────────────────────────── 19 - Discover ─────────────────────────────
  {
    id: "19-discover",
    number: "19",
    label: "19",
    navLabel: "Discover",
    title: "Discover",
    description: "Browse beyond the assigned programme, where a wider library is enabled.",
    narrative: "Browse beyond the assigned programme when a wider library is enabled.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "19.01",
          title: "Discover",
          purpose: "Show what's available to browse beyond the assigned programme.",
          frame: "mobile",
          layout: "mobile-shell",
          data: {
            bottomNav: APP_BOTTOM_NAV,
            activeTab: "discover",
            blocks: [
              { type: "heading", text: "Discover", size: "lg" },
              {
                type: "sub",
                text: "Your programme and optional libraries. Locked items stay visible so participants understand what's available beyond this invite.",
              },
              {
                type: "cards",
                items: [
                  {
                    title: "Post-Training Recovery",
                    meta: "Preston North End · Your programme · 6 weeks",
                    body: "Active · 2 of 4 sessions this week",
                  },
                  {
                    title: "Sleep Library",
                    meta: "Not included in this invite",
                    body: "Locked - ask your organisation if you need access",
                  },
                  {
                    title: "Focus Library",
                    meta: "Not included in this invite",
                    body: "Locked - ask your organisation if you need access",
                  },
                ],
              },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "If the wider content library isn't enabled for this programme, should Discover be hidden entirely, or shown with locked / upsell states?",
      },
    ],
  },

  // ───────────────────────────── 20 - Session Detail ─────────────────────────────
  {
    id: "20-session-detail",
    number: "20",
    label: "20",
    navLabel: "Session Detail",
    title: "Session Detail",
    description: "Detail view before a subsequent session begins.",
    narrative: "Session detail primes the participant before playback begins.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "20.01",
          title: "Session 2",
          purpose: "Introduce a specific session before starting playback.",
          frame: "mobile",
          primary: "Begin Session",
          secondary: ["Save for later"],
          layout: "mobile-shell",
          data: {
            blocks: [
              { type: "badge", text: "Week 2 · Recommended" },
              {
                type: "preview",
                title: "Session 2",
                sub: "14 min · Down Regulation",
                body: "Builds on Session 1 with a slightly longer arc. Best within 60 minutes of finishing training.",
              },
              {
                type: "chips",
                items: ["14 min", "Down Regulation", "Week 2", "Headphones"],
                active: "Down Regulation",
              },
              {
                type: "kv",
                items: [
                  ["Programme", "Post-Training Recovery"],
                  ["Organisation", "Preston North End"],
                  ["Mode", "Headphones required"],
                  ["Progress", "Counts as 1 of 4 this week"],
                ],
              },
              {
                type: "list",
                items: [
                  "Find a quiet seat or recovery bay",
                  "Put headphones on before you press Begin",
                  "Stay for the full session if you can - early exit still records a partial listen",
                ],
              },
            ],
          },
        },
      },
    ],
  },
  // ───────────────────────────── 21 - Audio Player ─────────────────────────────
  {
    id: "21-audio-player",
    number: "21",
    label: "21",
    navLabel: "Player",
    title: "Audio Player",
    description:
      "The core listening experience in full-screen form. Pause controls stay minimal; interruption surfaces a clear resume path so sequencing is preserved.",
    narrative: "Full-screen listening, pause controls, and a resume path after interruption.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "21.01",
          title: "Playing",
          purpose:
            "Deliver an immersive full-screen player for Session 2 - partner context, progress, and transport only - so listening stays the single job on screen.",
          frame: "mobile",
          layout: "default",
          data: {
            blocks: [
              {
                type: "player",
                title: "Session 2",
                partner: "Preston North End · Post-Training Recovery",
                eyebrow: "Now playing",
                elapsed: "04:12",
                remaining: "-09:48",
                progress: "30%",
              },
              {
                type: "note",
                text: "Lock screen and Control Centre show the same session title; scrubbing is limited to ±15s to protect sequencing.",
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "21.02",
          title: "Paused",
          purpose:
            "When paused, keep the same player chrome so resume is one tap - progress and remaining time stay visible so the participant knows how much is left.",
          frame: "mobile",
          layout: "default",
          data: {
            blocks: [
              {
                type: "player",
                title: "Session 2",
                partner: "Preston North End · Post-Training Recovery",
                eyebrow: "Paused",
                elapsed: "04:12",
                remaining: "-09:48",
                progress: "30%",
                paused: true,
              },
              {
                type: "stats",
                cols: 2,
                items: [
                  { label: "Listened", value: "4:12" },
                  { label: "Remaining", value: "9:48" },
                ],
              },
              {
                type: "list",
                items: [
                  "Resume continues from this timestamp",
                  "End session early from the chrome menu if you must leave",
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow", label: "if interrupted" },
      {
        kind: "screen",
        screen: {
          id: "21.03",
          title: "Session Interrupted",
          purpose:
            "When a phone call or system interrupt stops playback, freeze position and offer Resume as the primary path so the intended audio sequence can continue.",
          frame: "mobile",
          primary: "Resume",
          secondary: ["End session"],
          layout: "mobile-shell",
          data: {
            blocks: [
              { type: "eyebrow", text: "Interrupted" },
              { type: "heading", text: "Session interrupted", size: "lg" },
              {
                type: "alert",
                title: "Playback paused by the system",
                text: "A phone call or another app took audio focus. Your place in Session 2 is saved at 04:12.",
              },
              {
                type: "preview",
                title: "Session 2",
                sub: "04:12 of 14:00 · Ready to resume",
                body: "Resume returns to the exact timestamp. Ending now records a partial listen.",
                atmosphere: true,
                tone: "dark",
              },
              {
                type: "kv",
                items: [
                  ["Programme", "Post-Training Recovery"],
                  ["Partner", "Preston North End"],
                  ["Saved position", "04:12"],
                  ["Week progress if completed", "3 of 4"],
                ],
              },
              {
                type: "list",
                items: [
                  "Resume - continue the same session (recommended)",
                  "End session - return to Home with partial credit rules applied",
                ],
              },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "After an interruption, should playback auto-resume from the exact timestamp, or restart the session to preserve the intended audio sequencing?",
      },
    ],
  },

  // ───────────────────────────── 22 - Early Exit ─────────────────────────────
  {
    id: "22-early-exit",
    number: "22",
    label: "22",
    navLabel: "Early Exit",
    title: "Early Exit",
    description:
      "Leaving before the end asks for confirmation with a progress-lost warning, then explains how partial listens count toward streak and programme credit.",
    narrative: "Leaving early asks for confirmation and explains partial credit.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "22.01",
          title: "End This Session?",
          purpose:
            "Confirm the participant really wants to leave early, and warn that unfinished listening may not count toward streak or weekly target.",
          frame: "mobile",
          primary: "End Session",
          secondary: ["Keep Listening"],
          layout: "mobile-shell",
          data: {
            blocks: [
              { type: "eyebrow", text: "Confirm exit" },
              { type: "heading", text: "End this session?", size: "lg" },
              {
                type: "alert",
                title: "Progress may not count",
                text: "You've listened to 6 of 14 minutes. Ending now won't add to your streak, and this session won't count toward this week's 4-session target.",
              },
              {
                type: "stats",
                cols: 2,
                items: [
                  { label: "Listened", value: "6 min" },
                  { label: "Remaining", value: "8 min" },
                ],
              },
              {
                type: "kv",
                items: [
                  ["Session", "Session 2"],
                  ["Programme", "Post-Training Recovery"],
                  ["If you finish", "Week progress → 3/4"],
                  ["If you exit now", "Partial listen only"],
                ],
              },
              {
                type: "note",
                text: "Keep Listening returns you to the player at 06:00 with no data lost.",
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "22.02",
          title: "Session Ended Early",
          purpose:
            "Acknowledge the early end honestly - partial credit is recorded for organisation analytics, but streak and weekly completion stay unchanged.",
          frame: "mobile",
          primary: "Back to Home",
          layout: "mobile-shell",
          data: {
            blocks: [
              { type: "eyebrow", text: "Ended early" },
              { type: "heading", text: "Session ended early", size: "lg" },
              {
                type: "sub",
                text: "Session 2 stopped at 6 of 14 minutes. Thanks for listening as long as you could.",
              },
              {
                type: "alert",
                title: "Partial credit note",
                text: "A partial listen is stored for programme analytics. It does not count toward your streak or this week's 4-session target.",
              },
              {
                type: "stats",
                cols: 3,
                items: [
                  { label: "This week", value: "2/4" },
                  { label: "Streak", value: "Unchanged" },
                  { label: "Logged", value: "6 min" },
                ],
              },
              {
                type: "list",
                items: [
                  "Session 2 stays available to restart when you're ready",
                  "Full completion is still needed for week progress",
                  "Your place on Home returns to Up next: Session 2",
                ],
              },
              {
                type: "note",
                text: "Partner reporting can see partial listens in aggregate without treating them as completions.",
              },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "Should a partial session ever count toward programme completion - for example past a 50% threshold - or is any early exit always excluded?",
      },
    ],
  },

  // ───────────────────────────── 23 - Session Completion ─────────────────────────────
  {
    id: "23-session-completion",
    number: "23",
    label: "23",
    navLabel: "Completion",
    title: "Session Completion",
    description:
      "Natural finish: celebrate Session 2 with duration, streak, and week progress, then optional reflection, then a calm personalised sign-off back to Home.",
    narrative: "Natural finish: celebrate completion, optional reflection, then a calm sign-off.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "23.01",
          title: "Session Complete",
          purpose:
            "Confirm Session 2 finished successfully and show the immediate rewards - duration, streak bump, and week progress - before Continue moves into optional reflection.",
          frame: "mobile",
          primary: "Continue",
          layout: "mobile-shell",
          data: {
            blocks: [
              { type: "eyebrow", text: "Session complete" },
              { type: "heading", text: "Session 2 complete", size: "xl" },
              { type: "badge", text: "Streak +1" },
              {
                type: "sub",
                text: "Nice work - full listen recorded for Post-Training Recovery.",
              },
              {
                type: "stats",
                cols: 3,
                items: [
                  { label: "Duration", value: "14 min" },
                  { label: "Streak", value: "6 days" },
                  { label: "This week", value: "3/4" },
                ],
              },
              {
                type: "weekStrip",
                label: "Week progress",
                days: [
                  { label: "M", on: true },
                  { label: "T", on: true },
                  { label: "W", on: true },
                  { label: "T", on: false },
                  { label: "F", on: false },
                  { label: "S", on: false },
                  { label: "S", on: false },
                ],
              },
              {
                type: "kv",
                items: [
                  ["Session", "Session 2"],
                  ["Programme", "Post-Training Recovery"],
                  ["Partner", "Preston North End"],
                ],
              },
              {
                type: "note",
                text: "Continue opens a short optional reflection, then a done-for-now sign-off.",
              },
            ],
          },
        },
      },
      { kind: "arrow", label: "optional" },
      {
        kind: "screen",
        screen: {
          id: "23.02",
          title: "Optional Reflection",
          purpose:
            "Capture a lightweight before/after settledness signal on a shared 1–5 range slider, with an optional note - only when reflection is enabled for the programme.",
          frame: "mobile",
          primary: "Continue",
          secondary: ["Skip"],
          layout: "mobile-shell",
          data: {
            blocks: [
              { type: "eyebrow", text: "Optional reflection" },
              { type: "heading", text: "How do you feel now?", size: "lg" },
              {
                type: "note",
                text: "Choose what feels closest. There’s no right answer. This simply helps you notice how you feel after listening.",
              },
              {
                type: "note",
                text: "1–5 range slider · Unsettled → Very settled (Neutral at 3)",
              },
              {
                type: "field",
                label: "Anything you’d like to note?",
                placeholder: "Optional",
              },
              {
                type: "sub",
                text: "Skip anytime - reflection never blocks progress or streak.",
              },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "Only show this step if reflection is enabled for the programme - should that be a per-programme or per-partner setting?",
      },
      { kind: "arrow", label: "after finish" },
      {
        kind: "screen",
        screen: {
          id: "23.03",
          title: "You're Done for Now",
          purpose:
            "Close the listening beat with a personalised hero sign-off - Session 2 complete, a hint at the next session, and a clear Back to Home path.",
          frame: "mobile",
          primary: "Back to Home",
          layout: "mobile-shell",
          data: {
            blocks: [
              {
                type: "hero",
                mark: true,
                markSrc: SONOCEA_MARK,
                eyebrow: "Post-Training Recovery",
                title: "You're done for now, Ben",
                body: "Session 2 is complete. See you next session.",
              },
              {
                type: "preview",
                title: "Session 2",
                sub: "Complete · 14 min · Today",
                body: "Logged to your week · Streak 6 days · Week progress 3/4",
                atmosphere: true,
              },
              {
                type: "sectionLabel",
                text: "Up next",
              },
              {
                type: "cards",
                items: [
                  {
                    title: "Session 3",
                    meta: "18 min · Saturday · Week 2",
                    body: "Suggested after your next training block - or whenever you have a quiet window.",
                  },
                ],
              },
              {
                type: "note",
                text: "Back to Home returns you to the weekly pulse with Session 2 marked done.",
              },
            ],
          },
        },
      },
    ],
  },

  // ───────────────────────────── 24 - Progress ─────────────────────────────
  {
    id: "24-progress",
    number: "24",
    label: "24",
    navLabel: "Progress",
    title: "Progress",
    description:
      "The participant's own view of engagement - week chart, programme completion, listening time, and recent sessions - plus an early empty state before the first listen.",
    narrative: "Progress shows week chart, programme %, listening time, and recent sessions.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "24.01",
          title: "Progress",
          purpose:
            "Give Ben a clear picture of weekly listening, overall programme completion, and recent sessions so progress feels earned and actionable - not just a vanity streak.",
          frame: "mobile",
          layout: "mobile-shell",
          data: {
            bottomNav: APP_BOTTOM_NAV,
            activeTab: "progress",
            blocks: [
              { type: "heading", text: "Your progress", size: "lg" },
              {
                type: "chart",
                bars: [35, 70, 45, 85, 55, 90, 30],
                labels: ["M", "T", "W", "T", "F", "S", "S"],
                active: 5,
                caption: "Minutes listened this week",
                summary: "2 sessions",
                label: "This week",
              },
              {
                type: "stats",
                cols: 3,
                items: [
                  { label: "This week", value: "2/4" },
                  { label: "Programme", value: "38%" },
                  { label: "Listening time", value: "1h 42m" },
                ],
              },
              {
                type: "note",
                text: "Current streak: 5 days · Programme % = completed sessions ÷ sessions in the structured plan.",
              },
              {
                type: "weekStrip",
                label: "Listening days",
                days: [
                  { label: "M", on: true },
                  { label: "T", on: true },
                  { label: "W", on: false },
                  { label: "T", on: false },
                  { label: "F", on: false },
                  { label: "S", on: true },
                  { label: "S", on: false },
                ],
              },
              { type: "sectionLabel", text: "Recent sessions" },
              {
                type: "rows",
                items: [
                  { left: "Session 2", right: "Today · 14 min", sub: "Completed · Down Regulation" },
                  { left: "Session 1", right: "Mon · 12 min", sub: "Completed · Down Regulation" },
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "24.02",
          title: "Progress - Early",
          purpose:
            "Show the empty/early progress state before any sessions are complete, so first-time participants understand what will fill in after Session 1.",
          frame: "mobile",
          layout: "mobile-shell",
          data: {
            bottomNav: APP_BOTTOM_NAV,
            activeTab: "progress",
            blocks: [
              { type: "heading", text: "Your progress", size: "lg" },
              {
                type: "sub",
                text: "Nothing logged yet - finish your first session to start the week chart and programme %.",
              },
              {
                type: "chart",
                bars: [0, 0, 0, 0, 0, 0, 0],
                labels: ["M", "T", "W", "T", "F", "S", "S"],
                active: 0,
                caption: "Minutes listened this week",
                summary: "0 sessions",
                label: "This week",
              },
              {
                type: "stats",
                cols: 3,
                items: [
                  { label: "This week", value: "0/4" },
                  { label: "Programme", value: "0%" },
                  { label: "Listening time", value: "0m" },
                ],
              },
              {
                type: "sectionLabel",
                text: "Get started",
              },
              {
                type: "cards",
                items: [
                  {
                    title: "Session 1",
                    meta: "12 min · Ready on Home",
                    body: "Your first completed listen unlocks the week chart and streak.",
                    action: "Start",
                  },
                ],
              },
              {
                type: "note",
                text: "Programme % only moves when a session is fully completed - partial listens stay off this view.",
              },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "Does 'listening time' count active foreground playback only, or does it include time the session played in the background / on lock screen?",
      },
      {
        kind: "annotation",
        text: "Programme % = completed sessions ÷ sessions in the structured plan (not calendar weeks). Confirm that definition is shown in-product for partners and participants.",
      },
    ],
  },

  // ───────────────────────────── 25 - Multiple Programmes ─────────────────────────────
  {
    id: "25-multiple-programmes",
    number: "25",
    label: "25",
    navLabel: "Multiple Programmes",
    title: "Multiple Programmes",
    description: "How the app behaves once a participant belongs to more than one programme.",
    narrative: "Switch between multiple active programmes without losing context.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "25.01",
          title: "Your Programmes",
          purpose: "List every programme the participant currently belongs to.",
          frame: "mobile",
          layout: "mobile-shell",
          data: {
            bottomNav: APP_BOTTOM_NAV,
            activeTab: "profile",
            blocks: [
              { type: "heading", text: "Your programmes", size: "lg" },
              {
                type: "sub",
                text: "Both programmes are live under Preston North End - switch anytime without losing progress.",
              },
              {
                type: "rows",
                items: [
                  {
                    left: "Post-Training Recovery",
                    right: "Week 2 · 3/4",
                    badge: "Active",
                    sub: "Preston North End · Structured",
                    logoSrc: PARTNERS.pne.logoSrc,
                    logoLabel: "PNE",
                  },
                  {
                    left: "Pre-Season Focus",
                    right: "Week 1 · 1/3",
                    badge: "Active",
                    sub: "Preston North End · Named",
                    logoSrc: PARTNERS.pne.logoSrc,
                    logoLabel: "PNE",
                  },
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow" },
      {
        kind: "screen",
        screen: {
          id: "25.02",
          title: "Home With Programme Switcher",
          purpose: "Switch between active programmes directly from Home.",
          frame: "mobile",
          layout: "mobile-shell",
          data: {
            bottomNav: APP_BOTTOM_NAV,
            activeTab: "home",
            blocks: [
              { type: "chips", items: ["Post-Training Recovery", "Pre-Season Focus"], active: "Post-Training Recovery" },
              { type: "heading", text: "Good afternoon, Ben" },
              {
                type: "weekStrip",
                label: "This week",
                days: [
                  { label: "M", on: true },
                  { label: "T", on: true },
                  { label: "W", on: true },
                  { label: "T", on: false },
                  { label: "F", on: false },
                  { label: "S", on: false },
                  { label: "S", on: false },
                ],
              },
              { type: "cards", items: [{ title: "Up next: Session 2", meta: "14 min · Ready when you are" }] },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "When a participant has multiple active programmes, which one should Home default to - most recently active, or the one with an incomplete session?",
      },
    ],
  },

  // ───────────────────────────── 26 - Profile ─────────────────────────────
  {
    id: "26-profile",
    number: "26",
    label: "26",
    navLabel: "Profile",
    title: "Profile",
    description: "Account-level settings, shown differently depending on what identity data is actually held.",
    narrative: "Profile adapts to named vs anonymous identity data held.",
    items: [
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "Named Participant" },
          {
            kind: "screen",
            screen: {
              id: "26.01",
              title: "Profile (Named)",
              purpose: "Full account profile for a named participant.",
              frame: "mobile",
              layout: "mobile-shell",
              data: {
                bottomNav: APP_BOTTOM_NAV,
                activeTab: "profile",
                blocks: [
                  { type: "heading", text: "Profile", size: "lg" },
                  {
                    type: "lockup",
                    partnerSrc: PARTNERS.pne.logoSrc,
                    partnerLabel: "PNE",
                    brandSrc: SONOCEA_MARK,
                  },
                  {
                    type: "kv",
                    items: [
                      ["Name", "Ben Whiteman"],
                      ["Email", "b.whiteman@pne.co.uk"],
                      ["Organisation", "Preston North End"],
                      ["Programme", "Post-Training Recovery"],
                    ],
                  },
                  { type: "sectionLabel", text: "Settings" },
                  { type: "list", items: ["Notification preferences", "Data & privacy", "Sign out"] },
                ],
              },
            },
          },
        ],
      },
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "Anonymous Participant" },
          {
            kind: "screen",
            screen: {
              id: "26.01B",
              title: "Profile (Anonymous)",
              purpose: "A profile with no personal account fields at all.",
              frame: "mobile",
              layout: "mobile-shell",
              data: {
                bottomNav: APP_BOTTOM_NAV,
                activeTab: "profile",
                blocks: [
                  { type: "heading", text: "Profile", size: "lg" },
                  { type: "badge", text: "Private ID" },
                  {
                    type: "kv",
                    items: [
                      ["Participant ID", "PNE-PTR-014"],
                      ["Programme", "Post-Training Recovery"],
                      ["Organisation", "Preston North End"],
                    ],
                  },
                  {
                    type: "note",
                    text: "No name or email is stored for this seat. Keep your ID safe - it's how you return on a new device.",
                  },
                  { type: "list", items: ["Privacy", "Help"] },
                ],
              },
            },
          },
        ],
      },
      {
        kind: "annotation",
        text: "With no name or email on file, how does an anonymous participant get help if they lose their device - is the Participant ID enough on its own?",
      },
    ],
  },

  // ───────────────────────────── DIVIDER - Admin / Organisation Reporting ─────────────────────────────
  {
    id: "divider-admin-reporting",
    number: "",
    label: "",
    navLabel: "Admin Reporting",
    title: "Admin / Organisation Reporting",
    description: "",
    divider: true,
    dividerTitle: "ADMIN / ORGANISATION REPORTING",
    dividerSubtitle:
      "PROGRAMME OVERVIEW → PARTICIPANTS → INSIGHTS → BILLING & USAGE EXPORT → EDGE STATES",
    narrative: "The story flips back to organisation views - programmes, participants, and exports.",
    items: [],
  },

  // ───────────────────────────── 27 - Programme Overview ─────────────────────────────
  {
    id: "27-programme-overview",
    number: "27",
    label: "27",
    navLabel: "Programme Overview",
    title: "Programme Overview",
    description: "The partner's admin view of a single programme's performance.",
    narrative: "Partner staff see top-line performance for a single programme.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "27.01",
          title: "Post-Training Recovery - Overview",
          purpose: "Top-line performance for a single programme.",
          frame: "desktop",
          layout: "partner",
          data: {
            logo: "PNE",
            logoSrc: PARTNERS.pne.logoSrc,
            org: "Preston North End",
            subtitle: "Post-Training Recovery",
            status: "Active",
            tabs: PARTNER_TABS,
            activeTab: "Overview",
            blocks: [
              {
                type: "stats",
                cols: 4,
                items: [
                  { label: "Enrolled", value: "48" },
                  { label: "Weekly active", value: "36" },
                  { label: "Completion rate", value: "78%" },
                  { label: "Avg sessions / week", value: "3.1" },
                ],
              },
              { type: "chart" },
            ],
          },
        },
      },
    ],
  },

  // ───────────────────────────── 28 - Participants ─────────────────────────────
  {
    id: "28-admin-participants",
    number: "28",
    label: "28",
    navLabel: "Participants",
    title: "Participants",
    description: "The participant list, shown differently depending on the programme's identity model.",
    narrative: "Participant tables adapt to Named vs Private ID programmes.",
    items: [
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "Named Programme" },
          {
            kind: "screen",
            screen: {
              id: "28.01A",
              title: "Named Programme Table",
              purpose: "Full participant detail for a Named programme.",
              frame: "desktop",
              layout: "partner",
              data: {
                logo: "PNE",
                logoSrc: PARTNERS.pne.logoSrc,
                org: "Preston North End",
                subtitle: "Pre-Season Focus",
                tabs: PARTNER_TABS,
                activeTab: "Participants",
                blocks: [
                  {
                    type: "table",
                    columns: ["Participant", "Email", "Sessions completed", "Last active", "Status"],
                    rows: [
                      ["Ben Whiteman", "b.whiteman@pne.co.uk", "14", "Today", "Active"],
                      ["Josh Earl", "j.earl@pne.co.uk", "9", "Yesterday", "Active"],
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
      {
        kind: "stack",
        items: [
          { kind: "branch", label: "Anonymous Programme" },
          {
            kind: "screen",
            screen: {
              id: "28.01B",
              title: "Anonymous Programme Table",
              purpose: "ID-only participant detail for a Private ID programme - no personal data.",
              frame: "desktop",
              layout: "partner",
              data: {
                logo: "PNE",
                logoSrc: PARTNERS.pne.logoSrc,
                org: "Preston North End",
                subtitle: "Post-Training Recovery",
                tabs: PARTNER_TABS,
                activeTab: "Participants",
                blocks: [
                  {
                    type: "table",
                    columns: ["Participant ID", "Sessions completed", "Last active", "Status"],
                    rows: [
                      ["PNE-PTR-001", "14", "Today", "Active"],
                      ["PNE-PTR-002", "9", "Yesterday", "Active"],
                      ["PNE-PTR-003", "0", "Never", "Unclaimed"],
                    ],
                  },
                  { type: "note", text: "No personally identifiable information is stored for this programme." },
                ],
              },
            },
          },
        ],
      },
      {
        kind: "annotation",
        text: "Even with IDs only, could session timing plus roster size make an individual re-identifiable to partner staff - do we need k-anonymity thresholds before showing a row?",
      },
    ],
  },

  // ───────────────────────────── 29 - Programme Insights ─────────────────────────────
  {
    id: "29-programme-insights",
    number: "29",
    label: "29",
    navLabel: "Programme Insights",
    title: "Programme Insights",
    description: "Deeper analytics on how a single programme is performing.",
    narrative: "Deeper completion, popularity, and drop-off analytics for one programme.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "29.01",
          title: "Insights",
          purpose: "Understand completion, popularity, and drop-off for the programme.",
          frame: "desktop",
          layout: "partner",
          data: {
            logo: "PNE",
            logoSrc: PARTNERS.pne.logoSrc,
            org: "Preston North End",
            subtitle: "Post-Training Recovery",
            tabs: PARTNER_TABS,
            activeTab: "Insights",
            blocks: [
              { type: "chart" },
              {
                type: "stats",
                cols: 3,
                items: [
                  { label: "Avg completion", value: "78%" },
                  { label: "Most popular", value: "Session 1" },
                  { label: "Drop-off point", value: "Week 3" },
                ],
              },
            ],
          },
        },
      },
    ],
  },

  // ───────────────────────────── 30 - Organisation Insights ─────────────────────────────
  {
    id: "30-organisation-insights",
    number: "30",
    label: "30",
    navLabel: "Org Insights",
    title: "Organisation Insights",
    description: "Preston North End's view across all of their programmes, not just one.",
    narrative: "Compare engagement across every programme the partner runs.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "30.01",
          title: "Preston North End - All Programmes",
          purpose: "Compare engagement across every programme the partner runs.",
          frame: "desktop",
          layout: "partner",
          data: {
            logo: "PNE",
            logoSrc: PARTNERS.pne.logoSrc,
            org: "Preston North End",
            subtitle: "All Programmes",
            tabs: PARTNER_TABS,
            activeTab: "Insights",
            blocks: [
              {
                type: "table",
                columns: ["Programme", "Identity model", "Participants", "Engagement"],
                rows: [
                  ["Post-Training Recovery", "Private IDs", "48", "78%"],
                  ["Pre-Season Focus", "Named", "22", "65%"],
                ],
              },
            ],
          },
        },
      },
    ],
  },

  // ───────────────────────────── 31 - Sonocea Internal Insights ─────────────────────────────
  {
    id: "31-internal-insights",
    number: "31",
    label: "31",
    navLabel: "Internal Insights",
    title: "Sonocea Internal Insights",
    description: "Sonocea's own aggregate view of platform usage, by sector, across every partner.",
    narrative: "Sonocea's internal sector-level view across all partners.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "31.01",
          title: "Platform Insights",
          purpose: "Aggregate platform usage by sector, across all partners.",
          frame: "desktop",
          layout: "admin",
          data: {
            nav: ADMIN_NAV,
            active: "Insights",
            title: "Platform Insights",
            blocks: [
              {
                type: "table",
                columns: ["Sector", "Partners", "Participants", "Avg engagement"],
                rows: [
                  ["Healthcare", "4", "860", "71%"],
                  ["Performance", "5", "690", "78%"],
                  ["Research", "2", "140", "64%"],
                  ["Enterprise", "1", "94", "58%"],
                  ["Public", "0", "0", "-"],
                ],
              },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "What minimum cohort size should Sonocea enforce before showing sector-level breakdowns, so a single small partner is never singled out?",
      },
    ],
  },

  // ───────────────────────────── 32 - Billing & Usage Export ─────────────────────────────
  {
    id: "32-billing-export",
    number: "32",
    label: "32",
    navLabel: "Export",
    title: "Billing & Usage Export",
    description:
      "Admin export for billing and usage tracking - all listens or all Listeners, full history or a date range, across one or multiple organizations. Excel or delimited download.",
    narrative: "Admin export for billing and usage - listens or Listeners, scoped and downloadable.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "32.01",
          title: "Export - Entry",
          purpose: "Sarah opens Export from Admin to pull billing and usage data.",
          frame: "desktop",
          layout: "admin",
          primary: "Start export",
          data: {
            nav: ADMIN_NAV,
            active: "Settings",
            title: "Export",
            cta: "Start export",
            blocks: [
              {
                type: "sub",
                text: "Download listens or Listeners for billing and usage tracking. Scope by organization and date range.",
              },
              {
                type: "stats",
                cols: 4,
                items: [
                  { label: "Organizations", value: "12" },
                  { label: "Listeners", value: "1,284" },
                  { label: "Listens (30d)", value: "8,426" },
                  { label: "Last export", value: "3 days ago" },
                ],
              },
              {
                type: "options",
                items: [
                  {
                    title: "All listens",
                    body: "Session-level listening records for usage and billing reconciliation.",
                  },
                  {
                    title: "All Listeners",
                    body: "Roster export - identity, organization, invite status, and seat usage.",
                  },
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow", label: "Dataset" },
      {
        kind: "screen",
        screen: {
          id: "32.02",
          title: "Choose dataset",
          purpose: "Pick listens (usage) or Listeners (roster) before scoping the export.",
          frame: "desktop",
          layout: "admin",
          primary: "Continue",
          data: {
            nav: ADMIN_NAV,
            active: "Settings",
            title: "What do you need to export?",
            cta: "Continue",
            blocks: [
              { type: "stepper", steps: EXPORT_STEPS, current: 1 },
              {
                type: "options",
                items: [
                  {
                    title: "All listens",
                    body: "Every listen event - session, Listener, organization, progress, timestamp.",
                    selected: true,
                  },
                  {
                    title: "All Listeners",
                    body: "Every Listener record - for seat audits and provisioning checks.",
                  },
                ],
              },
              {
                type: "note",
                text: "Listener roster exports are always full history. Date range applies to listens only.",
              },
            ],
          },
        },
      },
      { kind: "arrow", label: "Date range" },
      {
        kind: "screen",
        screen: {
          id: "32.03",
          title: "Date range",
          purpose: "All history, or a billing window - day / week / month / custom.",
          frame: "desktop",
          layout: "admin",
          primary: "Continue",
          data: {
            nav: ADMIN_NAV,
            active: "Settings",
            title: "Date range",
            cta: "Continue",
            blocks: [
              { type: "stepper", steps: EXPORT_STEPS, current: 2 },
              {
                type: "sub",
                text: "Dataset: All listens",
              },
              {
                type: "chips",
                items: ["All history", "Last 7 days", "Last 30 days", "Custom range"],
                active: "Custom range",
              },
              {
                type: "fields",
                items: [
                  { label: "From", value: "2026-06-01" },
                  { label: "To", value: "2026-06-30" },
                ],
              },
              {
                type: "stats",
                cols: 2,
                items: [
                  { label: "Matching listens", value: "2,418" },
                  { label: "Organizations in range", value: "8" },
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow", label: "Orgs" },
      {
        kind: "screen",
        screen: {
          id: "32.04",
          title: "Select organizations",
          purpose: "One organization or many - required for multi-account billing runs.",
          frame: "desktop",
          layout: "admin",
          primary: "Continue",
          secondary: ["Select all"],
          data: {
            nav: ADMIN_NAV,
            active: "Settings",
            title: "Organizations",
            cta: "Continue",
            blocks: [
              { type: "stepper", steps: EXPORT_STEPS, current: 3 },
              {
                type: "sub",
                text: "Include one or multiple organizations in this export.",
              },
              {
                type: "checks",
                checked: [
                  "Preston North End - 842 listens",
                  "Haven Care Network - 610 listens",
                  "Summit Performance Lab - 386 listens",
                ],
                items: [
                  "Preston North End - 842 listens",
                  "Haven Care Network - 610 listens",
                  "Summit Performance Lab - 386 listens",
                  "University Hospital - 412 listens",
                  "Jason Bruges Studio - 168 listens",
                ],
              },
              {
                type: "note",
                text: "3 of 12 organizations selected · 1,838 listens in scope",
              },
            ],
          },
        },
      },
      { kind: "arrow", label: "Format" },
      {
        kind: "screen",
        screen: {
          id: "32.05",
          title: "Choose format",
          purpose: "Excel for finance workflows, or delimited CSV / TSV for any import.",
          frame: "desktop",
          layout: "admin",
          primary: "Continue",
          data: {
            nav: ADMIN_NAV,
            active: "Settings",
            title: "File format",
            cta: "Continue",
            blocks: [
              { type: "stepper", steps: EXPORT_STEPS, current: 4 },
              {
                type: "options",
                items: [
                  {
                    title: "Excel (.xlsx)",
                    body: "Open directly in Excel / Google Sheets. Best for Sarah’s billing packs.",
                    selected: true,
                  },
                  {
                    title: "CSV (comma-delimited)",
                    body: "Universal delimited format - Excel-friendly and import-ready.",
                  },
                  {
                    title: "TSV (tab-delimited)",
                    body: "Tab-separated for tools that prefer non-comma delimiters.",
                  },
                ],
              },
            ],
          },
        },
      },
      { kind: "arrow", label: "Download" },
      {
        kind: "screen",
        screen: {
          id: "32.06",
          title: "Review & download",
          purpose: "Confirm scope, then download the file for billing and usage tracking.",
          frame: "desktop",
          layout: "admin",
          primary: "Download export",
          secondary: ["Back and edit"],
          data: {
            nav: ADMIN_NAV,
            active: "Settings",
            title: "Review export",
            cta: "Download export",
            blocks: [
              { type: "stepper", steps: EXPORT_STEPS, current: 5 },
              {
                type: "kv",
                items: [
                  ["Dataset", "All listens"],
                  ["Date range", "1 Jun 2026 – 30 Jun 2026"],
                  ["Organizations", "3 selected"],
                  ["Format", "Excel (.xlsx)"],
                  ["Rows", "1,838"],
                ],
              },
              {
                type: "table",
                columns: ["Organization", "Listens", "Listeners", "Minutes"],
                rows: [
                  ["Preston North End", "842", "34", "12,410"],
                  ["Haven Care Network", "610", "91", "9,020"],
                  ["Summit Performance Lab", "386", "18", "5,640"],
                ],
              },
              {
                type: "note",
                text: "File name: sonocea-listens-2026-06.xlsx",
              },
              { type: "link", label: "Back and edit" },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "Should organization admins be able to export their own account only, or is multi-org export strictly a Sonocea Admin (Sarah) capability?",
      },
      {
        kind: "annotation",
        text: "For Private ID programmes, should Listener exports omit personal fields entirely and only include participant IDs?",
      },
    ],
  },

  // ───────────────────────────── 33 - System / Programme States ─────────────────────────────
  {
    id: "33-system-states",
    number: "33",
    label: "33",
    navLabel: "System States",
    title: "System / Programme States",
    description: "Cross-cutting states that need a design treatment wherever they occur in the product.",
    narrative: "Catalogue the cross-cutting system states every surface must handle.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "33.01",
          title: "System & Programme States Matrix",
          purpose: "Catalogue every shared state used throughout the product.",
          frame: "desktop",
          layout: "matrix",
          data: {
            items: [
              { title: "Programme Not Started", body: "Programme has a future start date.", action: "Show a countdown to the start date" },
              { title: "Paused", body: "The partner has paused the programme.", action: "Show a paused banner; disable new sessions" },
              { title: "Ended", body: "The programme's end date has passed.", action: "Move to a read-only archive view" },
              { title: "No Network", body: "The device has no connection.", action: "Fall back to any cached session" },
              { title: "Content Unavailable", body: "Session audio failed to load.", action: "Retry, or offer an alternative session" },
              { title: "User Logged Out", body: "The session has expired or the user signed out.", action: "Return to Welcome / Sign in" },
              { title: "Invited - Already Enrolled", body: "Invitation link opened by an already-enrolled participant.", action: "Skip straight to Home" },
              { title: "Invited - Has App, Logged In", body: "The user already has Sonocea installed and is signed in.", action: "Deep link straight into the programme, skipping onboarding" },
              { title: "Desktop Invitation Opened", body: "The invitation link was opened on a desktop browser.", action: "Show 'Continue on your phone' with a QR handoff" },
            ],
          },
        },
      },
      {
        kind: "annotation",
        text: "Which of these states should block the product entirely (e.g. Ended, No Network) versus degrade gracefully in the background (e.g. Content Unavailable)?",
      },
    ],
  },

  // ───────────────────────────── 34 - Golden Route Journeys ─────────────────────────────
  {
    id: "34-golden-routes",
    number: "34",
    label: "34",
    navLabel: "Golden Routes",
    title: "Golden Route Journeys",
    description: "Four end-to-end journeys that any review of this board should be able to trace start to finish.",
    narrative: "Four golden routes reviewers can trace end-to-end.",
    items: [
      {
        kind: "screen",
        screen: {
          id: "34.01A",
          title: "A · New Named User",
          purpose: "The fullest identity-verified journey, from Admin setup to Progress.",
          frame: "desktop",
          layout: "journey",
          data: {
            title: "A · New Named User",
            steps: [
              "Admin creates programme",
              "Partner invites by email",
              "Create account",
              "Verify identity",
              "Onboarding",
              "Home",
              "Listen",
              "Progress",
            ],
          },
        },
      },
      {
        kind: "screen",
        screen: {
          id: "34.01B",
          title: "B · Existing Sonocea User",
          purpose: "A returning user who already has an account and is added to a new programme.",
          frame: "desktop",
          layout: "journey",
          data: {
            title: "B · Existing Sonocea User",
            steps: ["Admin adds programme", "Sign in", "Programme found & added", "Home (programme switcher)", "Listen", "Progress"],
          },
        },
      },
      { kind: "break" },
      {
        kind: "screen",
        screen: {
          id: "34.01C",
          title: "C · Anonymous Clinical / Performance",
          purpose: "The Private ID journey used in clinical and performance settings.",
          frame: "desktop",
          layout: "journey",
          data: {
            title: "C · Anonymous Clinical / Performance",
            steps: [
              "Admin generates Private IDs",
              "SMS / physical card",
              "Enter Participant ID",
              "Recognised, no personal data",
              "Onboarding",
              "Listen",
              "Progress (aggregate only)",
            ],
          },
        },
      },
      {
        kind: "screen",
        screen: {
          id: "34.01D",
          title: "D · Open Public Experience",
          purpose: "The lowest-friction, no-account journey for open public programmes.",
          frame: "desktop",
          layout: "journey",
          data: {
            title: "D · Open Public Experience",
            steps: ["Admin publishes Open Access link", "QR code at venue", "Landing page", "Listen immediately", "No account, no progress tracking"],
          },
        },
      },
      {
        kind: "annotation",
        text: "Do these four golden routes cover every MVP scenario, or is there a fifth path - such as lapsed-participant re-engagement - we still need to design for?",
      },
    ],
  },
];

export function e2eSectionAnchor(id) {
  return `e2e-${id}`;
}

export const E2E_NAV_SECTIONS = E2E_SECTIONS.filter((s) => !s.divider).map((s) => ({
  id: e2eSectionAnchor(s.id),
  label: s.navLabel || s.label,
  title: s.title,
  number: s.number,
}));
