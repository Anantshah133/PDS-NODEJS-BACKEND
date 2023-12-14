const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    designation: {
        type: String,
    },
    image: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
