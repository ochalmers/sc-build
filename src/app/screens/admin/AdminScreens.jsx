import { useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { formatDuration } from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { AppChrome, ConsoleNavLink } from "../../components/AppChrome.jsx";

function AdminNav() {
  const { pathname } = useLocation();
  return (
    <>
      <ConsoleNavLink to="/app/admin" active={pathname === "/app/admin"}>
        Overview
      </ConsoleNavLink>
      <ConsoleNavLink to="/app/admin/sessions" active={pathname.includes("/sessions")}>
        Sessions
      </ConsoleNavLink>
      <ConsoleNavLink to="/app/admin/partners" active={pathname.includes("/partners")}>
        Partners
      </ConsoleNavLink>
      <ConsoleNavLink to="/app/admin/invites" active={pathname.includes("/invites")}>
        Invites
      </ConsoleNavLink>
      <ConsoleNavLink to="/app/admin/analytics" active={pathname.includes("/analytics")}>
        Analytics
      </ConsoleNavLink>
    </>
  );
}

export function AdminHome() {
  const { role, partners, listeners, catalog, invites, analyticsEvents, feedback } = useAppStore();
  if (role !== "admin") return <Navigate to="/app" replace />;

  const pending = invites.filter((i) => i.status === "pending").length;

  return (
    <AppChrome
      title="Sonocea Admin"
      subtitle="CMS, Partner setup, invites, and analytics — the operational spine of the Mobile App PRD."
      nav={<AdminNav />}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Sessions in CMS", value: catalog.length },
          { label: "Partners", value: partners.length },
          { label: "Listeners", value: listeners.length },
          { label: "Pending invites", value: pending },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">{c.label}</p>
            <p className="mt-3 text-[1.75rem] font-medium text-white">{c.value}</p>
          </div>
        ))}
      </div>

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

