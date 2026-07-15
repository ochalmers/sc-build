import { Navigate, useSearchParams } from "react-router-dom";
import { NEUROTYPE_OPTIONS } from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { ListenerFrame } from "../../components/ListenerFrame.jsx";
import { AppBody, AppButton, AppTitle } from "../../components/ui.jsx";

const SYSTEM_STATES = [
  { id: "loading", label: "Loading", hideTabBar: true },
  { id: "offline", label: "Offline", hideTabBar: true },
  { id: "no-sessions", label: "No Sessions Assigned", hideTabBar: false },
  { id: "session-unavailable", label: "Session Unavailable", hideTabBar: true },
  { id: "playback-error", label: "Playback Error", hideTabBar: true },
  { id: "playback-interrupted", label: "Playback Interrupted", hideTabBar: true },
  { id: "invalid-invitation", label: "Invalid Invitation", hideTabBar: true },
  { id: "expired-invitation", label: "Expired Invitation", hideTabBar: true },
  { id: "access-revoked", label: "Access Revoked", hideTabBar: true },
  { id: "server-error", label: "Server Error", hideTabBar: true },
  { id: "maintenance", label: "Maintenance", hideTabBar: true },
];

const STATE_COPY = {
  loading: {
    title: "Loading your sessions…",
    message: "Fetching your assigned programme.",
    cta: null,
  },
  offline: {
    title: "No connection",
    message: "Check your network and try again.",
    cta: "Retry",
  },
  "no-sessions": {
    title: "No sessions assigned",
    message: "Your provider hasn't assigned any sessions yet. Check back later or contact them.",
    cta: "Contact organisation",
  },
  "session-unavailable": {
    title: "Session unavailable",
    message: "This session couldn't load. Try again or contact support.",
    cta: "Try again",
  },
  "playback-error": {
    title: "Playback error",
    message: "Something went wrong during playback. Please try again.",
    cta: "Try again",
  },
  "playback-interrupted": {
    title: "Playback interrupted",
    message: "Listening paused when you left the app. Tap to resume.",
    cta: "Resume",
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
  "server-error": {
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

function modeFromNeurotype(neurotypeId) {
  return NEUROTYPE_OPTIONS.find((n) => n.id === neurotypeId)?.mode ?? "regulation";
}

function StatePreview({ stateId }) {
  const copy = STATE_COPY[stateId] ?? STATE_COPY.offline;

  if (stateId === "loading") {
    return (
      <div className="flex flex-1 flex-col pb-6 pt-2">
        <div className="h-5 w-24 rounded" style={{ background: "var(--proto-border)" }} />
        <div className="mt-4 h-24 rounded-2xl" style={{ background: "var(--proto-surface)" }} />
        <div className="mt-6 space-y-2">
          {["100%", "88%", "76%", "92%"].map((width) => (
            <div
              key={width}
              className="h-3 rounded"
              style={{ width, background: "var(--proto-border)" }}
            />
          ))}
        </div>
        <div className="mt-6 space-y-2">
          {[1, 2, 3].map((row) => (
            <div
              key={row}
              className="h-12 rounded-xl"
              style={{ background: "var(--proto-surface)" }}
            />
          ))}
        </div>
        <p className="mt-auto pt-10 text-center text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
          {copy.title}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-center pb-6 pt-4 text-center">
      <AppTitle className="mt-3">{copy.title}</AppTitle>
      <AppBody className="mx-auto mt-3 max-w-[28ch]">{copy.message}</AppBody>
      {copy.cta ? (
        <div className="mt-8 space-y-2">
          <AppButton fullWidth>{copy.cta}</AppButton>
          <AppButton fullWidth variant="secondary">
            Contact support
          </AppButton>
        </div>
      ) : null}
    </div>
  );
}

/** 12 · System States — edge-case review surface */
export function ListenerSystemStates() {
  const { role, user, onboardingComplete, neurotypeId } = useAppStore();
  const [searchParams, setSearchParams] = useSearchParams();

  if (role !== "listener" || !user) return <Navigate to="/app/listener" replace />;
  if (!onboardingComplete) return <Navigate to="/app/listener/onboarding" replace />;
  if (!neurotypeId) return <Navigate to="/app/listener/neurotype" replace />;

  const mode = modeFromNeurotype(neurotypeId);
  const selectedId = searchParams.get("state") ?? "loading";
  const selected = SYSTEM_STATES.find((state) => state.id === selectedId) ?? SYSTEM_STATES[0];

  return (
    <ListenerFrame mode={mode} hideTabBar={selected.hideTabBar}>
      <div className="pb-4 pt-2">
        <AppTitle className="text-[1.5rem]">Edge cases</AppTitle>
        <AppBody className="mt-2">Preview loading, error, and empty states.</AppBody>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {SYSTEM_STATES.map((state) => {
            const on = state.id === selected.id;
            return (
              <button
                key={state.id}
                type="button"
                onClick={() => setSearchParams({ state: state.id })}
                className="rounded-full border px-2.5 py-1 text-[11px] transition-colors"
                style={{
                  borderColor: on ? "var(--proto-text)" : "var(--proto-border)",
                  background: on ? "var(--proto-surface)" : "transparent",
                  color: on ? "var(--proto-text)" : "var(--proto-text-muted)",
                }}
              >
                {state.label}
              </button>
            );
          })}
        </div>

        <div
          className="mt-6 min-h-[360px] rounded-2xl border p-4"
          style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
        >
          <StatePreview stateId={selected.id} />
        </div>
      </div>
    </ListenerFrame>
  );
}
