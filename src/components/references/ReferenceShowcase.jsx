function AppScreen({ screen, label }) {
  return (
    <a
      href={screen.mobbinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group/screen block shrink-0"
      aria-label={label ? `View ${label} on Mobbin` : "View on Mobbin"}
    >
      <div className="w-[min(100%,280px)] overflow-hidden rounded-[1.75rem] border border-ink-200 bg-white shadow-appScreen transition-shadow duration-300 group-hover/screen:shadow-soft sm:w-[min(100%,300px)]">
        <img
          src={screen.image}
          alt=""
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>
    </a>
  );
}

function ReferenceEntry({ item }) {
  const mobbinUrl = item.screens[0]?.mobbinUrl;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-card">
      <div className="flex justify-center gap-4 overflow-x-auto border-b border-ink-200/60 bg-paper-100/60 px-6 py-8 md:px-8 md:py-10">
        {item.screens.map((screen, index) => (
          <AppScreen key={index} screen={screen} label={`${item.title} — ${item.app}`} />
        ))}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h4 className="text-[17px] font-medium tracking-tight text-ink-950">{item.title}</h4>
          <span className="text-[12px] text-ink-400">·</span>
          <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink-500">{item.app}</span>
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-700">{item.note}</p>
        {mobbinUrl ? (
          <a
            href={mobbinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex pt-5 text-[12px] font-medium text-ink-700 underline-offset-4 hover:underline"
          >
            View on Mobbin →
          </a>
        ) : null}
      </div>
    </article>
  );
}

function ReferenceScreenGroup({ group }) {
  return (
    <div className="mb-14 last:mb-0">
      <div className="mb-8 border-b border-ink-200/60 pb-5">
        <h3 className="text-[clamp(1.1rem,2vw,1.35rem)] font-medium tracking-tight text-ink-950">
          {group.title}
        </h3>
        {group.purpose ? (
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-600">{group.purpose}</p>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10">
        {group.items.map((item) => (
          <ReferenceEntry key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function ReferenceShowcase({ screenGroups }) {
  return (
    <div>
      {screenGroups.map((group) => (
        <ReferenceScreenGroup key={group.id} group={group} />
      ))}
    </div>
  );
}