export function AdminSessions() {
  const { role, catalog, partners, upsertSession } = useAppStore();
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("15");
  const [partnerId, setPartnerId] = useState(partners[0]?.id ?? "");

  if (role !== "admin") return <Navigate to="/app" replace />;

  function addSession(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const id = `ses-${Date.now()}`;
    upsertSession({
      id,
      title: title.trim(),
      durationMin: Number(minutes) || 15,
      neurotype: ["regulator", "sensitive", "supported", "performance"],
      useCase: "Custom",
      benefits: ["Assigned"],
      mode: "regulation",
      summary: "Admin-created Session assigned to selected Partner.",
      partnerIds: partnerId ? [partnerId] : [],
    });
    setTitle("");
  }

  return (
    <AppChrome
      title="Session CMS"
      subtitle="Upload metadata, versioning, and Partner assignment. Audio upload is mocked — metadata drives the Listener library."
      nav={<AdminNav />}
    >
      <form
        onSubmit={addSession}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:flex md:flex-wrap md:items-end md:gap-4"
      >
        <label className="block flex-1">
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[14px] text-white outline-none focus:border-white/40"
            placeholder="New Session"
          />
        </label>
        <label className="mt-4 block md:mt-0 md:w-24">
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">Minutes</span>
          <input
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[14px] text-white outline-none"
          />
        </label>
        <label className="mt-4 block md:mt-0 md:w-56">
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">Assign Partner</span>
          <select
            value={partnerId}
            onChange={(e) => setPartnerId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[14px] text-white outline-none"
          >
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="mt-4 rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black md:mt-0"
        >
          Add Session
        </button>
      </form>

      <ul className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10">
        {catalog.map((s) => (
          <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div>
              <p className="text-[14px] text-white">{s.title}</p>
              <p className="mt-0.5 text-[12px] text-white/45">
                {formatDuration(s.durationMin)} · {s.useCase} · {s.partnerIds.length} Partner
                {s.partnerIds.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.partnerIds.map((pid) => {
                const p = partners.find((x) => x.id === pid);
                return (
                  <span key={pid} className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/60">
                    {p?.name?.split(" ")[0] ?? pid}
                  </span>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </AppChrome>
  );
}

export function AdminPartners() {
  const { role, partners, upsertPartner } = useAppStore();
  const [name, setName] = useState("");
  const [seats, setSeats] = useState("30");
  const [model, setModel] = useState("seat-pool");

  if (role !== "admin") return <Navigate to="/app" replace />;

  function addPartner(e) {
    e.preventDefault();
    if (!name.trim()) return;
    upsertPartner({
      id: `org-${Date.now()}`,
      name: name.trim(),
      seats: Number(seats) || 30,
      seatsUsed: 0,
      billingModel: model,
      sessionIds: [],
    });
    setName("");
  }

  return (
    <AppChrome title="Partners" subtitle="Organisation setup and seat / billing configuration." nav={<AdminNav />}>
      <form
        onSubmit={addPartner}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:flex md:flex-wrap md:items-end md:gap-4"
      >
        <label className="block flex-1">
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">Organisation</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[14px] text-white outline-none"
            placeholder="Partner name"
          />
        </label>
        <label className="mt-4 block md:mt-0 md:w-24">
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">Seats</span>
          <input
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[14px] text-white outline-none"
          />
        </label>
        <label className="mt-4 block md:mt-0 md:w-40">
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">Model</span>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[14px] text-white outline-none"
          >
            <option value="seat-pool">Seat pool</option>
            <option value="per-seat">Per seat</option>
            <option value="usage">Usage-based</option>
          </select>
        </label>
        <button type="submit" className="mt-4 rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black md:mt-0">
          Add Partner
        </button>
      </form>

      <ul className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10">
        {partners.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div>
              <p className="text-[14px] text-white">{p.name}</p>
              <p className="mt-0.5 text-[12px] capitalize text-white/45">{p.billingModel}</p>
            </div>
            <p className="text-[13px] text-white/70">
              {p.seatsUsed} / {p.seats} seats
            </p>
          </li>
        ))}
      </ul>
    </AppChrome>
  );
}

export function AdminInvites() {
  const { role, partners, invites, addInvite } = useAppStore();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [partnerId, setPartnerId] = useState(partners[0]?.id ?? "");

  if (role !== "admin") return <Navigate to="/app" replace />;

  function createInvite(e) {
    e.preventDefault();
    if (!email.trim() || !partnerId) return;
    const partner = partners.find((p) => p.id === partnerId);
    const code = `${(partner?.name ?? "ORG").split(" ")[0].toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    addInvite({
      id: `inv-${Date.now()}`,
      code,
      email: email.trim(),
      name: name.trim() || undefined,
      partnerId,
      status: "pending",
    });
    setEmail("");
    setName("");
  }

  return (
    <AppChrome
      title="Invites & assignments"
      subtitle="Admin invites Listeners and assigns them to Partners. Partners notify Admin for distribution in v1."
      nav={<AdminNav />}
    >
      <form
        onSubmit={createInvite}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:flex md:flex-wrap md:items-end md:gap-4"
      >
        <label className="block flex-1">
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">Listener email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[14px] text-white outline-none"
          />
        </label>
        <label className="mt-4 block flex-1 md:mt-0">
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[14px] text-white outline-none"
          />
        </label>
        <label className="mt-4 block md:mt-0 md:w-56">
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">Partner</span>
          <select
            value={partnerId}
            onChange={(e) => setPartnerId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[14px] text-white outline-none"
          >
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="mt-4 rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black md:mt-0">
          Send invite
        </button>
      </form>

      <ul className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10">
        {invites.map((inv) => (
          <li key={inv.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div>
              <p className="font-mono text-[13px] text-white">{inv.code}</p>
              <p className="mt-0.5 text-[12px] text-white/45">{inv.email}</p>
            </div>
            <span className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] capitalize text-white/70">
              {inv.status}
            </span>
          </li>
        ))}
      </ul>
    </AppChrome>
  );
}

export function AdminAnalytics() {
  const { role, analyticsEvents, listenHistory, feedback } = useAppStore();
  if (role !== "admin") return <Navigate to="/app" replace />;

  const summary = useMemo(() => {
    const byType = {};
    for (const e of analyticsEvents) {
      byType[e.type] = (byType[e.type] || 0) + 1;
    }
    return byType;
  }, [analyticsEvents]);

  return (
    <AppChrome
      title="Analytics"
      subtitle="Invite acceptance, listening habits, completion, and Organisation-linked usage for billing."
      nav={<AdminNav />}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Events</p>
          <p className="mt-3 text-[1.75rem] text-white">{analyticsEvents.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Play records</p>
          <p className="mt-3 text-[1.75rem] text-white">{listenHistory.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Feedback</p>
          <p className="mt-3 text-[1.75rem] text-white">{feedback.length}</p>
        </div>
      </div>

      <ul className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10">
        {Object.entries(summary).map(([type, count]) => (
          <li key={type} className="flex justify-between px-5 py-3 text-[13px]">
            <span className="text-white/80">{type}</span>
            <span className="text-white">{count}</span>
          </li>
        ))}
        {!Object.keys(summary).length ? (
          <li className="px-5 py-6 text-[13px] text-white/40">No events yet — walk the Listener golden path.</li>
        ) : null}
      </ul>
    </AppChrome>
  );
}
