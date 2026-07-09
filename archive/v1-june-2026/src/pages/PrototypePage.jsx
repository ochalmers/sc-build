import { PrototypeProvider } from "../context/PrototypeContext.jsx";
import SiteChrome from "../components/SiteChrome.jsx";
import HeroSection from "../sections/HeroSection.jsx";
import FrameworkSection from "../sections/FrameworkSection.jsx";
import InteractiveDemoSection from "../sections/InteractiveDemoSection.jsx";
import StorySelector from "../sections/StorySelector.jsx";
import SummarySection from "../sections/SummarySection.jsx";

export default function PrototypePage() {
  return (
    <PrototypeProvider>
      <SiteChrome>
        <main className="pt-[4.25rem]">
          <HeroSection />
          <FrameworkSection />
          <InteractiveDemoSection />
          <StorySelector />
          <SummarySection />
        </main>
      </SiteChrome>
    </PrototypeProvider>
  );
}
