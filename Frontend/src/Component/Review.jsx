import React, { useState } from "react";
import { useSelector } from "react-redux";

const Review = () => {
  const { user } = useSelector((store) => store.auth);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  const [issuedBook, setIssueBook] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border border-gray-300 rounded-lg shadow-md my-4">
      <h2 className="text-xl font-bold mb-4">Book Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        ></textarea>
        <button
          type="submit"
          className={`w-full p-2 font-semibold rounded ${
            !user
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
          disabled={!user} // Disable the button if user is not logged in
        >
          Submit Review
        </button>
      </form>

      <div>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md"
            >
              <h3 className="font-semibold">{review.name}</h3>
              <p className="text-gray-600 text-sm">{review.date}</p>
              <p className="mt-2">{review.text}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default Review;
