import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { BOOK_API_END_POINT } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { setSingleBook } from "../Redux/BookSlice";
function useGetBookById(id) {
  const dispacth = useDispatch();
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(
          `${BOOK_API_END_POINT}/getbookbyid/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        dispacth(setSingleBook(response.data.book));
      } catch (err) {
        console.log("Error Occured", err);
      }
    };
    fetchAllBooks();
  }, []);
}

export default useGetBookById;
