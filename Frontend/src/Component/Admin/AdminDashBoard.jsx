import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const logOutHanler = () => {
    navigate("/login");
    dispatch(setUser(null));
  };

  return (
    <div className="flex h-screen w-full">
      {/* Mobile Menu Icon on Right Side */}
      <div className="md:hidden fixed top-4 right-4 z-20">
        <button
          onClick={toggleMobileMenu}
          className="text-white bg-gray-800 p-2 rounded-md"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col items-center py-8 shadow-lg z-10 transform ${
          isMobileMenuOpen ? "translate-x-0 pt-20" : "-translate-x-full pt-20"
        } md:translate-x-0 transition-transform duration-300 w-64`}
      >
        {/* Logo Section */}
        <div className="w-24 h-24 rounded-full bg-gray-500 mb-8">
          <img src={user?.profileImage || ""} alt="" className="rounded-full" />
        </div>

        {/* Navigation Links */}
        <nav className="w-full flex flex-col items-center space-y-4 px-4">
          <Link
            to="/admin/allbooks"
            className="w-full text-center py-2 px-4 bg-gray-700 rounded-md hover:bg-blue-600 transition duration-300"
          >
            All Books
          </Link>
          <Link
            to="/admin/addbook"
            className="w-full text-center py-2 px-4 bg-gray-700 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Book
          </Link>
          <Link
            to="/admin/alluser"
            className="w-full text-center py-2 px-4 bg-gray-700 rounded-md hover:bg-blue-600 transition duration-300"
          >
            All Users
          </Link>
          <Link
            to="/admin/allissuebook"
            className="w-full text-center py-2 px-4 bg-gray-700 rounded-md hover:bg-blue-600 transition duration-300"
          >
            All IssueBook
          </Link>
          <Link
            to="/admin/issuebook"
            className="w-full text-center py-2 px-4 bg-gray-700 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Issue Book
          </Link>
          <Link
            to="/admin/returnbook"
            className="w-full text-center py-2 px-4 bg-gray-700 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Return Books
          </Link>
          <Link
            onClick={logOutHanler}
            className="w-full text-center py-2 px-4 bg-gray-700 rounded-md hover:bg-red-600 transition duration-300"
          >
            Log Out
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="w-full h-16 bg-white shadow-md fixed top-0 left-0 md:left-64 flex items-center justify-between px-6 z-10">
          <h2 className="text-xl font-semibold text-gray-700">Admin Panel</h2>
          {/* Optional: Add any header buttons or icons here */}
        </header>

        {/* Content */}
        <div className="pt-20 p-6 bg-gray-100 h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
