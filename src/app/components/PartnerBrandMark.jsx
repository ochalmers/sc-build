import { useEffect, useMemo, useState } from "react";
import { PNE_LOGO_SRC, partnerLogoSrc } from "../data/catalog.js";

function isPrestonPartner(partner) {
  return (
    partner?.id === "org-preston" ||
    /preston\s*north\s*end/i.test(partner?.name ?? "")
  );
}

/** Public-path backups when a Vite-bundled URL briefly 404s (e.g. mid-restart). */
function logoCandidates(partner) {
  const primary = partnerLogoSrc(partner);
  const extras = [];
  if (isPrestonPartner(partner)) {
    extras.push(PNE_LOGO_SRC, "/assets/brand/partners/preston-north-end.png");
  }
  return [...new Set([primary, ...extras].filter(Boolean))];
}

/**
 * Partner crest / mark. Known brand artwork (esp. Preston North End) never
 * degrades to a monogram circle — that “PNE” badge is not club branding.
 */
export function PartnerBrandMark({
  partner,
  className = "h-9 w-auto max-w-[72px] object-contain",
  monogramClassName = "flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold tracking-wide text-white",
  allowMonogram = true,
}) {
  const forceCrest = isPrestonPartner(partner);
  const candidates = useMemo(() => logoCandidates(partner), [partner]);
  const candidateKey = candidates.join("|");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [candidateKey]);

  const src = index < candidates.length ? candidates[index] : null;

  if (src) {
    return (
      <img
        key={src}
        src={src}
        alt={partner?.name || "Partner"}
        className={className}
        decoding="async"
        onError={() => {
          setIndex((i) => {
            if (i + 1 < candidates.length) return i + 1;
            // Preston: keep last crest URL rather than showing a “PNE” badge.
            return forceCrest ? i : candidates.length;
          });
        }}
      />
    );
  }

  if (forceCrest || !allowMonogram || !partner?.monogram) {
    return null;
  }

  return (
    <span
      className={monogramClassName}
      style={{ background: partner?.inviteAccent ?? "#0b1c2c" }}
      aria-label={partner?.name || "Organisation"}
    >
      {partner.monogram}
    </span>
  );
}
