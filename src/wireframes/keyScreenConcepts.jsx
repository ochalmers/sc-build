/**
 * Key-screen concept wireframes (B–E exploration directions).
 * Concept A uses the canonical flow baseline from the main registry.
 */
import { WF, WF_TYPE } from "./tokens.js";
import {
  BRAND,
  CHECK_IN,
  ENTRY,
  EXPERIENCED,
  GUIDANCE,
  NEUROTYPE,
  PUBLIC_SAMPLE,
  SCIENCE_TOPICS,
  SESSIONS,
  TOPIC_DETAIL,
} from "./wireframeContent.js";
import {
  WireframeScreen,
  WfTag,
  WfHeadline,
  WfPlaceholder,
  WfButton,
  WfTextLink,
  WfField,
  WfProgress,
  WfSlider,
  WfListRow,
  WfChip,
  WfTabBar,
  WfScreenBody,
  WfScreenFooter,
  WfSkeletonLines,
  WfScreenHeader,
  WfSuccessMark,
  WfIcon,
  WfRowLink,
} from "./primitives.jsx";
import { getWireframePalette } from "./tokens.js";

/* ——— Tier 1: Core product ——— */

export function WfHomePlayerFirst() {
  const palette = getWireframePalette("dark");
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="items-center justify-center px-6 text-center">
        <WfTag>Today</WfTag>
        <WfPlaceholder size="icon" className="!h-24 !w-24" />
        <p className={`mt-4 ${WF_TYPE.titleSm}`} style={{ color: palette.text }}>
          Arrive · settle
        </p>
        <p className={WF_TYPE.bodySm} style={{ color: palette.placeholder }}>
          Resume · 05:18 left
        </p>
        <div className="mt-5">
          <WfIcon shape="controlLg" style={{ background: palette.fill, borderColor: palette.fill }} />
        </div>
        <WfTextLink>Browse all sessions</WfTextLink>
      </WfScreenBody>
      <WfTabBar active="home" />
    </WireframeScreen>
  );
}

export function WfHomeProtocol() {
  return (
    <WireframeScreen>
      <WfScreenHeader />
      <div className="px-5 pt-2">
        <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
          Assigned sessions for today
        </p>
        <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
          Your listening plan
        </h2>
        <div className="mt-4 space-y-2">
          {[
            { n: "1", t: "Arrive · settle", done: true },
            { n: "2", t: "Focus reset", done: false },
            { n: "3", t: "Wind down", done: false },
          ].map((s) => (
            <div
              key={s.n}
              className="flex items-center gap-3 rounded-xl border px-3 py-2.5"
              style={{ borderColor: WF.border }}
            >
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
                style={
                  s.done
                    ? { background: WF.fill, color: WF.bg }
                    : { border: `1px solid ${WF.border}`, color: WF.textMuted }
                }
              >
                {s.done ? "✓" : s.n}
              </div>
              <span className={WF_TYPE.body} style={{ color: WF.text }}>
                {s.t}
              </span>
            </div>
          ))}
        </div>
      </div>
      <WfTabBar active="home" />
    </WireframeScreen>
  );
}

