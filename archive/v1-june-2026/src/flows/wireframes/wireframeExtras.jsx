import {
  WireframePhone,
  WfTag,
  WfButton,
  WfField,
  WfTabBar,
  WfSessionRow,
} from "./WireframePhone.jsx";
import { WebWireframe, WfWebRow, WfWebBtn } from "./WebWireframe.jsx";

/* ——— Additional mobile screens ——— */

function ScreenOnboardingStep2() {
  return (
    <WireframePhone label="Onboarding step 2">
      <WfTag>Wireframe — onboarding</WfTag>
      <div className="flex-1 px-5 pt-2">
        <div className="flex gap-1.5 pb-3">
          <div className="h-1 w-7 rounded-full bg-[#E4E4E7]" />
          <div className="h-1 w-7 rounded-full bg-[#18181B]" />
          <div className="h-1 w-7 rounded-full bg-[#E4E4E7]" />
        </div>
        <h2 className="text-[16px] font-bold">How to listen</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          Headphones, quiet space, session length, and what to expect.
        </p>
        <div className="mt-4 space-y-2">
          {["Use headphones", "One Session at a time", "12–20 min typical"].map((t) => (
            <div key={t} className="rounded-lg border border-[#E4E4E7] px-3 py-2 text-[11px] font-medium">
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Next</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenLibraryFilter() {
  return (
    <WireframePhone label="Filtered library">
      <div className="px-5 pt-2">
        <WfTag>Wireframe — library</WfTag>
        <h2 className="text-[18px] font-bold">Sessions</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-[#18181B] bg-[#18181B] px-2.5 py-1 text-[9px] font-semibold text-white">
            Regulation
          </span>
          {["14 min", "Evening"].map((c) => (
            <span key={c} className="rounded-full border border-[#E4E4E7] px-2.5 py-1 text-[9px] font-semibold text-[#52525B]">
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2 flex-1">
        <WfSessionRow title="Arrive · settle" meta="14 min · Regulation" />
        <WfSessionRow title="Deep unwind" meta="22 min · Evening" />
      </div>
      <WfTabBar active="sessions" />
    </WireframePhone>
  );
}

function ScreenLibraryEmpty() {
  return (
    <WireframePhone label="Empty library">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <WfTag>Wireframe — library</WfTag>
        <div className="mt-6 h-16 w-16 rounded-2xl border-2 border-dashed border-[#D4D4D8] bg-[#F4F4F5]" />
        <p className="mt-4 text-[14px] font-semibold">No Sessions yet</p>
        <p className="mt-2 text-[11px] leading-relaxed text-[#71717A]">
          Your Partner hasn&apos;t assigned Sessions. Contact your administrator.
        </p>
      </div>
      <div className="px-5 pb-6">
        <WfButton primary={false}>Contact Partner admin</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenHome() {
  return (
    <WireframePhone label="Home tab">
      <div className="flex-1 px-5 pt-4">
        <WfTag>Wireframe — home</WfTag>
        <h2 className="text-[18px] font-bold">Welcome back</h2>
        <p className="mt-2 text-[11px] text-[#71717A]">Continue your listening rhythm.</p>
        <div className="mt-5 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA]">Continue</p>
          <p className="mt-2 text-[13px] font-semibold">Arrive · settle</p>
          <p className="text-[10px] text-[#71717A]">14 min · Regulation</p>
          <div className="mt-3">
            <WfButton>Resume</WfButton>
          </div>
        </div>
      </div>
      <WfTabBar active="home" />
    </WireframePhone>
  );
}

function ScreenProfile() {
  return (
    <WireframePhone label="Profile / You">
      <div className="flex-1 px-5 pt-2">
        <WfTag>Wireframe — profile</WfTag>
        <h2 className="text-[18px] font-bold">You</h2>
        <div className="mt-4 space-y-0">
          {["About Sonocea", "Help & support", "Listening profile", "Sign out"].map((r) => (
            <div key={r} className="flex justify-between border-b border-[#F4F4F5] py-3.5 text-[12px] font-semibold">
              {r}
              <span className="text-[#A1A1AA]">›</span>
            </div>
          ))}
        </div>
      </div>
      <WfTabBar active="profile" />
    </WireframePhone>
  );
}

function ScreenPlayerPaused() {
  return (
    <WireframePhone label="Player paused" dark>
      <WfTag>Wireframe — player</WfTag>
      <div className="mx-3 flex flex-1 flex-col rounded-[18px] bg-[#0A0A0A] p-3">
        <p className="text-[15px] font-bold text-[#FAFAFA]">Arrive · settle</p>
        <div className="my-3 flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#3F3F46] bg-[#18181B] text-[10px] text-[#71717A]">
          Paused · visualization idle
        </div>
        <div className="flex justify-center gap-8 pb-2 text-[#E4E4E7]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FAFAFA] text-sm">
            ▶
          </div>
        </div>
      </div>
    </WireframePhone>
  );
}

function ScreenInviteExpired() {
  return (
    <WireframePhone label="Invalid / expired invite">
      <WfTag>Wireframe — error</WfTag>
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-[15px] font-semibold">Invite unavailable</p>
        <p className="mt-2 text-[11px] leading-relaxed text-[#71717A]">
          This invite has expired or was revoked. Ask your Partner to resend.
        </p>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton primary={false}>Contact support</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenErrorRevoked() {
  return (
    <WireframePhone label="Access revoked">
      <WfTag>Wireframe — error</WfTag>
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-[15px] font-semibold">Access ended</p>
        <p className="mt-2 text-[11px] leading-relaxed text-[#71717A]">
          Your listening access was removed. Playback and downloads are no longer available.
        </p>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Return to login</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenErrorNetwork() {
  return (
    <WireframePhone label="Network / buffering">
      <WfTag>Wireframe — player</WfTag>
      <div className="mx-3 flex flex-1 flex-col rounded-[18px] bg-[#0A0A0A] p-3">
        <p className="text-[15px] font-bold text-[#FAFAFA]">Arrive · settle</p>
        <div className="my-3 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-[#3F3F46] bg-[#18181B] text-center">
          <p className="text-[11px] text-[#A1A1AA]">Buffering…</p>
          <p className="mt-1 text-[9px] text-[#71717A]">Check connection or use offline copy</p>
        </div>
      </div>
    </WireframePhone>
  );
}

function ScreenFacilitatorSelect() {
  return (
    <WireframePhone label="Facilitator selects Session">
      <div className="px-5 pt-2">
        <WfTag>Wireframe — clinical</WfTag>
        <h2 className="text-[16px] font-bold">Choose for listener</h2>
        <p className="mt-1 text-[10px] text-[#71717A]">Metadata for staff selection</p>
      </div>
      <div className="mt-2 flex-1">
        <WfSessionRow title="Arrive · settle" meta="15 min · Pre-procedure · Calm" />
        <WfSessionRow title="Comfort presence" meta="30 min · Palliative · Continuous" />
        <WfSessionRow title="Night settling" meta="20 min · Postpartum · Home" />
      </div>
    </WireframePhone>
  );
}

function ScreenPrivacyRequest() {
  return (
    <WireframePhone label="Privacy request">
      <WfTag>Wireframe — privacy</WfTag>
      <div className="flex-1 px-5 pt-2">
        <h2 className="text-[16px] font-bold">Data & privacy</h2>
        <p className="mt-2 text-[11px] text-[#52525B]">Request export or deletion of your data.</p>
        <div className="mt-4 space-y-3">
          <WfButton primary={false}>Request data export</WfButton>
          <WfButton primary={false}>Request account deletion</WfButton>
        </div>
      </div>
    </WireframePhone>
  );
}

function ScreenMarketingCta() {
  return (
    <WireframePhone label="Public CTA form">
      <div className="flex-1 px-5 pt-4">
        <WfTag>Wireframe — public CTA</WfTag>
        <h2 className="text-[15px] font-bold">Get access</h2>
        <WfField label="Email" placeholder="you@email.com" />
        <p className="mt-3 text-[10px] text-[#71717A]">No playback — interest capture only.</p>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Submit</WfButton>
      </div>
    </WireframePhone>
  );
}

/* ——— Web / console wireframes ——— */

function WebPartnerLogin() {
  return (
    <WebWireframe label="Partner branded login" title="Partner Console">
      <h3 className="text-[13px] font-bold">Sign in</h3>
      <div className="mt-3 space-y-2">
        <div className="rounded border border-[#D4D4D8] px-2 py-1.5 text-[10px] text-[#A1A1AA]">Partner admin email</div>
        <div className="rounded border border-[#D4D4D8] px-2 py-1.5 text-[10px] text-[#A1A1AA]">Password</div>
      </div>
      <div className="mt-3">
        <WfWebBtn>Continue</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

function WebPartnerWelcome() {
  return (
    <WebWireframe label="Welcome & CTAs" title="Partner Console">
      <h3 className="text-[13px] font-bold">Welcome</h3>
      <p className="mt-1 text-[10px] text-[#71717A]">Provision Listeners and track usage.</p>
      <div className="mt-3 grid gap-2">
        <WfWebBtn>Send invite</WfWebBtn>
        <WfWebBtn primary={false}>View usage</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

function WebPartnerInvite() {
  return (
    <WebWireframe label="Send invite" title="Partner · Invite">
      <WfField label="Listener email" placeholder="listener@email.com" />
      <div className="mt-2 rounded border border-[#D4D4D8] px-2 py-1.5 text-[10px] text-[#A1A1AA]">Or phone (SMS)</div>
      <div className="mt-3">
        <WfWebBtn>Send invite</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

function WebPartnerAssign() {
  return (
    <WebWireframe label="Assign Sessions / bundle" title="Partner · Assign">
      <p className="text-[10px] font-semibold text-[#52525B]">Listener: Jane D.</p>
      <div className="mt-2 space-y-1.5">
        <WfWebRow title="Regulation bundle" sub="6 Sessions" active />
        <WfWebRow title="Arrive · settle" sub="Individual Session" />
      </div>
      <div className="mt-3">
        <WfWebBtn>Save assignment</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

function WebPartnerListeners() {
  return (
    <WebWireframe label="Listener roster" title="Partner · Listeners">
      <div className="space-y-1.5">
        <WfWebRow title="Jane D." sub="Active · 4.2 hrs" active />
        <WfWebRow title="Alex M." sub="Invited · pending" />
        <WfWebRow title="Sam K." sub="Paused" />
      </div>
    </WebWireframe>
  );
}

function WebPartnerUsage() {
  return (
    <WebWireframe label="Usage dashboard" title="Partner · Usage">
      <div className="grid grid-cols-2 gap-2">
        {[
          ["Active", "24"],
          ["Hours", "128"],
          ["Completions", "89"],
          ["Seats used", "18/25"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-[#E4E4E7] p-2">
            <p className="text-[8px] uppercase text-[#A1A1AA]">{k}</p>
            <p className="text-[14px] font-bold">{v}</p>
          </div>
        ))}
      </div>
    </WebWireframe>
  );
}

function WebPartnerBilling() {
  return (
    <WebWireframe label="Billing export" title="Partner · Billing">
      <p className="text-[10px] text-[#71717A]">Period: Jan 2026</p>
      <div className="mt-2 rounded-lg border border-[#E4E4E7] p-2 text-[10px]">
        <p>Plan: site_license</p>
        <p>Seats: 18 / 25 included</p>
        <p className="font-semibold">Subtotal: $8,000</p>
      </div>
      <div className="mt-3">
        <WfWebBtn>Export CSV</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

function WebAdminUpload() {
  return (
    <WebWireframe label="Upload Session" title="Admin CMS · Upload">
      <div className="flex h-16 items-center justify-center rounded-lg border-2 border-dashed border-[#D4D4D8] bg-[#F4F4F5] text-[10px] text-[#71717A]">
        Drop audio file
      </div>
      <div className="mt-2 space-y-1">
        <div className="text-[9px] font-semibold text-[#52525B]">Title, duration, neurotype, tags…</div>
      </div>
      <div className="mt-3">
        <WfWebBtn>Publish</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

function WebAdminContent() {
  return (
    <WebWireframe label="Content library" title="Admin CMS · Content">
      <WfWebRow title="Arrive · settle" sub="v3 · published" active />
      <div className="mt-1.5">
        <WfWebRow title="Deep unwind" sub="v1 · published" />
      </div>
      <div className="mt-3 flex gap-2">
        <WfWebBtn primary={false}>Rollback</WfWebBtn>
        <WfWebBtn>Replace</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

function WebAdminPartner() {
  return (
    <WebWireframe label="Create Partner & plan" title="Admin CMS · Partners">
      <WfField label="Partner name" placeholder="Clinic / org name" />
      <div className="mt-2 rounded border border-[#D4D4D8] px-2 py-1.5 text-[10px]">Plan: site_license · 100 seats</div>
      <div className="mt-3">
        <WfWebBtn>Create Partner</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

function WebAdminAssign() {
  return (
    <WebWireframe label="Assignment matrix" title="Admin CMS · Assign">
      <p className="text-[10px] text-[#71717A]">Admin → Partner → Bundle</p>
      <div className="mt-2 space-y-1.5">
        <WfWebRow title="Regulation bundle → Clinic A" sub="12 Sessions" active />
        <WfWebRow title="Neurotypical group → Clinic B" sub="Session group" />
      </div>
    </WebWireframe>
  );
}

function WebAdminInvites() {
  return (
    <WebWireframe label="Direct invites" title="Admin CMS · Invites">
      <WfWebRow title="jane@…" sub="Sent · pending" active />
      <WfWebRow title="alex@…" sub="Accepted · active" />
      <div className="mt-3">
        <WfWebBtn>Send new invite</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

function WebAdminDashboard() {
  return (
    <WebWireframe label="Ops dashboard" title="Admin · Analytics">
      <div className="grid grid-cols-2 gap-2">
        {[
          ["Invites sent", "412"],
          ["Accept rate", "78%"],
          ["First-play latency", "2.1d"],
          ["MAU", "1.2k"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-[#E4E4E7] p-2">
            <p className="text-[8px] text-[#A1A1AA]">{k}</p>
            <p className="text-[13px] font-bold">{v}</p>
          </div>
        ))}
      </div>
    </WebWireframe>
  );
}

function WebAdminPeople() {
  return (
    <WebWireframe label="People management" title="Admin · People">
      <div className="mb-2 rounded border border-[#D4D4D8] px-2 py-1 text-[10px] text-[#A1A1AA]">Search…</div>
      <WfWebRow title="Jane D. · Listener" sub="Active · last login 2h" active />
      <div className="mt-1.5">
        <WfWebRow title="Clinic A · Partner" sub="site_license" />
      </div>
    </WebWireframe>
  );
}

function WebAdminFeedback() {
  return (
    <WebWireframe label="Feedback inbox" title="Admin · Feedback">
      <WfWebRow title="Session rating · 4/5" sub="Arrive · settle · Clinic A" active />
      <div className="mt-1.5">
        <WfWebRow title="App experience · 5/5" sub="Listener anonymized" />
      </div>
    </WebWireframe>
  );
}

function WebAdminBilling() {
  return (
    <WebWireframe label="Billing export" title="Admin · Billing">
      <p className="text-[10px]">Partner: Clinic A · Jan 2026</p>
      <div className="mt-2 h-12 rounded border border-[#E4E4E7] bg-[#FAFAFA] p-2 font-mono text-[8px] text-[#71717A]">
        partner_id, seats_used, subtotal…
      </div>
      <div className="mt-3">
        <WfWebBtn>Export CSV</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

export const WIREFRAME_EXTRAS = {
  "onboarding-step2": { Component: ScreenOnboardingStep2, variant: "mobile" },
  "library-filter": { Component: ScreenLibraryFilter, variant: "mobile" },
  "library-empty": { Component: ScreenLibraryEmpty, variant: "mobile" },
  home: { Component: ScreenHome, variant: "mobile" },
  profile: { Component: ScreenProfile, variant: "mobile" },
  "player-paused": { Component: ScreenPlayerPaused, variant: "mobile" },
  "invite-expired": { Component: ScreenInviteExpired, variant: "mobile" },
  "error-revoked": { Component: ScreenErrorRevoked, variant: "mobile" },
  "error-network": { Component: ScreenErrorNetwork, variant: "mobile" },
  "facilitator-select": { Component: ScreenFacilitatorSelect, variant: "mobile" },
  "privacy-request": { Component: ScreenPrivacyRequest, variant: "mobile" },
  "marketing-cta": { Component: ScreenMarketingCta, variant: "mobile" },
  "partner-login": { Component: WebPartnerLogin, variant: "web" },
  "partner-welcome": { Component: WebPartnerWelcome, variant: "web" },
  "partner-invite": { Component: WebPartnerInvite, variant: "web" },
  "partner-assign": { Component: WebPartnerAssign, variant: "web" },
  "partner-listeners": { Component: WebPartnerListeners, variant: "web" },
  "partner-usage": { Component: WebPartnerUsage, variant: "web" },
  "partner-billing": { Component: WebPartnerBilling, variant: "web" },
  "admin-upload": { Component: WebAdminUpload, variant: "web" },
  "admin-content": { Component: WebAdminContent, variant: "web" },
  "admin-partner": { Component: WebAdminPartner, variant: "web" },
  "admin-assign": { Component: WebAdminAssign, variant: "web" },
  "admin-invites": { Component: WebAdminInvites, variant: "web" },
  "admin-dashboard": { Component: WebAdminDashboard, variant: "web" },
  "admin-people": { Component: WebAdminPeople, variant: "web" },
  "admin-feedback": { Component: WebAdminFeedback, variant: "web" },
  "admin-billing": { Component: WebAdminBilling, variant: "web" },
};
