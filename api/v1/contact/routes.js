const express = require("express");
const { submitContactController } = require("./controller");
const { submitContactValidator } = require("./dto");
const contactRouter = express.Router();


contactRouter.post("/", submitContactValidator, submitContactController);

module.exports = { contactRouter };
