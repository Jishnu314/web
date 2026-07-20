import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { font } from "../theme/typography.js";
import Reveal from "./Reveal.jsx";
import Heading from "./Heading.jsx";
import { PROFILE } from "../data/profile.js";

export default function About() {
  const { colors } = useTheme();

  return (
    <section id="about" className="max-w-3xl mx-auto px-6 py-20" style={{ borderTop: `1px solid ${colors.border}` }}>
      <Reveal>
        <Heading eyebrow={PROFILE.headings.about.eyebrow} title={PROFILE.headings.about.title} />

        <div className="flex flex-col sm:flex-row gap-8 items-stretch">
          <img
            src={PROFILE.about.avatar}
            alt={PROFILE.name}
            className="w-full sm:w-56 h-56 sm:h-auto rounded-2xl object-cover flex-shrink-0"
            style={{ border: `1px solid ${colors.border}` }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />

          <div className="flex-1 flex flex-col justify-between">
            <p className="text-base leading-relaxed" style={{ ...font, color: colors.textSub }}>
              {PROFILE.about.paragraph}
            </p>

            <div className="flex flex-wrap gap-x-12 gap-y-5 mt-8 pt-6" style={{ borderTop: `1px solid ${colors.border}` }}>
              {PROFILE.about.facts.map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs uppercase tracking-wide mb-1" style={{ ...font, color: colors.textSub }}>{k}</p>
                  <p className="text-sm font-medium" style={{ ...font, color: colors.text }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}