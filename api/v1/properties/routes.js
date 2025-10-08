const express = require("express");

const { createPropertyController, getPropertyByIdController, getAllPropertiesController, deletePropertyController, updatePropertyController } = require("./controllers");
const { createPropertyValidator } = require("./dto");
const { validateTokenMiddleware } = require("../validateTokenMiddleware");

const propertiesRouter = express.Router();
propertiesRouter.use(validateTokenMiddleware);
// Get all properties - GET /properties
propertiesRouter.get("/", getAllPropertiesController);

// Get property by ID - GET /properties/:id
propertiesRouter.get("/:id", getPropertyByIdController);

// Create property - POST /properties
propertiesRouter.post("/", createPropertyValidator, createPropertyController);

// Update property - PUT /properties/:id
propertiesRouter.put("/:id", updatePropertyController);

// Delete property - DELETE /properties/:id
propertiesRouter.delete("/:id", deletePropertyController);

module.exports = { propertiesRouter };
