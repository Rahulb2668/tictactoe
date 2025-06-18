const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.NODE_MONGO_DB_URI);
    console.log("Connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = connectDB;
