import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import RegisterStyles from "./RegisterStyles.jsx";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (redirect) {
    return <Navigate to="/signin" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!username || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (response.status === 201) {
      setRedirect(true);
    } else {
      setError("Registration failed. That username may already be taken.");
    }

    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div className="signup-bg flex flex-col items-center justify-center px-4 py-12">

        {/* Decorative blobs */}
        <div className="blob w-25 h-25 -top-12 -right-12 opacity-20"
          style={{ background: "#E8860A" }} />
        <div className="blob w-30 h-30 bottom-0 left-0 opacity-10"
          style={{ background: "#3D6B4F" }} />

        {/* Back button */}
        <div className="w-full max-w-md relative z-10">
          <Link to="/default" className="btn-back">
            ← Back to Home
          </Link>
        </div>

        {/* Card */}
        <div className="signup-card animate-in border rounded-lg p-8 border-gray-200 shadow-lg"
          style={{ background: "rgba(255,255,255,0.8)" }}>

          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/default" className="inline-flex items-center gap-2 justify-center mb-6">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: "#E8860A" }}>S</span>
              <span className="font-display text-xl font-black tracking-tight"
                style={{ color: "#7C3B0F" }}>
                Soko<span style={{ color: "#E8860A" }}>Tour</span>
              </span>
            </Link>
            <h1 className="font-display text-3xl font-black mb-1"
              style={{ color: "#1A1209" }}>Create account</h1>
            <p className="text-sm" style={{ color: "rgba(26,18,9,0.5)" }}>
              Join thousands of market explorers across Kenya
            </p>
          </div>

          {/* Error message */}
          {error && <div className="error-box" style= {{ color: "#b91c1c" }}>⚠ {error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1"
              style={{ color: "rgba(26,18,9,0.45)" }}>Username</label>
            <input
              type="text"
              placeholder="e.g. jane_explorer"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="soko-input bg-gray-100 border-gray-200 rounded-lg focus:border-amber-300 p-2"
            />

            <label className="text-xs font-semibold uppercase tracking-wider block mb-1"
              style={{ color: "rgba(26,18,9,0.45)" }}>Password</label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="soko-input bg-gray-100 border-gray-200 rounded-lg focus:border-amber-300 p-2"
            />

            <label className="text-xs font-semibold uppercase tracking-wider block mb-1"
              style={{ color: "rgba(26,18,9,0.45)" }}>Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="soko-input bg-gray-100 border-gray-200 rounded-lg focus:border-amber-300 p-2"
            />

            <button type="submit" className="btn-primary cursor-pointer hover:bg-amber-500 p-2 rounded-lg" disabled={loading}>
              {loading ? "Creating account…" : "Create My Account →"}
            </button>
          </form>

          <div className="divider" />

          {/* Sign in link */}
          <p className="text-center text-sm m-2" style={{ color: "rgba(26,18,9,0.5)" }}>
            Already have an account?{" "}
            <Link to="/signin" className="font-semibold hover:underline"
              style={{ color: "#E8860A" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;