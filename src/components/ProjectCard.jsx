import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Github } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { font } from "../theme/typography.js";

const BASE_TIMEOUT = 7000;      // closes at 7s if never hovered
const EXTENDED_TIMEOUT = 15000; // closes at 15s once hovered at least once

export default function ProjectCard({ project }) {
  const { colors } = useTheme();
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const openTimeRef = useRef(null);
  const timerRef = useRef(null);
  const extendedRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // (Re)schedule the close so it fires `totalMs` after the box was opened,
  // not `totalMs` from right now. This is what lets us "extend" instead of "reset".
  const scheduleClose = (totalMs) => {
    clearTimer();
    const elapsed = Date.now() - (openTimeRef.current ?? Date.now());
    const remaining = Math.max(totalMs - elapsed, 0);
    timerRef.current = setTimeout(() => setOpen(false), remaining);
  };

  useEffect(() => {
    if (!open) {
      clearTimer();
      extendedRef.current = false;
      openTimeRef.current = null;
      return;
    }
    openTimeRef.current = Date.now();
    extendedRef.current = false;
    scheduleClose(BASE_TIMEOUT);
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleMouseEnter = () => {
    setHover(true);
    // First hover while open: bump the deadline to 15s (measured from open),
    // and only ever bump it once per open session.
    if (open && !extendedRef.current) {
      extendedRef.current = true;
      scheduleClose(EXTENDED_TIMEOUT);
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
    // Intentionally no timer changes here — whatever deadline is already
    // scheduled (7s or 15s) keeps running untouched.
  };

  const active = hover || open;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`rounded-lg transition-all relative ${active ? "card-glow-active" : ""}`}
      style={{
        "--accent-glow": colors.accent,
        border: `1px solid ${active ? colors.accent : colors.border}`,
        backgroundColor: colors.bg,
        boxShadow: hover ? "0 8px 24px rgba(0,0,0,0.08)" : "none",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <style>{`
        @keyframes borderPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 var(--accent-glow);
          }
          50% {
            box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-glow) 25%, transparent);
          }
        }
        .card-glow-active {
          animation: borderPulse 2s ease-in-out infinite;
        }
      `}</style>

      {!open && (
        <span
          className="absolute -top-3 right-4 text-xs px-2.5 py-1 rounded-full pointer-events-none transition-opacity duration-200"
          style={{
            ...font,
            backgroundColor: colors.text,
            color: colors.bg,
            opacity: hover ? 1 : 0,
          }}
        >
          Click to see full
        </span>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left p-6 cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-semibold" style={{ ...font, color: colors.text }}>{project.title}</h3>
          <ChevronDown
            size={16}
            style={{
              color: active ? colors.accent : colors.textSub,
              flexShrink: 0,
              transition: "transform 0.25s ease, color 0.2s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ ...font, color: colors.textSub }}>{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="text-xs px-2.5 py-1 rounded-full" style={{ ...font, backgroundColor: colors.bgSoft, color: colors.textSub }}>{s}</span>
          ))}
        </div>
      </button>

      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.3s ease" }}>
        <div style={{ overflow: "hidden" }}>
          <div className="px-6 pb-6 pt-5" style={{ borderTop: `1px solid ${colors.border}`, backgroundColor: colors.bgSoft }}>
            <p className="text-xs font-medium uppercase tracking-wide mb-2.5" style={{ ...font, color: colors.accent }}>
              Overview
            </p>
            <p className="text-sm leading-[1.7] mb-5" style={{ ...font, color: colors.textSub }}>
              {project.details || project.desc}
            </p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ ...font, backgroundColor: colors.text, color: colors.bg }}
            >
              <Github size={15} /> View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}