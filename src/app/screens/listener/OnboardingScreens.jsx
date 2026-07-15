import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  ONBOARDING_ABOUT_SLIDES,
  ONBOARDING_IDENTITY_OPTIONS,
  ONBOARDING_LISTEN_TIMES,
  ONBOARDING_PREP_CHECKLIST,
  ONBOARDING_SUPPORT_OPTIONS,
} from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { ListenerFrame } from "../../components/ListenerFrame.jsx";
import { AppBody, AppButton, AppTitle } from "../../components/ui.jsx";
import { SystemBrandLogo } from "../../../system/components/SystemBrandLogo.jsx";
import { SystemLogoMark } from "../../../system/components/SystemLogoMark.jsx";

const PHASES = {
  loading: "loading",
  welcome: "welcome",
  about: "about",
  prep: "prep",
  identity: "identity",
  support: "support",
  timing: "timing",
  preparing: "preparing",
};

function StepBullets({ total, current, onSelect, label = "Onboarding steps" }) {
  return (
    <div className="flex items-center justify-center gap-2.5" role="tablist" aria-label={label}>
      {Array.from({ length: total }, (_, i) => {
        const active = i === current;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Step ${i + 1} of ${total}`}
            onClick={() => onSelect?.(i)}
            className="flex h-8 w-8 items-center justify-center rounded-full"
          >
            <span
              className="rounded-full transition-[width,height,background-color] duration-200"
              style={{
                width: active ? 9 : 7,
                height: active ? 9 : 7,
                background: active
                  ? "var(--proto-text)"
                  : "color-mix(in srgb, var(--proto-text-muted) 45%, transparent)",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

function SelectRow({ label, selected, onClick, multi }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border px-4 py-3.5 text-left text-[15px] font-medium tracking-tight transition-colors"
      style={{
        borderColor: selected ? "var(--proto-text)" : "var(--proto-border)",
        background: selected
          ? "color-mix(in srgb, var(--proto-surface-elevated) 88%, var(--proto-accent) 12%)"
          : "var(--proto-surface-elevated, #fff)",
        color: "var(--proto-text)",
      }}
      aria-pressed={selected}
    >
      <span className="flex items-center justify-between gap-3">
        {label}
        {selected ? (
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] text-white"
            style={{ background: "var(--proto-accent, #3d4a44)" }}
            aria-hidden
          >
            {multi ? "✓" : "●"}
          </span>
        ) : (
          <span
            className="h-5 w-5 shrink-0 rounded-full border"
            style={{ borderColor: "var(--proto-border)" }}
            aria-hidden
          />
        )}
      </span>
    </button>
  );
}

function SoftHero({ children, tall }) {
  return (
    <div
      className={`relative -mx-5 -mt-6 mb-2 overflow-hidden px-5 ${tall ? "pb-14 pt-16" : "pb-8 pt-10"}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(90% 80% at 50% -10%, #d8d6d0 0%, transparent 55%),
            linear-gradient(180deg, #ebeae5 0%, transparent 100%)
          `,
        }}
        aria-hidden
      />
      <div className="relative flex justify-center">{children}</div>
    </div>
  );
}

/**
 * Full first-time flow: Loading → Welcome → About → Prep → Questionnaire → Preparing → Home.
 * Review deep-links: ?phase=loading|welcome|about|prep|identity|support|timing|preparing
 */
export function ListenerOnboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const {
    role,
    user,
    partners,
    onboardingComplete,
    neurotypeId,
    completeOnboarding,
    setNeurotype,
    setOnboardingPrefs,
  } = useAppStore();

  const phaseParam = searchParams.get("phase");
  const fromInvite = Boolean(location.state?.fromInvite);
  const [phase, setPhase] = useState(() => {
    if (phaseParam && Object.values(PHASES).includes(phaseParam)) return phaseParam;
    if (fromInvite) return PHASES.loading;
    return PHASES.welcome;
  });
  const [aboutStep, setAboutStep] = useState(0);
  const [identityId, setIdentityId] = useState(null);
  const [supportIds, setSupportIds] = useState([]);
  const [listenTime, setListenTime] = useState(null);

  useEffect(() => {
    if (phaseParam && Object.values(PHASES).includes(phaseParam)) {
      setPhase(phaseParam);
      if (phaseParam === PHASES.about) setAboutStep(0);
    }
  }, [phaseParam]);

  // Reviewing from flow nav while prefs already exist — still allow walking the flow.
  if (role !== "listener") return <Navigate to="/app/listener" replace />;
  if (
    onboardingComplete &&
    neurotypeId &&
    !phaseParam &&
    phase !== PHASES.preparing &&
    phase !== PHASES.loading
  ) {
    return <Navigate to="/app/listener/home" replace />;
  }

  const about = ONBOARDING_ABOUT_SLIDES[aboutStep];
  const aboutLast = aboutStep === ONBOARDING_ABOUT_SLIDES.length - 1;
  const firstName = user?.name?.split(" ")[0];
  const partner = partners?.find((p) => p.id === user?.partnerId);

  function finishAndPrepare() {
    const identity = ONBOARDING_IDENTITY_OPTIONS.find((o) => o.id === identityId);
    const neuro = identity?.neurotypeId ?? "regulator";
    setOnboardingPrefs({
      identityId,
      supportIds,
      listenTime,
    });
    setNeurotype(neuro);
    completeOnboarding();
    setPhase(PHASES.preparing);
  }

  function toggleSupport(id) {
    setSupportIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  if (phase === PHASES.loading) {
    return (
      <OpeningScreen
        // Flow-nav deep link (?phase=loading) stays put for review; live path auto-advances.
        autoAdvance={phaseParam !== PHASES.loading}
        onDone={() => setPhase(PHASES.welcome)}
      />
    );
  }

  if (phase === PHASES.preparing) {
    return (
      <PreparingScreen
        autoAdvance={phaseParam !== PHASES.preparing}
        onDone={() => navigate("/app/listener/home", { replace: true })}
      />
    );
  }

  if (phase === PHASES.welcome) {
    return (
      <ListenerFrame mode="regulation" hideTabBar>
        <div className="flex min-h-full flex-col pb-6">
          <SoftHero tall>
            <SystemBrandLogo className="h-7 w-auto" />
          </SoftHero>

          <p className="text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
            Welcome
          </p>
          <AppTitle className="mt-3 text-[1.75rem] tracking-[-0.03em]">
            {firstName ? `Welcome, ${firstName}` : "Welcome to Sonocea"}
          </AppTitle>
          <AppBody className="mt-4 max-w-[32ch]">
            {partner?.name
              ? `You’ve been invited by ${partner.name}. A few short steps will get your listening experience ready.`
              : "A few short steps will get your listening experience ready."}
          </AppBody>

          <div className="mt-auto space-y-3 pt-12">
            <AppButton fullWidth onClick={() => setPhase(PHASES.about)}>
              Continue
            </AppButton>
          </div>
        </div>
      </ListenerFrame>
    );
  }

  if (phase === PHASES.about) {
    const aboutCount = ONBOARDING_ABOUT_SLIDES.length;

    function goAboutBack() {
      if (aboutStep === 0) setPhase(PHASES.welcome);
      else setAboutStep((s) => s - 1);
    }

    function goAboutNext() {
      if (aboutLast) setPhase(PHASES.prep);
      else setAboutStep((s) => s + 1);
    }

    return (
      <ListenerFrame mode="regulation" hideTabBar>
        <div className="flex min-h-full flex-col pb-6">
          <SoftHero>
            <SystemBrandLogo className="h-6 w-auto" />
          </SoftHero>

          <p className="text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
            {about.eyebrow}
            <span className="mx-1.5 opacity-40" aria-hidden>
              ·
            </span>
            <span>
              {aboutStep + 1} of {aboutCount}
            </span>
          </p>
          <AppTitle className="mt-3 text-[1.65rem]">{about.title}</AppTitle>
          <AppBody className="mt-4 max-w-[34ch]">{about.body}</AppBody>

          <div className="mt-10">
            <StepBullets
              total={aboutCount}
              current={aboutStep}
              onSelect={setAboutStep}
              label="About Sonocea steps"
            />
          </div>

          <div className="mt-auto space-y-3 pt-12">
            <AppButton fullWidth onClick={goAboutNext}>
              {aboutLast ? "Continue" : "Next"}
            </AppButton>
            <AppButton fullWidth variant="ghost" onClick={goAboutBack}>
              Back
            </AppButton>
            {!aboutLast ? (
              <button
                type="button"
                onClick={() => setPhase(PHASES.prep)}
                className="w-full pt-1 text-center text-[12px]"
                style={{ color: "var(--proto-text-muted)" }}
              >
                Skip intro
              </button>
            ) : null}
          </div>
        </div>
      </ListenerFrame>
    );
  }

  if (phase === PHASES.prep) {
    return (
      <ListenerFrame mode="regulation" hideTabBar>
        <div className="flex min-h-full flex-col pb-6 pt-4">
          <p className="text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
            Before you begin
          </p>
          <AppTitle className="mt-3 text-[1.65rem]">Get ready to listen</AppTitle>
          <AppBody className="mt-3 max-w-[34ch]">
            A few moments of setup helps sessions work as intended.
          </AppBody>

          <ul className="mt-8 space-y-3">
            {ONBOARDING_PREP_CHECKLIST.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border px-4 py-3.5"
                style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] text-white"
                  style={{ background: "var(--proto-accent, #3d4a44)" }}
                  aria-hidden
                >
                  ✓
                </span>
                <span className="text-[14px] leading-snug" style={{ color: "var(--proto-text)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-3 pt-12">
            <AppButton fullWidth onClick={() => setPhase(PHASES.identity)}>
              I&apos;m ready
            </AppButton>
            <AppButton fullWidth variant="ghost" onClick={() => setPhase(PHASES.about)}>
              Back
            </AppButton>
          </div>
        </div>
      </ListenerFrame>
    );
  }

  if (phase === PHASES.identity) {
    return (
      <ListenerFrame mode="regulation" hideTabBar>
        <div className="flex min-h-full flex-col pb-6 pt-4">
          <p className="text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
            Tell us about yourself
          </p>
          <AppTitle className="mt-3 text-[1.55rem]">What best describes you?</AppTitle>
          <AppBody className="mt-3">Optional — helps us soften recommendations. You can change this later.</AppBody>

          <div className="mt-8 space-y-2.5">
            {ONBOARDING_IDENTITY_OPTIONS.map((opt) => (
              <SelectRow
                key={opt.id}
                label={opt.label}
                selected={identityId === opt.id}
                onClick={() => setIdentityId(opt.id)}
              />
            ))}
          </div>

          <div className="mt-auto space-y-3 pt-10">
            <AppButton fullWidth disabled={!identityId} onClick={() => setPhase(PHASES.support)}>
              Next
            </AppButton>
            <AppButton fullWidth variant="ghost" onClick={() => setPhase(PHASES.prep)}>
              Back
            </AppButton>
          </div>
        </div>
      </ListenerFrame>
    );
  }

  if (phase === PHASES.support) {
    return (
      <ListenerFrame mode="regulation" hideTabBar>
        <div className="flex min-h-full flex-col pb-6 pt-4">
          <AppTitle className="mt-2 text-[1.45rem]">What would you most like support with?</AppTitle>
          <AppBody className="mt-3">Choose as many as you like.</AppBody>

          <div className="mt-8 space-y-2.5">
            {ONBOARDING_SUPPORT_OPTIONS.map((opt) => (
              <SelectRow
                key={opt.id}
                label={opt.label}
                selected={supportIds.includes(opt.id)}
                onClick={() => toggleSupport(opt.id)}
                multi
              />
            ))}
          </div>

          <div className="mt-auto space-y-3 pt-10">
            <AppButton
              fullWidth
              disabled={supportIds.length === 0}
              onClick={() => setPhase(PHASES.timing)}
            >
              Next
            </AppButton>
            <AppButton fullWidth variant="ghost" onClick={() => setPhase(PHASES.identity)}>
              Back
            </AppButton>
          </div>
        </div>
      </ListenerFrame>
    );
  }

  // timing
  return (
    <ListenerFrame mode="regulation" hideTabBar>
      <div className="flex min-h-full flex-col pb-6 pt-4">
        <AppTitle className="mt-2 text-[1.45rem]">When are you most likely to listen?</AppTitle>
        <AppBody className="mt-3">We’ll use this for gentle nudges — never spam.</AppBody>

        <div className="mt-8 space-y-2.5">
          {ONBOARDING_LISTEN_TIMES.map((opt) => (
            <SelectRow
              key={opt.id}
              label={opt.label}
              selected={listenTime === opt.id}
              onClick={() => setListenTime(opt.id)}
            />
          ))}
        </div>

        <div className="mt-auto space-y-3 pt-10">
          <AppButton fullWidth disabled={!listenTime} onClick={finishAndPrepare}>
            Next
          </AppButton>
          <AppButton fullWidth variant="ghost" onClick={() => setPhase(PHASES.support)}>
            Back
          </AppButton>
        </div>
      </div>
    </ListenerFrame>
  );
}

/** Brief brand beat after invitation — lands into Welcome. */
function OpeningScreen({ onDone, autoAdvance = true }) {
  useEffect(() => {
    if (!autoAdvance) return undefined;
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone, autoAdvance]);

  return (
    <ListenerFrame mode="regulation" hideTabBar bleed>
      <div
        className="relative flex min-h-full flex-col items-center justify-center overflow-hidden px-8 text-center"
        style={{ background: "#ebeae5" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(70% 55% at 50% 42%, #d8d6d0 0%, transparent 62%),
              radial-gradient(90% 70% at 80% 90%, #cfc9c0 0%, transparent 50%)
            `,
          }}
          aria-hidden
        />
        <div
          className="relative text-[#2c2a27]"
          style={{
            animation: autoAdvance
              ? "openMarkIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both"
              : undefined,
          }}
        >
          <SystemLogoMark className="mx-auto h-14 w-auto" title="Sonocea" />
        </div>
        <p
          className="relative mt-8 text-[15px] font-medium tracking-[-0.02em]"
          style={{
            color: "#3d4a44",
            animation: autoAdvance ? "openFadeUp 0.7s ease-out 0.35s both" : undefined,
          }}
        >
          Opening your experience
        </p>
        <div
          className="relative mt-6 h-0.5 w-16 overflow-hidden rounded-full"
          style={{ background: "rgba(61,74,68,0.15)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: "45%",
              background: "#3d4a44",
              animation: autoAdvance ? "openBar 1.6s ease-in-out infinite" : undefined,
            }}
          />
        </div>
        {!autoAdvance ? (
          <button
            type="button"
            onClick={onDone}
            className="relative mt-10 rounded-full px-6 py-3 text-[13px] font-medium text-white"
            style={{ background: "#3d4a44" }}
          >
            Continue
          </button>
        ) : null}
        <style>{`
          @keyframes openMarkIn {
            from { opacity: 0; transform: scale(0.88); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes openFadeUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes openBar {
            0%, 100% { transform: translateX(-20%); opacity: 0.65; }
            50% { transform: translateX(140%); opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="openMarkIn"],
            [style*="openFadeUp"],
            [style*="openBar"] {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </ListenerFrame>
  );
}

function PreparingScreen({ onDone, autoAdvance = true }) {
  useEffect(() => {
    if (!autoAdvance) return undefined;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone, autoAdvance]);

  return (
    <ListenerFrame mode="regulation" hideTabBar bleed>
      <div
        className="relative flex min-h-full flex-col items-center justify-center overflow-hidden px-8 text-center"
        style={{ background: "#141312" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background: `
              radial-gradient(70% 50% at 50% 40%, #3a3936 0%, transparent 60%),
              radial-gradient(90% 70% at 30% 80%, #2a2926 0%, transparent 55%)
            `,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "140px 140px",
            mixBlendMode: "overlay",
          }}
          aria-hidden
        />
        <p className="relative text-[1.35rem] font-medium leading-snug tracking-[-0.02em] text-white">
          We&apos;re preparing your recommended listening experience.
        </p>
        <div
          className="relative mt-8 h-1 w-24 overflow-hidden rounded-full"
          style={{ background: "rgba(255,255,255,0.15)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: "40%",
              background: "#8f9b95",
              animation: autoAdvance ? "prepPulse 1.2s ease-in-out infinite" : undefined,
            }}
          />
        </div>
        {!autoAdvance ? (
          <button
            type="button"
            onClick={onDone}
            className="relative mt-10 rounded-full px-6 py-3 text-[13px] font-medium text-white"
            style={{ background: "#3d4a44" }}
          >
            Continue to Home
          </button>
        ) : null}
        <style>{`
          @keyframes prepPulse {
            0%, 100% { transform: translateX(0); opacity: 0.7; }
            50% { transform: translateX(150%); opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="prepPulse"] { animation: none !important; width: 100% !important; }
          }
        `}</style>
      </div>
    </ListenerFrame>
  );
}

/** Questionnaire entry alias — lands on identity step of the full onboarding flow. */
export function ListenerNeurotype() {
  const { role, onboardingComplete, neurotypeId } = useAppStore();

  if (role !== "listener") return <Navigate to="/app/listener" replace />;
  if (onboardingComplete && neurotypeId) return <Navigate to="/app/listener/home" replace />;

  return <Navigate to="/app/listener/onboarding?phase=identity" replace />;
}
