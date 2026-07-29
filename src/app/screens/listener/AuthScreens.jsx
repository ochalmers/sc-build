import { useMemo, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  DEMO_CREDENTIALS,
  DIRECT_ACCESS_PARTNER_ID,
  isDirectAccessPartner,
  partnerFromInviteCode,
  PNE_ORGANIZATION,
  SONOCEA_DIRECT_ORGANIZATION,
} from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { useReviewSurface } from "../../context/SurfaceContext.jsx";
import { ListenerFrame } from "../../components/ListenerFrame.jsx";
import { PartnerBrandMark } from "../../components/PartnerBrandMark.jsx";
import { AppBody, AppButton, AppField, AppTitle } from "../../components/ui.jsx";
import { SystemBrandLogo } from "../../../system/components/SystemBrandLogo.jsx";
import { SystemLogoMark } from "../../../system/components/SystemLogoMark.jsx";

const FALLBACK_PARTNER = {
  ...PNE_ORGANIZATION,
};

const FALLBACK_SONOCEA = {
  ...SONOCEA_DIRECT_ORGANIZATION,
};

const INVITE_BODY =
  "Sonocea uses patented Sonic Augmentation Technology™ to create structured listening experiences designed to support regulation, recovery and wellbeing.";

function partnerInviteHeading(partner) {
  if (isDirectAccessPartner(partner)) {
    return partner.inviteLine?.trim() || "You’re invited to experience Sonocea.";
  }
  return (
    partner.inviteLine?.trim() ||
    `${partner.name} has invited you to experience Sonocea.`
  );
}

const STAGGER_MS = 100;

