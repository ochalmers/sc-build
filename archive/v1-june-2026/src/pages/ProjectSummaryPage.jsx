import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import PrdHubCards from "../components/PrdHubCards.jsx";
import { FlowSection } from "../flows/FlowSection.jsx";
import { PROJECT_SUMMARY_META, PROJECT_SUMMARY_SECTIONS } from "../content/projectSummary.js";

function BulletList({ items }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.term ?? item.detail} className="flex gap-3 text-[14px] leading-relaxed text-ink-700">
          <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" aria-hidden />
          <span>
            {item.term ? (
              <>
                <span className="font-medium text-ink-900">{item.term}</span>
                <span className="text-ink-600"> — {item.detail}</span>
              </>
            ) : (
              item.detail
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function RoleCards({ cards }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <div key={card.role} className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">{card.surface}</p>
          <h3 className="mt-2 text-[18px] font-medium tracking-tight text-ink-950">{card.role}</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-600">{card.summary}</p>
          {card.prd ? (
            <p className="mt-3 text-[11px] leading-snug text-ink-400">{card.prd}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function FoundationsLinks({ links }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="rounded-2xl border border-ink-200/80 bg-white/55 p-5 transition-colors hover:border-ink-300 hover:bg-white/80"
        >
          <p className="text-[15px] font-medium text-ink-950">{link.label}</p>
          <p className="mt-1.5 text-[13px] text-ink-600">{link.note}</p>
        </Link>
      ))}
    </div>
  );
}

export default function ProjectSummaryPage() {
  const [intro, ...sections] = PROJECT_SUMMARY_SECTIONS;

  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id={intro.id}
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.9),rgba(249,248,246,0.35)_48%,rgba(247,246,243,0)_100%)]"
        >
          <div className="max-w-content mx-auto px-6 pb-20 pt-28 md:pb-28 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
                {PROJECT_SUMMARY_META.programme} · PRDs {PROJECT_SUMMARY_META.prdDate}
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ink-950">
                {intro.title}
              </h1>
              <p className="mt-4 text-[18px] font-medium tracking-tight text-ink-700">{intro.description}</p>
              {intro.body?.map((paragraph) => (
                <p key={paragraph} className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                  {paragraph}
                </p>
              ))}

              {intro.prdHub ? <PrdHubCards /> : null}
            </motion.div>
          </div>
        </section>

        {sections.map((section) => (
          <FlowSection
            key={section.id}
            id={section.id}
            label={section.label}
            title={section.title}
            description={section.description}
            className={section.id === "summary-workspace" ? "border-b-0" : undefined}
          >
            {section.cards ? <RoleCards cards={section.cards} /> : null}
            {section.links ? <FoundationsLinks links={section.links} /> : null}
            {section.bullets ? <BulletList items={section.bullets} /> : null}
          </FlowSection>
        ))}
      </main>
    </SiteChrome>
  );
}
