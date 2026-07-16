import { Link, useLocation } from "react-router-dom";
import { formatDuration } from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { AppChrome, ConsoleNavLink } from "../../components/AppChrome.jsx";

export function PartnerHome() {
  const { user, partners, listeners, listenHistory, catalog } = useAppStore();
  const location = useLocation();

  const partner = partners.find((p) => p.id === user.partnerId);
  const roster = listeners.filter((l) => l.partnerId === user.partnerId);
  const entitled = catalog.filter((s) => s.partnerIds.includes(user.partnerId));
  const orgListens = listenHistory.filter((h) =>
    entitled.some((s) => s.id === h.sessionId),
  );
  const completed = orgListens.filter((h) => h.progressPct >= 90).length;
  const seatPct = partner ? Math.round((partner.seatsUsed / partner.seats) * 100) : 0;

  return (
    <AppChrome
      title={partner?.name ?? "Partner console"}
      subtitle="Scoped usage and billing reconciliation. Listener management is notified through Admin — Partners do not self-serve invites in v1."
      nav={
        <>
          <ConsoleNavLink to="/app/partner" active={location.pathname === "/app/partner"}>
            Usage
          </ConsoleNavLink>
          <ConsoleNavLink to="/app/partner/billing" active={location.pathname.includes("billing")}>
            Billing
          </ConsoleNavLink>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Seats used", value: `${partner?.seatsUsed ?? 0} / ${partner?.seats ?? 0}`, note: `${seatPct}% of pool` },
          { label: "Listeners", value: roster.length, note: `${roster.filter((l) => l.status === "active").length} active` },
          { label: "Completions", value: completed, note: `${orgListens.length} play events` },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">{card.label}</p>
            <p className="mt-3 text-[1.75rem] font-medium tracking-tight text-white">{card.value}</p>
            <p className="mt-1 text-[13px] text-white/45">{card.note}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-[15px] font-medium text-white">Entitled Sessions</h2>
        <p className="mt-1 text-[13px] text-white/45">Assigned by Admin · visible to your Listeners</p>
        <ul className="mt-5 divide-y divide-white/10 rounded-2xl border border-white/10">
          {entitled.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-[14px] text-white">{s.title}</p>
                <p className="mt-0.5 text-[12px] text-white/45">
                  {s.useCase} · {formatDuration(s.durationMin)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-[15px] font-medium text-white">Listener roster</h2>
        <ul className="mt-5 divide-y divide-white/10 rounded-2xl border border-white/10">
          {roster.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-[14px] text-white">{l.name}</p>
                <p className="mt-0.5 text-[12px] text-white/45">{l.email}</p>
              </div>
              <span className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] capitalize text-white/70">
                {l.status}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13px] text-white/40">
          To add Listeners, ask Sonocea Admin —{" "}
          <Link to="/app/admin" className="text-white/70 underline-offset-2 hover:underline">
            open Admin demo
          </Link>
          .
        </p>
      </section>
    </AppChrome>
  );
}

export function PartnerBilling() {
  const { user, partners, listenHistory, catalog } = useAppStore();
  const location = useLocation();

  const partner = partners.find((p) => p.id === user.partnerId);
  const entitledIds = new Set(catalog.filter((s) => s.partnerIds.includes(user.partnerId)).map((s) => s.id));
  const usageMinutes = listenHistory
    .filter((h) => entitledIds.has(h.sessionId))
    .reduce((sum, h) => sum + (h.durationMin * h.progressPct) / 100, 0);

  return (
    <AppChrome
      title="Billing reconciliation"
      subtitle={`Model: ${partner?.billingModel ?? "—"}. Export is mocked for demo iteration.`}
      nav={
        <>
          <ConsoleNavLink to="/app/partner" active={location.pathname === "/app/partner"}>
            Usage
          </ConsoleNavLink>
          <ConsoleNavLink to="/app/partner/billing" active>
            Billing
          </ConsoleNavLink>
        </>
      }
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
        <dl className="grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-white/45">Billing model</dt>
            <dd className="mt-2 text-[18px] capitalize text-white">{partner?.billingModel}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-white/45">Seat pool</dt>
            <dd className="mt-2 text-[18px] text-white">
              {partner?.seatsUsed} / {partner?.seats}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-white/45">Est. listening minutes</dt>
            <dd className="mt-2 text-[18px] text-white">{Math.round(usageMinutes)}</dd>
          </div>
        </dl>

        <button
          type="button"
          className="mt-8 rounded-full border border-white/20 px-4 py-2 text-[12px] text-white/80 hover:border-white/40"
          onClick={() => {
            const rows = [
              ["metric", "value"],
              ["partner", partner?.name ?? ""],
              ["model", partner?.billingModel ?? ""],
              ["seats_used", String(partner?.seatsUsed ?? "")],
              ["seats_total", String(partner?.seats ?? "")],
              ["listening_minutes", String(Math.round(usageMinutes))],
            ];
            const csv = rows.map((r) => r.join(",")).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${partner?.id ?? "partner"}-usage.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Download CSV export
        </button>
      </div>
    </AppChrome>
  );
}
