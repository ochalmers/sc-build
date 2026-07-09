import { GrainOverlay } from "../../../shared/GrainOverlay.jsx";
import {
  DARK_BG,
  DARK_MUTED,
  DARK_TEXT,
  LIGHT_BG,
  LIGHT_TEXT,
  Phase1Input,
  Phase1Logo,
  PrimaryButton,
  ProgressDots,
  ScreenHeader,
  SecondaryButton,
  StateMessage,
  TextLink,
} from "../../shared/Phase1UI.jsx";

export function SplashScreen({ variant = "dark" }) {
  const isDark = variant === "dark";
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
      style={{ background: isDark ? DARK_BG : LIGHT_BG }}
    >
      {!isDark ? null : (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(ellipse at 50% 30%, rgba(232,160,128,0.35) 0%, transparent 60%)",
          }}
          aria-hidden
        />
      )}
      <Phase1Logo dark={isDark} className="h-8 w-auto" />
      <p
        className="mt-6 text-[11px] uppercase tracking-[0.2em]"
        style={{ color: isDark ? DARK_MUTED : "#8D8D8D" }}
      >
        Sonic augmentation
      </p>
      <div className="absolute bottom-16 flex flex-col items-center gap-3">
        <div
          className="h-1 w-16 animate-pulse rounded-full"
          style={{ background: isDark ? "rgba(221,221,221,0.3)" : "rgba(8,8,8,0.15)" }}
        />
        <p className="text-[10px]" style={{ color: isDark ? DARK_MUTED : "#8D8D8D" }}>
          Loading…
        </p>
      </div>
    </div>
  );
}

export function WelcomeScreen({ variant = "guest" }) {
  const invited = variant === "invited";
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ background: DARK_BG }}>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(112,128,232,0.25) 0%, transparent 55%)",
        }}
        aria-hidden
      />
      <ScreenHeader
        title="Welcome to Sonocea"
        subtitle={
          invited
            ? "Your invite is ready. Enter to begin your listening journey."
            : "Personalised sonic sessions for regulation, care, and performance."
        }
      />
      <div className="mt-auto space-y-3 px-5 pb-10">
        {invited ? (
          <PrimaryButton variant="dark">Enter with invite</PrimaryButton>
        ) : (
          <>
            <PrimaryButton variant="dark">Enter invite code</PrimaryButton>
            <SecondaryButton>Learn more</SecondaryButton>
          </>
        )}
        <p className="pt-2 text-center text-[10px]" style={{ color: DARK_MUTED }}>
          Invite-only access · No open signup
        </p>
      </div>
    </div>
  );
}

const INVITE_STATES = {
  empty: { value: "", message: null, state: "default" },
  valid: { value: "SON-7K2M-9P4X", message: "Code recognised — continue to redeem.", state: "valid" },
  invalid: { value: "SON-XXXX-XXXX", message: "This code isn't valid. Check and try again.", state: "invalid" },
  expired: { value: "SON-OLD1-EXP2", message: "This invite has expired. Contact your provider.", state: "expired" },
};

export function InviteScreen({ variant = "empty", prototypeActions = {} }) {
  const cfg = INVITE_STATES[variant] ?? INVITE_STATES.empty;
  return (
    <div className="flex h-full w-full flex-col" style={{ background: DARK_BG }}>
      <ScreenHeader
        title="Access code"
        subtitle="Enter the invite or Partner code you received."
      />
      <div className="mt-6 space-y-3 px-5">
        <Phase1Input placeholder="e.g. SON-XXXX-XXXX" value={cfg.value} state={cfg.state} />
        {cfg.message ? <StateMessage type={cfg.state}>{cfg.message}</StateMessage> : null}
      </div>
      <div className="mt-auto space-y-3 px-5 pb-10">
        <PrimaryButton
          variant="dark"
          className={variant === "valid" ? "" : "opacity-50"}
          onClick={prototypeActions.onRedeem}
        >
          Redeem access
        </PrimaryButton>
        <TextLink onClick={prototypeActions.onHelp}>Need help?</TextLink>
      </div>
    </div>
  );
}

const ONBOARDING_STEPS = [
  {
    title: "What is Sonocea?",
    body: "Patented sonic augmentation — structured audio Sessions designed to support regulation, recovery, and focus.",
  },
  {
    title: "How it works",
    body: "Listen with headphones in a quiet space. Sessions adapt to your neurotype profile for personalised recommendations.",
  },
  {
    title: "Your journey",
    body: "Complete a short assessment, explore your library, and build a listening practice that fits your life.",
  },
];

export function OnboardingIntroScreen({ step = 0, prototypeActions = {} }) {
  const content = ONBOARDING_STEPS[step] ?? ONBOARDING_STEPS[0];
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ background: DARK_BG }}>
      <div className="px-5 pt-12">
        <ProgressDots total={3} current={step} />
      </div>
      <div
        className="mx-5 mt-8 flex h-40 items-center justify-center rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgba(232,160,128,0.3) 0%, rgba(112,128,232,0.25) 100%)" }}
      >
        <Phase1Logo className="h-6 w-auto opacity-60" />
      </div>
      <div className="mt-6 px-5">
        <h1 className="text-[26px] leading-tight tracking-[-0.3px]" style={{ color: DARK_TEXT }}>
          {content.title}
        </h1>
        <p className="mt-3 text-[12px] leading-relaxed" style={{ color: DARK_MUTED }}>
          {content.body}
        </p>
      </div>
      <div className="mt-auto space-y-3 px-5 pb-10">
        <PrimaryButton variant="dark" onClick={prototypeActions.onContinue}>
          {step < 2 ? "Continue" : "Get started"}
        </PrimaryButton>
        {step > 0 ? <TextLink onClick={prototypeActions.onBack}>Back</TextLink> : null}
      </div>
    </div>
  );
}

