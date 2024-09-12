const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    // Destructure and validate incoming data
    const { name, email, password } = req.body;

    // Check if name, email, and password are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Please provide name, email, and password",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate the access token
    const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Generate the refresh token
    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Set cookies with tokens
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Prevent access to cookie from JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 15 * 60 * 1000, // Access token expiry (15 minutes)
      sameSite: "Strict", // CSRF protection
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevent access to cookie from JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expiry (7 days)
      sameSite: "Strict", // CSRF protection
    });

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Registration failed",
      details: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // Step 1: Destructure email and password from the incoming request body
    const { email, password } = req.body;

    // Step 2: Find the user in the database by email
    const user = await User.findOne({ email });

    // Step 3: If user is not found, return a 404 status with a 'User not found' message
    if (!user) return res.status(404).json({ message: "User not found" });

    // Step 4: Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // Step 5: If the passwords don't match, return a 400 status with an 'Invalid credentials' message
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Step 6: Generate a new JWT access token that expires in 15 minutes
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Step 7: Generate a new JWT refresh token that expires in 7 days
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Step 8: Set the tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // prevents access via JavaScript
      secure: process.env.NODE_ENV === "production", // use HTTPS in production
      sameSite: "Strict", // prevents CSRF
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Step 9: Send a response indicating login was successful
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({
      error: "Login failed",
      details: error.message,
    });
  }
};

const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token is required" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    // Set the new access token in a cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "Strict",
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports = { register, login, refreshAccessToken };
