/**
 * Wordmark from public assets (see /public/assets/system/logos/).
 */
export function SystemBrandLogo({ className = "" }) {
  return (
    <img
      src="/assets/system/logos/sonocea-logo.svg"
      alt="Sonocea"
      className={className}
      width={331}
      height={78}
      decoding="async"
    />
  );
}
