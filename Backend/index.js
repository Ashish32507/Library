const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const issueRoutes = require("./routes/issueRoutes"); // Corrected variable

app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOption)); // Enable CORS if needed

// Mount routes
app.use("/user", userRoutes);
app.use("/book", bookRoutes);
app.use("/issue", issueRoutes); // Corrected: Use issueRoutes for /issue

const PORT = process.env.PORT || 3000;
dbConnection();
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
