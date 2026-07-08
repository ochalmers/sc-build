const NAV_LINKS = ["What", "How", "Science", "Partnerships", "About"];

function PillNav() {
  return (
    <nav
      className="flex w-full max-w-[788px] items-center justify-between rounded-full bg-[rgba(8,8,8,0.7)] py-2.5 pl-5 pr-2.5 backdrop-blur-[15px]"
      aria-label="Marketing"
    >
      <img
        src="/concepts/hero-logo.png"
        alt="Sonocea"
        className="h-[26px] w-auto shrink-0"
        decoding="async"
      />
      <ul className="hidden items-center md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <span className="px-2 py-2.5 text-[15px] font-medium capitalize tracking-[-0.45px] text-[#edefe8]">
              {link}
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="shrink-0 rounded-[20px] bg-[#3401ff] px-[15px] py-2.5 text-[15px] font-medium capitalize tracking-[-0.45px] text-[#edefe8]"
      >
        Try Sonocea
      </button>
    </nav>
  );
}

function ApplicationsAxis() {
  return (
    <div
      className="pointer-events-none absolute bottom-[90px] left-0 hidden lg:block"
      aria-hidden
    >
      <div className="relative pl-6">
        <div className="absolute bottom-0 left-[38px] top-0 w-px bg-[#080808]" />
        <div className="absolute left-[38px] top-0 h-px w-10 bg-[#080808]" />
        <div className="absolute left-[38px] top-[85px] h-px w-10 bg-[#080808]" />
        <p className="absolute bottom-0 right-full mr-4 w-[214px] text-right text-[25px] font-medium uppercase leading-[1.2] tracking-[1.25px] text-[#080808]">
          Applications
        </p>
      </div>
    </div>
  );
}

function GlitchSlices({ imageSrc }) {
  const slices = [
    { left: "0%", width: "2.2%", offset: 0 },
    { left: "2.4%", width: "1.8%", offset: -12 },
    { left: "4.6%", width: "2.5%", offset: 8 },
    { left: "7.4%", width: "1.5%", offset: -20 },
    { left: "9.2%", width: "2%", offset: 14 },
    { left: "11.5%", width: "1.2%", offset: -8 },
  ];

  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[14%] overflow-hidden" aria-hidden>
      {slices.map((slice, index) => (
        <div
          key={index}
          className="absolute inset-y-[-8%] bg-cover bg-center opacity-90"
          style={{
            left: slice.left,
            width: slice.width,
            backgroundImage: `url(${imageSrc})`,
            transform: `translateY(${slice.offset}px)`,
            filter: index % 2 === 0 ? "brightness(1.05)" : "brightness(0.92)",
          }}
        />
      ))}
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-[#141414]/20" />
    </div>
  );
}

export default function GtmHero({ glitch = true, imageSrc = "/concepts/hero-bg.jpg" }) {
  return (
    <div className="relative aspect-[1440/800] min-h-[min(800px,90dvh)] w-full overflow-hidden bg-[#141414] text-[#edefe8]">
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        decoding="async"
      />

      {glitch ? <GlitchSlices imageSrc={imageSrc} /> : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[47%] bg-gradient-to-t from-[#080808] to-transparent" />

      <ApplicationsAxis />

      <div className="relative z-[3] flex flex-col items-center px-[30px] pt-[30px]">
        <PillNav />
      </div>

      <div className="relative z-[3] flex h-full flex-col items-center justify-center px-6 pb-[18%] pt-24 text-center md:px-10">
        <h2 className="max-w-[min(100%,1190px)] text-[clamp(2.25rem,5.8vw,5.15rem)] font-normal leading-none tracking-[-0.79px]">
          Welcome to the Sonic Revolution
        </h2>

        <div className="mt-10 flex max-w-[654px] flex-col items-center gap-5">
          <div className="text-[clamp(1rem,1.6vw,1.25rem)] leading-none tracking-[-0.45px]">
            <p>A New Frontier in Nervous System Support</p>
            <p className="mt-4">The Sound of Science</p>
            <p className="mt-4 leading-snug">
              Grounded in decades of autonomic and neurophysiological research.
              <br />
              Precision acoustic regulation, engineered for scale.
            </p>
          </div>
          <button
            type="button"
            className="rounded-[20px] bg-[#3401ff] px-[15px] py-2.5 text-[15px] font-medium capitalize tracking-[-0.45px]"
          >
            Try Sonocea
          </button>
        </div>
      </div>
    </div>
  );
}
