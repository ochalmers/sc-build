import { PRD_ROLES } from "../content/prdFlows.js";

export function RoleOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PRD_ROLES.map((role) => (
        <div
          key={role.id}
          className="rounded-2xl border border-ink-200/80 bg-white/55 p-5 md:p-6"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">{role.surface}</p>
          <h3 className="mt-2 text-[16px] font-medium tracking-tight text-ink-950">{role.label}</h3>
          <p className="mt-3 text-[13px] leading-relaxed text-ink-600">{role.summary}</p>
        </div>
      ))}
    </div>
  );
}
