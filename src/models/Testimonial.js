const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    designation: {
        type: String,
    },
    review : {
        type: String,
    },
    image: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
