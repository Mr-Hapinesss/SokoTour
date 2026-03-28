import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProfileStyles       from "./ProfileStyles.jsx";
import ProfileNav          from "./ProfileNav.jsx";
import ProfileBanner       from "./ProfileBanner.jsx";
import AvatarCard          from "./AvatarCard.jsx";
import PersonalDetailsCard from "./PersonalDetailsCard.jsx";
import AccountCard         from "./AccountCard.jsx";
import SaveBar             from "./SaveBar.jsx";
import ProfileToast        from "./ProfileToast.jsx";
import { getInitials, validate } from "./profileHelpers.js";

export default function ProfilePage() {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [toast,   setToast]   = useState(null);   // "saved" | "error" | null
  const [errors,  setErrors]  = useState({});

  const [form, setForm] = useState({
    username:     "",
    fullName:     "",
    phone:        "",
    email:        "",
    promoEmails:  false,
    photoPreview: null,   // base64 string or URL — used for display
    photoFile:    null,   // raw File object — used for upload
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
            username:     data.username      ?? "",
            fullName:     data.fullName      ?? "",
            phone:        data.phone         ?? "",
            email:        data.email         ?? "",
            promoEmails:  data.promoEmails   ?? false,
            photoPreview: data.profilePhoto  ?? null,
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
      setForm((prev) => ({ ...prev, photoPreview: ev.target.result, photoFile: file }));
      setErrors((prev) => ({ ...prev, photo: "" }));
    };
    reader.readAsDataURL(file);
  };

  // ── Save handler ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);

    try {
      // Upload photo first if a new one was selected
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

      // Save all profile fields
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

  // ── Delete account handler ─────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    try {
      const res = await fetch("http://localhost:3000/user/profile", {
        method: "DELETE", credentials: "include",
      });
      if (res.ok) navigate("/signin");
      else showToast("error");
    } catch {
      showToast("error");
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

  const initials = getInitials(form.fullName, form.username);

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC", fontFamily: "'DM Sans', sans-serif" }}>
      <ProfileStyles />
      <ProfileNav />
      <ProfileBanner />

      {/* Main content — pulled up to overlap the banner */}
      <div style={{ maxWidth: "640px", margin: "-48px auto 60px", padding: "0 20px", position: "relative", zIndex: 10 }}>
        <AvatarCard
          form={form}
          initials={initials}
          onPhotoChange={handlePhotoChange}
          photoError={errors.photo}
        />
        <PersonalDetailsCard
          form={form}
          errors={errors}
          onChange={handleChange}
        />
        <AccountCard
          username={form.username}
          onDelete={handleDelete}
        />
        <SaveBar saving={saving} onSave={handleSave} />
      </div>

      <ProfileToast toast={toast} />
    </div>
  );
}
