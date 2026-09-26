import React from "react";
import { useReveal } from "../hooks/useReveal.js";

// Wraps any content and fades/slides it in once scrolled into view.
export default function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 20px, 0) scale(0.99)",
        filter: visible ? "blur(0)" : "blur(3px)",
        transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, filter 700ms ease ${delay}ms`,
        willChange: visible ? "auto" : "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}
