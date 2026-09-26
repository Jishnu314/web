import React, { useEffect, useId, useMemo, useState } from "react";
import { Menu, X, FileText, Eye } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useActiveSection } from "../hooks/useActiveSection.js";
import { NAV_LINKS } from "../data/navLinks.js";
import { PROFILE } from "../data/profile.js";
import { font } from "../theme/typography.js";

function ThemeIcon({ theme, colors, size }) {
  const rawId = useId();
  const moonClipId = `moon-clip-${rawId.replace(/:/g, "")}`;

  if (theme === "light") {
    return (
      <svg className="theme-icon-enter theme-moon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <clipPath id={moonClipId}><circle cx="12" cy="12" r="8" /></clipPath>
        </defs>
        <circle className="theme-moon-disc" cx="12" cy="12" r="8" />
        <rect className="theme-moon-phase" x="12" y="3.5" width="8" height="17" fill={colors.bg} clipPath={`url(#${moonClipId})`} />
      </svg>
    );
  }

  return (
    <svg className="theme-icon-enter theme-sun" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g className="theme-sun-rays" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <path d="M12 1.5v2.2m0 16.6v2.2M1.5 12h2.2m16.6 0h2.2M4.6 4.6l1.6 1.6m11.6 11.6 1.6 1.6m0-14.8-1.6 1.6M6.2 17.8l-1.6 1.6" />
      </g>
      <path className="theme-sun-body" d="M12 5.3c1.8 0 2.1 1.2 3.2 1.7 1.2.5 2.7.4 2.8 1.8.2 1.4-1.2 1.9-1.6 3.1-.4 1.3-.1 2.7-1.5 3.1-1.3.4-2-1-3.4-1-1.3 0-2.2 1.3-3.4.6-1.2-.7-.6-2.2-1.3-3.4-.6-1.2-2-2-1.2-3.3.8-1.2 2.2-.5 3.4-1.1C10.2 6.2 10.5 5.3 12 5.3Z" />
      <circle className="theme-sun-core" cx="12" cy="10.8" r="1.4" />
    </svg>
  );
}

export default function Nav() {
  const { colors, theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [resumeHovered, setResumeHovered] = useState(false);
  const [idleEyePeek, setIdleEyePeek] = useState(false);
  const [eyeBlinkKey, setEyeBlinkKey] = useState(0);
  const sectionIds = useMemo(() => NAV_LINKS.map(([, id]) => id), []);
  const active = useActiveSection(sectionIds);
  const showResumeEye = resumeHovered || idleEyePeek;

  useEffect(() => {
    let blinkTimer;
    let peekTimer;
    if (resumeHovered) setIdleEyePeek(false);

    const scheduleBlink = () => {
      const delay = resumeHovered ? 900 + Math.random() * 800 : 2800 + Math.random() * 4200;
      blinkTimer = window.setTimeout(() => {
        setEyeBlinkKey((key) => key + 1);
        if (!resumeHovered) {
          setIdleEyePeek(true);
          peekTimer = window.setTimeout(() => setIdleEyePeek(false), 900);
        }
        scheduleBlink();
      }, delay);
    };

    scheduleBlink();
    return () => {
      window.clearTimeout(blinkTimer);
      window.clearTimeout(peekTimer);
    };
  }, [resumeHovered]);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <nav
        className="nav-glass w-[95%] lg:w-[90%] xl:w-[80%] mx-auto flex items-center justify-between px-6 py-3 rounded-full"
        style={{
          backgroundColor: theme === "light" ? "rgba(255,255,255,0.78)" : "rgba(15,17,21,0.78)",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          border: `1px solid ${colors.border}`,
          boxShadow: theme === "light" ? "0 8px 24px rgba(16,24,40,0.08)" : "0 8px 24px rgba(0,0,0,0.35)",
          animation: "nav-arrive 650ms cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        <a href="#top" className="text-base font-semibold whitespace-nowrap" style={{ ...font, color: colors.text }}>
          {PROFILE.name}
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-link text-sm px-3 py-1.5 rounded-full"
              style={{
                ...font,
                color: active === id ? colors.accent : colors.textSub,
                backgroundColor: active === id ? colors.accentSoft : "transparent",
              }}
            >
              {label}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className="nav-control theme-toggle ml-2 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ border: `1px solid ${colors.border}`, color: colors.text }}
            aria-label="Toggle theme"
          >
            <ThemeIcon theme={theme} colors={colors} size={17} />
          </button>

          <a
            href={PROFILE.contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-control nav-resume ml-2 h-9 min-w-9 xl:w-[112px] xl:min-w-[112px] xl:px-4 rounded-full inline-flex items-center justify-center gap-2"
            style={{ ...font, backgroundColor: colors.text, color: colors.bg }}
            aria-label="Open resume"
            title="Open resume"
            onPointerEnter={() => setResumeHovered(true)}
            onPointerLeave={() => setResumeHovered(false)}
            onFocus={() => setResumeHovered(true)}
            onBlur={() => setResumeHovered(false)}
          >
            {showResumeEye
              ? <Eye key={`desktop-eye-${eyeBlinkKey}`} size={16} className="resume-eye-blink xl:hidden" aria-hidden="true" />
              : <FileText key="desktop-resume" size={16} className="nav-icon-enter xl:hidden" aria-hidden="true" />}
            <Eye
              key={`desktop-eye-wide-${eyeBlinkKey}`}
              className={`resume-eye-blink hidden xl:inline-block transition-opacity duration-200 ${showResumeEye ? "opacity-100" : "opacity-0"}`}
              size={14}
              aria-hidden="true"
            />
            <span className="nav-label-enter hidden xl:inline text-sm">Resume</span>
          </a>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <a
            href={PROFILE.contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-control nav-resume w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.text, color: colors.bg }}
            aria-label="Open resume"
            title="Open resume"
            onPointerEnter={() => setResumeHovered(true)}
            onPointerLeave={() => setResumeHovered(false)}
            onFocus={() => setResumeHovered(true)}
            onBlur={() => setResumeHovered(false)}
          >
            {showResumeEye
              ? <Eye key={`mobile-eye-${eyeBlinkKey}`} className="resume-eye-blink" size={17} aria-hidden="true" />
              : <FileText key="mobile-resume" className="nav-icon-enter" size={17} aria-hidden="true" />}
          </a>
          <button onClick={toggleTheme} className="nav-control theme-toggle w-9 h-9 rounded-full flex items-center justify-center" style={{ color: colors.text }} aria-label="Toggle theme">
            <ThemeIcon theme={theme} colors={colors} size={20} />
          </button>
          <button onClick={() => setOpen(!open)} className="nav-control w-9 h-9 rounded-full flex items-center justify-center" style={{ color: colors.text }} aria-label="Toggle menu">
            {open ? <X className="nav-icon-enter" size={22} /> : <Menu className="nav-icon-enter" size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="md:hidden w-[95%] mx-auto mt-2 px-6 py-5 flex flex-col gap-4 rounded-2xl origin-top"
          style={{
            backgroundColor: theme === "light" ? "rgba(255,255,255,0.95)" : "rgba(15,17,21,0.95)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${colors.border}`,
            boxShadow: theme === "light" ? "0 8px 24px rgba(16,24,40,0.08)" : "0 8px 24px rgba(0,0,0,0.35)",
            animation: "nav-panel-enter 260ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          {NAV_LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="text-sm transition-transform hover:translate-x-1"
              style={{ ...font, color: active === id ? colors.accent : colors.textSub }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
