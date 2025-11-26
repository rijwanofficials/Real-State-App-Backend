require('module-alias/register');
require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Import central API router
const { apiRouter } = require('./api/v1/routes');
const PORT = process.env.PORT;
const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

const app = express();



//CORS Configuration
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://real-state-app-xi.vercel.app/",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);


connectDB().then(() => {
    console.log("<<---✅ MongoDB connection stablished before starting server--->>");
    app.listen(PORT, () => {
        console.log(`<<----- ✅ Server started on PORT ${PORT} ------>>`);
    });
});

app.use(morgan("dev"));           // Logging
app.use(express.json());          // Parse JSON bodies
app.use(cookieParser());          // Parse cookies

// Routes
// ------------------------
app.use('/api/v1', apiRouter);

// Health check endpoint
app.get("/", (req, res) => {
    res.send("✅ Backend is Running 🚀");
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
