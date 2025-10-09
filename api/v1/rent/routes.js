// backend/api/v1/routes/sellRoutes.js
const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const { createRentPropertyController, getRentPropertyController } = require("./controller");
const { createRentPropertyValidator } = require("./dto");

const rentRouter = express.Router();

// Admin can view all sell transactions
rentRouter.get("/", verifyAdmin, getRentPropertyController);
// Admin can create transaction
rentRouter.post("/", verifyAdmin, createRentPropertyValidator, createRentPropertyController);

module.exports = { rentRouter };
