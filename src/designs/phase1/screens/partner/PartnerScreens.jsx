import {
  AdminPhone,
  WfButton,
  WfField,
  WfMetric,
  WfRow,
  WfTab,
} from "../../shared/AdminWireframe.jsx";

export function PartnerLoginScreen() {
  return (
    <AdminPhone label="Partner login">
      <div className="flex flex-1 flex-col px-4 pt-6">
        <h2 className="text-[16px] font-bold text-[#18181B]">Partner console</h2>
        <p className="mt-1 text-[10px] text-[#71717A]">Sign in to manage listeners and view usage.</p>
        <div className="mt-5 space-y-3">
          <WfField label="Email" placeholder="partner@clinic.com" />
          <WfField label="Password" placeholder="••••••••" />
        </div>
      </div>
      <div className="space-y-2 px-4 pb-6">
        <WfButton>Sign in</WfButton>
        <WfButton primary={false}>Forgot password</WfButton>
      </div>
    </AdminPhone>
  );
}

export function PartnerDashboardScreen() {
  return (
    <AdminPhone label="Partner dashboard">
      <div className="grid grid-cols-3 gap-2 p-4">
        <WfMetric label="Invited" value="48" />
        <WfMetric label="Activated" value="32" />
        <WfMetric label="Listening" value="18" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA]">
          Recent activity
        </p>
        <WfRow primary="j.smith@email.com" secondary="First play · Calm" />
        <WfRow primary="a.jones@email.com" secondary="Invite accepted" />
        <WfRow primary="m.lee@email.com" secondary="Session complete · Focus" />
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 pb-6">
        <WfButton>Invite listener</WfButton>
        <WfButton primary={false}>Export CSV</WfButton>
      </div>
    </AdminPhone>
  );
}

export function InviteListenerScreen() {
  return (
    <AdminPhone label="Invite listener">
      <div className="flex flex-1 flex-col px-4 pt-4">
        <h2 className="text-[14px] font-bold text-[#18181B]">Provision a listener</h2>
        <p className="mt-1 text-[10px] text-[#71717A]">Send an invite via email or SMS.</p>
        <div className="mt-4 space-y-3">
          <WfField label="Email" placeholder="listener@email.com" />
          <WfField label="Bundle" placeholder="Regulation starter pack" />
          <WfField label="Optional message" placeholder="Your clinic has invited you…" />
        </div>
      </div>
      <div className="space-y-2 px-4 pb-6">
        <WfButton>Send invite</WfButton>
        <WfButton primary={false}>Cancel</WfButton>
      </div>
    </AdminPhone>
  );
}

export function ListenerListScreen() {
  return (
    <AdminPhone label="Listener list">
      <WfTab tabs={["All", "Active", "Invited"]} active="All" />
      <div className="flex-1 overflow-hidden">
        <WfRow primary="Jane Smith" secondary="Active · 12 sessions" action="View" />
        <WfRow primary="Alex Jones" secondary="Invited · pending" action="Resend" />
        <WfRow primary="Morgan Lee" secondary="Active · 4 sessions" action="View" />
        <WfRow primary="Sam Taylor" secondary="Removed" action="—" />
      </div>
      <div className="px-4 pb-6">
        <WfButton>Invite listener</WfButton>
      </div>
    </AdminPhone>
  );
}
