  const mongoose = require("mongoose");

  const BookingSchema = new mongoose.Schema({
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User",  required: true },
    guideId:     { type: mongoose.Schema.Types.ObjectId, ref: "Guide", default: null }, // assigned after matching
    market:      { type: String, default: "" },
    location:    { type: String, required: true },
    payment:     { type: String, enum: ["cash", "mpesa"], required: true },
    duration:    { type: String, enum: ["1-2hrs", "half-day", "full-day", "custom"], required: true },
    customHours: { type: Number, default: null },   // only used when duration === "custom"
    status:      { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
    createdAt:   { type: Date, default: Date.now },
  });

  module.exports = mongoose.model("Booking", BookingSchema);