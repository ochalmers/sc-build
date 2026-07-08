import { GrainOverlay } from "../shared/GrainOverlay.jsx";
import { PlayerControls, ProgressBar } from "../shared/PlayerControls.jsx";

export default function SessionPlayerScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src="/assets/designs/phase1/session-player.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,160,120,0.15) 0%, rgba(180,60,50,0.35) 55%, rgba(80,20,30,0.55) 100%)",
        }}
        aria-hidden
      />
      <GrainOverlay opacity={0.4} />
      <div
        className="absolute inset-x-0 bottom-0 backdrop-blur-md"
        style={{
          height: "55%",
          background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 100%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 px-8 pb-10 pt-16">
        <ProgressBar progress={0.28} time="1:01" />
        <PlayerControls />
      </div>
    </div>
  );
}
