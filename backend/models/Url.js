const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortcode: { type: String, required: true, unique: true },
  expiry: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Url", urlSchema);
