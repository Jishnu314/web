// ── Edit this file to personalize the site ──────────────────────────────
// Everything here is plain text/data. Nothing in here is component logic,
// so you can change any value below without touching any .jsx file.

export const PROFILE = {
  name: "Jishnu K",
  role: "Electronics & Instrumentation Engineer",

  hero: {
    // Shown as the big headline. {name} is replaced automatically.
    greeting: "I'm {name}.",
    headline: "I build systems, break them, and rebuild.",
    // Small attributed quote shown under the CTA buttons.
    quote: "To change something, build a new model that makes the existing model obsolete.",
    quoteAuthor: "Buckminster Fuller",
  },

  about: {
    paragraph:
      "I'm an Electronics & Instrumentation engineer with a focus on the " +
      "layer where hardware meets software — sensor circuits, embedded " +
      "firmware, and the control logic that ties them together. I care " +
      "about measurements being accurate and systems being easy to debug, " +
      "long before they're clever.",
    // Short "spec sheet" facts shown next to the paragraph above.
    facts: [
      ["Focus", "Instrumentation & Control Systems"],
      ["Status", "Open to opportunities"],
    ],
    avatar: "/assets/profile.jpg",
  },

  contact: {
    emailUser: "jishnukolarkunnath",
    emailDomain: "gmail.com",
    // Path to your resume PDF. Drop the file into the `public/` folder
    // (e.g. public/resume.pdf) and reference it here as "/resume.pdf".
    resumeUrl: "...../assets/Jishnu_K_Resume.pdf",
  },

  footer: {
    tagline: "Built by JK",
  },

  // Section headings (the small eyebrow label, big title, and optional
  // subtitle at the top of each section).
  headings: {
    about: { eyebrow: "ABOUT", title: "Do you know ME ? " },
    experience: { eyebrow: "EXPERIENCE & EDUCATION", title: "Where I've been" },
    skills: { eyebrow: "SKILLS", title: "My Toolkit's", sub: "The tools, languages, and platforms I use day to day." },
    projects: {
      eyebrow: "PROJECTS",
      title: "My Work's",
      sub: "A few things I've built.",
    },
    contact: {
      eyebrow: "CONTACT",
      title: "Let's talk",
      sub: "Have a role, project, or just want to say hi? Reach out.",
    },
  },
};