function StaggerStyles() {
  return (
    <style>{`
      @keyframes inviteStaggerIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .invite-stagger {
        animation: inviteStaggerIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-delay: var(--invite-delay, 0ms);
      }
      @media (prefers-reduced-motion: reduce) {
        .invite-stagger {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

function StaggerItem({ i = 0, className = "", children }) {
  return (
    <div
      className={`invite-stagger ${className}`.trim()}
      style={{ "--invite-delay": `${i * STAGGER_MS}ms` }}
    >
      {children}
    </div>
  );
}

/** Returning listeners after a session exists - not the email deep-link entry. */
export function ListenerEntry() {
  const { role, user, onboardingComplete, neurotypeId } = useAppStore();

  if (role === "listener" && user) {
    if (!onboardingComplete) return <Navigate to="/app/listener/onboarding" replace />;
    if (!neurotypeId) return <Navigate to="/app/listener/neurotype" replace />;
    return <Navigate to="/app/listener/home" replace />;
  }

  // Invitation starts as email → App Store → in-app welcome.
  return <Navigate to="/app/listener/email" replace />;
}

function useInvitePartner() {
  const [searchParams] = useSearchParams();
  const { invites, partners, listeners } = useAppStore();
  const { surface } = useReviewSurface();
  const preferDirect = surface === "anonymous";

  const inviteCode = useMemo(() => {
    const fromQuery = searchParams.get("code")?.trim();
    if (fromQuery) return fromQuery;
    return preferDirect
      ? DEMO_CREDENTIALS.anonymousListener.inviteCode
      : DEMO_CREDENTIALS.listener.inviteCode;
  }, [searchParams, preferDirect]);

  const partner = useMemo(() => {
    if (preferDirect || inviteCode.toUpperCase().startsWith("SONOCEA")) {
      const fromStore = partners.find((p) => p.id === DIRECT_ACCESS_PARTNER_ID);
      return fromStore ?? FALLBACK_SONOCEA;
    }
    const fromStore = partnerFromInviteCode(inviteCode, partners, listeners);
    if (fromStore) return fromStore;
    const invite = invites.find((i) => i.code.toUpperCase() === inviteCode.toUpperCase());
    if (invite) {
      const matched = partners.find((p) => p.id === invite.partnerId);
      if (matched) return matched;
      if (invite.partnerId === DIRECT_ACCESS_PARTNER_ID) return FALLBACK_SONOCEA;
      return FALLBACK_PARTNER;
    }
    return partnerFromInviteCode(DEMO_CREDENTIALS.listener.inviteCode) ?? FALLBACK_PARTNER;
  }, [inviteCode, invites, partners, listeners, preferDirect]);

  return { inviteCode, partner, preferDirect };
}

/**
 * Step 1 - Invitation arrives as email (Mail-style preview).
 * CTA opens the App Store handoff for first-time install.
 */
export function ListenerInviteEmail() {
  const navigate = useNavigate();
  const { partner, inviteCode } = useInvitePartner();
  const codeQuery = `?code=${encodeURIComponent(inviteCode)}`;
  const direct = isDirectAccessPartner(partner);
  const fromLabel = direct ? "Sonocea" : partner.name;

  return (
    <ListenerFrame mode="regulation" hideTabBar bleed>
      <div className="flex h-full min-h-full flex-col" style={{ background: "#ebeae6", color: "#0a0a0a" }}>
        <header className="border-b border-black/10 bg-[#f7f6f3] px-4 pb-3 pt-9">
          <div className="flex items-center justify-between text-[12px] text-black/45">
            <span>Inbox</span>
            <span className="font-medium text-black/70">Mail</span>
            <span>Edit</span>
          </div>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-black/35">
            Invitation
          </p>
          <h1 className="mt-1 text-[17px] font-semibold tracking-tight">
            You’re invited to Sonocea
          </h1>
          <p className="mt-1 text-[12px] text-black/45">
            From {fromLabel} · Today
          </p>
        </header>

        <div className="flex flex-1 flex-col px-5 pb-8 pt-6">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <div className="px-5 py-6 text-center">
              <div
                className="mb-5 flex items-center justify-center gap-3"
                aria-label={direct ? "Sonocea" : `Sonocea and ${partner.name}`}
              >
                <SystemBrandLogo className="h-6 w-auto text-[#171716]" />
                {!direct ? (
                  <>
                    <span className="text-[13px] font-medium tracking-wide text-black/30" aria-hidden>
                      ×
                    </span>
                    <PartnerBrandMark
                      partner={partner}
                      className="h-9 w-auto max-w-[64px] object-contain"
                    />
                  </>
                ) : null}
              </div>
              <p className="text-[1.45rem] font-medium leading-[1.2] tracking-[-0.03em] text-[#171716]">
                {partnerInviteHeading(partner)}
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-black/55">{INVITE_BODY}</p>
              <button
                type="button"
                className="mt-6 w-full rounded-full bg-[#171716] px-5 py-3.5 text-[14px] font-medium tracking-tight text-white"
                onClick={() => navigate(`/app/listener/app-store${codeQuery}`)}
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </ListenerFrame>
  );
}

/**
 * Step 2 - App Store listing before first open.
 * Get continues into the in-app welcome hand-off.
 */
const APP_STORE_PREVIEWS = [
  { id: "list", label: "Session list" },
  { id: "cards", label: "Featured sessions" },
  { id: "grid", label: "Session grid" },
];

/** Grey dummy phone UI - no real photography in App Store previews. */
function AppStorePreviewPlaceholder({ variant = "list" }) {
  if (variant === "cards") {
    return (
      <div className="flex h-full flex-col bg-[#f3f2ee] px-2 pb-2 pt-3" aria-hidden>
        <div className="mb-2 h-1.5 w-10 rounded-full bg-black/15" />
        <div className="flex flex-1 flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="relative min-h-0 flex-1 overflow-hidden rounded-[6px] bg-[#d8d6d1]"
            >
              <div className="absolute inset-x-1.5 bottom-1.5 flex items-end justify-between">
                <div className="space-y-0.5">
                  <div className="h-1 w-8 rounded-full bg-black/25" />
                  <div className="h-1 w-5 rounded-full bg-black/15" />
                </div>
                <div className="h-3 w-3 rounded-full border border-black/20 bg-white/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="flex h-full flex-col bg-[#f3f2ee] px-2 pb-2 pt-3" aria-hidden>
        <div className="mb-2 h-1.5 w-10 rounded-full bg-black/15" />
        <div className="grid flex-1 grid-cols-2 gap-1">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="relative min-h-0 overflow-hidden rounded-[5px] bg-[#d8d6d1]">
              <div className="absolute inset-x-1 bottom-1 flex items-end justify-between">
                <div className="h-1 w-6 rounded-full bg-black/20" />
                <div className="h-2.5 w-2.5 rounded-full border border-black/20 bg-white/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[#f3f2ee] px-2 pb-2 pt-3" aria-hidden>
      <div className="mb-2.5 h-1.5 w-10 rounded-full bg-black/15" />
      <div className="flex flex-1 flex-col gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="h-5 w-5 shrink-0 rounded-[3px] bg-[#d8d6d1]" />
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="h-1 w-[70%] rounded-full bg-black/20" />
              <div className="h-1 w-[45%] rounded-full bg-black/12" />
            </div>
            <div className="h-3 w-3 shrink-0 rounded-full border border-black/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListenerAppStore() {
  const navigate = useNavigate();
  const { inviteCode, partner } = useInvitePartner();
  const codeQuery = `?code=${encodeURIComponent(inviteCode)}`;
  const direct = isDirectAccessPartner(partner);

  return (
    <ListenerFrame mode="regulation" hideTabBar bleed>
      <div className="flex h-full min-h-full flex-col bg-[#f5f5f7] text-[#1c1c1e]">
        <header className="flex items-center justify-between border-b border-black/10 bg-white/90 px-4 pb-2.5 pt-9 backdrop-blur">
          <button
            type="button"
            className="text-[13px] font-normal text-[#007AFF]"
            onClick={() => navigate(`/app/listener/email${codeQuery}`)}
          >
            ‹ Search
          </button>
          <span className="text-[12px] font-normal">App Store</span>
          <span className="text-[13px] font-normal text-[#007AFF]">•••</span>
        </header>

        <div className="flex flex-1 flex-col px-4 pb-8 pt-5">
          <div className="flex gap-3.5">
            <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-sm">
              <SystemLogoMark className="h-12 w-auto text-[#1c1c1e]" title="Sonocea" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[18px] font-normal leading-tight tracking-tight">Sonocea</p>
              <p className="mt-0.5 text-[13px] text-black/45">Guided listening for recovery</p>
              <p className="mt-0.5 text-[12px] text-[#007AFF]">Sonocea Ltd</p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full bg-[#007AFF] px-5 py-1.5 text-[13px] font-normal text-white"
                  onClick={() => navigate(`/app/listener/invite${codeQuery}`)}
                >
                  Get
                </button>
                <span className="text-[10px] text-black/35">In-App Purchases</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 border-y border-black/10 py-3.5">
            {[
              { label: "Ratings", value: "4.8", sub: "★★★★★" },
              { label: "Age", value: "12+", sub: "Years Old" },
              { label: "Category", value: "Health", sub: "& Fitness" },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-[9px] font-normal uppercase tracking-[0.08em] text-black/35">
                  {m.label}
                </p>
                <p className="mt-0.5 text-[16px] font-normal">{m.value}</p>
                <p className="text-[10px] text-black/40">{m.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <p className="text-[14px] font-normal">Preview</p>
            <div className="-mx-4 mt-3 flex gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {APP_STORE_PREVIEWS.map((shot) => (
                <div
                  key={shot.id}
                  className="relative h-[220px] w-[112px] shrink-0 overflow-hidden rounded-[14px] border border-black/10 bg-white shadow-sm"
                  role="img"
                  aria-label={shot.label}
                >
                  <AppStorePreviewPlaceholder variant={shot.id} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[14px] font-normal">What’s New</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-black/55">
              {direct
                ? "Personalised listening from a Sonocea invite. Short headphone sessions shaped around what you share when you join."
                : "Join partner-led listening programmes. Short headphone sessions for recovery and regulation - invited by your organisation."}
            </p>
          </div>
        </div>
      </div>
    </ListenerFrame>
  );
}

export function ListenerLogin() {
  const navigate = useNavigate();
  const { loginListener } = useAppStore();
  const { inviteCode: partnerInviteCode, preferDirect } = useInvitePartner();
  const welcomePath = `/app/listener/invite?code=${encodeURIComponent(partnerInviteCode)}`;
  const [anonymous, setAnonymous] = useState(preferDirect);
  const [email, setEmail] = useState(DEMO_CREDENTIALS.listener.email);
  const [inviteCode, setInviteCode] = useState(
    preferDirect
      ? DEMO_CREDENTIALS.anonymousListener.inviteCode
      : DEMO_CREDENTIALS.listener.inviteCode,
  );
  const [password, setPassword] = useState(DEMO_CREDENTIALS.listener.password);
  const [error, setError] = useState("");

  function goBackToWelcome() {
    navigate(welcomePath);
  }

  function submit(e) {
    e.preventDefault();
    const result = anonymous || preferDirect
      ? loginListener({
          inviteCode,
          password,
          isAnonymous: true,
          email: "",
        })
      : loginListener({ email, password });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/app/listener");
  }

  return (
    <ListenerFrame mode="regulation" hideTabBar>
      <form onSubmit={submit} className="flex h-full min-h-full flex-col pb-6 pt-4">
        <button
          type="button"
          onClick={goBackToWelcome}
          className="self-start text-[13px] font-medium"
          style={{ color: "var(--proto-text-muted)" }}
        >
          ‹ Back
        </button>
        <AppTitle className="mt-2">Welcome back</AppTitle>
        <AppBody className="mt-3">
          {anonymous || preferDirect
            ? "Sign in with your invite code - your name and email stay private in the app."
            : "Sign in with the email from your organisation."}
        </AppBody>

        {!preferDirect ? (
          <button
            type="button"
            onClick={() => {
              setAnonymous((v) => !v);
              setError("");
            }}
            className="mt-5 self-start rounded-full border px-3 py-1.5 text-[12px] font-medium"
            style={{
              borderColor: "var(--proto-border)",
              color: "var(--proto-text-muted)",
              background: anonymous
                ? "color-mix(in srgb, var(--proto-surface-elevated) 80%, var(--proto-accent) 20%)"
                : "transparent",
            }}
            aria-pressed={anonymous}
          >
            {anonymous ? "Using private sign-in" : "Need to stay anonymous?"}
          </button>
        ) : null}

        <div className="mt-6 space-y-4">
          {anonymous || preferDirect ? (
            <AppField
              label="Invite code"
              value={inviteCode}
              onChange={setInviteCode}
              autoComplete="off"
              hint={`Demo: ${preferDirect ? DEMO_CREDENTIALS.anonymousListener.inviteCode : DEMO_CREDENTIALS.listener.inviteCode}`}
            />
          ) : (
            <AppField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              autoComplete="username"
            />
          )}
          <AppField
            label={anonymous || preferDirect ? "Access password" : "Password"}
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
          <AppButton fullWidth variant="ghost" onClick={goBackToWelcome}>
            Open invitation instead
          </AppButton>
        </div>
      </form>
    </ListenerFrame>
  );
}

/**
 * Step 3 - In-app welcome hand-off after install / open.
 * Invitation context already lived in email - welcome them and move on.
 */
export function ListenerInvite() {
  const navigate = useNavigate();
  const { loginListener, invites } = useAppStore();
  const { inviteCode, partner } = useInvitePartner();
  const [error, setError] = useState("");
  const direct = isDirectAccessPartner(partner);

  function accept(e) {
    e.preventDefault();
    const invite = invites.find((i) => i.code.toUpperCase() === inviteCode.toUpperCase());
    const result = loginListener({
      email: invite?.email || (direct ? "" : DEMO_CREDENTIALS.listener.email),
      inviteCode,
      password: "",
      isInviteRedeem: true,
      isAnonymous: direct,
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
        className="relative flex h-full min-h-full flex-col overflow-hidden"
        style={{ background: "#141414", color: "#f3f3f3" }}
      >
        <StaggerStyles />

        <div className="relative flex flex-1 flex-col items-center justify-center px-7 py-10">
          <StaggerItem i={0} className="flex justify-center">
            <div
              className="flex items-center gap-3.5 rounded-full border px-4 py-2.5"
              style={{
                borderColor: "rgba(243, 242, 238, 0.12)",
                background: "rgba(243, 242, 238, 0.06)",
              }}
              aria-label={direct ? "Sonocea" : `Sonocea and ${partner.name}`}
            >
              <SystemLogoMark className="h-8 w-auto text-[#f3f3f3]" title="Sonocea" />
              {!direct ? (
                <>
                  <span
                    className="text-[13px] font-medium tracking-[0.04em] text-[#f3f3f3]/55"
                    aria-hidden
                  >
                    ×
                  </span>
                  <PartnerBrandMark partner={partner} />
                </>
              ) : null}
            </div>
          </StaggerItem>

          <StaggerItem i={1} className="mt-10 w-full text-center">
            <h1 className="mx-auto max-w-[18ch] text-[1.85rem] font-normal leading-[1.15] tracking-[-0.03em] text-[#f3f3f3]">
              Welcome to Sonocea.
            </h1>
          </StaggerItem>

          <StaggerItem i={2} className="mt-5 w-full text-center">
            <p
              className="mx-auto max-w-[34ch] text-[14px] leading-relaxed"
              style={{ color: "rgba(243, 242, 238, 0.58)" }}
            >
              {direct
                ? "We’ll ask a few questions so your home and sessions match what you need, then you can start listening."
                : `${partner.name} has invited you to experience Sonocea. We’ll help you get set up, then you can start listening.`}
            </p>
          </StaggerItem>

          {error ? (
            <p className="mt-4 text-center text-[13px] text-red-300">{error}</p>
          ) : null}

          <StaggerItem i={3} className="mt-10 w-full space-y-4">
            <button
              type="submit"
              className="w-full rounded-full px-5 py-3.5 text-[14px] font-medium tracking-tight transition-opacity hover:opacity-90"
              style={{ background: "#f3f2ee", color: "#141414" }}
            >
              Let’s get started
            </button>
            <p className="text-center text-[12px]" style={{ color: "rgba(243, 242, 238, 0.4)" }}>
              Already set up?{" "}
              <button
                type="button"
                className="font-medium underline-offset-2 hover:underline"
                style={{ color: "rgba(243, 242, 238, 0.85)" }}
                onClick={() =>
                  navigate(`/app/listener/login?code=${encodeURIComponent(inviteCode)}`)
                }
              >
                Sign in
              </button>
            </p>
          </StaggerItem>
        </div>
      </form>
    </ListenerFrame>
  );
}
