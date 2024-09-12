// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const { refreshAccessToken } = require("../controllers/authControllers"); // Import refreshAccessToken

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    // If token is expired or invalid, attempt to refresh token
    if (error.name === "TokenExpiredError") {
      return refreshAccessToken(req, res); // Call refreshAccessToken to handle token refresh
    }
    res.status(403).json({ message: "Invalid access token" });
  }
};

module.exports = verifyToken;
