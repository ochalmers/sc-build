import { AppTabBar } from "../shared/AppTabBar.jsx";
import { GrainOverlay } from "../shared/GrainOverlay.jsx";

export default function DiscoverScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FDFDFD]">
      <img
        src="/assets/designs/phase1/discover.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(180,240,220,0.3) 0%, rgba(100,200,180,0.5) 40%, rgba(60,160,150,0.6) 100%)",
        }}
        aria-hidden
      />
      <GrainOverlay opacity={0.45} />
      <div
        className="absolute inset-x-0 bottom-[66px] h-44"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #FDFDFD 85%)",
        }}
        aria-hidden
      />
      <AppTabBar active="home" variant="light" />
    </div>
  );
}
