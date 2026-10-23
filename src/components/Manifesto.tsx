import { motion } from "framer-motion";
import { Armchair, MapPin, ShieldCheck, HeartHandshake } from "lucide-react";
import { useReveal } from "./motion";

const chapters = [
  {
    num: "01",
    title: "Comfortable Travel",
    desc: "Spacious, spotless, well-maintained cars with room to stretch. Every kilometre feels effortless.",
    icon: Armchair,
  },
  {
    num: "02",
    title: "Handpicked Destinations",
    desc: "From misty hill stations to sunlit coasts — every route and stop is chosen for the memories it makes.",
    icon: MapPin,
  },
  {
    num: "03",
    title: "Trusted & Reliable",
    desc: "Experienced drivers, transparent pricing and on-time pickups. Your journey is in safe hands.",
    icon: ShieldCheck,
  },
  {
    num: "04",
    title: "Personalized Experiences",
    desc: "Family trips, corporate travel or spontaneous getaways — every itinerary is shaped around you.",
    icon: HeartHandshake,
  },
];

/** "The Manifesto" — 4 chapters in a 2×2 grid whose 1px `gap-px` over bg-white/10 forms the hairlines. */
export default function Manifesto() {
  const reveal = useReveal();

  return (
    <section id="why-us" className="py-24 lg:py-32" data-testid="manifesto-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <motion.div {...reveal({ y: 30, duration: 0.8, margin: "-80px" })} className="mb-16">
          <p className="font-mono2 text-xs tracking-[0.3em] uppercase text-[#E2A855] mb-4">The Manifesto</p>
          <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl uppercase">
            Why Choose <span className="text-outline">Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {chapters.map((c, i) => (
            <motion.div
              key={c.num}
              {...reveal({ y: 40, duration: 0.7, delay: i * 0.12, margin: "-60px" })}
              whileHover={{ backgroundColor: "rgba(226,168,85,0.04)" }}
              className="group relative bg-[#08090C] p-10 lg:p-14"
              data-testid={`manifesto-chapter-${c.num}`}
            >
              <div className="flex items-start justify-between mb-10">
              
                <span className="font-mono2 text-sm text-[#E2A855] tracking-widest">{c.num}</span>
                <c.icon
                  size={28}
                  strokeWidth={1.25}
                  aria-hidden="true"
                  className="text-slate-600 group-hover:text-[#E2A855] transition-colors duration-500"
                />
              </div>
              <h3 className="font-display font-bold uppercase tracking-tight text-xl lg:text-2xl mb-4 group-hover:translate-x-1 transition-transform duration-500">
                {c.title}
              </h3>
              <p className="text-slate-400 leading-relaxed lg:leading-normal text-sm lg:text-base max-w-md">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
