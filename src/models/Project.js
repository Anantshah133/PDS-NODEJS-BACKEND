const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add title"],
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
  recent: {
    type: Boolean,
    default: true,
  },
  isBanner: {
    type: Boolean,
    default: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to the User model
    required: true,
    validate: {
      validator: function (value) {
        return mongoose.Types.ObjectId.isValid(value);
      },
      message: "Invalid category_id, please provide a valid ObjectId.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
