import { Link, useLocation } from "react-router-dom";

export const fieldClass =
  "mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[14px] text-white outline-none focus:border-white/40";
export const labelClass = "text-[11px] uppercase tracking-[0.12em] text-white/45";

const ADMIN_NAV_ITEMS = [
  { to: "/app/admin", label: "Overview", end: true },
  { to: "/app/admin/organizations", label: "Organisations", match: ["/organizations", "/partners"] },
  { to: "/app/admin/programmes", label: "Programmes", match: ["/programmes"] },
  { to: "/app/admin/listeners", label: "Participants", match: ["/listeners"] },
  { to: "/app/admin/content", label: "Content", match: ["/content", "/sessions"] },
  { to: "/app/admin/analytics", label: "Insights", match: ["/analytics"] },
  { to: "/app/admin/settings", label: "Settings", match: ["/settings", "/export"] },
];

function isNavActive(pathname, item) {
  if (item.end) return pathname === item.to;
  return (item.match ?? []).some((fragment) => pathname.includes(fragment));
}

/** Left-hand Admin console navigation. */
export function AdminNav() {
  const { pathname } = useLocation();

  return (
    <aside className="flex h-full w-[14rem] shrink-0 flex-col overflow-y-auto bg-black/30 px-3.5 py-6">
      <p className="px-2.5 text-[15px] font-semibold tracking-tight text-white">Sonocea Admin</p>
      <nav className="mt-5 space-y-1" aria-label="Admin">
        {ADMIN_NAV_ITEMS.map((item) => {
          const active = isNavActive(pathname, item);
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={`flex w-full rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors ${
                active
                  ? "bg-white text-black"
                  : "text-white/45 hover:bg-white/[0.05] hover:text-white/75"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function TabPill({ id, label, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`rounded-full px-3 py-1.5 text-[12px] ${
        active ? "bg-white text-black" : "border border-white/15 text-white/70 hover:border-white/35"
      }`}
    >
      {label}
    </button>
  );
}

export function Chip({ children, tone = "default" }) {
  const tones = {
    default: "border-white/15 text-white/60",
    ok: "border-emerald-400/30 text-emerald-200/80",
    muted: "border-white/10 text-white/40",
    warn: "border-amber-400/30 text-amber-100/80",
  };
  return (
    <span className={`rounded-full border px-2.5 py-1 text-[11px] ${tones[tone] ?? tones.default}`}>
      {children}
    </span>
  );
}

export function toggleInList(list, id) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}
