import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IssueBook() {
  const [bookId, setBookId] = useState("");
  const [bookDetails, setBookDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [studentErrorMessage, setStudentErrorMessage] = useState("");
  const [issueMessage, setIssueMessage] = useState("");
  const [isLoadingBook, setIsLoadingBook] = useState(false);
  const [isLoadingStudent, setIsLoadingStudent] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);

  // Fetch Book Details
  const fetchSingleBook = async () => {
    if (!bookId) {
      setErrorMessage("Please enter a valid Book ID.");
      toast.error("Please enter a valid Book ID.");
      return;
    }

    setIsLoadingBook(true);
    setErrorMessage("");
    setBookDetails(null);
    try {
      const response = await axios.get(
        `http://localhost:4000/issue/getbookbybookid/${bookId}`
      );
      if (response.data.success) {
        setBookDetails(response.data.book);
        toast.success("Book found successfully!");
      } else {
        setErrorMessage("Book not found.");
        toast.error("Book not found.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching the book details.");
      toast.error("Error fetching book details.");
    } finally {
      setIsLoadingBook(false);
    }
  };

  // Fetch Student Details
  const fetchSingleUser = async () => {
    if (!studentId) {
      setStudentErrorMessage("Please enter a valid Student ID.");
      toast.error("Please enter a valid Student ID.");
      return;
    }

    setIsLoadingStudent(true);
    setStudentErrorMessage("");
    setStudentDetails(null);
    try {
      const response = await axios.get(
        `http://localhost:4000/user/getuser/${studentId}`
      );
      if (response.data.success) {
        setStudentDetails(response.data.user);
        toast.success("Student found successfully!");
      } else {
        setStudentErrorMessage("Student not found.");
        toast.error("Student not found.");
      }
    } catch (error) {
      setStudentErrorMessage(
        "An error occurred while fetching the student details."
      );
      toast.error("Error fetching student details.");
    } finally {
      setIsLoadingStudent(false);
    }
  };

  // Issue Book
  const issueBook = async () => {
    if (!bookDetails || !studentDetails) return;

    setIsIssuing(true);
    setIssueMessage("");
    try {
      const response = await axios.post(
        `http://localhost:4000/issue/issuebook/${bookId}`,
        {
          stdId: studentDetails.stdId,
          book_Id: bookDetails._id,
        }
      );

      if (response.data.success) {
        setIssueMessage(
          `Book '${bookDetails.title}' has been issued to ${studentDetails.name}.`
        );
        toast.success(`Book issued to ${studentDetails.name} successfully!`);

        // Clear all fields after successful issuance
        setBookId("");
        setBookDetails(null);
        setStudentId("");
        setStudentDetails(null);
        setIssueMessage("");
      } else {
        setIssueMessage("Failed to issue the book.");
        toast.error("Failed to issue the book.");
      }
    } catch (error) {
      setIssueMessage("An error occurred during the book issue process.");
      toast.error("Error issuing the book.");
    } finally {
      setIsIssuing(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <ToastContainer /> {/* Toast Container to display toast messages */}
      <h1 className="text-2xl font-bold mb-4">Issue Book</h1>
      {/* Book Search */}
      <div className="flex flex-col md:flex-row items-center mb-4">
        <input
          type="text"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="border p-2 rounded-md mr-2 mb-2 md:mb-0 flex-1"
        />
        <button
          onClick={fetchSingleBook}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {isLoadingBook ? "Searching..." : "Search Book"}
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {bookDetails && (
        <div className="flex flex-col md:flex-row border p-4 rounded-md mb-6">
          {/* Book details section */}
          <div className="md:w-1/2 mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">{bookDetails.title}</h2>
            <p>Author: {bookDetails.author}</p>
            <p>Quantity: {bookDetails.quantity}</p>
          </div>
          {/* Book Image */}
          <div className="md:w-1/2 text-right">
            <img
              src={bookDetails.image} // assuming bookDetails has an image field
              alt={bookDetails.title}
              className="w-52 h-60 object-cover"
            />
          </div>
        </div>
      )}
      {/* Student Search */}
      {bookDetails && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">
            Enter Student ID to Issue Book:
          </h3>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <input
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="border p-2 rounded-md mr-2 mb-2 md:mb-0 flex-1"
            />
            <button
              onClick={fetchSingleUser}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              {isLoadingStudent ? "Searching..." : "Search Student"}
            </button>
          </div>
          {studentErrorMessage && (
            <p className="text-red-500">{studentErrorMessage}</p>
          )}
          {studentDetails && (
            <div className="flex flex-col md:flex-row border p-4 rounded-md mb-4">
              {/* Student details section */}
              <div className="md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Student Details</h3>
                <p>Name: {studentDetails.name}</p>
                <p>Email: {studentDetails.email}</p>
                <p>Phone: {studentDetails.phoneNumber}</p>
                <p>StdId: {studentDetails.stdId}</p>
              </div>
              {/* Student Image */}
              <div className="md:w-1/2 text-right">
                <img
                  src={studentDetails.profileImage} // assuming studentDetails has a photo field
                  alt={studentDetails.name}
                  className="w-40 h-44 object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}
      {/* Issue Button */}
      {bookDetails && studentDetails && (
        <button
          onClick={issueBook}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          disabled={isIssuing}
        >
          {isIssuing ? "Issuing..." : "Issue Book"}
        </button>
      )}
      {/* Show success message if the book is issued */}
      {issueMessage && <p className="text-green-500 mt-4">{issueMessage}</p>}
    </div>
  );
}

export default IssueBook;
