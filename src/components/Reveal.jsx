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
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
