import React, { useEffect, useMemo, useState } from "react";
import { Menu, X, Sun, Moon, FileText, Eye } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useActiveSection } from "../hooks/useActiveSection.js";
import { NAV_LINKS } from "../data/navLinks.js";
import { PROFILE } from "../data/profile.js";
import { font } from "../theme/typography.js";

export default function Nav() {
  const { colors, theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [resumePeek, setResumePeek] = useState(false);
  const sectionIds = useMemo(() => NAV_LINKS.map(([, id]) => id), []);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let hideTimeout;
    const interval = window.setInterval(() => {
      setResumePeek(true);
      window.clearTimeout(hideTimeout);
      hideTimeout = window.setTimeout(() => setResumePeek(false), 1500);
    }, 9000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(hideTimeout);
    };
  }, []);

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
            className="nav-control ml-2 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ border: `1px solid ${colors.border}`, color: colors.text }}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="theme-icon-enter" size={15} /> : <Sun className="theme-icon-enter" size={15} />}
          </button>

          <a
            href={PROFILE.contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-control nav-resume ml-2 h-9 min-w-9 xl:min-w-[92px] xl:px-4 rounded-full inline-flex items-center justify-center gap-2"
            style={{ ...font, backgroundColor: colors.text, color: colors.bg }}
            aria-label="Open resume"
            title="Open resume"
          >
            {resumePeek
              ? <Eye key="desktop-eye" size={16} className="resume-eye-blink xl:hidden" aria-hidden="true" />
              : <FileText key="desktop-resume" size={16} className="nav-icon-enter xl:hidden" aria-hidden="true" />}
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
          >
            {resumePeek
              ? <Eye key="mobile-eye" className="resume-eye-blink" size={17} aria-hidden="true" />
              : <FileText key="mobile-resume" className="nav-icon-enter" size={17} aria-hidden="true" />}
          </a>
          <button onClick={toggleTheme} className="nav-control w-9 h-9 rounded-full flex items-center justify-center" style={{ color: colors.text }} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="theme-icon-enter" size={18} /> : <Sun className="theme-icon-enter" size={18} />}
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
