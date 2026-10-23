import { useReducedMotion } from "framer-motion";

/** Shared easing curve used by every framer-motion transition in the original. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export type RevealOptions = {
  /** Travel distance in px (original: 30 for headers, 40 for cards/tiles, 50 for car cards). */
  y?: number;
  duration?: number;
  delay?: number;
  /** viewport margin — the original shrinks the trigger box ("-80px" headers, "-60px" cards). */
  margin?: string;
};

/**
 * whileInView reveal props, ported 1:1 from the original components.
 *
 * Deviation: under `prefers-reduced-motion: reduce` the element resolves
 * straight to its final state (no travel, no delay, duration 0). The original
 * had no reduced-motion handling at all.
 */
export function useReveal() {
  const reduced = useReducedMotion();

  return (opts: RevealOptions = {}) => {
    const { y = 30, duration = 0.8, delay = 0, margin = "-80px" } = opts;
    if (reduced) {
      return {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0 },
      } as const;
    }
    return {
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin },
      transition: { duration, delay, ease: EASE },
    };
  };
}
