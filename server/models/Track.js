const mongoose = require("mongoose");

const { Schema } = mongoose;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout',
    }], 
});

module.exports = mongoose.model("Tracks", TrackSchema);