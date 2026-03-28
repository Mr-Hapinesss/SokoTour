import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileStyles from "./ProfileStyles.jsx";


// ── Helpers ───────────────────────────────────────────────────────────────────
function getInitials(fullName, username) {
  if (fullName) return fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return username?.[0]?.toUpperCase() ?? "U";
}

function completeness(form) {
  const fields = [form.fullName, form.phone, form.email, form.photoPreview];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // ── State ──────────────────────────────────────────────────────────────────
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [toast,    setToast]    = useState(null); // "saved" | "error" | null
  const [errors,   setErrors]   = useState({});

  const [form, setForm] = useState({
    fullName:     "",
    phone:        "",
    email:        "",
    promoEmails:  false,
    photoPreview: null,   // base64 or URL for display
    photoFile:    null,   // raw File object for upload
  });

  // ── Fetch user on mount ────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/user/profile", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setForm({
            fullName:     data.fullName    ?? "",
            phone:        data.phone       ?? "",
            email:        data.email       ?? "",
            promoEmails:  data.promoEmails ?? false,
            photoPreview: data.profilePhoto ?? null,
            photoFile:    null,
          });
        } else {
          navigate("/signin");
        }
      } catch {
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Field change handler ───────────────────────────────────────────────────
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // ── Photo upload ───────────────────────────────────────────────────────────
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, photo: "Photo must be under 5MB." }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((prev) => ({
        ...prev,
        photoPreview: ev.target.result,
        photoFile:    file,
      }));
      setErrors((prev) => ({ ...prev, photo: "" }));
    };
    reader.readAsDataURL(file);
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.fullName.trim())        e.fullName = "Full name is required.";
    else if (form.fullName.trim().length < 3) e.fullName = "Name must be at least 3 characters.";

    if (!form.phone.trim())           e.phone = "Phone number is required.";
    else if (!/^\+?[\d\s\-]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number.";

    if (!form.email.trim())           e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save handler ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);

    try {
      // If there's a new photo, upload it first
      let profilePhotoUrl = form.photoPreview;
      if (form.photoFile) {
        const fd = new FormData();
        fd.append("photo", form.photoFile);
        const photoRes = await fetch("http://localhost:3000/user/upload-photo", {
          method: "POST", credentials: "include", body: fd,
        });
        if (photoRes.ok) {
          const photoData = await photoRes.json();
          profilePhotoUrl = photoData.url;
        }
      }

      // Save profile fields
      const res = await fetch("http://localhost:3000/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName:     form.fullName.trim(),
          phone:        form.phone.trim(),
          email:        form.email.trim(),
          promoEmails:  form.promoEmails,
          profilePhoto: profilePhotoUrl,
        }),
      });

      if (res.ok) {
        setForm((prev) => ({ ...prev, photoFile: null, photoPreview: profilePhotoUrl }));
        showToast("saved");
      } else {
        showToast("error");
      }
    } catch {
      showToast("error");
    } finally {
      setSaving(false);
    }
  };

  // ── Toast helper ───────────────────────────────────────────────────────────
  const showToast = (type) => {
    setToast(type);
    setTimeout(() => setToast(null), 2700);
  };

  // ── Loading screen ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #1A1209 0%, #3D1A07 50%, #7C3B0F 100%)",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            border: "3px solid rgba(232,134,10,0.3)", borderTopColor: "#E8860A",
            animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
          }} />
          <p style={{ color: "rgba(253,246,236,0.6)", fontSize: "0.875rem" }}>Loading profile…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const pct      = completeness(form);
  const initials = getInitials(form.fullName, form.email);

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC", fontFamily: "'DM Sans', sans-serif" }}>
      <ProfileStyles />

      {/* ── Navbar ── */}
      <nav className="nav-glass" style={{
        position: "sticky", top: 0, zIndex: 100,
        padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link to="/main" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{
            width: "32px", height: "32px", borderRadius: "50%", background: "#E8860A",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 700, fontSize: "14px",
          }}>S</span>
          <span className="font-display" style={{ fontSize: "1.2rem", fontWeight: 900, color: "#7C3B0F" }}>
            Soko<span style={{ color: "#E8860A" }}>Tour</span>
          </span>
        </Link>
        <Link to="/main" style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "0.85rem", fontWeight: 600, color: "rgba(26,18,9,0.55)",
          textDecoration: "none", transition: "color 0.2s",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1209")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,18,9,0.55)")}
        >
          ← Back to Dashboard
        </Link>
      </nav>

      {/* ── Page header banner ── */}
      <div style={{
        background: "linear-gradient(135deg, #1A1209 0%, #3D1A07 55%, #7C3B0F 100%)",
        padding: "40px 24px 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "repeating-linear-gradient(45deg, #E8860A 0, #E8860A 1px, transparent 0, transparent 50%)",
          backgroundSize: "28px 28px",
        }} />
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

      {/* ── Main content — pulled up to overlap banner ── */}
      <div style={{ maxWidth: "640px", margin: "-48px auto 60px", padding: "0 20px", position: "relative", zIndex: 10 }}>

        {/* ── Avatar card ── */}
        <div className="profile-card anim-fade-up" style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>

          {/* Avatar circle */}
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

            {/* Hover overlay */}
            <div className="avatar-overlay" onClick={() => fileInputRef.current?.click()}>
              <span style={{ fontSize: "1.3rem" }}>📷</span>
            </div>
            <input
              ref={fileInputRef} type="file" accept="image/*"
              style={{ display: "none" }} onChange={handlePhotoChange}
            />

            {/* Green "change" badge */}
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

          {/* Name + completeness */}
          <div style={{ flex: 1, minWidth: "180px" }}>
            <p className="font-display" style={{ fontSize: "1.3rem", fontWeight: 900, color: "#1A1209" }}>
              {form.fullName || "Your Name"}
            </p>
            <p style={{ fontSize: "0.8rem", color: "rgba(26,18,9,0.45)", marginBottom: "10px" }}>
              {form.email || "your@email.com"}
            </p>

            {/* Profile completeness bar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(26,18,9,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Profile completeness
                </span>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: pct === 100 ? "#3D6B4F" : "#E8860A" }}>
                  {pct}%
                </span>
              </div>
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

        {/* Photo error */}
        {errors.photo && (
          <p style={{ color: "#b91c1c", fontSize: "0.78rem", marginTop: "-12px", marginBottom: "12px", paddingLeft: "4px" }}>
            ⚠ {errors.photo}
          </p>
        )}

        {/* ── Personal details card ── */}
        <div className="profile-card anim-fade-up delay-1">
          <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1A1209", marginBottom: "20px" }}>
            Personal Details
          </h2>

          {/* Full name */}
          <div style={{ marginBottom: "18px" }}>
            <label className="field-label">Full Name</label>
            <input
              className="soko-input"
              type="text"
              placeholder="e.g. Amira Hassan"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              style={{ borderColor: errors.fullName ? "#b91c1c" : undefined }}
            />
            {errors.fullName && (
              <p style={{ color: "#b91c1c", fontSize: "0.75rem", marginTop: "5px" }}>⚠ {errors.fullName}</p>
            )}
          </div>

          {/* Phone */}
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
                onChange={(e) => handleChange("phone", e.target.value)}
                style={{ paddingLeft: "38px", borderColor: errors.phone ? "#b91c1c" : undefined }}
              />
            </div>
            {errors.phone && (
              <p style={{ color: "#b91c1c", fontSize: "0.75rem", marginTop: "5px" }}>⚠ {errors.phone}</p>
            )}
          </div>

          {/* Email */}
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
                onChange={(e) => handleChange("email", e.target.value)}
                style={{ paddingLeft: "38px", borderColor: errors.email ? "#b91c1c" : undefined }}
              />
            </div>
            {errors.email && (
              <p style={{ color: "#b91c1c", fontSize: "0.75rem", marginTop: "5px" }}>⚠ {errors.email}</p>
            )}
          </div>

          {/* Promo emails toggle — sits directly under email */}
          <div
            onClick={() => handleChange("promoEmails", !form.promoEmails)}
            style={{
              marginTop: "14px", padding: "14px 16px",
              borderRadius: "14px", cursor: "pointer",
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

        {/* ── Account info card (read-only) ── */}
        <div className="profile-card anim-fade-up delay-2">
          <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1A1209", marginBottom: "20px" }}>
            Account
          </h2>

          <div style={{ marginBottom: "18px" }}>
            <label className="field-label">Username</label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                fontSize: "0.9rem", color: "rgba(26,18,9,0.3)",
              }}>@</span>
              <input
                className="soko-input"
                type="text"
                value={form.username ?? ""}
                disabled
                style={{ paddingLeft: "32px" }}
              />
            </div>
            <p style={{ fontSize: "0.72rem", color: "rgba(26,18,9,0.35)", marginTop: "5px" }}>
              Username cannot be changed.
            </p>
          </div>

          {/* Danger zone */}
          <div style={{
            marginTop: "8px", padding: "14px 16px", borderRadius: "14px",
            background: "rgba(185,28,28,0.04)", border: "1.5px solid rgba(185,28,28,0.12)",
          }}>
            <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#b91c1c", marginBottom: "4px" }}>
              Danger zone
            </p>
            <p style={{ fontSize: "0.78rem", color: "rgba(26,18,9,0.5)", marginBottom: "12px" }}>
              Deleting your account is permanent and cannot be undone.
            </p>
            <button style={{
              padding: "8px 18px", borderRadius: "50px",
              border: "1.5px solid rgba(185,28,28,0.3)",
              background: "transparent", color: "#b91c1c",
              fontFamily: "inherit", fontWeight: 600, fontSize: "0.8rem",
              cursor: "pointer", transition: "all 0.2s ease",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#b91c1c"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#b91c1c"; }}
            >
              Delete my account
            </button>
          </div>
        </div>

        {/* ── Save button ── */}
        <div className="anim-fade-up delay-3" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-shimmer"
            style={{
              flex: 1, padding: "16px", borderRadius: "50px",
              background: saving ? "rgba(26,18,9,0.15)" : "#E8860A",
              color: saving ? "rgba(26,18,9,0.3)" : "white",
              border: "none", fontFamily: "inherit", fontWeight: 700,
              fontSize: "1rem", cursor: saving ? "not-allowed" : "pointer",
              boxShadow: saving ? "none" : "0 8px 24px rgba(232,134,10,0.35)",
              transition: "all 0.25s ease",
            }}
          >
            {saving
              ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span style={{
                    width: "16px", height: "16px", borderRadius: "50%",
                    border: "2px solid rgba(26,18,9,0.2)", borderTopColor: "#E8860A",
                    animation: "spin 0.7s linear infinite", display: "inline-block",
                  }} />
                  Saving…
                </span>
              : "Save Changes"}
          </button>

          <Link to="/main" style={{
            padding: "16px 24px", borderRadius: "50px",
            border: "1.5px solid rgba(26,18,9,0.13)", background: "white",
            color: "rgba(26,18,9,0.55)", fontWeight: 600, fontSize: "0.9rem",
            textDecoration: "none", textAlign: "center",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(26,18,9,0.3)"; e.currentTarget.style.color = "#1A1209"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(26,18,9,0.13)"; e.currentTarget.style.color = "rgba(26,18,9,0.55)"; }}
          >
            Cancel
          </Link>
        </div>
      </div>

      {/* ── Toast notification ── */}
      {toast === "saved" && (
        <div className="toast">✓ Profile saved successfully!</div>
      )}
      {toast === "error" && (
        <div className="toast" style={{ background: "#b91c1c" }}>
          ✕ Something went wrong. Please try again.
        </div>
      )}
    </div>
  );
}
