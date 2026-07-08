import { GrainOverlay } from "../shared/GrainOverlay.jsx";
import {
  DARK_BG,
  DARK_MUTED,
  DARK_TEXT,
  Phase1Input,
  Phase1Logo,
  PrimaryButton,
  ProgressDots,
  ScreenHeader,
  SecondaryButton,
  TextLink,
} from "../phase1/shared/Phase1UI.jsx";

function PublicShell({ children, gradient }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ background: DARK_BG }}>
      {gradient ? (
        <div className="absolute inset-0" style={{ background: gradient }} aria-hidden />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(112,180,200,0.22) 0%, transparent 55%)",
          }}
          aria-hidden
        />
      )}
      <GrainOverlay opacity={0.2} />
      {children}
    </div>
  );
}

function SliderField({ label, value = 50 }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px]" style={{ color: DARK_MUTED }}>
        <span>{label}</span>
        <span style={{ color: DARK_TEXT }}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: "linear-gradient(90deg, #6BBF8A, #90C8E8)" }}
        />
      </div>
    </div>
  );
}

export function PvGetStartedScreen({ prototypeActions = {} }) {
  return (
    <PublicShell gradient="radial-gradient(ellipse at 50% 20%, rgba(144,200,232,0.28) 0%, transparent 60%)">
      <div className="flex flex-1 flex-col px-5 pt-14">
        <Phase1Logo className="h-7 w-auto" />
        <ScreenHeader
          title="Welcome to Sonocea"
          subtitle="Experience structured sound — or sign in with your invitation."
        />
      </div>
      <div className="relative z-10 space-y-2.5 px-5 pb-10">
        <PrimaryButton variant="dark" onClick={prototypeActions.onDiscover}>
          Discover Sonocea
        </PrimaryButton>
        <SecondaryButton onClick={prototypeActions.onInvitation}>Accept Invitation</SecondaryButton>
        <p className="pt-2 text-center">
          <TextLink onClick={prototypeActions.onLogin}>Login</TextLink>
        </p>
      </div>
    </PublicShell>
  );
}

export function PvCheckInScreen({ variant = "before", prototypeActions = {} }) {
  const after = variant === "after";
  return (
    <PublicShell>
      <div className="flex flex-1 flex-col px-5 pt-12">
        <ProgressDots total={after ? 5 : 4} current={after ? 4 : 0} />
        <ScreenHeader
          title={after ? "How did that feel?" : "How is your nervous system today?"}
          subtitle={after ? "Remeasure after your reset." : "A quick check-in before you listen."}
        />
        <div className="mt-8 space-y-5">
          <SliderField label="Stress level" value={after ? 28 : 72} />
          <SliderField label="Your energy level" value={after ? 55 : 40} />
          <SliderField label="Focus" value={after ? 62 : 35} />
          <SliderField label="Restfulness" value={after ? 70 : 25} />
        </div>
      </div>
      <div className="relative z-10 px-5 pb-10">
        <PrimaryButton variant="dark" onClick={prototypeActions.onContinue}>
          {after ? "Continue" : "Continue to listening"}
        </PrimaryButton>
      </div>
    </PublicShell>
  );
}

export function PvHeadphonesScreen({ prototypeActions = {} }) {
  return (
    <PublicShell gradient="radial-gradient(ellipse at 50% 40%, rgba(107,191,138,0.2) 0%, transparent 65%)">
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full text-[28px]"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          🎧
        </div>
        <h2 className="mt-6 text-[22px] leading-tight tracking-[-0.3px]" style={{ color: DARK_TEXT }}>
          Put on your headphones
        </h2>
        <p className="mt-3 text-[12px] leading-relaxed" style={{ color: DARK_MUTED }}>
          Find a quiet place, free of distractions, for a 5-minute nervous system reset.
        </p>
      </div>
      <div className="relative z-10 px-5 pb-10">
        <PrimaryButton variant="dark" onClick={prototypeActions.onBegin}>
          Begin 5-minute reset
        </PrimaryButton>
      </div>
    </PublicShell>
  );
}

