// ── Add or remove social/contact links here ─────────────────────────────
// Each entry needs: icon (imported from lucide-react), label (what's shown
// on screen), href (the actual link), and color (a fixed brand color, or
// null to use the site's theme text color instead).
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { PROFILE } from "./profile.js";

const email = `${PROFILE.contact.emailUser}@${PROFILE.contact.emailDomain}`;

export const SOCIALS = [
   {
    icon: Mail,
    label: email,
    href: `mailto:${email}`,
    color: "#EA4335",
    copyValue: email,
  },
  {
    icon: Github,
    label: "github.com/Jishnu", // ← edit label and href below
    href: "https://github.com/Jishnu314",
    color: null, // null = use theme text color
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/jishnu",
    href: "https://linkedin.com/in/jishnu-k-6b7024255",
    color: "#0A66C2",
  },
  {
    icon: Instagram,
    label: "instagram.com/Jishnu",
    href: "https://instagram.com/j_shnu",
    color: "#E4405F",
  },

  // Example — Instagram:
  // {
  //   icon: Instagram,
  //   label: "instagram.com/yourname",
  //   href: "https://instagram.com/yourname",
  //   color: "#E4405F",
  // },
];
