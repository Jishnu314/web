import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { font } from "../theme/typography.js";
import { TIMELINE } from "../data/timeline.js";
import { PROFILE } from "../data/profile.js";
import Reveal from "./Reveal.jsx";
import Heading from "./Heading.jsx";

export default function Timeline() {
  const { colors } = useTheme();

  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 py-20" style={{ borderTop: `1px solid ${colors.border}` }}>
      <Reveal>
        <Heading eyebrow={PROFILE.headings.experience.eyebrow} title={PROFILE.headings.experience.title} />
        <div className="space-y-8">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.title} delay={i * 80}>
              <div className="grid sm:grid-cols-5 gap-4 sm:gap-8">
                <div className="sm:col-span-1">
                  <p className="text-xs font-medium" style={{ ...font, color: colors.accent }}>{t.type}</p>
                  <p className="text-xs mt-1" style={{ ...font, color: colors.textSub }}>{t.period}</p>
                </div>
                <div className="sm:col-span-4" style={{ borderLeft: `2px solid ${colors.border}`, paddingLeft: 20 }}>
                  <p className="text-base font-semibold" style={{ ...font, color: colors.text }}>{t.title}</p>
                  <p className="text-sm mb-2" style={{ ...font, color: colors.textSub }}>{t.org}</p>
                  <p className="text-sm leading-relaxed" style={{ ...font, color: colors.textSub }}>{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