export function PvListeningScreen({ variant = "playing", prototypeActions = {} }) {
  const playing = variant === "playing";
  return (
    <PublicShell gradient="radial-gradient(ellipse at 50% 35%, rgba(144,160,232,0.35) 0%, transparent 65%)">
      <div className="flex flex-1 flex-col px-5 pt-12">
        <p className="text-[10px] uppercase tracking-[0.16em]" style={{ color: DARK_MUTED }}>
          Curated sample
        </p>
        <h2 className="mt-1 text-[22px] tracking-[-0.3px]" style={{ color: DARK_TEXT }}>
          Nervous System Reset
        </h2>
        <p className="mt-1 text-[11px]" style={{ color: DARK_MUTED }}>
          Non-clinical · 5 minutes
        </p>
        <div className="mt-10 flex flex-1 flex-col items-center justify-center">
          <div
            className="relative flex h-36 w-36 items-center justify-center rounded-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: playing ? "0 0 60px rgba(144,160,232,0.25)" : "none",
            }}
          >
            <div
              className="h-24 w-24 rounded-full"
              style={{
                background: "conic-gradient(from 180deg, rgba(144,200,232,0.8), rgba(107,191,138,0.6), rgba(144,160,232,0.8))",
              }}
            />
          </div>
          <p className="mt-6 font-mono text-[28px] tracking-tight" style={{ color: DARK_TEXT }}>
            {playing ? "3:42" : "5:00"}
          </p>
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-center gap-8 px-5 pb-10">
        <button type="button" className="h-10 w-10 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.2)" }} />
        <button
          type="button"
          onClick={prototypeActions.onComplete}
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <button type="button" className="h-10 w-10 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.2)" }} />
      </div>
    </PublicShell>
  );
}

const SCIENCE_TOPICS = [
  "Autonomic nervous system",
  "Why sound influences physiology",
  "Sonic Augmentation Technology™",
  "Sonostasis®",
];

export function PvScienceHomeScreen({ prototypeActions = {} }) {
  return (
    <PublicShell>
      <div className="flex flex-1 flex-col px-5 pt-12 pb-4">
        <ScreenHeader
          title="How Sonocea works"
          subtitle="What you just experienced — and the science behind structured sound."
        />
        <div className="mt-6 space-y-2">
          {SCIENCE_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={prototypeActions.onTopic}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[13px]"
              style={{ background: "rgba(255,255,255,0.06)", color: DARK_TEXT, border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {topic}
              <span style={{ color: DARK_MUTED }}>›</span>
            </button>
          ))}
        </div>
      </div>
      {prototypeActions.onContinue ? (
        <div className="relative z-10 px-5 pb-10">
          <PrimaryButton variant="dark" onClick={prototypeActions.onContinue}>
            Register interest
          </PrimaryButton>
        </div>
      ) : null}
    </PublicShell>
  );
}

export function PvTopicDetailScreen({ prototypeActions = {} }) {
  return (
    <PublicShell>
      <div className="flex flex-1 flex-col px-5 pt-12">
        <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: DARK_MUTED }}>
          Science
        </p>
        <h2 className="mt-2 text-[22px] leading-tight tracking-[-0.3px]" style={{ color: DARK_TEXT }}>
          What is the autonomic nervous system?
        </h2>
        <div className="mt-6 space-y-3">
          {[0.95, 0.88, 0.92, 0.78, 0.85].map((w, i) => (
            <div
              key={i}
              className="h-2 rounded"
              style={{ width: `${w * 100}%`, background: "rgba(255,255,255,0.08)" }}
            />
          ))}
        </div>
        <p className="mt-6 text-[12px] leading-relaxed" style={{ color: DARK_MUTED }}>
          Structured sound can influence autonomic regulation — distinct from generic relaxation audio.
        </p>
      </div>
      <div className="relative z-10 px-5 pb-10">
        <SecondaryButton onClick={prototypeActions.onBack}>Back to Science</SecondaryButton>
      </div>
    </PublicShell>
  );
}

