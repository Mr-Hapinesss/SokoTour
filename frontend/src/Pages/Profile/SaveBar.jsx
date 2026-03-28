import { Link } from "react-router-dom";

/**
 * Props:
 *  - saving    : bool — true while the PATCH request is in flight
 *  - onSave    : fn   — triggers validation + API call
 */
export default function SaveBar({ saving, onSave }) {
  return (
    <div className="anim-fade-up delay-3" style={{ display: "flex", gap: "12px", alignItems: "center" }}>

      {/* Save button */}
      <button
        onClick={onSave}
        disabled={saving}
        className="btn-shimmer"
        style={{
          flex: 1, padding: "16px", borderRadius: "50px",
          background: saving ? "rgba(26,18,9,0.15)" : "#E8860A",
          color: saving ? "rgba(26,18,9,0.3)" : "white",
          border: "none", fontFamily: "inherit", fontWeight: 700,
          fontSize: "1rem", cursor: saving ? "not-allowed" : "pointer",
          boxShadow: saving ? "none" : "0 8px 24px rgba(232,134,10,0.35)",
          transition: "all 0.25s ease",
        }}
      >
        {saving
          ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <span style={{
                width: "16px", height: "16px", borderRadius: "50%",
                border: "2px solid rgba(26,18,9,0.2)", borderTopColor: "#E8860A",
                animation: "spin 0.7s linear infinite", display: "inline-block",
              }} />
              Saving…
            </span>
          )
          : "Save Changes"}
      </button>

      {/* Cancel — goes back to dashboard without saving */}
      <Link
        to="/main"
        style={{
          padding: "16px 24px", borderRadius: "50px",
          border: "1.5px solid rgba(26,18,9,0.13)", background: "white",
          color: "rgba(26,18,9,0.55)", fontWeight: 600, fontSize: "0.9rem",
          textDecoration: "none", textAlign: "center",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(26,18,9,0.3)"; e.currentTarget.style.color = "#1A1209"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(26,18,9,0.13)"; e.currentTarget.style.color = "rgba(26,18,9,0.55)"; }}
      >
        Cancel
      </Link>
    </div>
  );
}
