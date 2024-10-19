import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/Constant";
import { toast } from "react-toastify";
import { setUser } from "../Redux/AuthSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth); // Access user from redux store

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    stdId: "", // Student ID
    file: null, // To handle image file
  });

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        role: user.role || "",
        stdId: user.stdId || "", // Set student ID
        file: null, // Initialize file to null
      });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("stdId", formData.stdId); // Append student ID
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      const response = await axios.put(
        `${USER_API_END_POINT}/update/${user._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(setUser(response?.data?.user));
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Internal Error Occurred");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-6 mb-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.profileImage || "/default-profile.png"} // Default image if none
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-300"
            />
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              className="mt-2"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="stdId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Student ID
            </label>
            <input
              type="text"
              id="stdId"
              name="stdId"
              value={formData.stdId}
              onChange={handleChange}
              disabled
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Update Profile
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
