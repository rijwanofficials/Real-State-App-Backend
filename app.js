require('module-alias/register');
require("dotenv").config();
const connectDB = require("./config/db"); // MongoDB connection
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Import central API router
const { apiRouter } = require('./api/v1/routes');
const PORT = process.env.PORT;
const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

const app = express();

// ------------------------
// Connect to MongoDB
// ------------------------
connectDB().then(() => {
    console.log("<<---✅ MongoDB connection stablished before starting server--->>");

    // ------------------------
    // Start Server after DB connected
    // ------------------------
    app.listen(PORT, () => {
        console.log(`<<----- ✅ Server started on PORT ${PORT} ------>>`);
    });
});

// ------------------------
// Middleware
// ------------------------
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(morgan("dev"));           // Logging
app.use(express.json());          // Parse JSON bodies
app.use(cookieParser());          // Parse cookies

// ------------------------
// Routes
// ------------------------
app.use('/api/v1', apiRouter);

// ------------------------
// Health check endpoint
// ------------------------
app.get("/", (req, res) => {
    res.send("✅ Backend is Running 🚀");
});

// ------------------------
// 404 Handler
// ------------------------
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// ------------------------
// Global Error Handler
// ------------------------
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
