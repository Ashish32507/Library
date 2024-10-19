import React, { useState } from "react";
import axios from "axios";
import { BOOK_API_END_POINT } from "../../utils/Constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const nevigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    published_date: "",
    category: "",
    quantity: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("published_date", formData.published_date);
    form.append("category", formData.category);
    form.append("quantity", parseInt(formData.quantity, 10)); // Parsing quantity as number
    form.append("description", formData.description);
    if (formData.image) form.append("file", formData.image);
    console.log(form);
    try {
      const response = await axios.post(`${BOOK_API_END_POINT}/newbook`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response?.data?.message);
        nevigate("/admin/allbooks");
        setFormData({
          title: "",
          author: "",
          published_date: "",
          category: "",
          quantity: "",
          description: "",
          file: null,
        });
      }
      if (!response.data.success) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to add book", error);
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="max-w-4xl  mx-auto p-6 bg-white shadow-md rounded-lg my-6">
      <h2 className="text-2xl font-bold mb-6">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block font-semibold mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block font-semibold mb-1">Published Date</label>
            <input
              type="date"
              name="published_date"
              value={formData.published_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Engineering">Engineering</option>
              <option value="BBA">BBA</option>
              <option value="BA">BA</option>
              <option value="MBA">MBA</option>
              <option value="HMCT">HMCT</option>
              <option value="LAW">LAW</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="Diploma">Diploma</option>
              <option value="Polytechnic">Polytechnic</option>
              <option value="BCOM">BCOM</option>
              <option value="BSC">BSC</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block font-semibold mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
              min="1"
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="w-full px-2 mb-4">
            <label className="block font-semibold mb-1">Upload Image</label>
            <input
              type="file"
              name="file"
              value={formData.file}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
