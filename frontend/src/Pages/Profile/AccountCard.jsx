/**
 * Props:
 *  - username   : string — read-only, cannot be changed
 *  - onDelete   : fn     — called when user confirms account deletion
 */
export default function AccountCard({ username, onDelete }) {
  return (
    <div className="profile-card anim-fade-up delay-2">
      <h2 className="font-display" style={{
        fontSize: "1.15rem", fontWeight: 900, color: "#1A1209", marginBottom: "20px",
      }}>
        Account
      </h2>

      {/* ── Username (read-only) ── */}
      <div style={{ marginBottom: "18px" }}>
        <label className="field-label">Username</label>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
            fontSize: "0.9rem", color: "rgba(26,18,9,0.3)",
          }}>@</span>
          <input
            className="soko-input"
            type="text"
            value={username ?? ""}
            disabled
            style={{ paddingLeft: "32px" }}
          />
        </div>
        <p style={{ fontSize: "0.72rem", color: "rgba(26,18,9,0.35)", marginTop: "5px" }}>
          Username cannot be changed.
        </p>
      </div>

      {/* ── Danger zone ── */}
      <div style={{
        marginTop: "8px", padding: "14px 16px", borderRadius: "14px",
        background: "rgba(185,28,28,0.04)", border: "1.5px solid rgba(185,28,28,0.12)",
      }}>
        <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#b91c1c", marginBottom: "4px" }}>
          Danger zone
        </p>
        <p style={{ fontSize: "0.78rem", color: "rgba(26,18,9,0.5)", marginBottom: "12px" }}>
          Deleting your account is permanent and cannot be undone.
        </p>
        <button
          onClick={onDelete}
          style={{
            padding: "8px 18px", borderRadius: "50px",
            border: "1.5px solid rgba(185,28,28,0.3)",
            background: "transparent", color: "#b91c1c",
            fontFamily: "inherit", fontWeight: 600, fontSize: "0.8rem",
            cursor: "pointer", transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#b91c1c"; e.currentTarget.style.color = "white"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#b91c1c"; }}
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}
