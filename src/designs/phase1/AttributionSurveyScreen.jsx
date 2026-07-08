import { GrainOverlay } from "../shared/GrainOverlay.jsx";

const OPTIONS = [
  "Influencer",
  "Friend",
  "Instagram",
  "Facebook",
  "Magazine Ad",
  "TikTok",
  "Podcast",
  "Other",
];

function Tag({ label, selected = false }) {
  return (
    <span
      className="inline-flex h-10 items-center justify-center rounded-full px-5 text-[13px] tracking-[-0.25px]"
      style={{
        background: selected ? "#080808" : "rgba(255,255,255,0.4)",
        color: selected ? "#FDFDFD" : "#080808",
      }}
    >
      {label}
    </span>
  );
}

export default function AttributionSurveyScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#EBE6FF]">
      <img
        src="/assets/designs/phase1/attribution-survey.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,200,160,0.5) 0%, rgba(230,120,80,0.75) 45%, rgba(200,80,50,0.85) 100%)",
        }}
        aria-hidden
      />
      <GrainOverlay opacity={0.25} />
      <div className="relative flex h-full flex-col px-6 pb-6 pt-[52%]">
        <h1 className="text-[36px] leading-none tracking-[-0.34px] text-[#F3F3F3]">How did you find us?</h1>
        <div className="mt-auto flex flex-wrap gap-2">
          {OPTIONS.map((opt) => (
            <Tag key={opt} label={opt} selected={opt === "Podcast"} />
          ))}
        </div>
        <button
          type="button"
          className="mt-5 flex h-10 w-full items-center justify-center rounded-full bg-white/50 text-[13px] text-[#080808]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
