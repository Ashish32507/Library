const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              About Centrall Library
            </h3>
            <p className="text-gray-400">
              Centrall Library is a hub for knowledge and learning. We offer a
              wide collection of books, digital resources, and an environment
              conducive to learning for people of all ages.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="/home" className="hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/books" className="hover:text-white">
                  Books
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="text-gray-400">
              <li className="mb-2">123 Library Lane</li>
              <li className="mb-2">City, State, 45678</li>
              <li className="mb-2">Email: info@centrallibrary.com</li>
              <li className="mb-2">Phone: +1 (555) 123-4567</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-3xl transition duration-300"
              >
                <i className="fa-brands fa-square-facebook"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 text-3xl transition duration-300"
              >
                <i className="fa-brands fa-square-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700 text-3xl transition duration-300"
              >
                <i className="fa-brands fa-square-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 text-3xl transition duration-300"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400">
            &copy; 2024 Centrall Library. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
