const mongoose = require("mongoose");

const ProjectImages = new mongoose.Schema({
  image: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: Number,
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
    validate: {
      validator: function (value) {
        return mongoose.Types.ObjectId.isValid(value);
      },
      message: "Invalid project_id, please provide a valid ObjectId.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ProjectImages", ProjectImages);
