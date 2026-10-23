import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { EASE } from "./motion";
import { srcSet, HERO_SIZES } from "~/lib/image";

const HERO_IMG = "/img/hero-mountain-road.webp";
const HERO_W = 1920;
const HERO_H = 2880;

const lines = ["DRIVE.", "EXPLORE.", "EXPERIENCE."];

/**
 * Hero (M2–M10). Ported 1:1 from the original, including the pointer parallax
 * (spring-follow on the wrapper + image) that the SPEC summary omitted.
 */
export default function Hero({ onBook }: { onBook: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const { innerWidth, innerHeight } = window;
    mx.set((e.clientX / innerWidth - 0.5) * 24);
    my.set((e.clientY / innerHeight - 0.5) * 16);
  };

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-end overflow-hidden"
      data-testid="hero-section"
    >
      <motion.div style={{ y: bgY, x: sx }} className="absolute inset-[-3%]">
        <motion.img
          src={HERO_IMG}
          srcSet={srcSet(HERO_IMG, HERO_W)}
          sizes={HERO_SIZES}
          alt="Mountain road drive"
          width={HERO_W}
          height={HERO_H}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          initial={reduced ? { scale: 1, opacity: 1 } : { scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0 : 1.6, ease: EASE }}
          className="w-full h-full object-cover"
          style={{ y: sy }}
        />
      </motion.div>
      <div className="absolute inset-0 hero-scrim" />

      <motion.div
        style={reduced ? undefined : { opacity: fade }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pb-16 pt-40"
      >
        <motion.p
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 1.1, duration: reduced ? 0 : 0.8 }}
          className="font-mono2 text-xs tracking-[0.3em] uppercase text-[#E2A855] mb-6"
          data-testid="hero-eyebrow"
        >
          One Destination — Countless Memories
        </motion.p>
        <h1
          className="font-display font-extrabold uppercase leading-[0.95] sm:leading-none tracking-tight text-4xl sm:text-6xl lg:text-8xl"
          data-testid="hero-title"
        >
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? { y: 0 } : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: reduced ? 0 : 0.25 + i * 0.18,
                  duration: reduced ? 0 : 0.9,
                  ease: EASE,
                }}
              >
                {i === 1 ? <span className="text-[#E2A855]">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 1.25, duration: reduced ? 0 : 0.8 }}
          className="mt-8 max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed sm:leading-7"
          data-testid="hero-subtitle"
        >
          Your trusted travel partner for comfortable rides, beautiful places and unforgettable experiences.
        </motion.p>
        <motion.div
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 1.45, duration: reduced ? 0 : 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onBook}
            data-testid="hero-book-button"
            className="group flex items-center gap-3 px-8 py-4 bg-[#E2A855] text-[#08090C] font-mono2 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#F0B865] transition-colors duration-300"
          >
            Book Your Trip
            <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          <a
            href="#cars"
            data-testid="hero-explore-cars-button"
            className="px-8 py-4 border border-white/25 font-mono2 text-xs tracking-[0.2em] uppercase text-slate-200 hover:border-[#E2A855] hover:text-[#E2A855] transition-colors duration-300"
          >
            Explore Cars
          </a>
        </motion.div>
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 2, duration: reduced ? 0 : 1 }}
          className="mt-16 flex items-center gap-3 font-mono2 text-[10px] tracking-[0.3em] uppercase text-slate-500"
        >
          <ArrowDown size={14} aria-hidden="true" className="animate-bounce" /> Scroll to explore
        </motion.div>
      </motion.div>
    </section>
  );
}
