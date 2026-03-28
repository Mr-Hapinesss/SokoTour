  const mongoose = require("mongoose");

  const GuideSchema = new mongoose.Schema({
    name:      { type: String, required: true },
    specialty: { type: String, required: true },  // the market they specialise in
    rating:    { type: Number, default: 5.0, min: 1, max: 5 },
    reviews:   { type: Number, default: 0 },      // total number of reviews received
    initials:  { type: String },                  // e.g. "GW" for Grace Wanjiru (auto-generated or set manually)
    color:     { type: String, default: "#E8860A" }, // hex color for the avatar circle in the UI
    available: { type: Boolean, default: true },  // false when guide is fully booked
    photo:     { type: String, default: "" },     // URL to guide profile photo (optional)
    bio:       { type: String, default: "" },     // short guide description (optional)
  });

  module.exports = mongoose.model("Guide", GuideSchema);