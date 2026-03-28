const express = require("express");
const router = express.Router();
const Booking = require("../Models/bookingModel"); // adjust path to your Booking model

// ── Auth middleware ────────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /bookings
// Creates a new booking for the logged-in user.
// Called by BookingModal.jsx when the user clicks "Confirm Booking".
// Body: { location, payment, duration, customHours? }
// ─────────────────────────────────────────────────────────────────────────────
router.post("/", requireAuth, async (req, res) => {
  const { location, payment, duration, customHours } = req.body;

  // Server-side validation
  if (!location) return res.status(400).json({ error: "Location is required." });
  if (!["cash", "mpesa"].includes(payment)) return res.status(400).json({ error: "Invalid payment method." });
  if (!["1-2hrs", "half-day", "full-day", "custom"].includes(duration)) return res.status(400).json({ error: "Invalid duration." });
  if (duration === "custom" && !customHours) return res.status(400).json({ error: "Custom hours are required." });

  try {
    const booking = await Booking.create({
      userId:      req.session.userId,
      location,
      payment,
      duration,
      customHours: duration === "custom" ? Number(customHours) : null,
      status:      "pending",
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("POST /bookings error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /bookings
// Returns all bookings belonging to the logged-in user.
// Called by ToursTab.jsx to populate upcoming and past tours.
// Populates guideId so the frontend gets the guide's name directly.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/", requireAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.session.userId })
      .populate("guideId", "name specialty")  // pull in guide name and specialty
      .sort({ createdAt: -1 });               // newest first

    res.json(bookings);
  } catch (err) {
    console.error("GET /bookings error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /bookings/:id
// Returns a single booking by its ID.
// Useful if you build a booking detail page later.
// Only returns the booking if it belongs to the logged-in user (security check).
// ─────────────────────────────────────────────────────────────────────────────
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id:    req.params.id,
      userId: req.session.userId,   // prevents users from reading each other's bookings
    }).populate("guideId", "name specialty");

    if (!booking) return res.status(404).json({ error: "Booking not found." });

    res.json(booking);
  } catch (err) {
    console.error("GET /bookings/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /bookings/:id
// Updates a booking's status (e.g. "confirmed", "completed", "cancelled").
// Can also be used by an admin to assign a guideId to a booking.
// Body: { status?, guideId? }
// ─────────────────────────────────────────────────────────────────────────────
router.patch("/:id", requireAuth, async (req, res) => {
  const { status, guideId } = req.body;
  const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  try {
    const updates = {};
    if (status)  updates.status  = status;
    if (guideId) updates.guideId = guideId;

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.userId },
      { $set: updates },
      { new: true }
    );

    if (!booking) return res.status(404).json({ error: "Booking not found." });

    res.json(booking);
  } catch (err) {
    console.error("PATCH /bookings/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /bookings/:id
// Cancels (permanently deletes) a booking.
// Only the owner of the booking can delete it.
// ─────────────────────────────────────────────────────────────────────────────
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id:    req.params.id,
      userId: req.session.userId,
    });

    if (!booking) return res.status(404).json({ error: "Booking not found." });

    res.json({ message: "Booking cancelled successfully." });
  } catch (err) {
    console.error("DELETE /bookings/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;