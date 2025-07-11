const express = require("express");
const router = express.Router();
const Url = require("../models/Url");
const generateShortCode = require("../utils/generateShortCode");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

router.post("/shortenurl", async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;

    if (!url || !validity) {
      return res.status(400).json({ message: "URL and validity required." });
    }

    const code = shortcode || generateShortCode();
    const expiryDate = new Date(Date.now() + parseInt(validity) * 24 * 60 * 60 * 1000);

    // check if shortcode exists
    const existing = await Url.findOne({ shortcode: code });
    if (existing) {
      return res.status(409).json({ message: "Shortcode already exists. Try another." });
    }

    const newUrl = await Url.create({
      url,
      shortcode: code,
      expiry: expiryDate
    });

    return res.status(201).json({
      shortLink: `${BASE_URL}/${newUrl.shortcode}`,
      expiry: newUrl.expiry
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;

