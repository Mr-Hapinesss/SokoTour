import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Props:
 *  - user            : object  — the logged-in user ({ fullName, username, profilePhoto })
 *  - isProfileComplete : bool  — whether full name + phone are filled
 *  - onLogout        : fn     — call your logout function here
 */
function DashboardNav({ user, isProfileComplete, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const handleLogout = () => {
    onLogout?.();
    setShowMenu(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Derive initials from full name, fall back to first letter of username
  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.username?.[0]?.toUpperCase() ?? "U";

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(253,246,236,0.92)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(232,134,10,0.12)",
      padding: "14px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>

      {/* Logo */}
      <Link to="/main" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
        <span style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "#E8860A", display: "flex", alignItems: "center",
          justifyContent: "center", color: "white", fontWeight: 700, fontSize: "14px",
        }}>S</span>
        <span className="font-display" style={{ fontSize: "1.2rem", fontWeight: 900, color: "#7C3B0F" }}>
          Soko<span style={{ color: "#E8860A" }}>Tour</span>
        </span>
      </Link>

      {/* Right side: greeting + avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <p style={{ fontSize: "0.875rem", color: "rgba(26,18,9,0.55)" }}>
          Hey, <strong style={{ color: "#1A1209" }}>
            {user?.fullName?.split(" ")[0] ?? user?.username}
          </strong> 👋
        </p>

        {/* Avatar button */}
        <div ref={menuRef} style={{ position: "relative" }}>
          <button
            onClick={() => setShowMenu((v) => !v)}
            title="Your profile"
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "linear-gradient(135deg, #E8860A, #7C3B0F)",
              border: "2.5px solid rgba(232,134,10,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontWeight: 700, fontSize: "14px",
              cursor: "pointer", transition: "box-shadow 0.2s ease",
              boxShadow: showMenu ? "0 0 0 4px rgba(232,134,10,0.2)" : "none",
            }}
          >
            {user?.profilePhoto
              ? <img src={user.profilePhoto} alt="avatar"
                  style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
              : initials}
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <div style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              background: "white", borderRadius: "16px",
              boxShadow: "0 16px 48px rgba(26,18,9,0.18)",
              border: "1px solid rgba(26,18,9,0.08)",
              minWidth: "200px", padding: "8px",
              animation: "fadeUp 0.2s ease", zIndex: 200,
            }}>

              {/* User info header */}
              <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid rgba(26,18,9,0.07)" }}>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1A1209" }}>
                  {user?.fullName ?? user?.username}
                </p>
                <p style={{ fontSize: "0.75rem", color: "rgba(26,18,9,0.45)", marginTop: "2px" }}>
                  @{user?.username}
                </p>
                {!isProfileComplete && (
                  <span style={{
                    display: "inline-block", marginTop: "6px",
                    fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px",
                    borderRadius: "50px", background: "rgba(185,28,28,0.08)", color: "#b91c1c",
                  }}>
                    ⚠ Profile incomplete
                  </span>
                )}
              </div>

              {/* My Profile link */}
              <Link
                to="/profile"
                onClick={() => setShowMenu(false)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 14px", borderRadius: "10px",
                  textDecoration: "none", color: "#1A1209",
                  fontSize: "0.875rem", fontWeight: 500,
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#FDF6EC"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                👤 My Profile
              </Link>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  width: "100%", padding: "10px 14px", borderRadius: "10px",
                  background: "transparent", border: "none",
                  color: "#b91c1c", fontSize: "0.875rem", fontWeight: 500,
                  cursor: "pointer", textAlign: "left",
                  transition: "background 0.15s ease", fontFamily: "inherit",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(185,28,28,0.06)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;