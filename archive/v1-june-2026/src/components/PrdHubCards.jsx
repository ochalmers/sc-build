import { Link } from "react-router-dom";
import { PRD_HUB_LINKS } from "../config/siteNav.js";

export default function PrdHubCards() {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {PRD_HUB_LINKS.map((prd) => (
        <article
          key={prd.id}
          className="rounded-2xl border border-ink-200/80 bg-white/70 p-6 md:p-7"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent-clay">PRD</p>
          <h2 className="mt-2 text-[18px] font-medium tracking-tight text-ink-950">{prd.label}</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{prd.subtitle}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={prd.download}
              download={prd.downloadLabel}
              className="rounded-full border border-accent-clay/40 bg-accent-clay/10 px-3.5 py-1.5 text-[12px] font-medium text-ink-900 transition-colors hover:border-accent-clay/60 hover:bg-accent-clay/15"
            >
              Download PRD
            </a>
            <Link
              to={prd.flows}
              className="rounded-full border border-ink-200/80 bg-paper-100 px-3.5 py-1.5 text-[12px] font-medium text-ink-800 transition-colors hover:border-ink-300"
            >
              Flows
            </Link>
            <Link
              to={prd.design}
              className="rounded-full border border-ink-950 bg-ink-950 px-3.5 py-1.5 text-[12px] font-medium text-paper-100 transition-colors hover:bg-ink-800"
            >
              Design
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
