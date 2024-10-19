const express = require("express");
const bookRoutes = express.Router();
const { isUser, islibrarian } = require("../middleware/isAuthenticated");
const { singleUpload } = require("../middleware/multer");
const {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} = require("../controller/bookController");

bookRoutes.post("/newbook", islibrarian, singleUpload, createBook);
bookRoutes.get("/getallbook", getAllBooks);
bookRoutes.get("/getbookbyid/:id", getBookById);
bookRoutes.delete("/deletebook/:id", deleteBookById);
bookRoutes.put("/update/:id", islibrarian, updateBookById);

module.exports = bookRoutes;
