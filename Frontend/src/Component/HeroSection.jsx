import React from "react";
import Carousel from "./Carousel";
import BookList from "./BookList";
import useGetAllBooks from "../hooks/useGetAllBooks";

function HeroSection() {
  useGetAllBooks();
  return (
    <>
      <Carousel />
      <BookList />
    </>
  );
}

export default HeroSection;
