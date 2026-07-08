# Sonocea Mobile App — Product Overview (v1.0)

This document summarizes what the **Sonocea® Mobile App v1.0** is intended to be, based on the internal Product Requirements Document (*Sonocea Mobile App — Version 1.0*, draft for internal review, last updated November 12, 2025). It is a working draft for alignment across product, design, engineering, and GTM—not a substitute for the full PRD, legal review, or clinical claims.

**Design collaboration:** Screen and system explorations for this phase are being developed in **Paper**, in the **Sonocea Design Phase 2** document (current working canvas). Keep this markdown aligned when IA, naming, or scope decisions change in that file.

---

## What Sonocea Is

**Vision:** Unleash the scientific power of sound to transform lives for the better.

**Mission:** Power sonic experiences that unlock the potential of sound to enhance and improve lives worldwide—the **Sonic Revolution**.

**Product proposition:** Sonocea delivers patented **sonic augmentation**—content experienced in the product as structured audio **Sessions** built on **Sonocea Sonic Augmentation Technology™ (SAT™)**. The PRD cites research (including University of Florida Medical School findings) describing short-session outcomes such as support for autonomic and emotional regulation; specific claims belong in regulated/compliance-reviewed materials, not in this overview.

---

## What the Mobile App Is (v1)

The v1 mobile app is a **premium, invite-only listening experience** for people granted access by **Sonocea** or an authorized **Partner**. It is **not** open consumer signup from the app stores in v1.

End users (**Listeners**) use the app to:

- Accept a **unique invite** or **Partner-mediated access**
- Complete **onboarding** (including education about Sonocea and how to listen effectively)
- Complete a **neurotype questionnaire** so the library can align recommendations with their profile
- Browse a **library of Sessions** provisioned to them (never the full public catalog—only what Admin → Partner → Listener entitlements allow)
- **Stream** Sessions securely and, where permitted, **download encrypted copies** for offline listening
- Use an **on-brand player** with controls, progress, repeat modes, and visual treatments aligned to Sonocea brand (including “sound blends” style motion where specified)
- Access **About**, **Support**, and **Feedback** flows, with policies linked in-app

A **general-public marketing surface** may exist with logo, video, and explanation of the technology, but **no Session playback** for unauthenticated visitors—only CTAs (e.g., speak with a clinician, mailing list, partner integrations—exact CTAs were marked work-in-progress in the PRD).

---

## Who Uses What

The platform is built around three roles:

| Role | Who they are | What they need from v1 |
|------|----------------|-------------------------|
| **Admin** (Sonocea) | Internal operators | Upload and manage Sessions and metadata; configure **Partners**, bundles, invites, and billing/rate cards; revoke access; view analytics and exports for operations and billing. |
| **Partner** | Authorized organizations (clinics, programs, etc.), sometimes including Sonocea acting as Partner | **Provision Listeners** (e.g., email/SMS), assign **bundles** of Sessions, see Partner-scoped usage, export **billing CSVs**, revoke/resend within scope. |
| **Listener** | End user who listens | Redeem access, onboard, discover and play **only** provisioned Sessions, optionally offline, with confidence that content stays in-app and support is available. |

**Sessions** are the proprietary audio tracks Listeners play. **Bundles** group Sessions for assignment to Partners or Listeners. **Groups** (e.g., by neurotype tags) organize discovery; **regimens** (multi-day protocols) are planned but **out of scope for v1**.

---

## Why This Architecture Exists

v1 prioritizes **controlled distribution**, **IP protection**, and **measurable usage** for pilots, investors, and commercial partners:

- Access is **invited and provisioned**, not marketplace-open.
- Streaming and offline files are designed so **content does not leave the app ecosystem** as shareable files.
- **Analytics and Partner-level billing exports** support seat pools, per-seat, and usage-based models with configurable rate cards.

---

## Core Mobile UX (PRD Screen List — Evolving)

The PRD lists primary mobile areas (exact IA may change with design):

1. Splash / brand intro  
2. Sign-up & login (invite or Partner code flow—final mechanics flagged as open questions)  
3. Onboarding & science education  
4. Neurotype questionnaire  
5. Sessions library  
6. Favorites  
7. Session overview / detail  
8. Player  
9. About Sonocea  
10. Feedback  
11. Support  

Partner-facing surfaces are separate (minimal **Partner Console** plus branded web flows); Admin uses a **CMS** and **analytics dashboard** on the web.

---

## In Scope vs Out of Scope (v1 Highlights)

**In scope (mobile + platform):** iOS and Android apps; secure streaming; encrypted offline playback where allowed; neurotype-aligned onboarding; provisioned library; feedback prompts with caps and skip; REST API, Admin CMS, analytics and CSV exports; Partner provisioning MVP; billing models (site license seat pool, per-seat, usage-based) with exports.

**Explicitly out of scope for v1 (may land later):** direct-to-consumer open signup; household sub-profiles; gamification and multi-week **regimens**; white-label integrations; recommendation engine; health platform/wearables integrations; rich Partner-only features such as Listener groups, custom protocols surfaced in-app, monthly auto-reports, multiple Partner *types*, and Session grouping beyond neurotype-centric models.

