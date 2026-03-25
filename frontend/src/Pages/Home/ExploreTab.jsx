import { MARKETS, GUIDES } from "./mainData.js";

/**
 * Props:
 *  - onBookClick : fn — opens the booking modal
 */
function ExploreTab({ onBookClick }) {
  return (
    <div>
      {/* ── Markets Grid ── */}
      <h2 className="font-display" style={{
        fontSize: "1.5rem", fontWeight: 900, color: "#1A1209", marginBottom: "16px",
      }}>
        Browse Markets
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "16px", marginBottom: "40px",
      }}>
        {MARKETS.map((m, i) => (
          <div key={i} className="card-lift" style={{
            background: "white", borderRadius: "18px",
            border: "1px solid rgba(26,18,9,0.07)", overflow: "hidden",
          }}>
            {/* Market visual header */}
            <div style={{
              height: "100px",
              background: `linear-gradient(135deg, ${m.color}22, ${m.color}44)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "2.8rem", position: "relative",
            }}>
              {m.emoji}
              <span style={{
                position: "absolute", top: "10px", right: "10px",
                background: m.color, color: "white",
                fontSize: "0.65rem", fontWeight: 700,
                padding: "3px 8px", borderRadius: "50px",
              }}>
                {m.tag}
              </span>
            </div>

            {/* Market info */}
            <div style={{ padding: "14px" }}>
              <p style={{ fontWeight: 700, color: "#1A1209", fontSize: "0.95rem" }}>{m.name}</p>
              <p style={{ fontSize: "0.78rem", color: "rgba(26,18,9,0.5)", marginTop: "2px" }}>
                📍 {m.location}
              </p>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginTop: "10px",
              }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#3D6B4F" }}>
                  ✓ Guides available
                </span>
                <button
                  onClick={onBookClick}
                  style={{
                    fontSize: "0.75rem", fontWeight: 600, color: "#E8860A",
                    background: "none", border: "none", cursor: "pointer",
                    padding: 0, fontFamily: "inherit",
                  }}
                >
                  Book →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recommended Guides ── */}
      <h2 className="font-display" style={{
        fontSize: "1.5rem", fontWeight: 900, color: "#1A1209", marginBottom: "16px",
      }}>
        Recommended Guides
      </h2>

      <div
        className="no-scroll"
        style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px" }}
      >
        {GUIDES.map((g, i) => (
          <div key={i} className="card-lift" style={{
            background: "white", borderRadius: "18px",
            minWidth: "200px", flexShrink: 0,
            border: "1px solid rgba(26,18,9,0.07)",
            padding: "20px 16px", textAlign: "center",
          }}>
            {/* Guide avatar */}
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: `linear-gradient(135deg, ${g.color}, ${g.color}bb)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontWeight: 700, fontSize: "1.1rem",
              margin: "0 auto 10px",
            }}>
              {g.initials}
            </div>

            <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1A1209" }}>{g.name}</p>
            <p style={{ fontSize: "0.75rem", color: "rgba(26,18,9,0.5)", margin: "2px 0 8px" }}>
              {g.specialty}
            </p>

            {/* Star rating */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "4px", marginBottom: "12px",
            }}>
              <span style={{ color: "#E8860A", fontSize: "0.8rem" }}>★</span>
              <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "#1A1209" }}>{g.rating}</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(26,18,9,0.4)" }}>({g.reviews})</span>
            </div>

            <button
              onClick={onBookClick}
              className="btn-shimmer"
              style={{
                width: "100%", padding: "8px", borderRadius: "50px",
                background: "#E8860A", color: "white",
                border: "none", fontFamily: "inherit",
                fontWeight: 600, fontSize: "0.8rem", cursor: "pointer",
              }}
            >
              Book Guide
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreTab;