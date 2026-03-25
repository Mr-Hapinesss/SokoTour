import { Link } from "react-router-dom";

/**
 * Props:
 *  - user              : object — the logged-in user
 *  - isProfileComplete : bool
 *  - onBookClick       : fn    — called when "Book a Tour Guide" is clicked
 */
function HeroBanner({ user, isProfileComplete, onBookClick }) {
  const firstName = user?.fullName?.split(" ")[0] ?? user?.username;

  return (
    <div style={{
      background: "linear-gradient(135deg, #1A1209 0%, #3D1A07 55%, #7C3B0F 100%)",
      padding: "48px 24px 56px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Geometric dot pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "repeating-linear-gradient(45deg, #E8860A 0, #E8860A 1px, transparent 0, transparent 50%)",
        backgroundSize: "28px 28px",
      }} />

      {/* Decorative blob */}
      <div className="blob" style={{
        position: "absolute", top: "-3rem", right: "-3rem",
        width: "14rem", height: "14rem",
        background: "#E8860A", opacity: 0.15, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <p className="anim-fade-up" style={{ color: "rgba(253,246,236,0.55)", fontSize: "0.85rem", marginBottom: "8px" }}>
          🌍 Welcome back
        </p>

        <h1 className="font-display anim-fade-up delay-1" style={{
          fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 900,
          color: "white", lineHeight: 1.15, marginBottom: "12px",
        }}>
          Ready to explore,{" "}
          <span style={{ color: "#E8860A" }}>{firstName}</span>?
        </h1>

        <p className="anim-fade-up delay-2" style={{
          color: "rgba(253,246,236,0.65)", fontSize: "1rem", marginBottom: "32px",
        }}>
          Kenya's most vibrant markets are waiting. Book a local guide and dive in.
        </p>

        {/* CTA button with pulse ring */}
        <div className="anim-fade-up delay-3" style={{ display: "inline-block", position: "relative" }}>
          <div className="pulse-ring" style={{ borderRadius: "50px" }} />
          <button
            onClick={onBookClick}
            className="btn-shimmer"
            style={{
              position: "relative", zIndex: 1,
              padding: "16px 36px", borderRadius: "50px",
              background: "#E8860A", color: "white",
              fontFamily: "inherit", fontWeight: 700, fontSize: "1rem",
              border: "none", cursor: "pointer",
              boxShadow: "0 8px 32px rgba(232,134,10,0.45)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            🗺️ Book a Tour Guide
          </button>
        </div>

        {/* Nudge if profile is incomplete */}
        {!isProfileComplete && (
          <p className="anim-fade-up delay-4" style={{
            marginTop: "14px", fontSize: "0.8rem", color: "rgba(253,246,236,0.45)",
          }}>
            ⚠ Complete your{" "}
            <Link to="/profile" style={{ color: "#E8860A", fontWeight: 600 }}>profile</Link>
            {" "}to unlock bookings
          </p>
        )}
      </div>
    </div>
  );
}

export default HeroBanner;