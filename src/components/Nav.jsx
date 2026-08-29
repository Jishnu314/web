import React, { useMemo, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useActiveSection } from "../hooks/useActiveSection.js";
import { NAV_LINKS } from "../data/navLinks.js";
import { PROFILE } from "../data/profile.js";
import { font } from "../theme/typography.js";

export default function Nav() {
  const { colors, theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const sectionIds = useMemo(() => NAV_LINKS.map(([, id]) => id), []);
  const active = useActiveSection(sectionIds);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <nav
        className="w-[80%] mx-auto flex items-center justify-between px-6 py-3 rounded-full"
        style={{
          backgroundColor: theme === "light" ? "rgba(255,255,255,0.85)" : "rgba(15,17,21,0.85)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${colors.border}`,
          boxShadow: theme === "light" ? "0 8px 24px rgba(16,24,40,0.08)" : "0 8px 24px rgba(0,0,0,0.35)",
        }}
      >
        <a href="#top" className="text-base font-semibold" style={{ ...font, color: colors.text }}>
          {PROFILE.name}
        </a>

        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm px-3 py-1.5 rounded-full transition-colors"
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
            className="ml-2 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ border: `1px solid ${colors.border}`, color: colors.text }}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          <a
            href={PROFILE.contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm px-4 py-2 rounded-full"
            style={{ ...font, backgroundColor: colors.text, color: colors.bg }}
          >
            Resume
          </a>
        </div>

        <div className="flex sm:hidden items-center gap-3">
          <button onClick={toggleTheme} style={{ color: colors.text }} aria-label="Toggle theme">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button onClick={() => setOpen(!open)} style={{ color: colors.text }} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="sm:hidden w-[80%] mx-auto mt-2 px-6 py-5 flex flex-col gap-4 rounded-2xl"
          style={{
            backgroundColor: theme === "light" ? "rgba(255,255,255,0.95)" : "rgba(15,17,21,0.95)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${colors.border}`,
            boxShadow: theme === "light" ? "0 8px 24px rgba(16,24,40,0.08)" : "0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          {NAV_LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="text-sm"
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