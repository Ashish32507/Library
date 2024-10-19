const mongoose = require("mongoose");

const issueBookSchema = new mongoose.Schema({
  stdId: {
    type: Number, // Assuming stdId is a number and refers to the student's ID
    ref: "User", // Reference to the User model
    required: true,
  },
  bookId: {
    type: Number,
    required: true,
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Book model using ObjectId
    ref: "Book", // Reference to the Book model
    required: true,
  },
  issue_date: {
    type: Date,
    default: Date.now, // Automatically set to the current date when issued
  },
  due_date: {
    type: Date,
    required: true, // The date when the book should be returned
  },
  return_date: {
    type: Date,
    default: null, // Will remain null until the book is returned
  },
  status: {
    type: String,
    enum: ["issued", "returned"], // Only "issued" or "returned" are valid statuses
    default: "issued",
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically set the creation time
  },
  updated_at: {
    type: Date,
    default: Date.now, // Automatically set the last updated time
  },
});

// Middleware to update `updated_at` field on every save
issueBookSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("IssueBook", issueBookSchema);
