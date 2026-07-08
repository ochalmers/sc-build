import {
  FeedbackScreen,
  LibraryScreen,
  PlayerConcept,
  SessionDetailConcept,
} from "../designs/phase1/screens/listener/CoreScreens.jsx";
import {
  InviteScreen,
  NeurotypeScreen,
  OnboardingIntroScreen,
  RecommendedProfileScreen,
} from "../designs/phase1/screens/listener/OnboardingScreens.jsx";
import {
  PvCheckInScreen,
  PvExperiencedScreen,
  PvGetStartedScreen,
  PvHeadphonesScreen,
  PvInvitationScreen,
  PvListeningScreen,
  PvRequestAccessScreen,
  PvScienceHomeScreen,
  PvTopicDetailScreen,
} from "../designs/prd/PublicVisitorScreens.jsx";
import { PrimaryButton } from "../designs/phase1/shared/Phase1UI.jsx";
import { DARK_BG, DARK_MUTED, DARK_TEXT } from "../designs/phase1/shared/Phase1UI.jsx";

function PrototypeCompleteScreen({ title, subtitle, onRestart, onChooseFlow }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center" style={{ background: DARK_BG }}>
      <div className="text-3xl">✓</div>
      <p className="mt-4 text-[20px] font-medium" style={{ color: DARK_TEXT }}>
        {title}
      </p>
      <p className="mt-2 text-[12px] leading-relaxed" style={{ color: DARK_MUTED }}>
        {subtitle}
      </p>
      <div className="mt-8 w-full space-y-2.5">
        <PrimaryButton variant="dark" onClick={onRestart}>
          Play again
        </PrimaryButton>
        <PrimaryButton variant="dark" onClick={onChooseFlow} className="!bg-white/8">
          Choose another flow
        </PrimaryButton>
      </div>
    </div>
  );
}

export function renderPrdPrototypeScreen(screenId, nav) {
  const { go, goNext, startFlow, restart, chooseFlow } = nav;

  switch (screenId) {
    case "pv-get-started":
      return (
        <PvGetStartedScreen
          prototypeActions={{
            onDiscover: () => startFlow("public-visitor", "pv-check-in-before"),
            onInvitation: () => startFlow("listener", "pv-invitation"),
            onLogin: () => startFlow("listener-login", "mobile-invite"),
          }}
        />
      );
    case "pv-check-in-before":
      return <PvCheckInScreen variant="before" prototypeActions={{ onContinue: () => go("pv-headphones") }} />;
    case "pv-headphones":
      return <PvHeadphonesScreen prototypeActions={{ onBegin: () => go("pv-listening") }} />;
    case "pv-listening":
      return <PvListeningScreen variant="playing" prototypeActions={{ onComplete: () => go("pv-check-in-after") }} />;
    case "pv-check-in-after":
      return <PvCheckInScreen variant="after" prototypeActions={{ onContinue: () => go("pv-experienced") }} />;
    case "pv-experienced":
      return <PvExperiencedScreen prototypeActions={{ onExploreScience: () => go("pv-science-home") }} />;
    case "pv-science-home":
      return (
        <PvScienceHomeScreen
          prototypeActions={{
            onTopic: () => go("pv-topic-detail"),
            onContinue: () => go("pv-request-access"),
          }}
        />
      );
    case "pv-topic-detail":
      return <PvTopicDetailScreen prototypeActions={{ onBack: () => go("pv-science-home") }} />;
    case "pv-request-access":
      return (
        <PvRequestAccessScreen
          prototypeActions={{
            onSubmit: () => go("pv-complete"),
            onMailingList: () => go("pv-complete"),
          }}
        />
      );
    case "pv-complete":
      return (
        <PrototypeCompleteScreen
          title="Public journey complete"
          subtitle="You've explored the Discover Sonocea golden route and registered interest."
          onRestart={() => restart()}
          onChooseFlow={chooseFlow}
        />
      );
    case "pv-invitation":
      return (
        <PvInvitationScreen
          prototypeActions={{
            onActivate: () => go("mobile-invite"),
            onLearnMore: () => startFlow("public-visitor", "pv-check-in-before"),
          }}
        />
      );
    case "mobile-invite":
      return <InviteScreen variant="valid" prototypeActions={{ onRedeem: () => go("mobile-onboarding-0") }} />;
    case "mobile-onboarding-0":
      return (
        <OnboardingIntroScreen
          step={0}
          prototypeActions={{
            onContinue: () => go("mobile-onboarding-1"),
          }}
        />
      );
    case "mobile-onboarding-1":
      return (
        <OnboardingIntroScreen
          step={1}
          prototypeActions={{
            onContinue: () => go("mobile-onboarding-2"),
            onBack: () => go("mobile-onboarding-0"),
          }}
        />
      );
    case "mobile-onboarding-2":
      return (
        <OnboardingIntroScreen
          step={2}
          prototypeActions={{
            onContinue: () => go("mobile-neurotype"),
            onBack: () => go("mobile-onboarding-1"),
          }}
        />
      );
    case "mobile-neurotype":
      return <NeurotypeScreen variant="question" prototypeActions={{ onContinue: () => go("mobile-profile") }} />;
    case "mobile-profile":
      return (
        <RecommendedProfileScreen
          prototypeActions={{
            onContinue: () => go("mobile-library"),
            onLibrary: () => go("mobile-library"),
          }}
        />
      );
    case "mobile-library":
      return <LibraryScreen variant="default" prototypeActions={{ onSelectSession: () => go("mobile-detail") }} />;
    case "mobile-detail":
      return (
        <SessionDetailConcept
          variant="available"
          prototypeActions={{ onPlay: () => go("mobile-player-playing") }}
        />
      );
    case "mobile-player-playing":
      return (
        <PlayerConcept
          variant="playing"
          prototypeActions={{ onComplete: () => go("mobile-feedback") }}
        />
      );
    case "mobile-feedback":
      return (
        <FeedbackScreen
          variant="rating"
          prototypeActions={{
            onContinue: () => go("mobile-feedback-done"),
            onSkip: () => go("mobile-feedback-done"),
          }}
        />
      );
    case "mobile-feedback-done":
      return (
        <FeedbackScreen
          variant="submitted"
          prototypeActions={{ onDone: () => go("listener-complete") }}
        />
      );
    case "listener-complete":
      return (
        <PrototypeCompleteScreen
          title="Listener journey complete"
          subtitle="Invite redeemed, session played, and feedback submitted."
          onRestart={() => restart()}
          onChooseFlow={chooseFlow}
        />
      );
    default:
      return (
        <div className="flex h-full items-center justify-center p-6 text-center text-[12px] text-ink-500">
          Screen not found: {screenId}
        </div>
      );
  }
}
