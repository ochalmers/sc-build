import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  DEMO_CREDENTIALS,
  partnerFromInviteCode,
} from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { ListenerFrame } from "../../components/ListenerFrame.jsx";
import { AppBody, AppButton, AppField, AppTitle } from "../../components/ui.jsx";
import { SystemBrandLogo } from "../../../system/components/SystemBrandLogo.jsx";

/** Returning listeners after a session exists — not the email deep-link entry. */
export function ListenerEntry() {
  const { role, user, onboardingComplete, neurotypeId } = useAppStore();

  if (role === "listener" && user) {
    if (!onboardingComplete) return <Navigate to="/app/listener/onboarding" replace />;
    if (!neurotypeId) return <Navigate to="/app/listener/neurotype" replace />;
    return <Navigate to="/app/listener/home" replace />;
  }

  // Invite-only product: the email deep link lands on Accept invitation.
  return <Navigate to="/app/listener/invite" replace />;
}

export function ListenerLogin() {
  const navigate = useNavigate();
  const { loginListener } = useAppStore();
  const [email, setEmail] = useState(DEMO_CREDENTIALS.listener.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.listener.password);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const result = loginListener({ email, password });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/app/listener");
  }

  return (
    <ListenerFrame mode="regulation" hideTabBar>
      <form onSubmit={submit} className="flex flex-1 flex-col pb-6 pt-4">
        <AppTitle className="mt-2">Welcome back</AppTitle>
        <AppBody className="mt-3">Sign in with the email from your organisation.</AppBody>

        <div className="mt-8 space-y-4">
          <AppField label="Email" type="email" value={email} onChange={setEmail} autoComplete="username" />
          <AppField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            hint={`Demo: ${DEMO_CREDENTIALS.listener.password}`}
          />
        </div>

        {error ? (
          <p className="mt-4 text-[13px]" style={{ color: "var(--proto-accent)" }}>
            {error}
          </p>
        ) : null}

        <div className="mt-auto space-y-3 pt-10">
          <AppButton type="submit" fullWidth>
            Continue
          </AppButton>
          <AppButton fullWidth variant="ghost" onClick={() => navigate("/app/listener/invite")}>
            Open invitation instead
          </AppButton>
        </div>
      </form>
    </ListenerFrame>
  );
}

const FALLBACK_PARTNER = {
  name: "Preston North End",
  inviteLine: "You've been invited by Preston North End to access Sonocea.",
};

const INVITE_BODY =
  "Sonocea uses patented Sonic Augmentation Technology™ to deliver structured listening experiences designed to support nervous system regulation, recovery and wellbeing.";

/**
 * Invitation email as seen in-app — deep-link entry into the platform.
 * Content matches the Welcome email: logo, hero, partner invite, Accept CTA.
 */
export function ListenerInvite() {
  const navigate = useNavigate();
  const { loginListener } = useAppStore();
  const [error, setError] = useState("");

  const partner =
    partnerFromInviteCode(DEMO_CREDENTIALS.listener.inviteCode) ?? FALLBACK_PARTNER;

  function accept(e) {
    e.preventDefault();
    const result = loginListener({
      email: DEMO_CREDENTIALS.listener.email,
      inviteCode: DEMO_CREDENTIALS.listener.inviteCode,
      password: "",
      isInviteRedeem: true,
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/app/listener/onboarding", { replace: true, state: { fromInvite: true } });
  }

  return (
    <ListenerFrame mode="regulation" hideTabBar bleed>
      <form
        onSubmit={accept}
        className="flex min-h-full flex-col"
        style={{ background: "#f3f1ec", color: "#0a0a0a" }}
      >
        <header className="flex justify-center px-6 pb-5 pt-8">
          <SystemBrandLogo className="h-7 w-auto" />
        </header>

        <div className="relative w-full shrink-0 overflow-hidden" style={{ aspectRatio: "396 / 248" }}>
          <img
            src="/assets/brand/email/welcome-hero.jpg"
            alt="Welcome to Sonocea"
            className="h-full w-full object-cover"
            decoding="async"
          />
        </div>

        <div className="flex flex-1 flex-col px-7 pb-8 pt-8 text-center">
          <p className="text-[15px] font-medium leading-snug tracking-[-0.01em]">
            {partner.inviteLine ??
              `You've been invited by ${partner.name} to access Sonocea.`}
          </p>
          <p className="mt-4 text-[13px] leading-relaxed text-black/55">{INVITE_BODY}</p>

          {error ? <p className="mt-4 text-[13px] text-red-700">{error}</p> : null}

          <div className="mt-auto space-y-4 pt-10">
            <button
              type="submit"
              className="w-full rounded-full bg-black px-5 py-3.5 text-[14px] font-medium tracking-tight text-white transition-opacity hover:opacity-90"
            >
              Accept invitation
            </button>
            <p className="text-[12px] text-black/40">
              Already set up?{" "}
              <button
                type="button"
                className="font-medium text-black/70 underline-offset-2 hover:underline"
                onClick={() => navigate("/app/listener/login")}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </form>
    </ListenerFrame>
  );
}
