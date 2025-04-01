const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProgramSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ Reference to user
    title: String,
    creator: String,
    description: String,
    type: String,
    date: String,
    plan: [{
        type: Schema.Types.Mixed
    }]
});

module.exports = mongoose.model("Program", ProgramSchema);