import { SystemProvider } from "./context/SystemContext";
import { siteContent } from "./content/siteContent";
import HeroSection from "./sections/HeroSection";
import ColourSection from "./sections/ColourSection";
import FlowSection from "./sections/FlowSection";
import CloseSection from "./sections/CloseSection";

export default function App() {
  return (
    <SystemProvider>
      <div className="min-h-dvh bg-paper-200 text-ink-950">
        <a href="#intro" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-paper-200">
          Skip to content
        </a>

        <header className="fixed top-0 left-0 right-0 z-50 px-5 py-4">
          <img src="/Images/Logo.svg" alt="Sonocea" className="h-5 w-auto opacity-90" />
        </header>

        <main className="max-w-[640px] mx-auto px-5 pt-24 pb-32">
          <HeroSection content={siteContent} colourModes={siteContent.adaptiveColour.modes} />
          <ColourSection content={siteContent.adaptiveColour} />
          <FlowSection content={siteContent.flow} />
          <CloseSection content={siteContent.next} />
        </main>
      </div>
    </SystemProvider>
  );
}
