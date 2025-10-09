// backend/api/v1/routes/buyRoutes.js
const express = require("express");
const { createBuyPropertyValidator } = require("./dto");
const { createBuyPropertyController, getBuyPropertyController } = require("./controller");
const verifyAdmin = require("../middleware/verifyAdmin");

const buyRouter = express.Router();

// Admin can view all buy transactions
buyRouter.get("/", verifyAdmin, getBuyPropertyController);
// Admin can create transaction
buyRouter.post("/", verifyAdmin, createBuyPropertyValidator, createBuyPropertyController);

module.exports = { buyRouter };
