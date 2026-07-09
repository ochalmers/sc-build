import { AppTabBar } from "../shared/AppTabBar.jsx";

function PlayButton() {
  return (
    <button
      type="button"
      className="flex h-[78px] w-[78px] items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
      aria-label="Play session"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 6.5v11l9-5.5-9-5.5z" fill="white" />
      </svg>
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="border-b border-[#DDD]/30 pb-1.5">
      <p className="text-[10px] uppercase tracking-[0.5px] text-[#DDD]">{children}</p>
    </div>
  );
}

export default function SessionDetailScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#201E2A]">
      <div className="relative h-[58%] w-full overflow-hidden">
        <img
          src="/assets/designs/phase1/session-detail.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 40%, rgba(32,30,42,0.95) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayButton />
        </div>
      </div>
      <div className="relative -mt-6 flex flex-col gap-3 overflow-hidden px-3.5 pb-[74px]">
        <h1 className="text-[26px] leading-none tracking-[-0.25px] text-[#DDD]">Sleep</h1>
        <SectionLabel>About</SectionLabel>
        <p className="text-[12px] leading-[1.4] tracking-[-0.25px] text-[#DDD]">
          A sound-based session designed to regulate your nervous system and ground your state. Blending sonic
          augmentation with breath pacing and calming textures, this short experience is tailored to help you shift
          from stress to stillness. Perfect for transitions, overwhelm, or winding down—no prior experience needed.
        </p>
      </div>
      <AppTabBar active="today" variant="dark" />
    </div>
  );
}
