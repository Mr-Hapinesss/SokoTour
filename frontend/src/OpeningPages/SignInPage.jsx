import { useState } from "react";
import { Navigate, Link } from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (redirect) {
    return <Navigate to="/main" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!username || !password) {
      setError("All fields are required.");
      return;
    }
    if (username.length < 4) {
      setError("Username must be at least 4 characters long.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    // Send login request to backend
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include", // Include cookies in the request
    });

    setLoading(false);

    if (response.ok) {
      setRedirect(true);
      window.location.href = "/main";
    } else {
      setError("Login failed. Please check your credentials and try again.");
    }

    // Clear form fields
    setUsername("");
    setPassword("");
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-4 py-12"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1A1209 0%, #3D1A07 50%, #7C3B0F 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background geometric pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, #E8860A 0, #E8860A 1px, transparent 0, transparent 50%)",
        backgroundSize: "30px 30px",
        opacity: 0.04, pointerEvents: "none",
      }} />

      {/* Decorative blobs */}
      <div className="blob" style={{
        position: "absolute", top: "-4rem", right: "-4rem",
        width: "18rem", height: "18rem",
        background: "#E8860A", opacity: 0.18, pointerEvents: "none",
      }} />
      <div className="blob" style={{
        position: "absolute", bottom: 0, left: 0,
        width: "12rem", height: "12rem",
        background: "#3D6B4F", opacity: 0.1, pointerEvents: "none",
      }} />

      {/* Back button */}
      <div className="w-full max-w-md" style={{ position: "relative", zIndex: 10 }}>
        <Link
          to="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontSize: "0.8rem", fontWeight: 600,
            color: "rgba(253,246,236,0.65)",
            textDecoration: "none", marginBottom: "24px",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FDF6EC")}
          onMouseLeave={(e) => (e.target.style.color = "rgba(253,246,236,0.65)")}
        >
          ← Back to Home
        </Link>
      </div>

      {/* Card */}
      <div style={{
        background: "#FDF6EC",
        borderRadius: "24px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
        width: "100%", maxWidth: "420px",
        padding: "40px 36px",
        position: "relative", zIndex: 10,
        animation: "fadeUp 0.6s ease both",
      }}>

        {/* Logo */}
        <div className="text-center" style={{ marginBottom: "2rem" }}>
          <Link to="/" style={{
            display: "inline-flex", alignItems: "center",
            gap: "8px", justifyContent: "center",
            marginBottom: "1.5rem", textDecoration: "none",
          }}>
            <span style={{
              width: "2rem", height: "2rem", borderRadius: "50%",
              background: "#E8860A", display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "0.875rem", fontWeight: 700,
            }}>S</span>
            <span className="font-display" style={{ fontSize: "1.25rem", fontWeight: 900, color: "#7C3B0F" }}>
              Soko<span style={{ color: "#E8860A" }}>Tour</span>
            </span>
          </Link>

          <h1 className="font-display" style={{ fontSize: "1.75rem", fontWeight: 900, color: "#1A1209", marginBottom: "0.25rem" }}>
            Welcome back
          </h1>
          <p style={{ fontSize: "0.875rem", color: "rgba(26,18,9,0.5)" }}>
            Sign in to access your guide and markets
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            background: "rgba(185,28,28,0.08)",
            border: "1px solid rgba(185,28,28,0.25)",
            borderRadius: "10px", padding: "10px 14px",
            fontSize: "0.8rem", color: "#b91c1c", marginBottom: "16px",
          }}>
            ⚠ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>

          <label style={{
            display: "block", fontSize: "0.7rem", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.08em",
            color: "rgba(26,18,9,0.45)", marginBottom: "4px",
          }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%", padding: "13px 16px", borderRadius: "12px",
              border: "1.5px solid rgba(26,18,9,0.15)", background: "white",
              fontFamily: "inherit", fontSize: "0.875rem", color: "#1A1209",
              outline: "none", marginBottom: "14px", display: "block",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => { e.target.style.borderColor = "#E8860A"; e.target.style.boxShadow = "0 0 0 3px rgba(232,134,10,0.12)"; }}
            onBlur={(e)  => { e.target.style.borderColor = "rgba(26,18,9,0.15)"; e.target.style.boxShadow = "none"; }}
          />

          <label style={{
            display: "block", fontSize: "0.7rem", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.08em",
            color: "rgba(26,18,9,0.45)", marginBottom: "4px",
          }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%", padding: "13px 16px", borderRadius: "12px",
              border: "1.5px solid rgba(26,18,9,0.15)", background: "white",
              fontFamily: "inherit", fontSize: "0.875rem", color: "#1A1209",
              outline: "none", marginBottom: "20px", display: "block",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => { e.target.style.borderColor = "#E8860A"; e.target.style.boxShadow = "0 0 0 3px rgba(232,134,10,0.12)"; }}
            onBlur={(e)  => { e.target.style.borderColor = "rgba(26,18,9,0.15)"; e.target.style.boxShadow = "none"; }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "14px", borderRadius: "50px",
              background: "#E8860A", color: "white", fontFamily: "inherit",
              fontWeight: 600, fontSize: "0.9rem", border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => { if (!loading) e.target.style.opacity = 0.88; }}
            onMouseLeave={(e) => { if (!loading) e.target.style.opacity = 1; }}
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(26,18,9,0.08)", margin: "20px 0" }} />

        {/* Sign up link */}
        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "rgba(26,18,9,0.5)" }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "#E8860A", fontWeight: 600, textDecoration: "none" }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Sign up free
          </Link>
        </p>
      </div>

      {/* fadeUp keyframe — safe to keep here; harmless if GlobalStyles is also mounted */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default SignIn;
