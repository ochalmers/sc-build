import {
  WireframePhone,
  WfTag,
  WfButton,
  WfField,
  WfTabBar,
  WfSessionRow,
} from "./WireframePhone.jsx";
import { WIREFRAME_EXTRAS } from "./wireframeExtras.jsx";
import { KEY_SCREEN_WIREFRAMES } from "./keyScreenWireframes.jsx";
import { PUBLIC_VISITOR_WIREFRAMES } from "./publicVisitorWireframes.jsx";

function ScreenSplash() {
  return (
    <WireframePhone label="Splash / brand intro">
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-6">
        <div className="h-24 w-24 rounded-[28px] border-2 border-dashed border-[#A1A1AA] bg-[#E4E4E7]" />
        <p className="mt-5 text-[20px] font-bold tracking-tight">Sonocea</p>
        <p className="mt-2 text-center text-[11px] leading-relaxed text-[#71717A]">
          Wireframe · Splash / brand intro
          <br />
          Optional video or motion
        </p>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Continue</WfButton>
        <p className="text-center text-[11px] font-medium text-[#71717A]">Invite-only access</p>
      </div>
    </WireframePhone>
  );
}

function ScreenLogin({ partner = false }) {
  return (
    <WireframePhone label={partner ? "Partner code entry" : "Enter invite"}>
      <WfTag>Wireframe — login</WfTag>
      <div className="flex-1 px-5 pt-2">
        <h2 className="text-[18px] font-bold leading-tight">
          {partner ? "Partner code" : "Enter your invite"}
        </h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          {partner
            ? "Organization-provisioned code opens listening access."
            : "Unique link or Partner-provisioned code."}
        </p>
        <div className="mt-5 space-y-4">
          <WfField
            label="Invite code"
            placeholder={partner ? "e.g. PARTNER-XXXX" : "e.g. SON-XXXX-XXXX"}
          />
          {!partner ? <WfField label="Email (optional)" placeholder="you@email.com" /> : null}
        </div>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Continue</WfButton>
        {!partner ? (
          <p className="text-center text-[12px] font-medium text-[#3F3F46]">
            Have a Partner code instead?
          </p>
        ) : null}
      </div>
    </WireframePhone>
  );
}

function ScreenOnboarding() {
  return (
    <WireframePhone label="Science education">
      <WfTag>Wireframe — onboarding</WfTag>
      <div className="flex-1 px-5 pt-2">
        <div className="flex gap-1.5 pb-3">
          <div className="h-1 w-7 rounded-full bg-[#18181B]" />
          <div className="h-1 w-7 rounded-full bg-[#E4E4E7]" />
          <div className="h-1 w-7 rounded-full bg-[#E4E4E7]" />
        </div>
        <div className="flex h-28 items-center justify-center rounded-2xl border-2 border-dashed border-[#D4D4D8] bg-[#F4F4F5] text-[11px] font-medium text-[#71717A]">
          Illustration / short loop
        </div>
        <h2 className="mt-4 text-[16px] font-bold">Why sonic augmentation</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          How Sessions work, headphones, environment, and listening posture.
        </p>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Next</WfButton>
        <p className="text-center text-[12px] font-medium text-[#71717A]">Back</p>
      </div>
    </WireframePhone>
  );
}

