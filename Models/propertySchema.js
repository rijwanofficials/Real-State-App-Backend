const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  uid: { type: String, required: true }, // link to Firebase UID
  title: String,
  description: String,
  location: String,
  price: Number,
  type: String,
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
