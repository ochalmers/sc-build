function IconSpeaker() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 8v4h3l4 3V5L6 8H3z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M13 7.5a3.5 3.5 0 010 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconSkip({ direction = "back" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      style={direction === "forward" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M6 5v10M14 5l-5 5 5 5" strok e="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
      <circle cx="26" cy="26" r="25" stroke="white" strokeWidth="1.2" />
      <path d="M20 17v18M32 17v18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 16.5s-6-3.8-6-7.5a3.2 3.2 0 016-1.5 3.2 3.2 0 016 1.5c0 3.7-6 7.5-6 7.5z"
        stroke="white"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayerControls() {
  return (
    <div className="flex w-full items-center justify-between px-2">
      <IconSpeaker />
      <IconSkip direction="back" />
      <IconPause />
      <IconSkip direction="forward" />
      <IconHeart />
    </div>
  );
}

export function ProgressBar({ progress = 0.28, time = "1:01" }) {
  return (
    <div className="relative px-0">
      <div className="h-[1.5px] w-full bg-white/30">
        <div className="h-full bg-white" style={{ width: `${progress * 100}%` }} />
      </div>
      <div
        className="absolute top-0 h-[30px] w-[1.5px] bg-white"
        style={{ left: `${progress * 100}%`, transform: "translateX(-50%)" }}
      />
      <p
        className="absolute -top-4 text-[13px] text-[#FDFDFD] tracking-[-0.25px]"
        style={{ left: `${progress * 100}%`, transform: "translateX(-50%)" }}
      >
        {time}
      </p>
    </div>
  );
}
