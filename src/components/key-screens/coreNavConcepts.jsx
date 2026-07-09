import { WireframePhone } from "./WireframePhone.jsx";

/**
 * Five options for the provisioned Listener core UI — all black-and-white ideation wireframes.
 * The variable being explored is the bottom navigation: how many destinations, which ones,
 * and whether there is a dedicated play/resume action. The screen body is kept deliberately
 * light so the navigation model is what reads first.
 */

const INK = "#18181B";
const MUTE = "#A1A1AA";
const LINE = "#E4E4E7";

function NavItem({ label, active }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <div
        className="h-[16px] w-[16px] rounded-md"
        style={{ background: active ? INK : "transparent", border: active ? "none" : `1px solid ${MUTE}` }}
      />
      <span
        className="text-[7.5px] font-semibold uppercase tracking-[0.04em]"
        style={{ color: active ? INK : MUTE }}
      >
        {label}
      </span>
    </div>
  );
}

/** items: [{ id, label, center? }] — one item may be a raised center action. */
function NavBar({ items, active }) {
  return (
    <div className="mt-auto flex items-end justify-between border-t px-3 pb-2.5 pt-2" style={{ borderColor: "#F4F4F5" }}>
      {items.map((t) =>
        t.center ? (
          <div key={t.id} className="-mt-6 flex flex-1 flex-col items-center gap-1">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full text-[15px] text-white shadow-[0_8px_18px_rgba(10,10,9,0.28)]"
              style={{ background: INK }}
            >
              ▶
            </div>
            {t.label ? (
              <span className="text-[7.5px] font-semibold uppercase tracking-[0.04em]" style={{ color: MUTE }}>
                {t.label}
              </span>
            ) : null}
          </div>
        ) : (
          <NavItem key={t.id} label={t.label} active={t.id === active} />
        ),
      )}
    </div>
  );
}

function OptionTag({ children }) {
  return (
    <p className="px-5 pt-3 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: MUTE }}>
      {children}
    </p>
  );
}

function Greeting({ title = "Good morning", sub }) {
  return (
    <div className="px-5 pt-1">
      <h2 className="text-[17px] font-bold leading-tight">{title}</h2>
      {sub ? <p className="mt-1 text-[11px] text-[#71717A]">{sub}</p> : null}
    </div>
  );
}

function ResumeCard({ label = "Continue where you left off" }) {
  return (
    <div className="mx-5 mt-3 rounded-2xl border p-3.5" style={{ borderColor: LINE }}>
      <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: MUTE }}>
        {label}
      </p>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl" style={{ background: "#E4E4E7" }} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold">Arrive · settle</p>
          <p className="text-[10px] text-[#71717A]">14 min · Regulation</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full text-white text-[11px]" style={{ background: INK }}>
          ▶
        </div>
      </div>
    </div>
  );
}

function MiniRow({ title, meta }) {
  return (
    <div className="flex items-center gap-3 border-b px-5 py-2.5" style={{ borderColor: "#F4F4F5" }}>
      <div className="h-9 w-9 shrink-0 rounded-lg" style={{ background: "#E4E4E7" }} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-semibold">{title}</p>
        <p className="text-[9px] text-[#71717A]">{meta}</p>
      </div>
    </div>
  );
}

function ChipRow({ chips, activeIndex = 0 }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5 px-5">
      {chips.map((c, i) => (
        <span
          key={c}
          className="rounded-full px-2.5 py-1 text-[9px] font-semibold"
          style={
            i === activeIndex
              ? { background: INK, color: "#fff" }
              : { border: `1px solid ${LINE}`, color: "#52525B" }
          }
        >
          {c}
        </span>
      ))}
    </div>
  );
}

