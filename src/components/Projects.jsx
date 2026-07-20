import React, { useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { font } from "../theme/typography.js";
import { PROJECTS } from "../data/projects.js";
import { PROFILE } from "../data/profile.js";
import Reveal from "./Reveal.jsx";
import Heading from "./Heading.jsx";
import ProjectCard from "./ProjectCard.jsx";

export default function Projects() {
  const { colors } = useTheme();
  const allTags = useMemo(() => ["All", ...new Set(PROJECTS.flatMap((p) => p.stack))], []);
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.stack.includes(filter));

  return (
    <section id="projects" className="max-w-4xl mx-auto px-6 py-20" style={{ borderTop: `1px solid ${colors.border}` }}>
      <Reveal>
        <Heading eyebrow={PROFILE.headings.projects.eyebrow} title={PROFILE.headings.projects.title} sub={PROFILE.headings.projects.sub} />

        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className="text-xs px-3 py-1.5 rounded-full transition-colors"
              style={{
                ...font,
                border: `1px solid ${filter === tag ? colors.accent : colors.border}`,
                backgroundColor: filter === tag ? colors.accentSoft : "transparent",
                color: filter === tag ? colors.accent : colors.textSub,
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-sm" style={{ ...font, color: colors.textSub }}>No projects tagged "{filter}" yet.</p>
        )}
      </Reveal>
    </section>
  );
}
