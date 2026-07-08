import SiteNav from "../components/SiteNav.jsx";
import PrdPrototypePlayer from "../prototype/PrdPrototypePlayer.jsx";

/** Minimal chrome — no chapter nav so the phone prototype stays focused. */
export default function PrdPrototypePage() {
  return (
    <div className="min-h-dvh bg-paper-200 text-ink-950">
      <SiteNav />
      <main className="pt-[6.5rem]">
        <PrdPrototypePlayer />
      </main>
      <footer className="border-t border-ink-200/70 bg-paper-100 py-8">
        <div className="max-w-content mx-auto px-6 text-center text-[11px] text-ink-500">
          PRD clickable prototype · tap screen buttons to navigate
        </div>
      </footer>
    </div>
  );
}
