import { useEffect } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], [data-magnetic]";

export function useMagneticInteraction() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let activeElement = null;

    const reset = () => {
      if (activeElement) activeElement.style.translate = "0 0";
      activeElement = null;
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") return;
      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;
      if (target !== activeElement) {
        reset();
        activeElement = target;
      }
      if (!target) return;

      target.classList.add("magnetic-interactive");
      const bounds = target.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 7;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 7;
      target.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    };

    const handlePointerOut = (event) => {
      if (!activeElement) return;
      const leavingActive = event.target === activeElement || activeElement.contains(event.target);
      if (leavingActive && !activeElement.contains(event.relatedTarget)) reset();
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", reset);

    return () => {
      reset();
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", reset);
    };
  }, []);
}
