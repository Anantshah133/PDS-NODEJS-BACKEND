const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add title"],
    unique: [true, "Category title must be unique"],
  },
  image: {
    type: String,
  },
  priority: {
    type: Number,
    required: [true, "Please add priority"],
    unique: [true, "Category priority must be unique"],
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

CategorySchema.index({ title: 1 }, { unique: true });

module.exports = mongoose.model("Category", CategorySchema);
