const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/getDataUri");
const cloudinary = require("../utils/cloudinary");
require("dotenv").config();

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate password complexity (e.g., minimum length of 6 characters)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already in use",
      });
    }

    // Find the last stdId, increment it by 1, and assign it to the new user
    const lastUser = await User.findOne().sort({ stdId: -1 }).exec();
    let newStdId = 1; // Default stdId if no user is found

    if (lastUser && lastUser.stdId) {
      newStdId = parseInt(lastUser.stdId, 10) + 1; // Increment the last stdId
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the new stdId
    const user = new User({
      name,
      email,
      password: hashedPassword, // Use hashed password
      phoneNumber,
      stdId: newStdId,
    });

    // Save the new user to the database
    await user.save();

    // Respond with success message and user data (excluding password)
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        stdId: user.stdId,
        phoneNumber: user.phoneNumber,
        // Do not include password in response
      },
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    // Remove the password field from each user document
    const sanitizedUsers = users.map((user) => {
      // Create a plain object for each user and omit the password field
      const userObject = user.toObject();
      userObject.password = undefined;
      return userObject;
    });

    res.status(200).json({
      success: true,
      users: sanitizedUsers,
      message: "These Are All User",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ stdId: id }); // Use findOne instead of find
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newUser = user.toObject();
    newUser.password = undefined;
    res.status(200).json({
      success: true,
      user: newUser,
      message: "User is found",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const id = req.params.id; // Correctly extract the user ID from params
    const { name, email, phoneNumber, studentId } = req.body; // Include studentId if needed
    const file = req.file; // Handle file upload

    console.log("Updating user with ID:", id);
    console.log("Update data:", { name, email, phoneNumber, studentId });
    console.log("File:", file);
    console.log(cloudinary);

    const user = await User.findById(id); // Find user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // Parse studentId to a number, or use existing stdId from user
    user.stdId = studentId ? parseInt(studentId, 10) : user.stdId;

    // Handle file upload
    if (file) {
      try {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        user.profileImage = cloudResponse.secure_url;
      } catch (uploadErr) {
        console.log("Cloudinary upload error:", uploadErr);
        return res.status(500).json({
          message: "Failed to upload file to Cloudinary",
          success: false,
        });
      }
    }

    await user.save(); // Save the updated user

    user.password = undefined; // Ensure password is not included in the response

    // Respond with the updated user
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(400).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "Please register first",
      });
    }

    const isTrue = await bcrypt.compare(password, checkUser.password);
    if (!isTrue) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (role !== checkUser.role) {
      return res.status(403).json({
        success: false,
        message: "Role mismatch",
      });
    }

    const tokenData = {
      userId: checkUser._id,
      name: checkUser.name,
      email: checkUser.email,
      role: checkUser.role,
      stdId: checkUser.stdId,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const newUser = checkUser.toObject();
    newUser.password = undefined;
    newUser.token = token;
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        user: newUser,
        message: "Login successful",
      });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
