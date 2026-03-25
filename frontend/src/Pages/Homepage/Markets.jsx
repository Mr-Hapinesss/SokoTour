// Renders the six market cards by mapping over the markets array

import { markets } from './Data.jsx';

function Markets() {
  return (
    <section id="markets" className="py-24" style={{ background: "var(--soko-cream)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{ background: "rgba(232,134,10,0.1)", color: "var(--soko-amber)" }}>Destinations</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-4" style={{ color: "var(--soko-charcoal)" }}>
              Kenya's most<br />vibrant markets.
            </h2>
          </div>
          <a href="#signup" className="btn-shimmer px-6 py-3 rounded-full font-semibold text-white text-sm w-fit"
            style={{ background: "var(--soko-amber)" }}>
            Explore All Markets →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {markets.map((m, i) => (
            <div key={i} className="card-hover rounded-2xl overflow-hidden group"
              style={{ background: "white", border: "1px solid rgba(26,18,9,0.08)" }}>
              {/* Visual */}
              <div className="h-40 relative overflow-hidden flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${["#E8860A","#3D6B4F","#7C3B0F","#B5621E","#2D5A3F","#C4732A"][i]}22, ${["#E8860A","#3D6B4F","#7C3B0F","#B5621E","#2D5A3F","#C4732A"][i]}44)` }}>
                <span className="text-6xl guide-img select-none">
                  {["🛖","👗","🥬","👠","📦","🐚"][i]}
                </span>
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: `${["#E8860A","#3D6B4F","#7C3B0F","#B5621E","#2D5A3F","#C4732A"][i]}` }}>
                  {m.tag}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold mb-1" style={{ color: "var(--soko-charcoal)" }}>{m.name}</h3>
                <p className="text-sm flex items-center gap-1" style={{ color: "rgba(26,18,9,0.5)" }}>
                  📍 {m.location}
                </p>
                <div className="mt-4 pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: "rgba(26,18,9,0.06)" }}>
                  <span className="text-xs font-semibold text-green-700">✓ Guides Available</span>
                  <a href="#signup" className="text-xs font-semibold hover:underline"
                    style={{ color: "var(--soko-amber)" }}>Book Now →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Markets;