import React, { useState } from "react";
import BookCard from "./BookCard";
import { useSelector } from "react-redux";
import useGetAllBooks from "../hooks/useGetAllBooks";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Book = () => {
  useGetAllBooks();
  const { allBooks } = useSelector((store) => store.book);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterType(e.target.value);
  };

  const filteredBooks = allBooks.filter((book) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    if (searchTerm === "") return true; // Show all books if search term is empty

    if (filterType === "category") {
      return book.category.toLowerCase().includes(lowercasedSearchTerm);
    } else if (filterType === "title") {
      return book.title.toLowerCase().includes(lowercasedSearchTerm);
    }
    return true; // Show all books if no filter type is selected
  });

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4 px-5">
          <input
            type="text"
            placeholder="Search Your Books"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border p-2 rounded"
          />
          <select
            value={filterType}
            onChange={handleFilter}
            className="border p-2 rounded"
          >
            <option value="">Select Filter</option>
            <option value="category">Category</option>
            <option value="title">Book Name</option>
          </select>
        </div>
        <div className="w-full flex justify-center flex-wrap gap-5 p-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard key={book.id || book.title} book={book} />
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Book;
