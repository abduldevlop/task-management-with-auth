// Import modules
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const taskRouter = require("./routes/taskRoutes");

// Initialize app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Define routes
app.use("/api/auth", authRouter); // Routes for authentication (register, login, token refresh)
app.use("/api/task", taskRouter); // Routes for authentication (register, login, token refresh)

// Define the port (from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
