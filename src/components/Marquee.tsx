const items = [
  "DRIVE",
  "EXPLORE",
  "EXPERIENCE",
  "VITARA BREZZA",
  "GRAND VITARA",
  "HILL STATIONS",
  "BEACH GETAWAYS",
  "ROAD TRIPS",
  "HOLIDAYS",
];

/**
 * Infinite word marquee (M11): CSS translateX(0 → -50%) over 40s linear,
 * paused on hover. The list is rendered twice so the -50% loop is seamless.
 *
 * Accessibility: only the *duplicated* copy is `aria-hidden`, so assistive tech
 * reads the words once instead of twice. The two groups are flex siblings with
 * identical widths, so the visual result is byte-for-byte the same as the
 * original flat list.
 */
function MarqueeGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0" aria-hidden={duplicate ? "true" : undefined}>
      {items.map((item) => (
        <span key={item} className="flex items-center shrink-0">
          <span className="font-display font-bold uppercase tracking-wider text-lg text-slate-500 px-6">{item}</span>
          <span className="text-[#E2A855] text-xs">◆</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative border-y border-white/10 bg-[#0C0E13] py-5 overflow-hidden" data-testid="marquee-section">
      <div className="flex w-max animate-marquee">
        <MarqueeGroup />
        <MarqueeGroup duplicate />
      </div>
    </div>
  );
}
