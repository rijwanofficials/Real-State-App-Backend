// backend/models/RentProperty.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const rentPropertySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [{ type: String }],
  status: {
    type: String,
    enum: ["available", "rented"],
    default: "available",
  },
  createdAt: { type: Date, default: Date.now },
});

const RentProperty = model("RentProperty", rentPropertySchema);
module.exports = RentProperty;
