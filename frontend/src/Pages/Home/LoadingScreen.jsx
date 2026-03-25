export default function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #1A1209 0%, #3D1A07 50%, #7C3B0F 100%)",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          border: "3px solid rgba(232,134,10,0.3)",
          borderTopColor: "#E8860A",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 16px",
        }} />
        <p style={{ color: "rgba(253,246,236,0.6)", fontSize: "0.875rem" }}>
          Loading your dashboard…
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
