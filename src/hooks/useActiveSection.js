import { useEffect, useState } from "react";

// Tracks which section id is currently in view, so the nav can
// highlight the right link. Includes "top" (the hero) so nothing
// is highlighted while the hero itself is on screen.
export function useActiveSection(ids) {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const allIds = ["top", ...ids];
    const els = allIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
