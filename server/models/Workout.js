const mongoose = require("mongoose");

const { Schema } = mongoose;

const WorkoutSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ Reference to user
    title: String,
    date: String,
    start_time: String,
    end_time: String,
    type: String,
    name: String,
    intensity: String,
    sets: Number,
    reps: Number,
    weight: Number
});

module.exports = mongoose.model("Workout", WorkoutSchema);