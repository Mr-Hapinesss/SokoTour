//The email capture section at the bottom. It has two pieces of state: email (the controlled input value) and submitted (a boolean). 
// HandleSubmit checks that email is non-empty and flips submitted to true, which swaps the form out for a success message. 

import { useState } from 'react';

function SignupCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="signup" className="py-28 relative overflow-hidden"
      style={{ background: "var(--soko-sage)" }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "28px 28px"
      }} />
      <div className="blob absolute -top-20 -left-20 w-64 h-64 opacity-20"
        style={{ background: "white" }} />
      <div className="blob absolute -bottom-20 -right-20 w-96 h-96 opacity-10"
        style={{ background: "var(--soko-amber)" }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
          style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>Get Started Free</span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-6 mb-4">
          Your market<br />adventure awaits.
        </h2>
        <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.75)" }}>
          Sign up today, your first guide consultation is completely free.
        </p>

        {submitted ? (
          <div className="rounded-2xl p-8 text-center"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <span className="text-4xl">🎉</span>
            <p className="font-display text-2xl font-bold text-white mt-4">You're in!</p>
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
              Check your inbox — we're matching you with a guide now.
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-4 rounded-full text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
              }}
            />
            <button
              onClick={handleSubmit}
              className="btn-shimmer px-7 py-4 rounded-full font-semibold text-sm text-white whitespace-nowrap transition-all hover:scale-105"
              style={{ background: "var(--soko-amber)" }}>
              Get My Guide →
            </button>
          </div>
        )}

        <p className="text-xs mt-5" style={{ color: "rgba(255,255,255,0.45)" }}>
          No credit card required · Cancel anytime · Guides available 7 days a week
        </p>
      </div>
    </section>
  );
}

export default SignupCTA;