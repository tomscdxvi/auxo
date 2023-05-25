const mongoose = require("mongoose");

const { Schema } = mongoose;

const TrackSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    start_time: {
        type: Number,
        required: true
    },
    end_time: {
        type: Number,
        required: true
    },
    workout: [{
        title: {
            type: String,
            required: true,
        },
        sets: {
            type: Number,
            required: true
        },
        reps: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        exericse: [{
            name: {
                type: String,
                required: true,
            },
            body_part: {
                type: String,
                required: true
            },
            description: {
                type: String,
            },
            level: {
                type: String,
                required:true
            }
        }]
    }]
});

module.exports = mongoose.model("Tracks", TrackSchema);