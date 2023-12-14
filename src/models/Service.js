const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
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

module.exports = mongoose.model("Service", ServiceSchema);
