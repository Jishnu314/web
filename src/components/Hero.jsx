import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { font, displayFont } from "../theme/typography.js";
import Reveal from "./Reveal.jsx";
import { PROFILE } from "../data/profile.js";
import DSOAnimation from "./DSOAnimation.jsx";

export default function Hero() {
  const { colors } = useTheme();

  return (
    <section id="top" className="max-w-4xl mx-auto px-6 pt-36 pb-24">
      <Reveal>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-medium mb-4" style={{ ...font, color: colors.accent }}>
              {PROFILE.role}
            </p>
            <h1
              className="text-4xl sm:text-5xl font-semibold leading-tight mb-6"
              style={{ ...font, color: colors.text, letterSpacing: "-0.02em" }}
            >
              {(() => {
                const [before, after] = PROFILE.hero.greeting.split("{name}");
                return (
                  <>
                    <span className="text-2xl sm:text-3xl">{before}</span>
                    <span style={{ ...displayFont, color: colors.design, fontWeight: 700 }}>{PROFILE.name}</span>
                    <span className="text-2xl sm:text-3xl">{after}</span>
                  </>
                );
              })()}
              <br />
              <span className="max-w-4xl text-base leading-relaxed mb-10" style={{ color: colors.textSub }}>
                {PROFILE.hero.headline}
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed mb-10" style={{ ...font, color: colors.textSub }}>
              {PROFILE.hero.quote && (
                <blockquote
                  className="text-sm italic leading-relaxed pl-4 max-w-md"
                  style={{ ...font, color: colors.textSub, borderLeft: `2px solid ${colors.accent}` }}
                >
                  "{PROFILE.hero.quote}"
                  {PROFILE.hero.quoteAuthor && (
                    <footer
                      className="not-italic text-xs mt-1.5 text-right"
                      style={{ ...font, color: colors.textSub, opacity: 0.7 }}
                    >
                      — {PROFILE.hero.quoteAuthor}
                    </footer>
                  )}
                </blockquote>
              )}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#projects"
                className="group px-5 py-3 text-sm rounded-md inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                style={{ ...font, backgroundColor: colors.text, color: colors.bg }}
              >
                View my work
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="px-5 py-3 text-sm rounded-md inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                style={{ ...font, border: `1px solid ${colors.border}`, color: colors.text }}
              >
                Get in touch
              </a>
            </div>

            
          </div>

          <div className="hidden md:block">
            <DSOAnimation />
          </div>
        </div>
      </Reveal>
    </section>
  );
}