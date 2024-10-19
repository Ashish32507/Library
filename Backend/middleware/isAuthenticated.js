const jwt = require("jsonwebtoken");
const isUser = (req, res, next) => {
  try {
    // Access token from cookies
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Check if the role is 'user'
    if (decoded.role === "user") {
      req.userId = decoded.userId; // Ensure correct property name here
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied. User role required.",
      });
    }
  } catch (err) {
    console.error("Error occurred in user authentication:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const islibrarian = (req, res, next) => {
  try {
    // Access token from cookies
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if the token is valid and contains the role
    if (decoded && decoded.role === "librarian") {
      req.userId = decoded.userId; // Ensure correct property name here
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied. Librarian role required.",
      });
    }
  } catch (err) {
    console.error("Error occurred in librarian authentication:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { islibrarian };

module.exports = { isUser, islibrarian };
