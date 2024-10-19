const Book = require("../models/bookModal");
const getDataUri = require("../utils/getDataUri");
const cloudinary = require("../utils/cloudinary");

// Create a new book

exports.createBook = async (req, res) => {
  try {
    const { title, author, published_date, category, quantity, description } =
      req.body;
    const file = req.file;

    if (
      !title ||
      !author ||
      !published_date ||
      !category ||
      !quantity ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Validate quantity as a number
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number",
      });
    }

    // Fetch last book and increment bookId
    const lastBook = await Book.findOne().sort({ bookId: -1 });
    const bookId = lastBook ? parseInt(lastBook.bookId) + 1 : 200;

    let imageUrl = ""; // Variable to store image URL after uploading

    if (file) {
      try {
        const fileUri = getDataUri(file); // Ensure getDataUri correctly handles the image file
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        imageUrl = cloudResponse.secure_url; // Assign the secure URL from Cloudinary
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr);
        return res.status(500).json({
          success: false,
          message: "Failed to upload image to Cloudinary",
        });
      }
    }

    // Create the new book with the provided data
    const newBook = new Book({
      bookId,
      title,
      author,
      publish_date: published_date,
      category,
      quantity,
      description, // Make sure to include description in the model if necessary
      image: imageUrl, // Store the uploaded image URL
    });

    // Save the book to the database
    await newBook.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating book",
      error: error.message,
    });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error.message,
    });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.error("Error fetching book:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching book",
      error: error.message,
    });
  }
};

// Update a book by ID
exports.updateBookById = async (req, res) => {
  try {
    const updateData = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    console.error("Error updating book:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating book",
      error: error.message,
    });
  }
};

// Delete a book by ID
exports.deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    console.log(book);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting book",
      error: error.message,
    });
  }
};
