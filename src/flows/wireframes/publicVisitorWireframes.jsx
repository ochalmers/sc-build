import {
  WireframePhone,
  WfTag,
  WfButton,
  WfField,
} from "./WireframePhone.jsx";

function SliderRow({ label }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] text-[#52525B]">
        <span>{label}</span>
        <span className="text-[#A1A1AA]">—</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#E4E4E7]">
        <div className="h-full w-1/2 rounded-full bg-[#18181B]" />
      </div>
    </div>
  );
}

function ScreenGetStarted() {
  return (
    <WireframePhone label="Get Started">
      <div className="flex flex-1 flex-col px-5 pt-4">
        <WfTag>Public Visitor · Layer 0</WfTag>
        <h2 className="mt-4 text-[18px] font-bold leading-tight">Welcome to Sonocea</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          Experience structured sound — or sign in with your invitation.
        </p>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Discover Sonocea</WfButton>
        <WfButton primary={false}>Accept Invitation</WfButton>
        <p className="pt-1 text-center text-[12px] font-medium text-[#3F3F46]">Login</p>
      </div>
    </WireframePhone>
  );
}

function ScreenCheckIn() {
  return (
    <WireframePhone label="Nervous system check-in">
      <div className="flex-1 px-5 pt-4">
        <WfTag>Public Visitor · check-in</WfTag>
        <h2 className="mt-4 text-[16px] font-bold leading-tight">How is your nervous system today?</h2>
        <div className="mt-5 space-y-4">
          <SliderRow label="Stress level" />
          <SliderRow label="Your energy level" />
          <SliderRow label="Focus" />
          <SliderRow label="Restfulness" />
        </div>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Continue</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenHeadphones() {
  return (
    <WireframePhone label="Headphone prompt">
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-4 text-center">
        <WfTag>Public Visitor · prep</WfTag>
        <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-[#D4D4D8] bg-[#F4F4F5] text-[10px] text-[#71717A]">
          🎧
        </div>
        <h2 className="mt-5 text-[16px] font-bold">Put on your headphones</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          Find a quiet place, free of distractions, for a 5-minute nervous system reset.
        </p>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Begin 5-minute reset</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenPublicListening() {
  return (
    <WireframePhone label="5-minute reset">
      <div className="flex flex-1 flex-col px-5 pt-4">
        <WfTag>Public Visitor · sample</WfTag>
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#71717A]">Curated sample</p>
        <h2 className="mt-1 text-[16px] font-bold">Nervous System Reset</h2>
        <div className="mt-6 flex flex-1 flex-col items-center justify-center">
          <div className="h-28 w-28 rounded-full border-2 border-[#18181B] bg-[#F4F4F5]" />
          <p className="mt-4 font-mono text-[20px] font-bold">3:42</p>
          <p className="mt-1 text-[10px] text-[#71717A]">Non-clinical · no licensed protocol</p>
        </div>
      </div>
      <div className="flex justify-center gap-6 px-5 pb-6">
        <div className="h-10 w-10 rounded-full border border-[#D4D4D8]" />
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#18181B] text-white">▶</div>
        <div className="h-10 w-10 rounded-full border border-[#D4D4D8]" />
      </div>
    </WireframePhone>
  );
}

function ScreenReflection() {
  return (
    <WireframePhone label="Reflection">
      <div className="flex-1 px-5 pt-4">
        <WfTag>Public Visitor · reflection</WfTag>
        <h2 className="mt-4 text-[16px] font-bold leading-tight">How did that feel?</h2>
        <p className="mt-2 text-[11px] text-[#52525B]">Remeasure your nervous system.</p>
        <div className="mt-5 space-y-4">
          <SliderRow label="Stress level" />
          <SliderRow label="Your energy level" />
          <SliderRow label="Focus" />
          <SliderRow label="Restfulness" />
        </div>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Continue</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenScienceHome() {
  const topics = ["Autonomic nervous system", "Why sound influences physiology", "Sonic Augmentation Technology™", "Sonostasis®"];
  return (
    <WireframePhone label="Science home">
      <div className="flex-1 px-5 pt-4">
        <WfTag>Public Visitor · science</WfTag>
        <h2 className="mt-4 text-[16px] font-bold">How Sonocea works</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          What you just experienced — and the science behind structured sound.
        </p>
        <div className="mt-4 space-y-2">
          {topics.map((t) => (
            <div
              key={t}
              className="flex items-center justify-between rounded-xl border border-[#E4E4E7] bg-white px-3 py-2.5 text-[11px] font-medium text-[#3F3F46]"
            >
              {t}
              <span className="text-[#A1A1AA]">›</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto flex justify-between border-t border-[#F4F4F5] px-5 py-2.5">
        {["Home", "Science", "Access"].map((label, i) => (
          <div key={label} className="flex w-14 flex-col items-center gap-1">
            <div
              className="h-[18px] w-[18px] rounded-md"
              style={{
                background: i === 1 ? "#18181B" : "transparent",
                border: i === 1 ? "none" : "1px solid #D4D4D8",
              }}
            />
            <span
              className="text-[8px] font-semibold uppercase"
              style={{ color: i === 1 ? "#18181B" : "#A1A1AA" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </WireframePhone>
  );
}

function ScreenTopicDetail() {
  return (
    <WireframePhone label="Topic detail">
      <div className="flex-1 px-5 pt-4">
        <WfTag>Public Visitor · education</WfTag>
        <p className="text-[10px] font-medium text-[#71717A]">Science</p>
        <h2 className="mt-1 text-[16px] font-bold leading-tight">What is the autonomic nervous system?</h2>
        <div className="mt-4 space-y-2 text-[11px] leading-relaxed text-[#52525B]">
          <div className="h-2 w-full rounded bg-[#E4E4E7]" />
          <div className="h-2 w-[92%] rounded bg-[#E4E4E7]" />
          <div className="h-2 w-[85%] rounded bg-[#E4E4E7]" />
          <div className="h-2 w-full rounded bg-[#E4E4E7]" />
          <div className="h-2 w-[78%] rounded bg-[#E4E4E7]" />
        </div>
      </div>
      <div className="px-5 pb-6">
        <WfButton primary={false}>Back to Science</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenRequestAccess() {
  return (
    <WireframePhone label="Request access">
      <div className="flex-1 px-5 pt-4">
        <WfTag>Public Visitor · Layer 3</WfTag>
        <h2 className="mt-4 text-[16px] font-bold">Stay in the loop</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          Request access for yourself or your organization.
        </p>
        <div className="mt-4 space-y-3">
          <WfField label="Name" placeholder="Your name" />
          <WfField label="Email" placeholder="you@email.com" />
          <WfField label="Organization (optional)" placeholder="Hospital, clinic, team…" />
        </div>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Submit request</WfButton>
        <WfButton primary={false}>Join mailing list only</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenInvitation() {
  return (
    <WireframePhone label="Invitation intro">
      <div className="flex flex-1 flex-col px-5 pt-4">
        <WfTag>Invited Participant</WfTag>
        <h2 className="mt-4 text-[18px] font-bold leading-tight">You&apos;re invited</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          Your organization has provisioned Sonocea access. Activate your account to begin listening.
        </p>
        <div className="mt-5 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-4 text-[11px] text-[#52525B]">
          Brief intro to Sonocea before sign-up — may preview public content (IP-01).
        </div>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Activate account</WfButton>
        <WfButton primary={false}>Learn more first</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenReturningHome() {
  const cards = ["Daily Reset", "Science", "Research", "Applications", "Our Story"];
  return (
    <WireframePhone label="Returning public home">
      <div className="flex-1 px-5 pt-4">
        <WfTag>Public Visitor · returning</WfTag>
        <h2 className="mt-4 text-[16px] font-bold">Welcome back</h2>
        <p className="mt-2 text-[11px] text-[#52525B]">How is your nervous system today?</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {cards.map((c, i) => (
            <div
              key={c}
              className={`rounded-xl border border-[#E4E4E7] p-3 text-[10px] font-medium text-[#3F3F46] ${
                i === 0 ? "col-span-2 bg-[#F4F4F5]" : "bg-white"
              }`}
            >
              {c}
              {i === 0 ? (
                <p className="mt-1 font-normal text-[#71717A]">Light auth to replay sample (FR-006)</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto flex justify-between border-t border-[#F4F4F5] px-5 py-2.5">
        {["Home", "Reset", "Access"].map((label, i) => (
          <div key={label} className="flex w-14 flex-col items-center gap-1">
            <div
              className="h-[18px] w-[18px] rounded-md"
              style={{
                background: i === 0 ? "#18181B" : "transparent",
                border: i === 0 ? "none" : "1px solid #D4D4D8",
              }}
            />
            <span
              className="text-[8px] font-semibold uppercase"
              style={{ color: i === 0 ? "#18181B" : "#A1A1AA" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </WireframePhone>
  );
}

const MOBILE = { variant: "mobile" };

export const PUBLIC_VISITOR_WIREFRAMES = {
  "pv-get-started": { Component: ScreenGetStarted, title: "Get Started", ...MOBILE },
  "pv-check-in": { Component: ScreenCheckIn, title: "Check-in", ...MOBILE },
  "pv-headphones": { Component: ScreenHeadphones, title: "Headphones", ...MOBILE },
  "pv-listening": { Component: ScreenPublicListening, title: "5-min reset", ...MOBILE },
  "pv-reflection": { Component: ScreenReflection, title: "Reflection", ...MOBILE },
  "pv-science-home": { Component: ScreenScienceHome, title: "Science home", ...MOBILE },
  "pv-topic-detail": { Component: ScreenTopicDetail, title: "Topic detail", ...MOBILE },
  "pv-request-access": { Component: ScreenRequestAccess, title: "Request access", ...MOBILE },
  "pv-invitation": { Component: ScreenInvitation, title: "Invitation", ...MOBILE },
  "pv-returning-home": { Component: ScreenReturningHome, title: "Returning home", ...MOBILE },
};
