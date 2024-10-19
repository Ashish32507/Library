import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/Constant";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/AuthSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(setUser(response?.data?.user));
        if (response?.data?.user?.role === "user") {
          navigate("/");
          console.log("User Login");
        } else if (response?.data?.user?.role === "librarian") {
          navigate("/admin");
        } else {
          // Add a fallback for unknown roles
          toast.error("Unknown role, redirecting to home.");
          navigate("/login");
          console.log("Unknown Role");
        }
      } else {
        toast.error("Enter The Correct Details");
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Internal Error Occurred");
      console.log("Internal Error Occured", err);
    } finally {
      setLoading(false); // Reset loading state
      setFormData({
        email: "",
        password: "",
        role: "user",
      });
    }
    console.log("Login submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg m-5">
        <h2 className="bg-red-700 py-2 text-white text-2xl font-semibold mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="user">User</option>
              <option value="librarian">Librarian</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white absolute left-1/2 transform -translate-x-1/2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0114.56-4.6l-2.65-1.7A4.97 4.97 0 004 12z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
          <div>
            <p className="text-center font-semibold">
              if You Have Not Account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
