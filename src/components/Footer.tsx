import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useReveal } from "./motion";

const year = new Date().getFullYear();

/**
 * Footer. `/admin` is deliberately out of scope for this MVP (it authenticates
 * against a backend we don't own), so the Admin link is a plain link to a page
 * that is not built yet — kept because it exists in the original design.
 */
export default function Footer() {
  const reveal = useReveal();

  return (
    <footer id="contact" className="border-t border-white/10 bg-[#0C0E13]" data-testid="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20">
        <motion.div {...reveal({ y: 30, duration: 0.9, margin: "0px" })} className="flex justify-center mb-12">
          <img
            src="/img/logo-full-light.png"
            alt="YatraVibes — Where every journey begins with a smile"
            width={493}
            height={396}
            loading="lazy"
            decoding="async"
            className="h-36 sm:h-44 w-auto"
            data-testid="footer-logo"
          />
        </motion.div>
        <motion.h2
          {...reveal({ y: 40, duration: 0.9, margin: "0px" })}
          className="font-display font-extrabold uppercase tracking-tight leading-none text-outline text-[13vw] lg:text-[9rem] text-center select-none"
        >
          YatraVibes
        </motion.h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#E2A855] mb-4">Reach Us</p>
            <div className="space-y-3 text-sm text-slate-300">
              <a
                href="tel:+916264018879"
                data-testid="footer-phone-link"
                className="flex items-center gap-3 hover:text-[#E2A855] transition-colors duration-300"
              >
                <Phone size={15} aria-hidden="true" className="text-[#E2A855]" /> +91 62640 18879
              </a>
              <a
                href="mailto:yatravibes1610@gmail.com"
                data-testid="footer-email-link"
                className="flex items-center gap-3 hover:text-[#E2A855] transition-colors duration-300"
              >
                <Mail size={15} aria-hidden="true" className="text-[#E2A855]" /> yatravibes1610@gmail.com
              </a>
              <p className="flex items-center gap-3 text-slate-400">
                <MapPin size={15} aria-hidden="true" className="text-[#E2A855]" /> New Delhi, India
              </p>
            </div>
          </div>
          <div>
            <p className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#E2A855] mb-4">Trips</p>
            <ul className="space-y-2 text-sm text-slate-400">
              {["Holidays", "Road Trips", "Beach Getaways", "Hill Stations"].map((t) => (
                <li key={t} className="font-mono2 text-xs tracking-widest uppercase">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#E2A855] mb-4">Quick Enquiry</p>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">
              Message us on WhatsApp and get a trip plan within hours.
            </p>
            <a
              href="https://wa.me/916264018879?text=Hi%20YatraVibes!%20I%20want%20to%20plan%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp-button"
              className="inline-flex items-center gap-3 px-6 py-3 border border-[#E2A855] text-[#E2A855] font-mono2 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#E2A855] hover:text-[#08090C] transition-colors duration-300"
            >
              <MessageCircle size={15} aria-hidden="true" /> WhatsApp Us
            </a>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-slate-500">
            © {year} YatraVibes — Drive. Explore. Experience.
          </p>
          <div className="flex items-center gap-6">
            <p className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-slate-600">
              One Destination. Countless Memories.
            </p>
            <a
              href="/admin"
              data-testid="footer-admin-link"
              className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-slate-600 hover:text-[#E2A855] transition-colors duration-300"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
