export default function ProfileBanner() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1A1209 0%, #3D1A07 55%, #7C3B0F 100%)",
      padding: "40px 24px 80px", position: "relative", overflow: "hidden",
    }}>
      {/* Geometric dot pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "repeating-linear-gradient(45deg, #E8860A 0, #E8860A 1px, transparent 0, transparent 50%)",
        backgroundSize: "28px 28px",
      }} />

      {/* Decorative blob */}
      <div className="blob" style={{
        position: "absolute", top: "-2rem", right: "-2rem",
        width: "12rem", height: "12rem", background: "#E8860A", opacity: 0.15,
      }} />

      <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <p style={{ color: "rgba(253,246,236,0.5)", fontSize: "0.8rem", marginBottom: "6px" }}>
          Account
        </p>
        <h1 className="font-display" style={{
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900,
          color: "white", marginBottom: "8px",
        }}>
          Your Profile
        </h1>
        <p style={{ color: "rgba(253,246,236,0.6)", fontSize: "0.95rem" }}>
          Keep your details up to date to unlock the full SokoTour experience.
        </p>
      </div>
    </div>
  );
}
