import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import axios from "axios";
import { ISSUE_API_END_POINT } from "../../utils/Constant";
import { useSelector } from "react-redux";
import useGetAllBooks from "../../hooks/useGetAllBooks";
import useGetBookById from "../../hooks/useGetBookById";
function AllIssuesBooks() {
  const [books, setbooks] = useState([]);
  const issues = [
    {
      bookId: "B001",
      issuedAt: "2024-08-15",
      returnDate: "2024-09-15",
      bookName: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      logo: "https://via.placeholder.com/50", // Replace with actual logo URL
    },
    {
      bookId: "B002",
      issuedAt: "2024-08-20",
      returnDate: "2024-09-20",
      bookName: "1984",
      author: "George Orwell",
      logo: "https://via.placeholder.com/50", // Replace with actual logo URL
    },
    // Add more sample data as needed
  ];
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    const allBooks = async () => {
      const response = await axios.get(
        `${ISSUE_API_END_POINT}/allissuedbook/${user.stdId}`
      );
      console.log(response);
      setbooks(response.data.books);
    };
    allBooks();
  }, []);
  console.log(books);
  useGetBookById(books.book_id);
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 my-10">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Issued Books
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 text-left">S.No</th>
                <th className="px-4 py-2 text-left">Book Logo</th>
                <th className="px-4 py-2 text-left">BookId</th>
                <th className="px-4 py-2 text-left">Issued At</th>
                <th className="px-4 py-2 text-left">Return Date</th>
                <th className="px-4 py-2 text-left">Book Name</th>
                <th className="px-4 py-2 text-left">Author</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((issue, index) => (
                  <tr key={issue.bookId} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      <img
                        src={issue?.book_id?.image}
                        alt={issue?.book_id?.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">{issue?.book_id?.bookId}</td>
                    <td className="px-4 py-2">
                      {issue?.issue_date.slice(0, 10)}
                    </td>
                    <td className="px-4 py-2">
                      {issue?.due_date?.slice(0, 10)}
                    </td>
                    <td className="px-4 py-2">{issue?.book_id?.title}</td>
                    <td className="px-4 py-2">{issue?.book_id?.author}</td>
                  </tr>
                ))
              ) : (
                <div className="w-full text-center py-4 text-sm sm:text-base">
                  No Book Found
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllIssuesBooks;
