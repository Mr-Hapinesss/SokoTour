import { useState } from "react";
import { LOCATIONS, DURATIONS } from "./mainData.js";

/**
 * Props:
 *  - onClose  : fn — closes the modal
 *  - onSubmit : fn — called with bookingData when user confirms (replace with your API call)
 */
function BookingModal({ onClose, onSubmit }) {
  const [step, setStep]       = useState(1);
  const [done, setDone]       = useState(false);
  const [data, setData]       = useState({ location: "", payment: "", duration: "", customHours: "" });

  const update = (field, value) => setData((prev) => ({ ...prev, [field]: value }));

  const handleConfirm = async () => {
    await onSubmit?.(data);  // ← wire your booking API call here
    setDone(true);
  };

  // Progress bar — one coloured strip per step
  const StepBar = () => (
    <div style={{ display: "flex", gap: "6px", marginBottom: "24px" }}>
      {[1, 2, 3].map((s) => (
        <div key={s} style={{
          flex: 1, height: "4px", borderRadius: "2px",
          background: s <= step ? "#E8860A" : "rgba(26,18,9,0.12)",
          transition: "background 0.3s ease",
        }} />
      ))}
    </div>
  );

  // Reusable back/continue button row
  const NavButtons = ({ canContinue, onBack, onContinue, continueLabel = "Continue →", isLast = false }) => (
    <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
      {onBack && (
        <button onClick={onBack} style={{
          flex: 1, padding: "14px", borderRadius: "50px",
          border: "1.5px solid rgba(26,18,9,0.15)", background: "white",
          color: "#1A1209", fontFamily: "inherit", fontWeight: 600,
          fontSize: "0.9rem", cursor: "pointer",
        }}>← Back</button>
      )}
      <button
        disabled={!canContinue}
        onClick={onContinue}
        className={isLast && canContinue ? "btn-shimmer" : ""}
        style={{
          flex: 2, padding: "14px", borderRadius: "50px",
          background: canContinue ? "#E8860A" : "rgba(26,18,9,0.1)",
          color: canContinue ? "white" : "rgba(26,18,9,0.3)",
          border: "none", fontFamily: "inherit", fontWeight: 600,
          fontSize: "0.9rem",
          cursor: canContinue ? "pointer" : "not-allowed",
          transition: "all 0.2s",
        }}
      >
        {continueLabel}
      </button>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FDF6EC", borderRadius: "24px",
          padding: "36px 32px", maxWidth: "460px", width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
          animation: "fadeUp 0.3s ease",
          maxHeight: "90vh", overflowY: "auto",
        }}
      >
        {/* ── Success screen ── */}
        {done ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>🎉</div>
            <h3 className="font-display" style={{
              fontSize: "1.5rem", fontWeight: 900, color: "#1A1209", marginBottom: "8px",
            }}>
              Tour Booked!
            </h3>
            <p style={{ color: "rgba(26,18,9,0.6)", fontSize: "0.9rem", marginBottom: "8px" }}>
              We're matching you with the best available guide.
            </p>
            <p style={{ color: "rgba(26,18,9,0.45)", fontSize: "0.8rem", marginBottom: "28px" }}>
              📍 {data.location} ·{" "}
              {data.payment === "mpesa" ? "M-Pesa" : "Cash"} ·{" "}
              {DURATIONS.find((d) => d.value === data.duration)?.label}
            </p>
            <button
              onClick={onClose}
              style={{
                padding: "12px 32px", borderRadius: "50px",
                background: "#E8860A", color: "white", border: "none",
                fontFamily: "inherit", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer",
              }}
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <>
            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <h3 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 900, color: "#1A1209" }}>
                  Book a Tour Guide
                </h3>
                <p style={{ fontSize: "0.8rem", color: "rgba(26,18,9,0.5)", marginTop: "2px" }}>
                  Step {step} of 3
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(26,18,9,0.07)", border: "none", borderRadius: "50%",
                  width: "32px", height: "32px", cursor: "pointer", fontSize: "1rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >✕</button>
            </div>

            <StepBar />

            {/* ── Step 1: Location ── */}
            {step === 1 && (
              <div className="anim-slide-in">
                <p style={{ fontWeight: 700, color: "#1A1209", marginBottom: "6px", fontSize: "0.95rem" }}>
                  📍 Where are you exploring?
                </p>
                <p style={{ fontSize: "0.8rem", color: "rgba(26,18,9,0.5)", marginBottom: "16px" }}>
                  Pick the area you'd like to visit.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {LOCATIONS.map((loc) => (
                    <div
                      key={loc}
                      className={`option-card${data.location === loc ? " active" : ""}`}
                      onClick={() => update("location", loc)}
                    >
                      <span style={{
                        width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0,
                        border: `2px solid ${data.location === loc ? "#E8860A" : "rgba(26,18,9,0.2)"}`,
                        background: data.location === loc ? "#E8860A" : "transparent",
                        transition: "all 0.2s",
                      }} />
                      <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#1A1209" }}>{loc}</span>
                    </div>
                  ))}
                </div>

                <NavButtons
                  canContinue={!!data.location}
                  onContinue={() => setStep(2)}
                />
              </div>
            )}

            {/* ── Step 2: Payment ── */}
            {step === 2 && (
              <div className="anim-slide-in">
                <p style={{ fontWeight: 700, color: "#1A1209", marginBottom: "6px", fontSize: "0.95rem" }}>
                  💳 How will you pay?
                </p>
                <p style={{ fontSize: "0.8rem", color: "rgba(26,18,9,0.5)", marginBottom: "16px" }}>
                  Choose your preferred payment method.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { value: "cash",  label: "Cash",   desc: "Pay your guide directly in cash", icon: "💵" },
                    { value: "mpesa", label: "M-Pesa", desc: "Pay securely via M-Pesa",         icon: "📱" },
                  ].map((opt) => (
                    <div
                      key={opt.value}
                      className={`option-card${data.payment === opt.value ? " active" : ""}`}
                      onClick={() => update("payment", opt.value)}
                    >
                      <span style={{ fontSize: "1.5rem" }}>{opt.icon}</span>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1A1209" }}>{opt.label}</p>
                        <p style={{ fontSize: "0.75rem", color: "rgba(26,18,9,0.5)" }}>{opt.desc}</p>
                      </div>
                      <span style={{
                        marginLeft: "auto", width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
                        border: `2px solid ${data.payment === opt.value ? "#E8860A" : "rgba(26,18,9,0.2)"}`,
                        background: data.payment === opt.value ? "#E8860A" : "transparent",
                        transition: "all 0.2s",
                      }} />
                    </div>
                  ))}
                </div>

                <NavButtons
                  canContinue={!!data.payment}
                  onBack={() => setStep(1)}
                  onContinue={() => setStep(3)}
                />
              </div>
            )}

            {/* ── Step 3: Duration ── */}
            {step === 3 && (
              <div className="anim-slide-in">
                <p style={{ fontWeight: 700, color: "#1A1209", marginBottom: "6px", fontSize: "0.95rem" }}>
                  ⏱ How long would you like to explore?
                </p>
                <p style={{ fontSize: "0.8rem", color: "rgba(26,18,9,0.5)", marginBottom: "16px" }}>
                  Your guide will plan accordingly.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {DURATIONS.map((d) => (
                    <div
                      key={d.value}
                      className={`option-card${data.duration === d.value ? " active" : ""}`}
                      onClick={() => update("duration", d.value)}
                    >
                      <span style={{
                        width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0,
                        border: `2px solid ${data.duration === d.value ? "#E8860A" : "rgba(26,18,9,0.2)"}`,
                        background: data.duration === d.value ? "#E8860A" : "transparent",
                        transition: "all 0.2s",
                      }} />
                      <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#1A1209" }}>{d.label}</span>
                    </div>
                  ))}
                </div>

                {/* Custom hours input */}
                {data.duration === "custom" && (
                  <input
                    type="number" min="1" max="12"
                    placeholder="Enter hours (e.g. 5)"
                    value={data.customHours}
                    onChange={(e) => update("customHours", e.target.value)}
                    style={{
                      width: "100%", marginTop: "10px", padding: "12px 16px",
                      borderRadius: "12px", border: "1.5px solid rgba(26,18,9,0.15)",
                      background: "white", fontFamily: "inherit", fontSize: "0.875rem",
                      color: "#1A1209", outline: "none", boxSizing: "border-box",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#E8860A"; e.target.style.boxShadow = "0 0 0 3px rgba(232,134,10,0.12)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "rgba(26,18,9,0.15)"; e.target.style.boxShadow = "none"; }}
                  />
                )}

                {/* Booking summary */}
                {data.duration && (
                  <div style={{
                    marginTop: "16px", padding: "14px 16px", borderRadius: "12px",
                    background: "rgba(232,134,10,0.07)", border: "1px solid rgba(232,134,10,0.2)",
                  }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#7C3B0F", marginBottom: "6px" }}>
                      Booking Summary
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "rgba(26,18,9,0.65)", lineHeight: 1.7 }}>
                      📍 {data.location}<br />
                      💳 {data.payment === "mpesa" ? "M-Pesa" : "Cash"}<br />
                      ⏱ {DURATIONS.find((d) => d.value === data.duration)?.label}
                      {data.duration === "custom" && data.customHours ? ` — ${data.customHours} hrs` : ""}
                    </p>
                  </div>
                )}

                <NavButtons
                  canContinue={!!data.duration && !(data.duration === "custom" && !data.customHours)}
                  onBack={() => setStep(2)}
                  onContinue={handleConfirm}
                  continueLabel="Confirm Booking ✓"
                  isLast
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BookingModal;