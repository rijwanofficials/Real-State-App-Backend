const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true, immutable: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('user', userSchema);