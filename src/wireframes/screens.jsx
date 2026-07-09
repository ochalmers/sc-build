import { getWireframePalette, WF, WF_TYPE } from "./tokens.js";
import {
  WireframeScreen,
  WfTag,
  WfHeadline,
  WfPlaceholder,
  WfButton,
  WfTextLink,
  WfField,
  WfMessage,
  WfProgress,
  WfSlider,
  WfListRow,
  WfCardRow,
  WfChip,
  WfTabBar,
  WfScreenBody,
  WfScreenFooter,
  WfSkeletonLines,
  WfRatingRow,
  WfEmptyState,
  WfScreenHeader,
  WfSuccessMark,
  WfIcon,
  WfRowLink,
} from "./primitives.jsx";
import {
  ADMIN_NAV,
  DesktopWireframeShell,
  PARTNER_NAV,
  WfDesktopActions,
  WfDesktopButton,
  WfDesktopField,
  WfDesktopHeadline,
  WfDesktopMetrics,
  WfDesktopTable,
} from "./webPrimitives.jsx";

/* ——— Entry & splash ——— */

export function WfSplash() {
  return (
    <WireframeScreen>
      <WfScreenBody className="items-center justify-center px-6">
        <WfPlaceholder size="sm" className="!h-20 !w-20 !rounded-2xl" />
        <p className={`mt-5 ${WF_TYPE.title}`} style={{ color: WF.text }}>
          App name
        </p>
        <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textMuted }}>
          Tagline placeholder
        </p>
        <div className="mt-8 h-1 w-16 rounded-full" style={{ background: WF.border }} />
        <p className={`mt-3 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          Loading…
        </p>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfDiscover() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-10">
        <WfHeadline
          className="!px-0"
          title="Discover the app"
          subtitle="Value proposition and key benefits before sign-in."
        />
        <div className="mt-4 space-y-2">
          {["Benefit one", "Benefit two", "Benefit three"].map((b) => (
            <div
              key={b}
              className="rounded-lg border px-3 py-2"
              style={{ borderColor: WF.border, background: WF.surface }}
            >
              <p className={WF_TYPE.bodySm} style={{ color: WF.textSecondary }}>
                {b}
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

export function WfGetStarted({ variant = "default", prototypeActions = {} }) {
  const publicLanding = variant === "public";
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-14">
        <WfPlaceholder size="logo" />
        <WfHeadline
          className="!px-0 mt-8"
          title={publicLanding ? "Experience Sonocea" : "Welcome to Sonocea"}
          subtitle={
            publicLanding
              ? "Try a sample session — no account required."
              : "Experience structured sound — or sign in with your invitation."
          }
        />
        {publicLanding ? (
          <div className="mt-5 space-y-2">
            {["5-minute nervous system reset", "Science-backed sound", "No sign-up to start"].map((t) => (
              <div
                key={t}
                className="rounded-lg border px-3 py-2"
                style={{ borderColor: WF.border, background: WF.surface }}
              >
                <p className={WF_TYPE.bodySm} style={{ color: WF.textSecondary }}>
                  {t}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onDiscover}>
          {publicLanding ? "Start sample session" : "Discover Sonocea"}
        </WfButton>
        <WfButton variant="secondary" onClick={prototypeActions.onInvitation}>
          {publicLanding ? "Request access" : "Accept invitation"}
        </WfButton>
        {!publicLanding ? <WfTextLink onClick={prototypeActions.onLogin}>Login</WfTextLink> : null}
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfInvitation({ prototypeActions = {} }) {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Invited participant</WfTag>
        <WfHeadline
          className="!px-0 mt-4"
          title="You're invited"
          subtitle="Your organisation has provisioned access. Activate your account to begin."
        />
        <div
          className="mt-5 rounded-xl border p-4"
          style={{ borderColor: WF.border, background: WF.surfaceMuted }}
        >
          <p className={WF_TYPE.body} style={{ color: WF.textSecondary }}>
            Brief intro before sign-up — may preview public content.
          </p>
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onActivate}>Activate account</WfButton>
        <WfButton variant="secondary" onClick={prototypeActions.onLearnMore}>
          Learn more first
        </WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

/* ——— Auth ——— */

export function WfAccessCode({ variant = "empty", prototypeActions = {} }) {
  const states = {
    empty: { value: "", state: "default", message: null, title: "Access code", subtitle: "Enter the invite or partner code you received." },
    valid: { value: "INV-7K2M-9P4X", state: "valid", message: "Code recognised — continue to redeem.", title: "Access code", subtitle: "Enter the invite or partner code you received." },
    invalid: { value: "INV-XXXX-XXXX", state: "invalid", message: "This code isn't valid. Check and try again.", title: "Access code", subtitle: "Enter the invite or partner code you received." },
    create: { value: "", state: "default", message: null, title: "Create account", subtitle: "Set up your listener profile with the invitation you received." },
  };
  const cfg = states[variant] ?? states.empty;
  const isCreate = variant === "create";

  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>{isCreate ? "Sign up" : "Authentication"}</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title={cfg.title}
          subtitle={cfg.subtitle}
        />
        <div className="mt-5 space-y-3">
          {isCreate ? (
            <>
              <WfField label="Full name" placeholder="Your name" />
              <WfField label="Email" placeholder="you@email.com" />
              <WfField label="Password" placeholder="Create a password" />
            </>
          ) : (
            <WfField placeholder="e.g. INV-XXXX-XXXX" value={cfg.value} state={cfg.state} />
          )}
          {cfg.message ? <WfMessage type={cfg.state}>{cfg.message}</WfMessage> : null}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onRedeem}>{isCreate ? "Create account" : "Redeem access"}</WfButton>
        <WfTextLink onClick={prototypeActions.onHelp}>{isCreate ? "Already have an account?" : "Need help?"}</WfTextLink>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfAuthSuccess() {
  return (
    <WireframeScreen>
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfSuccessMark />
        <p className={`mt-5 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
          Account activated
        </p>
        <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textMuted }}>
          Your access is confirmed. Continue to onboarding.
        </p>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