---

## Non-Negotiables for v1

Summarized from functional and non-functional requirements:

- **Security & IP:** TLS; short-lived signed URLs; encrypted offline storage with device binding and license checks; jailbreak/root handling; rapid revoke for users, Partners, and assets; minimize OS-level recording exposure where feasible.  
- **Playback:** Fast start on good networks (~1s target); ~192 kbps target; background playback where policy allows; respect focus/DND-style interruptions.  
- **Privacy:** Policies linked in-app; data minimization (avoid medical records); regional posture (US/UK/EU called out); retention/deletion pathways to be documented.  
- **Accessibility:** VoiceOver/TalkBack; scalable type; contrast.  
- **Reliability:** High API uptime target; graceful offline for permitted downloads; crash reporting.

---

## Clinical & Real-World Context (Design Lens)

Appendix E frames Sessions as used across varied environments—from therapy offices to hospitals, neurodivergent education, palliative care, and postpartum. Implications called out in the PRD include **minimal steps to press play**, **offline and poor-network behavior**, optional **facilitator-controlled** use (phone as a shared clinical tool), and **metadata-rich** Session profiles (duration, audience, setting, benefits) so non-technical caregivers can choose appropriately. These inform UX priorities even when a given release does not implement every workflow.

Seven **use-case families** called out in Appendix E (Regulation Companion, Inner Balance / therapist self-care, Pre-Procedure & Treatment Suites, Therapist Resource Platform, Neurodivergent Series, Comfort & Transition, Postpartum Bond & Regulation) share one platform but imply different **primary users** (who provisions or presses play) and **end users** (who listens). Design should stay flexible for **listener-held** vs **facilitator-controlled** playback.

---

## Provisioning Model (Admin → Partner → Listener)

- **Chain:** Sonocea Admin configures **Partners** and **content bundles**; Partners **provision Listeners** within limits; Listeners only see **Sessions their entitlements allow**.
- **Flex:** Sonocea may **act as a Partner** to provision Listeners directly when needed.
- **States** (people/content): invited, active, paused, removed; invitations can be **resent** or **revoked** within Admin or Partner scope.
- **Assignment:** Support individual Sessions, **groups** (e.g., neurotype), and Partner-level bundles down to Listener.

---

## Functional Snapshot (Beyond Mobile)

**CMS (Admin):** Upload Session audio; metadata (title, description, duration, neurotype, age, gender, use case, benefits, tags, thumbnail); **versioning** with replace-in-place and rollback; assignment matrix; dashboard for invites, acceptance, first-play latency, top Sessions, MAU/WAU, hours, Partner-linked usage; Partner creation, bundles, **billing plan + rate card**, Partner admins; CSV exports for usage and billing.

**Partner Console (MVP):** Provision Listeners (email/SMS); assign Sessions per Listener; usage by Listener and Session; billing exports matching plan type; revoke/resend within scope.

**Playback (requirements):** Play/pause, scrubber, elapsed/remaining, repeat one or continuous; brand-aligned visualizations; respect system focus/DND; secure streaming (encrypted URLs); offline files encrypted in sandbox with device binding and license checks.

**Feedback:** Post-session prompts (rating + optional comment); periodic app-experience prompts; frequency caps and skip; tie feedback to `partner_id` / `content_id` where relevant; visible in CMS or Admin-designated repository.

---

## Data & Analytics (v1 Intent)

**Themes:**

| Area | Examples |
|------|-----------|
| **Acquisition** | Invite vs acceptance by Partner; time invite → first login |
| **Engagement** | Acceptance → first complete listen; first → second session latency; frequency/duration over time; popularity/completion; coarse location (IP); time-of-day; listen counts by Listener/Partner and globally |
| **Retention & satisfaction** | Total listens and listening time (period + lifetime); trends; qualitative feedback |
| **Partner & billing** | Provisioning funnel; active Listeners per Partner; hours/completions; **billable units** per plan (active seat, active Listener, billable minute/hour); seat pool utilization and overage; tiered usage; exportable billing report by Partner and date range |

**Illustrative event names** (PRD examples—not final schema): `partner_created`, `partner_plan_updated`, `partner_bundle_assigned`, `rate_card_updated`, `invite_sent`, `invite_accepted`, `login`, `listener_provisioned`, `session_view`, `play_start`, `play_progress`, `play_complete`, `download_start`, `download_complete`, `download_play`, `seat_allocated`, `seat_released`, `usage_metered`, `feedback_prompt_shown`, `feedback_submitted_app`, `feedback_submitted_session`, `export_billing_csv`.

---

## Billing & Commercialization (Appendix A — Illustrative)

v1 targets **multiple models**: site license with a **seat pool**, **per-seat** pricing, and **usage-based** pricing with **configurable rate cards**. Numbers below are **examples from the PRD**, not commitments—finance/legal own final definitions.

