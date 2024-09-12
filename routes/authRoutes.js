const express = require("express");
const {
  register,
  login,
  refreshAccessToken,
} = require("../controllers/authControllers");
const verifyToken = require("../middlewares/authMiddleware");
const authRouter = express.Router();

// Register a new user (no token required)
authRouter.post("/register", register);

// Login (no token required)
authRouter.post("/login", login);

// Refresh access token (requires a valid refresh token)
authRouter.post("/refresh-token", verifyToken, refreshAccessToken);

module.exports = authRouter;
