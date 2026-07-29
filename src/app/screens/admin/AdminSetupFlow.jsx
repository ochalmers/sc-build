import { useMemo, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  ADMIN_SETUP_STEPS,
  adminSetupPath,
} from "../../../content/flows.js";
import {
  DEMO_CREDENTIALS,
  DIRECT_ACCESS_PARTNER_ID,
  ORG_TYPE_OPTIONS,
  PNE_LOGO_SRC,
  PNE_ORGANIZATION,
  PROGRAMME_TEMPLATES,
  programmeTemplateById,
  sessionsForProgrammeTemplate,
  emptyListenerProfile,
  emptyOrganization,
  SONOCEA_DIRECT_ORGANIZATION,
} from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { useReviewSurface } from "../../context/SurfaceContext.jsx";
import { AdminDesktopFrame, ADMIN_DESKTOP } from "../../components/AdminDesktopFrame.jsx";
import { SystemLogoMark } from "../../../system/components/SystemLogoMark.jsx";

const fieldClass =
  "mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3.5 py-3 text-[16px] text-white outline-none focus:border-white/40";
const labelClass = "text-[14px] uppercase tracking-[0.12em] text-white/45";
const DAY_MS = 24 * 60 * 60 * 1000;

const SIDEBAR = [
  { id: "overview", label: "Overview" },
  { id: "organizations", label: "Organisations" },
  { id: "programmes", label: "Programmes" },
  { id: "participants", label: "Participants" },
  { id: "content", label: "Content" },
  { id: "insights", label: "Insights" },
  { id: "settings", label: "Settings" },
];

/** Demo first-team / academy roster (~30) for bulk invite walkthrough. */
const DEMO_ROSTER = [
  { name: "Ben Walker", email: "ben.walker@pne.club", phone: "+44 7700 900101" },
  { name: "Jamie Ortiz", email: "jamie.ortiz@pne.club", phone: "+44 7700 900102" },
  { name: "Noah Patel", email: "noah.patel@pne.club", phone: "+44 7700 900103" },
  { name: "Sam Okonkwo", email: "sam.okonkwo@pne.club", phone: "+44 7700 900104" },
  { name: "Leo Marsh", email: "leo.marsh@pne.club", phone: "+44 7700 900105" },
  { name: "Callum Reid", email: "callum.reid@pne.club", phone: "+44 7700 900106" },
  { name: "Theo Banks", email: "theo.banks@pne.club", phone: "+44 7700 900107" },
  { name: "Marcus Flynn", email: "marcus.flynn@pne.club", phone: "+44 7700 900108" },
  { name: "Owen Clarke", email: "owen.clarke@pne.club", phone: "+44 7700 900109" },
  { name: "Ryan Hughes", email: "ryan.hughes@pne.club", phone: "+44 7700 900110" },
  { name: "Finn Bradley", email: "finn.bradley@pne.club", phone: "+44 7700 900111" },
  { name: "Josh Nguyen", email: "josh.nguyen@pne.club", phone: "+44 7700 900112" },
  { name: "Harry Singh", email: "harry.singh@pne.club", phone: "+44 7700 900113" },
  { name: "Lucas Byrne", email: "lucas.byrne@pne.club", phone: "+44 7700 900114" },
  { name: "Ethan Cole", email: "ethan.cole@pne.club", phone: "+44 7700 900115" },
  { name: "Max Brennan", email: "max.brennan@pne.club", phone: "+44 7700 900116" },
  { name: "Daniel Price", email: "daniel.price@pne.club", phone: "+44 7700 900117" },
  { name: "Tom Alvarez", email: "tom.alvarez@pne.club", phone: "+44 7700 900118" },
  { name: "Will Carter", email: "will.carter@pne.club", phone: "+44 7700 900119" },
  { name: "Jack Doyle", email: "jack.doyle@pne.club", phone: "+44 7700 900120" },
  { name: "Adam Fraser", email: "adam.fraser@pne.club", phone: "+44 7700 900121" },
  { name: "Sean Murphy", email: "sean.murphy@pne.club", phone: "+44 7700 900122" },
  { name: "Kai Thompson", email: "kai.thompson@pne.club", phone: "+44 7700 900123" },
  { name: "Ollie Grant", email: "ollie.grant@pne.club", phone: "+44 7700 900124" },
  { name: "Reece Walsh", email: "reece.walsh@pne.club", phone: "+44 7700 900125" },
  { name: "Chris Vaughan", email: "chris.vaughan@pne.club", phone: "+44 7700 900126" },
  { name: "Nathan Iqbal", email: "nathan.iqbal@pne.club", phone: "+44 7700 900127" },
  { name: "Harvey Shaw", email: "harvey.shaw@pne.club", phone: "+44 7700 900128" },
  { name: "George Ellis", email: "george.ellis@pne.club", phone: "+44 7700 900129" },
  { name: "Matt Kearney", email: "matt.kearney@pne.club", phone: "+44 7700 900130" },
].map((row) => ({ ...row, selected: true, isAdmin: false }));

/** Anonymous / direct-access invitees - private accounts, Sonocea invite codes. */
const ANONYMOUS_ROSTER = [
  { name: "River", email: "", phone: "+44 7700 901001" },
  { name: "Casey Morgan", email: "", phone: "+44 7700 901002" },
  { name: "Jordan Blake", email: "", phone: "+44 7700 901003" },
  { name: "Sam Quinn", email: "", phone: "+44 7700 901004" },
  { name: "Alex Drew", email: "", phone: "+44 7700 901005" },
  { name: "Taylor Reed", email: "", phone: "+44 7700 901006" },
  { name: "Morgan Ellis", email: "", phone: "+44 7700 901007" },
  { name: "Jamie Cross", email: "", phone: "+44 7700 901008" },
  { name: "Riley Shaw", email: "", phone: "+44 7700 901009" },
  { name: "Avery Lane", email: "", phone: "+44 7700 901010" },
  { name: "Cameron West", email: "", phone: "+44 7700 901011" },
  { name: "Parker Nye", email: "", phone: "+44 7700 901012" },
].map((row) => ({ ...row, selected: true, isAdmin: false, isAnonymous: true }));

const EMPTY_USER_ROW = { name: "", email: "", phone: "", selected: true, isAdmin: false };

const INVITE_CHANNELS = [
  {
    id: "email",
    label: "Email",
    description: "Send a branded invite link to each person’s email address.",
  },
  {
    id: "sms",
    label: "SMS",
    description: "Text a short invite link to each person’s mobile number.",
  },
  {
    id: "both",
    label: "Email and SMS",
    description: "Send both - useful when you want a backup channel for a large team.",
  },
];

const ACTIONABLE_PROGRAMME_ID = "prog-post-training";
const ANONYMOUS_PROGRAMME_ID = "prog-personalised-wellbeing";
const CUSTOM_PROGRAMME_ID = "prog-custom";

function draftFromTemplate(template, { isCustom = false, orgLabel = "Preston North End", partnerId = "org-preston" } = {}) {
  if (!template && !isCustom) return null;
  return {
    id: isCustom ? CUSTOM_PROGRAMME_ID : template.id,
    title: isCustom ? "" : template.title,
    subtitle: isCustom ? "Custom · Your organisation" : template.subtitle,
    description: isCustom ? "" : template.description,
    category: isCustom ? "Custom" : template.category,
    structure: isCustom ? "Custom sequence" : template.structure,
    partnerLabel: orgLabel,
    actionablePartnerId: partnerId,
    audience: isCustom ? "Your team" : template.audience,
    cadence: isCustom ? "Set your own rhythm" : template.cadence,
    outcomes: isCustom ? [] : [...(template.outcomes ?? [])],
    sessionIds: isCustom ? [] : [...(template.sessionIds ?? [])],
    bundleIds: isCustom ? [] : [...(template.bundleIds ?? [])],
    accent: template?.accent ?? "#0b1c2c",
    sourceTemplateId: isCustom ? null : template.id,
    isCustom,
    customized: !isCustom,
  };
}

function programmeTotalMinutes(sessions) {
  return sessions.reduce((sum, s) => sum + (s.durationMin ?? 0), 0);
}

function stepMeta(id) {
  return ADMIN_SETUP_STEPS.find((s) => s.id === id) ?? ADMIN_SETUP_STEPS[0];
}

function nextStepId(id) {
  const i = ADMIN_SETUP_STEPS.findIndex((s) => s.id === id);
  return ADMIN_SETUP_STEPS[Math.min(i + 1, ADMIN_SETUP_STEPS.length - 1)]?.id;
}

function prevStepId(id) {
  const i = ADMIN_SETUP_STEPS.findIndex((s) => s.id === id);
  return ADMIN_SETUP_STEPS[Math.max(i - 1, 0)]?.id;
}

function PrimaryButton({ children, onClick, disabled, type = "button", className = "" }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full bg-white px-6 py-3 text-[16px] font-medium text-black disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, className = "", disabled = false }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full border border-white/20 px-6 py-3 text-[16px] text-white/75 hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