/* ── Option A · Library-first (4 tabs) ─────────────────────────── */
function OptionLibraryFirst() {
  return (
    <WireframePhone>
      <OptionTag>A · Library-first</OptionTag>
      <Greeting sub="Your Sessions for today" />
      <ChipRow chips={["All", "Regulation", "Focus", "Sleep"]} />
      <div className="mt-2 flex-1 overflow-hidden">
        <MiniRow title="Arrive · settle" meta="14 min · Assigned" />
        <MiniRow title="Deep unwind" meta="22 min · Evening" />
        <MiniRow title="Focus reset" meta="18 min · Daytime" />
      </div>
      <NavBar
        active="home"
        items={[
          { id: "home", label: "Home" },
          { id: "sessions", label: "Sessions" },
          { id: "saved", label: "Saved" },
          { id: "profile", label: "Profile" },
        ]}
      />
    </WireframePhone>
  );
}

/* ── Option B · Player-first (3 tabs) ──────────────────────────── */
function OptionPlayerFirst() {
  return (
    <WireframePhone>
      <OptionTag>B · Player-first</OptionTag>
      <Greeting title="Today" sub="One tap back into listening" />
      <div className="mt-3 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="h-24 w-24 rounded-full border-2" style={{ borderColor: INK, background: "#F4F4F5" }} />
        <p className="mt-4 text-[13px] font-bold">Arrive · settle</p>
        <p className="mt-1 text-[10px] text-[#71717A]">Resume · 05:18 left</p>
        <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full text-white text-[15px]" style={{ background: INK }}>
          ▶
        </div>
      </div>
      <NavBar
        active="listen"
        items={[
          { id: "today", label: "Today" },
          { id: "listen", label: "Listen" },
          { id: "profile", label: "Profile" },
        ]}
      />
    </WireframePhone>
  );
}

/* ── Option C · Protocol-led (4 tabs) ──────────────────────────── */
function OptionProtocolLed() {
  return (
    <WireframePhone>
      <OptionTag>C · Protocol-led</OptionTag>
      <Greeting title="Your plan" sub="Day 3 of your regiment" />
      <div className="mt-3 space-y-2 px-5">
        {[
          { n: "1", t: "Morning · settle", done: true },
          { n: "2", t: "Midday · focus reset", done: false },
          { n: "3", t: "Evening · deep unwind", done: false },
        ].map((s) => (
          <div key={s.n} className="flex items-center gap-3 rounded-xl border p-2.5" style={{ borderColor: LINE }}>
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
              style={
                s.done
                  ? { background: INK, color: "#fff" }
                  : { border: `1px solid ${MUTE}`, color: MUTE }
              }
            >
              {s.done ? "✓" : s.n}
            </div>
            <p className="text-[11px] font-semibold">{s.t}</p>
          </div>
        ))}
      </div>
      <NavBar
        active="today"
        items={[
          { id: "today", label: "Today" },
          { id: "plan", label: "My Plan" },
          { id: "library", label: "Library" },
          { id: "profile", label: "Profile" },
        ]}
      />
    </WireframePhone>
  );
}

/* ── Option D · Center resume action (4 tabs + FAB) ────────────── */
function OptionCenterAction() {
  return (
    <WireframePhone>
      <OptionTag>D · Center play action</OptionTag>
      <Greeting sub="Tap play anytime to resume" />
      <ChipRow chips={["For you", "Recent", "Assigned"]} />
      <div className="mt-3 grid grid-cols-2 gap-2 px-5">
        {["Arrive · settle", "Deep unwind", "Focus reset", "Wind down"].map((t) => (
          <div key={t} className="rounded-xl border p-2.5" style={{ borderColor: LINE }}>
            <div className="h-10 w-full rounded-lg" style={{ background: "#E4E4E7" }} />
            <p className="mt-1.5 text-[9px] font-semibold leading-tight">{t}</p>
          </div>
        ))}
      </div>
      <NavBar
        active="home"
        items={[
          { id: "home", label: "Home" },
          { id: "library", label: "Library" },
          { id: "play", label: "Play", center: true },
          { id: "progress", label: "Progress" },
          { id: "profile", label: "Profile" },
        ]}
      />
    </WireframePhone>
  );
}

