const express = require("express");

const { createPropertyController, getPropertyByIdController } = require("./controllers");
const { validateTokenMiddleware } = require("../validateTokenmiddleware");

const propertiesRouter = express.Router();

// Get all properties - GET /properties
// propertiesRouter.get("/", validateTokenMiddleware, getAllPropertiesController);

// Get property by ID - GET /properties/:id
propertiesRouter.get("/:id", validateTokenMiddleware, getPropertyByIdController);

// Create new property - POST /properties
propertiesRouter.post("/", validateTokenMiddleware, createPropertyController);

// Update property - PUT /properties/:id
// propertiesRouter.put("/:id", validateTokenMiddleware, updatePropertyController);

// Delete property - DELETE /properties/:id
// propertiesRouter.delete("/:id", validateTokenMiddleware, deletePropertyController);

module.exports = { propertiesRouter };