function ScreenNeurotype() {
  const options = [
    { title: "Neurotypical", sub: "Short supporting line", selected: false },
    { title: "Low-support neurodivergent", sub: "Short supporting line", selected: false },
    { title: "Higher-support neurodivergent", sub: "Short supporting line", selected: true },
  ];
  return (
    <WireframePhone label="Neurotype questionnaire">
      <WfTag>Wireframe — neurotype</WfTag>
      <div className="flex-1 px-5 pt-2">
        <h2 className="text-[18px] font-bold">Your listening profile</h2>
        <p className="mt-2 text-[11px] text-[#52525B]">
          Pick the description that best fits for recommendations.
        </p>
        <div className="mt-4 space-y-2.5">
          {options.map((o) => (
            <div
              key={o.title}
              className="flex gap-3 rounded-xl border border-[#E4E4E7] p-3"
              style={{ background: o.selected ? "#FAFAFA" : "transparent" }}
            >
              <div
                className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2"
                style={{ borderColor: o.selected ? "#18181B" : "#A1A1AA" }}
              />
              <div>
                <p className="text-[12px] font-semibold">{o.title}</p>
                <p className="text-[10px] text-[#71717A]">{o.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-6">
        <WfButton>Continue</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenLibrary() {
  return (
    <WireframePhone label="Sessions library">
      <div className="flex items-center justify-between px-5 pt-1">
        <WfTag>Wireframe — library</WfTag>
        <div className="h-7 w-7 rounded-lg border border-dashed border-[#D4D4D8] bg-[#FAFAFA]" />
      </div>
      <div className="px-5">
        <h2 className="text-[18px] font-bold">Sessions</h2>
        <div className="mt-3 rounded-[10px] border border-[#E4E4E7] px-3 py-2 text-[11px] text-[#A1A1AA]">
          Search provisioned Sessions…
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-[#18181B] px-2.5 py-1 text-[9px] font-semibold text-white">
            All
          </span>
          {["Duration", "Use case"].map((c) => (
            <span
              key={c}
              className="rounded-full border border-[#E4E4E7] px-2.5 py-1 text-[9px] font-semibold text-[#52525B]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2 flex-1 overflow-hidden">
        <WfSessionRow title="Arrive · settle" meta="14 min · Regulation · Assigned" />
        <WfSessionRow title="Deep unwind" meta="22 min · Evening · Assigned" />
        <WfSessionRow title="Focus reset" meta="18 min · Daytime · Assigned" />
      </div>
      <WfTabBar active="sessions" />
    </WireframePhone>
  );
}

function ScreenFavorites() {
  return (
    <WireframePhone label="Favorites">
      <div className="px-5 pt-2">
        <WfTag>Wireframe — favorites</WfTag>
        <h2 className="text-[18px] font-bold">Saved Sessions</h2>
      </div>
      <div className="mt-2 flex-1">
        <WfSessionRow title="Bookmarked Session A" meta="12 min · Tagged favorite" />
        <WfSessionRow title="Bookmarked Session B" meta="20 min" />
      </div>
      <WfTabBar active="saved" />
    </WireframePhone>
  );
}

function ScreenDetail({ download = false, downloaded = false }) {
  return (
    <WireframePhone
      label={
        downloaded ? "Download complete" : download ? "Download for offline" : "Session detail"
      }
    >
      <div className="flex h-28 items-center justify-center border-b-2 border-dashed border-[#D4D4D8] bg-[#F4F4F5] text-[11px] font-medium text-[#71717A]">
        Artwork / waveform still
      </div>
      <div className="flex-1 px-5 pt-3">
        <WfTag>Wireframe — session detail</WfTag>
        <h2 className="text-[17px] font-bold">Arrive · settle</h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["14 min", "Regulation", "Your profile"].map((c) => (
            <span key={c} className="rounded-lg bg-[#F4F4F5] px-2 py-1 text-[10px] font-medium text-[#52525B]">
              {c}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-[#52525B]">
          Purpose, audience fit, benefits — clinical-friendly description placeholder.
        </p>
        {downloaded ? (
          <p className="mt-3 rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-[10px] font-semibold text-[#52525B]">
            ✓ Saved for offline · encrypted
          </p>
        ) : null}
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Play</WfButton>
        <WfButton primary={false}>{download || downloaded ? "Remove download" : "Download for offline"}</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenPlayer({ offline = false }) {
  return (
    <WireframePhone label={offline ? "Offline playback" : "Player"} dark>
      <WfTag>Wireframe — player</WfTag>
      <div className="mx-3 mb-3 flex flex-1 flex-col rounded-[18px] bg-[#0A0A0A] p-3">
        <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-wider text-[#A1A1AA]">
          <span>Now playing</span>
          {offline ? <span className="text-[#71717A]">Offline</span> : <span>↓</span>}
        </div>
        <p className="mt-2 text-[15px] font-bold text-[#FAFAFA]">Arrive · settle</p>
        <p className="text-[10px] text-[#A1A1AA]">14:00 · Regulation · {offline ? "Encrypted file" : "Encrypted stream"}</p>
        <div className="my-3 flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#3F3F46] bg-[#18181B] text-[10px] text-[#A1A1AA]">
          Brand visualization
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-[#27272A]">
          <div className="h-full w-[38%] rounded-full bg-[#FAFAFA]" />
        </div>
        <div className="mt-1.5 flex justify-between text-[9px] text-[#A1A1AA]">
          <span>05:18</span>
          <span>−08:42</span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-8 pb-1 text-[#E4E4E7]">
          <span className="text-lg font-bold">«</span>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAFAFA] text-[#0A0A0A]">
            ▶
          </div>
          <span className="text-lg font-bold">»</span>
        </div>
        <div className="mt-2 flex justify-between px-2 text-[8px] font-semibold text-[#71717A]">
          <span>Repeat</span>
          <span>Queue</span>
          <span>AirPlay</span>
        </div>
      </div>
      <p className="px-5 pb-4 text-center text-[9px] text-[#71717A]">
        Respects Focus / DND · background audio
      </p>
    </WireframePhone>
  );
}

function ScreenFeedback({ app = false }) {
  return (
    <WireframePhone label={app ? "App experience feedback" : "Post-session feedback"}>
      <WfTag>Wireframe — feedback</WfTag>
      <div className="flex-1 px-5 pt-2">
        <h2 className="text-[16px] font-bold">
          {app ? "How is the app experience?" : "How was this Session?"}
        </h2>
        <p className="mt-2 text-[11px] text-[#52525B]">
          {app ? "Periodic prompt · frequency caps · skip" : "Post-completion · optional comment"}
        </p>
        <div className="mt-4 flex justify-between gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-9 rounded-[10px] border border-[#E4E4E7] bg-[#FAFAFA]" />
          ))}
        </div>
        <p className="mt-5 text-[10px] font-semibold text-[#52525B]">Optional note</p>
        <div className="mt-1.5 min-h-[72px] rounded-xl border border-[#D4D4D8] px-3 py-2 text-[11px] text-[#A1A1AA]">
          Share a sentence (optional)
        </div>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Submit feedback</WfButton>
        <p className="text-center text-[12px] font-semibold text-[#71717A]">Skip</p>
      </div>
    </WireframePhone>
  );
}

function ScreenAbout() {
  const rows = ["Privacy policy", "Terms of use", "Open-source notices"];
  return (
    <WireframePhone label="About Sonocea">
      <div className="flex-1 px-5 pt-2">
        <div className="flex items-center justify-between">
          <WfTag>Wireframe — about</WfTag>
          <span className="text-[12px] font-semibold">Done</span>
        </div>
        <div className="mt-3 h-14 w-14 rounded-2xl border-2 border-dashed border-[#D4D4D8] bg-[#E4E4E7]" />
        <h2 className="mt-4 text-[18px] font-bold">About Sonocea</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          Company blurb, SAT™ overview, compliance-reviewed copy placeholder.
        </p>
        <div className="mt-5">
          {rows.map((r) => (
            <div
              key={r}
              className="flex items-center justify-between border-b border-[#F4F4F5] py-3 text-[12px] font-semibold"
            >
              {r}
              <span className="text-[#A1A1AA]">›</span>
            </div>
          ))}
        </div>
      </div>
    </WireframePhone>
  );
}

function ScreenSupport() {
  const rows = [
    { title: "Email support", sub: "support@…" },
    { title: "FAQ", sub: "Playback, invites, offline" },
    { title: "Data & privacy request", sub: "Export / delete pathways" },
  ];
  return (
    <WireframePhone label="Support">
      <div className="flex-1 px-5 pt-2">
        <WfTag>Wireframe — support</WfTag>
        <h2 className="text-[18px] font-bold">Help</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          Account access, playback, downloads, and privacy requests.
        </p>
        <div className="mt-4">
          {rows.map((r) => (
            <div key={r.title} className="flex justify-between gap-3 border-b border-[#F4F4F5] py-3">
              <div>
                <p className="text-[12px] font-semibold">{r.title}</p>
                <p className="text-[10px] text-[#71717A]">{r.sub}</p>
              </div>
              <span className="text-[#A1A1AA]">›</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-6">
        <WfButton primary={false}>Contact Partner administrator</WfButton>
      </div>
    </WireframePhone>
  );
}

function ScreenMarketing() {
  return (
    <WireframePhone label="Public marketing (no playback)">
      <div className="flex flex-1 flex-col px-5 pt-4">
        <WfTag>Wireframe — public</WfTag>
        <div className="mt-4 flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-[#D4D4D8] bg-[#F4F4F5] text-[11px] text-[#71717A]">
          Logo / video / SAT™ explain
        </div>
        <h2 className="mt-5 text-[16px] font-bold">The science of sound</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#52525B]">
          Education only — no Session playback until invite redemption.
        </p>
      </div>
      <div className="space-y-2 px-5 pb-6">
        <WfButton>Speak with a clinician</WfButton>
        <WfButton primary={false}>Join mailing list</WfButton>
      </div>
    </WireframePhone>
  );
}

const MOBILE = { variant: "mobile" };

/** @type {Record<string, { Component: () => JSX.Element; title: string; variant?: string }>} */
const BASE_REGISTRY = {
  splash: { Component: ScreenSplash, title: "Splash", ...MOBILE },
  login: { Component: () => <ScreenLogin />, title: "Login", ...MOBILE },
  "login-partner": { Component: () => <ScreenLogin partner />, title: "Partner code", ...MOBILE },
  onboarding: { Component: ScreenOnboarding, title: "Onboarding", ...MOBILE },
  neurotype: { Component: ScreenNeurotype, title: "Neurotype", ...MOBILE },
  library: { Component: ScreenLibrary, title: "Library", ...MOBILE },
  favorites: { Component: ScreenFavorites, title: "Favorites", ...MOBILE },
  detail: { Component: () => <ScreenDetail />, title: "Session detail", ...MOBILE },
  "detail-download": { Component: () => <ScreenDetail download />, title: "Download", ...MOBILE },
  "detail-downloaded": { Component: () => <ScreenDetail downloaded />, title: "Downloaded", ...MOBILE },
  player: { Component: () => <ScreenPlayer />, title: "Player", ...MOBILE },
  "player-offline": { Component: () => <ScreenPlayer offline />, title: "Player offline", ...MOBILE },
  feedback: { Component: () => <ScreenFeedback />, title: "Feedback", ...MOBILE },
  "feedback-app": { Component: () => <ScreenFeedback app />, title: "App feedback", ...MOBILE },
  about: { Component: ScreenAbout, title: "About", ...MOBILE },
  support: { Component: ScreenSupport, title: "Support", ...MOBILE },
  marketing: { Component: ScreenMarketing, title: "Marketing", ...MOBILE },
};

export const WIREFRAME_REGISTRY = {
  ...BASE_REGISTRY,
  ...Object.fromEntries(
    Object.entries(WIREFRAME_EXTRAS).map(([id, { Component, variant }]) => [
      id,
      { Component, title: id, variant },
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(KEY_SCREEN_WIREFRAMES).map(([id, { Component, variant }]) => [
      id,
      { Component, title: id, variant },
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(PUBLIC_VISITOR_WIREFRAMES).map(([id, { Component, title, variant }]) => [
      id,
      { Component, title, variant },
    ]),
  ),
};

export function WireframeById({ wireframeId }) {
  const entry = WIREFRAME_REGISTRY[wireframeId];
  if (!entry) {
    return (
      <div className="flex h-[420px] w-[260px] items-center justify-center rounded-[2rem] border border-dashed border-ink-200 bg-paper-100 text-[11px] text-ink-500">
        Screen pending
      </div>
    );
  }
  const { Component } = entry;
  return <Component />;
}
