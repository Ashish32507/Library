import axios from "axios";
import React, { useEffect, useState } from "react";

function AllIssueBook() {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://library-msph.onrender.com/issue/allissuebook"
        );
        if (response.data.success) {
          setAllBooks(response.data.books);
        } else {
          console.error("Failed to fetch books.");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);
  console.log(allBooks);
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Issued Books</h1>

      {allBooks.length === 0 ? (
        <p>No books have been issued yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBooks.map((book) => (
            <div
              key={book._id}
              className="border border-gray-200 p-4 rounded-lg shadow-md"
            >
              {book && (
                <img
                  src={book?.book_id?.image}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
              )}

              <h2 className="text-xl font-semibold mb-2">
                {book?.book_id?.title}
              </h2>
              <p className="text-gray-600">Author: {book?.book_id?.author}</p>
              <p className="text-gray-600">
                Issued To: {book.stdId ? book.stdId : "N/A"}
              </p>
              <p className="text-gray-600">
                Issue Date: {new Date(book.issue_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllIssueBook;
