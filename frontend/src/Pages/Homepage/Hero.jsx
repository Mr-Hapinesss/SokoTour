// The full-screen landing section.


function Hero() {

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grain"
      style={{ background: "linear-gradient(135deg, #1A1209 0%, #3D1A07 50%, #7C3B0F 100%)" }}>

      {/* Decorative blobs */}
      <div className="blob absolute -top-32 -right-32 w-96 h-96 opacity-20 anim-float"
        style={{ background: "var(--soko-amber)" }} />
      <div className="blob absolute bottom-0 left-0 w-64 h-64 opacity-10 anim-float delay-300"
        style={{ background: "var(--soko-sage)" }} />

      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #E8860A 0, #E8860A 1px, transparent 0, transparent 50%)`,
        backgroundSize: "30px 30px"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center pt-28 pb-20">
        {/* Left copy */}
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6 anim-fade-up"
            style={{ background: "rgba(232,134,10,0.2)", color: "var(--soko-amber)", border: "1px solid rgba(232,134,10,0.3)" }}>
            🌍 Kenya's #1 Market Guide Service
          </span>

          <h1 className="font-display text-5xl md:text-7xl font-black leading-none text-white mb-6 anim-fade-up delay-100">
            Navigate<br />
            <span style={{ color: "var(--soko-amber)" }}>Kenya's</span><br />
            Markets<br />
            Like a Local.
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-10 anim-fade-up delay-200"
            style={{ color: "rgba(255,255,255,0.7)" }}>
            Sign up in minutes, get matched with a vetted local guide,
            and explore Nairobi's most vibrant markets — without the overwhelm.
          </p>

          <div className="flex flex-wrap gap-4 anim-fade-up delay-300">
            <a href="#signup"
              className="btn-shimmer inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white text-base transition-all duration-200 hover:scale-105"
              style={{ background: "var(--soko-amber)" }}>
              Get Your Guide →
            </a>
            <a href="#how-it-works"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base border transition-all duration-200 hover:bg-white hover:text-gray-900"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
              See How It Works
            </a>
          </div>

          {/* Trust bar */}
          <div className="flex items-center gap-6 mt-10 anim-fade-up delay-400">
            <div className="flex -space-x-2">
              {["AH","JO","SM","DK"].map((i, idx) => (
                <div key={idx} className={`w-8 h-8 rounded-full border-2 border-gray-800 flex items-center justify-center text-xs font-bold text-white ${["bg-amber-500","bg-green-700","bg-orange-700","bg-yellow-700"][idx]}`}>{i}</div>
              ))}
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <strong className="text-white">3,200+</strong> explorers guided this year
            </p>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative flex justify-center anim-fade-in delay-400">
          {/* Main card */}
          <div className="relative w-72 md:w-80 rounded-3xl p-1 anim-pulse"
            style={{ background: "linear-gradient(135deg, var(--soko-amber), var(--soko-earth))" }}>
            <div className="rounded-3xl overflow-hidden" style={{ background: "#2A1A08" }}>
              <div className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #3D2010, #7C3B0F)" }}>
                <span className="text-8xl select-none">🏪</span>
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: "radial-gradient(circle, var(--soko-amber) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-sm font-bold text-white">GW</div>
                  <div>
                    <p className="font-semibold text-sm text-white">Grace Wanjiru</p>
                    <p className="text-xs" style={{ color: "var(--soko-amber)" }}>Maasai Market Specialist</p>
                  </div>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-900 text-green-300">● Online</span>
                </div>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                  "I'll take you to my favourite beadwork vendor — she's been here 20 years."
                </p>
                <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-80"
                  style={{ background: "var(--soko-amber)" }}>
                  Book Grace Now
                </button>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-4 -right-4 md:right-0 bg-white rounded-2xl px-4 py-3 shadow-xl anim-float delay-200">
            <p className="text-xs font-semibold" style={{ color: "var(--soko-charcoal)" }}>⭐ 4.97 / 5.00</p>
            <p className="text-xs" style={{ color: "rgba(26,18,9,0.5)" }}>Based on 3,200+ reviews</p>
          </div>

          {/* Floating badge 2 */}
          <div className="absolute -bottom-4 -left-4 md:left-0 bg-white rounded-2xl px-4 py-3 shadow-xl anim-float delay-400">
            <p className="text-xs font-semibold" style={{ color: "var(--soko-charcoal)" }}>🗺️ 40+ Markets</p>
            <p className="text-xs" style={{ color: "rgba(26,18,9,0.5)" }}>Across Kenya</p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 anim-fade-in delay-600">
        <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Scroll</span>
        <div className="w-px h-12 opacity-30" style={{ background: "var(--soko-amber)" }} />
      </div>
    </section>
  );
}

export default Hero;