export function WfHomeGrid() {
  const sessions = ["Arrive · settle", "Deep unwind", "Focus reset", "Wind down"];
  return (
    <WireframeScreen>
      <WfScreenHeader />
      <div className="px-5 pt-2">
        <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
          For you
        </h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <WfChip active>For you</WfChip>
          <WfChip>Recent</WfChip>
          <WfChip>Assigned</WfChip>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {sessions.map((t) => (
            <div key={t} className="rounded-xl border p-2" style={{ borderColor: WF.border }}>
              <WfPlaceholder size="sm" className="!h-10 !w-full" />
              <p className={`mt-1.5 ${WF_TYPE.bodySm}`} style={{ color: WF.text }}>
                {t}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mt-auto border-t px-3 pb-2.5 pt-2" style={{ borderColor: WF.border }}>
        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] text-white"
            style={{ background: WF.fill }}
          >
            ▶
          </div>
        </div>
        <div className="flex justify-between">
          {["Home", "Library", "Progress", "Profile"].map((label, i) => (
            <div key={label} className="flex w-14 flex-col items-center gap-1">
              <WfIcon shape="box" style={{ background: i === 0 ? WF.fill : "transparent", borderColor: i === 0 ? WF.fill : WF.border }} />
              <span className={WF_TYPE.caption} style={{ color: i === 0 ? WF.text : WF.placeholder }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </WireframeScreen>
  );
}

export function WfHomeLearnHub() {
  return (
    <WireframeScreen>
      <WfScreenHeader />
      <div className="px-5 pt-2">
        <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
          Good morning
        </h2>
        <div className="mt-3 rounded-xl border p-3" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            Continue
          </p>
          <p className={`mt-1 ${WF_TYPE.label}`} style={{ color: WF.text }}>
            Arrive · settle
          </p>
        </div>
        <div className="mt-3 rounded-xl border p-3" style={{ borderColor: WF.border }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            Learn
          </p>
          <p className={`mt-1 ${WF_TYPE.body}`} style={{ color: WF.text }}>
            Why structured sound calms the nervous system
          </p>
        </div>
      </div>
      <div className="mt-1 flex-1 overflow-hidden">
        <WfListRow title="Deep unwind" meta="22 min" />
        <WfListRow title="Focus reset" meta="18 min" />
      </div>
      <WfTabBar active="home" />
    </WireframeScreen>
  );
}

export function WfLibraryCompact() {
  return (
    <WireframeScreen>
      <WfScreenHeader />
      <div className="px-5 pt-2">
        <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
          Sessions
        </h2>
      </div>
      <div className="mt-2 flex-1">
        {["Arrive · settle · 14 min", "Deep unwind · 22 min", "Focus reset · 18 min", "Wind down · 15 min"].map(
          (t) => (
            <div key={t} className="border-b px-5 py-3" style={{ borderColor: WF.border }}>
              <p className={WF_TYPE.body} style={{ color: WF.text }}>
                {t}
              </p>
            </div>
          ),
        )}
      </div>
      <WfTabBar active="sessions" />
    </WireframeScreen>
  );
}

export function WfLibraryGrouped() {
  const groups = [
    { label: "Morning", items: ["Arrive · settle", "Focus reset"] },
    { label: "Evening", items: ["Deep unwind", "Wind down"] },
  ];
  return (
    <WireframeScreen>
      <WfScreenHeader />
      <div className="px-5 pt-2">
        <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
          Sessions
        </h2>
      </div>
      <div className="mt-2 flex-1 overflow-hidden">
        {groups.map((g) => (
          <div key={g.label}>
            <p
              className={`sticky top-0 px-5 py-2 ${WF_TYPE.bodySm} font-medium`}
              style={{ background: WF.bg, color: WF.textMuted }}
            >
              {g.label}
            </p>
            {g.items.map((t) => (
              <WfListRow key={t} title={t} meta="Assigned" />
            ))}
          </div>
        ))}
      </div>
      <WfTabBar active="sessions" />
    </WireframeScreen>
  );
}

export function WfDetailClinical() {
  return (
    <WireframeScreen>
      <WfPlaceholder size="md" className="!h-24 !rounded-none border-x-0 border-t-0" />
      <WfScreenBody className="px-5 pt-2">
        <WfTag>Clinical briefing</WfTag>
        <div className="mt-2 space-y-2">
          {[
            ["Indication", "Regulation · stress reduction"],
            ["Duration", SESSIONS.detail.duration],
            ["When to use", SESSIONS.detail.useCase],
            ["Neurotype", SESSIONS.detail.neurotype],
            ["Note", "Use headphones in a quiet space"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b py-2" style={{ borderColor: WF.border }}>
              <span className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
                {k}
              </span>
              <span className={WF_TYPE.bodySm} style={{ color: WF.text }}>
                {v}
              </span>
            </div>
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Play session</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfDetailMinimal() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-8">
        <div className="flex gap-4">
          <WfPlaceholder size="sm" className="!h-16 !w-16 shrink-0" />
          <div>
            <h2 className={WF_TYPE.titleSm} style={{ color: WF.text }}>
              Arrive · settle
            </h2>
            <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
              14 min · Regulation
            </p>
          </div>
        </div>
        <p className={`mt-4 ${WF_TYPE.body}`} style={{ color: WF.textSecondary }}>
          Brief purpose line — confirm before play.
        </p>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Play</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfDetailPreview() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Session detail</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Arrive · settle" subtitle="Narrative introduction to this session." />
        <div className="mt-4 rounded-xl border p-3" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            30s preview
          </p>
          <div className="mt-2 flex items-center gap-3">
            <WfIcon shape="control" />
            <div className="h-1 flex-1 rounded-full" style={{ background: WF.border }}>
              <div className="h-full w-1/3 rounded-full" style={{ background: WF.fill }} />
            </div>
            <span className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
              0:30
            </span>
          </div>
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Play full session</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfDetailCompare() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Compare</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Choose a session" subtitle="Similar sessions — pick the best fit." />
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { t: "Arrive · settle", rec: true },
            { t: "Gentle reset", rec: false },
          ].map((s) => (
            <div
              key={s.t}
              className="rounded-xl border p-3"
              style={{ borderColor: s.rec ? WF.fill : WF.border, background: WF.surface }}
            >
              {s.rec ? (
                <span className={`${WF_TYPE.bodySm} font-medium`} style={{ color: WF.text }}>
                  Recommended
                </span>
              ) : null}
              <p className={`mt-1 ${WF_TYPE.body}`} style={{ color: WF.text }}>
                {s.t}
              </p>
              <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
                14 min
              </p>
            </div>
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Play selected</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfPlayerTimer() {
  const palette = getWireframePalette("dark");
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="items-center justify-center px-6 text-center">
        <WfTag>Timed session</WfTag>
        <p className={`mt-6 font-mono text-4xl font-bold`} style={{ color: palette.text }}>
          08:42
        </p>
        <p className={`mt-2 ${WF_TYPE.bodySm}`} style={{ color: palette.placeholder }}>
          remaining
        </p>
        <p className={`mt-4 ${WF_TYPE.label}`} style={{ color: palette.text }}>
          Arrive · settle
        </p>
        <div className="mt-6">
          <WfIcon shape="controlLg" style={{ background: palette.fill, borderColor: palette.fill }} />
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfPlayerBreath() {
  const palette = getWireframePalette("dark");
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="items-center justify-center px-6">
        <WfTag>Listening</WfTag>
        <div
          className="flex h-32 w-32 items-center justify-center rounded-full border-2"
          style={{ borderColor: palette.border }}
        >
          <div className="h-20 w-20 rounded-full" style={{ background: palette.surface }} />
        </div>
        <p className={`mt-4 ${WF_TYPE.label}`} style={{ color: palette.text }}>
          Arrive · settle
        </p>
        <p className={WF_TYPE.bodySm} style={{ color: palette.placeholder }}>
          Subtle pulse · tap to toggle
        </p>
        <div className="mt-4">
          <WfIcon shape="controlLg" style={{ background: palette.fill, borderColor: palette.fill }} />
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfPlayerCaption() {
  const palette = getWireframePalette("dark");
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-4">
        <WfTag>Player</WfTag>
        <div className="flex flex-1 flex-col items-center justify-center">
          <WfPlaceholder size="md" className="!h-20" />
          <div className="mt-4 flex justify-center gap-6">
            <WfIcon shape="control" />
            <WfIcon shape="controlLg" style={{ background: palette.fill, borderColor: palette.fill }} />
            <WfIcon shape="control" />
          </div>
        </div>
        <div className="rounded-xl border p-3" style={{ borderColor: palette.border, background: palette.surface }}>
          <p className={WF_TYPE.bodySm} style={{ color: palette.placeholder }}>
            Transcript
          </p>
          <p className={`mt-1 ${WF_TYPE.body}`} style={{ color: palette.text }}>
            Find a comfortable position and allow the sound to guide you…
          </p>
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfPlayerMiniBrowse() {
  const palette = getWireframePalette("dark");
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-4">
        <WfTag>Library</WfTag>
        <WfListRow title="Deep unwind" meta="22 min" />
        <WfListRow title="Focus reset" meta="18 min" />
        <WfListRow title="Wind down" meta="15 min" />
      </WfScreenBody>
      <div
        className="mx-4 mb-2 flex items-center gap-3 rounded-full border px-3 py-2"
        style={{ borderColor: palette.border, background: palette.surface }}
      >
        <WfPlaceholder size="square" className="!h-8 !w-8" />
        <div className="min-w-0 flex-1">
          <p className={WF_TYPE.bodySm} style={{ color: palette.text }}>
            Arrive · settle
          </p>
          <p style={{ color: palette.placeholder, fontSize: 10 }}>
            05:18 left
          </p>
        </div>
        <WfIcon shape="control" />
      </div>
      <WfTabBar active="sessions" />
    </WireframeScreen>
  );
}

export function WfCompletionProgress() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-10 text-center">
        <WfSuccessMark />
        <p className={`mt-4 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
          Session complete
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {[
            ["Sessions completed", "4"],
            ["Minutes today", "28 min"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border p-3" style={{ borderColor: WF.border }}>
              <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
                {k}
              </p>
              <p className={`mt-1 ${WF_TYPE.label}`} style={{ color: WF.text }}>
                {v}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border p-3 text-left" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            Next up
          </p>
          <p className={`mt-1 ${WF_TYPE.body}`} style={{ color: WF.text }}>
            Focus reset · 18 min
          </p>
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfCompletionPartner() {
  return (
    <WireframeScreen>
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfSuccessMark />
        <p className={`mt-4 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
          Well done
        </p>
        <div className="mt-4 rounded-xl border p-4 text-left" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            Message from your care team
          </p>
          <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textSecondary }}>
            Great session today. Same time tomorrow?
          </p>
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfCompletionAuto() {
  return (
    <WireframeScreen>
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfSuccessMark />
        <p className={`mt-4 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
          Session complete
        </p>
        <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textMuted }}>
          Opening next session in your plan…
        </p>
        <div className="mt-4 h-1 w-24 overflow-hidden rounded-full" style={{ background: WF.border }}>
          <div className="h-full w-2/3 animate-pulse rounded-full" style={{ background: WF.fill }} />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfTextLink>Cancel auto-advance</WfTextLink>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

/* ——— Tier 2: Getting users in ——— */

export function WfSplashPulse() {
  const palette = getWireframePalette("dark");
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="items-center justify-center">
        <WfPlaceholder size="logo" />
        <p className={`mt-6 ${WF_TYPE.title}`} style={{ color: palette.text }}>
          {BRAND.name}
        </p>
        <div
          className="mt-6 h-16 w-16 rounded-full opacity-60"
          style={{ background: `radial-gradient(circle, ${palette.surface} 0%, transparent 70%)` }}
        />
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSplashPartner() {
  return (
    <WireframeScreen>
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfPlaceholder size="sm" className="!h-10 !w-24" />
        <p className={`mt-6 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          In partnership with
        </p>
        <WfPlaceholder size="logo" className="mt-2" />
        <p className={`mt-4 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
          {BRAND.name}
        </p>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSplashLoad() {
  return (
    <WireframeScreen>
      <WfScreenBody className="items-center justify-center">
        <WfPlaceholder size="logo" />
        <p className={`mt-6 ${WF_TYPE.title}`} style={{ color: WF.text }}>
          {BRAND.name}
        </p>
        <div className="mt-6 h-1 w-32 overflow-hidden rounded-full" style={{ background: WF.border }}>
          <div className="h-full w-1/2 rounded-full" style={{ background: WF.fill }} />
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSplashSkip() {
  return (
    <WireframeScreen>
      <WfScreenHeader />
      <div className="px-5 pt-2">
        <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
          Good morning
        </h2>
        <p className={`mt-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          Returning listener — straight to home
        </p>
      </div>
      <div className="mt-3 flex-1">
        <WfListRow title="Arrive · settle" meta="Resume · 05:18 left" />
        <WfListRow title="Deep unwind" meta="22 min" />
      </div>
      <WfTabBar active="home" />
    </WireframeScreen>
  );
}

export function WfWelcomeScience() {
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-10">
        <WfHeadline
          className="!px-0"
          title="Evidence-based sound for regulation"
          subtitle={BRAND.mission}
        />
        <div className="mt-4 space-y-2">
          {ENTRY.publicHeroBullets.map((t) => (
            <div key={t} className="rounded-lg border px-3 py-2" style={{ borderColor: WF.border, background: WF.surface }}>
              <p className={WF_TYPE.bodySm} style={{ color: WF.textSecondary }}>
                {t}
              </p>
            </div>
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Try a sample</WfButton>
        <WfButton variant="secondary">{ENTRY.invitationCta}</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfInviteQr() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Invitation</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title="Your care team invited you"
          subtitle="Scan the QR code on your invite card or enter a code manually."
        />
        <div className="mt-5 flex justify-center">
          <WfPlaceholder size="md" className="!h-28 !w-28" />
        </div>
        <WfTextLink>Enter code manually</WfTextLink>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Open scanner</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfInviteTeaser() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Invitation</WfTag>
        <p className={`${WF_TYPE.body}`} style={{ color: WF.textSecondary }}>
          Structured sound sessions backed by clinical research — activate your invite below.
        </p>
        <div className="mt-4">
          <WfField label="Invite code" placeholder="INV-XXXX-XXXX" />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfLoginMagic() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Sign in</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Email sign-in" subtitle="We'll send a secure link — no password needed." />
        <div className="mt-4">
          <WfField label="Email" placeholder="you@email.com" />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Send magic link</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfLoginBiometric() {
  return (
    <WireframeScreen>
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfTag>Welcome back</WfTag>
        <WfPlaceholder size="icon" className="!h-16 !w-16 !rounded-2xl" />
        <p className={`mt-4 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
          Unlock with Face ID
        </p>
        <WfTextLink>Use password instead</WfTextLink>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfLoginSso() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Organisation sign-in</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Sign in" subtitle="Use your organisation account." />
        <div className="mt-5 space-y-2">
          <WfButton>Sign in with SSO</WfButton>
          <WfButton variant="secondary">Sign in with email</WfButton>
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfOnboardClinical() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Your listening plan</WfTag>
        <WfHeadline className="!px-0 mt-2" title="How to use Sonocea" />
        <div className="mt-4 space-y-2">
          {[
            "Your assigned sessions",
            "When to listen",
            "What to expect",
            "Headphones required",
          ].map((t) => (
            <div key={t} className="rounded-lg border px-3 py-2" style={{ borderColor: WF.border }}>
              <p className={WF_TYPE.bodySm} style={{ color: WF.text }}>
                {t}
              </p>
            </div>
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Acknowledge & continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfOnboardChat() {
  const messages = [
    { from: "guide", text: "Hi Alex — welcome to Sonocea." },
    { from: "guide", text: "I'll show you how listening works in under a minute." },
  ];
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Onboarding</WfTag>
        <div className="mt-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className="max-w-[85%] rounded-2xl px-3 py-2"
              style={{ background: WF.surfaceMuted, color: WF.text }}
            >
              <p className={WF_TYPE.bodySm}>{m.text}</p>
            </div>
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfGuidanceChecklist() {
  const items = GUIDANCE.items;
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Guidance</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Before you listen" subtitle="Confirm each item to continue." />
        <div className="mt-4 space-y-2">
          {items.map((t, i) => (
            <div key={t} className="flex items-center gap-3 rounded-lg border px-3 py-2.5" style={{ borderColor: WF.border }}>
              <div
                className="flex h-5 w-5 items-center justify-center rounded border text-[10px]"
                style={{ borderColor: i < 2 ? WF.fill : WF.border, background: i < 2 ? WF.fill : "transparent", color: i < 2 ? WF.bg : WF.textMuted }}
              >
                {i < 2 ? "✓" : ""}
              </div>
              <span className={WF_TYPE.body} style={{ color: WF.text }}>
                {t}
              </span>
            </div>
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfGuidanceOverlay() {
  const palette = getWireframePalette("dark");
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="relative px-5 pt-4">
        <WfPlaceholder size="md" className="!h-20 opacity-40" />
        <div
          className="absolute inset-x-4 top-16 rounded-2xl border p-4"
          style={{ borderColor: palette.border, background: palette.surface }}
        >
          <p className={WF_TYPE.bodySm} style={{ color: palette.placeholder }}>
            First-play guidance
          </p>
          <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: palette.text }}>
            Use headphones in a quiet space for the full session duration.
          </p>
          <div className="mt-3">
            <WfButton>Got it</WfButton>
          </div>
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfGuidanceAudio() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Audio guide</WfTag>
        <WfHeadline className="!px-0 mt-2" title="How to listen" subtitle="Optional 30-second walkthrough." />
        <div className="mt-5 rounded-xl border p-4" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
          <div className="flex items-center gap-3">
            <WfIcon shape="control" />
            <div className="h-1 flex-1 rounded-full" style={{ background: WF.border }}>
              <div className="h-full w-1/4 rounded-full" style={{ background: WF.fill }} />
            </div>
            <span className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
              0:12
            </span>
          </div>
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
        <WfTextLink>Skip guide</WfTextLink>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfGuidancePartner() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Guidance</WfTag>
        <div className="rounded-xl border p-3" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            Note from your care team
          </p>
          <p className={`mt-1 ${WF_TYPE.body}`} style={{ color: WF.textSecondary }}>
            Listen at the same time each day for best results.
          </p>
        </div>
        <div className="mt-4 space-y-2">
          {["Use headphones", "Quiet environment", "Full session duration"].map((t) => (
            <div key={t} className="rounded-lg border px-3 py-2" style={{ borderColor: WF.border }}>
              <p className={WF_TYPE.bodySm} style={{ color: WF.textSecondary }}>
                {t}
              </p>
            </div>
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

/* ——— Tier 3: Public experience ——— */

export function WfPublicSocial() {
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-10">
        <WfHeadline className="!px-0" title="Trusted by clinical partners" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <WfPlaceholder key={i} size="sm" className="!h-8 !w-full" />
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Try a 5-minute sample</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfCheckInEmoji() {
  const faces = ["😰", "😟", "😐", "🙂", "😌"];
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-12">
        <WfHeadline className="!px-0" title={CHECK_IN.beforeTitle} subtitle="Tap the face that fits best." />
        <div className="mt-8 flex justify-between px-2">
          {faces.map((f, i) => (
            <button
              key={f}
              type="button"
              className="flex flex-col items-center rounded-xl p-2"
              style={{ background: i === 3 ? WF.surface : "transparent" }}
            >
              <span className="text-xl">{f}</span>
              <span className="mt-1 text-[8px]" style={{ color: WF.textMuted }}>
                {["Low", "", "", "Calm", ""][i]}
              </span>
            </button>
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfCheckInChips() {
  const chips = ["Anxious", "Calm", "Focused", "Tired", "Overwhelmed"];
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-12">
        <WfHeadline className="!px-0" title={CHECK_IN.beforeTitle} subtitle="Select all that apply." />
        <div className="mt-6 flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <WfChip key={c} active={i === 1 || i === 2}>
              {c}
            </WfChip>
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfCheckInBody() {
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-10">
        <WfHeadline className="!px-0" title="Where do you feel tension?" subtitle="Tap areas on the outline." />
        <div className="mt-6 flex justify-center">
          <WfPlaceholder size="md" className="!h-40 !w-28" />
        </div>
        <p className={`mt-4 text-center ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          Optional · skip if unsure
        </p>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
        <WfTextLink>Skip</WfTextLink>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfCheckInSkip() {
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-12">
        <WfHeadline className="!px-0" title="Ready to listen?" subtitle="We'll recommend a regulation session." />
        <div className="mt-6 rounded-xl border p-4" style={{ borderColor: WF.border, background: WF.surface }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            Default session
          </p>
          <p className={`mt-1 ${WF_TYPE.label}`} style={{ color: WF.text }}>
            {PUBLIC_SAMPLE.title}
          </p>
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Start sample</WfButton>
        <WfTextLink>Check in first</WfTextLink>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfSampleIntro() {
  const palette = getWireframePalette("dark");
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfTag>Sample session</WfTag>
        <p className={`mt-4 ${WF_TYPE.body}`} style={{ color: palette.textSecondary }}>
          This is a 5-minute preview of structured sound. Find a quiet space and use headphones.
        </p>
        <div className="mt-6">
          <WfButton>Begin sample</WfButton>
        </div>
        <WfTextLink>Skip intro</WfTextLink>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSampleTimer() {
  const palette = getWireframePalette("dark");
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Sample · 5 min</WfTag>
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="font-mono text-3xl font-bold" style={{ color: palette.text }}>
            4:18
          </p>
          <p className={WF_TYPE.bodySm} style={{ color: palette.placeholder }}>
            sample remaining
          </p>
          <div className="mt-6">
            <WfIcon shape="controlLg" style={{ background: palette.fill, borderColor: palette.fill }} />
          </div>
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSampleCaptions() {
  const palette = getWireframePalette("dark");
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-4">
        <WfTag>Sample</WfTag>
        <div className="flex flex-1 flex-col items-center justify-center">
          <WfPlaceholder size="icon" />
          <div className="mt-4 flex gap-4">
            <WfIcon shape="control" />
            <WfIcon shape="controlLg" style={{ background: palette.fill, borderColor: palette.fill }} />
            <WfIcon shape="control" />
          </div>
        </div>
        <div className="rounded-lg border px-3 py-2" style={{ borderColor: palette.border }}>
          <p className={WF_TYPE.bodySm} style={{ color: palette.placeholder }}>
            What you&apos;re hearing
          </p>
          <p className={WF_TYPE.bodySm} style={{ color: palette.text }}>
            Precision-composed SAT™ supporting autonomic regulation — not binaural beats or generic relaxation.
          </p>
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfReflectionNote() {
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-10">
        <WfHeadline className="!px-0" title={CHECK_IN.afterTitle} />
        <div className="mt-4">
          <WfSlider label="Regulation" value={65} />
        </div>
        <p className={`mt-5 ${WF_TYPE.bodySm} font-medium`} style={{ color: WF.textSecondary }}>
          Optional note
        </p>
        <div className="mt-1.5 min-h-[56px] rounded-xl border px-3 py-2" style={{ borderColor: WF.border, color: WF.placeholder }}>
          <span className={WF_TYPE.body}>A sentence about how you feel…</span>
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Done</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfScienceFaq() {
  const faqs = [
    "What is Sonic Augmentation Technology™?",
    "Is there clinical evidence?",
    "How is this different from meditation or relaxation audio?",
  ];
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Science</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Common questions" />
        <div className="mt-4 space-y-2">
          {faqs.map((q) => (
            <div key={q} className="rounded-xl border px-3 py-2.5" style={{ borderColor: WF.border }}>
              <div className="flex items-center justify-between">
                <span className={WF_TYPE.body} style={{ color: WF.text }}>
                  {q}
                </span>
                <WfIcon shape="chevron" />
              </div>
            </div>
          ))}
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSciencePersonalised() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>For you</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Based on your check-in" subtitle="Regulation-focused articles." />
        <div className="mt-4 space-y-2">
          {SCIENCE_TOPICS.slice(0, 3).map((t) => (
            <WfRowLink key={t} title={t} />
          ))}
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfScienceVideo() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Science</WfTag>
        <WfPlaceholder size="md" className="!h-28" />
        <ul className="mt-4 space-y-2">
          {["Autonomic nervous system regulation", "Clinical evidence (UF study)", "Optimal listening guidance"].map((t) => (
            <li key={t} className={WF_TYPE.bodySm} style={{ color: WF.textSecondary }}>
              · {t}
            </li>
          ))}
        </ul>
        <WfTextLink>Read the research</WfTextLink>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfAccessProgressive() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfProgress total={2} current={0} />
        <WfTag>Step 1 of 2</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Your organisation" />
        <div className="mt-4 space-y-3">
          <WfField label="Organisation name" placeholder="Hospital, clinic, team…" />
          <WfField label="Organisation type" placeholder="Healthcare · Workplace…" />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Next</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfAccessCalendar() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Request access</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Book a call" subtitle="Tell us about your organisation, then pick a time." />
        <div className="mt-4 space-y-3">
          <WfField label="Work email" placeholder="you@organisation.com" />
        </div>
        <div className="mt-4 rounded-xl border p-3" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            Scheduler embed
          </p>
          <WfSkeletonLines lines={3} />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Submit & book</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfAccessReferral() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Access</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Request access" subtitle="For organisations without an invite code." />
        <div className="mt-4 space-y-3">
          <WfField label="Organisation" placeholder="Your organisation" />
          <WfField label="Work email" placeholder="you@organisation.com" />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Submit request</WfButton>
        <WfTextLink>Already have an invite code?</WfTextLink>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfAccessMailto() {
  return (
    <WireframeScreen>
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfTag>Contact</WfTag>
        <WfHeadline className="!px-0 mt-4" title="Get in touch" subtitle="Email us to request access for your organisation." />
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Email us</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

/* ——— Tier 4: Supporting ——— */

export function WfAboutClinical() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>About</WfTag>
        <WfHeadline className="!px-0 mt-2" title="What Sonocea is" />
        <div className="mt-4 space-y-3">
          {[
            ["What it is", "Structured sound Sessions with SAT™"],
            ["What it isn't", "Not meditation, wellness, or binaural beats"],
            ["Evidence", "Clinical research summary"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
                {k}
              </p>
              <p className={WF_TYPE.body} style={{ color: WF.text }}>
                {v}
              </p>
            </div>
          ))}
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfAboutWeb() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>About</WfTag>
        <WfRowLink title="About Sonocea on sonocea.com" subtitle="Opens in browser" />
        <p className={`mt-4 px-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          Cached summary available offline.
        </p>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfAboutTeam() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>About</WfTag>
        <div className="mt-4 rounded-xl border p-4" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            Founder
          </p>
          <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textSecondary }}>
            &ldquo;Decades of neuroscience research — from Stephen Porges to today.&rdquo;
          </p>
        </div>
        <div className="mt-3 rounded-xl border p-4" style={{ borderColor: WF.border }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            Lead scientist
          </p>
          <WfSkeletonLines lines={2} />
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfAboutLegal() {
  const rows = ["Privacy policy", "Terms of use", "Licences", "Analytics opt-out"];
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Legal</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Policies" />
        <div className="mt-4">
          {rows.map((r) => (
            <WfRowLink key={r} title={r} />
          ))}
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfScienceSearch() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Science library</WfTag>
        <div className="mt-2 rounded-xl border-2 px-3 py-2.5" style={{ borderColor: WF.borderStrong }}>
          <span className={WF_TYPE.body} style={{ color: WF.placeholder }}>
            Search articles…
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <WfChip active>All</WfChip>
          <WfChip>Regulation</WfChip>
          <WfChip>Applications</WfChip>
        </div>
        <div className="mt-4 space-y-2">
          <WfRowLink title={SCIENCE_TOPICS[0]} />
          <WfRowLink title={SCIENCE_TOPICS[1]} />
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfScienceAudio() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Science</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Listen or read" />
        <div className="mt-4 space-y-2">
          {[
            { t: "How structured sound works", audio: true },
            { t: "Clinical evidence overview", audio: true },
            { t: "Listening best practices", audio: false },
          ].map((a) => (
            <div key={a.t} className="flex items-center justify-between rounded-xl border px-3 py-2.5" style={{ borderColor: WF.border }}>
              <span className={WF_TYPE.body} style={{ color: WF.text }}>
                {a.t}
              </span>
              {a.audio ? <span className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>🎧 5 min</span> : null}
            </div>
          ))}
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSupportWizard() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Troubleshoot</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Can't play audio?" />
        <div className="mt-4 space-y-2">
          {["Check headphones connected", "Check network connection", "Restart the app"].map((s, i) => (
            <div key={s} className="flex items-center gap-3 rounded-lg border px-3 py-2" style={{ borderColor: WF.border }}>
              <span className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
                {i + 1}.
              </span>
              <span className={WF_TYPE.body} style={{ color: WF.text }}>
                {s}
              </span>
            </div>
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Still need help</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfSupportPartner() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Support</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Access from your organisation?" />
        <div className="mt-4 rounded-xl border p-4" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            Partner contact
          </p>
          <p className={`mt-1 ${WF_TYPE.body}`} style={{ color: WF.text }}>
            Clinic A · support@clinic.example
          </p>
        </div>
        <WfRowLink title="Sonocea technical support" subtitle="Playback & account issues" />
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSupportForm() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Contact</WfTag>
        <WfHeadline className="!px-0 mt-2" title="What happened?" />
        <div className="mt-4 min-h-[80px] rounded-xl border px-3 py-2" style={{ borderColor: WF.border, color: WF.placeholder }}>
          <span className={WF_TYPE.body}>Describe the issue…</span>
        </div>
        <p className={`mt-3 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          Diagnostics attached automatically
        </p>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Submit</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfSupportContextual() {
  const palette = getWireframePalette("dark");
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="relative px-5 pt-4">
        <WfPlaceholder size="md" className="!h-24 opacity-50" />
        <div
          className="absolute inset-x-4 bottom-4 rounded-2xl border p-4"
          style={{ borderColor: palette.border, background: palette.surface }}
        >
          <p className={WF_TYPE.bodySm} style={{ color: palette.placeholder }}>
            Player help
          </p>
          <WfRowLink title="Audio not playing?" />
          <WfRowLink title="Contact support" />
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSettingsToggle() {
  const toggles = ["Notifications", "Download over cellular", "Haptics"];
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Settings</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Preferences" />
        <div className="mt-4 space-y-2">
          {toggles.map((t) => (
            <div key={t} className="flex items-center justify-between rounded-lg border px-3 py-2.5" style={{ borderColor: WF.border }}>
              <span className={WF_TYPE.body} style={{ color: WF.text }}>
                {t}
              </span>
              <div className="h-5 w-9 rounded-full" style={{ background: WF.fill }} />
            </div>
          ))}
        </div>
        <WfTextLink>Advanced settings on web</WfTextLink>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSettingsSearch() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Settings</WfTag>
        <div className="mt-2 rounded-xl border px-3 py-2.5" style={{ borderColor: WF.border }}>
          <span className={WF_TYPE.body} style={{ color: WF.placeholder }}>
            Search settings…
          </span>
        </div>
        <div className="mt-4">
          <WfRowLink title="Notifications" />
          <WfRowLink title="Audio quality" />
          <WfRowLink title="Privacy" />
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSettingsAudio() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Playback</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Audio settings" />
        <div className="mt-4 space-y-3">
          <WfRowLink title="Streaming quality" subtitle="High" />
          <WfRowLink title="Download over cellular" subtitle="Off" />
          <WfRowLink title="Default sleep timer" subtitle="None" />
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSettingsNotify() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Settings</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Notifications" />
        <div className="mt-4 flex items-center justify-between rounded-lg border px-3 py-2.5" style={{ borderColor: WF.border }}>
          <span className={WF_TYPE.body} style={{ color: WF.text }}>
            Session reminders
          </span>
          <div className="h-5 w-9 rounded-full" style={{ background: WF.fill }} />
        </div>
        <div className="mt-6">
          <WfRowLink title="Privacy policy" />
          <WfRowLink title="Terms of use" />
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfAccountStats() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Profile</WfTag>
        <div className="flex items-center gap-3">
          <WfPlaceholder size="sm" className="!h-12 !w-12 !rounded-full" />
          <div>
            <p className={WF_TYPE.label} style={{ color: WF.text }}>
              Alex Listener
            </p>
            <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
              Clinic A
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {[
            ["Sessions", "24"],
            ["Minutes", "312"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border p-3" style={{ borderColor: WF.border }}>
              <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
                {k}
              </p>
              <p className={`mt-1 ${WF_TYPE.label}`} style={{ color: WF.text }}>
                {v}
              </p>
            </div>
          ))}
        </div>
      </WfScreenBody>
      <WfTabBar active="profile" />
    </WireframeScreen>
  );
}

export function WfAccountMinimal() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Account</WfTag>
        <div className="mt-4 space-y-0">
          <WfRowLink title="alex@email.com" subtitle="Email" />
          <WfRowLink title="Clinic A" subtitle="Partner" />
          <WfRowLink title={NEUROTYPE.options[1].title} subtitle="Neurotype" />
        </div>
        <div className="mt-4 flex items-center justify-between rounded-lg border px-3 py-2.5" style={{ borderColor: WF.border }}>
          <span className={WF_TYPE.body} style={{ color: WF.text }}>
            Notifications
          </span>
          <div className="h-5 w-9 rounded-full" style={{ background: WF.border }} />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton variant="secondary">Sign out</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfAccountEntitlement() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Access</WfTag>
        <div className="mt-4 rounded-xl border p-4" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            Your access via
          </p>
          <p className={`mt-1 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
            Clinic A
          </p>
          <p className={`mt-2 ${WF_TYPE.bodySm}`} style={{ color: WF.textSecondary }}>
            Valid until 12 Dec 2026
          </p>
          <p className={`mt-2 font-mono text-[10px]`} style={{ color: WF.textMuted }}>
            Seat ID · SN-48291
          </p>
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfPrivacySummary() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Privacy</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Privacy policy" />
        <div className="mt-4 rounded-xl border p-3" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textSecondary }}>
            Plain-language summary: we collect listening engagement to support Partners and billing. We never sell your data.
          </p>
        </div>
        <WfTextLink>View full document</WfTextLink>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfPrivacyExport() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Your data</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Data rights" />
        <div className="mt-4 space-y-2">
          <WfButton>Export my data</WfButton>
          <WfButton variant="secondary">Delete account</WfButton>
        </div>
        <p className={`mt-3 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          Delete requests routed through support in v1.
        </p>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfPrivacyOptout() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Privacy</WfTag>
        <div className="mt-4 flex items-center justify-between rounded-lg border px-3 py-2.5" style={{ borderColor: WF.border }}>
          <div>
            <p className={WF_TYPE.body} style={{ color: WF.text }}>
              Analytics
            </p>
            <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
              Help improve the app
            </p>
          </div>
          <div className="h-5 w-9 rounded-full" style={{ background: WF.border }} />
        </div>
        <WfRowLink title="Privacy policy" />
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfPrivacyWeb() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Legal</WfTag>
        <WfRowLink title="Privacy & policies on sonocea.com" subtitle="Opens in browser" />
        <p className={`mt-4 px-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          Short offline summary shown when unavailable.
        </p>
      </WfScreenBody>
    </WireframeScreen>
  );
}
