import { AppTabBar } from "../shared/AppTabBar.jsx";

const CARDS = [
  {
    gradient: "linear-gradient(135deg, #E8A080 0%, #C05040 50%, #802030 100%)",
  },
  {
    gradient: "linear-gradient(135deg, #D0D0D0 0%, #909090 50%, #606060 100%)",
  },
  {
    gradient: "linear-gradient(135deg, #C0B0FF 0%, #9080E0 50%, #6050B0 100%)",
  },
  {
    gradient: "linear-gradient(135deg, #E8D8C0 0%, #C0A890 50%, #988060 100%)",
  },
];

function PlayChip() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M3 2v8l7-4-7-4z" fill="white" />
      </svg>
    </span>
  );
}

function LibraryCard({ gradient }) {
  return (
    <div
      className="relative flex h-[104px] items-center overflow-hidden rounded-[14px] px-4"
      style={{ background: gradient }}
    >
      <PlayChip />
    </div>
  );
}

export default function SessionLibraryScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FDFDFD]">
      <div className="flex h-full flex-col gap-1 overflow-hidden p-3.5 pb-[74px]">
        {CARDS.map((card, i) => (
          <LibraryCard key={i} gradient={card.gradient} />
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[66px] h-32"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #FDFDFD 90%)",
        }}
        aria-hidden
      />
      <AppTabBar active="today" variant="light" />
    </div>
  );
}
