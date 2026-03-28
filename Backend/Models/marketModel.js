  const mongoose = require("mongoose");

  const MarketSchema = new mongoose.Schema({
    name:     { type: String, required: true },
    location: { type: String, required: true },
    tag:      { type: String, required: true },   // e.g. "Crafts & Beadwork"
    emoji:    { type: String, default: "🛖" },
    color:    { type: String, default: "#E8860A" }, // hex colour for the card
  });

  module.exports = mongoose.model("Market", MarketSchema);