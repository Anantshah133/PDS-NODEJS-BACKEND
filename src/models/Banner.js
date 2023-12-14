const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  isVideo: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Banner", BannerSchema);
