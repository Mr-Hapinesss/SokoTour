// The scrolling amber ticker strip.

import { markets } from './Data.jsx';

function Marquee() {
  const items = [...markets, ...markets];
  return (
    <div className="py-5 overflow-hidden border-y"
      style={{ background: "var(--soko-amber)", borderColor: "var(--soko-earth)" }}>
      <div className="marquee-track whitespace-nowrap">
        {items.concat(items).map((m, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 text-sm font-semibold text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-60" />
            {m.name} — {m.location}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;