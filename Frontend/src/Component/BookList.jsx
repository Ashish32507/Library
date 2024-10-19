import React from "react";
import BookCard from "./BookCard";
import { useSelector } from "react-redux";
import useGetAllBooks from "../hooks/useGetAllBooks";

const BookList = () => {
  useGetAllBooks();
  const { allBooks } = useSelector((store) => store.book);

  return (
    <>
      <div className="max-w-5xl mx-auto flex justify-center flex-wrap gap-5 p-4">
        {allBooks.length > 0 ? (
          allBooks
            .slice(0, 6)
            .map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </>
  );
};

export default BookList;
