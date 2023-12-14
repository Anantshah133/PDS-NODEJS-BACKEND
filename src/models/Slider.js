const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
  image: {
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

module.exports = mongoose.model("Slider", SliderSchema);
