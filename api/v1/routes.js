const express = require("express");
const { usersRouter } = require("./users/routes");
const { transactionsRouter } = require("./transactions/routes");
const { propertiesRouter } = require("./properties/routes");

const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);

apiRouter.use("/transactions", transactionsRouter);
apiRouter.use("/properties", propertiesRouter);

module.exports = { apiRouter };