export function PvRequestAccessScreen({ prototypeActions = {} }) {
  return (
    <PublicShell gradient="radial-gradient(ellipse at 50% 0%, rgba(232,160,128,0.18) 0%, transparent 55%)">
      <div className="flex flex-1 flex-col px-5 pt-12">
        <ScreenHeader
          title="Stay in the loop"
          subtitle="Request access for yourself or your organization."
        />
        <div className="mt-6 space-y-3">
          <Phase1Input placeholder="Your name" />
          <Phase1Input placeholder="you@email.com" />
          <Phase1Input placeholder="Organization (optional)" />
        </div>
      </div>
      <div className="relative z-10 space-y-2.5 px-5 pb-10">
        <PrimaryButton variant="dark" onClick={prototypeActions.onSubmit}>
          Submit request
        </PrimaryButton>
        <SecondaryButton onClick={prototypeActions.onMailingList}>Join mailing list only</SecondaryButton>
      </div>
    </PublicShell>
  );
}

export function PvInvitationScreen({ prototypeActions = {} }) {
  return (
    <PublicShell gradient="radial-gradient(ellipse at 50% 0%, rgba(112,128,232,0.25) 0%, transparent 55%)">
      <div className="flex flex-1 flex-col px-5 pt-12">
        <ScreenHeader
          title="You're invited"
          subtitle="Your organization has provisioned Sonocea access. Activate your account to begin listening."
        />
        <div
          className="mt-6 rounded-xl p-4 text-[12px] leading-relaxed"
          style={{ background: "rgba(255,255,255,0.06)", color: DARK_MUTED, border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Brief intro to Sonocea before sign-up — you may preview public content first (IP-01).
        </div>
      </div>
      <div className="relative z-10 space-y-2.5 px-5 pb-10">
        <PrimaryButton variant="dark" onClick={prototypeActions.onActivate}>
          Activate account
        </PrimaryButton>
        <SecondaryButton onClick={prototypeActions.onLearnMore}>Learn more first</SecondaryButton>
      </div>
    </PublicShell>
  );
}

const RETURNING_CARDS = [
  { label: "Daily Reset", detail: "Check-in + short listening", featured: true },
  { label: "Science", detail: null },
  { label: "Research", detail: null },
  { label: "Applications", detail: null },
  { label: "Our Story", detail: null },
];

export function PvReturningHomeScreen() {
  return (
    <PublicShell>
      <div className="flex flex-1 flex-col px-5 pt-12 pb-4">
        <ScreenHeader title="Welcome back" subtitle="How is your nervous system today?" />
        <div className="mt-6 grid grid-cols-2 gap-2.5">
          {RETURNING_CARDS.map((card) => (
            <button
              key={card.label}
              type="button"
              className={`rounded-xl p-3.5 text-left ${card.featured ? "col-span-2" : ""}`}
              style={{
                background: card.featured ? "rgba(107,191,138,0.15)" : "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p className="text-[13px] font-medium" style={{ color: DARK_TEXT }}>
                {card.label}
              </p>
              {card.detail ? (
                <p className="mt-1 text-[10px]" style={{ color: DARK_MUTED }}>
                  {card.detail}
                </p>
              ) : null}
            </button>
          ))}
        </div>
        <p className="mt-4 text-center">
          <TextLink>Request Access</TextLink>
        </p>
      </div>
    </PublicShell>
  );
}

export function PvExperiencedScreen({ prototypeActions = {} }) {
  return (
    <PublicShell gradient="radial-gradient(ellipse at 50% 30%, rgba(144,200,232,0.25) 0%, transparent 60%)">
      <div className="flex flex-1 flex-col px-5 pt-12">
        <ScreenHeader
          title="What you just experienced"
          subtitle="A brief nervous system reset using structured sound — not meditation, not generic relaxation."
        />
        <div
          className="mt-6 rounded-xl p-4 text-[12px] leading-relaxed"
          style={{ background: "rgba(255,255,255,0.06)", color: DARK_MUTED, border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Sonocea Sonic Augmentation Technology™ produces measurable effects on autonomic regulation within minutes.
        </div>
      </div>
      <div className="relative z-10 px-5 pb-10">
        <PrimaryButton variant="dark" onClick={prototypeActions.onExploreScience}>
          Explore the science
        </PrimaryButton>
      </div>
    </PublicShell>
  );
}
