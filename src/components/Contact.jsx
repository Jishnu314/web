import React, { useState } from "react";
import { Download, Copy, Check, CircleHelp } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { font } from "../theme/typography.js";
import Reveal from "./Reveal.jsx";
import Heading from "./Heading.jsx";
import { PROFILE } from "../data/profile.js";
import { SOCIALS } from "../data/socials.js";

export default function Contact() {
  const { colors } = useTheme();
  const [copied, setCopied] = useState(null);
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

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
                      className="copy-control rounded transition-colors"
                      style={{ color: copied === copyValue ? colors.accent : colors.textSub }}
                      aria-label={`Copy ${label} to clipboard`}
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
              onPointerEnter={() => setDownloadHovered(true)}
              onPointerLeave={() => setDownloadHovered(false)}
              onFocus={() => setDownloadHovered(true)}
              onBlur={() => setDownloadHovered(false)}
              onClick={() => {
                setDownloaded(true);
                window.setTimeout(() => setDownloaded(false), 2400);
              }}
              aria-live="polite"
              className="download-button inline-flex items-center gap-2 text-sm px-5 py-3 rounded-md flex-shrink-0"
              style={{ ...font, backgroundColor: colors.text, color: colors.bg }}
            >
              {downloaded ? (
                <Check className="download-complete" size={16} />
              ) : downloadHovered ? (
                <span className="download-icon-sequence" aria-hidden="true">
                  <Download className="download-arrow" size={16} />
                  <CircleHelp className="download-question" size={16} />
                </span>
              ) : (
                <Download className="download-icon" size={16} />
              )}
              <span key={downloaded ? "downloaded" : downloadHovered ? "hover" : "idle"} className="download-label">
                {downloaded ? "Downloaded!" : downloadHovered ? "Download?" : "Download my resume"}
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