/* ——— Public visitor ——— */

export function WfCheckIn({ variant = "before", prototypeActions = {} }) {
  const after = variant === "after";
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-12">
        <WfProgress total={after ? 5 : 4} current={after ? 4 : 0} />
        <WfHeadline
          className="!px-0"
          title={after ? "How did that feel?" : "How is your nervous system today?"}
          subtitle={after ? "Remeasure after your session." : "A quick check-in before you listen."}
        />
        <div className="mt-6 space-y-4">
          <WfSlider label="Stress level" value={after ? 28 : 72} />
          <WfSlider label="Energy level" value={after ? 55 : 40} />
          <WfSlider label="Focus" value={after ? 62 : 35} />
          <WfSlider label="Restfulness" value={after ? 70 : 25} />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onContinue}>
          {after ? "Continue" : "Continue to listening"}
        </WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfHeadphones({ prototypeActions = {} }) {
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfPlaceholder size="icon" />
        <WfHeadline
          className="!px-0 mt-6 text-center [&_h2]:text-center [&_p]:text-center"
          title="Put on your headphones"
          subtitle="Find a quiet place, free of distractions, for a 5-minute nervous system reset."
        />
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onBegin}>Begin 5-minute reset</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfPublicListening({ prototypeActions = {} }) {
  const palette = getWireframePalette("dark");

  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Sample session</WfTag>
        <p className={`px-5 ${WF_TYPE.caption}`} style={{ color: palette.placeholder }}>
          Curated sample
        </p>
        <p className={`mt-1 px-5 ${WF_TYPE.titleSm}`} style={{ color: palette.text }}>
          Session title
        </p>
        <div className="flex flex-1 flex-col items-center justify-center px-5">
          <WfPlaceholder size="icon" />
          <p className={`mt-4 ${WF_TYPE.mono}`} style={{ color: palette.text }}>
            3:42
          </p>
          <p className={`mt-1 ${WF_TYPE.bodySm}`} style={{ color: palette.placeholder }}>
            5 min · sample content
          </p>
        </div>
      </WfScreenBody>
      <div className="flex justify-center gap-6 px-5 pb-6">
        <WfIcon shape="control" />
        <WfIcon
          shape="controlLg"
          style={{ background: palette.fill, borderColor: palette.fill }}
          onClick={prototypeActions.onComplete}
        />
        <WfIcon shape="control" />
      </div>
    </WireframeScreen>
  );
}

export function WfExperienced({ prototypeActions = {} }) {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Reflection</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title="What you experienced"
          subtitle="Explain the physiological and experiential effects of the session."
        />
        <div className="mt-5">
          <WfSkeletonLines lines={6} />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onContinue}>Continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfScienceHome({ prototypeActions = {} }) {
  const topics = ["Topic one", "Topic two", "Topic three", "Topic four"];
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Science</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title="How it works"
          subtitle="What you experienced — and the science behind structured sound."
        />
        <div className="mt-4 space-y-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={prototypeActions.onTopic}
              className="flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors hover:bg-black/[0.03]"
              style={{ borderColor: WF.border, background: WF.surface }}
            >
              <span className={WF_TYPE.body} style={{ color: WF.text }}>
                {t}
              </span>
              <WfIcon shape="chevron" />
            </button>
          ))}
        </div>
      </WfScreenBody>
      {prototypeActions.onRequestAccess ? (
        <WfScreenFooter>
          <WfButton onClick={prototypeActions.onRequestAccess}>Request access</WfButton>
        </WfScreenFooter>
      ) : null}
      <WfTabBar active="discover" />
    </WireframeScreen>
  );
}

export function WfTopicDetail({ prototypeActions = {} }) {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Education</WfTag>
        <p className={`${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          Science
        </p>
        <WfHeadline className="!px-0 mt-1" title="Topic headline" />
        <div className="mt-4">
          <WfSkeletonLines />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton variant="secondary" onClick={prototypeActions.onBack}>
          Back to science
        </WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfRequestAccess({ prototypeActions = {} }) {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Access request</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title="Stay in the loop"
          subtitle="Request access for yourself or your organisation."
        />
        <div className="mt-4 space-y-3">
          <WfField label="Name" placeholder="Your name" />
          <WfField label="Email" placeholder="you@email.com" />
          <WfField label="Organisation (optional)" placeholder="Hospital, clinic, team…" />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onSubmit}>Submit request</WfButton>
        <WfButton variant="secondary" onClick={prototypeActions.onMailingList}>
          Join mailing list only
        </WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfRequestSubmitted() {
  return (
    <WireframeScreen>
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfSuccessMark />
        <p className={`mt-5 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
          Request received
        </p>
        <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textMuted }}>
          We'll be in touch about access. You can continue exploring public content.
        </p>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Back to science</WfButton>
        <WfButton variant="secondary">Return home</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfReturningHome() {
  const cards = ["Daily reset", "Science", "Research", "Applications", "Our story"];
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Public home</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Welcome back" subtitle="How are you feeling today?" />
        <div className="mt-4 grid grid-cols-2 gap-2">
          {cards.map((c, i) => (
            <div
              key={c}
              className={`rounded-xl border p-3 ${i === 0 ? "col-span-2" : ""}`}
              style={{
                borderColor: WF.border,
                background: i === 0 ? WF.surfaceMuted : WF.surface,
              }}
            >
              <p className={WF_TYPE.bodySm} style={{ color: WF.text }}>
                {c}
              </p>
              {i === 0 ? (
                <p className={`mt-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
                  Replay sample session
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </WfScreenBody>
      <WfTabBar active="home" />
    </WireframeScreen>
  );
}

/* ——— Onboarding ——— */

export function WfOnboarding({ step = 0, variant, prototypeActions = {} }) {
  if (variant === "intro") {
    return (
      <WireframeScreen>
        <WfScreenBody className="px-5 pt-6">
          <WfTag>Introduction</WfTag>
          <WfProgress total={3} current={0} />
          <WfHeadline
            className="!px-0 mt-4"
            title="What is Sonocea?"
            subtitle="Structured sound sessions designed for clinical and wellbeing contexts."
          />
          <div className="mt-4 space-y-2">
            {["Evidence-informed listening programmes", "Assigned by your provider", "Private, headphone-first experience"].map((t) => (
              <div
                key={t}
                className="rounded-lg border px-3 py-2"
                style={{ borderColor: WF.border, background: WF.surface }}
              >
                <p className={WF_TYPE.bodySm} style={{ color: WF.textSecondary }}>
                  {t}
                </p>
              </div>
            ))}
          </div>
        </WfScreenBody>
        <WfScreenFooter>
          <WfButton onClick={prototypeActions.onContinue}>Continue</WfButton>
        </WfScreenFooter>
      </WireframeScreen>
    );
  }

  const steps = [
    { title: "Welcome", subtitle: "Personalised greeting after authentication." },
    { title: "How it works", subtitle: "Explain the listening programme model." },
    { title: "Permissions", subtitle: "Request notification and audio permissions." },
  ];
  const cfg = steps[step] ?? steps[0];

  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Onboarding</WfTag>
        <WfProgress total={3} current={step} />
        <WfHeadline className="!px-0 mt-4" title={cfg.title} subtitle={cfg.subtitle} />
        {step === 1 ? (
          <div className="mt-4 space-y-2">
            {["Browse assigned sessions", "Play with headphones", "Reflect when prompted"].map((t) => (
              <div
                key={t}
                className="rounded-lg border px-3 py-2"
                style={{ borderColor: WF.border, background: WF.surface }}
              >
                <p className={WF_TYPE.bodySm} style={{ color: WF.textSecondary }}>
                  {t}
                </p>
              </div>
            ))}
          </div>
        ) : null}
        {step === 2 ? (
          <div className="mt-4 space-y-2">
            {["Notifications", "Background audio", "Health data (optional)"].map((t) => (
              <div
                key={t}
                className="flex items-center justify-between rounded-lg border px-3 py-2.5"
                style={{ borderColor: WF.border }}
              >
                <span className={WF_TYPE.body} style={{ color: WF.text }}>
                  {t}
                </span>
                <div className="h-5 w-9 rounded-full" style={{ background: WF.border }} />
              </div>
            ))}
          </div>
        ) : null}
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onContinue}>
          {step === 2 ? "Get started" : "Continue"}
        </WfButton>
        {step > 0 ? <WfTextLink onClick={prototypeActions.onBack}>Back</WfTextLink> : null}
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfGuidance() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Guidance</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title="Listening guidance"
          subtitle="Set expectations for when and how to listen."
        />
        <div className="mt-4 space-y-2">
          {["Use headphones", "One session at a time", "12–20 min typical"].map((t) => (
            <div
              key={t}
              className="rounded-lg border px-3 py-2"
              style={{ borderColor: WF.border, background: WF.surface }}
            >
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

export function WfNeurotype({ variant = "question", prototypeActions = {} }) {
  if (variant === "complete") {
    return (
      <WireframeScreen>
        <WfScreenBody className="items-center justify-center px-8 text-center">
          <WfSuccessMark />
          <p className={`mt-4 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
            Profile captured
          </p>
          <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textMuted }}>
            We'll use this to tailor session recommendations.
          </p>
        </WfScreenBody>
        <WfScreenFooter>
          <WfButton onClick={prototypeActions.onContinue}>Continue</WfButton>
        </WfScreenFooter>
      </WireframeScreen>
    );
  }

  const options = [
    { title: "Option A", sub: "Supporting description" },
    { title: "Option B", sub: "Supporting description" },
    { title: "Option C", sub: "Supporting description", selected: true },
  ];

  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Personalisation</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title="Your listening profile"
          subtitle="Pick the description that best fits for recommendations."
        />
        <div className="mt-4 space-y-2.5">
          {options.map((o) => (
            <WfCardRow key={o.title} title={o.title} subtitle={o.sub} selected={o.selected} />
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onContinue}>Continue</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfProfile({ prototypeActions = {} }) {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Profile</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Recommended profile" subtitle="Based on your responses." />
        <div
          className="mt-4 rounded-xl border p-4"
          style={{ borderColor: WF.border, background: WF.surfaceMuted }}
        >
          <p className={WF_TYPE.label} style={{ color: WF.text }}>
            Profile type
          </p>
          <p className={`mt-1 ${WF_TYPE.body}`} style={{ color: WF.textSecondary }}>
            Summary of listening preferences and recommendations.
          </p>
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onContinue}>Continue to library</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfOnboardingComplete() {
  return (
    <WireframeScreen>
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfSuccessMark />
        <p className={`mt-5 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
          You're all set
        </p>
        <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textMuted }}>
          Onboarding complete. Head to your library to begin listening.
        </p>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Go to library</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

/* ——— Core listening ——— */

export function WfLibrary({ variant = "home", prototypeActions = {} }) {
  if (variant === "empty" || variant === "no-assigned") {
    const isAssigned = variant === "no-assigned";
    return (
      <WireframeScreen>
        <WfEmptyState
          title={isAssigned ? "No sessions assigned" : "No sessions yet"}
          message={
            isAssigned
              ? "Your provider hasn't assigned any sessions yet. Check back later or contact them."
              : "Your provider hasn't assigned sessions. Contact your administrator."
          }
        />
        <WfScreenFooter>
          <WfButton variant="secondary">Contact support</WfButton>
        </WfScreenFooter>
        <WfTabBar active="home" />
      </WireframeScreen>
    );
  }

  if (variant === "categories") {
    const categories = ["Calm", "Focus", "Reset", "Sleep", "Recovery", "Bonding"];
    return (
      <WireframeScreen>
        <WfScreenHeader />
        <div className="px-5 pt-2">
          <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
            Categories
          </h2>
          <p className={`mt-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
            Browse by use case
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <div
                key={c}
                className="rounded-xl border p-3"
                style={{ borderColor: WF.border, background: WF.surface }}
              >
                <WfPlaceholder size="sm" className="!h-10 !w-full" />
                <p className={`mt-2 ${WF_TYPE.bodySm}`} style={{ color: WF.text }}>
                  {c}
                </p>
              </div>
            ))}
          </div>
        </div>
        <WfTabBar active="discover" />
      </WireframeScreen>
    );
  }

  if (variant === "search") {
    return (
      <WireframeScreen>
        <WfScreenHeader />
        <div className="px-5 pt-2">
          <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
            Search
          </h2>
          <div
            className="mt-3 rounded-xl border-2 px-3 py-2.5"
            style={{ borderColor: WF.borderStrong, color: WF.text }}
          >
            <span className={WF_TYPE.body}>Calm|</span>
          </div>
          <p className={`mt-3 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
            Recent searches
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <WfChip>Reset</WfChip>
            <WfChip>14 min</WfChip>
            <WfChip>Focus</WfChip>
          </div>
        </div>
        <WfTabBar active="discover" />
      </WireframeScreen>
    );
  }

  if (variant === "search-results") {
    return (
      <WireframeScreen>
        <WfScreenHeader />
        <div className="px-5 pt-2">
          <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
            Results for "Calm"
          </h2>
          <p className={`mt-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
            4 sessions found
          </p>
        </div>
        <div className="mt-2 flex-1 overflow-hidden">
          <WfListRow title="Evening calm" meta="14 min · Assigned" />
          <WfListRow title="Deep reset" meta="20 min · Assigned" />
          <WfListRow title="Gentle arrival" meta="12 min · Assigned" />
          <WfListRow title="Wind down" meta="15 min · Assigned" />
        </div>
        <WfTabBar active="discover" />
      </WireframeScreen>
    );
  }

  if (variant === "filters") {
    return (
      <WireframeScreen>
        <WfScreenHeader />
        <div className="px-5 pt-2">
          <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
            Filters
          </h2>
          <p className={`mt-4 ${WF_TYPE.bodySm} font-medium`} style={{ color: WF.textSecondary }}>
            Duration
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <WfChip active>All</WfChip>
            <WfChip>12–15 min</WfChip>
            <WfChip>20+ min</WfChip>
          </div>
          <p className={`mt-4 ${WF_TYPE.bodySm} font-medium`} style={{ color: WF.textSecondary }}>
            Use case
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <WfChip>Calm</WfChip>
            <WfChip active>Focus</WfChip>
            <WfChip>Reset</WfChip>
          </div>
          <p className={`mt-4 ${WF_TYPE.bodySm} font-medium`} style={{ color: WF.textSecondary }}>
            Benefits
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <WfChip>Stress</WfChip>
            <WfChip>Sleep</WfChip>
          </div>
        </div>
        <WfScreenFooter>
          <WfButton>Apply filters</WfButton>
          <WfButton variant="secondary">Clear all</WfButton>
        </WfScreenFooter>
        <WfTabBar active="discover" />
      </WireframeScreen>
    );
  }

  return (
    <WireframeScreen>
      <WfScreenHeader />
      <div className="px-5 pt-2">
        <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
          {variant === "browse" ? "Sessions" : "Today"}
        </h2>
        {variant === "browse" ? (
          <>
            <div
              className="mt-3 rounded-xl border px-3 py-2"
              style={{ borderColor: WF.border, color: WF.placeholder }}
            >
              <span className={WF_TYPE.body}>Search sessions…</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <WfChip active>All</WfChip>
              <WfChip>Duration</WfChip>
              <WfChip>Use case</WfChip>
            </div>
          </>
        ) : (
          <div
            className="mt-4 rounded-xl border p-4"
            style={{ borderColor: WF.border, background: WF.surfaceMuted }}
          >
            <p className={`${WF_TYPE.bodySm} uppercase tracking-wider`} style={{ color: WF.textMuted }}>
              Continue
            </p>
            <p className={`mt-2 ${WF_TYPE.label}`} style={{ color: WF.text }}>
              Session title
            </p>
            <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
              14 min · Category
            </p>
            <div className="mt-3">
              <WfButton>Resume</WfButton>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 flex-1 overflow-hidden">
        <WfListRow title="Track title" meta="Artist" onClick={prototypeActions.onSelectSession} />
        <WfListRow title="Track title" meta="Artist" onClick={prototypeActions.onSelectSession} />
        <WfListRow title="Track title" meta="Artist" onClick={prototypeActions.onSelectSession} />
        <WfListRow title="Track title" meta="Artist" onClick={prototypeActions.onSelectSession} />
        <WfListRow title="Track title" meta="Artist" onClick={prototypeActions.onSelectSession} />
      </div>
      <WfTabBar active={variant === "browse" ? "discover" : "home"} />
    </WireframeScreen>
  );
}

export function WfFavorites() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Saved</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Saved sessions" />
      </WfScreenBody>
      <div className="flex-1">
        <WfListRow title="Bookmarked session" meta="12 min · Favourite" />
        <WfListRow title="Bookmarked session" meta="20 min" />
      </div>
      <WfTabBar active="profile" />
    </WireframeScreen>
  );
}

export function WfSessionDetail({ variant = "detail", prototypeActions = {} }) {
  if (variant === "overview") {
    return (
      <WireframeScreen>
        <WfScreenBody className="px-5 pt-6">
          <WfTag>Session overview</WfTag>
          <WfHeadline className="!px-0 mt-2" title="Session title" subtitle="Quick summary before full detail." />
          <div
            className="mt-4 rounded-xl border p-4"
            style={{ borderColor: WF.border, background: WF.surfaceMuted }}
          >
            <div className="flex gap-3">
              <WfPlaceholder size="sm" className="!h-16 !w-16 shrink-0" />
              <div>
                <p className={WF_TYPE.label} style={{ color: WF.text }}>
                  14 min · Category
                </p>
                <p className={`mt-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textSecondary }}>
                  Brief purpose and audience fit at a glance.
                </p>
              </div>
            </div>
          </div>
        </WfScreenBody>
        <WfScreenFooter>
          <WfButton>View full detail</WfButton>
        </WfScreenFooter>
      </WireframeScreen>
    );
  }

  const downloaded = variant === "downloaded";
  const available = variant === "available";

  return (
    <WireframeScreen>
      <WfPlaceholder size="md" className="!h-28 !rounded-none border-x-0 border-t-0" />
      <WfScreenBody className="px-5 pt-3">
        <WfTag>Session detail</WfTag>
        <WfHeadline className="!px-0" title="Session title" />
        <div className="mt-2 flex flex-wrap gap-1.5">
          <WfChip>14 min</WfChip>
          <WfChip>Category</WfChip>
          <WfChip>Your profile</WfChip>
          {downloaded ? <WfChip active>Downloaded</WfChip> : null}
          {available ? <WfChip active>Ready to play</WfChip> : null}
        </div>
        <p className={`mt-3 ${WF_TYPE.body}`} style={{ color: WF.textSecondary }}>
          Purpose, audience fit, and benefits — clinical-friendly description placeholder.
        </p>
        {downloaded ? (
          <p className={`mt-2 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
            Available offline · 48 MB on device
          </p>
        ) : null}
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onPlay}>{downloaded ? "Play offline" : "Play"}</WfButton>
        {!downloaded ? (
          <WfButton variant="secondary">{available ? "Remove download" : "Download for offline"}</WfButton>
        ) : (
          <WfButton variant="secondary">Remove download</WfButton>
        )}
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfPlayer({ variant = "playing", prototypeActions = {} }) {
  const palette = getWireframePalette("dark");
  const configs = {
    idle: { status: "Ready", progress: 0, time: "00:00", remaining: "14:00", paused: false, cta: "Begin session" },
    playing: { status: "Streaming", progress: 38, time: "05:18", remaining: "−08:42", paused: false, cta: null },
    paused: { status: "Paused", progress: 38, time: "05:18", remaining: "−08:42", paused: true, cta: "Resume" },
    completed: { status: "Complete", progress: 100, time: "14:00", remaining: "Done", paused: false, cta: "Continue" },
    background: { status: "Background", progress: 52, time: "07:20", remaining: "−06:40", paused: false, cta: null },
    interrupted: { status: "Paused", progress: 38, time: "05:18", remaining: "−08:42", paused: true, cta: "Resume" },
  };
  const cfg = configs[variant] ?? configs.playing;
  const isBackground = variant === "background";

  if (isBackground) {
    return (
      <WireframeScreen tone="dark">
        <WfScreenBody className="px-5 pt-6">
          <WfTag>Background playback</WfTag>
          <WfHeadline
            className="!px-0 mt-2"
            title="Session continues"
            subtitle="Playback persists when you leave the app or lock your device."
          />
          <div
            className="mt-4 rounded-xl border p-4"
            style={{ borderColor: palette.border, background: palette.surface }}
          >
            <p className={WF_TYPE.bodySm} style={{ color: palette.placeholder }}>
              Now playing
            </p>
            <p className={`mt-1 ${WF_TYPE.label}`} style={{ color: palette.text }}>
              Session title
            </p>
            <div className="mt-3 h-1 overflow-hidden rounded-full" style={{ background: palette.border }}>
              <div className="h-full rounded-full" style={{ width: `${cfg.progress}%`, background: palette.fill }} />
            </div>
            <div className="mt-3 flex justify-center gap-6">
              <WfIcon shape="control" />
              <WfIcon shape="controlLg" style={{ background: palette.fill, borderColor: palette.fill }} />
              <WfIcon shape="control" />
            </div>
          </div>
          <p className={`mt-4 ${WF_TYPE.bodySm}`} style={{ color: palette.placeholder }}>
            Lock screen / notification controls shown
          </p>
        </WfScreenBody>
      </WireframeScreen>
    );
  }

  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-4 pt-4">
        <WfTag>Player</WfTag>
        <div
          className="mx-1 flex flex-1 flex-col rounded-2xl border p-4"
          style={{ borderColor: palette.border, background: palette.surface }}
        >
          <div className={`flex justify-between ${WF_TYPE.caption}`} style={{ color: palette.placeholder }}>
            <span>{variant === "idle" ? "Session ready" : "Now playing"}</span>
            <span>{cfg.status}</span>
          </div>
          <p className={`mt-2 ${WF_TYPE.titleSm}`} style={{ color: palette.text }}>
            Session title
          </p>
          <p className={WF_TYPE.bodySm} style={{ color: palette.placeholder }}>
            14:00 · Category
          </p>
          <div className="my-4 flex flex-1 items-center justify-center">
            <WfPlaceholder size="md" className="!h-24" />
          </div>
          {variant !== "idle" ? (
            <>
              <div className="h-1 overflow-hidden rounded-full" style={{ background: palette.border }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${cfg.progress}%`, background: palette.fill }}
                />
              </div>
              <div className={`mt-1.5 flex justify-between ${WF_TYPE.bodySm}`} style={{ color: palette.placeholder }}>
                <span>{cfg.time}</span>
                <span>{cfg.remaining}</span>
              </div>
            </>
          ) : (
            <p className={`text-center ${WF_TYPE.bodySm}`} style={{ color: palette.placeholder }}>
              Tap play when you're ready with headphones on.
            </p>
          )}
          <div className="mt-4 flex items-center justify-center gap-8 pb-1">
            {variant === "idle" ? (
              <WfIcon
                shape="controlLg"
                style={{ background: palette.fill, borderColor: palette.fill }}
                onClick={prototypeActions.onBegin}
              />
            ) : (
              <>
                <WfIcon shape="control" />
                <WfIcon
                  shape="controlLg"
                  style={{ background: palette.fill, borderColor: palette.fill }}
                  onClick={prototypeActions.onComplete}
                />
                <WfIcon shape="control" />
              </>
            )}
          </div>
        </div>
      </WfScreenBody>
      {cfg.cta ? (
        <WfScreenFooter>
          <WfButton onClick={prototypeActions.onComplete}>{cfg.cta}</WfButton>
        </WfScreenFooter>
      ) : null}
    </WireframeScreen>
  );
}

export function WfCompletion() {
  return (
    <WireframeScreen>
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfSuccessMark />
        <p className={`mt-5 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
          Session complete
        </p>
        <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textMuted }}>
          Well done. Share how it felt before returning to your library.
        </p>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Leave feedback</WfButton>
        <WfButton variant="secondary">Skip</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfCompletionReflection() {
  return (
    <WireframeScreen tone="dark">
      <WfScreenBody className="px-5 pt-12">
        <WfProgress total={5} current={4} />
        <WfHeadline
          className="!px-0"
          title="How do you feel now?"
          subtitle="Post-session reflection — compare to your check-in."
        />
        <div className="mt-6 space-y-4">
          <WfSlider label="Stress level" value={32} />
          <WfSlider label="Energy level" value={58} />
          <WfSlider label="Focus" value={65} />
          <WfSlider label="Restfulness" value={72} />
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Continue</WfButton>
        <WfTextLink>Skip reflection</WfTextLink>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfFeedback({ variant = "form", prototypeActions = {} }) {
  if (variant === "submitted") {
    return (
      <WireframeScreen>
        <WfScreenBody className="items-center justify-center px-8 text-center">
          <WfSuccessMark />
          <p className={`mt-5 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
            Thank you
          </p>
          <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textMuted }}>
            Your feedback helps improve session recommendations.
          </p>
        </WfScreenBody>
        <WfScreenFooter>
          <WfButton onClick={prototypeActions.onDone}>Back to library</WfButton>
        </WfScreenFooter>
      </WireframeScreen>
    );
  }

  if (variant === "rating") {
    return (
      <WireframeScreen>
        <WfScreenBody className="px-5 pt-6">
          <WfTag>Rating</WfTag>
          <WfHeadline
            className="!px-0 mt-2"
            title="Rate this session"
            subtitle="How effective was this session for you?"
          />
          <div className="mt-6">
            <WfRatingRow />
          </div>
        </WfScreenBody>
        <WfScreenFooter>
          <WfButton onClick={prototypeActions.onContinue}>Continue</WfButton>
          <WfTextLink onClick={prototypeActions.onSkip}>Skip</WfTextLink>
        </WfScreenFooter>
      </WireframeScreen>
    );
  }

  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Feedback</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title="How was this session?"
          subtitle="Post-completion · optional comment"
        />
        <div className="mt-4">
          <WfRatingRow />
        </div>
        <p className={`mt-5 ${WF_TYPE.bodySm} font-medium`} style={{ color: WF.textSecondary }}>
          Optional note
        </p>
        <div
          className="mt-1.5 min-h-[72px] rounded-xl border px-3 py-2"
          style={{ borderColor: WF.border, color: WF.placeholder }}
        >
          <span className={WF_TYPE.body}>Share a sentence (optional)</span>
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onContinue}>Submit feedback</WfButton>
        <WfTextLink onClick={prototypeActions.onSkip}>Skip</WfTextLink>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

/* ——— Supporting ——— */

export function WfAbout({ variant = "default" }) {
  if (variant === "privacy") {
    const rows = ["Privacy policy", "Terms of use", "Cookie preferences", "Data processing", "Open-source notices"];
    return (
      <WireframeScreen>
        <WfScreenBody className="px-5 pt-6">
          <WfTag>Legal</WfTag>
          <WfHeadline className="!px-0 mt-2" title="Privacy & policies" subtitle="How we handle your data." />
          <div className="mt-4">
            {rows.map((r) => (
              <WfRowLink key={r} title={r} />
            ))}
          </div>
        </WfScreenBody>
      </WireframeScreen>
    );
  }

  const rows = ["Privacy policy", "Terms of use", "Open-source notices"];
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <div className="flex items-center justify-between">
          <WfTag>About</WfTag>
          <span className={WF_TYPE.label} style={{ color: WF.textSecondary }}>
            Done
          </span>
        </div>
        <WfPlaceholder size="sm" className="mt-3" />
        <WfHeadline className="!px-0 mt-4" title="About" subtitle="Company and product information." />
        <div className="mt-4">
          {rows.map((r) => (
            <WfRowLink key={r} title={r} />
          ))}
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

export function WfSettings() {
  const rows = ["Account", "Notifications", "Audio quality", "Sign out"];
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Settings</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Settings" />
        <div className="mt-4">
          {rows.map((r) => (
            <WfRowLink key={r} title={r} />
          ))}
        </div>
      </WfScreenBody>
      <WfTabBar active="profile" />
    </WireframeScreen>
  );
}

export function WfSupport({ variant = "default" }) {
  if (variant === "contact") {
    return (
      <WireframeScreen>
        <WfScreenBody className="px-5 pt-6">
          <WfTag>Contact</WfTag>
          <WfHeadline
            className="!px-0 mt-2"
            title="Contact support"
            subtitle="Describe your issue and we'll respond by email."
          />
          <div className="mt-4 space-y-3">
            <WfField label="Subject" placeholder="e.g. Playback issue" />
            <div
              className="min-h-[88px] rounded-xl border px-3 py-2"
              style={{ borderColor: WF.border, color: WF.placeholder }}
            >
              <span className={WF_TYPE.body}>Describe what happened…</span>
            </div>
            <WfField label="Email" placeholder="you@email.com" />
          </div>
        </WfScreenBody>
        <WfScreenFooter>
          <WfButton>Send message</WfButton>
          <WfButton variant="secondary">View FAQ</WfButton>
        </WfScreenFooter>
      </WireframeScreen>
    );
  }

  const rows = [
    { title: "Email support", sub: "support@…" },
    { title: "FAQ", sub: "Playback, invites, offline" },
    { title: "Data & privacy", sub: "Export / delete pathways" },
  ];
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Support</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title="Help"
          subtitle="Account access, playback, downloads, and privacy requests."
        />
        <div className="mt-4">
          {rows.map((r) => (
            <WfRowLink key={r.title} title={r.title} subtitle={r.sub} />
          ))}
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton variant="secondary">Contact administrator</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfResearch() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Research</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Research" subtitle="Clinical research and publications." />
        <div className="mt-4 space-y-2">
          {["Publication one", "Publication two", "Publication three"].map((p) => (
            <div
              key={p}
              className="flex items-center justify-between rounded-xl border px-3 py-2.5"
              style={{ borderColor: WF.border, background: WF.surface }}
            >
              <span className={WF_TYPE.body} style={{ color: WF.text }}>
                {p}
              </span>
              <WfIcon shape="chevron" />
            </div>
          ))}
        </div>
      </WfScreenBody>
    </WireframeScreen>
  );
}

/* ——— Error states ——— */

export function WfError({ variant = "network" }) {
  const configs = {
    network: {
      title: "No connection",
      message: "Check your network and try again.",
      cta: "Retry",
    },
    session: {
      title: "Something went wrong",
      message: "This session couldn't load. Try again or contact support.",
      cta: "Try again",
    },
    "invalid-invitation": {
      title: "Invalid invitation",
      message: "This invite code isn't recognised. Check with your provider.",
      cta: "Enter new code",
    },
    "expired-invitation": {
      title: "Invitation expired",
      message: "This invite has expired. Request a new one from your administrator.",
      cta: "Request new invite",
    },
    "access-revoked": {
      title: "Access revoked",
      message: "Your access has been removed. Contact your organisation for help.",
      cta: "Contact support",
    },
    server: {
      title: "Server error",
      message: "Something went wrong on our end. Please try again shortly.",
      cta: "Try again",
    },
    maintenance: {
      title: "Under maintenance",
      message: "Sonocea is temporarily unavailable while we perform updates.",
      cta: "Check status",
    },
  };
  const cfg = configs[variant] ?? configs.network;

  return (
    <WireframeScreen>
      <WfEmptyState title={cfg.title} message={cfg.message} />
      <WfScreenFooter>
        <WfButton>{cfg.cta}</WfButton>
        <WfButton variant="secondary">Contact support</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

/* ——— System states ——— */

export function WfSystemLoading() {
  return (
    <WireframeScreen>
      <WfScreenHeader />
      <div className="px-5 pt-2">
        <div className="h-6 w-24 rounded" style={{ background: WF.border }} />
        <div className="mt-4 h-20 rounded-xl" style={{ background: WF.surfaceMuted }} />
      </div>
      <div className="mt-4 flex-1 px-5">
        <WfSkeletonLines lines={4} />
        <div className="mt-4 space-y-2">
          <div className="h-12 rounded-lg" style={{ background: WF.surfaceMuted }} />
          <div className="h-12 rounded-lg" style={{ background: WF.surfaceMuted }} />
          <div className="h-12 rounded-lg" style={{ background: WF.surfaceMuted }} />
        </div>
      </div>
      <div className="px-5 pb-6 text-center">
        <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
          Loading your sessions…
        </p>
      </div>
      <WfTabBar active="home" />
    </WireframeScreen>
  );
}

/* ——— Partner / admin (desktop web wireframes) ——— */

export function WfPartnerLogin() {
  return (
    <DesktopWireframeShell product="Partner Console" layout="auth">
      <WfPlaceholder size="logo" className="!h-8" />
      <div className="mt-4">
        <WfDesktopHeadline title="Partner sign in" subtitle="Organisation console access." />
      </div>
      <div className="mt-4 space-y-2">
        <WfDesktopField label="Email" placeholder="you@organisation.com" />
        <WfDesktopField label="Password" placeholder="••••••••" />
      </div>
      <WfDesktopActions>
        <WfDesktopButton>Sign in</WfDesktopButton>
      </WfDesktopActions>
    </DesktopWireframeShell>
  );
}

export function WfPartnerDashboard({ variant = "default" }) {
  if (variant === "org-settings") {
    return (
      <DesktopWireframeShell product="Partner Console" nav={PARTNER_NAV} activeNav="Settings">
        <WfDesktopHeadline title="Organisation settings" subtitle="Manage your partner account." />
        <div className="mt-4 space-y-2">
          <WfDesktopField label="Organisation name" placeholder="Clinic A" />
          <WfDesktopField label="Primary contact" placeholder="admin@clinic.com" />
          <WfDesktopField label="Seat allocation" placeholder="50 listeners" />
          <WfDesktopField label="Billing contact" placeholder="finance@clinic.com" />
        </div>
        <WfDesktopActions>
          <WfDesktopButton>Save changes</WfDesktopButton>
        </WfDesktopActions>
      </DesktopWireframeShell>
    );
  }

  return (
    <DesktopWireframeShell product="Partner Console" nav={PARTNER_NAV} activeNav="Dashboard">
      <WfDesktopHeadline title="Dashboard" subtitle="Listener activity and provisioning overview." />
      <div className="mt-4">
        <WfDesktopMetrics
          items={[
            ["Listeners", "48"],
            ["Active", "36"],
            ["Sessions", "124"],
            ["Pending invites", "6"],
          ]}
        />
      </div>
      <p className="mt-4 text-[9px] font-medium uppercase tracking-wide text-ink-400">Recent activity</p>
      <div className="mt-2">
        <WfDesktopTable rows={["Jane D. completed Evening calm", "Alex M. accepted invite", "Sam K. assigned Focus flow"]} showStatus={false} />
      </div>
    </DesktopWireframeShell>
  );
}

export function WfPartnerListenerDetail() {
  return (
    <DesktopWireframeShell product="Partner Console" nav={PARTNER_NAV} activeNav="Listeners">
      <WfDesktopHeadline title="Listener name" subtitle="Provisioned · Active since Jan 2026" />
      <div className="mt-4">
        <WfDesktopMetrics
          items={[
            ["Sessions assigned", "6"],
            ["Completed", "4"],
            ["Last active", "2 days ago"],
            ["Status", "Active"],
          ]}
        />
      </div>
      <p className="mt-4 text-[9px] font-medium uppercase tracking-wide text-ink-400">Assigned sessions</p>
      <div className="mt-2">
        <WfDesktopTable rows={["Evening calm", "Deep reset", "Focus flow"]} />
      </div>
      <WfDesktopActions>
        <WfDesktopButton>Assign sessions</WfDesktopButton>
        <WfDesktopButton secondary>Revoke access</WfDesktopButton>
      </WfDesktopActions>
    </DesktopWireframeShell>
  );
}

export function WfAdminTable({ title = "Management", variant = "default" }) {
  const rowSets = {
    default: ["Row one", "Row two", "Row three"],
    organisations: ["Clinic A · 48 listeners", "Clinic B · 22 listeners", "Clinic C · 15 listeners"],
    assignment: ["Evening calm → Clinic A", "Deep reset → Clinic B", "Focus flow → Clinic A"],
    analytics: ["Completion rate · 78%", "Avg. sessions · 4.2", "Active listeners · 156"],
  };
  const rows = rowSets[variant] ?? rowSets.default;

  const navMap = {
    default: "Sessions",
    organisations: "Organisations",
    assignment: "Sessions",
    analytics: "Analytics",
  };
  const activeNav = navMap[variant] ?? "Dashboard";

  if (title === "Invite listener") {
    return (
      <DesktopWireframeShell product="Partner Console" nav={PARTNER_NAV} activeNav="Invite">
        <WfDesktopHeadline title="Invite listener" subtitle="Provision a new listener to your organisation." />
        <div className="mt-4 space-y-2">
          <WfDesktopField label="Email" placeholder="listener@email.com" />
          <WfDesktopField label="Session bundle" placeholder="Regulation bundle" />
          <WfDesktopField label="Optional message" placeholder="Welcome message" />
        </div>
        <WfDesktopActions>
          <WfDesktopButton>Send invite</WfDesktopButton>
        </WfDesktopActions>
      </DesktopWireframeShell>
    );
  }

  if (title === "Listener roster") {
    return (
      <DesktopWireframeShell product="Partner Console" nav={PARTNER_NAV} activeNav="Listeners">
        <WfDesktopHeadline title="Listener roster" subtitle="Invited, active, and pending listeners." />
        <div className="mt-4">
          <WfDesktopTable rows={["Jane D. · Active · 4.2 hrs", "Alex M. · Invited · pending", "Sam K. · Paused"]} />
        </div>
      </DesktopWireframeShell>
    );
  }

  return (
    <DesktopWireframeShell product="Admin CMS" nav={ADMIN_NAV} activeNav={activeNav}>
      <WfDesktopHeadline title={title} subtitle="Platform management and reporting." />
      {variant === "analytics" || title === "Dashboard" ? (
        <div className="mt-4">
          <WfDesktopMetrics
            items={[
              ["Listeners", "1.2k"],
              ["Completions", "89%"],
              ["Avg. rating", "4.6"],
              ["Active", "156"],
            ]}
          />
        </div>
      ) : null}
      <div className="mt-4">
        <WfDesktopTable rows={rows} />
      </div>
      <WfDesktopActions>
        <WfDesktopButton>Primary action</WfDesktopButton>
      </WfDesktopActions>
    </DesktopWireframeShell>
  );
}
