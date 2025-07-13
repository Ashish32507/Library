import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReturnBook() {
  const [bookId, setBookId] = useState("");
  const [stdId, setStdId] = useState("");
  const [bookDetails, setBookDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookDetails = async () => {
    if (!bookId || !stdId) {
      setErrorMessage("Please enter both Book ID and Student ID.");
      toast.error("Please enter both Book ID and Student ID.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setBookDetails(null);
    try {
      const response = await axios.post(
        `https://library-msph.onrender.com/issue/return/${bookId}`,
        { stdId } // Send stdId in the request body
      );
      if (response.data.success) {
        setBookDetails(response.data.book);
        console.log(response.data);
        toast.success("Book details fetched successfully!");
        // Clear input fields after successful fetch
        setBookId("");
        setStdId("");
      } else {
        setErrorMessage("Book details not found.");
        toast.error("Book details not found.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching the book details.");
      toast.error("Error fetching book details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <ToastContainer /> {/* Toast Container for displaying toast messages */}
      <h1 className="text-2xl font-bold mb-6">Return Book</h1>
      {/* Input fields and Search button */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="border p-2 rounded-md flex-1"
        />
        <input
          type="text"
          placeholder="Enter Student ID"
          value={stdId}
          onChange={(e) => setStdId(e.target.value)}
          className="border p-2 rounded-md flex-1"
        />
        <button
          onClick={fetchBookDetails}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
      {/* Display Error Message */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {/* Display Book Details */}
      {bookDetails && (
        <div className="border border-gray-200 p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 items-center">
          {bookDetails.image && (
            <img
              src={bookDetails.image}
              alt={bookDetails.title}
              className="w-full sm:w-48 h-auto object-cover rounded-md mb-4 sm:mb-0"
            />
          )}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">{bookDetails.title}</h2>
            <p className="text-gray-600">Author: {bookDetails.author}</p>
            <p className="text-gray-600">
              Quantity: {bookDetails.remainingQuantity}
            </p>
            <p className="text-gray-600">
              Issue Date: {bookDetails.issuDate.toString().slice(0, 10)}
            </p>
            <p className="text-gray-600">
              Return Date:{" "}
              {bookDetails.returnDate
                ? bookDetails.returnDate.toString().slice(0, 10)
                : "Not Returned Yet"}
            </p>
            <p className="text-gray-600">Fine: {bookDetails.fine}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReturnBook;
