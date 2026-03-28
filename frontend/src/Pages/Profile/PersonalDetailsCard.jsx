/**
 * Props:
 *  - form        : object — full form state
 *  - errors      : object — field-level error messages
 *  - onChange    : fn     — handleChange(field, value)
 */
export default function PersonalDetailsCard({ form, errors, onChange }) {
  return (
    <div className="profile-card anim-fade-up delay-1">
      <h2 className="font-display" style={{
        fontSize: "1.15rem", fontWeight: 900, color: "#1A1209", marginBottom: "20px",
      }}>
        Personal Details
      </h2>

      {/* ── Full name ── */}
      <div style={{ marginBottom: "18px" }}>
        <label className="field-label">Full Name</label>
        <input
          className="soko-input"
          type="text"
          placeholder="e.g. Amira Hassan"
          value={form.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          style={{ borderColor: errors.fullName ? "#b91c1c" : undefined }}
        />
        {errors.fullName && (
          <p style={{ color: "#b91c1c", fontSize: "0.75rem", marginTop: "5px" }}>⚠ {errors.fullName}</p>
        )}
      </div>

      {/* ── Phone ── */}
      <div style={{ marginBottom: "18px" }}>
        <label className="field-label">Phone Number</label>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
            fontSize: "0.9rem", color: "rgba(26,18,9,0.4)",
          }}>📱</span>
          <input
            className="soko-input"
            type="tel"
            placeholder="+254 700 000 000"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            style={{ paddingLeft: "38px", borderColor: errors.phone ? "#b91c1c" : undefined }}
          />
        </div>
        {errors.phone && (
          <p style={{ color: "#b91c1c", fontSize: "0.75rem", marginTop: "5px" }}>⚠ {errors.phone}</p>
        )}
      </div>

      {/* ── Email ── */}
      <div style={{ marginBottom: "8px" }}>
        <label className="field-label">Email Address</label>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
            fontSize: "0.9rem", color: "rgba(26,18,9,0.4)",
          }}>✉️</span>
          <input
            className="soko-input"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            style={{ paddingLeft: "38px", borderColor: errors.email ? "#b91c1c" : undefined }}
          />
        </div>
        {errors.email && (
          <p style={{ color: "#b91c1c", fontSize: "0.75rem", marginTop: "5px" }}>⚠ {errors.email}</p>
        )}
      </div>

      {/* ── Promo emails toggle ── */}
      <div
        onClick={() => onChange("promoEmails", !form.promoEmails)}
        style={{
          marginTop: "14px", padding: "14px 16px", borderRadius: "14px",
          cursor: "pointer",
          background: form.promoEmails ? "rgba(232,134,10,0.06)" : "rgba(26,18,9,0.03)",
          border: `1.5px solid ${form.promoEmails ? "rgba(232,134,10,0.25)" : "rgba(26,18,9,0.1)"}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
          transition: "all 0.25s ease",
        }}
      >
        <div>
          <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "#1A1209", marginBottom: "2px" }}>
            📬 Promotional emails
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(26,18,9,0.5)", lineHeight: 1.4 }}>
            Receive market tips, new guide announcements, and exclusive deals.
          </p>
        </div>

        {/* Toggle switch */}
        <div className={`toggle-track ${form.promoEmails ? "on" : "off"}`}>
          <div className={`toggle-thumb ${form.promoEmails ? "on" : ""}`} />
        </div>
      </div>

      <p style={{ fontSize: "0.72rem", color: "rgba(26,18,9,0.35)", marginTop: "8px", paddingLeft: "2px" }}>
        You can change this preference at any time.
      </p>
    </div>
  );
}
