const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    dateTime: {
        type: Date,
        required: true
    },

    venue: {
        type: String,
        required: true,
        trim: true
    },

    Capacity: {
        type: Number,
        required: true,
        min: 1
    },

    status: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
        default: "Upcoming"
    }
});

module.exports = mongoose.model("Event", eventSchema);