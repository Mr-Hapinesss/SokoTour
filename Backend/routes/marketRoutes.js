const express = require("express");
const router = express.Router();

/*
  ── WHERE ARE THE MARKETS COMING FROM? ───────────────────────────────────────

  RIGHT NOW (hardcoded):
    The markets are defined as a plain JavaScript array at the bottom of this
    file. This is fine while you're building and testing — no database needed.
    The GET /markets route just returns that array as JSON.

  WHEN YOU'RE READY TO USE A DATABASE:
    1. Create a Market model (schema below) in your models/ folder.
    2. Uncomment the schema block below.
    3. Replace the hardcoded MARKETS array with a real DB query:
         const markets = await Market.find({});
    4. Seed your database once using the hardcoded array as the initial data.


*/

// Hardcoded markets — matches what ExploreTab.jsx currently displays.
// Replace this with a DB query when you add the Market model.
const MARKETS = [
  { name: "Maasai Market",  location: "Nairobi CBD",  tag: "Crafts & Beadwork",     emoji: "🛖", color: "#E8860A" },
  { name: "Gikomba Market", location: "Nairobi East", tag: "Vintage & Textiles",    emoji: "👗", color: "#3D6B4F" },
  { name: "City Market",    location: "Moi Avenue",   tag: "Produce & Spices",      emoji: "🥬", color: "#7C3B0F" },
  { name: "Toi Market",     location: "Kibera",       tag: "Fashion & Accessories", emoji: "👠", color: "#B5621E" },
  { name: "Ngara Market",   location: "Ngara",        tag: "Wholesale Goods",       emoji: "📦", color: "#2D5A3F" },
  { name: "Kongowea",       location: "Mombasa",      tag: "Coastal Crafts",        emoji: "🐚", color: "#C4732A" },
];

// ─────────────────────────────────────────────────────────────────────────────
// GET /markets
// Returns all available markets.
// Called by ExploreTab.jsx on load to replace the hardcoded MARKETS array.
// No authentication required — markets are public information.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/all", async (req, res) => {
  try {
    // ── Hardcoded version (current) ──
    res.json(MARKETS);

    // ── Database version (uncomment when ready) ──
    // const Market = require("../models/Market");
    // const markets = await Market.find({});
    // res.json(markets);

  } catch (err) {
    console.error("GET /markets error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /markets/:name
// Returns a single market by its name.
// Useful if you build a market detail page later.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/:name", async (req, res) => {
  try {
    // ── Hardcoded version (current) ──
    const market = MARKETS.find(
      (m) => m.name.toLowerCase() === req.params.name.toLowerCase()
    );
    if (!market) return res.status(404).json({ error: "Market not found." });
    res.json(market);

    // ── Database version (uncomment when ready) ──
    // const Market = require("../models/Market");
    // const market = await Market.findOne({ name: new RegExp(`^${req.params.name}$`, "i") });
    // if (!market) return res.status(404).json({ error: "Market not found." });
    // res.json(market);

  } catch (err) {
    console.error("GET /markets/:name error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
