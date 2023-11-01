const mongoose = require("mongoose");

const { Schema } = mongoose;

const WorkoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    intensity: {
        type: String,
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
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Tracks',
    }, 
});

module.exports = mongoose.model("Workout", WorkoutSchema);