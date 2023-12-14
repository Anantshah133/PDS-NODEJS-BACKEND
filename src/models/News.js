const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  shortDescription: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("News", NewsSchema);
