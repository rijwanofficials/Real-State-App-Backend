const express = require("express");
const { usersRouter } = require("./users/routes");
const { propertiesRouter } = require("./properties/routes");
const { contactRouter } = require("./contact/routes");
const { buyRouter } = require("./buy/routes");
const { rentRouter } = require("./rent/routes");

const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/buy", buyRouter);
apiRouter.use("/rent", rentRouter);
apiRouter.use("/properties", propertiesRouter);
apiRouter.use("/contacts", contactRouter);

module.exports = { apiRouter };