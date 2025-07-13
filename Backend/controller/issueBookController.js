const IssueBook = require("../models/issueBookModel");
const User = require("../models/userModel");
const BookModel = require("../models/bookModal");

exports.issueBook = async (req, res) => {
  try {
    const { stdId } = req.body; // Changed book_Id to bookId to match the params
    const { bookId } = req.params;

    console.log(req.body);

    // Convert stdId and bookId to numbers
    const studentId = Number(stdId);
    const bookID = Number(bookId);

    console.log(studentId, bookID);

    // Check if the user exists
    const checkUser = await User.findOne({ stdId: studentId });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Check if the book exists and has sufficient quantity
    const bookFind = await BookModel.findOne({ bookId: bookID });
    if (!bookFind || bookFind.quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Book is unavailable or out of stock",
      });
    }

    console.log(bookFind);

    // Check if the book is already issued to the user and not returned
    const existingIssue = await IssueBook.findOne({
      stdId: studentId,
      bookId: bookID,
      status: "issued",
    });
    if (existingIssue) {
      return res.status(400).json({
        success: false,
        message: "This book is already issued to the user and not yet returned",
      });
    }
    console.log(bookFind);
    // Issue the book and set a due date (e.g., 14 days from now)
    const issueBook = await IssueBook.create({
      stdId: studentId,
      bookId: bookID,
      book_id: bookFind._id, // Corrected to use bookFind._id
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    // Decrease the book quantity by 1
    bookFind.quantity -= 1;
    await bookFind.save();

    return res.status(200).json({
      success: true,
      message: "Book issued successfully",
      book: {
        title: bookFind.title,
        remainingQuantity: bookFind.quantity,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred while issuing the book",
    });
  }
};

exports.returnBook = async (req, res) => {
  try {
    // Extract stdId from request body and bookId from params
    const { stdId } = req.body;
    const { bookId } = req.params;

    // Convert bookId and stdId to numbers
    const numericBookId = Number(bookId);
    const numericStdId = Number(stdId);

    // Find the issued book record
    console.log(numericStdId, numericBookId);
    const findIssuedBook = await IssueBook.findOne({
      stdId: numericStdId,
      bookId: numericBookId,
      status: "issued",
    });
    console.log(findIssuedBook);

    if (!findIssuedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found or not issued to this user",
      });
    }

    // Calculate fine if applicable
    const today = new Date();
    const issueDate = new Date(findIssuedBook.issue_date);
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 14); // Adding 14 days to the issue date

    let fine = 0;

    if (today > dueDate) {
      const overdueDays = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)); // Calculate overdue days
      fine = overdueDays * 10; // Example fine calculation
    }

    // Mark the book as returned
    findIssuedBook.status = "returned";
    findIssuedBook.return_date = today;
    await findIssuedBook.save();

    // Update the book quantity
    const book = await BookModel.findOne({ bookId: numericBookId });
    if (book) {
      book.quantity = book.quantity + 1; // Increment the quantity
      await book.save();
    }

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",

      book: {
        fine,
        title: book.title,
        remainingQuantity: book.quantity,
        author: book.author,
        image: book.image,
        issuDate: findIssuedBook.issue_date,
        returnDate: findIssuedBook.due_date,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred while returning the book",
    });
  }
};

exports.getAllIssueBook = async (req, res) => {
  try {
    const { stdId } = req.params;

    // Find all issued books for the given student ID and populate related fields
    const findAllBooks = await IssueBook.find({
      stdId,
      status: "issued",
    }).populate({
      path: "book_id", // Ensure this matches the field in your IssueBook schema
      select: "bookId title author image", // Select fields to populate from Book
    });

    if (findAllBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books are issued",
      });
    }

    return res.status(200).json({
      success: true,
      books: findAllBooks,
      message: "These books are issued",
    });
  } catch (err) {
    console.error("Error retrieving issued books:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred while getting all issued books",
    });
  }
};

exports.getBookByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await BookModel.findOne({ bookId: bookId });
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

exports.AllIssueBook = async (req, res) => {
  try {
    // Find all issued books for the given student ID and populate related fields
    const findAllBooks = await IssueBook.find({
      status: "issued",
    }).populate({
      path: "book_id", // Ensure this matches the field in your IssueBook schema
      select: "bookId title author image", // Select fields to populate from Book
    });

    if (findAllBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books are issued",
      });
    }

    return res.status(200).json({
      success: true,
      books: findAllBooks,
      message: "These books are issued",
    });
  } catch (err) {
    console.error("Error retrieving issued books:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred while getting all issued books",
    });
  }
};
