const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
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

module.exports = mongoose.model("Menu", MenuSchema);
