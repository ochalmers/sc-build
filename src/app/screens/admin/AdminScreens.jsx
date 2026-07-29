import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  NEUROTYPE_OPTIONS,
  SESSION_CATEGORIES,
  SESSION_TAG_OPTIONS,
  downloadDelimited,
  formatDuration,
  inviteLinkPath,
  labelForOption,
  ONBOARDING_IDENTITY_OPTIONS,
  ONBOARDING_LISTEN_TIMES,
  ONBOARDING_MOOD_OPTIONS,
  ONBOARDING_SUPPORT_OPTIONS,
} from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { AppChrome } from "../../components/AppChrome.jsx";
import { AdminNav, Chip, TabPill, fieldClass, labelClass, toggleInList } from "./adminShared.jsx";

export { AdminListeners } from "./AdminListeners.jsx";
export { AdminPartners } from "./AdminOrganizations.jsx";

const DAY_MS = 24 * 60 * 60 * 1000;

function countListensSince(listenHistory, msAgo, now = Date.now()) {
  const cutoff = now - msAgo;
  return listenHistory.filter((h) => (h.completedAt ?? 0) >= cutoff).length;
}

function sparkBars(listenHistory, days = 14, now = Date.now()) {
  return Array.from({ length: days }, (_, i) => {
    const dayStart = now - (days - i) * DAY_MS;
    const dayEnd = dayStart + DAY_MS;
    const count = listenHistory.filter((h) => {
      const at = h.completedAt ?? 0;
      return at >= dayStart && at < dayEnd;
    }).length;
    return { day: i, count };
  });
}

function inDateRange(timestamp, range, fromDate, toDate) {
  if (range === "all") return true;
  const at = timestamp ?? 0;
  const now = Date.now();
  if (range === "7d") return at >= now - 7 * DAY_MS;
  if (range === "30d") return at >= now - 30 * DAY_MS;
  if (range === "custom") {
    const from = fromDate ? new Date(`${fromDate}T00:00:00`).getTime() : 0;
    const to = toDate ? new Date(`${toDate}T23:59:59`).getTime() : Number.POSITIVE_INFINITY;
    return at >= from && at <= to;
  }
  return true;
}

function DateRangeControls({ range, setRange, fromDate, setFromDate, toDate, setToDate }) {
  return (
    <fieldset>
      <legend className={labelClass}>Date range</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          { id: "all", label: "All history" },
          { id: "7d", label: "Last 7 days" },
          { id: "30d", label: "Last 30 days" },
          { id: "custom", label: "Custom" },
        ].map((opt) => (
          <TabPill key={opt.id} id={opt.id} label={opt.label} active={range === opt.id} onSelect={setRange} />
        ))}
      </div>
      {range === "custom" ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-[11px] text-white/45">From</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="text-[11px] text-white/45">To</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>
      ) : null}
    </fieldset>
  );
}

