import { useState } from 'react';
import { faqs } from './Data.jsx';

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-24" style={{ background: "var(--soko-cream)" }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ background: "rgba(232,134,10,0.1)", color: "var(--soko-amber)" }}>FAQ</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-4" style={{ color: "var(--soko-charcoal)" }}>
            Common questions.
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div key={i}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "white",
                border: `1px solid ${open === i ? "var(--soko-amber)" : "rgba(26,18,9,0.08)"}`,
              }}>
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-semibold text-sm md:text-base" style={{ color: "var(--soko-charcoal)" }}>
                  {f.q}
                </span>
                <span className="text-xl ml-4 transition-transform duration-300 flex-shrink-0"
                  style={{
                    color: "var(--soko-amber)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)"
                  }}>+</span>
              </button>
              <div className={`faq-answer ${open === i ? "open" : ""}`}>
                <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "rgba(26,18,9,0.65)" }}>
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;