import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { font } from "../theme/typography.js";
import { SKILLS } from "../data/skills.js";
import { PROFILE } from "../data/profile.js";
import Reveal from "./Reveal.jsx";
import Heading from "./Heading.jsx";

export default function Skills() {
  const { colors } = useTheme();

  return (
    <section id="skills" className="px-0 py-20" style={{ borderTop: `1px solid ${colors.border}`, backgroundColor: colors.bgSoft }}>
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <Heading eyebrow={PROFILE.headings.skills.eyebrow} title={PROFILE.headings.skills.title} sub={PROFILE.headings.skills.sub} />
          <div className="grid sm:grid-cols-3 gap-8">
            {SKILLS.map((s, i) => (
              <Reveal key={s.group} delay={i * 80}>
                <p className="text-sm font-semibold mb-3" style={{ ...font, color: colors.text }}>{s.group}</p>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="text-sm" style={{ ...font, color: colors.textSub }}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
