import { useEffect, useMemo, useRef, useState } from "react";
import {
  FadeBridgeScreen,
  formatPreferredName,
} from "../../components/FadeBridge.jsx";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  ONBOARDING_ABOUT_SLIDES,
  ONBOARDING_LISTEN_TIMES,
  ONBOARDING_MOOD_OPTIONS,
  ONBOARDING_PREP_CHECKLIST,
  ONBOARDING_SENSORY_OPTIONS,
  ONBOARDING_SUPPORT_OPTIONS,
  normaliseOnboardingPrefs,
  personalisedReadyCopy,
  rankSessionsForPreferences,
} from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { openCheckInModal } from "../../components/CheckInModal.jsx";
import { ListenerFrame } from "../../components/ListenerFrame.jsx";
import { PartnerBrandMark } from "../../components/PartnerBrandMark.jsx";
import { AppBody, AppButton, AppEyebrow, AppField, AppTitle } from "../../components/ui.jsx";
import { SystemBrandLogo } from "../../../system/components/SystemBrandLogo.jsx";
import { SystemLogoMark } from "../../../system/components/SystemLogoMark.jsx";
import {
  adaptBeginModeLabel,
  adaptPeriodLabel,
  resolveAppearance,
} from "../../utils/appearance.js";

const PHASES = {
  loading: "loading",
  welcome: "welcome",
  welcomeBridge: "welcome-bridge",
  about: "about",
  personaliseIntro: "personalise-intro",
  outcomes: "outcomes",
  context: "context",
  timing: "timing",
  /** @deprecated Thanks step removed — deep-links resolve to appearance. */
  personaliseAck: "personalise-ack",
  sensory: "sensory",
  neurodivergence: "neurodivergence",
  notifications: "notifications",
  appearance: "appearance",
  preparing: "preparing",
  ready: "ready",
  /** @deprecated deep-link aliases */
  name: "name",
  identity: "identity",
  listening: "listening",
  support: "support",
};

const APPEARANCE_CHOICES = [
  {
    id: "light",
    label: "Light",
    description: "Bright and clear throughout the day.",
  },
  {
    id: "dark",
    label: "Dark",
    description: "A softer, darker listening environment.",
  },
  {
    id: "adapt",
    label: "Adapt to time of day",
    description: "Light during the day. Dark when it gets later.",
    recommended: true,
  },
];

/** Stagger between sequential onboarding reveals. */
const STAGGER_MS = 100;

