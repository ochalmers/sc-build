import { SystemBrandLogo } from "./SystemBrandLogo.jsx";
import { IconMenu } from "./SampleIcons.jsx";

export function SystemNavbar({ onMenuClick, className = "" }) {
  return (
    <header
      className={`flex h-app-navbar items-center px-4 ${className}`}
      style={{ color: "var(--proto-text)" }}
    >
      <div className="flex w-full items-center justify-between">
        <SystemBrandLogo className="h-[27px] w-auto max-w-[117px]" />
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center"
          aria-label="Open menu"
          style={{ color: "var(--proto-text)" }}
        >
          <IconMenu />
        </button>
      </div>
    </header>
  );
}
