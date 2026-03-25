// A simple four-column grid showing numbers

import { stats } from './Data.jsx';

function Stats() {
  return (
    <section className="py-20" style={{ background: "var(--soko-cream)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-5xl font-black mb-1" style={{ color: "var(--soko-amber)" }}>{s.value}</p>
              <p className="text-sm font-medium" style={{ color: "rgba(26,18,9,0.55)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;