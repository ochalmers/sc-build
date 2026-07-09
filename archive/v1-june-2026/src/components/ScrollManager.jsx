import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Height of the fixed header region to offset anchored scrolls by, in pixels.
 * Kept in sync with the `scroll-mt-[7rem]` section offset used across pages
 * (55px pill + 30px top gap + breathing room).
 */
const HEADER_OFFSET = 112;

function scrollToHash(hash) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior: "auto" });
  return true;
}

/**
 * On route (pathname) changes, always land at a predictable position:
 * the top of the target section when the URL has a hash, otherwise the
 * top of the page. Same-page hash clicks (e.g. the section menu) are left
 * to the browser's native anchor handling so their smooth scroll is kept.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(null);

  useEffect(() => {
    const pathnameChanged = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    if (!pathnameChanged) return undefined;

    if (hash) {
      // Content for the target may not be laid out on the first frame after a
      // route change, so retry across a couple of frames before giving up.
      let attempts = 0;
      let raf = 0;
      const tryScroll = () => {
        if (scrollToHash(hash) || attempts >= 5) return;
        attempts += 1;
        raf = requestAnimationFrame(tryScroll);
      };
      tryScroll();
      return () => {
        if (raf) cancelAnimationFrame(raf);
      };
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return undefined;
  }, [pathname, hash]);

  return null;
}
