import { useCallback, useEffect, useMemo, useState } from "react";

function resolveActiveId(ids, offsetRatio) {
  if (ids.length === 0) return null;

  const scrollBottom = window.scrollY + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  if (scrollBottom >= docHeight - 2) return ids[ids.length - 1];

  const offset = window.innerHeight * offsetRatio;
  let current = ids[0];

  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= offset) current = id;
  }

  return current;
}

export function useScrollSpy(sectionIds, { offsetRatio = 0.35 } = {}) {
  const idsKey = sectionIds.filter(Boolean).join("|");
  const ids = useMemo(() => sectionIds.filter(Boolean), [idsKey]);
  const [activeId, setActiveId] = useState(() => ids[0] ?? null);

  const updateActive = useCallback(() => {
    const next = resolveActiveId(ids, offsetRatio);
    if (!next) return;
    setActiveId((prev) => (prev === next ? prev : next));
  }, [ids, offsetRatio]);

  useEffect(() => {
    if (ids.length === 0) return undefined;

    setActiveId(ids[0]);
    updateActive();

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateActive();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids, updateActive]);

  return activeId;
}
