import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { font } from "../theme/typography.js";

// Shared section heading: eyebrow label + title + optional subtext.
export default function Heading({ eyebrow, title, sub }) {
  const { colors } = useTheme();

  return (
    <div className="mb-10">
      <p className="text-sm font-medium mb-2" style={{ ...font, color: colors.accent }}>
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3" style={{ ...font, color: colors.text }}>
        {title}
      </h2>
      {sub && (
        <p className="max-w-xl text-sm leading-relaxed" style={{ ...font, color: colors.textSub }}>
          {sub}
        </p>
      )}
    </div>
  );
}
