const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  phone: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Career", CareerSchema);
