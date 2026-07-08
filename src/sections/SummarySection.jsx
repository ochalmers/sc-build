const rules = [
  "Immediate entry",
  "No unnecessary navigation",
  "Low decision load",
  "Sound-led experience",
  "Motion supports, never competes",
  "One system, adaptive behaviour",
];

export default function SummarySection() {
  return (
    <section id="summary" className="border-t border-ink-200/70 bg-white">
      <div className="max-w-content mx-auto px-6 py-20 md:py-24">
        <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500">
          Product behaviour summary
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">
          Rules that keep the product aligned with the system: sound as the primary layer, visuals
          and motion in support.
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((r, idx) => (
            <li
              key={r}
              className="rounded-xl border border-ink-200/70 bg-paper-100/80 px-4 py-3 text-[13px] text-ink-800"
            >
              <span className="mr-2 text-[10px] uppercase tracking-[0.12em] text-ink-400">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-xl border border-ink-200/70 bg-paper-50 px-4 py-4">
          <p className="max-w-3xl text-[12px] leading-relaxed text-ink-600">
            Adaptation may be initially guided through onboarding and then refined through use over
            time. The system should always remain recognisable: same product structure, calibrated
            behavioural response.
          </p>
        </div>
      </div>
    </section>
  );
}
