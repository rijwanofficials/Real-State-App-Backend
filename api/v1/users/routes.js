const express = require("express");

const { getCurrentUserController, createUserController, updateUserController } = require("./controllers");
const { validateTokenMiddleware } = require("../validateTokenmiddleware");

const usersRouter = express.Router();

// Get current logged-in user info - GET /users/me
usersRouter.get("/me", validateTokenMiddleware, getCurrentUserController);

// Create user record in DB after Firebase signup - POST /users
usersRouter.post("/", validateTokenMiddleware, createUserController);

// Update user profile info - PUT /users/me
usersRouter.put("/me", validateTokenMiddleware, updateUserController);

module.exports = { usersRouter };
