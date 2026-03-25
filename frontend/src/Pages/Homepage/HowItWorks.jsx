// Renders the four-step process cards.

function HowItWorks() {
  const steps = [
    { icon: "📝", title: "Sign Up", desc: "Create your free account in under 2 minutes. Tell us which markets you want to explore and your travel style." },
    { icon: "🤝", title: "Get Matched", desc: "Our smart matching pairs you with a vetted local guide who knows your chosen markets inside-out." },
    { icon: "🗺️", title: "Explore", desc: "Meet your guide at the market entrance. They'll handle navigation, bargaining, and insider introductions." },
    { icon: "🛍️", title: "Take Home Memories", desc: "Leave with authentic finds, great prices, and stories that money can't buy." },
  ];

  return (
    <section id="how-it-works" className="py-24 diagonal-top diagonal-bottom relative"
      style={{ background: "var(--soko-earth)", marginTop: "-1px" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ background: "rgba(232,134,10,0.2)", color: "var(--soko-amber)" }}>Process</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mt-4">
            Four steps to your<br />perfect market day.
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px"
            style={{ background: "rgba(232,134,10,0.3)" }} />

          {steps.map((s, i) => (
            <div key={i} className="card-hover rounded-2xl p-6 text-center"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                style={{ background: "rgba(232,134,10,0.15)" }}>{s.icon}</div>
              <span className="text-xs font-bold tracking-widest uppercase mb-2 block"
                style={{ color: "var(--soko-amber)" }}>Step {i + 1}</span>
              <h3 className="font-display text-xl font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;