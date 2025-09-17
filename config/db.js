const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        const DB = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("<<-----✅ MongoDB Connected------->>");
    }
    catch (err) {
        console.log(`❌ Error In DB Connection: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;