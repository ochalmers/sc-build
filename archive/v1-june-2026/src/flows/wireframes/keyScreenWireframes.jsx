import {
  WireframePhone,
  WfTag,
  WfButton,
  WfField,
  WfTabBar,
  WfSessionRow,
} from "./WireframePhone.jsx";
import { WebWireframe, WfWebRow, WfWebBtn } from "./WebWireframe.jsx";

/* ——— Listener: auth & onboarding ——— */

export function ScreenSplashDark() {
  return (
    <WireframePhone label="Splash · dark" dark>
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-6">
        <div className="h-24 w-24 rounded-[28px] border-2 border-dashed border-[#3F3F46] bg-[#18181B]" />
        <p className="mt-5 text-[20px] font-bold tracking-tight text-[#FAFAFA]">Sonocea</p>
        <p className="mt-3 h-1 w-16 overflow-hidden rounded-full bg-[#27272A]">
          <span className="block h-full w-1/2 rounded-full bg-[#FAFAFA]" />
        </p>
      </div>
    </WireframePhone>
  );
}

export function ScreenWelcomeGuest() {
  return (
    <WireframePhone label="Welcome · guest">
      <div className="flex flex-1 flex-col px-5 pt-4">
        <WfTag>Wireframe — welcome</WfTag>
        <div className="mt-4 flex h-28 items-center justify-center rounded-2xl border-2 border-dashed border-[#D4D4D8] bg-[#F4F4F5] text-[10px] text-[#71717A]">
          Brand / SAT™ intro
        </div>
        <h2 className="mt-5 text-[17px] font-bold">Sound for how you listen</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          Learn what Sonocea is and how invite-only access works.
        </p>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Learn more</WfButton>
        <WfButton primary={false}>Enter invite</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenWelcomeInvited() {
  return (
    <WireframePhone label="Welcome · invited">
      <div className="flex flex-1 flex-col px-5 pt-4">
        <WfTag>Wireframe — welcome</WfTag>
        <p className="mt-2 rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-[10px] text-[#52525B]">
          Invite from <span className="font-semibold">Partner Clinic</span>
        </p>
        <h2 className="mt-5 text-[17px] font-bold">You&apos;re invited</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          Redeem your access code to begin onboarding.
        </p>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Redeem invite</WfButton>
        <WfButton primary={false}>Learn about Sonocea</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenInviteEmpty() {
  return (
    <WireframePhone label="Invite · empty">
      <WfTag>Wireframe — invite</WfTag>
      <div className="flex-1 px-5 pt-2">
        <h2 className="text-[18px] font-bold">Access code</h2>
        <p className="mt-2 text-[11px] text-[#52525B]">Redeem your Partner or personal invite.</p>
        <div className="mt-5">
          <WfField label="Invite code" placeholder="SON-XXXX-XXXX" />
        </div>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Continue</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenInviteValid() {
  return (
    <WireframePhone label="Invite · valid">
      <WfTag>Wireframe — invite</WfTag>
      <div className="flex-1 px-5 pt-2">
        <h2 className="text-[18px] font-bold">Access code</h2>
        <div className="mt-4 rounded-[10px] border-2 border-[#18181B] px-3 py-2.5 text-[12px] font-semibold">
          SON-A8K2-9F3M
        </div>
        <p className="mt-3 rounded-lg bg-[#FAFAFA] px-3 py-2 text-[10px] font-medium text-[#52525B]">
          ✓ Valid · Clinic A · expires in 14 days
        </p>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Continue</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenInviteInvalid() {
  return (
    <WireframePhone label="Invite · invalid">
      <WfTag>Wireframe — invite</WfTag>
      <div className="flex-1 px-5 pt-2">
        <h2 className="text-[18px] font-bold">Access code</h2>
        <div className="mt-4 rounded-[10px] border-2 border-[#DC2626] px-3 py-2.5 text-[12px]">
          SON-XXXX-WRONG
        </div>
        <p className="mt-3 text-[11px] font-medium text-[#DC2626]">Code not recognized. Check and try again.</p>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Try again</WfButton>
        <WfButton primary={false}>Contact Partner</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenOnboardingIntro3() {
  return (
    <WireframePhone label="Onboarding · how it works">
      <WfTag>Wireframe — onboarding</WfTag>
      <div className="flex-1 px-5 pt-2">
        <div className="flex gap-1.5 pb-3">
          <div className="h-1 w-7 rounded-full bg-[#E4E4E7]" />
          <div className="h-1 w-7 rounded-full bg-[#E4E4E7]" />
          <div className="h-1 w-7 rounded-full bg-[#18181B]" />
        </div>
        <h2 className="text-[16px] font-bold">How Sessions work</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          Assigned library · play in app · optional feedback after completion.
        </p>
        <div className="mt-4 space-y-2">
          {["Browse assigned Sessions", "Play with headphones", "Reflect when prompted"].map((t) => (
            <div key={t} className="flex gap-2 rounded-lg border border-[#E4E4E7] px-3 py-2 text-[10px] font-medium">
              <span className="text-[#A1A1AA]">○</span>
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Continue</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenNeurotypeProgress() {
  return (
    <WireframePhone label="Neurotype · progress">
      <WfTag>Wireframe — neurotype</WfTag>
      <div className="flex-1 px-5 pt-2">
        <div className="flex items-center justify-between text-[10px] text-[#71717A]">
          <span>Question 2 of 5</span>
          <span>40%</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#E4E4E7]">
          <div className="h-full w-[40%] rounded-full bg-[#18181B]" />
        </div>
        <h2 className="mt-5 text-[16px] font-bold">Listening environment</h2>
        <p className="mt-2 text-[11px] text-[#52525B]">Where do you usually listen?</p>
        <div className="mt-4 space-y-2">
          {["Quiet home", "Clinical / hospital", "On the go"].map((o, i) => (
            <div
              key={o}
              className="rounded-xl border px-3 py-2.5 text-[11px] font-medium"
              style={{ borderColor: i === 0 ? "#18181B" : "#E4E4E7" }}
            >
              {o}
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

export function ScreenNeurotypeComplete() {
  return (
    <WireframePhone label="Neurotype · complete">
      <WfTag>Wireframe — neurotype</WfTag>
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="h-14 w-14 rounded-full border-2 border-[#18181B] bg-[#FAFAFA]" />
        <p className="mt-4 text-[15px] font-semibold">Profile captured</p>
        <p className="mt-2 text-[11px] leading-relaxed text-[#71717A]">
          We&apos;ll use this to tailor Session recommendations.
        </p>
      </div>
      <div className="px-5 pb-6">
        <WfButton>See recommendations</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenListeningGuidance() {
  const tips = [
    { title: "Headphones", sub: "Stereo or over-ear preferred" },
    { title: "Quiet environment", sub: "Reduce interruptions" },
    { title: "Duration", sub: "12–20 min typical; one Session at a time" },
  ];
  return (
    <WireframePhone label="Listening guidance">
      <WfTag>Wireframe — guidance</WfTag>
      <div className="flex-1 px-5 pt-2">
        <h2 className="text-[17px] font-bold">Get the best results</h2>
        <p className="mt-2 text-[11px] text-[#52525B]">Quick tips before your first Session.</p>
        <div className="mt-5 space-y-3">
          {tips.map((t) => (
            <div key={t.title} className="flex gap-3 rounded-xl border border-[#E4E4E7] p-3">
              <div className="h-9 w-9 shrink-0 rounded-lg bg-[#E4E4E7]" />
              <div>
                <p className="text-[12px] font-semibold">{t.title}</p>
                <p className="text-[10px] text-[#71717A]">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Continue to library</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenRecommendedProfile() {
  return (
    <WireframePhone label="Recommended profile">
      <WfTag>Wireframe — outcome</WfTag>
      <div className="flex-1 px-5 pt-2">
        <h2 className="text-[17px] font-bold">Your listening profile</h2>
        <p className="mt-2 text-[11px] text-[#52525B]">
          You appear to align most closely with…
        </p>
        <div className="mt-5 rounded-2xl border border-[#18181B] bg-[#FAFAFA] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA]">Profile</p>
          <p className="mt-2 text-[15px] font-bold">Regulation · evening listener</p>
          <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
            Calm, reset, and unwind Sessions may fit best.
          </p>
        </div>
        <p className="mt-4 text-[10px] text-[#71717A]">Adjust anytime in Profile.</p>
      </div>
      <div className="px-5 pb-6">
        <WfButton>View library</WfButton>
      </div>
    </WireframePhone>
  );
}

/* ——— Library & session ——— */

export function ScreenLibrarySearch() {
  return (
    <WireframePhone label="Library · search">
      <div className="px-5 pt-2">
        <WfTag>Wireframe — library</WfTag>
        <h2 className="text-[18px] font-bold">Sessions</h2>
        <div className="mt-3 rounded-[10px] border-2 border-[#18181B] px-3 py-2 text-[11px] font-semibold">
          calm ·
        </div>
        <p className="mt-2 text-[10px] text-[#71717A]">3 results in your library</p>
      </div>
      <div className="mt-2 flex-1">
        <WfSessionRow title="Calm" meta="18 min · Regulation" />
        <WfSessionRow title="Reset" meta="14 min · Regulation" />
      </div>
      <WfTabBar active="sessions" />
    </WireframePhone>
  );
}

export function ScreenLibraryLight() {
  return (
    <WireframePhone label="Library · light mode ref">
      <div className="px-5 pt-1">
        <WfTag>Light mode reference</WfTag>
        <h2 className="text-[18px] font-bold">Sessions</h2>
      </div>
      <div className="mt-2 flex-1">
        <WfSessionRow title="Hospital Preparation" meta="Care · 16 min" />
        <WfSessionRow title="Calm" meta="Regulation · 18 min" />
      </div>
      <WfTabBar active="sessions" />
    </WireframePhone>
  );
}

export function ScreenDetailAssigned() {
  return (
    <WireframePhone label="Session detail · assigned">
      <div className="flex h-28 items-center justify-center border-b-2 border-dashed border-[#D4D4D8] bg-[#F4F4F5] text-[10px] text-[#71717A]">
        Session artwork
      </div>
      <div className="flex-1 px-5 pt-3">
        <WfTag>Wireframe — detail</WfTag>
        <span className="rounded-full bg-[#18181B] px-2 py-0.5 text-[8px] font-semibold text-white">
          Assigned
        </span>
        <h2 className="mt-2 text-[17px] font-bold">Calm</h2>
        <p className="mt-2 text-[11px] text-[#52525B]">Partner-assigned · Regulation category</p>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Play</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenDetailRemoved() {
  return (
    <WireframePhone label="Session detail · removed">
      <div className="flex h-28 items-center justify-center border-b border-[#E4E4E7] bg-[#F4F4F5] text-[10px] text-[#A1A1AA]">
        Unavailable
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <WfTag>Wireframe — detail</WfTag>
        <p className="mt-4 text-[14px] font-semibold">Session no longer available</p>
        <p className="mt-2 text-[11px] text-[#71717A]">Your Partner removed this from your library.</p>
      </div>
      <div className="px-5 pb-6">
        <WfButton primary={false}>Back to library</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenDetailLight() {
  return (
    <WireframePhone label="Session detail · light ref">
      <div className="flex h-28 items-center justify-center border-b-2 border-dashed border-[#D4D4D8] bg-[#FEF3C7] text-[10px] text-[#92400E]">
        Care artwork
      </div>
      <div className="flex-1 px-5 pt-3">
        <WfTag>Light mode reference</WfTag>
        <h2 className="text-[17px] font-bold">Hospital Preparation</h2>
        <p className="mt-2 text-[11px] text-[#52525B]">Care · 16 min · Benefits placeholder</p>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Play</WfButton>
      </div>
    </WireframePhone>
  );
}

/* ——— Player ——— */

export function ScreenPlayerIdle() {
  return (
    <WireframePhone label="Player · idle" dark>
      <WfTag>Wireframe — player</WfTag>
      <div className="mx-3 flex flex-1 flex-col items-center justify-center rounded-[18px] border border-dashed border-[#3F3F46] bg-[#0A0A0A] p-4 text-center">
        <div className="h-20 w-20 rounded-2xl bg-[#27272A]" />
        <p className="mt-4 text-[14px] font-bold text-[#FAFAFA]">Calm</p>
        <p className="mt-1 text-[10px] text-[#71717A]">Tap play to begin</p>
        <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#FAFAFA] text-[#0A0A0A]">
          ▶
        </div>
      </div>
    </WireframePhone>
  );
}

export function ScreenPlayerCompleted() {
  return (
    <WireframePhone label="Player · completed" dark>
      <WfTag>Wireframe — player</WfTag>
      <div className="mx-3 flex flex-1 flex-col items-center justify-center rounded-[18px] bg-[#0A0A0A] p-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA]">Complete</p>
        <p className="mt-3 text-[15px] font-bold text-[#FAFAFA]">Calm</p>
        <p className="mt-2 text-[11px] text-[#71717A]">Session finished · 18:00</p>
        <div className="mt-6 w-full space-y-2">
          <WfButton>Rate this Session</WfButton>
          <WfButton primary={false}>Back to library</WfButton>
        </div>
      </div>
    </WireframePhone>
  );
}

export function ScreenPlayerBackground() {
  return (
    <WireframePhone label="Player · background" dark>
      <WfTag>Wireframe — player</WfTag>
      <div className="mx-3 flex flex-1 flex-col rounded-[18px] bg-[#0A0A0A] p-3 opacity-60">
        <p className="text-[12px] text-[#71717A]">Minimized player</p>
      </div>
      <div className="px-5 pb-4">
        <div className="rounded-xl border border-[#27272A] bg-[#18181B] px-3 py-2">
          <p className="text-[10px] font-semibold text-[#FAFAFA]">Now playing · Calm</p>
          <p className="text-[9px] text-[#71717A]">Background audio · lock screen controls</p>
        </div>
      </div>
    </WireframePhone>
  );
}

export function ScreenPlayerLight() {
  return (
    <WireframePhone label="Player · light ref">
      <WfTag>Light mode reference</WfTag>
      <div className="mx-3 flex flex-1 flex-col rounded-[18px] border border-[#E4E4E7] bg-[#FAFAFA] p-3">
        <p className="text-[14px] font-bold">Focus</p>
        <div className="my-3 flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#D4D4D8] bg-white text-[10px] text-[#71717A]">
          Visualization
        </div>
        <div className="h-1 rounded-full bg-[#E4E4E7]">
          <div className="h-full w-1/3 rounded-full bg-[#18181B]" />
        </div>
      </div>
    </WireframePhone>
  );
}

export function ScreenLibraryLoading() {
  return (
    <WireframePhone label="Loading · library">
      <div className="px-5 pt-4">
        <WfTag>Wireframe — loading</WfTag>
        <div className="h-6 w-24 rounded bg-[#E4E4E7]" />
        <div className="mt-4 h-9 rounded-lg bg-[#F4F4F5]" />
      </div>
      <div className="mt-4 space-y-3 px-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="h-11 w-11 rounded-[10px] bg-[#E4E4E7]" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 w-3/4 rounded bg-[#E4E4E7]" />
              <div className="h-2 w-1/2 rounded bg-[#F4F4F5]" />
            </div>
          </div>
        ))}
      </div>
      <WfTabBar active="sessions" />
    </WireframePhone>
  );
}

export function ScreenDetailLoading() {
  return (
    <WireframePhone label="Loading · detail">
      <div className="h-28 bg-[#E4E4E7]" />
      <div className="flex-1 space-y-3 px-5 pt-4">
        <WfTag>Wireframe — loading</WfTag>
        <div className="h-5 w-2/3 rounded bg-[#E4E4E7]" />
        <div className="h-3 w-full rounded bg-[#F4F4F5]" />
        <div className="h-3 w-5/6 rounded bg-[#F4F4F5]" />
      </div>
    </WireframePhone>
  );
}

export function ScreenPlayerLoading() {
  return (
    <WireframePhone label="Loading · player" dark>
      <WfTag>Wireframe — loading</WfTag>
      <div className="mx-3 flex flex-1 flex-col items-center justify-center rounded-[18px] bg-[#18181B]">
        <div className="h-8 w-8 animate-pulse rounded-full border-2 border-[#3F3F46] border-t-[#FAFAFA]" />
        <p className="mt-4 text-[11px] text-[#71717A]">Preparing Session…</p>
      </div>
    </WireframePhone>
  );
}

/* ——— Favorites & feedback ——— */

export function ScreenFavoritesEmpty() {
  return (
    <WireframePhone label="Favorites · empty">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <WfTag>Wireframe — favorites</WfTag>
        <div className="mt-4 h-14 w-14 rounded-2xl border-2 border-dashed border-[#D4D4D8] bg-[#F4F4F5]" />
        <p className="mt-4 text-[14px] font-semibold">No favorites yet</p>
        <p className="mt-2 text-[11px] text-[#71717A]">Save Sessions from your library.</p>
      </div>
      <WfTabBar active="saved" />
    </WireframePhone>
  );
}

export function ScreenFeedbackSubmitted() {
  return (
    <WireframePhone label="Feedback · submitted">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <WfTag>Wireframe — feedback</WfTag>
        <p className="mt-4 text-[15px] font-semibold">Thank you</p>
        <p className="mt-2 text-[11px] text-[#71717A]">Your reflection helps improve Sessions.</p>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Done</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenFeedbackRating() {
  return (
    <WireframePhone label="Feedback · rating">
      <WfTag>Wireframe — feedback</WfTag>
      <div className="flex-1 px-5 pt-2">
        <h2 className="text-[16px] font-bold">How was this Session?</h2>
        <div className="mt-5 flex justify-between gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-10 rounded-[10px] border-2"
              style={{ borderColor: i < 4 ? "#18181B" : "#E4E4E7", background: i < 4 ? "#FAFAFA" : "transparent" }}
            />
          ))}
        </div>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Add comment</WfButton>
      </div>
    </WireframePhone>
  );
}

/* ——— Success & empty states ——— */

export function ScreenSuccessInvite() {
  return (
    <WireframePhone label="Success · invite redeemed">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <WfTag>Wireframe — success</WfTag>
        <p className="text-[15px] font-semibold">Access granted</p>
        <p className="mt-2 text-[11px] text-[#71717A]">Let&apos;s set up your listening profile.</p>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Start onboarding</WfButton>
      </div>
    </WireframePhone>
  );
}

export function ScreenEmptyAssignments() {
  return (
    <WireframePhone label="Empty · no assignments">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <WfTag>Wireframe — empty</WfTag>
        <p className="text-[14px] font-semibold">No assignments</p>
        <p className="mt-2 text-[11px] text-[#71717A]">Your Partner hasn&apos;t assigned Sessions yet.</p>
      </div>
    </WireframePhone>
  );
}

export function ScreenErrorSessionUnavailable() {
  return (
    <WireframePhone label="Error · session unavailable">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <WfTag>Wireframe — error</WfTag>
        <p className="text-[15px] font-semibold">Session unavailable</p>
        <p className="mt-2 text-[11px] text-[#71717A]">This Session can&apos;t be played right now.</p>
      </div>
      <div className="px-5 pb-6">
        <WfButton primary={false}>Try again</WfButton>
      </div>
    </WireframePhone>
  );
}

/* ——— Partner & admin ——— */

export function WebPartnerDashboard() {
  return (
    <WebWireframe label="Partner dashboard" title="Partner Console">
      <h3 className="text-[13px] font-bold">Dashboard</h3>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ["Invited", "48"],
          ["Activated", "32"],
          ["Listening", "18"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-[#E4E4E7] p-2 text-center">
            <p className="text-[7px] uppercase text-[#A1A1AA]">{k}</p>
            <p className="text-[13px] font-bold">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <WfWebBtn>Invite listener</WfWebBtn>
        <WfWebBtn primary={false}>View list</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

export function WebAdminSessionEdit() {
  return (
    <WebWireframe label="Edit session" title="Admin · Sessions">
      <WfWebRow title="Calm" sub="Regulation · v2" active />
      <div className="mt-2 space-y-1.5 text-[9px]">
        <div className="rounded border border-[#D4D4D8] px-2 py-1 text-[#A1A1AA]">Title, description, tags…</div>
        <div className="rounded border border-[#D4D4D8] px-2 py-1 text-[#A1A1AA]">Artwork · category</div>
      </div>
      <div className="mt-3 flex gap-2">
        <WfWebBtn>Save</WfWebBtn>
        <WfWebBtn primary={false}>Archive</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

export function WebAdminArchive() {
  return (
    <WebWireframe label="Archive session" title="Admin · Sessions">
      <p className="text-[11px] font-semibold">Archive &quot;Deep Work&quot;?</p>
      <p className="mt-1 text-[9px] text-[#71717A]">Removes from active catalog; existing assignments may persist.</p>
      <div className="mt-3 flex gap-2">
        <WfWebBtn primary={false}>Cancel</WfWebBtn>
        <WfWebBtn>Confirm archive</WfWebBtn>
      </div>
    </WebWireframe>
  );
}

export function WebAdminListenerMgmt() {
  return (
    <WebWireframe label="Listener management" title="Admin · Listeners">
      <div className="mb-2 flex gap-2">
        <WfWebBtn>Invite</WfWebBtn>
        <WfWebBtn primary={false}>Assign</WfWebBtn>
        <WfWebBtn primary={false}>Remove</WfWebBtn>
      </div>
      <WfWebRow title="Jane D." sub="Listener · Clinic A" active />
      <div className="mt-1.5">
        <WfWebRow title="Alex M." sub="Invited · pending" />
      </div>
    </WebWireframe>
  );
}

/* ——— Session artwork tiles ——— */

const ARTWORK_PALETTES = {
  care: { bg: "#FEF3C7", border: "#FCD34D", label: "Care" },
  regulation: { bg: "#F4F4F5", border: "#D4D4D8", label: "Regulation" },
  performance: { bg: "#DBEAFE", border: "#93C5FD", label: "Performance" },
};

export function SessionArtworkTile({ title, category }) {
  const palette = ARTWORK_PALETTES[category] ?? ARTWORK_PALETTES.regulation;
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex h-[120px] w-[90px] flex-col justify-end overflow-hidden rounded-xl border-2 p-2 shadow-sm"
        style={{ background: palette.bg, borderColor: palette.border }}
      >
        <div className="h-8 w-full rounded-md border border-dashed opacity-40" style={{ borderColor: palette.border }} />
        <p className="mt-2 text-[9px] font-bold leading-tight text-[#18181B]">{title}</p>
        <p className="text-[7px] font-semibold uppercase tracking-wider text-[#71717A]">{palette.label}</p>
      </div>
    </div>
  );
}

/* ——— Design system primitives ——— */

export function DsPrimitivesStrip() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-8 rounded-2xl border border-dashed border-ink-200 bg-white/50 p-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-ink-500">Buttons</p>
        <div className="space-y-2">
          <WfButton>Primary</WfButton>
          <WfButton primary={false}>Secondary</WfButton>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-ink-500">Inputs</p>
        <div className="w-[200px] rounded-[10px] border border-[#D4D4D8] px-3 py-2 text-[11px] text-[#A1A1AA]">
          Placeholder
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-ink-500">Cards</p>
        <div className="w-[140px] rounded-xl border border-[#E4E4E7] p-3">
          <div className="h-10 rounded-lg bg-[#E4E4E7]" />
          <p className="mt-2 text-[10px] font-semibold">Session card</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-ink-500">Navigation</p>
        <div className="w-[200px]">
          <WfTabBar active="sessions" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-ink-500">Player</p>
        <div className="w-[120px] rounded-xl bg-[#0A0A0A] p-2">
          <div className="h-6 rounded bg-[#27272A]" />
          <div className="mt-2 flex justify-center">
            <div className="h-6 w-6 rounded-full bg-[#FAFAFA]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const KEY_SCREEN_WIREFRAMES = {
  "splash-dark": { Component: ScreenSplashDark, variant: "mobile" },
  "welcome-guest": { Component: ScreenWelcomeGuest, variant: "mobile" },
  "welcome-invited": { Component: ScreenWelcomeInvited, variant: "mobile" },
  "invite-empty": { Component: ScreenInviteEmpty, variant: "mobile" },
  "invite-valid": { Component: ScreenInviteValid, variant: "mobile" },
  "invite-invalid": { Component: ScreenInviteInvalid, variant: "mobile" },
  "onboarding-intro-3": { Component: ScreenOnboardingIntro3, variant: "mobile" },
  "neurotype-progress": { Component: ScreenNeurotypeProgress, variant: "mobile" },
  "neurotype-complete": { Component: ScreenNeurotypeComplete, variant: "mobile" },
  "listening-guidance": { Component: ScreenListeningGuidance, variant: "mobile" },
  "recommended-profile": { Component: ScreenRecommendedProfile, variant: "mobile" },
  "library-search": { Component: ScreenLibrarySearch, variant: "mobile" },
  "library-light": { Component: ScreenLibraryLight, variant: "mobile" },
  "library-loading": { Component: ScreenLibraryLoading, variant: "mobile" },
  "detail-assigned": { Component: ScreenDetailAssigned, variant: "mobile" },
  "detail-removed": { Component: ScreenDetailRemoved, variant: "mobile" },
  "detail-light": { Component: ScreenDetailLight, variant: "mobile" },
  "detail-loading": { Component: ScreenDetailLoading, variant: "mobile" },
  "player-idle": { Component: ScreenPlayerIdle, variant: "mobile" },
  "player-completed": { Component: ScreenPlayerCompleted, variant: "mobile" },
  "player-background": { Component: ScreenPlayerBackground, variant: "mobile" },
  "player-light": { Component: ScreenPlayerLight, variant: "mobile" },
  "player-loading": { Component: ScreenPlayerLoading, variant: "mobile" },
  "favorites-empty": { Component: ScreenFavoritesEmpty, variant: "mobile" },
  "feedback-rating": { Component: ScreenFeedbackRating, variant: "mobile" },
  "feedback-submitted": { Component: ScreenFeedbackSubmitted, variant: "mobile" },
  "success-invite": { Component: ScreenSuccessInvite, variant: "mobile" },
  "empty-assignments": { Component: ScreenEmptyAssignments, variant: "mobile" },
  "error-session-unavailable": { Component: ScreenErrorSessionUnavailable, variant: "mobile" },
  "partner-dashboard": { Component: WebPartnerDashboard, variant: "web" },
  "admin-session-edit": { Component: WebAdminSessionEdit, variant: "web" },
  "admin-archive": { Component: WebAdminArchive, variant: "web" },
  "admin-listener-mgmt": { Component: WebAdminListenerMgmt, variant: "web" },
};
