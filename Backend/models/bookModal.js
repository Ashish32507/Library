const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  publish_date: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String, // URL of the uploaded image
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
