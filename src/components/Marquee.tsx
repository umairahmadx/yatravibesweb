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
 */
export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      className="relative border-y border-white/10 bg-[#0C0E13] py-5 overflow-hidden"
      data-testid="marquee-section"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {row.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-display font-bold uppercase tracking-wider text-lg text-slate-500 px-6">
              {item}
            </span>
            <span className="text-[#E2A855] text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
