const { default: mongoose } = require("mongoose");
const { Schema, model } = mongoose;


const userSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatar: {
        type: String,
        default: ""
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


// -------------Default Preferences----------
userSchema.pre("findOneAndUpdate", function () {
    this.set({ runValidators: true, new: true });
});
const userModel = model("user", userSchema);
module.exports = userModel;