/* ── Option E · Learn + Listen (5 tabs) ────────────────────────── */
function OptionLearnListen() {
  return (
    <WireframePhone>
      <OptionTag>E · Learn + Listen</OptionTag>
      <Greeting sub="Listen, learn, and track" />
      <ResumeCard />
      <div className="mx-5 mt-3 rounded-2xl border p-3" style={{ borderColor: LINE }}>
        <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: MUTE }}>
          Learn
        </p>
        <p className="mt-1 text-[11px] font-semibold leading-snug">Why structured sound calms the nervous system</p>
      </div>
      <NavBar
        active="home"
        items={[
          { id: "home", label: "Home" },
          { id: "sessions", label: "Sessions" },
          { id: "learn", label: "Learn" },
          { id: "progress", label: "Progress" },
          { id: "profile", label: "Profile" },
        ]}
      />
    </WireframePhone>
  );
}

export const CORE_UI_OPTIONS = [
  {
    id: "library-first",
    letter: "A",
    name: "Library-first",
    tabs: "Home · Sessions · Saved · Profile",
    idea: "The provisioned playlist is the home. Familiar streaming-app pattern — browse, filter, and pick before play.",
    navigationModel:
      "Four equal-weight tabs. Home shows a filtered slice of the library; Sessions is the full provisioned catalogue; Saved is a personal shortlist; Profile is account and settings.",
    homeBehaviour:
      "Greeting, category chips (neurotype / use case), and scannable session rows. Resume appears as the first row or a slim banner — not the hero.",
    best: "Listeners with several assigned Sessions who browse and choose.",
    watchout: "Play/resume is buried; daily habit is less obvious.",
    screenImpact: [
      "Sessions library: primary surface — list with chips and rows.",
      "Session detail: reached often — listeners compare before playing.",
      "Favorites: dedicated tab — favourites are a daily destination.",
      "Player: entered from row play or detail — no global play FAB.",
      "Protocol: if assigned, lives as a module on Home or inside Sessions.",
    ],
    uxNotes: [
      "Keep tab count at four — five tabs plus content feels crowded on iPhone SE.",
      "Category chips should filter in place; avoid a separate filter screen in v1.",
      "Saved tab badge only when count > 0.",
      "Aligns with ideation variation lib-v1 and fav-v1.",
    ],
    Phone: OptionLibraryFirst,
  },
  {
    id: "player-first",
    letter: "B",
    name: "Player-first",
    tabs: "Today · Listen · Profile",
    idea: "Opens straight into one-tap resume. Minimal, calm, decision-light — the app is a listening instrument, not a catalogue.",
    navigationModel:
      "Three tabs only. Today is resume-first; Listen is a simplified full library; Profile is sparse account. No Saved tab — recents live on Today.",
    homeBehaviour:
      "Large centred artwork, session title, time remaining, and a single play control. Browse all Sessions is a text link, not a competing CTA.",
    best: "Clinical / regulation contexts with a single recommended Session.",
    watchout: "Under-serves Listeners who have a real library to explore.",
    screenImpact: [
      "Sessions library: split — Today is hero; Listen tab is secondary browse.",
      "Session detail: minimal confirm-only layout preferred (detail-v3).",
      "Favorites: in-place Saved chip on Listen, not a tab (fav-v2).",
      "Player: full-bleed ambient — the emotional centre of the app.",
      "Post-session feedback: shown every time — reinforces daily ritual.",
    ],
    uxNotes: [
      "Thumb reach: primary play in lower third of screen.",
      "Listen tab label must not confuse with Player — consider Library internally.",
      "Profile tab stays sparse — no stats overload.",
      "Aligns with ideation variation lib-v2 and player-v1.",
    ],
    Phone: OptionPlayerFirst,
  },
  {
    id: "protocol-led",
    letter: "C",
    name: "Protocol-led",
    tabs: "Today · My Plan · Library · Profile",
    idea: "Leads with the assigned regiment as an ordered daily plan — sequence and completion matter as much as browsing.",
    navigationModel:
      "Four tabs with My Plan as the differentiator. Today shows today's step; My Plan is the full programme; Library is overflow browse; Profile unchanged.",
    homeBehaviour:
      "Day N of your programme header, ordered checklist with completion ticks, tap any step to open detail and play.",
    best: "Protocol / regiment use-cases where sequence matters.",
    watchout: "Protocols are intentionally limited in v1 — may over-promise.",
    screenImpact: [
      "Sessions library: demoted to Library tab — plan leads.",
      "Protocol / Regiment: dedicated My Plan tab (protocol-v1).",
      "Session detail: clinical sheet variant fits Partner programmes (detail-v2).",
      "Player: timer-forward for timed steps (player-v2).",
      "Post-session feedback: partner micro-survey variant viable (feedback-v5).",
    ],
    uxNotes: [
      "Copy: plan or programme — avoid regiment unless Partner requires.",
      "Out-of-order play allowed but visually noted — no punitive red.",
      "Hide My Plan tab entirely when no protocol assigned.",
      "Aligns with ideation variation lib-v3 and protocol-v1.",
    ],
    Phone: OptionProtocolLed,
  },
  {
    id: "center-action",
    letter: "D",
    name: "Center play action",
    tabs: "Home · Library · ▶ · Progress · Profile",
    idea: "A raised centre button always resumes the current Session — listening is the primary, ever-present action.",
    navigationModel:
      "Five destinations with centre FAB. Home is curated grid; Library is full set; centre ▶ resumes last session (long-press for picker); Progress is listening history stub; Profile as usual.",
    homeBehaviour:
      "Filter chips (For you / Recent / Assigned) and 2-column session grid. FAB floats above nav — always one tap to resume.",
    best: "Making listening the primary, ever-present action.",
    watchout: "Five destinations + FAB can feel heavy for a focused v1.",
    screenImpact: [
      "Sessions library: grid home + full Library tab (lib-v4).",
      "Player: mini-player when browsing (player-v5).",
      "Favorites: dedicated Saved tab or pinned home slots.",
      "Progress: new surface — can ship as simple recents list in v1.",
      "Session detail: hero + metadata — play defers to FAB when mid-session.",
    ],
    uxNotes: [
      "FAB must not obscure content — safe-area padding on grid bottom.",
      "Long-press FAB opens session picker if multiple in progress.",
      "Progress tab can be P2 — stub with honest coming soon if needed.",
      "Test five-tab reach on iPhone SE and Android small screens.",
    ],
    Phone: OptionCenterAction,
  },
  {
    id: "learn-listen",
    letter: "E",
    name: "Learn + Listen",
    tabs: "Home · Sessions · Learn · Progress · Profile",
    idea: "Balances listening with science education carried over from the public Visitor journey — credibility and habit in one app.",
    navigationModel:
      "Five tabs — broadest IA. Home combines resume + learn teaser; Sessions is library; Learn is science CMS content; Progress is listening stats; Profile standard.",
    homeBehaviour:
      "Resume card first, then a Learn article teaser, then session rows. Science content rotates from the same source as public Visitor.",
    best: "Reinforcing credibility and reusing public science content.",
    watchout: "Broadest IA — most to build and maintain.",
    screenImpact: [
      "Sessions library: resume + rows below learn module (lib-v5).",
      "Onboarding: can shorten science — Learn tab covers depth.",
      "Session detail: story + preview clip variant fits education-forward brand (detail-v4).",
      "Learn: new tab — reuse pv-science-home and pv-topic-detail patterns.",
      "Profile: standard — entitlement + neurotype still live here.",
    ],
    uxNotes: [
      "Learn tab is not a second app — keep article count bounded.",
      "Resume card must stay above fold — education never blocks play.",
      "Reuse public science CMS — single content source.",
      "Five tabs — validate with real content before committing.",
    ],
    Phone: OptionLearnListen,
  },
];