**Example 1 — Site license (seat pool)**  
Plan type: `site_license` · USD · monthly · **100 included seats** · flat fee **$8,000** · overage **$100/seat** · mid-period activation proration rule (e.g., after day 15 at 50%) · effective dates from PRD example.

**Example 2 — Per seat**  
Plan type: `per_seat` · USD · monthly · tiered unit pricing (e.g., 1–199 / 200–499 / 500+ seats at different rates) · minimum commit (e.g., 50 active seats).

**Example 3 — Usage-based**  
Plan type: `usage` · USD · monthly · metric e.g. **hours listened** · tiered $/hour bands · monthly minimum (e.g., 2,000 in the example).

**CSV shape (high level):** Common headers such as `partner_id`, `partner_name`, `period_start`, `period_end`, `currency`, `plan_type`, `rate_card_version`. Plan-specific columns for seat license (included/used/peak/overage, fees), per-seat (active seats billed, tier, unit price), usage (metric, units, tier). Optional detail rows: listener id, masked email, content id, seconds listened, completed flag, device type, derived billable units.

**Reconciliation:** PRD acceptance criteria call for exported billing totals to match sampled raw events and seat snapshots within **~1% variance** per supported model.

---

## Essential Data Models (Names Only)

Listener; Partner (plan, rate card, seats, usage rules); Invite; Content (metadata, tags, file refs, state); Provisioning / ProvisioningEvent; UsageRecord; optional RateCard, BillingAccount, Invoice—see PRD Section 10 for fields.

---

## Technical Architecture (High Level)

- **Clients:** Native iOS/Android or cross-platform (open question).  
- **API:** REST—auth, entitlement, catalog, telemetry, signed URLs, Partner provisioning.  
- **Storage:** Object storage for audio + thumbnails; KMS for keys.  
- **DB:** Relational core for users, invites, Partners, entitlements, events, billing facts.  
- **CDN:** Edge delivery with tokenized URLs.  
- **Admin CMS:** Web app, RBAC for Admin vs Partner scopes.  
- **Analytics:** Event pipeline, lightweight dashboards, billing CSV exporter.

---

## Milestones, Testing, Risks (Compressed)

**Rough milestone sequence (PRD):** PRD sign-off → UX/design review → API scaffolding (Partner, billing, rate cards) → click-through prototype → CMS/dashboard (invites, upload, entitlements, Partners, plans) → iterative builds (auth, library, player, analytics; Partner Console MVP; pilot QA) → billing implementation → hardening (encrypted downloads, revoke, crash reporting) → pilot with Partners → post-pilot polish → store release.

**Draft test themes:** Manual QA matrices (devices, OS, network, offline); security (jailbreak/root, leak attempts, token expiry); analytics vs billing exports; accessibility (screen readers, large text).

**Risks (PRD):** Partner provisioning friction → simplify workflows and limits; content leakage → encryption, signed URLs, binding, revoke, monitoring; billing disputes → clear billable units and Partner-visible tallies; store policy → private/enterprise/beta tracks where applicable.

---

## Selected Acceptance Criteria (Cross-Cutting)

- **Auth:** Unique invites / Partner codes; resend/revoke with scoped visibility.  
- **Security:** Streams invalid outside URL validity; downloads encrypted and unusable outside app or after revoke.  
- **Playback:** Reliable start, progress, repeat; smooth branded visualizations on reference devices.  
- **Analytics:** Dashboard reflects invites, first-play latency, hours, top content, Partner-linked usage.  
- **Billing export:** Rows align to Partner plan (seats, usage, rates, totals).  
- **Feedback:** Caps and skip rules; analytics segmented by Partner/content where specified.  
- **Stability:** No blocker/critical issues on target devices for agreed pilot window.

---

## Planned Future Versions (PRD Roadmap — High Level)

| Version | Directionally planned |
|---------|------------------------|
| **v1.1** | Richer Admin analytics; Partner: Listener **groups**, **regiments**, richer analytics, bulk invites, “office” library license; Listener: **household sub-profiles**, notifications, favoriting |
| **v1.2** | Admin A/B testing, possible white-label; Partner monthly reports, custom instructions surfaced in app; Listener preference-aware Sessions, gamification/regimens |
| **v1.3** | Multiple Partner types; wearables |
| **v2.0** | D2C with IAP; differentiated Partner vs D2C pricing; AI-generated Sessions and recommendations; richer referrals |

Anything listed here is **not** v1 scope unless explicitly pulled in.

---

## Source & Maintenance

- **Primary source:** internal PRD *Sonocea Mobile App — Version 1.0* (draft).  
- **Design source of truth (visual/IA):** Paper file **Sonocea Design Phase 2**—reconcile naming and flows with this doc when they diverge.  
- **This file:** draft overview for the codebase/docs; update when the PRD, billing, or Paper explorations change.

---

## Open Items (from PRD)

Examples called out for developers/stakeholders: native vs cross-platform framework; exact provisioning mechanics (email/SMS/code); localization and regional requirements; accessibility depth; minimum OS/device matrix for v1.

When those decisions land, this document should be revised so it stays the single readable “what is this app” summary tied to the PRD.
