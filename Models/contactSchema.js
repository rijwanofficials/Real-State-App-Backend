const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        trim: true,
        default: "No Subject"
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const ContactMessage = model("ContactMessage", contactSchema);
module.exports = ContactMessage;
