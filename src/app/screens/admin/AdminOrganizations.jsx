import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ORG_STATUS_OPTIONS,
  ORG_TYPE_OPTIONS,
  emptyOrganization,
  labelForOption,
} from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { AppChrome } from "../../components/AppChrome.jsx";
import { AdminNav, Chip, TabPill, fieldClass, labelClass, toggleInList } from "./adminShared.jsx";

const ORG_TABS = [
  { id: "overview", label: "Overview" },
  { id: "programme", label: "Programme & invite" },
  { id: "seats", label: "Seats & billing" },
  { id: "content", label: "Content bundle" },
  { id: "listeners", label: "Listeners" },
];

function draftFromOrg(org) {
  if (!org) return null;
  return {
    ...emptyOrganization(),
    ...org,
    sessionIds: [...(org.sessionIds ?? [])],
    bundleIds: [...(org.bundleIds ?? [])],
  };
}

export function AdminPartners() {
  const {
    partners,
    listeners,
    catalog,
    sessionGroups,
    listenHistory,
    upsertPartner,
    upsertListener,
    upsertSession,
    upsertSessionGroup,
  } = useAppStore();
  const [searchParams] = useSearchParams();
  const createParam = searchParams.get("create") === "1";
  const tabParam = searchParams.get("tab");
  const validTab = ORG_TABS.some((t) => t.id === tabParam) ? tabParam : null;

  const [selectedId, setSelectedId] = useState(partners[0]?.id ?? "");
  const [creating, setCreating] = useState(createParam);
  const [tab, setTab] = useState(validTab || "overview");
  const [draft, setDraft] = useState(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const [associateListenerId, setAssociateListenerId] = useState(listeners[0]?.id ?? "");

  useEffect(() => {
    if (createParam) {
      setCreating(true);
      setTab(validTab || "overview");
      setDraft(
        emptyOrganization({
          id: `org-${Date.now()}`,
          name: "",
          monogram: "",
          inviteLine: "",
          programme: "",
          status: "draft",
        }),
      );
    } else if (validTab) {
      setCreating(false);
      setTab(validTab);
    }
  }, [createParam, validTab]);

  const selected = creating ? null : partners.find((p) => p.id === selectedId) ?? partners[0];
  const active =
    creating || (draft && selected && draft.id === selected.id)
      ? draft
      : draftFromOrg(selected);

  function selectOrg(id) {
    setCreating(false);
    setSelectedId(id);
    setDraft(null);
    setTab("overview");
  }

  function startCreate() {
    setCreating(true);
    setTab("overview");
    setDraft(
      emptyOrganization({
        id: `org-${Date.now()}`,
        name: "",
        monogram: "",
        inviteLine: "",
        programme: "",
        status: "draft",
      }),
    );
  }

  function patch(patch) {
    const base =
      creating || (draft && selected && draft.id === selected.id)
        ? draft
        : draftFromOrg(selected);
    if (!base) return;
    setDraft({ ...base, ...patch });
  }

  function syncEntitlements(org) {
    const groupSessionIds = (org.bundleIds ?? []).flatMap(
      (gid) => sessionGroups.find((g) => g.id === gid)?.sessionIds ?? [],
    );
    const entitled = new Set([...(org.sessionIds ?? []), ...groupSessionIds]);

    catalog.forEach((session) => {
      const has = entitled.has(session.id);
      const currently = (session.partnerIds ?? []).includes(org.id);
      if (has && !currently) {
        upsertSession({ ...session, partnerIds: [...session.partnerIds, org.id] });
      } else if (!has && currently) {
        upsertSession({
          ...session,
          partnerIds: session.partnerIds.filter((id) => id !== org.id),
        });
      }
    });

    (org.bundleIds ?? []).forEach((gid) => {
      const group = sessionGroups.find((g) => g.id === gid);
      if (!group) return;
      if (!(group.partnerIds ?? []).includes(org.id)) {
        upsertSessionGroup({
          ...group,
          partnerIds: [...(group.partnerIds ?? []), org.id],
        });
      }
    });
  }

  function saveOrg(e) {
    e?.preventDefault?.();
    if (!active?.name?.trim()) return;
    const name = active.name.trim();
    const next = {
      ...emptyOrganization(),
      ...active,
      name,
      monogram: (active.monogram || name).trim().slice(0, 4).toUpperCase(),
      inviteLine:
        active.inviteLine?.trim() || `${name} has invited you to experience Sonocea.`,
      programme: active.programme?.trim() || `Listening sessions shared by ${name}.`,
      seats: Number(active.seats) || 30,
      seatsUsed: Number(active.seatsUsed) || 0,
      sessionIds: active.sessionIds ?? [],
      bundleIds: active.bundleIds ?? [],
    };
    upsertPartner(next);
    syncEntitlements(next);
    setCreating(false);
    setSelectedId(next.id);
    setDraft(null);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1600);
  }

  function associateListener(e) {
    e.preventDefault();
    if (!active?.id || !associateListenerId) return;
    const listener = listeners.find((l) => l.id === associateListenerId);
    if (!listener) return;
    upsertListener({ ...listener, partnerId: active.id });
    const rosterCount = listeners.filter(
      (l) => l.partnerId === active.id || l.id === associateListenerId,
    ).length;
    upsertPartner({
      ...active,
      seatsUsed: Math.max(active.seatsUsed ?? 0, rosterCount),
    });
  }

  const orgListeners = listeners.filter((l) => l.partnerId === active?.id);
  const orgListens = useMemo(
    () => listenHistory.filter((h) => h.partnerId === active?.id),
    [listenHistory, active?.id],
  );
  const completions = orgListens.filter((h) => h.progressPct >= 90).length;
  const seatPct = active?.seats
    ? Math.min(100, Math.round(((active.seatsUsed ?? orgListeners.length) / active.seats) * 100))
    : 0;

  return (
    <AppChrome
      title="Organisations"
      subtitle="Manage Partner organisations on the platform. Create New opens the provisioning flow."
      sidebar={<AdminNav />}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-white/50">
          {partners.length} organizations · what Listeners see as their organisation in-app
        </p>
        <Link
          to="/app/admin/setup?step=org-name"
          className="rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black"
        >
          Create New
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 self-start max-h-[70vh] overflow-y-auto">
          {partners.map((p) => {
            const roster = listeners.filter((l) => l.partnerId === p.id).length;
            const isActive = !creating && selected?.id === p.id;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => selectOrg(p.id)}
                  className={`flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left ${
                    isActive ? "bg-white/[0.06]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-medium text-white"
                      style={{ background: p.inviteAccent || "#222" }}
                    >
                      {p.monogram || p.name.slice(0, 1)}
                    </span>
                    <div>
                      <p className="text-[14px] text-white">{p.name}</p>
                      <p className="mt-0.5 text-[12px] text-white/45">
                        {labelForOption(ORG_TYPE_OPTIONS, p.orgType)} · {roster} listeners
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Chip
                      tone={
                        p.status === "active" ? "ok" : p.status === "paused" ? "warn" : "muted"
                      }
                    >
                      {p.status ?? "active"}
                    </Chip>
                    <p className="mt-1 text-[12px] text-white/50">
                      {p.seatsUsed}/{p.seats} seats
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {active ? (
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className={labelClass}>{creating ? "New organization" : "Organization"}</p>
                  <h2 className="mt-2 text-[1.25rem] font-medium text-white">
                    {creating ? "Create organization" : active.name}
                  </h2>
                  <p className="mt-1 text-[12px] text-white/45">
                    Programme and invite copy appear on the Listener organisation screen and invite flow.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={saveOrg}
                  className="rounded-full bg-white px-5 py-2 text-[12px] font-medium text-black"
                >
                  {creating ? "Create organization" : savedFlash ? "Saved" : "Save changes"}
                </button>
              </div>

              {!creating ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className={labelClass}>Seats</p>
                    <p className="mt-1 text-[18px] text-white">
                      {active.seatsUsed}/{active.seats}
                      <span className="ml-2 text-[12px] text-white/40">{seatPct}%</span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className={labelClass}>Listeners</p>
                    <p className="mt-1 text-[18px] text-white">
                      {orgListeners.length}
                      <span className="ml-2 text-[12px] text-white/40">
                        {orgListeners.filter((l) => l.status === "active").length} active
                      </span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className={labelClass}>Completions</p>
                    <p className="mt-1 text-[18px] text-white">
                      {completions}
                      <span className="ml-2 text-[12px] text-white/40">{orgListens.length} plays</span>
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                {ORG_TABS.map((t) => (
                  <TabPill
                    key={t.id}
                    id={t.id}
                    label={t.label}
                    active={tab === t.id}
                    onSelect={setTab}
                  />
                ))}
              </div>
            </div>

            {tab === "overview" ? (
              <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-[14px] font-medium text-white">Identity</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className={labelClass}>Organization name</span>
                    <input
                      value={active.name ?? ""}
                      onChange={(e) => patch({ name: e.target.value })}
                      className={fieldClass}
                      placeholder="e.g. Preston North End"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Monogram</span>
                    <input
                      value={active.monogram ?? ""}
                      onChange={(e) => patch({ monogram: e.target.value.toUpperCase().slice(0, 4) })}
                      className={fieldClass}
                      placeholder="PNE"
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Type</span>
                    <select
                      value={active.orgType ?? "other"}
                      onChange={(e) => patch({ orgType: e.target.value })}
                      className={fieldClass}
                    >
                      {ORG_TYPE_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className={labelClass}>Status</span>
                    <select
                      value={active.status ?? "draft"}
                      onChange={(e) => patch({ status: e.target.value })}
                      className={fieldClass}
                    >
                      {ORG_STATUS_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className={labelClass}>Region</span>
                    <input
                      value={active.region ?? ""}
                      onChange={(e) => patch({ region: e.target.value })}
                      className={fieldClass}
                      placeholder="City or region"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className={labelClass}>Website</span>
                    <input
                      value={active.website ?? ""}
                      onChange={(e) => patch({ website: e.target.value })}
                      className={fieldClass}
                      placeholder="https://"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className={labelClass}>Logo URL</span>
                    <input
                      value={active.logoSrc ?? ""}
                      onChange={(e) => patch({ logoSrc: e.target.value })}
                      className={fieldClass}
                      placeholder="/assets/brand/partners/…"
                    />
                  </label>
                </div>

                <h3 className="pt-2 text-[14px] font-medium text-white">Primary contact</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClass}>Contact name</span>
                    <input
                      value={active.contactName ?? ""}
                      onChange={(e) => patch({ contactName: e.target.value })}
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Role</span>
                    <input
                      value={active.contactRole ?? ""}
                      onChange={(e) => patch({ contactRole: e.target.value })}
                      className={fieldClass}
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className={labelClass}>Contact email</span>
                    <input
                      type="email"
                      value={active.contactEmail ?? ""}
                      onChange={(e) => patch({ contactEmail: e.target.value })}
                      className={fieldClass}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className={labelClass}>Internal notes</span>
                  <textarea
                    value={active.notes ?? ""}
                    onChange={(e) => patch({ notes: e.target.value })}
                    rows={3}
                    className={`${fieldClass} resize-y`}
                    placeholder="Ops notes - not shown to Listeners"
                  />
                </label>
              </section>
            ) : null}

            {tab === "programme" ? (
              <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div>
                  <h3 className="text-[14px] font-medium text-white">Listener-facing programme</h3>
                  <p className="mt-1 text-[12px] text-white/45">
                    Shown on the Listener Organisation screen - keep this aligned with what people see in-app.
                  </p>
                </div>
                <label className="block">
                  <span className={labelClass}>Programme description</span>
                  <textarea
                    value={active.programme ?? ""}
                    onChange={(e) => patch({ programme: e.target.value })}
                    rows={4}
                    className={`${fieldClass} resize-y`}
                    placeholder="Listening sessions shared by…"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Invite line</span>
                  <textarea
                    value={active.inviteLine ?? ""}
                    onChange={(e) => patch({ inviteLine: e.target.value })}
                    rows={2}
                    className={`${fieldClass} resize-y`}
                    placeholder="Preston North End has invited you to experience Sonocea."
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClass}>Invite accent</span>
                    <div className="mt-2 flex items-center gap-3">
                      <input
                        type="color"
                        value={active.inviteAccent || "#1a1a1a"}
                        onChange={(e) => patch({ inviteAccent: e.target.value })}
                        className="h-10 w-14 cursor-pointer rounded border border-white/15 bg-transparent"
                      />
                      <input
                        value={active.inviteAccent ?? ""}
                        onChange={(e) => patch({ inviteAccent: e.target.value })}
                        className={fieldClass + " !mt-0"}
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className={labelClass}>Invite highlight</span>
                    <div className="mt-2 flex items-center gap-3">
                      <input
                        type="color"
                        value={active.inviteHighlight || "#c9a86a"}
                        onChange={(e) => patch({ inviteHighlight: e.target.value })}
                        className="h-10 w-14 cursor-pointer rounded border border-white/15 bg-transparent"
                      />
                      <input
                        value={active.inviteHighlight ?? ""}
                        onChange={(e) => patch({ inviteHighlight: e.target.value })}
                        className={fieldClass + " !mt-0"}
                      />
                    </div>
                  </label>
                </div>

                <div
                  className="mt-2 overflow-hidden rounded-2xl border border-white/10 p-5"
                  style={{ background: active.inviteAccent || "#1a1a1a" }}
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">Invite preview</p>
                  <p
                    className="mt-3 text-[16px] font-medium leading-snug"
                    style={{ color: active.inviteHighlight || "#c9a86a" }}
                  >
                    {active.inviteLine ||
                      `${active.name || "Organization"} has invited you to experience Sonocea.`}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/70">
                    {active.programme || "Programme description will appear here."}
                  </p>
                </div>
              </section>
            ) : null}

            {tab === "seats" ? (
              <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-[14px] font-medium text-white">Seats & billing</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="block">
                    <span className={labelClass}>Billing model</span>
                    <select
                      value={active.billingModel ?? "seat-pool"}
                      onChange={(e) => patch({ billingModel: e.target.value })}
                      className={fieldClass}
                    >
                      <option value="seat-pool">Seat pool</option>
                      <option value="per-seat">Per seat</option>
                      <option value="usage">Usage-based</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className={labelClass}>Seat pool</span>
                    <input
                      type="number"
                      min="1"
                      value={active.seats ?? 30}
                      onChange={(e) => patch({ seats: Number(e.target.value) || 0 })}
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Seats used</span>
                    <input
                      type="number"
                      min="0"
                      value={active.seatsUsed ?? 0}
                      onChange={(e) => patch({ seatsUsed: Number(e.target.value) || 0 })}
                      className={fieldClass}
                    />
                  </label>
                </div>
                <p className="text-[12px] text-white/45">
                  Roster currently has {orgListeners.length} Listeners. Invites can increment seats used
                  automatically. Organization console billing uses this model for reconciliation.
                </p>
                <Link
                  to="/app/admin/invites"
                  className="inline-flex text-[13px] text-white/70 underline-offset-2 hover:underline"
                >
                  Generate invites for this organization →
                </Link>
              </section>
            ) : null}

            {tab === "content" ? (
              <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div>
                  <h3 className="text-[14px] font-medium text-white">Content bundle</h3>
                  <p className="mt-1 text-[12px] text-white/45">
                    Entitled Sessions and Groups appear in the Listener library for this organization.
                  </p>
                </div>
                <fieldset>
                  <legend className={labelClass}>Individual Sessions</legend>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {catalog.map((s) => (
                      <li key={s.id}>
                        <label className="flex cursor-pointer items-center gap-3 text-[13px] text-white/80">
                          <input
                            type="checkbox"
                            checked={(active.sessionIds ?? []).includes(s.id)}
                            onChange={() =>
                              patch({ sessionIds: toggleInList(active.sessionIds ?? [], s.id) })
                            }
                            className="accent-white"
                          />
                          {s.title}
                        </label>
                      </li>
                    ))}
                  </ul>
                </fieldset>
                <fieldset>
                  <legend className={labelClass}>Session Groups</legend>
                  <ul className="mt-3 space-y-2">
                    {sessionGroups.map((g) => (
                      <li key={g.id}>
                        <label className="flex cursor-pointer items-center gap-3 text-[13px] text-white/80">
                          <input
                            type="checkbox"
                            checked={(active.bundleIds ?? []).includes(g.id)}
                            onChange={() =>
                              patch({ bundleIds: toggleInList(active.bundleIds ?? [], g.id) })
                            }
                            className="accent-white"
                          />
                          {g.title}
                          <span className="text-white/40">({g.sessionIds.length})</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </fieldset>
                <button
                  type="button"
                  onClick={saveOrg}
                  className="rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black"
                >
                  Save content bundle
                </button>
              </section>
            ) : null}

            {tab === "listeners" ? (
              <section className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="text-[14px] font-medium text-white">Affiliated Listeners</h3>
                    <p className="mt-1 text-[12px] text-white/45">
                      Same roster the organization console and Listener profile organisation link use.
                    </p>
                  </div>
                  <Link
                    to="/app/admin/listeners"
                    className="text-[12px] text-white/65 underline-offset-2 hover:underline"
                  >
                    Open full Listener profiles →
                  </Link>
                </div>

                <form
                  onSubmit={associateListener}
                  className="grid gap-3 rounded-xl border border-white/10 bg-black/20 p-4 sm:grid-cols-[1fr_auto]"
                >
                  <label className="block">
                    <span className={labelClass}>Associate existing Listener</span>
                    <select
                      value={associateListenerId}
                      onChange={(e) => setAssociateListenerId(e.target.value)}
                      className={fieldClass}
                    >
                      {listeners.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.displayName || l.name} · {l.email}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="submit"
                    className="self-end rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black"
                  >
                    Associate
                  </button>
                </form>

                <ul className="divide-y divide-white/10">
                  {orgListeners.map((l) => (
                    <li key={l.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-[13px]">
                      <div>
                        <p className="text-white">{l.displayName || l.name}</p>
                        <p className="text-white/45">
                          {l.isAnonymous ? "Anonymous" : l.email}
                          {l.onboardingComplete ? " · Onboarded" : " · Not onboarded"}
                          {l.identityId
                            ? ` · ${labelForOption(
                                [
                                  { id: "yes", label: "Neurodivergent" },
                                  { id: "no", label: "Not neurodivergent" },
                                  { id: "not-sure", label: "Not sure" },
                                  { id: "prefer-not", label: "Prefer not" },
                                ],
                                l.identityId,
                              )}`
                            : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Chip tone={l.status === "active" ? "ok" : "muted"}>{l.status}</Chip>
                        <Link
                          to={`/app/admin/listeners?id=${encodeURIComponent(l.id)}`}
                          className="text-[11px] text-white/55 underline-offset-2 hover:underline"
                        >
                          Edit profile
                        </Link>
                      </div>
                    </li>
                  ))}
                  {!orgListeners.length ? (
                    <li className="py-4 text-[13px] text-white/40">No Listeners affiliated yet.</li>
                  ) : null}
                </ul>
              </section>
            ) : null}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-[13px] text-white/45">
            Select an organization or create a new one.
          </div>
        )}
      </div>
    </AppChrome>
  );
}
