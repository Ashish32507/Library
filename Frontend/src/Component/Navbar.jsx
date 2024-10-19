import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import store from "../Redux/Store";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);
  const logOutHanler = () => {
    navigate("/login");
    dispatch(setUser(null));
  };
  return (
    <nav className="bg-white text-black shadow-md sticky top-0 left-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0" onClick={() => navigate("/")}>
              <h1 className="text-2xl font-bold cursor-pointer">
                Centrall <span className="text-red-600">Library</span>
              </h1>
            </div>
          </div>
          <div className="hidden md:flex space-x-4">
            <>
              <Link
                to="/"
                className="text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-xl font-medium transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/allbooks"
                className="text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-xl font-medium transition-all duration-300"
              >
                Books
              </Link>
              {user && user.role === "user" ? (
                <Link
                  to="/alliussesbooks"
                  className="text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-xl font-medium transition-all duration-300"
                >
                  Issued Books
                </Link>
              ) : null}
            </>
            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={toggleProfileMenu}
                    className="focus:outline-none"
                  >
                    <img
                      className="h-10 w-10 rounded-full ml-2"
                      src={user.profileImage}
                      alt="Profile"
                    />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-20">
                      <Link to="/profile" className="block px-4 py-2 text-sm">
                        Show Profile
                      </Link>
                      <Link
                        onClick={logOutHanler}
                        className="block px-4 py-2 text-sm"
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-5">
                  <Link
                    to="/login"
                    className="text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-xl font-medium transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-blue-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Options */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <>
              <Link
                to="/"
                className="block text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/allbooks"
                className="block text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
              >
                Books
              </Link>
              {user && user.role === "user" ? (
                <Link
                  to="/alliussesbooks"
                  className="block text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                >
                  Issued Books
                </Link>
              ) : null}
            </>
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="block text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Profile
                </button>
                {isProfileOpen && (
                  <div className="mt-2 w-full bg-white text-black rounded-md shadow-lg py-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm">
                      Show Profile
                    </Link>
                    <Link
                      onClick={logOutHanler}
                      className="block px-4 py-2 text-sm"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
