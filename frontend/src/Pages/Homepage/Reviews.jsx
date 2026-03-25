// renders the reviews section by mapping over the reviews array

import { reviews } from './Data.jsx';


function Reviews() {
  return (
    <section id="reviews" className="py-24"
      style={{ background: "linear-gradient(135deg, #1A1209 0%, #2E1608 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ background: "rgba(232,134,10,0.2)", color: "var(--soko-amber)" }}>Reviews</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mt-4">
            What explorers say.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="card-hover rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span key={j} className="star text-lg">★</span>
                ))}
              </div>
              <p className="text-base leading-relaxed mb-6 italic"
                style={{ color: "rgba(255,255,255,0.82)" }}>"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-xs font-bold text-white`}>
                  {r.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{r.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;