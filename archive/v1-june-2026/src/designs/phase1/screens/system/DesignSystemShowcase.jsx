import { AppTabBar } from "../../../shared/AppTabBar.jsx";
import { PlayerControls, ProgressBar } from "../../../shared/PlayerControls.jsx";
import {
  DARK_BG,
  DARK_TEXT,
  Phase1Input,
  PrimaryButton,
  SecondaryButton,
  SessionCard,
} from "../../shared/Phase1UI.jsx";
import { EXAMPLE_SESSIONS, getSessionGradient } from "../../shared/sessionArtwork.js";

export default function DesignSystemShowcase() {
  const sample = EXAMPLE_SESSIONS[0];
  return (
    <div className="flex h-full w-full flex-col overflow-hidden p-3" style={{ background: DARK_BG }}>
      <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.12em] text-white/50">Design system</p>

      <p className="mb-1.5 text-[8px] uppercase tracking-wider text-white/40">Buttons</p>
      <div className="mb-3 space-y-1.5">
        <PrimaryButton variant="dark">Primary</PrimaryButton>
        <SecondaryButton>Secondary</SecondaryButton>
      </div>

      <p className="mb-1.5 text-[8px] uppercase tracking-wider text-white/40">Input</p>
      <div className="mb-3">
        <Phase1Input placeholder="Access code" />
      </div>

      <p className="mb-1.5 text-[8px] uppercase tracking-wider text-white/40">Card</p>
      <div className="mb-3">
        <SessionCard gradient={getSessionGradient(sample)} title={sample.title} duration={sample.duration} compact />
      </div>

      <p className="mb-1.5 text-[8px] uppercase tracking-wider text-white/40">Navigation</p>
      <div className="relative mb-3 h-14 overflow-hidden rounded-lg border border-white/10">
        <AppTabBar active="today" variant="dark" />
      </div>

      <p className="mb-1.5 text-[8px] uppercase tracking-wider text-white/40">Player</p>
      <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.05)" }}>
        <ProgressBar progress={0.35} time="3:24" />
        <div className="mt-4 scale-75">
          <PlayerControls />
        </div>
      </div>

      <p className="mt-3 text-[8px] text-white/35" style={{ color: DARK_TEXT, opacity: 0.35 }}>
        Tokens · Aeonik · Dark primary
      </p>
    </div>
  );
}
