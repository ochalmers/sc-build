import {
  AdminPhone,
  WfButton,
  WfField,
  WfMetric,
  WfRow,
  WfTab,
} from "../../shared/AdminWireframe.jsx";

export function SessionManagementScreen({ variant = "upload" }) {
  const labels = { upload: "Upload session", edit: "Edit session", archive: "Archive session" };
  return (
    <AdminPhone label={`Session management — ${labels[variant]}`}>
      <WfTab tabs={["Upload", "Edit", "Archive"]} active={variant.charAt(0).toUpperCase() + variant.slice(1)} />
      <div className="flex flex-1 flex-col px-4 pt-4">
        {variant === "upload" ? (
          <>
            <div className="flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-[#D4D4D8] bg-white text-[10px] text-[#A1A1AA]">
              Drop audio file or browse
            </div>
            <div className="mt-4 space-y-3">
              <WfField label="Title" placeholder="Session title" />
              <WfField label="Category" placeholder="Regulation" />
              <WfField label="Duration" placeholder="12 min" />
            </div>
          </>
        ) : variant === "edit" ? (
          <div className="space-y-3">
            <WfField label="Title" placeholder="Calm" />
            <WfField label="Description" placeholder="Session description…" />
            <WfField label="Neurotype tags" placeholder="Regulation, calm" />
            <WfField label="Thumbnail" placeholder="Upload artwork" />
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[11px] leading-relaxed text-[#52525B]">
              Archiving removes this session from active Partner bundles. Existing downloads may remain until revoked.
            </p>
            <WfRow primary="Calm" secondary="Regulation · 10 min" action="Archive" />
            <WfRow primary="Focus" secondary="Performance · 15 min" action="Archive" />
          </div>
        )}
      </div>
      <div className="space-y-2 px-4 pb-6">
        <WfButton>{variant === "archive" ? "Confirm archive" : "Save"}</WfButton>
        <WfButton primary={false}>Cancel</WfButton>
      </div>
    </AdminPhone>
  );
}

export function ListenerManagementScreen({ variant = "invite" }) {
  const tabs = { invite: "Invite", remove: "Remove", assign: "Assign" };
  return (
    <AdminPhone label={`Listener management — ${tabs[variant]}`}>
      <WfTab tabs={["Invite", "Remove", "Assign"]} active={tabs[variant]} />
      <div className="flex flex-1 flex-col px-4 pt-4">
        {variant === "invite" ? (
          <div className="space-y-3">
            <WfField label="Partner" placeholder="Select partner" />
            <WfField label="Listener email" placeholder="listener@email.com" />
            <WfField label="Bundle" placeholder="Care starter" />
          </div>
        ) : variant === "remove" ? (
          <>
            <p className="text-[10px] text-[#71717A]">Revoke access for selected listeners.</p>
            <WfRow primary="j.smith@email.com" secondary="Partner: West Clinic" action="Remove" />
            <WfRow primary="a.jones@email.com" secondary="Partner: Direct" action="Remove" />
          </>
        ) : (
          <div className="space-y-3">
            <WfField label="Listener" placeholder="j.smith@email.com" />
            <WfField label="Assign sessions" placeholder="Calm, Reset, Focus" />
            <WfField label="Bundle override" placeholder="Optional" />
          </div>
        )}
      </div>
      <div className="px-4 pb-6">
        <WfButton>{variant === "remove" ? "Confirm removal" : "Apply"}</WfButton>
      </div>
    </AdminPhone>
  );
}

export function AnalyticsDashboardScreen() {
  return (
    <AdminPhone label="Analytics dashboard">
      <div className="grid grid-cols-2 gap-2 p-4">
        <WfMetric label="MAU" value="1,240" />
        <WfMetric label="Hours listened" value="3.2k" />
        <WfMetric label="Completion rate" value="78%" />
        <WfMetric label="Active partners" value="12" />
      </div>
      <div className="mx-4 mb-4 flex h-28 items-center justify-center rounded-xl border border-dashed border-[#D4D4D8] bg-white text-[10px] text-[#A1A1AA]">
        Usage chart · top sessions · partner breakdown
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA]">
          Top sessions
        </p>
        <WfRow primary="Calm" secondary="412 completions" />
        <WfRow primary="Focus" secondary="318 completions" />
        <WfRow primary="Rest" secondary="256 completions" />
      </div>
      <div className="px-4 pb-6">
        <WfButton primary={false}>Export CSV</WfButton>
      </div>
    </AdminPhone>
  );
}
