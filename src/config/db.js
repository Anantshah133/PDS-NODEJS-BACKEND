const mongoose = require("mongoose");
require("colors");
const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;

    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.inverse);
  } catch (error) {
    console.log(`Error: ${error?.message ?? "some thing went wrong"}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;