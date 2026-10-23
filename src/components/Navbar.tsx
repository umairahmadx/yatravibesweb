import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { EASE } from "./motion";

const links = [
  { label: "Why Us", href: "#why-us" },
  { label: "Cars", href: "#cars" },
  { label: "Trips", href: "#trips" },
  { label: "Contact", href: "#contact" },
];

/**
 * Fixed, blurred header (M1: y -60 → 0, opacity 0 → 1, 0.8s, delay 0.4s).
 * The original never changes the bar on scroll and has NO mobile hamburger
 * menu — below `md` the four links simply disappear. Both behaviours are kept.
 */
export default function Navbar({ onBook }: { onBook: () => void }) {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#08090C]/70 border-b border-white/10"
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 h-16 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-3">
          <img src="/img/logo-emblem-light.png" alt="YatraVibes logo" width={493} height={237} className="h-9 w-auto" />
          <span className="font-display font-extrabold tracking-tight text-lg uppercase">
            Yatra<span className="text-[#E2A855]">Vibes</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className="font-mono2 text-[11px] tracking-[0.2em] uppercase text-slate-400 hover:text-[#E2A855] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="tel:+916264018879"
            data-testid="nav-call-button"
            className="hidden sm:flex items-center gap-2 font-mono2 text-[11px] tracking-widest text-slate-300 hover:text-[#E2A855] transition-colors duration-300"
          >
            <Phone size={13} aria-hidden="true" /> +91 62640 18879
          </a>
          <button
            onClick={onBook}
            data-testid="nav-book-button"
            className="px-5 py-2 bg-[#E2A855] text-[#08090C] font-mono2 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#F0B865] transition-colors duration-300"
          >
            Book Trip
          </button>
        </div>
      </div>
    </motion.header>
  );
}
