import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardStyles        from "./DashboardStyles.jsx";
import LoadingScreen          from "./LoadingScreen.jsx";
import DashboardNav           from "./DashboardNav.jsx";
import HeroBanner             from "./HeroBanner.jsx";
import StatsStrip             from "./StatsStrip.jsx";
import ExploreTab             from "./ExploreTab.jsx";
import ToursTab               from "./ToursTab.jsx";
import BookingModal           from "./BookingModal.jsx";
import IncompleteProfileModal from "./IncompleteProfileModal.jsx";

function Main() {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [user,             setUser]             = useState(null);
  const [loadingUser,      setLoadingUser]      = useState(true);
  const [activeTab,        setActiveTab]        = useState("explore"); // "explore" | "tours"
  const [showBooking,      setShowBooking]      = useState(false);
  const [showIncomplete,   setShowIncomplete]   = useState(false);

  // ── Fetch user on mount ────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/user/profile", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          navigate("/signin");
        }
      } catch {
        navigate("/signin");
      } finally {
        setLoadingUser(false);
      }
    })();
  }, []);

  // ── Profile completeness: requires fullName + phone ────────────────────────
  const isProfileComplete = Boolean(user?.fullName && user?.phone);

  // ── "Book a Guide" button handler ──────────────────────────────────────────
  const handleBookClick = () => {
    if (!isProfileComplete) {
      setShowIncomplete(true);
    } else {
      setShowBooking(true);
    }
  };

  // ── Booking submit — replace console.log with your API call ───────────────
  const handleBookingSubmit = async (bookingData) => {
    console.log("Booking submitted:", bookingData);
    // e.g. await fetch("http://localhost:3000/bookings", { method: "POST", ... })
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    // Call your auth context logout here, e.g. logout()
    navigate("/signin");
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loadingUser) return <LoadingScreen />;

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Global CSS for this dashboard */}
      <DashboardStyles />

      {/* Sticky top nav with avatar dropdown */}
      <DashboardNav
        user={user}
        isProfileComplete={isProfileComplete}
        onLogout={handleLogout}
      />

      {/* Hero banner with Book CTA */}
      <HeroBanner
        user={user}
        isProfileComplete={isProfileComplete}
        onBookClick={handleBookClick}
      />

      {/* Amber stats strip */}
      <StatsStrip />

      {/* Main content area */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 20px 60px" }}>

        {/* Tab switcher */}
        <div style={{
          display: "flex", gap: "8px", marginBottom: "28px",
          background: "rgba(26,18,9,0.05)", borderRadius: "50px",
          padding: "4px", width: "fit-content",
        }}>
          {[["explore", "🧭 Explore"], ["tours", "📋 My Tours"]].map(([key, label]) => (
            <button
              key={key}
              className="tab-btn"
              onClick={() => setActiveTab(key)}
              style={{
                background: activeTab === key ? "#E8860A" : "transparent",
                color:      activeTab === key ? "white"   : "rgba(26,18,9,0.55)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "explore" && <ExploreTab onBookClick={handleBookClick} />}
        {activeTab === "tours"   && <ToursTab   onBookClick={handleBookClick} />}
      </div>

      {/* Incomplete profile modal */}
      {showIncomplete && (
        <IncompleteProfileModal onClose={() => setShowIncomplete(false)} />
      )}

      {/* Booking modal */}
      {showBooking && (
        <BookingModal
          onClose={() => setShowBooking(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
}

export default Main;