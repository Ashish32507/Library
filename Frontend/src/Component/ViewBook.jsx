import React, { useState } from "react";
import useGetBookById from "../hooks/useGetBookById";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Review from "./Review";
import { toast } from "react-toastify";
import axios from "axios";
import { ISSUE_API_END_POINT } from "../utils/Constant";
import Navbar from "./Navbar";
import Footer from "./Footer";
import store from "../Redux/Store";

const ViewBook = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [issueLoading, setIssueLoading] = useState(false);

  useGetBookById(id);

  const { singleBook } = useSelector((store) => store.book);
  const { user } = useSelector((store) => store.auth);

  if (!singleBook && !isLoading) {
    return <p>Loading book details...</p>;
  }

  if (!singleBook && isLoading) {
    return <p>Failed to load book details. Please try again.</p>;
  }

  const onIssueHandler = async (e) => {
    e.preventDefault();
    setIssueLoading(true); // Start the loading spinner
    try {
      const response = await axios.post(
        `${ISSUE_API_END_POINT}/issuebook/${singleBook.bookId}`,
        { stdId: user.stdId, bookId: singleBook.bookId },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Some Internal Error Occurred");
    } finally {
      setIssueLoading(false); // Stop the loading spinner
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl my-5 mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
        <div className="w-full md:flex-row overflow-hidden rounded-lg">
          <img
            src={singleBook?.image || "https://via.placeholder.com/150"}
            alt={singleBook?.title}
            className="w-full h-72 object-cover rounded-lg"
          />
          <div className="md:ml-6 flex-1 my-4">
            <h1 className="text-2xl font-bold mb-2">{singleBook?.title}</h1>
            <p className="text-lg font-semibold mb-1">
              <span className="font-bold">Author: </span> {singleBook?.author}
            </p>
            <p className="text-lg font-semibold mb-1">
              <span className="font-bold">Description : </span>{" "}
              {singleBook?.description || ""}
            </p>
            <p className="text-lg font-semibold mb-1">
              <span className="font-bold">Category : </span>{" "}
              {singleBook?.category || ""}
            </p>
            <p className="text-lg mb-1">
              <span className="font-bold">Published Date: </span>
              {singleBook?.publish_date
                ? singleBook.publish_date.slice(0, 10)
                : "N/A"}
            </p>
            <p className="text-lg mb-1">
              <span className="font-bold">Quantity: </span>{" "}
              {singleBook?.quantity}
            </p>
            <p className="text-lg mb-1">
              <span className="font-bold">Book Id: </span> {singleBook?.bookId}
            </p>
            {singleBook?.standard && (
              <p className="text-lg mb-1">
                <span className="font-bold">Standard: </span>{" "}
                {singleBook.standard}
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewBook;
