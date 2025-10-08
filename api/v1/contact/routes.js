const express = require("express");
const { submitContactController } = require("./controller");
const { submitContactValidator } = require("./dto");
const { validateTokenMiddleware } = require("../validateTokenmiddleware");
const contactRouter = express.Router();


contactRouter.post("/",validateTokenMiddleware, submitContactValidator, submitContactController);

module.exports = { contactRouter };
