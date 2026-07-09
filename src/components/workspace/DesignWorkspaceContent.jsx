import { ModeChrome } from "../../system/components/ModeChrome.jsx";
import { HomeScreenReference } from "../../system/screens/HomeScreenReference.jsx";
import { appTypeClasses } from "../../system/tokens/typography.js";
import { FIGMA_REFERENCE } from "../../system/tokens/appLayout.js";
import {
  SystemTag,
  SystemAppSectionHeader,
  SystemPlayControl,
  SystemSessionCard,
} from "../../system/components/index.js";

function DesignSystemSection() {
  return (
    <div className="space-y-12">
      <div className="max-w-2xl space-y-4">
        <p className="text-[15px] leading-relaxed text-ink-600">
          Structural styles are sourced from the Figma GTM Home screen. Colour and imagery are
          excluded from tokens — surfaces bind via behavioural mode CSS variables.
        </p>
        <a
          href={`https://www.figma.com/design/${FIGMA_REFERENCE.fileKey}/Sonocea-App--GTM-?node-id=${FIGMA_REFERENCE.nodeId.replace(":", "-")}`}
          className="inline-flex text-[13px] text-ink-700 underline decoration-ink-300 underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          Figma reference — {FIGMA_REFERENCE.screenName}
        </a>
      </div>

      <ModeChrome mode="regulation" className="mx-auto w-fit rounded-[2rem] border border-ink-200/80 p-3">
        <HomeScreenReference />
      </ModeChrome>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6 rounded-2xl border border-ink-200/70 bg-white/50 p-6">
          <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-500">Typography</h3>
          <div className="space-y-4">
            <p className={appTypeClasses.eyebrow}>Eyebrow / section label</p>
            <p className={appTypeClasses.sessionTitle}>Session title</p>
            <p className={appTypeClasses.cardTitle}>Card title</p>
            <p className={appTypeClasses.tabLabel}>Tab label</p>
          </div>
        </div>

        <ModeChrome mode="regulation" className="space-y-6 rounded-2xl border border-ink-200/70 p-6">
          <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-500">Components</h3>
          <div className="flex flex-wrap gap-2">
            <SystemTag>regulate</SystemTag>
            <SystemTag>Ambient</SystemTag>
          </div>
          <SystemAppSectionHeader label="More for You" />
          <div className="flex justify-center py-4">
            <SystemPlayControl />
          </div>
          <SystemSessionCard title="Track title" />
        </ModeChrome>
      </div>
    </div>
  );
}

const SECTION_CONTENT = {
  "design-system": DesignSystemSection,
};

export function getDesignSectionContent(sectionId) {
  const Component = SECTION_CONTENT[sectionId];
  return Component ? <Component /> : null;
}

export default DesignSystemSection;
