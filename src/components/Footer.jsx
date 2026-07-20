import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { font } from "../theme/typography.js";
import { PROFILE } from "../data/profile.js";

export default function Footer() {
  const { colors } = useTheme();

  return (
    <footer className="max-w-4xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-2" style={{ borderTop: `1px solid ${colors.border}` }}>
      <p className="text-xs" style={{ ...font, color: colors.textSub }}>© {new Date().getFullYear()} {PROFILE.name}</p>
      <p className="text-xs" style={{ ...font, color: colors.textSub }}>{PROFILE.footer.tagline}</p>
    </footer>
  );
}
