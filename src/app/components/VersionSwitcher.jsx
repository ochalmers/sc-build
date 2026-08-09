import { BUILD_VERSIONS, hrefForVersion, versionIdFromPathname } from "../../content/buildVersions.js";

/** Header control to jump between dated `/v/<id>/` builds (full page load). */
export function VersionSwitcher() {
  const activeId = versionIdFromPathname();
  const known = BUILD_VERSIONS.some((v) => v.id === activeId);
  const value = known ? activeId : BUILD_VERSIONS[BUILD_VERSIONS.length - 1]?.id;

  function onChange(event) {
    const nextId = event.target.value;
    if (!nextId || nextId === activeId) return;
    window.location.assign(hrefForVersion(nextId));
  }

  return (
    <label className="ml-auto inline-flex items-center gap-2 text-[12px] text-white/55">
      <span className="hidden sm:inline">Version</span>
      <select
        value={value}
        onChange={onChange}
        aria-label="Build version"
        className="max-w-[11rem] cursor-pointer appearance-none rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-3 pr-8 text-[12px] text-white outline-none transition-colors hover:bg-white/[0.1] focus-visible:ring-2 focus-visible:ring-white/25"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='rgba(255,255,255,0.65)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.65rem center",
        }}
      >
        {BUILD_VERSIONS.map((version) => (
          <option key={version.id} value={version.id} className="bg-[#121212] text-white">
            {version.label}
            {version.badge ? ` · ${version.badge}` : ""}
          </option>
        ))}
      </select>
    </label>
  );
}
