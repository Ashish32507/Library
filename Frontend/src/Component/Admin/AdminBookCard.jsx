import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BOOK_API_END_POINT } from "../../utils/Constant";
import { toast } from "react-toastify";
import useGetAllBooks from "../../hooks/useGetAllBooks";

const AdminBookCard = ({ book }) => {
  const navigate = useNavigate();

  const { _id, title, author, category, quantity, image, description } = book;

  const deleteHandler = async (bookId) => {
    // Show confirmation dialog before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `${BOOK_API_END_POINT}/deletebook/${bookId}`
        );
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          // Optionally, you can add additional code here to update the UI or redirect
        } else {
          toast.error(response?.data?.message);
        }
      } catch (err) {
        toast.error("An error occurred while deleting the book.");
      }
    }
  };

  return (
    <div className="relative w-full sm:w-[300px] rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img
        className="w-full h-48 object-cover transform transition-transform duration-300 hover:brightness-75"
        src={image}
        alt={title}
      />
      <div className="absolute top-0 left-0 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
        {category}
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-3 text-gray-900">{title}</div>
        <p className="text-gray-800 text-base mb-2">
          <span className="text-gray-900">{description.substring(0, 70)}</span>
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-800 text-base">
            <span className="font-semibold text-gray-900">Quantity:</span>{" "}
            {quantity}
          </p>
          <button
            onClick={() => deleteHandler(_id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookCard;
