import { appTypeClasses } from "../tokens/typography.js";
import { SystemAppScreen } from "../components/SystemAppScreen.jsx";
import { SystemPlayControl } from "../components/SystemPlayControl.jsx";
import { SystemTag } from "../components/SystemTag.jsx";
import { SystemAppSectionHeader } from "../components/SystemAppSectionHeader.jsx";
import { SystemSessionCard } from "../components/SystemSessionCard.jsx";

const sampleTags = ["regulate", "Ambient", "Calm"];
const sampleCards = ["Track title", "Track title", "Track title"];

/**
 * Structural reference for Figma GTM Home (node 1:54800).
 * Layout, type, spacing and component geometry only — no colour or imagery.
 */
export function HomeScreenReference({
  eyebrow = "Morning session",
  title = "Reset & Arrive",
  tags = sampleTags,
  sectionLabel = "More for You",
  cards = sampleCards,
}) {
  return (
    <SystemAppScreen>
      <div className="flex flex-1 flex-col pb-6">
        <div className="flex flex-1 flex-col items-center justify-center py-10">
          <SystemPlayControl />
        </div>

        <div className="flex flex-col gap-4">
          <p className={appTypeClasses.eyebrow}>{eyebrow}</p>
          <h1 className={appTypeClasses.sessionTitle}>{title}</h1>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <SystemTag key={tag}>{tag}</SystemTag>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <SystemAppSectionHeader label={sectionLabel} />
          <div className="-mx-4 flex gap-[5px] overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {cards.map((cardTitle, index) => (
              <SystemSessionCard key={`${cardTitle}-${index}`} title={cardTitle} />
            ))}
          </div>
        </div>
      </div>
    </SystemAppScreen>
  );
}
