import { UPCOMING_TOURS, PAST_TOURS } from "./mainData.js";

/**
 * Props:
 *  - onBookClick : fn — opens the booking modal
 */
export default function ToursTab({ onBookClick }) {
  return (
    <div>
      {/* ── Upcoming Tours ── */}
      <h2 className="font-display" style={{
        fontSize: "1.4rem", fontWeight: 900, color: "#1A1209", marginBottom: "14px",
      }}>
        Upcoming Tours
      </h2>

      {UPCOMING_TOURS.length === 0 ? (
        <div style={{
          background: "white", borderRadius: "16px", padding: "32px",
          textAlign: "center", border: "1px solid rgba(26,18,9,0.07)", marginBottom: "32px",
        }}>
          <p style={{ fontSize: "2rem", marginBottom: "8px" }}>🗓️</p>
          <p style={{ color: "rgba(26,18,9,0.5)", fontSize: "0.9rem" }}>No upcoming tours yet.</p>
          <button
            onClick={onBookClick}
            style={{
              marginTop: "12px", padding: "10px 24px", borderRadius: "50px",
              background: "#E8860A", color: "white", border: "none",
              fontFamily: "inherit", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
            }}
          >
            Book Your First Tour
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
          {UPCOMING_TOURS.map((t, i) => <TourCard key={i} tour={t} />)}
        </div>
      )}

      {/* ── Past Tours ── */}
      <h2 className="font-display" style={{
        fontSize: "1.4rem", fontWeight: 900, color: "#1A1209", marginBottom: "14px",
      }}>
        Past Tours
      </h2>

      {PAST_TOURS.length === 0 ? (
        <p style={{ color: "rgba(26,18,9,0.45)", fontSize: "0.9rem" }}>No past tours yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {PAST_TOURS.map((t, i) => <TourCard key={i} tour={t} />)}
        </div>
      )}
    </div>
  );
}

// ── TourCard ──────────────────────────────────────────────────────────────────
function TourCard({ tour }) {
  return (
    <div style={{
      background: "white", borderRadius: "16px",
      border: "1px solid rgba(26,18,9,0.07)",
      padding: "16px 20px",
      display: "flex", alignItems: "center", gap: "16px",
    }}>
      {/* Emoji icon */}
      <div style={{
        width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
        background: tour.status === "upcoming" ? "rgba(61,107,79,0.1)" : "rgba(26,18,9,0.05)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem",
      }}>
        {tour.emoji}
      </div>

      {/* Tour info */}
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 700, color: "#1A1209", fontSize: "0.95rem" }}>{tour.market}</p>
        <p style={{ fontSize: "0.8rem", color: "rgba(26,18,9,0.5)", marginTop: "2px" }}>
          Guide: {tour.guide} · {tour.date}
        </p>
      </div>

      {/* Status badge */}
      <span style={{
        padding: "4px 12px", borderRadius: "50px",
        fontSize: "0.72rem", fontWeight: 700, flexShrink: 0,
        background: tour.status === "upcoming" ? "rgba(61,107,79,0.1)" : "rgba(26,18,9,0.06)",
        color: tour.status === "upcoming" ? "#3D6B4F" : "rgba(26,18,9,0.45)",
      }}>
        {tour.status === "upcoming" ? "⏳ Upcoming" : "✓ Completed"}
      </span>
    </div>
  );
}
