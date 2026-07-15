import { getWireframePalette, WF, WF_TYPE } from "./tokens.js";
import {
  ABOUT,
  AUTH,
  BRAND,
  CHECK_IN,
  ENTRY,
  EXPERIENCED,
  FEEDBACK,
  GUIDANCE,
  INVITATION,
  NEUROTYPE,
  ONBOARDING,
  PLAYER,
  PUBLIC_NAV,
  PUBLIC_SAMPLE,
  REQUEST_ACCESS,
  RESEARCH,
  SCIENCE_HOME,
  SCIENCE_TOPICS,
  SESSIONS,
  SUPPORT,
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
          {BRAND.name}
        </p>
        <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textMuted }}>
          {BRAND.tagline}
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
          title="Discover Sonocea"
          subtitle="Experience structured sound before organisational access."
        />
        <div className="mt-4 space-y-2">
          {ENTRY.publicHeroBullets.map((b) => (
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
        <WfButton>Start sample session</WfButton>
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
          title={ENTRY.getStartedTitle}
          subtitle={publicLanding ? "Try a curated sample — no account required." : ENTRY.getStartedSubtitle}
        />
        {publicLanding ? (
          <div className="mt-5 space-y-2">
            {ENTRY.publicHeroBullets.map((t) => (
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
          {publicLanding ? ENTRY.publicLandingCta : ENTRY.discoverCta}
        </WfButton>
        <WfButton variant="secondary" onClick={prototypeActions.onInvitation}>
          {publicLanding ? ENTRY.publicSecondaryCta : ENTRY.invitationCta}
        </WfButton>
        {!publicLanding ? (
          <WfTextLink onClick={prototypeActions.onLogin}>{ENTRY.loginCta}</WfTextLink>
        ) : null}
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfInvitation({ prototypeActions = {} }) {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>{INVITATION.tag}</WfTag>
        <WfHeadline
          className="!px-0 mt-4"
          title={INVITATION.title}
          subtitle={INVITATION.subtitle}
        />
        <div
          className="mt-5 rounded-xl border p-4"
          style={{ borderColor: WF.border, background: WF.surfaceMuted }}
        >
          <p className={WF_TYPE.body} style={{ color: WF.textSecondary }}>
            {INVITATION.intro}
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
    empty: {
      value: "",
      state: "default",
      message: null,
      title: AUTH.accessCodeTitle,
      subtitle: AUTH.accessCodeSubtitle,
    },
    valid: {
      value: "INV-7K2M-9P4X",
      state: "valid",
      message: "Code recognised — continue to redeem.",
      title: AUTH.accessCodeTitle,
      subtitle: AUTH.accessCodeSubtitle,
    },
    invalid: {
      value: "INV-XXXX-XXXX",
      state: "invalid",
      message: "This code isn't valid. Check and try again.",
      title: AUTH.accessCodeTitle,
      subtitle: AUTH.accessCodeSubtitle,
    },
    create: {
      value: "",
      state: "default",
      message: null,
      title: AUTH.createAccountTitle,
      subtitle: AUTH.createAccountSubtitle,
    },
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
          title={after ? CHECK_IN.afterTitle : CHECK_IN.beforeTitle}
          subtitle={after ? CHECK_IN.afterSubtitle : CHECK_IN.beforeSubtitle}
        />
        <div className="mt-6 space-y-4">
          <WfSlider label={CHECK_IN.sliders[0]} value={after ? 28 : 72} />
          <WfSlider label={CHECK_IN.sliders[1]} value={after ? 55 : 40} />
          <WfSlider label={CHECK_IN.sliders[2]} value={after ? 62 : 35} />
          <WfSlider label={CHECK_IN.sliders[3]} value={after ? 70 : 25} />
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
          subtitle={PUBLIC_SAMPLE.headphones}
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
        <WfTag>{PUBLIC_SAMPLE.tag}</WfTag>
        <p className={`px-5 ${WF_TYPE.caption}`} style={{ color: palette.placeholder }}>
          {PUBLIC_SAMPLE.subtitle}
        </p>
        <p className={`mt-1 px-5 ${WF_TYPE.titleSm}`} style={{ color: palette.text }}>
          {PUBLIC_SAMPLE.title}
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
          title={EXPERIENCED.title}
          subtitle={EXPERIENCED.subtitle}
        />
        <div
          className="mt-5 rounded-xl border p-4"
          style={{ borderColor: WF.border, background: WF.surfaceMuted }}
        >
          <p className={WF_TYPE.body} style={{ color: WF.textSecondary }}>
            {EXPERIENCED.body}
          </p>
        </div>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={prototypeActions.onContinue}>Explore the science</WfButton>
      </WfScreenFooter>
    </WireframeScreen>
  );
}

export function WfScienceHome({ prototypeActions = {} }) {
  const topics = SCIENCE_TOPICS.slice(0, 4);
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Science</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title={SCIENCE_HOME.title}
          subtitle={SCIENCE_HOME.subtitle}
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
      <WfTabBar active="sessions" />
    </WireframeScreen>
  );
}

export function WfTopicDetail({ prototypeActions = {} }) {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Education</WfTag>
        <p className={`${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          {TOPIC_DETAIL.category}
        </p>
        <WfHeadline className="!px-0 mt-1" title={TOPIC_DETAIL.title} />
        <div className="mt-4">
          <WfSkeletonLines />
        </div>
        <p className={`mt-4 ${WF_TYPE.body}`} style={{ color: WF.textSecondary }}>
          {TOPIC_DETAIL.excerpt}
        </p>
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
          title={REQUEST_ACCESS.title}
          subtitle={REQUEST_ACCESS.subtitle}
        />
        <div className="mt-4 space-y-3">
          <WfField label="Name" placeholder={REQUEST_ACCESS.fields.name} />
          <WfField label="Email" placeholder={REQUEST_ACCESS.fields.email} />
          <WfField label="Organisation" placeholder={REQUEST_ACCESS.fields.organisation} />
          <WfField label="Role" placeholder={REQUEST_ACCESS.fields.role} />
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
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Public home</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title="Welcome back"
          subtitle="How is your nervous system today?"
        />
        <div className="mt-4 grid grid-cols-2 gap-2">
          {PUBLIC_NAV.map((c, i) => (
            <div
              key={c.label}
              className={`rounded-xl border p-3 ${c.featured ? "col-span-2" : ""}`}
              style={{
                borderColor: WF.border,
                background: c.featured ? WF.surfaceMuted : WF.surface,
              }}
            >
              <p className={WF_TYPE.bodySm} style={{ color: WF.text }}>
                {c.label}
              </p>
              {c.detail ? (
                <p className={`mt-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
                  {c.detail}
                </p>
              ) : null}
            </div>
          ))}
        </div>
        <p className={`mt-4 text-center ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          Request Access
        </p>
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
            title={ONBOARDING.introTitle}
            subtitle={ONBOARDING.introSubtitle}
          />
          <div className="mt-4 space-y-2">
            {ONBOARDING.introBullets.map((t) => (
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

  const steps = ONBOARDING.steps;
  const cfg = steps[step] ?? steps[0];

  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Onboarding</WfTag>
        <WfProgress total={3} current={step} />
        <WfHeadline className="!px-0 mt-4" title={cfg.title} subtitle={cfg.subtitle} />
        {step === 1 ? (
          <div className="mt-4 space-y-2">
            {ONBOARDING.howItWorksBullets.map((t) => (
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
            {ONBOARDING.permissions.map((t) => (
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
          title={GUIDANCE.title}
          subtitle={GUIDANCE.subtitle}
        />
        <div className="mt-4 space-y-2">
          {GUIDANCE.items.map((t) => (
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
            {NEUROTYPE.completeSubtitle}
          </p>
        </WfScreenBody>
        <WfScreenFooter>
          <WfButton onClick={prototypeActions.onContinue}>Continue</WfButton>
        </WfScreenFooter>
      </WireframeScreen>
    );
  }

  const options = NEUROTYPE.options.map((o, i) => ({ ...o, selected: i === 1 }));

  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Neurotype questionnaire</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title={NEUROTYPE.title}
          subtitle={NEUROTYPE.subtitle}
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
        <WfHeadline className="!px-0 mt-2" title="Your neurotype profile" subtitle="Based on your questionnaire responses." />
        <div
          className="mt-4 rounded-xl border p-4"
          style={{ borderColor: WF.border, background: WF.surfaceMuted }}
        >
          <p className={WF_TYPE.label} style={{ color: WF.text }}>
            Low-support neurodivergent
          </p>
          <p className={`mt-1 ${WF_TYPE.body}`} style={{ color: WF.textSecondary }}>
            Sessions in your provisioned library are aligned to this neurotype group.
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
    const categories = SESSIONS.categories;
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
        <WfTabBar active="sessions" />
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
        <WfTabBar active="sessions" />
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
          <WfListRow title="Arrive · settle" meta="14 min · Assigned" />
          <WfListRow title="Deep unwind" meta="20 min · Assigned" />
          <WfListRow title="Gentle arrival" meta="12 min · Assigned" />
          <WfListRow title="Wind down" meta="15 min · Assigned" />
        </div>
        <WfTabBar active="sessions" />
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
        <WfTabBar active="sessions" />
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
              {SESSIONS.resume.title}
            </p>
            <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
              {SESSIONS.resume.meta}
            </p>
            <div className="mt-3">
              <WfButton>Resume</WfButton>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 flex-1 overflow-hidden">
        {SESSIONS.library.map((s) => (
          <WfListRow key={s.title} title={s.title} meta={s.meta} onClick={prototypeActions.onSelectSession} />
        ))}
      </div>
      <WfTabBar active="sessions" />
    </WireframeScreen>
  );
}

export function WfFavorites() {
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Saved</WfTag>
        <WfHeadline className="!px-0 mt-2" title="Sonocea Favorites" subtitle="Sessions you've bookmarked for quick access." />
      </WfScreenBody>
      <div className="flex-1">
        <WfListRow title="Arrive · settle" meta="14 min · Favourite" />
        <WfListRow title="Deep unwind" meta="22 min · Favourite" />
      </div>
      <WfTabBar active="profile" />
    </WireframeScreen>
  );
}

/** Listener Home — personalised programme overview (MVP tab). */
export function WfHome({ variant = "default", prototypeActions = {} }) {
  const showContinue = variant === "default" || variant === "continue";
  const highlight =
    variant === "recommend"
      ? "recommend"
      : variant === "progress"
        ? "progress"
        : variant === "activity"
          ? "activity"
          : "default";

  return (
    <WireframeScreen>
      <WfScreenHeader />
      <div className="px-5 pt-2">
        <p className={`${WF_TYPE.bodySm} uppercase tracking-wider`} style={{ color: WF.textMuted }}>
          Preston North End · Performance
        </p>
        <h2 className={`mt-1 ${WF_TYPE.title}`} style={{ color: WF.text }}>
          Home
        </h2>

        {showContinue ? (
          <div
            className="mt-4 rounded-xl border p-4"
            style={{
              borderColor: highlight === "default" || highlight === "continue" ? WF.borderStrong : WF.border,
              background: WF.surfaceMuted,
            }}
          >
            <p className={`${WF_TYPE.bodySm} uppercase tracking-wider`} style={{ color: WF.textMuted }}>
              Continue listening
            </p>
            <p className={`mt-2 ${WF_TYPE.label}`} style={{ color: WF.text }}>
              {SESSIONS.resume.title}
            </p>
            <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
              {SESSIONS.resume.meta}
            </p>
            <div className="mt-3">
              <WfButton onClick={prototypeActions.onContinue}>Resume</WfButton>
            </div>
          </div>
        ) : null}

        <div
          className="mt-4 rounded-xl border p-4"
          style={{
            borderColor: highlight === "recommend" ? WF.borderStrong : WF.border,
            background: WF.surface,
          }}
        >
          <p className={`${WF_TYPE.bodySm} uppercase tracking-wider`} style={{ color: WF.textMuted }}>
            Recommended next
          </p>
          <p className={`mt-2 ${WF_TYPE.label}`} style={{ color: WF.text }}>
            Inner Balance
          </p>
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            18 min · Daily regulation
          </p>
        </div>

        <div
          className="mt-4 rounded-xl border p-4"
          style={{
            borderColor: highlight === "progress" ? WF.borderStrong : WF.border,
            background: WF.surface,
          }}
        >
          <div className="flex items-center justify-between">
            <p className={`${WF_TYPE.bodySm} uppercase tracking-wider`} style={{ color: WF.textMuted }}>
              Programme progress
            </p>
            <p className={WF_TYPE.bodySm} style={{ color: WF.text }}>
              4 / 7
            </p>
          </div>
          <div className="mt-3">
            <WfProgress value={57} />
          </div>
        </div>

        {highlight === "activity" ? (
          <div className="mt-4">
            <p className={`${WF_TYPE.bodySm} uppercase tracking-wider`} style={{ color: WF.textMuted }}>
              Recent activity
            </p>
            <WfListRow title="Arrive" meta="Completed · Yesterday" />
            <WfListRow title="Settle" meta="Completed · 3 days ago" />
          </div>
        ) : (
          <div className="mt-4">
            <p className={`${WF_TYPE.bodySm} uppercase tracking-wider`} style={{ color: WF.textMuted }}>
              Assigned sessions
            </p>
          </div>
        )}
      </div>
      {highlight !== "activity" ? (
        <div className="mt-1 flex-1 overflow-hidden">
          {SESSIONS.library.slice(0, 3).map((s) => (
            <WfListRow key={s.title} title={s.title} meta={s.meta} onClick={prototypeActions.onSelectSession} />
          ))}
        </div>
      ) : (
        <div className="flex-1" />
      )}
      <WfTabBar active="home" />
    </WireframeScreen>
  );
}

/** Assigned programme — current / upcoming / completed. */
export function WfAssigned({ variant = "default", prototypeActions = {} }) {
  const sections = {
    default: [
      { title: "Current", rows: SESSIONS.library.slice(0, 2) },
      { title: "Upcoming", rows: SESSIONS.library.slice(2, 4) },
      { title: "Completed", rows: [{ title: "Arrive", meta: "12 min · Done" }] },
    ],
    current: [{ title: "Current", rows: SESSIONS.library.slice(0, 3) }],
    upcoming: [{ title: "Upcoming", rows: SESSIONS.library.slice(1, 4) }],
    completed: [
      {
        title: "Completed",
        rows: [
          { title: "Arrive", meta: "12 min · Done" },
          { title: "Settle", meta: "15 min · Done" },
        ],
      },
    ],
  };
  const groups = sections[variant] ?? sections.default;

  return (
    <WireframeScreen>
      <WfScreenHeader />
      <div className="px-5 pt-2">
        <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
          Assigned
        </h2>
        <p className={`mt-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          Every session from your organisation
        </p>
      </div>
      <div className="mt-2 flex-1 overflow-hidden">
        {groups.map((group) => (
          <div key={group.title}>
            <p
              className={`px-5 pt-3 ${WF_TYPE.bodySm} uppercase tracking-wider`}
              style={{ color: WF.textMuted }}
            >
              {group.title}
            </p>
            {group.rows.map((s) => (
              <WfListRow
                key={`${group.title}-${s.title}`}
                title={s.title}
                meta={s.meta}
                onClick={prototypeActions.onSelectSession}
              />
            ))}
          </div>
        ))}
      </div>
      <WfTabBar active="assigned" />
    </WireframeScreen>
  );
}

/** Programme progress tab. */
export function WfProgrammeProgress({ variant = "default" }) {
  const titleMap = {
    default: "Progress",
    overview: "Programme overview",
    completed: "Completed sessions",
    history: "Listening history",
    reflections: "Reflections",
    complete: "Programme complete",
  };

  return (
    <WireframeScreen>
      <WfScreenHeader />
      <div className="px-5 pt-2">
        <h2 className={WF_TYPE.title} style={{ color: WF.text }}>
          {titleMap[variant] ?? titleMap.default}
        </h2>
        <p className={`mt-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          Preston North End Performance Programme
        </p>

        {variant !== "complete" ? (
          <div className="mt-5 rounded-xl border p-4" style={{ borderColor: WF.border, background: WF.surface }}>
            <div className="flex items-center justify-between">
              <p className={WF_TYPE.label} style={{ color: WF.text }}>
                4 of 7 sessions
              </p>
              <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
                57%
              </p>
            </div>
            <div className="mt-3">
              <WfProgress value={57} />
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border p-4" style={{ borderColor: WF.border, background: WF.surfaceMuted }}>
            <p className={WF_TYPE.label} style={{ color: WF.text }}>
              Programme complete
            </p>
            <p className={`mt-2 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
              You’ve finished every assigned session. Your organisation may add more.
            </p>
          </div>
        )}
      </div>

      <div className="mt-2 flex-1 overflow-hidden">
        {variant === "reflections" ? (
          <>
            <WfListRow title="Arrive" meta="Felt settled · Note added" />
            <WfListRow title="Settle" meta="Rated 4 · Skip note" />
          </>
        ) : variant === "history" || variant === "completed" ? (
          <>
            <WfListRow title="Arrive" meta="Yesterday · 12 min" />
            <WfListRow title="Settle" meta="3 days ago · 15 min" />
            <WfListRow title="Inner Balance" meta="Last week · 18 min" />
          </>
        ) : (
          <>
            <WfListRow title="Arrive" meta="Completed" />
            <WfListRow title="Settle" meta="Completed" />
            <WfListRow title="Inner Balance" meta="Current" />
            <WfListRow title="Access" meta="Upcoming" />
          </>
        )}
      </div>
      <WfTabBar active="progress" />
    </WireframeScreen>
  );
}

/** Organisation / programme context. */
export function WfOrganisation({ variant = "default" }) {
  const copy = {
    default: {
      tag: "Organisation",
      title: "Preston North End",
      subtitle: "Performance Programme — provisioned listening for your squad.",
      rows: ["About the programme", "Programme objectives", "Organisation details", "Support contact"],
    },
    programme: {
      tag: "Programme",
      title: "About the programme",
      subtitle: "Structured sessions assigned by your performance team to support recovery and focus.",
      rows: ["Weekly listening cadence", "Match-day preparation", "Recovery protocols"],
    },
    objectives: {
      tag: "Objectives",
      title: "Programme objectives",
      subtitle: "What this pathway is designed to support.",
      rows: ["Autonomic regulation", "Pre-performance readiness", "Post-session recovery"],
    },
  };
  const cfg = copy[variant] ?? copy.default;

  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>{cfg.tag}</WfTag>
        <WfHeadline className="!px-0 mt-2" title={cfg.title} subtitle={cfg.subtitle} />
        <div className="mt-4">
          {cfg.rows.map((r) => (
            <WfRowLink key={r} title={r} />
          ))}
        </div>
      </WfScreenBody>
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
          <WfHeadline className="!px-0 mt-2" title={SESSIONS.detail.title} subtitle="Purpose, duration, and neurotype fit at a glance." />
          <div
            className="mt-4 rounded-xl border p-4"
            style={{ borderColor: WF.border, background: WF.surfaceMuted }}
          >
            <div className="flex gap-3">
              <WfPlaceholder size="sm" className="!h-16 !w-16 shrink-0" />
              <div>
                <p className={WF_TYPE.label} style={{ color: WF.text }}>
                  {SESSIONS.detail.duration} · {SESSIONS.detail.useCase}
                </p>
                <p className={`mt-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textSecondary }}>
                  {SESSIONS.detail.benefits}
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
        <WfHeadline className="!px-0" title={SESSIONS.detail.title} />
        <div className="mt-2 flex flex-wrap gap-1.5">
          <WfChip>{SESSIONS.detail.duration}</WfChip>
          <WfChip>{SESSIONS.detail.useCase}</WfChip>
          <WfChip>{SESSIONS.detail.neurotype}</WfChip>
          {downloaded ? <WfChip active>Downloaded</WfChip> : null}
          {available ? <WfChip active>Ready to play</WfChip> : null}
        </div>
        <p className={`mt-3 ${WF_TYPE.body}`} style={{ color: WF.textSecondary }}>
          {SESSIONS.detail.description}
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
              {PLAYER.sessionTitle}
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
            {PLAYER.sessionTitle}
          </p>
          <p className={WF_TYPE.bodySm} style={{ color: palette.placeholder }}>
            {PLAYER.duration} · {PLAYER.category}
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
          {FEEDBACK.completionSubtitle}
        </p>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton>Rate this Session</WfButton>
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
          title={CHECK_IN.afterTitle}
          subtitle="Post-session reflection — compare to your check-in."
        />
        <div className="mt-6 space-y-4">
          <WfSlider label={CHECK_IN.sliders[0]} value={32} />
          <WfSlider label={CHECK_IN.sliders[1]} value={58} />
          <WfSlider label={CHECK_IN.sliders[2]} value={65} />
          <WfSlider label={CHECK_IN.sliders[3]} value={72} />
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
            {FEEDBACK.submittedSubtitle}
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
            title={FEEDBACK.ratingTitle}
            subtitle={FEEDBACK.ratingSubtitle}
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
          title={FEEDBACK.formTitle}
          subtitle={FEEDBACK.formSubtitle}
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
    const rows = ABOUT.privacyLinks;
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

  const rows = ABOUT.links;
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
        <WfHeadline className="!px-0 mt-4" title={ABOUT.title} subtitle={ABOUT.subtitle} />
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

  const rows = SUPPORT.rows;
  return (
    <WireframeScreen>
      <WfScreenBody className="px-5 pt-6">
        <WfTag>Support</WfTag>
        <WfHeadline
          className="!px-0 mt-2"
          title={SUPPORT.title}
          subtitle={SUPPORT.subtitle}
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
        <WfHeadline className="!px-0 mt-2" title={RESEARCH.title} subtitle={RESEARCH.subtitle} />
        <div className="mt-4 space-y-2">
          {RESEARCH.publications.map((p) => (
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
