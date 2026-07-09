import {
  WfAccessCode,
  WfCheckIn,
  WfExperienced,
  WfFeedback,
  WfGetStarted,
  WfHeadphones,
  WfInvitation,
  WfLibrary,
  WfNeurotype,
  WfOnboarding,
  WfPlayer,
  WfProfile,
  WfPublicListening,
  WfRequestAccess,
  WfScienceHome,
  WfSessionDetail,
  WfTopicDetail,
} from "../wireframes/screens.jsx";
import {
  useWf,
  WireframeScreen,
  WfButton,
  WfScreenBody,
  WfScreenFooter,
  WfSuccessMark,
} from "../wireframes/primitives.jsx";
import { WF_TYPE } from "../wireframes/tokens.js";

function CompleteScreen({ title, subtitle, onRestart, onChooseFlow }) {
  return (
    <WireframeScreen>
      <CompleteScreenInner title={title} subtitle={subtitle} onRestart={onRestart} onChooseFlow={onChooseFlow} />
    </WireframeScreen>
  );
}

function CompleteScreenInner({ title, subtitle, onRestart, onChooseFlow }) {
  const WF = useWf();

  return (
    <>
      <WfScreenBody className="items-center justify-center px-8 text-center">
        <WfSuccessMark />
        <p className={`mt-5 ${WF_TYPE.titleSm}`} style={{ color: WF.text }}>
          {title}
        </p>
        <p className={`mt-2 ${WF_TYPE.body}`} style={{ color: WF.textMuted }}>
          {subtitle}
        </p>
      </WfScreenBody>
      <WfScreenFooter>
        <WfButton onClick={onRestart}>Play again</WfButton>
        <WfButton variant="secondary" onClick={onChooseFlow}>
          Choose another flow
        </WfButton>
      </WfScreenFooter>
    </>
  );
}

export function renderPrototypeScreen(screenId, nav) {
  const { go, startFlow, restart, chooseFlow } = nav;

  switch (screenId) {
    case "pv-get-started":
      return (
        <WfGetStarted
          prototypeActions={{
            onDiscover: () => startFlow("public-visitor", "pv-check-in-before"),
            onInvitation: () => startFlow("listener", "pv-invitation"),
            onLogin: () => startFlow("listener-login", "mobile-invite"),
          }}
        />
      );
    case "pv-check-in-before":
      return <WfCheckIn variant="before" prototypeActions={{ onContinue: () => go("pv-headphones") }} />;
    case "pv-headphones":
      return <WfHeadphones prototypeActions={{ onBegin: () => go("pv-listening") }} />;
    case "pv-listening":
      return <WfPublicListening prototypeActions={{ onComplete: () => go("pv-check-in-after") }} />;
    case "pv-check-in-after":
      return <WfCheckIn variant="after" prototypeActions={{ onContinue: () => go("pv-experienced") }} />;
    case "pv-experienced":
      return <WfExperienced prototypeActions={{ onContinue: () => go("pv-science-home") }} />;
    case "pv-science-home":
      return (
        <WfScienceHome
          prototypeActions={{
            onTopic: () => go("pv-topic-detail"),
            onRequestAccess: () => go("pv-request-access"),
          }}
        />
      );
    case "pv-topic-detail":
      return <WfTopicDetail prototypeActions={{ onBack: () => go("pv-science-home") }} />;
    case "pv-request-access":
      return (
        <WfRequestAccess
          prototypeActions={{
            onSubmit: () => go("pv-complete"),
            onMailingList: () => go("pv-complete"),
          }}
        />
      );
    case "pv-complete":
      return (
        <CompleteScreen
          title="Public journey complete"
          subtitle="You've explored the Discover Sonocea route and registered interest."
          onRestart={() => restart()}
          onChooseFlow={chooseFlow}
        />
      );
    case "pv-invitation":
      return (
        <WfInvitation
          prototypeActions={{
            onActivate: () => go("mobile-invite"),
            onLearnMore: () => startFlow("public-visitor", "pv-check-in-before"),
          }}
        />
      );
    case "mobile-invite":
      return <WfAccessCode variant="valid" prototypeActions={{ onRedeem: () => go("mobile-onboarding-0") }} />;
    case "mobile-onboarding-0":
      return (
        <WfOnboarding
          step={0}
          prototypeActions={{
            onContinue: () => go("mobile-onboarding-1"),
          }}
        />
      );
    case "mobile-onboarding-1":
      return (
        <WfOnboarding
          step={1}
          prototypeActions={{
            onContinue: () => go("mobile-onboarding-2"),
            onBack: () => go("mobile-onboarding-0"),
          }}
        />
      );
    case "mobile-onboarding-2":
      return (
        <WfOnboarding
          step={2}
          prototypeActions={{
            onContinue: () => go("mobile-neurotype"),
            onBack: () => go("mobile-onboarding-1"),
          }}
        />
      );
    case "mobile-neurotype":
      return <WfNeurotype variant="question" prototypeActions={{ onContinue: () => go("mobile-profile") }} />;
    case "mobile-profile":
      return <WfProfile prototypeActions={{ onContinue: () => go("mobile-library") }} />;
    case "mobile-library":
      return <WfLibrary variant="home" prototypeActions={{ onSelectSession: () => go("mobile-detail") }} />;
    case "mobile-detail":
      return (
        <WfSessionDetail
          variant="available"
          prototypeActions={{ onPlay: () => go("mobile-player-playing") }}
        />
      );
    case "mobile-player-playing":
      return (
        <WfPlayer variant="playing" prototypeActions={{ onComplete: () => go("mobile-feedback") }} />
      );
    case "mobile-feedback":
      return (
        <WfFeedback
          variant="rating"
          prototypeActions={{
            onContinue: () => go("mobile-feedback-done"),
            onSkip: () => go("mobile-feedback-done"),
          }}
        />
      );
    case "mobile-feedback-done":
      return (
        <WfFeedback variant="submitted" prototypeActions={{ onDone: () => go("listener-complete") }} />
      );
    case "listener-complete":
      return (
        <CompleteScreen
          title="Listener journey complete"
          subtitle="Invite redeemed, session played, and feedback submitted."
          onRestart={() => restart()}
          onChooseFlow={chooseFlow}
        />
      );
    default:
      return (
        <WireframeScreen>
          <WfScreenBody className="items-center justify-center p-6 text-center">
            <p className={WF_TYPE.bodySm}>Screen not found: {screenId}</p>
          </WfScreenBody>
        </WireframeScreen>
      );
  }
}