const NEUROTYPE_OPTIONS = [
  "Neurotypical",
  "Low-support neurodivergent",
  "Higher-support neurodivergent",
  "Prefer not to say",
];

export function NeurotypeScreen({ variant = "question", prototypeActions = {} }) {
  if (variant === "progress") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-8" style={{ background: DARK_BG }}>
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
        <p className="mt-5 text-[14px] font-medium" style={{ color: DARK_TEXT }}>
          Building your profile…
        </p>
        <p className="mt-1 text-[11px]" style={{ color: DARK_MUTED }}>
          Question 4 of 6
        </p>
      </div>
    );
  }

  if (variant === "complete") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center" style={{ background: DARK_BG }}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl">✓</div>
        <p className="mt-5 text-[20px] font-medium tracking-[-0.2px]" style={{ color: DARK_TEXT }}>
          Profile complete
        </p>
        <p className="mt-2 text-[12px] leading-relaxed" style={{ color: DARK_MUTED }}>
          We'll use this to personalise your Session recommendations.
        </p>
        <div className="mt-8 w-full">
          <PrimaryButton variant="dark" onClick={prototypeActions.onContinue}>
            View recommendations
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ background: DARK_BG }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(230,160,120,0.28) 0%, rgba(180,100,80,0.15) 40%, transparent 65%)",
        }}
        aria-hidden
      />
      <GrainOverlay opacity={0.2} />
      <ScreenHeader title="Your listening profile" subtitle="Question 2 of 6" />
      <div className="relative mt-4 px-5">
        <p className="text-[14px] leading-snug" style={{ color: DARK_TEXT }}>
          Which best describes your neurotype?
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {NEUROTYPE_OPTIONS.map((opt, i) => (
            <span
              key={opt}
              className="inline-flex h-10 items-center rounded-full px-4 text-[12px] tracking-[-0.2px]"
              style={{
                background: i === 1 ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.12)",
                color: i === 1 ? "#080808" : DARK_TEXT,
                border: i === 1 ? "none" : "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {opt}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-auto px-5 pb-10">
        <PrimaryButton variant="dark" onClick={prototypeActions.onContinue}>
          Next
        </PrimaryButton>
      </div>
    </div>
  );
}

const GUIDANCE_ITEMS = [
  { icon: "🎧", title: "Use headphones", detail: "Over-ear or in-ear for best results" },
  { icon: "🤫", title: "Quiet environment", detail: "Minimise distractions while listening" },
  { icon: "⏱", title: "Allow full duration", detail: "Sessions are designed as complete experiences" },
];

export function ListeningGuidanceScreen({ prototypeActions = {} }) {
  return (
    <div className="flex h-full w-full flex-col" style={{ background: DARK_BG }}>
      <ScreenHeader
        title="Listening guidance"
        subtitle="A few tips for the best experience."
      />
      <div className="mt-6 space-y-3 px-5">
        {GUIDANCE_ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span className="text-xl">{item.icon}</span>
            <div>
              <p className="text-[13px] font-medium" style={{ color: DARK_TEXT }}>
                {item.title}
              </p>
              <p className="mt-0.5 text-[11px]" style={{ color: DARK_MUTED }}>
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 pb-10">
        <PrimaryButton variant="dark" onClick={prototypeActions.onContinue}>
          Continue to library
        </PrimaryButton>
      </div>
    </div>
  );
}

export function RecommendedProfileScreen({ prototypeActions = {} }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ background: DARK_BG }}>
      <GrainOverlay opacity={0.15} />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, rgba(154,154,170,0.35) 0%, transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.15em]" style={{ color: DARK_MUTED }}>
          Your profile
        </p>
        <h1 className="mt-3 text-[24px] leading-tight tracking-[-0.3px]" style={{ color: DARK_TEXT }}>
          You appear to align most closely with…
        </h1>
        <p className="mt-4 text-[18px] font-medium" style={{ color: "#B0C0FF" }}>
          Regulation — Calm
        </p>
        <p className="mt-3 text-[12px] leading-relaxed" style={{ color: DARK_MUTED }}>
          Sessions in this family support nervous system balance and emotional grounding.
        </p>
      </div>
      <div className="relative space-y-3 px-5 pb-10">
        <PrimaryButton variant="dark" onClick={prototypeActions.onContinue}>
          Explore recommended Sessions
        </PrimaryButton>
        <TextLink onClick={prototypeActions.onLibrary}>View full library</TextLink>
      </div>
    </div>
  );
}

export function AboutScreen() {
  const links = ["Our science", "Privacy policy", "Terms of use", "Contact support"];
  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ background: DARK_BG }}>
      <ScreenHeader title="About Sonocea" subtitle="Company, science, and policies." />
      <div className="mt-6 space-y-1 px-5">
        {links.map((link) => (
          <div
            key={link}
            className="flex items-center justify-between rounded-xl px-4 py-3.5"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <span className="text-[13px]" style={{ color: DARK_TEXT }}>
              {link}
            </span>
            <span style={{ color: DARK_MUTED }}>›</span>
          </div>
        ))}
      </div>
      <p className="mt-auto px-5 pb-10 text-center text-[10px]" style={{ color: DARK_MUTED }}>
        Sonocea® · v1.0 · Invite-only
      </p>
    </div>
  );
}
