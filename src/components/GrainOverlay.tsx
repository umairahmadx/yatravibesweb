/** Fixed full-viewport film-grain overlay (z-60, opacity .04, mix-blend overlay).
 *  The original loaded grain from an external service; we ship a local SVG
 *  substitute at the identical (imperceptible) opacity. */
export default function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
