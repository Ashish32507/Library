import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { BOOK_API_END_POINT } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { setAllBooks } from "../Redux/BookSlice";
function useGetAllBooks() {
  const dispacth = useDispatch();
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(`${BOOK_API_END_POINT}/getallbook`, {
          withCredentials: true,
        });
        console.log(response);
        dispacth(setAllBooks(response.data.books));
      } catch (err) {
        console.log("Error Occured", err);
      }
    };
    fetchAllBooks();
  }, []);
}

export default useGetAllBooks;
