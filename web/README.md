# Electronics & Instrumentation Engineer — Portfolio

A React + Vite + Tailwind portfolio, structured as a real multi-file app:
data separated from components, theme handled via context, shared logic
pulled into hooks.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy it to Vercel, Netlify, GitHub Pages, or any
static host.

## Project structure

```
src/
  main.jsx                 ← React entry point
  App.jsx                  ← wraps everything in ThemeProvider, renders sections in order
  index.css                ← Tailwind directives

  context/
    ThemeContext.jsx        ← theme state (light/dark), colors, toggleTheme — via useTheme()

  theme/
    palettes.js              ← color tokens for light & dark mode (edit here to re-theme)
    typography.js            ← font import + shared font-family style

  data/
    navLinks.js               ← nav bar links
    skills.js                 ← Skills section content
    timeline.js                ← Experience & Education entries
    projects.js                ← Project cards content

  hooks/
    useActiveSection.js       ← tracks which section is in view, for nav highlighting
    useReveal.js               ← tracks when an element scrolls into view, for fade-in

  components/
    Nav.jsx, Hero.jsx, Heading.jsx, About.jsx, Timeline.jsx,
    Skills.jsx, Projects.jsx, ProjectCard.jsx, Contact.jsx,
    Footer.jsx, Reveal.jsx
```

## What to customize

Everything you'd want to personalize lives in `src/data/*.js` — no need to
touch component code:

- **`src/data/projects.js`** — your real projects, descriptions, tech, links
- **`src/data/timeline.js`** — your real internships, jobs, degree
- **`src/data/skills.js`** — your real tools/skills
- **`src/data/navLinks.js`** — nav bar labels/order

A few things live directly in components since they're one-off text:

- Your name and hero tagline — `src/components/Hero.jsx` and `Nav.jsx`
- Contact info (email, GitHub, LinkedIn) — `src/components/Contact.jsx`
- The "spec sheet" facts (Based in / Focus / Status) — `src/components/About.jsx`

**Colors**: edit `src/theme/palettes.js` to re-theme the whole site (both
light and dark mode).

**Contact form**: doesn't send anywhere yet (`src/components/Contact.jsx`).
Wire it up to a service like Formspree, or your own backend endpoint.
