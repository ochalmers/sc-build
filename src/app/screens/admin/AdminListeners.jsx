import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  APPEARANCE_OPTIONS,
  LISTENER_STATUS_OPTIONS,
  NEUROTYPE_OPTIONS,
  ONBOARDING_IDENTITY_OPTIONS,
  ONBOARDING_LISTEN_TIMES,
  ONBOARDING_MOOD_OPTIONS,
  ONBOARDING_SENSORY_OPTIONS,
  ONBOARDING_SUPPORT_OPTIONS,
  emptyListenerProfile,
  formatDuration,
  labelForOption,
} from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { AppChrome } from "../../components/AppChrome.jsx";
import { AdminNav, Chip, TabPill, fieldClass, labelClass, toggleInList } from "./adminShared.jsx";

function listenerDisplayName(l) {
  if (l.isAnonymous) return "Private account";
  return l.displayName || l.name || l.email || "Listener";
}

export function AdminListeners() {
  const {
    listeners,
    partners,
    catalog,
    listenHistory,
    feedback,
    upsertListener,
  } = useAppStore();
  const [searchParams] = useSearchParams();
  const paramId = searchParams.get("id");
  const createParam = searchParams.get("create") === "1";

  const [query, setQuery] = useState("");
  const [orgFilter, setOrgFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(paramId || listeners[0]?.id || "");
  const [creating, setCreating] = useState(createParam);
  const [savedFlash, setSavedFlash] = useState(false);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (createParam) {
      setCreating(true);
      setDraft(
        emptyListenerProfile({
          id: `lis-${Date.now()}`,
          name: "",
          email: "",
          partnerId: partners[0]?.id ?? "",
          inviteCode: "",
          status: "invited",
        }),
      );
    } else if (paramId) {
      setCreating(false);
      setSelectedId(paramId);
      setDraft(null);
    }
  }, [createParam, paramId, partners]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listeners.filter((l) => {
      if (orgFilter !== "all" && l.partnerId !== orgFilter) return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      const hay = [l.name, l.displayName, l.email, l.inviteCode, l.notes]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [listeners, query, orgFilter, statusFilter]);

  const selected = creating
    ? null
    : listeners.find((l) => l.id === selectedId) ?? filtered[0] ?? listeners[0];

  const activeDraft = creating ? draft : draft?.id === selected?.id ? draft : selected;

  function openListener(id) {
    setCreating(false);
    setSelectedId(id);
    setDraft(null);
  }

  function startCreate() {
    setCreating(true);
    setDraft(
      emptyListenerProfile({
        id: `lis-${Date.now()}`,
        name: "",
        email: "",
        partnerId: partners[0]?.id ?? "",
        inviteCode: "",
        status: "invited",
      }),
    );
  }

  function patchDraft(patch) {
    const base = creating
      ? draft
      : draft?.id === selected?.id
        ? draft
        : selected;
    if (!base) return;
    setDraft({ ...base, ...patch });
  }

  function toggleMulti(field, id) {
    const base = creating ? draft : draft?.id === selected?.id ? draft : selected;
    if (!base) return;
    setDraft({ ...base, [field]: toggleInList(base[field] ?? [], id) });
  }

  function saveListener(e) {
    e.preventDefault();
    const source = creating ? draft : draft?.id === selected?.id ? draft : selected;
    if (!source?.name?.trim() && !source?.email?.trim()) return;
    const partner = partners.find((p) => p.id === source.partnerId);
    const code =
      source.inviteCode?.trim() ||
      `${(partner?.name ?? "ORG").split(" ")[0].toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    const next = {
      ...emptyListenerProfile(),
      ...source,
      name: source.name?.trim() || source.email?.split("@")[0] || "Listener",
      email: source.email?.trim() || `${code.toLowerCase()}@invite.sonocea.local`,
      inviteCode: code,
      displayName: source.displayName?.trim() || null,
      neurotypeId: source.neurotypeId || null,
      sensoryId: source.sensoryId ?? null,
      moodIds: source.moodIds ?? [],
      supportIds: source.supportIds ?? [],
    };
    upsertListener(next);
    setCreating(false);
    setSelectedId(next.id);
    setDraft(null);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1600);
  }

  const historyFor = useMemo(() => {
    if (!activeDraft?.id) return [];
    return listenHistory.filter((h) => h.listenerId === activeDraft.id).slice(0, 12);
  }, [listenHistory, activeDraft?.id]);

  const feedbackFor = useMemo(() => {
    if (!activeDraft?.id) return [];
    // Feedback rows don't always carry listenerId - match via session history timing / session set
    const sessionIds = new Set(historyFor.map((h) => h.sessionId));
    return feedback
      .filter((f) => sessionIds.has(f.sessionId) || f.listenerId === activeDraft.id)
      .slice(0, 8);
  }, [feedback, historyFor, activeDraft?.id]);

  const listenCount = historyFor.filter((h) => h.progressPct >= 90).length;

  return (
    <AppChrome
      title="Participants"
      subtitle="Full participant profiles - the same identity, context, outcomes, timing, and appearance fields collected in onboarding."
      sidebar={<AdminNav />}
    >
      <div className="mb-6 flex flex-wrap items-end gap-3">
        <label className="block min-w-[200px] flex-1">
          <span className={labelClass}>Search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={fieldClass}
            placeholder="Name, email, invite code…"
          />
        </label>
        <label className="block w-full sm:w-44">
          <span className={labelClass}>Organization</span>
          <select value={orgFilter} onChange={(e) => setOrgFilter(e.target.value)} className={fieldClass}>
            <option value="all">All organizations</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block w-full sm:w-36">
          <span className={labelClass}>Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={fieldClass}
          >
            <option value="all">All</option>
            {LISTENER_STATUS_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black"
        >
          Add Listener
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 self-start max-h-[70vh] overflow-y-auto">
          {filtered.map((l) => {
            const org = partners.find((p) => p.id === l.partnerId);
            const active = !creating && selected?.id === l.id;
            return (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => openListener(l.id)}
                  className={`flex w-full flex-col gap-1 px-5 py-4 text-left ${active ? "bg-white/[0.06]" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[14px] text-white">{listenerDisplayName(l)}</p>
                    <Chip tone={l.status === "active" ? "ok" : "muted"}>{l.status}</Chip>
                  </div>
                  <p className="text-[12px] text-white/45">
                    {l.isAnonymous ? "Anonymous" : l.email} · {org?.name ?? "No org"}
                  </p>
                  <p className="text-[11px] text-white/35">
                    {l.onboardingComplete ? "Onboarded" : "Not onboarded"}
                    {l.neurotypeId
                      ? ` · ${labelForOption(NEUROTYPE_OPTIONS, l.neurotypeId)}`
                      : ""}
                  </p>
                </button>
              </li>
            );
          })}
          {!filtered.length ? (
            <li className="px-5 py-8 text-[13px] text-white/40">No Listeners match these filters.</li>
          ) : null}
        </ul>

        {activeDraft ? (
          <form onSubmit={saveListener} className="space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div>
                <p className={labelClass}>{creating ? "New Listener" : "Listener profile"}</p>
                <h2 className="mt-2 text-[1.25rem] font-medium text-white">
                  {creating ? "Create Listener" : listenerDisplayName(activeDraft)}
                </h2>
                <p className="mt-1 text-[12px] text-white/45">
                  Mirrors fields collected on the Listener onboarding path.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!creating ? (
                  <Link
                    to="/app/admin/organizations"
                    className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-white/70 hover:border-white/35"
                  >
                    View organization
                  </Link>
                ) : null}
                <button
                  type="submit"
                  className="rounded-full bg-white px-5 py-2 text-[12px] font-medium text-black"
                >
                  {creating ? "Create Listener" : savedFlash ? "Saved" : "Save profile"}
                </button>
              </div>
            </div>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[14px] font-medium text-white">Account</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>Full name</span>
                  <input
                    value={activeDraft.name ?? ""}
                    onChange={(e) => patchDraft({ name: e.target.value })}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Preferred name</span>
                  <input
                    value={activeDraft.displayName ?? ""}
                    onChange={(e) => patchDraft({ displayName: e.target.value })}
                    className={fieldClass}
                    placeholder="Shown in the app"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Email</span>
                  <input
                    type="email"
                    value={activeDraft.email ?? ""}
                    onChange={(e) => patchDraft({ email: e.target.value })}
                    className={fieldClass}
                    disabled={Boolean(activeDraft.isAnonymous)}
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Invite code</span>
                  <input
                    value={activeDraft.inviteCode ?? ""}
                    onChange={(e) => patchDraft({ inviteCode: e.target.value.toUpperCase() })}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Organization</span>
                  <select
                    value={activeDraft.partnerId ?? ""}
                    onChange={(e) => patchDraft({ partnerId: e.target.value })}
                    className={fieldClass}
                  >
                    {partners.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className={labelClass}>Status</span>
                  <select
                    value={activeDraft.status ?? "invited"}
                    onChange={(e) => patchDraft({ status: e.target.value })}
                    className={fieldClass}
                  >
                    {LISTENER_STATUS_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-[13px] text-white/75">
                  <input
                    type="checkbox"
                    checked={Boolean(activeDraft.isAnonymous)}
                    onChange={(e) => patchDraft({ isAnonymous: e.target.checked })}
                    className="accent-white"
                  />
                  Anonymous account
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-[13px] text-white/75">
                  <input
                    type="checkbox"
                    checked={Boolean(activeDraft.onboardingComplete)}
                    onChange={(e) => patchDraft({ onboardingComplete: e.target.checked })}
                    className="accent-white"
                  />
                  Onboarding complete
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[14px] font-medium text-white">Sensory experience</h3>
              <p className="mt-1 text-[12px] text-white/45">From First-Time Experience - not used to infer neurodivergence.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ONBOARDING_SENSORY_OPTIONS.map((o) => (
                  <TabPill
                    key={o.id}
                    id={o.id}
                    label={o.label}
                    active={activeDraft.sensoryId === o.id}
                    onSelect={(id) => patchDraft({ sensoryId: id })}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[14px] font-medium text-white">Neurodivergence · optional</h3>
              <p className="mt-1 text-[12px] text-white/45">
                Optional answer from onboarding - does not change programme entitlement.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ONBOARDING_IDENTITY_OPTIONS.map((o) => (
                  <TabPill
                    key={o.id}
                    id={o.id}
                    label={o.label}
                    active={activeDraft.identityId === o.id}
                    onSelect={(id) => patchDraft({ identityId: id })}
                  />
                ))}
              </div>
              <label className="mt-4 block max-w-sm">
                <span className={labelClass}>Listening path (neurotype)</span>
                <select
                  value={activeDraft.neurotypeId ?? ""}
                  onChange={(e) => patchDraft({ neurotypeId: e.target.value || null })}
                  className={fieldClass}
                >
                  <option value="">Not set</option>
                  {NEUROTYPE_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[14px] font-medium text-white">Context · when listening helps</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {ONBOARDING_MOOD_OPTIONS.map((o) => (
                  <li key={o.id}>
                    <label className="flex cursor-pointer items-center gap-3 text-[13px] text-white/80">
                      <input
                        type="checkbox"
                        checked={(activeDraft.moodIds ?? []).includes(o.id)}
                        onChange={() => toggleMulti("moodIds", o.id)}
                        className="accent-white"
                      />
                      {o.label}
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[14px] font-medium text-white">Outcomes · support goals</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {ONBOARDING_SUPPORT_OPTIONS.map((o) => (
                  <li key={o.id}>
                    <label className="flex cursor-pointer items-center gap-3 text-[13px] text-white/80">
                      <input
                        type="checkbox"
                        checked={(activeDraft.supportIds ?? []).includes(o.id)}
                        onChange={() => toggleMulti("supportIds", o.id)}
                        className="accent-white"
                      />
                      {o.label}
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[14px] font-medium text-white">Timing · notifications · appearance</h3>
              <div className="mt-4">
                <p className={labelClass}>Preferred listen time</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ONBOARDING_LISTEN_TIMES.map((o) => (
                    <TabPill
                      key={o.id}
                      id={o.id}
                      label={o.label}
                      active={activeDraft.listenTime === o.id}
                      onSelect={(id) => patchDraft({ listenTime: id })}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>Notifications</span>
                  <select
                    value={
                      activeDraft.notificationsEnabled === null ||
                      activeDraft.notificationsEnabled === undefined
                        ? ""
                        : activeDraft.notificationsEnabled
                          ? "on"
                          : "off"
                    }
                    onChange={(e) => {
                      const v = e.target.value;
                      patchDraft({
                        notificationsEnabled: v === "" ? null : v === "on",
                      });
                    }}
                    className={fieldClass}
                  >
                    <option value="">Not asked</option>
                    <option value="on">Allowed</option>
                    <option value="off">Not now</option>
                  </select>
                </label>
                <label className="block">
                  <span className={labelClass}>Appearance</span>
                  <select
                    value={activeDraft.appearance ?? "light"}
                    onChange={(e) => patchDraft({ appearance: e.target.value })}
                    className={fieldClass}
                  >
                    {APPEARANCE_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[14px] font-medium text-white">Admin notes</h3>
              <textarea
                value={activeDraft.notes ?? ""}
                onChange={(e) => patchDraft({ notes: e.target.value })}
                rows={3}
                className={`${fieldClass} resize-y`}
                placeholder="Internal notes - not shown to the Listener"
              />
            </section>

            {!creating ? (
              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="text-[14px] font-medium text-white">Listening activity</h3>
                    <p className="mt-1 text-[12px] text-white/45">
                      {listenCount} completed · {historyFor.length} recent events
                    </p>
                  </div>
                </div>
                <ul className="mt-4 divide-y divide-white/10">
                  {historyFor.map((h, i) => {
                    const session = catalog.find((s) => s.id === h.sessionId);
                    return (
                      <li key={`${h.sessionId}-${h.completedAt}-${i}`} className="flex justify-between gap-3 py-3 text-[13px]">
                        <div>
                          <p className="text-white">{session?.title ?? h.sessionId}</p>
                          <p className="text-white/40">
                            {h.completedAt ? new Date(h.completedAt).toLocaleString() : "-"}
                            {session ? ` · ${formatDuration(session.durationMin)}` : ""}
                          </p>
                        </div>
                        <Chip tone={h.progressPct >= 90 ? "ok" : "muted"}>{h.progressPct}%</Chip>
                      </li>
                    );
                  })}
                  {!historyFor.length ? (
                    <li className="py-4 text-[13px] text-white/40">No listens recorded yet.</li>
                  ) : null}
                </ul>
                {feedbackFor.length ? (
                  <div className="mt-6">
                    <p className={labelClass}>Recent feedback</p>
                    <ul className="mt-3 space-y-2">
                      {feedbackFor.map((f, i) => (
                        <li key={`${f.sessionId}-${f.at}-${i}`} className="text-[13px] text-white/65">
                          ★ {f.rating}
                          {f.phase ? ` · ${f.phase}` : ""}
                          {f.note ? ` - ${f.note}` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            ) : null}
          </form>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-[13px] text-white/45">
            Select a Listener or create a new one.
          </div>
        )}
      </div>
    </AppChrome>
  );
}
