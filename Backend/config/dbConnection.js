const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        console.log("Database Is Connected SuccessFully");
      })
      .catch((err) => {
        console.log("DataBase Connection Is Failed");
      });
  } catch (err) {
    console.log("Internal error occurred:", err);
  }
};

module.exports = dbConnection;
