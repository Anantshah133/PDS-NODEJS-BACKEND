const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
  about: {
    about: { type: String },
    image: { type: String },
  },
  career: {
    type: String,
  },
  token: {
    type: Array,
  },
  user: {
    user_name: { type: String },
    password: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Setting", SettingSchema);
