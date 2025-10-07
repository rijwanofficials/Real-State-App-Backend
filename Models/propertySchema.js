const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const propertySchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  images: [String],
}, { timestamps: true });



// -------------Default Preferences----------
propertySchema.pre("findOneAndUpdate", function () {
  this.set({ runValidators: true, new: true });
});

const propertyModel = model("Property", propertySchema);
module.exports = propertyModel;




