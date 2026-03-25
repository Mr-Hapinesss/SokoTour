import { Link } from "react-router-dom";

/**
 * Props:
 *  - onClose : fn — closes the modal
 */
export default function IncompleteProfileModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FDF6EC", borderRadius: "24px",
          padding: "36px 32px", maxWidth: "380px", width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
          animation: "fadeUp 0.3s ease", textAlign: "center",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "12px" }}>⚠️</div>

        <h3 className="font-display" style={{
          fontSize: "1.3rem", fontWeight: 900, color: "#1A1209", marginBottom: "8px",
        }}>
          Profile Incomplete
        </h3>

        <p style={{
          fontSize: "0.875rem", color: "rgba(26,18,9,0.6)",
          marginBottom: "24px", lineHeight: 1.6,
        }}>
          Please add your <strong>full name</strong> and <strong>phone number</strong> to
          your profile before booking a tour guide.
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            to="/profile"
            style={{
              flex: 1, padding: "12px", borderRadius: "50px",
              background: "#E8860A", color: "white", fontWeight: 600,
              fontSize: "0.875rem", textAlign: "center", textDecoration: "none",
            }}
          >
            Complete Profile
          </Link>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "12px", borderRadius: "50px",
              border: "1.5px solid rgba(26,18,9,0.15)", background: "white",
              color: "#1A1209", fontWeight: 600, fontSize: "0.875rem",
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
