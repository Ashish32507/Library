const {
  issueBook,
  returnBook,
  getAllIssueBook,
  getBookByBookId,
  AllIssueBook,
} = require("../controller/issueBookController");
const express = require("express");
const issueRouter = express.Router();
const { islibrarian } = require("../middleware/isAuthenticated");

// Route to issue a new book to a user, where ":bookId" represents the ID of the book
issueRouter.post("/issuebook/:bookId", issueBook);
issueRouter.post("/return/:bookId", returnBook);
issueRouter.get("/allissuedbook/:stdId", getAllIssueBook);
issueRouter.get("/getbookbybookid/:bookId", getBookByBookId);
issueRouter.get("/allissuebook", AllIssueBook);
module.exports = issueRouter;