function StaggerStyles() {
  return (
    <style>{`
      @keyframes obStaggerIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .ob-stagger {
        animation: obStaggerIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-delay: var(--ob-delay, 0ms);
      }
      @media (prefers-reduced-motion: reduce) {
        .ob-stagger {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

function StaggerItem({ i = 0, className = "", children, as: Comp = "div", style }) {
  return (
    <Comp
      className={`ob-stagger ${className}`.trim()}
      style={{ ...style, "--ob-delay": `${i * STAGGER_MS}ms` }}
    >
      {children}
    </Comp>
  );
}

function resolvePhaseParam(phaseParam) {
  if (!phaseParam) return null;
  if (phaseParam === "name") return PHASES.welcome;
  if (phaseParam === "listening" || phaseParam === "support") return PHASES.context;
  if (phaseParam === "identity" || phaseParam === "neurodivergence") return PHASES.notifications;
  if (phaseParam === "prep") return PHASES.about;
  if (phaseParam === "goals") return PHASES.outcomes;
  /** @deprecated Thanks step removed — appearance follows notifications. */
  if (phaseParam === "personalise-ack") return PHASES.appearance;
  if (Object.values(PHASES).includes(phaseParam)) return phaseParam;
  return null;
}

/** Keep auto-advance timers from resetting when parent re-creates onDone. */
function useStableCallback(fn) {
  const ref = useRef(fn);
  ref.current = fn;
  return ref;
}

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

function OnboardingBackButton({ onClick, dark = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-opacity hover:opacity-70"
      style={{ color: dark ? "#f3f3f3" : "var(--proto-text)" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M15 5L8 12l7 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/** Centered Sonocea wordmark with optional back - frees vertical space below. */
function OnboardingTopBar({ onBack, dark = false }) {
  return (
    <div className="relative flex h-12 w-full shrink-0 items-center justify-center">
      {onBack ? <OnboardingBackButton onClick={onBack} dark={dark} /> : null}
      <span style={dark ? { filter: "brightness(0) invert(1)" } : undefined}>
        <SystemBrandLogo className="h-7 w-auto" />
      </span>
    </div>
  );
}

function SelectRow({ label, selected, onClick, multi }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-full px-5 py-3.5 text-left text-[15px] font-normal tracking-tight transition-[box-shadow,background-color,border-color]"
      style={{
        border: selected ? "1px solid #171716" : "1px solid transparent",
        background: "#fff",
        color: "#171716",
        boxShadow: selected
          ? "0 1px 2px rgba(23, 23, 22, 0.08)"
          : "0 2px 10px rgba(23, 23, 22, 0.06)",
      }}
      aria-pressed={selected}
      data-multi={multi ? "true" : undefined}
    >
      {label}
    </button>
  );
}

function AppearanceOptionCard({ option, selected, onClick }) {
  const recommended = Boolean(option.recommended);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="w-full text-left transition-[box-shadow,background-color,border-color] duration-200"
      style={{
        borderRadius: recommended ? "1.35rem" : "1.15rem",
        padding: recommended ? "1rem 1rem 0.95rem" : "0.85rem 0.95rem 0.85rem",
        border: selected
          ? "1.5px solid var(--proto-text)"
          : "1px solid var(--proto-border)",
        background: selected
          ? "color-mix(in srgb, var(--proto-text) 6%, var(--proto-surface))"
          : "var(--proto-surface)",
        color: "var(--proto-text)",
      }}
    >
      <div className="min-w-0">
        {recommended ? (
          <span
            className="mb-1.5 inline-block text-[10px] font-medium uppercase tracking-[0.14em]"
            style={{ color: "var(--proto-text-muted)" }}
          >
            Recommended
          </span>
        ) : null}
        <div className="flex items-center gap-2">
          <span className={`tracking-tight ${recommended ? "text-[16px] font-medium" : "text-[15px] font-medium"}`}>
            {option.label}
          </span>
          {selected ? (
            <span
              className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
              style={{ background: "var(--proto-text)", color: "var(--proto-bg)" }}
              aria-hidden
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5.2L4.1 7.3L8.2 2.8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ) : (
            <span
              className="ml-auto flex h-5 w-5 shrink-0 rounded-full"
              style={{ border: "1px solid var(--proto-border)" }}
              aria-hidden
            />
          )}
        </div>
        <p
          className={`mt-1 leading-snug ${recommended ? "text-[13px]" : "text-[12.5px]"}`}
          style={{ color: "var(--proto-text-muted)" }}
        >
          {option.description}
        </p>
      </div>
    </button>
  );
}

function SoftHero({ children, tall }) {
  return (
    <div className={`relative px-0 ${tall ? "pb-8 pt-2" : "pb-4 pt-1"}`}>
      <div className="relative flex justify-center">{children}</div>
    </div>
  );
}

/** Sonocea + partner lockup to signal the partnership. */
function PartnershipLockup({ partner, markOnly = false, size = "md" }) {
  const markClass = size === "lg" ? "h-14 w-auto" : "h-7 w-auto";
  const brandClass = size === "lg" ? "h-8 w-auto" : "h-7 w-auto";
  const partnerClass = size === "lg" ? "h-14 w-auto max-h-14 max-w-[72px]" : "h-9 w-auto max-h-9 max-w-[56px]";
  const showPartner = Boolean(partner) && !partner?.isDirectAccess;

  return (
    <div className="flex items-center justify-center gap-3" aria-label={showPartner && partner?.name ? `Sonocea and ${partner.name}` : "Sonocea"}>
      {markOnly ? (
        <SystemLogoMark className={markClass} title="Sonocea" />
      ) : (
        <SystemBrandLogo className={brandClass} />
      )}
      {showPartner ? (
        <>
          <span
            className="text-[13px] font-normal tracking-wide opacity-35"
            style={{ color: markOnly ? "#2c2a27" : "var(--proto-text)" }}
            aria-hidden
          >
            ×
          </span>
          <PartnerBrandMark
            partner={partner}
            className={`${partnerClass} object-contain`}
            monogramClassName={`flex items-center justify-center rounded-full text-[11px] font-semibold tracking-wide text-white ${
              size === "lg" ? "h-14 w-14" : "h-9 w-9"
            }`}
          />
        </>
      ) : null}
    </div>
  );
}

/** Shared multi/single-select onboarding step with staggered reveal. */
function ChoiceStep({
  animKey,
  title,
  body,
  hint,
  question,
  questionHint,
  options,
  renderOption,
  footer,
  afterOptions = null,
  onBack,
}) {
  let i = 0;
  return (
    <ListenerFrame mode="regulation" hideTabBar screenKey={animKey} footer={footer}>
      <div className="relative flex flex-col pb-4 pt-1">
        <StaggerStyles />
        <OnboardingTopBar onBack={onBack} />
        <StaggerItem i={i++} className="mt-8">
          <AppTitle className="mx-auto max-w-[16ch] text-center text-[1.85rem] leading-[1.1] tracking-[-0.03em]">
            {title}
          </AppTitle>
        </StaggerItem>
        {body || hint ? (
          <StaggerItem i={i++}>
            <div
              className="mx-auto mt-4 max-w-[32ch] space-y-2 text-center text-[15px] leading-snug"
              style={{ color: "var(--proto-text-muted)" }}
            >
              {body ? <p>{body}</p> : null}
              {hint ? <p>{hint}</p> : null}
            </div>
          </StaggerItem>
        ) : null}

        {question ? (
          <StaggerItem i={i++} className="mt-7">
            <p className="mx-auto max-w-[22ch] text-center text-[17px] font-normal leading-snug tracking-tight">
              {question}
            </p>
            {questionHint ? (
              <p
                className="mx-auto mt-2 max-w-[30ch] text-center text-[13px] leading-snug"
                style={{ color: "var(--proto-text-muted)" }}
              >
                {questionHint}
              </p>
            ) : null}
          </StaggerItem>
        ) : null}

        <StaggerItem i={i++} className={`${question ? "mt-5" : "mt-7"} space-y-2.5`}>
          {options.map((opt) => (
            <div key={opt.id}>{renderOption(opt)}</div>
          ))}
        </StaggerItem>

        {(afterOptions ?? []).filter(Boolean).map((node, idx) => (
          <StaggerItem key={`after-${idx}`} i={i++}>
            {node}
          </StaggerItem>
        ))}
      </div>
    </ListenerFrame>
  );
}

/**
 * First-time experience:
 * Loading → Welcome+name → About (4) → Personalise intro → Goals → Moments →
 * Sensory → Times → Notifications → Appearance → Preparing → Ready →
 * First session | Home
 */
export function ListenerOnboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const {
    role,
    user,
    partners,
    catalog,
    onboardingComplete,
    neurotypeId,
    onboardingPrefs,
    completeOnboarding,
    setNeurotype,
    setOnboardingPrefs,
    updateListenerProfile,
    setAppearance,
    setNotificationsEnabled,
  } = useAppStore();

  const phaseParam = searchParams.get("phase");
  const fromInvite = Boolean(location.state?.fromInvite);
  const normalisedPhase = resolvePhaseParam(phaseParam);
  const [phase, setPhase] = useState(() => {
    if (normalisedPhase) return normalisedPhase;
    if (fromInvite) return PHASES.loading;
    return PHASES.welcome;
  });
  const [aboutStep, setAboutStep] = useState(0);
  // Name can carry forward from welcome; preference steps always start blank
  // so nothing looks pre-selected from demo data or a previous run.
  // Anonymous / direct-access: empty field + "Your name" placeholder.
  // Combined / invite: prefill from the invite profile name.
  const [preferredName, setPreferredName] = useState(() => {
    if (user?.isAnonymous) {
      return onboardingPrefs?.preferredName?.trim() || "";
    }
    return user?.displayName?.trim() || onboardingPrefs?.preferredName?.trim() || "";
  });
  const [supportGoals, setSupportGoals] = useState([]);
  const [listeningMoments, setListeningMoments] = useState([]);
  const [listeningTimes, setListeningTimes] = useState([]);
  const [sensorySensitivity, setSensorySensitivity] = useState(null);
  const [neurodivergence] = useState(null);
  const [notificationPreference, setNotificationPreference] = useState(null);
  const [modeChoice, setModeChoice] = useState("light");
  const [firstSessionStarted, setFirstSessionStarted] = useState(false);

  useEffect(() => {
    if (!phaseParam) return;
    const resolved = resolvePhaseParam(phaseParam);
    if (!resolved) return;
    setPhase(resolved);
    if (resolved === PHASES.about) {
      setAboutStep(phaseParam === "prep" ? ONBOARDING_ABOUT_SLIDES.length - 1 : 0);
    }
  }, [phaseParam]);

  // Keep First-Time Experience in light until the appearance step (avoids night-time
  // "adapt" making the whole listener review look default-dark).
  useEffect(() => {
    if (phase === PHASES.appearance) return;
    setAppearance("light");
  }, [phase, setAppearance]);

  useEffect(() => {
    if (phase !== PHASES.appearance) return;
    setAppearance(modeChoice || "light");
  }, [phase, modeChoice, setAppearance]);
  const about =
    ONBOARDING_ABOUT_SLIDES[aboutStep] ?? ONBOARDING_ABOUT_SLIDES[0];
  const aboutLast = aboutStep >= ONBOARDING_ABOUT_SLIDES.length - 1;
  const partner = partners?.find((p) => p.id === user?.partnerId);
  const callName = preferredName.trim();

  if (role !== "listener") return <Navigate to="/app/listener" replace />;
  if (
    onboardingComplete &&
    neurotypeId &&
    !phaseParam &&
    phase !== PHASES.preparing &&
    phase !== PHASES.loading &&
    phase !== PHASES.welcomeBridge &&
    phase !== PHASES.ready
  ) {
    return <Navigate to="/app/listener/home" replace />;
  }

  function persistPrefs(extra = {}) {
    const prefs = normaliseOnboardingPrefs({
      preferredName: callName || null,
      supportGoals,
      listeningMoments,
      listeningTimes,
      sensorySensitivity,
      neurodivergence,
      notificationPreference,
      appearancePreference: modeChoice,
      firstSessionStarted,
      ...extra,
    });
    setOnboardingPrefs(prefs);
    return prefs;
  }

  function finishPersonalisationAndPrepare() {
    const prefs = persistPrefs();
    if (prefs.preferredName) {
      updateListenerProfile({ displayName: prefs.preferredName, isAnonymous: false });
    } else {
      updateListenerProfile({ displayName: null, isAnonymous: true });
    }
    setAppearance(modeChoice || "light");
    // Pathway mode only - never derived from neurodivergence / sensory answers.
    setNeurotype("supported");
    completeOnboarding();
    setPhase(PHASES.preparing);
  }

  function chooseMode(id) {
    setModeChoice(id);
  }

  function allowNotifications() {
    setNotificationPreference(true);
    setNotificationsEnabled(true);
    setPhase(PHASES.appearance);
  }

  function skipNotifications() {
    setNotificationPreference(false);
    setNotificationsEnabled(false);
    setPhase(PHASES.appearance);
  }

  function toggleGoal(id) {
    setSupportGoals((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleMoment(id) {
    setListeningMoments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleListenTime(id) {
    setListeningTimes((prev) => {
      if (id === "anytime") {
        return prev.includes("anytime") ? [] : ["anytime"];
      }
      const withoutAnytime = prev.filter((x) => x !== "anytime");
      return withoutAnytime.includes(id)
        ? withoutAnytime.filter((x) => x !== id)
        : [...withoutAnytime, id];
    });
  }

  function beginFirstSession() {
    const prefs = persistPrefs({ firstSessionStarted: true });
    setFirstSessionStarted(true);
    if (prefs.preferredName) {
      updateListenerProfile({ displayName: prefs.preferredName, isAnonymous: false });
    }
    const first =
      rankSessionsForPreferences(catalog ?? [], prefs)[0] ??
      catalog?.find((s) => s.id === "ses-arrive") ??
      catalog?.[0];
    navigate("/app/listener/home", { replace: true });
    if (first) openCheckInModal(first);
  }

  function goToHome() {
    persistPrefs({ firstSessionStarted: false });
    navigate("/app/listener/home", { replace: true });
  }

  if (phase === PHASES.loading) {
    return (
      <OpeningScreen
        partner={partner}
        autoAdvance={phaseParam !== PHASES.loading}
        onDone={() => setPhase(PHASES.welcome)}
      />
    );
  }

  if (phase === PHASES.preparing) {
    return (
      <PreparingScreen
        name={callName}
        autoAdvance={phaseParam !== PHASES.preparing}
        onDone={() => setPhase(PHASES.ready)}
      />
    );
  }

  if (phase === PHASES.welcomeBridge) {
    return (
      <WelcomeBridgeScreen
        name={callName}
        autoAdvance={phaseParam !== PHASES.welcomeBridge}
        onDone={() => {
          setAboutStep(0);
          setPhase(PHASES.about);
        }}
      />
    );
  }

  // 01 · Welcome + preferred name
  if (phase === PHASES.welcome) {
    let i = 0;
    return (
      <ListenerFrame
        mode="regulation"
        hideTabBar
        footer={
          <AppButton fullWidth onClick={() => setPhase(PHASES.welcomeBridge)}>
            Continue
          </AppButton>
        }
      >
        <div key="welcome" className="flex min-h-full flex-col pb-4 pt-1">
          <StaggerStyles />
          <StaggerItem i={i++} className="mt-8 shrink-0">
            <SoftHero>
              <PartnershipLockup partner={partner} />
            </SoftHero>
          </StaggerItem>
          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <StaggerItem i={i++}>
              <AppTitle className="mx-auto max-w-[16ch] text-center text-[1.75rem] leading-[1.15] tracking-[-0.03em]">
                What should we call you?
              </AppTitle>
            </StaggerItem>
            <StaggerItem i={i++}>
              <AppBody className="mx-auto mt-3 max-w-[32ch] text-center text-[14px] leading-relaxed">
                We’ll use this when we say hello. A first name or nickname is perfect.
              </AppBody>
            </StaggerItem>
            <StaggerItem i={i++} className="mt-8">
              <AppField
                value={preferredName}
                onChange={setPreferredName}
                placeholder="Your name"
                autoComplete="nickname"
              />
            </StaggerItem>
          </div>
        </div>
      </ListenerFrame>
    );
  }

  // 02 · About Sonocea - grand centered steps with video placeholder
  if (phase === PHASES.about) {
    const aboutCount = ONBOARDING_ABOUT_SLIDES.length;

    function goAboutBack() {
      if (aboutStep === 0) setPhase(PHASES.welcomeBridge);
      else setAboutStep((s) => s - 1);
    }

    function goAboutNext() {
      if (aboutLast) setPhase(PHASES.personaliseIntro);
      else setAboutStep((s) => s + 1);
    }

    return (
      <ListenerFrame
        mode="regulation"
        hideTabBar
        footer={
          <div className="space-y-3">
            <StepBullets
              total={aboutCount}
              current={aboutStep}
              onSelect={setAboutStep}
              label="About Sonocea steps"
            />
            <AppButton fullWidth onClick={goAboutNext}>
              {about.cta ?? (aboutLast ? "Continue" : "Next")}
            </AppButton>
          </div>
        }
      >
        <div
          key={`about-${aboutStep}`}
          className="relative flex flex-col items-center overflow-hidden pb-4 pt-1 text-center"
        >
          <StaggerStyles />
          <OnboardingTopBar onBack={goAboutBack} />

          <StaggerItem i={0} className="mt-2 w-full shrink-0">
            <div
              className="relative w-full overflow-hidden rounded-[1.5rem]"
              style={{
                aspectRatio: about.showChecklist ? "16 / 10" : "4 / 3",
                maxHeight: about.showChecklist ? "26vh" : "36vh",
                background: "#141414",
              }}
              aria-hidden
            >
              <div className="relative flex h-full flex-col items-center justify-center px-6">
                <span className="text-[#6b6862]" aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="8.5" cy="10" r="1.75" fill="currentColor" />
                    <path
                      d="M4.5 16.5 9 12.5l3 2.5 3.5-4 4 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem i={1} className="w-full shrink-0">
            {about.eyebrow ? (
              <AppEyebrow className="mx-auto mt-5 text-center">
                {about.eyebrow}
              </AppEyebrow>
            ) : null}
            <AppTitle
              className={`mx-auto max-w-[18ch] text-center text-[1.45rem] leading-[1.15] tracking-[-0.03em] ${
                about.eyebrow ? "mt-2" : "mt-5"
              }`}
            >
              {about.title}
            </AppTitle>
          </StaggerItem>
          <StaggerItem i={2} className="w-full shrink-0">
            <AppBody className="mx-auto mt-3 max-w-[34ch] text-center text-[17px] leading-snug">
              {about.body}
            </AppBody>
          </StaggerItem>

          {about.showChecklist ? (
            <StaggerItem i={3} className="mx-auto mt-4 w-full max-w-sm shrink-0">
              <ul className="space-y-1.5 text-left">
                {ONBOARDING_PREP_CHECKLIST.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-2.5 rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
                  >
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] text-white"
                      style={{ background: "var(--proto-accent, #2c2a27)" }}
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span className="min-w-0">
                      <span
                        className="block text-[12px] font-medium leading-snug"
                        style={{ color: "var(--proto-text)" }}
                      >
                        {item.title}
                      </span>
                      <span
                        className="mt-0.5 block text-[11px] leading-snug"
                        style={{ color: "var(--proto-text-muted)" }}
                      >
                        {item.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ) : null}
        </div>
      </ListenerFrame>
    );
  }

  // 03 · Personalised chapter break - fade bridge into questions
  if (phase === PHASES.personaliseIntro) {
    return (
      <FadePhraseScreen
        phrase="Now let’s learn more about you…"
        autoAdvance={phaseParam !== PHASES.personaliseIntro}
        onDone={() => setPhase(PHASES.outcomes)}
      />
    );
  }

  // 04 · Goals: what would help
  if (phase === PHASES.outcomes) {
    return (
      <ChoiceStep
        animKey="outcomes"
        title="What would you like Sonocea to help with?"
        body="This helps us understand what matters to you and recommend sessions that feel more relevant."
        options={ONBOARDING_SUPPORT_OPTIONS}
        onBack={() => {
          setAboutStep(ONBOARDING_ABOUT_SLIDES.length - 1);
          setPhase(PHASES.about);
        }}
        renderOption={(opt) => (
          <SelectRow
            label={opt.label}
            selected={supportGoals.includes(opt.id)}
            onClick={() => toggleGoal(opt.id)}
            multi
          />
        )}
        footer={
          <AppButton
            fullWidth
            disabled={supportGoals.length === 0}
            onClick={() => setPhase(PHASES.context)}
          >
            Next
          </AppButton>
        }
      />
    );
  }

  // 05 · Relevant moments: when that need tends to arise
  if (phase === PHASES.context) {
    return (
      <ChoiceStep
        animKey="context"
        title="When might Sonocea be useful to you?"
        body="Think about the moments when you might want a little support. This helps us understand when different sessions could be most useful."
        options={ONBOARDING_MOOD_OPTIONS}
        onBack={() => setPhase(PHASES.outcomes)}
        renderOption={(opt) => (
          <SelectRow
            label={opt.label}
            selected={listeningMoments.includes(opt.id)}
            onClick={() => toggleMoment(opt.id)}
            multi
          />
        )}
        footer={
          <AppButton
            fullWidth
            disabled={listeningMoments.length === 0}
            onClick={() => setPhase(PHASES.sensory)}
          >
            Next
          </AppButton>
        }
      />
    );
  }

  // 06 · Sensory (optional): how surroundings affect listening preferences
  if (phase === PHASES.sensory) {
    return (
      <ChoiceStep
        animKey="sensory"
        title="How sensitive are you to your surroundings?"
        body="Everyone responds differently to sound, visuals and their surroundings. This helps us tailor how your sessions look and feel."
        options={ONBOARDING_SENSORY_OPTIONS}
        onBack={() => setPhase(PHASES.context)}
        renderOption={(opt) => (
          <SelectRow
            label={opt.label}
            selected={sensorySensitivity === opt.id}
            onClick={() => setSensorySensitivity(opt.id)}
          />
        )}
        footer={
          <>
            <AppButton fullWidth onClick={() => setPhase(PHASES.timing)}>
              Next
            </AppButton>
            <AppButton
              fullWidth
              variant="ghost"
              onClick={() => {
                setSensorySensitivity(null);
                setPhase(PHASES.timing);
              }}
            >
              Skip
            </AppButton>
          </>
        }
      />
    );
  }

  // 07 · Listening time: when sessions could fit into the day
  if (phase === PHASES.timing) {
    return (
      <ChoiceStep
        animKey="timing"
        title="When would listening fit into your day?"
        body="Choose the times that feel most natural for you. We’ll use this to make your experience and reminders more useful."
        options={ONBOARDING_LISTEN_TIMES}
        onBack={() => setPhase(PHASES.sensory)}
        renderOption={(opt) => (
          <SelectRow
            label={opt.label}
            selected={listeningTimes.includes(opt.id)}
            onClick={() => toggleListenTime(opt.id)}
            multi
          />
        )}
        footer={
          <AppButton
            fullWidth
            disabled={listeningTimes.length === 0}
            onClick={() => setPhase(PHASES.notifications)}
          >
            Next
          </AppButton>
        }
      />
    );
  }

  // 08 · Notifications: continues from listening-time answers
  if (phase === PHASES.notifications) {
    let i = 0;
    return (
      <ListenerFrame
        mode="regulation"
        hideTabBar
        footer={
          <>
            <AppButton fullWidth onClick={allowNotifications}>
              Allow notifications
            </AppButton>
            <AppButton fullWidth variant="ghost" onClick={skipNotifications}>
              Not now
            </AppButton>
          </>
        }
      >
        <div key="notifications" className="relative flex flex-col pb-4 pt-1">
          <StaggerStyles />
          <OnboardingTopBar onBack={() => setPhase(PHASES.timing)} />
          <StaggerItem i={i++} className="mt-8">
            <AppTitle className="mx-auto max-w-[14ch] text-center text-[1.75rem] leading-[1.15] tracking-[-0.03em]">
              Would you like us to remind you?
            </AppTitle>
          </StaggerItem>
          <StaggerItem i={i++}>
            <AppBody className="mx-auto mt-3 max-w-[32ch] text-center text-[14px] leading-relaxed">
              We can send gentle reminders around the times you’ve chosen, so it’s easier to make time for your sessions.
            </AppBody>
          </StaggerItem>
          <StaggerItem i={i++} className="mt-10">
            <div
              className="rounded-[1.5rem] border px-5 py-6 text-center"
              style={{
                borderColor: "var(--proto-border)",
                background: "#fff",
                boxShadow: "0 2px 10px rgba(23, 23, 22, 0.06)",
              }}
            >
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  background: "rgba(23, 23, 22, 0.06)",
                  color: "#171716",
                }}
                aria-hidden
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 19a2 2 0 0 0 4 0" strokeLinecap="round" />
                </svg>
              </div>
              <p className="mt-4 text-[15px] font-normal tracking-tight" style={{ color: "#171716" }}>
                Session reminders
              </p>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "rgba(23, 23, 22, 0.55)" }}>
                Helpful prompts around the times that work for you. You can change these anytime in Profile.
              </p>
            </div>
          </StaggerItem>
        </div>
      </ListenerFrame>
    );
  }

  // 09 · Appearance
  if (phase === PHASES.appearance) {
    const selected = modeChoice || "light";
    const period = adaptPeriodLabel();
    const beginMode = adaptBeginModeLabel();
    const topBarDark = resolveAppearance(selected) === "dark";
    let i = 0;
    return (
      <ListenerFrame
        mode="regulation"
        hideTabBar
        screenKey="appearance"
        footer={
          <AppButton fullWidth disabled={!selected} onClick={finishPersonalisationAndPrepare}>
            Next
          </AppButton>
        }
      >
        <div className="relative flex flex-col pb-4 pt-1">
          <StaggerStyles />
          <OnboardingTopBar
            onBack={() => setPhase(PHASES.notifications)}
            dark={topBarDark}
          />
          <StaggerItem i={i++} className="mt-7">
            <AppTitle className="mx-auto max-w-[14ch] text-center text-[1.85rem] leading-[1.12] tracking-[-0.03em]">
              How would you like Sonocea to feel?
            </AppTitle>
          </StaggerItem>
          <StaggerItem i={i++}>
            <p
              className="mx-auto mt-3.5 max-w-[30ch] text-center text-[15px] leading-snug"
              style={{ color: "var(--proto-text-muted)" }}
            >
              Choose an appearance that feels right for you, or let Sonocea adapt throughout the day.
            </p>
          </StaggerItem>

          <StaggerItem i={i++} className="mt-6 space-y-2.5">
            {APPEARANCE_CHOICES.map((opt) => (
              <AppearanceOptionCard
                key={opt.id}
                option={opt}
                selected={selected === opt.id}
                onClick={() => chooseMode(opt.id)}
              />
            ))}
          </StaggerItem>

          {selected === "adapt" ? (
            <StaggerItem i={i++}>
              <p
                className="mx-auto mt-3.5 max-w-[32ch] text-center text-[12.5px] leading-snug"
                style={{ color: "var(--proto-text-muted)", opacity: 0.9 }}
              >
                {`It's ${period} where you are, so Sonocea will begin in ${beginMode}.`}
              </p>
            </StaggerItem>
          ) : null}

          <StaggerItem i={i++}>
            <p
              className="mt-3 text-center text-[12px]"
              style={{ color: "var(--proto-text-muted)", opacity: 0.72 }}
            >
              You can change this anytime.
            </p>
          </StaggerItem>
        </div>
      </ListenerFrame>
    );
  }

  // 13 · Ready for your first session
  if (phase === PHASES.ready) {
    const readyPrefs = normaliseOnboardingPrefs({
      preferredName: callName || null,
      supportGoals,
      listeningMoments,
      listeningTimes,
      sensorySensitivity,
      neurodivergence,
      notificationPreference,
      appearancePreference: modeChoice,
      firstSessionStarted,
    });
    const session =
      rankSessionsForPreferences(catalog ?? [], readyPrefs)[0] ??
      catalog?.find((s) => s.id === "ses-arrive") ??
      catalog?.[0] ??
      null;
    const readyCopy = personalisedReadyCopy(readyPrefs, session);
    const topBarDark = resolveAppearance(modeChoice || "light") === "dark";
    let i = 0;
    return (
      <ListenerFrame
        mode="regulation"
        hideTabBar
        footer={
          <>
            <AppButton fullWidth onClick={beginFirstSession}>
              Begin
            </AppButton>
            <AppButton fullWidth variant="ghost" onClick={goToHome}>
              Not right now
            </AppButton>
          </>
        }
      >
        <div key="ready" className="flex min-h-full flex-col pb-4 pt-1">
          <style>{`
            @keyframes readyFadeIn {
              from { opacity: 0; transform: translateY(14px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .ready-fade {
              animation: readyFadeIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
              animation-delay: var(--ready-delay, 0ms);
            }
            @media (prefers-reduced-motion: reduce) {
              .ready-fade {
                animation: none !important;
                opacity: 1 !important;
                transform: none !important;
              }
            }
          `}</style>
          <OnboardingTopBar dark={topBarDark} />
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
            <div className="w-full">
              <div className="ready-fade" style={{ "--ready-delay": `${i++ * 90}ms` }}>
                <AppTitle className="mx-auto max-w-[18ch] text-center text-[1.85rem] leading-[1.15] tracking-[-0.03em]">
                  {readyCopy.title}
                </AppTitle>
              </div>
              <div className="ready-fade" style={{ "--ready-delay": `${i++ * 90}ms` }}>
                <AppBody className="mx-auto mt-4 max-w-[32ch] text-center text-[14px] leading-relaxed">
                  {readyCopy.body}
                </AppBody>
              </div>
              {session ? (
                <div className="ready-fade mt-10" style={{ "--ready-delay": `${i++ * 90}ms` }}>
                  <div
                    className="overflow-hidden rounded-[1.35rem] border"
                    style={{
                      borderColor: "rgba(44, 42, 39, 0.14)",
                      background: "#e8e6e1",
                    }}
                  >
                    <div
                      className="px-5 py-6 text-center"
                      style={{
                        background: "#e8e6e1",
                        color: "#2c2a27",
                      }}
                    >
                      <p className="text-[1.25rem] font-normal tracking-tight" style={{ color: "#2c2a27" }}>
                        {session.title}
                      </p>
                      {readyCopy.sessionMeta ? (
                        <p className="mt-1 text-[13px]" style={{ color: "rgba(44, 42, 39, 0.55)" }}>
                          {readyCopy.sessionMeta}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </ListenerFrame>
    );
  }

  // Unknown / stale phase - recover into the welcome step instead of a blank frame.
  return (
    <ListenerFrame mode="regulation" hideTabBar>
      <div className="flex h-full min-h-full flex-col items-center justify-center px-6 text-center">
        <AppTitle className="text-[1.5rem] tracking-[-0.03em]">Continue onboarding</AppTitle>
        <AppBody className="mt-3 max-w-[32ch] text-[14px]">
          Something interrupted this step. Pick up from your preferred name.
        </AppBody>
        <div className="mt-8 w-full max-w-sm">
          <AppButton fullWidth onClick={() => setPhase(PHASES.welcome)}>
            Continue
          </AppButton>
        </div>
      </div>
    </ListenerFrame>
  );
}

/** Single-phrase dark bridge - words fade in at the shared speed. */
function FadePhraseScreen({ phrase, onDone, autoAdvance = true }) {
  return (
    <FadeBridgeScreen
      phrases={[phrase]}
      onDone={onDone}
      autoAdvance={autoAdvance}
    />
  );
}

/** Greeting then “A little about us…” - shared dark word-fade bridge. */
function WelcomeBridgeScreen({ onDone, autoAdvance = true, name = "" }) {
  const displayName = formatPreferredName(name);
  const phrases = useMemo(() => {
    const greeting = displayName
      ? [
          { text: "Hi,", line: 0 },
          { text: `${displayName}.`, line: 0 },
        ]
      : [{ text: "Hi.", line: 0 }];
    return [greeting, "A little about us…"];
  }, [displayName]);

  return (
    <FadeBridgeScreen
      phrases={phrases}
      onDone={onDone}
      autoAdvance={autoAdvance}
    />
  );
}

/** Brief brand beat after invitation - lands into Welcome. */
function OpeningScreen({ onDone, autoAdvance = true, partner = null }) {
  const onDoneRef = useStableCallback(onDone);

  useEffect(() => {
    if (!autoAdvance) return undefined;
    const t = setTimeout(() => onDoneRef.current?.(), 2000);
    return () => clearTimeout(t);
  }, [autoAdvance, onDoneRef]);

  return (
    <ListenerFrame mode="regulation" hideTabBar bleed>
      <div
        className="relative flex h-full min-h-full flex-col items-center justify-center overflow-hidden px-8 text-center"
        style={{ background: "#f3f2f0" }}
      >
        <div
          className="relative text-[#171716]"
          style={{
            animation: autoAdvance
              ? "openMarkIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both"
              : undefined,
          }}
        >
          <PartnershipLockup partner={partner} markOnly size="lg" />
        </div>
        <p
          className="relative mt-8 text-[15px] font-normal tracking-[-0.02em]"
          style={{
            color: "#171716",
            animation: autoAdvance ? "openFadeUp 0.7s ease-out 0.35s both" : undefined,
          }}
        >
          Loading
        </p>
        <div
          className="relative mt-6 h-0.5 w-16 overflow-hidden rounded-full"
          style={{ background: "rgba(23,23,22,0.12)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: "45%",
              background: "#171716",
              animation: autoAdvance ? "openBar 1.6s ease-in-out infinite" : undefined,
            }}
          />
        </div>
        {!autoAdvance ? (
          <button
            type="button"
            onClick={onDone}
            className="relative mt-10 w-full max-w-xs rounded-full px-5 py-3.5 text-[14px] font-normal text-white"
            style={{ background: "#171716" }}
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

function PreparingScreen({ name, onDone, autoAdvance = true }) {
  const onDoneRef = useStableCallback(onDone);
  const displayName = formatPreferredName(name);
  const label = displayName
    ? `Preparing your first session, ${displayName}`
    : "Preparing your first session…";

  useEffect(() => {
    if (!autoAdvance) return undefined;
    const timer = setTimeout(() => onDoneRef.current?.(), 2200);
    return () => clearTimeout(timer);
  }, [autoAdvance, onDoneRef]);

  return (
    <ListenerFrame mode="regulation" hideTabBar bleed>
      <div
        className="relative flex h-full min-h-full flex-col items-center justify-center overflow-hidden px-8 text-center"
        style={{ background: "#000" }}
      >
        <div
          className="text-white/90"
          style={{
            animation: autoAdvance ? "prepMarkIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both" : undefined,
          }}
        >
          <SystemLogoMark className="mx-auto h-9 w-auto" title="Sonocea" />
        </div>
        <p
          className="mt-8 max-w-[16ch] text-[1.5rem] font-normal leading-[1.2] tracking-[-0.03em] text-white"
          style={{
            animation: autoAdvance
              ? "prepMarkIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both"
              : undefined,
          }}
        >
          {label}
        </p>
        <div
          className="relative mt-10 h-[2px] w-16 overflow-hidden rounded-full"
          style={{
            background: "rgba(255,255,255,0.1)",
            animation: autoAdvance
              ? "prepMarkIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both"
              : undefined,
          }}
        >
          <div
            className="h-full w-1/2 rounded-full bg-white/70"
            style={{
              animation: autoAdvance ? "prepSweep 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite" : undefined,
            }}
          />
        </div>
        {!autoAdvance ? (
          <button
            type="button"
            onClick={onDone}
            className="absolute inset-x-7 bottom-8 rounded-full px-5 py-3.5 text-[14px] font-normal"
            style={{ background: "#f3f2ee", color: "#171716" }}
          >
            Continue
          </button>
        ) : null}
        <style>{`
          @keyframes prepMarkIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes prepSweep {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(220%); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="prepMarkIn"],
            [style*="prepSweep"] { animation: none !important; opacity: 1 !important; }
          }
        `}</style>
      </div>
    </ListenerFrame>
  );
}

/** Questionnaire entry alias - lands on sensory step of the full onboarding flow. */
export function ListenerNeurotype() {
  const { role, onboardingComplete, neurotypeId } = useAppStore();

  if (role !== "listener") return <Navigate to="/app/listener" replace />;
  if (onboardingComplete && neurotypeId) return <Navigate to="/app/listener/home" replace />;

  return <Navigate to="/app/listener/onboarding?phase=sensory" replace />;
}
