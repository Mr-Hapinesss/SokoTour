const express = require("express");
const router = express.Router();
const Guide = require("../Models/guideModel"); // adjust path to your Guide model


// Hardcoded guides — matches what ExploreTab.jsx currently displays.
// Replace with DB queries when you add the Guide model.
const GUIDES = [
  { _id: "1", name: "Grace Wanjiru", specialty: "Maasai Market",  rating: 4.9, reviews: 120, initials: "GW", color: "#3D6B4F", available: true },
  { _id: "2", name: "Brian Otieno",  specialty: "Gikomba Market", rating: 4.8, reviews: 98,  initials: "BO", color: "#E8860A", available: true },
  { _id: "3", name: "Fatuma Said",   specialty: "Kongowea",       rating: 5.0, reviews: 74,  initials: "FS", color: "#7C3B0F", available: true },
  { _id: "4", name: "James Kariuki", specialty: "City Market",    rating: 4.7, reviews: 143, initials: "JK", color: "#B5621E", available: true },
];

/* ─────────────────────────────────────────────────────────────────────────────
 GET /guides
 Returns all guides, optionally filtered by availability or market specialty.
 Called by ExploreTab.jsx to populate the recommended guides scroll row.
 No authentication required — guide listings are public.

 Optional query params:
   ?available=true     → only return guides who are currently available
   ?specialty=Kongowea → only return guides for a specific market
 ─────────────────────────────────────────────────────────────────────────────
*/
router.get("/all", async (req, res) => {
  try {
    const { available, specialty } = req.query;

    // ── Hardcoded version (current) ──
    let results = [...GUIDES];

    if (available === "true")  results = results.filter((g) => g.available === true);
    if (specialty)             results = results.filter((g) => g.specialty.toLowerCase() === specialty.toLowerCase());

    res.json(results);

    /* ── Database version (uncomment when ready) ──
     const Guide = require("../models/Guide");
     const filter = {};
     if (available === "true") filter.available = true;
     if (specialty)            filter.specialty = new RegExp(`^${specialty}$`, "i");
     const guides = await Guide.find(filter);
     res.json(guides); */

  } catch (err) {
    console.error("GET /guides error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
 GET /guides/:id
 Returns a single guide by their ID.
 Useful for a guide detail / bio page, or when a booking is confirmed
 and you want to show the user who their assigned guide is.
 ───────────────────────────────────────────────────────────────────────────── */
router.get("/:id", async (req, res) => {
  try {
    // ── Hardcoded version (current) ──
    const guide = GUIDES.find((g) => g._id === req.params.id);
    if (!guide) return res.status(404).json({ error: "Guide not found." });
    res.json(guide);

    /* ── Database version (uncomment when ready) ──
     const Guide = require("../models/Guide");
     const guide = await Guide.findById(req.params.id);
     if (!guide) return res.status(404).json({ error: "Guide not found." });
     res.json(guide); */

  } catch (err) {
    console.error("GET /guides/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
