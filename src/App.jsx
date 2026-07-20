import React, { useEffect } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import { FONT_IMPORT } from "./theme/typography.js";
import { PROFILE } from "./data/profile.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Timeline from "./components/Timeline.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

// Reads theme colors — must live inside <ThemeProvider>.
function AppShell() {
  const { colors } = useTheme();

  // Keeps the browser tab title in sync with profile.js, so you only
  // ever need to edit your name/role in one place.
  useEffect(() => {
    document.title = `${PROFILE.name} — ${PROFILE.role}`;
  }, []);

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: "100vh", transition: "background-color 0.3s ease" }}>
      <style>{FONT_IMPORT}</style>
      <Nav />
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
