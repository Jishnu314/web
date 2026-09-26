import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { font } from "../theme/typography.js";

export default function ExpandableText({ children, className = "", style = {} }) {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useTheme();
  const canCollapse = typeof children === "string" && children.length > 150;

  return (
    <div>
      <div
        className={`relative overflow-hidden transition-[max-height] duration-500 ease-out ${
          canCollapse && !expanded ? "max-h-28 md:max-h-none" : "max-h-[80rem] md:max-h-none"
        }`}
      >
        <p className={className} style={{ ...font, color: colors.textSub, ...style }}>{children}</p>
        {canCollapse && !expanded && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-8 md:hidden"
            style={{ background: `linear-gradient(transparent, ${colors.bg})` }}
          />
        )}
      </div>
      {canCollapse && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-2 text-xs font-medium underline underline-offset-4 md:hidden"
          style={{ color: colors.accent }}
        >
          Read {expanded ? "less" : "more"}
        </button>
      )}
    </div>
  );
}
