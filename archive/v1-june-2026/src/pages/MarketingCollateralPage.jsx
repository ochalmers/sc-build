import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import { FlowSection } from "../flows/FlowSection.jsx";
import {
  COLLATERAL_PRIORITIES,
  COLLATERAL_STATUSES,
  MARKETING_COLLATERAL_CATEGORIES,
  MARKETING_COLLATERAL_META,
  MARKETING_COLLATERAL_RELATED,
  MARKETING_COLLATERAL_SUMMARY,
} from "../content/marketingCollateral.js";

function SpecList({ title, items }) {
  if (!items?.length) return null;

  return (
    <div>
      <h4 className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-700">
            <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-ink-300" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusBadge({ status }) {
  const meta = COLLATERAL_STATUSES[status] ?? COLLATERAL_STATUSES.planned;
  const toneClass =
    meta.tone === "done"
      ? "border-emerald-200/80 bg-emerald-50 text-emerald-800"
      : meta.tone === "active"
        ? "border-amber-200/80 bg-amber-50 text-amber-900"
        : meta.tone === "review"
          ? "border-sky-200/80 bg-sky-50 text-sky-900"
          : "border-ink-200/80 bg-paper-100 text-ink-600";

  return (
    <span className={`rounded-full border px-3 py-1 text-[11px] font-medium ${toneClass}`}>
      {meta.label}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const isP0 = priority === "P0";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-[11px] font-medium ${
        isP0
          ? "border-ink-300/60 bg-ink-950 text-white"
          : priority === "P1"
            ? "border-ink-200/80 bg-white text-ink-700"
            : "border-ink-200/60 bg-paper-100 text-ink-500"
      }`}
      title={COLLATERAL_PRIORITIES[priority]?.note}
    >
      {priority}
    </span>
  );
}

function CollateralCard({ item }) {
  return (
    <article
      id={item.id}
      className="scroll-mt-[7rem] rounded-2xl border border-ink-200/80 bg-white/55 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-[clamp(1.05rem,2vw,1.25rem)] font-medium tracking-tight text-ink-950">
            {item.title}
          </h3>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-600">{item.description}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <PriorityBadge priority={item.priority} />
          <StatusBadge status={item.status} />
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <SpecList title="Formats" items={item.formats} />
        <SpecList title="Specs" items={item.specs} />
        <SpecList title="Deliverables" items={item.deliverables} />
      </div>

      {item.notes ? (
        <p className="mt-6 rounded-xl border border-ink-200/60 bg-paper-100/60 px-4 py-3 text-[12px] leading-relaxed text-ink-600">
          <span className="font-medium text-ink-800">Note · </span>
          {item.notes}
        </p>
      ) : null}
    </article>
  );
}

export default function MarketingCollateralPage() {
  return (
    <SiteChrome>
      <main className="pt-[4.25rem]">
        <section
          id="collateral-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-16 md:pb-28 md:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                {MARKETING_COLLATERAL_META.subtitle}
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                {MARKETING_COLLATERAL_META.title}
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                {MARKETING_COLLATERAL_META.description}
              </p>

              <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {MARKETING_COLLATERAL_SUMMARY.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-ink-200/80 bg-white/70 px-4 py-4"
                  >
                    <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 text-[13px] font-medium text-ink-800">{item.count}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap gap-3 text-[12px] text-ink-600">
                {Object.entries(COLLATERAL_PRIORITIES).map(([key, val]) => (
                  <span
                    key={key}
                    className="rounded-full border border-ink-200/70 bg-white/60 px-3 py-1.5"
                  >
                    <span className="font-medium text-ink-800">{val.label}</span>
                    <span className="text-ink-500"> — {val.note}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {MARKETING_COLLATERAL_CATEGORIES.map((category) => (
          <FlowSection
            key={category.id}
            id={category.id}
            label={category.label}
            title={category.title}
            description={category.description}
          >
            <div className="space-y-8">
              {category.items.map((item) => (
                <CollateralCard key={item.id} item={item} />
              ))}
            </div>
          </FlowSection>
        ))}

        <section className="border-b border-ink-200/60 py-20 md:py-28">
          <div className="max-w-content mx-auto px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">Related</p>
            <h2 className="mt-3 text-[clamp(1.35rem,3vw,1.75rem)] font-medium tracking-tight text-ink-950">
              Connected workstreams
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {MARKETING_COLLATERAL_RELATED.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex flex-col rounded-2xl border border-ink-200/80 bg-white/55 p-5 transition-colors hover:border-ink-300 hover:bg-white/80"
                  >
                    <span className="text-[14px] font-medium text-ink-900">{link.label}</span>
                    <span className="mt-1 text-[12px] text-ink-500">{link.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
