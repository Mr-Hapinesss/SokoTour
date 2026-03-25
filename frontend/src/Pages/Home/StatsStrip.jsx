const STATS = [
  ["40+",    "Markets"],
  ["120+",   "Guides"],
  ["3,200+", "Explorers"],
  ["4.9★",   "Rating"],
];

export default function StatsStrip() {
  return (
    <div style={{
      background: "#E8860A", padding: "14px 24px",
      display: "flex", justifyContent: "center",
      gap: "clamp(24px, 6vw, 80px)", flexWrap: "wrap",
    }}>
      {STATS.map(([value, label]) => (
        <div key={label} style={{ textAlign: "center" }}>
          <p style={{ fontWeight: 900, fontSize: "1.1rem", color: "white" }}>{value}</p>
          <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{label}</p>
        </div>
      ))}
    </div>
  );
}
