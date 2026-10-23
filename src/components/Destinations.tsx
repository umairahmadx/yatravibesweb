import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { useReveal } from "./motion";

const trips = [
  {
    id: "holidays",
    title: "Holidays",
    img: "/img/trip-holidays.webp",
    w: 1400,
    h: 2100,
    duration: "Multi-day",
    tags: ["Family", "Relaxed"],
    span: "lg:col-span-7",
  },
  {
    id: "road-trips",
    title: "Road Trips",
    img: "/img/trip-road-trips.webp",
    w: 1000,
    h: 750,
    duration: "Weekend",
    tags: ["Friends", "Scenic"],
    span: "lg:col-span-5",
  },
  {
    id: "beach-getaways",
    title: "Beach Getaways",
    img: "/img/trip-beach-getaways.webp",
    w: 1000,
    h: 665,
    duration: "2–4 days",
    tags: ["Coastal", "Sunset"],
    span: "lg:col-span-5",
  },
  {
    id: "hill-stations",
    title: "Hill Stations",
    img: "/img/trip-hill-stations.webp",
    w: 1400,
    h: 2100,
    duration: "3–5 days",
    tags: ["Mountains", "Cool Air"],
    span: "lg:col-span-7",
  },
];

/** "Where To Next" — four trip tiles in a 12-column grid (spans 7/5/5/7). Each opens the enquiry modal with a preset. */
export default function Destinations({ onBook }: { onBook: (destination: string) => void }) {
  const reveal = useReveal();

  return (
    <section id="trips" className="py-24 lg:py-32" data-testid="destinations-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <motion.div {...reveal({ y: 30, duration: 0.8, margin: "-80px" })} className="mb-16">
          <p className="font-mono2 text-xs tracking-[0.3em] uppercase text-[#E2A855] mb-4">Where To Next</p>
          <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl uppercase">
            Explore. Experience. <span className="text-outline">Enjoy.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {trips.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => onBook(t.title)}
              {...reveal({ y: 40, duration: 0.7, delay: i * 0.1, margin: "-60px" })}
              className={`group relative h-72 sm:h-96 overflow-hidden text-left border border-white/10 hover:border-[#E2A855]/40 transition-colors duration-500 ${t.span}`}
              data-testid={`trip-card-${t.id}`}
            >
              <img
                src={t.img}
                alt={`${t.title} — ${t.duration} trip`}
                width={t.w}
                height={t.h}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#E2A855] mb-2">
                    <Clock size={12} aria-hidden="true" /> {t.duration}
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-tight text-2xl">{t.title}</h3>
                  <div className="flex gap-2 mt-3">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 border border-white/25 font-mono2 text-[9px] tracking-widest uppercase text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="shrink-0 w-11 h-11 flex items-center justify-center border border-white/30 group-hover:bg-[#E2A855] group-hover:border-[#E2A855] group-hover:text-[#08090C] transition-colors duration-300">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
