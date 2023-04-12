const mongoose = require("mongoose");

const { Schema } = mongoose;

const Workout = new Schema({
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
    }
});

module.exports = mongoose.model("Workouts", WorkoutSchema);