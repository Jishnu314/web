import React, { useState } from "react";
import { Download, Copy, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { font } from "../theme/typography.js";
import Reveal from "./Reveal.jsx";
import Heading from "./Heading.jsx";
import { PROFILE } from "../data/profile.js";
import { SOCIALS } from "../data/socials.js";

export default function Contact() {
  const { colors } = useTheme();
  const [copied, setCopied] = useState(null);

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <section id="contact" className="px-0 py-20" style={{ borderTop: `1px solid ${colors.border}`, backgroundColor: colors.bgSoft }}>
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <Heading eyebrow={PROFILE.headings.contact.eyebrow} title={PROFILE.headings.contact.title} sub={PROFILE.headings.contact.sub} />

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            <div className="space-y-4">
              {SOCIALS.map(({ icon: Icon, label, href, color, copyValue }) => (
                <div key={label} className="flex items-center gap-2">
                  <a href={href} className="flex items-center gap-3 text-sm transition-colors hover:opacity-70" style={{ ...font, color: colors.text }}>
                    <Icon size={16} color={color ?? colors.text} /> {label}
                  </a>
                  {copyValue && (
                    <button
                      type="button"
                      onClick={() => handleCopy(copyValue)}
                      className="p-1 rounded transition-colors"
                      style={{ color: copied === copyValue ? colors.accent : colors.textSub }}
                      aria-label="Copy to clipboard"
                    >
                      {copied === copyValue ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <a
              href={PROFILE.contact.resumeUrl}
              download
              className="inline-flex items-center gap-2 text-sm px-5 py-3 rounded-md transition-transform hover:-translate-y-0.5 flex-shrink-0"
              style={{ ...font, backgroundColor: colors.text, color: colors.bg }}
            >
              <Download size={16} /> Download my resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}