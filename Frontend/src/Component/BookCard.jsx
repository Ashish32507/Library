import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const { _id, title, author, category, quantity, image, description } = book;

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
            onClick={() => navigate(`/viewbookbyid/${_id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
