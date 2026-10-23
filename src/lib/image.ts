/**
 * Responsive image helpers.
 *
 * Every photographic image on the page ships as a set of WebP derivatives
 * generated from the recon originals (`/home/team/shared/clone/recon/originals`):
 *   <name>-480.webp, <name>-768.webp, <name>-1080.webp, <name>-1440.webp
 * plus the full-size `<name>.webp`. Widths that would upscale an original are
 * never requested — `srcSet()` drops them.
 */

/** Widths available as derivative files (see above). */
export const IMG_WIDTHS = [480, 768, 1080, 1440] as const;

/**
 * Build a `srcset` string for an image whose full-size file is `src` and whose
 * intrinsic width is `naturalWidth`. Only derivative widths smaller than the
 * original are emitted; the original is always the largest candidate.
 */
export function srcSet(src: string, naturalWidth: number, widths: readonly number[] = IMG_WIDTHS): string {
  const candidates = widths
    .filter((w) => w < naturalWidth)
    .map((w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`);
  candidates.push(`${src} ${naturalWidth}w`);
  return candidates.join(", ");
}

/** `sizes` for the full-bleed hero (single column at every breakpoint). */
export const HERO_SIZES = "100vw";
/** `sizes` for the two car cards (single column until the lg 2-col grid). */
export const CAR_SIZES = "(min-width: 1024px) 42vw, 92vw";
/** `sizes` for the 12-column destination grid (tiles span 4–8 of 12). */
export const TRIP_SIZES = "(min-width: 1024px) 45vw, 92vw";
