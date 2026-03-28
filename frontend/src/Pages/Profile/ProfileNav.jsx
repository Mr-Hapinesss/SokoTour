import { Link } from "react-router-dom";

export default function ProfileNav() {
  return (
    <nav className="nav-glass" style={{
      position: "sticky", top: 0, zIndex: 100,
      padding: "14px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo — links back to dashboard */}
      <Link to="/main" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
        <span style={{
          width: "32px", height: "32px", borderRadius: "50%", background: "#E8860A",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: 700, fontSize: "14px",
        }}>S</span>
        <span className="font-display" style={{ fontSize: "1.2rem", fontWeight: 900, color: "#7C3B0F" }}>
          Soko<span style={{ color: "#E8860A" }}>Tour</span>
        </span>
      </Link>

      {/* Back link */}
      <Link
        to="/main"
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "0.85rem", fontWeight: 600,
          color: "rgba(26,18,9,0.55)", textDecoration: "none",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1209")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,18,9,0.55)")}
      >
        ← Back to Dashboard
      </Link>
    </nav>
  );
}