function ProgressDots({ step, of }) {
  return (
    <div className="flex items-center gap-2.5">
      {Array.from({ length: of }, (_, i) => (
        <span
          key={i}
          className={`h-2 flex-1 rounded-full ${i < step ? "bg-white" : "bg-white/15"}`}
        />
      ))}
      <span className="ml-2 shrink-0 text-[15px] text-white/40">
        {step} of {of}
      </span>
    </div>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Single desktop Admin shell for the Combined setup journey.
 * Every step shares the same frame; only the main pane changes.
 */
export function AdminSetupFlow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stepId = searchParams.get("step") || "login";
  const meta = stepMeta(stepId);
  const { surface } = useReviewSurface();
  const anonymousMode = surface === "anonymous";
  const defaultOrgName = anonymousMode ? "Sonocea Direct" : "Preston North End";
  const defaultOrgId = anonymousMode ? DIRECT_ACCESS_PARTNER_ID : "org-preston";
  const defaultProgrammeId = anonymousMode ? ANONYMOUS_PROGRAMME_ID : ACTIONABLE_PROGRAMME_ID;
  const {
    loginAdmin,
    logout,
    role,
    catalog,
    partners,
    listeners,
    invites,
    listenHistory,
    feedback,
    upsertPartner,
    upsertListener,
    addInvites,
    upsertSession,
  } = useAppStore();

  const [email, setEmail] = useState(DEMO_CREDENTIALS.admin.email);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [orgName, setOrgName] = useState(defaultOrgName);
  const [orgType, setOrgType] = useState(anonymousMode ? "other" : "sport");
  const [orgContact, setOrgContact] = useState(
    anonymousMode ? "Sonocea Support" : "Ops · Player Care",
  );
  const [orgEmail, setOrgEmail] = useState(
    anonymousMode ? "hello@sonocea.com" : "ops@pne.club",
  );
  const [orgProgramme, setOrgProgramme] = useState(
    anonymousMode
      ? "A personalised listening programme shaped by each listener’s onboarding answers."
      : "Listening sessions to support recovery and wellbeing after training.",
  );
  const [orgLogoSrc, setOrgLogoSrc] = useState("");
  const [orgCreated, setOrgCreated] = useState(false);
  const [orgId, setOrgId] = useState(defaultOrgId);

  const [userRows, setUserRows] = useState(anonymousMode ? ANONYMOUS_ROSTER : DEMO_ROSTER);
  const [usersSaved, setUsersSaved] = useState(false);
  const [invitesSent, setInvitesSent] = useState(false);
  const [inviteChannel, setInviteChannel] = useState(anonymousMode ? "sms" : "email");
  const [rosterSource, setRosterSource] = useState("csv"); // csv | manual

  const [previewProgrammeId, setPreviewProgrammeId] = useState(defaultProgrammeId);
  const [selectedProgrammeId, setSelectedProgrammeId] = useState(defaultProgrammeId);
  const [expandedPickId, setExpandedPickId] = useState(defaultProgrammeId);
  const [programmeDraft, setProgrammeDraft] = useState(null);
  const [programmeAssigned, setProgrammeAssigned] = useState(false);

  const selectedTemplate = useMemo(() => {
    if (programmeDraft) {
      if (programmeDraft.isCustom && selectedProgrammeId === CUSTOM_PROGRAMME_ID) {
        return programmeDraft;
      }
      if (programmeDraft.customized && programmeDraft.sourceTemplateId === selectedProgrammeId) {
        return programmeDraft;
      }
      if (programmeDraft.id === selectedProgrammeId) return programmeDraft;
    }
    return programmeTemplateById(selectedProgrammeId);
  }, [programmeDraft, selectedProgrammeId]);

  const assignedSessions = useMemo(
    () => sessionsForProgrammeTemplate(selectedTemplate, catalog),
    [selectedTemplate, catalog],
  );
  const draftSessions = useMemo(
    () => sessionsForProgrammeTemplate(programmeDraft, catalog),
    [programmeDraft, catalog],
  );

  const validUsers = useMemo(
    () =>
      userRows.filter(
        (u) => u.name.trim() && (u.email.trim() || u.phone.trim()),
      ),
    [userRows],
  );

  const selectedUsers = useMemo(
    () => validUsers.filter((u) => u.selected !== false),
    [validUsers],
  );

  const channelReadyUsers = useMemo(() => {
    return selectedUsers.filter((u) => {
      if (inviteChannel === "email") return Boolean(u.email.trim());
      if (inviteChannel === "sms") return Boolean(u.phone.trim());
      return Boolean(u.email.trim()) && Boolean(u.phone.trim());
    });
  }, [selectedUsers, inviteChannel]);

  const channelLabel =
    INVITE_CHANNELS.find((c) => c.id === inviteChannel)?.label ?? "Email";

  function go(id) {
    navigate(adminSetupPath(id));
  }

  function goNext() {
    go(nextStepId(stepId));
  }

  function goBack() {
    if (anonymousMode) {
      if (stepId === "org-name") {
        go("login");
        return;
      }
      if (stepId === "users-enter") {
        go("org-name");
        return;
      }
      if (stepId === "invite-channel") {
        go("users-enter");
        return;
      }
      if (stepId === "invite-review") {
        go("invite-channel");
        return;
      }
      if (stepId === "invites-sent") {
        go("invite-review");
        return;
      }
    }
    if (stepId === "org-name") {
      go("orgs-list");
      return;
    }
    if (stepId === "org-confirm") {
      go(anonymousMode ? "org-name" : "org-branding");
      return;
    }
    go(prevStepId(stepId));
  }

  function signIn(e) {
    e.preventDefault();
    setLoginError("");
    if (role && role !== "admin") logout();
    const result = loginAdmin({ email, password: password || DEMO_CREDENTIALS.admin.password });
    if (!result.ok) {
      setLoginError(result.error || "Sign-in failed.");
      return;
    }
    go(anonymousMode ? "org-name" : "home");
  }

  function createOrganisation() {
    const name = orgName.trim() || defaultOrgName;
    const isPreston = !anonymousMode && /preston\s*north\s*end/i.test(name);
    const isDirect = anonymousMode || /sonocea\s*direct/i.test(name);
    const id = isDirect
      ? DIRECT_ACCESS_PARTNER_ID
      : isPreston
        ? "org-preston"
        : `org-${Date.now()}`;
    const existing = partners.find((p) => p.id === id);
    const seed = isDirect ? SONOCEA_DIRECT_ORGANIZATION : isPreston ? PNE_ORGANIZATION : {};
    upsertPartner(
      emptyOrganization({
        ...seed,
        ...existing,
        id,
        name: isDirect ? "Sonocea" : name,
        monogram: isDirect ? "" : isPreston ? "PNE" : name.slice(0, 3).toUpperCase(),
        logoSrc: isDirect ? "" : orgLogoSrc || (isPreston ? PNE_LOGO_SRC : existing?.logoSrc || ""),
        orgType,
        contactName: orgContact,
        contactEmail: orgEmail,
        programmeTitle: isDirect
          ? "Your personalised programme"
          : isPreston
            ? seed.programmeTitle || ""
            : "",
        programme: orgProgramme,
        inviteLine: isDirect
          ? "You’re invited to experience Sonocea."
          : `${name} has invited you to experience Sonocea.`,
        status: "active",
        seats: existing?.seats ?? seed.seats ?? 40,
        isDirectAccess: isDirect,
      }),
    );
    setOrgId(id);
    setOrgCreated(true);
    if (anonymousMode) {
      setSelectedProgrammeId(ANONYMOUS_PROGRAMME_ID);
      setPreviewProgrammeId(ANONYMOUS_PROGRAMME_ID);
      assignProgramme({
        nextStep: "users-enter",
        templateOverride: programmeTemplateById(ANONYMOUS_PROGRAMME_ID),
        partnerIdOverride: id,
      });
      return;
    }
    go("dashboard");
  }

  function saveUsers() {
    selectedUsers.forEach((u, index) => {
      const first = u.name.trim().split(" ")[0] || "USER";
      const code = anonymousMode
        ? `SONOCEA-${first.toUpperCase()}`
        : `${orgName.split(" ")[0].toUpperCase()}-${first.toUpperCase()}`;
      upsertListener(
        emptyListenerProfile({
          id: `lis-setup-${index}-${Date.now()}`,
          name: u.name.trim(),
          displayName: first,
          email: u.email.trim().toLowerCase() || undefined,
          phone: u.phone.trim() || undefined,
          partnerId: orgId,
          inviteCode: code,
          status: "invited",
          isAnonymous: anonymousMode || Boolean(u.isAnonymous),
        }),
      );
    });
    setUsersSaved(true);
    go("invite-channel");
  }

  function sendInvites() {
    const batch = channelReadyUsers.map((u, index) => {
      const first = u.name.trim().split(" ")[0] || "USER";
      const code = anonymousMode
        ? `SONOCEA-${first.toUpperCase()}-${index}`
        : `${orgName.split(" ")[0].toUpperCase()}-${first.toUpperCase()}-${index}`;
      return {
        id: `inv-setup-${Date.now()}-${index}`,
        code,
        email: u.email.trim().toLowerCase() || undefined,
        phone: u.phone.trim() || undefined,
        name: u.name.trim(),
        partnerId: orgId,
        status: "pending",
        kind: "named",
        channel: inviteChannel,
        createdAt: Date.now(),
      };
    });
    if (batch.length) addInvites(batch);
    setInvitesSent(true);
    go("invites-sent");
  }

  function startCustomise(template) {
    const draft = draftFromTemplate(template, {
      isCustom: false,
      orgLabel: orgName || defaultOrgName,
      partnerId: orgId || defaultOrgId,
    });
    setProgrammeDraft(draft);
    setSelectedProgrammeId(template.id);
    setPreviewProgrammeId(template.id);
    go("programme-customize");
  }

  function startCustomProgramme() {
    const draft = draftFromTemplate(null, {
      isCustom: true,
      orgLabel: orgName || defaultOrgName,
      partnerId: orgId || defaultOrgId,
    });
    setProgrammeDraft(draft);
    setSelectedProgrammeId(CUSTOM_PROGRAMME_ID);
    setPreviewProgrammeId(CUSTOM_PROGRAMME_ID);
    setExpandedPickId(CUSTOM_PROGRAMME_ID);
    go("programme-customize");
  }

  function selectProgrammeTemplate(template) {
    setSelectedProgrammeId(template.id);
    setPreviewProgrammeId(template.id);
    setExpandedPickId((prev) => (prev === template.id ? null : template.id));
    if (
      programmeDraft &&
      !programmeDraft.isCustom &&
      programmeDraft.sourceTemplateId !== template.id
    ) {
      setProgrammeDraft(null);
    }
  }

  function patchDraft(patch) {
    setProgrammeDraft((prev) => (prev ? { ...prev, ...patch } : prev));
  }

  function toggleDraftSession(sessionId) {
    setProgrammeDraft((prev) => {
      if (!prev) return prev;
      const has = prev.sessionIds.includes(sessionId);
      return {
        ...prev,
        sessionIds: has
          ? prev.sessionIds.filter((id) => id !== sessionId)
          : [...prev.sessionIds, sessionId],
      };
    });
  }

  function assignProgramme({
    nextStep = "dashboard-programme",
    templateOverride = null,
    partnerIdOverride = null,
  } = {}) {
    const template = templateOverride ?? selectedTemplate;
    if (!template?.sessionIds?.length) return;

    const partnerId =
      partnerIdOverride || orgId || template.actionablePartnerId || defaultOrgId;
    if (!partnerId) return;
    const existing = partners.find((p) => p.id === partnerId);
    const entitledIds = new Set(template.sessionIds);
    const bundleIds =
      template.bundleIds?.length > 0
        ? template.bundleIds
        : Array.from(
            new Set(
              catalog
                .filter((s) => entitledIds.has(s.id))
                .flatMap((s) => s.groupIds ?? []),
            ),
          );

    upsertPartner(
      emptyOrganization({
        ...existing,
        id: partnerId,
        name: anonymousMode
          ? "Sonocea"
          : orgName.trim() || existing?.name || template.partnerLabel,
        monogram: anonymousMode ? "" : existing?.monogram || "PNE",
        logoSrc: anonymousMode ? "" : existing?.logoSrc || PNE_LOGO_SRC,
        orgType: orgType || existing?.orgType || (anonymousMode ? "other" : "sport"),
        contactName: orgContact || existing?.contactName,
        contactEmail: orgEmail || existing?.contactEmail,
        programmeTitle: template.title,
        programme: orgProgramme || template.description,
        inviteLine: anonymousMode
          ? "You’re invited to experience Sonocea."
          : existing?.inviteLine ||
            `${orgName || template.partnerLabel} has invited you to experience Sonocea.`,
        status: "active",
        seats: existing?.seats ?? 40,
        seatsUsed: existing?.seatsUsed ?? 0,
        sessionIds: template.sessionIds,
        bundleIds,
        isDirectAccess: anonymousMode || Boolean(existing?.isDirectAccess),
      }),
    );

    catalog.forEach((session) => {
      const shouldHave = entitledIds.has(session.id);
      const currently = (session.partnerIds ?? []).includes(partnerId);
      if (shouldHave === currently) return;
      const partnerIds = shouldHave
        ? Array.from(new Set([...(session.partnerIds ?? []), partnerId]))
        : (session.partnerIds ?? []).filter((id) => id !== partnerId);
      upsertSession({ ...session, partnerIds });
    });

    setProgrammeAssigned(true);
    go(nextStep);
  }

  function loadDemoRoster() {
    setUserRows(DEMO_ROSTER.map((row) => ({ ...row })));
    setRosterSource("csv");
  }

  function toggleUserSelected(index) {
    setUserRows((rows) => {
      const next = [...rows];
      const row = next[index];
      if (!row) return rows;
      next[index] = { ...row, selected: row.selected === false };
      return next;
    });
  }

  function toggleUserAdmin(index) {
    setUserRows((rows) => {
      const next = [...rows];
      const row = next[index];
      if (!row) return rows;
      next[index] = { ...row, isAdmin: !row.isAdmin };
      return next;
    });
  }

  function setAllSelected(selected) {
    setUserRows((rows) => rows.map((row) => ({ ...row, selected })));
  }

  function handoffToListener() {
    logout();
    const code = anonymousMode
      ? DEMO_CREDENTIALS.anonymousListener.inviteCode
      : DEMO_CREDENTIALS.listener.inviteCode;
    navigate(`/app/listener/email?code=${encodeURIComponent(code)}`);
  }

  const showShell = stepId !== "login" && stepId !== "handoff";
  const canAssignSelected = Boolean(
    selectedTemplate?.actionablePartnerId && selectedTemplate?.sessionIds?.length,
  );
  const draftMorning = draftSessions.filter((s) => s.timeOfDay === "morning");
  const draftEvening = draftSessions.filter((s) => s.timeOfDay === "evening");
  const customiseReady = Boolean(
    programmeDraft?.title?.trim() && programmeDraft?.sessionIds?.length,
  );
  const inviteCount = channelReadyUsers.length;
  const skippedForChannel = selectedUsers.length - channelReadyUsers.length;

  function dashboardStepId() {
    if (invitesSent) return "dashboard-live";
    if (programmeAssigned) return "dashboard-programme";
    if (orgCreated) return "dashboard";
    return "home";
  }

  const platformOrgs = useMemo(
    () => partners.filter((p) => p.id !== "org-preston" || orgCreated),
    [partners, orgCreated],
  );

  const homeMetrics = useMemo(() => {
    const orgs = platformOrgs;
    const programmes = orgs.filter((p) => (p.programmeTitle || p.programme || "").trim()).length;
    const seatsUsed = orgs.reduce((sum, p) => sum + (p.seatsUsed || 0), 0);
    const seats = orgs.reduce((sum, p) => sum + (p.seats || 0), 0);
    return {
      organisations: orgs.length,
      programmes,
      seatsUsed,
      seats,
    };
  }, [platformOrgs]);

  const homeInsights = useMemo(() => {
    const now = Date.now();
    const orgIds = new Set(platformOrgs.map((o) => o.id));
    const history = listenHistory.filter((h) => !h.partnerId || orgIds.has(h.partnerId));

    const dayBars = Array.from({ length: 30 }, (_, i) => {
      const dayStart = now - (30 - i) * DAY_MS;
      const dayEnd = dayStart + DAY_MS;
      const count = history.filter((h) => {
        const at = h.completedAt ?? 0;
        return at >= dayStart && at < dayEnd;
      }).length;
      return { i, count, label: new Date(dayStart).toLocaleDateString(undefined, { day: "numeric", month: "short" }) };
    });

    const listensToday = history.filter((h) => (h.completedAt ?? 0) >= now - DAY_MS).length;
    const listensWeek = history.filter((h) => (h.completedAt ?? 0) >= now - 7 * DAY_MS).length;
    const listensMonth = history.filter((h) => (h.completedAt ?? 0) >= now - 30 * DAY_MS).length;
    const completions = history.filter((h) => (h.progressPct ?? 0) >= 90).length;
    const completionRate = history.length
      ? Math.round((completions / history.length) * 100)
      : 0;
    const listeningMin = Math.round(
      history.reduce(
        (sum, h) => sum + (h.durationMin ?? 0) * ((h.progressPct ?? 0) / 100),
        0,
      ),
    );
    const activeListeners = new Set(history.map((h) => h.listenerId).filter(Boolean)).size;
    const dau = new Set(
      history
        .filter((h) => (h.completedAt ?? 0) >= now - DAY_MS)
        .map((h) => h.listenerId)
        .filter(Boolean),
    ).size;

    const byOrg = platformOrgs
      .map((org) => {
        const rows = history.filter((h) => h.partnerId === org.id);
        const mins = rows.reduce(
          (sum, h) => sum + (h.durationMin ?? 0) * ((h.progressPct ?? 0) / 100),
          0,
        );
        const seatPct = org.seats ? Math.round(((org.seatsUsed || 0) / org.seats) * 100) : 0;
        return {
          id: org.id,
          name: org.name,
          monogram: org.monogram,
          logoSrc: org.logoSrc,
          listens: rows.length,
          minutes: Math.round(mins),
          seatsUsed: org.seatsUsed || 0,
          seats: org.seats || 0,
          seatPct,
          programmeTitle: org.programmeTitle || "Programme",
        };
      })
      .sort((a, b) => b.listens - a.listens);

    const sessionMap = {};
    for (const h of history) {
      if (!sessionMap[h.sessionId]) {
        const session = catalog.find((s) => s.id === h.sessionId);
        sessionMap[h.sessionId] = {
          id: h.sessionId,
          title: session?.title ?? h.sessionId,
          category: session?.category ?? session?.useCase ?? "Session",
          starts: 0,
          completions: 0,
          minutes: 0,
        };
      }
      sessionMap[h.sessionId].starts += 1;
      if ((h.progressPct ?? 0) >= 90) sessionMap[h.sessionId].completions += 1;
      sessionMap[h.sessionId].minutes += (h.durationMin ?? 0) * ((h.progressPct ?? 0) / 100);
    }
    const topSessions = Object.values(sessionMap)
      .map((s) => ({ ...s, minutes: Math.round(s.minutes) }))
      .sort((a, b) => b.starts - a.starts)
      .slice(0, 6);

    const categoryMap = {};
    for (const s of Object.values(sessionMap)) {
      const key = s.category || "Other";
      if (!categoryMap[key]) categoryMap[key] = { label: key, starts: 0 };
      categoryMap[key].starts += s.starts;
    }
    const categories = Object.values(categoryMap).sort((a, b) => b.starts - a.starts);

    const accepted = invites.filter((i) => i.status === "accepted" && orgIds.has(i.partnerId)).length;
    const pending = invites.filter((i) => i.status === "pending" && orgIds.has(i.partnerId)).length;
    const inviteTotal = accepted + pending;
    const acceptanceRate = inviteTotal ? Math.round((accepted / inviteTotal) * 100) : 0;

    const onboarded = listeners.filter(
      (l) => l.onboardingComplete && orgIds.has(l.partnerId),
    ).length;
    const roster = listeners.filter((l) => orgIds.has(l.partnerId)).length;

    const recent = [...history]
      .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0))
      .slice(0, 8)
      .map((h) => {
        const session = catalog.find((s) => s.id === h.sessionId);
        const org = platformOrgs.find((o) => o.id === h.partnerId);
        return {
          id: `${h.sessionId}-${h.completedAt}`,
          title: session?.title ?? h.sessionId,
          org: org?.name ?? "Organisation",
          at: h.completedAt,
          progressPct: h.progressPct ?? 0,
        };
      });

    const avgRating = feedback.length
      ? Math.round(
          (feedback.reduce((sum, f) => sum + (f.rating || 0), 0) / feedback.length) * 10,
        ) / 10
      : null;

    return {
      dayBars,
      listensToday,
      listensWeek,
      listensMonth,
      completions,
      completionRate,
      listeningMin,
      activeListeners,
      dau,
      byOrg,
      topSessions,
      categories,
      accepted,
      pending,
      acceptanceRate,
      onboarded,
      roster,
      recent,
      avgRating,
      maxDay: Math.max(1, ...dayBars.map((b) => b.count)),
      maxOrgListens: Math.max(1, ...byOrg.map((o) => o.listens), 1),
      maxSession: Math.max(1, ...topSessions.map((s) => s.starts), 1),
      maxCategory: Math.max(1, ...categories.map((c) => c.starts), 1),
    };
  }, [platformOrgs, listenHistory, catalog, invites, listeners, feedback]);

  // -- Login (full-bleed card inside desktop frame) --
  if (stepId === "login") {
    return (
      <DesktopFrame bare>
        <div className="flex h-full items-center justify-center p-8">
          <form onSubmit={signIn} className="w-full max-w-sm space-y-4">
            <div>
              <p className={labelClass}>Sonocea Admin</p>
              <h1 className="mt-2 text-[2rem] font-medium tracking-tight text-white">Sign in</h1>
              <p className="mt-2 text-[17px] text-white/45">
                Demo · {DEMO_CREDENTIALS.admin.email} / {DEMO_CREDENTIALS.admin.password}
              </p>
            </div>
            <label className="block">
              <span className={labelClass}>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
                required
              />
            </label>
            <label className="block">
              <span className={labelClass}>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={fieldClass}
                placeholder="admin"
              />
            </label>
            {loginError ? <p className="text-[15px] text-red-300">{loginError}</p> : null}
            <PrimaryButton type="submit" className="w-full">
              Next
            </PrimaryButton>
          </form>
        </div>
      </DesktopFrame>
    );
  }

  // -- Handoff --
  if (stepId === "handoff") {
    return (
      <DesktopFrame bare>
        <div className="flex h-full flex-col items-center justify-center p-8 text-center">
          <p className={labelClass}>Programme ready</p>
          <h1 className="mt-3 max-w-md text-[1.75rem] font-medium tracking-tight text-white">
            {selectedTemplate?.title ?? "Programme"} is live for{" "}
            {orgCreated ? orgName : defaultOrgName}.
          </h1>
          <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-white/50">
            {inviteCount
              ? `${inviteCount} invite${inviteCount === 1 ? "" : "s"} sent via ${channelLabel.toLowerCase()}.`
              : "Invites are ready."}{" "}
            {anonymousMode
              ? "On their home screen they’ll see sessions shaped by what they share in onboarding."
              : "On their home screen they’ll see this programme’s session sequence - the same one you just created."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <GhostButton onClick={() => go("dashboard-live")}>Back to Admin</GhostButton>
            <PrimaryButton onClick={handoffToListener}>Next</PrimaryButton>
          </div>
        </div>
      </DesktopFrame>
    );
  }

  // Review & create removed - deep links land on the prior step.
  if (stepId === "org-confirm") {
    return <Navigate to={adminSetupPath(anonymousMode ? "org-name" : "org-branding")} replace />;
  }

  // Session sequence / assign confirm removed - deep links land on choose.
  if (stepId === "programme-preview" || stepId === "programme-confirm") {
    return <Navigate to={adminSetupPath("programme-pick")} replace />;
  }

  return (
    <DesktopFrame
      partnerLogoSrc={orgLogoSrc || undefined}
      partnerName={orgName}
      sidebar={
        <AdminSidebar
          active={meta.nav}
          onNavigate={(navId) => {
            if (navId === "overview" || navId === "insights") go(dashboardStepId());
            if (navId === "organizations") go("orgs-list");
            if (navId === "settings") go(orgCreated ? "org-branding" : "orgs-list");
            if (navId === "participants") {
              if (invitesSent) go("invites-sent");
              else if (usersSaved) go("invite-channel");
              else go(programmeAssigned ? "users-method" : dashboardStepId());
            }
            if (navId === "programmes" || navId === "content") {
              go(programmeAssigned ? "programme-detail" : orgCreated ? "programme-pick" : "orgs-list");
            }
          }}
        />
      }
    >
      {stepId === "home" ? (
        <WizardPane
          eyebrow="Dashboard"
          title="Home"
          subtitle="Platform adoption at a glance - listens, seats, programmes, and organisation health. Preston North End is added from Organisations → Create New."
          footer={
            <>
              <span />
              <PrimaryButton onClick={() => go("orgs-list")}>Organisations</PrimaryButton>
            </>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            <Metric
              label="Organisations"
              value={String(homeMetrics.organisations)}
              hint="Active on the platform"
            />
            <Metric
              label="Programmes"
              value={String(homeMetrics.programmes)}
              hint="With programme copy set"
            />
            <Metric
              label="Seats in use"
              value={`${homeMetrics.seatsUsed}`}
              hint={`Of ${homeMetrics.seats} allocated`}
            />
            <Metric
              label="Listens · 30d"
              value={String(homeInsights.listensMonth)}
              hint={`${homeInsights.listensWeek} this week · ${homeInsights.listensToday} today`}
            />
            <Metric
              label="Completion rate"
              value={`${homeInsights.completionRate}%`}
              hint={`${homeInsights.completions} completed sessions`}
            />
            <Metric
              label="Active listeners"
              value={String(homeInsights.activeListeners)}
              hint={`${homeInsights.dau} active today · ${homeInsights.listeningMin} min listened`}
            />
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.45fr_1fr]">
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className={labelClass}>Listens</p>
                  <h2 className="mt-2 text-[18px] font-medium text-white">Last 30 days</h2>
                  <p className="mt-1 text-[14px] text-white/45">
                    Daily session starts across live organisations.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[1.5rem] font-medium text-white">{homeInsights.listensMonth}</p>
                  <p className="text-[13px] text-white/40">total starts</p>
                </div>
              </div>
              <div className="mt-6 flex h-40 items-end gap-1">
                {homeInsights.dayBars.map((bar) => (
                  <div key={bar.i} className="group relative flex min-w-0 flex-1 flex-col items-center justify-end">
                    <div
                      className="w-full rounded-sm bg-white/75 transition group-hover:bg-white"
                      style={{ height: `${Math.max(6, (bar.count / homeInsights.maxDay) * 100)}%` }}
                      title={`${bar.label}: ${bar.count} listens`}
                    />
                    {bar.i % 5 === 0 || bar.i === homeInsights.dayBars.length - 1 ? (
                      <span className="mt-2 hidden text-[10px] text-white/30 sm:block">
                        {bar.label.split(" ")[0]}
                      </span>
                    ) : (
                      <span className="mt-2 h-[14px]" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-3">
                {[
                  { label: "Today", value: homeInsights.listensToday },
                  { label: "This week", value: homeInsights.listensWeek },
                  { label: "Listening time", value: `${homeInsights.listeningMin} min` },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[12px] uppercase tracking-[0.12em] text-white/35">{item.label}</p>
                    <p className="mt-1 text-[16px] text-white/85">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className={labelClass}>Seat utilisation</p>
              <h2 className="mt-2 text-[18px] font-medium text-white">By organisation</h2>
              <p className="mt-1 text-[14px] text-white/45">
                Allocated seats vs seats currently in use.
              </p>
              <ul className="mt-5 space-y-4">
                {homeInsights.byOrg.map((org) => (
                  <li key={org.id}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-[15px] text-white/85">{org.name}</p>
                      <p className="shrink-0 text-[13px] text-white/40">
                        {org.seatsUsed}/{org.seats} · {org.seatPct}%
                      </p>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-white/75"
                        style={{ width: `${Math.min(100, org.seatPct)}%` }}
                      />
                    </div>
                  </li>
                ))}
                {!homeInsights.byOrg.length ? (
                  <li className="text-[14px] text-white/40">No organisations yet.</li>
                ) : null}
              </ul>
              <div className="mt-6 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <p className="text-[12px] uppercase tracking-[0.12em] text-white/35">Platform seats</p>
                <p className="mt-1 text-[20px] font-medium text-white">
                  {homeMetrics.seatsUsed}
                  <span className="text-[14px] font-normal text-white/40">
                    {" "}
                    / {homeMetrics.seats}
                  </span>
                </p>
              </div>
            </section>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className={labelClass}>Adoption</p>
              <h2 className="mt-2 text-[18px] font-medium text-white">Listens by organisation</h2>
              <p className="mt-1 text-[14px] text-white/45">Session starts attributed to each partner.</p>
              <ul className="mt-5 space-y-4">
                {homeInsights.byOrg.map((org) => (
                  <li key={org.id} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/90 p-1">
                      {org.logoSrc ? (
                        <img
                          src={org.logoSrc}
                          alt=""
                          className="max-h-full max-w-full object-contain"
                          decoding="async"
                        />
                      ) : (
                        <span className="text-[10px] font-medium text-black/70">
                          {org.monogram || org.name.slice(0, 2)}
                        </span>
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-[15px] text-white/85">{org.name}</p>
                        <p className="shrink-0 text-[13px] text-white/45">
                          {org.listens} · {org.minutes} min
                        </p>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-white/70"
                          style={{
                            width: `${Math.max(4, (org.listens / homeInsights.maxOrgListens) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className={labelClass}>Content</p>
              <h2 className="mt-2 text-[18px] font-medium text-white">Top sessions</h2>
              <p className="mt-1 text-[14px] text-white/45">Most started sessions across the platform.</p>
              <ul className="mt-5 space-y-3">
                {homeInsights.topSessions.map((session, index) => (
                  <li
                    key={session.id}
                    className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/20 px-3.5 py-3"
                  >
                    <span className="w-5 shrink-0 text-[13px] text-white/30">{index + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] text-white/90">{session.title}</p>
                      <p className="mt-0.5 text-[12px] text-white/40">
                        {session.category} · {session.completions} completions
                      </p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-white/65"
                          style={{
                            width: `${Math.max(6, (session.starts / homeInsights.maxSession) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="shrink-0 text-[15px] text-white/70">{session.starts}</span>
                  </li>
                ))}
                {!homeInsights.topSessions.length ? (
                  <li className="text-[14px] text-white/40">No session activity yet.</li>
                ) : null}
              </ul>
            </section>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className={labelClass}>Invites</p>
              <h2 className="mt-2 text-[18px] font-medium text-white">Acceptance funnel</h2>
              <div className="mt-5 flex h-32 items-end gap-3">
                {(() => {
                  const inviteTotal = Math.max(1, homeInsights.accepted + homeInsights.pending);
                  return (
                    <>
                      <div className="flex h-full flex-1 flex-col justify-end">
                        <div
                          className="rounded-t-lg bg-white/75"
                          style={{
                            height: `${Math.max(12, (homeInsights.accepted / inviteTotal) * 100)}%`,
                          }}
                        />
                        <p className="mt-2 text-center text-[12px] text-white/40">Accepted</p>
                        <p className="text-center text-[16px] text-white">{homeInsights.accepted}</p>
                      </div>
                      <div className="flex h-full flex-1 flex-col justify-end">
                        <div
                          className="rounded-t-lg bg-white/30"
                          style={{
                            height: `${Math.max(12, (homeInsights.pending / inviteTotal) * 100)}%`,
                          }}
                        />
                        <p className="mt-2 text-center text-[12px] text-white/40">Pending</p>
                        <p className="text-center text-[16px] text-white">{homeInsights.pending}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-[2rem] font-medium text-white">{homeInsights.acceptanceRate}%</p>
                <p className="mt-1 text-[14px] text-white/40">Invite acceptance rate</p>
                <p className="mt-3 text-[14px] text-white/55">
                  {homeInsights.onboarded}/{homeInsights.roster || 0} listeners onboarded
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className={labelClass}>Mix</p>
              <h2 className="mt-2 text-[18px] font-medium text-white">By category</h2>
              <p className="mt-1 text-[14px] text-white/45">Where listening time concentrates.</p>
              <ul className="mt-5 space-y-3">
                {homeInsights.categories.slice(0, 5).map((cat) => (
                  <li key={cat.label}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[14px] text-white/80">{cat.label}</p>
                      <p className="shrink-0 text-[13px] text-white/40">{cat.starts}</p>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-white/60"
                        style={{
                          width: `${Math.max(5, (cat.starts / homeInsights.maxCategory) * 100)}%`,
                        }}
                      />
                    </div>
                  </li>
                ))}
                {!homeInsights.categories.length ? (
                  <li className="text-[14px] text-white/40">No category data yet.</li>
                ) : null}
              </ul>
              {homeInsights.avgRating != null ? (
                <p className="mt-5 text-[14px] text-white/50">
                  Avg feedback · ★ {homeInsights.avgRating}
                </p>
              ) : (
                <p className="mt-5 text-[14px] text-white/35">Feedback arrives as Listeners rate sessions.</p>
              )}
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className={labelClass}>Activity</p>
              <h2 className="mt-2 text-[18px] font-medium text-white">Recent listens</h2>
              <ul className="mt-5 space-y-3">
                {homeInsights.recent.map((row) => (
                  <li key={row.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[14px] text-white/85">{row.title}</p>
                      <p className="mt-0.5 text-[12px] text-white/40">
                        {row.org} · {row.progressPct}%
                      </p>
                    </div>
                    <span className="shrink-0 text-[12px] text-white/35">
                      {row.at
                        ? new Date(row.at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })
                        : "-"}
                    </span>
                  </li>
                ))}
                {!homeInsights.recent.length ? (
                  <li className="text-[14px] text-white/40">No recent listens.</li>
                ) : null}
              </ul>
            </section>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className={labelClass}>Organisations</p>
                <p className="mt-2 text-[14px] text-white/45">
                  {platformOrgs.length} live · programmes and seat pools below.
                </p>
              </div>
            </div>
            <ul className="mt-3 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
              {platformOrgs.map((org) => {
                const insight = homeInsights.byOrg.find((o) => o.id === org.id);
                return (
                  <li key={org.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/90 p-1.5">
                        {org.logoSrc ? (
                          <img
                            src={org.logoSrc}
                            alt=""
                            className="max-h-full max-w-full object-contain"
                            decoding="async"
                          />
                        ) : (
                          <span className="text-[12px] font-medium text-black/70">
                            {org.monogram || org.name.slice(0, 2)}
                          </span>
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[16px] text-white">{org.name}</p>
                        <p className="mt-0.5 text-[13px] text-white/45">
                          {ORG_TYPE_OPTIONS.find((o) => o.id === org.orgType)?.label ?? org.orgType}
                          {org.region ? ` · ${org.region}` : ""}
                          {insight ? ` · ${insight.listens} listens` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[14px] text-white/80">
                        {org.programmeTitle || "Programme live"}
                      </p>
                      <p className="mt-0.5 text-[12px] text-white/40">
                        {org.seatsUsed}/{org.seats} seats
                        {insight ? ` · ${insight.minutes} min` : ""}
                      </p>
                    </div>
                  </li>
                );
              })}
              {!platformOrgs.length ? (
                <li className="px-5 py-6 text-[15px] text-white/40">No organisations yet.</li>
              ) : null}
            </ul>
          </div>
        </WizardPane>
      ) : null}

      {stepId === "orgs-list" ? (
        <WizardPane
          eyebrow="Organisations"
          title="Organisations"
          subtitle="Manage partners on the platform. Create New starts the Preston North End provisioning flow."
          footer={
            <>
              <GhostButton onClick={() => go("home")}>Back</GhostButton>
              <PrimaryButton onClick={() => go("org-name")}>Create New</PrimaryButton>
            </>
          }
        >
          <div className="mb-5">
            <p className="text-[15px] text-white/50">
              {platformOrgs.length} organisation{platformOrgs.length === 1 ? "" : "s"}
            </p>
          </div>
          <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
            {platformOrgs.map((org) => (
              <li key={org.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/90 p-1.5">
                    {org.logoSrc ? (
                      <img
                        src={org.logoSrc}
                        alt=""
                        className="max-h-full max-w-full object-contain"
                        decoding="async"
                      />
                    ) : (
                      <span className="text-[12px] font-medium text-black/70">
                        {org.monogram || org.name.slice(0, 2)}
                      </span>
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[16px] text-white">{org.name}</p>
                    <p className="mt-0.5 text-[13px] text-white/45">
                      {ORG_TYPE_OPTIONS.find((o) => o.id === org.orgType)?.label ?? org.orgType}
                      {" · "}
                      {org.status ?? "active"}
                    </p>
                  </div>
                </div>
                <p className="text-[13px] text-white/40">
                  {org.seatsUsed}/{org.seats} seats
                </p>
              </li>
            ))}
          </ul>
        </WizardPane>
      ) : null}

      {stepId === "org-name" ? (
        <WizardPane
          eyebrow={anonymousMode ? "Create group" : "Create organisation"}
          title={anonymousMode ? "What’s this group called?" : "What's the organisation called?"}
          progress={anonymousMode ? undefined : <ProgressDots step={1} of={3} />}
          footer={
            <>
              <GhostButton onClick={goBack}>Back</GhostButton>
              <PrimaryButton
                onClick={() => (anonymousMode ? createOrganisation() : goNext())}
                disabled={!orgName.trim()}
              >
                Next
              </PrimaryButton>
            </>
          }
        >
          <label className="block max-w-lg">
            <span className={labelClass}>{anonymousMode ? "Group name" : "Organisation name"}</span>
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className={fieldClass}
              placeholder={anonymousMode ? "e.g. Direct access" : "e.g. Preston North End"}
              autoFocus
            />
          </label>
        </WizardPane>
      ) : null}

      {stepId === "org-details" ? (
        <WizardPane
          eyebrow="Create organisation"
          title="Add a few details"
          progress={<ProgressDots step={2} of={3} />}
          footer={
            <>
              <GhostButton onClick={goBack}>Back</GhostButton>
              <PrimaryButton onClick={goNext}>Next</PrimaryButton>
            </>
          }
        >
          <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Type</span>
              <select value={orgType} onChange={(e) => setOrgType(e.target.value)} className={fieldClass}>
                {ORG_TYPE_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={labelClass}>Primary contact</span>
              <input
                value={orgContact}
                onChange={(e) => setOrgContact(e.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className={labelClass}>Contact email</span>
              <input
                type="email"
                value={orgEmail}
                onChange={(e) => setOrgEmail(e.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className={labelClass}>Programme description</span>
              <textarea
                value={orgProgramme}
                onChange={(e) => setOrgProgramme(e.target.value)}
                rows={3}
                className={`${fieldClass} resize-y`}
              />
            </label>
          </div>
        </WizardPane>
      ) : null}

      {stepId === "org-branding" ? (
        <WizardPane
          eyebrow="Create organisation"
          title="Add logo"
          subtitle="This crest appears in Admin, invitations, and the Listener welcome lockup."
          progress={<ProgressDots step={3} of={3} />}
          footer={
            <>
              <GhostButton onClick={goBack}>Back</GhostButton>
              <PrimaryButton onClick={createOrganisation} disabled={!orgLogoSrc}>
                Next
              </PrimaryButton>
            </>
          }
        >
          <div className="max-w-2xl space-y-6">
            <div
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
              aria-label="Brand lockup preview"
            >
              <SystemLogoMark className="h-8 w-auto text-white" title="Sonocea" />
              <span className="text-[14px] text-white/35" aria-hidden>
                ×
              </span>
              {orgLogoSrc ? (
                <img
                  src={orgLogoSrc}
                  alt={orgName || "Organisation logo"}
                  className="h-10 w-auto max-w-[88px] object-contain"
                  decoding="async"
                />
              ) : (
                <span className="rounded-full border border-dashed border-white/20 px-3 py-2 text-[13px] text-white/35">
                  No logo yet
                </span>
              )}
            </div>

            {orgLogoSrc ? (
              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/10 px-4 py-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/90 p-1.5">
                  <img
                    src={orgLogoSrc}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                    decoding="async"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] text-white/90">Preston North End</span>
                  <span className="mt-0.5 block text-[12px] text-white/40">Logo added</span>
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOrgLogoSrc(PNE_LOGO_SRC)}
                className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-left transition-colors hover:border-white/25 sm:max-w-sm"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#005EB8] text-[28px] font-light leading-none text-white"
                  aria-hidden
                >
                  +
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] text-white/90">Add a logo</span>
                  <span className="mt-0.5 block text-[12px] text-white/40">Choose a file</span>
                </span>
              </button>
            )}
          </div>
        </WizardPane>
      ) : null}

      {stepId === "dashboard" ? (
        <WizardPane
          eyebrow="Organisations"
          title={orgName || defaultOrgName}
          subtitle="Organisation is live. Create a programme first - then invite your team so they see it on Listener home."
          footer={
            <>
              <GhostButton onClick={() => go("orgs-list")}>All organisations</GhostButton>
              <PrimaryButton onClick={() => go("programme-pick")}>Next</PrimaryButton>
            </>
          }
        >
          <div className="mb-8 flex max-w-2xl items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/90 p-2">
              {orgLogoSrc ? (
                <img
                  src={orgLogoSrc}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                  decoding="async"
                />
              ) : (
                <span className="text-[13px] font-medium text-black/70">PNE</span>
              )}
            </span>
            <div className="min-w-0">
              <p className="text-[13px] uppercase tracking-[0.12em] text-white/40">
                Organisation
              </p>
              <p className="mt-1 truncate text-[18px] font-medium text-white">
                {orgName || defaultOrgName}
              </p>
              <p className="mt-0.5 text-[14px] text-white/50">
                {ORG_TYPE_OPTIONS.find((o) => o.id === orgType)?.label ?? "Sport"}
                {" · Active"}
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric label="Programme" value="-" hint="Create to get started" />
            <Metric label="Team" value="0" hint="Invite after programme" />
            <Metric label="Invites sent" value="0" hint="-" />
          </div>
        </WizardPane>
      ) : null}

      {stepId === "programme-pick" ? (
        <WizardPane
          eyebrow="Create programme"
          title={`Choose a programme for ${orgName || defaultOrgName}`}
          subtitle="Preview what’s inside each template, customise the session sequence, or build a custom programme from scratch. Next assigns it to the organisation so it appears on Listener home."
          footer={
            <>
              <GhostButton onClick={() => go("dashboard")}>Back</GhostButton>
              <PrimaryButton
                onClick={() => {
                  setPreviewProgrammeId(selectedProgrammeId);
                  assignProgramme();
                }}
                disabled={!canAssignSelected}
              >
                Next
              </PrimaryButton>
            </>
          }
        >
          <div className="grid max-w-3xl gap-3">
            <button
              type="button"
              onClick={startCustomProgramme}
              className="rounded-2xl border border-dashed border-white/25 bg-white/[0.02] p-5 text-left transition hover:border-white/40 hover:bg-white/[0.04]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[17px] font-medium text-white">Create custom programme</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-white/55">
                    Start from scratch - name it, choose sessions, and set the morning / evening
                    sequence for {orgName || "your organisation"}.
                  </p>
                </div>
                <span className="rounded-full border border-white/20 px-3 py-1 text-[13px] text-white/70">
                  Build your own
                </span>
              </div>
            </button>

            {PROGRAMME_TEMPLATES.map((template) => {
              const actionable = Boolean(template.actionablePartnerId);
              const selected = selectedProgrammeId === template.id && !programmeDraft?.isCustom;
              const expanded = expandedPickId === template.id;
              const sessions = sessionsForProgrammeTemplate(template, catalog);
              const morningCount = sessions.filter((s) => s.timeOfDay === "morning").length;
              const eveningCount = sessions.filter((s) => s.timeOfDay === "evening").length;
              const totalMin = programmeTotalMinutes(sessions);
              const isCustomised =
                programmeDraft?.customized && programmeDraft.sourceTemplateId === template.id;

              return (
                <div
                  key={template.id}
                  className={`rounded-2xl border transition ${
                    selected
                      ? "border-white/40 bg-white/[0.08]"
                      : expanded
                        ? "border-white/25 bg-white/[0.04]"
                        : "border-white/10 bg-transparent hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => selectProgrammeTemplate(template)}
                    className="w-full p-5 text-left"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[17px] font-medium text-white">{template.title}</p>
                          {actionable ? (
                            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[12px] uppercase tracking-[0.08em] text-emerald-100/90">
                              Assignable
                            </span>
                          ) : (
                            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[12px] uppercase tracking-[0.08em] text-white/40">
                              Preview only
                            </span>
                          )}
                          {isCustomised ? (
                            <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-[12px] uppercase tracking-[0.08em] text-sky-100/90">
                              Customised
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-[14px] text-white/45">
                          {template.subtitle} · For {template.partnerLabel}
                        </p>
                        <p className="mt-2 text-[15px] leading-relaxed text-white/60">
                          {template.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] text-white/40">{sessions.length} sessions</p>
                        <p className="mt-1 text-[13px] text-white/35">{totalMin} min total</p>
                        <p className="mt-1 text-[13px] text-white/35">{template.structure}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[14px] text-white/45">
                      <span>{template.audience}</span>
                      <span className="text-white/20">·</span>
                      <span>{template.cadence}</span>
                      <span className="text-white/20">·</span>
                      <span>
                        {morningCount} morning · {eveningCount} evening
                      </span>
                    </div>

                    {template.outcomes?.length ? (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {template.outcomes.map((outcome) => (
                          <li
                            key={outcome}
                            className="rounded-full border border-white/10 px-2.5 py-1 text-[13px] text-white/50"
                          >
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </button>

                  {expanded ? (
                    <div className="border-t border-white/10 px-5 pb-5 pt-4">
                      <p className={labelClass}>Session sequence</p>
                      <ol className="mt-3 space-y-2">
                        {sessions.map((session, index) => (
                          <li
                            key={session.id}
                            className="flex items-start justify-between gap-3 rounded-xl border border-white/8 bg-black/20 px-3 py-2.5"
                          >
                            <div className="min-w-0">
                              <p className="text-[15px] text-white/90">
                                <span className="text-white/35">{index + 1}. </span>
                                {session.title}
                                <span className="ml-2 text-[13px] capitalize text-white/35">
                                  {session.timeOfDay}
                                </span>
                              </p>
                              <p className="mt-0.5 text-[13px] text-white/40">
                                {session.summary || session.useCase || session.category}
                              </p>
                            </div>
                            <span className="shrink-0 text-[13px] text-white/40">
                              {session.durationMin} min
                            </span>
                          </li>
                        ))}
                      </ol>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <GhostButton onClick={() => startCustomise(template)}>
                          Customise
                        </GhostButton>
                        {actionable ? (
                          <PrimaryButton
                            onClick={() => {
                              setSelectedProgrammeId(template.id);
                              setPreviewProgrammeId(template.id);
                              if (!isCustomised) setProgrammeDraft(null);
                              assignProgramme({
                                templateOverride: isCustomised ? programmeDraft : template,
                              });
                            }}
                          >
                            Use this programme
                          </PrimaryButton>
                        ) : (
                          <PrimaryButton onClick={() => startCustomise(template)}>
                            Customise for {orgName || "your org"}
                          </PrimaryButton>
                        )}
                      </div>
                      {!actionable ? (
                        <p className="mt-3 text-[14px] text-white/35">
                          Built for {template.partnerLabel} - customise it to assign a version to{" "}
                          {orgName || defaultOrgName}.
                        </p>
                      ) : (
                        <p className="mt-3 text-[14px] text-emerald-100/70">
                          Ready to assign to {orgName || defaultOrgName} - or customise the
                          sequence first.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProgrammeId(template.id);
                          setExpandedPickId(template.id);
                          setPreviewProgrammeId(template.id);
                        }}
                        className="text-[14px] text-white/55 underline-offset-2 hover:text-white hover:underline"
                      >
                        Preview sessions
                      </button>
                      <span className="text-white/20">·</span>
                      <button
                        type="button"
                        onClick={() => startCustomise(template)}
                        className="text-[14px] text-white/55 underline-offset-2 hover:text-white hover:underline"
                      >
                        Customise
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </WizardPane>
      ) : null}

      {stepId === "programme-customize" ? (
        <WizardPane
          eyebrow="Create programme"
          title={
            programmeDraft?.isCustom
              ? "Build a custom programme"
              : `Customise ${programmeDraft?.title || "programme"}`
          }
          subtitle={
            programmeDraft?.isCustom
              ? `Name the programme and pick the sessions Listeners will see on home for ${orgName || defaultOrgName}.`
              : `Adjust the title, description, and session sequence before assigning to ${orgName || defaultOrgName}.`
          }
          footer={
            <>
              <GhostButton
                onClick={() => {
                  if (programmeDraft?.isCustom) setProgrammeDraft(null);
                  go("programme-pick");
                }}
              >
                Back
              </GhostButton>
              <PrimaryButton
                onClick={() => assignProgramme({ templateOverride: programmeDraft })}
                disabled={!customiseReady}
              >
                Next
              </PrimaryButton>
            </>
          }
        >
          {!programmeDraft ? (
            <Panel className="max-w-3xl">
              <p className="text-[15px] text-white/50">
                No programme draft yet.{" "}
                <button
                  type="button"
                  className="underline"
                  onClick={() => go("programme-pick")}
                >
                  Choose a template
                </button>{" "}
                or create a custom programme.
              </p>
            </Panel>
          ) : (
            <div className="grid max-w-4xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <label className="block">
                  <span className={labelClass}>Programme title</span>
                  <input
                    value={programmeDraft.title}
                    onChange={(e) => patchDraft({ title: e.target.value })}
                    className={fieldClass}
                    placeholder="e.g. Squad recovery week"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Description</span>
                  <textarea
                    value={programmeDraft.description}
                    onChange={(e) => patchDraft({ description: e.target.value })}
                    className={`${fieldClass} min-h-[88px] resize-y`}
                    placeholder="What Listeners should expect from this programme"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Structure label</span>
                  <input
                    value={programmeDraft.structure}
                    onChange={(e) => patchDraft({ structure: e.target.value })}
                    className={fieldClass}
                    placeholder="e.g. Structured sequence"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Cadence</span>
                  <input
                    value={programmeDraft.cadence || ""}
                    onChange={(e) => patchDraft({ cadence: e.target.value })}
                    className={fieldClass}
                    placeholder="e.g. Daily · morning + evening"
                  />
                </label>

                <fieldset>
                  <legend className={labelClass}>Sessions in programme</legend>
                  <p className="mt-2 text-[14px] text-white/40">
                    Select the sessions to include. Order follows the catalog morning → evening
                    sequence on Listener home.
                  </p>
                  <ul className="mt-3 grid max-h-[22rem] gap-2 overflow-y-auto sm:grid-cols-2">
                    {catalog.map((session) => {
                      const on = programmeDraft.sessionIds.includes(session.id);
                      return (
                        <li key={session.id}>
                          <label
                            className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                              on
                                ? "border-white/35 bg-white/[0.08]"
                                : "border-white/10 bg-transparent hover:border-white/20"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={on}
                              onChange={() => toggleDraftSession(session.id)}
                              className="mt-1 accent-white"
                            />
                            <span className="min-w-0">
                              <span className="block text-[15px] text-white/90">{session.title}</span>
                              <span className="mt-0.5 block text-[13px] text-white/40">
                                {session.durationMin} min · {session.timeOfDay} ·{" "}
                                {session.useCase || session.category}
                              </span>
                              <span className="mt-1 block text-[13px] leading-snug text-white/45">
                                {session.summary}
                              </span>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </fieldset>
              </div>

              <div className="space-y-4">
                <Panel>
                  <p className={labelClass}>Live preview</p>
                  <p className="mt-3 text-[17px] font-medium text-white">
                    {programmeDraft.title.trim() || "Untitled programme"}
                  </p>
                  <p className="mt-1 text-[14px] text-white/45">
                    {programmeDraft.structure} · {programmeDraft.sessionIds.length} sessions ·{" "}
                    {programmeTotalMinutes(draftSessions)} min
                  </p>
                  {programmeDraft.description ? (
                    <p className="mt-3 text-[15px] leading-relaxed text-white/55">
                      {programmeDraft.description}
                    </p>
                  ) : null}
                  <div className="mt-4 space-y-1 text-[14px] text-white/40">
                    <p>For {orgName || defaultOrgName}</p>
                    {programmeDraft.cadence ? <p>{programmeDraft.cadence}</p> : null}
                  </div>
                </Panel>
                <SequenceColumn label="Morning" sessions={draftMorning} />
                <SequenceColumn label="Evening" sessions={draftEvening} />
              </div>
            </div>
          )}
        </WizardPane>
      ) : null}

      {stepId === "dashboard-programme" ? (
        <WizardPane
          eyebrow="Dashboard"
          title={`${selectedTemplate?.title ?? "Programme"} is ready`}
          subtitle={`Assigned to ${orgName || defaultOrgName}. Next, choose the team members to invite - typically a full squad of around 30.`}
          footer={
            <>
              <GhostButton onClick={() => go("programme-detail")}>View programme</GhostButton>
              <PrimaryButton onClick={() => go("users-method")}>Next</PrimaryButton>
            </>
          }
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric
              label="Programme"
              value="1"
              hint={selectedTemplate?.title ?? "-"}
            />
            <Metric label="Team" value="0" hint="Ready to invite" />
            <Metric label="Invites sent" value="0" hint="Choose email or SMS" />
          </div>
        </WizardPane>
      ) : null}

      {stepId === "users-method" ? (
        <WizardPane
          eyebrow="Invite team"
          title="How do you want to add the team?"
          subtitle="For a squad of ~30, CSV is usually fastest. The demo can load a full first-team / academy list."
          footer={
            <>
              <GhostButton onClick={() => go("dashboard-programme")}>Back</GhostButton>
              <PrimaryButton
                onClick={() => {
                  loadDemoRoster();
                  go("users-enter");
                }}
              >
                Next
              </PrimaryButton>
            </>
          }
        >
          <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                loadDemoRoster();
                go("users-enter");
              }}
              className="rounded-2xl border border-white/40 bg-white/[0.08] p-6 text-left transition hover:border-white/55 hover:bg-white/[0.1]"
            >
              <p className="text-[13px] uppercase tracking-[0.12em] text-emerald-100/70">Recommended</p>
              <p className="mt-2 text-[17px] font-medium text-white">Upload CSV</p>
              <p className="mt-2 text-[15px] text-white/45">
                Import name, email, and mobile for the whole squad. Mark org admins after import. Demo loads 30 people.
              </p>
            </button>
            <button
              type="button"
              onClick={() => {
                setRosterSource("manual");
                setUserRows([
                  { ...EMPTY_USER_ROW },
                  { ...EMPTY_USER_ROW },
                  { ...EMPTY_USER_ROW },
                ]);
                go("users-enter");
              }}
              className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 text-left transition hover:border-white/35 hover:bg-white/[0.07]"
            >
              <p className="text-[17px] font-medium text-white">Add manually</p>
              <p className="mt-2 text-[15px] text-white/45">
                Enter names, emails, and mobiles one by one - better for a small top-up.
              </p>
            </button>
          </div>
        </WizardPane>
      ) : null}

      {stepId === "users-enter" ? (
        <WizardPane
          eyebrow={anonymousMode ? "Send invites" : "Invite team"}
          title={
            anonymousMode
              ? "Who should we invite?"
              : rosterSource === "csv"
                ? "Review imported team"
                : "Enter team details"
          }
          subtitle={
            anonymousMode
              ? `${validUsers.length} people ready for private Sonocea invites. Include mobile numbers if you’ll invite by SMS.`
              : `${validUsers.length} people with contact details. Mark org admins, and include mobile numbers if you’ll invite by SMS.`
          }
          footer={
            <>
              <GhostButton onClick={goBack}>Back</GhostButton>
              <PrimaryButton
                onClick={() => {
                  if (anonymousMode) {
                    saveUsers();
                    return;
                  }
                  goNext();
                }}
                disabled={!validUsers.length}
              >
                Next
              </PrimaryButton>
            </>
          }
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[14px] text-white/45">
              {anonymousMode
                ? `${validUsers.length} anonymous listeners`
                : `${rosterSource === "csv" ? "Demo CSV · first-team & academy" : "Manual entry"} · ${validUsers.length} of ~30 seats`}
              {!anonymousMode && userRows.some((u) => u.isAdmin) ? (
                <> · {userRows.filter((u) => u.isAdmin).length} admin{userRows.filter((u) => u.isAdmin).length === 1 ? "" : "s"}</>
              ) : null}
            </p>
            {rosterSource === "manual" ? (
              <button
                type="button"
                className="text-[14px] text-white/55 underline-offset-2 hover:underline"
                onClick={loadDemoRoster}
              >
                Load demo team of 30
              </button>
            ) : null}
          </div>
          <div className="max-h-[22rem] max-w-5xl space-y-2 overflow-y-auto pr-1">
            <div
              className="sticky top-0 z-10 grid grid-cols-[1.2fr_1.2fr_1fr_4.5rem] gap-3 pb-2 text-[12px] uppercase tracking-[0.12em] text-white/35"
              style={{ backgroundColor: ADMIN_DESKTOP.surface }}
            >
              <span>Name</span>
              <span>Email</span>
              <span>Mobile</span>
              <span className="text-center">Admin</span>
            </div>
            {userRows.map((row, index) => (
              <div key={index} className="grid items-center gap-3 sm:grid-cols-[1.2fr_1.2fr_1fr_4.5rem]">
                <input
                  value={row.name}
                  onChange={(e) => {
                    const next = [...userRows];
                    next[index] = { ...next[index], name: e.target.value };
                    setUserRows(next);
                  }}
                  className={fieldClass}
                  placeholder="Full name"
                />
                <input
                  value={row.email}
                  onChange={(e) => {
                    const next = [...userRows];
                    next[index] = { ...next[index], email: e.target.value };
                    setUserRows(next);
                  }}
                  className={fieldClass}
                  placeholder="Email"
                />
                <input
                  value={row.phone}
                  onChange={(e) => {
                    const next = [...userRows];
                    next[index] = { ...next[index], phone: e.target.value };
                    setUserRows(next);
                  }}
                  className={fieldClass}
                  placeholder="Mobile"
                />
                <label className="flex cursor-pointer items-center justify-center py-2">
                  <span className="sr-only">Admin for {row.name || `row ${index + 1}`}</span>
                  <input
                    type="checkbox"
                    checked={Boolean(row.isAdmin)}
                    onChange={() => toggleUserAdmin(index)}
                    className="h-4 w-4 rounded border-white/30 bg-black/40"
                  />
                </label>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 text-[14px] text-white/55 underline-offset-2 hover:underline"
            onClick={() => setUserRows((rows) => [...rows, { ...EMPTY_USER_ROW }])}
          >
            + Add another person
          </button>
        </WizardPane>
      ) : null}

      {stepId === "users-review" ? (
        <WizardPane
          eyebrow="Invite team"
          title="Who should receive an invite?"
          subtitle="Select everyone who should join this programme. Tap Admin or Listener to set org access before choosing how to invite them."
          footer={
            <>
              <GhostButton onClick={goBack}>Back</GhostButton>
              <PrimaryButton onClick={saveUsers} disabled={!selectedUsers.length}>
                Next
              </PrimaryButton>
            </>
          }
        >
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-white/20 px-3 py-1.5 text-[14px] text-white/70 hover:border-white/40"
              onClick={() => setAllSelected(true)}
            >
              Select all ({validUsers.length})
            </button>
            <button
              type="button"
              className="rounded-full border border-white/15 px-3 py-1.5 text-[14px] text-white/50 hover:border-white/30"
              onClick={() => setAllSelected(false)}
            >
              Clear
            </button>
            <span className="text-[14px] text-white/40">
              {selectedUsers.length} selected
            </span>
          </div>
          <ul className="max-h-[22rem] max-w-2xl divide-y divide-white/10 overflow-y-auto rounded-2xl border border-white/10">
            {userRows.map((u, index) => {
              if (!u.name.trim() || (!u.email.trim() && !u.phone.trim())) return null;
              const checked = u.selected !== false;
              return (
                <li key={`${u.email}-${u.phone}-${index}`}>
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03]">
                    <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleUserSelected(index)}
                        className="h-4 w-4 rounded border-white/30 bg-black/40"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[16px] text-white">{u.name}</p>
                        <p className="truncate text-[14px] text-white/45">
                          {[u.email, u.phone].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleUserAdmin(index)}
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[13px] transition ${
                        u.isAdmin
                          ? "border-white/35 bg-white/[0.08] text-white"
                          : "border-white/15 text-white/55 hover:border-white/30"
                      }`}
                      aria-pressed={Boolean(u.isAdmin)}
                    >
                      {u.isAdmin ? "Admin" : "Listener"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </WizardPane>
      ) : null}

      {stepId === "invite-channel" ? (
        <WizardPane
          eyebrow="Send invites"
          title="How should we invite them?"
          subtitle={
            anonymousMode
              ? `Choose how to send private Sonocea invites to ${selectedUsers.length} listener${selectedUsers.length === 1 ? "" : "s"}.`
              : `Choose a channel for ${selectedUsers.length} selected team member${selectedUsers.length === 1 ? "" : "s"}.`
          }
          footer={
            <>
              <GhostButton onClick={() => go(anonymousMode ? "users-enter" : "users-review")}>
                Back
              </GhostButton>
              <PrimaryButton onClick={() => go("invite-review")}>Next</PrimaryButton>
            </>
          }
        >
          <div className="grid max-w-2xl gap-3">
            {INVITE_CHANNELS.map((channel) => {
              const active = inviteChannel === channel.id;
              return (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => setInviteChannel(channel.id)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    active
                      ? "border-white/40 bg-white/[0.08]"
                      : "border-white/10 bg-transparent hover:border-white/25"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[17px] font-medium text-white">{channel.label}</p>
                    <span
                      className={`h-4 w-4 rounded-full border ${
                        active ? "border-white bg-white" : "border-white/30"
                      }`}
                    />
                  </div>
                  <p className="mt-2 text-[15px] text-white/45">{channel.description}</p>
                </button>
              );
            })}
          </div>
          <Panel className="mt-6 max-w-2xl">
            <p className="text-[15px] text-white/55">
              {inviteChannel === "email"
                ? "Each person needs an email address. Mobile is optional."
                : inviteChannel === "sms"
                  ? "Each person needs a mobile number. Email is optional."
                  : "Each person needs both an email and a mobile number to be included."}
            </p>
          </Panel>
        </WizardPane>
      ) : null}

      {stepId === "invite-review" ? (
        <WizardPane
          eyebrow="Send invites"
          title="Confirm and send"
          subtitle={`${inviteCount} invite${inviteCount === 1 ? "" : "s"} via ${channelLabel.toLowerCase()} for ${selectedTemplate?.title ?? "this programme"}.`}
          footer={
            <>
              <GhostButton onClick={goBack}>Back</GhostButton>
              <PrimaryButton onClick={sendInvites} disabled={!inviteCount}>
                Next
              </PrimaryButton>
            </>
          }
        >
          <Panel className="mb-5 max-w-2xl space-y-3">
            <Row label="Channel" value={channelLabel} />
            <Row label="Programme" value={selectedTemplate?.title ?? "-"} />
            <Row label="Organisation" value={orgName || defaultOrgName} />
            <Row
              label="Ready to send"
              value={`${inviteCount} of ${selectedUsers.length} selected`}
            />
            {skippedForChannel > 0 ? (
              <p className="text-[14px] text-amber-100/75">
                {skippedForChannel} person{skippedForChannel === 1 ? "" : "s"} skipped - missing{" "}
                {inviteChannel === "sms"
                  ? "mobile number"
                  : inviteChannel === "email"
                    ? "email"
                    : "email or mobile"}{" "}
                for {channelLabel.toLowerCase()}.
              </p>
            ) : null}
          </Panel>
          <ul className="max-h-[16rem] max-w-2xl divide-y divide-white/10 overflow-y-auto rounded-2xl border border-white/10">
            {channelReadyUsers.map((u) => (
              <li
                key={`${u.email}-${u.phone}`}
                className="flex items-center justify-between gap-3 px-5 py-3"
              >
                <div className="min-w-0">
                  <p className="text-[16px] text-white">{u.name}</p>
                  <p className="truncate text-[14px] text-white/45">
                    {inviteChannel === "sms"
                      ? u.phone
                      : inviteChannel === "email"
                        ? u.email
                        : `${u.email} · ${u.phone}`}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-amber-400/25 px-2.5 py-1 text-[13px] text-amber-100/80">
                  Pending
                </span>
              </li>
            ))}
          </ul>
        </WizardPane>
      ) : null}

      {stepId === "invites-sent" ? (
        <WizardPane
          eyebrow="Send invites"
          title="Invites sent"
          subtitle={`${inviteCount} ${channelLabel.toLowerCase()} invitation${inviteCount === 1 ? "" : "s"} queued for delivery.`}
          footer={
            <>
              <GhostButton onClick={() => go("invite-review")}>Back to review</GhostButton>
              <PrimaryButton onClick={handoffToListener}>Next</PrimaryButton>
            </>
          }
        >
          <Panel className="max-w-md border-emerald-400/20 bg-emerald-400/[0.06]">
            <p className="text-[16px] text-emerald-100/90">
              {channelLabel} invites are on their way. When Listeners redeem them, they’ll land in{" "}
              {selectedTemplate?.title ?? "the programme"} on their home screen.
            </p>
          </Panel>
        </WizardPane>
      ) : null}

      {stepId === "dashboard-live" ? (
        <WizardPane
          eyebrow="Dashboard"
          title={orgName || defaultOrgName}
          subtitle={`${selectedTemplate?.title ?? "Programme"} is live - ${inviteCount || selectedUsers.length} invited Listeners will see it on home.`}
          footer={
            <>
              <GhostButton onClick={() => go("programme-detail")}>View programme</GhostButton>
              <PrimaryButton onClick={() => go("handoff")}>Next</PrimaryButton>
            </>
          }
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric
              label="Programme"
              value={programmeAssigned ? "1" : "0"}
              hint={selectedTemplate?.title ?? "-"}
            />
            <Metric
              label="Team"
              value={String(selectedUsers.length || validUsers.length || 0)}
              hint="In team"
            />
            <Metric
              label="Invites"
              value={invitesSent ? String(inviteCount || selectedUsers.length) : "0"}
              hint={invitesSent ? `Via ${channelLabel.toLowerCase()}` : "Pending"}
            />
          </div>
        </WizardPane>
      ) : null}

      {stepId === "programme-detail" ? (
        <WizardPane
          eyebrow="Programmes"
          title={selectedTemplate?.title || "Post-Training Recovery"}
          subtitle={`Assigned to ${orgName || defaultOrgName} · ${assignedSessions.length} sessions · appears on Listener home`}
          footer={
            <>
              <GhostButton onClick={() => go(dashboardStepId())}>Dashboard</GhostButton>
              {invitesSent ? (
                <PrimaryButton onClick={() => go("handoff")}>Next</PrimaryButton>
              ) : (
                <PrimaryButton onClick={() => go("users-method")}>Next</PrimaryButton>
              )}
            </>
          }
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <SequenceColumn label="Morning" sessions={assignedSessions.filter((s) => s.timeOfDay === "morning")} />
              <SequenceColumn label="Evening" sessions={assignedSessions.filter((s) => s.timeOfDay === "evening")} />
            </div>
            <Panel>
              <p className={labelClass}>Assignment</p>
              <div className="mt-4 space-y-3">
                <Row label="Partner" value={orgName || defaultOrgName} />
                <Row label="Status" value="Live on Listener home" />
                <Row
                  label="Invite status"
                  value={
                    selectedUsers.length
                      ? `${selectedUsers.length} selected · ${invitesSent ? `sent via ${channelLabel.toLowerCase()}` : "not sent yet"}`
                      : "No participants yet"
                  }
                />
              </div>
              {selectedUsers.length ? (
                <ul className="mt-5 max-h-48 space-y-2 overflow-y-auto border-t border-white/10 pt-4">
                  {selectedUsers.slice(0, 12).map((u) => (
                    <li key={`${u.email}-${u.phone}`} className="flex justify-between gap-2 text-[15px]">
                      <span className="text-white/80">{u.name}</span>
                      <span className="text-white/40">
                        {u.isAdmin ? "Admin" : "Listener"}
                        {invitesSent ? " · Invited" : ""}
                      </span>
                    </li>
                  ))}
                  {selectedUsers.length > 12 ? (
                    <li className="text-[14px] text-white/35">
                      +{selectedUsers.length - 12} more
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </Panel>
          </div>
        </WizardPane>
      ) : null}

      {showShell &&
      ![
        "home",
        "orgs-list",
        "org-name",
        "org-details",
        "org-branding",
        "dashboard",
        "programme-pick",
        "programme-customize",
        "dashboard-programme",
        "users-method",
        "users-enter",
        "users-review",
        "invite-channel",
        "invite-review",
        "invites-sent",
        "dashboard-live",
        "programme-detail",
      ].includes(stepId) ? (
        <WizardPane
          eyebrow="Admin"
          title="Unknown step"
          footer={<PrimaryButton onClick={() => go("login")}>Restart</PrimaryButton>}
        >
          <p className="text-[15px] text-white/50">Step “{stepId}” is not defined.</p>
        </WizardPane>
      ) : null}
    </DesktopFrame>
  );
}

function DesktopFrame({ children, sidebar, bare, partnerLogoSrc, partnerName }) {
  return (
    <AdminDesktopFrame
      sidebar={sidebar}
      bare={bare}
      partnerLogoSrc={partnerLogoSrc}
      partnerName={partnerName}
    >
      {children}
    </AdminDesktopFrame>
  );
}

function AdminSidebar({ active, onNavigate }) {
  return (
    <aside className="flex h-full w-[14rem] shrink-0 flex-col overflow-y-auto bg-black/30 px-3.5 py-6">
      <p className="px-2.5 text-[15px] font-semibold tracking-tight text-white">Sonocea Admin</p>
      <nav className="mt-5 space-y-1" aria-label="Admin">
        {SIDEBAR.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`flex w-full rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors ${
              active === item.id
                ? "bg-white text-black"
                : "text-white/45 hover:bg-white/[0.05] hover:text-white/75"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function WizardPane({ eyebrow, title, subtitle, progress, children, footer }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-7 py-7 md:px-10 md:py-9">
        <p className={labelClass}>{eyebrow}</p>
        {progress ? <div className="mt-4 max-w-sm">{progress}</div> : null}
        <h1 className="mt-4 text-[1.85rem] font-medium tracking-tight text-white md:text-[2.15rem]">
          {title}
        </h1>
        {subtitle ? <p className="mt-2.5 max-w-2xl text-[17px] leading-relaxed text-white/50">{subtitle}</p> : null}
        <div className="mt-8">{children}</div>
      </div>
      {footer ? (
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 px-7 py-5 md:px-10">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div>
      <p className={labelClass}>{label}</p>
      <p className="mt-1.5 text-[16px] leading-snug text-white/85">{value}</p>
    </div>
  );
}

function Metric({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className={labelClass}>{label}</p>
      <p className="mt-3 text-[2rem] font-medium text-white">{value}</p>
      {hint ? <p className="mt-1 text-[15px] text-white/40">{hint}</p> : null}
    </div>
  );
}

function SequenceColumn({ label, sessions }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className={labelClass}>{label}</p>
      {sessions.length ? (
        <ol className="mt-3 space-y-2.5">
          {sessions.map((session, index) => (
            <li
              key={session.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-white/8 bg-black/20 px-3.5 py-3"
            >
              <div className="min-w-0">
                <p className="text-[17px] text-white/90">
                  <span className="text-white/35">{index + 1}. </span>
                  {session.title}
                </p>
                <p className="mt-0.5 text-[15px] text-white/40">
                  {session.summary || session.useCase || session.category}
                </p>
              </div>
              <span className="shrink-0 text-[15px] text-white/40">{session.durationMin} min</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-3 text-[16px] text-white/35">No sessions in this block.</p>
      )}
    </div>
  );
}
