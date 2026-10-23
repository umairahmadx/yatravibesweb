import { motion } from "framer-motion";
import { Users, Luggage, Fuel, ArrowUpRight } from "lucide-react";
import { useReveal } from "./motion";
import { srcSet, CAR_SIZES } from "~/lib/image";

const cars = [
  {
    id: "brezza",
    name: "Vitara Brezza",
    tag: "Compact SUV",
    img: "/img/car-vitara-brezza.webp",
    w: 1200,
    h: 899,
    desc: "Nimble and efficient — the perfect companion for hill stations, winding roads and spontaneous road trips.",
    seats: "5 Seats",
    boot: "328L Boot",
    fuel: "Petrol / CNG",
    badges: ["Hill Ready", "City Friendly", "Family Favourite"],
  },
  {
    id: "grand-vitara",
    name: "Grand Vitara",
    tag: "Premium SUV",
    img: "/img/car-grand-vitara.webp",
    w: 1200,
    h: 801,
    desc: "AllGrip confidence with premium comfort — built for long outstation journeys and corporate travel.",
    seats: "5 Seats",
    boot: "373L Boot",
    fuel: "Hybrid / AWD",
    badges: ["AllGrip AWD", "Premium Cabin", "Long Distance"],
  },
];

/** "The Fleet" — two spotlight cards: cursor-tracked gold radial (M17) + clipped-frame image. */
export default function Cars({ onBook }: { onBook: (car: string) => void }) {
  const reveal = useReveal();

  const handleSpot = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  return (
    <section id="cars" className="py-24 lg:py-32 bg-[#0C0E13] border-y border-white/10" data-testid="cars-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <motion.div
          {...reveal({ y: 30, duration: 0.8, margin: "-80px" })}
          className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <p className="font-mono2 text-xs tracking-[0.3em] uppercase text-[#E2A855] mb-4">The Fleet</p>
            <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl uppercase">
              Spacious <span className="text-outline">Cars</span>
            </h2>
          </div>
          <p className="max-w-md text-slate-400 text-sm lg:text-base leading-relaxed lg:leading-normal">
            Travel in comfort with our well-maintained SUVs — perfect for family trips, outstation journeys and
            corporate travel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cars.map((car, i) => (
            <motion.article
              key={car.id}
              {...reveal({ y: 50, duration: 0.8, delay: i * 0.15, margin: "-60px" })}
              onMouseMove={handleSpot}
              className="spotlight-card group bg-[#111319] border border-white/10 hover:border-[#E2A855]/40 transition-colors duration-500"
              data-testid={`car-card-${car.id}`}
            >
              <div className="clipped-frame relative h-64 sm:h-80 overflow-hidden m-4 mb-0">
                <img
                  src={car.img}
                  srcSet={srcSet(car.img, car.w)}
                  sizes={CAR_SIZES}
                  alt={`${car.name} — ${car.tag}`}
                  width={car.w}
                  height={car.h}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 font-mono2 text-[10px] tracking-[0.25em] uppercase bg-[#08090C]/80 backdrop-blur px-3 py-1.5 text-[#E2A855]">
                  {car.tag}
                </span>
              </div>

              <div className="p-8">
                <h3 className="font-display font-bold uppercase tracking-tight text-2xl mb-3">{car.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{car.desc}</p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 font-mono2 text-[11px] tracking-widest uppercase text-slate-300">
                  <span className="flex items-center gap-2">
                    <Users size={13} aria-hidden="true" className="text-[#E2A855]" />
                    {car.seats}
                  </span>
                  <span className="flex items-center gap-2">
                    <Luggage size={13} aria-hidden="true" className="text-[#E2A855]" />
                    {car.boot}
                  </span>
                  <span className="flex items-center gap-2">
                    <Fuel size={13} aria-hidden="true" className="text-[#E2A855]" />
                    {car.fuel}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {car.badges.map((b) => (
                    <span
                      key={b}
                      className="px-3 py-1 border border-white/15 font-mono2 text-[10px] tracking-widest uppercase text-slate-400"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onBook(car.name)}
                  data-testid={`book-car-${car.id}-button`}
                  className="group/btn flex items-center gap-3 px-6 py-3 border border-[#E2A855] text-[#E2A855] font-mono2 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#E2A855] hover:text-[#08090C] transition-colors duration-300"
                >
                  Book This Car
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
