const {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  loginUser,
  getUserById,
} = require("../controller/userController");
const express = require("express");
const userRoutes = express.Router();
const { isUser, islibrarian } = require("../middleware/isAuthenticated");
const { singleUpload } = require("../middleware/multer");

// Register a new user
userRoutes.post("/register", createUser);

// Login a user
userRoutes.post("/login", loginUser);

// // Get all users (librarian access required)
userRoutes.get("/alluser", getAllUsers);

// // Update a user by ID (user access required)
userRoutes.put("/update/:id", isUser, singleUpload, updateUserById);

// // Delete a user by ID (librarian access required)
userRoutes.delete("/delete/:id", islibrarian, deleteUserById);
userRoutes.get("/getuser/:id", getUserById);

module.exports = userRoutes;
