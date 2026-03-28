import { useRef } from "react";
import { completeness } from "./profileHelpers.js";

/**
 * Props:
 *  - form         : object  — the full form state
 *  - initials     : string  — fallback letters when no photo
 *  - onPhotoChange: fn      — called with the file input change event
 *  - photoError   : string  — error message for photo (if any)
 */
export default function AvatarCard({ form, initials, onPhotoChange, photoError }) {
  const fileInputRef = useRef(null);
  const pct = completeness(form);

  return (
    <>
      <div className="profile-card anim-fade-up" style={{
        display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap",
      }}>

        {/* ── Avatar circle ── */}
        <div className="avatar-wrap" style={{ position: "relative", width: "96px", height: "96px", flexShrink: 0 }}>
          <div style={{
            width: "96px", height: "96px", borderRadius: "50%",
            background: form.photoPreview ? "transparent" : "linear-gradient(135deg, #E8860A, #7C3B0F)",
            border: "3px solid rgba(232,134,10,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", fontSize: "2rem", fontWeight: 700, color: "white",
          }}>
            {form.photoPreview
              ? <img src={form.photoPreview} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : initials}
          </div>

          {/* Camera overlay on hover */}
          <div className="avatar-overlay" onClick={() => fileInputRef.current?.click()}>
            <span style={{ fontSize: "1.3rem" }}>📷</span>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef} type="file" accept="image/*"
            style={{ display: "none" }} onChange={onPhotoChange}
          />

          {/* Pencil badge */}
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              position: "absolute", bottom: 0, right: 0,
              width: "28px", height: "28px", borderRadius: "50%",
              background: "#E8860A", border: "2px solid white",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "0.75rem",
            }}
            title="Change photo"
          >✎</button>
        </div>

        {/* ── Name + completeness bar ── */}
        <div style={{ flex: 1, minWidth: "180px" }}>
          <p className="font-display" style={{ fontSize: "1.3rem", fontWeight: 900, color: "#1A1209" }}>
            {form.fullName || "Your Name"}
          </p>
          <p style={{ fontSize: "0.8rem", color: "rgba(26,18,9,0.45)", marginBottom: "10px" }}>
            {form.email || "your@email.com"}
          </p>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span style={{
                fontSize: "0.7rem", fontWeight: 600,
                color: "rgba(26,18,9,0.45)", textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                Profile completeness
              </span>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: pct === 100 ? "#3D6B4F" : "#E8860A" }}>
                {pct}%
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ height: "6px", borderRadius: "50px", background: "rgba(26,18,9,0.08)" }}>
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>

            {pct === 100 && (
              <p style={{ fontSize: "0.72rem", color: "#3D6B4F", fontWeight: 600, marginTop: "5px" }}>
                ✓ Profile complete — you're ready to book!
              </p>
            )}
            {pct < 100 && (
              <p style={{ fontSize: "0.72rem", color: "rgba(26,18,9,0.4)", marginTop: "5px" }}>
                Fill all fields to unlock bookings
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Photo error message */}
      {photoError && (
        <p style={{
          color: "#b91c1c", fontSize: "0.78rem",
          marginTop: "-12px", marginBottom: "12px", paddingLeft: "4px",
        }}>
          ⚠ {photoError}
        </p>
      )}
    </>
  );
}