export function AdminHome() {
  const { partners, listeners, catalog, invites, analyticsEvents, feedback, listenHistory, sessionGroups } =
    useAppStore();
  const pending = invites.filter((i) => i.status === "pending").length;
  const accepted = invites.filter((i) => i.status === "accepted").length;
  const now = Date.now();
  const listensToday = countListensSince(listenHistory, DAY_MS, now);
  const listensWeek = countListensSince(listenHistory, 7 * DAY_MS, now);
  const listensMonth = countListensSince(listenHistory, 30 * DAY_MS, now);
  const bars = sparkBars(listenHistory, 14, now);
  const maxBar = Math.max(1, ...bars.map((b) => b.count));
  const published = catalog.filter((s) => (s.status ?? "published") === "published").length;
  const onboarded = listeners.filter((l) => l.onboardingComplete).length;
  // Home lists seeded platform orgs; Preston North End is added via Organisations → Create New.
  const homeOrgs = partners.filter((p) => p.id !== "org-preston");

  return (
    <AppChrome
      title="Overview"
      subtitle="Platform home - organisations live on Sonocea. Add Preston North End from Organisations → Create New."
      sidebar={<AdminNav />}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Listens today", value: listensToday },
          { label: "Listens this week", value: listensWeek },
          { label: "Listens this month", value: listensMonth },
          { label: "Invite acceptance", value: `${accepted} / ${accepted + pending}` },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">{c.label}</p>
            <p className="mt-3 text-[1.75rem] font-medium text-white">{c.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-[14px] font-medium text-white">Organisations</h2>
            <p className="mt-1 text-[12px] text-white/45">
              {homeOrgs.length} live · Preston North End is created from Organisations.
            </p>
          </div>
          <Link
            to="/app/admin/organizations"
            className="rounded-full border border-white/20 px-4 py-2 text-[12px] text-white/75 hover:border-white/40"
          >
            Manage organisations
          </Link>
        </div>
        <ul className="mt-5 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
          {homeOrgs.map((org) => {
            const roster = listeners.filter((l) => l.partnerId === org.id).length;
            return (
              <li key={org.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
                <div className="flex min-w-0 items-center gap-3">
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
                  <div className="min-w-0">
                    <p className="truncate text-[14px] text-white">{org.name}</p>
                    <p className="mt-0.5 text-[12px] text-white/45">
                      {org.programmeTitle || org.programme?.slice(0, 48) || "Programme"}
                      {roster ? ` · ${roster} listeners` : ""}
                    </p>
                  </div>
                </div>
                <p className="text-[12px] text-white/40">
                  {org.seatsUsed}/{org.seats} seats
                </p>
              </li>
            );
          })}
          {!homeOrgs.length ? (
            <li className="px-4 py-5 text-[13px] text-white/40">No organisations yet.</li>
          ) : null}
        </ul>
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Link
          to="/app/admin/listeners"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25"
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Listeners onboarded</p>
          <p className="mt-3 text-[1.5rem] font-medium text-white">
            {onboarded}
            <span className="text-[14px] font-normal text-white/40"> / {listeners.length}</span>
          </p>
          <p className="mt-1 text-[12px] text-white/45">Open full profiles →</p>
        </Link>
        <Link
          to="/app/admin/organizations"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25"
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Organizations</p>
          <p className="mt-3 text-[1.5rem] font-medium text-white">{homeOrgs.length}</p>
          <p className="mt-1 text-[12px] text-white/45">Create New for Preston North End →</p>
        </Link>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Published sessions</p>
          <p className="mt-3 text-[1.5rem] font-medium text-white">
            {published}
            <span className="text-[14px] font-normal text-white/40"> / {catalog.length}</span>
          </p>
          <p className="mt-1 text-[12px] text-white/45">{sessionGroups.length} session groups</p>
        </div>
      </div>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-[14px] font-medium text-white">Listens · last 14 days</h2>
            <p className="mt-1 text-[12px] text-white/45">Adoption signal for invoicing and programme health.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-[12px] text-white/50">
            <span>
              {published}/{catalog.length} published
            </span>
            <span>{sessionGroups.length} session groups</span>
            <span>{homeOrgs.length} organizations</span>
            <span>{listeners.length} listeners</span>
          </div>
        </div>
        <div className="mt-6 flex h-28 items-end gap-1.5">
          {bars.map((bar) => (
            <div key={bar.day} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-sm bg-white/70"
                style={{ height: `${Math.max(4, (bar.count / maxBar) * 100)}%` }}
                title={`${bar.count} listens`}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-[14px] font-medium text-white">Recent events</h2>
          <ul className="mt-4 max-h-64 space-y-2 overflow-y-auto">
            {[...analyticsEvents].reverse().slice(0, 12).map((e, i) => (
              <li key={`${e.at}-${i}`} className="flex justify-between gap-3 text-[12px] text-white/60">
                <span className="text-white/85">{e.type}</span>
                <span>{new Date(e.at).toLocaleTimeString()}</span>
              </li>
            ))}
            {!analyticsEvents.length ? (
              <li className="text-[13px] text-white/40">Use the Listener app to generate events.</li>
            ) : null}
          </ul>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-[14px] font-medium text-white">Feedback inbox</h2>
          <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto">
            {feedback.slice(0, 8).map((f, i) => (
              <li key={`${f.at}-${i}`} className="text-[13px] text-white/70">
                <span className="text-white">★ {f.rating}</span>
                <span className="text-white/40"> · {f.sessionId}</span>
                {f.note ? <p className="mt-1 text-white/50">{f.note}</p> : null}
              </li>
            ))}
            {!feedback.length ? <li className="text-[13px] text-white/40">No feedback yet.</li> : null}
          </ul>
        </section>
      </div>
    </AppChrome>
  );
}

function SessionForm({ partners, sessionGroups, onSave, initial }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [minutes, setMinutes] = useState(String(initial?.durationMin ?? 15));
  const [category, setCategory] = useState(initial?.category ?? initial?.useCase ?? "Custom");
  const [status, setStatus] = useState(initial?.status ?? "published");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [tags, setTags] = useState(initial?.tags ?? []);
  const [neurotypes, setNeurotypes] = useState(
    initial?.neurotype ?? ["regulator", "sensitive", "supported", "performance"],
  );
  const [partnerIds, setPartnerIds] = useState(initial?.partnerIds ?? (partners[0] ? [partners[0].id] : []));
  const [groupIds, setGroupIds] = useState(initial?.groupIds ?? []);
  const [assignMode, setAssignMode] = useState(
    initial?.groupIds?.length ? "group" : "individual",
  );

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const resolvedPartnerIds =
      assignMode === "group"
        ? [
            ...new Set(
              groupIds.flatMap((gid) => sessionGroups.find((g) => g.id === gid)?.partnerIds ?? []),
            ),
          ]
        : partnerIds;
    onSave({
      id: initial?.id ?? `ses-${Date.now()}`,
      title: title.trim(),
      durationMin: Number(minutes) || 15,
      neurotype: neurotypes,
      useCase: category,
      category,
      tags,
      status,
      supportTags: initial?.supportTags ?? tags.slice(0, 3).map((t) => t.charAt(0).toUpperCase() + t.slice(1)),
      beforeYouBegin: initial?.beforeYouBegin ?? [
        "Use headphones",
        "Get comfortable",
        "Give yourself a few uninterrupted minutes",
      ],
      mode: initial?.mode ?? "regulation",
      summary: summary.trim() || "Admin-created Session with metadata and Partner assignment.",
      headline: initial?.headline ?? (summary.trim() || "Take a moment for yourself."),
      description:
        initial?.description ?? "For when you’d like a short listening moment in your day.",
      partnerIds: resolvedPartnerIds,
      groupIds: assignMode === "group" ? groupIds : [],
    });
    if (!initial) {
      setTitle("");
      setSummary("");
      setTags([]);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className={labelClass}>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldClass}
            placeholder="Session 8"
          />
        </label>
        <label className="block">
          <span className={labelClass}>Duration (minutes)</span>
          <input value={minutes} onChange={(e) => setMinutes(e.target.value)} className={fieldClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass}>
            {SESSION_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelClass}>Publish status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={fieldClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className={labelClass}>Summary / metadata</span>
          <input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className={fieldClass}
            placeholder="Short description for discoverability"
          />
        </label>
      </div>

      <fieldset>
        <legend className={labelClass}>Tags</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SESSION_TAG_OPTIONS.map((tag) => {
            const on = tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setTags((prev) => toggleInList(prev, tag))}
                className={`rounded-full px-3 py-1.5 text-[12px] ${
                  on ? "bg-white text-black" : "border border-white/15 text-white/70"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>Neurotypes</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {NEUROTYPE_OPTIONS.map((n) => {
            const on = neurotypes.includes(n.id);
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setNeurotypes((prev) => toggleInList(prev, n.id))}
                className={`rounded-full px-3 py-1.5 text-[12px] ${
                  on ? "bg-white text-black" : "border border-white/15 text-white/70"
                }`}
              >
                {n.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>Assign to Partner</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          <TabPill
            id="individual"
            label="Individual Session"
            active={assignMode === "individual"}
            onSelect={setAssignMode}
          />
          <TabPill
            id="group"
            label="Via Session Group"
            active={assignMode === "group"}
            onSelect={setAssignMode}
          />
        </div>
        {assignMode === "individual" ? (
          <ul className="mt-3 space-y-2">
            {partners.map((p) => (
              <li key={p.id}>
                <label className="flex cursor-pointer items-center gap-3 text-[13px] text-white/80">
                  <input
                    type="checkbox"
                    checked={partnerIds.includes(p.id)}
                    onChange={() => setPartnerIds((prev) => toggleInList(prev, p.id))}
                    className="accent-white"
                  />
                  {p.name}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-3 space-y-2">
            {sessionGroups.map((g) => (
              <li key={g.id}>
                <label className="flex cursor-pointer items-center gap-3 text-[13px] text-white/80">
                  <input
                    type="checkbox"
                    checked={groupIds.includes(g.id)}
                    onChange={() => setGroupIds((prev) => toggleInList(prev, g.id))}
                    className="accent-white"
                  />
                  <span>
                    {g.title}
                    <span className="text-white/40"> · {g.sessionIds.length} sessions</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      <p className="text-[12px] text-white/40">Audio upload is mocked - metadata drives the Listener library.</p>

      <button type="submit" className="rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black">
        {initial ? "Save Session" : "Upload & publish Session"}
      </button>
    </form>
  );
}

function SessionGroupsPanel({ sessionGroups, catalog, partners, upsertSessionGroup }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sessionIds, setSessionIds] = useState([]);
  const [partnerIds, setPartnerIds] = useState(partners[0] ? [partners[0].id] : []);
  const [tags, setTags] = useState([]);

  function addGroup(e) {
    e.preventDefault();
    if (!title.trim() || !sessionIds.length) return;
    upsertSessionGroup({
      id: `grp-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || "Partner content bundle.",
      sessionIds,
      partnerIds,
      tags,
    });
    setTitle("");
    setDescription("");
    setSessionIds([]);
    setTags([]);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={addGroup} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-[13px] text-white/55">
          Session Groups are Partner-level content bundles - assign once and entitle all Sessions in the group.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Group title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fieldClass}
              placeholder="e.g. Clinical starter pack"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Description</span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={fieldClass}
              placeholder="What this bundle is for"
            />
          </label>
        </div>
        <fieldset>
          <legend className={labelClass}>Sessions in group</legend>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {catalog.map((s) => (
              <li key={s.id}>
                <label className="flex cursor-pointer items-center gap-3 text-[13px] text-white/80">
                  <input
                    type="checkbox"
                    checked={sessionIds.includes(s.id)}
                    onChange={() => setSessionIds((prev) => toggleInList(prev, s.id))}
                    className="accent-white"
                  />
                  {s.title}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend className={labelClass}>Assign to Organizations</legend>
          <ul className="mt-3 space-y-2">
            {partners.map((p) => (
              <li key={p.id}>
                <label className="flex cursor-pointer items-center gap-3 text-[13px] text-white/80">
                  <input
                    type="checkbox"
                    checked={partnerIds.includes(p.id)}
                    onChange={() => setPartnerIds((prev) => toggleInList(prev, p.id))}
                    className="accent-white"
                  />
                  {p.name}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend className={labelClass}>Tags</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {SESSION_TAG_OPTIONS.map((tag) => {
              const on = tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTags((prev) => toggleInList(prev, tag))}
                  className={`rounded-full px-3 py-1.5 text-[12px] ${
                    on ? "bg-white text-black" : "border border-white/15 text-white/70"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </fieldset>
        <button type="submit" className="rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black">
          Create Session Group
        </button>
      </form>

      <ul className="divide-y divide-white/10 rounded-2xl border border-white/10">
        {sessionGroups.map((g) => (
          <li key={g.id} className="px-5 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[14px] text-white">{g.title}</p>
                <p className="mt-0.5 text-[12px] text-white/45">{g.description}</p>
                <p className="mt-2 text-[12px] text-white/50">
                  {g.sessionIds.length} sessions · {g.partnerIds.length} organizations
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(g.tags ?? []).map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AdminSessions({ initialTab = "sessions" }) {
  const { catalog, partners, sessionGroups, upsertSession, upsertSessionGroup } = useAppStore();
  const [tab, setTab] = useState(initialTab === "groups" ? "groups" : "sessions");
  const [editingId, setEditingId] = useState(null);
  const editing = catalog.find((s) => s.id === editingId);
  const isProgrammes = initialTab === "groups";

  return (
    <AppChrome
      title={isProgrammes ? "Programmes" : "Content"}
      subtitle={
        isProgrammes
          ? "Assemble Session Groups into programmes and assign them to organisations."
          : "Upload and manage Sessions with metadata and tags - publish and assign as an individual Session or Session Group."
      }
      sidebar={<AdminNav />}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <TabPill id="sessions" label="Sessions" active={tab === "sessions"} onSelect={setTab} />
        <TabPill
          id="groups"
          label="Session Groups"
          active={tab === "groups"}
          onSelect={setTab}
        />
      </div>

      {tab === "groups" ? (
        <SessionGroupsPanel
          sessionGroups={sessionGroups}
          catalog={catalog}
          partners={partners}
          upsertSessionGroup={upsertSessionGroup}
        />
      ) : (
        <>
          <SessionForm
            key={editing?.id ?? "new"}
            partners={partners}
            sessionGroups={sessionGroups}
            initial={editing}
            onSave={(session) => {
              upsertSession(session);
              // Keep partner.sessionIds / group membership in sync for entitlement demos
              if (session.groupIds?.length) {
                session.groupIds.forEach((gid) => {
                  const group = sessionGroups.find((g) => g.id === gid);
                  if (!group) return;
                  const nextSessions = group.sessionIds.includes(session.id)
                    ? group.sessionIds
                    : [...group.sessionIds, session.id];
                  upsertSessionGroup({
                    ...group,
                    sessionIds: nextSessions,
                    partnerIds: [...new Set([...(group.partnerIds ?? []), ...session.partnerIds])],
                  });
                });
              }
              setEditingId(null);
            }}
          />

          <ul className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10">
            {catalog.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] text-white">{s.title}</p>
                    <Chip tone={(s.status ?? "published") === "published" ? "ok" : "muted"}>
                      {s.status ?? "published"}
                    </Chip>
                  </div>
                  <p className="mt-0.5 text-[12px] text-white/45">
                    {formatDuration(s.durationMin)} · {s.category ?? s.useCase}
                    {(s.tags ?? []).length ? ` · ${(s.tags ?? []).join(", ")}` : ""}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {s.partnerIds.map((pid) => {
                      const p = partners.find((x) => x.id === pid);
                      return <Chip key={pid}>{p?.name?.split(" ")[0] ?? pid}</Chip>;
                    })}
                    {(s.groupIds ?? []).map((gid) => {
                      const g = sessionGroups.find((x) => x.id === gid);
                      return (
                        <Chip key={gid} tone="ok">
                          Group · {g?.title ?? gid}
                        </Chip>
                      );
                    })}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingId(s.id === editingId ? null : s.id)}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] text-white/80 hover:border-white/40"
                >
                  {s.id === editingId ? "Cancel" : "Edit"}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </AppChrome>
  );
}

function makeInviteCode(orgName, index = 0) {
  const prefix =
    (orgName ?? "ORG").split(" ")[0].toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10) || "ORG";
  const stamp = `${Date.now().toString(36).toUpperCase()}${index > 0 ? index.toString(36).toUpperCase() : ""}`;
  return `${prefix}-${stamp}`;
}

export function AdminInvites() {
  const { partners, invites, addInvites } = useAppStore();
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get("mode");
  const [mode, setMode] = useState(modeParam === "links" ? "links" : "direct");
  const [partnerId, setPartnerId] = useState(partners[0]?.id ?? "");
  const [quantity, setQuantity] = useState("1");
  const [label, setLabel] = useState("");
  const [email, setEmail] = useState("");
  const [listenerName, setListenerName] = useState("");
  const [created, setCreated] = useState([]);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (modeParam === "links" || modeParam === "direct") setMode(modeParam);
  }, [modeParam]);

  function createLinks(e) {
    e.preventDefault();
    if (!partnerId) return;
    const partner = partners.find((p) => p.id === partnerId);
    const count = Math.min(50, Math.max(1, Number(quantity) || 1));
    const batch = Array.from({ length: count }, (_, index) => {
      const code = makeInviteCode(partner?.name, index);
      return {
        id: `inv-${Date.now()}-${index}`,
        code,
        email: "",
        name: label.trim() || undefined,
        partnerId,
        status: "pending",
        kind: "link",
        createdAt: Date.now(),
      };
    });
    addInvites(batch);
    setCreated(batch);
    setLabel("");
  }

  function createDirect(e) {
    e.preventDefault();
    if (!partnerId || !email.trim()) return;
    const partner = partners.find((p) => p.id === partnerId);
    const code = makeInviteCode(partner?.name);
    const invite = {
      id: `inv-${Date.now()}`,
      code,
      email: email.trim(),
      name: listenerName.trim() || email.trim().split("@")[0],
      partnerId,
      status: "pending",
      kind: "named",
      createdAt: Date.now(),
    };
    addInvites([invite]);
    setCreated([invite]);
    setEmail("");
    setListenerName("");
  }

  async function copyLink(code) {
    const url = `${window.location.origin}${inviteLinkPath(code)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(code);
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setCopied("");
    }
  }

  return (
    <AppChrome
      title="Invites"
      subtitle="Invite a Listener directly and associate them to a Partner - or generate redeemable link packs."
      sidebar={<AdminNav />}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <TabPill id="direct" label="Direct invite" active={mode === "direct"} onSelect={setMode} />
        <TabPill id="links" label="Invite links" active={mode === "links"} onSelect={setMode} />
      </div>

      {mode === "direct" ? (
        <form
          onSubmit={createDirect}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:flex md:flex-wrap md:items-end md:gap-4"
        >
          <label className="block md:w-56">
            <span className={labelClass}>Organization</span>
            <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)} className={fieldClass}>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block flex-1 md:mt-0">
            <span className={labelClass}>Listener email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className={fieldClass}
              placeholder="listener@org.example"
            />
          </label>
          <label className="mt-4 block flex-1 md:mt-0">
            <span className={labelClass}>Name (optional)</span>
            <input
              value={listenerName}
              onChange={(e) => setListenerName(e.target.value)}
              className={fieldClass}
              placeholder="Full name"
            />
          </label>
          <button type="submit" className="mt-4 rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black md:mt-0">
            Invite & associate
          </button>
        </form>
      ) : (
        <form
          onSubmit={createLinks}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:flex md:flex-wrap md:items-end md:gap-4"
        >
          <label className="block md:w-56">
            <span className={labelClass}>Organization</span>
            <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)} className={fieldClass}>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block md:mt-0 md:w-28">
            <span className={labelClass}>Quantity</span>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              min="1"
              max="50"
              className={fieldClass}
            />
          </label>
          <label className="mt-4 block flex-1 md:mt-0">
            <span className={labelClass}>Optional batch label</span>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className={fieldClass}
              placeholder="e.g. Wednesday clinic pack"
            />
          </label>
          <button type="submit" className="mt-4 rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black md:mt-0">
            Generate links
          </button>
        </form>
      )}

      {created.length ? (
        <section className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-5">
          <h2 className="text-[14px] font-medium text-white">
            Created {created.length} invite{created.length === 1 ? "" : "s"}
          </h2>
          <ul className="mt-4 space-y-2">
            {created.map((inv) => {
              const path = inviteLinkPath(inv.code);
              return (
                <li
                  key={inv.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[13px] text-white">{inv.code}</p>
                    <p className="mt-0.5 truncate text-[12px] text-white/45">
                      {inv.email ? `${inv.email} · ` : ""}
                      {path}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyLink(inv.code)}
                    className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] text-white/80 hover:border-white/40"
                  >
                    {copied === inv.code ? "Copied" : "Copy link"}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <ul className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10">
        {invites.map((inv) => {
          const org = partners.find((p) => p.id === inv.partnerId);
          return (
            <li key={inv.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <p className="font-mono text-[13px] text-white">{inv.code}</p>
                <p className="mt-0.5 text-[12px] text-white/45">
                  {org?.name ?? "Organization"}
                  {inv.email ? ` · ${inv.email}` : " · link only"}
                  {inv.name ? ` · ${inv.name}` : ""}
                  {inv.kind === "named" ? " · direct" : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyLink(inv.code)}
                  className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/70 hover:border-white/35"
                >
                  {copied === inv.code ? "Copied" : "Copy"}
                </button>
                <span className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] capitalize text-white/70">
                  {inv.status}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </AppChrome>
  );
}

export function AdminExport() {
  const { pathname } = useLocation();
  const { partners, listeners, listenHistory, catalog } = useAppStore();
  const [dataset, setDataset] = useState("listens");
  const [range, setRange] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedOrgs, setSelectedOrgs] = useState(() => partners.map((p) => p.id));
  const [format, setFormat] = useState("xlsx");
  const isSettings = pathname.includes("/settings");

  function toggleOrg(id) {
    setSelectedOrgs((prev) => toggleInList(prev, id));
  }

  function selectAllOrgs() {
    setSelectedOrgs(partners.map((p) => p.id));
  }

  const previewCount = useMemo(() => {
    if (dataset === "listeners") {
      return listeners.filter((l) => selectedOrgs.includes(l.partnerId)).length;
    }
    return listenHistory.filter(
      (h) => selectedOrgs.includes(h.partnerId) && inDateRange(h.completedAt, range, fromDate, toDate),
    ).length;
  }, [dataset, listeners, listenHistory, selectedOrgs, range, fromDate, toDate]);

  function runExport() {
    const delimiter = format === "tsv" ? "\t" : ",";
    const ext = format === "tsv" ? "tsv" : format === "xlsx" ? "csv" : "csv";
    const stamp = new Date().toISOString().slice(0, 10);
    const prefix = format === "xlsx" ? "\uFEFF" : "";

    if (dataset === "listeners") {
      const rows = [
        [
          "listener_id",
          "name",
          "display_name",
          "email",
          "anonymous",
          "organization_id",
          "organization",
          "invite_code",
          "status",
          "onboarding_complete",
          "identity",
          "neurotype",
          "moods",
          "support_goals",
          "listen_time",
          "appearance",
          "notifications",
          "notes",
        ],
        ...listeners
          .filter((l) => selectedOrgs.includes(l.partnerId))
          .map((l) => {
            const org = partners.find((p) => p.id === l.partnerId);
            return [
              l.id,
              l.name,
              l.displayName ?? "",
              l.isAnonymous ? "" : l.email,
              l.isAnonymous ? "yes" : "no",
              l.partnerId,
              org?.name ?? "",
              l.inviteCode,
              l.status,
              l.onboardingComplete ? "yes" : "no",
              labelForOption(ONBOARDING_IDENTITY_OPTIONS, l.identityId, ""),
              labelForOption(NEUROTYPE_OPTIONS, l.neurotypeId, ""),
              (l.moodIds ?? []).map((id) => labelForOption(ONBOARDING_MOOD_OPTIONS, id, id)).join("; "),
              (l.supportIds ?? [])
                .map((id) => labelForOption(ONBOARDING_SUPPORT_OPTIONS, id, id))
                .join("; "),
              labelForOption(ONBOARDING_LISTEN_TIMES, l.listenTime, ""),
              l.appearance ?? "",
              l.notificationsEnabled === null || l.notificationsEnabled === undefined
                ? ""
                : l.notificationsEnabled
                  ? "on"
                  : "off",
              l.notes ?? "",
            ];
          }),
      ];
      downloadDelimited(`sonocea-listeners-${stamp}.${ext}`, rows, delimiter, prefix);
      return;
    }

    const rows = [
      [
        "completed_at",
        "session_id",
        "session_title",
        "listener_id",
        "listener_name",
        "organization_id",
        "organization",
        "progress_pct",
        "duration_min",
      ],
      ...listenHistory
        .filter(
          (h) => selectedOrgs.includes(h.partnerId) && inDateRange(h.completedAt, range, fromDate, toDate),
        )
        .map((h) => {
          const org = partners.find((p) => p.id === h.partnerId);
          const listener = listeners.find((l) => l.id === h.listenerId);
          const session = catalog.find((s) => s.id === h.sessionId);
          return [
            h.completedAt ? new Date(h.completedAt).toISOString() : "",
            h.sessionId,
            session?.title ?? "",
            h.listenerId ?? "",
            listener?.name ?? "",
            h.partnerId ?? "",
            org?.name ?? "",
            h.progressPct,
            h.durationMin,
          ];
        }),
    ];
    downloadDelimited(`sonocea-listens-${stamp}.${ext}`, rows, delimiter, prefix);
  }

  return (
    <AppChrome
      title={isSettings ? "Settings" : "Export"}
      subtitle="Export listens or Listeners for billing and usage tracking - all history or a date range, across one or multiple organisations."
      sidebar={<AdminNav />}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <label className="block">
            <span className={labelClass}>Dataset</span>
            <select value={dataset} onChange={(e) => setDataset(e.target.value)} className={fieldClass}>
              <option value="listens">All listens</option>
              <option value="listeners">All Listeners</option>
            </select>
          </label>

          <DateRangeControls
            range={range}
            setRange={setRange}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
          {dataset === "listeners" ? (
            <p className="text-[12px] text-white/40">Listener roster export is always full history.</p>
          ) : null}

          <fieldset>
            <div className="flex items-center justify-between gap-3">
              <legend className={labelClass}>Organizations</legend>
              <button
                type="button"
                onClick={selectAllOrgs}
                className="text-[11px] text-white/55 underline-offset-2 hover:underline"
              >
                Select all
              </button>
            </div>
            <ul className="mt-3 space-y-2">
              {partners.map((p) => (
                <li key={p.id}>
                  <label className="flex cursor-pointer items-center gap-3 text-[13px] text-white/80">
                    <input
                      type="checkbox"
                      checked={selectedOrgs.includes(p.id)}
                      onChange={() => toggleOrg(p.id)}
                      className="accent-white"
                    />
                    {p.name}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <label className="block">
            <span className={labelClass}>Format</span>
            <select value={format} onChange={(e) => setFormat(e.target.value)} className={fieldClass}>
              <option value="xlsx">Excel (.xlsx via CSV - opens in Excel)</option>
              <option value="csv">CSV (comma-delimited)</option>
              <option value="tsv">TSV (tab-delimited)</option>
            </select>
          </label>

          <button
            type="button"
            onClick={runExport}
            disabled={!selectedOrgs.length}
            className="rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            Download export · {previewCount} row{previewCount === 1 ? "" : "s"}
          </button>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[13px] text-white/60">
          <h2 className="text-[14px] font-medium text-white">For billing & usage</h2>
          <p className="mt-3 leading-relaxed">
            Pull listens or the Listener roster across one or many organizations, for all history or a
            chosen window - ready for Excel or any delimited import.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-4 text-white/50">
            <li>Listens include session, Listener, organization, progress, and timestamps.</li>
            <li>
              Listener export includes onboarding fields - identity, moods, support goals, timing,
              appearance, notifications - plus invite and status.
            </li>
          </ul>
        </aside>
      </div>
    </AppChrome>
  );
}

function MetricCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">{label}</p>
      <p className="mt-3 text-[1.75rem] font-medium text-white">{value}</p>
      {hint ? <p className="mt-1 text-[11px] text-white/40">{hint}</p> : null}
    </div>
  );
}

export function AdminAnalytics() {
  const { analyticsEvents, listenHistory, feedback, invites, partners, listeners, catalog } = useAppStore();
  const [range, setRange] = useState("30d");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [view, setView] = useState("aggregate");
  const [partnerFilter, setPartnerFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredHistory = useMemo(() => {
    return listenHistory.filter((h) => {
      if (!inDateRange(h.completedAt, range, fromDate, toDate)) return false;
      if (partnerFilter !== "all" && h.partnerId !== partnerFilter) return false;
      const session = catalog.find((s) => s.id === h.sessionId);
      if (tagFilter !== "all" && !(session?.tags ?? []).includes(tagFilter)) return false;
      if (
        categoryFilter !== "all" &&
        (session?.category ?? session?.useCase) !== categoryFilter
      ) {
        return false;
      }
      return true;
    });
  }, [listenHistory, range, fromDate, toDate, partnerFilter, tagFilter, categoryFilter, catalog]);

  const filteredInvites = useMemo(() => {
    return invites.filter((inv) => {
      if (partnerFilter !== "all" && inv.partnerId !== partnerFilter) return false;
      if (inv.createdAt && !inDateRange(inv.createdAt, range, fromDate, toDate)) {
        // Named seed invites may lack createdAt - include them when range is all
        if (range !== "all") return inv.status === "accepted" || !inv.createdAt;
      }
      return true;
    });
  }, [invites, partnerFilter, range, fromDate, toDate]);

  const metrics = useMemo(() => {
    const starts = filteredHistory.length;
    const completions = filteredHistory.filter((h) => (h.progressPct ?? 0) >= 90).length;
    const listeningMin = filteredHistory.reduce(
      (sum, h) => sum + (h.durationMin ?? 0) * ((h.progressPct ?? 0) / 100),
      0,
    );
    const accepted = filteredInvites.filter((i) => i.status === "accepted").length;
    const pending = filteredInvites.filter((i) => i.status === "pending").length;
    const acceptanceRate =
      accepted + pending > 0 ? Math.round((accepted / (accepted + pending)) * 100) : 0;

    const now = Date.now();
    const dayStart = now - DAY_MS;
    const monthStart = now - 30 * DAY_MS;
    const dau = new Set(
      listenHistory
        .filter((h) => (h.completedAt ?? 0) >= dayStart)
        .map((h) => h.listenerId)
        .filter(Boolean),
    ).size;
    const mau = new Set(
      listenHistory
        .filter((h) => (h.completedAt ?? 0) >= monthStart)
        .map((h) => h.listenerId)
        .filter(Boolean),
    ).size;

    const activeListeners = new Set(filteredHistory.map((h) => h.listenerId).filter(Boolean)).size;
    const frequency =
      activeListeners > 0 ? Math.round((filteredHistory.length / activeListeners) * 10) / 10 : 0;

    return {
      starts,
      completions,
      listeningMin: Math.round(listeningMin),
      accepted,
      pending,
      acceptanceRate,
      dau,
      mau,
      frequency,
      events: analyticsEvents.filter((e) => inDateRange(e.at, range, fromDate, toDate)).length,
      feedback: feedback.length,
    };
  }, [
    filteredHistory,
    filteredInvites,
    listenHistory,
    analyticsEvents,
    feedback,
    range,
    fromDate,
    toDate,
  ]);

  const byPartner = useMemo(() => {
    return partners.map((p) => {
      const rows = filteredHistory.filter((h) => h.partnerId === p.id);
      const mins = rows.reduce(
        (sum, h) => sum + (h.durationMin ?? 0) * ((h.progressPct ?? 0) / 100),
        0,
      );
      return {
        id: p.id,
        name: p.name,
        starts: rows.length,
        completions: rows.filter((h) => (h.progressPct ?? 0) >= 90).length,
        minutes: Math.round(mins),
        listeners: new Set(rows.map((h) => h.listenerId).filter(Boolean)).size,
      };
    });
  }, [partners, filteredHistory]);

  const byListener = useMemo(() => {
    return listeners
      .filter((l) => partnerFilter === "all" || l.partnerId === partnerFilter)
      .map((l) => {
        const rows = filteredHistory.filter((h) => h.listenerId === l.id);
        const mins = rows.reduce(
          (sum, h) => sum + (h.durationMin ?? 0) * ((h.progressPct ?? 0) / 100),
          0,
        );
        const org = partners.find((p) => p.id === l.partnerId);
        return {
          id: l.id,
          name: l.name,
          org: org?.name ?? "-",
          starts: rows.length,
          completions: rows.filter((h) => (h.progressPct ?? 0) >= 90).length,
          minutes: Math.round(mins),
          neurotype: l.neurotypeId ?? "-",
        };
      })
      .sort((a, b) => b.minutes - a.minutes);
  }, [listeners, filteredHistory, partnerFilter, partners]);

  const bySession = useMemo(() => {
    const map = {};
    for (const h of filteredHistory) {
      if (!map[h.sessionId]) {
        const session = catalog.find((s) => s.id === h.sessionId);
        map[h.sessionId] = {
          id: h.sessionId,
          title: session?.title ?? h.sessionId,
          category: session?.category ?? session?.useCase ?? "-",
          tags: session?.tags ?? [],
          starts: 0,
          completions: 0,
          minutes: 0,
        };
      }
      map[h.sessionId].starts += 1;
      if ((h.progressPct ?? 0) >= 90) map[h.sessionId].completions += 1;
      map[h.sessionId].minutes += (h.durationMin ?? 0) * ((h.progressPct ?? 0) / 100);
    }
    return Object.values(map)
      .map((s) => ({ ...s, minutes: Math.round(s.minutes) }))
      .sort((a, b) => b.starts - a.starts);
  }, [filteredHistory, catalog]);

  const byNeurotype = useMemo(() => {
    const map = {};
    for (const h of filteredHistory) {
      const listener = listeners.find((l) => l.id === h.listenerId);
      const nt = listener?.neurotypeId ?? "unknown";
      if (!map[nt]) map[nt] = {};
      if (!map[nt][h.sessionId]) {
        const session = catalog.find((s) => s.id === h.sessionId);
        map[nt][h.sessionId] = { title: session?.title ?? h.sessionId, count: 0 };
      }
      map[nt][h.sessionId].count += 1;
    }
    return Object.entries(map).map(([neurotype, sessions]) => ({
      neurotype,
      top: Object.values(sessions)
        .sort((a, b) => b.count - a.count)
        .slice(0, 3),
    }));
  }, [filteredHistory, listeners, catalog]);

  const byTag = useMemo(() => {
    const map = {};
    for (const h of filteredHistory) {
      const session = catalog.find((s) => s.id === h.sessionId);
      for (const tag of session?.tags ?? ["untagged"]) {
        if (!map[tag]) map[tag] = { tag, starts: 0, completions: 0, minutes: 0 };
        map[tag].starts += 1;
        if ((h.progressPct ?? 0) >= 90) map[tag].completions += 1;
        map[tag].minutes += (h.durationMin ?? 0) * ((h.progressPct ?? 0) / 100);
      }
    }
    return Object.values(map)
      .map((t) => ({ ...t, minutes: Math.round(t.minutes) }))
      .sort((a, b) => b.starts - a.starts);
  }, [filteredHistory, catalog]);

  const allTags = useMemo(() => {
    const set = new Set();
    catalog.forEach((s) => (s.tags ?? []).forEach((t) => set.add(t)));
    return [...set];
  }, [catalog]);

  const allCategories = useMemo(() => {
    const set = new Set();
    catalog.forEach((s) => set.add(s.category ?? s.useCase));
    return [...set].filter(Boolean);
  }, [catalog]);

  return (
    <AppChrome
      title="Insights"
      subtitle="Aggregate, organisation-level, and participant-level usage - filter by date range, tags, categories, and Session metadata for invoicing and adoption."
      sidebar={<AdminNav />}
    >
      <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <DateRangeControls
          range={range}
          setRange={setRange}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className={labelClass}>Organization</span>
            <select
              value={partnerFilter}
              onChange={(e) => setPartnerFilter(e.target.value)}
              className={fieldClass}
            >
              <option value="all">All organizations</option>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Tag</span>
            <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} className={fieldClass}>
              <option value="all">All tags</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Category</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={fieldClass}
            >
              <option value="all">All categories</option>
              {allCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Invite acceptance" value={`${metrics.acceptanceRate}%`} hint={`${metrics.accepted} accepted · ${metrics.pending} pending`} />
        <MetricCard label="Session starts" value={metrics.starts} hint={`${metrics.completions} completions`} />
        <MetricCard label="Listening time" value={`${metrics.listeningMin} min`} hint={`${metrics.frequency} avg listens / active Listener`} />
        <MetricCard label="DAU / MAU" value={`${metrics.dau} / ${metrics.mau}`} hint="Unique Listeners · today / 30d" />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {[
          { id: "aggregate", label: "Aggregate" },
          { id: "partner", label: "By Organization" },
          { id: "listener", label: "By Listener" },
          { id: "session", label: "By Session" },
          { id: "tag", label: "By tag / category" },
          { id: "neurotype", label: "Popular by neurotype" },
        ].map((opt) => (
          <TabPill key={opt.id} id={opt.id} label={opt.label} active={view === opt.id} onSelect={setView} />
        ))}
      </div>

      {view === "aggregate" ? (
        <ul className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
          {[
            ["Events in range", metrics.events],
            ["Session starts", metrics.starts],
            ["Session completions (≥90%)", metrics.completions],
            ["Total listening minutes", metrics.listeningMin],
            ["Invite accepted", metrics.accepted],
            ["Invite pending", metrics.pending],
            ["Feedback submissions", metrics.feedback],
            ["DAU", metrics.dau],
            ["MAU", metrics.mau],
          ].map(([label, value]) => (
            <li key={label} className="flex justify-between px-5 py-3 text-[13px]">
              <span className="text-white/80">{label}</span>
              <span className="text-white">{value}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {view === "partner" ? (
        <ul className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
          {byPartner.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="text-[14px] text-white">{row.name}</p>
                <p className="mt-0.5 text-[12px] text-white/45">
                  {row.listeners} active Listeners · {row.minutes} min
                </p>
              </div>
              <p className="text-[13px] text-white/70">
                {row.starts} starts · {row.completions} completions
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {view === "listener" ? (
        <ul className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
          {byListener.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="text-[14px] text-white">{row.name}</p>
                <p className="mt-0.5 text-[12px] text-white/45">
                  {row.org} · {row.neurotype}
                </p>
              </div>
              <p className="text-[13px] text-white/70">
                {row.starts} starts · {row.completions} done · {row.minutes} min
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {view === "session" ? (
        <ul className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
          {bySession.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="text-[14px] text-white">{row.title}</p>
                <p className="mt-0.5 text-[12px] text-white/45">
                  {row.category}
                  {row.tags.length ? ` · ${row.tags.join(", ")}` : ""}
                </p>
              </div>
              <p className="text-[13px] text-white/70">
                {row.starts} starts · {row.completions} done · {row.minutes} min
              </p>
            </li>
          ))}
          {!bySession.length ? (
            <li className="px-5 py-6 text-[13px] text-white/40">No listens in this filter window.</li>
          ) : null}
        </ul>
      ) : null}

      {view === "tag" ? (
        <ul className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
          {byTag.map((row) => (
            <li key={row.tag} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <p className="text-[14px] text-white">{row.tag}</p>
              <p className="text-[13px] text-white/70">
                {row.starts} starts · {row.completions} done · {row.minutes} min
              </p>
            </li>
          ))}
          {!byTag.length ? (
            <li className="px-5 py-6 text-[13px] text-white/40">No tagged usage in this filter window.</li>
          ) : null}
        </ul>
      ) : null}

      {view === "neurotype" ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {byNeurotype.map((row) => (
            <section key={row.neurotype} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[14px] font-medium capitalize text-white">{row.neurotype}</h3>
              <ul className="mt-3 space-y-2">
                {row.top.map((s) => (
                  <li key={s.title} className="flex justify-between text-[13px] text-white/70">
                    <span>{s.title}</span>
                    <span>{s.count}</span>
                  </li>
                ))}
                {!row.top.length ? <li className="text-[13px] text-white/40">No listens</li> : null}
              </ul>
            </section>
          ))}
          {!byNeurotype.length ? (
            <p className="text-[13px] text-white/40">No neurotype-linked listens in this window.</p>
          ) : null}
        </div>
      ) : null}
    </AppChrome>
  );
}
