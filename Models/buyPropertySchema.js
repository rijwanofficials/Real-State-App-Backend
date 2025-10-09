// backend/models/BuyProperty.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const buyPropertySchema = new Schema({
  title: {
    type: String,
    required: true
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
    enum: ["available", "sold"],
    default: "available"
  },
  createdAt: { type: Date, default: Date.now },
});

const BuyProperty = model("BuyProperty", buyPropertySchema);
module.exports = BuyProperty;
